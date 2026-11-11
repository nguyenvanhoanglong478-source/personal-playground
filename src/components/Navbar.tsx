import React, { useState } from 'react';
import { BookOpen, Globe, Menu, Moon, Sun, X } from 'lucide-react';
import { Locale, UI_LABELS } from '../data/profile';

interface NavbarProps {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  locale,
  setLocale,
  theme,
  toggleTheme,
  activeSection,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = UI_LABELS[locale].nav;

  const navItems = [
    { id: 'hero', label: t.hero },
    { id: 'about', label: t.about },
    { id: 'projects', label: t.projects },
    { id: 'skills', label: t.skills },
    { id: 'stack', label: t.stack },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-folio-border bg-folio-bg/95 backdrop-blur-md">
      <div className="folio-container flex items-center justify-between gap-3 py-3">
        {/* Brand Identity */}
        <a
          href="#hero"
          className="group flex shrink-0 items-center gap-3 text-folio-ink"
          aria-label="Marcus Home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-control)] border border-folio-vermilion bg-folio-surface font-serif text-lg font-bold text-folio-vermilion transition-transform duration-300 group-hover:scale-105">
            M
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-semibold leading-none tracking-tight">
              Marcus
            </span>
            <span className="font-mono text-[11px] text-folio-muted whitespace-nowrap">
              Marginalia &amp; Folio
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          className="hidden lg:flex lg:items-center lg:gap-1"
          aria-label={locale === 'vi' ? 'Điều hướng chính' : 'Primary Navigation'}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={`relative whitespace-nowrap rounded-[var(--radius-control)] px-3 py-2 font-mono text-xs transition-transform duration-200 hover:-translate-y-0.5 ${
                  isActive
                    ? 'bg-folio-surface font-semibold text-folio-vermilion'
                    : 'text-folio-muted hover:text-folio-ink'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-folio-vermilion"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Controls: Language + Theme + Mobile Menu Trigger */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setLocale(locale === 'vi' ? 'en' : 'vi')}
            className="folio-btn-compact"
            aria-label={
              locale === 'vi' ? 'Switch language to English' : 'Chuyển sang Tiếng Việt'
            }
          >
            <Globe className="h-3.5 w-3.5 text-folio-vermilion" aria-hidden="true" />
            <span>{locale === 'vi' ? 'VI / EN' : 'EN / VI'}</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="folio-btn-compact"
            aria-label={
              theme === 'dark'
                ? 'Chuyển sang giao diện sáng'
                : 'Chuyển sang giao diện tối'
            }
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-3.5 w-3.5 text-folio-vermilion" aria-hidden="true" />
                <span className="hidden sm:inline">{t.themeLight}</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-folio-vermilion" aria-hidden="true" />
                <span className="hidden sm:inline">{t.themeDark}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] border border-folio-strong bg-folio-elevated text-folio-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={locale === 'vi' ? 'Mở mục lục' : 'Toggle menu'}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileOpen && (
        <nav
          className="border-t border-folio-border bg-folio-bg px-4 py-4 lg:hidden"
          aria-label="Mobile Navigation"
        >
          <div className="folio-container flex flex-col gap-2 !px-0">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleNavClick}
                  className={`flex min-h-[44px] items-center justify-between rounded-[var(--radius-control)] border px-4 py-2 font-mono text-sm ${
                    isActive
                      ? 'border-folio-vermilion bg-folio-surface font-semibold text-folio-vermilion'
                      : 'border-folio-border bg-folio-elevated text-folio-ink'
                  }`}
                >
                  <span>{item.label}</span>
                  <BookOpen className="h-4 w-4 opacity-60" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};
