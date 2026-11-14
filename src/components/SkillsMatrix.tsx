import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layers, Monitor, Palette, Server, Sparkles, Workflow } from 'lucide-react';
import { Locale, UI_LABELS } from '../data/profile';
import { SKILL_GROUPS, SkillGroupId } from '../data/skills';

interface SkillsMatrixProps {
  locale: Locale;
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ locale }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = UI_LABELS[locale].skills;
  const marqueeBoxRef = useRef<HTMLDivElement | null>(null);
  const [isMarqueeInView, setIsMarqueeInView] = useState(true);

  useEffect(() => {
    const el = marqueeBoxRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsMarqueeInView(entry.isIntersecting);
        }
      },
      { rootMargin: '80px 0px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [selectedByGroup, setSelectedByGroup] = useState<Record<SkillGroupId, string>>({
    platforms: SKILL_GROUPS[0].items[0].id,
    design: SKILL_GROUPS[1].items[0].id,
    frontend: SKILL_GROUPS[2].items[0].id,
    backend: SKILL_GROUPS[3].items[0].id,
    workflow: SKILL_GROUPS[4].items[0].id,
  });

  const getCategoryIcon = (cat: SkillGroupId) => {
    switch (cat) {
      case 'platforms':
        return <Layers className="h-4 w-4 text-folio-ink" aria-hidden="true" />;
      case 'design':
        return <Palette className="h-4 w-4 text-folio-ink" aria-hidden="true" />;
      case 'frontend':
        return <Monitor className="h-4 w-4 text-folio-ink" aria-hidden="true" />;
      case 'backend':
        return <Server className="h-4 w-4 text-folio-ink" aria-hidden="true" />;
      case 'workflow':
        return <Workflow className="h-4 w-4 text-folio-ink" aria-hidden="true" />;
    }
  };

  const allSkills = SKILL_GROUPS.flatMap((group) => group.items);
  const marqueeList = [...allSkills, ...allSkills];

  return (
    <section
      id="skills"
      className="folio-section"
      aria-labelledby="skills-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-folio-muted">
              <Sparkles className="h-3.5 w-3.5 text-folio-muted" aria-hidden="true" />
              <span className="folio-index-label">{t.sectionIndex}</span>
            </div>
            <h2 id="skills-heading" className="folio-section-heading">
              {t.heading}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-folio-muted lg:col-span-5">
            {t.subheading}
          </p>
        </div>

        <div
          ref={marqueeBoxRef}
          className="mb-8 overflow-hidden rounded-[var(--radius-inner)] border border-folio-border bg-folio-surface py-3 shadow-[var(--shadow-soft)] backdrop-blur-md transition-colors duration-300"
          aria-label="Technology Marquee"
        >
          <div
            className="animate-folio-marquee gap-3 px-4"
            style={isMarqueeInView ? undefined : { animationPlayState: 'paused' }}
          >
            {marqueeList.map((skill, idx) => (
              <div key={`${skill.id}-${idx}`} className="folio-chip shrink-0 gap-2">
                <span className="h-2 w-2 rounded-full bg-folio-ink/70" aria-hidden="true" />
                <span className="font-semibold">{skill.label[locale]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {SKILL_GROUPS.map((group, idx) => {
            const activeItem =
              group.items.find((item) => item.id === selectedByGroup[group.id]) ||
              group.items[0];

            return (
              <motion.div
                key={group.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="folio-card google-gradient-hover-border grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start"
              >
                <div className="flex items-center justify-between border-b border-folio-border pb-3 lg:col-span-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
                  <div className="flex items-center gap-2.5">
                    {getCategoryIcon(group.id)}
                    <h3 className="font-serif text-xl font-bold text-folio-ink">
                      {t.categories[group.id]}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-folio-faint">
                    {group.items.length}
                  </span>
                </div>

                <div className="flex flex-col gap-4 lg:col-span-9">
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => {
                      const isSelected = activeItem.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() =>
                            setSelectedByGroup((prev) => ({
                              ...prev,
                              [group.id]: item.id,
                            }))
                          }
                          className={`folio-chip min-h-[44px] cursor-pointer px-3.5 py-2 transition-all sm:min-h-[34px] sm:px-3 sm:py-1.5 ${
                            isSelected
                              ? '!border-folio-ink !bg-folio-surface font-semibold shadow-sm'
                              : ''
                          }`}
                        >
                          <span>{item.label[locale]}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="folio-card-inner flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center">
                    <div className="min-w-0">
                      <div className="font-mono text-xs font-bold text-folio-ink">
                        {activeItem.label[locale]}
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-folio-muted sm:text-sm">
                        {activeItem.evidence[locale]}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-1.5 sm:max-w-[46%] sm:justify-end">
                      <span className="font-mono text-[10px] font-medium text-folio-faint">
                        {t.evidencePrefix}:
                      </span>
                      {activeItem.projects.map((projName) => (
                        <span
                          key={projName}
                          className="rounded-[var(--radius-tag)] border border-folio-border bg-folio-surface px-2 py-0.5 font-mono text-[10px] font-medium text-folio-ink"
                        >
                          {projName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
