import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Compass, Feather, FileCode2, UserCheck } from 'lucide-react';
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
      className="border-b border-folio-border py-16 sm:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Index Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-folio-border pb-4">
          <span className="font-mono text-xs font-semibold text-folio-vermilion">
            {t.sectionIndex}
          </span>
          <span className="font-mono text-xs text-folio-muted">
            [SRC: src/data/profile.ts]
          </span>
        </div>

        {/* Asymmetric 12-Col Layout: Portrait Frame (5 cols) + Story & Marginalia (7 cols) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Graphic-Processed Portrait Frame */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-md border border-folio-strong bg-folio-surface p-5">
              {/* Corner registration marks */}
              <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-folio-muted">
                <span>FIG. 01 — PORTRAIT PLATE</span>
                <span className="text-folio-vermilion">SCALE 1:1</span>
              </div>

              {/* Custom SVG Engraved Scholarly Portrait Frame */}
              <div className="relative flex aspect-[4/4.3] flex-col items-center justify-center overflow-hidden rounded border border-folio-border bg-folio-elevated p-6 text-center">
                <svg
                  viewBox="0 0 320 320"
                  className="h-48 w-48 text-folio-ink opacity-85 sm:h-56 sm:w-56"
                  role="img"
                  aria-label="Marcus Archival Portrait Frame"
                >
                  {/* Concentric astrolabe / folio rings */}
                  <circle
                    cx="160"
                    cy="160"
                    r="138"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                  />
                  <circle
                    cx="160"
                    cy="160"
                    r="112"
                    fill="none"
                    stroke="var(--accent-primary)"
                    strokeWidth="1.5"
                  />
                  {/* Crosshair axes */}
                  <line
                    x1="20"
                    y1="160"
                    x2="300"
                    y2="160"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    strokeOpacity="0.35"
                  />
                  <line
                    x1="160"
                    y1="20"
                    x2="160"
                    y2="300"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    strokeOpacity="0.35"
                  />
                  {/* Stylized Reader & Builder Silhouette */}
                  <circle
                    cx="160"
                    cy="118"
                    r="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M104 234 C104 188, 216 188, 216 234"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  {/* Open Folio Book geometry in front */}
                  <path
                    d="M96 242 L160 258 L224 242 L224 212 L160 228 L96 212 Z"
                    fill="var(--bg-surface)"
                    stroke="var(--accent-primary)"
                    strokeWidth="2"
                  />
                  <line
                    x1="160"
                    y1="228"
                    x2="160"
                    y2="258"
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

              <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-folio-muted">
                <span>ID: MARCUS-FOLIO</span>
                <span>STATUS: ACTIVE BUILDER</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative + Annotated Cards */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-6 lg:col-span-7"
          >
            <h2
              id="about-heading"
              className="font-serif text-3xl font-bold leading-tight text-folio-ink sm:text-4xl lg:text-5xl"
            >
              {t.heading}
            </h2>

            {/* Main Bio Card */}
            <div className="rounded-md border border-folio-border bg-folio-elevated p-6">
              <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs text-folio-muted">
                <UserCheck className="h-4 w-4 text-folio-vermilion" aria-hidden="true" />
                <span>{PROFILE_DATA.name}</span>
                <span>—</span>
                <span className="placeholder-token">
                  {PROFILE_DATA.rolePlaceholder[locale]}
                </span>
              </div>

              <p className="text-base leading-relaxed text-folio-ink sm:text-lg">
                {PROFILE_DATA.introMain[locale]}{' '}
                <span className="placeholder-token">
                  {PROFILE_DATA.introPlaceholder[locale]}
                </span>
              </p>

              <p className="mt-4 border-l-2 border-folio-vermilion pl-4 font-serif text-base italic text-folio-muted">
                {PROFILE_DATA.marginaliaNote[locale]}
              </p>
            </div>

            {/* Two-Column Engineering Method & Honest Placeholder Note */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-folio-border bg-folio-surface p-5">
                <div className="mb-2 flex items-center gap-2 font-mono text-xs font-semibold text-folio-spruce">
                  <Compass className="h-4 w-4" aria-hidden="true" />
                  <span>{t.readingMethodTitle}</span>
                </div>
                <p className="text-sm leading-relaxed text-folio-ink">
                  {t.readingMethodBody}
                </p>
              </div>

              <div className="rounded-md border border-folio-border bg-folio-surface p-5">
                <div className="mb-2 flex items-center gap-2 font-mono text-xs font-semibold text-folio-vermilion">
                  <Feather className="h-4 w-4" aria-hidden="true" />
                  <span>[DATA INTEGRITY]</span>
                </div>
                <p className="text-sm leading-relaxed text-folio-ink">
                  {t.placeholderGuide}
                </p>
                <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-folio-muted">
                  <FileCode2 className="h-3.5 w-3.5 text-folio-spruce" aria-hidden="true" />
                  <span>src/data/profile.ts</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
