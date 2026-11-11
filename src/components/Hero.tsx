import React, { Suspense, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, BookMarked, Mail, Sparkles } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';
import { PROJECTS_DATA } from '../data/projects';

const LazyHeroFolioCanvas = React.lazy(() => import('./HeroFolioCanvas'));

interface HeroProps {
  locale: Locale;
  theme: 'light' | 'dark';
}

export const Hero: React.FC<HeroProps> = ({ locale, theme }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = UI_LABELS[locale].hero;
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setBtnOffset({
      x: (e.clientX - cx) * 0.16,
      y: (e.clientY - cy) * 0.16,
    });
  };

  const resetMagnetic = () => setBtnOffset({ x: 0, y: 0 });

  const sloganWords = PROFILE_DATA.slogan[locale].split(' ');

  return (
    <section
      id="hero"
      className="folio-section relative overflow-hidden"
      aria-labelledby="hero-display-heading"
    >
      <Suspense fallback={null}>
        <LazyHeroFolioCanvas theme={theme} />
      </Suspense>

      <div className="folio-container relative z-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-folio-border pb-4">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-folio-accent">
            <BookMarked className="h-4 w-4" aria-hidden="true" />
            <span>{t.folioTag}</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-folio-secondary/35 bg-folio-secondary/10 px-3 py-1 font-mono text-[11px] font-semibold text-folio-secondary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-folio-ggreen opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-folio-ggreen" />
            </span>
            <span>{t.statusAvailable}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="folio-chip flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-folio-gpurple" aria-hidden="true" />
                <span>{PROFILE_DATA.role[locale]}</span>
              </span>
              <span className="folio-chip">
                {t.birthLabel}: {PROFILE_DATA.birthYear}
              </span>
            </div>

            <h1
              id="hero-display-heading"
              className="font-serif text-5xl font-bold leading-[1.12] tracking-tight text-folio-ink sm:text-7xl lg:text-[5.25rem]"
            >
              <motion.span
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="google-text-gradient block"
              >
                {PROFILE_DATA.name}.
              </motion.span>
              <span className="mt-2 block font-serif text-3xl font-normal italic leading-[1.22] text-folio-ink sm:text-5xl lg:text-[3.2rem]">
                {sloganWords.map((word, idx) => (
                  <motion.span
                    key={`${word}-${idx}`}
                    initial={
                      shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : 0.15 + idx * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mr-[0.25em] inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-2xl text-base leading-relaxed text-folio-muted sm:text-lg"
            >
              {PROFILE_DATA.introMain[locale]}
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                ref={btnRef}
                href="#projects"
                onMouseMove={handleMagneticMove}
                onMouseLeave={resetMagnetic}
                style={{
                  transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
                }}
                className="folio-btn-primary"
              >
                <span>{t.ctaProjects}</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a href="#contact" className="folio-btn-secondary">
                <Mail className="h-4 w-4 text-folio-accent" aria-hidden="true" />
                <span>{t.ctaContact}</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center lg:col-span-5"
          >
            <div className="relative w-full max-w-md">
              <div
                style={{ backgroundImage: 'var(--google-gradient-aura)' }}
                className="animate-pulse-ring absolute -inset-2.5 rounded-3xl blur-2xl"
                aria-hidden="true"
              />

              <div className="google-border-frame animate-float-gentle relative rounded-2xl p-[1.5px] shadow-[var(--shadow-glow)]">
                <div className="relative overflow-hidden rounded-[calc(1rem-1.5px)] bg-folio-surface p-5 backdrop-blur-xl transition-colors duration-300">
                  <div className="google-border-frame relative rounded-xl p-[2px]">
                    <div className="relative overflow-hidden rounded-[10px] bg-folio-bg">
                      <img
                        src={PROFILE_DATA.avatarUrl}
                        alt={PROFILE_DATA.name}
                        className="aspect-square w-full object-cover object-top filter contrast-[1.03] transition-transform duration-500 hover:scale-105"
                      />
                      <div
                        style={{
                          background:
                            'linear-gradient(to top, var(--overlay-scrim) 0%, transparent 55%)',
                        }}
                        className="pointer-events-none absolute inset-0"
                      />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                        <div>
                          <div className="font-serif text-lg font-bold">
                            {PROFILE_DATA.name}
                          </div>
                          <div className="font-mono text-xs text-white/85">
                            {PROFILE_DATA.role[locale]}
                          </div>
                        </div>
                        <div className="rounded-full border border-white/20 bg-black/55 px-3 py-1 font-mono text-xs backdrop-blur-md">
                          {PROFILE_DATA.birthYear}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-folio-border pt-3">
                    <div className="mb-2 font-mono text-[11px] font-semibold text-folio-accent">
                      {t.indexHeader}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {PROJECTS_DATA.map((proj) => (
                        <a
                          key={proj.id}
                          href={`#project-${proj.id}`}
                          className="rounded-md border border-folio-border bg-folio-elevated px-2.5 py-1 font-mono text-[11px] text-folio-ink transition-colors hover:border-folio-accent hover:text-folio-accent"
                        >
                          {proj.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
