import {
  ROOM_HEIGHT,
  ROOM_WIDTH,
  RoomHotspotId,
  RoomHotspotRegion,
  RoomTimeState,
} from '../../data/workspace';
import { RoomPalette } from './pixelPalette';

export interface DrawRoomEnvironmentOptions {
  timeState: RoomTimeState;
  lampOn: boolean;
  tick: number;
  elapsedSec?: number;
  palette: RoomPalette;
  isMusicActive?: boolean;
}

export interface DrawLightingOverlayOptions {
  timeState: RoomTimeState;
  lampOn: boolean;
  isMusicActive?: boolean;
  tick: number;
  elapsedSec?: number;
  palette: RoomPalette;
}

export interface PixelRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const WALKABLE_RECT: PixelRect = { x: 76, y: 88, w: 30, h: 62 };

export const RUG_WALK_RECT: PixelRect = { x: 118, y: 127, w: 108, h: 24 };

function createHotspot(
  id: RoomHotspotId,
  x: number,
  y: number,
  w: number,
  h: number,
  pointerX: number,
  pointerY: number
): RoomHotspotRegion {
  return { id, x, y, w, h, pointerX, pointerY };
}

export const ROOM_HOTSPOTS: RoomHotspotRegion[] = [
  createHotspot('window', 74, 8, 76, 46, 112, 6),
  createHotspot('shelf', 210, 14, 86, 66, 254, 12),
  createHotspot('bed', 10, 74, 60, 84, 42, 70),
  createHotspot('monitor', 134, 60, 16, 18, 173, 42),
  createHotspot('monitor', 149, 46, 52, 43, 173, 42),
  createHotspot('speakers', 112, 58, 18, 24, 121, 54),
  createHotspot('speakers', 206, 58, 18, 24, 215, 54),
  createHotspot('lamp', 226, 52, 18, 34, 234, 48),
  createHotspot('capybara', 114, 120, 120, 34, 174, 118),
];

const BAYER_4X4: readonly (readonly number[])[] = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const BAYER_2X2: readonly (readonly number[])[] = [
  [0, 2],
  [3, 1],
];

const HONDA_CUB_MATRIX: readonly string[] = [
  '....ooo.................',
  '...oHHCo................',
  '..oYHCCo....oSSSSSooo...',
  '...oCCCo...oLGGGGGoRRo..',
  '...oCCCo..oGGGGGGGGoRDo.',
  '..oLCCCo.oGGGGGGGGGoRRo.',
  '.oLGCDoo.oGGGGDDDDGooo..',
  'oGTTToooGGGGGDDDDDGGooo.',
  'oGTMo..oGGMMMMMMMMGTTTo.',
  'oTHTo..oGGDDDDDDDGGTHTo.',
  'oTHTo...ooo....ooo.oTHTo',
  '.ooo................ooo.',
];

const PLANT_MATRIX: readonly string[] = [
  '........oo....oo......',
  '.......oLLo..oLLo.....',
  '....oooLMMLooLMMLooo..',
  '...oLLMMMLLooLLMMMLLo.',
  '..oLMMDDDMMooMMDDDMMo.',
  '..oMDDoMMMMLLMMMMoDDo.',
  'oooLMooLLMMMMMMLLooMLo',
  'oLLMMMoMMMMMMMMMMoMMMo',
  'oMDDDMoMMDDDDDDMMoDDMo',
  '.ooooMMMDDoLLoDDDMooo.',
  '...oLLMMMMoMMoMMMMLLo.',
  '..oLMMMMDDoDDoDDMMMMLo',
  '..oMDDDoMMMMMMMMoDDDMo',
  '...oooo.oMMLLMMo.oooo.',
  '.......ooDDDDDDo......',
  '.....ooLLMMMMMMLLoo...',
  '....oLMDDDDDDDDDDMLo..',
  '....oDDooBBBBBBooDDo..',
  '.....oooooooooooooo...',
  '.....oRPPPPPPPPPPPo...',
  '.....oRPPPPPPPPPPPo...',
  '.....oTTPPPPPPPPTTo...',
  '......ooPPPPPPPPoo....',
  '.......oRPPPPPPPo.....',
  '.......oRPPPPPPTo.....',
  '.......oRPPPPPPTo.....',
  '.......oPPPPPPTTo.....',
  '.......oPPPPTTTTo.....',
  '........oPPTTTTo......',
  '........oooooooo......',
];

const CRESCENT_MOON_MATRIX: readonly string[] = [
  '..mmm..',
  '.mmss..',
  'mm.....',
  'mm.....',
  'mm.....',
  '.mmss..',
  '..mmm..',
];

const CLOUD_LARGE_MATRIX: readonly string[] = [
  '...hhhh....',
  '.hhhhhhhh..',
  'hhhhhhhhhh.',
  '.sssssssss.',
];

const CLOUD_SMALL_MATRIX: readonly string[] = [
  '..hhhh..',
  'hhhhhhh.',
  '.ssssss.',
];

const CLOUD_WISP_MATRIX: readonly string[] = [
  '..hhhh.',
  'ssssss.',
];

interface FairyBulb {
  x: number;
  y: number;
  phase: number;
}

const FAIRY_BULBS: readonly FairyBulb[] = [
  { x: 16, y: 6, phase: 0.2 },
  { x: 26, y: 8, phase: 1.5 },
  { x: 36, y: 5, phase: 2.8 },
  { x: 46, y: 8, phase: 0.9 },
  { x: 56, y: 6, phase: 2.1 },
  { x: 66, y: 7, phase: 3.4 },
  { x: 158, y: 6, phase: 0.6 },
  { x: 169, y: 8, phase: 1.9 },
  { x: 180, y: 5, phase: 3.1 },
  { x: 192, y: 8, phase: 1.1 },
  { x: 204, y: 6, phase: 2.4 },
  { x: 216, y: 8, phase: 0.4 },
  { x: 228, y: 5, phase: 1.7 },
  { x: 240, y: 8, phase: 3.0 },
  { x: 252, y: 6, phase: 0.8 },
  { x: 264, y: 8, phase: 2.2 },
  { x: 276, y: 5, phase: 3.5 },
  { x: 288, y: 8, phase: 1.3 },
  { x: 300, y: 6, phase: 2.6 },
  { x: 220, y: 36, phase: 0.5 },
  { x: 230, y: 37, phase: 1.8 },
  { x: 242, y: 36, phase: 3.0 },
  { x: 254, y: 37, phase: 1.0 },
  { x: 264, y: 36, phase: 2.3 },
];

function px(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string
): void {
  ctx.fillStyle = color;
  ctx.fillRect(x | 0, y | 0, 1, 1);
}

function rect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
): void {
  if (w <= 0 || h <= 0) return;
  ctx.fillStyle = color;
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
}

function drawPixelLine(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color: string
): void {
  let cx = Math.round(x0);
  let cy = Math.round(y0);
  const tx = Math.round(x1);
  const ty = Math.round(y1);
  const dx = Math.abs(tx - cx);
  const dy = Math.abs(ty - cy);
  const sx = cx < tx ? 1 : -1;
  const sy = cy < ty ? 1 : -1;
  let err = dx - dy;

  ctx.fillStyle = color;
  while (true) {
    ctx.fillRect(cx, cy, 1, 1);
    if (cx === tx && cy === ty) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      cx += sx;
    }
    if (e2 < dx) {
      err += dx;
      cy += sy;
    }
  }
}

function drawMatrix(
  ctx: CanvasRenderingContext2D,
  matrix: readonly string[],
  colors: Record<string, string | undefined>,
  ox: number,
  oy: number,
  clipMinX?: number,
  clipMinY?: number,
  clipMaxX?: number,
  clipMaxY?: number
): void {
  for (let row = 0; row < matrix.length; row += 1) {
    const line = matrix[row];
    const py = oy + row;
    if (clipMinY !== undefined && py < clipMinY) continue;
    if (clipMaxY !== undefined && py >= clipMaxY) continue;
    for (let col = 0; col < line.length; col += 1) {
      const ch = line[col];
      if (ch === '.' || ch === ' ') continue;
      const color = colors[ch];
      if (!color) continue;
      const pxCoord = ox + col;
      if (clipMinX !== undefined && pxCoord < clipMinX) continue;
      if (clipMaxX !== undefined && pxCoord >= clipMaxX) continue;
      ctx.fillStyle = color;
      ctx.fillRect(pxCoord, py, 1, 1);
    }
  }
}

function drawDitherBand(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  density: number
): void {
  ctx.fillStyle = color;
  const threshold = Math.round(density * 4);
  for (let row = 0; row < h; row += 1) {
    const py = y + row;
    for (let col = 0; col < w; col += 1) {
      const pxCoord = x + col;
      if (BAYER_2X2[py & 1][pxCoord & 1] < threshold) {
        ctx.fillRect(pxCoord, py, 1, 1);
      }
    }
  }
}

