import React, { useEffect, useState } from 'react';
import { Locale } from './data/profile';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { ProjectsBento } from './components/ProjectsBento';
import { SkillsMatrix } from './components/SkillsMatrix';
import { BuiltWithDiagram } from './components/BuiltWithDiagram';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const THEME_STORAGE_KEY = 'longhoang_folio_theme_v1';
const LOCALE_STORAGE_KEY = 'longhoang_folio_locale_v1';

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

  const [activeSection, setActiveSection] = useState<string>('hero');

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

  useEffect(() => {
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
  }, []);

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
      />

      <main id="main-content" className="relative z-10">
        <Hero locale={locale} />
        <About locale={locale} theme={theme} />
        <Experience locale={locale} />
        <ProjectsBento locale={locale} />
        <SkillsMatrix locale={locale} />
        <BuiltWithDiagram locale={locale} />
        <Contact locale={locale} />
      </main>

      <Footer locale={locale} />
    </div>
  );
}

export default App;
