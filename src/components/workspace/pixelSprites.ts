import type { RoomHotspotId, RoomHotspotRegion, RoomTimeState } from '../../data/workspace';
import type { RoomPalette } from './pixelPalette';
import { RUG_WALK_RECT, WALKABLE_RECT } from './roomEnvironment';

export type SpriteMatrix = readonly string[];

export type SpriteColorMap = Record<string, string | undefined>;

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

const SEATED_DRAW_X = 152;
const SEATED_DRAW_Y = 72;
const SEATED_WIDTH = 52;
const SEATED_HEAD_HEIGHT = 12;
const SEATED_TORSO_HEIGHT = 22;
const SEATED_TOTAL_HEIGHT = 33;

const SLEEP_DRAW_X = 24;
const SLEEP_DRAW_Y = 86;

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

const SLEEPING_HEAD_ROWS: SpriteMatrix = [
  '...........OOOOOOOOOOOO...........',
  '.........OOHllhhhhhhllHOO.........',
  '........OHllhhhhhhhhhhllHO........',
  '.......POHhHHhHHHHHHhHHhHOP.......',
  '.......POHhHhtsdsstsdstHHOP.......',
  '.......POHsdstttttttttdsHOP.......',
  '......POdsstsssssssssstssdOP......',
  '......POdssssKKKssKKKssssdOP......',
  '......POdssppsssdtsssppssdOP......',
  '.......POsssssssppsssssssOP.......',
  '........POdssssddddssssdOP........',
  '.........POOddddssddddOOP.........',
  '...........OOOdsddsdOOO...........',
  '.........OOObCdsddsdCbOOO.........',
];

const SLEEPING_TORSO_ROWS: SpriteMatrix = [
  '......OOOBbbCCddddddCCbbBOOO.OOOO.',
  '....OOBBBBBbCCmmmmmmCCbBBBBBOtsstO',
  '...OBBBBBBBbCCmmmmmmCCbBBBBBOsdssO',
  '...OBBBBBBBBBCCCCCCCCBBBBBBBObbbsO',
  '...OBBBBBBBBBBBBBBBBBBBBBBBBObbbOO',
  '...OBBBBBSSSSBBBBBBBBBBSSSSBBBBBO.',
  '....OSSSSSSSSSSSSSSSSSSSSSSSSSSO..',
  '.....OOOOOOOOOOOOOOOOOOOOOOOOOO...',
];

function buildSleepingLongMatrix(breathOffset: number): SpriteMatrix {
  const width = 34;
  const totalHeight = 22;
  const grid: string[][] = Array.from({ length: totalHeight }, () =>
    Array<string>(width).fill('.')
  );

  for (let r = 0; r < SLEEPING_HEAD_ROWS.length; r += 1) {
    const line = SLEEPING_HEAD_ROWS[r];
    for (let c = 0; c < width; c += 1) {
      const ch = line[c];
      if (ch && ch !== '.') {
        grid[r][c] = ch;
      }
    }
  }

  const torsoStart = 14 + (breathOffset < 0 ? -1 : 0);
  for (let r = 0; r < SLEEPING_TORSO_ROWS.length; r += 1) {
    const gr = torsoStart + r;
    if (gr < 0 || gr >= totalHeight) continue;
    const line = SLEEPING_TORSO_ROWS[r];
    for (let c = 0; c < width; c += 1) {
      const ch = line[c];
      if (ch && ch !== '.') {
        grid[gr][c] = ch;
      }
    }
  }

  return grid.map((chars) => chars.join(''));
}

const SEATED_HEAD_MONITOR: SpriteMatrix = [
  '...............OOOOOOOOOO...........................',
  '.............OOHHllhhhhhHOO.........................',
  '............OHHllhhhhhhhhhHO........................',
  '............OHhHHHHHHHHhhhHO........................',
  '...........OGLsHHHHhHHHHHHhHO.......................',
  '..........OGLRdsdHHHHHHHHHhhHO......................',
  '..........OdtGssHHHHHHHHHHHhHO......................',
  '...........OdssHHHHHHHHHHHHhHO......................',
  '............OssHHHhHHHHHhHHHO.......................',
  '.............OdsdHHHHHHHHHOO........................',
  '..............OOddddssddOO..........................',
  '................OOOOOOOO............................',
];

