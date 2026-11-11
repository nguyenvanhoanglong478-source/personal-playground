import React, { Suspense, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, BookMarked, Mail } from 'lucide-react';
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
        <div className="mb-8 flex items-center justify-between border-b border-folio-border pb-4">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-folio-vermilion">
            <BookMarked className="h-4 w-4" aria-hidden="true" />
            <span>{t.folioTag}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="lg:col-span-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="folio-chip">
                {t.birthLabel}: {PROFILE_DATA.birthYear}
              </span>
              <span className="folio-chip text-folio-vermilion">
                {t.roleLabel}: {PROFILE_DATA.role[locale]}
              </span>
            </div>

            <h1
              id="hero-display-heading"
              className="font-serif text-5xl font-bold leading-[1.06] tracking-tight text-folio-ink sm:text-7xl lg:text-[5rem]"
            >
              <span className="block text-folio-vermilion">{PROFILE_DATA.name}.</span>
              <span className="mt-3 block font-serif text-3xl font-normal italic leading-[1.22] text-folio-ink sm:text-5xl lg:text-[3.1rem]">
                {sloganWords.map((word, idx) => (
                  <motion.span
                    key={`${word}-${idx}`}
                    initial={
                      shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : idx * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mr-[0.26em] inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-7 max-w-2xl text-base leading-relaxed text-folio-ink sm:text-lg"
            >
              {PROFILE_DATA.introMain[locale]}
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
                <Mail className="h-4 w-4 text-folio-vermilion" aria-hidden="true" />
                <span>{t.ctaContact}</span>
              </a>
            </motion.div>
          </div>

          <motion.aside
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            aria-label={t.indexHeader}
            className="folio-card lg:col-span-4"
          >
            <div className="mb-4 flex items-center justify-between border-b border-folio-border pb-3">
              <span className="font-mono text-xs font-semibold text-folio-vermilion">
                {t.indexHeader}
              </span>
            </div>

            <div className="space-y-2.5">
              {PROJECTS_DATA.map((proj) => (
                <a
                  key={proj.id}
                  href={`#project-${proj.id}`}
                  className="folio-card-inner group block transition-transform duration-200 hover:-translate-y-0.5 hover:border-folio-vermilion"
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-folio-muted">
                    <span className="font-semibold text-folio-vermilion">
                      {proj.indexNumber}
                    </span>
                    <span>{proj.technologies[0]?.name}</span>
                  </div>
                  <div className="mt-0.5 font-serif text-base font-bold text-folio-ink group-hover:text-folio-vermilion">
                    {proj.title}
                  </div>
                  <div className="mt-0.5 text-xs text-folio-muted">
                    {proj.subtitle[locale]}
                  </div>
                </a>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};
