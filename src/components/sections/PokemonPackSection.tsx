import React, { Suspense, lazy } from 'react';
import { PackageOpen } from 'lucide-react';
import { Locale, UI_LABELS } from '../../data/profile';

const LazyPokemonPackUnboxer = lazy(() =>
  import('../pokemon/PokemonPackUnboxer').then((module) => ({
    default: module.PokemonPackUnboxer,
  }))
);

interface PokemonPackSectionProps {
  locale: Locale;
}

const PokemonPackUnboxerFallback: React.FC = () => (
  <div
    aria-hidden="true"
    className="mx-auto flex w-full max-w-[420px] flex-col items-center gap-3.5"
  >
    <div className="h-9 w-full rounded-full bg-folio-elevated" />
    <div className="aspect-[82/112] w-[310px] rounded-2xl bg-folio-elevated/40 sm:w-[328px]" />
    <div className="h-10 w-full max-w-[400px] rounded-full bg-folio-elevated" />
  </div>
);

export const PokemonPackSection: React.FC<PokemonPackSectionProps> = ({
  locale,
}) => {
  const t = UI_LABELS[locale].packs;

  return (
    <section
      id="packs"
      className="folio-section scroll-mt-14 overflow-x-clip"
      aria-labelledby="packs-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 font-mono text-[11.5px] font-semibold text-folio-muted">
              <PackageOpen
                className="h-3.5 w-3.5 text-folio-ink"
                aria-hidden="true"
              />
              <span className="folio-index-label">{t.sectionIndex}</span>
            </div>
            <h2 id="packs-heading" className="folio-section-heading">
              {t.heading}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-folio-muted lg:col-span-6 lg:text-right">
            {t.subheading}
          </p>
        </div>

        <div className="relative z-20 mx-auto flex w-full justify-center overflow-visible py-1 sm:py-2">
          <Suspense fallback={<PokemonPackUnboxerFallback />}>
            <LazyPokemonPackUnboxer locale={locale} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};
