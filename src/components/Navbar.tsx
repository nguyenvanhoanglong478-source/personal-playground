import React, { useState } from 'react';
import { BookOpen, Globe, Menu, Moon, Sun, X } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';
import { CapybaraLogo } from './CapybaraLogo';

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
    { id: 'experience', label: t.experience },
    { id: 'projects', label: t.projects },
    { id: 'skills', label: t.skills },
    { id: 'stack', label: t.stack },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-folio-border bg-folio-bg/85 backdrop-blur-xl transition-colors duration-300">
      <div className="folio-container flex items-center justify-between gap-2 py-3 sm:gap-3">
        <a
          href="#hero"
          className="group flex min-h-[44px] min-w-0 cursor-pointer items-center gap-2.5 text-folio-ink sm:gap-3"
          aria-label="Long Hoàng"
        >
          <CapybaraLogo size={38} showAura className="text-folio-ink" />
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-serif text-base font-semibold leading-none tracking-tight text-folio-ink sm:text-lg">
              {PROFILE_DATA.name}
            </span>
            <span className="hidden truncate font-mono text-[11px] text-folio-muted sm:block">
              {PROFILE_DATA.brandSubtitle[locale]}
            </span>
          </div>
        </a>

        <nav
          className="hidden xl:flex xl:items-center xl:gap-1"
          aria-label={locale === 'vi' ? 'Điều hướng chính' : 'Primary Navigation'}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={`relative whitespace-nowrap rounded-[var(--radius-control)] px-2.5 py-2 font-mono text-xs transition-all duration-200 hover:-translate-y-0.5 ${
                  isActive
                    ? 'bg-folio-elevated font-semibold text-folio-ink'
                    : 'text-folio-muted hover:text-folio-ink'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="google-border-frame absolute bottom-0 left-2.5 right-2.5 h-0.5 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => setLocale(locale === 'vi' ? 'en' : 'vi')}
            className="folio-btn-compact !px-3 sm:!px-3.5"
            aria-label={
              locale === 'vi' ? 'Switch language to English' : 'Chuyển sang Tiếng Việt'
            }
          >
            <span className="google-pill-aura" aria-hidden="true" />
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sm:hidden">{locale === 'vi' ? 'VI' : 'EN'}</span>
            <span className="hidden sm:inline">
              {locale === 'vi' ? 'VI / EN' : 'EN / VI'}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="folio-btn-compact !px-3 sm:!px-3.5"
            aria-label={
              theme === 'dark'
                ? 'Chuyển sang giao diện sáng'
                : 'Chuyển sang giao diện tối'
            }
          >
            <span className="google-pill-aura" aria-hidden="true" />
            {theme === 'dark' ? (
              <>
                <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{t.themeLight}</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{t.themeDark}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="folio-btn-icon xl:hidden"
            aria-expanded={mobileOpen}
            aria-label={locale === 'vi' ? 'Mở mục lục' : 'Toggle menu'}
          >
            <span className="google-pill-aura" aria-hidden="true" />
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-folio-border bg-folio-bg px-4 py-4 xl:hidden"
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
                  className={`flex min-h-[44px] items-center justify-between rounded-[var(--radius-control)] border px-4 py-2 font-mono text-sm transition-transform duration-150 active:scale-[0.985] ${
                    isActive
                      ? 'border-folio-strong bg-folio-surface font-semibold text-folio-ink'
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
