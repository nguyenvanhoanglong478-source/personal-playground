import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';
import { BrandLogo } from './BrandLogo';
import { FooterPet } from './FooterPet';
import { SocialIcon } from './SocialIcon';

interface FooterProps {
  locale: Locale;
  theme: 'light' | 'dark';
}

export const Footer: React.FC<FooterProps> = ({ locale, theme }) => {
  const t = UI_LABELS[locale].footer;
  const footerRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsInView(entry.isIntersecting);
        }
      },
      { rootMargin: '120px 0px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-20 border-t border-folio-border bg-folio-surface/80 py-10 text-folio-muted backdrop-blur-md transition-colors duration-300"
    >
      <FooterPet locale={locale} theme={theme} active={isInView} />
      <div className="folio-container flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <a
          href="#hero"
          className="group inline-flex min-h-[44px] cursor-pointer items-center gap-3 text-folio-ink"
          aria-label="Long Hoàng Logo"
        >
          <BrandLogo size={34} showAura className="text-folio-ink" />
          <div className="font-serif text-base font-semibold text-folio-ink">
            {t.colophon}
          </div>
        </a>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={`mailto:${PROFILE_DATA.contacts.email}`}
            aria-label="Email"
            className="folio-btn-icon"
          >
            <span className="google-pill-aura" aria-hidden="true" />
            <Mail className="h-4 w-4 text-folio-ink" aria-hidden="true" />
          </a>

          {PROFILE_DATA.contacts.socials.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="folio-btn-icon"
            >
              <span className="google-pill-aura" aria-hidden="true" />
              <SocialIcon platform={social.id} className="h-4 w-4 text-folio-ink" />
            </a>
          ))}

          <a href="#hero" className="folio-btn-compact">
            <span className="google-pill-aura" aria-hidden="true" />
            <span>{t.backToTop}</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};