const SEATED_HEAD_GLANCE_LEFT: SpriteMatrix = [
  '..............OOOOOOOOOO............................',
  '............OOHHllhhhhhHOO..........................',
  '...........OHHllhhhhhhhhhHO.........................',
  '...........OHhHHHHHHHHhhhHO.........................',
  '..........OGLLsHHHHhHHHHHHhHO.......................',
  '.........OGLRRdsdHHHHHHHHHhhHO......................',
  '.........OdtGGssHHHHHHHHHHHhHO......................',
  '..........OdssHHHHHHHHHHHHhHO.......................',
  '...........OssHHHhHHHHHhHHHO........................',
  '............OdsdHHHHHHHHHOO.........................',
  '.............OOddddssddOO...........................',
  '...............OOOOOOOO.............................',
];

const SEATED_HEAD_SIP_MUG: SpriteMatrix = [
  '.................OOOOOOOOOO.........................',
  '...............OOHhhhhhllHHOO.......................',
  '..............OHhhhhhhhhhllHHO......................',
  '..............OHhhhHHHHHHHHhHO......................',
  '.............OHhHHHHHHhHHHHsLGO.....................',
  '............OHhhHHHHHHHHHdsdRLGO....................',
  '............OHhHHHHHHHHHHHssGtdO....................',
  '............OHhHHHHHHHHHHHHssdO.....................',
  '.............OHHHhHHHHHhHHHssO......................',
  '..............OOHHHHHHHHHdsdO.......................',
  '................OOddssddddOO........................',
  '..................OOOOOOOO..........................',
];

const SEATED_HEAD_TILT_LEFT: SpriteMatrix = [
  '..............OOOOOOOOOO............................',
  '............OOHHllhhhhhHOO..........................',
  '...........OHHllhhhhhhhhhHO.........................',
  '...........OHhHHHHHHHHhhhHO.........................',
  '..........OGLsHHHHhHHHHHHhHO........................',
  '..........OGLRdsdHHHHHHHHHhhHO......................',
  '..........OdtGssHHHHHHHHHHHhHO......................',
  '...........OdssHHHHHHHHHHHHhHO......................',
  '............OssHHHhHHHHHhHHHO.......................',
  '.............OdsdHHHHHHHHHOO........................',
  '..............OOddddssddOO..........................',
  '................OOOOOOOO............................',
];

const SEATED_HEAD_TILT_RIGHT: SpriteMatrix = [
  '................OOOOOOOOOO..........................',
  '..............OOHHllhhhhhHOO........................',
  '.............OHHllhhhhhhhhhHO.......................',
  '.............OHhHHHHHHHHhhhHO.......................',
  '............OGLsHHHHhHHHHHHhHO......................',
  '...........OGLRdsdHHHHHHHHHhhHO.....................',
  '...........OdtGssHHHHHHHHHHHhHO.....................',
  '............OdssHHHHHHHHHHHHhHO.....................',
  '.............OssHHHhHHHHHhHHHO......................',
  '..............OdsdHHHHHHHHHOO.......................',
  '...............OOddddssddOO.........................',
  '.................OOOOOOOO...........................',
];

const SEATED_TORSO_HOME: SpriteMatrix = [
  '....................................................',
  '.....OOOO...............OOOO........................',
  '....OtsdsO.............OdsdtO.......................',
  '....ObdsbOO...OOOBmmBmBOObdsbO......................',
  '....ObbbBOOOBBBbBmCCCmBbBBObbbbO....................',
  '.....ObbBBbBBBBBmmCCCmmBBBBbBbbO....................',
  '......OOBBBBBBBBBmmmmmBBBBBBBBBOO...................',
  '.......OBBBBBBBBBBBBBBBBBBBBBBBBO...................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBbBBBBBBBBBBBBBBbBBBO....................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBBBSSSSBBBBBBBBSSSSBO....................',
  '.........OBBBBSSSSBBBBBBBBSSSBO.....................',
  '...........OBBBBBBBBBBBBBBBBBO......................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OBBBSSSSBBBBBBBBSSSSO.....................',
  '..........OSSSSSSSSSSSSSSSSSSSO.....................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OSSSSSSSSSSSSSSSSSSSO.....................',
  '...........OOOOOOOOOOOOOOOOOOO......................',
];

