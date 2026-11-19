import React, { useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import { Locale } from '../../data/profile';
import {
  FAVORITE_GAMES,
  FavoriteGameItem,
  WORKSPACE_UI_LABELS,
} from '../../data/workspace';

export interface FavoriteGamesCardProps {
  locale: Locale;
}

const LOGO_CONTAINER_CLASS: Record<FavoriteGameItem['logoSurface'], string> = {
  cover:
    'h-7 w-7 shrink-0 overflow-hidden rounded-[6px] border border-folio-border',
  dark:
    'flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-folio-border bg-[#16171C] p-0.5',
  neutral:
    'flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-folio-border bg-folio-surface p-0.5',
};

export const FavoriteGamesCard: React.FC<FavoriteGamesCardProps> = ({
  locale,
}) => {
  const t = WORKSPACE_UI_LABELS[locale];
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});

  const markLogoFailed = (id: string) => {
    setFailedLogos((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  return (
    <div className="folio-card flex flex-col gap-3 !p-4 sm:!p-5">
      <div className="flex items-center justify-between gap-2 border-b border-folio-border pb-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <Gamepad2
            className="h-3.5 w-3.5 shrink-0 text-folio-ink"
            aria-hidden="true"
          />
          <h2 className="truncate font-mono text-[11.5px] font-semibold text-folio-ink">
            {t.gamesHeader}
          </h2>
        </div>

        <span className="inline-flex shrink-0 items-center rounded-full border border-folio-border bg-folio-elevated px-2 py-0.5 font-mono text-[10.5px] font-semibold tabular-nums text-folio-muted">
          {FAVORITE_GAMES.length}
        </span>
      </div>

      <ul aria-label={t.gamesListAriaLabel} className="flex flex-col gap-1.5">
        {FAVORITE_GAMES.map((game) => {
          const isFailed = Boolean(failedLogos[game.id]);
          const isCover = game.logoSurface === 'cover';

          return (
            <li
              key={game.id}
              className="flex items-center justify-between gap-2 rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated/60 px-2.5 py-1.5 transition-colors duration-150 hover:border-folio-strong"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                {isFailed ? (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] border border-folio-border bg-folio-surface font-mono text-[9.5px] font-semibold tracking-tight text-folio-muted">
                    {game.code}
                  </span>
                ) : (
                  <span className={LOGO_CONTAINER_CLASS[game.logoSurface]}>
                    <img
                      src={game.logoUrl}
                      alt=""
                      width={28}
                      height={28}
                      loading="lazy"
                      decoding="async"
                      onError={() => markLogoFailed(game.id)}
                      className={
                        isCover
                          ? 'h-full w-full object-cover'
                          : 'h-full w-full object-contain'
                      }
                    />
                  </span>
                )}

                <span
                  title={game.name[locale]}
                  className="truncate font-sans text-xs font-medium text-folio-ink sm:text-[12.5px]"
                >
                  {game.name[locale]}
                </span>
              </div>

              <span className="shrink-0 font-mono text-[10px] text-folio-faint">
                {game.genre}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
