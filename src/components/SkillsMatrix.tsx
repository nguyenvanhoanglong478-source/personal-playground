import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Cpu, Rocket, Wrench } from 'lucide-react';
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
        return <Code2 className="h-4 w-4 text-folio-vermilion" aria-hidden="true" />;
      case 'framework':
        return <Cpu className="h-4 w-4 text-folio-spruce" aria-hidden="true" />;
      case 'tool':
        return <Wrench className="h-4 w-4 text-folio-vermilion" aria-hidden="true" />;
      case 'deploy':
        return <Rocket className="h-4 w-4 text-folio-spruce" aria-hidden="true" />;
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
          <span className="folio-index-label">{t.sectionIndex}</span>
          <h2 id="skills-heading" className="folio-section-heading">
            {t.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-folio-muted">
            {t.subheading}
          </p>
        </div>

        {/* Slow Tech Marquee Strip */}
        <div
          className="mb-8 overflow-hidden rounded-[var(--radius-inner)] border border-folio-border bg-folio-surface py-3"
          aria-label="Technology Marquee"
        >
          <div className="animate-folio-marquee gap-3 px-4">
            {marqueeList.map((skill, idx) => (
              <div key={`${skill.name}-${idx}`} className="folio-chip shrink-0 gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-folio-vermilion" />
                <span className="font-semibold">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Balanced Category Row Bands (Eliminates uneven blank columns) */}
        <div className="space-y-4">
          {CATEGORY_ORDER.map((category, idx) => {
            const items = SYNTHESIZED_SKILLS.filter(
              (s) => s.category === category
            );

            return (
              <motion.div
                key={category}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="folio-card grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start"
              >
                {/* Left Category Label (3 cols) */}
                <div className="flex items-center justify-between border-b border-folio-border pb-3 lg:col-span-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
                  <div className="flex items-center gap-2.5">
                    {getCategoryIcon(category)}
                    <h3 className="font-serif text-xl font-bold text-folio-ink">
                      {t.categories[category]}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-folio-muted">
                    ({items.length})
                  </span>
                </div>

                {/* Right Uniform Card Grid (9 cols) */}
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
                            className="rounded-[var(--radius-tag)] bg-folio-surface px-2 py-0.5 font-mono text-[10px] font-medium text-folio-vermilion"
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
