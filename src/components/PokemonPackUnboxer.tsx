import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  Eye,
  Globe,
  PackageOpen,
  RotateCcw,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  ZoomIn,
} from 'lucide-react';
import { Locale } from '../data/profile';
import {
  BOOSTER_BOX_OPTIONS,
  BoxThemeId,
  CardImageStage,
  FOIL_STYLE_LABELS,
  PACKS_PER_BOX,
  POKEMON_CARD_BACK_URL,
  POKEMON_CHEST_BACK_URL,
  POKEMON_UNBOXER_LABELS,
  PokemonCatalogCard,
  PokemonCatalogData,
  SavedBoxState,
  TIER_LABELS,
  TIER_ORDER,
  formatCardPrice,
  generateBoosterPack,
  getBoxCardsPerPack,
  getBoxOption,
  getBoxPool,
  getCardFoilStyle,
  getCardImageUrl,
  getCardPower,
  isHitTier,
  loadPokemonCatalog,
  loadSavedBoxState,
  saveBoxState,
} from '../data/pokemonPack';
import { useCardTilt } from '../hooks/useCardTilt';
import { useGlobalPackStats } from '../hooks/useGlobalPackStats';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import {
  playCardFanSound,
  playCardFlipSound,
  playCardSlideSound,
  playPackRipSound,
  playRarityPullSound,
  preloadPokemonSfx,
} from '../utils/pokemonAudio';
import { PokemonBoosterPack } from './PokemonBoosterPack';
import {
  CardInspectorModal,
  CollectionBinderModal,
} from './PokemonPackModals';

export interface PokemonPackUnboxerProps {
  locale: Locale;
}

type UnboxPhase = 'sealed' | 'ripping' | 'drawing' | 'revealing' | 'summary';
type CardTransition = 'idle' | 'exiting' | 'entering';

