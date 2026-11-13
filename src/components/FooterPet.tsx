import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Locale } from '../data/profile';

interface FooterPetProps {
  locale: Locale;
  theme: 'light' | 'dark';
  active: boolean;
}

type PetPose = 'walk' | 'idle' | 'sleep' | 'happy';
type WalkDir = 1 | -1;

const PET_BTN_SIZE = 44;
const PET_SPEED_PX = 28;
const BUBBLE_TIMEOUT_MS = 3500;

const PET_QUOTES: Record<Locale, string[]> = {
  vi: [
    'Cảm ơn đã xem hết trang!',
    'Nhớ uống miếng nước rồi làm tiếp nha.',
    'Có ý tưởng hay? Nhắn Long ở trên nhé.',
    'Chúc bạn một ngày thật chill.',
  ],
  en: [
    'Thanks for scrolling all the way down!',
    'Take a breather and stay hydrated.',
    'Got an idea? Say hi above.',
    'Have a chill day ahead.',
  ],
};

const DARK_WAKE_QUOTE: Record<Locale, string> = {
  vi: 'Khò... nghỉ ngơi chút nhé.',
  en: 'Zzz... taking a quick nap.',
};

const PET_ARIA_LABEL: Record<Locale, string> = {
  vi: 'Chú Capybara đồng hành ở chân trang, nhấn để trò chuyện',
  en: 'Footer Capybara companion, tap to say hi',
};

