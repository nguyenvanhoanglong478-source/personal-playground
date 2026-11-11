import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Briefcase, Check, Sparkles } from 'lucide-react';
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
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <div className="border-b border-folio-border pb-6">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-folio-muted">
                <Sparkles className="h-3.5 w-3.5 text-folio-ink" aria-hidden="true" />
                <span className="folio-index-label">{t.sectionIndex}</span>
              </div>
              <h2
                id="experience-heading"
                className="folio-section-heading mt-3 lg:text-[2.85rem]"
              >
                {t.heading}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-folio-muted">
                {t.subheading}
              </p>
            </div>

            <nav
              aria-label={locale === 'vi' ? 'Chỉ mục kinh nghiệm' : 'Experience index'}
              className="mt-6 hidden divide-y divide-folio-border lg:block"
            >
              {EXPERIENCE_DATA.map((exp) => (
                <a
                  key={exp.id}
                  href={`#exp-${exp.id}`}
                  className="group flex items-center justify-between py-3 text-sm text-folio-muted transition-colors duration-200 hover:text-folio-ink"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-folio-faint transition-colors group-hover:text-folio-ink">
                      {exp.index}
                    </span>
                    <span className="font-medium text-folio-ink">
                      {exp.roleTag[locale]}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-3.5 w-3.5 opacity-40 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-7">
            <div className="relative space-y-7 border-l border-folio-border pl-6 sm:pl-9">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <motion.article
                  key={exp.id}
                  id={`exp-${exp.id}`}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative scroll-mt-24"
                >
                  <span
                    aria-hidden="true"
                    className="editorial-spine-dot absolute -left-[30px] top-8 flex h-3 w-3 items-center justify-center rounded-full border border-folio-strong bg-folio-bg group-hover:scale-125 group-hover:border-folio-gblue sm:-left-[42px]"
                  >
                    <span className="h-1 w-1 rounded-full bg-folio-ink" />
                  </span>

                  <div className="folio-card google-gradient-hover-border flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-folio-border pb-3">
                        <span className="font-mono text-xs font-bold text-folio-ink">
                          {exp.index}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-folio-muted">
                          <Briefcase className="h-3.5 w-3.5 text-folio-ink" aria-hidden="true" />
                          <span>{exp.roleTag[locale]}</span>
                        </span>
                      </div>

                      <h3 className="mt-4 font-serif text-2xl font-bold leading-snug text-folio-ink">
                        {exp.title[locale]}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-folio-muted sm:text-base">
                        {exp.summary[locale]}
                      </p>

                      <ul className="mt-5 space-y-2.5 border-t border-folio-border pt-4">
                        {exp.highlights[locale].map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-folio-ink"
                          >
                            <Check
                              className="mt-1 h-4 w-4 shrink-0 text-folio-muted"
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
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