export const PokemonPackUnboxer: React.FC<PokemonPackUnboxerProps> = ({
  locale,
}) => {
  const shouldReduceMotion = usePrefersReducedMotion();
  const t = POKEMON_UNBOXER_LABELS[locale];

  const [catalog, setCatalog] = useState<PokemonCatalogData | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [boxState, setBoxState] = useState<SavedBoxState>(() =>
    loadSavedBoxState()
  );

  const [phase, setPhase] = useState<UnboxPhase>('sealed');
  const [currentPack, setCurrentPack] = useState<PokemonCatalogCard[]>([]);
  const [revealIndex, setRevealIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isFlipSettled, setIsFlipSettled] = useState(false);
  const [cardTransition, setCardTransition] = useState<CardTransition>('idle');
  const [openedPackNumber, setOpenedPackNumber] = useState(1);
  const [imageStages, setImageStages] = useState<Record<string, CardImageStage>>(
    {}
  );
  const [loadedCardIds, setLoadedCardIds] = useState<Record<string, boolean>>(
    {}
  );
  const [inspectedCard, setInspectedCard] = useState<PokemonCatalogCard | null>(
    null
  );
  const [binderOpen, setBinderOpen] = useState(false);

  const {
    stats: globalStats,
    recordPackOpened,
    revealPendingTopPull,
  } = useGlobalPackStats();

  const timersRef = useRef<number[]>([]);
  const recordedCardCountRef = useRef<number>(0);
  const packCountedRef = useRef<boolean>(false);
  const preloadSessionRef = useRef<number>(0);
  const preloadQueueRef = useRef<PokemonCatalogCard[]>([]);
  const preloadStartedRef = useRef<Set<string>>(new Set());
  const preloadInFlightRef = useRef<number>(0);
  const loadedCardIdsRef = useRef<Set<string>>(new Set());

  const {
    stageRef,
    cardRef: tiltElRef,
    isTiltActive,
    updateTiltFromPointer,
    resetTilt,
    resetTiltImmediately,
  } = useCardTilt({
    maxDeg: 18,
    lerp: 0.28,
    disabled: shouldReduceMotion,
  });

  const clearScheduledTimers = useCallback(() => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  }, []);

  const scheduleTimeout = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((item) => item !== id);
      fn();
    }, ms);
    timersRef.current.push(id);
  }, []);

  const fetchCatalog = useCallback(() => {
    setLoadFailed(false);
    loadPokemonCatalog()
      .then((data) => {
        setCatalog(data);
      })
      .catch(() => {
        setLoadFailed(true);
      });
  }, []);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  useEffect(() => {
    saveBoxState(boxState);
  }, [boxState]);

  useEffect(() => {
    if (boxState.soundEnabled) {
      preloadPokemonSfx();
    }
  }, [boxState.soundEnabled]);

  useEffect(() => {
    if (phase === 'summary' || phase === 'sealed') {
      revealPendingTopPull();
    }
  }, [phase, revealPendingTopPull]);

  useEffect(() => {
    return () => {
      clearScheduledTimers();
    };
  }, [clearScheduledTimers]);

  const activeBoxOption = useMemo(
    () => getBoxOption(boxState.boxId),
    [boxState.boxId]
  );

  const activePoolSize = useMemo(() => {
    if (!catalog) return 0;
    return getBoxPool(catalog.cards, boxState.boxId).length;
  }, [boxState.boxId, catalog]);

  const uniqueOwnedCount = useMemo(
    () => Object.keys(boxState.collection).length,
    [boxState.collection]
  );

  const nextPackNumber = Math.min(
    PACKS_PER_BOX,
    PACKS_PER_BOX - boxState.packsRemaining + 1
  );

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
    if (loadedCardIdsRef.current.has(cardId)) return;
    loadedCardIdsRef.current.add(cardId);
    setLoadedCardIds((prev) => (prev[cardId] ? prev : { ...prev, [cardId]: true }));
  }, []);

  const cancelPackPreload = useCallback(() => {
    preloadSessionRef.current += 1;
    preloadQueueRef.current = [];
    preloadStartedRef.current.clear();
    preloadInFlightRef.current = 0;
  }, []);

  const pumpPreloadQueue = useCallback(
    (sessionId: number) => {
      const MAX_CONCURRENT = 2;
      while (
        preloadSessionRef.current === sessionId &&
        preloadInFlightRef.current < MAX_CONCURRENT &&
        preloadQueueRef.current.length > 0
      ) {
        const nextCard = preloadQueueRef.current.shift();
        if (!nextCard) break;
        if (
          loadedCardIdsRef.current.has(nextCard.id) ||
          preloadStartedRef.current.has(nextCard.id)
        ) {
          continue;
        }
        preloadStartedRef.current.add(nextCard.id);
        preloadInFlightRef.current += 1;

        const finishSlot = () => {
          if (preloadSessionRef.current !== sessionId) return;
          preloadInFlightRef.current = Math.max(0, preloadInFlightRef.current - 1);
          pumpPreloadQueue(sessionId);
        };

        const loadUrl = (useDirect: boolean) => {
          const img = new Image();
          img.decoding = 'async';
          img.onload = () => {
            if (preloadSessionRef.current !== sessionId) return;
            markCardLoaded(nextCard.id);
            if (typeof img.decode === 'function') {
              img.decode().catch(() => undefined);
            }
            finishSlot();
          };
          img.onerror = () => {
            if (preloadSessionRef.current !== sessionId) return;
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
      const sessionId = preloadSessionRef.current;
      preloadQueueRef.current = [...cards];
      pumpPreloadQueue(sessionId);
    },
    [cancelPackPreload, pumpPreloadQueue]
  );

  useEffect(() => {
    if (phase !== 'revealing' || currentPack.length === 0) return;
    const priorityCards = currentPack.slice(revealIndex, revealIndex + 3);
    if (priorityCards.length === 0) return;
    const priorityIds = new Set(priorityCards.map((c) => c.id));
    const rest = preloadQueueRef.current.filter((c) => !priorityIds.has(c.id));
    const pendingPriority = priorityCards.filter(
      (c) =>
        !loadedCardIdsRef.current.has(c.id) &&
        !preloadStartedRef.current.has(c.id)
    );
    preloadQueueRef.current = [...pendingPriority, ...rest];
    pumpPreloadQueue(preloadSessionRef.current);
  }, [currentPack, phase, pumpPreloadQueue, revealIndex]);

  useEffect(() => {
    return () => {
      cancelPackPreload();
    };
  }, [cancelPackPreload]);

  const commitPackCardsUpTo = useCallback(
    (exclusiveEndIndex: number) => {
      const start = recordedCardCountRef.current;
      const end = Math.min(currentPack.length, exclusiveEndIndex);
      if (end <= start) return;

      const newlyRevealed = currentPack.slice(start, end);
      recordedCardCountRef.current = end;
      const shouldCountPack = !packCountedRef.current;
      packCountedRef.current = true;

      setBoxState((prev) => {
        const nextCollection = { ...prev.collection };
        for (const card of newlyRevealed) {
          nextCollection[card.id] = (nextCollection[card.id] ?? 0) + 1;
        }
        return {
          ...prev,
          totalPacksOpened: prev.totalPacksOpened + (shouldCountPack ? 1 : 0),
          collection: nextCollection,
        };
      });
    },
    [currentPack]
  );

  const handleRipPack = useCallback(() => {
    if (!catalog || phase === 'ripping' || phase === 'drawing') return;
    if (boxState.packsRemaining <= 0) return;

    clearScheduledTimers();

    const pulled = generateBoosterPack(catalog.cards, boxState.boxId);
    const currentNum = PACKS_PER_BOX - boxState.packsRemaining + 1;

    const pulledHits = pulled.filter((card) => isHitTier(card.tier)).length;
    let packBestCard: PokemonCatalogCard | null = null;
    for (const candidate of pulled) {
      if (!candidate.price || candidate.price <= 0) continue;
      if (
        !packBestCard ||
        candidate.price > (packBestCard.price ?? 0) ||
        (candidate.price === (packBestCard.price ?? 0) &&
          TIER_ORDER[candidate.tier] > TIER_ORDER[packBestCard.tier])
      ) {
        packBestCard = candidate;
      }
    }
    recordPackOpened({
      boxId: boxState.boxId,
      hits: pulledHits,
      bestCard:
        packBestCard && packBestCard.price
          ? {
              id: packBestCard.id,
              name: packBestCard.name,
              set: packBestCard.set,
              price: packBestCard.price,
              tier: packBestCard.tier,
            }
          : null,
    });

    recordedCardCountRef.current = 0;
    packCountedRef.current = false;
    preloadPackImages(pulled);
    setCurrentPack(pulled);
    setOpenedPackNumber(currentNum);
    setRevealIndex(0);
    setIsCardFlipped(false);
    setIsFlipSettled(false);
    setCardTransition('idle');

    if (boxState.soundEnabled) {
      playPackRipSound();
    }

    setBoxState((prev) => ({
      ...prev,
      packsRemaining: Math.max(0, prev.packsRemaining - 1),
    }));

    if (shouldReduceMotion) {
      setPhase('revealing');
      setIsCardFlipped(false);
      return;
    }

    setPhase('ripping');
    scheduleTimeout(() => {
      setPhase('drawing');
      if (boxState.soundEnabled) {
        playCardSlideSound();
      }
      scheduleTimeout(() => {
        setPhase('revealing');
        setCardTransition('idle');
      }, 680);
    }, 520);
  }, [
    boxState.boxId,
    boxState.packsRemaining,
    boxState.soundEnabled,
    catalog,
    clearScheduledTimers,
    phase,
    preloadPackImages,
    recordPackOpened,
    scheduleTimeout,
    shouldReduceMotion,
  ]);

  const handleStagePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (event.pointerType !== 'mouse') return;
    updateTiltFromPointer(event.clientX, event.clientY);
  };

  const resetStageTilt = () => {
    resetTilt();
  };

  const handleCardAction = () => {
    if (phase !== 'revealing' || cardTransition === 'exiting') return;
    const card = currentPack[revealIndex];
    if (!card) return;

    if (!isCardFlipped) {
      setIsCardFlipped(true);
      commitPackCardsUpTo(revealIndex + 1);
      if (shouldReduceMotion) {
        setIsFlipSettled(true);
      } else {
        clearScheduledTimers();
        scheduleTimeout(() => {
          setIsFlipSettled(true);
        }, 440);
      }
      if (boxState.soundEnabled) {
        playCardFlipSound();
        playRarityPullSound(card.tier);
      }
      return;
    }

    if (boxState.soundEnabled) {
      playCardSlideSound();
    }

    if (revealIndex + 1 >= currentPack.length) {
      setIsFlipSettled(false);
      setPhase('summary');
      return;
    }

    if (shouldReduceMotion) {
      resetTiltImmediately();
      setRevealIndex((prev) => prev + 1);
      setIsCardFlipped(false);
      setIsFlipSettled(false);
      return;
    }

    clearScheduledTimers();
    setCardTransition('exiting');
    scheduleTimeout(() => {
      resetTiltImmediately();
      setRevealIndex((prev) => prev + 1);
      setIsCardFlipped(false);
      setIsFlipSettled(false);
      setCardTransition('entering');
      scheduleTimeout(() => {
        setCardTransition('idle');
      }, 220);
    }, 220);
  };

  const handleRevealAll = () => {
    if (phase !== 'revealing') return;
    clearScheduledTimers();
    cancelPackPreload();
    commitPackCardsUpTo(currentPack.length);
    if (boxState.soundEnabled) {
      playCardFanSound();
    }
    setIsFlipSettled(false);
    setCardTransition('idle');
    setPhase('summary');
  };

  const handlePrepareNextPack = () => {
    clearScheduledTimers();
    cancelPackPreload();
    resetTiltImmediately();
    if (boxState.packsRemaining <= 0) {
      handleOpenNewBox(boxState.boxId);
      return;
    }
    recordedCardCountRef.current = 0;
    packCountedRef.current = false;
    setCurrentPack([]);
    setRevealIndex(0);
    setIsCardFlipped(false);
    setIsFlipSettled(false);
    setCardTransition('idle');
    setPhase('sealed');
  };

  const handleOpenNewBox = (targetBoxId: BoxThemeId = boxState.boxId) => {
    clearScheduledTimers();
    cancelPackPreload();
    resetTiltImmediately();
    recordedCardCountRef.current = 0;
    packCountedRef.current = false;
    setBoxState((prev) => ({
      ...prev,
      boxId: targetBoxId,
      packsRemaining: PACKS_PER_BOX,
    }));
    setCurrentPack([]);
    setRevealIndex(0);
    setIsCardFlipped(false);
    setIsFlipSettled(false);
    setCardTransition('idle');
    setPhase('sealed');
  };

  const handleToggleSound = () => {
    setBoxState((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  const handleResetCollection = () => {
    packCountedRef.current = false;
    setBoxState((prev) => ({
      ...prev,
      collection: {},
      totalPacksOpened: 0,
    }));
  };

  const activeCard =
    phase === 'revealing' ? currentPack[revealIndex] ?? null : null;
  const activeFoilStyle = activeCard ? getCardFoilStyle(activeCard) : 'none';
  const activePackSize =
    currentPack.length > 0
      ? currentPack.length
      : getBoxCardsPerPack(boxState.boxId);

  const packHitsCount = useMemo(
    () => currentPack.filter((card) => isHitTier(card.tier)).length,
    [currentPack]
  );

  const packTotalValue = useMemo(
    () => currentPack.reduce((sum, card) => sum + (card.price ?? 0), 0),
    [currentPack]
  );

  const bestCardId = useMemo(() => {
    if (currentPack.length === 0) return null;
    let best = currentPack[0];
    for (const candidate of currentPack) {
      const bestPrice = best.price ?? 0;
      const candPrice = candidate.price ?? 0;
      if (
        candPrice > bestPrice ||
        (candPrice === bestPrice &&
          TIER_ORDER[candidate.tier] > TIER_ORDER[best.tier])
      ) {
        best = candidate;
      }
    }
    return best.id;
  }, [currentPack]);

  const remainingDeckUnderCard = Math.max(
    0,
    currentPack.length - revealIndex - 1
  );

  return (
    <div
      data-pk-unboxer="true"
      className="mx-auto flex w-full max-w-[336px] flex-col items-center gap-3 lg:mx-0"
    >
      <div className="flex w-full items-center gap-1.5">
        <div className="relative min-w-0 flex-1">
          <span
            aria-hidden="true"
            style={{ backgroundColor: activeBoxOption.accentColor }}
            className="pointer-events-none absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
          />
          <select
            aria-label={t.boxSelectAria}
            value={boxState.boxId}
            onChange={(event) =>
              handleOpenNewBox(event.target.value as BoxThemeId)
            }
            className="min-h-[36px] w-full cursor-pointer truncate rounded-full border border-folio-border bg-folio-surface pl-7 pr-3 font-mono text-[11px] font-medium text-folio-ink transition-colors hover:border-folio-strong focus:border-folio-strong focus:outline-none"
          >
            {BOOSTER_BOX_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label[locale]}
              </option>
            ))}
          </select>
        </div>

        <span
          title={catalog ? t.catalogCount(activePoolSize) : undefined}
          className="inline-flex min-h-[36px] shrink-0 items-center rounded-full border border-folio-border bg-folio-surface px-2.5 font-mono text-[10.5px] font-semibold tabular-nums text-folio-ink"
        >
          {t.packsLeft(boxState.packsRemaining)}
        </span>

        <button
          type="button"
          onClick={handleToggleSound}
          aria-pressed={boxState.soundEnabled}
          aria-label={boxState.soundEnabled ? t.soundOnAria : t.soundOffAria}
          title={boxState.soundEnabled ? t.soundOnAria : t.soundOffAria}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-folio-border bg-folio-surface text-folio-muted transition-colors duration-150 hover:border-folio-strong hover:text-folio-ink"
        >
          {boxState.soundEnabled ? (
            <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>
      </div>

      {loadFailed ? (
        <div className="flex min-h-[430px] w-full flex-col items-center justify-center gap-3 p-5 text-center">
          <p className="font-mono text-xs text-folio-muted">{t.loadError}</p>
          <button
            type="button"
            onClick={fetchCatalog}
            className="folio-btn-compact"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.retryBtn}</span>
          </button>
        </div>
      ) : !catalog ? (
        <div className="flex min-h-[430px] w-full flex-col items-center justify-center gap-2.5 text-center">
          <div className="aspect-[82/112] w-[310px] rounded-2xl bg-folio-elevated/40 sm:w-[328px]" />
          <p className="font-mono text-[11px] text-folio-faint">
            {t.loadingCatalog}
          </p>
        </div>
      ) : phase === 'sealed' || phase === 'ripping' || phase === 'drawing' ? (
        <div className="flex w-full flex-col items-center gap-2.5">
          {phase !== 'sealed' || boxState.packsRemaining > 0 ? (
            <>
              <PokemonBoosterPack
                option={activeBoxOption}
                phase={phase}
                packNumber={
                  phase === 'sealed' ? nextPackNumber : openedPackNumber
                }
                packsRemaining={boxState.packsRemaining}
                locale={locale}
                shouldReduceMotion={shouldReduceMotion}
                soundEnabled={boxState.soundEnabled}
                onRipTrigger={handleRipPack}
              />

              <div className="flex min-h-[64px] w-full flex-col justify-end gap-2">
                {phase === 'sealed' ? (
                  <>
                    <p className="text-center font-mono text-[10.5px] leading-none text-folio-faint">
                      {t.tearHint}
                    </p>
                    <div className="flex w-full items-center gap-2">
                      <button
                        type="button"
                        onClick={handleRipPack}
                        className="folio-btn-primary flex-1 justify-center"
                      >
                        <PackageOpen
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        <span>{t.ripButton}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBinderOpen(true)}
                        className="folio-btn-secondary shrink-0 justify-center !px-3.5"
                      >
                        <BookOpen
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        <span>{t.collectionBtn(uniqueOwnedCount)}</span>
                      </button>

                      {boxState.packsRemaining < PACKS_PER_BOX && (
                        <button
                          type="button"
                          onClick={() => handleOpenNewBox(boxState.boxId)}
                          aria-label={t.freshBoxShort}
                          title={t.freshBoxShort}
                          className="folio-btn-icon shrink-0"
                        >
                          <RotateCcw
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex w-full items-center gap-2">
                    <div className="flex min-h-[40px] flex-1 items-center justify-center rounded-full border border-folio-border bg-folio-surface px-3 font-mono text-[11px] font-medium text-folio-muted">
                      {phase === 'ripping'
                        ? t.rippingLabel
                        : t.drawingLabel(activePackSize)}
                    </div>

                    <button
                      type="button"
                      onClick={() => setBinderOpen(true)}
                      className="folio-btn-secondary shrink-0 justify-center !px-3.5"
                    >
                      <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{t.collectionBtn(uniqueOwnedCount)}</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex w-full flex-col items-center gap-3">
              <div className="pk-chest-stage">
                <div className="pk-chest-ground-shadow" aria-hidden="true" />
                <img
                  src={POKEMON_CHEST_BACK_URL}
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                  className="pk-pixel-art pointer-events-none absolute inset-0 z-[5] h-full w-full object-contain opacity-90"
                />
                <div className="relative z-10 flex flex-col items-center gap-2 rounded-2xl border border-folio-border bg-folio-surface/95 px-5 py-4 text-center shadow-soft">
                  <Sparkles
                    className="h-5 w-5 text-folio-ink"
                    aria-hidden="true"
                  />
                  <p className="font-serif text-sm font-bold text-folio-ink">
                    {t.boxDoneTitle}
                  </p>
                </div>
              </div>

              <div className="flex w-full items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenNewBox(boxState.boxId)}
                  className="folio-btn-primary flex-1 justify-center"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.newBoxBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBinderOpen(true)}
                  className="folio-btn-secondary shrink-0 justify-center !px-3.5"
                >
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.collectionBtn(uniqueOwnedCount)}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : phase === 'revealing' && activeCard ? (
        <div className="flex w-full flex-col items-center gap-3 py-1">
          <div className="flex w-full items-center justify-between gap-2 font-mono text-[11px]">
            <span className="rounded-full border border-folio-border bg-folio-surface px-2.5 py-0.5 font-semibold tabular-nums text-folio-ink">
              {t.cardCounter(revealIndex + 1, activePackSize)}
            </span>

            {isCardFlipped ? (
              <span
                data-tier={activeCard.tier}
                className="pk-tier-pill inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold"
              >
                {isHitTier(activeCard.tier) && (
                  <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                )}
                <span>{TIER_LABELS[locale][activeCard.tier]}</span>
              </span>
            ) : (
              <span className="rounded-full border border-folio-border bg-folio-surface px-2.5 py-0.5 text-[10px] font-medium text-folio-muted">
                {t.tapToFlip}
              </span>
            )}
          </div>

          <div className="relative aspect-[63/88] w-[224px]">
            {remainingDeckUnderCard > 1 && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 overflow-hidden rounded-[11px] border border-folio-border bg-folio-elevated opacity-55"
              >
                <img
                  src={POKEMON_CARD_BACK_URL}
                  alt=""
                  className="h-full w-full object-cover opacity-80"
                />
              </div>
            )}

            {remainingDeckUnderCard > 0 && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-x-1 translate-y-1 overflow-hidden rounded-[11px] border border-folio-border bg-folio-elevated opacity-80"
              >
                <img
                  src={POKEMON_CARD_BACK_URL}
                  alt=""
                  className="h-full w-full object-cover opacity-90"
                />
              </div>
            )}

            <div
              key={`${openedPackNumber}-${revealIndex}-${activeCard.id}`}
              ref={stageRef}
              onPointerMove={handleStagePointerMove}
              onPointerLeave={resetStageTilt}
              onPointerCancel={resetStageTilt}
              onClick={handleCardAction}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleCardAction();
                }
              }}
              aria-label={
                isCardFlipped
                  ? `${activeCard.name} - ${t.nextCard}`
                  : t.flipCardBtn(revealIndex + 1)
              }
              data-transition={cardTransition}
              className="pk-tilt-stage pk-deck-top relative z-10 h-full w-full cursor-pointer select-none"
            >
              {isCardFlipped &&
                (activeCard.tier === 'ultra' ||
                  activeCard.tier === 'secret') && (
                  <div
                    key={`burst-${activeCard.id}-${revealIndex}`}
                    data-tier={activeCard.tier}
                    data-foil={activeFoilStyle}
                    className="pk-reveal-burst"
                    aria-hidden="true"
                  />
                )}

              <div
                ref={tiltElRef}
                data-active={isTiltActive && isCardFlipped ? 'true' : 'false'}
                data-tier={activeCard.tier}
                data-foil={isCardFlipped ? activeFoilStyle : 'none'}
                data-flipped={isCardFlipped ? 'true' : 'false'}
                data-flip-settled={isFlipSettled ? 'true' : 'false'}
                className="pk-tilt-card pk-flip-card relative h-full w-full"
              >
                <div className="pk-flip-face pk-flip-back overflow-hidden rounded-[11px] border border-folio-border bg-folio-elevated shadow-soft">
                  <img
                    src={POKEMON_CARD_BACK_URL}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="pk-flip-face pk-flip-front overflow-hidden rounded-[11px] border border-folio-border bg-folio-elevated shadow-soft">
                  {isCardFlipped && (
                    <>
                      {(imageStages[activeCard.id] ?? 'webp') === 'fallback' ? (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-3 text-center">
                          <span className="font-serif text-sm font-bold text-folio-ink">
                            {activeCard.name}
                          </span>
                          <span className="font-mono text-[10px] text-folio-muted">
                            {activeCard.rarity}
                          </span>
                        </div>
                      ) : (
                        <>
                          {!loadedCardIds[activeCard.id] && (
                            <div className="pk-card-skeleton" aria-hidden="true" />
                          )}
                          <img
                            src={getCardImageUrl(
                              activeCard,
                              'card',
                              (imageStages[activeCard.id] ?? 'webp') === 'direct'
                            )}
                            alt={activeCard.name}
                            fetchPriority="high"
                            decoding="async"
                            onLoad={() => markCardLoaded(activeCard.id)}
                            onError={() => advanceImageStage(activeCard.id)}
                            className={`relative z-[1] h-full w-full object-cover transition-opacity duration-150 ${
                              loadedCardIds[activeCard.id]
                                ? 'opacity-100'
                                : 'opacity-0'
                            }`}
                          />
                        </>
                      )}
                      <div className="pk-holo-foil" aria-hidden="true" />
                      <div className="pk-holo-glitter" aria-hidden="true" />
                      <div className="pk-holo-glare" aria-hidden="true" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex min-h-[40px] w-full items-center justify-between gap-2 px-1">
            {isCardFlipped ? (
              <>
                <div className="min-w-0">
                  <div className="truncate font-serif text-sm font-bold leading-snug text-folio-ink">
                    {activeCard.name}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-mono text-[10px] tabular-nums text-folio-faint">
                    <span>{formatCardPrice(activeCard.price)}</span>
                    {getCardPower(activeCard) > 0 && (
                      <>
                        <span>·</span>
                        <span>PWR {getCardPower(activeCard)}</span>
                      </>
                    )}
                    {activeFoilStyle !== 'none' && (
                      <>
                        <span>·</span>
                        <span className="text-folio-muted">
                          {FOIL_STYLE_LABELS[locale][activeFoilStyle]}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setInspectedCard(activeCard)}
                  aria-label={t.inspectCard}
                  title={t.inspectCard}
                  className="folio-btn-icon !h-8 !w-8 shrink-0"
                >
                  <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </>
            ) : (
              <div className="w-full text-center font-mono text-[11px] text-folio-muted">
                {t.tapToFlip}
              </div>
            )}
          </div>

          <div className="flex w-full items-center gap-2">
            <button
              type="button"
              onClick={handleCardAction}
              disabled={cardTransition === 'exiting'}
              className="folio-btn-primary flex-1 justify-center !min-h-[38px] !px-3"
            >
              <span>
                {!isCardFlipped
                  ? t.flipCardBtn(revealIndex + 1)
                  : revealIndex + 1 >= activePackSize
                    ? t.finishPack(activePackSize)
                    : t.nextCard}
              </span>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={handleRevealAll}
              className="folio-btn-secondary !min-h-[38px] !px-3"
            >
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.revealAll}</span>
            </button>
          </div>

          <div className="flex w-full items-center gap-2">
            <button
              type="button"
              onClick={() => setBinderOpen(true)}
              className="folio-btn-compact flex-1 justify-center !min-h-[36px] !px-3"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.collectionBtn(uniqueOwnedCount)}</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenNewBox(boxState.boxId)}
              className="folio-btn-compact !min-h-[36px] !px-3"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.freshBoxShort}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-3 py-1">
          <div className="flex items-center justify-between gap-1.5 font-mono text-[11px]">
            <span className="truncate font-semibold text-folio-ink">
              {t.summaryTitle(openedPackNumber)}
            </span>
            <div className="flex shrink-0 items-center gap-1">
              <span className="rounded-full border border-folio-border bg-folio-surface px-2.5 py-0.5 text-[10px] font-semibold tabular-nums text-folio-ink">
                {formatCardPrice(packTotalValue)}
              </span>
              <span className="rounded-full border border-folio-border bg-folio-surface px-2.5 py-0.5 text-[10px] font-semibold text-folio-muted">
                {t.hitsLabel(packHitsCount)}
              </span>
            </div>
          </div>

          <div
            aria-label={t.summaryTitle(openedPackNumber)}
            className={
              currentPack.length === 10
                ? 'grid grid-cols-5 gap-1.5'
                : 'flex flex-wrap justify-center gap-1.5'
            }
          >
            {currentPack.map((card) => {
              const miniFoil = getCardFoilStyle(card);
              const imgStage = imageStages[card.id] ?? 'webp';
              const isTopPull = card.id === bestCardId;
              const summaryVariant = loadedCardIds[card.id] ? 'card' : 'thumb';
              const widthClass =
                currentPack.length === 10
                  ? 'w-full'
                  : currentPack.length === 11
                    ? 'w-[calc((100%-30px)/6)]'
                    : 'w-[calc((100%-24px)/5)]';
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setInspectedCard(card)}
                  title={`${card.name} · ${card.set.toUpperCase()} #${card.num} · ${formatCardPrice(card.price)} (${card.rarity})`}
                  data-card-id={card.id}
                  data-tier={card.tier}
                  data-foil={miniFoil}
                  data-top-pull={isTopPull ? 'true' : undefined}
                  className={`pk-mini-card group relative aspect-[63/88] ${widthClass} overflow-hidden rounded-[5px] border border-folio-border bg-folio-surface transition-transform duration-150 hover:-translate-y-0.5 hover:border-folio-strong ${
                    isTopPull ? 'pk-best-pull' : ''
                  }`}
                >
                  {imgStage === 'fallback' ? (
                    <span className="flex h-full w-full items-center justify-center p-1 text-center font-mono text-[8px] leading-tight text-folio-ink">
                      {card.name}
                    </span>
                  ) : (
                    <img
                      src={getCardImageUrl(
                        card,
                        summaryVariant,
                        imgStage === 'direct'
                      )}
                      alt={card.name}
                      decoding="async"
                      onError={() => advanceImageStage(card.id)}
                      className="h-full w-full object-cover"
                    />
                  )}
                  {isTopPull && (
                    <span
                      title={t.topPullBadge}
                      className="pointer-events-none absolute left-0.5 top-0.5 z-10 inline-flex items-center rounded bg-black/80 px-1 py-0.5 text-[7.5px] font-bold leading-none text-amber-300"
                    >
                      ★
                    </span>
                  )}
                  {miniFoil !== 'none' && (
                    <span className="pk-mini-glint" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handlePrepareNextPack}
            className="folio-btn-primary w-full justify-center"
          >
            {boxState.packsRemaining > 0 ? (
              <>
                <PackageOpen className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.nextPackBtn(nextPackNumber)}</span>
              </>
            ) : (
              <>
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.newBoxBtn}</span>
              </>
            )}
          </button>

          <div className="flex w-full items-center gap-2">
            <button
              type="button"
              onClick={() => setBinderOpen(true)}
              className="folio-btn-secondary flex-1 justify-center !min-h-[38px] !px-3"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.collectionBtn(uniqueOwnedCount)}</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenNewBox(boxState.boxId)}
              className="folio-btn-secondary !min-h-[38px] !px-3"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.freshBoxShort}</span>
            </button>
          </div>
        </div>
      )}

      {globalStats.configured && (
        <div
          data-global-pack-stats="true"
          className="flex w-full items-center justify-between gap-2 rounded-full border border-folio-border bg-folio-surface/90 px-3 py-1.5 font-mono text-[10.5px] text-folio-muted"
        >
          <span className="inline-flex shrink-0 items-center gap-1.5 tabular-nums text-folio-ink">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            />
            <Globe className="h-3 w-3 text-folio-muted" aria-hidden="true" />
            <span>{t.globalPacks(globalStats.totalPacks)}</span>
          </span>

          {globalStats.topPull && (
            <button
              type="button"
              onClick={() => {
                if (!catalog || !globalStats.topPull) return;
                const found = catalog.cards.find(
                  (c) => c.id === globalStats.topPull?.id
                );
                if (found) {
                  setInspectedCard(found);
                }
              }}
              aria-label={t.globalTopPullAria(
                globalStats.topPull.name,
                formatCardPrice(globalStats.topPull.price)
              )}
              title={t.globalTopPullAria(
                globalStats.topPull.name,
                formatCardPrice(globalStats.topPull.price)
              )}
              className="inline-flex min-w-0 items-center gap-1 truncate text-folio-muted transition-colors hover:text-folio-ink"
            >
              <Trophy className="h-3 w-3 shrink-0 text-folio-ink" aria-hidden="true" />
              <span className="truncate">{globalStats.topPull.name}</span>
              <span className="shrink-0 font-semibold tabular-nums text-folio-ink">
                {formatCardPrice(globalStats.topPull.price)}
              </span>
            </button>
          )}
        </div>
      )}

      <CollectionBinderModal
        isOpen={binderOpen}
        catalog={catalog}
        collection={boxState.collection}
        totalPacksOpened={boxState.totalPacksOpened}
        locale={locale}
        onSelectCard={(card) => setInspectedCard(card)}
        onResetCollection={handleResetCollection}
        onClose={() => setBinderOpen(false)}
      />

      <CardInspectorModal
        card={inspectedCard}
        setsMap={catalog?.sets ?? {}}
        ownedCount={
          inspectedCard ? (boxState.collection[inspectedCard.id] ?? 0) : 0
        }
        locale={locale}
        onClose={() => setInspectedCard(null)}
      />
    </div>
  );
};
