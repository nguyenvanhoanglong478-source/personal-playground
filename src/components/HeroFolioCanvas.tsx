import React, { useEffect, useRef } from 'react';

interface HeroFolioCanvasProps {
  theme: 'light' | 'dark';
}

interface AnchorPoint {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  phase: number;
}

const HeroFolioCanvas: React.FC<HeroFolioCanvasProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let animId = 0;
    let width = 0;
    let height = 0;
    let pointerX = -1000;
    let pointerY = -1000;
    let tick = 0;

    const points: AnchorPoint[] = [];

    const setupSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = Math.max(320, Math.floor(rect.width));
      height = Math.max(360, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 768;
      const count = isMobile ? 4 : 8;
      points.length = 0;

      for (let i = 0; i < count; i++) {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const bx = width * (0.12 + col * 0.25);
        const by = height * (0.22 + row * 0.56);
        points.push({
          x: bx,
          y: by,
          baseX: bx,
          baseY: by,
          phase: i * 0.9,
        });
      }
    };

    setupSize();
    window.addEventListener('resize', setupSize);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const renderFrame = () => {
      tick += 0.012;
      ctx.clearRect(0, 0, width, height);

      const strokeRule =
        theme === 'dark' ? 'rgba(163, 158, 147, 0.08)' : 'rgba(82, 79, 73, 0.08)';
      const accentColor =
        theme === 'dark' ? 'rgba(240, 90, 67, 0.22)' : 'rgba(200, 62, 43, 0.18)';
      const spruceColor =
        theme === 'dark' ? 'rgba(69, 184, 153, 0.18)' : 'rgba(29, 91, 76, 0.15)';

      const marginX = width > 1024 ? width * 0.66 : width * 0.88;
      ctx.strokeStyle = strokeRule;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(marginX, 0);
      ctx.lineTo(marginX, height);
      ctx.stroke();

      const waveYPositions = [height * 0.14, height * 0.88];
      waveYPositions.forEach((baseWaveY, w) => {
        ctx.strokeStyle = w === 0 ? accentColor : spruceColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 18) {
          const distToPointer = Math.hypot(x - pointerX, baseWaveY - pointerY);
          const pull = Math.max(0, 1 - distToPointer / 220) * 12;
          const y =
            baseWaveY + Math.sin(x * 0.007 + tick + w * 1.5) * (8 + pull);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      ctx.strokeStyle = strokeRule;
      ctx.lineWidth = 1;
      for (const pt of points) {
        if (!prefersReducedMotion) {
          pt.x = pt.baseX + Math.cos(tick + pt.phase) * 4;
          pt.y = pt.baseY + Math.sin(tick + pt.phase) * 4;
        }
        ctx.beginPath();
        ctx.moveTo(pt.x - 4, pt.y);
        ctx.lineTo(pt.x + 4, pt.y);
        ctx.moveTo(pt.x, pt.y - 4);
        ctx.lineTo(pt.x, pt.y + 4);
        ctx.stroke();
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', setupSize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

export default HeroFolioCanvas;
