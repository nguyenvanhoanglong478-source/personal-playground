import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  SIMULATED_LOFI_TRACKS,
  SpotifyTrackInfo,
  WORKSPACE_CONFIG,
} from '../data/workspace';

interface UseSpotifyStatusResult {
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

function readString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function readNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value)
    ? value
    : undefined;
}

function formatTimeLabel(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function clampProgressMs(rawProgressMs: number, durationMs?: number): number {
  const nonNegative = Math.max(0, Math.round(rawProgressMs));
  return durationMs !== undefined
    ? Math.min(durationMs, nonNegative)
    : nonNegative;
}

function parseEndpointSpotify(
  payload: unknown,
  prevTrack: SpotifyTrackInfo | null,
  receivedAtMs: number
): SpotifyTrackInfo | null {
  if (!isRecord(payload) || payload.configured === false) return null;

  const isPlaying = payload.isPlaying === true;
  const isPaused = payload.isPaused === true;
  const title = readString(payload.title);
  const rawProgressMs = readNumber(payload.progressMs);
  const rawDurationMs = readNumber(payload.durationMs);
  const startedAtMs = readNumber(payload.startedAtMs);
  const endsAtMs = readNumber(payload.endsAtMs);

  const durationMs =
    rawDurationMs && rawDurationMs > 0
      ? Math.round(rawDurationMs)
      : startedAtMs !== undefined &&
          endsAtMs !== undefined &&
          endsAtMs > startedAtMs
        ? endsAtMs - startedAtMs
        : undefined;

  if (isPlaying) {
    if (!title) return null;
    const progressMs =
      rawProgressMs !== undefined
        ? clampProgressMs(rawProgressMs, durationMs)
        : startedAtMs !== undefined
          ? clampProgressMs(receivedAtMs - startedAtMs, durationMs)
          : undefined;
    const effectiveStart =
      startedAtMs ??
      (progressMs !== undefined ? receivedAtMs - progressMs : undefined);
    const effectiveEnd =
      endsAtMs ??
      (effectiveStart !== undefined && durationMs !== undefined
        ? effectiveStart + durationMs
        : undefined);

    return {
      isPlaying: true,
      isPaused: false,
      isDemo: false,
      title,
      artist: readString(payload.artist) ?? 'Unknown Artist',
      album: readString(payload.album),
      albumArtUrl: readString(payload.albumArtUrl),
      trackUrl: readString(payload.trackUrl),
      progressMs,
      startedAtMs: effectiveStart,
      endsAtMs: effectiveEnd,
      durationMs,
    };
  }

  if (isPaused && title) {
    return {
      isPlaying: false,
      isPaused: true,
      isDemo: false,
      title,
      artist: readString(payload.artist) ?? 'Unknown Artist',
      album: readString(payload.album),
      albumArtUrl: readString(payload.albumArtUrl),
      trackUrl: readString(payload.trackUrl),
      progressMs: clampProgressMs(rawProgressMs ?? 0, durationMs),
      durationMs,
    };
  }

  if (prevTrack && isPaused) {
    const frozenMs =
      rawProgressMs !== undefined
        ? clampProgressMs(rawProgressMs, prevTrack.durationMs)
        : prevTrack.isPlaying && prevTrack.startedAtMs !== undefined
          ? clampProgressMs(
              receivedAtMs - prevTrack.startedAtMs,
              prevTrack.durationMs
            )
          : prevTrack.progressMs ?? 0;

    return {
      ...prevTrack,
      isPlaying: false,
      isPaused: true,
      isDemo: false,
      progressMs: frozenMs,
    };
  }

  return null;
}

export function useSpotifyStatus(enabled: boolean): UseSpotifyStatusResult {
  const spotifyEndpointUrl = WORKSPACE_CONFIG.spotifyEndpointUrl.trim();
  const [endpointConfigured, setEndpointConfigured] = useState<boolean | null>(
    null
  );
  const [liveTrack, setLiveTrack] = useState<SpotifyTrackInfo | null>(null);
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [demoState, setDemoState] = useState({ index: 0, startedAtMs: 0 });
  const [nowMs, setNowMs] = useState(() => Date.now());

  const demoActiveRef = useRef(isDemoActive);
  demoActiveRef.current = isDemoActive;

  const isConfigured =
    spotifyEndpointUrl.length > 0 && endpointConfigured !== false;

  const toggleDemo = useCallback(() => {
    if (demoActiveRef.current) {
      setIsDemoActive(false);
      return;
    }
    const now = Date.now();
    const totalTracks = Math.max(1, SIMULATED_LOFI_TRACKS.length);
    setDemoState((current) => ({
      index: current.startedAtMs > 0 ? (current.index + 1) % totalTracks : 0,
      startedAtMs: now,
    }));
    setNowMs(now);
    setIsDemoActive(true);
  }, []);

  useEffect(() => {
    if (!enabled || !spotifyEndpointUrl || isDemoActive) return;

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
      if (activeController && startedAt - lastFetchStartMs < 250) return;

      abortPending();
      const controller = new AbortController();
      activeController = controller;
      lastFetchStartMs = startedAt;

      const separator = spotifyEndpointUrl.includes('?') ? '&' : '?';
      try {
        const response = await fetch(
          `${spotifyEndpointUrl}${separator}_=${Date.now()}`,
          { signal: controller.signal, cache: 'no-store' }
        );
        if (!response.ok) return;

        const json: unknown = await response.json();
        if (disposed || controller.signal.aborted) return;

        if (isRecord(json) && typeof json.configured === 'boolean') {
          setEndpointConfigured(json.configured);
        }

        const fetchedAtMs = Date.now();
        setNowMs(fetchedAtMs);
        setLiveTrack((prev) => parseEndpointSpotify(json, prev, fetchedAtMs));
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
      pollTimerId = window.setInterval(
        () => void fetchStatus(),
        WORKSPACE_CONFIG.pollIntervalMs
      );
    };

    syncPolling();
    document.addEventListener('visibilitychange', syncPolling);
    window.addEventListener('focus', syncPolling);

    return () => {
      disposed = true;
      clearPollTimer();
      abortPending();
      document.removeEventListener('visibilitychange', syncPolling);
      window.removeEventListener('focus', syncPolling);
    };
  }, [enabled, isDemoActive, spotifyEndpointUrl]);

  const hasActivePlayback = isDemoActive || Boolean(liveTrack?.isPlaying);

  useEffect(() => {
    if (!enabled || !hasActivePlayback) return;

    let timerId: number | null = null;

    const stepTick = () => {
      if (document.visibilityState !== 'visible') return;
      const currentMs = Date.now();
      setNowMs(currentMs);

      if (isDemoActive && SIMULATED_LOFI_TRACKS.length > 0) {
        setDemoState((prev) => {
          const count = SIMULATED_LOFI_TRACKS.length;
          const durationMs =
            SIMULATED_LOFI_TRACKS[prev.index % count]?.durationMs ?? 180000;
          if (currentMs - prev.startedAtMs >= durationMs) {
            return { index: (prev.index + 1) % count, startedAtMs: currentMs };
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
      if (document.visibilityState !== 'visible') return;
      stepTick();
      timerId = window.setInterval(stepTick, 1000);
    };

    syncTicker();
    document.addEventListener('visibilitychange', syncTicker);
    return () => {
      if (timerId !== null) window.clearInterval(timerId);
      document.removeEventListener('visibilitychange', syncTicker);
    };
  }, [enabled, hasActivePlayback, isDemoActive]);

  const track = useMemo<SpotifyTrackInfo | null>(() => {
    if (isDemoActive && SIMULATED_LOFI_TRACKS.length > 0) {
      const base =
        SIMULATED_LOFI_TRACKS[demoState.index % SIMULATED_LOFI_TRACKS.length];
      const durationMs = base.durationMs ?? 180000;
      return {
        ...base,
        isPlaying: true,
        isPaused: false,
        isDemo: true,
        durationMs,
        startedAtMs: demoState.startedAtMs,
        endsAtMs: demoState.startedAtMs + durationMs,
      };
    }
    return liveTrack;
  }, [demoState.index, demoState.startedAtMs, isDemoActive, liveTrack]);

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
      const elapsedMs =
        track.isPlaying && track.startedAtMs !== undefined
          ? clampProgressMs(nowMs - track.startedAtMs, inferredDurationMs)
          : clampProgressMs(track.progressMs ?? 0, inferredDurationMs);
      elapsedLabel = formatTimeLabel(elapsedMs);
      progressRatio = Math.min(1, Math.max(0, elapsedMs / inferredDurationMs));
    } else if (track.progressMs !== undefined) {
      elapsedLabel = formatTimeLabel(Math.max(0, track.progressMs));
    }
  }

  return {
    track,
    progressRatio,
    elapsedLabel,
    durationLabel,
    isConfigured,
    isDemoActive,
    isPlaying: Boolean(track && track.isPlaying),
    isPaused: Boolean(track && !track.isPlaying && track.isPaused !== false),
    toggleDemo,
  };
}
