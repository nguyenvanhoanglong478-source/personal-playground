import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Locale, UI_LABELS } from '../data/profile';

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = UI_LABELS[locale].footer;

  return (
    <footer className="bg-folio-surface py-10 text-folio-muted">
      <div className="folio-container flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="font-serif text-base font-semibold text-folio-ink">
          {t.colophon}
        </div>

        <a href="#hero" className="folio-btn-compact">
          <span>{t.backToTop}</span>
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
};
