import React, { useEffect, useRef, useState } from 'react';
import { Globe, Menu, Moon, Sun, X } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../../data/profile';
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
  const headerRef = useRef<HTMLElement | null>(null);
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

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    const handlePointerDownOutside = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (headerRef.current && target && !headerRef.current.contains(target)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDownOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDownOutside);
    };
  }, [mobileOpen]);

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

  const themeToggleLabel =
    theme === 'dark'
      ? locale === 'vi'
        ? 'Chuyển sang giao diện sáng'
        : 'Switch to light mode'
      : locale === 'vi'
        ? 'Chuyển sang giao diện tối'
        : 'Switch to dark mode';

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-folio-border bg-[var(--bg-glass)] backdrop-blur-sm transition-colors duration-200"
    >
      <div className="folio-container flex h-12 items-center justify-between gap-1.5 sm:h-[52px] sm:gap-2.5">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2.5">
          <a
            href="#hero"
            onClick={(event) => handleSectionLinkClick(event, 'hero')}
            className="group flex h-9 shrink-0 cursor-pointer items-center gap-2 text-folio-ink"
            aria-label="Long Hoàng Logo"
          >
            <BrandLogo size={26} showAura={false} className="shrink-0 text-folio-ink" />
            <span className="hidden whitespace-nowrap font-serif text-[0.95rem] font-semibold leading-none tracking-tight text-folio-ink sm:inline">
              {PROFILE_DATA.name}
            </span>
          </a>

          <span className="hidden h-3.5 w-px shrink-0 bg-folio-border sm:block" aria-hidden="true" />

          <div
            role="tablist"
            aria-label={locale === 'vi' ? 'Chuyển chế độ xem' : 'Switch view'}
            className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-folio-border bg-folio-elevated p-0.5"
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
                  className={`min-h-[32px] whitespace-nowrap rounded-full px-2 font-mono text-[11px] transition-colors duration-150 sm:min-h-[30px] sm:px-3 sm:text-xs ${
                    isTabActive
                      ? 'border border-folio-border bg-folio-surface font-semibold text-folio-ink shadow-sm'
                      : 'border border-transparent text-folio-muted hover:text-folio-ink'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === 'profile' && (
          <nav
            className="hidden lg:flex lg:items-center lg:gap-0.5"
            aria-label={locale === 'vi' ? 'Điều hướng chính' : 'Primary Navigation'}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => handleSectionLinkClick(event, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[11.5px] transition-colors duration-150 ${
                    isActive
                      ? 'bg-folio-elevated font-semibold text-folio-ink ring-1 ring-folio-border'
                      : 'text-folio-muted hover:bg-folio-elevated/60 hover:text-folio-ink'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        )}

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={() => setLocale(locale === 'vi' ? 'en' : 'vi')}
            className="folio-btn-compact !min-h-[34px] !px-2 sm:!min-h-[32px] sm:!px-2.5"
            aria-label={
              locale === 'vi' ? 'Switch language to English' : 'Chuyển sang Tiếng Việt'
            }
          >
            <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="sm:hidden">{locale === 'vi' ? 'VI' : 'EN'}</span>
            <span className="hidden sm:inline">
              {locale === 'vi' ? 'VI / EN' : 'EN / VI'}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="folio-btn-icon !h-[34px] !w-[34px] sm:!h-[32px] sm:!w-[32px]"
            aria-label={themeToggleLabel}
            title={themeToggleLabel}
          >
            {theme === 'dark' ? (
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Moon className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>

          {activeTab === 'profile' && (
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="folio-btn-icon !h-[34px] !w-[34px] lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={locale === 'vi' ? 'Mở mục lục' : 'Toggle menu'}
            >
              {mobileOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>

      {activeTab === 'profile' && mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          className="border-t border-folio-border bg-folio-bg px-4 py-2.5 lg:hidden"
          aria-label="Mobile Navigation"
        >
          <div className="folio-container grid grid-cols-2 gap-1.5 !px-0">
            {navItems.map((item) => {
              const isActive = activeTab === 'profile' && activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => handleSectionLinkClick(event, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[40px] items-center justify-between rounded-[var(--radius-control)] border px-3 py-1.5 font-mono text-xs transition-colors duration-150 ${
                    isActive
                      ? 'border-folio-strong bg-folio-surface font-semibold text-folio-ink'
                      : 'border-folio-border bg-folio-elevated text-folio-ink hover:border-folio-strong'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};
