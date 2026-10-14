const STORAGE_KEY = 'pawpals-theme';

/** Read the initial theme: saved preference → OS preference → light. */
function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/** Apply a theme to <html> and persist it. */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
  updateToggleLabel(theme);
}

function updateToggleLabel(theme) {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  btn.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
  btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/** Wire up the toggle button and set the initial theme. */
export function initTheme() {
  const theme = getInitialTheme();
  applyTheme(theme);

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}