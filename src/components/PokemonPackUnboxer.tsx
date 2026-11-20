import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  Eye,
  Layers,
  PackageOpen,
  RotateCcw,
  Scissors,
  Sparkles,
  Volume2,
  VolumeX,
  ZoomIn,
} from 'lucide-react';
import { Locale } from '../data/profile';
import {
  BOOSTER_BOX_OPTIONS,
  BoxThemeId,
  CARDS_PER_PACK,
  PACKS_PER_BOX,
  POKEMON_CARD_BACK_URL,
  POKEMON_UNBOXER_LABELS,
  PokemonCatalogCard,
  PokemonCatalogData,
  SavedBoxState,
  TIER_LABELS,
  formatCardPrice,
  generateBoosterPack,
  getBoxOption,
  getBoxPool,
  getCardImageUrl,
  getCardPower,
  isHitTier,
  loadPokemonCatalog,
  loadSavedBoxState,
  saveBoxState,
} from '../data/pokemonPack';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import {
  playCardFlipSound,
  playCardSlideSound,
  playPackRipSound,
  playRarityPullSound,
} from '../utils/pokemonAudio';
import {
  CardInspectorModal,
  CollectionBinderModal,
} from './PokemonPackModals';

export interface PokemonPackUnboxerProps {
  locale: Locale;
  theme: 'light' | 'dark';
}

type UnboxPhase = 'sealed' | 'ripping' | 'drawing' | 'revealing' | 'summary';
type CardTransition = 'idle' | 'exiting' | 'entering';

interface StageTiltState {
  rx: number;
  ry: number;
  px: number;
  py: number;
  trx: number;
  tryVal: number;
  tpx: number;
  tpy: number;
}

