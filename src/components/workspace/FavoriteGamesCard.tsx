import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { Locale } from '../../data/profile';
import { FAVORITE_GAMES, WORKSPACE_UI_LABELS } from '../../data/workspace';

export interface FavoriteGamesCardProps {
  locale: Locale;
}

export const FavoriteGamesCard: React.FC<FavoriteGamesCardProps> = ({
  locale,
}) => {
  const t = WORKSPACE_UI_LABELS[locale];

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
        {FAVORITE_GAMES.map((game) => (
          <li
            key={game.id}
            className="flex items-center justify-between gap-2 rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated/60 px-2.5 py-1.5 transition-colors duration-150 hover:border-folio-strong"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className="w-9 shrink-0 rounded-[5px] border border-folio-border bg-folio-surface py-0.5 text-center font-mono text-[10px] font-semibold tracking-tight text-folio-muted">
                {game.code}
              </span>
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
        ))}
      </ul>
    </div>
  );
};
