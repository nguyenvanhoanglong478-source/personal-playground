import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../../data/profile';
import { BrandLogo } from './BrandLogo';
import { FooterPet } from './FooterPet';
import { SocialIcon } from './SocialIcon';
import { openContactMailto } from '../../utils/contactProtection';

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
      className="relative z-20 border-t border-folio-border bg-folio-surface py-7 text-folio-muted transition-colors duration-200"
    >
      <FooterPet locale={locale} theme={theme} active={isInView} />
      <div className="folio-container flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <a
          href="#hero"
          className="group inline-flex min-h-[40px] cursor-pointer items-center gap-2.5 text-folio-ink"
          aria-label="Long Hoàng Logo"
        >
          <BrandLogo size={30} showAura={false} className="text-folio-ink" />
          <div className="font-serif text-sm font-semibold text-folio-ink sm:text-[0.95rem]">
            {t.colophon}
          </div>
        </a>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => openContactMailto()}
            aria-label="Email"
            className="folio-btn-icon"
          >
            <Mail className="h-3.5 w-3.5 text-folio-ink" aria-hidden="true" />
          </button>

          {PROFILE_DATA.contacts.socials.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="folio-btn-icon"
            >
              <SocialIcon platform={social.id} className="h-3.5 w-3.5 text-folio-ink" />
            </a>
          ))}

          <a href="#hero" className="folio-btn-compact">
            <span>{t.backToTop}</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};