const STAGE_LERP = 0.28;
const STAGE_EPS = 0.05;

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
  const [cardTransition, setCardTransition] = useState<CardTransition>('idle');
  const [tearDragRatio, setTearDragRatio] = useState(0);
  const [openedPackNumber, setOpenedPackNumber] = useState(1);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [inspectedCard, setInspectedCard] = useState<PokemonCatalogCard | null>(
    null
  );
  const [binderOpen, setBinderOpen] = useState(false);
  const [isTiltActive, setIsTiltActive] = useState(false);

  const dragStartXRef = useRef<number | null>(null);
  const dragDidRipRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const tiltElRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const tiltRef = useRef<StageTiltState>({
    rx: 0,
    ry: 0,
    px: 50,
    py: 50,
    trx: 0,
    tryVal: 0,
    tpx: 50,
    tpy: 50,
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
    return () => {
      clearScheduledTimers();
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [clearScheduledTimers]);

  const applyTiltVars = useCallback((s: StageTiltState) => {
    const el = tiltElRef.current;
    if (!el) return;
    el.style.setProperty('--pk-rx', `${s.rx.toFixed(2)}deg`);
    el.style.setProperty('--pk-ry', `${s.ry.toFixed(2)}deg`);
    el.style.setProperty('--pk-px', `${s.px.toFixed(2)}%`);
    el.style.setProperty('--pk-py', `${s.py.toFixed(2)}%`);
  }, []);

  const stepTilt = useCallback(() => {
    const s = tiltRef.current;
    s.rx += (s.trx - s.rx) * STAGE_LERP;
    s.ry += (s.tryVal - s.ry) * STAGE_LERP;
    s.px += (s.tpx - s.px) * STAGE_LERP;
    s.py += (s.tpy - s.py) * STAGE_LERP;

    const settled =
      Math.abs(s.trx - s.rx) < STAGE_EPS &&
      Math.abs(s.tryVal - s.ry) < STAGE_EPS &&
      Math.abs(s.tpx - s.px) < STAGE_EPS &&
      Math.abs(s.tpy - s.py) < STAGE_EPS;

    if (settled) {
      s.rx = s.trx;
      s.ry = s.tryVal;
      s.px = s.tpx;
      s.py = s.tpy;
      applyTiltVars(s);
      rafRef.current = null;
      return;
    }

    applyTiltVars(s);
    rafRef.current = window.requestAnimationFrame(stepTilt);
  }, [applyTiltVars]);

  const scheduleTilt = useCallback(() => {
    if (shouldReduceMotion) {
      const s = tiltRef.current;
      s.rx = 0;
      s.ry = 0;
      s.px = s.tpx;
      s.py = s.tpy;
      applyTiltVars(s);
      return;
    }
    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(stepTilt);
    }
  }, [applyTiltVars, shouldReduceMotion, stepTilt]);

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

  const preloadPackImages = (cards: PokemonCatalogCard[]) => {
    for (const card of cards) {
      const img = new Image();
      img.decoding = 'async';
      img.src = getCardImageUrl(card, false);
    }
  };

  const handleRipPack = useCallback(() => {
    if (!catalog || phase === 'ripping' || phase === 'drawing') return;
    if (boxState.packsRemaining <= 0) return;

    clearScheduledTimers();
    setTearDragRatio(0);

    const pulled = generateBoosterPack(catalog.cards, boxState.boxId);
    const currentNum = PACKS_PER_BOX - boxState.packsRemaining + 1;

    preloadPackImages(pulled);
    setCurrentPack(pulled);
    setOpenedPackNumber(currentNum);
    setRevealIndex(0);
    setIsCardFlipped(false);
    setCardTransition('idle');

    if (boxState.soundEnabled) {
      playPackRipSound();
    }

    setBoxState((prev) => {
      const nextCollection = { ...prev.collection };
      for (const card of pulled) {
        nextCollection[card.id] = (nextCollection[card.id] ?? 0) + 1;
      }
      return {
        ...prev,
        packsRemaining: Math.max(0, prev.packsRemaining - 1),
        totalPacksOpened: prev.totalPacksOpened + 1,
        collection: nextCollection,
      };
    });

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
        setCardTransition('entering');
        scheduleTimeout(() => {
          setCardTransition('idle');
        }, 220);
      }, 640);
    }, 460);
  }, [
    boxState.boxId,
    boxState.packsRemaining,
    boxState.soundEnabled,
    catalog,
    clearScheduledTimers,
    phase,
    scheduleTimeout,
    shouldReduceMotion,
  ]);

  const handleStagePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const nx = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    const ny = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);

    const s = tiltRef.current;
    s.tpx = nx * 100;
    s.tpy = ny * 100;
    s.trx = -(ny - 0.5) * 18;
    s.tryVal = (nx - 0.5) * 18;
    setIsTiltActive(true);
    scheduleTilt();

    if (
      phase === 'sealed' &&
      dragStartXRef.current !== null &&
      !dragDidRipRef.current
    ) {
      const delta = Math.abs(event.clientX - dragStartXRef.current);
      const ratio = Math.min(1, delta / 72);
      setTearDragRatio(ratio);
      if (delta > 56) {
        dragDidRipRef.current = true;
        dragStartXRef.current = null;
        handleRipPack();
      }
    }
  };

  const resetStageTilt = () => {
    dragStartXRef.current = null;
    setTearDragRatio(0);
    const s = tiltRef.current;
    s.trx = 0;
    s.tryVal = 0;
    s.tpx = 50;
    s.tpy = 50;
    setIsTiltActive(false);
    scheduleTilt();
  };

  const handleCardAction = () => {
    if (phase !== 'revealing' || cardTransition === 'exiting') return;
    const card = currentPack[revealIndex];
    if (!card) return;

    if (!isCardFlipped) {
      setIsCardFlipped(true);
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
      setPhase('summary');
      return;
    }

    if (shouldReduceMotion) {
      setRevealIndex((prev) => prev + 1);
      setIsCardFlipped(false);
      return;
    }

    clearScheduledTimers();
    setCardTransition('exiting');
    scheduleTimeout(() => {
      setRevealIndex((prev) => prev + 1);
      setIsCardFlipped(false);
      setCardTransition('entering');
      scheduleTimeout(() => {
        setCardTransition('idle');
      }, 220);
    }, 220);
  };

  const handleRevealAll = () => {
    if (phase !== 'revealing') return;
    clearScheduledTimers();
    if (boxState.soundEnabled) {
      playCardSlideSound();
    }
    setCardTransition('idle');
    setPhase('summary');
  };

  const handlePrepareNextPack = () => {
    clearScheduledTimers();
    if (boxState.packsRemaining <= 0) {
      handleOpenNewBox(boxState.boxId);
      return;
    }
    setCurrentPack([]);
    setRevealIndex(0);
    setIsCardFlipped(false);
    setCardTransition('idle');
    setPhase('sealed');
  };

  const handleOpenNewBox = (targetBoxId: BoxThemeId = boxState.boxId) => {
    clearScheduledTimers();
    setBoxState((prev) => ({
      ...prev,
      boxId: targetBoxId,
      packsRemaining: PACKS_PER_BOX,
    }));
    setCurrentPack([]);
    setRevealIndex(0);
    setIsCardFlipped(false);
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
    setBoxState((prev) => ({
      ...prev,
      collection: {},
      totalPacksOpened: 0,
    }));
  };

  const activeCard =
    phase === 'revealing' ? currentPack[revealIndex] ?? null : null;

  const packHitsCount = useMemo(
    () => currentPack.filter((card) => isHitTier(card.tier)).length,
    [currentPack]
  );

  const packTotalValue = useMemo(
    () => currentPack.reduce((sum, card) => sum + (card.price ?? 0), 0),
    [currentPack]
  );

  const openedCountInBox = PACKS_PER_BOX - boxState.packsRemaining;
  const remainingDeckUnderCard = Math.max(
    0,
    currentPack.length - revealIndex - 1
  );

  return (
    <div className="mx-auto w-full max-w-[330px] lg:mx-0">
      <div className="folio-card flex flex-col gap-3 !p-4">
        <div className="flex items-center justify-between gap-2 border-b border-folio-border pb-2.5">
          <div className="flex min-w-0 items-center gap-1.5 font-mono text-[10.5px] font-semibold tracking-wider text-folio-muted">
            <Layers
              className="h-3.5 w-3.5 shrink-0 text-folio-ink"
              aria-hidden="true"
            />
            <span className="truncate">{t.kicker}</span>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={handleToggleSound}
              aria-pressed={boxState.soundEnabled}
              aria-label={
                boxState.soundEnabled ? t.soundOnAria : t.soundOffAria
              }
              title={boxState.soundEnabled ? t.soundOnAria : t.soundOffAria}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-folio-border bg-folio-elevated text-folio-muted transition-colors duration-150 hover:border-folio-strong hover:text-folio-ink"
            >
              {boxState.soundEnabled ? (
                <Volume2 className="h-3 w-3" aria-hidden="true" />
              ) : (
                <VolumeX className="h-3 w-3" aria-hidden="true" />
              )}
            </button>

            <span className="rounded-full border border-folio-border bg-folio-elevated px-2 py-0.5 font-mono text-[10.5px] font-semibold tabular-nums text-folio-ink">
              {t.packsLeft(boxState.packsRemaining)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            aria-label={t.boxSelectAria}
            value={boxState.boxId}
            onChange={(event) =>
              handleOpenNewBox(event.target.value as BoxThemeId)
            }
            className="min-h-[34px] min-w-0 flex-1 cursor-pointer rounded-[var(--radius-control)] border border-folio-border bg-folio-elevated px-2.5 font-mono text-[11px] font-medium text-folio-ink focus:border-folio-strong focus:outline-none"
          >
            {BOOSTER_BOX_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label[locale]}
              </option>
            ))}
          </select>

          {catalog && (
            <span className="shrink-0 font-mono text-[10.5px] tabular-nums text-folio-faint">
              {t.catalogCount(activePoolSize)}
            </span>
          )}
        </div>

        <div
          aria-label={`${openedCountInBox}/${PACKS_PER_BOX}`}
          className="grid grid-cols-12 gap-1"
        >
          {Array.from({ length: PACKS_PER_BOX }).map((_, idx) => {
            const isOpened = idx < openedCountInBox;
            const isCurrent =
              phase !== 'sealed' && idx === openedPackNumber - 1;
            return (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-colors duration-200 ${
                  isCurrent
                    ? 'bg-folio-gblue'
                    : isOpened
                      ? 'bg-folio-ink/70'
                      : 'bg-folio-border'
                }`}
              />
            );
          })}
        </div>

        {loadFailed ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated/60 p-5 text-center">
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
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-2 rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated/50 p-5 text-center">
            <div className="aspect-[63/88] w-[170px] rounded-[10px] border border-folio-border bg-folio-surface" />
            <p className="font-mono text-[11px] text-folio-faint">
              {t.loadingCatalog}
            </p>
          </div>
        ) : phase === 'sealed' || phase === 'ripping' ? (
          <div className="flex flex-col items-center gap-3 py-1">
            {boxState.packsRemaining > 0 ? (
              <>
                <div
                  ref={stageRef}
                  onPointerDown={(event) => {
                    dragStartXRef.current = event.clientX;
                    dragDidRipRef.current = false;
                  }}
                  onPointerMove={handleStagePointerMove}
                  onPointerUp={() => {
                    dragStartXRef.current = null;
                    setTearDragRatio(0);
                  }}
                  onPointerLeave={resetStageTilt}
                  onPointerCancel={resetStageTilt}
                  onClick={() => {
                    if (!dragDidRipRef.current) {
                      handleRipPack();
                    }
                    dragDidRipRef.current = false;
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleRipPack();
                    }
                  }}
                  aria-label={`${t.ripButton} ${t.packBadge(nextPackNumber)}`}
                  className="pk-tilt-stage aspect-[63/88] w-[212px] cursor-pointer select-none"
                >
                  <div
                    ref={tiltElRef}
                    data-active={isTiltActive ? 'true' : 'false'}
                    data-ripping={phase === 'ripping' ? 'true' : 'false'}
                    style={
                      {
                        background: activeBoxOption.accentGradient,
                        '--pk-drag': `${(tearDragRatio * 100).toFixed(0)}%`,
                      } as React.CSSProperties
                    }
                    className="pk-tilt-card pk-booster-pack relative flex h-full w-full flex-col justify-between overflow-visible rounded-[12px] border border-white/20 text-white shadow-soft"
                  >
                    <div
                      style={
                        phase === 'sealed' && tearDragRatio > 0
                          ? {
                              transform: `translate3d(${(tearDragRatio * 18).toFixed(1)}px, ${(-tearDragRatio * 8).toFixed(1)}px, 0) rotate(${(-tearDragRatio * 5).toFixed(1)}deg)`,
                            }
                          : undefined
                      }
                      className="pk-pack-top-strip relative z-20 flex items-center justify-between rounded-t-[11px] border-b border-dashed border-white/40 bg-white/10 px-3 py-2"
                    >
                      <span className="font-mono text-[9px] font-semibold tracking-[0.14em] text-white/90">
                        {t.packBadge(nextPackNumber)}
                      </span>
                      <Scissors
                        className="h-3 w-3 text-white/85"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="pk-tear-spark" aria-hidden="true" />

                    <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-2.5 overflow-hidden px-3 text-center">
                      <svg
                        viewBox="0 0 48 48"
                        className="h-14 w-14 text-white/90"
                        aria-hidden="true"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                        />
                        <line
                          x1="4"
                          y1="24"
                          x2="18"
                          y2="24"
                          stroke="currentColor"
                          strokeWidth="2.2"
                        />
                        <line
                          x1="30"
                          y1="24"
                          x2="44"
                          y2="24"
                          stroke="currentColor"
                          strokeWidth="2.2"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                        />
                        <circle cx="24" cy="24" r="2.5" fill="currentColor" />
                      </svg>

                      <div className="space-y-1">
                        <div className="font-mono text-[9.5px] font-semibold tracking-[0.16em] text-white/70">
                          {activeBoxOption.packTag}
                        </div>
                        <div className="font-serif text-lg font-bold leading-tight text-white">
                          Pokémon TCG
                        </div>
                        <div className="font-mono text-[10px] text-white/75">
                          {t.cardsPerPack}
                        </div>
                      </div>
                    </div>

                    <div className="pk-pack-crimp relative z-10 rounded-b-[11px] border-t border-white/20 bg-black/25 px-3 py-1.5 text-center font-mono text-[9.5px] tracking-wide text-white/80">
                      {phase === 'ripping' ? t.rippingLabel : t.tearHint}
                    </div>

                    <div
                      className="pk-pack-sheen rounded-[12px]"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRipPack}
                  disabled={phase === 'ripping'}
                  className="folio-btn-primary w-full justify-center"
                >
                  <PackageOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>
                    {phase === 'ripping' ? t.rippingLabel : t.ripButton}
                  </span>
                </button>
              </>
            ) : (
              <div className="flex min-h-[296px] w-full flex-col items-center justify-center gap-3 rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated/60 p-5 text-center">
                <Sparkles
                  className="h-6 w-6 text-folio-ink"
                  aria-hidden="true"
                />
                <p className="font-serif text-base font-bold text-folio-ink">
                  {t.boxDoneTitle}
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenNewBox(boxState.boxId)}
                  className="folio-btn-primary"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.newBoxBtn}</span>
                </button>
              </div>
            )}
          </div>
        ) : phase === 'drawing' ? (
          <div className="flex flex-col items-center gap-3 py-1">
            <div className="pk-draw-stage relative aspect-[63/88] w-[212px] overflow-hidden rounded-[12px]">
              <div className="pk-draw-deck absolute inset-x-2.5 bottom-3 top-2 z-10">
                <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[10px] border border-folio-border bg-folio-surface opacity-70" />
                <div className="absolute inset-0 translate-x-0.5 translate-y-0.5 rounded-[10px] border border-folio-border bg-folio-surface opacity-85" />
                <div className="relative h-full w-full overflow-hidden rounded-[10px] border border-folio-border bg-folio-elevated shadow-soft">
                  <img
                    src={POKEMON_CARD_BACK_URL}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div
                style={{ background: activeBoxOption.accentGradient }}
                className="pk-draw-pouch absolute inset-x-0 bottom-0 z-20 flex h-[62%] flex-col justify-between overflow-hidden rounded-b-[12px] border border-white/25 text-white shadow-soft"
              >
                <div className="h-2 w-full bg-black/35" />
                <div className="px-3 text-center">
                  <div className="font-mono text-[9px] tracking-[0.16em] text-white/70">
                    {activeBoxOption.packTag}
                  </div>
                  <div className="font-serif text-sm font-bold text-white/95">
                    Pokémon TCG
                  </div>
                </div>
                <div className="border-t border-white/20 bg-black/25 py-1 text-center font-mono text-[9px] text-white/75">
                  {t.packBadge(openedPackNumber)}
                </div>
              </div>
            </div>

            <div className="flex min-h-[38px] w-full items-center justify-center rounded-full border border-folio-border bg-folio-elevated px-3 font-mono text-[11px] font-medium text-folio-muted">
              {t.drawingLabel}
            </div>
          </div>
        ) : phase === 'revealing' && activeCard ? (
          <div className="flex flex-col items-center gap-2.5">
            <div className="flex w-full items-center justify-between gap-2 font-mono text-[11px]">
              <span className="font-semibold tabular-nums text-folio-ink">
                {t.cardCounter(revealIndex + 1)}
              </span>

              {isCardFlipped ? (
                <span
                  data-tier={activeCard.tier}
                  className="pk-tier-pill inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold"
                >
                  {isHitTier(activeCard.tier) && (
                    <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                  )}
                  <span>{TIER_LABELS[locale][activeCard.tier]}</span>
                </span>
              ) : (
                <span className="rounded-full border border-folio-border bg-folio-elevated px-2 py-0.5 text-[10px] font-medium text-folio-muted">
                  {t.tapToFlip}
                </span>
              )}
            </div>

            <div className="relative aspect-[63/88] w-[212px]">
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
                {isCardFlipped && isHitTier(activeCard.tier) && (
                  <div
                    key={`burst-${activeCard.id}-${revealIndex}`}
                    data-tier={activeCard.tier}
                    className="pk-reveal-burst"
                    aria-hidden="true"
                  />
                )}

                <div
                  ref={tiltElRef}
                  data-active={isTiltActive && isCardFlipped ? 'true' : 'false'}
                  data-tier={activeCard.tier}
                  data-flipped={isCardFlipped ? 'true' : 'false'}
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
                    {failedImages[activeCard.id] ? (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-3 text-center">
                        <span className="font-serif text-sm font-bold text-folio-ink">
                          {activeCard.name}
                        </span>
                        <span className="font-mono text-[10px] text-folio-muted">
                          {activeCard.rarity}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={getCardImageUrl(activeCard, false)}
                        alt={activeCard.name}
                        decoding="async"
                        onError={() =>
                          setFailedImages((prev) => ({
                            ...prev,
                            [activeCard.id]: true,
                          }))
                        }
                        className="h-full w-full object-cover"
                      />
                    )}
                    <div className="pk-holo-shine" aria-hidden="true" />
                    <div className="pk-holo-glare" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex min-h-[38px] w-full items-center justify-between gap-2 px-0.5">
              {isCardFlipped ? (
                <>
                  <div className="min-w-0">
                    <div className="truncate font-serif text-sm font-bold leading-snug text-folio-ink">
                      {activeCard.name}
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] tabular-nums text-folio-faint">
                      <span className="truncate">
                        {formatCardPrice(activeCard.price)}
                      </span>
                      {getCardPower(activeCard) > 0 && (
                        <>
                          <span>·</span>
                          <span>PWR {getCardPower(activeCard)}</span>
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

            <div className="flex w-full items-center gap-1.5">
              <button
                type="button"
                onClick={handleCardAction}
                disabled={cardTransition === 'exiting'}
                className="folio-btn-primary flex-1 justify-center !min-h-[36px] !px-3"
              >
                <span>
                  {!isCardFlipped
                    ? t.flipCardBtn(revealIndex + 1)
                    : revealIndex + 1 >= CARDS_PER_PACK
                      ? t.finishPack
                      : t.nextCard}
                </span>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={handleRevealAll}
                className="folio-btn-compact !min-h-[36px] !px-2.5"
              >
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.revealAll}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-1.5 font-mono text-[11px]">
              <span className="truncate font-semibold text-folio-ink">
                {t.summaryTitle(openedPackNumber)}
              </span>
              <div className="flex shrink-0 items-center gap-1">
                <span className="rounded-full border border-folio-border bg-folio-elevated px-2 py-0.5 text-[10px] font-semibold tabular-nums text-folio-ink">
                  {formatCardPrice(packTotalValue)}
                </span>
                <span className="rounded-full border border-folio-border bg-folio-elevated px-2 py-0.5 text-[10px] font-semibold text-folio-muted">
                  {t.hitsLabel(packHitsCount)}
                </span>
              </div>
            </div>

            <div
              aria-label={t.summaryTitle(openedPackNumber)}
              className="grid grid-cols-5 gap-1.5"
            >
              {currentPack.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setInspectedCard(card)}
                  title={`${card.name} · ${card.set.toUpperCase()} #${card.num} · ${formatCardPrice(card.price)} (${card.rarity})`}
                  data-card-id={card.id}
                  data-tier={card.tier}
                  className="pk-mini-card group relative aspect-[63/88] w-full overflow-hidden rounded-[5px] border border-folio-border bg-folio-elevated transition-transform duration-150 hover:-translate-y-0.5 hover:border-folio-strong"
                >
                  {failedImages[card.id] ? (
                    <span className="flex h-full w-full items-center justify-center p-1 text-center font-mono text-[8px] leading-tight text-folio-ink">
                      {card.name}
                    </span>
                  ) : (
                    <img
                      src={getCardImageUrl(card, false)}
                      alt={card.name}
                      decoding="async"
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [card.id]: true,
                        }))
                      }
                      className="h-full w-full object-cover"
                    />
                  )}
                </button>
              ))}
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
          </div>
        )}

        <div className="flex items-center justify-between gap-2 border-t border-folio-border pt-2.5">
          <button
            type="button"
            onClick={() => setBinderOpen(true)}
            className="folio-btn-compact flex-1 justify-center !min-h-[34px] !px-2.5"
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.collectionBtn(uniqueOwnedCount)}</span>
          </button>

          {boxState.packsRemaining < PACKS_PER_BOX && (
            <button
              type="button"
              onClick={() => handleOpenNewBox(boxState.boxId)}
              className="folio-btn-compact !min-h-[34px] !px-2.5"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.freshBoxShort}</span>
            </button>
          )}
        </div>
      </div>

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
