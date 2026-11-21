import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  BoosterBoxOption,
  POKEMON_CARD_BACK_URL,
  POKEMON_CHEST_BACK_URL,
  POKEMON_CHEST_FRONT_URL,
  POKEMON_UNBOXER_LABELS,
  getBoxOption,
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

const PokemonWordmark: React.FC = () => {
  const uid = useId().replace(/:/g, '');
  const gradId = `pkGold_${uid}`;
  const arcId = `pkArc_${uid}`;

  return (
    <svg
      className="pk-official-wordmark"
      viewBox="0 0 240 62"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF066" />
          <stop offset="52%" stopColor="#FFD400" />
          <stop offset="100%" stopColor="#EA9B00" />
        </linearGradient>
        <path id={arcId} d="M 10 51 Q 120 18 230 51" fill="none" />
      </defs>
      <text
        fontFamily="'Arial Black', 'Impact', sans-serif"
        fontWeight="900"
        fontSize="39"
        letterSpacing="-1.5"
        textAnchor="middle"
      >
        <textPath
          href={`#${arcId}`}
          startOffset="50%"
          stroke="#1B46A8"
          strokeWidth="11.5"
          strokeLinejoin="round"
          fill="#1B46A8"
        >
          Pokémon
        </textPath>
      </text>
      <text
        fontFamily="'Arial Black', 'Impact', sans-serif"
        fontWeight="900"
        fontSize="39"
        letterSpacing="-1.5"
        textAnchor="middle"
      >
        <textPath
          href={`#${arcId}`}
          startOffset="50%"
          stroke="#102C73"
          strokeWidth="4.5"
          strokeLinejoin="round"
          fill={`url(#${gradId})`}
          paintOrder="stroke fill"
        >
          Pokémon
        </textPath>
      </text>
    </svg>
  );
};

interface SidePackPreviewProps {
  option: BoosterBoxOption;
  locale: Locale;
}

