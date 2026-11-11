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
    let smoothPointerX = -1000;
    let smoothPointerY = -1000;
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
      const count = isMobile ? 18 : 36;
      particles.length = 0;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 1.6 + 0.8,
          baseAlpha: Math.random() * 0.4 + 0.2,
        });
      }
    };

    setupSize();
    window.addEventListener('resize', setupSize);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
      if (smoothPointerX < -500) {
        smoothPointerX = pointerX;
        smoothPointerY = pointerY;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const renderFrame = () => {
      tick += 0.01;

      if (smoothPointerX > -500) {
        smoothPointerX += (pointerX - smoothPointerX) * 0.08;
        smoothPointerY += (pointerY - smoothPointerY) * 0.08;
      }

      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const glowBaseColor = isDark
        ? 'rgba(255, 87, 51, 0.08)'
        : 'rgba(200, 62, 43, 0.06)';
      const particleColor = isDark
        ? 'rgba(244, 242, 237, '
        : 'rgba(20, 20, 19, ';
      const lineColor = isDark
        ? 'rgba(255, 87, 51, 0.06)'
        : 'rgba(200, 62, 43, 0.05)';
      const waveColor = isDark
        ? 'rgba(45, 212, 191, 0.12)'
        : 'rgba(29, 91, 76, 0.08)';

      if (smoothPointerX > -100 && smoothPointerX < width + 100) {
        const glowRadius = Math.min(width, 340);
        const grad = ctx.createRadialGradient(
          smoothPointerX,
          smoothPointerY,
          0,
          smoothPointerX,
          smoothPointerY,
          glowRadius
        );
        grad.addColorStop(0, glowBaseColor);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(smoothPointerX, smoothPointerY, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      const waveY = height * 0.82;
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 16) {
        const dist = Math.hypot(x - smoothPointerX, waveY - smoothPointerY);
        const pull = Math.max(0, 1 - dist / 220) * 10;
        const y = waveY + Math.sin(x * 0.008 + tick) * (6 + pull);
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

        const distToMouse = Math.hypot(p.x - smoothPointerX, p.y - smoothPointerY);
        let currentAlpha = p.baseAlpha;
        if (distToMouse < 180) {
          currentAlpha += (1 - distToMouse / 180) * 0.4;
        }

        ctx.fillStyle = `${particleColor}${currentAlpha})`;
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