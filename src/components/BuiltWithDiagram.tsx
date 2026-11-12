import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, GitBranch, Sparkles } from 'lucide-react';
import { Locale, UI_LABELS } from '../data/profile';
import { LIVE_SITE_STACK } from '../data/siteStack';

interface BuiltWithDiagramProps {
  locale: Locale;
}

export const BuiltWithDiagram: React.FC<BuiltWithDiagramProps> = ({
  locale,
}) => {
  const shouldReduceMotion = useReducedMotion();
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
      step: '04. MOTION',
      title: 'Framer Motion + Lucide',
      version: findVersion('framer-motion'),
      sub: 'Transform Reveals',
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
        <div className="folio-section-header grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-folio-muted">
              <Sparkles className="h-3.5 w-3.5 text-folio-muted" aria-hidden="true" />
              <span className="folio-index-label">{t.sectionIndex}</span>
            </div>
            <h2 id="stack-heading" className="folio-section-heading">
              {t.heading}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-folio-muted lg:col-span-5">
            {t.subheading}
          </p>
        </div>

        <div className="folio-card google-gradient-hover-border mb-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-folio-ink">
              <GitBranch
                className="h-4 w-4 shrink-0 text-folio-ink"
                aria-hidden="true"
              />
              <span>{t.pipelineTitle}</span>
            </div>
            <span className="font-mono text-xs text-folio-muted">
              package.json · {LIVE_SITE_STACK.packages.length}
            </span>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {pipelineSteps.map((node, idx) => (
              <div key={node.step} className="flex items-stretch">
                <div className="folio-card-inner flex w-full flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-folio-ink">
                      {node.step}
                    </span>
                    <h3 className="mt-1 font-serif text-lg font-bold text-folio-ink">
                      {node.title}
                    </h3>
                    <p className="mt-1 text-xs text-folio-muted">{node.sub}</p>
                  </div>
                  <div className="mt-3 border-t border-folio-border pt-2 font-mono text-[11px] text-folio-muted">
                    {node.version}
                  </div>
                </div>
                {idx < pipelineSteps.length - 1 && (
                  <div
                    className="hidden items-center justify-center pl-2 text-folio-muted lg:flex"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE_SITE_STACK.packages.map((pkg, idx) => (
            <motion.div
              key={pkg.pkgName}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="folio-card google-gradient-hover-border flex h-full flex-col justify-between !p-5 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-folio-ink"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-sm font-bold text-folio-ink">
                      {pkg.displayName}
                    </span>
                  </div>
                  <span className="rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated px-2 py-0.5 font-mono text-xs font-semibold text-folio-ink">
                    {pkg.version}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-folio-muted">
                  {pkg.reason[locale]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
