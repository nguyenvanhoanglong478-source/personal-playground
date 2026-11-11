import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, FileJson, GitBranch } from 'lucide-react';
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
      sub: 'ESBuild + Rollup Chunking',
    },
    {
      step: '02. UI & TYPES',
      title: 'React + TypeScript',
      version: `${findVersion('react')} / ${findVersion('typescript')}`,
      sub: 'Strict Data-Driven Tree',
    },
    {
      step: '03. STYLING',
      title: 'Tailwind CSS',
      version: findVersion('tailwindcss'),
      sub: ':root Tokens + Bento Grid',
    },
    {
      step: '04. MOTION & ICONS',
      title: 'Framer Motion + Lucide',
      version: findVersion('framer-motion'),
      sub: 'Transform/Opacity + Reduced Motion',
    },
    {
      step: '05. DEPLOY',
      title: 'GitHub Pages / Vercel',
      version: `v${LIVE_SITE_STACK.projectVersion}`,
      sub: 'Static Zero-Backend Edge',
    },
  ];

  return (
    <section
      id="stack"
      className="border-b border-folio-border py-16 sm:py-24"
      aria-labelledby="stack-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-folio-border pb-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-folio-vermilion">
              {t.sectionIndex}
            </span>
            <h2
              id="stack-heading"
              className="mt-2 font-serif text-3xl font-bold text-folio-ink sm:text-5xl"
            >
              {t.heading}
            </h2>
            <p className="mt-3 text-base text-folio-muted">{t.subheading}</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded border border-folio-spruce bg-folio-surface px-3 py-1.5 font-mono text-xs font-semibold text-folio-spruce">
            <FileJson className="h-4 w-4" aria-hidden="true" />
            <span>{t.sourceFileBadge}</span>
          </div>
        </div>

        {/* Visual Pipeline Diagram (Vite -> React + TS -> Tailwind -> Framer Motion -> Deploy) */}
        <div className="mb-10 rounded-md border border-folio-strong bg-folio-surface p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-folio-ink">
              <GitBranch
                className="h-4 w-4 text-folio-vermilion"
                aria-hidden="true"
              />
              <span>{t.pipelineTitle}</span>
            </div>
            <span className="font-mono text-xs text-folio-muted">
              {LIVE_SITE_STACK.projectName}@{LIVE_SITE_STACK.projectVersion}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {pipelineSteps.map((node, idx) => (
              <div key={node.step} className="relative flex items-stretch">
                <div className="flex w-full flex-col justify-between rounded border border-folio-border bg-folio-elevated p-4">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-folio-vermilion">
                      {node.step}
                    </span>
                    <h3 className="mt-1 font-serif text-lg font-bold text-folio-ink">
                      {node.title}
                    </h3>
                    <p className="mt-1 text-xs text-folio-muted">{node.sub}</p>
                  </div>
                  <div className="mt-3 border-t border-folio-border pt-2 font-mono text-[11px] text-folio-spruce">
                    {node.version}
                  </div>
                </div>
                {idx < pipelineSteps.length - 1 && (
                  <div
                    className="hidden items-center justify-center px-1 text-folio-vermilion md:flex"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live Package.json Dependency Ledger */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE_SITE_STACK.packages.map((pkg, idx) => (
            <motion.div
              key={pkg.pkgName}
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="flex flex-col justify-between rounded border border-folio-border bg-folio-elevated p-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2
                      className="h-3.5 w-3.5 text-folio-spruce"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-sm font-bold text-folio-ink">
                      {pkg.displayName}
                    </span>
                  </div>
                  <span className="rounded bg-folio-surface px-2 py-0.5 font-mono text-xs font-semibold text-folio-vermilion">
                    {pkg.version}
                  </span>
                </div>
                <div className="mt-1 font-mono text-[11px] text-folio-muted">
                  pkg: &quot;{pkg.pkgName}&quot; (
                  {pkg.isDevDependency ? 'devDependencies' : 'dependencies'})
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-folio-ink">
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