function drawBackWall(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  rect(ctx, 0, 0, ROOM_WIDTH, 55, palette.wallMid);
  rect(ctx, 0, 0, ROOM_WIDTH, 2, palette.wallCeilingShade);
  drawDitherBand(ctx, 0, 2, ROOM_WIDTH, 2, palette.wallCeilingShade, 0.5);
  rect(ctx, 56, 4, 208, 49, palette.wallLight);
  drawDitherBand(ctx, 40, 4, 16, 49, palette.wallLight, 0.5);
  drawDitherBand(ctx, 264, 4, 16, 49, palette.wallLight, 0.5);
  rect(ctx, 0, 2, 16, 52, palette.wallShadow);
  drawDitherBand(ctx, 16, 2, 10, 52, palette.wallShadow, 0.5);
  rect(ctx, 304, 2, 16, 52, palette.wallShadow);
  drawDitherBand(ctx, 294, 2, 10, 52, palette.wallShadow, 0.5);

  rect(ctx, 0, 0, 2, 55, palette.inkWood);
  rect(ctx, ROOM_WIDTH - 2, 0, 2, 55, palette.inkWood);

  for (let x = 22; x < 300; x += 15) {
    const y = 11 + ((x * 7) % 34);
    px(ctx, x, y, x > 56 && x < 264 ? palette.wallPlasterSpeck : palette.wallLight);
    if (x % 30 === 0) {
      px(ctx, x + 5, y + 7, palette.wallShadow);
      px(ctx, x + 6, y + 7, palette.wallPlasterSpeck);
    }
  }

  rect(ctx, 0, 53, ROOM_WIDTH, 1, palette.woodRimGlow);
  rect(ctx, 0, 54, ROOM_WIDTH, 1, palette.wainscotHighlight);
  rect(ctx, 0, 55, ROOM_WIDTH, 1, palette.inkWood);
  rect(ctx, 0, 56, ROOM_WIDTH, 6, palette.wainscotMid);

  for (let x = 0; x < ROOM_WIDTH; x += 16) {
    rect(ctx, x, 56, 1, 6, palette.wainscotHighlight);
    rect(ctx, x + 2, 57, 12, 4, palette.wainscotMolding);
    rect(ctx, x + 2, 57, 12, 1, palette.wainscotShadow);
    rect(ctx, x + 2, 57, 1, 4, palette.wainscotShadow);
    rect(ctx, x + 3, 60, 11, 1, palette.wainscotHighlight);
    rect(ctx, x + 13, 58, 1, 3, palette.wainscotHighlight);
    rect(ctx, x + 15, 56, 1, 6, palette.wainscotShadow);
  }

  rect(ctx, 0, 62, ROOM_WIDTH, 1, palette.baseboardTrim);
  rect(ctx, 0, 63, ROOM_WIDTH, 1, palette.inkWood);
}

function drawFairyStringSegment(
  ctx: CanvasRenderingContext2D,
  x0: number,
  x1: number,
  baseY: number,
  dip: number,
  color: string
): void {
  const span = Math.max(1, x1 - x0);
  ctx.fillStyle = color;
  for (let x = x0; x <= x1; x += 1) {
    const t = (x - x0) / span;
    const scallop = Math.sin(t * Math.PI * (span / 22));
    const py = Math.round(baseY + Math.abs(scallop) * dip);
    ctx.fillRect(x, py, 1, 1);
  }
}

function drawFairyLights(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState,
  timeSec: number
): void {
  drawFairyStringSegment(ctx, 12, 68, 4, 3, palette.fairyWire);
  drawFairyStringSegment(ctx, 154, 304, 4, 3, palette.fairyWire);
  drawFairyStringSegment(ctx, 217, 267, 34, 2.5, palette.fairyWire);

  const isLit = timeState === 'late_night';
  for (let i = 0; i < FAIRY_BULBS.length; i += 1) {
    const bulb = FAIRY_BULBS[i];
    px(ctx, bulb.x, bulb.y - 1, palette.fairyWire);
    if (isLit) {
      const pulse = 0.55 + 0.45 * Math.sin(timeSec * 2.3 + bulb.phase);
      px(ctx, bulb.x, bulb.y, pulse > 0.62 ? palette.fairyBulbCore : palette.fairyBulbWarm);
      px(ctx, bulb.x, bulb.y + 1, palette.fairyBulbWarm);
    } else {
      px(ctx, bulb.x, bulb.y, palette.fairyBulbCore);
    }
  }
}

function drawFloorPlanks(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState
): void {
  rect(ctx, 0, 64, ROOM_WIDTH, ROOM_HEIGHT - 64, palette.floorMid);

  const plankHeight = 8;
  const showSunReflect = timeState === 'waking' || timeState === 'working';

  for (let rowIdx = 0; rowIdx < 15; rowIdx += 1) {
    const py = 64 + rowIdx * plankHeight;
    const h = Math.min(plankHeight, ROOM_HEIGHT - py);
    if (h <= 0) break;

    rect(ctx, 0, py, ROOM_WIDTH, 1, palette.floorSeam);
    if (h > 1) {
      rect(ctx, 0, py + 1, ROOM_WIDTH, 1, palette.floorHighlight);
    }
    if (h > 6) {
      rect(ctx, 0, py + h - 1, ROOM_WIDTH, 1, palette.floorShadow);
    }

    const seamShift = (rowIdx * 29 + 11) % 48;
    for (let sx = seamShift; sx < ROOM_WIDTH; sx += 48) {
      rect(ctx, sx, py, 1, h, palette.floorSeam);
      if (sx + 1 < ROOM_WIDTH && h > 2) {
        rect(ctx, sx + 1, py + 1, 1, h - 2, palette.floorHighlight);
        px(ctx, sx + 2, py + 2, palette.floorSeam);
        px(ctx, sx + 2, py + h - 2, palette.floorSeam);
      }
      const grainOffset = (sx * 13 + rowIdx * 17) % 24;
      const grainX = sx + 6 + grainOffset;
      if (grainX + 9 < ROOM_WIDTH && h > 4) {
        rect(ctx, grainX, py + 3, 7, 1, palette.floorGrain);
        rect(ctx, grainX + 2, py + 5, 5, 1, palette.floorGrain);
        if (showSunReflect && grainX >= 84 && grainX <= 164 && py >= 78 && py <= 160) {
          rect(ctx, grainX + 1, py + 1, 5, 1, palette.floorRimReflect);
        }
      }
      if ((rowIdx + sx) % 5 === 0 && sx + 17 < ROOM_WIDTH && h > 5) {
        px(ctx, sx + 14, py + 4, palette.floorSeam);
        px(ctx, sx + 15, py + 4, palette.floorShadow);
        px(ctx, sx + 16, py + 4, palette.floorShadow);
        px(ctx, sx + 14, py + 3, palette.floorHighlight);
      }
    }
  }

  for (let rx = 122; rx < 226; rx += 9) {
    if (rx % 18 === 0) {
      rect(ctx, rx, 111, 4, 1, palette.floorRimReflect);
    }
  }

  rect(ctx, 0, 64, ROOM_WIDTH, 1, palette.wallFloorAo);
  drawDitherBand(ctx, 0, 65, ROOM_WIDTH, 1, palette.wallFloorAo, 0.75);
  drawDitherBand(ctx, 0, 66, ROOM_WIDTH, 1, palette.wallFloorAo, 0.5);
  drawDitherBand(ctx, 0, 67, ROOM_WIDTH, 1, palette.wallFloorAo, 0.25);

  drawDitherBand(ctx, 0, 64, 5, ROOM_HEIGHT - 64, palette.aoColor, 0.3);
  drawDitherBand(ctx, ROOM_WIDTH - 5, 64, 5, ROOM_HEIGHT - 64, palette.aoColor, 0.3);
}

