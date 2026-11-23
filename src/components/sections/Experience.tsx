import React from 'react';
import { ArrowRight, Briefcase, Check, Sparkles } from 'lucide-react';
import { Locale, UI_LABELS } from '../../data/profile';
import { EXPERIENCE_DATA } from '../../data/experience';

interface ExperienceProps {
  locale: Locale;
}

export const Experience: React.FC<ExperienceProps> = ({ locale }) => {
  const t = UI_LABELS[locale].experience;

  return (
    <section
      id="experience"
      className="folio-section"
      aria-labelledby="experience-heading"
    >
      <div className="folio-container">
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12 lg:gap-9">
          <div className="lg:sticky lg:top-20 lg:col-span-5">
            <div className="border-b border-folio-border pb-4">
              <div className="flex items-center gap-2 font-mono text-[11.5px] font-semibold text-folio-muted">
                <Sparkles className="h-3.5 w-3.5 text-folio-ink" aria-hidden="true" />
                <span className="folio-index-label">{t.sectionIndex}</span>
              </div>
              <h2
                id="experience-heading"
                className="folio-section-heading mt-2.5 lg:text-[2.25rem]"
              >
                {t.heading}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-folio-muted sm:text-[0.95rem]">
                {t.subheading}
              </p>
            </div>

            <nav
              aria-label={locale === 'vi' ? 'Chỉ mục kinh nghiệm' : 'Experience index'}
              className="mt-4 hidden divide-y divide-folio-border lg:block"
            >
              {EXPERIENCE_DATA.map((exp) => (
                <a
                  key={exp.id}
                  href={`#exp-${exp.id}`}
                  className="group flex items-center justify-between py-2.5 text-[13px] text-folio-muted transition-colors duration-150 hover:text-folio-ink"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="font-mono text-[11px] font-bold text-folio-faint transition-colors group-hover:text-folio-ink">
                      {exp.index}
                    </span>
                    <span className="font-medium text-folio-ink">
                      {exp.roleTag[locale]}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-3.5 w-3.5 opacity-40 transition-transform duration-150 group-hover:translate-x-1 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-7">
            <div className="relative space-y-5 border-l border-folio-border pl-5 sm:pl-7">
              {EXPERIENCE_DATA.map((exp) => (
                <article
                  key={exp.id}
                  id={`exp-${exp.id}`}
                  className="group relative scroll-mt-20"
                >
                  <span
                    aria-hidden="true"
                    className="editorial-spine-dot absolute -left-[26px] top-6 flex h-3 w-3 items-center justify-center rounded-full border border-folio-strong bg-folio-bg group-hover:scale-125 group-hover:border-folio-ink sm:-left-[34px]"
                  >
                    <span className="h-1 w-1 rounded-full bg-folio-ink" />
                  </span>

                  <div className="folio-card google-gradient-hover-border flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-folio-border pb-2.5">
                        <span className="font-mono text-[11.5px] font-bold text-folio-ink">
                          {exp.index}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] font-medium text-folio-muted">
                          <Briefcase className="h-3.5 w-3.5 text-folio-ink" aria-hidden="true" />
                          <span>{exp.roleTag[locale]}</span>
                        </span>
                      </div>

                      <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-folio-ink sm:text-xl">
                        {exp.title[locale]}
                      </h3>

                      <p className="mt-1.5 text-sm leading-relaxed text-folio-muted">
                        {exp.summary[locale]}
                      </p>

                      <ul className="mt-3.5 space-y-2 border-t border-folio-border pt-3">
                        {exp.highlights[locale].map((point, pointIdx) => (
                          <li
                            key={pointIdx}
                            className="flex items-start gap-2 text-xs leading-relaxed text-folio-ink sm:text-[13.5px]"
                          >
                            <Check
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-folio-muted"
                              aria-hidden="true"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-folio-border pt-3">
                      {exp.tools.map((tool) => (
                        <span key={tool} className="folio-chip">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