const SEATED_TORSO_TYPE_L: SpriteMatrix = [
  '.....OOOO...........................................',
  '....OtsdsO..............OOOO........................',
  '....ObdsbOO............OdsdtO.......................',
  '....ObbbBOO...OOOBmmBmBOObdsbO......................',
  '.....ObbBOOOBBBbBmCCCmBbBBObbbbO....................',
  '.....ObbBBbBBBBBmmCCCmmBBBBbBbbO....................',
  '......OOBBBBBBBBBmmmmmBBBBBBBBBOO...................',
  '.......OBBBBBBBBBBBBBBBBBBBBBBBBO...................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBbBBBBBBBBBBBBBBbBBBO....................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBBBSSSSBBBBBBBBSSSSBO....................',
  '.........OBBBBSSSSBBBBBBBBSSSBO.....................',
  '...........OBBBBBBBBBBBBBBBBBO......................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OBBBSSSSBBBBBBBBSSSSO.....................',
  '..........OSSSSSSSSSSSSSSSSSSSO.....................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OSSSSSSSSSSSSSSSSSSSO.....................',
  '...........OOOOOOOOOOOOOOOOOOO......................',
];

const SEATED_TORSO_TYPE_R: SpriteMatrix = [
  '........................OOOO........................',
  '.....OOOO..............OdsdtO.......................',
  '....OtsdsO.............ObsdbO.......................',
  '....ObdsbOO...OOOBmmBmBOObdbO.......................',
  '....ObbbBOOOBBBbBmCCCmBbBBObbbO.....................',
  '.....ObbBBbBBBBBmmCCCmmBBBBbBbbO....................',
  '......OOBBBBBBBBBmmmmmBBBBBBBBBOO...................',
  '.......OBBBBBBBBBBBBBBBBBBBBBBBBO...................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBbBBBBBBBBBBBBBBbBBBO....................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBBBSSSSBBBBBBBBSSSSBO....................',
  '.........OBBBBSSSSBBBBBBBBSSSBO.....................',
  '...........OBBBBBBBBBBBBBBBBBO......................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OBBBSSSSBBBBBBBBSSSSO.....................',
  '..........OSSSSSSSSSSSSSSSSSSSO.....................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OSSSSSSSSSSSSSSSSSSSO.....................',
  '...........OOOOOOOOOOOOOOOOOOO......................',
];

const SEATED_TORSO_MOUSE_A: SpriteMatrix = [
  '....................................................',
  '.....OOOO..........................OOOO.............',
  '....OtsdsO........................OdsdtO............',
  '....ObdsbOO...OOOBmmBmBOOOOOOO...ObbdddsO...........',
  '....ObbbBOOOBBBbBmCCCmBbBBBBbbOOOObbbbbO............',
  '.....ObbBBbBBBBBmmCCCmmBBBBBBBBbbbbbbOO.............',
  '......OOBBBBBBBBBmmmmmBBBBBBBBBOOOOO................',
  '.......OBBBBBBBBBBBBBBBBBBBBBBBBO...................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBbBBBBBBBBBBBBBBbBBBO....................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBBBSSSSBBBBBBBBSSSSBO....................',
  '.........OBBBBSSSSBBBBBBBBSSSBO.....................',
  '...........OBBBBBBBBBBBBBBBBBO......................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OBBBSSSSBBBBBBBBSSSSO.....................',
  '..........OSSSSSSSSSSSSSSSSSSSO.....................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OSSSSSSSSSSSSSSSSSSSO.....................',
  '...........OOOOOOOOOOOOOOOOOOO......................',
];

const SEATED_TORSO_MOUSE_B: SpriteMatrix = [
  '....................................................',
  '.....OOOO...........................OOOO............',
  '....OtsdsO.........................OdsdtO...........',
  '....ObdsbOO...OOOBmmBmBOOOOOOO....ObbdddsO..........',
  '....ObbbBOOOBBBbBmCCCmBbBBBBbbOOOOObbbbbbO..........',
  '.....ObbBBbBBBBBmmCCCmmBBBBBBBBbbbbbbbOO............',
  '......OOBBBBBBBBBmmmmmBBBBBBBBBOOOOOO...............',
  '.......OBBBBBBBBBBBBBBBBBBBBBBBBO...................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBbBBBBBBBBBBBBBBbBBBO....................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBBBSSSSBBBBBBBBSSSSBO....................',
  '.........OBBBBSSSSBBBBBBBBSSSBO.....................',
  '...........OBBBBBBBBBBBBBBBBBO......................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OBBBSSSSBBBBBBBBSSSSO.....................',
  '..........OSSSSSSSSSSSSSSSSSSSO.....................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OSSSSSSSSSSSSSSSSSSSO.....................',
  '...........OOOOOOOOOOOOOOOOOOO......................',
];

