import React from 'react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = UI_LABELS[locale].footer;

  return (
    <footer className="bg-folio-surface py-10 text-folio-muted">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="space-y-1">
          <div className="font-serif text-lg font-bold text-folio-ink">
            {PROFILE_DATA.name} — {t.colophon}
          </div>
          <div className="font-mono text-xs text-folio-muted">{t.backupNote}</div>
        </div>

        <a
          href="#hero"
          className="inline-flex min-h-[40px] items-center rounded border border-folio-strong bg-folio-elevated px-4 py-2 font-mono text-xs font-semibold text-folio-ink transition-transform duration-300 hover:-translate-y-0.5 hover:border-folio-vermilion"
        >
          {t.backToTop}
        </a>
      </div>
    </footer>
  );
};
