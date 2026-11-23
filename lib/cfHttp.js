const ALLOWED_EXACT_ORIGINS = new Set([
  'https://longhoang.pages.dev',
  'https://nguyenvanhoanglong478-source.github.io',
]);

const PREVIEW_ORIGIN_PATTERN = /^https:\/\/[a-z0-9-]+\.longhoang\.pages\.dev$/;
const LOCAL_ORIGIN_PATTERN = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

export function resolveCorsOrigin(origin) {
  if (!origin) return null;
  if (ALLOWED_EXACT_ORIGINS.has(origin)) return origin;
  if (PREVIEW_ORIGIN_PATTERN.test(origin)) return origin;
  if (LOCAL_ORIGIN_PATTERN.test(origin)) return origin;
  return null;
}

export function createCorsHeaders(
  request,
  { methods = 'GET, HEAD, OPTIONS', json = true } = {}
) {
  const headers = new Headers({
    'Cache-Control': 'no-store, max-age=0',
    Vary: 'Origin',
    'Access-Control-Allow-Methods': methods,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  });

  if (json) {
    headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  const corsOrigin = resolveCorsOrigin(request.headers.get('Origin'));
  if (corsOrigin) {
    headers.set('Access-Control-Allow-Origin', corsOrigin);
  }

  return headers;
}

export function jsonResponse(
  request,
  payload,
  status = 200,
  methods = 'GET, HEAD, OPTIONS'
) {
  const headers = createCorsHeaders(request, { methods, json: true });
  if (request.method === 'HEAD') {
    return new Response(null, { status, headers });
  }
  return new Response(JSON.stringify(payload), { status, headers });
}

export function preflightResponse(request, methods = 'GET, HEAD, OPTIONS') {
  return new Response(null, {
    status: 204,
    headers: createCorsHeaders(request, { methods, json: false }),
  });
}
