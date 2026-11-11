import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    let rafId = 0;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });
    };

    const updateTrail = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      setTrailPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateTrail);
    };

    rafId = requestAnimationFrame(updateTrail);
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-2 w-2 rounded-full bg-folio-vermilion shadow-sm lg:block"
      />
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${trailPos.x - 16}px, ${trailPos.y - 16}px, 0)`,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[119] hidden h-8 w-8 rounded-full border border-folio-vermilion/50 transition-opacity duration-300 lg:block"
      />
    </>
  );
};