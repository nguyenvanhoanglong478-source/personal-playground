import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BoosterBoxOption,
  POKEMON_CARD_BACK_URL,
  POKEMON_CHEST_BACK_URL,
  POKEMON_CHEST_FRONT_URL,
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

const ALL_STAR_SIDE_LEFT = './pokemon/packs/sv3pt5-151.webp';
const ALL_STAR_SIDE_RIGHT = './pokemon/packs/swsh7-umbreon.webp';

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
    maxDeg: 13,
    lerp: 0.28,
    disabled: shouldReduceMotion || phase !== 'sealed',
  });

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

  const { centerArtUrl, leftArtUrl, rightArtUrl } = useMemo(() => {
    const arts = option.packArtUrls;
    const idx = Math.max(0, packNumber - 1) % arts.length;
    const center = arts[idx];
    if (option.id === 'all') {
      return {
        centerArtUrl: center,
        leftArtUrl: ALL_STAR_SIDE_LEFT,
        rightArtUrl: ALL_STAR_SIDE_RIGHT,
      };
    }
    if (arts.length >= 2) {
      return {
        centerArtUrl: center,
        leftArtUrl: arts[(idx + 1) % arts.length],
        rightArtUrl: arts[(idx + 2) % arts.length],
      };
    }
    return {
      centerArtUrl: center,
      leftArtUrl: center,
      rightArtUrl: center,
    };
  }, [option.id, option.packArtUrls, packNumber]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== 'sealed') return;
    dragStartXRef.current = event.clientX;
    dragMovedRef.current = false;
    didRipRef.current = false;
    lastTickStepRef.current = 0;
    if (event.pointerType === 'mouse') {
      updateTiltFromPointer(event.clientX, event.clientY);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== 'sealed') return;
    if (event.pointerType === 'mouse') {
      updateTiltFromPointer(event.clientX, event.clientY);
    }

    if (dragStartXRef.current === null || didRipRef.current) return;

    const width = stageRef.current?.getBoundingClientRect().width ?? 174;
    const distance = Math.abs(event.clientX - dragStartXRef.current);
    if (distance > 8) {
      dragMovedRef.current = true;
    }

    const thresholdDistance = Math.max(100, width * 0.6);
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

  const lidX = (tearProgress * 14).toFixed(1);
  const lidY = (-tearProgress * 10).toFixed(1);
  const lidRot = (-tearProgress * 6.5).toFixed(1);

  const packVars = {
    '--pk-tear': tearProgress.toFixed(3),
    '--pk-lid-x': `${lidX}px`,
    '--pk-lid-y': `${lidY}px`,
    '--pk-lid-rot': `${lidRot}deg`,
    '--pk-pack-accent': option.accentColor,
    '--pk-pack-glow': option.glowColor,
  } as React.CSSProperties;

  const packMaskStyle: React.CSSProperties = {
    WebkitMaskImage: `url("${centerArtUrl}")`,
    maskImage: `url("${centerArtUrl}")`,
  };

  const showTearBlade =
    (phase === 'sealed' && tearProgress > 0) || phase === 'ripping';

  return (
    <div className="pk-chest-stage">
      <div className="pk-chest-ground-shadow" aria-hidden="true" />

      <img
        src={POKEMON_CHEST_BACK_URL}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="pk-pixel-art pointer-events-none absolute inset-0 z-[5] h-full w-full object-contain"
      />

      <div className="pk-chest-inner-glow" aria-hidden="true" />

      {phase === 'sealed' && packsRemaining > 1 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[50px] z-[9] origin-bottom -translate-x-[78%] -rotate-[9.5deg] scale-[0.73] brightness-[0.76]"
        >
          <div className="pk-real-side-pack">
            <img
              src={leftArtUrl}
              alt=""
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      )}

      {phase === 'sealed' && packsRemaining > 2 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[50px] z-[9] origin-bottom -translate-x-[22%] rotate-[9.5deg] scale-[0.73] brightness-[0.76]"
        >
          <div className="pk-real-side-pack">
            <img
              src={rightArtUrl}
              alt=""
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      )}

      <div
        ref={stageRef}
        onDragStart={(event) => event.preventDefault()}
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
        className={`pk-tilt-stage absolute left-1/2 top-[4px] z-[12] aspect-[63/115] w-[164px] -translate-x-1/2 select-none sm:top-[6px] sm:w-[174px] ${
          phase === 'sealed' ? 'cursor-pointer' : 'pointer-events-none'
        }`}
      >
        <div
          ref={cardRef}
          data-phase={phase}
          data-active={isTiltActive && phase === 'sealed' ? 'true' : 'false'}
          style={packVars}
          className="pk-tilt-card pk-pack-shell relative h-full w-full"
        >
          <div className="pk-pouch-interior" aria-hidden="true">
            <div className="pk-pack-inner-glow" />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[13px] top-[24px] z-10 flex justify-center"
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

          <div className="pk-pack-body-shell">
            <svg
              viewBox="0 0 200 8"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="pk-torn-top-lip pointer-events-none absolute left-[4%] -top-[5px] z-30 h-[6px] w-[92%]"
            >
              <polygon
                points="0,8 0,3 13,0 25,5 38,1 52,4 67,0 82,5 98,1 114,4 130,0 146,5 162,1 178,4 189,1 200,4 200,8"
                fill="rgba(255,255,255,0.44)"
              />
              <polygon
                points="0,8 0,5 13,2 25,6 38,3 52,6 67,2 82,6 98,3 114,6 130,2 146,6 162,3 178,6 189,3 200,6 200,8"
                fill="rgba(22,26,34,0.86)"
              />
            </svg>

            <div className="pk-real-body-clip">
              <img
                src={centerArtUrl}
                alt={option.label[locale]}
                draggable={false}
                decoding="async"
                className="pk-real-body-img pointer-events-none select-none"
              />
              <div
                style={packMaskStyle}
                className="pk-real-body-sheen"
                aria-hidden="true"
              >
                <div className="pk-real-plastic" />
                <div className="pk-mylar-glare" />
                <div className="pk-mylar-glare-alt" />
              </div>
            </div>
          </div>

          {phase !== 'drawing' && (
            <div className="pk-pack-lid">
              <img
                src={centerArtUrl}
                alt=""
                aria-hidden="true"
                draggable={false}
                decoding="async"
                className="pk-real-lid-img pointer-events-none select-none"
              />
              <div
                style={packMaskStyle}
                className="pk-real-lid-sheen"
                aria-hidden="true"
              >
                <div className="pk-real-plastic" />
              </div>
            </div>
          )}

          {showTearBlade && (
            <div className="pk-tear-seam-blade" aria-hidden="true" />
          )}

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

      <img
        src={POKEMON_CHEST_FRONT_URL}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="pk-pixel-art pointer-events-none absolute inset-0 z-[20] h-full w-full object-contain"
      />
    </div>
  );
};
