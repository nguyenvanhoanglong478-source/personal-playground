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

export const WALKABLE_RECT: PixelRect = { x: 74, y: 84, w: 32, h: 66 };

export const RUG_WALK_RECT: PixelRect = { x: 116, y: 125, w: 112, h: 28 };

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
  createHotspot('window', 72, 6, 74, 42, 108, 5),
  createHotspot('shelf', 242, 8, 72, 76, 266, 7),
  createHotspot('bed', 12, 69, 58, 84, 40, 66),
  createHotspot('monitor', 132, 60, 16, 17, 173, 42),
  createHotspot('monitor', 150, 46, 46, 32, 173, 42),
  createHotspot('speakers', 111, 57, 16, 24, 119, 53),
  createHotspot('speakers', 199, 57, 16, 24, 207, 53),
  createHotspot('lamp', 218, 52, 18, 34, 226, 48),
  createHotspot('capybara', 110, 114, 126, 46, 173, 112),
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
  { x: 10, y: 6, phase: 0.2 },
  { x: 20, y: 8, phase: 1.4 },
  { x: 31, y: 6, phase: 2.7 },
  { x: 42, y: 8, phase: 0.9 },
  { x: 53, y: 6, phase: 2.1 },
  { x: 64, y: 8, phase: 3.3 },
  { x: 151, y: 6, phase: 0.6 },
  { x: 162, y: 8, phase: 1.9 },
  { x: 173, y: 6, phase: 3.1 },
  { x: 184, y: 8, phase: 1.1 },
  { x: 196, y: 6, phase: 2.4 },
  { x: 208, y: 8, phase: 0.4 },
  { x: 220, y: 6, phase: 1.7 },
  { x: 232, y: 8, phase: 3.0 },
  { x: 244, y: 6, phase: 0.8 },
  { x: 256, y: 8, phase: 2.2 },
  { x: 268, y: 6, phase: 3.5 },
  { x: 280, y: 8, phase: 1.3 },
  { x: 292, y: 6, phase: 2.6 },
  { x: 304, y: 8, phase: 0.5 },
  { x: 247, y: 22, phase: 1.2 },
  { x: 257, y: 23, phase: 2.5 },
  { x: 267, y: 22, phase: 0.7 },
  { x: 277, y: 23, phase: 1.9 },
];

const PENDANT_XS: readonly number[] = [18, 220, 304];

