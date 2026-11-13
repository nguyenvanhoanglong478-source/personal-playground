import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  SIMULATED_LOFI_TRACKS,
  SpotifyTrackInfo,
  WORKSPACE_CONFIG,
} from '../data/workspace';

export interface UseSpotifyStatusResult {
  track: SpotifyTrackInfo | null;
  progressRatio: number;
  elapsedLabel: string;
  durationLabel: string;
  isConfigured: boolean;
  isDemoActive: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  toggleDemo: () => void;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readNonEmptyString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function readFiniteNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value)
    ? value
    : undefined;
}

function readBooleanFromSources(
  primary: Record<string, unknown>,
  fallback: Record<string, unknown>,
  keys: string[]
): boolean | undefined {
  for (const obj of [primary, fallback]) {
    for (const key of keys) {
      const value = obj[key];
      if (typeof value === 'boolean') {
        return value;
      }
    }
  }
  return undefined;
}

function readNumberFromSources(
  primary: Record<string, unknown>,
  fallback: Record<string, unknown>,
  keys: string[]
): number | undefined {
  for (const obj of [primary, fallback]) {
    for (const key of keys) {
      const num = readFiniteNumber(obj[key]);
      if (num !== undefined) {
        return num;
      }
    }
  }
  return undefined;
}

function appendCacheBuster(url: string): string {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}_=${Date.now()}`;
}

function formatTimeLabel(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function clampProgressMs(rawProgressMs: number, durationMs?: number): number {
  const nonNegative = Math.max(0, Math.round(rawProgressMs));
  return durationMs !== undefined ? Math.min(durationMs, nonNegative) : nonNegative;
}

function parseLanyardSpotify(payload: unknown): SpotifyTrackInfo | null {
  if (!isRecord(payload)) return null;
  const data = isRecord(payload.data) ? payload.data : null;
  const spotify = data && isRecord(data.spotify) ? data.spotify : null;
  if (!spotify) return null;

  const title = readNonEmptyString(spotify.song);
  if (!title) return null;

  const rawArtist = readNonEmptyString(spotify.artist) ?? 'Unknown Artist';
  const artist = rawArtist
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .join(', ');
  const album = readNonEmptyString(spotify.album);
  const albumArtUrl = readNonEmptyString(spotify.album_art_url);
  const trackId = readNonEmptyString(spotify.track_id);
  const trackUrl = trackId
    ? `https://open.spotify.com/track/${encodeURIComponent(trackId)}`
    : undefined;

  const timestamps = isRecord(spotify.timestamps) ? spotify.timestamps : null;
  const startedAtMs = timestamps
    ? readFiniteNumber(timestamps.start)
    : undefined;
  const endsAtMs = timestamps ? readFiniteNumber(timestamps.end) : undefined;
  const durationMs =
    startedAtMs !== undefined &&
    endsAtMs !== undefined &&
    endsAtMs > startedAtMs
      ? endsAtMs - startedAtMs
      : undefined;

  return {
    isPlaying: true,
    isPaused: false,
    isDemo: false,
    title,
    artist,
    album,
    albumArtUrl,
    trackUrl,
    startedAtMs,
    endsAtMs,
    durationMs,
  };
}

