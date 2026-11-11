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

  // Duplicate list once for seamless horizontal marquee
  const marqueeList = [...SYNTHESIZED_SKILLS, ...SYNTHESIZED_SKILLS];

  return (
    <section
      id="skills"
      className="border-b border-folio-border py-16 sm:py-24"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-folio-border pb-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-folio-vermilion">
              {t.sectionIndex}
            </span>
            <h2
              id="skills-heading"
              className="mt-2 font-serif text-3xl font-bold text-folio-ink sm:text-5xl"
            >
              {t.heading}
            </h2>
            <p className="mt-3 text-base text-folio-muted">{t.subheading}</p>
          </div>
          <div className="font-mono text-xs text-folio-spruce">
            <span>
              [AUTO-DERIVED: {SYNTHESIZED_SKILLS.length} UNIQUE TECHNOLOGIES]
            </span>
          </div>
        </div>

        {/* Slow Tech Marquee Strip */}
        <div
          className="mb-10 overflow-hidden rounded border border-folio-border bg-folio-surface py-3"
          aria-label="Synthesized Technology Marquee"
        >
          <div className="animate-folio-marquee gap-4 px-4">
            {marqueeList.map((skill, idx) => (
              <div
                key={`${skill.name}-${idx}`}
                className="inline-flex shrink-0 items-center gap-2 rounded border border-folio-border bg-folio-elevated px-3.5 py-1.5 font-mono text-xs text-folio-ink"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-folio-vermilion" />
                <span className="font-semibold">{skill.name}</span>
                <span className="text-[11px] text-folio-muted">
                  ({skill.projects.join(', ')})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Category Grouped Matrix */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {CATEGORY_ORDER.map((category, idx) => {
            const items = SYNTHESIZED_SKILLS.filter(
              (s) => s.category === category
            );

            return (
              <motion.div
                key={category}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.48, delay: idx * 0.06 }}
                className="rounded-md border border-folio-strong bg-folio-surface p-6"
              >
                <div className="mb-4 flex items-center justify-between border-b border-folio-border pb-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    <h3 className="font-serif text-xl font-bold text-folio-ink">
                      {t.categories[category]}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-folio-muted">
                    [{items.length}]
                  </span>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.name}
                      className="rounded border border-folio-border bg-folio-elevated p-3.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-sm font-semibold text-folio-ink">
                          {item.name}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.projects.map((projName) => (
                            <span
                              key={projName}
                              className="rounded bg-folio-surface px-2 py-0.5 font-mono text-[10px] font-medium text-folio-vermilion"
                            >
                              {projName}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-folio-muted">
                        {item.evidenceSummary[locale]}
                      </p>
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