function makeRng(seed: number): () => number {
  let s = (seed >>> 0) || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

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

function drawBrickPatch(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  bx0: number,
  by0: number,
  bw: number,
  bh: number
): void {
  rect(ctx, bx0, by0, bw, bh, palette.brickMortar);
  const rng = makeRng(bx0 * 37 + by0 * 13);
  for (let by = by0; by < by0 + bh; by += 4) {
    const row = ((by - by0) / 4) | 0;
    const shift = (row % 2) * 4;
    for (let bx = bx0 - shift; bx < bx0 + bw; bx += 8) {
      const x0 = Math.max(bx0, bx);
      const x1 = Math.min(bx0 + bw, bx + 7);
      const w = x1 - x0;
      const h = Math.min(3, by0 + bh - by);
      if (w <= 1 || h <= 0) continue;
      const r = rng();
      const col = r < 0.34 ? palette.brickHi : r < 0.72 ? palette.brickMid : palette.brickSh;
      rect(ctx, x0, by, w, h, col);
      if (r < 0.28 && w > 3 && h >= 2) {
        rect(ctx, x0, by, w - 1, 1, palette.brickHi);
      }
    }
  }
}

function drawBackWall(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  rect(ctx, 0, 0, ROOM_WIDTH, 3, palette.wallCeilingShade);
  rect(ctx, 4, 2, ROOM_WIDTH - 8, 1, palette.woodShadow);
  rect(ctx, 4, 3, ROOM_WIDTH - 8, 1, palette.inkOutline);

  rect(ctx, 4, 4, ROOM_WIDTH - 8, 29, palette.wallMid);
  rect(ctx, 4, 4, ROOM_WIDTH - 8, 2, palette.wallCeilingShade);
  rect(ctx, 64, 6, 150, 27, palette.wallLight);
  drawDitherBand(ctx, 54, 6, 10, 27, palette.wallLight, 0.5);
  drawDitherBand(ctx, 214, 6, 10, 27, palette.wallLight, 0.5);

  drawBrickPatch(ctx, palette, 4, 5, 62, 28);
  drawBrickPatch(ctx, palette, 212, 5, 104, 28);

  const wRng = makeRng(32048);
  for (let i = 0; i < 42; i += 1) {
    const sx = 68 + ((wRng() * 140) | 0);
    const sy = 7 + ((wRng() * 23) | 0);
    px(ctx, sx, sy, wRng() > 0.5 ? palette.wallPlasterSpeck : palette.wallShadow);
  }

  rect(ctx, 4, 33, ROOM_WIDTH - 8, 1, palette.wainscotHighlight);
  rect(ctx, 4, 34, ROOM_WIDTH - 8, 1, palette.woodMid);
  rect(ctx, 4, 35, ROOM_WIDTH - 8, 1, palette.inkWood);

  rect(ctx, 4, 36, ROOM_WIDTH - 8, 11, palette.wainscotMid);
  for (let x = 6; x < ROOM_WIDTH - 10; x += 14) {
    rect(ctx, x, 37, 11, 9, palette.wainscotMolding);
    rect(ctx, x, 37, 11, 1, palette.wainscotShadow);
    rect(ctx, x, 37, 1, 9, palette.wainscotShadow);
    rect(ctx, x + 1, 45, 10, 1, palette.wainscotHighlight);
    rect(ctx, x + 10, 38, 1, 8, palette.wainscotHighlight);
    rect(ctx, x + 12, 36, 1, 11, palette.wainscotHighlight);
  }

  rect(ctx, 4, 47, ROOM_WIDTH - 8, 1, palette.baseboardTrim);
  rect(ctx, 4, 48, ROOM_WIDTH - 8, 1, palette.inkWood);

  rect(ctx, 0, 0, 4, ROOM_HEIGHT, palette.inkWood);
  rect(ctx, 3, 3, 1, ROOM_HEIGHT - 3, palette.woodShadow);
  rect(ctx, ROOM_WIDTH - 4, 0, 4, ROOM_HEIGHT, palette.inkWood);
  rect(ctx, ROOM_WIDTH - 4, 3, 1, ROOM_HEIGHT - 3, palette.woodShadow);
}

function drawOverheadPendants(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState
): void {
  const isLit = timeState !== 'sleeping' || palette.lampOn;
  for (const lx of PENDANT_XS) {
    rect(ctx, lx, 3, 1, 6, palette.inkOutline);
    rect(ctx, lx - 1, 9, 3, 2, palette.cardGold);
    rect(ctx, lx - 3, 11, 7, 2, palette.pendantShade);
    rect(ctx, lx - 4, 13, 9, 2, palette.inkOutline);
    rect(ctx, lx - 3, 13, 7, 1, palette.pendantShade);
    rect(
      ctx,
      lx - 2,
      15,
      5,
      1,
      isLit ? palette.pendantGlow : palette.chassisShadow
    );
  }
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
  drawFairyStringSegment(ctx, 8, 66, 5, 2.5, palette.fairyWire);
  drawFairyStringSegment(ctx, 148, 308, 5, 2.5, palette.fairyWire);
  drawFairyStringSegment(ctx, 245, 284, 21, 2, palette.fairyWire);

  const isLit = timeState === 'late_night' || (timeState === 'sleeping' && palette.lampOn);
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
  const floorTop = 49;
  const innerLeft = 4;
  const innerRight = ROOM_WIDTH - 4;
  rect(ctx, innerLeft, floorTop, innerRight - innerLeft, ROOM_HEIGHT - floorTop, palette.floorMid);

  const plankH = 7;
  const rowOffsets = [0, 14, 27, 8, 21];
  const rng = makeRng(320180);
  const showSunReflect = timeState === 'waking' || timeState === 'working';

  for (let y = floorTop; y < ROOM_HEIGHT; y += plankH) {
    const row = ((y - floorTop) / plankH) | 0;
    let x = innerLeft - rowOffsets[row % rowOffsets.length];
    let colIdx = 0;
    const h = Math.min(plankH, ROOM_HEIGHT - y);

    while (x < innerRight) {
      const len = 30 + ((rng() * 11) | 0);
      const x0 = Math.max(innerLeft, x);
      const x1 = Math.min(innerRight, x + len);
      const w = x1 - x0;

      if (w > 0 && h > 0) {
        const tonePick = (row + colIdx + ((rng() * 3) | 0)) % 4;
        const plankColor =
          tonePick === 0
            ? palette.floorMid
            : tonePick === 1
              ? palette.floorShadow
              : palette.floorMid;

        rect(ctx, x0, y, w, h, plankColor);

        if (((row + colIdx) % 3) === 0 && w > 8 && h > 3) {
          rect(ctx, x0 + 2, y + 1, w - 4, 1, palette.floorHighlight);
        }

        if (w > 12 && h > 4) {
          const gx = x0 + 4 + ((rng() * Math.max(1, w - 14)) | 0);
          const gy = y + 3 + ((rng() * Math.max(1, h - 5)) | 0);
          const gw = Math.min(7 + ((rng() * 7) | 0), x1 - gx - 2);
          if (gw > 2) {
            rect(ctx, gx, gy, gw, 1, palette.floorGrain);
            if (showSunReflect && gx >= 80 && gx <= 168 && y >= 62 && y <= 152) {
              rect(ctx, gx + 1, y + 1, Math.min(6, gw), 1, palette.floorRimReflect);
            }
          }
        }

        if (y + h - 1 < ROOM_HEIGHT) {
          rect(ctx, x0, y + h - 1, w, 1, palette.floorSeam);
        }
        if (x1 < innerRight) {
          rect(ctx, x1 - 1, y, 1, h - 1, palette.floorSeam);
        }
      }

      x += len;
      colIdx += 1;
    }
  }

  rect(ctx, innerLeft, floorTop, innerRight - innerLeft, 1, palette.wallFloorAo);
  drawDitherBand(ctx, innerLeft, floorTop + 1, innerRight - innerLeft, 1, palette.wallFloorAo, 0.75);
  drawDitherBand(ctx, innerLeft, floorTop + 2, innerRight - innerLeft, 1, palette.wallFloorAo, 0.5);
  drawDitherBand(ctx, innerLeft, floorTop + 3, innerRight - innerLeft, 1, palette.wallFloorAo, 0.25);

  drawDitherBand(ctx, innerLeft, floorTop, 4, ROOM_HEIGHT - floorTop, palette.aoColor, 0.28);
  drawDitherBand(ctx, innerRight - 4, floorTop, 4, ROOM_HEIGHT - floorTop, palette.aoColor, 0.28);
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
    drawDitherBand(ctx, skyX, skyY + 26, skyW, 2, palette.citySkyGlow, 0.5);
    rect(ctx, skyX, skyY + 28, skyW, skyH - 28, palette.citySkyGlow);
  } else if (timeState === 'sleeping') {
    rect(ctx, skyX, skyY, skyW, 11, palette.skyTop);
    drawDitherBand(ctx, skyX, skyY + 10, skyW, 2, palette.skyMid, 0.5);
    rect(ctx, skyX, skyY + 12, skyW, 12, palette.skyMid);
    drawDitherBand(ctx, skyX, skyY + 23, skyW, 2, palette.citySkyGlow, 0.5);
    rect(ctx, skyX, skyY + 25, skyW, skyH - 25, palette.citySkyGlow);
  } else {
    rect(ctx, skyX, skyY, skyW, 11, palette.skyTop);
    drawDitherBand(ctx, skyX, skyY + 10, skyW, 2, palette.skyMid, 0.5);
    rect(ctx, skyX, skyY + 12, skyW, 11, palette.skyMid);
    drawDitherBand(ctx, skyX, skyY + 22, skyW, 2, palette.skyHorizon, 0.5);
    rect(ctx, skyX, skyY + 24, skyW, skyH - 24, palette.skyHorizon);
  }

  if (timeState === 'sleeping' || timeState === 'late_night') {
    const stars: readonly [number, number][] =
      timeState === 'sleeping'
        ? [
            [82, 12],
            [97, 14],
            [86, 20],
            [111, 16],
            [132, 19],
            [102, 23],
          ]
        : [
            [83, 11],
            [99, 14],
            [121, 12],
            [131, 16],
          ];
    for (let i = 0; i < stars.length; i += 1) {
      const [sx, sy] = stars[i];
      const twinkle = Math.floor(timeSec * 2 + i * 3) % 5 === 0;
      px(ctx, sx, sy, twinkle ? palette.shootingStarCore : palette.moonColor);
    }

    if (timeState === 'sleeping') {
      drawDitherBand(ctx, 122, 10, 11, 11, palette.moonShadow, 0.25);
      drawMatrix(
        ctx,
        CRESCENT_MOON_MATRIX,
        {
          m: palette.moonColor,
          s: palette.moonShadow,
        },
        124,
        12,
        skyX,
        skyY,
        skyX + skyW,
        skyY + skyH
      );

      const starCycle = timeSec % 8.0;
      if (starCycle >= 1.2 && starCycle < 1.85) {
        const progress = (starCycle - 1.2) / 0.65;
        const headX = Math.round(115 - progress * 24);
        const headY = Math.round(10 + progress * 11);
        for (let t = 0; t < 5; t += 1) {
          const tx = headX + t * 2;
          const ty = headY - t;
          if (tx >= skyX && tx < skyX + skyW && ty >= skyY && ty < skyY + skyH) {
            px(ctx, tx, ty, t === 0 ? palette.shootingStarCore : palette.shootingStarTrail);
          }
        }
      }
    }

    const nightCloudX = skyX - 10 + Math.floor((timeSec * 1.1 + 14) % (skyW + 18));
    drawMatrix(
      ctx,
      CLOUD_WISP_MATRIX,
      { h: palette.cloudHighlight, s: palette.cloudShadow },
      nightCloudX,
      19,
      skyX,
      skyY,
      skyX + skyW,
      skyY + skyH
    );

    const skylineBuildings: readonly [number, number, number][] = [
      [0, 11, 9],
      [9, 15, 10],
      [19, 9, 8],
      [27, 17, 11],
      [38, 12, 9],
      [47, 16, 10],
      [57, 10, 9],
    ];
    for (let i = 0; i < skylineBuildings.length; i += 1) {
      const [bx, bh, bw] = skylineBuildings[i];
      const clampedW = Math.min(bw, skyW - bx);
      if (clampedW <= 0) continue;
      const by = skyY + skyH - bh;
      rect(
        ctx,
        skyX + bx,
        by,
        clampedW,
        bh,
        i % 2 === 0 ? palette.skyTreeNear : palette.skyTreeFar
      );
      if (bh >= 15 && clampedW >= 7) {
        px(ctx, skyX + bx + Math.floor(clampedW / 2), by - 1, palette.skySilhouette);
        px(ctx, skyX + bx + Math.floor(clampedW / 2), by - 2, palette.cityWinAmber);
      }
      for (let wy = by + 2; wy < skyY + skyH - 2; wy += 3) {
        for (let wx = bx + 2; wx < bx + clampedW - 1; wx += 3) {
          if (((wx + wy + i) % 3) !== 0) {
            px(
              ctx,
              skyX + wx,
              wy,
              (wx + i) % 2 === 0 ? palette.cityWinAmber : palette.cityWinCyan
            );
          }
        }
      }
    }
    return;
  }

  const farCloudX = skyX - 10 + Math.floor((timeSec * 1.1 + 12) % (skyW + 18));
  const nearCloudX = skyX - 12 + Math.floor((timeSec * 2.2 + 42) % (skyW + 24));
  const midCloudX = skyX - 10 + Math.floor((timeSec * 1.55 + 26) % (skyW + 20));
  drawMatrix(
    ctx,
    CLOUD_WISP_MATRIX,
    { h: palette.cloudHighlight, s: palette.cloudShadow },
    farCloudX,
    11,
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
    15,
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
    22,
    skyX,
    skyY,
    skyX + skyW,
    skyY + skyH
  );

  const birdCycle = timeSec % 11.5;
  if (birdCycle < 5.6) {
    const wingUp = Math.floor(timeSec * 4.5) % 2 === 0;
    const birds: readonly [number, number][] = [
      [Math.round(skyX - 3 + birdCycle * 10), Math.round(14 + Math.sin(birdCycle * 2.1) * 1.5)],
      [Math.round(skyX - 9 + birdCycle * 9.5), Math.round(18 + Math.cos(birdCycle * 1.8) * 1.2)],
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

  rect(ctx, skyX, skyY + skyH - 5, skyW, 5, palette.skyTreeFar);
  const farPeaks: readonly [number, number, number][] = [
    [skyX + 3, skyY + skyH - 7, 10],
    [skyX + 18, skyY + skyH - 8, 12],
    [skyX + 36, skyY + skyH - 7, 11],
    [skyX + 51, skyY + skyH - 8, 12],
  ];
  for (const [fx, fy, fw] of farPeaks) {
    rect(ctx, fx, fy, Math.min(fw, skyX + skyW - fx), 3, palette.skyTreeFar);
  }

  const nearClusters: readonly { x: number; w: number; topY: number; phase: number }[] = [
    { x: skyX + 1, w: 14, topY: skyY + skyH - 8, phase: 0.0 },
    { x: skyX + 16, w: 12, topY: skyY + skyH - 7, phase: 1.4 },
    { x: skyX + 30, w: 15, topY: skyY + skyH - 9, phase: 2.7 },
    { x: skyX + 47, w: 16, topY: skyY + skyH - 8, phase: 0.9 },
  ];
  for (const tree of nearClusters) {
    const sway = Math.round(Math.sin(timeSec * 1.35 + tree.phase) * 0.65);
    const crownX = Math.max(skyX, Math.min(skyX + skyW - tree.w, tree.x + sway));
    rect(ctx, tree.x, tree.topY + 3, Math.min(tree.w, skyX + skyW - tree.x), skyY + skyH - (tree.topY + 3), palette.skyTreeNear);
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
  drawDitherBand(ctx, 71, 8, 76, 39, palette.wallShadow, 0.45);
  rect(ctx, 73, 7, 72, 37, palette.inkOutline);
  rect(ctx, 74, 8, 70, 35, palette.mullionDark);
  rect(ctx, 74, 8, 70, 1, palette.mullionHi);
  rect(ctx, 74, 8, 1, 35, palette.mullionHi);

  const skyX = 76;
  const skyY = 10;
  const skyW = 66;
  const skyH = 32;

  drawWindowSky(ctx, palette, timeState, timeSec, skyX, skyY, skyW, skyH);

  ctx.save();
  ctx.globalAlpha = 0.22;
  for (let i = 0; i < 4; i += 1) {
    px(ctx, 81 + i, 15 - i, palette.windowGlassGlare);
    px(ctx, 130 + i, 36 - i, palette.windowGlassGlare);
  }
  ctx.restore();

  rect(ctx, 97, skyY, 2, skyH, palette.mullionDark);
  rect(ctx, 98, skyY, 1, skyH, palette.mullionHi);
  rect(ctx, 119, skyY, 2, skyH, palette.mullionDark);
  rect(ctx, 120, skyY, 1, skyH, palette.mullionHi);
  rect(ctx, skyX, 25, skyW, 2, palette.mullionDark);
  rect(ctx, skyX, 26, skyW, 1, palette.mullionHi);

  rect(ctx, 70, 43, 78, 4, palette.inkWood);
  rect(ctx, 71, 43, 76, 1, palette.woodRimGlow);
  rect(ctx, 71, 44, 76, 1, palette.woodHighlight);
  rect(ctx, 71, 45, 76, 1, palette.woodMid);
  drawDitherBand(ctx, 71, 47, 76, 2, palette.wallShadow, 0.5);

  rect(ctx, 71, 6, 76, 2, palette.inkOutline);
  rect(ctx, 72, 6, 74, 1, palette.mullionHi);

  drawCurtainSide(ctx, palette, 73, 8, true, timeSec);
  drawCurtainSide(ctx, palette, 137, 8, false, timeSec);
}

function drawCurtainSide(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  x: number,
  y: number,
  isLeft: boolean,
  timeSec: number
): void {
  const w = 8;
  const h = 35;

  for (let row = 0; row < h; row += 1) {
    const py = y + row;
    const isTieBand = row >= 19 && row <= 21;
    const innerPinch = isTieBand ? 2 : row > 16 && row < 24 ? 1 : 0;
    const sway =
      row > 24
        ? Math.round(Math.sin(timeSec * 1.35 + row * 0.22 + (isLeft ? 0 : 1.2)) * 0.5)
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
        ctx.fillStyle = row === 19 ? palette.curtainHighlight : palette.curtainFold;
        ctx.fillRect(pxCoord, py, 1, 1);
        continue;
      }
      const pleat = col % 3;
      if (pleat === 1) {
        ctx.fillStyle = row < 6 ? palette.curtainHighlight : palette.curtainMid;
      } else if (pleat === 2) {
        ctx.fillStyle = row > 26 ? palette.curtainShadow : palette.curtainHighlight;
      } else {
        ctx.fillStyle = palette.curtainShadow;
      }
      ctx.fillRect(pxCoord, py, 1, 1);
    }
  }
}

function drawSunsetPoster(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeSec: number
): void {
  const x = 26;
  const y = 10;
  const w = 22;
  const h = 21;

  drawDitherBand(ctx, x + 1, y + 1, w, h, palette.wallShadow, 0.5);
  rect(ctx, x, y, w, h, palette.inkWood);
  rect(ctx, x + 1, y + 1, w - 2, h - 2, palette.woodMid);
  rect(ctx, x + 1, y + 1, w - 2, 1, palette.woodHighlight);
  rect(ctx, x + 2, y + 2, w - 4, h - 4, '#F5EFE6');

  const ax = x + 4;
  const ay = y + 4;
  const aw = w - 8;
  const ah = h - 8;
  rect(ctx, ax, ay, aw, 3, '#1E1B4B');
  rect(ctx, ax, ay + 3, aw, 3, '#6D28D9');
  rect(ctx, ax, ay + 6, aw, 3, '#EA580C');
  rect(ctx, ax, ay + 9, aw, ah - 9, '#FBBF24');

  rect(ctx, ax + 5, ay + 6, 4, 4, '#FEF08A');
  for (let i = 0; i < 5; i += 1) {
    rect(ctx, ax + i, ay + ah - 1 - i, 1, i + 1, '#1E1B4B');
    rect(ctx, ax + aw - 1 - i, ay + ah - 1 - i, 1, i + 1, '#1E1B4B');
  }
  rect(ctx, ax + 4, ay + ah - 3, 6, 3, '#312E81');

  const starTwinkle = Math.floor(timeSec * 2) % 2 === 0;
  px(ctx, ax + 2, ay + 1, starTwinkle ? '#FEF9C3' : '#93C5FD');
  px(ctx, ax + 11, ay + 2, starTwinkle ? '#93C5FD' : '#FEF9C3');
}

function drawKanbanMoodboard(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  const x = 152;
  const y = 10;
  const w = 31;
  const h = 21;

  drawDitherBand(ctx, x + 1, y + 1, w, h, palette.wallShadow, 0.45);
  rect(ctx, x, y, w, h, palette.inkOutline);
  rect(ctx, x + 1, y + 1, w - 2, h - 2, '#D8E4F0');
  rect(ctx, x + 2, y + 2, w - 4, h - 4, '#F4F8FC');

  rect(ctx, x + 3, y + 3, 9, 1, '#475569');
  rect(ctx, x + 19, y + 3, 9, 1, '#CBD5E1');
  rect(ctx, x + 19, y + 3, 6, 1, '#10B981');

  rect(ctx, x + 11, y + 5, 1, h - 8, '#CBD5E1');
  rect(ctx, x + 20, y + 5, 1, h - 8, '#CBD5E1');

  rect(ctx, x + 4, y + 6, 5, 3, '#FDE047');
  rect(ctx, x + 4, y + 10, 6, 3, '#93C5FD');
  rect(ctx, x + 4, y + 14, 4, 3, '#FB7185');

  rect(ctx, x + 13, y + 6, 6, 3, '#86EFAC');
  rect(ctx, x + 13, y + 10, 5, 3, '#C4B5FD');
  rect(ctx, x + 13, y + 14, 6, 3, '#FDBA74');

  rect(ctx, x + 22, y + 6, 6, 3, '#86EFAC');
  rect(ctx, x + 22, y + 10, 5, 3, '#FDE047');
  rect(ctx, x + 22, y + 14, 6, 3, '#93C5FD');
}

function drawWallClock(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState,
  timeSec: number
): void {
  const cx = 197;
  const cy = 19;
  const x = 189;
  const y = 11;

  drawDitherBand(ctx, x + 2, y + 2, 14, 15, palette.wallShadow, 0.48);

  const mask: readonly string[] = [
    '.....ooooooo.....',
    '...ooRRRRRRRoo...',
    '..oRRFFFFFFFRRo..',
    '.oRFFFFFFFFFFFRo.',
    '.oRFFFFFFFFFFFRo.',
    'oRFFFFFFFFFFFFFRo',
    'oRFFFFFFFFFFFFFRo',
    'oRFFFFFFFFFFFFFRo',
    'oRFFFFFFFFFFFFFRo',
    'oRFFFFFFFFFFFFFRo',
    'oRFFFFFFFFFFFFFRo',
    'oRFFFFFFFFFFFFFRo',
    '.oRFFFFFFFFFFFRo.',
    '.oRFFDDDDDDDDFRo.',
    '..oRRDDDDDDDRRo..',
    '...ooRRRRRRRoo...',
    '.....ooooooo.....',
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
  px(ctx, cx, y + 13, palette.clockHand);
  px(ctx, x + 3, cy, palette.clockHand);
  px(ctx, x + 13, cy, palette.clockHand);

  const baseHours: Record<RoomTimeState, number> = {
    waking: 7.5,
    working: 10.2,
    late_night: 21.75,
    sleeping: 1.5,
  };
  const hVal = baseHours[timeState];
  const hourAngle = ((hVal % 12) / 12) * Math.PI * 2 - Math.PI / 2;
  const minAngle = (((hVal * 60) % 60) / 60 + timeSec / 600) * Math.PI * 2 - Math.PI / 2;
  const secAngle = ((timeSec % 60) / 60) * Math.PI * 2 - Math.PI / 2;

  drawPixelLine(
    ctx,
    cx,
    cy,
    cx + Math.round(Math.cos(hourAngle) * 2.8),
    cy + Math.round(Math.sin(hourAngle) * 2.8),
    palette.clockHand
  );
  drawPixelLine(
    ctx,
    cx,
    cy,
    cx + Math.round(Math.cos(minAngle) * 4.2),
    cy + Math.round(Math.sin(minAngle) * 4.2),
    palette.clockHand
  );
  drawPixelLine(
    ctx,
    cx,
    cy,
    cx + Math.round(Math.cos(secAngle) * 4.8),
    cy + Math.round(Math.sin(secAngle) * 4.8),
    palette.clockSecondHand
  );

  px(ctx, cx, cy, palette.cardGold);
}

function drawDisplayShelfAndPlant(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeSec: number,
  isMusicActive: boolean
): void {
  const bx = 243;
  const by = 20;
  const bw = 46;
  const bh = 58;

  drawDitherBand(ctx, bx - 1, by, bw + 26, bh + 5, palette.wallShadow, 0.42);
  rect(ctx, bx + 1, by + bh, bw - 2, 2, palette.aoColor);
  drawDitherBand(ctx, bx, by + bh + 2, bw, 2, palette.aoColor, 0.48);

  rect(ctx, bx, by, bw, bh, palette.inkWood);
  rect(ctx, bx + 1, by + 1, bw - 2, 2, palette.woodHighlight);
  rect(ctx, bx + 1, by + 3, bw - 2, 1, palette.woodShadow);
  rect(ctx, bx + 1, by + 4, bw - 2, bh - 7, palette.woodDeep);

  rect(ctx, bx + 3, by + 4, bw - 6, 13, palette.woodDeep);
  const upperBooks: readonly { dx: number; w: number; h: number; body: string; light: string }[] = [
    { dx: 4, w: 3, h: 11, body: '#C84B47', light: '#E67A72' },
    { dx: 7, w: 3, h: 12, body: '#4C76B8', light: '#7BA3DC' },
    { dx: 10, w: 4, h: 10, body: '#DFAC47', light: '#F4CE74' },
    { dx: 14, w: 3, h: 11, body: '#4D9165', light: '#78BC8E' },
    { dx: 17, w: 4, h: 12, body: '#D9CBB4', light: '#F3EAD9' },
    { dx: 21, w: 3, h: 9, body: '#9B5F8F', light: '#C086B4' },
    { dx: 24, w: 4, h: 11, body: '#4C8B96', light: '#7AB9C4' },
  ];
  for (const book of upperBooks) {
    const bookY = by + 17 - book.h;
    rect(ctx, bx + book.dx, bookY, book.w, book.h, book.body);
    rect(ctx, bx + book.dx, bookY, 1, book.h, book.light);
    rect(ctx, bx + book.dx + book.w - 1, bookY, 1, book.h, palette.inkWood);
    px(ctx, bx + book.dx + 1, bookY + 2, palette.cubCream);
  }

  rect(ctx, bx + 34, by + 11, 8, 6, palette.inkOutline);
  rect(ctx, bx + 35, by + 12, 6, 4, palette.potMid);
  rect(ctx, bx + 35, by + 12, 6, 1, palette.potLight);
  rect(ctx, bx + 34, by + 8, 8, 4, palette.leafMid);
  rect(ctx, bx + 35, by + 7, 5, 2, palette.leafLight);

  rect(ctx, bx + 1, by + 17, bw - 2, 1, palette.woodHighlight);
  rect(ctx, bx + 1, by + 18, bw - 2, 1, palette.woodMid);
  rect(ctx, bx + 1, by + 19, bw - 2, 1, palette.woodShadow);

  const ty = by + 20;
  rect(ctx, bx + 3, ty, bw - 6, 16, palette.woodDeep);
  rect(ctx, bx + 4, ty + 7, 23, 8, palette.inkWood);
  rect(ctx, bx + 5, ty + 8, 21, 6, palette.woodMid);
  rect(ctx, bx + 5, ty + 8, 21, 1, palette.woodHighlight);

  rect(ctx, bx + 7, ty + 6, 13, 6, palette.vinylDisc);
  rect(ctx, bx + 8, ty + 5, 11, 8, palette.vinylDisc);
  rect(ctx, bx + 12, ty + 8, 3, 2, palette.vinylLabel);
  px(ctx, bx + 13, ty + 8, palette.cubCream);

  if (isMusicActive) {
    const glintStep = Math.floor(timeSec * 4) % 4;
    const glintOffsets: readonly [number, number][] = [
      [bx + 8, ty + 6],
      [bx + 17, ty + 6],
      [bx + 17, ty + 11],
      [bx + 8, ty + 11],
    ];
    const [gx, gy] = glintOffsets[glintStep];
    px(ctx, gx, gy, palette.chassisRim);
    rect(ctx, bx + 22, ty + 8, 2, 4, palette.chassisRim);
    px(ctx, bx + 21, ty + 11, palette.cardGold);
  } else {
    rect(ctx, bx + 23, ty + 7, 1, 5, palette.chassisRim);
  }

  rect(ctx, bx + 30, ty + 4, 11, 11, palette.inkIndigo);
  rect(ctx, bx + 31, ty + 5, 9, 9, palette.chassisMid);
  rect(ctx, bx + 33, ty + 6, 5, 3, palette.speakerConeDark);
  rect(ctx, bx + 34, ty + 10, 3, 3, palette.speakerConeDark);
  px(ctx, bx + 39, ty + 12, isMusicActive ? '#5AD17A' : palette.chassisRim);

  rect(ctx, bx + 1, ty + 16, bw - 2, 1, palette.woodHighlight);
  rect(ctx, bx + 1, ty + 17, bw - 2, 1, palette.woodMid);
  rect(ctx, bx + 1, ty + 18, bw - 2, 1, palette.woodShadow);

  const vy = ty + 19;
  rect(ctx, bx + 3, vy, bw - 6, 15, palette.woodDeep);
  rect(ctx, bx + 22, vy, 2, 15, palette.woodMid);
  const sleeveCols = ['#F97316', '#38BDF8', '#EAB308', '#A855F7', '#EC4899', '#10B981'];
  for (let i = 0; i < 5; i += 1) {
    rect(ctx, bx + 5 + i * 3, vy + 3, 2, 12, sleeveCols[i % sleeveCols.length]);
    rect(ctx, bx + 26 + i * 3, vy + 4, 2, 11, sleeveCols[(i + 2) % sleeveCols.length]);
  }

  rect(ctx, bx + 1, by + bh - 4, bw - 2, 2, palette.woodMid);
  rect(ctx, bx + 1, by + bh - 2, bw - 2, 1, palette.woodShadow);
  rect(ctx, bx + 2, by + bh, 3, 3, palette.inkWood);
  rect(ctx, bx + bw - 5, by + bh, 3, 3, palette.inkWood);

  rect(ctx, bx + 4, by - 11, 3, 11, '#4C76B8');
  rect(ctx, bx + 4, by - 11, 1, 11, '#7BA3DC');
  rect(ctx, bx + 7, by - 13, 4, 13, '#C84B47');
  rect(ctx, bx + 7, by - 13, 1, 13, '#E67A72');
  rect(ctx, bx + 11, by - 10, 3, 10, '#DFAC47');

  rect(ctx, bx + 19, by - 1, 5, 1, palette.woodShadow);
  rect(ctx, bx + 35, by - 1, 5, 1, palette.woodShadow);
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
    bx + 18,
    by - 12
  );

  const vinePts: readonly [number, number][] = [
    [bx + 41, by + 13],
    [bx + 43, by + 17],
    [bx + 42, by + 22],
    [bx + 44, by + 27],
    [bx + 43, by + 32],
    [bx + 44, by + 38],
    [bx + 42, by + 43],
  ];
  for (let i = 0; i < vinePts.length; i += 1) {
    const [vx, vyPt] = vinePts[i];
    const vineSway = Math.round(Math.sin(timeSec * 1.4 + i * 0.7) * 0.45);
    rect(ctx, vx + vineSway, vyPt, 3, 3, palette.leafMid);
    px(ctx, vx + vineSway + 1, vyPt, palette.leafLight);
    px(ctx, vx + vineSway, vyPt + 2, palette.leafShadow);
  }

  const plantX = 291;
  const plantY = 47;
  rect(ctx, plantX + 3, plantY + 29, 16, 4, palette.aoColor);
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
    const py = plantY + row;
    const swayOffset =
      row < 15
        ? Math.round(Math.sin(timeSec * 1.45 + row * 0.25) * (row < 7 ? 0.72 : 0.48))
        : 0;
    for (let col = 0; col < line.length; col += 1) {
      const ch = line[col];
      if (ch === '.' || ch === ' ') continue;
      const color = plantColors[ch];
      if (!color) continue;
      px(ctx, plantX + col + swayOffset, py, color);
    }
  }
}

