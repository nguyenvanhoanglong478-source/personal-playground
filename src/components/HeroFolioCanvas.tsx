import React, { useEffect, useRef } from 'react';

interface HeroFolioCanvasProps {
  theme: 'light' | 'dark';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  rgb: string;
}

const GOOGLE_PARTICLE_COLORS = [
  '66, 133, 244',
  '155, 114, 203',
  '217, 101, 112',
  '52, 168, 83',
];

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
    let tick = 0;

    const particles: Particle[] = [];

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
      const count = isMobile ? 18 : 34;
      particles.length = 0;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          size: Math.random() * 1.7 + 0.9,
          baseAlpha: Math.random() * 0.35 + 0.2,
          rgb: GOOGLE_PARTICLE_COLORS[i % GOOGLE_PARTICLE_COLORS.length],
        });
      }
    };

    setupSize();
    window.addEventListener('resize', setupSize);

    const renderFrame = () => {
      tick += 0.01;

      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const lineColor = isDark
        ? 'rgba(138, 180, 248, 0.08)'
        : 'rgba(26, 115, 232, 0.07)';

      const waveY = height * 0.84;
      const waveGrad = ctx.createLinearGradient(0, waveY, width, waveY);
      const waveAlpha = isDark ? 0.22 : 0.16;
      waveGrad.addColorStop(0, `rgba(66, 133, 244, ${waveAlpha})`);
      waveGrad.addColorStop(0.35, `rgba(155, 114, 203, ${waveAlpha})`);
      waveGrad.addColorStop(0.7, `rgba(217, 101, 112, ${waveAlpha})`);
      waveGrad.addColorStop(1, `rgba(52, 168, 83, ${waveAlpha})`);

      ctx.strokeStyle = waveGrad;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 16) {
        const y = waveY + Math.sin(x * 0.008 + tick) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        const currentAlpha = isDark ? p.baseAlpha : p.baseAlpha * 0.78;

        ctx.fillStyle = `rgba(${p.rgb}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 95) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', setupSize);
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