function drawWindowSky(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState,
  timeSec: number,
  skyX: number,
  skyY: number,
  skyW: number,
  skyH: number
): void {
  if (timeState === 'late_night') {
    rect(ctx, skyX, skyY, skyW, 6, palette.skyTop);
    drawDitherBand(ctx, skyX, skyY + 5, skyW, 2, palette.skyMid, 0.5);
    rect(ctx, skyX, skyY + 7, skyW, 6, palette.skyMid);
    drawDitherBand(ctx, skyX, skyY + 12, skyW, 2, palette.skySunsetUpper, 0.5);
    rect(ctx, skyX, skyY + 14, skyW, 6, palette.skySunsetUpper);
    drawDitherBand(ctx, skyX, skyY + 19, skyW, 2, palette.skySunsetLower, 0.5);
    rect(ctx, skyX, skyY + 21, skyW, 6, palette.skySunsetLower);
    drawDitherBand(ctx, skyX, skyY + 26, skyW, 2, palette.skyHorizon, 0.5);
    rect(ctx, skyX, skyY + 28, skyW, 4, palette.skyHorizon);
  } else {
    rect(ctx, skyX, skyY, skyW, 10, palette.skyTop);
    drawDitherBand(ctx, skyX, skyY + 9, skyW, 2, palette.skyMid, 0.5);
    rect(ctx, skyX, skyY + 11, skyW, 11, palette.skyMid);
    drawDitherBand(ctx, skyX, skyY + 21, skyW, 2, palette.skyHorizon, 0.5);
    rect(ctx, skyX, skyY + 23, skyW, 9, palette.skyHorizon);
  }

  if (timeState === 'sleeping') {
    drawDitherBand(ctx, 119, 16, 11, 11, palette.moonShadow, 0.25);
    drawMatrix(
      ctx,
      CRESCENT_MOON_MATRIX,
      {
        m: palette.moonColor,
        s: palette.moonShadow,
      },
      121,
      18,
      skyX,
      skyY,
      skyX + skyW,
      skyY + skyH
    );

    const nightStars: readonly [number, number][] = [
      [91, 18],
      [105, 20],
      [94, 27],
      [116, 25],
      [134, 26],
      [109, 34],
    ];
    for (const [sx, sy] of nightStars) {
      px(ctx, sx, sy, palette.moonColor);
    }

    const starCycle = timeSec % 8.0;
    if (starCycle >= 1.2 && starCycle < 1.85) {
      const progress = (starCycle - 1.2) / 0.65;
      const headX = Math.round(112 - progress * 22);
      const headY = Math.round(15 + progress * 12);
      for (let t = 0; t < 5; t += 1) {
        const tx = headX + t * 2;
        const ty = headY - t;
        if (tx >= skyX && tx < skyX + skyW && ty >= skyY && ty < skyY + skyH) {
          px(ctx, tx, ty, t === 0 ? palette.shootingStarCore : palette.shootingStarTrail);
        }
      }
    }

    const sleepCloudX = skyX - 10 + Math.floor((timeSec * 0.8 + 18) % (skyW + 18));
    drawMatrix(
      ctx,
      CLOUD_WISP_MATRIX,
      { h: palette.cloudHighlight, s: palette.cloudShadow },
      sleepCloudX,
      29,
      skyX,
      skyY,
      skyX + skyW,
      skyY + skyH
    );
  } else if (timeState === 'late_night') {
    const duskStars: readonly [number, number][] = [
      [92, 16],
      [106, 19],
      [126, 17],
      [133, 21],
    ];
    for (const [sx, sy] of duskStars) {
      px(ctx, sx, sy, palette.moonColor);
    }

    const duskFarX = skyX - 10 + Math.floor((timeSec * 1.1 + 10) % (skyW + 18));
    const duskNearX = skyX - 12 + Math.floor((timeSec * 2.0 + 36) % (skyW + 22));
    drawMatrix(
      ctx,
      CLOUD_WISP_MATRIX,
      { h: palette.cloudHighlight, s: palette.cloudShadow },
      duskFarX,
      22,
      skyX,
      skyY,
      skyX + skyW,
      skyY + skyH
    );
    drawMatrix(
      ctx,
      CLOUD_SMALL_MATRIX,
      { h: palette.cloudHighlight, s: palette.cloudShadow },
      duskNearX,
      26,
      skyX,
      skyY,
      skyX + skyW,
      skyY + skyH
    );
  } else {
    const farCloudX = skyX - 10 + Math.floor((timeSec * 1.1 + 12) % (skyW + 18));
    const nearCloudX = skyX - 12 + Math.floor((timeSec * 2.25 + 42) % (skyW + 24));
    const midCloudX = skyX - 10 + Math.floor((timeSec * 1.55 + 26) % (skyW + 20));
    drawMatrix(
      ctx,
      CLOUD_WISP_MATRIX,
      { h: palette.cloudHighlight, s: palette.cloudShadow },
      farCloudX,
      16,
      skyX,
      skyY,
      skyX + skyW,
      skyY + skyH
    );
    drawMatrix(
      ctx,
      CLOUD_LARGE_MATRIX,
      { h: palette.cloudHighlight, s: palette.cloudShadow },
      nearCloudX,
      20,
      skyX,
      skyY,
      skyX + skyW,
      skyY + skyH
    );
    drawMatrix(
      ctx,
      CLOUD_SMALL_MATRIX,
      { h: palette.cloudHighlight, s: palette.cloudShadow },
      midCloudX,
      27,
      skyX,
      skyY,
      skyX + skyW,
      skyY + skyH
    );

    const birdCycle = timeSec % 11.5;
    if (birdCycle < 5.6) {
      const wingUp = Math.floor(timeSec * 4.5) % 2 === 0;
      const birds: readonly [number, number][] = [
        [Math.round(skyX - 3 + birdCycle * 10), Math.round(19 + Math.sin(birdCycle * 2.1) * 1.5)],
        [Math.round(skyX - 9 + birdCycle * 9.5), Math.round(23 + Math.cos(birdCycle * 1.8) * 1.2)],
      ];
      for (const [bx, by] of birds) {
        if (bx >= skyX && bx + 2 < skyX + skyW && by >= skyY && by + 1 < skyY + skyH) {
          if (wingUp) {
            px(ctx, bx, by, palette.birdSilhouette);
            px(ctx, bx + 1, by + 1, palette.birdSilhouette);
            px(ctx, bx + 2, by, palette.birdSilhouette);
          } else {
            px(ctx, bx, by + 1, palette.birdSilhouette);
            px(ctx, bx + 1, by, palette.birdSilhouette);
            px(ctx, bx + 2, by + 1, palette.birdSilhouette);
          }
        }
      }
    }
  }

  rect(ctx, skyX, 41, skyW, 5, palette.skyTreeFar);
  const farPeaks: readonly [number, number, number][] = [
    [87, 39, 8],
    [101, 38, 10],
    [117, 39, 9],
    [129, 38, 9],
  ];
  for (const [fx, fy, fw] of farPeaks) {
    rect(ctx, fx, fy, fw, 3, palette.skyTreeFar);
  }

  const nearClusters: readonly { x: number; w: number; topY: number; phase: number }[] = [
    { x: 86, w: 12, topY: 39, phase: 0.0 },
    { x: 99, w: 9, topY: 40, phase: 1.4 },
    { x: 112, w: 11, topY: 38, phase: 2.7 },
    { x: 125, w: 13, topY: 37, phase: 0.9 },
  ];
  for (const tree of nearClusters) {
    const sway = Math.round(Math.sin(timeSec * 1.35 + tree.phase) * 0.65);
    const crownX = Math.max(skyX, Math.min(skyX + skyW - tree.w, tree.x + sway));
    rect(ctx, tree.x, tree.topY + 3, tree.w, 46 - (tree.topY + 3), palette.skyTreeNear);
    rect(ctx, crownX + 2, tree.topY, tree.w - 4, 2, palette.skyTreeNear);
    rect(ctx, crownX + 1, tree.topY + 2, tree.w - 2, 2, palette.skyTreeNear);
  }
}

function drawWindow(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState,
  timeSec: number
): void {
  drawDitherBand(ctx, 75, 11, 75, 43, palette.wallShadow, 0.5);
  rect(ctx, 82, 11, 60, 38, palette.inkWood);
  rect(ctx, 83, 12, 58, 35, palette.woodMid);
  rect(ctx, 83, 12, 58, 1, palette.woodHighlight);
  rect(ctx, 83, 12, 1, 35, palette.woodHighlight);

  const skyX = 86;
  const skyY = 14;
  const skyW = 52;
  const skyH = 32;

  drawWindowSky(ctx, palette, timeState, timeSec, skyX, skyY, skyW, skyH);

  ctx.save();
  ctx.globalAlpha = 0.24;
  px(ctx, 90, 17, palette.windowGlassGlare);
  px(ctx, 91, 16, palette.windowGlassGlare);
  px(ctx, 89, 18, palette.windowGlassGlare);
  px(ctx, 130, 34, palette.windowGlassGlare);
  px(ctx, 131, 33, palette.windowGlassGlare);
  px(ctx, 129, 35, palette.windowGlassGlare);
  ctx.restore();

  rect(ctx, 85, 13, 54, 1, palette.woodDeep);
  rect(ctx, 85, 13, 1, 34, palette.woodDeep);
  rect(ctx, 138, 13, 1, 34, palette.woodShadow);
  rect(ctx, 111, 14, 1, 32, palette.woodShadow);
  rect(ctx, 112, 14, 1, 32, palette.woodHighlight);
  rect(ctx, 86, 29, 52, 1, palette.woodShadow);
  rect(ctx, 86, 30, 52, 1, palette.woodHighlight);

  rect(ctx, 78, 47, 68, 4, palette.inkWood);
  rect(ctx, 79, 47, 66, 1, palette.woodRimGlow);
  rect(ctx, 79, 48, 66, 1, palette.woodHighlight);
  rect(ctx, 79, 49, 66, 1, palette.woodMid);
  rect(ctx, 79, 50, 66, 1, palette.woodShadow);
  drawDitherBand(ctx, 79, 51, 66, 2, palette.wallShadow, 0.55);

  rect(ctx, 74, 8, 76, 2, palette.inkWood);
  rect(ctx, 75, 8, 74, 1, palette.woodHighlight);
  rect(ctx, 74, 7, 2, 4, palette.woodMid);
  rect(ctx, 148, 7, 2, 4, palette.woodMid);

  drawCurtainSide(ctx, palette, 76, 10, true, timeSec);
  drawCurtainSide(ctx, palette, 138, 10, false, timeSec);
}

