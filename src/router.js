// src/router.js

const BASE = import.meta.env.BASE_URL; // '/PawPals/' in prod, '/' in dev
const routes = new Map();

/** Register a route. `path` must start with "/". */
export function addRoute(path, view) {
  routes.set(path, view);
}

/** Convert an absolute URL path into a router-internal path. */
function toInternalPath(rawPath) {
  if (rawPath.startsWith(BASE)) {
    const trimmed = '/' + rawPath.slice(BASE.length);
    return trimmed.replace(/\/$/, '') || '/';
  }
  return rawPath;
}

/** Build a full URL path from an internal route path. */
function toFullPath(internalPath) {
  const base = BASE.replace(/\/$/, ''); // strip trailing slash
  return internalPath === '/' ? base + '/' : base + internalPath;
}

export function navigate(path) {
  const fullPath = toFullPath(path);
  if (fullPath === window.location.pathname) return;
  window.history.pushState({}, '', fullPath);
  render();
}

function render() {
  const outlet = document.querySelector('#app');
  if (!outlet) return;

  const path = toInternalPath(window.location.pathname);
  const view = routes.get(path) ?? routes.get('*');

  outlet.innerHTML = view ? view() : '<h1>Page not found</h1>';
  updateActiveLink(path);
  document.title = titleFor(path);
}

function updateActiveLink(path) {
  document.querySelectorAll('[data-link]').forEach((link) => {
    const linkPath = toInternalPath(new URL(link.href).pathname);
    if (linkPath === path) link.setAttribute('aria-current', 'page');
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

function interceptLinks() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]');
    if (!link) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    e.preventDefault();
    const fullPath = new URL(link.href).pathname;
    navigate(toInternalPath(fullPath));
  });
}

export function startRouter() {
  interceptLinks();
  window.addEventListener('popstate', render);
  render();
}