const SidePackPreview: React.FC<SidePackPreviewProps> = ({ option, locale }) => {
  const t = POKEMON_UNBOXER_LABELS[locale];
  const fadeBg = `linear-gradient(180deg, rgb(${option.topFadeRgb}) 0%, rgba(${option.topFadeRgb}, 0.96) 20%, rgba(${option.topFadeRgb}, 0) 32%, rgba(${option.bottomFadeRgb}, 0) 58%, rgba(${option.bottomFadeRgb}, 0.96) 70%, rgb(${option.bottomFadeRgb}) 100%)`;
  const ribbonBg = `linear-gradient(128deg, transparent 8%, ${option.ribbonColorA} 17%, transparent 26%, transparent 70%, ${option.ribbonColorB} 80%, transparent 90%)`;

  return (
    <div
      style={{ background: option.bodyBackground }}
      className="pk-official-side-pack"
    >
      <div
        style={{ background: option.crimpGradient }}
        className="pk-foil-crimp-top"
      />
      <div className="relative flex flex-1 flex-col justify-between overflow-hidden">
        <div className="pk-official-art-window">
          <img
            src={option.coverArtUrl}
            alt=""
            decoding="async"
            style={{
              objectPosition: option.coverArtPosition,
              transform: `scale(${option.coverArtScale})`,
              transformOrigin: 'center 28%',
            }}
            className="h-full w-full object-cover saturate-[1.14]"
          />
        </div>
        <div
          style={{ background: fadeBg }}
          className="pointer-events-none absolute inset-0 z-[3]"
        />
        <div
          style={{ background: ribbonBg }}
          className="pointer-events-none absolute inset-0 z-[4]"
        />
        <div className="pk-pack-peg-hole" />
        <div className="pk-official-top-row">
          <div className="pk-official-series">
            <span className="pk-official-tcg-badge">POKÉMON TCG</span>
            <span className="pk-official-era">{option.eraLabel}</span>
          </div>
          <div className="pk-official-specs">
            <div className="flex items-center gap-0.5">
              <span className="pk-official-10cards">{t.packCardsTag}</span>
              <span className="pk-official-code">{option.packCode}</span>
            </div>
            <span className="pk-official-holo-note">{t.packHoloTag}</span>
          </div>
        </div>
        <PokemonWordmark />
        <div className="flex-1" />
        <div className="pk-official-bottom">
          <span className="pk-official-kicker">{option.kickerLabel}</span>
          <div className="pk-official-title-top">{option.titleTop}</div>
          <div className="pk-official-title-row">
            <span
              style={{ backgroundImage: option.titleGradient }}
              className={`pk-official-title-main ${
                option.titleMain.length >= 8
                  ? 'pk-official-title-main-long'
                  : ''
              }`}
            >
              {option.titleMain}
            </span>
            <span
              style={{ background: option.tagGradient }}
              className="pk-official-tag"
            >
              {option.tagLabel}
            </span>
          </div>
        </div>
        <div className="pk-plastic-wrap" />
      </div>
      <div
        style={{ background: option.crimpGradient }}
        className="pk-foil-crimp-bottom"
      />
      <div className="pk-mylar-cylinder" />
    </div>
  );
};

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
    maxDeg: 13,
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

  const sideLeftOption = useMemo(
    () => (option.id === 'all' ? getBoxOption('sv3pt5') : option),
    [option]
  );

  const sideRightOption = useMemo(
    () => (option.id === 'all' ? getBoxOption('swsh7') : option),
    [option]
  );

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

    const width = stageRef.current?.getBoundingClientRect().width ?? 196;
    const distance = Math.abs(event.clientX - dragStartXRef.current);
    if (distance > 8) {
      dragMovedRef.current = true;
    }

    const thresholdDistance = Math.max(108, width * 0.6);
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
    '--pk-pack-stripe': option.foilStripeColor,
  } as React.CSSProperties;

  const bodyFadeBg = `linear-gradient(180deg, rgb(${option.topFadeRgb}) 0%, rgba(${option.topFadeRgb}, 0.94) 11%, rgba(${option.topFadeRgb}, 0) 24%, rgba(${option.bottomFadeRgb}, 0) 50%, rgba(${option.bottomFadeRgb}, 0.96) 63%, rgb(${option.bottomFadeRgb}) 100%)`;
  const ribbonBg = `linear-gradient(128deg, transparent 8%, ${option.ribbonColorA} 17%, transparent 26%, transparent 70%, ${option.ribbonColorB} 80%, transparent 90%)`;
  const lidBg = `linear-gradient(180deg, rgb(${option.topFadeRgb}) 0%, rgba(${option.topFadeRgb}, 0.96) 100%)`;

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
          className="pointer-events-none absolute left-1/2 top-[56px] z-[9] origin-bottom -translate-x-[76%] -rotate-[9deg] scale-[0.72] brightness-[0.74]"
        >
          <SidePackPreview option={sideLeftOption} locale={locale} />
        </div>
      )}

      {phase === 'sealed' && packsRemaining > 2 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[56px] z-[9] origin-bottom -translate-x-[24%] rotate-[9deg] scale-[0.72] brightness-[0.74]"
        >
          <SidePackPreview option={sideRightOption} locale={locale} />
        </div>
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
        className={`pk-tilt-stage absolute left-1/2 top-[4px] z-[12] aspect-[63/106] w-[174px] -translate-x-1/2 select-none sm:top-[6px] sm:w-[186px] ${
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
            className="pointer-events-none absolute inset-x-[9px] top-[34px] z-10 flex justify-center"
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
            style={{ background: option.bodyBackground }}
            className="pk-pack-body-shell"
          >
            <svg
              viewBox="0 0 200 8"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="pk-torn-top-lip pointer-events-none absolute inset-x-0 -top-[6px] z-30 h-[7px] w-full"
            >
              <polygon
                points="0,8 0,3 13,0 25,5 38,1 52,4 67,0 82,5 98,1 114,4 130,0 146,5 162,1 178,4 189,1 200,4 200,8"
                fill="rgba(255,255,255,0.34)"
              />
              <polygon
                points="0,8 0,5 13,2 25,6 38,3 52,6 67,2 82,6 98,3 114,6 130,2 146,6 162,3 178,6 189,3 200,6 200,8"
                fill={`rgb(${option.topFadeRgb})`}
              />
            </svg>

            <div className="relative flex flex-1 flex-col justify-between overflow-hidden">
              {artStage !== 'fallback' && (
                <div className="pk-official-body-art-window">
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
                      transformOrigin: 'center 28%',
                    }}
                    onError={() =>
                      setArtStage((prev) =>
                        prev === 'hires' ? 'small' : 'fallback'
                      )
                    }
                    className="h-full w-full object-cover saturate-[1.16] contrast-[1.05]"
                  />
                </div>
              )}

              <div
                aria-hidden="true"
                style={{ background: bodyFadeBg }}
                className="pointer-events-none absolute inset-0 z-[3]"
              />

              <div
                aria-hidden="true"
                style={{ background: ribbonBg }}
                className="pointer-events-none absolute inset-0 z-[4]"
              />

              <div className="relative z-10 pt-0.5">
                <PokemonWordmark />
              </div>

              <div className="flex-1" />

              <div className="pk-official-bottom">
                <span className="pk-official-kicker">{option.kickerLabel}</span>
                <div className="pk-official-title-top">{option.titleTop}</div>
                <div className="pk-official-title-row">
                  <span
                    style={{ backgroundImage: option.titleGradient }}
                    className={`pk-official-title-main ${
                      option.titleMain.length >= 8
                        ? 'pk-official-title-main-long'
                        : ''
                    }`}
                  >
                    {option.titleMain}
                  </span>
                  <span
                    style={{ background: option.tagGradient }}
                    className="pk-official-tag"
                  >
                    {option.tagLabel}
                  </span>
                </div>
              </div>

              <div className="pk-pillow-bulge" aria-hidden="true" />
              <div className="pk-plastic-wrap" aria-hidden="true" />
              <div className="pk-mylar-glare" aria-hidden="true" />
              <div className="pk-mylar-glare-alt" aria-hidden="true" />
            </div>

            <div
              style={{ background: option.crimpGradient }}
              className="pk-foil-crimp-bottom"
              aria-hidden="true"
            />

            <div className="pk-mylar-cylinder" aria-hidden="true" />
          </div>

          {phase !== 'drawing' && (
            <div style={{ background: lidBg }} className="pk-pack-lid">
              <div
                style={{ background: option.crimpGradient }}
                className="pk-foil-crimp-top"
                aria-hidden="true"
              />

              <div className="pk-pack-peg-hole" aria-hidden="true" />

              <div className="pk-official-top-row">
                <div className="pk-official-series">
                  <span className="pk-official-tcg-badge">POKÉMON TCG</span>
                  <span className="pk-official-era">{option.eraLabel}</span>
                </div>

                <div className="pk-official-specs">
                  <div className="flex items-center gap-0.5">
                    <span className="pk-official-10cards">{t.packCardsTag}</span>
                    <span className="pk-official-code">{option.packCode}</span>
                  </div>
                  <span className="pk-official-holo-note">{t.packHoloTag}</span>
                </div>
              </div>

              <span className="pk-tear-notch-left" aria-hidden="true" />
              <span className="pk-tear-notch-right" aria-hidden="true" />
              <div className="pk-plastic-wrap-lid" aria-hidden="true" />
              <div className="pk-mylar-cylinder" aria-hidden="true" />
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