export function drawBedBase(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  rect(ctx, 11, 150, 58, 3, palette.aoColor);
  drawDitherBand(ctx, 11, 153, 59, 2, palette.aoColor, 0.5);
  drawDitherBand(ctx, 68, 74, 3, 76, palette.aoColor, 0.5);

  rect(ctx, 12, 70, 56, 80, palette.inkWood);

  rect(ctx, 13, 69, 4, 17, palette.inkWood);
  rect(ctx, 14, 70, 2, 15, palette.woodHighlight);
  rect(ctx, 63, 69, 4, 17, palette.inkWood);
  rect(ctx, 64, 70, 2, 15, palette.woodHighlight);

  rect(ctx, 17, 72, 46, 13, palette.woodMid);
  rect(ctx, 17, 72, 46, 2, palette.woodHighlight);
  for (let sx = 22; sx <= 56; sx += 7) {
    rect(ctx, sx, 74, 1, 9, palette.woodShadow);
  }
  rect(ctx, 17, 83, 46, 2, palette.woodShadow);

  rect(ctx, 13, 85, 2, 60, palette.woodMid);
  rect(ctx, 65, 85, 2, 60, palette.woodShadow);

  rect(ctx, 15, 85, 50, 60, palette.sheetTrim);
  rect(ctx, 15, 85, 50, 1, palette.pillowShadow);

  rect(ctx, 19, 87, 42, 14, palette.inkOutline);
  rect(ctx, 20, 88, 40, 12, palette.pillowMid);
  rect(ctx, 21, 88, 38, 4, palette.pillowLight);
  rect(ctx, 20, 98, 40, 2, palette.pillowShadow);
  rect(ctx, 34, 92, 12, 2, palette.pillowShadow);
  px(ctx, 19, 87, palette.sheetTrim);
  px(ctx, 60, 87, palette.sheetTrim);
  px(ctx, 19, 100, palette.sheetTrim);
  px(ctx, 60, 100, palette.sheetTrim);

  rect(ctx, 13, 145, 54, 4, palette.woodMid);
  rect(ctx, 13, 145, 54, 1, palette.woodHighlight);
  rect(ctx, 13, 148, 54, 1, palette.woodShadow);
  rect(ctx, 14, 149, 4, 2, palette.inkWood);
  rect(ctx, 62, 149, 4, 2, palette.inkWood);

  rect(ctx, 24, 155, 5, 3, palette.inkOutline);
  rect(ctx, 25, 155, 3, 2, palette.quiltLight);
  rect(ctx, 31, 155, 5, 3, palette.inkOutline);
  rect(ctx, 32, 155, 3, 2, palette.quiltLight);
}

