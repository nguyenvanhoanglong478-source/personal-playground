const CF_BEACON_ID = 'cf-web-analytics-beacon';

export function initCloudflareAnalytics(): void {
  if (typeof document === 'undefined') return;
  const token = import.meta.env.VITE_CF_ANALYTICS_TOKEN?.trim();
  if (!token) return;
  if (document.getElementById(CF_BEACON_ID)) return;

  const script = document.createElement('script');
  script.id = CF_BEACON_ID;
  script.defer = true;
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.setAttribute('data-cf-beacon', JSON.stringify({ token }));
  document.head.appendChild(script);
}
