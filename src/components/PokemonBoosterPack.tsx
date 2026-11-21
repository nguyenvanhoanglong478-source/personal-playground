import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Scissors } from 'lucide-react';
import {
  BoosterBoxOption,
  POKEMON_CARD_BACK_URL,
  POKEMON_UNBOXER_LABELS,
} from '../data/pokemonPack';
import { Locale } from '../data/profile';
import { useCardTilt } from '../hooks/useCardTilt';
import { playPackCrinkleTick } from '../utils/pokemonAudio';

export interface PokemonBoosterPackProps {
  option: BoosterBoxOption;
  phase: 'sealed' | 'ripping' | 'drawing';
  packNumber: number;
  packsRemaining: number;
  locale: Locale;
  shouldReduceMotion: boolean;
  soundEnabled: boolean;
  onRipTrigger: () => void;
}

const SPARKLE_VECTORS = [
  { left: '16%', sx: '-18px', sy: '-24px', delay: '40ms' },
  { left: '34%', sx: '-8px', sy: '-32px', delay: '80ms' },
  { left: '50%', sx: '4px', sy: '-36px', delay: '120ms' },
  { left: '66%', sx: '12px', sy: '-30px', delay: '160ms' },
  { left: '82%', sx: '20px', sy: '-22px', delay: '200ms' },
  { left: '24%', sx: '-14px', sy: '14px', delay: '110ms' },
];

