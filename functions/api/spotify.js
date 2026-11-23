import { jsonResponse, preflightResponse } from '../../lib/cfHttp.js';

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode';
const ALLOWED_METHODS = 'GET, HEAD, OPTIONS';

function readTrimmedString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function encodeBasicCredentials(clientId, clientSecret) {
  const bytes = new TextEncoder().encode(`${clientId}:${clientSecret}`);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

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
  return readTrimmedString(images[1]?.url ?? images[0]?.url) || undefined;
}

function normalizeSpotifyPlayback(payload, fetchedAtMs) {
  const idle = { isPlaying: false, isPaused: false, configured: true };
  if (!payload || typeof payload !== 'object') return idle;

  const item =
    payload.item && typeof payload.item === 'object' ? payload.item : null;
  const title = readTrimmedString(item?.name);
  if (!item || !title) return idle;

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
      : 0;
  const durationMs = rawDurationMs > 0 ? rawDurationMs : undefined;

  const rawProgressMs =
    typeof payload.progress_ms === 'number' &&
    Number.isFinite(payload.progress_ms)
      ? Math.max(0, Math.round(payload.progress_ms))
      : 0;
  const progressMs =
    durationMs !== undefined ? Math.min(durationMs, rawProgressMs) : rawProgressMs;

  const shared = {
    configured: true,
    title,
    artist,
    ...(album ? { album } : {}),
    ...(albumArtUrl ? { albumArtUrl } : {}),
    ...(trackUrl ? { trackUrl } : {}),
    progressMs,
    ...(durationMs !== undefined ? { durationMs } : {}),
  };

  if (payload.is_playing !== true) {
    return { isPlaying: false, isPaused: true, ...shared };
  }

  const startedAtMs = fetchedAtMs - progressMs;
  return {
    isPlaying: true,
    isPaused: false,
    ...shared,
    startedAtMs,
    ...(durationMs !== undefined ? { endsAtMs: startedAtMs + durationMs } : {}),
  };
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return preflightResponse(request, ALLOWED_METHODS);
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return jsonResponse(
      request,
      { isPlaying: false, isPaused: false, error: 'method_not_allowed' },
      405,
      ALLOWED_METHODS
    );
  }

  const clientId = readTrimmedString(env?.SPOTIFY_CLIENT_ID);
  const clientSecret = readTrimmedString(env?.SPOTIFY_CLIENT_SECRET);
  const refreshToken = readTrimmedString(env?.SPOTIFY_REFRESH_TOKEN);

  if (!clientId || !clientSecret || !refreshToken) {
    return jsonResponse(
      request,
      { isPlaying: false, isPaused: false, configured: false },
      200,
      ALLOWED_METHODS
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
        502,
        ALLOWED_METHODS
      );
    }

    const playbackResponse = await fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${tokenResult.accessToken}` },
    });

    if (playbackResponse.status === 204) {
      return jsonResponse(
        request,
        { isPlaying: false, isPaused: false, configured: true },
        200,
        ALLOWED_METHODS
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
        502,
        ALLOWED_METHODS
      );
    }

    const rawBody = await playbackResponse.text();
    if (!rawBody) {
      return jsonResponse(
        request,
        { isPlaying: false, isPaused: false, configured: true },
        200,
        ALLOWED_METHODS
      );
    }

    return jsonResponse(
      request,
      normalizeSpotifyPlayback(JSON.parse(rawBody), Date.now()),
      200,
      ALLOWED_METHODS
    );
  } catch {
    return jsonResponse(
      request,
      {
        isPlaying: false,
        isPaused: false,
        configured: true,
        error: 'upstream_unreachable',
      },
      502,
      ALLOWED_METHODS
    );
  }
}
