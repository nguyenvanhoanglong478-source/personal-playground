import { useCallback, useEffect, useRef, useState } from 'react';

interface TiltMotionState {
  rx: number;
  ry: number;
  px: number;
  py: number;
  trx: number;
  tryVal: number;
  tpx: number;
  tpy: number;
}

interface UseCardTiltOptions {
  maxDeg: number;
  lerp: number;
  disabled: boolean;
  variant?: 'pokemon' | 'hero';
}

const SETTLE_EPS = 0.05;

export function useCardTilt<TCard extends HTMLElement = HTMLDivElement>({
  maxDeg,
  lerp,
  disabled,
  variant = 'pokemon',
}: UseCardTiltOptions) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<TCard | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isTiltActive, setIsTiltActive] = useState(false);

  const motionRef = useRef<TiltMotionState>({
    rx: 0,
    ry: 0,
    px: 50,
    py: 50,
    trx: 0,
    tryVal: 0,
    tpx: 50,
    tpy: 50,
  });

  const applyVars = useCallback(
    (s: TiltMotionState) => {
      const el = cardRef.current;
      if (!el) return;
      const threshold = variant === 'hero' ? 0.02 : 0.01;
      const isTilting =
        !disabled && (Math.abs(s.rx) > threshold || Math.abs(s.ry) > threshold);

      if (isTilting) {
        el.setAttribute('data-tilting', 'true');
      } else {
        el.removeAttribute('data-tilting');
      }

      if (variant === 'hero') {
        const gx = ((s.px - 50) / 100) * 36;
        const gy = ((s.py - 50) / 100) * 24;
        el.style.setProperty('--rotate-x', disabled ? '0deg' : `${s.rx.toFixed(2)}deg`);
        el.style.setProperty('--rotate-y', disabled ? '0deg' : `${s.ry.toFixed(2)}deg`);
        el.style.setProperty('--glare-x', `${gx.toFixed(2)}%`);
        el.style.setProperty('--glare-y', `${gy.toFixed(2)}%`);
        return;
      }

      const bgx = 37 + (s.px / 100) * 26;
      const bgy = 37 + (s.py / 100) * 26;
      const gx = (s.px - 50) * 0.72;
      const gy = (s.py - 50) * 0.5;
      const hyp = Math.min(1, Math.hypot((s.px - 50) / 50, (s.py - 50) / 50));
      el.style.setProperty('--pk-rx', `${s.rx.toFixed(2)}deg`);
      el.style.setProperty('--pk-ry', `${s.ry.toFixed(2)}deg`);
      el.style.setProperty('--pk-px', `${s.px.toFixed(2)}%`);
      el.style.setProperty('--pk-py', `${s.py.toFixed(2)}%`);
      el.style.setProperty('--pk-bgx', `${bgx.toFixed(2)}%`);
      el.style.setProperty('--pk-bgy', `${bgy.toFixed(2)}%`);
      el.style.setProperty('--pk-gx', `${gx.toFixed(2)}%`);
      el.style.setProperty('--pk-gy', `${gy.toFixed(2)}%`);
      el.style.setProperty('--pk-hyp', hyp.toFixed(3));
    },
    [disabled, variant]
  );

  const stepTilt = useCallback(() => {
    const s = motionRef.current;
    s.rx += (s.trx - s.rx) * lerp;
    s.ry += (s.tryVal - s.ry) * lerp;
    s.px += (s.tpx - s.px) * lerp;
    s.py += (s.tpy - s.py) * lerp;

    const settled =
      Math.abs(s.trx - s.rx) < SETTLE_EPS &&
      Math.abs(s.tryVal - s.ry) < SETTLE_EPS &&
      Math.abs(s.tpx - s.px) < SETTLE_EPS &&
      Math.abs(s.tpy - s.py) < SETTLE_EPS;

    if (settled) {
      s.rx = s.trx;
      s.ry = s.tryVal;
      s.px = s.tpx;
      s.py = s.tpy;
      applyVars(s);
      rafRef.current = null;
      return;
    }

    applyVars(s);
    rafRef.current = window.requestAnimationFrame(stepTilt);
  }, [applyVars, lerp]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const scheduleTilt = useCallback(() => {
    if (disabled) {
      const s = motionRef.current;
      s.rx = 0;
      s.ry = 0;
      s.px = variant === 'hero' ? 50 : s.tpx;
      s.py = variant === 'hero' ? 50 : s.tpy;
      applyVars(s);
      return;
    }
    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(stepTilt);
    }
  }, [applyVars, disabled, stepTilt, variant]);

  const updateTiltFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const nx = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      const ny = Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);

      const s = motionRef.current;
      s.tpx = nx * 100;
      s.tpy = ny * 100;
      s.trx = -(ny - 0.5) * maxDeg;
      s.tryVal = (nx - 0.5) * maxDeg;
      setIsTiltActive(true);
      scheduleTilt();
    },
    [maxDeg, scheduleTilt]
  );

  const resetTilt = useCallback(() => {
    const s = motionRef.current;
    s.trx = 0;
    s.tryVal = 0;
    s.tpx = 50;
    s.tpy = 50;
    setIsTiltActive(false);
    scheduleTilt();
  }, [scheduleTilt]);

  const resetTiltImmediately = useCallback(() => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const s = motionRef.current;
    s.rx = 0;
    s.ry = 0;
    s.px = 50;
    s.py = 50;
    s.trx = 0;
    s.tryVal = 0;
    s.tpx = 50;
    s.tpy = 50;
    setIsTiltActive(false);
    applyVars(s);
  }, [applyVars]);

  return {
    stageRef,
    cardRef,
    isTiltActive,
    updateTiltFromPointer,
    resetTilt,
    resetTiltImmediately,
  };
}