const SEATED_TORSO_REACH_MUG: SpriteMatrix = [
  '....................................................',
  '.....OOOO...................................OOOO....',
  '....OtsdsO.................................OdsdtO...',
  '....ObdsbOO...OOOBmmBmBOOOOOOOOOOOOOOO....ObbdddsO..',
  '....ObbbBOOOBBBbBmCCCmBbBBBBBBBBbbbbbOOOOOObbbbbO...',
  '.....ObbBBbBBBBBmmCCCmmBBBBBBBBBBBBBBBBbbbbbbOO.....',
  '......OOBBBBBBBBBmmmmmBBBBBBBBBOOOOOOOOOOOOO........',
  '.......OBBBBBBBBBBBBBBBBBBBBBBBBO...................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBbBBBBBBBBBBBBBBbBBBO....................',
  '........OBBBBBBBBBBBBBBBBBBBBBBO....................',
  '........OBBBBBSSSSBBBBBBBBSSSSBO....................',
  '.........OBBBBSSSSBBBBBBBBSSSBO.....................',
  '...........OBBBBBBBBBBBBBBBBBO......................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OBBBSSSSBBBBBBBBSSSSO.....................',
  '..........OSSSSSSSSSSSSSSSSSSSO.....................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OSSSSSSSSSSSSSSSSSSSO.....................',
  '...........OOOOOOOOOOOOOOOOOOO......................',
];

const SEATED_TORSO_SIP_MUG: SpriteMatrix = [
  '............................OOOOOO..................',
  '...........................OMMMMMcO.................',
  '...........................OMFFFFcO.................',
  '...........................OMMMMdsO.................',
  '...........................ObbdsstO.................',
  '...........................ObbbbssO.................',
  '.....OOOO..................ObbbbbO..................',
  '....OtsdsO.................ObbBbO...................',
  '....ObdsbOO...OOOBmmBmBOOOObBbBO....................',
  '....ObbbBOOOBBBbBmCCCmBbBBBBbbBO....................',
  '.....ObbBBbBBBBBmmCCCmmBBBBBBBO.....................',
  '......OOBBBBBBBBBmmmmmBBBBBBBOO.....................',
  '.......OBBBBBBBBBBBBBBBBBBBBBO......................',
  '........OBBBBBBBBBBBBBBBBBBBBO......................',
  '........OBBBbBBBBBBBBBBBBbBBBO......................',
  '........OBBBBBBBBBBBBBBBBBBBBO......................',
  '........OBBBBBSSSSBBBBBBBSSSSO......................',
  '.........OBBBBSSSSBBBBBBBSSSO.......................',
  '...........OBBBBBBBBBBBBBBBBO.......................',
  '...........OBBBBBBBBBBBBBBBBO.......................',
  '..........OSSSSSSSSSSSSSSSSSSO......................',
  '...........OOOOOOOOOOOOOOOOOO.......................',
];

const SEATED_TORSO_STRETCH: SpriteMatrix = [
  '.....OOOO.........................OOOO..............',
  '....OtsdsO.......................OdsdtO.............',
  '....ObdsbO.......................ObsdbO.............',
  '.....ObbBO.......................ObbbO..............',
  '.....OBbBO.......................ObBBO..............',
  '......OBbO.......................ObBO...............',
  '.......OBbOO...OOOBmmBmBOOO.....ObBO................',
  '........ObbbOOBBBbBmCCCmBbBBBOOObbO.................',
  '.........OBBBBBBBBBmmmmmBBBBBBBBBO..................',
  '.........OBBBBBBBBBBBBBBBBBBBBBBO...................',
  '..........OBBBBBBBBBBBBBBBBBBBBO....................',
  '..........OBBBbBBBBBBBBBBBBbBBBO....................',
  '..........OBBBBBBBBBBBBBBBBBBBBO....................',
  '..........OBBBBBSSSSBBBBBBBSSSSO....................',
  '..........OBBBBBSSSSBBBBBBBSSSO.....................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OBBBBBBBBBBBBBBBBBBBO.....................',
  '..........OBBBSSSSBBBBBBBSSSSBO.....................',
  '...........OSSSSSSSSSSSSSSSSSO......................',
  '...........OBBBBBBBBBBBBBBBBBO......................',
  '...........OBBBBBBBBBBBBBBBBBO......................',
  '............OOOOOOOOOOOOOOOOO.......................',
];

function normalizeRows(rows: readonly string[], width = SEATED_WIDTH): SpriteMatrix {
  return rows.map((row) =>
    row.length >= width ? row.slice(0, width) : row.padEnd(width, '.')
  );
}

