import React, { useRef, useState } from 'react';
import {
  MotionStyle,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ExternalLink, Shield } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';
import { PROJECTS_DATA } from '../data/projects';
import { CapybaraLogo } from './CapybaraLogo';

interface PokemonProfileCardProps {
  locale: Locale;
}

const CARD_SPRING = { stiffness: 240, damping: 24, mass: 0.9 };

const ColorlessEnergyOrb: React.FC<{ size?: number; label?: string }> = ({
  size = 16,
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
    className="pokemon-type-orb inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full sm:h-6 sm:w-6"
  >
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true">
      <path
        d="M12 2.4C12.75 7.45 14.55 9.25 19.6 10C14.55 10.75 12.75 12.55 12 17.6C11.25 12.55 9.45 10.75 4.4 10C9.45 9.25 11.25 7.45 12 2.4Z"
        fill="currentColor"
      />
    </svg>
  </span>
);

export const PokemonProfileCard: React.FC<PokemonProfileCardProps> = ({ locale }) => {
  const shouldReduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [isHoloActive, setIsHoloActive] = useState(false);

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

  const rawPointerX = useMotionValue(50);
  const rawPointerY = useMotionValue(50);
  const rawCenterDist = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawScale = useMotionValue(1);

  const smoothPointerX = useSpring(rawPointerX, CARD_SPRING);
  const smoothPointerY = useSpring(rawPointerY, CARD_SPRING);
  const smoothCenterDist = useSpring(rawCenterDist, CARD_SPRING);
  const smoothRotateX = useSpring(rawRotateX, CARD_SPRING);
  const smoothRotateY = useSpring(rawRotateY, CARD_SPRING);
  const smoothScale = useSpring(rawScale, CARD_SPRING);

  const cssPointerX = useTransform(smoothPointerX, (val) => `${val.toFixed(2)}%`);
  const cssPointerY = useTransform(smoothPointerY, (val) => `${val.toFixed(2)}%`);
  const cssCenterDist = useTransform(smoothCenterDist, (val) => val.toFixed(3));
  const cssRotateX = useTransform(smoothRotateX, (val) => `${val.toFixed(2)}deg`);
  const cssRotateY = useTransform(smoothRotateY, (val) => `${val.toFixed(2)}deg`);
  const cssScale = useTransform(smoothScale, (val) => val.toFixed(4));

  const rotatorStyle = {
    '--pointer-x': cssPointerX,
    '--pointer-y': cssPointerY,
    '--pointer-from-center': cssCenterDist,
    '--rotate-x': shouldReduceMotion ? '0deg' : cssRotateX,
    '--rotate-y': shouldReduceMotion ? '0deg' : cssRotateY,
    '--card-scale': shouldReduceMotion ? '1' : cssScale,
  } as unknown as MotionStyle;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const nx = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    const ny = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
    const dx = nx - 0.5;
    const dy = ny - 0.5;
    const centerDist = Math.min(1, Math.hypot(dx * 2, dy * 2));

    rawPointerX.set(nx * 100);
    rawPointerY.set(ny * 100);
    rawCenterDist.set(centerDist);

    if (shouldReduceMotion) {
      rawRotateX.set(0);
      rawRotateY.set(0);
      rawScale.set(1);
    } else {
      rawRotateX.set(-dy * 24);
      rawRotateY.set(dx * 24);
      rawScale.set(1.018);
    }

    if (!isHoloActive) {
      setIsHoloActive(true);
    }
  };

  const handlePointerLeave = () => {
    setIsHoloActive(false);
    rawPointerX.set(50);
    rawPointerY.set(50);
    rawCenterDist.set(0);
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawScale.set(1);
  };

  return (
    <div
      ref={stageRef}
      onPointerEnter={() => setIsHoloActive(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="animate-float-gentle relative w-full max-w-[430px]"
    >
      <div className="pokemon-card-perspective">
        <motion.article
          aria-label={`${PROFILE_DATA.name} EX Pokémon Profile Card`}
          data-holo-active={isHoloActive ? 'true' : 'false'}
          style={rotatorStyle}
          className="pokemon-card-rotator pokemon-card-shell group relative w-full p-[8px] sm:p-[11px]"
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

          <header className="pokemon-card-layer-elevated relative z-20 flex items-center justify-between gap-1 pb-2 sm:gap-2">
            <div className="flex min-w-0 items-center gap-1 sm:gap-2">
              <div className="pokemon-stage-pill inline-flex shrink-0 items-center gap-0.5 py-0.5 pl-0.5 pr-1.5 sm:gap-1 sm:pl-1 sm:pr-2.5">
                <span className="pokemon-stage-socket inline-flex h-4 w-4 items-center justify-center rounded-full sm:h-[18px] sm:w-[18px]">
                  <CapybaraLogo size={13} showAura={false} className="text-folio-ink" />
                </span>
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.06em] text-folio-ink sm:text-[9.5px] sm:tracking-[0.12em]">
                  {statsLabels.stage}
                </span>
              </div>

              <div className="flex min-w-0 items-baseline gap-1 sm:gap-1.5">
                <span className="whitespace-nowrap font-serif text-[14px] font-bold leading-none tracking-tight text-folio-ink sm:text-[1.22rem]">
                  {PROFILE_DATA.name}
                </span>
                <span className="pokemon-ex-badge shrink-0 font-mono text-[8.5px] font-extrabold italic leading-none tracking-wider text-folio-ink sm:text-[10px]">
                  EX
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
              <div className="flex items-baseline gap-0.5">
                <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-folio-muted sm:text-[9.5px]">
                  HP
                </span>
                <span className="font-mono text-[14px] font-extrabold leading-none tracking-tight text-folio-ink sm:text-[1.22rem]">
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
                  className="h-full w-full object-cover object-[50%_18%] filter contrast-[1.04] transition-transform duration-500 group-hover:scale-[1.03]"
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

            <div className="pokemon-card-layer-elevated relative z-20 -mt-1.5 px-1 sm:px-1.5">
              <div className="pokemon-dex-ribbon whitespace-nowrap px-2 py-1 text-center font-mono text-[8.5px] font-medium tracking-wide text-folio-muted sm:px-3 sm:text-[10px]">
                {statsLabels.dex}
              </div>
            </div>
          </div>

          <section
            aria-label={t.indexHeader}
            className="pokemon-card-layer-elevated relative z-20 mt-3 pt-1"
          >
            <div className="flex items-center justify-between gap-2 border-b border-folio-border pb-2">
              <div className="flex items-center gap-1 shrink-0">
                <ColorlessEnergyOrb size={15} label="Energy 1" />
                <ColorlessEnergyOrb size={15} label="Energy 2" />
              </div>
              <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-folio-ink sm:text-xs">
                {t.indexHeader}
              </h2>
              <span className="font-serif text-lg font-extrabold leading-none tracking-tight text-folio-ink sm:text-xl">
                5×
              </span>
            </div>

            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {PROJECTS_DATA.map((proj) => (
                <a
                  key={proj.id}
                  href={proj.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pokemon-project-chip pointer-events-auto inline-flex cursor-pointer items-center gap-1 rounded-[6px] px-2.5 py-1 font-mono text-[11px] font-medium text-folio-ink transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>{proj.title}</span>
                  <ExternalLink className="h-2.5 w-2.5 shrink-0 opacity-65" aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>

          <div className="pokemon-card-layer-elevated relative z-20 mt-3 grid grid-cols-3 divide-x divide-folio-border rounded-[6px] border border-folio-border py-1.5 text-center">
            <div className="flex items-center justify-center gap-1 px-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-folio-faint">
                {statsLabels.weakness}
              </span>
              <ColorlessEnergyOrb size={12} label="Weakness Energy" />
              <span className="font-mono text-[10.5px] font-bold text-folio-ink">×2</span>
            </div>

            <div className="flex items-center justify-center gap-1 px-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-folio-faint">
                {statsLabels.resistance}
              </span>
              <Shield className="h-3 w-3 shrink-0 text-folio-ink" aria-hidden="true" />
              <span className="font-mono text-[10.5px] font-bold text-folio-ink">-30</span>
            </div>

            <div className="flex items-center justify-center gap-1 px-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-folio-faint">
                {statsLabels.retreat}
              </span>
              <span className="inline-flex items-center gap-0.5">
                <ColorlessEnergyOrb size={12} label="Retreat 1" />
                <ColorlessEnergyOrb size={12} label="Retreat 2" />
              </span>
            </div>
          </div>

          <footer className="pokemon-card-layer-elevated relative z-20 mt-2.5 flex items-center justify-between gap-2 pt-0.5">
            <span className="font-mono text-[10px] italic text-folio-muted">
              Illus. {PROFILE_DATA.name}
            </span>
            <span className="pokemon-rarity-badge rounded-[4px] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] text-folio-ink">
              001/005 ★ SAR
            </span>
          </footer>
        </div>
        </motion.article>
      </div>
    </div>
  );
};
