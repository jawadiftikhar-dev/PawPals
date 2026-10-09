// src/router.js

const routes = new Map();

/**
 * Register a route. `path` must start with "/".
 * `view` is a function that returns an HTML string.
 */
export function addRoute(path, view) {
  routes.set(path, view);
}

/** Navigate programmatically without a full reload. */
export function navigate(path) {
  if (path === window.location.pathname) return;
  window.history.pushState({}, '', path);
  render();
}

/** Resolve the current URL and render the matching view into #app. */
function render() {
  const outlet = document.querySelector('#app');
  if (!outlet) return;

  const path = window.location.pathname;
  const view = routes.get(path) ?? routes.get('*');

  outlet.innerHTML = view ? view() : '<h1>Page not found</h1>';
  updateActiveLink(path);
  outlet.focus?.();
  document.title = titleFor(path);
}

function updateActiveLink(path) {
  document.querySelectorAll('[data-link]').forEach((link) => {
    const isActive = new URL(link.href).pathname === path;
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function titleFor(path) {
  const map = {
    '/': 'PawPals Pet Clinic',
    '/services': 'Services — PawPals',
    '/appointment': 'Book an Appointment — PawPals',
  };
  return map[path] ?? 'Page not found — PawPals';
}

/** Intercept clicks on any [data-link] element. */
function interceptLinks() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]');
    if (!link) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    e.preventDefault();
    navigate(new URL(link.href).pathname);
  });
}

/** Boot the router. */
export function startRouter() {
  interceptLinks();
  window.addEventListener('popstate', render);
  render();
}