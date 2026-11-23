export function registerServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }
  const { protocol, hostname } = window.location;
  const isSecureContext =
    protocol === 'https:' ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1';
  if (!isSecureContext) return;

  const register = () => {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => undefined);
  };

  if (document.readyState === 'complete') {
    register();
  } else {
    window.addEventListener('load', register, { once: true });
  }
}
