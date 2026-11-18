import type { RoomHotspotId, RoomHotspotRegion, RoomTimeState } from '../../data/workspace';
import type { RoomPalette } from './pixelPalette';
import { ROOM_HOTSPOTS, RUG_WALK_RECT, WALKABLE_RECT } from './roomEnvironment';

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

const MAIN_SCREEN_X = 153;
const MAIN_SCREEN_Y = 49;
const MAIN_SCREEN_W = 40;
const MAIN_SCREEN_H = 19;

const SIDE_LAPTOP_X = 134;
const SIDE_LAPTOP_Y = 62;
const SIDE_LAPTOP_W = 12;
const SIDE_LAPTOP_H = 8;

const DESK_MUG_X = 200;
const DESK_MUG_Y = 81;

const LEFT_WOOFER_X = 115;
const LEFT_WOOFER_Y = 68;
const RIGHT_WOOFER_X = 203;
const RIGHT_WOOFER_Y = 68;

const DEFAULT_SEAT_ANCHOR: SeatAnchor = {
  seatCenterX: 173,
  seatTopY: 96,
};

const WAKING_WIDTH = 24;
const WAKING_HEIGHT = 30;

const SEATED_WIDTH = 58;
const SEATED_HEIGHT = 23;

const SLEEP_WIDTH = 24;
const SLEEP_HEIGHT = 19;
const SLEEP_DRAW_X = 29;
const SLEEP_DRAW_Y = 89;

const CAPY_WIDTH = 22;
const CAPY_HEIGHT = 17;

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

interface ShadeRamp {
  readonly hi: string;
  readonly mid: string;
  readonly sh: string;
}

interface LongColorTheme {
  readonly selout: string;
  readonly skin: ShadeRamp & { readonly blush: string };
  readonly hair: ShadeRamp;
  readonly eye: { readonly hi: string; readonly mid: string; readonly dark: string };
  readonly glassesRim: string;
  readonly glassesLower: string;
  readonly glassesGlint: string;
  readonly hoodie: ShadeRamp;
  readonly sleeve: ShadeRamp;
  readonly tee: ShadeRamp;
  readonly pants: ShadeRamp & { readonly cuff: string };
  readonly shoes: ShadeRamp & { readonly stripe: string };
  readonly mugBody: ShadeRamp;
  readonly mugCoffee: string;
  readonly monitorRim: string;
  readonly monitorRimSoft: string;
  readonly lampRimHair: string;
  readonly lampRimSleeve: string;
  readonly groundCore: string;
  readonly groundSoft: string;
}

interface CapyColorTheme {
  readonly selout: string;
  readonly fur: ShadeRamp & { readonly ear: string; readonly snout: string; readonly blush: string };
  readonly eye: string;
  readonly eyeGlint: string;
  readonly yuzu: ShadeRamp;
  readonly leaf: ShadeRamp;
  readonly groundCore: string;
  readonly groundSoft: string;
}

type PixelGrid = (string | null)[];

const seloutBlendCache = new Map<string, string>();

function seloutFromHex(hex: string, baseOutline: string): string {
  if (!hex || hex[0] !== '#' || hex.length !== 7) {
    return baseOutline;
  }
  const cacheKey = `${baseOutline}|${hex}`;
  const cached = seloutBlendCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const br = baseOutline[0] === '#' && baseOutline.length === 7 ? parseInt(baseOutline.slice(1, 3), 16) : 28;
  const bg = baseOutline[0] === '#' && baseOutline.length === 7 ? parseInt(baseOutline.slice(3, 5), 16) : 24;
  const bb = baseOutline[0] === '#' && baseOutline.length === 7 ? parseInt(baseOutline.slice(5, 7), 16) : 41;

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const weight = lum > 165 ? 0.14 : 0.22;

  const or = Math.max(18, Math.min(82, Math.round(br + (r - br) * weight)));
  const og = Math.max(16, Math.min(76, Math.round(bg + (g - bg) * weight)));
  const ob = Math.max(24, Math.min(92, Math.round(bb + (b - bb) * weight)));

  const result = `#${or.toString(16).padStart(2, '0')}${og.toString(16).padStart(2, '0')}${ob.toString(16).padStart(2, '0')}`;
  seloutBlendCache.set(cacheKey, result);
  return result;
}

function createPixelGrid(width: number, height: number): PixelGrid {
  return new Array<string | null>(width * height).fill(null);
}

function setPx(grid: PixelGrid, w: number, h: number, x: number, y: number, color: string | null): void {
  const ix = Math.round(x);
  const iy = Math.round(y);
  if (ix < 0 || ix >= w || iy < 0 || iy >= h || !color) return;
  grid[iy * w + ix] = color;
}

function getPx(grid: PixelGrid, w: number, h: number, x: number, y: number): string | null {
  if (x < 0 || x >= w || y < 0 || y >= h) return null;
  return grid[y * w + x];
}

function setSpan(grid: PixelGrid, w: number, h: number, x1: number, x2: number, y: number, color: string): void {
  for (let x = x1; x <= x2; x += 1) {
    setPx(grid, w, h, x, y, color);
  }
}

function setRect(
  grid: PixelGrid,
  w: number,
  h: number,
  x: number,
  y: number,
  rw: number,
  rh: number,
  color: string
): void {
  for (let yy = y; yy < y + rh; yy += 1) {
    for (let xx = x; xx < x + rw; xx += 1) {
      setPx(grid, w, h, xx, yy, color);
    }
  }
}

function applySeloutLayer(
  body: PixelGrid,
  detail: PixelGrid,
  w: number,
  h: number,
  baseOutline: string,
  bottomDarkY: number
): PixelGrid {
  const out = createPixelGrid(w, h);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const c = getPx(body, w, h, x, y);
      if (c) {
        out[y * w + x] = c;
        continue;
      }
      const below = getPx(body, w, h, x, y + 1);
      const right = getPx(body, w, h, x + 1, y);
      const left = getPx(body, w, h, x - 1, y);
      const above = getPx(body, w, h, x, y - 1);
      if (!below && !right && !left && !above) continue;

      if (((above || left) && !(below || right)) || y >= bottomDarkY) {
        out[y * w + x] = baseOutline;
      } else {
        const src = below || right || left || above;
        out[y * w + x] = src ? seloutFromHex(src, baseOutline) : baseOutline;
      }
    }
  }
  for (let i = 0; i < detail.length; i += 1) {
    if (detail[i]) {
      out[i] = detail[i];
    }
  }
  return out;
}

function mirrorPixelGrid(grid: PixelGrid, w: number, h: number): PixelGrid {
  const out = createPixelGrid(w, h);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const c = grid[y * w + x];
      if (c) {
        out[y * w + (w - 1 - x)] = c;
      }
    }
  }
  return out;
}

function drawPixelGrid(
  ctx: CanvasRenderingContext2D,
  grid: PixelGrid,
  w: number,
  h: number,
  x: number,
  y: number,
  flipX = false
): void {
  const baseX = Math.round(x);
  const baseY = Math.round(y);
  let lastColor = '';

  for (let row = 0; row < h; row += 1) {
    const drawY = baseY + row;
    for (let col = 0; col < w; col += 1) {
      const color = grid[row * w + col];
      if (!color) continue;
      const drawX = flipX ? baseX + (w - 1 - col) : baseX + col;
      if (color !== lastColor) {
        ctx.fillStyle = color;
        lastColor = color;
      }
      ctx.fillRect(drawX, drawY, 1, 1);
    }
  }
}

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

function getLongTheme(
  timeState: RoomTimeState,
  lampOn: boolean,
  palette: RoomPalette
): LongColorTheme {
  const isSleep = timeState === 'sleeping';
  const isLate = timeState === 'late_night';
  const dim = isSleep && !lampOn;

  return {
    selout: palette.charSelout || '#1C1829',
    skin: dim
      ? { hi: '#D4AC9B', mid: '#BA8F7E', sh: '#8F685B', blush: '#A86B68' }
      : isLate
        ? { hi: '#FAD5BA', mid: '#E8B899', sh: '#BD866A', blush: '#DC8578' }
        : { hi: '#FFE5CF', mid: '#F5C29E', sh: '#CC8F6E', blush: '#ED9487' },
    hair: dim
      ? { hi: '#593F39', mid: '#402B29', sh: '#281B1D' }
      : isLate
        ? { hi: '#734A38', mid: '#523225', sh: '#331D16' }
        : { hi: '#82543E', mid: '#5D3928', sh: '#3B2118' },
    eye: { hi: '#4A5D8F', mid: '#2A3352', dark: '#19172B' },
    glassesRim: dim ? '#1D2230' : '#262E42',
    glassesLower: dim ? '#353D52' : '#4C5A78',
    glassesGlint: isLate ? '#8CEAF8' : '#BCEEFF',
    hoodie: dim
      ? { hi: '#2E3A4F', mid: '#20293A', sh: '#141B29' }
      : isLate
        ? { hi: '#3C4D69', mid: '#29364C', sh: '#192233' }
        : { hi: '#425675', mid: '#2D3C54', sh: '#1C2638' },
    sleeve: dim
      ? { hi: '#435169', mid: '#2F3B4F', sh: '#1E2738' }
      : isLate
        ? { hi: '#576B87', mid: '#3F4F66', sh: '#273345' }
        : { hi: '#617694', mid: '#475973', sh: '#2D3A4F' },
    tee: dim
      ? { hi: '#BDB8C4', mid: '#9B96A6', sh: '#747080' }
      : isLate
        ? { hi: '#EFE8DC', mid: '#D4CCC0', sh: '#A89F94' }
        : { hi: '#FFFBF2', mid: '#EAE2D3', sh: '#C2B7A5' },
    pants: dim
      ? { hi: '#2F405C', mid: '#212E45', sh: '#141D2E', cuff: '#496187' }
      : { hi: '#46618C', mid: '#2F4366', sh: '#1E2C45', cuff: '#6988B8' },
    shoes: dim
      ? { hi: '#B4BCC9', mid: '#788294', sh: '#3F4759', stripe: '#D8DFE8' }
      : { hi: '#EDF2FA', mid: '#9AA8BD', sh: '#4E596E', stripe: '#FFFDF7' },
    mugBody: dim
      ? { hi: '#B0ABB5', mid: '#88838F', sh: '#615D69' }
      : { hi: '#FFFDF8', mid: '#EBE3D5', sh: '#C2B6A5' },
    mugCoffee: dim ? '#3B231A' : '#5C3422',
    monitorRim: '#9CF3FF',
    monitorRimSoft: '#6ADBF0',
    lampRimHair: '#FCD34D',
    lampRimSleeve: '#E9B872',
    groundCore: 'rgba(20, 15, 29, 0.30)',
    groundSoft: 'rgba(20, 15, 29, 0.14)',
  };
}

