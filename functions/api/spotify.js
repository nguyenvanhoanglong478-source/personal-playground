const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode';

const ALLOWED_EXACT_ORIGINS = new Set([
  'https://longhoang.pages.dev',
  'https://nguyenvanhoanglong478-source.github.io',
]);

const PREVIEW_ORIGIN_PATTERN = /^https:\/\/[a-z0-9-]+\.longhoang\.pages\.dev$/;
const LOCAL_ORIGIN_PATTERN = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

/**
 * Validate whether an incoming Origin header is permitted to call this endpoint.
 * @param {string | null} origin
 * @returns {string | null}
 */
function resolveCorsOrigin(origin) {
  if (!origin) return null;
  if (ALLOWED_EXACT_ORIGINS.has(origin)) return origin;
  if (PREVIEW_ORIGIN_PATTERN.test(origin)) return origin;
  if (LOCAL_ORIGIN_PATTERN.test(origin)) return origin;
  return null;
}

/**
 * Build standard no-store + CORS headers for API responses.
 * @param {Request} request
 * @param {boolean} includeJsonContentType
 * @returns {Headers}
 */
function createResponseHeaders(request, includeJsonContentType = true) {
  const headers = new Headers({
    'Cache-Control': 'no-store, max-age=0',
    Vary: 'Origin',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
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

/**
 * Serialize a JSON response with CORS and no-cache headers.
 * @param {Request} request
 * @param {Record<string, unknown>} payload
 * @param {number} status
 * @returns {Response}
 */
function jsonResponse(request, payload, status = 200) {
  const headers = createResponseHeaders(request, true);
  if (request.method === 'HEAD') {
    return new Response(null, { status, headers });
  }
  return new Response(JSON.stringify(payload), { status, headers });
}

function readTrimmedString(value) {
  if (typeof value !== 'string') return '';
  return value.trim();
}

function encodeBasicCredentials(clientId, clientSecret) {
  const bytes = new TextEncoder().encode(`${clientId}:${clientSecret}`);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Exchange the stored Spotify OAuth refresh token for a short-lived access token.
 * @param {string} clientId
 * @param {string} clientSecret
 * @param {string} refreshToken
 * @returns {Promise<{ ok: true; accessToken: string } | { ok: false; status: number }>}
 */
async function fetchSpotifyAccessToken(clientId, clientSecret, refreshToken) {
  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodeBasicCredentials(clientId, clientSecret)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }).toString(),
  });

  if (!response.ok) {
    return { ok: false, status: response.status };
  }

  const data = await response.json();
  const accessToken = readTrimmedString(data?.access_token);
  if (!accessToken) {
    return { ok: false, status: 502 };
  }

  return { ok: true, accessToken };
}

function pickAlbumArtUrl(images) {
  if (!Array.isArray(images) || images.length === 0) return undefined;
  const preferred = images[1]?.url ?? images[0]?.url;
  const trimmed = readTrimmedString(preferred);
  return trimmed || undefined;
}

/**
 * Map Spotify `/v1/me/player/currently-playing` payload into `SpotifyTrackInfo`.
 * @param {unknown} payload
 * @param {number} fetchedAtMs
 * @returns {Record<string, unknown>}
 */
