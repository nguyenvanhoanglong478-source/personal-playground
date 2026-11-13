import {
  ROOM_HEIGHT,
  ROOM_WIDTH,
  RoomHotspotId,
  RoomHotspotRegion,
  RoomTimeState,
} from '../../data/workspace';
import { RoomPalette } from './pixelPalette';

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
  createHotspot('shelf', 212, 14, 84, 66, 254, 12),
  createHotspot('bed', 12, 74, 60, 82, 42, 70),
  createHotspot('monitor', 146, 46, 54, 42, 172, 42),
  createHotspot('speakers', 112, 58, 20, 28, 122, 54),
  createHotspot('speakers', 206, 58, 20, 28, 216, 54),
  createHotspot('lamp', 222, 54, 24, 34, 232, 50),
  createHotspot('capybara', 204, 126, 28, 26, 218, 122),
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
  '....ooo...............',
  '...oHHCo..............',
  '..oYHCCo...oSSSSSoooo.',
  '...oCCCo..oLGGGGGoRRRo',
  '...oCCCo..oGGGGGGGoRRo',
  '..oLCCCo.oGGGGGGGoRDRo',
  '.oLGGDoo.oGGGDDDDGooo.',
  'oGTTToooGGGGDDDDGGooo.',
  'oGTTo..oGMMMMMMGoTTTo.',
  'oTHTo..oGDDDDDGGoTHTo.',
  'oTHTo...oo...oo.oTHTo.',
  '.ooo.............ooo..',
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
  rect(ctx, 0, 0, ROOM_WIDTH, 56, palette.wallMid);
  rect(ctx, 0, 0, ROOM_WIDTH, 2, palette.wallCeilingShade);
  drawDitherBand(ctx, 0, 2, ROOM_WIDTH, 2, palette.wallCeilingShade, 0.5);
  rect(ctx, 56, 4, 208, 48, palette.wallLight);
  drawDitherBand(ctx, 42, 4, 14, 48, palette.wallLight, 0.5);
  drawDitherBand(ctx, 264, 4, 14, 48, palette.wallLight, 0.5);
  rect(ctx, 0, 2, 16, 54, palette.wallShadow);
  drawDitherBand(ctx, 16, 2, 10, 54, palette.wallShadow, 0.5);
  rect(ctx, 304, 2, 16, 54, palette.wallShadow);
  drawDitherBand(ctx, 294, 2, 10, 54, palette.wallShadow, 0.5);

  for (let x = 28; x < 300; x += 19) {
    const y = 10 + ((x * 7) % 34);
    px(ctx, x, y, x > 56 && x < 264 ? palette.wallMid : palette.wallLight);
    if (x % 38 === 0) {
      px(ctx, x + 4, y + 8, palette.wallShadow);
    }
  }

  rect(ctx, 0, 54, ROOM_WIDTH, 1, palette.wainscotHighlight);
  rect(ctx, 0, 55, ROOM_WIDTH, 1, palette.inkWood);
  rect(ctx, 0, 56, ROOM_WIDTH, 6, palette.wainscotMid);
  for (let x = 0; x < ROOM_WIDTH; x += 8) {
    rect(ctx, x, 56, 1, 6, palette.wainscotHighlight);
    rect(ctx, x + 7, 56, 1, 6, palette.wainscotShadow);
  }
  rect(ctx, 0, 62, ROOM_WIDTH, 1, palette.baseboardTrim);
  rect(ctx, 0, 63, ROOM_WIDTH, 1, palette.inkWood);
}