function getCapyTheme(
  timeState: RoomTimeState,
  lampOn: boolean,
  palette: RoomPalette
): CapyColorTheme {
  const dim = timeState === 'sleeping' && !lampOn;
  const late = timeState === 'late_night';
  return {
    selout: palette.capySelout || '#241922',
    fur: dim
      ? { hi: '#9E7358', mid: '#7D5841', sh: '#5A3C2C', ear: '#472E22', snout: '#4E3325', blush: '#A86764' }
      : late
        ? { hi: '#C98E63', mid: '#A36B46', sh: '#75492E', ear: '#593622', snout: '#663E28', blush: '#D47B73' }
        : { hi: '#E0A16E', mid: '#BD7B4C', sh: '#8C5432', ear: '#693D24', snout: '#73452A', blush: '#EB8F85' },
    eye: '#241612',
    eyeGlint: '#FFF8EB',
    yuzu: dim
      ? { hi: '#CC9A1E', mid: '#A87312', sh: '#7A4D0A' }
      : { hi: '#FDE047', mid: '#F59E0B', sh: '#C26408' },
    leaf: dim
      ? { hi: '#3C8C4E', mid: '#276638', sh: '#184224' }
      : { hi: '#68D975', mid: '#34A853', sh: '#1E7037' },
    groundCore: 'rgba(26, 16, 22, 0.30)',
    groundSoft: 'rgba(26, 16, 22, 0.14)',
  };
}

const HOTSPOT_POINTER_ANCHORS: Record<RoomHotspotId, { pointerX: number; pointerY: number }> = {
  window: { pointerX: 108, pointerY: 5 },
  shelf: { pointerX: 266, pointerY: 7 },
  bed: { pointerX: 40, pointerY: 66 },
  monitor: { pointerX: 173, pointerY: 42 },
  speakers: { pointerX: 119, pointerY: 53 },
  lamp: { pointerX: 226, pointerY: 48 },
  capybara: { pointerX: 173, pointerY: 112 },
};

const CODE_TOKENS: readonly string[] = [
  'KKKBFWDDDDDDDDDDDDDDDD',
  'DDBFFOSSSSSSSSSSSDDDDD',
  'DDDDKKKKBFWODDDDDDDDDD',
  'DDDDDDBFFWONNNWDDDDDDD',
  'DDBKDFFWDDDDDDDDDDDDDD',
  'DDDDFFFOSSSSSSSSSSDDDD',
  'DDDDDDBFWWONNNDDDDDDDD',
  'DDWDDDDDDDDDDDDDDDDDDD',
  'KKKBFWWCDDDDDDDDDDDDDD',
  'DDBFFSSSSSSSSSDDDDDDDD',
];

const UI_MOCK_SCROLL: readonly string[] = [
  'PPPPPPPPPPPPPP',
  'PAAAAAAAAAAAAp',
  'PAFFAAYYAAUUAp',
  'PAAAAAAAAAAAAp',
  'PAWWWWWWWWWWAp',
  'PAWWWWAAAAWWAp',
  'PGGGGGGGGGGGPP',
  'PPPPPPPPPPPPPP',
  'PAAAAAAAAAAAAp',
  'PAKKKKAWWAAFFp',
  'PAAAAWWWWAASSAp',
  'PAASSSAAFFAAAp',
  'PPPPPPPPPPPPPP',
];

const MONITOR_CODE_COLORS: Record<string, string> = {
  B: '#1A233A',
  T: '#25314F',
  A: '#334166',
  U: '#60A5FA',
  R: '#EA4335',
  Y: '#FBBC04',
  G: '#34A853',
  D: '#111726',
  V: '#232D47',
  N: '#4E5D80',
  K: '#C084FC',
  F: '#60A5FA',
  S: '#4ADE80',
  O: '#F472B6',
  W: '#E2E8F0',
  C: '#67E8F9',
  P: '#171F34',
  p: '#1E2942',
};

const MONITOR_CODE_COLORS_NIGHT: Record<string, string> = {
  ...MONITOR_CODE_COLORS,
  B: '#121829',
  D: '#0C111E',
  U: '#38BDF8',
  C: '#22D3EE',
  P: '#11192B',
  p: '#162038',
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
      ? sx + 7
      : Math.round(sx + 1 + pingPong(timeSec * 9.5 + 3, bounceSpanX));
    const starY = reducedMotion
      ? sy + 5
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
    fillPixelRect(ctx, sx + 8, sy, 14, 1, '#5A3E30');

    drawSpriteMatrix(ctx, WAKING_MUG_ICON, WAKING_MUG_COLORS, sx + 4, sy + 7);
    const steamTick = reducedMotion ? 0 : Math.floor(timeSec * 3.5) % 3;
    fillPixelRect(ctx, sx + 6 + (steamTick % 2), sy + 5 - (steamTick === 2 ? 1 : 0), 1, 1, '#FDE68A');
    fillPixelRect(ctx, sx + 8 - (steamTick % 2), sy + 4, 1, 1, '#FBBF24');

    const checkStep = reducedMotion ? 2 : Math.floor(timeSec * 1.2) % 3;
    for (let i = 0; i < 3; i += 1) {
      const rowY = sy + 5 + i * 4;
      fillPixelRect(ctx, sx + 17, rowY, 2, 2, i <= checkStep ? '#34A853' : '#6E4C3A');
      fillPixelRect(ctx, sx + 20, rowY, i === 1 ? 15 : 13, 1, '#F5EFE6');
      fillPixelRect(ctx, sx + 20, rowY + 1, 10, 1, '#B89B82');
    }
    fillPixelRect(ctx, sx + 2, sy + sh - 2, 18, 1, '#F59E0B');
    return;
  }

  const palette = timeState === 'late_night' ? MONITOR_CODE_COLORS_NIGHT : MONITOR_CODE_COLORS;
  fillPixelRect(ctx, sx, sy, sw, sh, palette.D);
  fillPixelRect(ctx, sx, sy, sw, 2, palette.T);
  fillPixelRect(ctx, sx + 1, sy, 1, 1, palette.R);
  fillPixelRect(ctx, sx + 3, sy, 1, 1, palette.Y);
  fillPixelRect(ctx, sx + 5, sy, 1, 1, palette.G);
  fillPixelRect(ctx, sx + 8, sy, 9, 1, palette.U);
  fillPixelRect(ctx, sx + 18, sy, 6, 1, palette.A);
  fillPixelRect(ctx, sx + 25, sy, sw - 25, 2, palette.P);

  const codeRows = sh - 3;
  const scrollRow = reducedMotion ? 0 : Math.floor(timeSec * 2.2) % CODE_TOKENS.length;
  const cursorVisible = reducedMotion || Math.floor(timeSec * 2.5) % 2 === 0;

  for (let r = 0; r < codeRows; r += 1) {
    const lineIdx = (r + scrollRow) % CODE_TOKENS.length;
    const tokenLine = CODE_TOKENS[lineIdx];
    const py = sy + 2 + r;
    fillPixelRect(ctx, sx + 1, py, 1, 1, r % 2 === 0 ? palette.N : palette.B);
    fillPixelRect(ctx, sx + 2, py, 1, 1, palette.V);

    for (let c = 0; c < 21; c += 1) {
      const ch = tokenLine[c];
      if (!ch || ch === 'D') continue;
      fillPixelRect(ctx, sx + 3 + c, py, 1, 1, palette[ch] ?? palette.W);
    }
    if (cursorVisible && r === 4) {
      fillPixelRect(ctx, sx + 15, py, 1, 1, palette.C);
    }
  }

  fillPixelRect(ctx, sx + 24, sy + 2, 1, codeRows, palette.V);

  const uiScroll = reducedMotion ? 0 : Math.floor(timeSec * 1.4) % UI_MOCK_SCROLL.length;
  const previewCols = sw - 26;
  for (let r = 0; r < codeRows; r += 1) {
    const uiRow = UI_MOCK_SCROLL[(r + uiScroll) % UI_MOCK_SCROLL.length];
    const py = sy + 2 + r;
    for (let c = 0; c < previewCols; c += 1) {
      const ch = uiRow[c] ?? 'P';
      fillPixelRect(ctx, sx + 25 + c, py, 1, 1, palette[ch] ?? palette.P);
    }
  }

  fillPixelRect(ctx, sx, sy + sh - 1, sw, 1, palette.B);
  fillPixelRect(ctx, sx + 1, sy + sh - 1, 5, 1, palette.U);
  fillPixelRect(ctx, sx + 8, sy + sh - 1, 4, 1, palette.C);
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