function normalizeSpotifyPlayback(payload, fetchedAtMs) {
  if (!payload || typeof payload !== 'object') {
    return { isPlaying: false, isPaused: false, configured: true };
  }

  const record = /** @type {Record<string, any>} */ (payload);
  const item =
    record.item && typeof record.item === 'object' ? record.item : null;

  if (!item) {
    return { isPlaying: false, isPaused: false, configured: true };
  }

  const title = readTrimmedString(item.name);
  if (!title) {
    return { isPlaying: false, isPaused: false, configured: true };
  }

  const isEpisode = item.type === 'episode' || Boolean(item.show);
  const artist = isEpisode
    ? readTrimmedString(item.show?.publisher) ||
      readTrimmedString(item.show?.name) ||
      'Podcast'
    : (Array.isArray(item.artists)
        ? item.artists
            .map((entry) => readTrimmedString(entry?.name))
            .filter(Boolean)
            .join(', ')
        : '') || 'Unknown Artist';

  const album = isEpisode
    ? readTrimmedString(item.show?.name) || undefined
    : readTrimmedString(item.album?.name) || undefined;

  const albumArtUrl = isEpisode
    ? pickAlbumArtUrl(item.images) ?? pickAlbumArtUrl(item.show?.images)
    : pickAlbumArtUrl(item.album?.images);

  const trackUrl = readTrimmedString(item.external_urls?.spotify) || undefined;

  const rawDurationMs =
    typeof item.duration_ms === 'number' && Number.isFinite(item.duration_ms)
      ? Math.max(0, Math.round(item.duration_ms))
      : undefined;
  const durationMs =
    rawDurationMs && rawDurationMs > 0 ? rawDurationMs : undefined;

  const rawProgressMs =
    typeof record.progress_ms === 'number' && Number.isFinite(record.progress_ms)
      ? Math.max(0, Math.round(record.progress_ms))
      : 0;
  const progressMs =
    durationMs !== undefined ? Math.min(durationMs, rawProgressMs) : rawProgressMs;

  if (record.is_playing !== true) {
    return {
      isPlaying: false,
      isPaused: true,
      configured: true,
      title,
      artist,
      ...(album ? { album } : {}),
      ...(albumArtUrl ? { albumArtUrl } : {}),
      ...(trackUrl ? { trackUrl } : {}),
      progressMs,
      ...(durationMs !== undefined ? { durationMs } : {}),
    };
  }

  const startedAtMs = fetchedAtMs - progressMs;
  const endsAtMs =
    durationMs !== undefined ? startedAtMs + durationMs : undefined;

  return {
    isPlaying: true,
    isPaused: false,
    configured: true,
    title,
    artist,
    ...(album ? { album } : {}),
    ...(albumArtUrl ? { albumArtUrl } : {}),
    ...(trackUrl ? { trackUrl } : {}),
    progressMs,
    startedAtMs,
    ...(endsAtMs !== undefined ? { endsAtMs } : {}),
    ...(durationMs !== undefined ? { durationMs } : {}),
  };
}

/**
 * Cloudflare Pages Function entrypoint for `GET /api/spotify`.
 * Reads Spotify secrets from `context.env` without exposing credentials to browsers.
 * @param {{ request: Request; env: Record<string, unknown> }} context
 * @returns {Promise<Response>}
 */
export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: createResponseHeaders(request, false),
    });
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return jsonResponse(
      request,
      { isPlaying: false, isPaused: false, error: 'method_not_allowed' },
      405
    );
  }

  const clientId = readTrimmedString(env?.SPOTIFY_CLIENT_ID);
  const clientSecret = readTrimmedString(env?.SPOTIFY_CLIENT_SECRET);
  const refreshToken = readTrimmedString(env?.SPOTIFY_REFRESH_TOKEN);

  if (!clientId || !clientSecret || !refreshToken) {
    return jsonResponse(
      request,
      { isPlaying: false, isPaused: false, configured: false },
      200
    );
  }

  try {
    const tokenResult = await fetchSpotifyAccessToken(
      clientId,
      clientSecret,
      refreshToken
    );

    if (!tokenResult.ok) {
      return jsonResponse(
        request,
        {
          isPlaying: false,
          isPaused: false,
          configured: true,
          error: 'spotify_token_error',
          upstreamStatus: tokenResult.status,
        },
        502
      );
    }

    const playbackResponse = await fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenResult.accessToken}`,
      },
    });

    if (playbackResponse.status === 204) {
      return jsonResponse(
        request,
        { isPlaying: false, isPaused: false, configured: true },
        200
      );
    }

    if (!playbackResponse.ok) {
      return jsonResponse(
        request,
        {
          isPlaying: false,
          isPaused: false,
          configured: true,
          error: 'spotify_api_error',
          upstreamStatus: playbackResponse.status,
        },
        502
      );
    }

    const rawBody = await playbackResponse.text();
    if (!rawBody) {
      return jsonResponse(
        request,
        { isPlaying: false, isPaused: false, configured: true },
        200
      );
    }

    const playbackJson = JSON.parse(rawBody);
    const normalized = normalizeSpotifyPlayback(playbackJson, Date.now());
    return jsonResponse(request, normalized, 200);
  } catch {
    return jsonResponse(
      request,
      {
        isPlaying: false,
        isPaused: false,
        configured: true,
        error: 'upstream_unreachable',
      },
      502
    );
  }
}
