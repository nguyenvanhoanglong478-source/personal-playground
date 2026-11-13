import React, { useCallback, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Locale } from '../../data/profile';
import {
  ROOM_HEIGHT,
  ROOM_WIDTH,
  RoomHotspotId,
  RoomHotspotRegion,
  RoomTimeState,
  WORKSPACE_UI_LABELS,
} from '../../data/workspace';
import { getRoomPalette } from './pixelPalette';
import { drawCharacterAndEffects } from './pixelSprites';
import {
  ROOM_HOTSPOTS,
  drawLightingOverlay,
  drawRoomEnvironment,
} from './roomEnvironment';

export interface WorkspaceRoomProps {
  timeState: RoomTimeState;
  lampOn: boolean;
  isMusicActive: boolean;
  selectedHotspot: RoomHotspotId | null;
  onSelectHotspot: (id: RoomHotspotId) => void;
  locale?: Locale;
}

export const WorkspaceRoom: React.FC<WorkspaceRoomProps> = ({
  timeState,
  lampOn,
  isMusicActive,
  selectedHotspot,
  onSelectHotspot,
  locale = 'vi',
}) => {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tickRef = useRef<number>(0);
  const hoveredRegionRef = useRef<RoomHotspotRegion | null>(null);
  const propsRef = useRef({
    timeState,
    lampOn,
    isMusicActive,
    selectedHotspot,
    reducedMotion: shouldReduceMotion,
  });

  propsRef.current = {
    timeState,
    lampOn,
    isMusicActive,
    selectedHotspot,
    reducedMotion: shouldReduceMotion,
  };

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const current = propsRef.current;
    const effectiveTick = current.reducedMotion ? 0 : tickRef.current;
    const palette = getRoomPalette(current.timeState, current.lampOn);
    const activeHovered = hoveredRegionRef.current;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, ROOM_WIDTH, ROOM_HEIGHT);

    drawRoomEnvironment(ctx, {
      timeState: current.timeState,
      lampOn: current.lampOn,
      tick: effectiveTick,
      palette,
    });

    drawCharacterAndEffects(ctx, {
      timeState: current.timeState,
      lampOn: current.lampOn,
      isMusicActive: current.isMusicActive,
      tick: effectiveTick,
      palette,
      hoveredHotspot: activeHovered ? activeHovered.id : null,
      selectedHotspot: current.selectedHotspot,
      hoveredRegion: activeHovered,
      reducedMotion: current.reducedMotion,
    });

    drawLightingOverlay(ctx, {
      timeState: current.timeState,
      lampOn: current.lampOn,
      isMusicActive: current.isMusicActive,
      tick: effectiveTick,
      palette,
    });
  }, []);

  useEffect(() => {
    drawFrame();
  }, [
    timeState,
    lampOn,
    isMusicActive,
    selectedHotspot,
    shouldReduceMotion,
    drawFrame,
  ]);

  useEffect(() => {
    if (shouldReduceMotion) {
      tickRef.current = 0;
      drawFrame();
      return;
    }

    let rafId = 0;
    let lastStepMs = performance.now();

    const loop = (now: number) => {
      if (document.visibilityState !== 'visible') {
        rafId = 0;
        return;
      }

      const elapsed = now - lastStepMs;
      if (elapsed >= 66) {
        lastStepMs = now - (elapsed % 66);
        tickRef.current = (tickRef.current + 1) % 1000000;
        drawFrame();
      }

      rafId = window.requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (rafId !== 0 || document.visibilityState !== 'visible') return;
      lastStepMs = performance.now();
      rafId = window.requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      if (rafId === 0) return;
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        drawFrame();
        startLoop();
      } else {
        stopLoop();
      }
    };

    drawFrame();
    startLoop();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopLoop();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [shouldReduceMotion, drawFrame]);

  const hitTestCanvas = (
    clientX: number,
    clientY: number
  ): RoomHotspotRegion | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;

    const canvasX = (clientX - rect.left) * (ROOM_WIDTH / rect.width);
    const canvasY = (clientY - rect.top) * (ROOM_HEIGHT / rect.height);

    for (let i = ROOM_HOTSPOTS.length - 1; i >= 0; i--) {
      const region = ROOM_HOTSPOTS[i];
      if (
        canvasX >= region.x &&
        canvasX <= region.x + region.w &&
        canvasY >= region.y &&
        canvasY <= region.y + region.h
      ) {
        return region;
      }
    }

    return null;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType !== 'mouse') return;
    const nextRegion = hitTestCanvas(event.clientX, event.clientY);
    const prevRegion = hoveredRegionRef.current;
    const hasChanged =
      (prevRegion === null && nextRegion !== null) ||
      (prevRegion !== null && nextRegion === null) ||
      (prevRegion !== null &&
        nextRegion !== null &&
        (prevRegion.id !== nextRegion.id ||
          prevRegion.x !== nextRegion.x ||
          prevRegion.y !== nextRegion.y));

    if (hasChanged) {
      hoveredRegionRef.current = nextRegion;
      drawFrame();
    }
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType !== 'mouse') return;
    if (hoveredRegionRef.current !== null) {
      hoveredRegionRef.current = null;
      drawFrame();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const hit = hitTestCanvas(event.clientX, event.clientY);
    if (hit) {
      onSelectHotspot(hit.id);
    }
  };

  const canvasAriaLabel = WORKSPACE_UI_LABELS[locale].canvasAriaLabel;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-inner)] border-2 border-folio-border bg-[#0F121D] shadow-soft">
      <canvas
        ref={canvasRef}
        width={ROOM_WIDTH}
        height={ROOM_HEIGHT}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        aria-label={canvasAriaLabel}
        role="img"
        className="pixelated-canvas block h-full w-full cursor-pointer select-none"
      />
    </div>
  );
};