function parseEndpointSpotify(
  payload: unknown,
  prevTrack: SpotifyTrackInfo | null,
  receivedAtMs: number
): SpotifyTrackInfo | null {
  if (!isRecord(payload)) return null;
  if (payload.configured === false) return null;

  const trackRecord =
    'track' in payload && isRecord(payload.track) ? payload.track : null;
  const source = trackRecord ?? payload;

  const rawIsPlaying = readBooleanFromSources(source, payload, [
    'isPlaying',
    'is_playing',
    'playing',
  ]);
  const rawIsPaused = readBooleanFromSources(source, payload, [
    'isPaused',
    'is_paused',
    'paused',
  ]);
  const title = readNonEmptyString(source.title);

  const rawProgressMs = readNumberFromSources(source, payload, [
    'progressMs',
    'progress_ms',
  ]);
  const rawDurationMs = readNumberFromSources(source, payload, [
    'durationMs',
    'duration_ms',
  ]);
  const startedAtMs = readFiniteNumber(source.startedAtMs);
  const endsAtMs = readFiniteNumber(source.endsAtMs);

  const explicitDurationMs =
    rawDurationMs !== undefined && rawDurationMs > 0
      ? Math.round(rawDurationMs)
      : undefined;
  const durationMs =
    explicitDurationMs ??
    (startedAtMs !== undefined &&
    endsAtMs !== undefined &&
    endsAtMs > startedAtMs
      ? endsAtMs - startedAtMs
      : undefined);

  if (rawIsPlaying === true) {
    if (!title) return null;

    const artist = readNonEmptyString(source.artist) ?? 'Unknown Artist';
    const album = readNonEmptyString(source.album);
    const albumArtUrl = readNonEmptyString(source.albumArtUrl);
    const trackUrl = readNonEmptyString(source.trackUrl);

    const progressMs =
      rawProgressMs !== undefined
        ? clampProgressMs(rawProgressMs, durationMs)
        : startedAtMs !== undefined
          ? clampProgressMs(receivedAtMs - startedAtMs, durationMs)
          : undefined;

    const effectiveStartedAtMs =
      startedAtMs ??
      (progressMs !== undefined ? receivedAtMs - progressMs : undefined);
    const effectiveEndsAtMs =
      endsAtMs ??
      (effectiveStartedAtMs !== undefined && durationMs !== undefined
        ? effectiveStartedAtMs + durationMs
        : undefined);

    return {
      isPlaying: true,
      isPaused: false,
      isDemo: false,
      title,
      artist,
      album,
      albumArtUrl,
      trackUrl,
      progressMs,
      startedAtMs: effectiveStartedAtMs,
      endsAtMs: effectiveEndsAtMs,
      durationMs,
    };
  }

  if (rawIsPlaying === false || rawIsPaused === true) {
    if (title) {
      const artist = readNonEmptyString(source.artist) ?? 'Unknown Artist';
      const album = readNonEmptyString(source.album);
      const albumArtUrl = readNonEmptyString(source.albumArtUrl);
      const trackUrl = readNonEmptyString(source.trackUrl);
      const progressMs = clampProgressMs(rawProgressMs ?? 0, durationMs);

      return {
        isPlaying: false,
        isPaused: true,
        isDemo: false,
        title,
        artist,
        album,
        albumArtUrl,
        trackUrl,
        progressMs,
        durationMs,
      };
    }

    if (prevTrack && rawIsPaused !== false) {
      const prevDurationMs = prevTrack.durationMs;
      let frozenProgressMs = prevTrack.progressMs ?? 0;

      if (rawProgressMs !== undefined) {
        frozenProgressMs = clampProgressMs(rawProgressMs, prevDurationMs);
      } else if (prevTrack.isPlaying && prevTrack.startedAtMs !== undefined) {
        frozenProgressMs = clampProgressMs(
          receivedAtMs - prevTrack.startedAtMs,
          prevDurationMs
        );
      }

      return {
        isPlaying: false,
        isPaused: true,
        isDemo: false,
        title: prevTrack.title,
        artist: prevTrack.artist,
        album: prevTrack.album,
        albumArtUrl: prevTrack.albumArtUrl,
        trackUrl: prevTrack.trackUrl,
        progressMs: frozenProgressMs,
        durationMs: prevDurationMs,
      };
    }

    return null;
  }

  return null;
}

function readEndpointConfiguredFlag(payload: unknown): boolean | null {
  if (!isRecord(payload)) return null;
  return typeof payload.configured === 'boolean' ? payload.configured : null;
}