function drawCurtainSide(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  x: number,
  y: number,
  isLeft: boolean,
  timeSec: number
): void {
  const w = 10;
  const h = 40;

  for (let row = 0; row < h; row += 1) {
    const py = y + row;
    const isTieBand = row >= 22 && row <= 24;
    const innerPinch = isTieBand ? 2 : row > 18 && row < 27 ? 1 : 0;
    const sway =
      row > 26
        ? Math.round(Math.sin(timeSec * 1.35 + row * 0.22 + (isLeft ? 0 : 1.2)) * 0.55)
        : 0;

    const rawStart = isLeft ? 1 : 1 + innerPinch + sway;
    const rawEnd = isLeft ? w - 1 - innerPinch + sway : w - 1;
    const startCol = Math.max(1, Math.min(w - 3, rawStart));
    const endCol = Math.max(startCol + 2, Math.min(w - 1, rawEnd));

    if (row === 0 || row === h - 1) {
      rect(ctx, x + startCol - 1, py, endCol - startCol + 2, 1, palette.inkIndigo);
      continue;
    }

    px(ctx, x + startCol - 1, py, palette.inkIndigo);
    px(ctx, x + endCol, py, palette.inkIndigo);

    for (let col = startCol; col < endCol; col += 1) {
      const pxCoord = x + col;
      if (isTieBand) {
        ctx.fillStyle = row === 22 ? palette.curtainHighlight : palette.curtainFold;
        ctx.fillRect(pxCoord, py, 1, 1);
        continue;
      }
      const pleat = col % 3;
      if (pleat === 1) {
        ctx.fillStyle = row < 6 ? palette.curtainHighlight : palette.curtainMid;
      } else if (pleat === 2) {
        ctx.fillStyle = row > 30 ? palette.curtainShadow : palette.curtainHighlight;
      } else {
        ctx.fillStyle = palette.curtainShadow;
      }
      if (row >= h - 3) {
        ctx.fillStyle = col % 2 === 0 ? palette.curtainFold : palette.curtainShadow;
      }
      ctx.fillRect(pxCoord, py, 1, 1);
    }
  }
}

function drawHoloCardFrame(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeSec: number
): void {
  const x = 162;
  const y = 13;
  drawDitherBand(ctx, x + 1, y + 1, 16, 22, palette.wallShadow, 0.5);
  rect(ctx, x, y, 16, 22, palette.inkIndigo);
  rect(ctx, x + 1, y + 1, 14, 20, palette.cardIndigo);
  rect(ctx, x + 1, y + 1, 14, 1, palette.cardGold);
  rect(ctx, x + 1, y + 1, 1, 20, palette.cardGold);
  rect(ctx, x + 2, y + 2, 12, 18, palette.cardGold);
  rect(ctx, x + 3, y + 3, 10, 16, '#F5E7BC');

  rect(ctx, x + 4, y + 4, 8, 7, '#2A3F6E');
  rect(ctx, x + 5, y + 5, 6, 5, '#4A82B5');

  const phase = Math.floor(timeSec * 4.5) % 12;
  for (let row = 0; row < 7; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      if ((col + row) % 10 === phase % 10) {
        px(
          ctx,
          x + 4 + col,
          y + 4 + row,
          (col + row) % 2 === 0 ? palette.cardHoloA : palette.cardHoloB
        );
      }
    }
  }

  px(ctx, x + 7, y + 6, '#FFE45E');
  px(ctx, x + 8, y + 6, '#FFE45E');
  px(ctx, x + 6, y + 7, '#FFE45E');
  px(ctx, x + 7, y + 7, '#FFF7B8');
  px(ctx, x + 8, y + 7, '#FFE45E');
  px(ctx, x + 9, y + 7, '#D9534F');
  px(ctx, x + 7, y + 8, '#FFE45E');
  px(ctx, x + 8, y + 8, '#FFE45E');

  rect(ctx, x + 4, y + 13, 8, 1, '#5A617A');
  rect(ctx, x + 4, y + 15, 6, 1, '#7982A3');
  rect(ctx, x + 4, y + 17, 7, 1, '#7982A3');
}

function drawWallClock(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState,
  timeSec: number
): void {
  const cx = 195;
  const cy = 25;
  const x = 186;
  const y = 16;

  drawDitherBand(ctx, x + 3, y + 2, 14, 15, palette.wallShadow, 0.5);

  const mask: readonly string[] = [
    '.....oooooooo.....',
    '...ooRRRRRRRRoo...',
    '..oRRFFFFFFFFRRo..',
    '.oRFFFFFFFFFFFRRo.',
    '.oRFFFFFFFFFFFFRo.',
    'oRFFFFFFFFFFFFFFRo',
    'oRFFFFFFFFFFFFFFRo',
    'oRFFFFFFFFFFFFFFRo',
    'oRFFFFFFFFFFFFFFRo',
    'oRFFFFFFFFFFFFFFRo',
    'oRFFFFFFFFFFFFFFRo',
    'oRFFFFFFFFFFFFFFRo',
    'oRFFFFFFFFFFFFFFRo',
    '.oRFFFFFFFFFFFFRo.',
    '.oRFFDDDDDDDDFFRo.',
    '..oRRDDDDDDDDRRo..',
    '...ooRRRRRRRRoo...',
    '.....oooooooo.....',
  ];

  drawMatrix(
    ctx,
    mask,
    {
      o: palette.inkWood,
      R: palette.clockRim,
      F: palette.clockFace,
      D: palette.woodShadow,
    },
    x,
    y
  );

  px(ctx, cx, y + 3, palette.clockHand);
  px(ctx, cx, y + 14, palette.clockHand);
  px(ctx, x + 3, cy, palette.clockHand);
  px(ctx, x + 14, cy, palette.clockHand);

  const baseHours: Record<RoomTimeState, number> = {
    waking: 7.5,
    working: 10.2,
    late_night: 21.75,
    sleeping: 1.5,
  };
  const hVal = baseHours[timeState];
  const hourAngle = ((hVal % 12) / 12) * Math.PI * 2 - Math.PI / 2;
  const minAngle =
    (((hVal * 60) % 60) / 60 + timeSec / 600) * Math.PI * 2 - Math.PI / 2;
  const secAngle = ((timeSec % 60) / 60) * Math.PI * 2 - Math.PI / 2;

  drawPixelLine(
    ctx,
    cx,
    cy,
    cx + Math.round(Math.cos(hourAngle) * 3),
    cy + Math.round(Math.sin(hourAngle) * 3),
    palette.clockHand
  );
  drawPixelLine(
    ctx,
    cx,
    cy,
    cx + Math.round(Math.cos(minAngle) * 4.6),
    cy + Math.round(Math.sin(minAngle) * 4.6),
    palette.clockHand
  );
  drawPixelLine(
    ctx,
    cx,
    cy,
    cx + Math.round(Math.cos(secAngle) * 5.1),
    cy + Math.round(Math.sin(secAngle) * 5.1),
    palette.clockSecondHand
  );

  px(ctx, cx, cy, palette.cardGold);
}

