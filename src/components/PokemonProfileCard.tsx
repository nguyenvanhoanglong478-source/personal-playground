import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, Shield } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';
import { PROJECTS_DATA } from '../data/projects';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { BrandLogo } from './BrandLogo';

interface PokemonProfileCardProps {
  locale: Locale;
}

interface CardMotionState {
  pointerX: number;
  pointerY: number;
  centerDist: number;
  rotateX: number;
  rotateY: number;
  scale: number;
  targetPointerX: number;
  targetPointerY: number;
  targetCenterDist: number;
  targetRotateX: number;
  targetRotateY: number;
  targetScale: number;
}

const LERP_FACTOR = 0.28;

const ColorlessEnergyOrb: React.FC<{ size?: number; label?: string }> = ({
  size = 14,
  label = 'Energy Orb',
}) => (
  <span
    role="img"
    aria-label={label}
    style={{ width: size, height: size }}
    className="pokemon-energy-orb inline-flex shrink-0 items-center justify-center rounded-full"
  >
    <svg
      viewBox="0 0 24 24"
      width={Math.round(size * 0.72)}
      height={Math.round(size * 0.72)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2.5L14.4 8.7L21 9.1L15.9 13.3L17.6 19.8L12 16.1L6.4 19.8L8.1 13.3L3 9.1L9.6 8.7L12 2.5Z"
        fill="currentColor"
      />
    </svg>
  </span>
);

const PrismTypeOrb: React.FC = () => (
  <span
    role="img"
    aria-label="Prism Type"
    className="pokemon-type-orb inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
  >
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" aria-hidden="true">
      <path
        d="M12 2.4C12.75 7.45 14.55 9.25 19.6 10C14.55 10.75 12.75 12.55 12 17.6C11.25 12.55 9.45 10.75 4.4 10C9.45 9.25 11.25 7.45 12 2.4Z"
        fill="currentColor"
      />
    </svg>
  </span>
);

export const PokemonProfileCard: React.FC<PokemonProfileCardProps> = ({ locale }) => {
  const shouldReduceMotion = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rotatorRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isInteractingRef = useRef(false);
  const [isHoloActive, setIsHoloActive] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const motionRef = useRef<CardMotionState>({
    pointerX: 50,
    pointerY: 50,
    centerDist: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    targetPointerX: 50,
    targetPointerY: 50,
    targetCenterDist: 0,
    targetRotateX: 0,
    targetRotateY: 0,
    targetScale: 1,
  });

  const t = UI_LABELS[locale].hero;
  const statsLabels =
    locale === 'vi'
      ? {
          stage: 'BASIC',
          weakness: 'weakness',
          resistance: 'resistance',
          retreat: 'retreat',
          dex: `NO. ${PROFILE_DATA.birthYear} • ${PROFILE_DATA.role.vi} • HT: VI/EN`,
        }
      : {
          stage: 'BASIC',
          weakness: 'weakness',
          resistance: 'resistance',
          retreat: 'retreat',
          dex: `NO. ${PROFILE_DATA.birthYear} • ${PROFILE_DATA.role.en} • HT: EN/VI`,
        };

  const applyMotionVars = useCallback(
    (s: CardMotionState) => {
      const el = rotatorRef.current;
      if (!el) return;
      el.style.setProperty('--pointer-x', `${s.pointerX.toFixed(2)}%`);
      el.style.setProperty('--pointer-y', `${s.pointerY.toFixed(2)}%`);
      el.style.setProperty('--pointer-from-center', s.centerDist.toFixed(3));
      el.style.setProperty('--rotate-x', shouldReduceMotion ? '0deg' : `${s.rotateX.toFixed(2)}deg`);
      el.style.setProperty('--rotate-y', shouldReduceMotion ? '0deg' : `${s.rotateY.toFixed(2)}deg`);
      el.style.setProperty('--card-scale', shouldReduceMotion ? '1' : s.scale.toFixed(4));
    },
    [shouldReduceMotion]
  );

  const stepAnimation = useCallback(() => {
    const s = motionRef.current;
    s.pointerX += (s.targetPointerX - s.pointerX) * LERP_FACTOR;
    s.pointerY += (s.targetPointerY - s.pointerY) * LERP_FACTOR;
    s.centerDist += (s.targetCenterDist - s.centerDist) * LERP_FACTOR;
    s.rotateX += (s.targetRotateX - s.rotateX) * LERP_FACTOR;
    s.rotateY += (s.targetRotateY - s.rotateY) * LERP_FACTOR;
    s.scale += (s.targetScale - s.scale) * LERP_FACTOR;

    const delta =
      Math.abs(s.targetPointerX - s.pointerX) +
      Math.abs(s.targetPointerY - s.pointerY) +
      Math.abs(s.targetRotateX - s.rotateX) +
      Math.abs(s.targetRotateY - s.rotateY) +
      Math.abs(s.targetScale - s.scale);

    if (delta < 0.04) {
      s.pointerX = s.targetPointerX;
      s.pointerY = s.targetPointerY;
      s.centerDist = s.targetCenterDist;
      s.rotateX = s.targetRotateX;
      s.rotateY = s.targetRotateY;
      s.scale = s.targetScale;
      applyMotionVars(s);
      rafRef.current = null;
      return;
    }

    applyMotionVars(s);
    rafRef.current = window.requestAnimationFrame(stepAnimation);
  }, [applyMotionVars]);

  const scheduleAnimation = useCallback(() => {
    if (shouldReduceMotion) {
      const s = motionRef.current;
      s.pointerX = s.targetPointerX;
      s.pointerY = s.targetPointerY;
      s.centerDist = s.targetCenterDist;
      s.rotateX = 0;
      s.rotateY = 0;
      s.scale = 1;
      applyMotionVars(s);
      return;
    }
    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(stepAnimation);
    }
  }, [applyMotionVars, shouldReduceMotion, stepAnimation]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const updateCardPointer = useCallback(
    (clientX: number, clientY: number, isTouchInput: boolean) => {
      const stage = stageRef.current;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const nx = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      const ny = Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);
      const dx = nx - 0.5;
      const dy = ny - 0.5;
      const centerDist = Math.min(1, Math.hypot(dx * 2, dy * 2));

      const s = motionRef.current;
      s.targetPointerX = nx * 100;
      s.targetPointerY = ny * 100;
      s.targetCenterDist = centerDist;

      if (shouldReduceMotion) {
        s.targetRotateX = 0;
        s.targetRotateY = 0;
        s.targetScale = 1;
      } else if (isTouchInput) {
        s.targetRotateX = -dy * 15;
        s.targetRotateY = dx * 15;
        s.targetScale = 1.01;
      } else {
        s.targetRotateX = -dy * 20;
        s.targetRotateY = dx * 20;
        s.targetScale = 1.015;
      }
      scheduleAnimation();
    },
    [scheduleAnimation, shouldReduceMotion]
  );

  const resetCard = useCallback(() => {
    isInteractingRef.current = false;
    setIsInteracting(false);
    setIsHoloActive(false);

    const s = motionRef.current;
    s.targetPointerX = 50;
    s.targetPointerY = 50;
    s.targetCenterDist = 0;
    s.targetRotateX = 0;
    s.targetRotateY = 0;
    s.targetScale = 1;
    scheduleAnimation();
  }, [scheduleAnimation]);

  useEffect(() => {
    if (!isInteracting) return;
    const handleWindowRelease = () => resetCard();
    window.addEventListener('pointerup', handleWindowRelease);
    window.addEventListener('pointercancel', handleWindowRelease);
    return () => {
      window.removeEventListener('pointerup', handleWindowRelease);
      window.removeEventListener('pointercancel', handleWindowRelease);
    };
  }, [isInteracting, resetCard]);

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    setIsHoloActive(true);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('a')) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const isTouchInput = event.pointerType !== 'mouse';
    isInteractingRef.current = true;
    setIsInteracting(true);
    setIsHoloActive(true);
    updateCardPointer(event.clientX, event.clientY, isTouchInput);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const isTouchInput = event.pointerType !== 'mouse';
    if (isTouchInput && !isInteractingRef.current) return;

    if (!isHoloActive) {
      setIsHoloActive(true);
    }
    updateCardPointer(event.clientX, event.clientY, isTouchInput);
  };

  return (
    <div
      ref={stageRef}
      onPointerEnter={handlePointerEnter}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={resetCard}
      onPointerCancel={resetCard}
      onPointerLeave={resetCard}
      className="pokemon-card-stage relative w-full max-w-[350px]"
    >
      <div className="pokemon-card-perspective">
        <article
          ref={rotatorRef}
          aria-label={`${PROFILE_DATA.name} EX Pokémon Profile Card`}
          data-holo-active={isHoloActive ? 'true' : 'false'}
          data-interacting={isInteracting ? 'true' : 'false'}
          className="pokemon-card-rotator pokemon-card-shell group relative w-full p-[7px] sm:p-[9px]"
        >
          <div
            aria-hidden="true"
            className="pokemon-card-bezel-sheen pointer-events-none absolute inset-0 rounded-[18px]"
          />

          <div className="pokemon-card-inner relative">
            <div
              aria-hidden="true"
              className="pokemon-card-stock pointer-events-none absolute inset-0 overflow-hidden rounded-[8px]"
            >
              <div className="pokemon-card__shine pokemon-card__shine--surface" />
              <div className="pokemon-card__sparkle pokemon-card__sparkle--surface" />
              <div className="pokemon-card__glare pokemon-card__glare--surface" />
            </div>

            <header className="pokemon-card-layer-elevated relative z-20 flex items-center justify-between gap-1 pb-1.5 sm:gap-1.5">
              <div className="flex min-w-0 items-center gap-1 sm:gap-1.5">
                <div className="pokemon-stage-pill inline-flex shrink-0 items-center gap-1 py-0.5 pl-0.5 pr-1.5 sm:pr-2">
                  <span className="pokemon-stage-socket inline-flex h-5 w-5 items-center justify-center rounded-full sm:h-[22px] sm:w-[22px]">
                    <BrandLogo size={18} showAura={false} className="text-folio-ink" />
                  </span>
                  <span className="font-mono text-[8px] font-bold uppercase tracking-[0.06em] text-folio-ink sm:text-[9px] sm:tracking-[0.1em]">
                    {statsLabels.stage}
                  </span>
                </div>

                <div className="flex min-w-0 items-baseline gap-1">
                  <span className="whitespace-nowrap font-serif text-[13px] font-bold leading-none tracking-tight text-folio-ink sm:text-[1.05rem]">
                    {PROFILE_DATA.name}
                  </span>
                  <span className="pokemon-ex-badge shrink-0 font-mono text-[8px] font-extrabold italic leading-none tracking-wider text-folio-ink sm:text-[9px]">
                    EX
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-folio-muted">
                    HP
                  </span>
                  <span className="font-mono text-[13px] font-extrabold leading-none tracking-tight text-folio-ink sm:text-[1.05rem]">
                    {PROFILE_DATA.birthYear}
                  </span>
                </div>
                <PrismTypeOrb />
              </div>
            </header>

            <div className="relative z-10">
              <div className="pokemon-art-bezel rounded-[8px] p-[3px]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-folio-bg">
                  <img
                    src={PROFILE_DATA.avatarUrl}
                    alt={PROFILE_DATA.name}
                    decoding="async"
                    fetchPriority="high"
                    className="h-full w-full object-cover object-[50%_18%] filter contrast-[1.04] transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div
                    aria-hidden="true"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(16, 17, 20, 0.42) 0%, transparent 45%)',
                    }}
                    className="pointer-events-none absolute inset-0"
                  />
                  <div className="pokemon-card__shine pokemon-card__shine--art" aria-hidden="true" />
                  <div className="pokemon-card__sparkle pokemon-card__sparkle--art" aria-hidden="true" />
                  <div className="pokemon-card__glare pokemon-card__glare--art" aria-hidden="true" />
                </div>
              </div>

              <div className="pokemon-card-layer-elevated relative z-20 -mt-1.5 px-1">
                <div className="pokemon-dex-ribbon px-1.5 py-0.5 text-center font-mono text-[7px] font-medium leading-tight tracking-tight text-folio-muted sm:px-2 sm:text-[7.5px]">
                  {statsLabels.dex}
                </div>
              </div>
            </div>

            <section
              aria-label={t.indexHeader}
              className="pokemon-card-layer-elevated relative z-20 mt-2.5 pt-0.5"
            >
              <div className="flex items-center justify-between gap-2 border-b border-folio-border pb-1.5">
                <div className="flex shrink-0 items-center gap-1">
                  <ColorlessEnergyOrb size={13} label="Energy 1" />
                  <ColorlessEnergyOrb size={13} label="Energy 2" />
                </div>
                <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-folio-ink sm:text-[11px]">
                  {t.indexHeader}
                </h2>
                <span className="font-serif text-base font-extrabold leading-none tracking-tight text-folio-ink sm:text-lg">
                  5 / 6
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {PROJECTS_DATA.slice(0, 5).map((proj) => (
                  <a
                    key={proj.id}
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pokemon-project-chip pointer-events-auto inline-flex cursor-pointer items-center gap-1 rounded-[5px] font-mono text-[10px] font-medium text-folio-ink transition-colors duration-150"
                  >
                    <span>{proj.title}</span>
                    <ExternalLink className="h-2.5 w-2.5 shrink-0 opacity-65" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>

            <div className="pokemon-card-layer-elevated relative z-20 mt-2.5 grid grid-cols-3 divide-x divide-folio-border rounded-[6px] border border-folio-border py-1 text-center">
              <div className="flex items-center justify-center gap-1 px-1">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-folio-faint">
                  {statsLabels.weakness}
                </span>
                <ColorlessEnergyOrb size={11} label="Weakness Energy" />
                <span className="font-mono text-[9.5px] font-bold text-folio-ink">×2</span>
              </div>

              <div className="flex items-center justify-center gap-1 px-1">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-folio-faint">
                  {statsLabels.resistance}
                </span>
                <Shield className="h-2.5 w-2.5 shrink-0 text-folio-ink" aria-hidden="true" />
                <span className="font-mono text-[9.5px] font-bold text-folio-ink">-30</span>
              </div>

              <div className="flex items-center justify-center gap-1 px-1">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-folio-faint">
                  {statsLabels.retreat}
                </span>
                <span className="inline-flex items-center gap-0.5">
                  <ColorlessEnergyOrb size={11} label="Retreat 1" />
                  <ColorlessEnergyOrb size={11} label="Retreat 2" />
                </span>
              </div>
            </div>

            <footer className="pokemon-card-layer-elevated relative z-20 mt-2 flex items-center justify-between gap-2 pt-0.5">
              <span className="font-mono text-[9.5px] italic text-folio-muted">
                Illus. {PROFILE_DATA.name}
              </span>
              <span className="pokemon-rarity-badge rounded-[4px] px-1.5 py-0.5 font-mono text-[9.5px] font-bold tracking-[0.08em] text-folio-ink">
                001/006 ★ SAR
              </span>
            </footer>
          </div>
        </article>
      </div>
    </div>
  );
};