export function useSpotifyStatus(enabled: boolean): UseSpotifyStatusResult {
  const lanyardUserId = WORKSPACE_CONFIG.lanyardUserId.trim();
  const spotifyEndpointUrl = WORKSPACE_CONFIG.spotifyEndpointUrl.trim();
  const hasConnectionTarget =
    lanyardUserId.length > 0 || spotifyEndpointUrl.length > 0;

  const [endpointConfigured, setEndpointConfigured] = useState<boolean | null>(
    null
  );
  const [liveTrack, setLiveTrack] = useState<SpotifyTrackInfo | null>(null);
  const isConfigured =
    lanyardUserId.length > 0 ||
    (spotifyEndpointUrl.length > 0 && endpointConfigured !== false);
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [demoState, setDemoState] = useState<{
    index: number;
    startedAtMs: number;
  }>({
    index: 0,
    startedAtMs: 0,
  });
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  const demoActiveRef = useRef(isDemoActive);
  demoActiveRef.current = isDemoActive;

  const toggleDemo = useCallback(() => {
    if (demoActiveRef.current) {
      setIsDemoActive(false);
      return;
    }
    const now = Date.now();
    const totalTracks = Math.max(1, SIMULATED_LOFI_TRACKS.length);
    setDemoState((current) => ({
      index:
        current.startedAtMs > 0
          ? (current.index + 1) % totalTracks
          : 0,
      startedAtMs: now,
    }));
    setNowMs(now);
    setIsDemoActive(true);
  }, []);

  useEffect(() => {
    if (!enabled || !hasConnectionTarget || isDemoActive) return;

    let disposed = false;
    let pollTimerId: number | null = null;
    let activeController: AbortController | null = null;
    let lastFetchStartMs = 0;

    const clearPollTimer = () => {
      if (pollTimerId !== null) {
        window.clearInterval(pollTimerId);
        pollTimerId = null;
      }
    };

    const abortPending = () => {
      if (activeController) {
        activeController.abort();
        activeController = null;
      }
    };

    const fetchStatus = async () => {
      if (
        disposed ||
        typeof document === 'undefined' ||
        document.visibilityState !== 'visible'
      ) {
        return;
      }

      const startedAt = Date.now();
      if (activeController && startedAt - lastFetchStartMs < 250) {
        return;
      }

      abortPending();
      const controller = new AbortController();
      activeController = controller;
      lastFetchStartMs = startedAt;

      const targetUrl = lanyardUserId
        ? `https://api.lanyard.rest/v1/users/${encodeURIComponent(lanyardUserId)}`
        : appendCacheBuster(spotifyEndpointUrl);

      try {
        const response = await fetch(targetUrl, {
          signal: controller.signal,
          cache: 'no-store',
        });
        if (!response.ok) return;

        const json: unknown = await response.json();
        if (disposed || controller.signal.aborted) return;

        if (!lanyardUserId) {
          const configuredFlag = readEndpointConfiguredFlag(json);
          if (configuredFlag !== null) {
            setEndpointConfigured(configuredFlag);
          }
        }

        const fetchedAtMs = Date.now();
        setNowMs(fetchedAtMs);
        setLiveTrack((prevTrack) =>
          lanyardUserId
            ? parseLanyardSpotify(json)
            : parseEndpointSpotify(json, prevTrack, fetchedAtMs)
        );
      } catch {
        return;
      } finally {
        if (activeController === controller) {
          activeController = null;
        }
      }
    };

    const syncPolling = () => {
      clearPollTimer();
      if (
        disposed ||
        typeof document === 'undefined' ||
        document.visibilityState !== 'visible'
      ) {
        return;
      }
      void fetchStatus();
      pollTimerId = window.setInterval(() => {
        void fetchStatus();
      }, WORKSPACE_CONFIG.pollIntervalMs);
    };

    const handleWindowFocus = () => {
      syncPolling();
    };

    syncPolling();
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', syncPolling);
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', handleWindowFocus);
    }

    return () => {
      disposed = true;
      clearPollTimer();
      abortPending();
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', syncPolling);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('focus', handleWindowFocus);
      }
    };
  }, [
    enabled,
    hasConnectionTarget,
    isDemoActive,
    lanyardUserId,
    spotifyEndpointUrl,
  ]);

  const hasActivePlayback = isDemoActive || Boolean(liveTrack?.isPlaying);

  useEffect(() => {
    if (!enabled || !hasActivePlayback) return;

    let timerId: number | null = null;

    const stepTick = () => {
      if (
        typeof document !== 'undefined' &&
        document.visibilityState !== 'visible'
      ) {
        return;
      }

      const currentMs = Date.now();
      setNowMs(currentMs);

      if (isDemoActive && SIMULATED_LOFI_TRACKS.length > 0) {
        setDemoState((prev) => {
          const trackCount = SIMULATED_LOFI_TRACKS.length;
          const currentTrack = SIMULATED_LOFI_TRACKS[prev.index % trackCount];
          const durationMs = currentTrack?.durationMs ?? 180000;
          if (currentMs - prev.startedAtMs >= durationMs) {
            return {
              index: (prev.index + 1) % trackCount,
              startedAtMs: currentMs,
            };
          }
          return prev;
        });
      }
    };

    const syncTicker = () => {
      if (timerId !== null) {
        window.clearInterval(timerId);
        timerId = null;
      }
      if (
        typeof document !== 'undefined' &&
        document.visibilityState !== 'visible'
      ) {
        return;
      }
      stepTick();
      timerId = window.setInterval(stepTick, 1000);
    };

    syncTicker();
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', syncTicker);
    }

    return () => {
      if (timerId !== null) {
        window.clearInterval(timerId);
      }
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', syncTicker);
      }
    };
  }, [enabled, hasActivePlayback, isDemoActive]);

  const track = useMemo<SpotifyTrackInfo | null>(() => {
    if (isDemoActive && SIMULATED_LOFI_TRACKS.length > 0) {
      const baseTrack =
        SIMULATED_LOFI_TRACKS[demoState.index % SIMULATED_LOFI_TRACKS.length];
      const durationMs = baseTrack.durationMs ?? 180000;
      return {
        ...baseTrack,
        isPlaying: true,
        isPaused: false,
        isDemo: true,
        durationMs,
        startedAtMs: demoState.startedAtMs,
        endsAtMs: demoState.startedAtMs + durationMs,
      };
    }
    return liveTrack;
  }, [isDemoActive, demoState.index, demoState.startedAtMs, liveTrack]);

  let progressRatio = 0;
  let elapsedLabel = '00:00';
  let durationLabel = '00:00';

  if (track) {
    const inferredDurationMs =
      track.durationMs ??
      (track.startedAtMs !== undefined &&
      track.endsAtMs !== undefined &&
      track.endsAtMs > track.startedAtMs
        ? track.endsAtMs - track.startedAtMs
        : 0);

    if (inferredDurationMs > 0) {
      durationLabel = formatTimeLabel(inferredDurationMs);
      if (!track.isPlaying && track.progressMs !== undefined) {
        const frozenMs = clampProgressMs(track.progressMs, inferredDurationMs);
        elapsedLabel = formatTimeLabel(frozenMs);
        progressRatio = Math.min(1, Math.max(0, frozenMs / inferredDurationMs));
      } else if (track.isPlaying && track.startedAtMs !== undefined) {
        const elapsedMs = clampProgressMs(
          nowMs - track.startedAtMs,
          inferredDurationMs
        );
        elapsedLabel = formatTimeLabel(elapsedMs);
        progressRatio = Math.min(1, Math.max(0, elapsedMs / inferredDurationMs));
      } else if (track.progressMs !== undefined) {
        const frozenMs = clampProgressMs(track.progressMs, inferredDurationMs);
        elapsedLabel = formatTimeLabel(frozenMs);
        progressRatio = Math.min(1, Math.max(0, frozenMs / inferredDurationMs));
      }
    } else if (track.progressMs !== undefined) {
      elapsedLabel = formatTimeLabel(Math.max(0, track.progressMs));
    }
  }

  const isPlaying = Boolean(track && track.isPlaying);
  const isPaused = Boolean(track && !track.isPlaying && track.isPaused !== false);

  return {
    track,
    progressRatio,
    elapsedLabel,
    durationLabel,
    isConfigured,
    isDemoActive,
    isPlaying,
    isPaused,
    toggleDemo,
  };
}