function buildSeatedLongMatrix(
  head: SpriteMatrix,
  torso: SpriteMatrix,
  headDropPx: number,
  shoulderDropPx: number
): SpriteMatrix {
  const normHead = normalizeRows(head, SEATED_WIDTH);
  const normTorso = normalizeRows(torso, SEATED_WIDTH);

  const grid: string[][] = Array.from({ length: SEATED_TOTAL_HEIGHT }, () =>
    Array<string>(SEATED_WIDTH).fill('.')
  );

  const isSipPose = torso === SEATED_TORSO_SIP_MUG;
  const torsoBase = torso === SEATED_TORSO_STRETCH ? 7 : isSipPose ? 6 : 11;
  const torsoStart = Math.min(SEATED_TOTAL_HEIGHT - SEATED_TORSO_HEIGHT, torsoBase + shoulderDropPx);

  for (let r = 0; r < SEATED_TORSO_HEIGHT; r += 1) {
    const gr = torsoStart + r;
    if (gr < 0 || gr >= SEATED_TOTAL_HEIGHT) continue;
    const rowStr = normTorso[r];
    for (let c = 0; c < SEATED_WIDTH; c += 1) {
      const ch = rowStr[c];
      if (ch !== '.') {
        grid[gr][c] = ch;
      }
    }
  }

  const headStart = 1 + (headDropPx > 0 ? 1 : 0);
  for (let r = 0; r < SEATED_HEAD_HEIGHT; r += 1) {
    const gr = headStart + r;
    if (gr < 0 || gr >= SEATED_TOTAL_HEIGHT) continue;
    const rowStr = normHead[r];
    for (let c = 0; c < SEATED_WIDTH; c += 1) {
      const ch = rowStr[c];
      if (ch === '.') continue;
      const existing = grid[gr][c];
      if (existing === 'M' || existing === 'F' || existing === 'c') continue;
      if (isSipPose && c >= 26 && existing !== '.') continue;
      grid[gr][c] = ch;
    }
  }

  return grid.map((chars) => chars.join(''));
}

const WAKING_HEAD_OPEN: SpriteMatrix = [
  '......OOOOOOOO.......',
  '....OOHllhhhhHOO.....',
  '...OHllhhhhhhhhHO....',
  '..OHHlhHHHHHHHHhHO...',
  '..OHhHHtsdsstHHhHO...',
  '.OHsGGGGGsGGGGGsHO...',
  '.OdsGGRLEGsGERLGsdO..',
  '..OdGGGGGsGGGGGdO....',
  '...OspppstspppsO.....',
  '....OOddsssddOO......',
];

const WAKING_HEAD_BLINK: SpriteMatrix = [
  '......OOOOOOOO.......',
  '....OOHllhhhhHOO.....',
  '...OHllhhhhhhhhHO....',
  '..OHHlhHHHHHHHHhHO...',
  '..OHhHHtsdsstHHhHO...',
  '.OHsGGGGGsGGGGGsHO...',
  '.OdsGKKKGsGKKKGsdO...',
  '..OdGGGGGsGGGGGdO....',
  '...OspppstspppsO.....',
  '....OOddsssddOO......',
];

const WAKING_HEAD_SIP: SpriteMatrix = [
  '......OOOOOOOO.......',
  '....OOHllhhhhHOO.....',
  '...OHllhhhhhhhhHO....',
  '..OHHlhHHHHHHHHhHO...',
  '..OHhHHtsdsstHHhHO...',
  '.OHsGGGGGsGGGGGsHO...',
  '.OdsGKKKGsGKKKGsdO...',
  '..OdGGGGGsGGGGGdO....',
  '...OspppstspppsO.....',
  '....OOddsssddOO......',
];

const WAKING_BODY_HOLD_CUP: SpriteMatrix = [
  '...OOOBBmCmBBBOO.....',
  '..ObBBBBmCmBBBBbO....',
  '.ObBBBBBmCmBBBBBbO...',
  '.OBBBObBBCCBBbOBBO...',
  '.OBBOOBBBBBBBBOOBBO..',
  '.OBBOOBBBSSBBBOssOO..',
  '.OssOOBBBSSBBBOMFFMO.',
  '.OdsOOBBBBBBBBOMMMcO.',
  '..OO.OBBBSSBBBOMMMcO.',
  '.....OSSSSSSSSO.OOO..',
  '.....OJJjjNNjjJO.....',
  '.....OJJJJNNJJJO.....',
  '.....OJJJNOONJJO.....',
  '.....OJJNO..ONJJO....',
  '.....OJJNO..ONJJO....',
  '.....OJJNO..ONJJO....',
  '.....OJJNO..ONJJO....',
  '.....OJJNO..ONJJO....',
  '.....OUUUO..OUUUO....',
  '.....OWWWO..OWWWO....',
  '.....OOOOO..OOOOO....',
  '....xxxxxx..xxxxxx...',
];

