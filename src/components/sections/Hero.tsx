import React from 'react';
import { ArrowDownRight, BookMarked, Mail, Sparkles } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../../data/profile';
import { PokemonProfileCard } from '../pokemon/PokemonProfileCard';

interface HeroProps {
  locale: Locale;
}

export const Hero: React.FC<HeroProps> = ({ locale }) => {
  const t = UI_LABELS[locale].hero;

  return (
    <section
      id="hero"
      className="folio-section relative overflow-x-clip !pt-6 lg:!pt-8"
      aria-labelledby="hero-display-heading"
    >
      <div className="folio-container relative z-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2.5 border-b border-folio-border pb-3 lg:mb-8">
          <div className="flex items-center gap-2 font-mono text-[11.5px] font-semibold text-folio-muted">
            <BookMarked className="h-3.5 w-3.5 text-folio-ink" aria-hidden="true" />
            <span>{t.folioTag}</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-folio-border bg-folio-surface px-2.5 py-1 font-mono text-[11px] font-semibold text-folio-ink">
            <span className="inline-flex h-2 w-2 rounded-full bg-folio-ggreen" aria-hidden="true" />
            <span>{t.statusAvailable}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1
              id="hero-display-heading"
              className="font-serif text-[2.5rem] font-bold leading-[1.02] tracking-[-0.03em] text-folio-ink sm:text-5xl lg:text-[4.1rem]"
            >
              {PROFILE_DATA.name}.
            </h1>

            <div className="mt-4 border-l border-folio-border pl-4 sm:pl-6 lg:ml-6">
              <p className="font-serif text-xl font-normal italic leading-[1.3] text-folio-ink sm:text-2xl lg:text-[1.85rem]">
                {PROFILE_DATA.slogan[locale]}
              </p>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-folio-muted sm:text-[0.95rem]">
                {PROFILE_DATA.heroIntro[locale]}
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 border-y border-folio-border py-3 sm:grid-cols-2 sm:gap-0">
                <div className="sm:pr-5">
                  <div className="font-mono text-[10.5px] uppercase tracking-wider text-folio-faint">
                    {t.roleLabel}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 font-mono text-xs font-semibold text-folio-ink sm:text-[13px]">
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-folio-ink" aria-hidden="true" />
                    <span>{PROFILE_DATA.role[locale]}</span>
                  </div>
                </div>
                <div className="border-t border-folio-border pt-2.5 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                  <div className="font-mono text-[10.5px] uppercase tracking-wider text-folio-faint">
                    {t.birthLabel}
                  </div>
                  <div className="mt-1 font-mono text-xs font-semibold text-folio-ink sm:text-[13px]">
                    {PROFILE_DATA.birthYear}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#projects" className="folio-btn-primary">
                  <span>{t.ctaProjects}</span>
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a href="#contact" className="folio-btn-secondary">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{t.ctaContact}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center lg:col-span-5 lg:items-end">
            <div className="flex w-full max-w-[350px] justify-center lg:justify-end">
              <PokemonProfileCard locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
