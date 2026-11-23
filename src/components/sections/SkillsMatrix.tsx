import React, { useState } from 'react';
import { Layers, Monitor, Palette, Server, Sparkles, Workflow } from 'lucide-react';
import { Locale, UI_LABELS } from '../../data/profile';
import { SKILL_GROUPS, SkillGroupId } from '../../data/skills';

interface SkillsMatrixProps {
  locale: Locale;
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ locale }) => {
  const t = UI_LABELS[locale].skills;

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

  return (
    <section
      id="skills"
      className="folio-section"
      aria-labelledby="skills-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-[11.5px] font-semibold text-folio-muted">
              <Sparkles className="h-3.5 w-3.5 text-folio-muted" aria-hidden="true" />
              <span className="folio-index-label">{t.sectionIndex}</span>
            </div>
            <h2 id="skills-heading" className="folio-section-heading">
              {t.heading}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-folio-muted sm:text-[0.95rem] lg:col-span-5">
            {t.subheading}
          </p>
        </div>

        <div className="space-y-3">
          {SKILL_GROUPS.map((group) => {
            const activeItem =
              group.items.find((item) => item.id === selectedByGroup[group.id]) ||
              group.items[0];

            return (
              <div
                key={group.id}
                className="folio-card google-gradient-hover-border grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start"
              >
                <div className="flex items-center justify-between border-b border-folio-border pb-2.5 lg:col-span-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(group.id)}
                    <h3 className="font-serif text-lg font-bold text-folio-ink">
                      {t.categories[group.id]}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-folio-faint">
                    {group.items.length}
                  </span>
                </div>

                <div className="flex flex-col gap-3 lg:col-span-9">
                  <div className="flex flex-wrap gap-1.5">
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
                          className={`folio-chip min-h-[36px] cursor-pointer px-3 py-1.5 sm:min-h-[30px] sm:px-2.5 sm:py-1 ${
                            isSelected
                              ? '!border-folio-strong !bg-folio-surface font-semibold'
                              : ''
                          }`}
                        >
                          <span>{item.label[locale]}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="folio-card-inner flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div className="min-w-0">
                      <div className="font-mono text-xs font-bold text-folio-ink">
                        {activeItem.label[locale]}
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-folio-muted sm:text-[13px]">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