const WAKING_BODY_LIFT_CUP: SpriteMatrix = [
  '...OOOBBmCmBBBOO.....',
  '..ObBBBBmCmBBBBbO....',
  '.ObBBBBBmCmBBBOOO....',
  '.OBBBObBBCCBBbOMFFMO.',
  '.OBBOOBBBBBBBBOMMMcO.',
  '.OBBOOBBBSSBBBOMMMcO.',
  '.OssOOBBBSSBBBOssOO..',
  '.OdsOOBBBBBBBBOOO....',
  '..OO.OBBBSSBBBO......',
  '.....OSSSSSSSSO......',
  '.....OJJjjNNjjJO.....',
  '.....OJJJJNNJJJO.....',
  '.....OJJJNOONJJO.....',
  '.....OJJNO..ONJJO....',
  '.....OJJNO..ONJJO....',
  '.....OJJNO..ONJJO....',
  '.....OJJNO..ONJJO....',
  '.....OJJNO..ONJJO....',
  '.....OUUUO..OUUUO....',
  '.....OWWWO..OWWWO....',
  '.....OOOOO..OOOOO....',
  '....xxxxxx..xxxxxx...',
];

const WAKING_STRETCH_MATRIX: SpriteMatrix = [
  '.OOOO................',
  'OssOO.OOOOOOOO.......',
  'OdsOOOHllhhhhHOO.....',
  '.ObOHllhhhhhhhhHO....',
  '.OBOHlhHHHHHHHHhHO...',
  '..OBOHHtsdsstHHhHO...',
  '..ObOsGGGGGsGGGGGsHO.',
  '...OdsGKKKGsGKKKGsdO.',
  '....OdGGGGGsGGGGGdO..',
  '.....OspppstspppsO...',
  '....OOddsssddOOOO....',
  '...ObBBBBmCmBBBBbO...',
  '...OBBBBBmCmBBBBBO...',
  '...OBBBBSSSSBBBBbO...',
  '....OBBBBBBBBBOBssOO.',
  '....OBBBBSSBBBOMFFMO.',
  '....OBBBBBBBBBOMMMcO.',
  '....OSSSSSSSSOOMMMcO.',
  '.....OJJjjNNjjJO.OOO.',
  '.....OJJJJNNJJJO.....',
  '.....OJJJNOONJJO.....',
  '.....OJJNO..ONJJO....',
  '.....OJJNO..ONJJO....',
  '.....OJJNO..ONJJO....',
  '.....OJJNO..ONJJO....',
  '.....OJJNO..ONJJO....',
  '.....OUUUO..OUUUO....',
  '.....OWWWO..OWWWO....',
  '.....OOOOO..OOOOO....',
  '....xxxxxx..xxxxxx...',
];

const WAKING_IDLE_STEPS: readonly SpriteMatrix[] = [
  [...WAKING_HEAD_OPEN, ...WAKING_BODY_HOLD_CUP],
  [...WAKING_HEAD_BLINK, ...WAKING_BODY_HOLD_CUP],
];