function drawFloorPlanks(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  rect(ctx, 0, 64, ROOM_WIDTH, ROOM_HEIGHT - 64, palette.floorMid);

  const plankHeight = 8;
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
      }
      const grainOffset = (sx * 13 + rowIdx * 17) % 24;
      const grainX = sx + 6 + grainOffset;
      if (grainX + 8 < ROOM_WIDTH && h > 4) {
        rect(ctx, grainX, py + 3, 7, 1, palette.floorGrain);
        rect(ctx, grainX + 2, py + 5, 5, 1, palette.floorGrain);
      }
      if ((rowIdx + sx) % 5 === 0 && sx + 16 < ROOM_WIDTH && h > 5) {
        px(ctx, sx + 14, py + 4, palette.floorSeam);
        px(ctx, sx + 15, py + 4, palette.floorShadow);
        px(ctx, sx + 14, py + 3, palette.floorHighlight);
      }
    }
  }

  rect(ctx, 0, 64, ROOM_WIDTH, 1, palette.wallFloorAo);
  drawDitherBand(ctx, 0, 65, ROOM_WIDTH, 1, palette.wallFloorAo, 0.75);
  drawDitherBand(ctx, 0, 66, ROOM_WIDTH, 1, palette.wallFloorAo, 0.5);
  drawDitherBand(ctx, 0, 67, ROOM_WIDTH, 1, palette.wallFloorAo, 0.25);

  drawDitherBand(ctx, 0, 64, 4, ROOM_HEIGHT - 64, palette.aoColor, 0.25);
  drawDitherBand(ctx, ROOM_WIDTH - 4, 64, 4, ROOM_HEIGHT - 64, palette.aoColor, 0.25);
}

function drawWindow(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState,
  tick: number
): void {
  drawDitherBand(ctx, 75, 11, 75, 42, palette.wallShadow, 0.5);
  rect(ctx, 82, 11, 60, 38, palette.inkWood);
  rect(ctx, 83, 12, 58, 35, palette.woodMid);
  rect(ctx, 83, 12, 58, 1, palette.woodHighlight);
  rect(ctx, 83, 12, 1, 35, palette.woodHighlight);

  const skyX = 86;
  const skyY = 14;
  const skyW = 52;
  const skyH = 32;

  rect(ctx, skyX, skyY, skyW, 10, palette.skyTop);
  drawDitherBand(ctx, skyX, skyY + 9, skyW, 2, palette.skyMid, 0.5);
  rect(ctx, skyX, skyY + 11, skyW, 11, palette.skyMid);
  drawDitherBand(ctx, skyX, skyY + 21, skyW, 2, palette.skyHorizon, 0.5);
  rect(ctx, skyX, skyY + 23, skyW, 9, palette.skyHorizon);

  if (timeState === 'sleeping') {
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
      [92, 18],
      [104, 21],
      [97, 29],
      [115, 25],
      [133, 27],
    ];
    for (const [sx, sy] of nightStars) {
      px(ctx, sx, sy, palette.moonColor);
    }
  } else if (timeState === 'late_night') {
    const duskStars: readonly [number, number][] = [
      [92, 17],
      [106, 20],
      [126, 18],
      [132, 23],
    ];
    for (const [sx, sy] of duskStars) {
      px(ctx, sx, sy, palette.moonColor);
    }
    const duskCloudX = 86 + ((Math.floor(tick * 0.15) + 12) % 64) - 10;
    drawMatrix(
      ctx,
      CLOUD_SMALL_MATRIX,
      { h: palette.cloudHighlight, s: palette.cloudShadow },
      duskCloudX,
      24,
      skyX,
      skyY,
      skyX + skyW,
      skyY + skyH
    );
  } else {
    const driftA = 86 + ((Math.floor(tick * 0.22) + 8) % 66) - 12;
    const driftB = 86 + ((Math.floor(tick * 0.14) + 38) % 66) - 12;
    drawMatrix(
      ctx,
      CLOUD_LARGE_MATRIX,
      { h: palette.cloudHighlight, s: palette.cloudShadow },
      driftA,
      18,
      skyX,
      skyY,
      skyX + skyW,
      skyY + skyH
    );
    drawMatrix(
      ctx,
      CLOUD_SMALL_MATRIX,
      { h: palette.cloudHighlight, s: palette.cloudShadow },
      driftB,
      25,
      skyX,
      skyY,
      skyX + skyW,
      skyY + skyH
    );
  }

  rect(ctx, 86, 41, 14, 5, palette.skySilhouette);
  rect(ctx, 89, 39, 7, 2, palette.skySilhouette);
  rect(ctx, 100, 42, 10, 4, palette.skySilhouette);
  rect(ctx, 103, 40, 4, 2, palette.skySilhouette);
  rect(ctx, 112, 41, 12, 5, palette.skySilhouette);
  rect(ctx, 115, 38, 6, 3, palette.skySilhouette);
  rect(ctx, 124, 40, 14, 6, palette.skySilhouette);
  rect(ctx, 127, 37, 8, 3, palette.skySilhouette);

  ctx.save();
  ctx.globalAlpha = 0.25;
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

  rect(ctx, 79, 47, 66, 4, palette.inkWood);
  rect(ctx, 80, 47, 64, 1, palette.woodHighlight);
  rect(ctx, 80, 48, 64, 1, palette.woodMid);
  rect(ctx, 80, 49, 64, 1, palette.woodShadow);
  drawDitherBand(ctx, 80, 51, 64, 2, palette.wallShadow, 0.5);

  rect(ctx, 74, 8, 76, 2, palette.inkWood);
  rect(ctx, 75, 8, 74, 1, palette.woodHighlight);
  rect(ctx, 74, 7, 2, 4, palette.woodMid);
  rect(ctx, 148, 7, 2, 4, palette.woodMid);

  drawCurtainSide(ctx, palette, 76, 10, true);
  drawCurtainSide(ctx, palette, 138, 10, false);
}

