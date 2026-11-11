import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Compass, UserCheck } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';

interface AboutProps {
  locale: Locale;
}

export const About: React.FC<AboutProps> = ({ locale }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = UI_LABELS[locale].about;

  return (
    <section
      id="about"
      className="folio-section"
      aria-labelledby="about-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header">
          <span className="folio-index-label">{t.sectionIndex}</span>
          <h2 id="about-heading" className="folio-section-heading">
            {t.heading}
          </h2>
        </div>

        {/* 12-Col Layout: Portrait Frame (5 cols) + Bio & Method (7 cols) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Portrait Frame */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="folio-card flex h-full flex-col justify-between">
              <div className="mb-3 font-mono text-xs text-folio-muted">
                {t.portraitCaption}
              </div>

              <div className="folio-card-inner flex flex-1 flex-col items-center justify-center p-6 text-center">
                <svg
                  viewBox="0 0 320 320"
                  className="h-44 w-44 text-folio-ink opacity-85 sm:h-52 sm:w-52"
                  role="img"
                  aria-label="Marcus Portrait Placeholder"
                >
                  <circle
                    cx="160"
                    cy="160"
                    r="134"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                  />
                  <circle
                    cx="160"
                    cy="160"
                    r="108"
                    fill="none"
                    stroke="var(--accent-primary)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="160"
                    cy="118"
                    r="30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M106 232 C106 188, 214 188, 214 232"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M98 240 L160 256 L222 240 L222 212 L160 228 L98 212 Z"
                    fill="var(--bg-surface)"
                    stroke="var(--accent-primary)"
                    strokeWidth="2"
                  />
                  <line
                    x1="160"
                    y1="228"
                    x2="160"
                    y2="256"
                    stroke="var(--accent-primary)"
                    strokeWidth="2"
                  />
                </svg>

                <div className="mt-4 max-w-xs">
                  <span className="placeholder-token text-xs">
                    {PROFILE_DATA.portraitPathPlaceholder}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Story & Working Principle */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex flex-col justify-between gap-6 lg:col-span-7"
          >
            <div className="folio-card flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-folio-muted">
                <UserCheck className="h-4 w-4 text-folio-vermilion" aria-hidden="true" />
                <span className="font-semibold text-folio-ink">
                  {PROFILE_DATA.name}
                </span>
                <span className="placeholder-token">
                  {PROFILE_DATA.rolePlaceholder[locale]}
                </span>
              </div>

              <p className="text-base leading-relaxed text-folio-ink sm:text-lg">
                {PROFILE_DATA.aboutStory[locale]}{' '}
                <span className="placeholder-token">
                  {PROFILE_DATA.introPlaceholder[locale]}
                </span>
              </p>

              <p className="border-l-2 border-folio-vermilion pl-4 font-serif text-base italic text-folio-muted">
                {PROFILE_DATA.marginaliaNote[locale]}
              </p>
            </div>

            <div className="folio-card">
              <div className="mb-2 flex items-center gap-2 font-mono text-xs font-semibold text-folio-spruce">
                <Compass className="h-4 w-4" aria-hidden="true" />
                <span>{t.methodTitle}</span>
              </div>
              <p className="text-sm leading-relaxed text-folio-ink sm:text-base">
                {t.methodBody}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
