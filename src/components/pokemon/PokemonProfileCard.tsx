import React from 'react';
import { ExternalLink, Shield } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../../data/profile';
import { PROJECTS_DATA } from '../../data/projects';
import { useCardTilt } from '../../hooks/useCardTilt';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { BrandLogo } from '../layout/BrandLogo';

interface PokemonProfileCardProps {
  locale: Locale;
}

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
    <svg
      viewBox="0 0 24 24"
      width="11"
      height="11"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2.4C12.75 7.45 14.55 9.25 19.6 10C14.55 10.75 12.75 12.55 12 17.6C11.25 12.55 9.45 10.75 4.4 10C9.45 9.25 11.25 7.45 12 2.4Z"
        fill="currentColor"
      />
    </svg>
  </span>
);

export const PokemonProfileCard: React.FC<PokemonProfileCardProps> = ({
  locale,
}) => {
  const shouldReduceMotion = usePrefersReducedMotion();
  const {
    stageRef,
    cardRef: rotatorRef,
    isTiltActive: isHoloActive,
    updateTiltFromPointer,
    resetTilt,
  } = useCardTilt<HTMLElement>({
    maxDeg: 12,
    lerp: 0.28,
    disabled: shouldReduceMotion,
    variant: 'hero',
  });

  const t = UI_LABELS[locale].hero;
  const dex =
    locale === 'vi'
      ? `NO. ${PROFILE_DATA.birthYear} • ${PROFILE_DATA.role.vi} • HT: VI/EN`
      : `NO. ${PROFILE_DATA.birthYear} • ${PROFILE_DATA.role.en} • HT: EN/VI`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || shouldReduceMotion) return;
    updateTiltFromPointer(event.clientX, event.clientY);
  };

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
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
                    <BrandLogo
                      size={18}
                      showAura={false}
                      className="text-folio-ink"
                    />
                  </span>
                  <span className="font-mono text-[8px] font-bold uppercase tracking-[0.06em] text-folio-ink sm:text-[9px] sm:tracking-[0.1em]">
                    BASIC
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
                  {dex}
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
                  5 / {PROJECTS_DATA.length}
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
                  weakness
                </span>
                <ColorlessEnergyOrb size={11} label="Weakness Energy" />
                <span className="font-mono text-[9.5px] font-bold text-folio-ink">×2</span>
              </div>

              <div className="flex items-center justify-center gap-1 px-1">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-folio-faint">
                  resistance
                </span>
                <Shield className="h-2.5 w-2.5 shrink-0 text-folio-ink" aria-hidden="true" />
                <span className="font-mono text-[9.5px] font-bold text-folio-ink">-30</span>
              </div>

              <div className="flex items-center justify-center gap-1 px-1">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-folio-faint">
                  retreat
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
                001/00{PROJECTS_DATA.length} ★ SAR
              </span>
            </footer>
          </div>
        </article>
      </div>
    </div>
  );
};