function getLongPalette(
  timeState: RoomTimeState,
  lampOn: boolean,
  palette: RoomPalette
): SpriteColorMap {
  const isSleep = timeState === 'sleeping';
  const isLate = timeState === 'late_night';
  const dim = isSleep && !lampOn;

  return {
    O: isSleep ? palette.inkOutline : isLate ? '#1B1526' : '#26181A',
    H: dim ? '#221926' : isLate ? '#2B1C22' : '#2E1D1A',
    h: dim ? '#382838' : isLate ? '#472E2F' : '#513329',
    l: dim ? '#4F3D4F' : isLate ? '#6A4B44' : '#7A4E3B',
    t: dim ? '#B89588' : isLate ? '#E6C0A6' : '#FFE0C2',
    s: dim ? '#A07D73' : isLate ? '#D6A58A' : '#F2BF99',
    d: dim ? '#7F5E59' : isLate ? '#B07D68' : '#CC8C6A',
    p: dim ? '#9E6870' : isLate ? '#CC7A80' : '#E58880',
    G: '#1E2438',
    L: isLate ? '#6BE3FF' : '#CFE9FF',
    R: isLate ? '#D4FBFF' : '#FFFFFF',
    E: '#1A1D2B',
    K: isSleep ? '#1E1828' : '#2B1C19',
    C: dim ? '#A4A7BA' : isLate ? '#D4CED9' : '#F6EEDD',
    m: dim ? '#808499' : isLate ? '#A9A4B5' : '#D6C9B0',
    b: dim ? '#485573' : isLate ? (lampOn ? '#7F7F8E' : '#56688A') : '#6F82A6',
    B: dim ? '#343E57' : isLate ? '#3B4763' : '#4C5A78',
    S: dim ? '#232A3E' : isLate ? '#273046' : '#323D54',
    j: dim ? '#29334D' : '#3E4D6E',
    J: dim ? '#1D2438' : '#2A354E',
    N: dim ? '#131826' : '#1C2336',
    U: dim ? '#35405B' : '#4F5E80',
    W: dim ? '#A5A2B0' : '#F2ECE0',
    M: '#FFF8EB',
    c: '#D4C4B0',
    F: '#5C3422',
    P: palette.pillowShadow,
    x: 'rgba(22, 16, 28, 0.34)',
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
  drawZzzDrift(ctx, 41, 80, timeSec, reducedMotion, 6);
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

  const timeSec = resolveTimeSec(options);
  const colors = getLongPalette(timeState, lampOn, palette);

  if (reducedMotion) {
    const matrix = buildSeatedLongMatrix(SEATED_HEAD_MONITOR, SEATED_TORSO_HOME, 0, 0);
    drawSpriteMatrix(ctx, matrix, colors, SEATED_DRAW_X, SEATED_DRAW_Y);
    return;
  }

  const cycle = timeState === 'late_night' ? timeSec % 16 : timeSec % 18;
  const musicBobDown = isMusicActive && Math.sin(timeSec * Math.PI * 3.1) > 0.32 ? 1 : 0;

  let head: SpriteMatrix = SEATED_HEAD_MONITOR;
  let torso: SpriteMatrix = SEATED_TORSO_HOME;
  let headDrop = musicBobDown;
  let shoulderDrop = musicBobDown;

  if (timeState === 'working') {
    if (cycle >= 3.2 && cycle < 5.0) {
      head = SEATED_HEAD_GLANCE_LEFT;
    } else if (cycle >= 5.2 && cycle < 5.7) {
      torso = SEATED_TORSO_REACH_MUG;
      shoulderDrop = 0;
    } else if (cycle >= 5.7 && cycle < 6.9) {
      maskStaticDeskMug(ctx, palette);
      head = SEATED_HEAD_SIP_MUG;
      torso = SEATED_TORSO_SIP_MUG;
      headDrop = 0;
      shoulderDrop = 0;
      drawSmoothSteam(ctx, 182, 76, timeSec, false, 5);
    } else if (cycle >= 6.9 && cycle < 7.4) {
      torso = SEATED_TORSO_REACH_MUG;
      shoulderDrop = 0;
    } else if (cycle >= 10.8 && cycle < 13.4) {
      head = cycle < 12.1 ? SEATED_HEAD_TILT_LEFT : SEATED_HEAD_TILT_RIGHT;
      torso = SEATED_TORSO_STRETCH;
      headDrop = 0;
      shoulderDrop = 0;
    } else if (cycle >= 14.8 && cycle < 16.4) {
      head = SEATED_HEAD_GLANCE_LEFT;
      torso = Math.floor(timeSec * 5) % 2 === 0 ? SEATED_TORSO_TYPE_L : SEATED_TORSO_TYPE_R;
    } else if (cycle >= 8.2 && cycle < 10.2) {
      torso = Math.floor(timeSec * 2.5) % 2 === 0 ? SEATED_TORSO_MOUSE_A : SEATED_TORSO_MOUSE_B;
    } else {
      const step = Math.floor(timeSec * 5.2) % 3;
      torso =
        step === 0
          ? SEATED_TORSO_TYPE_L
          : step === 1
            ? SEATED_TORSO_TYPE_R
            : SEATED_TORSO_HOME;
    }
  } else {
    if (cycle >= 3.5 && cycle < 4.9) {
      head = SEATED_HEAD_GLANCE_LEFT;
    } else if (cycle >= 6.0 && cycle < 8.6) {
      torso = SEATED_TORSO_STRETCH;
      headDrop = 0;
      shoulderDrop = 0;
      head = cycle < 7.3 ? SEATED_HEAD_TILT_LEFT : SEATED_HEAD_TILT_RIGHT;
    } else if (cycle >= 10.4 && cycle < 12.2) {
      torso = Math.floor(timeSec * 2.4) % 2 === 0 ? SEATED_TORSO_MOUSE_A : SEATED_TORSO_MOUSE_B;
    } else {
      const step = Math.floor(timeSec * 4.8) % 3;
      torso =
        step === 0
          ? SEATED_TORSO_TYPE_L
          : step === 1
            ? SEATED_TORSO_TYPE_R
            : SEATED_TORSO_HOME;
    }
  }

  const matrix = buildSeatedLongMatrix(head, torso, headDrop, shoulderDrop);
  drawSpriteMatrix(ctx, matrix, colors, SEATED_DRAW_X, SEATED_DRAW_Y);

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
      fillPixelRect(ctx, SEATED_DRAW_X + rightHairCol, SEATED_DRAW_Y + 4 + headDrop, 1, 2, '#FCD34D');
    }
    const sleeveRow = matrix[16] ?? '';
    let rightArmCol = -1;
    for (let c = sleeveRow.length - 1; c >= 0; c -= 1) {
      if (sleeveRow[c] === 'B' || sleeveRow[c] === 'b') {
        rightArmCol = c;
        break;
      }
    }
    if (rightArmCol >= 0) {
      fillPixelRect(ctx, SEATED_DRAW_X + rightArmCol, SEATED_DRAW_Y + 16, 1, 2, '#E9B872');
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
  const maxX = Math.min(84, WALKABLE_RECT.x + WALKABLE_RECT.w - 22);
  const clampX = (x: number): number => Math.max(minX, Math.min(maxX, Math.round(x)));
  const clampY = (y: number, h: number): number =>
    Math.max(WALKABLE_RECT.y, Math.min(148 - h + 1, Math.round(y)));

  if (reducedMotion) {
    const mat = WAKING_IDLE_STEPS[0];
    const x = clampX(81);
    const y = clampY(108, mat.length);
    return {
      x,
      y,
      footY: y + mat.length - 2,
      matrix: mat,
      steamX: x + 16,
      steamY: y + 15,
    };
  }

  const cycle = timeSec % 16;
  const blinkNow = timeSec % 3.9 >= 3.68 && timeSec % 3.9 <= 3.84;
  const swayOffset = Math.round(Math.sin(timeSec * 0.9) * 1.4);

  if (cycle < 4.5) {
    const head = blinkNow ? WAKING_HEAD_BLINK : WAKING_HEAD_OPEN;
    const mat = [...head, ...WAKING_BODY_HOLD_CUP];
    const x = clampX(81 + (cycle > 2.2 ? 1 : 0));
    const y = clampY(108, mat.length);
    return {
      x,
      y,
      footY: y + mat.length - 2,
      matrix: mat,
      steamX: x + 16,
      steamY: y + 15,
    };
  }

  if (cycle < 8.2) {
    const isPeakSip = cycle >= 5.0 && cycle < 7.5;
    const head = isPeakSip ? WAKING_HEAD_SIP : blinkNow ? WAKING_HEAD_BLINK : WAKING_HEAD_OPEN;
    const body = isPeakSip ? WAKING_BODY_LIFT_CUP : WAKING_BODY_HOLD_CUP;
    const mat = [...head, ...body];
    const x = clampX(82);
    const y = clampY(108, mat.length);
    return {
      x,
      y,
      footY: y + mat.length - 2,
      matrix: mat,
      steamX: x + 16,
      steamY: y + (isPeakSip ? 12 : 15),
    };
  }

  if (cycle < 11.8) {
    const mat = WAKING_STRETCH_MATRIX;
    const x = clampX(81 + Math.max(-1, Math.min(1, swayOffset)));
    const y = clampY(109, mat.length);
    return {
      x,
      y,
      footY: y + mat.length - 2,
      matrix: mat,
      steamX: x + 16,
      steamY: y + 14,
    };
  }

  const head = blinkNow ? WAKING_HEAD_BLINK : WAKING_HEAD_OPEN;
  const mat = [...head, ...WAKING_BODY_HOLD_CUP];
  const x = clampX(81 + Math.max(0, Math.min(2, swayOffset)));
  const y = clampY(108 + (cycle >= 13.6 && cycle < 14.8 ? -1 : 0), mat.length);
  return {
    x,
    y,
    footY: y + mat.length - 2,
    matrix: mat,
    steamX: x + 16,
    steamY: y + 15,
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
    drawSmoothSteam(ctx, longPose.steamX, longPose.steamY, timeSec, reducedMotion, 7);
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
