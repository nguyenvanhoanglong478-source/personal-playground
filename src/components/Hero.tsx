import React, { Suspense, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const portraitParallax = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const copyParallax = useTransform(scrollYProgress, [0, 1], [0, -12]);

  const sloganWords = PROFILE_DATA.slogan[locale].split(' ');

  return (
    <section
      ref={heroRef}
      id="hero"
      className="folio-section relative overflow-x-clip !pt-10 lg:!pt-14"
      aria-labelledby="hero-display-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <Suspense fallback={null}>
          <LazyHeroFolioCanvas theme={theme} />
        </Suspense>
      </div>

      <div className="folio-container relative z-10">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-folio-border pb-4 lg:mb-14">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-folio-muted">
            <BookMarked className="h-4 w-4 text-folio-ink" aria-hidden="true" />
            <span>{t.folioTag}</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-folio-border bg-folio-surface px-3 py-1 font-mono text-[11px] font-semibold text-folio-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-folio-ggreen opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-folio-ggreen" />
            </span>
            <span>{t.statusAvailable}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <motion.div
            style={{ y: shouldReduceMotion ? 0 : copyParallax }}
            className="lg:col-span-7"
          >
            <h1
              id="hero-display-heading"
              className="font-serif text-[3.25rem] font-bold leading-[0.98] tracking-[-0.03em] text-folio-ink sm:text-7xl lg:text-[5.75rem]"
            >
              <motion.span
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="block text-folio-ink"
              >
                {PROFILE_DATA.name}.
              </motion.span>
            </h1>

            <div className="mt-7 border-l border-folio-border pl-5 sm:pl-8 lg:ml-10">
              <p className="font-serif text-2xl font-normal italic leading-[1.28] text-folio-ink sm:text-4xl lg:text-[2.5rem]">
                {sloganWords.map((word, idx) => (
                  <motion.span
                    key={`${word}-${idx}`}
                    initial={
                      shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : 0.14 + idx * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mr-[0.25em] inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </p>

              <motion.p
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-xl text-base leading-relaxed text-folio-muted sm:text-lg"
              >
                {PROFILE_DATA.introMain[locale]}
              </motion.p>

              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 grid grid-cols-1 gap-4 border-y border-folio-border py-4 sm:grid-cols-2 sm:gap-0"
              >
                <div className="sm:pr-6">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-folio-faint">
                    {t.roleLabel}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 font-mono text-sm font-semibold text-folio-ink">
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-folio-ink" aria-hidden="true" />
                    <span>{PROFILE_DATA.role[locale]}</span>
                  </div>
                </div>
                <div className="border-t border-folio-border pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-folio-faint">
                    {t.birthLabel}
                  </div>
                  <div className="mt-1 font-mono text-sm font-semibold text-folio-ink">
                    {PROFILE_DATA.birthYear}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-wrap items-center gap-5"
              >
                <a href="#projects" className="folio-btn-primary">
                  <span className="google-pill-aura" aria-hidden="true" />
                  <span>{t.ctaProjects}</span>
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a href="#contact" className="folio-btn-secondary">
                  <span className="google-pill-aura" aria-hidden="true" />
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{t.ctaContact}</span>
                </a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ y: shouldReduceMotion ? 0 : portraitParallax }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center lg:col-span-5 lg:mt-14 lg:items-end"
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
                    <div className="mb-2 font-mono text-[11px] font-semibold text-folio-muted">
                      {t.indexHeader}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {PROJECTS_DATA.map((proj) => (
                        <a
                          key={proj.id}
                          href={`#project-${proj.id}`}
                          className="cursor-pointer rounded-md border border-folio-border bg-folio-elevated px-2.5 py-1 font-mono text-[11px] text-folio-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-folio-gblue"
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