function buildWakingLongGrid(
  theme: LongColorTheme,
  dir: 'down' | 'left' | 'right',
  state: 'walk' | 'coffee' | 'sip' | 'stretch' | 'idle',
  frame: number,
  blink: boolean,
  breatheDown: boolean
): PixelGrid {
  const w = WAKING_WIDTH;
  const h = WAKING_HEIGHT;
  const body = createPixelGrid(w, h);
  const detail = createPixelGrid(w, h);

  const walkBob = state === 'walk' && (frame === 1 || frame === 3) ? -1 : 0;
  const breath = state === 'idle' || state === 'coffee' ? (breatheDown ? 1 : 0) : 0;
  const by = walkBob;
  const upperBy = by + breath;
  const hy = 3 + upperBy;
  const ty = 14 + upperBy;

  if (dir === 'left' || dir === 'right') {
    const hipY = 22 + by;
    if (state === 'walk') {
      if (frame === 0) {
        setSpan(body, w, h, 8, 14, hipY, theme.pants.mid);
        setRect(body, w, h, 7, hipY + 1, 3, 3, theme.pants.sh);
        setRect(body, w, h, 6, hipY + 4, 4, 1, theme.shoes.sh);
        setRect(body, w, h, 12, hipY + 1, 3, 2, theme.pants.mid);
        setPx(detail, w, h, 12, hipY + 1, theme.pants.hi);
        setSpan(detail, w, h, 12, 14, hipY + 3, theme.pants.cuff);
        setRect(body, w, h, 12, hipY + 4, 4, 1, theme.shoes.mid);
        setPx(detail, w, h, 12, hipY + 4, theme.shoes.hi);
      } else if (frame === 2) {
        setSpan(body, w, h, 8, 14, hipY, theme.pants.mid);
        setRect(body, w, h, 12, hipY + 1, 3, 3, theme.pants.sh);
        setRect(body, w, h, 12, hipY + 4, 4, 1, theme.shoes.sh);
        setRect(body, w, h, 7, hipY + 1, 3, 2, theme.pants.hi);
        setSpan(detail, w, h, 7, 9, hipY + 3, theme.pants.cuff);
        setRect(body, w, h, 6, hipY + 4, 4, 1, theme.shoes.mid);
        setPx(detail, w, h, 6, hipY + 4, theme.shoes.hi);
      } else {
        setRect(body, w, h, 10, hipY, 4, 3, theme.pants.mid);
        setPx(detail, w, h, 10, hipY + 1, theme.pants.hi);
        setSpan(detail, w, h, 10, 13, hipY + 2, theme.pants.cuff);
        setRect(body, w, h, 8, hipY + 3, 6, 2, theme.shoes.mid);
        setPx(detail, w, h, 9, hipY + 3, theme.shoes.hi);
        setSpan(detail, w, h, 8, 13, hipY + 4, theme.shoes.sh);
      }
    } else {
      setRect(body, w, h, 10, hipY, 4, 3, theme.pants.mid);
      setSpan(detail, w, h, 10, 13, hipY + 2, theme.pants.cuff);
      setRect(body, w, h, 8, hipY + 3, 6, 2, theme.shoes.mid);
      setPx(detail, w, h, 9, hipY + 3, theme.shoes.hi);
      setSpan(detail, w, h, 8, 13, hipY + 4, theme.shoes.sh);
    }

    setSpan(body, w, h, 10, 12, ty - 1, theme.skin.sh);
    setSpan(body, w, h, 9, 14, ty, theme.hoodie.hi);
    setRect(body, w, h, 8, ty + 1, 7, 5, theme.hoodie.mid);
    setSpan(body, w, h, 9, 14, ty + 6, theme.hoodie.sh);
    setSpan(body, w, h, 8, 15, ty + 7, theme.tee.mid);
    for (let row = 1; row <= 5; row += 1) {
      setPx(body, w, h, 8, ty + row, theme.hoodie.hi);
      setPx(body, w, h, 14, ty + row, theme.hoodie.sh);
    }
    setSpan(detail, w, h, 9, 14, ty, theme.sleeve.mid);
    setSpan(detail, w, h, 9, 14, ty + 7, theme.tee.hi);

    setSpan(body, w, h, 9, 14, hy, theme.skin.hi);
    setSpan(body, w, h, 8, 15, hy + 1, theme.skin.hi);
    setRect(body, w, h, 7, hy + 2, 9, 6, theme.skin.mid);
    setSpan(body, w, h, 8, 15, hy + 8, theme.skin.mid);
    setSpan(body, w, h, 9, 13, hy + 9, theme.skin.sh);
    setPx(body, w, h, 6, hy + 6, theme.skin.mid);
    setPx(detail, w, h, 10, hy + 7, theme.skin.blush);
    setPx(detail, w, h, 12, hy + 5, theme.skin.sh);

    setSpan(body, w, h, 9, 14, hy - 1, theme.hair.hi);
    setSpan(body, w, h, 8, 15, hy, theme.hair.hi);
    setSpan(body, w, h, 7, 15, hy + 1, theme.hair.mid);
    setSpan(body, w, h, 7, 10, hy + 2, theme.hair.mid);
    setRect(body, w, h, 12, hy + 1, 4, 8, theme.hair.mid);
    setRect(body, w, h, 14, hy + 2, 2, 7, theme.hair.sh);
    setPx(body, w, h, 12, hy - 2, theme.hair.hi);
    setPx(body, w, h, 13, hy - 3, theme.hair.mid);

    const eyeY = hy + 5;
    setSpan(detail, w, h, 8, 9, hy + 4, theme.hair.sh);
    if (blink) {
      setSpan(detail, w, h, 8, 9, eyeY + 1, theme.eye.dark);
    } else {
      setPx(detail, w, h, 8, eyeY, '#FFF9EB');
      setPx(detail, w, h, 9, eyeY, theme.eye.hi);
      setPx(detail, w, h, 8, eyeY + 1, theme.eye.mid);
      setPx(detail, w, h, 9, eyeY + 1, theme.eye.dark);
    }
    setSpan(detail, w, h, 7, 10, eyeY - 1, theme.glassesRim);
    setPx(detail, w, h, 7, eyeY, theme.glassesRim);
    setPx(detail, w, h, 7, eyeY + 1, theme.glassesRim);
    setPx(detail, w, h, 10, eyeY, theme.glassesRim);
    setPx(detail, w, h, 10, eyeY + 1, theme.glassesRim);
    setSpan(detail, w, h, 8, 9, eyeY + 2, theme.glassesLower);

    if (state === 'coffee' || state === 'sip') {
      const sip = state === 'sip' ? -1 : 0;
      setRect(body, w, h, 10, ty + 1, 2, 4, theme.sleeve.hi);
      setRect(body, w, h, 7, ty + 3 + sip, 3, 2, theme.skin.mid);
      setRect(body, w, h, 4, ty + 2 + sip, 3, 3, theme.mugBody.mid);
      setPx(detail, w, h, 4, ty + 2 + sip, theme.mugBody.hi);
      setSpan(detail, w, h, 4, 6, ty + 2 + sip, theme.mugCoffee);
    } else {
      let swing = 0;
      if (state === 'walk') {
        if (frame === 0) swing = -2;
        else if (frame === 2) swing = 2;
      }
      setRect(body, w, h, 10 + swing, ty + 1, 3, 4, theme.sleeve.hi);
      setPx(detail, w, h, 12 + swing, ty + 2, theme.sleeve.sh);
      setRect(body, w, h, 10 + swing, ty + 5, 2, 1, theme.skin.mid);
    }

    const baseGrid = applySeloutLayer(body, detail, w, h, theme.selout, 24);
    const oriented = dir === 'right' ? mirrorPixelGrid(baseGrid, w, h) : baseGrid;
    for (let sx = 7; sx <= 16; sx += 1) {
      if (!getPx(oriented, w, h, sx, 28)) setPx(oriented, w, h, sx, 28, theme.groundCore);
    }
    for (let sx = 9; sx <= 14; sx += 1) {
      if (!getPx(oriented, w, h, sx, 29)) setPx(oriented, w, h, sx, 29, theme.groundSoft);
    }
    return oriented;
  }

  const hipY = 22 + by;
  setSpan(body, w, h, 8, 15, hipY, theme.pants.mid);
  setPx(detail, w, h, 11, hipY, theme.pants.sh);
  setPx(detail, w, h, 12, hipY, theme.pants.sh);

  let lLegOff = 0;
  let rLegOff = 0;
  if (state === 'walk') {
    if (frame === 0) { lLegOff = 0; rLegOff = -1; }
    else if (frame === 2) { lLegOff = -1; rLegOff = 0; }
  }

  setRect(body, w, h, 8, hipY + 1, 3, 2 + lLegOff, theme.pants.mid);
  setPx(detail, w, h, 8, hipY + 1, theme.pants.hi);
  setPx(detail, w, h, 10, hipY + 1, theme.pants.sh);
  setSpan(detail, w, h, 8, 10, hipY + 2 + lLegOff, theme.pants.cuff);
  setRect(body, w, h, 7, hipY + 3 + lLegOff, 4, 2, theme.shoes.mid);
  setPx(detail, w, h, 8, hipY + 3 + lLegOff, theme.shoes.hi);
  setPx(detail, w, h, 7, hipY + 4 + lLegOff, theme.shoes.stripe);
  setSpan(detail, w, h, 8, 10, hipY + 4 + lLegOff, theme.shoes.sh);

  setRect(body, w, h, 13, hipY + 1, 3, 2 + rLegOff, theme.pants.mid);
  setPx(detail, w, h, 13, hipY + 1, theme.pants.sh);
  setPx(detail, w, h, 15, hipY + 1, theme.pants.hi);
  setSpan(detail, w, h, 13, 15, hipY + 2 + rLegOff, theme.pants.cuff);
  setRect(body, w, h, 13, hipY + 3 + rLegOff, 4, 2, theme.shoes.mid);
  setPx(detail, w, h, 14, hipY + 3 + rLegOff, theme.shoes.hi);
  setPx(detail, w, h, 16, hipY + 4 + rLegOff, theme.shoes.stripe);
  setSpan(detail, w, h, 13, 15, hipY + 4 + rLegOff, theme.shoes.sh);

  setSpan(body, w, h, 10, 13, ty - 1, theme.skin.sh);
  setSpan(body, w, h, 8, 15, ty, theme.hoodie.hi);
  setSpan(body, w, h, 7, 16, ty + 1, theme.hoodie.mid);
  setSpan(body, w, h, 7, 16, ty + 2, theme.hoodie.mid);
  setSpan(body, w, h, 7, 16, ty + 3, theme.hoodie.mid);
  setSpan(body, w, h, 7, 16, ty + 4, theme.hoodie.mid);
  setSpan(body, w, h, 8, 15, ty + 5, theme.hoodie.mid);
  setSpan(body, w, h, 8, 15, ty + 6, theme.hoodie.sh);
  setSpan(body, w, h, 7, 16, ty + 7, theme.tee.mid);

  for (let row = 1; row <= 4; row += 1) {
    setPx(body, w, h, 7, ty + row, theme.hoodie.hi);
    setPx(body, w, h, 16, ty + row, theme.hoodie.sh);
  }
  setSpan(detail, w, h, 9, 14, ty, theme.sleeve.mid);
  setSpan(detail, w, h, 10, 13, ty, theme.tee.hi);
  setRect(detail, w, h, 9, ty + 5, 6, 2, theme.sleeve.mid);
  setSpan(detail, w, h, 10, 13, ty + 5, theme.sleeve.hi);
  setPx(detail, w, h, 10, ty + 1, theme.tee.hi);
  setPx(detail, w, h, 10, ty + 2, theme.tee.mid);
  setPx(detail, w, h, 13, ty + 1, theme.tee.hi);
  setPx(detail, w, h, 13, ty + 2, theme.tee.mid);
  setSpan(detail, w, h, 8, 15, ty + 7, theme.tee.hi);

  if (state === 'stretch') {
    setRect(body, w, h, 4, ty - 3, 2, 5, theme.sleeve.mid);
    setPx(detail, w, h, 4, ty - 2, theme.sleeve.hi);
    setRect(body, w, h, 4, ty - 4, 2, 1, theme.skin.mid);
    setRect(body, w, h, 18, ty - 3, 2, 5, theme.sleeve.mid);
    setPx(detail, w, h, 19, ty - 2, theme.sleeve.sh);
    setRect(body, w, h, 18, ty - 4, 2, 1, theme.skin.mid);
  } else if (state === 'coffee' || state === 'sip') {
    const sipLift = state === 'sip' ? -2 : 0;
    setRect(body, w, h, 5, ty + 1, 2, 4, theme.sleeve.mid);
    setPx(detail, w, h, 5, ty + 1, theme.sleeve.hi);
    setPx(detail, w, h, 6, ty + 2, theme.sleeve.sh);
    setRect(body, w, h, 5, ty + 5, 2, 1, theme.skin.mid);

    setRect(body, w, h, 17, ty + 1, 2, 3, theme.sleeve.mid);
    setRect(body, w, h, 16, ty + 3 + sipLift, 2, 2, theme.skin.mid);
    setRect(body, w, h, 16, ty + 2 + sipLift, 3, 3, theme.mugBody.mid);
    setPx(detail, w, h, 16, ty + 2 + sipLift, theme.mugBody.hi);
    setSpan(detail, w, h, 16, 18, ty + 2 + sipLift, theme.mugCoffee);
    setPx(body, w, h, 19, ty + 3 + sipLift, theme.mugBody.sh);
    setPx(detail, w, h, 16, ty + 4 + sipLift, theme.mugBody.sh);
  } else {
    let lArmOff = 0;
    let rArmOff = 0;
    if (state === 'walk') {
      if (frame === 0) { lArmOff = 1; rArmOff = -1; }
      else if (frame === 2) { lArmOff = -1; rArmOff = 1; }
    }
    setRect(body, w, h, 5, ty + 1 + lArmOff, 2, 4, theme.sleeve.mid);
    setPx(detail, w, h, 5, ty + 1 + lArmOff, theme.sleeve.hi);
    setPx(detail, w, h, 6, ty + 2 + lArmOff, theme.sleeve.sh);
    setRect(body, w, h, 5, ty + 5 + lArmOff, 2, 1, theme.skin.mid);

    setRect(body, w, h, 17, ty + 1 + rArmOff, 2, 4, theme.sleeve.mid);
    setPx(detail, w, h, 18, ty + 1 + rArmOff, theme.sleeve.sh);
    setPx(detail, w, h, 17, ty + 2 + rArmOff, theme.sleeve.sh);
    setRect(body, w, h, 17, ty + 5 + rArmOff, 2, 1, theme.skin.mid);
  }

  setSpan(body, w, h, 8, 15, hy, theme.skin.hi);
  setSpan(body, w, h, 7, 16, hy + 1, theme.skin.hi);
  setSpan(body, w, h, 6, 17, hy + 2, theme.skin.mid);
  setSpan(body, w, h, 6, 17, hy + 3, theme.skin.mid);
  setSpan(body, w, h, 6, 17, hy + 4, theme.skin.mid);
  setSpan(body, w, h, 6, 17, hy + 5, theme.skin.mid);
  setSpan(body, w, h, 6, 17, hy + 6, theme.skin.mid);
  setSpan(body, w, h, 7, 16, hy + 7, theme.skin.mid);
  setSpan(body, w, h, 8, 15, hy + 8, theme.skin.mid);
  setSpan(body, w, h, 9, 14, hy + 9, theme.skin.sh);

  setPx(body, w, h, 6, hy + 5, theme.skin.sh);
  setPx(body, w, h, 6, hy + 6, theme.skin.sh);
  setPx(body, w, h, 17, hy + 5, theme.skin.sh);
  setPx(body, w, h, 17, hy + 6, theme.skin.sh);
  setPx(body, w, h, 7, hy + 7, theme.skin.sh);
  setPx(body, w, h, 16, hy + 7, theme.skin.sh);
  setPx(body, w, h, 8, hy + 8, theme.skin.sh);
  setPx(body, w, h, 15, hy + 8, theme.skin.sh);
  setSpan(body, w, h, 10, 13, hy + 9, theme.skin.mid);
  setSpan(body, w, h, 9, 14, hy + 2, theme.skin.hi);

  setPx(body, w, h, 5, hy + 5, theme.skin.mid);
  setPx(body, w, h, 5, hy + 6, theme.skin.sh);
  setPx(body, w, h, 18, hy + 5, theme.skin.mid);
  setPx(body, w, h, 18, hy + 6, theme.skin.sh);

  setSpan(body, w, h, 8, 15, hy + 3, theme.skin.sh);

  setSpan(body, w, h, 8, 15, hy - 1, theme.hair.hi);
  setSpan(body, w, h, 7, 16, hy, theme.hair.hi);
  setSpan(body, w, h, 6, 17, hy + 1, theme.hair.mid);
  setSpan(body, w, h, 6, 17, hy + 2, theme.hair.mid);
  setSpan(body, w, h, 9, 13, hy, theme.hair.hi);
  setPx(body, w, h, 8, hy + 1, theme.hair.hi);
  setPx(body, w, h, 14, hy + 1, theme.hair.hi);
  setRect(body, w, h, 6, hy + 2, 1, 5, theme.hair.mid);
  setPx(body, w, h, 6, hy + 6, theme.hair.sh);
  setRect(body, w, h, 17, hy + 2, 1, 5, theme.hair.mid);
  setPx(body, w, h, 17, hy + 6, theme.hair.sh);
  setPx(body, w, h, 7, hy + 3, theme.hair.mid);
  setPx(body, w, h, 9, hy + 3, theme.hair.hi);
  setPx(body, w, h, 11, hy + 3, theme.hair.mid);
  setPx(body, w, h, 13, hy + 3, theme.hair.hi);
  setPx(body, w, h, 16, hy + 3, theme.hair.sh);
  setPx(body, w, h, 11, hy - 2, theme.hair.hi);
  setPx(body, w, h, 12, hy - 3, theme.hair.mid);

  const eyeY = hy + 5;
  setPx(detail, w, h, 7, hy + 7, theme.skin.blush);
  setPx(detail, w, h, 16, hy + 7, theme.skin.blush);
  setSpan(detail, w, h, 8, 9, hy + 4, theme.hair.sh);
  setSpan(detail, w, h, 14, 15, hy + 4, theme.hair.sh);

  if (blink || state === 'sip' || state === 'stretch') {
    setSpan(detail, w, h, 8, 9, eyeY + 1, theme.eye.dark);
    setSpan(detail, w, h, 14, 15, eyeY + 1, theme.eye.dark);
  } else {
    setPx(detail, w, h, 8, eyeY, '#FFF9EB');
    setPx(detail, w, h, 9, eyeY, theme.eye.hi);
    setPx(detail, w, h, 8, eyeY + 1, theme.eye.mid);
    setPx(detail, w, h, 9, eyeY + 1, theme.eye.dark);

    setPx(detail, w, h, 14, eyeY, '#FFF9EB');
    setPx(detail, w, h, 15, eyeY, theme.eye.hi);
    setPx(detail, w, h, 14, eyeY + 1, theme.eye.mid);
    setPx(detail, w, h, 15, eyeY + 1, theme.eye.dark);
  }

  setSpan(detail, w, h, 11, 12, hy + 8, state === 'stretch' || state === 'sip' ? '#9C4E44' : theme.skin.sh);

  setSpan(detail, w, h, 7, 10, eyeY - 1, theme.glassesRim);
  setSpan(detail, w, h, 13, 16, eyeY - 1, theme.glassesRim);
  setPx(detail, w, h, 7, eyeY, theme.glassesRim);
  setPx(detail, w, h, 7, eyeY + 1, theme.glassesRim);
  setPx(detail, w, h, 10, eyeY, theme.glassesRim);
  setPx(detail, w, h, 10, eyeY + 1, theme.glassesRim);
  setSpan(detail, w, h, 11, 12, eyeY, theme.glassesRim);
  setPx(detail, w, h, 13, eyeY, theme.glassesRim);
  setPx(detail, w, h, 13, eyeY + 1, theme.glassesRim);
  setPx(detail, w, h, 16, eyeY, theme.glassesRim);
  setPx(detail, w, h, 16, eyeY + 1, theme.glassesRim);
  setSpan(detail, w, h, 8, 9, eyeY + 2, theme.glassesLower);
  setSpan(detail, w, h, 14, 15, eyeY + 2, theme.glassesLower);
  setPx(detail, w, h, 10, eyeY, theme.glassesGlint);
  setPx(detail, w, h, 16, eyeY, theme.glassesGlint);

  const out = applySeloutLayer(body, detail, w, h, theme.selout, 24);
  for (let sx = 7; sx <= 16; sx += 1) {
    if (!getPx(out, w, h, sx, 28)) setPx(out, w, h, sx, 28, theme.groundCore);
  }
  for (let sx = 9; sx <= 14; sx += 1) {
    if (!getPx(out, w, h, sx, 29)) setPx(out, w, h, sx, 29, theme.groundSoft);
  }
  return out;
}

