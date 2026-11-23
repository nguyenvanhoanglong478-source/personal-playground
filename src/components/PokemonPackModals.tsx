import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { RotateCcw, Search, Sparkles, Trash2, X } from 'lucide-react';
import { Locale } from '../data/profile';
import {
  BinderSortMode,
  BoosterBoxOption,
  BoxThemeId,
  CardImageStage,
  FOIL_STYLE_LABELS,
  POKEMON_CARD_BACK_URL,
  POKEMON_UNBOXER_LABELS,
  PokemonCardTier,
  PokemonCatalogCard,
  PokemonCatalogData,
  TIER_LABELS,
  TIER_LIST,
  TIER_ORDER,
  formatCardPrice,
  getCardFoilStyle,
  getCardImageUrl,
  getCardPower,
  getPackBoxOrder,
  isHitTier,
  resolveCardPackBox,
} from '../data/pokemonPack';
import { useCardTilt } from '../hooks/useCardTilt';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const BINDER_PAGE_SIZE = 24;
const VALUE_THRESHOLDS = [0, 1, 5, 20, 50];
const POWER_THRESHOLDS = [0, 150, 300, 450];

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
  const [imgStage, setImgStage] = useState<CardImageStage>('webp');
  const [imgLoaded, setImgLoaded] = useState(false);

  const {
    stageRef,
    cardRef,
    isTiltActive: isActive,
    updateTiltFromPointer: updatePointer,
    resetTilt: resetPointer,
    resetTiltImmediately,
  } = useCardTilt({
    maxDeg: 24,
    lerp: 0.26,
    disabled: shouldReduceMotion,
  });

  useEffect(() => {
    setImgStage('webp');
    setImgLoaded(false);
    resetTiltImmediately();
  }, [card?.id, resetTiltImmediately]);

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

  if (!card || typeof document === 'undefined') return null;

  const imgUrl =
    imgStage === 'webp'
      ? getCardImageUrl(card, 'inspect', false)
      : imgStage === 'direct'
        ? getCardImageUrl(card, 'inspect', true)
        : '';

  const setName = setsMap[card.set] ?? card.set.toUpperCase();
  const powerVal = getCardPower(card);
  const foilStyle = getCardFoilStyle(card);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={card.name}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4"
    >
      <div
        data-lenis-prevent
        onClick={(event) => event.stopPropagation()}
        className="folio-card relative flex max-h-[92vh] w-full max-w-[680px] flex-col gap-4 overflow-y-auto !p-4 sm:flex-row sm:items-center sm:!p-6"
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
              data-foil={foilStyle}
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
                <>
                  {!imgLoaded && (
                    <div className="pk-card-skeleton" aria-hidden="true" />
                  )}
                  <img
                    ref={(el) => {
                      if (el?.complete && el.naturalWidth > 0 && !imgLoaded) {
                        setImgLoaded(true);
                      }
                    }}
                    src={imgUrl}
                    alt={card.name}
                    fetchPriority="high"
                    decoding="async"
                    onLoad={() => setImgLoaded(true)}
                    onError={() => {
                      setImgLoaded(false);
                      setImgStage((prev) =>
                        prev === 'webp' ? 'direct' : 'fallback'
                      );
                    }}
                    className={`relative z-[1] h-full w-full select-none object-cover transition-opacity duration-150 ${
                      imgLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </>
              )}
              <div className="pk-holo-foil" aria-hidden="true" />
              <div className="pk-holo-glitter" aria-hidden="true" />
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

            <span className="rounded-full border border-folio-border bg-folio-elevated px-2.5 py-0.5 font-mono text-[10.5px] font-medium text-folio-muted">
              {FOIL_STYLE_LABELS[locale][foilStyle]}
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
                {t.valueLabel}
              </dt>
              <dd className="mt-0.5 font-semibold tabular-nums text-folio-ink">
                {formatCardPrice(card.price)}
              </dd>
            </div>

            <div className="rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated/70 p-2">
              <dt className="text-[10px] uppercase text-folio-faint">
                {t.powerLabel}
              </dt>
              <dd className="mt-0.5 font-semibold tabular-nums text-folio-ink">
                {powerVal > 0
                  ? `${powerVal} (${card.hp ?? 0}/${card.atk ?? 0})`
                  : '—'}
              </dd>
            </div>

            <div className="rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated/70 p-2">
              <dt className="text-[10px] uppercase text-folio-faint">
                {t.rarityLabel}
              </dt>
              <dd className="mt-0.5 truncate font-semibold text-folio-ink">
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
                {t.hpLabel}
              </dt>
              <dd className="mt-0.5 font-semibold tabular-nums text-folio-ink">
                {card.hp ? card.hp : '—'}
              </dd>
            </div>

            <div className="rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated/70 p-2">
              <dt className="text-[10px] uppercase text-folio-faint">
                {t.atkLabel}
              </dt>
              <dd className="mt-0.5 font-semibold tabular-nums text-folio-ink">
                {card.atk ? card.atk : '—'}
              </dd>
            </div>
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
  const [rarityFilter, setRarityFilter] = useState<'all' | PokemonCardTier>(
    'all'
  );
  const [minPrice, setMinPrice] = useState<number>(0);
  const [minPower, setMinPower] = useState<number>(0);
  const [sortBy, setSortBy] = useState<BinderSortMode>('pack_group');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(BINDER_PAGE_SIZE);
  const [imgStages, setImgStages] = useState<Record<string, CardImageStage>>(
    {}
  );

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
    return items;
  }, [cardById, collection]);

  const tierCounts = useMemo(() => {
    const counts: Record<PokemonCardTier, number> = {
      common: 0,
      uncommon: 0,
      rare: 0,
      ultra: 0,
      secret: 0,
    };
    for (const { card } of ownedEntries) {
      counts[card.tier] += 1;
    }
    return counts;
  }, [ownedEntries]);

  const totalCardCount = useMemo(
    () => ownedEntries.reduce((sum, item) => sum + item.count, 0),
    [ownedEntries]
  );

  const totalBinderValue = useMemo(
    () =>
      ownedEntries.reduce(
        (sum, item) => sum + (item.card.price ?? 0) * item.count,
        0
      ),
    [ownedEntries]
  );

  const packPoolSizes = useMemo(() => {
    const counts = new Map<BoxThemeId, number>();
    if (!catalog) return counts;
    for (const card of catalog.cards) {
      const box = resolveCardPackBox(card.set);
      if (box.id === 'all') continue;
      counts.set(box.id, (counts.get(box.id) ?? 0) + 1);
    }
    return counts;
  }, [catalog]);

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = ownedEntries.filter(({ card }) => {
      if (rarityFilter !== 'all' && card.tier !== rarityFilter) return false;
      if (minPrice > 0 && (card.price ?? 0) < minPrice) return false;
      if (minPower > 0 && getCardPower(card) < minPower) return false;
      if (!q) return true;
      const setName = (catalog?.sets[card.set] ?? card.set).toLowerCase();
      const packLabel = resolveCardPackBox(card.set).label[locale].toLowerCase();
      return (
        card.name.toLowerCase().includes(q) ||
        setName.includes(q) ||
        packLabel.includes(q) ||
        card.rarity.toLowerCase().includes(q)
      );
    });

    list.sort((a, b) => {
      if (sortBy === 'pack_group') {
        const packDiff =
          getPackBoxOrder(resolveCardPackBox(a.card.set).id) -
          getPackBoxOrder(resolveCardPackBox(b.card.set).id);
        if (packDiff !== 0) return packDiff;
      } else if (sortBy === 'price_desc') {
        const diff = (b.card.price ?? 0) - (a.card.price ?? 0);
        if (diff !== 0) return diff;
      } else if (sortBy === 'price_asc') {
        const diff = (a.card.price ?? 0) - (b.card.price ?? 0);
        if (diff !== 0) return diff;
      } else if (sortBy === 'power_desc') {
        const diff = getCardPower(b.card) - getCardPower(a.card);
        if (diff !== 0) return diff;
      } else if (sortBy === 'hp_desc') {
        const diff = (b.card.hp ?? 0) - (a.card.hp ?? 0);
        if (diff !== 0) return diff;
      } else if (sortBy === 'name_asc') {
        return a.card.name.localeCompare(b.card.name);
      }
      const tierDiff = TIER_ORDER[b.card.tier] - TIER_ORDER[a.card.tier];
      if (tierDiff !== 0) return tierDiff;
      const priceDiff = (b.card.price ?? 0) - (a.card.price ?? 0);
      if (priceDiff !== 0) return priceDiff;
      return a.card.name.localeCompare(b.card.name);
    });

    return list;
  }, [
    catalog?.sets,
    locale,
    minPower,
    minPrice,
    ownedEntries,
    query,
    rarityFilter,
    sortBy,
  ]);

  const packTotalsByBox = useMemo(() => {
    const stats = new Map<
      BoxThemeId,
      { unique: number; copies: number; value: number }
    >();
    for (const { card, count } of filteredEntries) {
      const boxId = resolveCardPackBox(card.set).id;
      const prev = stats.get(boxId) ?? { unique: 0, copies: 0, value: 0 };
      prev.unique += 1;
      prev.copies += count;
      prev.value += (card.price ?? 0) * count;
      stats.set(boxId, prev);
    }
    return stats;
  }, [filteredEntries]);

  const hasActiveFilters =
    rarityFilter !== 'all' ||
    minPrice > 0 ||
    minPower > 0 ||
    query.trim().length > 0;

  const resetFilters = () => {
    setRarityFilter('all');
    setMinPrice(0);
    setMinPower(0);
    setQuery('');
    setVisibleCount(BINDER_PAGE_SIZE);
  };

  if (!isOpen || typeof document === 'undefined') return null;

  const shownEntries = filteredEntries.slice(0, visibleCount);
  const remainingCount = Math.max(0, filteredEntries.length - shownEntries.length);

  const groupedShownPacks: Array<{
    box: BoosterBoxOption;
    entries: Array<{ card: PokemonCatalogCard; count: number }>;
  }> = [];

  if (sortBy === 'pack_group') {
    for (const entry of shownEntries) {
      const box = resolveCardPackBox(entry.card.set);
      const last = groupedShownPacks[groupedShownPacks.length - 1];
      if (last && last.box.id === box.id) {
        last.entries.push(entry);
      } else {
        groupedShownPacks.push({ box, entries: [entry] });
      }
    }
  }

  const renderCardTile = (card: PokemonCatalogCard, count: number) => {
    const powerVal = getCardPower(card);
    const miniFoil = getCardFoilStyle(card);
    const imgStage = imgStages[card.id] ?? 'webp';
    return (
      <button
        key={card.id}
        type="button"
        onClick={() => onSelectCard(card)}
        data-tier={card.tier}
        data-foil={miniFoil}
        data-card-id={card.id}
        className="pk-mini-card group relative flex flex-col gap-1 rounded-[8px] border border-folio-border bg-folio-elevated/60 p-1.5 text-left transition-transform duration-150 hover:-translate-y-0.5 hover:border-folio-strong"
      >
        <div className="relative aspect-[63/88] w-full overflow-hidden rounded-[5px] bg-folio-bg">
          {imgStage === 'fallback' ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2 text-center">
              <span className="font-serif text-xs font-bold text-folio-ink">
                {card.name}
              </span>
              <span className="font-mono text-[9px] text-folio-muted">
                #{card.num}
              </span>
            </div>
          ) : (
            <img
              src={getCardImageUrl(card, 'thumb', imgStage === 'direct')}
              alt={card.name}
              loading="lazy"
              decoding="async"
              onError={() =>
                setImgStages((prev) => {
                  const current = prev[card.id] ?? 'webp';
                  return {
                    ...prev,
                    [card.id]: current === 'webp' ? 'direct' : 'fallback',
                  };
                })
              }
              className="h-full w-full object-cover"
            />
          )}
          {miniFoil !== 'none' && (
            <span className="pk-mini-glint" aria-hidden="true" />
          )}
          {count > 1 && (
            <span className="absolute right-1 top-1 z-10 rounded bg-black/80 px-1 py-0.5 font-mono text-[9.5px] font-bold leading-none text-white">
              ×{count}
            </span>
          )}
        </div>
        <span className="truncate font-sans text-[11px] font-semibold text-folio-ink">
          {card.name}
        </span>
        <div className="flex items-center justify-between gap-1 font-mono text-[9.5px] tabular-nums text-folio-muted">
          <span>{formatCardPrice(card.price)}</span>
          <span>{powerVal > 0 ? `PWR ${powerVal}` : '—'}</span>
        </div>
      </button>
    );
  };

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
        className="folio-card flex max-h-[90vh] w-full max-w-[940px] flex-col gap-3 overflow-hidden !p-4 sm:!p-5"
      >
        <div className="flex items-start justify-between gap-3 border-b border-folio-border pb-3">
          <div className="min-w-0">
            <h3 className="font-serif text-xl font-bold text-folio-ink">
              {t.binderTitle}
            </h3>
            <p className="mt-0.5 font-mono text-[11px] tabular-nums text-folio-muted">
              {t.binderSub(
                ownedEntries.length,
                totalCardCount,
                totalPacksOpened,
                totalBinderValue > 0 ? formatCardPrice(totalBinderValue) : '$0.00'
              )}
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

        <div className="flex flex-col gap-2">
          <div
            role="group"
            aria-label={t.rarityFilterAria}
            className="flex flex-wrap items-center gap-1"
          >
            <button
              type="button"
              onClick={() => {
                setRarityFilter('all');
                setVisibleCount(BINDER_PAGE_SIZE);
              }}
              aria-pressed={rarityFilter === 'all'}
              className={`rounded-full border px-2.5 py-1 font-mono text-[10.5px] transition-colors duration-150 ${
                rarityFilter === 'all'
                  ? 'border-folio-strong bg-folio-surface font-semibold text-folio-ink shadow-sm'
                  : 'border-folio-border bg-folio-elevated text-folio-muted hover:text-folio-ink'
              }`}
            >
              {t.filterAll} ({ownedEntries.length})
            </button>

            {TIER_LIST.map((tier) => {
              const isSelected = rarityFilter === tier;
              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => {
                    setRarityFilter(tier);
                    setVisibleCount(BINDER_PAGE_SIZE);
                  }}
                  aria-pressed={isSelected}
                  data-tier={tier}
                  className={`rounded-full border px-2.5 py-1 font-mono text-[10.5px] transition-colors duration-150 ${
                    isSelected
                      ? 'border-folio-strong bg-folio-surface font-semibold text-folio-ink shadow-sm'
                      : 'border-folio-border bg-folio-elevated text-folio-muted hover:text-folio-ink'
                  }`}
                >
                  {TIER_LABELS[locale][tier]} ({tierCounts[tier]})
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-12">
            <label className="relative sm:col-span-4">
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
                className="min-h-[34px] w-full rounded-[var(--radius-control)] border border-folio-border bg-folio-elevated py-1 pl-8 pr-3 font-mono text-[11px] text-folio-ink placeholder:text-folio-faint focus:border-folio-strong focus:outline-none"
              />
            </label>

            <select
              aria-label={t.valueFilterAria}
              value={minPrice}
              onChange={(event) => {
                setMinPrice(Number(event.target.value));
                setVisibleCount(BINDER_PAGE_SIZE);
              }}
              className="min-h-[34px] cursor-pointer rounded-[var(--radius-control)] border border-folio-border bg-folio-elevated px-2.5 font-mono text-[11px] text-folio-ink focus:border-folio-strong focus:outline-none sm:col-span-2"
            >
              {VALUE_THRESHOLDS.map((val) => (
                <option key={val} value={val}>
                  {val === 0 ? t.valueAny : t.valueMin(val)}
                </option>
              ))}
            </select>

            <select
              aria-label={t.powerFilterAria}
              value={minPower}
              onChange={(event) => {
                setMinPower(Number(event.target.value));
                setVisibleCount(BINDER_PAGE_SIZE);
              }}
              className="min-h-[34px] cursor-pointer rounded-[var(--radius-control)] border border-folio-border bg-folio-elevated px-2.5 font-mono text-[11px] text-folio-ink focus:border-folio-strong focus:outline-none sm:col-span-3"
            >
              {POWER_THRESHOLDS.map((val) => (
                <option key={val} value={val}>
                  {val === 0 ? t.powerAny : t.powerMin(val)}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1.5 sm:col-span-3">
              <select
                aria-label={t.sortAria}
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value as BinderSortMode);
                  setVisibleCount(BINDER_PAGE_SIZE);
                }}
                className="min-h-[34px] min-w-0 flex-1 cursor-pointer rounded-[var(--radius-control)] border border-folio-border bg-folio-elevated px-2.5 font-mono text-[11px] text-folio-ink focus:border-folio-strong focus:outline-none"
              >
                <option value="pack_group">{t.sortPackGroup}</option>
                <option value="rarity_desc">{t.sortRarityDesc}</option>
                <option value="price_desc">{t.sortPriceDesc}</option>
                <option value="price_asc">{t.sortPriceAsc}</option>
                <option value="power_desc">{t.sortPowerDesc}</option>
                <option value="hp_desc">{t.sortHpDesc}</option>
                <option value="name_asc">{t.sortNameAsc}</option>
              </select>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  title={t.resetFilters}
                  aria-label={t.resetFilters}
                  className="folio-btn-icon !h-[34px] !w-[34px] shrink-0"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div data-lenis-prevent className="flex-1 overflow-y-auto pr-1">
          {ownedEntries.length === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center rounded-[var(--radius-card)] border border-dashed border-folio-border p-6 text-center font-mono text-xs text-folio-muted">
              {t.emptyBinder}
            </div>
          ) : shownEntries.length === 0 ? (
            <div className="flex min-h-[200px] flex-col items-center justify-center gap-2.5 rounded-[var(--radius-card)] border border-dashed border-folio-border p-6 text-center">
              <span className="font-mono text-xs text-folio-muted">
                {t.emptySearch}
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="folio-btn-compact !min-h-[32px]"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.resetFilters}</span>
                </button>
              )}
            </div>
          ) : sortBy === 'pack_group' ? (
            <div className="flex flex-col gap-5">
              {groupedShownPacks.map(({ box, entries }) => {
                const totals = packTotalsByBox.get(box.id) ?? {
                  unique: entries.length,
                  copies: entries.reduce((sum, item) => sum + item.count, 0),
                  value: entries.reduce(
                    (sum, item) => sum + (item.card.price ?? 0) * item.count,
                    0
                  ),
                };
                const poolSize =
                  box.id === 'all' ? 0 : (packPoolSizes.get(box.id) ?? 0);
                const groupTitle =
                  box.id === 'all' ? t.allStarOtherLabel : box.label[locale];
                return (
                  <section
                    key={box.id}
                    data-pack-group={box.id}
                    className="flex flex-col gap-2.5"
                  >
                    <header className="flex flex-wrap items-center justify-between gap-2 border-b border-folio-border pb-2">
                      <div className="flex min-w-0 items-center gap-2">
                        {box.packArtUrls[0] && (
                          <img
                            src={box.packArtUrls[0]}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                            className="h-7 w-5 shrink-0 object-contain"
                          />
                        )}
                        <span
                          aria-hidden="true"
                          style={{ backgroundColor: box.accentColor }}
                          className="h-2 w-2 shrink-0 rounded-full"
                        />
                        <h4 className="truncate font-serif text-sm font-bold text-folio-ink sm:text-base">
                          {groupTitle}
                        </h4>
                      </div>
                      <span className="shrink-0 font-mono text-[10.5px] tabular-nums text-folio-muted">
                        {t.packGroupMeta(
                          totals.unique,
                          poolSize,
                          totals.copies,
                          totals.value > 0
                            ? formatCardPrice(totals.value)
                            : '$0.00'
                        )}
                      </span>
                    </header>

                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
                      {entries.map(({ card, count }) =>
                        renderCardTile(card, count)
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
              {shownEntries.map(({ card, count }) =>
                renderCardTile(card, count)
              )}
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
