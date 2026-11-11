import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Compass, Sparkles, UserCheck } from 'lucide-react';
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
        <div className="folio-section-header grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-folio-muted">
              <Sparkles className="h-3.5 w-3.5 text-folio-ink" aria-hidden="true" />
              <span className="folio-index-label">{t.sectionIndex}</span>
            </div>
            <h2 id="about-heading" className="folio-section-heading">
              {t.heading}
            </h2>
          </div>
          <div className="font-mono text-xs text-folio-muted lg:col-span-5 lg:text-right">
            {PROFILE_DATA.name} · {PROFILE_DATA.birthYear} · {PROFILE_DATA.role[locale]}
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <div className="folio-card google-gradient-hover-border flex flex-col gap-5 !p-5">
              <div className="google-border-frame rounded-[var(--radius-inner)] p-[2px] shadow-[var(--shadow-soft)]">
                <div className="overflow-hidden rounded-[calc(var(--radius-inner)-2px)] bg-folio-bg">
                  <img
                    src={PROFILE_DATA.avatarUrl}
                    alt={t.portraitAlt}
                    loading="lazy"
                    className="aspect-square w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              <div className="divide-y divide-folio-border border-t border-folio-border">
                <div className="flex items-center justify-between py-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-folio-faint">
                    {t.nameLabel}
                  </span>
                  <span className="font-serif text-sm font-bold text-folio-ink">
                    {PROFILE_DATA.name}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-folio-faint">
                    {t.birthLabel}
                  </span>
                  <span className="font-mono text-sm font-bold text-folio-ink">
                    {PROFILE_DATA.birthYear}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 pt-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-folio-faint">
                    {t.roleLabel}
                  </span>
                  <span className="text-right font-serif text-sm font-bold text-folio-ink">
                    {PROFILE_DATA.role[locale]}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 lg:col-span-8 lg:border-l lg:border-folio-border lg:pl-10"
          >
            <div className="folio-card google-gradient-hover-border space-y-5">
              <div className="flex flex-wrap items-center gap-3 border-b border-folio-border pb-4 font-mono text-xs text-folio-muted">
                <UserCheck className="h-4 w-4 text-folio-ink" aria-hidden="true" />
                <span className="font-semibold text-folio-ink">
                  {PROFILE_DATA.name}
                </span>
                <span>·</span>
                <span>{PROFILE_DATA.birthYear}</span>
                <span>·</span>
                <span className="font-semibold text-folio-ink">
                  {PROFILE_DATA.role[locale]}
                </span>
              </div>

              <p className="font-serif text-xl leading-relaxed text-folio-ink sm:text-2xl">
                {PROFILE_DATA.aboutStory[locale]}
              </p>

              <p className="border-t border-folio-border pt-4 text-base leading-relaxed text-folio-muted">
                {PROFILE_DATA.introMain[locale]}
              </p>
            </div>

            <div className="folio-card google-gradient-hover-border">
              <div className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold text-folio-ink">
                <Compass className="h-4 w-4 text-folio-ink" aria-hidden="true" />
                <span>{t.methodTitle}</span>
              </div>
              <p className="text-sm leading-relaxed text-folio-muted sm:text-base">
                {PROFILE_DATA.methodSummary[locale]}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