function drawDisplayShelfAndPlant(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeSec: number
): void {
  drawDitherBand(ctx, 213, 33, 82, 46, palette.wallShadow, 0.45);
  rect(ctx, 214, 78, 81, 2, palette.aoColor);
  drawDitherBand(ctx, 213, 80, 82, 2, palette.aoColor, 0.5);

  rect(ctx, 214, 33, 56, 45, palette.inkWood);
  rect(ctx, 215, 34, 54, 2, palette.woodHighlight);
  rect(ctx, 215, 36, 54, 1, palette.woodShadow);
  rect(ctx, 215, 37, 54, 37, palette.woodDeep);

  rect(ctx, 217, 38, 50, 16, palette.woodDeep);
  rect(ctx, 217, 38, 50, 1, palette.inkWood);

  const upperBooks: readonly { x: number; w: number; h: number; body: string; light: string }[] = [
    { x: 218, w: 4, h: 13, body: '#C84B47', light: '#E67A72' },
    { x: 222, w: 3, h: 14, body: '#4C76B8', light: '#7BA3DC' },
    { x: 225, w: 4, h: 12, body: '#DFAC47', light: '#F4CE74' },
    { x: 229, w: 3, h: 13, body: '#4D9165', light: '#78BC8E' },
    { x: 232, w: 4, h: 14, body: '#D9CBB4', light: '#F3EAD9' },
    { x: 236, w: 3, h: 11, body: '#9B5F8F', light: '#C086B4' },
    { x: 239, w: 4, h: 13, body: '#4C8B96', light: '#7AB9C4' },
  ];
  for (const book of upperBooks) {
    const by = 54 - book.h;
    rect(ctx, book.x, by, book.w, book.h, book.body);
    rect(ctx, book.x, by, 1, book.h, book.light);
    rect(ctx, book.x + book.w - 1, by, 1, book.h, palette.inkWood);
    px(ctx, book.x + 1, by + 3, palette.cubCream);
  }

  rect(ctx, 246, 43, 18, 11, '#2D3A54');
  rect(ctx, 247, 44, 16, 9, '#48608B');
  rect(ctx, 249, 46, 12, 4, '#88C8DC');
  px(ctx, 250, 51, '#E67A72');
  px(ctx, 259, 51, '#F4CE74');

  rect(ctx, 215, 54, 54, 1, palette.woodHighlight);
  rect(ctx, 215, 55, 54, 2, palette.woodMid);
  rect(ctx, 215, 57, 54, 1, palette.woodShadow);

  rect(ctx, 217, 58, 50, 16, palette.woodDeep);
  rect(ctx, 219, 70, 20, 4, '#4C76B8');
  rect(ctx, 220, 71, 18, 1, '#7BA3DC');
  rect(ctx, 220, 66, 18, 4, '#C84B47');
  rect(ctx, 221, 67, 16, 1, '#E67A72');
  rect(ctx, 222, 63, 14, 3, '#DFAC47');

  rect(ctx, 242, 61, 4, 13, '#4D9165');
  rect(ctx, 242, 61, 1, 13, '#78BC8E');
  rect(ctx, 246, 62, 4, 12, '#D9CBB4');
  rect(ctx, 246, 62, 1, 12, '#F3EAD9');
  rect(ctx, 252, 65, 13, 9, palette.woodMid);
  rect(ctx, 253, 66, 11, 7, palette.woodShadow);
  rect(ctx, 256, 68, 5, 2, palette.cubCream);

  rect(ctx, 215, 74, 54, 2, palette.woodMid);
  rect(ctx, 215, 76, 54, 1, palette.woodShadow);
  rect(ctx, 216, 77, 4, 1, palette.inkWood);
  rect(ctx, 263, 77, 4, 1, palette.inkWood);

  rect(ctx, 218, 22, 3, 11, '#4C76B8');
  rect(ctx, 218, 22, 1, 11, '#7BA3DC');
  rect(ctx, 221, 20, 4, 13, '#C84B47');
  rect(ctx, 221, 20, 1, 13, '#E67A72');
  rect(ctx, 225, 23, 3, 10, '#DFAC47');
  rect(ctx, 225, 23, 1, 10, '#F4CE74');

  rect(ctx, 231, 25, 7, 8, palette.inkWood);
  rect(ctx, 232, 26, 5, 6, palette.mugLight);
  rect(ctx, 234, 26, 3, 6, palette.mugShadow);
  px(ctx, 233, 23, '#C84B47');
  px(ctx, 235, 22, '#DFAC47');
  px(ctx, 236, 24, '#4C76B8');

  rect(ctx, 244, 33, 5, 1, palette.woodShadow);
  rect(ctx, 260, 33, 5, 1, palette.woodShadow);
  drawMatrix(
    ctx,
    HONDA_CUB_MATRIX,
    {
      o: palette.inkOutline,
      G: palette.cubGreenMid,
      L: palette.cubGreenLight,
      D: palette.cubGreenShadow,
      C: palette.cubCream,
      S: palette.cubSeat,
      H: '#DCE5EF',
      Y: '#FFF2A6',
      R: '#CC5548',
      T: '#2B252E',
      M: '#9AA4B8',
    },
    243,
    21
  );

  rect(ctx, 270, 49, 24, 29, palette.inkWood);
  rect(ctx, 271, 50, 22, 2, palette.woodHighlight);
  rect(ctx, 271, 52, 22, 1, palette.woodShadow);
  rect(ctx, 271, 53, 22, 10, palette.woodMid);
  rect(ctx, 272, 54, 20, 8, palette.woodHighlight);
  rect(ctx, 272, 56, 20, 6, palette.woodMid);
  rect(ctx, 279, 57, 6, 2, palette.cardGold);

  rect(ctx, 271, 64, 22, 10, palette.woodMid);
  rect(ctx, 272, 65, 20, 8, palette.woodHighlight);
  rect(ctx, 272, 67, 20, 6, palette.woodMid);
  rect(ctx, 279, 68, 6, 2, palette.cardGold);
  rect(ctx, 271, 74, 22, 3, palette.woodShadow);

  const plantColors: Record<string, string | undefined> = {
    o: palette.inkOutline,
    L: palette.leafLight,
    M: palette.leafMid,
    D: palette.leafShadow,
    B: '#3A2822',
    R: palette.potLight,
    P: palette.potMid,
    T: palette.potShadow,
  };

  for (let row = 0; row < PLANT_MATRIX.length; row += 1) {
    const line = PLANT_MATRIX[row];
    const py = 20 + row;
    const swayOffset =
      row < 15
        ? Math.round(Math.sin(timeSec * 1.45 + row * 0.25) * (row < 7 ? 0.72 : 0.48))
        : 0;
    for (let col = 0; col < line.length; col += 1) {
      const ch = line[col];
      if (ch === '.' || ch === ' ') continue;
      const color = plantColors[ch];
      if (!color) continue;
      px(ctx, 270 + col + swayOffset, py, color);
    }
  }
}

export function drawBedBase(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  rect(ctx, 13, 152, 58, 2, palette.aoColor);
  drawDitherBand(ctx, 13, 154, 59, 2, palette.aoColor, 0.5);
  drawDitherBand(ctx, 70, 78, 3, 74, palette.aoColor, 0.5);

  rect(ctx, 14, 74, 56, 78, palette.inkWood);

  rect(ctx, 15, 75, 4, 15, palette.woodMid);
  rect(ctx, 16, 75, 2, 14, palette.woodHighlight);
  rect(ctx, 65, 75, 4, 15, palette.woodMid);
  rect(ctx, 66, 75, 2, 14, palette.woodHighlight);

  rect(ctx, 19, 76, 46, 12, palette.woodMid);
  rect(ctx, 19, 76, 46, 2, palette.woodHighlight);
  for (let sx = 24; sx <= 58; sx += 7) {
    rect(ctx, sx, 78, 1, 9, palette.woodShadow);
  }
  rect(ctx, 19, 86, 46, 2, palette.woodShadow);

  rect(ctx, 15, 88, 2, 58, palette.woodMid);
  rect(ctx, 67, 88, 2, 58, palette.woodShadow);

  rect(ctx, 17, 88, 50, 59, palette.sheetTrim);
  rect(ctx, 17, 88, 50, 1, palette.pillowShadow);

  rect(ctx, 20, 89, 42, 13, palette.inkOutline);
  rect(ctx, 21, 90, 40, 11, palette.pillowMid);
  rect(ctx, 22, 90, 38, 4, palette.pillowLight);
  rect(ctx, 21, 99, 40, 2, palette.pillowShadow);
  rect(ctx, 35, 93, 12, 2, palette.pillowShadow);
  px(ctx, 20, 89, palette.sheetTrim);
  px(ctx, 61, 89, palette.sheetTrim);
  px(ctx, 20, 101, palette.sheetTrim);
  px(ctx, 61, 101, palette.sheetTrim);

  rect(ctx, 15, 147, 54, 4, palette.woodMid);
  rect(ctx, 15, 147, 54, 1, palette.woodHighlight);
  rect(ctx, 15, 150, 54, 1, palette.woodShadow);
}

export function drawBedBlanket(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  breathOffset = 0
): void {
  const b = Math.max(-1, Math.min(0, Math.round(breathOffset))) || 0;
  const cuffTop = 103 + b;
  const quiltTop = 107 + b;
  const quiltBottom = 146;
  const quiltHeight = quiltBottom - quiltTop + 1;

  rect(ctx, 17, cuffTop, 50, 4, palette.sheetTrim);
  rect(ctx, 17, cuffTop + 3, 50, 1, palette.pillowShadow);

  rect(ctx, 16, quiltTop, 52, quiltHeight, palette.inkOutline);
  rect(ctx, 17, quiltTop + 1, 50, quiltHeight - 2, palette.quiltMid);
  rect(ctx, 17, quiltTop + 1, 50, 2, palette.quiltLight);

  const patternTop = quiltTop + 3;
  for (let qy = patternTop; qy < 145; qy += 1) {
    for (let qx = 18; qx < 66; qx += 1) {
      const gx = (qx - 18) >> 2;
      const gy = (qy - 110) >> 2;
      if (((gx + gy) & 1) === 0) {
        px(ctx, qx, qy, palette.quiltPattern);
      }
    }
  }

  rect(ctx, 17, quiltTop + 1, 2, quiltHeight - 2, palette.quiltShadow);
  rect(ctx, 65, quiltTop + 1, 2, quiltHeight - 2, palette.quiltShadow);

  rect(ctx, 18, 118, 48, 1, palette.quiltShadow);
  rect(ctx, 20, 119, 44, 1, palette.quiltLight);
  rect(ctx, 18, 128, 48, 1, palette.quiltShadow);
  rect(ctx, 20, 129, 44, 1, palette.quiltLight);
  rect(ctx, 18, 138, 48, 1, palette.quiltShadow);
  rect(ctx, 20, 139, 44, 1, palette.quiltLight);
  rect(ctx, 17, 144, 50, 2, palette.quiltShadow);
}

