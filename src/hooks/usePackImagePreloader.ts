import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CardImageStage,
  PokemonCatalogCard,
  getCardImageUrl,
} from '../data/pokemonPack';

const MAX_CONCURRENT_PRELOADS = 2;

export function usePackImagePreloader() {
  const [imageStages, setImageStages] = useState<Record<string, CardImageStage>>(
    {}
  );
  const [loadedCardIds, setLoadedCardIds] = useState<Record<string, boolean>>(
    {}
  );

  const sessionRef = useRef<number>(0);
  const queueRef = useRef<PokemonCatalogCard[]>([]);
  const startedRef = useRef<Set<string>>(new Set());
  const inFlightRef = useRef<number>(0);
  const loadedIdsRef = useRef<Set<string>>(new Set());

  const advanceImageStage = useCallback((cardId: string) => {
    setImageStages((prev) => {
      const current = prev[cardId] ?? 'webp';
      if (current === 'fallback') return prev;
      return {
        ...prev,
        [cardId]: current === 'webp' ? 'direct' : 'fallback',
      };
    });
  }, []);

  const markCardLoaded = useCallback((cardId: string) => {
    if (loadedIdsRef.current.has(cardId)) return;
    loadedIdsRef.current.add(cardId);
    setLoadedCardIds((prev) =>
      prev[cardId] ? prev : { ...prev, [cardId]: true }
    );
  }, []);

  const cancelPackPreload = useCallback(() => {
    sessionRef.current += 1;
    queueRef.current = [];
    startedRef.current.clear();
    inFlightRef.current = 0;
  }, []);

  const pumpQueue = useCallback(
    (sessionId: number) => {
      while (
        sessionRef.current === sessionId &&
        inFlightRef.current < MAX_CONCURRENT_PRELOADS &&
        queueRef.current.length > 0
      ) {
        const nextCard = queueRef.current.shift();
        if (!nextCard) break;
        if (
          loadedIdsRef.current.has(nextCard.id) ||
          startedRef.current.has(nextCard.id)
        ) {
          continue;
        }
        startedRef.current.add(nextCard.id);
        inFlightRef.current += 1;

        const finishSlot = () => {
          if (sessionRef.current !== sessionId) return;
          inFlightRef.current = Math.max(0, inFlightRef.current - 1);
          pumpQueue(sessionId);
        };

        const loadUrl = (useDirect: boolean) => {
          const img = new Image();
          img.decoding = 'async';
          img.onload = () => {
            if (sessionRef.current !== sessionId) return;
            markCardLoaded(nextCard.id);
            if (typeof img.decode === 'function') {
              img.decode().catch(() => undefined);
            }
            finishSlot();
          };
          img.onerror = () => {
            if (sessionRef.current !== sessionId) return;
            if (!useDirect) {
              advanceImageStage(nextCard.id);
              loadUrl(true);
            } else {
              advanceImageStage(nextCard.id);
              finishSlot();
            }
          };
          img.src = getCardImageUrl(nextCard, 'card', useDirect);
        };

        loadUrl(false);
      }
    },
    [advanceImageStage, markCardLoaded]
  );

  const preloadPackImages = useCallback(
    (cards: PokemonCatalogCard[]) => {
      cancelPackPreload();
      queueRef.current = [...cards];
      pumpQueue(sessionRef.current);
    },
    [cancelPackPreload, pumpQueue]
  );

  const prioritizeCards = useCallback(
    (cards: PokemonCatalogCard[]) => {
      if (cards.length === 0) return;
      const priorityIds = new Set(cards.map((c) => c.id));
      const rest = queueRef.current.filter((c) => !priorityIds.has(c.id));
      const pending = cards.filter(
        (c) =>
          !loadedIdsRef.current.has(c.id) && !startedRef.current.has(c.id)
      );
      queueRef.current = [...pending, ...rest];
      pumpQueue(sessionRef.current);
    },
    [pumpQueue]
  );

  useEffect(() => cancelPackPreload, [cancelPackPreload]);

  return {
    imageStages,
    loadedCardIds,
    advanceImageStage,
    markCardLoaded,
    preloadPackImages,
    prioritizeCards,
    cancelPackPreload,
  };
}
