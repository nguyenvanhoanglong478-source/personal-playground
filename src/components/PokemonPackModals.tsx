import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, Sparkles, Trash2, X } from 'lucide-react';
import { Locale } from '../data/profile';
import {
  POKEMON_CARD_BACK_URL,
  POKEMON_UNBOXER_LABELS,
  PokemonCatalogCard,
  PokemonCatalogData,
  TIER_LABELS,
  TIER_ORDER,
  getCardImageUrl,
  isHitTier,
} from '../data/pokemonPack';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface HoloTiltState {
  rx: number;
  ry: number;
  px: number;
  py: number;
  trx: number;
  tryVal: number;
  tpx: number;
  tpy: number;
}

const INSPECT_LERP = 0.26;
const INSPECT_EPS = 0.05;
const BINDER_PAGE_SIZE = 24;

interface CardInspectorModalProps {
  card: PokemonCatalogCard | null;
  setsMap: Record<string, string>;
  ownedCount: number;
  locale: Locale;
  onClose: () => void;
}

export const CardInspectorModal: React.FC<CardInspectorModalProps> = ({
  card,
  setsMap,
  ownedCount,
  locale,
  onClose,
}) => {
  const shouldReduceMotion = usePrefersReducedMotion();
  const t = POKEMON_UNBOXER_LABELS[locale];
  const [imgStage, setImgStage] = useState<'hires' | 'small' | 'fallback'>(
    'hires'
  );
  const [isActive, setIsActive] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const motionRef = useRef<HoloTiltState>({
    rx: 0,
    ry: 0,
    px: 50,
    py: 50,
    trx: 0,
    tryVal: 0,
    tpx: 50,
    tpy: 50,
  });

  useEffect(() => {
    setImgStage('hires');
    setIsActive(false);
    motionRef.current = {
      rx: 0,
      ry: 0,
      px: 50,
      py: 50,
      trx: 0,
      tryVal: 0,
      tpx: 50,
      tpy: 50,
    };
  }, [card?.id]);

  useEffect(() => {
    if (!card) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [card, onClose]);

  const applyVars = useCallback((s: HoloTiltState) => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--pk-rx', `${s.rx.toFixed(2)}deg`);
    el.style.setProperty('--pk-ry', `${s.ry.toFixed(2)}deg`);
    el.style.setProperty('--pk-px', `${s.px.toFixed(2)}%`);
    el.style.setProperty('--pk-py', `${s.py.toFixed(2)}%`);
  }, []);

  const stepTilt = useCallback(() => {
    const s = motionRef.current;
    s.rx += (s.trx - s.rx) * INSPECT_LERP;
    s.ry += (s.tryVal - s.ry) * INSPECT_LERP;
    s.px += (s.tpx - s.px) * INSPECT_LERP;
    s.py += (s.tpy - s.py) * INSPECT_LERP;

    const settled =
      Math.abs(s.trx - s.rx) < INSPECT_EPS &&
      Math.abs(s.tryVal - s.ry) < INSPECT_EPS &&
      Math.abs(s.tpx - s.px) < INSPECT_EPS &&
      Math.abs(s.tpy - s.py) < INSPECT_EPS;

    if (settled) {
      s.rx = s.trx;
      s.ry = s.tryVal;
      s.px = s.tpx;
      s.py = s.tpy;
      applyVars(s);
      rafRef.current = null;
      return;
    }

    applyVars(s);
    rafRef.current = window.requestAnimationFrame(stepTilt);
  }, [applyVars]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const scheduleTilt = useCallback(() => {
    if (shouldReduceMotion) {
      const s = motionRef.current;
      s.rx = 0;
      s.ry = 0;
      s.px = s.tpx;
      s.py = s.tpy;
      applyVars(s);
      return;
    }
    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(stepTilt);
    }
  }, [applyVars, shouldReduceMotion, stepTilt]);

  const updatePointer = (clientX: number, clientY: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const nx = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const ny = Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);
    const s = motionRef.current;
    s.tpx = nx * 100;
    s.tpy = ny * 100;
    s.trx = -(ny - 0.5) * 24;
    s.tryVal = (nx - 0.5) * 24;
    setIsActive(true);
    scheduleTilt();
  };

  const resetPointer = () => {
    const s = motionRef.current;
    s.trx = 0;
    s.tryVal = 0;
    s.tpx = 50;
    s.tpy = 50;
    setIsActive(false);
    scheduleTilt();
  };

  if (!card || typeof document === 'undefined') return null;

  const imgUrl =
    imgStage === 'hires'
      ? getCardImageUrl(card, true)
      : imgStage === 'small'
        ? getCardImageUrl(card, false)
        : '';

  const setName = setsMap[card.set] ?? card.set.toUpperCase();

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={card.name}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="folio-card relative flex max-h-[92vh] w-full max-w-[660px] flex-col gap-4 overflow-y-auto !p-4 sm:flex-row sm:items-center sm:!p-6"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.closeModal}
          className="folio-btn-icon absolute right-3 top-3 z-20 !h-8 !w-8"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex flex-col items-center gap-2 sm:w-[270px] sm:shrink-0">
          <div
            ref={stageRef}
            onPointerMove={(event) =>
              updatePointer(event.clientX, event.clientY)
            }
            onPointerDown={(event) =>
              updatePointer(event.clientX, event.clientY)
            }
            onPointerLeave={resetPointer}
            onPointerUp={resetPointer}
            onPointerCancel={resetPointer}
            className="pk-tilt-stage aspect-[63/88] w-full max-w-[260px]"
          >
            <div
              ref={cardRef}
              data-active={isActive ? 'true' : 'false'}
              data-tier={card.tier}
              className="pk-tilt-card relative h-full w-full overflow-hidden rounded-[12px] border border-folio-border bg-folio-elevated shadow-soft"
            >
              {imgStage === 'fallback' ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
                  <img
                    src={POKEMON_CARD_BACK_URL}
                    alt=""
                    aria-hidden="true"
                    className="h-24 w-16 rounded border border-folio-border object-cover opacity-70"
                  />
                  <div className="font-serif text-base font-bold text-folio-ink">
                    {card.name}
                  </div>
                  <div className="font-mono text-[11px] text-folio-muted">
                    {setName} · #{card.num}
                  </div>
                </div>
              ) : (
                <img
                  src={imgUrl}
                  alt={card.name}
                  decoding="async"
                  onError={() =>
                    setImgStage((prev) =>
                      prev === 'hires' ? 'small' : 'fallback'
                    )
                  }
                  className="h-full w-full select-none object-cover"
                />
              )}
              <div className="pk-holo-shine" aria-hidden="true" />
              <div className="pk-holo-glare" aria-hidden="true" />
            </div>
          </div>

          <p className="text-center font-mono text-[10.5px] text-folio-faint">
            {t.tiltHint}
          </p>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:pr-6">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              data-tier={card.tier}
              className="pk-tier-pill inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] font-semibold"
            >
              {isHitTier(card.tier) && (
                <Sparkles className="h-3 w-3" aria-hidden="true" />
              )}
              <span>{TIER_LABELS[locale][card.tier]}</span>
            </span>

            {ownedCount > 0 && (
              <span className="rounded-full border border-folio-border bg-folio-elevated px-2.5 py-0.5 font-mono text-[10.5px] font-semibold text-folio-muted">
                {t.ownedLabel(ownedCount)}
              </span>
            )}
          </div>

          <div>
            <h3 className="font-serif text-2xl font-bold leading-tight text-folio-ink">
              {card.name}
            </h3>
            <p className="mt-0.5 font-mono text-xs text-folio-muted">
              {setName} · #{card.num}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-2 border-t border-folio-border pt-3 font-mono text-xs">
            <div className="rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated/70 p-2">
              <dt className="text-[10px] uppercase text-folio-faint">
                {t.rarityLabel}
              </dt>
              <dd className="mt-0.5 font-semibold text-folio-ink">
                {card.rarity}
              </dd>
            </div>

            <div className="rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated/70 p-2">
              <dt className="text-[10px] uppercase text-folio-faint">
                {t.typeLabel}
              </dt>
              <dd className="mt-0.5 font-semibold text-folio-ink">
                {card.type}
              </dd>
            </div>

            <div className="rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated/70 p-2">
              <dt className="text-[10px] uppercase text-folio-faint">
                {t.setLabel}
              </dt>
              <dd className="mt-0.5 truncate font-semibold text-folio-ink">
                {setName}
              </dd>
            </div>

            {card.hp && (
              <div className="rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated/70 p-2">
                <dt className="text-[10px] uppercase text-folio-faint">
                  {t.hpLabel}
                </dt>
                <dd className="mt-0.5 font-semibold tabular-nums text-folio-ink">
                  {card.hp}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>,
    document.body
  );
};

