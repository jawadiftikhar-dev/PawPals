let deferredPrompt = null;

export function initInstallPrompt() {
  const installButton = document.getElementById('install-btn');

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default browser mini-infobar
    e.preventDefault();
    deferredPrompt = e;

    // Show our own install button
    if (installButton) {
      installButton.hidden = false;
    }
  });

  if (installButton) {
    installButton.addEventListener('click', async () => {
      if (!deferredPrompt) return;

      // Show the install prompt
      const result = await deferredPrompt.prompt();
      console.log(`Install prompt outcome: ${result.outcome}`);

      // Can only be called once per event
      deferredPrompt = null;
      installButton.hidden = true;
    });
  }

  // Hide the button if the app is already installed
  window.addEventListener('appinstalled', () => {
    if (installButton) installButton.hidden = true;
    deferredPrompt = null;
  });
}