export function drawBedBlanket(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  breathOffset = 0
): void {
  const b = Math.max(-1, Math.min(0, Math.round(breathOffset))) || 0;
  const cuffTop = 102 + b;
  const quiltTop = 106 + b;
  const quiltBottom = 145;
  const quiltHeight = quiltBottom - quiltTop + 1;

  rect(ctx, 15, cuffTop, 50, 4, palette.sheetTrim);
  rect(ctx, 15, cuffTop + 3, 50, 1, palette.pillowShadow);

  rect(ctx, 14, quiltTop, 52, quiltHeight, palette.inkOutline);
  rect(ctx, 15, quiltTop + 1, 50, quiltHeight - 2, palette.quiltMid);
  rect(ctx, 15, quiltTop + 1, 50, 2, palette.quiltLight);

  const patternTop = quiltTop + 3;
  for (let qy = patternTop; qy < 144; qy += 1) {
    for (let qx = 16; qx < 64; qx += 1) {
      const gx = (qx - 16) >> 2;
      const gy = (qy - 109) >> 2;
      if (((gx + gy) & 1) === 0) {
        px(ctx, qx, qy, palette.quiltPattern);
      }
    }
  }

  rect(ctx, 15, quiltTop + 1, 2, quiltHeight - 2, palette.quiltShadow);
  rect(ctx, 63, quiltTop + 1, 2, quiltHeight - 2, palette.quiltShadow);

  rect(ctx, 16, 117, 48, 1, palette.quiltShadow);
  rect(ctx, 18, 118, 44, 1, palette.quiltLight);
  rect(ctx, 16, 127, 48, 1, palette.quiltShadow);
  rect(ctx, 18, 128, 44, 1, palette.quiltLight);
  rect(ctx, 16, 137, 48, 1, palette.quiltShadow);
  rect(ctx, 18, 138, 44, 1, palette.quiltLight);
  rect(ctx, 15, 143, 50, 2, palette.quiltShadow);
}

