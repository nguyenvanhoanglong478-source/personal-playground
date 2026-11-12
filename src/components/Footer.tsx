import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Locale, UI_LABELS } from '../data/profile';
import { CapybaraLogo } from './CapybaraLogo';

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = UI_LABELS[locale].footer;

  return (
    <footer className="relative z-10 border-t border-folio-border bg-folio-surface/80 py-10 text-folio-muted backdrop-blur-md transition-colors duration-300">
      <div className="folio-container flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <a
          href="#hero"
          className="group inline-flex cursor-pointer items-center gap-3 text-folio-ink"
          aria-label="Long Hoàng"
        >
          <CapybaraLogo size={34} showAura className="text-folio-ink" />
          <div className="font-serif text-base font-semibold text-folio-ink">
            {t.colophon}
          </div>
        </a>

        <a href="#hero" className="folio-btn-compact">
          <span className="google-pill-aura" aria-hidden="true" />
          <span>{t.backToTop}</span>
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
};