function drawWovenRug(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  drawDitherBand(ctx, 110, 156, 124, 2, palette.aoColor, 0.48);

  for (let fy = 116; fy <= 153; fy += 2) {
    const fLen = fy % 4 === 0 ? 3 : 2;
    rect(ctx, 111 - fLen, fy, fLen, 1, palette.rugFringe);
    px(ctx, 110, fy, palette.rugFringeShadow);
    rect(ctx, 233, fy, fLen, 1, palette.rugFringe);
    px(ctx, 233, fy, palette.rugFringeShadow);
  }

  rect(ctx, 111, 114, 122, 42, palette.inkOutline);
  rect(ctx, 112, 115, 120, 40, palette.rugBorder);
  rect(ctx, 112, 115, 120, 1, palette.rugBorderHighlight);
  rect(ctx, 112, 115, 1, 40, palette.rugBorderHighlight);
  rect(ctx, 112, 154, 120, 1, palette.rugShadow);

  rect(ctx, 115, 118, 114, 34, palette.rugBase);

  for (let ry = 118; ry < 152; ry += 1) {
    for (let rx = 115; rx < 229; rx += 1) {
      if (((rx + ry) & 3) === 0) {
        px(ctx, rx, ry, palette.rugMid);
      } else if (((rx - ry) & 7) === 0 && rx > 124 && rx < 220 && ry > 122 && ry < 148) {
        px(ctx, rx, ry, palette.rugPatternDark);
      }
    }
  }

  for (let tx = 117; tx < 227; tx += 3) {
    px(ctx, tx, 120, palette.rugAccent);
    px(ctx, tx, 149, palette.rugAccent);
  }
  for (let ty = 120; ty < 150; ty += 3) {
    px(ctx, 117, ty, palette.rugAccent);
    px(ctx, 226, ty, palette.rugAccent);
  }

  const corners: readonly [number, number][] = [
    [121, 124],
    [222, 124],
    [121, 145],
    [222, 145],
  ];
  for (const [cx, cy] of corners) {
    px(ctx, cx, cy - 2, palette.rugAccent);
    rect(ctx, cx - 1, cy - 1, 3, 1, palette.rugAccent);
    rect(ctx, cx - 2, cy, 5, 1, palette.rugBorderHighlight);
    rect(ctx, cx - 1, cy + 1, 3, 1, palette.rugAccent);
    px(ctx, cx, cy + 2, palette.rugAccent);
  }

  const midX = 172;
  const midY = 135;
  for (let dy = -6; dy <= 6; dy += 1) {
    const span = 6 - Math.abs(dy);
    rect(ctx, midX - span * 2, midY + dy, span * 4 + 1, 1, palette.rugMid);
    px(ctx, midX - span * 2, midY + dy, palette.rugBorder);
    px(ctx, midX + span * 2, midY + dy, palette.rugBorder);
  }
  rect(ctx, midX - 4, midY, 9, 1, palette.rugAccent);
  rect(ctx, midX - 2, midY - 1, 5, 3, palette.rugBorderHighlight);
  px(ctx, midX, midY, palette.rugPatternDark);
}

function drawDeskAndProps(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState
): void {
  drawDitherBand(ctx, 110, 107, 49, 5, palette.aoColor, 0.55);
  drawDitherBand(ctx, 187, 107, 57, 5, palette.aoColor, 0.55);
  drawDitherBand(ctx, 110, 112, 134, 2, palette.aoColor, 0.25);

  rect(ctx, 122, 97, 39, 3, palette.woodDeep);
  rect(ctx, 185, 97, 45, 3, palette.woodDeep);
  rect(ctx, 122, 100, 37, 5, palette.woodDeep);
  rect(ctx, 187, 100, 43, 5, palette.woodDeep);
  rect(ctx, 110, 97, 13, 15, palette.inkWood);
  rect(ctx, 111, 97, 11, 13, palette.woodShadow);
  rect(ctx, 112, 99, 9, 4, palette.woodMid);
  rect(ctx, 115, 101, 3, 1, palette.cardGold);
  rect(ctx, 112, 105, 9, 4, palette.woodMid);
  rect(ctx, 115, 107, 3, 1, palette.cardGold);

  rect(ctx, 229, 97, 13, 15, palette.inkWood);
  rect(ctx, 230, 97, 11, 13, palette.woodShadow);
  rect(ctx, 231, 99, 9, 4, palette.woodMid);
  rect(ctx, 234, 101, 3, 1, palette.cardGold);
  rect(ctx, 231, 105, 9, 4, palette.woodMid);
  rect(ctx, 234, 107, 3, 1, palette.cardGold);

  rect(ctx, 108, 72, 136, 26, palette.inkWood);
  rect(ctx, 109, 73, 134, 19, palette.woodMid);
  rect(ctx, 109, 73, 134, 1, palette.woodRimGlow);
  rect(ctx, 109, 74, 134, 1, palette.woodHighlight);
  rect(ctx, 109, 91, 134, 1, palette.woodHighlight);
  rect(ctx, 109, 92, 134, 5, palette.woodShadow);
  rect(ctx, 109, 92, 134, 1, palette.woodMid);
  px(ctx, 108, 72, palette.wallMid);
  px(ctx, 243, 72, palette.wallMid);

  for (let gx = 114; gx < 238; gx += 22) {
    rect(ctx, gx, 77, 11, 1, palette.woodShadow);
    rect(ctx, gx + 5, 86, 9, 1, palette.woodHighlight);
  }

  rect(ctx, 150, 79, 46, 11, palette.inkIndigo);
  rect(ctx, 151, 80, 44, 9, palette.deskPadDark);
  rect(ctx, 151, 80, 44, 1, palette.deskMatRim);
  rect(ctx, 151, 88, 44, 1, palette.deskPadLight);

  drawSpeaker(ctx, palette, 112, 58);
  drawSpeaker(ctx, palette, 206, 58);

  drawSideLaptop(ctx, palette, timeState);

  rect(ctx, 163, 76, 20, 3, palette.inkIndigo);
  rect(ctx, 164, 77, 18, 1, palette.chassisMid);
  rect(ctx, 169, 72, 8, 5, palette.inkIndigo);
  rect(ctx, 170, 72, 6, 5, palette.chassisShadow);

  rect(ctx, 151, 46, 44, 26, palette.inkIndigo);
  rect(ctx, 152, 47, 42, 24, palette.chassisMid);
  rect(ctx, 152, 47, 42, 1, palette.chassisRim);
  rect(ctx, 152, 47, 1, 24, palette.chassisLight);
  rect(ctx, 152, 70, 42, 1, palette.chassisShadow);
  px(ctx, 173, 47, palette.chassisShadow);
  px(ctx, 191, 70, timeState === 'sleeping' ? '#4ADE80' : '#67D97E');

  rect(ctx, 154, 48, 38, 21, palette.chassisShadow);
  rect(ctx, 155, 49, 36, 19, palette.screenOff);

  if (timeState !== 'sleeping') {
    rect(ctx, 152, 81, 30, 1, palette.keyboardGlow);
  }
  rect(ctx, 152, 82, 30, 6, palette.inkIndigo);
  rect(ctx, 153, 83, 28, 4, palette.chassisShadow);
  for (let kx = 154; kx <= 179; kx += 2) {
    px(ctx, kx, 83, kx === 154 ? '#E67A72' : palette.keycapLight);
    px(ctx, kx, 85, palette.keycapShadow);
  }
  rect(ctx, 160, 86, 14, 1, palette.keycapLight);

  rect(ctx, 184, 81, 11, 8, palette.inkIndigo);
  rect(ctx, 185, 82, 9, 6, palette.deskPadLight);
  rect(ctx, 187, 83, 6, 5, palette.inkIndigo);
  rect(ctx, 188, 84, 4, 3, palette.chassisLight);
  px(ctx, 189, 84, palette.chassisShadow);

  rect(ctx, 196, 86, 9, 2, palette.woodShadow);
  rect(ctx, 197, 86, 7, 1, palette.woodMid);
  rect(ctx, 203, 81, 3, 4, palette.inkOutline);
  px(ctx, 204, 82, palette.mugLight);
  px(ctx, 204, 83, palette.mugShadow);
  rect(ctx, 196, 79, 8, 7, palette.inkOutline);
  rect(ctx, 197, 80, 6, 5, palette.mugLight);
  rect(ctx, 201, 80, 2, 5, palette.mugShadow);
  rect(ctx, 197, 80, 6, 2, palette.coffeeSurface);

  drawDeskLamp(ctx, palette);
}