function drawWovenRug(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  drawDitherBand(ctx, 109, 160, 128, 2, palette.aoColor, 0.48);

  for (let fy = 116; fy <= 157; fy += 2) {
    const fLen = fy % 4 === 0 ? 3 : 2;
    rect(ctx, 110 - fLen, fy, fLen, 1, palette.rugFringe);
    px(ctx, 109, fy, palette.rugFringeShadow);
    rect(ctx, 236, fy, fLen, 1, palette.rugFringe);
    px(ctx, 236, fy, palette.rugFringeShadow);
  }

  rect(ctx, 110, 114, 126, 46, palette.inkOutline);
  rect(ctx, 111, 115, 124, 44, palette.rugBorder);
  rect(ctx, 111, 115, 124, 1, palette.rugBorderHighlight);
  rect(ctx, 111, 115, 1, 44, palette.rugBorderHighlight);
  rect(ctx, 111, 158, 124, 1, palette.rugShadow);

  rect(ctx, 114, 118, 118, 38, palette.rugBase);

  for (let ry = 118; ry < 156; ry += 1) {
    for (let rx = 114; rx < 232; rx += 1) {
      if (((rx + ry) & 3) === 0) {
        px(ctx, rx, ry, palette.rugMid);
      } else if (((rx - ry) & 7) === 0 && rx > 124 && rx < 222 && ry > 122 && ry < 152) {
        px(ctx, rx, ry, palette.rugPatternDark);
      }
    }
  }

  for (let tx = 116; tx < 230; tx += 3) {
    px(ctx, tx, 120, palette.rugAccent);
    px(ctx, tx, 153, palette.rugAccent);
  }
  for (let ty = 120; ty < 154; ty += 3) {
    px(ctx, 116, ty, palette.rugAccent);
    px(ctx, 229, ty, palette.rugAccent);
  }

  const corners: readonly [number, number][] = [
    [121, 125],
    [224, 125],
    [121, 148],
    [224, 148],
  ];
  for (const [cx, cy] of corners) {
    px(ctx, cx, cy - 2, palette.rugAccent);
    rect(ctx, cx - 1, cy - 1, 3, 1, palette.rugAccent);
    rect(ctx, cx - 2, cy, 5, 1, palette.rugBorderHighlight);
    rect(ctx, cx - 1, cy + 1, 3, 1, palette.rugAccent);
    px(ctx, cx, cy + 2, palette.rugAccent);
  }

  const midX = 173;
  const midY = 137;
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
  drawDitherBand(ctx, 108, 109, 48, 5, palette.aoColor, 0.55);
  drawDitherBand(ctx, 190, 109, 48, 5, palette.aoColor, 0.55);
  drawDitherBand(ctx, 108, 113, 130, 2, palette.aoColor, 0.25);

  rect(ctx, 122, 97, 39, 3, palette.woodDeep);
  rect(ctx, 185, 97, 39, 3, palette.woodDeep);
  rect(ctx, 122, 100, 37, 5, palette.woodDeep);
  rect(ctx, 187, 100, 37, 5, palette.woodDeep);

  rect(ctx, 110, 97, 13, 15, palette.inkWood);
  rect(ctx, 111, 97, 11, 13, palette.woodShadow);
  rect(ctx, 112, 99, 9, 4, palette.woodMid);
  rect(ctx, 115, 101, 3, 1, palette.cardGold);
  rect(ctx, 112, 105, 9, 4, palette.woodMid);
  rect(ctx, 115, 107, 3, 1, palette.cardGold);

  rect(ctx, 223, 97, 13, 15, palette.inkWood);
  rect(ctx, 224, 97, 11, 13, palette.woodShadow);
  rect(ctx, 225, 99, 9, 4, palette.woodMid);
  rect(ctx, 228, 101, 3, 1, palette.cardGold);
  rect(ctx, 225, 105, 9, 4, palette.woodMid);
  rect(ctx, 228, 107, 3, 1, palette.cardGold);

  rect(ctx, 108, 72, 130, 26, palette.inkWood);
  rect(ctx, 109, 73, 128, 19, palette.woodMid);
  rect(ctx, 109, 73, 128, 1, palette.woodRimGlow);
  rect(ctx, 109, 74, 128, 1, palette.woodHighlight);
  rect(ctx, 109, 91, 128, 1, palette.woodHighlight);
  rect(ctx, 109, 92, 128, 5, palette.woodShadow);
  rect(ctx, 109, 92, 128, 1, palette.woodMid);

  for (let gx = 114; gx < 232; gx += 22) {
    rect(ctx, gx, 77, 11, 1, palette.woodShadow);
    rect(ctx, gx + 5, 86, 9, 1, palette.woodHighlight);
  }

  rect(ctx, 148, 78, 50, 12, palette.inkIndigo);
  rect(ctx, 149, 79, 48, 10, palette.deskPadDark);
  rect(ctx, 149, 79, 48, 1, palette.deskMatRim);
  rect(ctx, 149, 88, 48, 1, palette.deskPadLight);

  drawSpeaker(ctx, palette, 111, 57);
  drawSpeaker(ctx, palette, 199, 57);

  drawSideLaptop(ctx, palette, timeState);

  rect(ctx, 163, 75, 20, 3, palette.inkIndigo);
  rect(ctx, 164, 76, 18, 1, palette.chassisMid);
  rect(ctx, 169, 72, 8, 4, palette.inkIndigo);
  rect(ctx, 170, 72, 6, 4, palette.chassisShadow);

  rect(ctx, 150, 46, 46, 26, palette.inkIndigo);
  rect(ctx, 151, 47, 44, 24, palette.chassisMid);
  rect(ctx, 151, 47, 44, 1, palette.chassisRim);
  rect(ctx, 151, 47, 1, 24, palette.chassisLight);
  rect(ctx, 151, 70, 44, 1, palette.chassisShadow);
  px(ctx, 173, 47, palette.chassisShadow);
  px(ctx, 192, 70, timeState === 'sleeping' ? '#4ADE80' : '#67D97E');

  rect(ctx, 152, 48, 42, 21, palette.chassisShadow);
  rect(ctx, 153, 49, 40, 19, palette.screenOff);

  if (timeState !== 'sleeping') {
    rect(ctx, 151, 81, 30, 1, palette.keyboardGlow);
  }
  rect(ctx, 151, 82, 30, 6, palette.inkIndigo);
  rect(ctx, 152, 83, 28, 4, palette.chassisShadow);
  for (let kx = 153; kx <= 178; kx += 2) {
    px(ctx, kx, 83, kx === 153 ? '#E67A72' : palette.keycapLight);
    px(ctx, kx, 85, palette.keycapShadow);
  }
  rect(ctx, 159, 86, 14, 1, palette.keycapLight);

  rect(ctx, 184, 81, 11, 8, palette.inkIndigo);
  rect(ctx, 185, 82, 9, 6, palette.deskPadLight);
  rect(ctx, 187, 83, 6, 5, palette.inkIndigo);
  rect(ctx, 188, 84, 4, 3, palette.chassisLight);
  px(ctx, 189, 84, palette.chassisShadow);

  rect(ctx, 113, 84, 5, 4, palette.inkOutline);
  rect(ctx, 114, 85, 3, 2, '#FACC15');
  rect(ctx, 114, 82, 4, 3, '#FDE047');
  px(ctx, 118, 83, '#F97316');

  rect(ctx, 123, 81, 5, 2, palette.leafMid);
  px(ctx, 124, 80, palette.leafLight);
  px(ctx, 126, 80, palette.leafLight);
  rect(ctx, 122, 83, 7, 5, palette.inkOutline);
  rect(ctx, 123, 84, 5, 3, palette.potMid);

  rect(ctx, 197, 86, 9, 2, palette.woodShadow);
  rect(ctx, 198, 86, 7, 1, palette.woodMid);
  rect(ctx, 204, 81, 3, 4, palette.inkOutline);
  px(ctx, 205, 82, palette.mugLight);
  px(ctx, 205, 83, palette.mugShadow);
  rect(ctx, 197, 79, 8, 7, palette.inkOutline);
  rect(ctx, 198, 80, 6, 5, palette.mugLight);
  rect(ctx, 202, 80, 2, 5, palette.mugShadow);
  rect(ctx, 198, 80, 6, 2, palette.coffeeSurface);

  drawDeskLamp(ctx, palette);
}

