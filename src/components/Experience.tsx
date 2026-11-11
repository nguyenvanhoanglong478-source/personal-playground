import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, Check } from 'lucide-react';
import { Locale, UI_LABELS } from '../data/profile';
import { EXPERIENCE_DATA } from '../data/experience';

interface ExperienceProps {
  locale: Locale;
}

export const Experience: React.FC<ExperienceProps> = ({ locale }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = UI_LABELS[locale].experience;

  return (
    <section
      id="experience"
      className="folio-section"
      aria-labelledby="experience-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header">
          <span className="folio-index-label">{t.sectionIndex}</span>
          <h2 id="experience-heading" className="folio-section-heading">
            {t.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-folio-muted">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <motion.article
              key={exp.id}
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="folio-card flex h-full flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-folio-border pb-3">
                  <span className="font-mono text-xs font-bold text-folio-vermilion">
                    {exp.index}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-folio-spruce">
                    <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{exp.roleTag[locale]}</span>
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-2xl font-bold leading-snug text-folio-ink">
                  {exp.title[locale]}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-folio-muted sm:text-base">
                  {exp.summary[locale]}
                </p>

                <ul className="mt-4 space-y-2">
                  {exp.highlights[locale].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-folio-ink"
                    >
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-folio-vermilion"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-folio-border pt-4">
                {exp.tools.map((tool) => (
                  <span key={tool} className="folio-chip">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