type SeatedHeadPose = 'center' | 'glance_left' | 'glance_right';
type SeatedArmPose = 'home' | 'type_l' | 'type_r' | 'mouse_a' | 'mouse_b' | 'reach_mug' | 'sip_mug' | 'stretch';

function buildSeatedLongGrid(
  theme: LongColorTheme,
  headPose: SeatedHeadPose,
  armPose: SeatedArmPose,
  headDropPx: number,
  bodyDropPx: number,
  lampRim: boolean
): PixelGrid {
  const w = SEATED_WIDTH;
  const h = SEATED_HEIGHT;
  const body = createPixelGrid(w, h);
  const detail = createPixelGrid(w, h);

  const ty = 12 + (bodyDropPx > 0 ? 1 : 0);
  const hy = 2 + (headDropPx > 0 ? 1 : 0);
  const cx = 25;

  setSpan(body, w, h, cx - 2, cx + 1, ty - 1, theme.skin.sh);
  setSpan(body, w, h, cx - 5, cx + 4, ty, theme.hoodie.hi);
  setSpan(body, w, h, cx - 6, cx + 5, ty + 1, theme.hoodie.mid);
  setSpan(body, w, h, cx - 6, cx + 5, ty + 2, theme.hoodie.mid);
  setSpan(body, w, h, cx - 6, cx + 5, ty + 3, theme.hoodie.mid);
  setSpan(body, w, h, cx - 6, cx + 5, ty + 4, theme.hoodie.mid);
  setSpan(body, w, h, cx - 5, cx + 4, ty + 5, theme.hoodie.sh);
  setSpan(body, w, h, cx - 5, cx + 4, ty + 6, theme.hoodie.sh);
  setSpan(body, w, h, cx - 6, cx + 5, ty + 7, theme.tee.mid);

  for (let row = 1; row <= 4; row += 1) {
    setPx(body, w, h, cx - 6, ty + row, theme.hoodie.hi);
    setPx(body, w, h, cx + 5, ty + row, theme.hoodie.sh);
  }
  setSpan(detail, w, h, cx - 3, cx + 2, ty, theme.sleeve.hi);
  setSpan(detail, w, h, cx - 4, cx + 3, ty + 1, theme.sleeve.mid);
  setSpan(detail, w, h, cx - 3, cx + 2, ty + 2, theme.sleeve.sh);
  setPx(detail, w, h, cx - 5, ty, theme.monitorRimSoft);
  setPx(detail, w, h, cx + 4, ty, theme.monitorRimSoft);

  const lShX = cx - 7;
  const rShX = cx + 6;
  const armDrop = bodyDropPx > 0 ? 1 : 0;

  if (armPose === 'home') {
    setRect(body, w, h, lShX, ty + 1, 2, 4, theme.sleeve.mid);
    setRect(body, w, h, lShX - 2, ty - 2, 2, 4, theme.sleeve.hi);
    setRect(body, w, h, lShX - 2, ty - 4, 2, 2, theme.skin.mid);
    setRect(body, w, h, rShX - 1, ty + 1, 2, 4, theme.sleeve.mid);
    setRect(body, w, h, rShX, ty - 2, 2, 4, theme.sleeve.hi);
    setRect(body, w, h, rShX, ty - 4, 2, 2, theme.skin.mid);
  } else if (armPose === 'type_l' || armPose === 'type_r') {
    const lTap = armPose === 'type_l' ? -1 : 0;
    const rTap = armPose === 'type_r' ? -1 : 0;
    setRect(body, w, h, lShX, ty + 1, 2, 4, theme.sleeve.mid);
    setRect(body, w, h, lShX - 2, ty - 3 + lTap, 2, 4, theme.sleeve.hi);
    setRect(body, w, h, lShX - 2, ty - 5 + lTap, 2, 2, theme.skin.mid);
    setPx(detail, w, h, lShX - 2, ty - 5 + lTap, theme.monitorRim);

    setRect(body, w, h, rShX - 1, ty + 1, 2, 4, theme.sleeve.mid);
    setRect(body, w, h, rShX, ty - 3 + rTap, 2, 4, theme.sleeve.hi);
    setRect(body, w, h, rShX, ty - 5 + rTap, 2, 2, theme.skin.mid);
    setPx(detail, w, h, rShX + 1, ty - 5 + rTap, theme.monitorRim);
  } else if (armPose === 'mouse_a' || armPose === 'mouse_b') {
    const mx = armPose === 'mouse_b' ? 40 : 39;
    setRect(body, w, h, lShX, ty + 1, 2, 4, theme.sleeve.mid);
    setRect(body, w, h, lShX - 2, ty - 2, 2, 4, theme.sleeve.hi);
    setRect(body, w, h, lShX - 2, ty - 4, 2, 2, theme.skin.mid);

    setRect(body, w, h, rShX - 1, ty + 1, 3, 2, theme.sleeve.mid);
    setRect(body, w, h, rShX + 2, ty - 1, 3, 2, theme.sleeve.hi);
    setRect(body, w, h, mx - 3, ty - 3, 4, 2, theme.sleeve.mid);
    setRect(body, w, h, mx, ty - 5, 3, 2, theme.skin.mid);
    setPx(detail, w, h, mx, ty - 5, theme.monitorRim);
  } else if (armPose === 'reach_mug') {
    setRect(body, w, h, lShX, ty + 1, 2, 4, theme.sleeve.mid);
    setRect(body, w, h, lShX - 2, ty - 2, 2, 4, theme.sleeve.hi);
    setRect(body, w, h, lShX - 2, ty - 4, 2, 2, theme.skin.mid);

    setRect(body, w, h, rShX - 1, ty + 1, 3, 2, theme.sleeve.mid);
    setRect(body, w, h, rShX + 2, ty - 1, 5, 2, theme.sleeve.hi);
    setRect(body, w, h, rShX + 7, ty - 3, 6, 2, theme.sleeve.mid);
    setRect(body, w, h, rShX + 13, ty - 5, 5, 2, theme.sleeve.hi);
    setRect(body, w, h, rShX + 17, ty - 7, 3, 2, theme.skin.mid);
  } else if (armPose === 'sip_mug') {
    setRect(body, w, h, lShX, ty + 1, 2, 4, theme.sleeve.mid);
    setRect(body, w, h, lShX - 2, ty - 2, 2, 4, theme.sleeve.hi);
    setRect(body, w, h, lShX - 2, ty - 4, 2, 2, theme.skin.mid);

    setRect(body, w, h, rShX, ty - 2, 3, 4, theme.sleeve.mid);
    setRect(body, w, h, rShX + 1, ty - 5, 2, 3, theme.sleeve.hi);
    setRect(body, w, h, rShX, ty - 7, 2, 2, theme.skin.mid);
    setRect(body, w, h, rShX - 1, ty - 9, 4, 4, theme.mugBody.mid);
    setPx(detail, w, h, rShX - 1, ty - 9, theme.mugBody.hi);
    setSpan(detail, w, h, rShX - 1, rShX + 1, ty - 9, theme.mugCoffee);
    setPx(body, w, h, rShX + 3, ty - 8, theme.mugBody.sh);
  } else if (armPose === 'stretch') {
    setRect(body, w, h, lShX - 2, ty - 3, 3, 5, theme.sleeve.mid);
    setRect(body, w, h, lShX - 5, ty - 7, 3, 4, theme.sleeve.hi);
    setRect(body, w, h, lShX - 6, ty - 9, 2, 2, theme.skin.mid);

    setRect(body, w, h, rShX, ty - 3, 3, 5, theme.sleeve.mid);
    setRect(body, w, h, rShX + 3, ty - 7, 3, 4, theme.sleeve.hi);
    setRect(body, w, h, rShX + 5, ty - 9, 2, 2, theme.skin.mid);
  }

  const headX = cx - 6;
  setSpan(body, w, h, headX + 2, headX + 9, hy, theme.hair.hi);
  setSpan(body, w, h, headX + 1, headX + 10, hy + 1, theme.hair.hi);
  setSpan(body, w, h, headX, headX + 11, hy + 2, theme.hair.mid);
  setRect(body, w, h, headX, hy + 3, 12, 6, theme.hair.mid);
  setSpan(body, w, h, headX + 1, headX + 10, hy + 9, theme.hair.sh);
  setSpan(body, w, h, headX + 2, headX + 9, hy + 8, theme.hair.sh);

  setPx(body, w, h, headX + 3, hy + 3, theme.hair.hi);
  setPx(body, w, h, headX + 8, hy + 3, theme.hair.hi);
  setPx(body, w, h, headX + 5, hy + 4, theme.hair.hi);
  setPx(body, w, h, headX + 2, hy + 7, theme.hair.sh);
  setPx(body, w, h, headX + 9, hy + 7, theme.hair.sh);
  setPx(body, w, h, headX + 5, hy - 1, theme.hair.hi);
  setPx(body, w, h, headX + 6, hy - 2, theme.hair.mid);

  setPx(body, w, h, headX - 1, hy + 5, theme.skin.mid);
  setPx(body, w, h, headX - 1, hy + 6, theme.skin.sh);
  setPx(body, w, h, headX + 12, hy + 5, theme.skin.mid);
  setPx(body, w, h, headX + 12, hy + 6, theme.skin.sh);

  if (headPose === 'glance_left') {
    setRect(body, w, h, headX, hy + 5, 2, 3, theme.skin.mid);
    setPx(detail, w, h, headX, hy + 6, theme.glassesRim);
    setPx(detail, w, h, headX + 1, hy + 7, theme.skin.blush);
  } else if (headPose === 'glance_right') {
    setRect(body, w, h, headX + 10, hy + 5, 2, 3, theme.skin.mid);
    setPx(detail, w, h, headX + 11, hy + 6, theme.glassesRim);
    setPx(detail, w, h, headX + 10, hy + 7, theme.skin.blush);
  }

  setSpan(detail, w, h, headX + 2, headX + 9, hy, theme.monitorRim);
  setPx(detail, w, h, headX + 1, hy + 1, theme.monitorRimSoft);
  setPx(detail, w, h, headX + 10, hy + 1, theme.monitorRimSoft);

  if (lampRim) {
    setPx(detail, w, h, headX + 10, hy + 2, theme.lampRimHair);
    setPx(detail, w, h, headX + 11, hy + 3, theme.lampRimHair);
    setPx(detail, w, h, rShX + 1, ty + 1 + armDrop, theme.lampRimSleeve);
    setPx(detail, w, h, rShX + 1, ty + 2 + armDrop, theme.lampRimSleeve);
  }

  return applySeloutLayer(body, detail, w, h, theme.selout, h);
}

