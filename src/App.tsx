import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { Locale } from './data/profile';
import { AppTab, Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { ProjectsBento } from './components/ProjectsBento';
import { SkillsMatrix } from './components/SkillsMatrix';
import { BuiltWithDiagram } from './components/BuiltWithDiagram';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const LazyWorkspacePage = lazy(() => import('./components/WorkspacePage'));

const THEME_STORAGE_KEY = 'longhoang_folio_theme_v1';
const LOCALE_STORAGE_KEY = 'longhoang_folio_locale_v1';

function readInitialTab(): AppTab {
  if (typeof window === 'undefined') return 'profile';
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') === 'workspace' ? 'workspace' : 'profile';
  } catch {
    return 'profile';
  }
}

function syncTabQueryUrl(tab: AppTab, clearHash: boolean) {
  if (typeof window === 'undefined') return;
  try {
    const url = new URL(window.location.href);
    if (tab === 'workspace') {
      url.searchParams.set('tab', 'workspace');
    } else {
      url.searchParams.delete('tab');
    }
    const query = url.searchParams.toString();
    const hash = clearHash ? '' : url.hash;
    window.history.replaceState(
      null,
      '',
      `${url.pathname}${query ? `?${query}` : ''}${hash}`
    );
  } catch {
    return;
  }
}

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      return 'dark';
    }
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      return 'light';
    }
    return 'dark';
  });

  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (saved === 'vi' || saved === 'en') return saved;
    } catch {
      return 'vi';
    }
    return 'vi';
  });

  const [activeTab, setActiveTab] = useState<AppTab>(readInitialTab);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const pendingSectionRef = useRef<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#131314' : '#F8F9FA'
      );
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      return;
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      return;
    }
  }, [locale]);

  const scrollToSectionElement = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });
    setActiveSection(sectionId);
  }, []);

  useEffect(() => {
    if (activeTab !== 'profile') return;

    if (pendingSectionRef.current) {
      const pendingId = pendingSectionRef.current;
      pendingSectionRef.current = null;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          scrollToSectionElement(pendingId);
        });
      });
    }

    const sectionIds = [
      'hero',
      'about',
      'experience',
      'projects',
      'skills',
      'stack',
      'contact',
    ];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const ratioMap = new Map<string, number>();
    sectionIds.forEach((id) => ratioMap.set(id, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratioMap.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        }

        let bestId = '';
        let bestRatio = 0;
        for (const id of sectionIds) {
          const ratio = ratioMap.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId && bestRatio > 0) {
          setActiveSection((prev) => (prev === bestId ? prev : bestId));
        }
      },
      {
        rootMargin: '-18% 0px -42% 0px',
        threshold: [0, 0.08, 0.18, 0.35, 0.55, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab, scrollToSectionElement]);

  const handleSelectTab = useCallback((nextTab: AppTab) => {
    pendingSectionRef.current = null;
    setActiveTab(nextTab);
    syncTabQueryUrl(nextTab, true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleNavigateSection = useCallback(
    (sectionId: string) => {
      if (activeTab === 'profile') {
        syncTabQueryUrl('profile', true);
        scrollToSectionElement(sectionId);
        return;
      }
      pendingSectionRef.current = sectionId;
      setActiveTab('profile');
      syncTabQueryUrl('profile', true);
    },
    [activeTab, scrollToSectionElement]
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="relative min-h-screen bg-folio-bg text-folio-ink selection:bg-folio-gblue selection:text-white">
      <div className="google-aura-backdrop" aria-hidden="true" />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-folio-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:text-[var(--accent-primary-contrast)]"
      >
        {locale === 'vi' ? 'Chuyển đến nội dung chính' : 'Skip to main content'}
      </a>

      <Navbar
        locale={locale}
        setLocale={setLocale}
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onNavigateSection={handleNavigateSection}
      />

      <main id="main-content" className="relative z-10">
        {activeTab === 'profile' ? (
          <>
            <Hero locale={locale} />
            <About locale={locale} theme={theme} />
            <Experience locale={locale} />
            <ProjectsBento locale={locale} />
            <SkillsMatrix locale={locale} />
            <BuiltWithDiagram locale={locale} />
            <Contact locale={locale} />
          </>
        ) : (
          <Suspense
            fallback={
              <section className="folio-section !pt-10 lg:!pt-14 !pb-28 sm:!pb-28">
                <div className="folio-container">
                  <div className="folio-card flex min-h-[420px] items-center justify-center font-mono text-sm text-folio-muted">
                    {locale === 'vi'
                      ? 'Đang mở không gian làm việc...'
                      : 'Loading workspace...'}
                  </div>
                </div>
              </section>
            }
          >
            <LazyWorkspacePage locale={locale} theme={theme} />
          </Suspense>
        )}
      </main>

      <Footer locale={locale} theme={theme} />
    </div>
  );
}

export default App;
