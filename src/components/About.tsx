import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Compass, Sparkles, UserCheck } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';
import { AboutFoilPass } from './AboutFoilPass';

interface AboutProps {
  locale: Locale;
  theme: 'light' | 'dark';
}

export const About: React.FC<AboutProps> = ({ locale, theme }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = UI_LABELS[locale].about;
  const paragraphs = PROFILE_DATA.aboutParagraphs[locale];

  return (
    <section
      id="about"
      className="folio-section overflow-x-clip"
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

        <div className="grid grid-cols-1 items-start gap-8 overflow-visible lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 overflow-visible lg:col-span-4"
          >
            <AboutFoilPass locale={locale} theme={theme} />
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 lg:col-span-8 lg:border-l lg:border-folio-border lg:pl-10"
          >
            <div className="folio-card google-gradient-hover-border space-y-4">
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

              {paragraphs.map((paragraph, idx) =>
                idx === 0 ? (
                  <p
                    key={idx}
                    className="font-serif text-xl leading-relaxed text-folio-ink sm:text-[1.4rem]"
                  >
                    {paragraph}
                  </p>
                ) : (
                  <p
                    key={idx}
                    className={`text-sm leading-relaxed sm:text-base ${
                      idx === paragraphs.length - 1
                        ? 'border-t border-folio-border pt-4 font-medium text-folio-ink'
                        : 'text-folio-muted'
                    }`}
                  >
                    {paragraph}
                  </p>
                )
              )}
            </div>

            <div className="folio-card google-gradient-hover-border">
              <div className="mb-4 flex items-center gap-2 font-mono text-xs font-semibold text-folio-ink">
                <Compass className="h-4 w-4 text-folio-ink" aria-hidden="true" />
                <span>{t.methodTitle}</span>
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {PROFILE_DATA.methodology.map((item) => (
                  <div
                    key={item.index}
                    className="folio-card-inner flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-folio-border pb-2">
                      <span className="font-mono text-[11px] font-bold text-folio-faint">
                        {item.index}
                      </span>
                    </div>
                    <h3 className="font-serif text-base font-bold leading-snug text-folio-ink sm:text-lg">
                      {item.title[locale]}
                    </h3>
                    <p className="text-sm leading-relaxed text-folio-muted">
                      {item.description[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