interface CollectionBinderModalProps {
  isOpen: boolean;
  catalog: PokemonCatalogData | null;
  collection: Record<string, number>;
  totalPacksOpened: number;
  locale: Locale;
  onSelectCard: (card: PokemonCatalogCard) => void;
  onResetCollection: () => void;
  onClose: () => void;
}

export const CollectionBinderModal: React.FC<CollectionBinderModalProps> = ({
  isOpen,
  catalog,
  collection,
  totalPacksOpened,
  locale,
  onSelectCard,
  onResetCollection,
  onClose,
}) => {
  const t = POKEMON_UNBOXER_LABELS[locale];
  const [filterMode, setFilterMode] = useState<'all' | 'hits'>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(BINDER_PAGE_SIZE);

  useEffect(() => {
    if (!isOpen) return;
    setVisibleCount(BINDER_PAGE_SIZE);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  const cardById = useMemo(() => {
    const map = new Map<string, PokemonCatalogCard>();
    if (!catalog) return map;
    for (const c of catalog.cards) {
      map.set(c.id, c);
    }
    return map;
  }, [catalog]);

  const ownedEntries = useMemo(() => {
    const items: Array<{ card: PokemonCatalogCard; count: number }> = [];
    for (const [id, count] of Object.entries(collection)) {
      const found = cardById.get(id);
      if (found && count > 0) {
        items.push({ card: found, count });
      }
    }
    items.sort((a, b) => {
      const tierDiff = TIER_ORDER[b.card.tier] - TIER_ORDER[a.card.tier];
      if (tierDiff !== 0) return tierDiff;
      return a.card.name.localeCompare(b.card.name);
    });
    return items;
  }, [cardById, collection]);

  const totalCardCount = useMemo(
    () => ownedEntries.reduce((sum, item) => sum + item.count, 0),
    [ownedEntries]
  );

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ownedEntries.filter(({ card }) => {
      if (filterMode === 'hits' && !isHitTier(card.tier)) return false;
      if (!q) return true;
      const setName = (catalog?.sets[card.set] ?? card.set).toLowerCase();
      return (
        card.name.toLowerCase().includes(q) ||
        setName.includes(q) ||
        card.rarity.toLowerCase().includes(q)
      );
    });
  }, [catalog?.sets, filterMode, ownedEntries, query]);

  if (!isOpen || typeof document === 'undefined') return null;

  const shownEntries = filteredEntries.slice(0, visibleCount);
  const remainingCount = Math.max(0, filteredEntries.length - shownEntries.length);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.binderTitle}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-3 sm:p-5"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="folio-card flex max-h-[88vh] w-full max-w-[880px] flex-col gap-3.5 overflow-hidden !p-4 sm:!p-5"
      >
        <div className="flex items-start justify-between gap-3 border-b border-folio-border pb-3">
          <div className="min-w-0">
            <h3 className="font-serif text-xl font-bold text-folio-ink">
              {t.binderTitle}
            </h3>
            <p className="mt-0.5 font-mono text-[11px] text-folio-muted">
              {t.binderSub(ownedEntries.length, totalCardCount, totalPacksOpened)}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {ownedEntries.length > 0 && (
              <button
                type="button"
                onClick={onResetCollection}
                className="folio-btn-compact !min-h-[32px] !px-2.5 text-[11px]"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{t.resetCollection}</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label={t.closeModal}
              className="folio-btn-icon !h-8 !w-8"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-full border border-folio-border bg-folio-elevated p-0.5">
            {(['all', 'hits'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setFilterMode(mode);
                  setVisibleCount(BINDER_PAGE_SIZE);
                }}
                aria-pressed={filterMode === mode}
                className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors duration-150 ${
                  filterMode === mode
                    ? 'bg-folio-surface font-semibold text-folio-ink shadow-sm'
                    : 'text-folio-muted hover:text-folio-ink'
                }`}
              >
                {mode === 'all' ? t.filterAll : t.filterHits}
              </button>
            ))}
          </div>

          <label className="relative min-w-[180px] flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-folio-faint"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisibleCount(BINDER_PAGE_SIZE);
              }}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-full border border-folio-border bg-folio-elevated py-1.5 pl-8 pr-3 font-mono text-xs text-folio-ink placeholder:text-folio-faint focus:border-folio-strong focus:outline-none"
            />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          {ownedEntries.length === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center rounded-[var(--radius-card)] border border-dashed border-folio-border p-6 text-center font-mono text-xs text-folio-muted">
              {t.emptyBinder}
            </div>
          ) : shownEntries.length === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center rounded-[var(--radius-card)] border border-dashed border-folio-border p-6 text-center font-mono text-xs text-folio-muted">
              {t.emptySearch}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
              {shownEntries.map(({ card, count }) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => onSelectCard(card)}
                  data-tier={card.tier}
                  className="pk-mini-card group relative flex flex-col gap-1 rounded-[8px] border border-folio-border bg-folio-elevated/60 p-1 text-left transition-transform duration-150 hover:-translate-y-0.5 hover:border-folio-strong"
                >
                  <div className="relative aspect-[63/88] w-full overflow-hidden rounded-[5px] bg-folio-bg">
                    <img
                      src={getCardImageUrl(card, false)}
                      alt={card.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    {count > 1 && (
                      <span className="absolute right-1 top-1 rounded bg-black/80 px-1 py-0.5 font-mono text-[9.5px] font-bold leading-none text-white">
                        ×{count}
                      </span>
                    )}
                  </div>
                  <span className="truncate font-sans text-[11px] font-medium text-folio-ink">
                    {card.name}
                  </span>
                </button>
              ))}
            </div>
          )}

          {remainingCount > 0 && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + BINDER_PAGE_SIZE)}
                className="folio-btn-compact"
              >
                {t.loadMore(remainingCount)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
