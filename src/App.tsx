import React, { useEffect, useState } from 'react';
import { Locale } from './data/profile';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectsBento } from './components/ProjectsBento';
import { SkillsMatrix } from './components/SkillsMatrix';
import { BuiltWithDiagram } from './components/BuiltWithDiagram';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

const THEME_STORAGE_KEY = 'marcus_folio_theme_v2';
const LOCALE_STORAGE_KEY = 'marcus_folio_locale_v2';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore storage errors
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
      // ignore storage errors
    }
    return 'vi';
  });

  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }, [locale]);

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'skills', 'stack', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-folio-bg text-folio-ink selection:bg-folio-vermilion selection:text-[var(--accent-primary-contrast)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-folio-vermilion focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:text-[var(--accent-primary-contrast)]"
      >
        {locale === 'vi' ? 'Chuyển đến nội dung chính' : 'Skip to main content'}
      </a>

      <CustomCursor />

      <Navbar
        locale={locale}
        setLocale={setLocale}
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      <main id="main-content">
        <Hero locale={locale} theme={theme} />
        <About locale={locale} />
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
