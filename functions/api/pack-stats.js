const STATS_KEY = 'global_stats_v1';
const RATE_LIMIT_PREFIX = 'rl:';
const RATE_LIMIT_MAX_PER_MIN = 30;
const MAX_BODY_BYTES = 2048;

const ALLOWED_EXACT_ORIGINS = new Set([
  'https://longhoang.pages.dev',
  'https://nguyenvanhoanglong478-source.github.io',
]);

const PREVIEW_ORIGIN_PATTERN = /^https:\/\/[a-z0-9-]+\.longhoang\.pages\.dev$/;
const LOCAL_ORIGIN_PATTERN = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

const ALLOWED_BOX_IDS = new Set([
  'all',
  'me2pt5',
  'me2',
  'sv10',
  'sv8pt5',
  'sv8',
  'sv4pt5',
  'sv3pt5',
  'swsh12pt5',
  'swsh11',
  'swsh7',
  'sm9',
  'ecard3',
  'base1',
]);

const TIER_RANK = {
  common: 0,
  uncommon: 1,
  rare: 2,
  ultra: 3,
  secret: 4,
};

function resolveCorsOrigin(origin) {
  if (!origin) return null;
  if (ALLOWED_EXACT_ORIGINS.has(origin)) return origin;
  if (PREVIEW_ORIGIN_PATTERN.test(origin)) return origin;
  if (LOCAL_ORIGIN_PATTERN.test(origin)) return origin;
  return null;
}

