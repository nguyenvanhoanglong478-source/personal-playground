import React from 'react';
import { ArrowRight, CheckCircle2, GitBranch, Sparkles } from 'lucide-react';
import { Locale, UI_LABELS } from '../../data/profile';
import { LIVE_SITE_STACK } from '../../data/siteStack';

interface BuiltWithDiagramProps {
  locale: Locale;
}

export const BuiltWithDiagram: React.FC<BuiltWithDiagramProps> = ({
  locale,
}) => {
  const t = UI_LABELS[locale].builtWith;

  const findVersion = (name: string) =>
    LIVE_SITE_STACK.packages.find((p) => p.pkgName === name)?.version || '';

  const pipelineSteps = [
    {
      step: '01. BUILD',
      title: 'Vite',
      version: findVersion('vite'),
      sub: 'Rollup + ESBuild',
    },
    {
      step: '02. UI & TYPES',
      title: 'React + TypeScript',
      version: `${findVersion('react')} / ${findVersion('typescript')}`,
      sub: 'Modular Components',
    },
    {
      step: '03. STYLING',
      title: 'Tailwind CSS',
      version: findVersion('tailwindcss'),
      sub: ':root Design Tokens',
    },
    {
      step: '04. MOTION & ICONS',
      title: 'CSS Motion + Lucide',
      version: findVersion('lucide-react'),
      sub: 'GPU CSS + Reduced Motion',
    },
    {
      step: '05. DEPLOY',
      title: 'Cloudflare + GitHub Pages',
      version: `v${LIVE_SITE_STACK.projectVersion}`,
      sub: 'Dual Static Edge Hosting',
    },
  ];

  return (
    <section
      id="stack"
      className="folio-section"
      aria-labelledby="stack-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-[11.5px] font-semibold text-folio-muted">
              <Sparkles className="h-3.5 w-3.5 text-folio-muted" aria-hidden="true" />
              <span className="folio-index-label">{t.sectionIndex}</span>
            </div>
            <h2 id="stack-heading" className="folio-section-heading">
              {t.heading}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-folio-muted sm:text-[0.95rem] lg:col-span-5">
            {t.subheading}
          </p>
        </div>

        <div className="folio-card google-gradient-hover-border mb-5">
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono text-[11.5px] font-semibold text-folio-ink">
              <GitBranch
                className="h-3.5 w-3.5 shrink-0 text-folio-ink"
                aria-hidden="true"
              />
              <span>{t.pipelineTitle}</span>
            </div>
            <span className="font-mono text-[11.5px] text-folio-muted">
              package.json · {LIVE_SITE_STACK.packages.length}
            </span>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {pipelineSteps.map((node, idx) => (
              <div key={node.step} className="flex items-stretch">
                <div className="folio-card-inner flex w-full flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-folio-ink">
                      {node.step}
                    </span>
                    <h3 className="mt-1 font-serif text-base font-bold text-folio-ink">
                      {node.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-folio-muted">{node.sub}</p>
                  </div>
                  <div className="mt-2.5 border-t border-folio-border pt-1.5 font-mono text-[10.5px] text-folio-muted">
                    {node.version}
                  </div>
                </div>
                {idx < pipelineSteps.length - 1 && (
                  <div
                    className="hidden items-center justify-center pl-1.5 text-folio-muted lg:flex"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE_SITE_STACK.packages.map((pkg) => (
            <div
              key={pkg.pkgName}
              className="folio-card google-gradient-hover-border flex h-full flex-col justify-between !p-4 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className="h-3.5 w-3.5 shrink-0 text-folio-ink"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs font-bold text-folio-ink sm:text-[13px]">
                      {pkg.displayName}
                    </span>
                  </div>
                  <span className="rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated px-2 py-0.5 font-mono text-[11px] font-semibold text-folio-ink">
                    {pkg.version}
                  </span>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-folio-muted sm:text-[13.5px]">
                  {pkg.reason[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
