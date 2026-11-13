import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  Clock,
  Disc3,
  ExternalLink,
  LampDesk,
  Monitor,
  Music2,
  Play,
  Sparkles,
  Square,
  Volume2,
} from 'lucide-react';
import { Locale } from '../data/profile';
import {
  RoomHotspotId,
  RoomTimeState,
  TIME_STATE_META,
  WORKSPACE_UI_LABELS,
  getHotspotDialogue,
  getVietnamClockInfo,
} from '../data/workspace';
import { useSpotifyStatus } from '../hooks/useSpotifyStatus';
import { WorkspaceRoom } from './workspace/WorkspaceRoom';

export interface WorkspacePageProps {
  locale: Locale;
  theme: 'light' | 'dark';
}

type TimeOverrideMode = RoomTimeState | 'auto';

const TIME_STATE_ORDER: RoomTimeState[] = [
  'waking',
  'working',
  'late_night',
  'sleeping',
];

const HOTSPOT_ORDER: RoomHotspotId[] = [
  'monitor',
  'speakers',
  'lamp',
  'window',
  'bed',
  'capybara',
  'shelf',
];

export const WorkspacePage: React.FC<WorkspacePageProps> = ({ locale }) => {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const t = WORKSPACE_UI_LABELS[locale];

  const [vnClock, setVnClock] = useState(() => getVietnamClockInfo());
  const [timeOverride, setTimeOverride] = useState<TimeOverrideMode>('auto');
  const activeTimeState: RoomTimeState =
    timeOverride === 'auto' ? vnClock.timeState : timeOverride;

  const [lampOn, setLampOn] = useState<boolean>(
    () => activeTimeState === 'late_night'
  );
  const [selectedHotspot, setSelectedHotspot] = useState<RoomHotspotId | null>(
    null
  );
  const [artLoadFailed, setArtLoadFailed] = useState(false);

  const prevTimeStateRef = useRef<RoomTimeState>(activeTimeState);
  const typingTimerRef = useRef<number | null>(null);

  const {
    track,
    progressRatio,
    elapsedLabel,
    durationLabel,
    isConfigured,
    isDemoActive,
    toggleDemo,
  } = useSpotifyStatus(true);

  const isMusicActive = Boolean(track && track.isPlaying);

  useEffect(() => {
    const refreshClock = () => {
      if (document.visibilityState !== 'visible') return;
      setVnClock(getVietnamClockInfo());
    };

    const intervalId = window.setInterval(refreshClock, 15000);
    document.addEventListener('visibilitychange', refreshClock);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', refreshClock);
    };
  }, []);

  useEffect(() => {
    if (prevTimeStateRef.current !== activeTimeState) {
      prevTimeStateRef.current = activeTimeState;
      setLampOn(activeTimeState === 'late_night');
    }
  }, [activeTimeState]);

  useEffect(() => {
    setArtLoadFailed(false);
  }, [track?.albumArtUrl]);

  const fullDialogue = useMemo(() => {
    if (selectedHotspot) {
      return getHotspotDialogue(selectedHotspot, activeTimeState, locale, {
        lampOn,
        spotifyTrack: track,
      });
    }
    return TIME_STATE_META[activeTimeState].hint[locale];
  }, [selectedHotspot, activeTimeState, locale, lampOn, track]);

  const [typedCount, setTypedCount] = useState<number>(() =>
    shouldReduceMotion ? fullDialogue.length : 0
  );

  useEffect(() => {
    if (typingTimerRef.current !== null) {
      window.clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    if (shouldReduceMotion) {
      setTypedCount(fullDialogue.length);
      return;
    }

    setTypedCount(0);
    const stepSize = fullDialogue.length > 100 ? 2 : 1;

    typingTimerRef.current = window.setInterval(() => {
      setTypedCount((prev) => {
        const next = Math.min(fullDialogue.length, prev + stepSize);
        if (next >= fullDialogue.length && typingTimerRef.current !== null) {
          window.clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
        }
        return next;
      });
    }, 18);

    return () => {
      if (typingTimerRef.current !== null) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [fullDialogue, shouldReduceMotion]);

  const handleSelectTimeMode = (mode: TimeOverrideMode) => {
    setTimeOverride(mode);
    setSelectedHotspot(null);
  };

  const handleSelectHotspot = (id: RoomHotspotId) => {
    if (id === 'lamp') {
      setLampOn((prev) => !prev);
    }
    setSelectedHotspot(id);
  };

  const handleToggleLamp = () => {
    setLampOn((prev) => !prev);
  };

  const handleSkipDialogue = () => {
    if (typedCount >= fullDialogue.length) return;
    if (typingTimerRef.current !== null) {
      window.clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setTypedCount(fullDialogue.length);
  };

  const activeSpeakerLabel = selectedHotspot
    ? t.hotspotNames[selectedHotspot]
    : TIME_STATE_META[activeTimeState].label[locale];

  const isTypingDone = typedCount >= fullDialogue.length;
  const progressPercent = Math.round(Math.min(1, Math.max(0, progressRatio)) * 100);

  return (
    <section
      id="workspace"
      className="folio-section overflow-x-clip !pb-28 !pt-8 sm:!pb-28 lg:!pt-7"
      aria-labelledby="workspace-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header !mb-4 grid grid-cols-1 gap-4 !pb-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-folio-muted">
              <Sparkles className="h-3.5 w-3.5 text-folio-ink" aria-hidden="true" />
              <span className="folio-index-label">{t.sectionTag}</span>
            </div>
            <h1 id="workspace-heading" className="folio-section-heading">
              {t.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-folio-muted sm:text-base">
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:col-span-5 lg:justify-end">
            <div className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-folio-border bg-folio-surface px-4 py-2 font-mono text-xs font-semibold text-folio-ink shadow-soft">
              <Clock className="h-3.5 w-3.5 text-folio-ink" aria-hidden="true" />
              <span className="tabular-nums">{vnClock.formattedTime}</span>
              <span className="text-folio-faint">·</span>
              <span className="text-folio-muted">{t.gmtSuffix}</span>
            </div>

            <button
              type="button"
              onClick={handleToggleLamp}
              aria-pressed={lampOn}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs font-semibold transition-all duration-200 ${
                lampOn
                  ? 'border-folio-strong bg-folio-surface text-folio-ink shadow-soft'
                  : 'border-folio-border bg-folio-elevated text-folio-muted hover:text-folio-ink'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  lampOn ? 'bg-folio-gyellow' : 'bg-folio-faint/40'
                }`}
                aria-hidden="true"
              />
              <LampDesk className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.lampToggleBtn}</span>
              <span className="text-folio-muted">
                {lampOn ? t.lampOnLabel : t.lampOffLabel}
              </span>
            </button>
          </div>
        </div>

        <div
          role="group"
          aria-label={locale === 'vi' ? 'Chọn khung giờ căn phòng' : 'Room time presets'}
          className="mb-4 flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            onClick={() => handleSelectTimeMode('auto')}
            aria-pressed={timeOverride === 'auto'}
            className={`min-h-[44px] rounded-full border px-4 py-2 font-mono text-xs transition-all duration-200 ${
              timeOverride === 'auto'
                ? 'border-folio-strong bg-folio-surface font-semibold text-folio-ink shadow-soft'
                : 'border-folio-border bg-folio-elevated text-folio-muted hover:text-folio-ink'
            }`}
          >
            {t.autoModeLabel}
          </button>

          {TIME_STATE_ORDER.map((stateId) => {
            const isActive = timeOverride === stateId;
            return (
              <button
                key={stateId}
                type="button"
                onClick={() => handleSelectTimeMode(stateId)}
                aria-pressed={isActive}
                className={`min-h-[44px] rounded-full border px-4 py-2 font-mono text-xs transition-all duration-200 ${
                  isActive
                    ? 'border-folio-strong bg-folio-surface font-semibold text-folio-ink shadow-soft'
                    : 'border-folio-border bg-folio-elevated text-folio-muted hover:text-folio-ink'
                }`}
              >
                <span>{TIME_STATE_META[stateId].label[locale]}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-3.5 lg:col-span-8">
            <WorkspaceRoom
              timeState={activeTimeState}
              lampOn={lampOn}
              isMusicActive={isMusicActive}
              selectedHotspot={selectedHotspot}
              onSelectHotspot={handleSelectHotspot}
              locale={locale}
            />

            <div
              onClick={handleSkipDialogue}
              className={`pokemon-gba-dialog min-h-[96px] px-4 py-3 sm:px-5 sm:py-3.5 ${
                isTypingDone ? '' : 'cursor-pointer'
              }`}
            >
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated px-2.5 py-0.5 font-mono text-[11px] font-semibold text-folio-ink">
                  <Monitor className="h-3 w-3 text-folio-muted" aria-hidden="true" />
                  <span>{activeSpeakerLabel}</span>
                </span>

                <span className="font-mono text-[11px] text-folio-faint">
                  {TIME_STATE_META[activeTimeState].hours}
                </span>
              </div>

              <div className="relative pr-5 font-mono text-xs leading-relaxed text-folio-ink sm:text-sm">
                <span className="sr-only" aria-live="polite">
                  {fullDialogue}
                </span>
                <span aria-hidden="true">{fullDialogue.slice(0, typedCount)}</span>
                {isTypingDone && (
                  <span
                    aria-hidden="true"
                    className="gba-dialog-caret absolute bottom-0 right-0 font-mono text-xs text-folio-gblue"
                  >
                    ▼
                  </span>
                )}
              </div>

              {!selectedHotspot && (
                <p className="mt-2 font-mono text-[11px] text-folio-faint">
                  {t.dialogPromptHint}
                </p>
              )}
            </div>

            <div
              role="group"
              aria-label={t.hotspotsAriaLabel}
              className="flex flex-wrap items-center gap-2"
            >
              {HOTSPOT_ORDER.map((hotspotId) => {
                const isSelected = selectedHotspot === hotspotId;
                return (
                  <button
                    key={hotspotId}
                    type="button"
                    onClick={() => handleSelectHotspot(hotspotId)}
                    aria-pressed={isSelected}
                    className={`min-h-[44px] rounded-[var(--radius-tag)] border px-3.5 py-2 font-mono text-xs font-medium transition-all duration-150 active:scale-[0.98] ${
                      isSelected
                        ? 'border-folio-strong bg-folio-surface font-semibold text-folio-ink shadow-soft'
                        : 'border-folio-border bg-folio-elevated text-folio-ink hover:border-folio-gblue'
                    }`}
                  >
                    {t.hotspotNames[hotspotId]}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="flex flex-col gap-5 lg:col-span-4">
            <div className="folio-card google-gradient-hover-border flex flex-col gap-4 !p-5 sm:!p-6">
              <div className="flex items-center justify-between gap-2 border-b border-folio-border pb-3">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-folio-ink">
                  <Music2 className="h-4 w-4 text-folio-ink" aria-hidden="true" />
                  <span>{t.spotifyHeader}</span>
                </div>

                {isMusicActive && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-folio-border bg-folio-elevated px-2.5 py-1 font-mono text-[11px] font-semibold text-folio-ink">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      {!shouldReduceMotion && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-folio-ggreen opacity-75" />
                      )}
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-folio-ggreen" />
                    </span>
                    <span>
                      {track?.isDemo ? t.spotifyDemoBadge : t.spotifyLiveBadge}
                    </span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3.5">
                {track?.albumArtUrl && !artLoadFailed ? (
                  <img
                    src={track.albumArtUrl}
                    alt={track.album ?? track.title}
                    onError={() => setArtLoadFailed(true)}
                    className="h-14 w-14 shrink-0 rounded-[var(--radius-tag)] border border-folio-border object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-tag)] border border-folio-border bg-folio-elevated text-folio-ink"
                  >
                    <Disc3
                      className={`h-7 w-7 ${
                        isMusicActive && !shouldReduceMotion
                          ? 'animate-[spin_6s_linear_infinite]'
                          : ''
                      }`}
                    />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  {track && track.isPlaying ? (
                    <>
                      {track.trackUrl ? (
                        <a
                          href={track.trackUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex max-w-full items-center gap-1 font-serif text-base font-semibold leading-snug text-folio-ink hover:underline"
                        >
                          <span className="truncate">{track.title}</span>
                          <ExternalLink
                            className="h-3.5 w-3.5 shrink-0 text-folio-muted"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        <div className="truncate font-serif text-base font-semibold leading-snug text-folio-ink">
                          {track.title}
                        </div>
                      )}
                      <div className="mt-0.5 truncate font-mono text-xs text-folio-muted">
                        {track.artist}
                      </div>
                      {track.album && (
                        <div className="mt-0.5 truncate font-mono text-[11px] text-folio-faint">
                          {track.album}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="font-serif text-base font-semibold text-folio-ink">
                        {t.spotifyIdleText}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5 font-mono text-xs text-folio-muted">
                        <Volume2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>
                          {locale === 'vi' ? 'Loa bàn lo-fi' : 'Lo-fi Desk Speakers'}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {track && track.isPlaying ? (
                <div className="space-y-1.5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full border border-folio-border bg-folio-elevated">
                    <div
                      style={{ width: `${progressPercent}%` }}
                      className="h-full rounded-full bg-folio-ggreen transition-[width] duration-500 ease-linear"
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] tabular-nums text-folio-faint">
                    <span>{elapsedLabel}</span>
                    <span>{durationLabel}</span>
                  </div>
                </div>
              ) : (
                !isConfigured && (
                  <p className="rounded-[var(--radius-inner)] border border-folio-border bg-folio-elevated px-3.5 py-2.5 text-xs leading-relaxed text-folio-muted">
                    {t.spotifyUnconfiguredHint}
                  </p>
                )
              )}

              {(!isConfigured || !isMusicActive || isDemoActive) && (
                <button
                  type="button"
                  onClick={toggleDemo}
                  aria-pressed={isDemoActive}
                  className="folio-btn-compact min-h-[44px] w-full justify-center"
                >
                  <span className="google-pill-aura" aria-hidden="true" />
                  {isDemoActive ? (
                    <Square className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  <span>
                    {isDemoActive ? t.spotifyDemoStopBtn : t.spotifyDemoBtn}
                  </span>
                </button>
              )}
            </div>

            <div className="folio-card-inner space-y-2.5">
              <div className="flex items-center justify-between gap-2 font-mono text-xs">
                <span className="font-semibold text-folio-ink">
                  {TIME_STATE_META[activeTimeState].label[locale]}
                </span>
                <span className="tabular-nums text-folio-faint">
                  {TIME_STATE_META[activeTimeState].hours}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-folio-muted">
                {TIME_STATE_META[activeTimeState].hint[locale]}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default WorkspacePage;