function drawSideLaptop(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState
): void {
  rect(ctx, 135, 61, 14, 12, palette.inkIndigo);
  rect(ctx, 136, 62, 12, 10, palette.laptopBodyShadow);
  rect(ctx, 136, 62, 12, 1, palette.laptopBodyLight);
  rect(ctx, 136, 62, 1, 10, palette.laptopBodyLight);
  rect(ctx, 136, 63, 11, 8, palette.screenOff);

  if (timeState !== 'sleeping') {
    rect(ctx, 137, 64, 5, 1, '#60A5FA');
    rect(ctx, 137, 66, 8, 1, '#94A3B8');
    rect(ctx, 137, 68, 6, 1, '#4ADE80');
  }

  rect(ctx, 134, 72, 15, 5, palette.inkIndigo);
  rect(ctx, 135, 73, 13, 3, palette.laptopBodyLight);
  rect(ctx, 136, 73, 11, 1, palette.chassisShadow);
  rect(ctx, 139, 75, 5, 1, palette.laptopBodyShadow);
}

function drawSpeaker(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  x: number,
  y: number
): void {
  rect(ctx, x, y + 24, 18, 1, palette.woodShadow);
  rect(ctx, x, y, 18, 24, palette.inkIndigo);
  rect(ctx, x + 1, y + 1, 16, 22, palette.chassisMid);
  rect(ctx, x + 1, y + 1, 16, 1, palette.chassisRim);
  rect(ctx, x + 1, y + 1, 1, 22, palette.chassisLight);
  rect(ctx, x + 2, y + 2, 14, 20, palette.chassisShadow);

  rect(ctx, x + 7, y + 4, 4, 4, palette.speakerConeDark);
  px(ctx, x + 8, y + 5, palette.speakerConeRim);
  px(ctx, x + 9, y + 5, palette.speakerConeRim);

  rect(ctx, x + 4, y + 9, 10, 10, palette.speakerConeRim);
  rect(ctx, x + 5, y + 10, 8, 8, palette.speakerConeDark);
  px(ctx, x + 4, y + 9, palette.chassisShadow);
  px(ctx, x + 13, y + 9, palette.chassisShadow);
  px(ctx, x + 4, y + 18, palette.chassisShadow);
  px(ctx, x + 13, y + 18, palette.chassisShadow);
  rect(ctx, x + 8, y + 13, 2, 2, palette.chassisLight);

  rect(ctx, x + 5, y + 20, 5, 1, palette.inkIndigo);
  px(ctx, x + 13, y + 20, '#5AD17A');
}

function drawDeskLamp(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  rect(ctx, 231, 79, 10, 6, palette.inkIndigo);
  rect(ctx, 232, 80, 8, 4, palette.chassisMid);
  rect(ctx, 232, 80, 8, 1, palette.chassisRim);
  px(ctx, 234, 81, palette.lampOn ? palette.lampBulbGlow : palette.chassisShadow);

  rect(ctx, 236, 70, 2, 10, palette.inkIndigo);
  rect(ctx, 237, 60, 2, 11, palette.inkIndigo);
  rect(ctx, 234, 54, 4, 7, palette.inkIndigo);
  rect(ctx, 237, 62, 1, 17, palette.chassisLight);
  rect(ctx, 235, 55, 2, 6, palette.chassisRim);

  rect(ctx, 226, 53, 11, 9, palette.inkIndigo);
  rect(ctx, 228, 54, 7, 2, palette.lampShadeLight);
  rect(ctx, 227, 56, 9, 3, palette.lampShadeMid);
  rect(ctx, 226, 59, 11, 2, palette.lampShadeShadow);

  if (palette.lampOn) {
    rect(ctx, 227, 60, 8, 2, palette.lampBulbGlow);
    rect(ctx, 228, 61, 5, 1, '#FFF9D6');
  } else {
    rect(ctx, 227, 60, 8, 1, palette.chassisShadow);
  }
}

function drawChairSeatBase(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  drawDitherBand(ctx, 161, 121, 24, 4, palette.aoColor, 0.5);

  rect(ctx, 172, 114, 2, 8, palette.inkIndigo);
  rect(ctx, 164, 119, 18, 2, palette.inkIndigo);
  rect(ctx, 165, 119, 16, 1, palette.chassisLight);
  rect(ctx, 162, 121, 3, 3, palette.inkIndigo);
  px(ctx, 163, 122, palette.chassisLight);
  rect(ctx, 171, 122, 4, 3, palette.inkIndigo);
  rect(ctx, 172, 123, 2, 1, palette.chassisLight);
  rect(ctx, 181, 121, 3, 3, palette.inkIndigo);
  px(ctx, 182, 122, palette.chassisLight);

  rect(ctx, 161, 96, 24, 10, palette.inkIndigo);
  rect(ctx, 162, 97, 22, 8, palette.chairShadow);
  rect(ctx, 162, 97, 22, 5, palette.chairMid);
  rect(ctx, 163, 97, 20, 2, palette.chairLight);

  rect(ctx, 159, 100, 3, 8, palette.inkIndigo);
  rect(ctx, 160, 101, 1, 6, palette.chairShadow);
  rect(ctx, 184, 100, 3, 8, palette.inkIndigo);
  rect(ctx, 185, 101, 1, 6, palette.chairShadow);
}

export function drawChairBackOverlay(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette
): void {
  rect(ctx, 163, 97, 20, 1, palette.inkIndigo);
  rect(ctx, 162, 98, 22, 1, palette.inkIndigo);
  rect(ctx, 163, 98, 20, 1, palette.chairLight);
  rect(ctx, 161, 99, 24, 13, palette.inkIndigo);
  rect(ctx, 162, 99, 22, 2, palette.chairLight);
  rect(ctx, 162, 101, 22, 8, palette.chairMid);
  rect(ctx, 162, 101, 1, 8, palette.chairLight);
  rect(ctx, 183, 101, 1, 8, palette.chairShadow);
  rect(ctx, 164, 101, 18, 1, palette.chairLight);
  rect(ctx, 165, 107, 16, 1, palette.chairShadow);
  rect(ctx, 162, 109, 22, 3, palette.chairShadow);
  rect(ctx, 164, 109, 18, 2, palette.chairMid);
  rect(ctx, 162, 112, 22, 1, palette.inkIndigo);
  rect(ctx, 163, 112, 20, 1, palette.chairShadow);
  rect(ctx, 163, 113, 20, 1, palette.inkIndigo);

  rect(ctx, 159, 98, 3, 10, palette.inkIndigo);
  rect(ctx, 160, 99, 1, 2, palette.chairLight);
  rect(ctx, 160, 101, 1, 5, palette.chairMid);
  px(ctx, 160, 106, palette.chairShadow);

  rect(ctx, 184, 98, 3, 10, palette.inkIndigo);
  rect(ctx, 185, 99, 1, 2, palette.chairLight);
  rect(ctx, 185, 101, 1, 5, palette.chairMid);
  px(ctx, 185, 106, palette.chairShadow);
}

export function drawRoomBaseLayer(
  ctx: CanvasRenderingContext2D,
  options: DrawRoomEnvironmentOptions
): void {
  const { timeState, tick, palette } = options;
  const timeSec = options.elapsedSec ?? tick / 15;

  ctx.clearRect(0, 0, ROOM_WIDTH, ROOM_HEIGHT);

  drawBackWall(ctx, palette);
  drawFloorPlanks(ctx, palette, timeState);
  drawWindow(ctx, palette, timeState, timeSec);
  drawHoloCardFrame(ctx, palette, timeSec);
  drawWallClock(ctx, palette, timeState, timeSec);
  drawWovenRug(ctx, palette);
  drawDisplayShelfAndPlant(ctx, palette, timeSec);
  drawFairyLights(ctx, palette, timeState, timeSec);
  drawBedBase(ctx, palette);
}

export function drawDeskAndChairBase(
  ctx: CanvasRenderingContext2D,
  options: DrawRoomEnvironmentOptions
): void {
  const { timeState, palette } = options;
  drawChairSeatBase(ctx, palette);
  drawDeskAndProps(ctx, palette, timeState);
}

export function drawRoomEnvironment(
  ctx: CanvasRenderingContext2D,
  options: DrawRoomEnvironmentOptions
): void {
  drawRoomBaseLayer(ctx, options);
  drawBedBlanket(ctx, options.palette, 0);
  drawDeskAndChairBase(ctx, options);
  drawChairBackOverlay(ctx, options.palette);
}

function drawAmbientWithCutouts(
  ctx: CanvasRenderingContext2D,
  color: string,
  alpha: number,
  cutoutScreens: boolean
): void {
  if (alpha <= 0) return;
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;

  if (!cutoutScreens) {
    ctx.fillRect(0, 0, ROOM_WIDTH, 14);
    ctx.fillRect(0, 14, 86, 32);
    ctx.fillRect(138, 14, ROOM_WIDTH - 138, 32);
    ctx.fillRect(0, 46, ROOM_WIDTH, ROOM_HEIGHT - 46);
    ctx.restore();
    return;
  }

  ctx.fillRect(0, 0, ROOM_WIDTH, 14);
  ctx.fillRect(0, 14, 86, 32);
  ctx.fillRect(138, 14, ROOM_WIDTH - 138, 32);
  ctx.fillRect(0, 46, ROOM_WIDTH, 3);
  ctx.fillRect(0, 49, 155, 14);
  ctx.fillRect(191, 49, ROOM_WIDTH - 191, 14);
  ctx.fillRect(0, 63, 136, 5);
  ctx.fillRect(147, 63, 8, 5);
  ctx.fillRect(191, 63, ROOM_WIDTH - 191, 5);
  ctx.fillRect(0, 68, 136, 3);
  ctx.fillRect(147, 68, ROOM_WIDTH - 147, 3);
  ctx.fillRect(0, 71, ROOM_WIDTH, ROOM_HEIGHT - 71);
  ctx.restore();
}