function drawSideLaptop(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState
): void {
  rect(ctx, 133, 60, 14, 12, palette.inkIndigo);
  rect(ctx, 134, 61, 12, 10, palette.laptopBodyShadow);
  rect(ctx, 134, 61, 12, 1, palette.laptopBodyLight);
  rect(ctx, 134, 61, 1, 10, palette.laptopBodyLight);
  rect(ctx, 134, 62, 12, 8, palette.screenOff);

  if (timeState !== 'sleeping') {
    rect(ctx, 135, 63, 5, 1, '#60A5FA');
    rect(ctx, 135, 65, 8, 1, '#94A3B8');
    rect(ctx, 135, 67, 6, 1, '#4ADE80');
  }

  rect(ctx, 132, 72, 16, 5, palette.inkIndigo);
  rect(ctx, 133, 73, 14, 3, palette.laptopBodyLight);
  rect(ctx, 134, 73, 12, 1, palette.chassisShadow);
  rect(ctx, 137, 75, 5, 1, palette.laptopBodyShadow);
}

function drawSpeaker(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  x: number,
  y: number
): void {
  rect(ctx, x, y + 23, 16, 1, palette.woodShadow);
  rect(ctx, x, y, 16, 23, palette.inkIndigo);
  rect(ctx, x + 1, y + 1, 14, 21, palette.chassisMid);
  rect(ctx, x + 1, y + 1, 14, 1, palette.chassisRim);
  rect(ctx, x + 1, y + 1, 1, 21, palette.chassisLight);
  rect(ctx, x + 2, y + 2, 12, 19, palette.chassisShadow);

  rect(ctx, x + 6, y + 4, 4, 4, palette.speakerConeDark);
  px(ctx, x + 7, y + 5, palette.speakerConeRim);
  px(ctx, x + 8, y + 5, palette.speakerConeRim);

  rect(ctx, x + 3, y + 9, 10, 10, palette.speakerConeRim);
  rect(ctx, x + 4, y + 10, 8, 8, palette.speakerConeDark);
  px(ctx, x + 3, y + 9, palette.chassisShadow);
  px(ctx, x + 12, y + 9, palette.chassisShadow);
  px(ctx, x + 3, y + 18, palette.chassisShadow);
  px(ctx, x + 12, y + 18, palette.chassisShadow);
  rect(ctx, x + 7, y + 13, 2, 2, palette.chassisLight);

  rect(ctx, x + 4, y + 20, 5, 1, palette.inkIndigo);
  px(ctx, x + 12, y + 20, '#5AD17A');
}

