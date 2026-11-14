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
import {
  drawMusicEffectsOverlay,
  drawRoomScreensAndSteam,
  drawSeatedCharacter,
  drawSleepingCharacter,
  drawWakingAndCapybaraLayer,
  getSleepingBreathOffset,
} from './pixelSprites';
import {
  ROOM_HOTSPOTS,
  drawBedBlanket,
  drawChairBackOverlay,
  drawDeskAndChairBase,
  drawLightingOverlay,
  drawRoomBaseLayer,
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
  const elapsedSecRef = useRef<number>(0);
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
    const effectiveElapsedSec = current.reducedMotion ? 0 : elapsedSecRef.current;
    const effectiveTick = current.reducedMotion
      ? 0
      : Math.floor(effectiveElapsedSec * 15);
    const palette = getRoomPalette(current.timeState, current.lampOn);
    const activeHovered = hoveredRegionRef.current;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, ROOM_WIDTH, ROOM_HEIGHT);

    const envOptions = {
      timeState: current.timeState,
      lampOn: current.lampOn,
      isMusicActive: current.isMusicActive,
      tick: effectiveTick,
      elapsedSec: effectiveElapsedSec,
      palette,
    };

    const spriteOptions = {
      timeState: current.timeState,
      lampOn: current.lampOn,
      isMusicActive: current.isMusicActive,
      tick: effectiveTick,
      elapsedSec: effectiveElapsedSec,
      palette,
      hoveredHotspot: activeHovered ? activeHovered.id : null,
      selectedHotspot: current.selectedHotspot,
      hoveredRegion: activeHovered,
      reducedMotion: current.reducedMotion,
    };

    const lightingOptions = {
      timeState: current.timeState,
      lampOn: current.lampOn,
      isMusicActive: current.isMusicActive,
      tick: effectiveTick,
      elapsedSec: effectiveElapsedSec,
      palette,
    };

    drawRoomBaseLayer(ctx, envOptions);

    if (current.timeState === 'sleeping') {
      drawSleepingCharacter(ctx, spriteOptions);
    }
    const bedBreathOffset =
      current.timeState === 'sleeping'
        ? getSleepingBreathOffset(effectiveElapsedSec, current.reducedMotion)
        : 0;
    drawBedBlanket(ctx, palette, bedBreathOffset);

    drawDeskAndChairBase(ctx, envOptions);
    drawRoomScreensAndSteam(ctx, spriteOptions);

    if (current.timeState === 'working' || current.timeState === 'late_night') {
      drawSeatedCharacter(ctx, spriteOptions);
    }
    drawChairBackOverlay(ctx, palette);

    drawWakingAndCapybaraLayer(ctx, spriteOptions);

    drawLightingOverlay(ctx, lightingOptions);
    drawMusicEffectsOverlay(ctx, spriteOptions);
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
      elapsedSecRef.current = 0;
      drawFrame();
      return;
    }

    let rafId = 0;
    let lastMs = performance.now();

    const loop = (now: number) => {
      if (document.visibilityState !== 'visible') {
        rafId = 0;
        return;
      }

      const dtSec = Math.min(0.05, Math.max(0, (now - lastMs) / 1000));
      lastMs = now;
      elapsedSecRef.current += dtSec;
      drawFrame();

      rafId = window.requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (rafId !== 0 || document.visibilityState !== 'visible') return;
      lastMs = performance.now();
      rafId = window.requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      if (rafId === 0) return;
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        lastMs = performance.now();
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
        className="pixelated-canvas block h-full w-full cursor-pointer select-none touch-pan-y"
      />
    </div>
  );
};