function drawFairyGlow(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState,
  timeSec: number
): void {
  if (timeState !== 'late_night' || palette.fairyGlowAlpha <= 0) return;

  ctx.save();
  ctx.fillStyle = palette.fairyGlowColor;
  for (let i = 0; i < FAIRY_BULBS.length; i += 1) {
    const bulb = FAIRY_BULBS[i];
    const pulse = 0.55 + 0.45 * Math.sin(timeSec * 2.3 + bulb.phase);
    ctx.globalAlpha = palette.fairyGlowAlpha * 0.4 * pulse;
    ctx.fillRect(bulb.x - 1, bulb.y - 1, 3, 3);
    ctx.globalAlpha = palette.fairyGlowAlpha * 0.18 * pulse;
    ctx.fillRect(bulb.x - 2, bulb.y, 1, 1);
    ctx.fillRect(bulb.x + 2, bulb.y, 1, 1);
    ctx.fillRect(bulb.x, bulb.y - 2, 1, 1);
    ctx.fillRect(bulb.x, bulb.y + 2, 1, 1);
  }
  ctx.restore();
}

function drawBayerWindowBeam(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState,
  timeSec: number
): void {
  if (palette.windowBeamAlpha <= 0) return;

  ctx.save();
  ctx.fillStyle = palette.windowBeamColor;
  const gearAlpha = palette.windowBeamAlpha * 0.42;

  const yStart = 20;
  const yEnd = 152;
  for (let y = yStart; y < yEnd; y += 1) {
    const dy = Math.max(0, y - 46);
    const leftX = Math.floor(86 + dy * 0.24);
    const rightX = Math.ceil(138 + dy * 0.35);
    const vFactor = y < 52 ? 0.55 : Math.max(0, 1 - (y - 52) / 106);
    const span = Math.max(1, rightX - leftX);
    const edgeSpan = Math.min(10, span * 0.25);

    let runStart = -1;
    let runMode = 0;

    const flushRun = (endX: number): void => {
      if (runStart === -1) return;
      ctx.globalAlpha = runMode === 2 ? gearAlpha : palette.windowBeamAlpha;
      ctx.fillRect(runStart, y, endX - runStart, 1);
      runStart = -1;
      runMode = 0;
    };

    for (let x = leftX; x <= rightX; x += 1) {
      const distEdge = Math.min(x - leftX, rightX - x);
      const edgeFactor = Math.min(1, distEdge / edgeSpan);
      const inDeskGear = x >= 111 && x <= 190 && y >= 56 && y <= 92;
      const intensity = vFactor * edgeFactor * (inDeskGear ? 0.34 : 1);
      const lit = intensity * 16 > BAYER_4X4[y & 3][x & 3];
      const nextMode = lit ? (inDeskGear ? 2 : 1) : 0;

      if (nextMode !== runMode) {
        flushRun(x);
        if (nextMode !== 0) {
          runStart = x;
          runMode = nextMode;
        }
      }
    }
    flushRun(rightX + 1);
  }

  if (timeState === 'waking' || timeState === 'working') {
    ctx.fillStyle = palette.dustMoteColor;
    for (let i = 0; i < 12; i += 1) {
      const verticalCycle = (i * 8.5 + timeSec * 4.2) % 88;
      const my = Math.round(46 + verticalCycle);
      const dy = Math.max(0, my - 46);
      const minBeamX = Math.floor(89 + dy * 0.24);
      const maxBeamX = Math.ceil(134 + dy * 0.35);
      const laneOffset = ((i * 19) % Math.max(8, maxBeamX - minBeamX - 4));
      const swayX = Math.round(Math.sin(timeSec * 0.9 + i * 1.4) * 2.4);
      const mx = Math.max(minBeamX, Math.min(maxBeamX, minBeamX + laneOffset + swayX));
      const shimmer = 0.32 + 0.38 * (0.5 + 0.5 * Math.sin(timeSec * 1.8 + i * 2.1));
      const inDeskGear = mx >= 111 && mx <= 190 && my >= 56 && my <= 92;
      ctx.globalAlpha = inDeskGear ? shimmer * 0.45 : shimmer;
      ctx.fillRect(mx, my, 1, 1);
    }
  }

  ctx.restore();
}

function drawBayerLampCone(
  ctx: CanvasRenderingContext2D,
  color: string,
  alpha: number
): void {
  if (alpha <= 0) return;

  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;

  const yStart = 61;
  const yEnd = 104;
  for (let y = yStart; y <= yEnd; y += 1) {
    const dy = y - yStart;
    const leftX = Math.floor(225 - dy * 0.72);
    const rightX = Math.ceil(236 + dy * 0.14);
    const vFactor = Math.max(0, 1 - dy / (yEnd - yStart + 6));
    const span = Math.max(1, rightX - leftX);

    let runStart = -1;
    for (let x = leftX; x <= rightX; x += 1) {
      const distEdge = Math.min(x - leftX, rightX - x);
      const edgeFactor = Math.min(1, distEdge / Math.max(3, span * 0.28));
      const intensity = vFactor * edgeFactor * 1.1;
      const lit = intensity * 16 > BAYER_4X4[y & 3][x & 3];

      if (lit && runStart === -1) {
        runStart = x;
      } else if (!lit && runStart !== -1) {
        ctx.fillRect(runStart, y, x - runStart, 1);
        runStart = -1;
      }
    }
    if (runStart !== -1) {
      ctx.fillRect(runStart, y, rightX - runStart + 1, 1);
    }
  }

  ctx.restore();
}

function drawBayerRadialPool(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  minY: number,
  maxY: number,
  color: string,
  alpha: number,
  strengthBias: number
): void {
  if (alpha <= 0) return;

  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;

  const y0 = Math.max(0, minY);
  const y1 = Math.min(ROOM_HEIGHT - 1, maxY);
  const x0 = Math.max(0, Math.floor(cx - rx));
  const x1 = Math.min(ROOM_WIDTH - 1, Math.ceil(cx + rx));

  for (let y = y0; y <= y1; y += 1) {
    const dy = (y - cy) / ry;
    let runStart = -1;
    for (let x = x0; x <= x1; x += 1) {
      const dx = (x - cx) / rx;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const intensity = Math.max(0, Math.min(1, (1 - dist) * strengthBias));
      const lit = intensity * 16 > BAYER_4X4[y & 3][x & 3];

      if (lit && runStart === -1) {
        runStart = x;
      } else if (!lit && runStart !== -1) {
        ctx.fillRect(runStart, y, x - runStart, 1);
        runStart = -1;
      }
    }
    if (runStart !== -1) {
      ctx.fillRect(runStart, y, x1 - runStart + 1, 1);
    }
  }

  ctx.restore();
}

export function drawLightingOverlay(
  ctx: CanvasRenderingContext2D,
  options: DrawLightingOverlayOptions
): void {
  const { timeState, lampOn, tick, palette } = options;
  const isMusicActive = Boolean(options.isMusicActive);
  const timeSec = options.elapsedSec ?? tick / 15;

  drawAmbientWithCutouts(
    ctx,
    palette.ambientTint,
    palette.ambientAlpha,
    timeState === 'late_night'
  );

  drawFairyGlow(ctx, palette, timeState, timeSec);
  drawBayerWindowBeam(ctx, palette, timeState, timeSec);

  if (lampOn && palette.lampGlowAlpha > 0) {
    drawBayerLampCone(ctx, palette.lampGlowColor, palette.lampGlowAlpha * 0.56);
    drawBayerRadialPool(
      ctx,
      221,
      82,
      44,
      34,
      60,
      118,
      palette.lampGlowColor,
      palette.lampGlowAlpha * 0.65,
      1.15
    );
    drawBayerRadialPool(
      ctx,
      228,
      69,
      17,
      13,
      60,
      86,
      '#FFF4B8',
      palette.lampGlowAlpha * 0.55,
      1.22
    );
  }

  if (palette.screenGlowAlpha > 0) {
    const musicBoost = isMusicActive ? 1 + 0.14 * Math.sin(timeSec * 5.2) : 1;
    const screenAlpha = Math.min(0.4, palette.screenGlowAlpha * musicBoost);
    drawBayerRadialPool(
      ctx,
      173,
      70,
      35,
      23,
      48,
      96,
      palette.screenGlowColor,
      screenAlpha,
      1.05
    );
    drawBayerRadialPool(
      ctx,
      142,
      71,
      14,
      11,
      60,
      84,
      palette.screenGlowColor,
      screenAlpha * 0.55,
      1.0
    );
  }
}
