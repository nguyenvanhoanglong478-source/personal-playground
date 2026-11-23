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
  rx: number;
  ry: number;
  gx: number;
  gy: number;
  trx: number;
  tryVal: number;
  tgx: number;
  tgy: number;
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
  const [isHoloActive, setIsHoloActive] = useState(false);

  const motionRef = useRef<CardMotionState>({
    rx: 0,
    ry: 0,
    gx: 0,
    gy: 0,
    trx: 0,
    tryVal: 0,
    tgx: 0,
    tgy: 0,
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
      const isTilting =
        !shouldReduceMotion &&
        (Math.abs(s.rx) > 0.02 || Math.abs(s.ry) > 0.02);
      if (isTilting) {
        el.setAttribute('data-tilting', 'true');
      } else {
        el.removeAttribute('data-tilting');
      }
      el.style.setProperty('--rotate-x', shouldReduceMotion ? '0deg' : `${s.rx.toFixed(2)}deg`);
      el.style.setProperty('--rotate-y', shouldReduceMotion ? '0deg' : `${s.ry.toFixed(2)}deg`);
      el.style.setProperty('--glare-x', `${s.gx.toFixed(2)}%`);
      el.style.setProperty('--glare-y', `${s.gy.toFixed(2)}%`);
    },
    [shouldReduceMotion]
  );

  const stepAnimation = useCallback(() => {
    const s = motionRef.current;
    s.rx += (s.trx - s.rx) * LERP_FACTOR;
    s.ry += (s.tryVal - s.ry) * LERP_FACTOR;
    s.gx += (s.tgx - s.gx) * LERP_FACTOR;
    s.gy += (s.tgy - s.gy) * LERP_FACTOR;

    const delta =
      Math.abs(s.trx - s.rx) +
      Math.abs(s.tryVal - s.ry) +
      Math.abs(s.tgx - s.gx) +
      Math.abs(s.tgy - s.gy);

    if (delta < 0.04) {
      s.rx = s.trx;
      s.ry = s.tryVal;
      s.gx = s.tgx;
      s.gy = s.tgy;
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
      s.rx = 0;
      s.ry = 0;
      s.gx = 0;
      s.gy = 0;
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

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || shouldReduceMotion) return;
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const nx = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    const ny = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);

    const s = motionRef.current;
    s.trx = -(ny - 0.5) * 12;
    s.tryVal = (nx - 0.5) * 12;
    s.tgx = (nx - 0.5) * 36;
    s.tgy = (ny - 0.5) * 24;
    if (!isHoloActive) {
      setIsHoloActive(true);
    }
    scheduleAnimation();
  };

  const resetCard = () => {
    setIsHoloActive(false);
    const s = motionRef.current;
    s.trx = 0;
    s.tryVal = 0;
    s.tgx = 0;
    s.tgy = 0;
    scheduleAnimation();
  };

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetCard}
      className="pokemon-card-stage relative w-full max-w-[350px]"
    >
      <div className="pokemon-card-perspective">
        <article
          ref={rotatorRef}
          aria-label={`${PROFILE_DATA.name} EX Pokémon Profile Card`}
          data-holo-active={isHoloActive ? 'true' : 'false'}
          className="pokemon-card-rotator pokemon-card-shell group relative w-full p-[7px] sm:p-[9px]"
        >
          <div className="pokemon-card-inner relative">
            <header className="relative z-20 flex items-center justify-between gap-1 pb-1.5 sm:gap-1.5">
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
                  <picture className="block h-full w-full">
                    <source srcSet={PROFILE_DATA.avatarAvifUrl} type="image/avif" />
                    <source srcSet={PROFILE_DATA.avatarWebpUrl} type="image/webp" />
                    <img
                      src={PROFILE_DATA.avatarUrl}
                      alt={PROFILE_DATA.name}
                      width={720}
                      height={787}
                      decoding="async"
                      fetchPriority="high"
                      className="h-full w-full object-cover object-[50%_18%]"
                    />
                  </picture>
                  <div
                    aria-hidden="true"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(16, 17, 20, 0.42) 0%, transparent 45%)',
                    }}
                    className="pointer-events-none absolute inset-0"
                  />
                  <div className="pokemon-card__glare" aria-hidden="true" />
                </div>
              </div>

              <div className="relative z-20 -mt-1.5 px-1">
                <div className="pokemon-dex-ribbon px-1.5 py-0.5 text-center font-mono text-[7px] font-medium leading-tight tracking-tight text-folio-muted sm:px-2 sm:text-[7.5px]">
                  {statsLabels.dex}
                </div>
              </div>
            </div>

            <section
              aria-label={t.indexHeader}
              className="relative z-20 mt-2.5 pt-0.5"
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

            <div className="relative z-20 mt-2.5 grid grid-cols-3 divide-x divide-folio-border rounded-[6px] border border-folio-border py-1 text-center">
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

            <footer className="relative z-20 mt-2 flex items-center justify-between gap-2 pt-0.5">
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
