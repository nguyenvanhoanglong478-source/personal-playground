import { useCallback, useEffect, useRef } from 'react';
import Lenis from 'lenis';

export interface SmoothScrollApi {
  scrollTo: (
    target: number | HTMLElement,
    options?: { immediate?: boolean }
  ) => void;
}

export function useSmoothScroll(disabled: boolean): SmoothScrollApi {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;
    const isDesktopPointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;
    if (!isDesktopPointer) return;

    const lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    const syncModalLock = () => {
      if (document.body.style.overflow === 'hidden') {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    syncModalLock();

    const bodyObserver = new MutationObserver(syncModalLock);
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => {
      bodyObserver.disconnect();
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [disabled]);

  const scrollTo = useCallback(
    (target: number | HTMLElement, options?: { immediate?: boolean }) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { immediate: Boolean(options?.immediate) });
        return;
      }
      if (typeof target === 'number') {
        window.scrollTo({
          top: target,
          behavior: options?.immediate ? 'auto' : 'smooth',
        });
      } else {
        target.scrollIntoView({
          behavior: options?.immediate ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    },
    []
  );

  return { scrollTo };
}