function buildSleepingLongGrid(theme: LongColorTheme, breathOffset: number): PixelGrid {
  const w = SLEEP_WIDTH;
  const h = SLEEP_HEIGHT;
  const body = createPixelGrid(w, h);
  const detail = createPixelGrid(w, h);

  const hx = 5;
  const hy = 1;
  const torsoOffset = breathOffset < 0 ? -1 : 0;
  const ty = 11 + torsoOffset;

  setSpan(body, w, h, hx + 2, hx + 9, hy, theme.skin.hi);
  setSpan(body, w, h, hx + 1, hx + 10, hy + 1, theme.skin.hi);
  setRect(body, w, h, hx, hy + 2, 12, 5, theme.skin.mid);
  setSpan(body, w, h, hx + 1, hx + 10, hy + 7, theme.skin.mid);
  setSpan(body, w, h, hx + 2, hx + 9, hy + 8, theme.skin.mid);
  setSpan(body, w, h, hx + 3, hx + 8, hy + 9, theme.skin.sh);

  setPx(body, w, h, hx - 1, hy + 5, theme.skin.mid);
  setPx(body, w, h, hx - 1, hy + 6, theme.skin.sh);
  setPx(body, w, h, hx + 12, hy + 5, theme.skin.mid);
  setPx(body, w, h, hx + 12, hy + 6, theme.skin.sh);

  setSpan(body, w, h, hx + 2, hx + 9, hy - 1, theme.hair.hi);
  setSpan(body, w, h, hx + 1, hx + 10, hy, theme.hair.hi);
  setSpan(body, w, h, hx, hx + 11, hy + 1, theme.hair.mid);
  setSpan(body, w, h, hx, hx + 11, hy + 2, theme.hair.mid);
  setRect(body, w, h, hx, hy + 2, 1, 5, theme.hair.mid);
  setRect(body, w, h, hx + 11, hy + 2, 1, 5, theme.hair.mid);
  setPx(body, w, h, hx + 1, hy + 3, theme.hair.mid);
  setPx(body, w, h, hx + 3, hy + 3, theme.hair.hi);
  setPx(body, w, h, hx + 5, hy + 3, theme.hair.mid);
  setPx(body, w, h, hx + 7, hy + 3, theme.hair.hi);
  setPx(body, w, h, hx + 10, hy + 3, theme.hair.sh);

  setSpan(detail, w, h, hx + 2, hx + 3, hy + 4, theme.hair.sh);
  setSpan(detail, w, h, hx + 8, hx + 9, hy + 4, theme.hair.sh);
  setSpan(detail, w, h, hx + 2, hx + 3, hy + 6, theme.eye.dark);
  setSpan(detail, w, h, hx + 8, hx + 9, hy + 6, theme.eye.dark);
  setPx(detail, w, h, hx + 1, hy + 7, theme.skin.blush);
  setPx(detail, w, h, hx + 10, hy + 7, theme.skin.blush);
  setPx(detail, w, h, hx + 5, hy + 8, theme.skin.sh);

  setSpan(body, w, h, hx + 4, hx + 7, ty - 1, theme.skin.sh);
  setSpan(body, w, h, 5, 16, ty, theme.hoodie.hi);
  setSpan(body, w, h, 4, 17, ty + 1, theme.hoodie.mid);
  setSpan(body, w, h, 4, 17, ty + 2, theme.hoodie.mid);
  setSpan(body, w, h, 4, 17, ty + 3, theme.hoodie.mid);
  setSpan(body, w, h, 5, 16, ty + 4, theme.hoodie.sh);
  setSpan(detail, w, h, 7, 14, ty, theme.sleeve.mid);
  setSpan(detail, w, h, 8, 13, ty, theme.tee.hi);

  setRect(body, w, h, 18, ty + 1, 3, 2, theme.skin.mid);
  setPx(detail, w, h, 19, ty + 2, theme.skin.sh);

  return applySeloutLayer(body, detail, w, h, theme.selout, 16);
}

