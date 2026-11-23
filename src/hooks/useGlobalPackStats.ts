import { useCallback, useEffect, useRef, useState } from 'react';
import { BoxThemeId, PokemonCardTier } from '../data/pokemonPack';

export interface GlobalTopPull {
  id: string;
  name: string;
  set: string;
  price: number;
  tier: PokemonCardTier;
}

export interface GlobalPackStats {
  configured: boolean;
  totalPacks: number;
  totalHits: number;
  topPull: GlobalTopPull | null;
}

export interface RecordPackPayload {
  boxId: BoxThemeId;
  hits: number;
  bestCard?: GlobalTopPull | null;
}

const PROD_PACK_STATS_ENDPOINT = 'https://longhoang.pages.dev/api/pack-stats';

function resolvePackStatsEndpoint(): string | null {
  if (typeof window === 'undefined') return null;
  const { hostname, protocol } = window.location;
  if (
    hostname === 'longhoang.pages.dev' ||
    hostname.endsWith('.longhoang.pages.dev')
  ) {
    return '/api/pack-stats';
  }
  if (hostname.endsWith('.github.io')) {
    return PROD_PACK_STATS_ENDPOINT;
  }
  if (
    protocol === 'http:' &&
    (hostname === 'localhost' || hostname === '127.0.0.1')
  ) {
    return '/api/pack-stats';
  }
  return PROD_PACK_STATS_ENDPOINT;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseTopPull(raw: unknown): GlobalTopPull | null {
  if (!isRecord(raw)) return null;
  const id = typeof raw.id === 'string' ? raw.id : '';
  const name = typeof raw.name === 'string' ? raw.name : '';
  const set = typeof raw.set === 'string' ? raw.set : '';
  const tier = typeof raw.tier === 'string' ? raw.tier : '';
  const price =
    typeof raw.price === 'number' && Number.isFinite(raw.price) ? raw.price : 0;

  if (
    !id ||
    !name ||
    !set ||
    price <= 0 ||
    (tier !== 'common' &&
      tier !== 'uncommon' &&
      tier !== 'rare' &&
      tier !== 'ultra' &&
      tier !== 'secret')
  ) {
    return null;
  }

  return { id, name, set, price, tier };
}

function parseStatsPayload(raw: unknown): GlobalPackStats | null {
  if (!isRecord(raw)) return null;
  if (raw.configured !== true) {
    return {
      configured: false,
      totalPacks: 0,
      totalHits: 0,
      topPull: null,
    };
  }
  const totalPacks =
    typeof raw.totalPacks === 'number' &&
    Number.isFinite(raw.totalPacks) &&
    raw.totalPacks >= 0
      ? Math.floor(raw.totalPacks)
      : 0;
  const totalHits =
    typeof raw.totalHits === 'number' &&
    Number.isFinite(raw.totalHits) &&
    raw.totalHits >= 0
      ? Math.floor(raw.totalHits)
      : 0;
  return {
    configured: true,
    totalPacks,
    totalHits,
    topPull: parseTopPull(raw.topPull),
  };
}

export function useGlobalPackStats() {
  const [stats, setStats] = useState<GlobalPackStats>({
    configured: false,
    totalPacks: 0,
    totalHits: 0,
    topPull: null,
  });

  const pendingTopPullRef = useRef<GlobalTopPull | null>(null);
  const holdTopPullRef = useRef<boolean>(false);

  useEffect(() => {
    const endpoint = resolvePackStatsEndpoint();
    if (!endpoint) return;

    const controller = new AbortController();
    fetch(endpoint, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((json: unknown) => {
        if (controller.signal.aborted) return;
        const parsed = parseStatsPayload(json);
        if (parsed) {
          setStats(parsed);
        }
      })
      .catch(() => undefined);

    return () => {
      controller.abort();
    };
  }, []);

  const recordPackOpened = useCallback((payload: RecordPackPayload) => {
    const endpoint = resolvePackStatsEndpoint();
    if (!endpoint) return;

    holdTopPullRef.current = true;
    setStats((prev) =>
      prev.configured
        ? {
            ...prev,
            totalPacks: prev.totalPacks + 1,
            totalHits: prev.totalHits + Math.max(0, payload.hits),
          }
        : prev
    );

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((json: unknown) => {
        const parsed = parseStatsPayload(json);
        if (!parsed || !parsed.configured) return;
        setStats((prev) => {
          if (holdTopPullRef.current) {
            pendingTopPullRef.current = parsed.topPull;
            return {
              ...parsed,
              topPull: prev.topPull,
            };
          }
          return parsed;
        });
      })
      .catch(() => undefined);
  }, []);

  const revealPendingTopPull = useCallback(() => {
    holdTopPullRef.current = false;
    const pending = pendingTopPullRef.current;
    if (!pending) return;
    pendingTopPullRef.current = null;
    setStats((prev) => ({
      ...prev,
      topPull: pending,
    }));
  }, []);

  return {
    stats,
    recordPackOpened,
    revealPendingTopPull,
  };
}
