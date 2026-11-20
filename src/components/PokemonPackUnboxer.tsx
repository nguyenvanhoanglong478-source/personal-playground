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
  generateBoosterPack,
  getBoxOption,
  getBoxPool,
  getCardImageUrl,
  isHitTier,
  loadPokemonCatalog,
  loadSavedBoxState,
  saveBoxState,
} from '../data/pokemonPack';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import {
  CardInspectorModal,
  CollectionBinderModal,
} from './PokemonPackModals';

export interface PokemonPackUnboxerProps {
  locale: Locale;
  theme: 'light' | 'dark';
}

type UnboxPhase = 'sealed' | 'ripping' | 'revealing' | 'summary';

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
  const [openedPackNumber, setOpenedPackNumber] = useState(1);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [inspectedCard, setInspectedCard] = useState<PokemonCatalogCard | null>(
    null
  );
  const [binderOpen, setBinderOpen] = useState(false);
  const [isTiltActive, setIsTiltActive] = useState(false);

  const dragStartXRef = useRef<number | null>(null);
  const dragDidRipRef = useRef(false);
  const ripTimerRef = useRef<number | null>(null);
  const flipTimerRef = useRef<number | null>(null);

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
      if (ripTimerRef.current !== null) {
        window.clearTimeout(ripTimerRef.current);
      }
      if (flipTimerRef.current !== null) {
        window.clearTimeout(flipTimerRef.current);
      }
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

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
      !dragDidRipRef.current &&
      Math.abs(event.clientX - dragStartXRef.current) > 36
    ) {
      dragDidRipRef.current = true;
      dragStartXRef.current = null;
      handleRipPack();
    }
  };

  const resetStageTilt = () => {
    dragStartXRef.current = null;
    const s = tiltRef.current;
    s.trx = 0;
    s.tryVal = 0;
    s.tpx = 50;
    s.tpy = 50;
    setIsTiltActive(false);
    scheduleTilt();
  };

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

  const triggerCardFlipIn = useCallback(() => {
    if (flipTimerRef.current !== null) {
      window.clearTimeout(flipTimerRef.current);
      flipTimerRef.current = null;
    }
    if (shouldReduceMotion) {
      setIsCardFlipped(true);
      return;
    }
    setIsCardFlipped(false);
    flipTimerRef.current = window.setTimeout(() => {
      setIsCardFlipped(true);
      flipTimerRef.current = null;
    }, 65);
  }, [shouldReduceMotion]);

  const handleRipPack = useCallback(() => {
    if (!catalog || phase === 'ripping') return;
    if (boxState.packsRemaining <= 0) return;

    const pulled = generateBoosterPack(catalog.cards, boxState.boxId);
    const currentNum = PACKS_PER_BOX - boxState.packsRemaining + 1;

    preloadPackImages(pulled);
    setCurrentPack(pulled);
    setOpenedPackNumber(currentNum);
    setRevealIndex(0);
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

    if (ripTimerRef.current !== null) {
      window.clearTimeout(ripTimerRef.current);
      ripTimerRef.current = null;
    }

    if (shouldReduceMotion) {
      setPhase('revealing');
      setIsCardFlipped(true);
      return;
    }

    setPhase('ripping');
    ripTimerRef.current = window.setTimeout(() => {
      setPhase('revealing');
      triggerCardFlipIn();
      ripTimerRef.current = null;
    }, 340);
  }, [
    boxState.boxId,
    boxState.packsRemaining,
    catalog,
    phase,
    shouldReduceMotion,
    triggerCardFlipIn,
  ]);

  const handleAdvanceCard = () => {
    if (phase !== 'revealing') return;
    if (!isCardFlipped) {
      setIsCardFlipped(true);
      return;
    }
    if (revealIndex + 1 >= currentPack.length) {
      setPhase('summary');
      return;
    }
    setRevealIndex((prev) => prev + 1);
    triggerCardFlipIn();
  };

  const handleRevealAll = () => {
    if (phase !== 'revealing') return;
    setPhase('summary');
  };

  const handlePrepareNextPack = () => {
    if (boxState.packsRemaining <= 0) {
      handleOpenNewBox(boxState.boxId);
      return;
    }
    setCurrentPack([]);
    setRevealIndex(0);
    setPhase('sealed');
  };

  const handleOpenNewBox = (targetBoxId: BoxThemeId = boxState.boxId) => {
    if (ripTimerRef.current !== null) {
      window.clearTimeout(ripTimerRef.current);
      ripTimerRef.current = null;
    }
    setBoxState((prev) => ({
      ...prev,
      boxId: targetBoxId,
      packsRemaining: PACKS_PER_BOX,
    }));
    setCurrentPack([]);
    setRevealIndex(0);
    setPhase('sealed');
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

  const openedCountInBox = PACKS_PER_BOX - boxState.packsRemaining;

  return (
    <div className="mx-auto w-full max-w-[330px] lg:mx-0">
      <div className="folio-card flex flex-col gap-3 !p-4">
        <div className="flex items-center justify-between gap-2 border-b border-folio-border pb-2.5">
          <div className="flex min-w-0 items-center gap-1.5 font-mono text-[10.5px] font-semibold tracking-wider text-folio-muted">
            <Layers className="h-3.5 w-3.5 shrink-0 text-folio-ink" aria-hidden="true" />
            <span className="truncate">{t.kicker}</span>
          </div>

          <span className="shrink-0 rounded-full border border-folio-border bg-folio-elevated px-2 py-0.5 font-mono text-[10.5px] font-semibold tabular-nums text-folio-ink">
            {t.packsLeft(boxState.packsRemaining)}
          </span>
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
          <div className="flex min-h-[310px] flex-col items-center justify-center gap-3 rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated/60 p-5 text-center">
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
          <div className="flex min-h-[310px] flex-col items-center justify-center gap-2 rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated/50 p-5 text-center">
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
                    style={{ background: activeBoxOption.accentGradient }}
                    className="pk-tilt-card pk-booster-pack relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[12px] border border-white/20 text-white shadow-soft"
                  >
                    <div className="pk-pack-top-strip relative z-20 flex items-center justify-between border-b border-dashed border-white/35 bg-white/10 px-3 py-2">
                      <span className="font-mono text-[9px] font-semibold tracking-[0.14em] text-white/85">
                        {t.packBadge(nextPackNumber)}
                      </span>
                      <Scissors
                        className="h-3 w-3 text-white/80"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-2.5 px-3 text-center">
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

                    <div className="pk-pack-crimp relative z-10 border-t border-white/20 bg-black/25 px-3 py-1.5 text-center font-mono text-[9.5px] tracking-wide text-white/80">
                      {phase === 'ripping' ? t.rippingLabel : t.tearHint}
                    </div>

                    <div className="pk-pack-sheen" aria-hidden="true" />
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
        ) : phase === 'revealing' && activeCard ? (
          <div className="flex flex-col items-center gap-2.5">
            <div className="flex w-full items-center justify-between gap-2 font-mono text-[11px]">
              <span className="font-semibold tabular-nums text-folio-ink">
                {t.cardCounter(revealIndex + 1)}
              </span>

              <span
                data-tier={activeCard.tier}
                className="pk-tier-pill inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold"
              >
                {isHitTier(activeCard.tier) && (
                  <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                )}
                <span>{TIER_LABELS[locale][activeCard.tier]}</span>
              </span>
            </div>

            <div
              ref={stageRef}
              onPointerMove={handleStagePointerMove}
              onPointerLeave={resetStageTilt}
              onPointerCancel={resetStageTilt}
              onClick={handleAdvanceCard}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleAdvanceCard();
                }
              }}
              aria-label={`${activeCard.name} - ${t.tapCardHint}`}
              className="pk-tilt-stage aspect-[63/88] w-[212px] cursor-pointer select-none"
            >
              <div
                ref={tiltElRef}
                data-active={isTiltActive ? 'true' : 'false'}
                data-tier={activeCard.tier}
                data-flipped={isCardFlipped ? 'true' : 'false'}
                className="pk-tilt-card pk-flip-card relative h-full w-full"
              >
                <div className="pk-flip-face pk-flip-back overflow-hidden rounded-[11px] border border-folio-border bg-folio-elevated">
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

            <div className="flex w-full items-center justify-between gap-2 px-0.5">
              <div className="min-w-0">
                <div className="truncate font-serif text-sm font-bold leading-snug text-folio-ink">
                  {activeCard.name}
                </div>
                <div className="truncate font-mono text-[10px] text-folio-faint">
                  {(catalog.sets[activeCard.set] ?? activeCard.set)} · #
                  {activeCard.num}
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
            </div>

            <div className="flex w-full items-center gap-1.5">
              <button
                type="button"
                onClick={handleAdvanceCard}
                className="folio-btn-primary flex-1 justify-center !min-h-[36px] !px-3"
              >
                <span>
                  {revealIndex + 1 >= CARDS_PER_PACK
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
            <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
              <span className="font-semibold text-folio-ink">
                {t.summaryTitle(openedPackNumber)}
              </span>
              <span className="rounded-full border border-folio-border bg-folio-elevated px-2 py-0.5 text-[10px] font-semibold text-folio-muted">
                {t.hitsLabel(packHitsCount)}
              </span>
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
                  title={`${card.name} · ${card.set.toUpperCase()} #${card.num} (${card.rarity})`}
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
