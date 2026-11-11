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
      x: (e.clientX - cx) * 0.18,
      y: (e.clientY - cy) * 0.18,
    });
  };

  const resetMagnetic = () => setBtnOffset({ x: 0, y: 0 });

  const sloganWords = PROFILE_DATA.slogan[locale].split(' ');

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-65px)] overflow-hidden border-b border-folio-border py-12 sm:py-16 lg:py-24"
      aria-labelledby="hero-display-heading"
    >
      {/* Lazy-loaded interactive manuscript canvas */}
      <Suspense fallback={null}>
        <LazyHeroFolioCanvas theme={theme} />
      </Suspense>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Folio Metadata Strip */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-folio-border pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-folio-muted">
            <BookMarked className="h-4 w-4 text-folio-vermilion" aria-hidden="true" />
            <span>{t.folioTag}</span>
          </div>
          <div className="font-mono text-xs text-folio-spruce">
            <span>[VERIFIED SOURCE CODE ARCHIVE — 4 PROJECTS]</span>
          </div>
        </div>

        {/* Asymmetric 12-Column Editorial Spread */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Left Main Folio Column (8 cols) */}
          <div className="lg:col-span-8">
            {/* Role Tag with explicit placeholder */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold text-folio-muted">
                {t.roleLabel}
              </span>
              <span className="placeholder-token">
                {PROFILE_DATA.rolePlaceholder[locale]}
              </span>
            </div>

            {/* Huge Display Name + Annotated Slogan */}
            <h1
              id="hero-display-heading"
              className="font-serif text-5xl font-bold leading-[1.04] tracking-tight text-folio-ink sm:text-7xl lg:text-[5.25rem]"
            >
              <span className="block text-folio-vermilion">{PROFILE_DATA.name}.</span>
              <span className="mt-3 block font-serif text-3xl font-normal italic leading-[1.18] text-folio-ink sm:text-5xl lg:text-[3.35rem]">
                {sloganWords.map((word, idx) => (
                  <motion.span
                    key={`${word}-${idx}`}
                    initial={
                      shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.48,
                      delay: shouldReduceMotion ? 0 : idx * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mr-[0.26em] inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Main Real Introduction + Explicit [[...]] Placeholder */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-folio-ink sm:text-lg"
            >
              <p>
                {PROFILE_DATA.introMain[locale]}{' '}
                <span className="placeholder-token">
                  {PROFILE_DATA.introPlaceholder[locale]}
                </span>
              </p>
            </motion.div>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                ref={btnRef}
                href="#projects"
                onMouseMove={handleMagneticMove}
                onMouseLeave={resetMagnetic}
                style={{
                  transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
                }}
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded border border-folio-vermilion bg-folio-vermilion px-6 py-3 font-mono text-sm font-semibold text-[var(--accent-primary-contrast)] transition-transform duration-300 hover:scale-[1.02]"
              >
                <span>{t.ctaProjects}</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded border border-folio-strong bg-folio-elevated px-6 py-3 font-mono text-sm font-semibold text-folio-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4 text-folio-vermilion" aria-hidden="true" />
                <span>{t.ctaContact}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Asymmetric Marginalia Rail (4 cols) */}
          <motion.aside
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            aria-label={t.marginaliaHeader}
            className="relative rounded-md border border-folio-border bg-folio-surface/90 p-5 shadow-sm backdrop-blur-sm lg:col-span-4 lg:mt-4"
          >
            <div className="mb-3 flex items-center justify-between border-b border-folio-border pb-2.5">
              <span className="font-mono text-[11px] font-semibold text-folio-vermilion">
                {t.marginaliaHeader}
              </span>
              <Sparkles className="h-3.5 w-3.5 text-folio-spruce" aria-hidden="true" />
            </div>

            <p className="mb-5 font-serif text-sm italic leading-relaxed text-folio-muted">
              {PROFILE_DATA.marginaliaNote[locale]}
            </p>

            {/* Quick Index of the 4 Verified Projects */}
            <div className="space-y-2.5">
              {PROJECTS_DATA.map((proj) => (
                <a
                  key={proj.id}
                  href={`#project-${proj.id}`}
                  className="group block rounded border border-folio-border bg-folio-elevated p-3 transition-transform duration-300 hover:-translate-y-0.5 hover:border-folio-vermilion"
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-folio-muted">
                    <span className="text-folio-vermilion">{proj.indexNumber}</span>
                    <span>{proj.technologies[0]?.name}</span>
                  </div>
                  <div className="mt-1 font-serif text-base font-semibold text-folio-ink group-hover:text-folio-vermilion">
                    {proj.title}
                  </div>
                  <div className="mt-0.5 text-xs text-folio-muted">
                    {proj.subtitle[locale]}
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-4 border-t border-folio-border pt-3 font-mono text-[11px] text-folio-muted">
              {t.scrollHint}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};