function createResponseHeaders(request, includeJsonContentType = true) {
  const headers = new Headers({
    'Cache-Control': 'no-store, max-age=0',
    Vary: 'Origin',
    'Access-Control-Allow-Methods': 'GET, POST, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  });

  if (includeJsonContentType) {
    headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  const corsOrigin = resolveCorsOrigin(request.headers.get('Origin'));
  if (corsOrigin) {
    headers.set('Access-Control-Allow-Origin', corsOrigin);
  }

  return headers;
}

function jsonResponse(request, payload, status = 200) {
  const headers = createResponseHeaders(request, true);
  if (request.method === 'HEAD') {
    return new Response(null, { status, headers });
  }
  return new Response(JSON.stringify(payload), { status, headers });
}

function createEmptyStats() {
  return {
    totalPacks: 0,
    totalHits: 0,
    topPull: null,
    byBox: {},
    updatedAt: null,
  };
}

function sanitizeTopPull(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const id = typeof raw.id === 'string' ? raw.id.trim() : '';
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  const set = typeof raw.set === 'string' ? raw.set.trim() : '';
  const tier = typeof raw.tier === 'string' ? raw.tier.trim() : '';
  const price =
    typeof raw.price === 'number' && Number.isFinite(raw.price)
      ? Math.round(raw.price * 100) / 100
      : 0;

  if (!/^[a-z0-9-]{2,40}$/i.test(id)) return null;
  if (name.length === 0 || name.length > 80) return null;
  if (!/^[a-z0-9]{2,20}$/i.test(set)) return null;
  if (!(tier in TIER_RANK)) return null;
  if (price <= 0 || price > 100000) return null;

  return { id, name, set, price, tier };
}

function normalizeStoredStats(raw) {
  if (!raw || typeof raw !== 'object') return createEmptyStats();
  const totalPacks =
    typeof raw.totalPacks === 'number' &&
    Number.isInteger(raw.totalPacks) &&
    raw.totalPacks >= 0
      ? raw.totalPacks
      : 0;
  const totalHits =
    typeof raw.totalHits === 'number' &&
    Number.isInteger(raw.totalHits) &&
    raw.totalHits >= 0
      ? raw.totalHits
      : 0;

  const byBox = {};
  if (raw.byBox && typeof raw.byBox === 'object') {
    for (const [key, value] of Object.entries(raw.byBox)) {
      if (
        ALLOWED_BOX_IDS.has(key) &&
        typeof value === 'number' &&
        Number.isInteger(value) &&
        value >= 0
      ) {
        byBox[key] = value;
      }
    }
  }

  const updatedAt =
    typeof raw.updatedAt === 'number' && Number.isFinite(raw.updatedAt)
      ? raw.updatedAt
      : null;

  return {
    totalPacks,
    totalHits,
    topPull: sanitizeTopPull(raw.topPull),
    byBox,
    updatedAt,
  };
}

function isBetterTopPull(candidate, current) {
  if (!candidate) return false;
  if (!current) return true;
  if (candidate.price !== current.price) {
    return candidate.price > current.price;
  }
  return (TIER_RANK[candidate.tier] ?? 0) > (TIER_RANK[current.tier] ?? 0);
}

async function readStats(kv) {
  const raw = await kv.get(STATS_KEY, 'json');
  return normalizeStoredStats(raw);
}

async function hashClientKey(rawIp) {
  const bytes = new TextEncoder().encode(rawIp);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest).slice(0, 8))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function checkRateLimit(kv, request) {
  const clientIp =
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'unknown';
  if (clientIp === 'unknown') return true;

  const key = `${RATE_LIMIT_PREFIX}${await hashClientKey(clientIp)}`;
  const rawCount = await kv.get(key);
  const count = rawCount ? Number.parseInt(rawCount, 10) : 0;
  if (Number.isFinite(count) && count >= RATE_LIMIT_MAX_PER_MIN) {
    return false;
  }
  const nextCount = Number.isFinite(count) ? count + 1 : 1;
  await kv.put(key, String(nextCount), { expirationTtl: 60 });
  return true;
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: createResponseHeaders(request, false),
    });
  }

  if (
    request.method !== 'GET' &&
    request.method !== 'HEAD' &&
    request.method !== 'POST'
  ) {
    return jsonResponse(request, { error: 'method_not_allowed' }, 405);
  }

  const kv = env?.PACK_STATS_KV;
  if (!kv || typeof kv.get !== 'function' || typeof kv.put !== 'function') {
    return jsonResponse(
      request,
      {
        configured: false,
        ...createEmptyStats(),
      },
      200
    );
  }

  if (request.method === 'GET' || request.method === 'HEAD') {
    try {
      const stats = await readStats(kv);
      return jsonResponse(request, { configured: true, ...stats }, 200);
    } catch {
      return jsonResponse(
        request,
        { configured: true, ...createEmptyStats(), error: 'kv_read_failed' },
        502
      );
    }
  }

  const origin = request.headers.get('Origin');
  if (origin && !resolveCorsOrigin(origin)) {
    return jsonResponse(request, { error: 'forbidden_origin' }, 403);
  }

  try {
    const allowed = await checkRateLimit(kv, request);
    if (!allowed) {
      return jsonResponse(request, { error: 'rate_limited' }, 429);
    }

    const rawText = await request.text();
    if (!rawText || rawText.length > MAX_BODY_BYTES) {
      return jsonResponse(request, { error: 'invalid_payload_size' }, 400);
    }

    let body;
    try {
      body = JSON.parse(rawText);
    } catch {
      return jsonResponse(request, { error: 'invalid_json' }, 400);
    }

    if (!body || typeof body !== 'object') {
      return jsonResponse(request, { error: 'invalid_body' }, 400);
    }

    const boxId = typeof body.boxId === 'string' ? body.boxId.trim() : '';
    if (!ALLOWED_BOX_IDS.has(boxId)) {
      return jsonResponse(request, { error: 'invalid_box_id' }, 400);
    }

    const rawHits =
      typeof body.hits === 'number' && Number.isFinite(body.hits)
        ? Math.floor(body.hits)
        : 0;
    const hits = Math.max(0, Math.min(11, rawHits));
    const candidateTopPull = sanitizeTopPull(body.bestCard);

    const current = await readStats(kv);
    const nextStats = {
      totalPacks: current.totalPacks + 1,
      totalHits: current.totalHits + hits,
      topPull: isBetterTopPull(candidateTopPull, current.topPull)
        ? candidateTopPull
        : current.topPull,
      byBox: {
        ...current.byBox,
        [boxId]: (current.byBox[boxId] ?? 0) + 1,
      },
      updatedAt: Date.now(),
    };

    await kv.put(STATS_KEY, JSON.stringify(nextStats));
    return jsonResponse(request, { configured: true, ...nextStats }, 200);
  } catch {
    return jsonResponse(request, { error: 'kv_write_failed' }, 502);
  }
}
