import React, { Suspense, lazy } from 'react';
import { Compass, Sparkles, UserCheck } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';

const LazyPokemonPackUnboxer = lazy(() =>
  import('./PokemonPackUnboxer').then((module) => ({
    default: module.PokemonPackUnboxer,
  }))
);

interface AboutProps {
  locale: Locale;
}

const PokemonPackUnboxerFallback: React.FC = () => (
  <div
    aria-hidden="true"
    className="mx-auto flex w-full max-w-[336px] flex-col items-center gap-3 lg:mx-0"
  >
    <div className="h-9 w-full rounded-full bg-folio-elevated" />
    <div className="aspect-[82/112] w-[310px] rounded-2xl bg-folio-elevated/40 sm:w-[328px]" />
    <div className="h-10 w-full rounded-full bg-folio-elevated" />
  </div>
);

export const About: React.FC<AboutProps> = ({ locale }) => {
  const t = UI_LABELS[locale].about;
  const paragraphs = PROFILE_DATA.aboutParagraphs[locale];

  return (
    <section
      id="about"
      className="folio-section overflow-x-clip"
      aria-labelledby="about-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-[11.5px] font-semibold text-folio-muted">
              <Sparkles className="h-3.5 w-3.5 text-folio-ink" aria-hidden="true" />
              <span className="folio-index-label">{t.sectionIndex}</span>
            </div>
            <h2 id="about-heading" className="folio-section-heading">
              {t.heading}
            </h2>
          </div>
          <div className="font-mono text-[11.5px] text-folio-muted lg:col-span-5 lg:text-right">
            {PROFILE_DATA.name} · {PROFILE_DATA.birthYear} · {PROFILE_DATA.role[locale]}
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 overflow-visible lg:grid-cols-12 lg:gap-8">
          <div className="relative z-20 overflow-visible lg:col-span-4">
            <Suspense fallback={<PokemonPackUnboxerFallback />}>
              <LazyPokemonPackUnboxer locale={locale} />
            </Suspense>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-8 lg:border-l lg:border-folio-border lg:pl-8">
            <div className="folio-card google-gradient-hover-border space-y-3">
              <div className="flex flex-wrap items-center gap-2.5 border-b border-folio-border pb-3 font-mono text-[11.5px] text-folio-muted">
                <UserCheck className="h-3.5 w-3.5 text-folio-ink" aria-hidden="true" />
                <span className="font-semibold text-folio-ink">
                  {PROFILE_DATA.name}
                </span>
                <span>·</span>
                <span>{PROFILE_DATA.birthYear}</span>
                <span>·</span>
                <span className="font-semibold text-folio-ink">
                  {PROFILE_DATA.role[locale]}
                </span>
              </div>

              {paragraphs.map((paragraph, idx) =>
                idx === 0 ? (
                  <p
                    key={idx}
                    className="font-serif text-lg leading-relaxed text-folio-ink sm:text-[1.15rem]"
                  >
                    {paragraph}
                  </p>
                ) : (
                  <p
                    key={idx}
                    className={`text-sm leading-relaxed ${
                      idx === paragraphs.length - 1
                        ? 'border-t border-folio-border pt-3 font-medium text-folio-ink'
                        : 'text-folio-muted'
                    }`}
                  >
                    {paragraph}
                  </p>
                )
              )}
            </div>

            <div className="folio-card google-gradient-hover-border">
              <div className="mb-3 flex items-center gap-2 font-mono text-[11.5px] font-semibold text-folio-ink">
                <Compass className="h-3.5 w-3.5 text-folio-ink" aria-hidden="true" />
                <span>{t.methodTitle}</span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PROFILE_DATA.methodology.map((item) => (
                  <div
                    key={item.index}
                    className="folio-card-inner flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-folio-border pb-1.5">
                      <span className="font-mono text-[10.5px] font-bold text-folio-faint">
                        {item.index}
                      </span>
                    </div>
                    <h3 className="font-serif text-[0.95rem] font-bold leading-snug text-folio-ink sm:text-base">
                      {item.title[locale]}
                    </h3>
                    <p className="text-xs leading-relaxed text-folio-muted sm:text-[13px]">
                      {item.description[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