type CapyPoseKind = 'sit' | 'blink' | 'ear' | 'walk_0' | 'walk_1' | 'walk_2' | 'walk_3' | 'dance_0' | 'dance_1' | 'drowsy' | 'sleep';

function buildCapyGrid(theme: CapyColorTheme, pose: CapyPoseKind): PixelGrid {
  const w = CAPY_WIDTH;
  const h = CAPY_HEIGHT;
  const body = createPixelGrid(w, h);
  const detail = createPixelGrid(w, h);

  const isDrowsy = pose === 'drowsy' || pose === 'sleep';
  const yuzuBob = pose === 'walk_1' || pose === 'walk_3' || pose === 'dance_1' ? -1 : 0;
  const headDrop = isDrowsy ? 1 : pose === 'dance_1' ? -1 : 0;
  const bodyDrop = isDrowsy ? 1 : pose === 'dance_1' ? -1 : 0;

  const yy = 1 + yuzuBob + headDrop;
  setSpan(body, w, h, 5, 7, yy, theme.yuzu.hi);
  setSpan(body, w, h, 4, 8, yy + 1, theme.yuzu.mid);
  setSpan(body, w, h, 5, 7, yy + 2, theme.yuzu.sh);
  setPx(detail, w, h, 5, yy + 1, theme.yuzu.hi);
  setPx(body, w, h, 6, yy - 1, theme.leaf.mid);
  setPx(body, w, h, 7, yy - 1, theme.leaf.hi);
  setPx(body, w, h, 8, yy, theme.leaf.sh);

  const hy = 4 + headDrop;
  const earLift = pose === 'ear' || pose === 'dance_1' ? -1 : 0;
  setRect(body, w, h, 9, hy - 1 + earLift, 2, 2, theme.fur.ear);
  setPx(detail, w, h, 9, hy - 1 + earLift, theme.fur.mid);

  setSpan(body, w, h, 4, 9, hy, theme.fur.hi);
  setSpan(body, w, h, 2, 10, hy + 1, theme.fur.mid);
  setSpan(body, w, h, 1, 10, hy + 2, theme.fur.mid);
  setSpan(body, w, h, 1, 10, hy + 3, theme.fur.mid);
  setSpan(body, w, h, 2, 9, hy + 4, theme.fur.sh);

  setSpan(detail, w, h, 4, 8, hy, theme.fur.hi);
  setRect(detail, w, h, 1, hy + 2, 2, 2, theme.fur.snout);
  setPx(detail, w, h, 1, hy + 2, theme.fur.sh);
  setPx(detail, w, h, 8, hy + 3, theme.fur.blush);

  if (pose === 'dance_0' || pose === 'dance_1') {
    setPx(detail, w, h, 4, hy + 2, theme.eye);
    setPx(detail, w, h, 5, hy + 1, theme.eye);
    setPx(detail, w, h, 6, hy + 2, theme.eye);
  } else if (pose === 'blink' || isDrowsy) {
    setSpan(detail, w, h, 4, 6, hy + 2, theme.eye);
  } else {
    setRect(detail, w, h, 4, hy + 1, 2, 2, theme.eye);
    setPx(detail, w, h, 4, hy + 1, theme.eyeGlint);
  }

  const by = 7 + bodyDrop;
  setSpan(body, w, h, 10, 17, by, theme.fur.hi);
  setSpan(body, w, h, 8, 18, by + 1, theme.fur.hi);
  setSpan(body, w, h, 6, 19, by + 2, theme.fur.mid);
  setSpan(body, w, h, 5, 19, by + 3, theme.fur.mid);
  setSpan(body, w, h, 5, 18, by + 4, theme.fur.mid);
  setSpan(body, w, h, 6, 17, by + 5, theme.fur.sh);
  if (pose === 'sleep') {
    setPx(body, w, h, 19, by + 2, theme.fur.hi);
    setPx(body, w, h, 19, by + 3, theme.fur.mid);
  }
  setSpan(detail, w, h, 11, 16, by + 1, theme.fur.hi);
  setSpan(detail, w, h, 10, 15, by + 4, theme.fur.mid);

  if (!isDrowsy) {
    const legY = by + 5;
    if (pose === 'walk_0') {
      setRect(body, w, h, 5, legY, 3, 3, theme.fur.sh);
      setRect(body, w, h, 10, legY, 3, 2, theme.fur.mid);
      setRect(body, w, h, 14, legY, 3, 3, theme.fur.sh);
    } else if (pose === 'walk_1' || pose === 'walk_3') {
      setRect(body, w, h, 6, legY, 3, 2, theme.fur.sh);
      setRect(body, w, h, 11, legY, 2, 2, theme.fur.mid);
      setRect(body, w, h, 14, legY, 3, 2, theme.fur.sh);
    } else if (pose === 'walk_2') {
      setRect(body, w, h, 7, legY, 3, 2, theme.fur.mid);
      setRect(body, w, h, 11, legY, 3, 3, theme.fur.sh);
      setRect(body, w, h, 15, legY, 3, 3, theme.fur.sh);
    } else if (pose === 'dance_1') {
      setRect(body, w, h, 5, legY, 3, 2, theme.fur.sh);
      setRect(body, w, h, 10, legY, 3, 2, theme.fur.mid);
      setRect(body, w, h, 15, legY, 3, 2, theme.fur.sh);
    } else {
      setRect(body, w, h, 6, legY, 3, 2, theme.fur.sh);
      setRect(body, w, h, 10, legY, 3, 2, theme.fur.mid);
      setRect(body, w, h, 14, legY, 3, 2, theme.fur.sh);
    }
  }

  const out = applySeloutLayer(body, detail, w, h, theme.selout, isDrowsy ? 12 : 14);
  const shadowY = isDrowsy ? 14 : 15;
  for (let sx = 4; sx <= 18; sx += 1) {
    if (!getPx(out, w, h, sx, shadowY)) setPx(out, w, h, sx, shadowY, theme.groundCore);
  }
  for (let sx = 6; sx <= 16; sx += 1) {
    if (!getPx(out, w, h, sx, shadowY + 1)) setPx(out, w, h, sx, shadowY + 1, theme.groundSoft);
  }
  return out;
}

