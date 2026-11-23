import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, X } from 'lucide-react';
import { Locale } from '../../data/profile';
import {
  CardImageStage,
  FOIL_STYLE_LABELS,
  POKEMON_CARD_BACK_URL,
  POKEMON_UNBOXER_LABELS,
  PokemonCatalogCard,
  TIER_LABELS,
  formatCardPrice,
  getCardFoilStyle,
  getCardImageUrl,
  getCardPower,
  isHitTier,
} from '../../data/pokemonPack';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useCardTilt } from '../../hooks/useCardTilt';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

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

  useBodyScrollLock(Boolean(card));

  useEffect(() => {
    if (!card) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('keydown', handleKey, true);
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