function drawDeskLamp(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  rect(ctx, 224, 79, 10, 6, palette.inkIndigo);
  rect(ctx, 225, 80, 8, 4, palette.chassisMid);
  rect(ctx, 225, 80, 8, 1, palette.chassisRim);
  px(ctx, 227, 81, palette.lampOn ? palette.lampBulbGlow : palette.chassisShadow);

  rect(ctx, 229, 70, 2, 10, palette.inkIndigo);
  rect(ctx, 230, 59, 2, 12, palette.inkIndigo);
  rect(ctx, 227, 53, 4, 7, palette.inkIndigo);
  rect(ctx, 230, 61, 1, 18, palette.cardGold);
  rect(ctx, 228, 54, 2, 6, palette.lampShadeLight);

  rect(ctx, 218, 52, 12, 9, palette.inkIndigo);
  rect(ctx, 220, 53, 8, 2, palette.lampShadeLight);
  rect(ctx, 219, 55, 10, 3, palette.lampShadeMid);
  rect(ctx, 218, 58, 12, 2, palette.lampShadeShadow);

  if (palette.lampOn) {
    rect(ctx, 219, 59, 9, 2, palette.lampBulbGlow);
    rect(ctx, 220, 60, 6, 1, '#FFF9D6');
  } else {
    rect(ctx, 219, 59, 9, 1, palette.chassisShadow);
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

function drawCornerFloorFern(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  const x = 289;
  const y = 149;
  rect(ctx, x + 2, y + 20, 16, 4, palette.aoColor);
  rect(ctx, x + 4, y + 12, 12, 10, palette.inkOutline);
  rect(ctx, x + 5, y + 13, 10, 8, palette.potMid);
  rect(ctx, x + 5, y + 13, 3, 8, palette.potLight);
  rect(ctx, x + 12, y + 13, 3, 8, palette.potShadow);
  for (let i = -2; i <= 2; i += 1) {
    const fx = x + 9 + i * 3;
    const fy = y + 3 + Math.abs(i) * 2;
    rect(ctx, fx, fy, 3, 10 - Math.abs(i), i === 0 ? palette.leafLight : palette.leafMid);
    px(ctx, fx + 1, fy - 1, palette.leafShadow);
  }
}

export function drawRoomBaseLayer(
  ctx: CanvasRenderingContext2D,
  options: DrawRoomEnvironmentOptions
): void {
  const { timeState, tick, palette } = options;
  const timeSec = options.elapsedSec ?? tick / 15;
  const isMusicActive = Boolean(options.isMusicActive);

  ctx.clearRect(0, 0, ROOM_WIDTH, ROOM_HEIGHT);

  drawBackWall(ctx, palette);
  drawFloorPlanks(ctx, palette, timeState);
  drawWindow(ctx, palette, timeState, timeSec);
  drawSunsetPoster(ctx, palette, timeSec);
  drawKanbanMoodboard(ctx, palette);
  drawWallClock(ctx, palette, timeState, timeSec);
  drawWovenRug(ctx, palette);
  drawDisplayShelfAndPlant(ctx, palette, timeSec, isMusicActive);
  drawOverheadPendants(ctx, palette, timeState);
  drawFairyLights(ctx, palette, timeState, timeSec);
  drawBedBase(ctx, palette);
  drawCornerFloorFern(ctx, palette);
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
    ctx.fillRect(0, 0, ROOM_WIDTH, 10);
    ctx.fillRect(0, 10, 76, 32);
    ctx.fillRect(142, 10, ROOM_WIDTH - 142, 32);
    ctx.fillRect(0, 42, ROOM_WIDTH, ROOM_HEIGHT - 42);
    ctx.restore();
    return;
  }

  ctx.fillRect(0, 0, ROOM_WIDTH, 10);
  ctx.fillRect(0, 10, 76, 32);
  ctx.fillRect(142, 10, ROOM_WIDTH - 142, 32);
  ctx.fillRect(0, 42, ROOM_WIDTH, 7);
  ctx.fillRect(0, 49, 153, 13);
  ctx.fillRect(193, 49, ROOM_WIDTH - 193, 13);
  ctx.fillRect(0, 62, 134, 6);
  ctx.fillRect(146, 62, 7, 6);
  ctx.fillRect(193, 62, ROOM_WIDTH - 193, 6);
  ctx.fillRect(0, 68, 134, 2);
  ctx.fillRect(146, 68, ROOM_WIDTH - 146, 2);
  ctx.fillRect(0, 70, ROOM_WIDTH, ROOM_HEIGHT - 70);
  ctx.restore();
}

function drawFairyGlow(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState,
  timeSec: number
): void {
  const isLit = timeState === 'late_night' || (timeState === 'sleeping' && palette.lampOn);
  if (!isLit || palette.fairyGlowAlpha <= 0) return;

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

  const yStart = 16;
  const yEnd = 148;
  for (let y = yStart; y < yEnd; y += 1) {
    const dy = Math.max(0, y - 42);
    const leftX = Math.floor(76 + dy * 0.25);
    const rightX = Math.ceil(142 + dy * 0.34);
    const vFactor = y < 48 ? 0.55 : Math.max(0, 1 - (y - 48) / 104);
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
      const edgeFactor = Math.min(1, distEdge / Math.max(3, edgeSpan));
      const inDeskGear = x >= 110 && x <= 194 && y >= 55 && y <= 92;
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
    for (let i = 0; i < 14; i += 1) {
      const verticalCycle = (i * 8.5 + timeSec * 4.2) % 88;
      const my = Math.round(44 + verticalCycle);
      const dy = Math.max(0, my - 42);
      const minBeamX = Math.floor(79 + dy * 0.25);
      const maxBeamX = Math.ceil(138 + dy * 0.34);
      const laneOffset = (i * 19) % Math.max(8, maxBeamX - minBeamX - 4);
      const swayX = Math.round(Math.sin(timeSec * 0.9 + i * 1.4) * 2.4);
      const mx = Math.max(minBeamX, Math.min(maxBeamX, minBeamX + laneOffset + swayX));
      const shimmer = 0.32 + 0.38 * (0.5 + 0.5 * Math.sin(timeSec * 1.8 + i * 2.1));
      const inDeskGear = mx >= 110 && mx <= 194 && my >= 55 && my <= 92;
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

  const yStart = 60;
  const yEnd = 104;
  for (let y = yStart; y <= yEnd; y += 1) {
    const dy = y - yStart;
    const leftX = Math.floor(217 - dy * 0.72);
    const rightX = Math.ceil(229 + dy * 0.14);
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

  const pendantAlpha =
    timeState === 'late_night'
      ? 0.24
      : timeState === 'sleeping'
        ? lampOn
          ? 0.16
          : 0
        : timeState === 'waking'
          ? 0.12
          : 0.08;
  if (pendantAlpha > 0) {
    for (const pxCenter of PENDANT_XS) {
      drawBayerRadialPool(
        ctx,
        pxCenter,
        24,
        16,
        14,
        14,
        42,
        palette.pendantGlow,
        pendantAlpha,
        1.1
      );
    }
  }

  drawFairyGlow(ctx, palette, timeState, timeSec);
  drawBayerWindowBeam(ctx, palette, timeState, timeSec);

  if (lampOn && palette.lampGlowAlpha > 0) {
    drawBayerLampCone(ctx, palette.lampGlowColor, palette.lampGlowAlpha * 0.56);
    drawBayerRadialPool(
      ctx,
      213,
      80,
      44,
      34,
      58,
      116,
      palette.lampGlowColor,
      palette.lampGlowAlpha * 0.65,
      1.15
    );
    drawBayerRadialPool(
      ctx,
      221,
      68,
      17,
      13,
      58,
      84,
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
      69,
      38,
      23,
      47,
      95,
      palette.screenGlowColor,
      screenAlpha,
      1.05
    );
    drawBayerRadialPool(
      ctx,
      140,
      70,
      14,
      11,
      58,
      83,
      palette.screenGlowColor,
      screenAlpha * 0.55,
      1.0
    );
  }
}