export const FooterPet: React.FC<FooterPetProps> = ({ locale, theme, active }) => {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const rawSparkId = useId().replace(/:/g, '');
  const sparkGradId = `capy-spark-grad-${rawSparkId}`;

  const trackRef = useRef<HTMLDivElement | null>(null);
  const trackWidthRef = useRef(0);
  const xRef = useRef(0);
  const hasInitPosRef = useRef(false);
  const dirRef = useRef<WalkDir>(1);
  const quoteIdxRef = useRef(0);

  const hideBubbleTimerRef = useRef<number | null>(null);
  const hopResetTimerRef = useRef<number | null>(null);
  const lastHoverOpenAtRef = useRef(0);
  const nextPauseAtRef = useRef(0);
  const pauseUntilRef = useRef(0);

  const [trackWidth, setTrackWidth] = useState(0);
  const [posX, setPosX] = useState(0);
  const [facing, setFacing] = useState<WalkDir>(1);
  const [walkFrame, setWalkFrame] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [hopTick, setHopTick] = useState(0);
  const [pose, setPose] = useState<PetPose>(() =>
    theme === 'dark' ? 'sleep' : shouldReduceMotion ? 'idle' : 'walk'
  );
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [bubblePinnedByClick, setBubblePinnedByClick] = useState(false);

  const clearHideTimer = useCallback(() => {
    if (hideBubbleTimerRef.current !== null) {
      window.clearTimeout(hideBubbleTimerRef.current);
      hideBubbleTimerRef.current = null;
    }
  }, []);

  const clearHopTimer = useCallback(() => {
    if (hopResetTimerRef.current !== null) {
      window.clearTimeout(hopResetTimerRef.current);
      hopResetTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const updateWidth = () => {
      const w = el.clientWidth;
      trackWidthRef.current = w;
      setTrackWidth(w);
      const maxX = Math.max(0, w - PET_BTN_SIZE);
      if (!hasInitPosRef.current && w > 0) {
        hasInitPosRef.current = true;
        xRef.current = Math.min(maxX, Math.round(w * 0.16));
      } else {
        xRef.current = Math.min(Math.max(0, xRef.current), maxX);
      }
      setPosX(xRef.current);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    clearHideTimer();
    clearHopTimer();
    setBubbleText(null);
    setBubblePinnedByClick(false);
    setPose(theme === 'dark' ? 'sleep' : shouldReduceMotion ? 'idle' : 'walk');
    nextPauseAtRef.current = performance.now() + 4200;
    pauseUntilRef.current = 0;
  }, [theme, shouldReduceMotion, clearHideTimer, clearHopTimer]);

  useEffect(() => {
    if (!active) {
      clearHideTimer();
      clearHopTimer();
      setBubbleText(null);
      setBubblePinnedByClick(false);
      setPose(theme === 'dark' ? 'sleep' : shouldReduceMotion ? 'idle' : 'walk');
    }
  }, [active, theme, shouldReduceMotion, clearHideTimer, clearHopTimer]);

  useEffect(() => {
    return () => {
      clearHideTimer();
      clearHopTimer();
    };
  }, [clearHideTimer, clearHopTimer]);

  useEffect(() => {
    if (!active || shouldReduceMotion || pose === 'sleep' || pose === 'walk') return;

    let blinkTimeoutId = 0;
    const intervalId = window.setInterval(() => {
      setIsBlinking(true);
      blinkTimeoutId = window.setTimeout(() => setIsBlinking(false), 160);
    }, 3400);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(blinkTimeoutId);
      setIsBlinking(false);
    };
  }, [active, shouldReduceMotion, pose]);

  useEffect(() => {
    if (!active || shouldReduceMotion || theme !== 'light' || pose === 'happy') return;

    let rafId = 0;
    let lastTime = performance.now();
    let frameAccMs = 0;
    pauseUntilRef.current = 0;
    nextPauseAtRef.current = lastTime + 4500 + Math.random() * 2500;

    const tick = (now: number) => {
      const dtMs = Math.min(64, Math.max(0, now - lastTime));
      lastTime = now;

      const maxX = Math.max(0, trackWidthRef.current - PET_BTN_SIZE);
      if (maxX <= 2) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      if (now < pauseUntilRef.current) {
        setPose((prev) => (prev === 'idle' ? prev : 'idle'));
      } else {
        if (pauseUntilRef.current !== 0 && now >= pauseUntilRef.current) {
          pauseUntilRef.current = 0;
          nextPauseAtRef.current = now + 4500 + Math.random() * 3200;
          setPose((prev) => (prev === 'walk' ? prev : 'walk'));
        } else if (now >= nextPauseAtRef.current) {
          pauseUntilRef.current = now + 1500 + Math.random() * 1000;
          setPose('idle');
          rafId = window.requestAnimationFrame(tick);
          return;
        }

        const stepPx = (PET_SPEED_PX * dtMs) / 1000;
        let nextX = xRef.current + dirRef.current * stepPx;

        if (nextX <= 0) {
          nextX = 0;
          if (dirRef.current !== 1) {
            dirRef.current = 1;
            setFacing(1);
          }
        } else if (nextX >= maxX) {
          nextX = maxX;
          if (dirRef.current !== -1) {
            dirRef.current = -1;
            setFacing(-1);
          }
        }

        xRef.current = nextX;
        setPosX(nextX);

        frameAccMs += dtMs;
        if (frameAccMs >= 180) {
          frameAccMs %= 180;
          setWalkFrame((prev) => (prev + 1) % 4);
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [active, shouldReduceMotion, theme, pose]);

  const scheduleAutoHide = useCallback(() => {
    clearHideTimer();
    hideBubbleTimerRef.current = window.setTimeout(() => {
      setBubbleText(null);
      setBubblePinnedByClick(false);
      if (theme === 'dark') {
        setPose('sleep');
      } else {
        pauseUntilRef.current = 0;
        nextPauseAtRef.current = performance.now() + 4500;
        setPose(shouldReduceMotion ? 'idle' : 'walk');
      }
    }, BUBBLE_TIMEOUT_MS);
  }, [clearHideTimer, theme, shouldReduceMotion]);

  const triggerInteraction = useCallback(
    (isClick: boolean) => {
      const list = PET_QUOTES[locale];
      const nextText =
        theme === 'dark' && pose === 'sleep'
          ? DARK_WAKE_QUOTE[locale]
          : list[quoteIdxRef.current % list.length];

      if (!(theme === 'dark' && pose === 'sleep')) {
        quoteIdxRef.current = (quoteIdxRef.current + 1) % list.length;
      }

      setPose('happy');
      setBubbleText(nextText);
      if (isClick) {
        setBubblePinnedByClick(true);
      }

      if (!shouldReduceMotion) {
        clearHopTimer();
        setHopTick((n) => n + 1);
      }

      scheduleAutoHide();
    },
    [locale, theme, pose, shouldReduceMotion, clearHopTimer, scheduleAutoHide]
  );

  const handlePointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse') return;
    if (bubbleText) {
      scheduleAutoHide();
      return;
    }
    lastHoverOpenAtRef.current = performance.now();
    triggerInteraction(false);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse') return;
    if (bubblePinnedByClick) return;
    clearHideTimer();
    hideBubbleTimerRef.current = window.setTimeout(() => {
      setBubbleText(null);
      if (theme === 'dark') {
        setPose('sleep');
      } else {
        setPose(shouldReduceMotion ? 'idle' : 'walk');
      }
    }, 900);
  };

  const handleClick = () => {
    const sinceHover = performance.now() - lastHoverOpenAtRef.current;
    if (bubbleText && !bubblePinnedByClick && sinceHover < 450) {
      setBubblePinnedByClick(true);
      if (!shouldReduceMotion) {
        clearHopTimer();
        setHopTick((n) => n + 1);
      }
      scheduleAutoHide();
      return;
    }
    triggerInteraction(true);
  };

  const centerOffset = posX + PET_BTN_SIZE / 2;
  const nearLeft = centerOffset < 145;
  const nearRight = trackWidth > 0 && trackWidth - centerOffset < 145;

  const bubbleAnchorClass = nearLeft
    ? 'left-0'
    : nearRight
      ? 'right-0'
      : 'left-1/2 -translate-x-1/2';

  const caretAnchorStyle: React.CSSProperties = nearLeft
    ? { left: '17px' }
    : nearRight
      ? { right: '17px' }
      : { left: '50%', transform: 'translateX(-50%)' };

  const bodyTranslateY = pose === 'sleep' ? 2 : pose === 'walk' && walkFrame % 2 === 1 ? -0.5 : 0;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-full z-30">
      <div className="folio-container">
        <div ref={trackRef} className="relative h-0 w-full">
          <div
            style={{ transform: `translate3d(${posX.toFixed(1)}px, 0, 0)` }}
            className="absolute bottom-0 left-0 will-change-transform"
          >
            {bubbleText && (
              <div
                role="status"
                aria-live="polite"
                style={{
                  backgroundColor: theme === 'dark' ? '#1E1F20' : '#FFFFFF',
                }}
                className={`pointer-events-none absolute bottom-[calc(100%-2px)] z-20 mb-2 w-max max-w-[min(290px,calc(100vw-40px))] rounded-[var(--radius-tag)] border border-folio-border px-3 py-1.5 text-xs font-medium leading-snug text-folio-ink shadow-soft transition-opacity duration-200 ${bubbleAnchorClass}`}
              >
                <span className="relative z-10 block">{bubbleText}</span>
                <span
                  aria-hidden="true"
                  style={{
                    ...caretAnchorStyle,
                    backgroundColor: theme === 'dark' ? '#1E1F20' : '#FFFFFF',
                  }}
                  className="absolute -bottom-[5px] h-2.5 w-2.5 rotate-45 border-b border-r border-folio-border"
                />
              </div>
            )}

            <button
              type="button"
              onClick={handleClick}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
              aria-label={PET_ARIA_LABEL[locale]}
              className="pointer-events-auto relative flex h-[44px] w-[44px] items-end justify-center pb-0 focus-visible:rounded-md"
            >
              {pose === 'sleep' && active && !shouldReduceMotion && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0.5 top-0 flex items-end gap-0.5 font-mono font-bold text-folio-muted select-none"
                >
                  <span className="capy-zzz-1 text-[10px] leading-none">z</span>
                  <span className="capy-zzz-2 text-[12px] leading-none">Z</span>
                </div>
              )}

              {pose === 'happy' && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0.5 top-0.5"
                >
                  <defs>
                    <linearGradient id={sparkGradId} x1="1" y1="1" x2="11" y2="11" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#4285F4" />
                      <stop offset="34%" stopColor="#9B72CB" />
                      <stop offset="68%" stopColor="#D96570" />
                      <stop offset="100%" stopColor="#34A853" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M6 0.5C6.35 3.65 8.35 5.65 11.5 6C8.35 6.35 6.35 8.35 6 11.5C5.65 8.35 3.65 6.35 0.5 6C3.65 5.65 5.65 3.65 6 0.5Z"
                    fill={`url(#${sparkGradId})`}
                  />
                </svg>
              )}

              <div
                key={hopTick}
                className={`${hopTick > 0 && !shouldReduceMotion ? 'capy-hop' : ''} ${
                  pose === 'sleep' && active && !shouldReduceMotion ? 'capy-breathe' : ''
                }`}
              >
                <svg
                  width="38"
                  height="32"
                  viewBox="0 0 19 16"
                  shapeRendering="crispEdges"
                  aria-hidden="true"
                  style={{
                    transform: facing === -1 ? 'scaleX(-1)' : 'scaleX(1)',
                  }}
                  className="block select-none overflow-visible"
                >
                  <g transform={`translate(0, ${bodyTranslateY})`}>
                    <rect x="13" y="0" width="1" height="1" fill="#267A3D" />
                    <rect x="14" y="0" width="2" height="1" fill="#34A853" />
                    <rect x="12" y="1" width="3" height="1" fill="#FB8C00" />
                    <rect x="12" y="1" width="1" height="1" fill="#FBBC04" />
                    <rect x="12" y="2" width="2" height="1" fill="#FB8C00" />
                    <rect x="14" y="2" width="1" height="1" fill="#D96800" />

                    <rect x="10" y="3" width="2" height="2" fill="#5C3C28" />
                    <rect x="11" y="4" width="1" height="1" fill="#7D563B" />
                    <rect x="12" y="3" width="1" height="1" fill="#5C3C28" />
                    <rect x="11" y="4" width="5" height="1" fill="#C6956F" />

                    <rect x="11" y="5" width="7" height="5" fill="#A67855" />
                    <rect x="16" y="5" width="2" height="1" fill="#C6956F" />
                    <rect x="17" y="6" width="2" height="3" fill="#A67855" />
                    <rect x="13" y="10" width="4" height="1" fill="#7D563B" />

                    <rect x="17" y="6" width="2" height="2" fill="#2A1810" />
                    <rect x="13" y="8" width="2" height="1" fill="#E68A82" />

                    {pose === 'sleep' || isBlinking ? (
                      <rect x="13" y="6" width="2" height="1" fill="#2A1810" />
                    ) : pose === 'happy' ? (
                      <>
                        <rect x="14" y="5" width="1" height="2" fill="#2A1810" />
                        <rect x="15" y="6" width="1" height="1" fill="#2A1810" />
                      </>
                    ) : (
                      <rect x="14" y="6" width="1" height="1" fill="#2A1810" />
                    )}

                    <rect x="4" y="6" width="7" height="1" fill="#C6956F" />
                    <rect x="3" y="7" width="10" height="1" fill="#A67855" />
                    <rect x="2" y="8" width="12" height="4" fill="#A67855" />
                    <rect x="2" y="9" width="1" height="3" fill="#7D563B" />
                    <rect x="3" y="12" width="10" height="1" fill="#7D563B" />
                    <rect x="5" y="11" width="5" height="1" fill="#B58966" />

                    {pose === 'sleep' ? (
                      <>
                        <rect x="4" y="13" width="2" height="1" fill="#5C3C28" />
                        <rect x="10" y="13" width="2" height="1" fill="#5C3C28" />
                      </>
                    ) : pose === 'walk' && walkFrame === 0 ? (
                      <>
                        <rect x="5" y="13" width="2" height="2" fill="#5C3C28" />
                        <rect x="10" y="13" width="2" height="3" fill="#5C3C28" />
                        <rect x="2" y="13" width="2" height="3" fill="#7D563B" />
                        <rect x="11" y="13" width="2" height="3" fill="#7D563B" />
                      </>
                    ) : pose === 'walk' && walkFrame === 2 ? (
                      <>
                        <rect x="4" y="13" width="2" height="3" fill="#5C3C28" />
                        <rect x="11" y="13" width="2" height="3" fill="#5C3C28" />
                        <rect x="4" y="13" width="2" height="2" fill="#7D563B" />
                        <rect x="10" y="13" width="2" height="2" fill="#7D563B" />
                      </>
                    ) : (
                      <>
                        <rect x="5" y="13" width="2" height="3" fill="#5C3C28" />
                        <rect x="11" y="13" width="2" height="3" fill="#5C3C28" />
                        <rect x="3" y="13" width="2" height="3" fill="#7D563B" />
                        <rect x="9" y="13" width="2" height="3" fill="#7D563B" />
                      </>
                    )}
                  </g>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