const WOOFER_FRAME_0: SpriteMatrix = [
  'SSSSSSSS',
  'SMDDDDMS',
  'SDCCCCDS',
  'SDCCCCDS',
  'SDCCCCDS',
  'SDCCCCDS',
  'SMDDDDMS',
  'SSSSSSSS',
];

const WOOFER_FRAME_1: SpriteMatrix = [
  'GGGGGGGG',
  'GMCCCCMG',
  'GCAACCCG',
  'GCAAAACG',
  'GCAAAACG',
  'GCAACCCG',
  'GMCCCCMG',
  'GGGGGGGG',
];

const WOOFER_COLORS: SpriteColorMap = {
  S: '#1E2434',
  M: '#64748B',
  D: '#334155',
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
  { x: 82, y: 12, phase: 0, blue: false },
  { x: 89, y: 18, phase: 1, blue: true },
  { x: 102, y: 12, phase: 2, blue: false },
  { x: 111, y: 18, phase: 3, blue: true },
  { x: 122, y: 19, phase: 1, blue: false },
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
  outlineColor: string,
  riseSpan = 7
): void {
  const zColors: SpriteColorMap = { O: outlineColor, Z: '#E2E8F0' };
  if (reducedMotion) {
    drawSpriteMatrix(ctx, Z_SMALL, zColors, originX, originY - 2);
    drawSpriteMatrix(ctx, Z_LARGE, zColors, originX + 6, originY - riseSpan);
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
    drawSpriteMatrix(ctx, mat, zColors, drawX, drawY);
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
  fillPixelRect(ctx, 197, 79, 1, 9, palette.inkIndigo);
  fillPixelRect(ctx, 198, 79, 9, 9, palette.woodMid);
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
  const theme = getLongTheme(timeState, lampOn, palette);
  const breathOffset = getSleepingBreathOffset(timeSec, reducedMotion);
  const grid = buildSleepingLongGrid(theme, breathOffset);

  drawPixelGrid(ctx, grid, SLEEP_WIDTH, SLEEP_HEIGHT, SLEEP_DRAW_X, SLEEP_DRAW_Y);
  drawZzzDrift(ctx, 44, 82, timeSec, reducedMotion, theme.selout, 6);
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
  const drawX = Math.round(seatAnchor.seatCenterX - 25);
  const drawY = Math.round(seatAnchor.seatTopY - 14);
  const timeSec = resolveTimeSec(options);
  const theme = getLongTheme(timeState, lampOn, palette);
  const lampRim = lampOn && timeState === 'late_night';

  if (reducedMotion) {
    const grid = buildSeatedLongGrid(theme, 'center', 'home', 0, 0, lampRim);
    drawPixelGrid(ctx, grid, SEATED_WIDTH, SEATED_HEIGHT, drawX, drawY);
    return;
  }

  const cycle = timeState === 'late_night' ? timeSec % 16 : timeSec % 18;
  const focusSway = Math.sin(timeSec * Math.PI * 0.7) > 0.86 ? 1 : 0;
  const musicBobDown = isMusicActive && Math.sin(timeSec * Math.PI * 3.1) > 0.32 ? 1 : 0;

  let headPose: SeatedHeadPose = 'center';
  let armPose: SeatedArmPose = 'home';
  let headDrop = musicBobDown || focusSway;
  let shoulderDrop = musicBobDown;

  if (timeState === 'working') {
    if (cycle >= 3.2 && cycle < 5.0) {
      headPose = 'glance_left';
    } else if (cycle >= 5.2 && cycle < 5.7) {
      armPose = 'reach_mug';
      shoulderDrop = 0;
    } else if (cycle >= 5.7 && cycle < 6.9) {
      maskStaticDeskMug(ctx, palette);
      headPose = 'glance_right';
      armPose = 'sip_mug';
      headDrop = 0;
      shoulderDrop = 0;
      drawSmoothSteam(ctx, drawX + 33, drawY + 2, timeSec, false, 5);
    } else if (cycle >= 6.9 && cycle < 7.4) {
      armPose = 'reach_mug';
      shoulderDrop = 0;
    } else if (cycle >= 10.8 && cycle < 13.4) {
      headPose = cycle < 12.1 ? 'glance_left' : 'glance_right';
      armPose = 'stretch';
      headDrop = 0;
      shoulderDrop = 0;
    } else if (cycle >= 14.8 && cycle < 16.4) {
      headPose = 'glance_left';
      armPose = Math.floor(timeSec * 5) % 2 === 0 ? 'type_l' : 'type_r';
    } else if (cycle >= 8.2 && cycle < 10.2) {
      armPose = Math.floor(timeSec * 2.5) % 2 === 0 ? 'mouse_a' : 'mouse_b';
    } else {
      const step = Math.floor(timeSec * 5.2) % 3;
      armPose = step === 0 ? 'type_l' : step === 1 ? 'type_r' : 'home';
    }
  } else {
    if (cycle >= 3.5 && cycle < 4.9) {
      headPose = 'glance_left';
    } else if (cycle >= 6.0 && cycle < 8.6) {
      armPose = 'stretch';
      headDrop = 0;
      shoulderDrop = 0;
      headPose = cycle < 7.3 ? 'glance_left' : 'glance_right';
    } else if (cycle >= 10.4 && cycle < 12.2) {
      armPose = Math.floor(timeSec * 2.4) % 2 === 0 ? 'mouse_a' : 'mouse_b';
    } else {
      const step = Math.floor(timeSec * 4.8) % 3;
      armPose = step === 0 ? 'type_l' : step === 1 ? 'type_r' : 'home';
    }
  }

  const grid = buildSeatedLongGrid(theme, headPose, armPose, headDrop, shoulderDrop, lampRim);
  drawPixelGrid(ctx, grid, SEATED_WIDTH, SEATED_HEIGHT, drawX, drawY);
}

interface WakingLongPose {
  x: number;
  y: number;
  footY: number;
  grid: PixelGrid;
  steamX: number;
  steamY: number;
}

function getWakingLongPose(
  theme: LongColorTheme,
  timeSec: number,
  reducedMotion: boolean
): WakingLongPose {
  const minX = WALKABLE_RECT.x + 1;
  const maxX = Math.min(82, WALKABLE_RECT.x + WALKABLE_RECT.w - WAKING_WIDTH);
  const clampX = (x: number): number => Math.max(minX, Math.min(maxX, Math.round(x)));
  const clampY = (y: number): number =>
    Math.max(WALKABLE_RECT.y, Math.min(WALKABLE_RECT.y + WALKABLE_RECT.h - WAKING_HEIGHT, Math.round(y)));

  if (reducedMotion) {
    const x = clampX(80);
    const y = clampY(108);
    return {
      x,
      y,
      footY: y + WAKING_HEIGHT - 2,
      grid: buildWakingLongGrid(theme, 'down', 'coffee', 0, false, false),
      steamX: x + 17,
      steamY: y + 14,
    };
  }

  const cycle = timeSec % 16;
  const blinkNow = timeSec % 3.8 >= 3.64;
  const breatheNow = Math.sin(timeSec * ((Math.PI * 2) / 3.2)) > 0.35;

  if (cycle < 3.4) {
    const p = cycle / 3.4;
    const x = clampX(75 + p * 6);
    const y = clampY(111 - Math.round(Math.sin(p * Math.PI) * 2));
    const walkFrame = Math.floor(timeSec * 6.0) % 4;
    return {
      x,
      y,
      footY: y + WAKING_HEIGHT - 2,
      grid: buildWakingLongGrid(theme, 'right', 'walk', walkFrame, blinkNow, false),
      steamX: -10,
      steamY: -10,
    };
  }

  if (cycle < 7.2) {
    const isPeakSip = cycle >= 4.4 && cycle < 6.4;
    const x = clampX(81);
    const y = clampY(110);
    return {
      x,
      y,
      footY: y + WAKING_HEIGHT - 2,
      grid: buildWakingLongGrid(theme, 'down', isPeakSip ? 'sip' : 'coffee', 0, blinkNow, breatheNow),
      steamX: x + 17,
      steamY: y + (isPeakSip ? 12 : 14),
    };
  }

  if (cycle < 10.6) {
    const x = clampX(80 + Math.round(Math.sin(timeSec * 1.1) * 1));
    const y = clampY(110);
    return {
      x,
      y,
      footY: y + WAKING_HEIGHT - 2,
      grid: buildWakingLongGrid(theme, 'down', 'stretch', 0, true, false),
      steamX: -10,
      steamY: -10,
    };
  }

  if (cycle < 13.8) {
    const p = (cycle - 10.6) / 3.2;
    const x = clampX(81 - p * 6);
    const y = clampY(110 + Math.round(Math.sin(p * Math.PI) * 1));
    const walkFrame = Math.floor(timeSec * 6.0) % 4;
    return {
      x,
      y,
      footY: y + WAKING_HEIGHT - 2,
      grid: buildWakingLongGrid(theme, 'left', 'walk', walkFrame, blinkNow, false),
      steamX: -10,
      steamY: -10,
    };
  }

  const x = clampX(75);
  const y = clampY(111);
  return {
    x,
    y,
    footY: y + WAKING_HEIGHT - 2,
    grid: buildWakingLongGrid(theme, 'down', 'coffee', 0, blinkNow, breatheNow),
    steamX: x + 17,
    steamY: y + 14,
  };
}

interface CapyPoseState {
  x: number;
  y: number;
  footY: number;
  flipX: boolean;
  pose: CapyPoseKind;
}

function clampCapyPos(rawX: number, rawY: number): { x: number; y: number } {
  const minX = RUG_WALK_RECT.x;
  const maxX = RUG_WALK_RECT.x + RUG_WALK_RECT.w - CAPY_WIDTH;
  const minY = RUG_WALK_RECT.y;
  const maxY = RUG_WALK_RECT.y + RUG_WALK_RECT.h - CAPY_HEIGHT;
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
    const pos = clampCapyPos(188, 132);
    return {
      x: pos.x,
      y: pos.y,
      footY: pos.y + 14,
      flipX: false,
      pose: breathUp ? 'sleep' : 'drowsy',
    };
  }

  if (timeState === 'late_night') {
    const sleepyNod = isMusicActive && !reducedMotion && Math.sin(timeSec * Math.PI * 2.2) > 0.4;
    const pos = clampCapyPos(188, sleepyNod ? 131 : 132);
    return {
      x: pos.x,
      y: pos.y,
      footY: pos.y + 14,
      flipX: false,
      pose: 'drowsy',
    };
  }

  if (reducedMotion) {
    const pos = clampCapyPos(188, 131);
    return {
      x: pos.x,
      y: pos.y,
      footY: pos.y + 14,
      flipX: false,
      pose: 'sit',
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
    const hopY = danceFrame === 1 ? -1 : 0;
    const pos = clampCapyPos(cx, cy + hopY);
    return {
      x: pos.x,
      y: pos.y,
      footY: pos.y + 14,
      flipX,
      pose: danceFrame === 1 ? 'dance_1' : 'dance_0',
    };
  }

  if (isWalking) {
    const walkPoses: readonly CapyPoseKind[] = ['walk_0', 'walk_1', 'walk_2', 'walk_3'];
    const step = Math.floor(timeSec * 5.6) % walkPoses.length;
    const pos = clampCapyPos(cx, cy);
    return {
      x: pos.x,
      y: pos.y,
      footY: pos.y + 14,
      flipX,
      pose: walkPoses[step],
    };
  }

  const blinkNow = timeSec % 4.1 >= 3.88;
  const earTwitch = timeSec % 3.2 >= 2.96;
  const sitPose: CapyPoseKind = blinkNow ? 'blink' : earTwitch ? 'ear' : 'sit';
  const pos = clampCapyPos(cx, cy);

  return {
    x: pos.x,
    y: pos.y,
    footY: pos.y + 14,
    flipX,
    pose: sitPose,
  };
}

export function drawWakingAndCapybaraLayer(
  ctx: CanvasRenderingContext2D,
  options: DrawCharacterAndEffectsOptions
): void {
  const { timeState, lampOn, isMusicActive, palette, reducedMotion = false } = options;
  const timeSec = resolveTimeSec(options);

  const capyState = getCapybaraState(timeState, isMusicActive, timeSec, reducedMotion);
  const capyTheme = getCapyTheme(timeState, lampOn, palette);
  const capyGrid = buildCapyGrid(capyTheme, capyState.pose);

  const renderCapy = () => {
    drawPixelGrid(ctx, capyGrid, CAPY_WIDTH, CAPY_HEIGHT, capyState.x, capyState.y, capyState.flipX);
    if (timeState === 'sleeping') {
      const zX = Math.max(RUG_WALK_RECT.x, capyState.x - 4);
      const zY = Math.max(RUG_WALK_RECT.y + 5, capyState.y - 1);
      drawZzzDrift(ctx, zX, zY, timeSec + 1.2, reducedMotion, capyTheme.selout, 3);
    }
  };

  if (timeState !== 'waking') {
    renderCapy();
    return;
  }

  const longTheme = getLongTheme(timeState, lampOn, palette);
  const longPose = getWakingLongPose(longTheme, timeSec, reducedMotion);

  const renderLong = () => {
    drawPixelGrid(ctx, longPose.grid, WAKING_WIDTH, WAKING_HEIGHT, longPose.x, longPose.y);
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
    const h = 2 + Math.round(wave * 5);
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
    drawSpriteMatrix(ctx, NOTE_SINGLE, NOTE_COLORS_GREEN, 118, 46);
    drawSpriteMatrix(ctx, NOTE_DOUBLE, NOTE_COLORS_GOLD, 204, 45);
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

    drawEqualizerBars(ctx, 116, 56, timeSec, 0);
    drawEqualizerBars(ctx, 204, 56, timeSec, 1.4);
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
    { baseX: 119, baseY: 53, offsetSec: 0, doubleNote: false, colors: NOTE_COLORS_GREEN, arcAmp: 2.6 },
    { baseX: 119, baseY: 53, offsetSec: 1.2, doubleNote: true, colors: NOTE_COLORS_BLUE, arcAmp: -2.4 },
    { baseX: 207, baseY: 53, offsetSec: 0.6, doubleNote: true, colors: NOTE_COLORS_GOLD, arcAmp: 2.6 },
    { baseX: 207, baseY: 53, offsetSec: 1.8, doubleNote: false, colors: NOTE_COLORS_CORAL, arcAmp: -2.6 },
    { baseX: 256, baseY: 43, offsetSec: 0.9, doubleNote: false, colors: NOTE_COLORS_GOLD, arcAmp: 1.8 },
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
    const drawY = item.baseY - Math.round(phase * 22);
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

function drawHotspotBrackets(
  ctx: CanvasRenderingContext2D,
  bx: number,
  by: number,
  bw: number,
  bh: number,
  isHovered: boolean,
  timeSec: number,
  reducedMotion: boolean
): void {
  const x0 = Math.max(1, Math.round(bx));
  const y0 = Math.max(1, Math.round(by));
  const x1 = Math.min(318, Math.round(bx + bw - 1));
  const y1 = Math.min(178, Math.round(by + bh - 1));
  const pulse = reducedMotion || isHovered ? 0.92 : 0.58 + 0.22 * Math.sin(timeSec * 3.4);
  const arm = 3;
  const col = isHovered ? '#FFF3B0' : '#FBBC04';
  const shadow = '#2A1C16';

  ctx.save();
  ctx.globalAlpha = pulse;

  fillPixelRect(ctx, x0, y0, arm, 1, col);
  fillPixelRect(ctx, x0, y0, 1, arm, col);
  fillPixelRect(ctx, x0 + 1, y0 + 1, 1, 1, shadow);

  fillPixelRect(ctx, x1 - arm + 1, y0, arm, 1, col);
  fillPixelRect(ctx, x1, y0, 1, arm, col);
  fillPixelRect(ctx, x1 - 1, y0 + 1, 1, 1, shadow);

  fillPixelRect(ctx, x0, y1, arm, 1, col);
  fillPixelRect(ctx, x0, y1 - arm + 1, 1, arm, col);
  fillPixelRect(ctx, x0 + 1, y1 - 1, 1, 1, shadow);

  fillPixelRect(ctx, x1 - arm + 1, y1, arm, 1, col);
  fillPixelRect(ctx, x1, y1 - arm + 1, 1, arm, col);
  fillPixelRect(ctx, x1 - 1, y1 - 1, 1, 1, shadow);

  ctx.restore();
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
  if (selectedHotspot && selectedHotspot !== hoveredHotspot) {
    if (selectedHotspot === 'capybara') {
      drawHotspotBrackets(
        ctx,
        capyState.x - 1,
        capyState.y - 1,
        CAPY_WIDTH + 2,
        CAPY_HEIGHT + 1,
        false,
        timeSec,
        reducedMotion
      );
    } else {
      for (let i = 0; i < ROOM_HOTSPOTS.length; i += 1) {
        const reg = ROOM_HOTSPOTS[i];
        if (reg.id === selectedHotspot) {
          drawHotspotBrackets(ctx, reg.x, reg.y, reg.w, reg.h, false, timeSec, reducedMotion);
        }
      }
    }
  }

  let pointerX: number | null = null;
  let pointerY: number | null = null;
  const activeId = hoveredRegion ? hoveredRegion.id : hoveredHotspot ?? selectedHotspot;

  if (hoveredRegion) {
    if (hoveredRegion.id === 'capybara') {
      drawHotspotBrackets(
        ctx,
        capyState.x - 1,
        capyState.y - 1,
        CAPY_WIDTH + 2,
        CAPY_HEIGHT + 1,
        true,
        timeSec,
        reducedMotion
      );
    } else {
      drawHotspotBrackets(
        ctx,
        hoveredRegion.x,
        hoveredRegion.y,
        hoveredRegion.w,
        hoveredRegion.h,
        true,
        timeSec,
        reducedMotion
      );
    }
  }

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