function drawCurtainSide(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  x: number,
  y: number,
  isLeft: boolean
): void {
  const w = 10;
  const h = 40;

  for (let row = 0; row < h; row += 1) {
    const py = y + row;
    const isTieBand = row >= 22 && row <= 24;
    const innerPinch = isTieBand ? 2 : row > 18 && row < 27 ? 1 : 0;
    const startCol = isLeft ? 1 : 1 + innerPinch;
    const endCol = isLeft ? w - 1 - innerPinch : w - 1;

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
  tick: number
): void {
  const x = 162;
  const y = 14;
  drawDitherBand(ctx, x + 1, y + 1, 16, 22, palette.wallShadow, 0.5);
  rect(ctx, x, y, 16, 22, palette.inkIndigo);
  rect(ctx, x + 1, y + 1, 14, 20, palette.cardIndigo);
  rect(ctx, x + 1, y + 1, 14, 1, palette.cardGold);
  rect(ctx, x + 1, y + 1, 1, 20, palette.cardGold);
  rect(ctx, x + 2, y + 2, 12, 18, palette.cardGold);
  rect(ctx, x + 3, y + 3, 10, 16, '#F5E7BC');

  rect(ctx, x + 4, y + 4, 8, 7, '#2A3F6E');
  rect(ctx, x + 5, y + 5, 6, 5, '#4A82B5');

  const phase = Math.floor(tick / 4) % 14;
  for (let row = 0; row < 7; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      if ((col + row) % 10 === phase % 10) {
        px(ctx, x + 4 + col, y + 4 + row, (col + row) % 2 === 0 ? palette.cardHoloA : palette.cardHoloB);
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
  timeState: RoomTimeState
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

  if (timeState === 'waking') {
    px(ctx, cx - 1, cy + 1, palette.clockHand);
    px(ctx, cx - 2, cy + 2, palette.clockHand);
    rect(ctx, cx, cy + 1, 1, 4, palette.clockHand);
  } else if (timeState === 'working') {
    rect(ctx, cx + 1, cy, 3, 1, palette.clockHand);
    rect(ctx, cx, cy - 4, 1, 4, palette.clockHand);
  } else if (timeState === 'late_night') {
    px(ctx, cx - 1, cy - 1, palette.clockHand);
    px(ctx, cx - 2, cy - 2, palette.clockHand);
    rect(ctx, cx + 1, cy, 4, 1, palette.clockHand);
  } else {
    px(ctx, cx + 1, cy - 1, palette.clockHand);
    px(ctx, cx + 2, cy - 2, palette.clockHand);
    rect(ctx, cx, cy - 4, 1, 4, palette.clockHand);
  }

  px(ctx, cx, cy, palette.cardGold);
}

function drawDisplayShelfAndPlant(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette
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
  rect(ctx, 246, 62, 4, 12, '#D9CBB4');
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

  rect(ctx, 245, 33, 4, 1, palette.woodShadow);
  rect(ctx, 261, 33, 4, 1, palette.woodShadow);
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
    244,
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

  drawMatrix(
    ctx,
    PLANT_MATRIX,
    {
      o: palette.inkOutline,
      L: palette.leafLight,
      M: palette.leafMid,
      D: palette.leafShadow,
      B: '#3A2822',
      R: palette.potLight,
      P: palette.potMid,
      T: palette.potShadow,
    },
    270,
    20
  );
}

function drawBed(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
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

  rect(ctx, 17, 88, 50, 16, palette.sheetTrim);
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

  rect(ctx, 17, 103, 50, 4, palette.sheetTrim);
  rect(ctx, 17, 106, 50, 1, palette.pillowShadow);

  rect(ctx, 16, 107, 52, 40, palette.inkOutline);
  rect(ctx, 17, 108, 50, 38, palette.quiltMid);
  rect(ctx, 17, 108, 50, 2, palette.quiltLight);

  for (let qy = 110; qy < 145; qy += 1) {
    for (let qx = 18; qx < 66; qx += 1) {
      const gx = (qx - 18) >> 2;
      const gy = (qy - 110) >> 2;
      if ((gx + gy) % 2 === 0) {
        px(ctx, qx, qy, palette.quiltPattern);
      }
    }
  }

  rect(ctx, 17, 108, 2, 38, palette.quiltShadow);
  rect(ctx, 65, 108, 2, 38, palette.quiltShadow);

  rect(ctx, 18, 120, 48, 1, palette.quiltShadow);
  rect(ctx, 20, 121, 44, 1, palette.quiltLight);
  rect(ctx, 18, 133, 48, 1, palette.quiltShadow);
  rect(ctx, 20, 134, 44, 1, palette.quiltLight);
  rect(ctx, 17, 144, 50, 2, palette.quiltShadow);

  rect(ctx, 15, 147, 54, 4, palette.woodMid);
  rect(ctx, 15, 147, 54, 1, palette.woodHighlight);
  rect(ctx, 15, 150, 54, 1, palette.woodShadow);
}

function drawWovenRug(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  drawDitherBand(ctx, 110, 166, 117, 2, palette.aoColor, 0.45);

  for (let fy = 116; fy <= 164; fy += 2) {
    const fLen = fy % 4 === 0 ? 3 : 2;
    rect(ctx, 110 - fLen, fy, fLen, 1, palette.rugFringe);
    rect(ctx, 226, fy, fLen, 1, palette.rugFringe);
  }

  rect(ctx, 110, 114, 116, 52, palette.inkOutline);
  rect(ctx, 111, 115, 114, 50, palette.rugBorder);
  rect(ctx, 111, 115, 114, 1, palette.rugBorderHighlight);
  rect(ctx, 111, 115, 1, 50, palette.rugBorderHighlight);
  rect(ctx, 111, 164, 114, 1, palette.rugShadow);

  rect(ctx, 114, 118, 108, 44, palette.rugBase);

  for (let ry = 118; ry < 162; ry += 1) {
    for (let rx = 114; rx < 222; rx += 1) {
      if (((rx + ry) & 3) === 0) {
        px(ctx, rx, ry, palette.rugMid);
      }
    }
  }

  for (let tx = 116; tx < 220; tx += 3) {
    px(ctx, tx, 120, palette.rugAccent);
    px(ctx, tx, 159, palette.rugAccent);
  }
  for (let ty = 120; ty < 160; ty += 3) {
    px(ctx, 116, ty, palette.rugAccent);
    px(ctx, 219, ty, palette.rugAccent);
  }

  const corners: readonly [number, number][] = [
    [120, 124],
    [215, 124],
    [120, 155],
    [215, 155],
  ];
  for (const [cx, cy] of corners) {
    px(ctx, cx, cy - 2, palette.rugAccent);
    rect(ctx, cx - 1, cy - 1, 3, 1, palette.rugAccent);
    rect(ctx, cx - 2, cy, 5, 1, palette.rugBorderHighlight);
    rect(ctx, cx - 1, cy + 1, 3, 1, palette.rugAccent);
    px(ctx, cx, cy + 2, palette.rugAccent);
  }
}

function drawDeskAndProps(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  drawDitherBand(ctx, 110, 107, 126, 5, palette.aoColor, 0.55);
  drawDitherBand(ctx, 110, 112, 126, 2, palette.aoColor, 0.25);

  rect(ctx, 120, 97, 104, 8, palette.woodDeep);
  rect(ctx, 110, 97, 13, 15, palette.inkWood);
  rect(ctx, 111, 97, 11, 13, palette.woodShadow);
  rect(ctx, 112, 99, 9, 4, palette.woodMid);
  rect(ctx, 115, 101, 3, 1, palette.cardGold);
  rect(ctx, 112, 105, 9, 4, palette.woodMid);
  rect(ctx, 115, 107, 3, 1, palette.cardGold);

  rect(ctx, 221, 97, 13, 15, palette.inkWood);
  rect(ctx, 222, 97, 11, 13, palette.woodShadow);
  rect(ctx, 223, 99, 9, 4, palette.woodMid);
  rect(ctx, 226, 101, 3, 1, palette.cardGold);
  rect(ctx, 223, 105, 9, 4, palette.woodMid);
  rect(ctx, 226, 107, 3, 1, palette.cardGold);

  rect(ctx, 108, 72, 128, 26, palette.inkWood);
  rect(ctx, 109, 73, 126, 19, palette.woodMid);
  rect(ctx, 109, 73, 126, 2, palette.woodHighlight);
  rect(ctx, 109, 91, 126, 1, palette.woodHighlight);
  rect(ctx, 109, 92, 126, 5, palette.woodShadow);
  rect(ctx, 109, 92, 126, 1, palette.woodMid);

  for (let gx = 114; gx < 230; gx += 22) {
    rect(ctx, gx, 77, 11, 1, palette.woodShadow);
    rect(ctx, gx + 5, 86, 9, 1, palette.woodHighlight);
  }

  rect(ctx, 148, 80, 58, 11, palette.inkIndigo);
  rect(ctx, 149, 81, 56, 9, palette.deskPadDark);
  rect(ctx, 149, 81, 56, 1, palette.deskPadLight);

  drawSpeaker(ctx, palette, 114, 60);
  drawSpeaker(ctx, palette, 208, 60);

  rect(ctx, 136, 86, 9, 1, palette.woodShadow);
  rect(ctx, 135, 80, 2, 4, palette.inkOutline);
  px(ctx, 136, 81, palette.mugLight);
  px(ctx, 136, 82, palette.mugShadow);
  rect(ctx, 137, 78, 8, 8, palette.inkOutline);
  rect(ctx, 138, 79, 6, 6, palette.mugLight);
  rect(ctx, 142, 80, 2, 5, palette.mugShadow);
  rect(ctx, 138, 79, 6, 2, palette.coffeeSurface);

  rect(ctx, 163, 79, 18, 3, palette.inkIndigo);
  rect(ctx, 164, 80, 16, 1, palette.chassisMid);
  rect(ctx, 168, 76, 8, 4, palette.inkIndigo);
  rect(ctx, 169, 76, 6, 4, palette.chassisShadow);

  rect(ctx, 148, 48, 48, 30, palette.inkIndigo);
  rect(ctx, 149, 49, 46, 28, palette.chassisMid);
  rect(ctx, 149, 49, 46, 1, palette.chassisLight);
  rect(ctx, 149, 49, 1, 28, palette.chassisLight);
  rect(ctx, 149, 76, 46, 1, palette.chassisShadow);
  px(ctx, 191, 76, '#67D97E');

  rect(ctx, 151, 51, 42, 26, palette.chassisShadow);
  rect(ctx, 152, 52, 40, 24, palette.screenOff);

  rect(ctx, 154, 83, 34, 6, palette.inkIndigo);
  rect(ctx, 155, 84, 32, 4, palette.chassisShadow);
  for (let kx = 156; kx <= 184; kx += 2) {
    px(ctx, kx, 84, kx === 156 ? '#E67A72' : '#CED7EB');
    px(ctx, kx, 86, '#B8C2D8');
  }
  rect(ctx, 162, 87, 16, 1, '#DCE4F2');

  rect(ctx, 194, 83, 8, 6, palette.inkIndigo);
  rect(ctx, 195, 84, 6, 4, palette.chassisLight);
  rect(ctx, 195, 86, 6, 2, palette.chassisMid);
  px(ctx, 197, 84, palette.chassisShadow);

  drawDeskLamp(ctx, palette);
}

function drawSpeaker(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  x: number,
  y: number
): void {
  rect(ctx, x, y + 24, 16, 1, palette.woodShadow);
  rect(ctx, x, y, 16, 24, palette.inkIndigo);
  rect(ctx, x + 1, y + 1, 14, 22, palette.chassisMid);
  rect(ctx, x + 1, y + 1, 14, 1, palette.chassisLight);
  rect(ctx, x + 1, y + 1, 1, 22, palette.chassisLight);
  rect(ctx, x + 2, y + 2, 12, 20, palette.chassisShadow);

  rect(ctx, x + 6, y + 3, 4, 4, palette.speakerConeDark);
  px(ctx, x + 7, y + 4, palette.speakerConeRim);
  px(ctx, x + 8, y + 4, palette.speakerConeRim);

  rect(ctx, x + 4, y + 8, 8, 8, palette.speakerConeRim);
  rect(ctx, x + 5, y + 9, 6, 6, palette.speakerConeDark);
  px(ctx, x + 4, y + 8, palette.chassisShadow);
  px(ctx, x + 11, y + 8, palette.chassisShadow);
  px(ctx, x + 4, y + 15, palette.chassisShadow);
  px(ctx, x + 11, y + 15, palette.chassisShadow);
  rect(ctx, x + 7, y + 11, 2, 2, palette.chassisLight);

  px(ctx, x + 12, y + 20, '#5AD17A');
}

function drawDeskLamp(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  rect(ctx, 228, 80, 8, 6, palette.inkIndigo);
  rect(ctx, 229, 81, 6, 4, palette.chassisMid);
  rect(ctx, 229, 81, 6, 1, palette.chassisLight);
  px(ctx, 231, 82, palette.lampOn ? palette.lampBulbGlow : palette.chassisShadow);

  rect(ctx, 232, 72, 2, 9, palette.inkIndigo);
  rect(ctx, 233, 64, 2, 9, palette.inkIndigo);
  rect(ctx, 231, 60, 3, 4, palette.inkIndigo);
  rect(ctx, 233, 66, 1, 14, palette.chassisLight);
  rect(ctx, 232, 61, 2, 3, palette.chassisLight);

  rect(ctx, 223, 58, 10, 8, palette.inkIndigo);
  rect(ctx, 225, 58, 7, 2, palette.lampShadeLight);
  rect(ctx, 224, 60, 9, 3, palette.lampShadeMid);
  rect(ctx, 223, 63, 10, 2, palette.lampShadeShadow);

  if (palette.lampOn) {
    rect(ctx, 224, 64, 7, 2, palette.lampBulbGlow);
    rect(ctx, 225, 65, 5, 1, '#FFF8D2');
  } else {
    rect(ctx, 224, 64, 7, 1, palette.chassisShadow);
  }
}

function drawDeskChair(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  drawDitherBand(ctx, 160, 121, 24, 5, palette.aoColor, 0.5);

  rect(ctx, 171, 114, 2, 8, palette.inkIndigo);
  rect(ctx, 163, 119, 18, 2, palette.inkIndigo);
  rect(ctx, 164, 119, 16, 1, palette.chassisLight);
  rect(ctx, 161, 121, 3, 3, palette.inkIndigo);
  rect(ctx, 170, 122, 4, 3, palette.inkIndigo);
  rect(ctx, 180, 121, 3, 3, palette.inkIndigo);

  rect(ctx, 158, 100, 3, 10, palette.inkIndigo);
  rect(ctx, 159, 101, 1, 8, palette.chairLight);
  rect(ctx, 183, 100, 3, 10, palette.inkIndigo);
  rect(ctx, 184, 101, 1, 8, palette.chairLight);

  rect(ctx, 160, 98, 24, 16, palette.inkIndigo);
  rect(ctx, 161, 99, 22, 10, palette.chairMid);
  rect(ctx, 162, 99, 20, 3, palette.chairLight);
  rect(ctx, 161, 109, 22, 4, palette.chairShadow);
  rect(ctx, 163, 111, 18, 2, palette.chairMid);
}

export function drawRoomEnvironment(
  ctx: CanvasRenderingContext2D,
  options: {
    timeState: RoomTimeState;
    lampOn: boolean;
    tick: number;
    palette: RoomPalette;
  }
): void {
  const { timeState, tick, palette } = options;

  ctx.clearRect(0, 0, ROOM_WIDTH, ROOM_HEIGHT);

  drawBackWall(ctx, palette);
  drawFloorPlanks(ctx, palette);
  drawWindow(ctx, palette, timeState, tick);
  drawHoloCardFrame(ctx, palette, tick);
  drawWallClock(ctx, palette, timeState);
  drawWovenRug(ctx, palette);
  drawDisplayShelfAndPlant(ctx, palette);
  drawBed(ctx, palette);
  drawDeskAndProps(ctx, palette);
  drawDeskChair(ctx, palette);
}

function drawAmbientWithCutouts(
  ctx: CanvasRenderingContext2D,
  color: string,
  alpha: number,
  cutoutScreen: boolean
): void {
  if (alpha <= 0) return;
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;

  if (!cutoutScreen) {
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
  ctx.fillRect(0, 46, ROOM_WIDTH, 6);
  ctx.fillRect(0, 52, 152, 22);
  ctx.fillRect(192, 52, ROOM_WIDTH - 192, 22);
  ctx.fillRect(0, 74, ROOM_WIDTH, ROOM_HEIGHT - 74);
  ctx.restore();
}

function drawBayerWindowBeam(
  ctx: CanvasRenderingContext2D,
  palette: RoomPalette,
  timeState: RoomTimeState,
  tick: number
): void {
  if (palette.windowBeamAlpha <= 0) return;

  ctx.save();
  ctx.fillStyle = palette.windowBeamColor;
  ctx.globalAlpha = palette.windowBeamAlpha;

  const yStart = 20;
  const yEnd = 152;
  for (let y = yStart; y < yEnd; y += 1) {
    const dy = Math.max(0, y - 46);
    const leftX = Math.floor(86 + dy * 0.24);
    const rightX = Math.ceil(138 + dy * 0.35);
    const vFactor = y < 52 ? 0.55 : Math.max(0, 1 - (y - 52) / 106);

    let runStart = -1;
    for (let x = leftX; x <= rightX; x += 1) {
      const span = Math.max(1, rightX - leftX);
      const distEdge = Math.min(x - leftX, rightX - x);
      const edgeFactor = Math.min(1, distEdge / Math.min(10, span * 0.25));
      const intensity = vFactor * edgeFactor;
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

  if (timeState === 'waking' || timeState === 'working') {
    ctx.globalAlpha = 0.52;
    ctx.fillStyle = '#FFFDF0';
    for (let i = 0; i < 6; i += 1) {
      const my = 48 + ((i * 19 + Math.floor(tick * 0.35)) % 82);
      const mx = 94 + ((i * 11 + Math.floor(Math.sin(tick * 0.12 + i) * 3) + Math.floor((my - 46) * 0.26)) % 42);
      ctx.fillRect(mx, my, 1, 1);
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
  options: {
    timeState: RoomTimeState;
    lampOn: boolean;
    isMusicActive: boolean;
    tick: number;
    palette: RoomPalette;
  }
): void {
  const { timeState, lampOn, isMusicActive, tick, palette } = options;

  drawAmbientWithCutouts(
    ctx,
    palette.ambientTint,
    palette.ambientAlpha,
    timeState === 'late_night'
  );

  drawBayerWindowBeam(ctx, palette, timeState, tick);

  if (lampOn && palette.lampGlowAlpha > 0) {
    drawBayerRadialPool(
      ctx,
      221,
      82,
      42,
      34,
      62,
      118,
      palette.lampGlowColor,
      palette.lampGlowAlpha * 0.72,
      1.15
    );
    drawBayerRadialPool(
      ctx,
      225,
      72,
      18,
      14,
      64,
      88,
      '#FFF3AE',
      palette.lampGlowAlpha * 0.55,
      1.2
    );
  }

  if (palette.screenGlowAlpha > 0) {
    const musicBoost = isMusicActive ? 1 + 0.14 * Math.sin(tick * 0.35) : 1;
    const screenAlpha = Math.min(0.4, palette.screenGlowAlpha * musicBoost);
    drawBayerRadialPool(
      ctx,
      172,
      74,
      36,
      24,
      50,
      98,
      palette.screenGlowColor,
      screenAlpha,
      1.05
    );
  }
}
