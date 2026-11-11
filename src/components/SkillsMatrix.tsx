import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Cpu, Rocket, Sparkles, Wrench } from 'lucide-react';
import { Locale, UI_LABELS } from '../data/profile';
import { SYNTHESIZED_SKILLS } from '../data/skills';
import { SkillCategory } from '../data/projects';

interface SkillsMatrixProps {
  locale: Locale;
}

const CATEGORY_ORDER: SkillCategory[] = ['language', 'framework', 'tool', 'deploy'];

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ locale }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = UI_LABELS[locale].skills;

  const getCategoryIcon = (cat: SkillCategory) => {
    switch (cat) {
      case 'language':
        return <Code2 className="h-4 w-4 text-folio-accent" aria-hidden="true" />;
      case 'framework':
        return <Cpu className="h-4 w-4 text-folio-secondary" aria-hidden="true" />;
      case 'tool':
        return <Wrench className="h-4 w-4 text-folio-gpurple" aria-hidden="true" />;
      case 'deploy':
        return <Rocket className="h-4 w-4 text-folio-gcoral" aria-hidden="true" />;
    }
  };

  const marqueeList = [...SYNTHESIZED_SKILLS, ...SYNTHESIZED_SKILLS];

  return (
    <section
      id="skills"
      className="folio-section"
      aria-labelledby="skills-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-folio-accent">
            <Sparkles className="h-3.5 w-3.5 text-folio-gpurple" aria-hidden="true" />
            <span className="folio-index-label">{t.sectionIndex}</span>
          </div>
          <h2 id="skills-heading" className="folio-section-heading">
            {t.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-folio-muted">
            {t.subheading}
          </p>
        </div>

        <div
          className="mb-8 overflow-hidden rounded-[var(--radius-inner)] border border-folio-border bg-folio-surface py-3 shadow-[var(--shadow-soft)] backdrop-blur-md transition-colors duration-300"
          aria-label="Technology Marquee"
        >
          <div className="animate-folio-marquee gap-3 px-4">
            {marqueeList.map((skill, idx) => (
              <div key={`${skill.name}-${idx}`} className="folio-chip shrink-0 gap-2">
                <span className="google-border-frame h-2 w-2 rounded-full" />
                <span className="font-semibold">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {CATEGORY_ORDER.map((category, idx) => {
            const items = SYNTHESIZED_SKILLS.filter(
              (s) => s.category === category
            );

            return (
              <motion.div
                key={category}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="folio-card google-gradient-hover-border grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start"
              >
                <div className="flex items-center justify-between border-b border-folio-border pb-3 lg:col-span-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
                  <div className="flex items-center gap-2.5">
                    {getCategoryIcon(category)}
                    <h3 className="font-serif text-xl font-bold text-folio-ink">
                      {t.categories[category]}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-folio-faint">
                    {items.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:col-span-9 xl:grid-cols-3">
                  {items.map((item) => (
                    <div
                      key={item.name}
                      className="folio-card-inner flex h-full flex-col justify-between gap-2"
                    >
                      <div>
                        <div className="font-mono text-sm font-semibold text-folio-ink">
                          {item.name}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-folio-muted">
                          {item.evidenceSummary[locale]}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.projects.map((projName) => (
                          <span
                            key={projName}
                            className="rounded-[var(--radius-tag)] border border-folio-border bg-folio-surface px-2 py-0.5 font-mono text-[10px] font-medium text-folio-accent"
                          >
                            {projName}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
