import type { RoomHotspotId, RoomHotspotRegion, RoomTimeState } from '../../data/workspace';
import type { RoomPalette } from './pixelPalette';
import { RUG_WALK_RECT, WALKABLE_RECT } from './roomEnvironment';

export type SpriteMatrix = readonly string[];

export type SpriteColorMap = Record<string, string | undefined>;

export interface SeatAnchor {
  readonly seatCenterX: number;
  readonly seatTopY: number;
}

export interface DrawCharacterAndEffectsOptions {
  timeState: RoomTimeState;
  lampOn: boolean;
  isMusicActive: boolean;
  tick: number;
  elapsedSec?: number;
  palette: RoomPalette;
  hoveredHotspot: RoomHotspotId | null;
  selectedHotspot: RoomHotspotId | null;
  hoveredRegion?: RoomHotspotRegion | null;
  reducedMotion?: boolean;
  seatAnchor?: SeatAnchor;
}

const MUSIC_FADE_DURATION_SEC = 0.4;

const MAIN_SCREEN_X = 155;
const MAIN_SCREEN_Y = 49;
const MAIN_SCREEN_W = 36;
const MAIN_SCREEN_H = 19;

const SIDE_LAPTOP_X = 136;
const SIDE_LAPTOP_Y = 63;
const SIDE_LAPTOP_W = 11;
const SIDE_LAPTOP_H = 8;

const DESK_MUG_X = 199;
const DESK_MUG_Y = 81;

const LEFT_WOOFER_X = 117;
const LEFT_WOOFER_Y = 68;
const RIGHT_WOOFER_X = 211;
const RIGHT_WOOFER_Y = 68;

const DEFAULT_SEAT_ANCHOR: SeatAnchor = {
  seatCenterX: 173,
  seatTopY: 96,
};

const HEAD_WIDTH = 12;
const HEAD_HEIGHT = 12;
const TORSO_WIDTH = 14;

const SEATED_WIDTH = 50;
const SEATED_TOTAL_HEIGHT = 20;
const SEATED_TORSO_X = 11;
const SEATED_HEAD_X = 12;

const SLEEP_WIDTH = 20;
const SLEEP_HEIGHT = 19;
const SLEEP_DRAW_X = 32;
const SLEEP_DRAW_Y = 89;

const WAKING_WIDTH = 21;
const WAKING_HEIGHT = 29;

interface MusicVisualTracker {
  wasActive: boolean;
  fadeStartAtSec: number | null;
  lastSeenTimeSec: number;
}

const musicTracker: MusicVisualTracker = {
  wasActive: false,
  fadeStartAtSec: null,
  lastSeenTimeSec: 0,
};

export function assertUniformMatrixWidth(
  matrix: SpriteMatrix,
  expectedWidth?: number
): SpriteMatrix {
  if (matrix.length === 0) {
    throw new Error('SpriteMatrix cannot be empty');
  }
  const targetWidth = expectedWidth ?? matrix[0].length;
  for (let i = 0; i < matrix.length; i += 1) {
    if (matrix[i].length !== targetWidth) {
      throw new Error(
        `SpriteMatrix row ${i} length ${matrix[i].length} does not match expected width ${targetWidth}`
      );
    }
  }
  return matrix;
}

export function drawSpriteMatrix(
  ctx: CanvasRenderingContext2D,
  matrix: SpriteMatrix,
  colorMap: SpriteColorMap,
  x: number,
  y: number,
  flipX = false
): void {
  const baseX = Math.round(x);
  const baseY = Math.round(y);
  let lastColor = '';

  for (let rowIdx = 0; rowIdx < matrix.length; rowIdx += 1) {
    const row = matrix[rowIdx];
    const width = row.length;
    const drawY = baseY + rowIdx;

    for (let colIdx = 0; colIdx < width; colIdx += 1) {
      const ch = row[colIdx];
      if (ch === '.' || ch === ' ') {
        continue;
      }
      const color = colorMap[ch];
      if (!color) {
        continue;
      }
      const drawX = flipX ? baseX + (width - 1 - colIdx) : baseX + colIdx;
      if (color !== lastColor) {
        ctx.fillStyle = color;
        lastColor = color;
      }
      ctx.fillRect(drawX, drawY, 1, 1);
    }
  }
}

function fillPixelRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
): void {
  if (w <= 0 || h <= 0) return;
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function pingPong(val: number, span: number): number {
  if (span <= 0) return 0;
  const period = span * 2;
  const mod = ((val % period) + period) % period;
  return mod <= span ? mod : period - mod;
}

function resolveTimeSec(options: DrawCharacterAndEffectsOptions): number {
  const reduced = Boolean(options.reducedMotion);
  return reduced ? 0 : (options.elapsedSec ?? options.tick / 15);
}

const HOTSPOT_POINTER_ANCHORS: Record<RoomHotspotId, { pointerX: number; pointerY: number }> = {
  window: { pointerX: 112, pointerY: 6 },
  shelf: { pointerX: 254, pointerY: 12 },
  bed: { pointerX: 42, pointerY: 70 },
  monitor: { pointerX: 173, pointerY: 43 },
  speakers: { pointerX: 121, pointerY: 54 },
  lamp: { pointerX: 234, pointerY: 50 },
  capybara: { pointerX: 174, pointerY: 118 },
};

const CODE_TOKENS: readonly string[] = [
  'KKKBFWDDDDDDDDDDDDDDD',
  'DDBFFOSSSSSSSSSSDDDDD',
  'DDDDKKKKBFWODDDDDDDDD',
  'DDDDDDBFFWONNNWDDDDDD',
  'DDBKDFFWDDDDDDDDDDDDD',
  'DDDDFFFOSSSSSSSSSDDDD',
  'DDDDDDBFWWONNNDDDDDDD',
  'DDWDDDDDDDDDDDDDDDDDD',
];

const UI_MOCK_SCROLL: readonly string[] = [
  'PPPPPPPPPPP',
  'PAAAAAAAAAP',
  'PAFFAAYYAAP',
  'PAAAAAAAAAP',
  'PAWWWWWWAPP',
  'PAWWWWAAAAP',
  'PGGGGGGPPPP',
  'PPPPPPPPPPP',
  'PAAAAAAAAAP',
  'PAKKKKAWWAP',
  'PAAAAWWWAAP',
  'PAASSSAAFFP',
  'PPPPPPPPPPP',
];

const MONITOR_CODE_COLORS: Record<string, string> = {
  B: '#192136',
  T: '#242F4A',
  A: '#323F61',
  U: '#60A5FA',
  R: '#EA4335',
  Y: '#FBBC04',
  G: '#34A853',
  D: '#111726',
  V: '#222B42',
  N: '#4E5D80',
  K: '#B794F4',
  F: '#60A5FA',
  S: '#4ADE80',
  O: '#F472B6',
  W: '#E2E8F0',
  C: '#67E8F9',
  P: '#171F34',
};

const MONITOR_CODE_COLORS_NIGHT: Record<string, string> = {
  ...MONITOR_CODE_COLORS,
  B: '#121829',
  D: '#0C111E',
  U: '#38BDF8',
  C: '#22D3EE',
  P: '#11192B',
};

const GEMINI_STAR_SPRITE: SpriteMatrix = [
  '..B..',
  '.BPC.',
  'BPWYG',
  '.GYG.',
  '..G..',
];

const GEMINI_STAR_COLORS: SpriteColorMap = {
  B: '#4285F4',
  P: '#9B72CB',
  C: '#D96570',
  Y: '#FBBC04',
  G: '#34A853',
  W: '#FFFFFF',
};

const WAKING_MUG_ICON: SpriteMatrix = [
  '.OOOOO..',
  'OMMMMOOO',
  'OMCCCMMO',
  'OMMMMMOO',
  '.OOOOO..',
];

const WAKING_MUG_COLORS: SpriteColorMap = {
  O: '#2A1C16',
  M: '#F5EFE6',
  C: '#5C3420',
};

function drawMainMonitorScreen(
  ctx: CanvasRenderingContext2D,
  timeState: RoomTimeState,
  timeSec: number,
  reducedMotion: boolean
): void {
  const sx = MAIN_SCREEN_X;
  const sy = MAIN_SCREEN_Y;
  const sw = MAIN_SCREEN_W;
  const sh = MAIN_SCREEN_H;

  if (timeState === 'sleeping') {
    fillPixelRect(ctx, sx, sy, sw, sh, '#0E121D');
    fillPixelRect(ctx, sx + 1, sy + 1, sw - 2, sh - 2, '#121726');

    const starW = 5;
    const starH = 5;
    const bounceSpanX = sw - starW - 2;
    const bounceSpanY = sh - starH - 2;
    const starX = reducedMotion
      ? sx + 6
      : Math.round(sx + 1 + pingPong(timeSec * 9.5 + 3, bounceSpanX));
    const starY = reducedMotion
      ? sy + 4
      : Math.round(sy + 1 + pingPong(timeSec * 6.2 + 2, bounceSpanY));

    if (!reducedMotion) {
      const prevX = Math.round(
        sx + 1 + pingPong(Math.max(0, timeSec - 0.12) * 9.5 + 3, bounceSpanX)
      );
      const prevY = Math.round(
        sy + 1 + pingPong(Math.max(0, timeSec - 0.12) * 6.2 + 2, bounceSpanY)
      );
      ctx.save();
      ctx.globalAlpha = 0.45;
      fillPixelRect(ctx, prevX + 2, prevY + 2, 1, 1, '#9B72CB');
      ctx.restore();
    }

    drawSpriteMatrix(ctx, GEMINI_STAR_SPRITE, GEMINI_STAR_COLORS, starX, starY);

    const ledOn = reducedMotion || Math.floor(timeSec * 1.4) % 2 === 0;
    fillPixelRect(ctx, sx + sw - 3, sy + sh - 2, 2, 1, ledOn ? '#34D399' : '#1B3A32');
    return;
  }

  if (timeState === 'waking') {
    fillPixelRect(ctx, sx, sy, sw, sh, '#3A271E');
    fillPixelRect(ctx, sx, sy, sw, 2, '#271A14');
    fillPixelRect(ctx, sx + 1, sy, 1, 1, '#EA4335');
    fillPixelRect(ctx, sx + 3, sy, 1, 1, '#FBBC04');
    fillPixelRect(ctx, sx + 5, sy, 1, 1, '#34A853');
    fillPixelRect(ctx, sx + 8, sy, 12, 1, '#5A3E30');

    drawSpriteMatrix(ctx, WAKING_MUG_ICON, WAKING_MUG_COLORS, sx + 4, sy + 7);
    const steamTick = reducedMotion ? 0 : Math.floor(timeSec * 3.5) % 3;
    fillPixelRect(ctx, sx + 6 + (steamTick % 2), sy + 5 - (steamTick === 2 ? 1 : 0), 1, 1, '#FDE68A');
    fillPixelRect(ctx, sx + 8 - (steamTick % 2), sy + 4, 1, 1, '#FBBF24');

    const checkStep = reducedMotion ? 2 : Math.floor(timeSec * 1.2) % 3;
    for (let i = 0; i < 3; i += 1) {
      const rowY = sy + 5 + i * 4;
      fillPixelRect(ctx, sx + 16, rowY, 2, 2, i <= checkStep ? '#34A853' : '#6E4C3A');
      fillPixelRect(ctx, sx + 19, rowY, i === 1 ? 13 : 11, 1, '#F5EFE6');
      fillPixelRect(ctx, sx + 19, rowY + 1, 8, 1, '#B89B82');
    }
    fillPixelRect(ctx, sx + 2, sy + sh - 2, 14, 1, '#F59E0B');
    return;
  }

  const palette = timeState === 'late_night' ? MONITOR_CODE_COLORS_NIGHT : MONITOR_CODE_COLORS;
  fillPixelRect(ctx, sx, sy, sw, sh, palette.D);
  fillPixelRect(ctx, sx, sy, sw, 2, palette.T);
  fillPixelRect(ctx, sx + 1, sy, 1, 1, palette.R);
  fillPixelRect(ctx, sx + 3, sy, 1, 1, palette.Y);
  fillPixelRect(ctx, sx + 5, sy, 1, 1, palette.G);
  fillPixelRect(ctx, sx + 8, sy, 8, 1, palette.U);
  fillPixelRect(ctx, sx + 17, sy, 6, 1, palette.A);
  fillPixelRect(ctx, sx + 24, sy, 11, 2, palette.P);

  const codeRows = sh - 3;
  const scrollRow = reducedMotion ? 0 : Math.floor(timeSec * 2.2) % CODE_TOKENS.length;
  const cursorVisible = reducedMotion || Math.floor(timeSec * 2.5) % 2 === 0;

  for (let r = 0; r < codeRows; r += 1) {
    const lineIdx = (r + scrollRow) % CODE_TOKENS.length;
    const tokenLine = CODE_TOKENS[lineIdx];
    const py = sy + 2 + r;
    fillPixelRect(ctx, sx + 1, py, 1, 1, r % 2 === 0 ? palette.N : palette.B);
    fillPixelRect(ctx, sx + 2, py, 1, 1, palette.V);

    for (let c = 0; c < 20; c += 1) {
      const ch = tokenLine[c];
      if (!ch || ch === 'D') continue;
      fillPixelRect(ctx, sx + 3 + c, py, 1, 1, palette[ch] ?? palette.W);
    }
    if (cursorVisible && r === 4) {
      fillPixelRect(ctx, sx + 14, py, 1, 1, palette.C);
    }
  }

  fillPixelRect(ctx, sx + 23, sy + 2, 1, codeRows, palette.V);

  const uiScroll = reducedMotion ? 0 : Math.floor(timeSec * 1.4) % UI_MOCK_SCROLL.length;
  for (let r = 0; r < codeRows; r += 1) {
    const uiRow = UI_MOCK_SCROLL[(r + uiScroll) % UI_MOCK_SCROLL.length];
    const py = sy + 2 + r;
    for (let c = 0; c < 11; c += 1) {
      const ch = uiRow[c];
      fillPixelRect(ctx, sx + 24 + c, py, 1, 1, palette[ch] ?? palette.P);
    }
  }

  fillPixelRect(ctx, sx, sy + sh - 1, sw, 1, palette.B);
  fillPixelRect(ctx, sx + 1, sy + sh - 1, 4, 1, palette.U);
  fillPixelRect(ctx, sx + sw - 5, sy + sh - 1, 3, 1, palette.G);
}

function drawSideLaptopScreen(
  ctx: CanvasRenderingContext2D,
  timeState: RoomTimeState,
  timeSec: number,
  reducedMotion: boolean
): void {
  const lx = SIDE_LAPTOP_X;
  const ly = SIDE_LAPTOP_Y;
  const lw = SIDE_LAPTOP_W;
  const lh = SIDE_LAPTOP_H;

  if (timeState === 'sleeping') {
    fillPixelRect(ctx, lx, ly, lw, lh, '#101421');
    fillPixelRect(ctx, lx + lw - 2, ly + lh - 1, 1, 1, '#D97706');
    return;
  }

  fillPixelRect(ctx, lx, ly, lw, lh, '#131A2C');
  fillPixelRect(ctx, lx, ly, lw, 1, '#26314D');

  const logScroll = reducedMotion ? 0 : Math.floor(timeSec * 2.0) % 4;
  const colors = ['#60A5FA', '#4ADE80', '#FBBC04', '#94A3B8'];
  for (let r = 0; r < lh - 2; r += 1) {
    const idx = (r + logScroll) % 4;
    const barW = 4 + ((idx * 3) % Math.max(2, lw - 5));
    fillPixelRect(ctx, lx + 1, ly + 1 + r, barW, 1, colors[idx]);
  }

  const dotStep = reducedMotion ? 1 : Math.floor(timeSec * 3.0) % 4;
  for (let d = 0; d < 3; d += 1) {
    fillPixelRect(ctx, lx + 1 + d * 2, ly + lh - 1, 1, 1, d < dotStep ? '#67E8F9' : '#334155');
  }
}

interface RigPlacement {
  readonly matrix: SpriteMatrix;
  readonly x: number;
  readonly y: number;
  readonly overwrite?: boolean;
}

function createEmptyGrid(width: number, height: number): string[][] {
  return Array.from({ length: height }, () => Array<string>(width).fill('.'));
}

function stampGridLayer(grid: string[][], placement: RigPlacement): void {
  const { matrix, x, y, overwrite = true } = placement;
  const height = grid.length;
  const width = grid[0]?.length ?? 0;

  for (let r = 0; r < matrix.length; r += 1) {
    const gr = y + r;
    if (gr < 0 || gr >= height) continue;
    const row = matrix[r];
    for (let c = 0; c < row.length; c += 1) {
      const ch = row[c];
      if (ch === '.' || ch === ' ') continue;
      const gc = x + c;
      if (gc < 0 || gc >= width) continue;
      if (overwrite || grid[gr][gc] === '.') {
        grid[gr][gc] = ch;
      }
    }
  }
}

function finalizeGridMatrix(grid: string[][], expectedWidth: number): SpriteMatrix {
  return assertUniformMatrixWidth(
    grid.map((chars) => chars.join('')),
    expectedWidth
  );
}

const HEAD_FRONT_OPEN: SpriteMatrix = assertUniformMatrixWidth(
  [
    '...oooooo...',
    '..olllhhho..',
    '.ollllhhhho.',
    'oohlllHHHhoo',
    'ohhhhhHHHHho',
    'oHHhtHHthHHo',
    '.oHGGggGGHo.',
    '.ktWEttWEtk.',
    '.kpEEttEEpk.',
    '..kttttttk..',
    '...kkddkk...',
    '....kddk....',
  ],
  HEAD_WIDTH
);

const HEAD_FRONT_BLINK: SpriteMatrix = assertUniformMatrixWidth(
  [
    '...oooooo...',
    '..olllhhho..',
    '.ollllhhhho.',
    'oohlllHHHhoo',
    'ohhhhhHHHHho',
    'oHHhtHHthHHo',
    '.oHGGggGGHo.',
    '.ktKKttKKtk.',
    '.kpttttttpk.',
    '..kttttttk..',
    '...kkddkk...',
    '....kddk....',
  ],
  HEAD_WIDTH
);

const HEAD_FRONT_SIP: SpriteMatrix = assertUniformMatrixWidth(
  [
    '...oooooo...',
    '..olllhhho..',
    '.ollllhhhho.',
    'oohlllHHHhoo',
    'ohhhhhHHHHho',
    'oHHhtHHthHHo',
    '.oHGGggGGHo.',
    '.ktKKttKKtk.',
    '.kpttttttpk.',
    '..kttttttk..',
    '...kkddkk...',
    '....kddk....',
  ],
  HEAD_WIDTH
);

const HEAD_BACK_CENTER: SpriteMatrix = assertUniformMatrixWidth(
  [
    '...oooooo...',
    '..olllhhho..',
    '.ollllhhhho.',
    'oolllhhhHHho',
    'ohllhhhhHHho',
    'ohhhhhhHHHho',
    'kthhHHHHHhtk',
    'kdhHHHHHHHdk',
    '.oHHHHHHHHo.',
    '..ooHHHHoo..',
    '...ooHHoo...',
    '....kddk....',
  ],
  HEAD_WIDTH
);

const HEAD_BACK_GLANCE_LEFT: SpriteMatrix = assertUniformMatrixWidth(
  [
    '..ooooooo...',
    '.olllhhhhoo.',
    '.ollllhhhho.',
    'oolllhhHHHho',
    'ohllhhhHHHho',
    'ohhhhhHHHHho',
    'kthHHHHHHhtk',
    'kdHHHHHHHHdk',
    '.oHHHHHHHHo.',
    '..ooHHHHoo..',
    '...ooHHoo...',
    '....kddk....',
  ],
  HEAD_WIDTH
);

const HEAD_BACK_GLANCE_RIGHT: SpriteMatrix = assertUniformMatrixWidth(
  [
    '...ooooooo..',
    '.oohhhhlllo.',
    '.ohhhhllllo.',
    'ohHHHhhllloo',
    'ohHHHhhhllho',
    'ohHHHHhhhhho',
    'kthHHHHHHhtk',
    'kdHHHHHHHHdk',
    '.oHHHHHHHHo.',
    '..ooHHHHoo..',
    '...ooHHoo...',
    '....kddk....',
  ],
  HEAD_WIDTH
);

const HEAD_SLEEP: SpriteMatrix = assertUniformMatrixWidth(
  [
    '...oooooo...',
    '..olllhhho..',
    '.ollllhhhho.',
    'oohlllHHHhoo',
    'ohhhhhHHHHho',
    'oHHhtHHthHHo',
    '.oHttttttHo.',
    '.ktKKttKKtk.',
    '.kpttttttpk.',
    '..kttttttk..',
    '...kkddkk...',
    '....kddk....',
  ],
  HEAD_WIDTH
);

const TORSO_FRONT: SpriteMatrix = assertUniformMatrixWidth(
  [
    '.ObbBBCCBBbbO.',
    'ObbBBBzBBBBbbO',
    'ObBSBBzBBBSbbO',
    'OBBSBBzBBBBSbO',
    '.OBBSBzBBBBSO.',
    '.OBBBBzBBBBSO.',
    '.OSSSSSSSSSSO.',
    '..OOOOOOOOOO..',
  ],
  TORSO_WIDTH
);

const TORSO_FRONT_BREATHE: SpriteMatrix = assertUniformMatrixWidth(
  [
    '.ObbBBCCBBbbO.',
    'ObbbBBzBBBBbbO',
    'ObBSBBzBBBSbbO',
    'OBBSBBzBBBBSbO',
    '.OBBSBzBBBBSO.',
    '.OBBBBzBBBBSO.',
    '.OSSSSSSSSSSO.',
    '..OOOOOOOOOO..',
  ],
  TORSO_WIDTH
);

const TORSO_BACK: SpriteMatrix = assertUniformMatrixWidth(
  [
    '..OObDDDDbOO..',
    '.OObDDDDDDbOO.',
    'ObBSbDDDDbSBbO',
    'OBBSSDDDDSSBBO',
    'OBBBSSbbSSBBBO',
    '.OBBBSSSSBBBO.',
    '.OBBbBBBBbBBO.',
    '.OBBBBBBBBBBO.',
    '.OSSSSSSSSSSO.',
    '..OOOOOOOOOO..',
  ],
  TORSO_WIDTH
);

const TORSO_SLEEP: SpriteMatrix = assertUniformMatrixWidth(
  [
    '.ObbBBCCBBbbO.',
    'ObbBBBzBBBBbbO',
    'ObBSBBzBBBSbbO',
    'OBBBBBzBBBBBBO',
    '.OBBBBSSSSBBO.',
    '.OSSSSSSSSSSO.',
    '..OOOOOOOOOO..',
  ],
  TORSO_WIDTH
);

const SLEEP_RESTING_HAND: SpriteMatrix = assertUniformMatrixWidth(
  [
    '.kkk.',
    'kttdk',
    'kddk.',
  ],
  5
);

const LEGS_FRONT: SpriteMatrix = assertUniformMatrixWidth(
  [
    '..QJjJNNJjJQ..',
    '..QJjQQQQjJQ..',
    '..QJjQ..QjJQ..',
    '..QJjQ..QjJQ..',
    '..QJJQ..QJJQ..',
    '..QuvQ..QuvQ..',
    '.QuuuQ..QuuuQ.',
    '.QwwwQ..QwwwQ.',
    '..QQQ....QQQ..',
    '.xxxx....xxxx.',
  ],
  TORSO_WIDTH
);

function buildSleepingLongMatrix(breathOffset: number): SpriteMatrix {
  const grid = createEmptyGrid(SLEEP_WIDTH, SLEEP_HEIGHT);
  const torsoOffset = breathOffset < 0 ? -1 : 0;

  stampGridLayer(grid, { matrix: HEAD_SLEEP, x: 4, y: 0 });
  stampGridLayer(grid, { matrix: TORSO_SLEEP, x: 3, y: 11 + torsoOffset });
  stampGridLayer(grid, { matrix: SLEEP_RESTING_HAND, x: 15, y: 11 + torsoOffset });

  return finalizeGridMatrix(grid, SLEEP_WIDTH);
}

const SEATED_ARMS_HOME: SpriteMatrix = assertUniformMatrixWidth(
  [
    '..................................................',
    '..................................................',
    '..................................................',
    '.......kkk.............kkk........................',
    '......kttdk...........ktdk........................',
    '.......Obdk...........Obdk........................',
    '........ObO............ObO........................',
    '.........ObO..........ObO.........................',
    '.........ObO..........ObO.........................',
    '..........ObO........ObO..........................',
    '..........ObB.........BBbO........................',
    '..................................................',
    '..................................................',
  ],
  SEATED_WIDTH
);

const SEATED_ARMS_TYPE_L: SpriteMatrix = assertUniformMatrixWidth(
  [
    '..................................................',
    '..................................................',
    '.......kkk........................................',
    '......kttdk............kkk........................',
    '.......Obdk...........ktdk........................',
    '........ObO...........Obdk........................',
    '........ObO............ObO........................',
    '.........ObO..........ObO.........................',
    '.........ObO..........ObO.........................',
    '..........ObO........ObO..........................',
    '..........ObB.........BBbO........................',
    '..................................................',
    '..................................................',
  ],
  SEATED_WIDTH
);

const SEATED_ARMS_TYPE_R: SpriteMatrix = assertUniformMatrixWidth(
  [
    '..................................................',
    '..................................................',
    '.......................kkk........................',
    '.......kkk............ktdk........................',
    '......kttdk...........Obdk........................',
    '.......Obdk............ObO........................',
    '........ObO............ObO........................',
    '.........ObO..........ObO.........................',
    '.........ObO..........ObO.........................',
    '..........ObO........ObO..........................',
    '..........ObB.........BBbO........................',
    '..................................................',
    '..................................................',
  ],
  SEATED_WIDTH
);

const SEATED_ARMS_MOUSE_A: SpriteMatrix = assertUniformMatrixWidth(
  [
    '..................................................',
    '..................................................',
    '.................................kkk..............',
    '.......kkk......................ktddk.............',
    '......kttdk....................Obbtk..............',
    '.......Obdk...................ObO.................',
    '........ObO..................ObO..................',
    '.........ObO................ObO...................',
    '.........ObO..............ObbO....................',
    '..........ObO...........OObbO.....................',
    '..........ObB..........BBbbO......................',
    '..................................................',
    '..................................................',
  ],
  SEATED_WIDTH
);

const SEATED_ARMS_MOUSE_B: SpriteMatrix = assertUniformMatrixWidth(
  [
    '..................................................',
    '..................................................',
    '..................................kkk.............',
    '.......kkk.......................ktddk............',
    '......kttdk.....................Obbtk.............',
    '.......Obdk....................ObO................',
    '........ObO...................ObO.................',
    '.........ObO.................ObO..................',
    '.........ObO...............ObbO...................',
    '..........ObO............OObbO....................',
    '..........ObB...........BBbbO.....................',
    '..................................................',
    '..................................................',
  ],
  SEATED_WIDTH
);

const SEATED_ARMS_REACH_MUG: SpriteMatrix = assertUniformMatrixWidth(
  [
    '..................................................',
    '.........................................kkk......',
    '........................................ktddk.....',
    '.......kkk.............................Obbtk......',
    '......kttdk.........................OOObbO........',
    '.......Obdk......................OOObbO...........',
    '........ObO...................OOObbO..............',
    '.........ObO................OObbO.................',
    '.........ObO..............OObbO...................',
    '..........ObO...........OObbO.....................',
    '..........ObB..........BBbbO......................',
    '..................................................',
    '..................................................',
  ],
  SEATED_WIDTH
);

const SEATED_ARMS_SIP_MUG: SpriteMatrix = assertUniformMatrixWidth(
  [
    '..................................................',
    '..................................................',
    '..................................................',
    '.........................mmmm.....................',
    '........................mMMMrO....................',
    '.......kkk..............mMFFrO....................',
    '......kttdk.............mMMMdk....................',
    '.......Obdk.............ObbkktO...................',
    '........ObO..............Obbtdk...................',
    '.........ObO.............ObbO.....................',
    '..........ObB............BBbO.....................',
    '..................................................',
    '..................................................',
  ],
  SEATED_WIDTH
);

const SEATED_ARMS_STRETCH: SpriteMatrix = assertUniformMatrixWidth(
  [
    '......kkk.....................kkk.................',
    '.....ktdk....................ktddk................',
    '.....ObO.....................ObbO.................',
    '......ObO...................ObO...................',
    '.......ObO.................ObO....................',
    '.......ObO.................ObO....................',
    '........ObO...............ObO.....................',
    '........ObO...............ObO.....................',
    '.........ObO.............ObO......................',
    '..........ObO...........ObO.......................',
    '..........ObB...........BbO.......................',
    '..................................................',
    '..................................................',
  ],
  SEATED_WIDTH
);

function buildSeatedLongMatrix(
  head: SpriteMatrix,
  arms: SpriteMatrix,
  headDropPx: number,
  bodyDropPx: number
): SpriteMatrix {
  const grid = createEmptyGrid(SEATED_WIDTH, SEATED_TOTAL_HEIGHT);
  const drop = bodyDropPx > 0 ? 1 : 0;
  const hDrop = headDropPx > 0 ? 1 : 0;

  stampGridLayer(grid, { matrix: TORSO_BACK, x: SEATED_TORSO_X, y: 9 + drop });
  stampGridLayer(grid, { matrix: arms, x: 0, y: drop });
  stampGridLayer(grid, { matrix: head, x: SEATED_HEAD_X, y: hDrop });

  return finalizeGridMatrix(grid, SEATED_WIDTH);
}

const WAKING_ARMS_HOLD_CUP: SpriteMatrix = assertUniformMatrixWidth(
  [
    '.....................',
    '.....................',
    '................mmm..',
    '...............mFFMm.',
    '...ktt........btMMcm.',
    '....kk.........kdMcm.',
    '................kmmm.',
    '.....................',
  ],
  WAKING_WIDTH
);

const WAKING_ARMS_LIFT_CUP: SpriteMatrix = assertUniformMatrixWidth(
  [
    '................mmm..',
    '...............mFFMm.',
    '..............btMMcm.',
    '...ktt.........kdMcm.',
    '....kk..........kmmm.',
    '.....................',
    '.....................',
    '.....................',
  ],
  WAKING_WIDTH
);

const WAKING_ARMS_STRETCH: SpriteMatrix = assertUniformMatrixWidth(
  [
    '.kkk............kkk..',
    'ktdk............ktdk.',
    'ObbO............ObbO.',
    '.ObO............ObO..',
    '.....................',
    '.....................',
    '.....................',
    '.....................',
    '.....................',
    '.....................',
  ],
  WAKING_WIDTH
);

function buildWakingLongMatrix(
  head: SpriteMatrix,
  torso: SpriteMatrix,
  arms: SpriteMatrix,
  armsY: number
): SpriteMatrix {
  const grid = createEmptyGrid(WAKING_WIDTH, WAKING_HEIGHT);

  stampGridLayer(grid, { matrix: LEGS_FRONT, x: 2, y: 19 });
  stampGridLayer(grid, { matrix: head, x: 3, y: 0 });
  stampGridLayer(grid, { matrix: torso, x: 2, y: 11 });
  stampGridLayer(grid, { matrix: arms, x: 0, y: armsY });

  return finalizeGridMatrix(grid, WAKING_WIDTH);
}

const WAKING_IDLE_DEFAULT = buildWakingLongMatrix(
  HEAD_FRONT_OPEN,
  TORSO_FRONT,
  WAKING_ARMS_HOLD_CUP,
  11
);

const CHAR_PALETTE = {
  day: {
    o: '#2B1D17',
    k: '#8F5943',
    O: '#1E2436',
    Q: '#182030',
    m: '#786B63',
    H: '#3D261C',
    h: '#5D3A29',
    l: '#7E513A',
    t: '#F5CBB0',
    d: '#DCA183',
    p: '#EB9E90',
    E: '#1F2433',
    W: '#FFFFFF',
    K: '#5C382C',
    G: '#434E63',
    g: '#9C8B88',
    L: '#CBE6F2',
    C: '#F5F0E6',
    b: '#475569',
    B: '#334155',
    D: '#5D6F8A',
    S: '#243042',
    z: '#64748B',
    j: '#334460',
    J: '#233044',
    N: '#1B2536',
    u: '#F1F5F9',
    v: '#94A3B8',
    w: '#CBD5E1',
    M: '#FFFDF9',
    r: '#D6CFC2',
    F: '#5C3422',
    c: '#D6CFC2',
    x: 'rgba(22, 16, 28, 0.28)',
  },
} as const;

function getLongPalette(
  timeState: RoomTimeState,
  lampOn: boolean,
  palette: RoomPalette
): SpriteColorMap {
  const isSleep = timeState === 'sleeping';
  const isLate = timeState === 'late_night';
  const dim = isSleep && !lampOn;
  const base = CHAR_PALETTE.day;

  return {
    ...base,
    o: dim ? '#1E161C' : isLate ? '#241814' : base.o,
    k: dim ? '#684339' : isLate ? '#7D4D3A' : base.k,
    O: dim ? '#151926' : isLate ? '#181D2C' : base.O,
    Q: dim ? '#121824' : base.Q,
    m: dim ? '#5D524C' : base.m,
    H: dim ? '#2C1E26' : isLate ? '#322019' : base.H,
    h: dim ? '#452E37' : isLate ? '#4E3124' : base.h,
    l: dim ? '#634650' : isLate ? '#734B37' : base.l,
    t: dim ? '#C49B8B' : isLate ? '#E8B99B' : base.t,
    d: dim ? '#9E7668' : isLate ? '#C98E72' : base.d,
    p: dim ? '#AD706C' : isLate ? '#D88B7E' : base.p,
    K: isSleep ? '#4A302C' : base.K,
    L: isLate ? '#8CEAF8' : base.L,
    C: dim ? '#B5B2C0' : isLate ? '#DFD9CE' : base.C,
    b: dim ? '#3D485E' : isLate ? (lampOn ? '#58677D' : '#435066') : base.b,
    B: dim ? '#273145' : isLate ? '#2D3A4D' : base.B,
    D: dim ? '#48566E' : isLate ? (lampOn ? '#64758F' : '#4E5E78') : base.D,
    S: dim ? '#1C2333' : isLate ? '#1F293A' : base.S,
    z: dim ? '#3F4B61' : isLate ? '#52627A' : base.z,
    j: dim ? '#29374F' : base.j,
    J: dim ? '#1D2638' : base.J,
    N: dim ? '#141B29' : base.N,
    u: dim ? '#B8C0CC' : base.u,
    v: dim ? '#737E91' : base.v,
    w: dim ? '#949EAE' : base.w,
    P: palette.pillowShadow,
  };
}

const CAPY_SIT_OPEN: SpriteMatrix = [
  '.....gGGO............',
  '....OYRRO............',
  '....ORRUO.OO.........',
  '...OOHHHOODO.........',
  '.OOHFFFFFHHO.........',
  'OKKFFEFFFPFFO........',
  'OKFFFFFSSSFFOOOOO....',
  '.OOFSSSSFHHHHHHHHHO..',
  '..OFFFFFFFFFFBFFFFFO.',
  '..OFFFFFFFFBBBBFFFFO.',
  '..OSFFFFFFFBBBBFFSSO.',
  '...OSSSSSSBBBBSSSSO..',
  '....ODDOODDOODDOO....',
  '....ODDOODDOODDOO....',
  '....OOOO.OO..OOOO....',
  '...xxxxxx..xxxxxxx...',
];

const CAPY_SIT_BLINK: SpriteMatrix = [
  '.....gGGO............',
  '....OYRRO............',
  '....ORRUO.OO.........',
  '...OOHHHOODO.........',
  '.OOHFFFFFHHO.........',
  'OKKFFKKFFPFFO........',
  'OKFFFFFSSSFFOOOOO....',
  '.OOFSSSSFHHHHHHHHHO..',
  '..OFFFFFFFFFFBFFFFFO.',
  '..OFFFFFFFFBBBBFFFFO.',
  '..OSFFFFFFFBBBBFFSSO.',
  '...OSSSSSSBBBBSSSSO..',
  '....ODDOODDOODDOO....',
  '....ODDOODDOODDOO....',
  '....OOOO.OO..OOOO....',
  '...xxxxxx..xxxxxxx...',
];

const CAPY_SIT_EAR: SpriteMatrix = [
  '....gGGO.............',
  '...OYRRO...O.........',
  '...ORRUO..ODO........',
  '...OOHHHHOOD.........',
  '.OOHFFFFFHHO.........',
  'OKKFFEFFFPFFO........',
  'OKFFFFFSSSFFOOOOO....',
  '.OOFSSSSFHHHHHHHHHO..',
  '..OFFFFFFFFFFBFFFFFO.',
  '..OFFFFFFFFBBBBFFFFO.',
  '..OSFFFFFFFBBBBFFSSO.',
  '...OSSSSSSBBBBSSSSO..',
  '....ODDOODDOODDOO....',
  '....ODDOODDOODDOO....',
  '....OOOO.OO..OOOO....',
  '...xxxxxx..xxxxxxx...',
];

const CAPY_WALK_0: SpriteMatrix = [
  '.....gGGO............',
  '....OYRRO............',
  '....ORRUO.OO.........',
  '...OOHHHOODO.........',
  '.OOHFFFFFHHO.........',
  'OKKFFEFFFPFFO........',
  'OKFFFFFSSSFFOOOOO....',
  '.OOFSSSSFHHHHHHHHHO..',
  '..OFFFFFFFFFFBFFFFFO.',
  '..OFFFFFFFFBBBBFFFFO.',
  '..OSFFFFFFFBBBBFFSSO.',
  '...OSSSSSSBBBBSSSSO..',
  '...ODDO..ODDO.ODDO...',
  '..ODDO....ODDO.ODDO..',
  '..OOOO....OOOO.OOOO..',
  '..xxxxx...xxxxxxxx...',
];

const CAPY_WALK_1: SpriteMatrix = [
  '....OYRRO............',
  '....ORRUO.OO.........',
  '...OOHHHOODO.........',
  '.OOHFFFFFHHO.........',
  'OKKFFEFFFPFFO........',
  'OKFFFFFSSSFFOOOOO....',
  '.OOFSSSSFHHHHHHHHHO..',
  '..OFFFFFFFFFFBFFFFFO.',
  '..OFFFFFFFFBBBBFFFFO.',
  '..OSFFFFFFFBBBBFFSSO.',
  '...OSSSSSSBBBBSSSSO..',
  '....ODDO.ODDO.ODDO...',
  '....ODDO.ODDO.ODDO...',
  '....OOOO.OOOO.OOOO...',
  '....xxxxxxxxxxxxxxx..',
  '.....................',
];

const CAPY_WALK_2: SpriteMatrix = [
  '.....gGGO............',
  '....OYRRO............',
  '....ORRUO.OO.........',
  '...OOHHHOODO.........',
  '.OOHFFFFFHHO.........',
  'OKKFFEFFFPFFO........',
  'OKFFFFFSSSFFOOOOO....',
  '.OOFSSSSFHHHHHHHHHO..',
  '..OFFFFFFFFFFBFFFFFO.',
  '..OFFFFFFFFBBBBFFFFO.',
  '..OSFFFFFFFBBBBFFSSO.',
  '...OSSSSSSBBBBSSSSO..',
  '....ODDO.ODDO..ODDO..',
  '....ODDO..ODDO..ODDO.',
  '....OOOO..OOOO..OOOO.',
  '...xxxxxxxxxxxxxxxx..',
];

const CAPY_DANCE_0: SpriteMatrix = [
  '.....gGGO............',
  '....OYRRO............',
  '....ORRUO.OO.........',
  '...OOHHHOODO.........',
  '.OOHFFKFFHHO.........',
  'OKKFFKFKFPFFO........',
  'OKFFFFFSSSFFOOOOO....',
  '.OOFSSSSFHHHHHHHHHO..',
  '..OFFFFFFFFFFBFFFFFO.',
  '..OFFFFFFFFBBBBFFFFO.',
  '..OSFFFFFFFBBBBFFSSO.',
  '...OSSSSSSBBBBSSSSO..',
  '....ODDOODDOODDOO....',
  '....OOOO.OO..OOOO....',
  '.....................',
  '...xxxxxx..xxxxxxx...',
];

const CAPY_DANCE_1: SpriteMatrix = [
  '....gGGO.............',
  '...OYRRO.............',
  '...ORRUO..OO.........',
  '...OOHHHOODO.........',
  '.OOHFFKFFHHO.........',
  'OKKFFKFKFPFFO........',
  'OKFFFFFSSSFFOOOOO....',
  '.OOFSSSSFHHHHHHHHHO..',
  '..OFFFFFFFFFFBFFFFFO.',
  '..OFFFFFFFFBBBBFFFFO.',
  '..OSFFFFFFFBBBBFFSSO.',
  '...OSSSSSSBBBBSSSSO..',
  '..ODDO.ODDO..ODDO....',
  '..OOOO.OOOO..OOOO....',
  '.....................',
  '..xxxxxx..xxxxxxxx...',
];

const CAPY_DROWSY_HALF: SpriteMatrix = [
  '.....................',
  '.....gGGO............',
  '....OYRRO............',
  '....ORRUO.OO.........',
  '...OOHHHOODO.........',
  '.OOHFFFFFHHO.........',
  'OKKFFKKFFPFFOOOO.....',
  'OKFFFFFSSSFFHHHHHHO..',
  '.OOFSSSSFHHFFFFFFFFO.',
  '..OFFFFFFFFFBBBFFFFO.',
  '..OFFFFFFFFBBBBFFSSO.',
  '..OSSSSSSSBBBBSSSSO..',
  '...OSSSSSSSSSSSSSO...',
  '....OOOOOOOOOOOOO....',
  '...xxxxxxxxxxxxxxx...',
  '.....................',
];

const CAPY_SLEEP_BREATH: SpriteMatrix = [
  '.....................',
  '.....gGGO............',
  '....OYRRO............',
  '....ORRUO.OO.........',
  '...OOHHHOODO.........',
  '.OOHFFFFFHHO.........',
  'OKKFFKKFFPFFOOOOO....',
  'OKFFFFFSSSFFHHHHHHHO.',
  '.OOFSSSSFHHFFFFFFFFO.',
  '..OFFFFFFFFFBBBBFFFO.',
  '..OFFFFFFFFBBBBFFSSO.',
  '..OSSSSSSSBBBBSSSSO..',
  '...OSSSSSSSSSSSSSO...',
  '....OOOOOOOOOOOOO....',
  '...xxxxxxxxxxxxxxx...',
  '.....................',
];

function getCapyPalette(timeState: RoomTimeState, lampOn: boolean): SpriteColorMap {
  const isSleep = timeState === 'sleeping' && !lampOn;
  return {
    O: '#3B241A',
    K: '#2A1810',
    E: '#2A1810',
    F: isSleep ? '#7E5A44' : '#A67855',
    H: isSleep ? '#987258' : '#C89872',
    B: isSleep ? '#8A6750' : '#B58966',
    S: isSleep ? '#5D402E' : '#7D563B',
    D: isSleep ? '#452D1E' : '#5C3C28',
    P: isSleep ? '#B46A67' : '#E68A82',
    R: isSleep ? '#C66F00' : '#FB8C00',
    Y: isSleep ? '#CF9B04' : '#FBBC04',
    U: isSleep ? '#A34F00' : '#D96800',
    G: isSleep ? '#288240' : '#34A853',
    g: '#267A3D',
    x: 'rgba(34, 20, 16, 0.32)',
  };
}

const WOOFER_FRAME_0: SpriteMatrix = [
  '.OOOOOO.',
  'OSSSSSSO',
  'OSMDDMSO',
  'OMDCCDMO',
  'OMDCCDMO',
  'OSMDDMSO',
  'OSSSSSSO',
  '.OOOOOO.',
];

const WOOFER_FRAME_1: SpriteMatrix = [
  '.OOOOOO.',
  'OGGGGGGO',
  'OGMCCMGO',
  'OGCAACGO',
  'OGCAACGO',
  'OGMCCMGO',
  'OGGGGGGO',
  '.OOOOOO.',
];

const WOOFER_COLORS: SpriteColorMap = {
  O: '#181E2E',
  S: '#334155',
  M: '#64748B',
  D: '#475569',
  C: '#CBD5E1',
  G: '#34A853',
  A: '#86EFAC',
};

const NOTE_SINGLE: SpriteMatrix = [
  '...OO..',
  '..OBBO.',
  '..OBBO.',
  '..OBO..',
  '.OOBO..',
  'OBBBO..',
  'OBBBO..',
  '.OOO...',
  '.......',
];

const NOTE_DOUBLE: SpriteMatrix = [
  '...OOOOO.',
  '..OBBBBBO',
  '..OBOOOBO',
  '..OBO..BO',
  '.OOBO.OBO',
  'OBBBOOBBO',
  'OBBBOOBBO',
  '.OOO..OO.',
  '.........',
];

const NOTE_COLORS_GREEN: SpriteColorMap = {
  O: '#16212C',
  B: '#34A853',
};

const NOTE_COLORS_GOLD: SpriteColorMap = {
  O: '#2A1C16',
  B: '#FBBC04',
};

const NOTE_COLORS_BLUE: SpriteColorMap = {
  O: '#16212C',
  B: '#60A5FA',
};

const NOTE_COLORS_CORAL: SpriteColorMap = {
  O: '#2A181F',
  B: '#F472B6',
};

const Z_SMALL: SpriteMatrix = [
  'OOOOO.',
  'OZZZOO',
  '.OOZO.',
  'OZZOO.',
  'OZZZO.',
  'OOOOO.',
];

const Z_LARGE: SpriteMatrix = [
  'OOOOOO',
  'OZZZZO',
  '.OOZOO',
  'OOZOO.',
  'OZZZZO',
  'OOOOOO',
];

const Z_COLORS: SpriteColorMap = {
  O: '#1E2438',
  Z: '#E2E8F0',
};

const STAR_TINY: SpriteMatrix = [
  '...',
  '.M.',
  '...',
];

const STAR_CROSS: SpriteMatrix = [
  '.M.',
  'MHM',
  '.M.',
];

const STAR_SPARKLE: SpriteMatrix = [
  '..M..',
  '.MHM.',
  'MHHHM',
  '.MHM.',
  '..M..',
];

const STAR_COLORS_CREAM: SpriteColorMap = {
  H: '#FFFBEB',
  M: '#FDE68A',
};

const STAR_COLORS_BLUE: SpriteColorMap = {
  H: '#FFFFFF',
  M: '#BAE6FD',
};

const STAR_NODES: readonly { x: number; y: number; phase: number; blue: boolean }[] = [
  { x: 95, y: 16, phase: 0, blue: false },
  { x: 103, y: 22, phase: 1, blue: true },
  { x: 114, y: 16, phase: 2, blue: false },
  { x: 131, y: 17, phase: 3, blue: true },
  { x: 98, y: 32, phase: 1, blue: false },
  { x: 122, y: 31, phase: 2, blue: true },
];

const GBA_POINTER_ARROW: SpriteMatrix = [
  'OOOOOOOOO',
  'OHHHHHHYO',
  '.OYYYYAO.',
  '..OYAYO..',
  '...OAO...',
  '....O....',
];

const GBA_POINTER_COLORS: SpriteColorMap = {
  O: '#2A1C16',
  H: '#FFF3B0',
  Y: '#FBBC04',
  A: '#F59E0B',
};

function drawZzzDrift(
  ctx: CanvasRenderingContext2D,
  originX: number,
  originY: number,
  timeSec: number,
  reducedMotion: boolean,
  riseSpan = 7
): void {
  if (reducedMotion) {
    drawSpriteMatrix(ctx, Z_SMALL, Z_COLORS, originX, originY - 2);
    drawSpriteMatrix(ctx, Z_LARGE, Z_COLORS, originX + 6, originY - riseSpan);
    return;
  }

  const slots = [0, 0.33, 0.66];
  for (let i = 0; i < slots.length; i += 1) {
    const phase = (timeSec * 0.42 + slots[i]) % 1;
    const drawX = originX + i * 3 + Math.round(Math.sin(phase * Math.PI * 2) * 1.4);
    const drawY = originY - Math.round(phase * riseSpan);
    const alpha =
      phase < 0.2 ? phase / 0.2 : phase > 0.72 ? Math.max(0, (1 - phase) / 0.28) : 0.92;
    const mat = i === 1 ? Z_LARGE : Z_SMALL;
    ctx.save();
    ctx.globalAlpha = alpha;
    drawSpriteMatrix(ctx, mat, Z_COLORS, drawX, drawY);
    ctx.restore();
  }
}

function drawSmoothSteam(
  ctx: CanvasRenderingContext2D,
  originX: number,
  originY: number,
  timeSec: number,
  reducedMotion: boolean,
  maxRise = 10
): void {
  if (reducedMotion) {
    ctx.save();
    ctx.globalAlpha = 0.62;
    fillPixelRect(ctx, originX, originY - 2, 1, 2, '#FFF9F0');
    fillPixelRect(ctx, originX + 2, originY - 5, 1, 2, '#E2E8F0');
    ctx.restore();
    return;
  }

  const wisps = [
    { offset: 0, dxBias: 0, color: '#FFF9F0' },
    { offset: 0.35, dxBias: 2, color: '#E2E8F0' },
    { offset: 0.7, dxBias: 1, color: '#CBD5E1' },
  ];

  for (let i = 0; i < wisps.length; i += 1) {
    const wisp = wisps[i];
    const phase = (timeSec * 0.58 + wisp.offset) % 1;
    const py = Math.round(originY - phase * maxRise);
    const px = Math.round(originX + wisp.dxBias + Math.sin(phase * Math.PI * 2 + i) * 1.1);
    const alpha = Math.sin(phase * Math.PI) * 0.72;
    if (alpha <= 0.05) continue;
    ctx.save();
    ctx.globalAlpha = alpha;
    fillPixelRect(ctx, px, py, 1, 2, wisp.color);
    ctx.restore();
  }
}

function maskStaticDeskMug(ctx: CanvasRenderingContext2D, palette: RoomPalette): void {
  fillPixelRect(ctx, 196, 79, 10, 7, palette.woodMid);
}

function drawDeskCoffeeSteam(
  ctx: CanvasRenderingContext2D,
  timeState: RoomTimeState,
  timeSec: number,
  reducedMotion: boolean
): void {
  if (timeState !== 'working') {
    return;
  }
  if (!reducedMotion) {
    const cycle = timeSec % 18;
    if (cycle >= 5.5 && cycle < 7.1) {
      return;
    }
  }
  drawSmoothSteam(ctx, DESK_MUG_X - 1, DESK_MUG_Y - 3, timeSec, reducedMotion);
}

function drawWindowStars(
  ctx: CanvasRenderingContext2D,
  timeState: RoomTimeState,
  timeSec: number
): void {
  if (timeState !== 'late_night' && timeState !== 'sleeping') {
    return;
  }

  for (let i = 0; i < STAR_NODES.length; i += 1) {
    const star = STAR_NODES[i];
    const frame = (Math.floor(timeSec * 3.0) + star.phase) % 4;
    const colors = star.blue ? STAR_COLORS_BLUE : STAR_COLORS_CREAM;
    if (frame === 0) {
      drawSpriteMatrix(ctx, STAR_TINY, colors, star.x + 1, star.y + 1);
    } else if (frame === 2) {
      drawSpriteMatrix(ctx, STAR_SPARKLE, colors, star.x, star.y);
    } else {
      drawSpriteMatrix(ctx, STAR_CROSS, colors, star.x + 1, star.y + 1);
    }
  }
}

export function getSleepingBreathOffset(timeSec: number, reducedMotion: boolean): number {
  if (reducedMotion) {
    return 0;
  }
  const breathWave = Math.sin(timeSec * ((Math.PI * 2) / 3.6));
  return breathWave > 0.28 ? -1 : 0;
}

export function drawSleepingCharacter(
  ctx: CanvasRenderingContext2D,
  options: DrawCharacterAndEffectsOptions
): void {
  const { timeState, lampOn, palette, reducedMotion = false } = options;
  const timeSec = resolveTimeSec(options);
  const colors = getLongPalette(timeState, lampOn, palette);
  const breathOffset = getSleepingBreathOffset(timeSec, reducedMotion);
  const matrix = buildSleepingLongMatrix(breathOffset);

  drawSpriteMatrix(ctx, matrix, colors, SLEEP_DRAW_X, SLEEP_DRAW_Y);
  drawZzzDrift(ctx, 44, 83, timeSec, reducedMotion, 6);
}

export function drawRoomScreensAndSteam(
  ctx: CanvasRenderingContext2D,
  options: DrawCharacterAndEffectsOptions
): void {
  const { timeState, reducedMotion = false } = options;
  const timeSec = resolveTimeSec(options);

  drawWindowStars(ctx, timeState, timeSec);
  drawMainMonitorScreen(ctx, timeState, timeSec, reducedMotion);
  drawSideLaptopScreen(ctx, timeState, timeSec, reducedMotion);
  drawDeskCoffeeSteam(ctx, timeState, timeSec, reducedMotion);
}

export function drawSeatedCharacter(
  ctx: CanvasRenderingContext2D,
  options: DrawCharacterAndEffectsOptions
): void {
  const { timeState, lampOn, isMusicActive, palette, reducedMotion = false } = options;
  if (timeState !== 'working' && timeState !== 'late_night') {
    return;
  }

  const seatAnchor = options.seatAnchor ?? DEFAULT_SEAT_ANCHOR;
  const drawX = Math.round(seatAnchor.seatCenterX - 18);
  const drawY = Math.round(seatAnchor.seatTopY - 13);
  const timeSec = resolveTimeSec(options);
  const colors = getLongPalette(timeState, lampOn, palette);

  if (reducedMotion) {
    const matrix = buildSeatedLongMatrix(HEAD_BACK_CENTER, SEATED_ARMS_HOME, 0, 0);
    drawSpriteMatrix(ctx, matrix, colors, drawX, drawY);
    return;
  }

  const cycle = timeState === 'late_night' ? timeSec % 16 : timeSec % 18;
  const musicBobDown = isMusicActive && Math.sin(timeSec * Math.PI * 3.1) > 0.32 ? 1 : 0;

  let head: SpriteMatrix = HEAD_BACK_CENTER;
  let arms: SpriteMatrix = SEATED_ARMS_HOME;
  let headDrop = musicBobDown;
  let shoulderDrop = musicBobDown;

  if (timeState === 'working') {
    if (cycle >= 3.2 && cycle < 5.0) {
      head = HEAD_BACK_GLANCE_LEFT;
    } else if (cycle >= 5.2 && cycle < 5.7) {
      arms = SEATED_ARMS_REACH_MUG;
      shoulderDrop = 0;
    } else if (cycle >= 5.7 && cycle < 6.9) {
      maskStaticDeskMug(ctx, palette);
      head = HEAD_BACK_GLANCE_RIGHT;
      arms = SEATED_ARMS_SIP_MUG;
      headDrop = 0;
      shoulderDrop = 0;
      drawSmoothSteam(ctx, drawX + 28, drawY + 2, timeSec, false, 5);
    } else if (cycle >= 6.9 && cycle < 7.4) {
      arms = SEATED_ARMS_REACH_MUG;
      shoulderDrop = 0;
    } else if (cycle >= 10.8 && cycle < 13.4) {
      head = cycle < 12.1 ? HEAD_BACK_GLANCE_LEFT : HEAD_BACK_GLANCE_RIGHT;
      arms = SEATED_ARMS_STRETCH;
      headDrop = 0;
      shoulderDrop = 0;
    } else if (cycle >= 14.8 && cycle < 16.4) {
      head = HEAD_BACK_GLANCE_LEFT;
      arms = Math.floor(timeSec * 5) % 2 === 0 ? SEATED_ARMS_TYPE_L : SEATED_ARMS_TYPE_R;
    } else if (cycle >= 8.2 && cycle < 10.2) {
      arms = Math.floor(timeSec * 2.5) % 2 === 0 ? SEATED_ARMS_MOUSE_A : SEATED_ARMS_MOUSE_B;
    } else {
      const step = Math.floor(timeSec * 5.2) % 3;
      arms =
        step === 0
          ? SEATED_ARMS_TYPE_L
          : step === 1
            ? SEATED_ARMS_TYPE_R
            : SEATED_ARMS_HOME;
    }
  } else {
    if (cycle >= 3.5 && cycle < 4.9) {
      head = HEAD_BACK_GLANCE_LEFT;
    } else if (cycle >= 6.0 && cycle < 8.6) {
      arms = SEATED_ARMS_STRETCH;
      headDrop = 0;
      shoulderDrop = 0;
      head = cycle < 7.3 ? HEAD_BACK_GLANCE_LEFT : HEAD_BACK_GLANCE_RIGHT;
    } else if (cycle >= 10.4 && cycle < 12.2) {
      arms = Math.floor(timeSec * 2.4) % 2 === 0 ? SEATED_ARMS_MOUSE_A : SEATED_ARMS_MOUSE_B;
    } else {
      const step = Math.floor(timeSec * 4.8) % 3;
      arms =
        step === 0
          ? SEATED_ARMS_TYPE_L
          : step === 1
            ? SEATED_ARMS_TYPE_R
            : SEATED_ARMS_HOME;
    }
  }

  const matrix = buildSeatedLongMatrix(head, arms, headDrop, shoulderDrop);
  drawSpriteMatrix(ctx, matrix, colors, drawX, drawY);

  if (lampOn && timeState === 'late_night') {
    const hairRow = head[3] ?? '';
    let rightHairCol = -1;
    for (let c = hairRow.length - 1; c >= 0; c -= 1) {
      if (hairRow[c] === 'H' || hairRow[c] === 'h' || hairRow[c] === 'l') {
        rightHairCol = c;
        break;
      }
    }
    if (rightHairCol >= 0) {
      fillPixelRect(
        ctx,
        drawX + SEATED_HEAD_X + rightHairCol,
        drawY + 3 + headDrop,
        1,
        2,
        '#FCD34D'
      );
    }
    const sleeveRow = matrix[11] ?? '';
    let rightArmCol = -1;
    for (let c = sleeveRow.length - 1; c >= 0; c -= 1) {
      if (sleeveRow[c] === 'B' || sleeveRow[c] === 'b') {
        rightArmCol = c;
        break;
      }
    }
    if (rightArmCol >= 0) {
      fillPixelRect(ctx, drawX + rightArmCol, drawY + 11 + shoulderDrop, 1, 2, '#E9B872');
    }
  }
}

interface WakingLongPose {
  x: number;
  y: number;
  footY: number;
  matrix: SpriteMatrix;
  steamX: number;
  steamY: number;
}

function getWakingLongPose(timeSec: number, reducedMotion: boolean): WakingLongPose {
  const minX = WALKABLE_RECT.x + 3;
  const maxX = Math.min(85, WALKABLE_RECT.x + WALKABLE_RECT.w - WAKING_WIDTH);
  const clampX = (x: number): number => Math.max(minX, Math.min(maxX, Math.round(x)));
  const clampY = (y: number, h: number): number =>
    Math.max(WALKABLE_RECT.y, Math.min(148 - h + 1, Math.round(y)));

  if (reducedMotion) {
    const x = clampX(81);
    const y = clampY(110, WAKING_IDLE_DEFAULT.length);
    return {
      x,
      y,
      footY: y + WAKING_IDLE_DEFAULT.length - 2,
      matrix: WAKING_IDLE_DEFAULT,
      steamX: x + 16,
      steamY: y + 12,
    };
  }

  const cycle = timeSec % 16;
  const blinkNow = timeSec % 3.9 >= 3.68 && timeSec % 3.9 <= 3.84;
  const breatheNow = Math.sin(timeSec * ((Math.PI * 2) / 3.2)) > 0.35;
  const idleTorso = breatheNow ? TORSO_FRONT_BREATHE : TORSO_FRONT;
  const swayOffset = Math.round(Math.sin(timeSec * 0.9) * 1.4);

  if (cycle < 4.5) {
    const head = blinkNow ? HEAD_FRONT_BLINK : HEAD_FRONT_OPEN;
    const mat = buildWakingLongMatrix(head, idleTorso, WAKING_ARMS_HOLD_CUP, 11);
    const x = clampX(81 + (cycle > 2.2 ? 1 : 0));
    const y = clampY(110, mat.length);
    return {
      x,
      y,
      footY: y + mat.length - 2,
      matrix: mat,
      steamX: x + 16,
      steamY: y + 12,
    };
  }

  if (cycle < 8.2) {
    const isPeakSip = cycle >= 5.0 && cycle < 7.5;
    const head = isPeakSip ? HEAD_FRONT_SIP : blinkNow ? HEAD_FRONT_BLINK : HEAD_FRONT_OPEN;
    const arms = isPeakSip ? WAKING_ARMS_LIFT_CUP : WAKING_ARMS_HOLD_CUP;
    const mat = buildWakingLongMatrix(head, idleTorso, arms, 11);
    const x = clampX(82);
    const y = clampY(110, mat.length);
    return {
      x,
      y,
      footY: y + mat.length - 2,
      matrix: mat,
      steamX: x + 16,
      steamY: y + (isPeakSip ? 10 : 12),
    };
  }

  if (cycle < 11.8) {
    const mat = buildWakingLongMatrix(HEAD_FRONT_BLINK, TORSO_FRONT, WAKING_ARMS_STRETCH, 8);
    const x = clampX(81 + Math.max(-1, Math.min(1, swayOffset)));
    const y = clampY(110, mat.length);
    return {
      x,
      y,
      footY: y + mat.length - 2,
      matrix: mat,
      steamX: -10,
      steamY: -10,
    };
  }

  const head = blinkNow ? HEAD_FRONT_BLINK : HEAD_FRONT_OPEN;
  const mat = buildWakingLongMatrix(head, idleTorso, WAKING_ARMS_HOLD_CUP, 11);
  const x = clampX(81 + Math.max(0, Math.min(2, swayOffset)));
  const y = clampY(110 + (cycle >= 13.6 && cycle < 14.8 ? -1 : 0), mat.length);
  return {
    x,
    y,
    footY: y + mat.length - 2,
    matrix: mat,
    steamX: x + 16,
    steamY: y + 12,
  };
}

interface CapyPoseState {
  x: number;
  y: number;
  footY: number;
  flipX: boolean;
  matrix: SpriteMatrix;
}

function clampCapyPos(rawX: number, rawY: number, matrix: SpriteMatrix): { x: number; y: number } {
  const matW = matrix[0]?.length ?? 21;
  const matH = matrix.length;
  const minX = RUG_WALK_RECT.x;
  const maxX = RUG_WALK_RECT.x + RUG_WALK_RECT.w - matW;
  const minY = RUG_WALK_RECT.y;
  const maxY = RUG_WALK_RECT.y + RUG_WALK_RECT.h - matH;
  return {
    x: Math.max(minX, Math.min(maxX, Math.round(rawX))),
    y: Math.max(minY, Math.min(maxY, Math.round(rawY))),
  };
}

function getCapybaraState(
  timeState: RoomTimeState,
  isMusicActive: boolean,
  timeSec: number,
  reducedMotion: boolean
): CapyPoseState {
  if (timeState === 'sleeping') {
    const breathUp = !reducedMotion && Math.sin(timeSec * 1.8) > 0.35;
    const mat = breathUp ? CAPY_SLEEP_BREATH : CAPY_DROWSY_HALF;
    const pos = clampCapyPos(188, 132, mat);
    return {
      x: pos.x,
      y: pos.y,
      footY: pos.y + 13,
      flipX: false,
      matrix: mat,
    };
  }

  if (timeState === 'late_night') {
    const sleepyNod = isMusicActive && !reducedMotion && Math.sin(timeSec * Math.PI * 2.2) > 0.4;
    const mat = CAPY_DROWSY_HALF;
    const pos = clampCapyPos(188, sleepyNod ? 131 : 132, mat);
    return {
      x: pos.x,
      y: pos.y,
      footY: pos.y + 13,
      flipX: false,
      matrix: mat,
    };
  }

  if (reducedMotion) {
    const mat = CAPY_SIT_OPEN;
    const pos = clampCapyPos(188, 131, mat);
    return {
      x: pos.x,
      y: pos.y,
      footY: pos.y + 14,
      flipX: false,
      matrix: mat,
    };
  }

  const loop = timeSec % 20;
  let cx = 188;
  let cy = 131;
  let flipX = false;
  let isWalking = false;

  if (loop < 3.5) {
    cx = 188;
    cy = 131;
    flipX = false;
  } else if (loop < 8.2) {
    const p = (loop - 3.5) / 4.7;
    cx = Math.round(188 - p * 54);
    cy = Math.round(131 + Math.sin(p * Math.PI) * 2);
    flipX = false;
    isWalking = true;
  } else if (loop < 12.2) {
    cx = 134;
    cy = 132;
    flipX = loop >= 10.6;
  } else if (loop < 17.0) {
    const p = (loop - 12.2) / 4.8;
    cx = Math.round(134 + p * 54);
    cy = Math.round(132 - Math.sin(p * Math.PI) * 1);
    flipX = true;
    isWalking = true;
  } else {
    cx = 188;
    cy = 131;
    flipX = loop < 18.4;
  }

  if (isMusicActive) {
    const danceFrame = Math.floor(timeSec * 4.4) % 2;
    const hopY = danceFrame === 1 ? -2 : 0;
    const mat = danceFrame === 1 ? CAPY_DANCE_1 : CAPY_DANCE_0;
    const pos = clampCapyPos(cx, cy + hopY, mat);
    return {
      x: pos.x,
      y: pos.y,
      footY: pos.y + 14,
      flipX,
      matrix: mat,
    };
  }

  if (isWalking) {
    const walkSequence = [CAPY_WALK_0, CAPY_WALK_1, CAPY_WALK_2, CAPY_WALK_1];
    const step = Math.floor(timeSec * 5.2) % walkSequence.length;
    const mat = walkSequence[step];
    const pos = clampCapyPos(cx, cy, mat);
    return {
      x: pos.x,
      y: pos.y,
      footY: pos.y + 14,
      flipX,
      matrix: mat,
    };
  }

  const blinkNow = timeSec % 4.1 >= 3.88;
  const earTwitch = timeSec % 3.2 >= 2.96;
  const sitMatrix = blinkNow ? CAPY_SIT_BLINK : earTwitch ? CAPY_SIT_EAR : CAPY_SIT_OPEN;
  const pos = clampCapyPos(cx, cy, sitMatrix);

  return {
    x: pos.x,
    y: pos.y,
    footY: pos.y + 14,
    flipX,
    matrix: sitMatrix,
  };
}

export function drawWakingAndCapybaraLayer(
  ctx: CanvasRenderingContext2D,
  options: DrawCharacterAndEffectsOptions
): void {
  const { timeState, lampOn, isMusicActive, palette, reducedMotion = false } = options;
  const timeSec = resolveTimeSec(options);

  const capyState = getCapybaraState(timeState, isMusicActive, timeSec, reducedMotion);
  const capyColors = getCapyPalette(timeState, lampOn);

  const renderCapy = () => {
    drawSpriteMatrix(ctx, capyState.matrix, capyColors, capyState.x, capyState.y, capyState.flipX);
    if (timeState === 'sleeping') {
      const zX = Math.max(RUG_WALK_RECT.x, capyState.x - 4);
      const zY = Math.max(RUG_WALK_RECT.y + 5, capyState.y - 1);
      drawZzzDrift(ctx, zX, zY, timeSec + 1.2, reducedMotion, 3);
    }
  };

  if (timeState !== 'waking') {
    renderCapy();
    return;
  }

  const longPose = getWakingLongPose(timeSec, reducedMotion);
  const longColors = getLongPalette(timeState, lampOn, palette);

  const renderLong = () => {
    drawSpriteMatrix(ctx, longPose.matrix, longColors, longPose.x, longPose.y);
    if (longPose.steamX >= 0) {
      drawSmoothSteam(ctx, longPose.steamX, longPose.steamY, timeSec, reducedMotion, 7);
    }
  };

  if (longPose.footY <= capyState.footY) {
    renderLong();
    renderCapy();
  } else {
    renderCapy();
    renderLong();
  }
}

function drawEqualizerBars(
  ctx: CanvasRenderingContext2D,
  baseX: number,
  baseY: number,
  timeSec: number,
  phaseOffset: number
): void {
  const barColors = ['#34A853', '#FBBC04', '#60A5FA'];
  for (let b = 0; b < 3; b += 1) {
    const wave = (Math.sin(timeSec * 8.5 + phaseOffset + b * 1.9) + 1) * 0.5;
    const h = 2 + Math.round(wave * 6);
    const bx = baseX + b * 2;
    const by = baseY - h;
    fillPixelRect(ctx, bx, by, 1, h, barColors[b]);
    fillPixelRect(ctx, bx, by, 1, 1, '#FFFFFF');
  }
}

function drawMusicEffects(
  ctx: CanvasRenderingContext2D,
  isMusicActive: boolean,
  timeSec: number,
  reducedMotion: boolean
): void {
  if (reducedMotion) {
    musicTracker.wasActive = isMusicActive;
    musicTracker.fadeStartAtSec = null;
    musicTracker.lastSeenTimeSec = 0;

    if (!isMusicActive) {
      return;
    }

    drawSpriteMatrix(ctx, WOOFER_FRAME_0, WOOFER_COLORS, LEFT_WOOFER_X, LEFT_WOOFER_Y);
    drawSpriteMatrix(ctx, WOOFER_FRAME_0, WOOFER_COLORS, RIGHT_WOOFER_X, RIGHT_WOOFER_Y);
    ctx.save();
    ctx.globalAlpha = 0.9;
    drawSpriteMatrix(ctx, NOTE_SINGLE, NOTE_COLORS_GREEN, 121, 47);
    drawSpriteMatrix(ctx, NOTE_DOUBLE, NOTE_COLORS_GOLD, 215, 46);
    ctx.restore();
    return;
  }

  if (timeSec < musicTracker.lastSeenTimeSec - 0.5) {
    musicTracker.fadeStartAtSec = null;
  }

  let noteFadeMultiplier = 0;
  let fadeReferenceSec: number | null = null;

  if (isMusicActive) {
    musicTracker.wasActive = true;
    musicTracker.fadeStartAtSec = null;
    noteFadeMultiplier = 1;
  } else {
    if (musicTracker.wasActive) {
      musicTracker.wasActive = false;
      musicTracker.fadeStartAtSec = timeSec;
    }

    if (musicTracker.fadeStartAtSec !== null) {
      const elapsedSincePause = Math.max(0, timeSec - musicTracker.fadeStartAtSec);
      if (elapsedSincePause < MUSIC_FADE_DURATION_SEC) {
        noteFadeMultiplier = 1 - elapsedSincePause / MUSIC_FADE_DURATION_SEC;
        fadeReferenceSec = musicTracker.fadeStartAtSec;
      } else {
        musicTracker.fadeStartAtSec = null;
        noteFadeMultiplier = 0;
      }
    }
  }

  musicTracker.lastSeenTimeSec = timeSec;

  if (isMusicActive) {
    const wooferPulse = Math.sin(timeSec * Math.PI * 5.2) > 0;
    const wooferMatrix = wooferPulse ? WOOFER_FRAME_1 : WOOFER_FRAME_0;
    drawSpriteMatrix(ctx, wooferMatrix, WOOFER_COLORS, LEFT_WOOFER_X, LEFT_WOOFER_Y);
    drawSpriteMatrix(ctx, wooferMatrix, WOOFER_COLORS, RIGHT_WOOFER_X, RIGHT_WOOFER_Y);

    drawEqualizerBars(ctx, 113, 58, timeSec, 0);
    drawEqualizerBars(ctx, 207, 58, timeSec, 1.4);
  }

  if (noteFadeMultiplier <= 0) {
    return;
  }

  const cycleSec = 2.4;
  const notes: readonly {
    baseX: number;
    baseY: number;
    offsetSec: number;
    doubleNote: boolean;
    colors: SpriteColorMap;
    arcAmp: number;
  }[] = [
    { baseX: 124, baseY: 54, offsetSec: 0, doubleNote: false, colors: NOTE_COLORS_GREEN, arcAmp: 2.6 },
    { baseX: 124, baseY: 54, offsetSec: 1.2, doubleNote: true, colors: NOTE_COLORS_BLUE, arcAmp: -2.4 },
    { baseX: 218, baseY: 54, offsetSec: 0.6, doubleNote: true, colors: NOTE_COLORS_GOLD, arcAmp: 2.6 },
    { baseX: 218, baseY: 54, offsetSec: 1.8, doubleNote: false, colors: NOTE_COLORS_CORAL, arcAmp: -2.6 },
  ];

  for (let i = 0; i < notes.length; i += 1) {
    const item = notes[i];
    const currentCycleIdx = Math.floor((timeSec + item.offsetSec) / cycleSec);
    if (fadeReferenceSec !== null) {
      const pauseCycleIdx = Math.floor((fadeReferenceSec + item.offsetSec) / cycleSec);
      if (currentCycleIdx > pauseCycleIdx) {
        continue;
      }
    }

    const phase = ((timeSec + item.offsetSec) % cycleSec) / cycleSec;
    const drawX = item.baseX - 3 + Math.round(Math.sin(phase * Math.PI * 2) * item.arcAmp);
    const drawY = item.baseY - Math.round(phase * 24);
    const baseAlpha =
      phase < 0.16 ? phase / 0.16 : phase > 0.65 ? Math.max(0, (1 - phase) / 0.35) : 0.95;
    const finalAlpha = Math.max(0, Math.min(1, baseAlpha * noteFadeMultiplier));
    if (finalAlpha <= 0.02) {
      continue;
    }
    const mat = item.doubleNote ? NOTE_DOUBLE : NOTE_SINGLE;
    ctx.save();
    ctx.globalAlpha = finalAlpha;
    drawSpriteMatrix(ctx, mat, item.colors, drawX, drawY);
    ctx.restore();
  }
}

function drawHotspotPointer(
  ctx: CanvasRenderingContext2D,
  hoveredHotspot: RoomHotspotId | null,
  selectedHotspot: RoomHotspotId | null,
  hoveredRegion: RoomHotspotRegion | null | undefined,
  capyState: CapyPoseState,
  timeSec: number,
  reducedMotion: boolean
): void {
  let pointerX: number | null = null;
  let pointerY: number | null = null;

  const activeId = hoveredRegion ? hoveredRegion.id : hoveredHotspot ?? selectedHotspot;

  if (activeId === 'capybara') {
    pointerX = capyState.x + 10;
    pointerY = capyState.y - 4;
  } else if (hoveredRegion) {
    pointerX = hoveredRegion.pointerX;
    pointerY = hoveredRegion.pointerY;
  } else if (activeId) {
    const anchor = HOTSPOT_POINTER_ANCHORS[activeId];
    pointerX = anchor.pointerX;
    pointerY = anchor.pointerY;
  }

  if (pointerX === null || pointerY === null) {
    return;
  }

  const bounceSteps = [0, 1, 2, 1];
  const bounce = reducedMotion ? 0 : bounceSteps[Math.floor(timeSec * 5) % bounceSteps.length];
  const drawX = Math.max(0, Math.min(311, Math.round(pointerX - 4)));
  const drawY = Math.max(0, Math.round(pointerY - 5 + bounce));
  drawSpriteMatrix(ctx, GBA_POINTER_ARROW, GBA_POINTER_COLORS, drawX, drawY);
}

export function drawMusicEffectsOverlay(
  ctx: CanvasRenderingContext2D,
  options: DrawCharacterAndEffectsOptions
): void {
  const {
    timeState,
    isMusicActive,
    hoveredHotspot,
    selectedHotspot,
    hoveredRegion,
    reducedMotion = false,
  } = options;
  const timeSec = resolveTimeSec(options);
  const capyState = getCapybaraState(timeState, isMusicActive, timeSec, reducedMotion);

  drawMusicEffects(ctx, isMusicActive, timeSec, reducedMotion);
  drawHotspotPointer(
    ctx,
    hoveredHotspot,
    selectedHotspot,
    hoveredRegion,
    capyState,
    timeSec,
    reducedMotion
  );
}

export function drawCharacterAndEffects(
  ctx: CanvasRenderingContext2D,
  options: DrawCharacterAndEffectsOptions
): void {
  drawRoomScreensAndSteam(ctx, options);
  if (options.timeState === 'sleeping') {
    drawSleepingCharacter(ctx, options);
  } else if (options.timeState === 'working' || options.timeState === 'late_night') {
    drawSeatedCharacter(ctx, options);
  }
  drawWakingAndCapybaraLayer(ctx, options);
  drawMusicEffectsOverlay(ctx, options);
}