export const PokemonBoosterPack: React.FC<PokemonBoosterPackProps> = ({
  option,
  phase,
  packNumber,
  packsRemaining,
  locale,
  shouldReduceMotion,
  soundEnabled,
  onRipTrigger,
}) => {
  const t = POKEMON_UNBOXER_LABELS[locale];
  const [tearProgress, setTearProgress] = useState(0);
  const [artStage, setArtStage] = useState<'hires' | 'small' | 'fallback'>(
    'hires'
  );

  const dragStartXRef = useRef<number | null>(null);
  const dragMovedRef = useRef(false);
  const didRipRef = useRef(false);
  const lastTickStepRef = useRef(0);

  const {
    stageRef,
    cardRef,
    isTiltActive,
    updateTiltFromPointer,
    resetTilt,
    resetTiltImmediately,
  } = useCardTilt({
    maxDeg: 14,
    lerp: 0.28,
    disabled: shouldReduceMotion || phase !== 'sealed',
  });

  useEffect(() => {
    setArtStage('hires');
  }, [option.id]);

  useEffect(() => {
    if (phase !== 'sealed') {
      resetTiltImmediately();
    } else {
      setTearProgress(0);
      dragStartXRef.current = null;
      dragMovedRef.current = false;
      didRipRef.current = false;
      lastTickStepRef.current = 0;
    }
  }, [phase, resetTiltImmediately]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== 'sealed') return;
    dragStartXRef.current = event.clientX;
    dragMovedRef.current = false;
    didRipRef.current = false;
    lastTickStepRef.current = 0;
    updateTiltFromPointer(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== 'sealed') return;
    updateTiltFromPointer(event.clientX, event.clientY);

    if (dragStartXRef.current === null || didRipRef.current) return;

    const width = stageRef.current?.getBoundingClientRect().width ?? 214;
    const distance = Math.abs(event.clientX - dragStartXRef.current);
    if (distance > 8) {
      dragMovedRef.current = true;
    }

    const thresholdDistance = Math.max(115, width * 0.62);
    const progress = Math.min(1, distance / thresholdDistance);
    setTearProgress(progress);

    const step = Math.floor(progress * 5);
    if (step > lastTickStepRef.current) {
      lastTickStepRef.current = step;
      if (soundEnabled) {
        playPackCrinkleTick(progress);
      }
    }

    if (progress >= 0.72) {
      didRipRef.current = true;
      dragStartXRef.current = null;
      setTearProgress(1);
      onRipTrigger();
    }
  };

  const resetDragAndTilt = () => {
    dragStartXRef.current = null;
    if (!didRipRef.current) {
      setTearProgress(0);
    }
    resetTilt();
  };

  const handlePointerUp = () => {
    dragStartXRef.current = null;
    if (!didRipRef.current) {
      setTearProgress(0);
    }
  };

  const handleClick = () => {
    if (phase !== 'sealed') return;
    if (didRipRef.current || dragMovedRef.current) {
      didRipRef.current = false;
      dragMovedRef.current = false;
      return;
    }
    onRipTrigger();
  };

  const lidDragStyle: React.CSSProperties | undefined =
    phase === 'sealed' && tearProgress > 0
      ? {
          transform: `translate3d(${(tearProgress * 14).toFixed(1)}px, ${(-tearProgress * 10).toFixed(1)}px, 0) rotate(${(-tearProgress * 6.5).toFixed(1)}deg)`,
        }
      : undefined;

  const packVars = {
    '--pk-tear': tearProgress.toFixed(3),
    '--pk-pack-accent': option.accentColor,
    '--pk-pack-glow': option.glowColor,
    '--pk-pack-stripe': option.foilStripeColor,
  } as React.CSSProperties;

  return (
    <div className="relative flex justify-center py-1">
      {phase === 'sealed' && packsRemaining > 2 && (
        <div
          aria-hidden="true"
          style={{ background: option.accentGradient }}
          className="pointer-events-none absolute top-1 aspect-[63/98] w-[214px] translate-x-2.5 translate-y-2 rotate-[2.2deg] rounded-[12px] border border-white/15 opacity-40 shadow-soft"
        />
      )}

      {phase === 'sealed' && packsRemaining > 1 && (
        <div
          aria-hidden="true"
          style={{ background: option.accentGradient }}
          className="pointer-events-none absolute top-1 aspect-[63/98] w-[214px] translate-x-1 translate-y-1 rotate-[1deg] rounded-[12px] border border-white/20 opacity-70 shadow-soft"
        />
      )}

      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => {
          dragMovedRef.current = false;
          resetDragAndTilt();
        }}
        onPointerCancel={() => {
          dragMovedRef.current = false;
          resetDragAndTilt();
        }}
        onClick={handleClick}
        role={phase === 'sealed' ? 'button' : undefined}
        tabIndex={phase === 'sealed' ? 0 : -1}
        onKeyDown={(event) => {
          if (
            phase === 'sealed' &&
            (event.key === 'Enter' || event.key === ' ')
          ) {
            event.preventDefault();
            onRipTrigger();
          }
        }}
        aria-label={
          phase === 'sealed'
            ? `${t.ripButton} ${t.packBadge(packNumber)}`
            : undefined
        }
        className={`pk-tilt-stage relative aspect-[63/98] w-[214px] select-none ${
          phase === 'sealed' ? 'cursor-pointer' : 'pointer-events-none'
        }`}
      >
        <div
          ref={cardRef}
          data-phase={phase}
          data-active={isTiltActive && phase === 'sealed' ? 'true' : 'false'}
          style={packVars}
          className={`pk-tilt-card pk-pack-shell relative h-full w-full ${
            phase === 'drawing' ? 'pk-draw-stage' : ''
          }`}
        >
          <div className="pk-pouch-interior" aria-hidden="true">
            <div className="pk-pack-inner-glow" />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[11px] top-[34px] z-10 flex justify-center"
          >
            <div className="pk-emerging-deck relative aspect-[63/88] w-full">
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[10px] border border-folio-border bg-folio-surface opacity-70" />
              <div className="absolute inset-0 translate-x-0.5 translate-y-0.5 rounded-[10px] border border-folio-border bg-folio-surface opacity-85" />
              <div className="relative h-full w-full overflow-hidden rounded-[10px] border border-white/25 bg-folio-elevated shadow-soft">
                <img
                  src={POKEMON_CARD_BACK_URL}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div
            style={{ background: option.accentGradient }}
            className="pk-pack-body-shell"
          >
            <svg
              viewBox="0 0 214 8"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="pk-torn-top-lip pointer-events-none absolute inset-x-0 -top-[6px] z-30 h-[7px] w-full"
            >
              <polygon
                points="0,8 0,3 14,0 26,5 40,1 55,4 71,0 88,5 104,1 122,4 139,0 156,5 174,1 190,4 202,1 214,4 214,8"
                fill="rgba(255,255,255,0.22)"
              />
              <polygon
                points="0,8 0,5 14,2 26,6 40,3 55,6 71,2 88,6 104,3 122,6 139,2 156,6 174,3 190,6 202,3 214,6 214,8"
                fill="#0D1017"
              />
            </svg>

            <div className="relative flex flex-1 flex-col justify-between overflow-hidden">
              {artStage !== 'fallback' && (
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[72%] overflow-hidden">
                  <img
                    src={
                      artStage === 'hires'
                        ? option.coverArtUrl
                        : option.coverArtFallbackUrl
                    }
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                    style={{
                      objectPosition: option.coverArtPosition,
                      transform: `scale(${option.coverArtScale})`,
                      transformOrigin: 'center 24%',
                    }}
                    onError={() =>
                      setArtStage((prev) =>
                        prev === 'hires' ? 'small' : 'fallback'
                      )
                    }
                    className="h-full w-full object-cover opacity-85 saturate-[1.08]"
                  />
                </div>
              )}

              <div
                aria-hidden="true"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(8,10,16,0.74) 0%, rgba(8,10,16,0.08) 20%, rgba(8,10,16,0.06) 40%, rgba(8,10,16,0.9) 58%, rgba(8,10,16,0.98) 74%, rgba(8,10,16,0.99) 100%)',
                }}
                className="pointer-events-none absolute inset-0"
              />

              <div className="relative z-10 flex items-center justify-between gap-2 px-3 pt-2.5">
                <span
                  style={{
                    borderColor: option.accentColor,
                    color: option.accentColor,
                  }}
                  className="rounded-full border bg-black/70 px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.12em]"
                >
                  {option.seriesCode}
                </span>

                <svg
                  viewBox="0 0 28 28"
                  aria-hidden="true"
                  className="h-5 w-5 text-white/85 drop-shadow"
                >
                  <circle
                    cx="14"
                    cy="14"
                    r="11.5"
                    fill="rgba(0,0,0,0.45)"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <line
                    x1="2.5"
                    y1="14"
                    x2="10.2"
                    y2="14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <line
                    x1="17.8"
                    y1="14"
                    x2="25.5"
                    y2="14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle
                    cx="14"
                    cy="14"
                    r="3.6"
                    fill="rgba(0,0,0,0.65)"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </div>

              {artStage === 'fallback' && (
                <div className="relative z-10 flex flex-1 items-center justify-center">
                  <svg
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                    className="h-14 w-14 text-white/80"
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="19"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="5"
                      y1="24"
                      x2="18"
                      y2="24"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="30"
                      y1="24"
                      x2="43"
                      y2="24"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="5.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              )}

              <div className="relative z-10 px-3 pb-2.5 text-center">
                <div className="font-serif text-[1.15rem] font-bold leading-tight tracking-tight text-white drop-shadow">
                  {option.title}
                </div>
                <div className="mt-1 inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/65 px-2.5 py-0.5 font-mono text-[9.5px] font-medium text-white/90">
                  <span>{t.cardsPerPack}</span>
                </div>
              </div>
            </div>

            <div
              style={{ background: option.crimpGradient }}
              className="pk-foil-crimp-bottom"
              aria-hidden="true"
            />

            <div className="pk-mylar-sheen" aria-hidden="true" />
          </div>

          {phase !== 'drawing' && (
            <div
              style={{
                background: option.accentGradient,
                ...lidDragStyle,
              }}
              className="pk-pack-lid"
            >
              <div
                style={{ background: option.crimpGradient }}
                className="pk-foil-crimp-top"
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-1 items-center justify-between gap-1.5 px-2.5">
                <span className="font-mono text-[9px] font-bold tracking-[0.1em] text-white/95">
                  {t.packBadge(packNumber)}
                </span>

                <span className="flex items-center gap-0.5 font-mono text-[8.5px] font-semibold text-white/80">
                  <span>{t.dragTearLabel}</span>
                  <ChevronRight className="h-2.5 w-2.5" aria-hidden="true" />
                  <Scissors className="h-2.5 w-2.5" aria-hidden="true" />
                </span>
              </div>

              <span className="pk-tear-notch-left" aria-hidden="true" />
              <span className="pk-tear-notch-right" aria-hidden="true" />
              <div className="pk-mylar-sheen" aria-hidden="true" />
            </div>
          )}

          <div className="pk-tear-seam-blade" aria-hidden="true" />

          {phase === 'ripping' &&
            SPARKLE_VECTORS.map((sp, idx) => (
              <span
                key={idx}
                aria-hidden="true"
                style={
                  {
                    left: sp.left,
                    '--sx': sp.sx,
                    '--sy': sp.sy,
                    animationDelay: sp.delay,
                  } as React.CSSProperties
                }
                className="pk-tear-sparkle"
              />
            ))}
        </div>
      </div>
    </div>
  );
};
