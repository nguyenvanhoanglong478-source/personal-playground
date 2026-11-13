import React, { useState } from 'react';
import { BookOpen, Globe, Menu, Moon, Sun, X } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';
import { BrandLogo } from './BrandLogo';

export type AppTab = 'profile' | 'workspace';

interface NavbarProps {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeSection: string;
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onNavigateSection: (sectionId: string) => void;
}

const TAB_LABELS: Record<Locale, Record<AppTab, string>> = {
  vi: {
    profile: 'Hồ sơ',
    workspace: 'Không gian',
  },
  en: {
    profile: 'Profile',
    workspace: 'Workspace',
  },
};

export const Navbar: React.FC<NavbarProps> = ({
  locale,
  setLocale,
  theme,
  toggleTheme,
  activeSection,
  activeTab,
  onSelectTab,
  onNavigateSection,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = UI_LABELS[locale].nav;
  const tabLabels = TAB_LABELS[locale];

  const navItems = [
    { id: 'hero', label: t.hero },
    { id: 'about', label: t.about },
    { id: 'experience', label: t.experience },
    { id: 'projects', label: t.projects },
    { id: 'skills', label: t.skills },
    { id: 'stack', label: t.stack },
    { id: 'contact', label: t.contact },
  ];

  const handleSectionLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    setMobileOpen(false);
    onNavigateSection(sectionId);
  };

  const handleTabClick = (tab: AppTab) => {
    setMobileOpen(false);
    onSelectTab(tab);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-folio-border bg-folio-bg/85 backdrop-blur-xl transition-colors duration-300">
      <div className="folio-container flex items-center justify-between gap-2 py-2.5 sm:gap-3 sm:py-3">
        <a
          href="#hero"
          onClick={(event) => handleSectionLinkClick(event, 'hero')}
          className="group flex min-h-[44px] shrink-0 cursor-pointer items-center gap-2.5 text-folio-ink sm:gap-3"
          aria-label="Long Hoàng Logo"
        >
          <BrandLogo size={38} showAura className="shrink-0 text-folio-ink" />
          <div className="flex flex-col">
            <span className="whitespace-nowrap font-serif text-base font-semibold leading-none tracking-tight text-folio-ink sm:text-lg">
              {PROFILE_DATA.name}
            </span>
            <span className="hidden whitespace-nowrap font-mono text-[11px] text-folio-muted sm:block xl:hidden 2xl:block">
              {PROFILE_DATA.brandSubtitle[locale]}
            </span>
          </div>
        </a>

        <div
          role="tablist"
          aria-label={locale === 'vi' ? 'Chuyển chế độ xem' : 'Switch view'}
          className="hidden items-center rounded-full border border-folio-border bg-folio-elevated/90 p-0.5 md:inline-flex"
        >
          {(['profile', 'workspace'] as const).map((tab) => {
            const isTabActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isTabActive}
                onClick={() => handleTabClick(tab)}
                className={`relative min-h-[44px] whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-xs transition-all duration-200 lg:min-h-[36px] ${
                  isTabActive
                    ? 'bg-folio-surface font-semibold text-folio-ink shadow-soft'
                    : 'text-folio-muted hover:text-folio-ink'
                }`}
              >
                {tabLabels[tab]}
                {isTabActive && (
                  <span
                    className="google-border-frame absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        <nav
          className="hidden xl:flex xl:items-center xl:gap-0.5"
          aria-label={locale === 'vi' ? 'Điều hướng chính' : 'Primary Navigation'}
        >
          {navItems.map((item) => {
            const isActive = activeTab === 'profile' && activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => handleSectionLinkClick(event, item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative whitespace-nowrap rounded-[var(--radius-control)] px-1.5 py-2 font-mono text-[11px] transition-all duration-200 hover:-translate-y-0.5 2xl:px-2 ${
                  isActive
                    ? 'bg-folio-elevated font-semibold text-folio-ink'
                    : 'text-folio-muted hover:text-folio-ink'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="google-border-frame absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
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

      <div className="border-t border-folio-border/70 bg-folio-bg/75 py-1.5 md:hidden">
        <div className="folio-container">
          <div
            role="tablist"
            aria-label={locale === 'vi' ? 'Chuyển chế độ xem' : 'Switch view'}
            className="grid grid-cols-2 gap-1 rounded-full border border-folio-border bg-folio-elevated/90 p-1"
          >
            {(['profile', 'workspace'] as const).map((tab) => {
              const isTabActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isTabActive}
                  onClick={() => handleTabClick(tab)}
                  className={`relative flex min-h-[44px] items-center justify-center rounded-full px-3 py-2 font-mono text-xs transition-all duration-200 ${
                    isTabActive
                      ? 'bg-folio-surface font-semibold text-folio-ink shadow-soft'
                      : 'text-folio-muted hover:text-folio-ink'
                  }`}
                >
                  {tabLabels[tab]}
                  {isTabActive && (
                    <span
                      className="google-border-frame absolute bottom-1 left-6 right-6 h-0.5 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-folio-border bg-folio-bg px-4 py-4 xl:hidden"
          aria-label="Mobile Navigation"
        >
          <div className="folio-container flex flex-col gap-2 !px-0">
            {navItems.map((item) => {
              const isActive = activeTab === 'profile' && activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => handleSectionLinkClick(event, item.id)}
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
