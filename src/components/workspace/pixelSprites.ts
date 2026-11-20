import {
  ROOM_HEIGHT,
  ROOM_WIDTH,
  type RoomHotspotId,
  type RoomHotspotRegion,
  type RoomTimeState,
} from '../../data/workspace';
import type { RoomPalette } from './pixelPalette';
import { ROOM_HOTSPOTS } from './roomEnvironment';

export const SPRITE_W = 24;
export const SPRITE_H = 32;

export type CharacterArchetype =
  | 'coordinator'
  | 'engineer'
  | 'researcher'
  | 'designer'
  | 'verifier'
  | 'architect'
  | 'monitor'
  | 'specialist';

export type CharacterAnimState =
  | 'idle'
  | 'walk'
  | 'work'
  | 'think'
  | 'rest_coffee'
  | 'rest_sit'
  | 'rest_sleep'
  | 'error'
  | 'talk';

export type CharacterDir = 'down' | 'up' | 'left' | 'right';

const ARCHETYPES: readonly CharacterArchetype[] = [
  'coordinator',
  'engineer',
  'researcher',
  'designer',
  'verifier',
  'architect',
  'monitor',
  'specialist',
];

const STATES: readonly CharacterAnimState[] = [
  'idle',
  'walk',
  'work',
  'think',
  'rest_coffee',
  'rest_sit',
  'rest_sleep',
  'error',
  'talk',
];

export interface DrawCharacterOptions {
  archetype: CharacterArchetype;
  seed: number;
  state: CharacterAnimState;
  dir: CharacterDir;
  frame: number;
  x: number;
  y: number;
  scale?: number;
  isLong?: boolean;
  variant?: 'long';
}

export interface DrawDeskAndMusicEffectsOptions {
  timeState: RoomTimeState;
  lampOn: boolean;
  isMusicActive: boolean;
  tick: number;
  elapsedSec: number;
  palette: RoomPalette;
  hoveredHotspot: RoomHotspotId | null;
  selectedHotspot: RoomHotspotId | null;
  hoveredRegion?: RoomHotspotRegion | null;
  reducedMotion?: boolean;
  capyAnchor?: { x: number; y: number } | null;
}

export interface DrawCapybaraPetOptions {
  timeState: RoomTimeState;
  isMusicActive: boolean;
  elapsedSec: number;
  palette: RoomPalette;
  bounds: { x: number; y: number; w: number; h: number };
  lampOn?: boolean;
  reducedMotion?: boolean;
}

interface ShadeRamp {
  readonly hi: string;
  readonly mid: string;
  readonly sh: string;
}

interface HairRamp extends ShadeRamp {
  readonly streak?: string;
}

interface SkinRamp extends ShadeRamp {
  readonly blush: string;
}

interface EyeRamp {
  readonly hi: string;
  readonly mid: string;
  readonly dark: string;
}

type HairStyle =
  | 'parted'
  | 'tousled'
  | 'scholarly'
  | 'wavy'
  | 'cropped'
  | 'swept_silver'
  | 'spiky'
  | 'dual_tone'
  | 'long_layered';

type TailStyle = 'bun' | 'low_bun' | 'ponytail' | 'wavy_long' | 'ahoge' | null;
type HatStyle = 'hood_down' | 'beret' | 'visor_cap' | 'backwards_cap' | 'cyber_goggles' | null;
type GlassesStyle = 'rect' | 'round' | 'monocle' | 'visor' | 'long_rect' | null;
type AccessoryStyle =
  | 'coordinator'
  | 'headphones'
  | 'satchel'
  | 'scarf'
  | 'clipboard'
  | 'tablet'
  | 'antenna'
  | 'cyber_core'
  | 'long_hoodie';

interface CharacterPalette {
  skin: SkinRamp;
  eye: EyeRamp;
  hair: HairRamp;
  hairStyle: HairStyle;
  hairFlip: boolean;
  tail: TailStyle;
  top: ShadeRamp;
  inner: ShadeRamp;
  accent: ShadeRamp;
  tee?: ShadeRamp;
  tie?: string;
  alertLed?: string;
  pants: ShadeRamp;
  shoes: ShadeRamp;
  hat: HatStyle;
  glasses: GlassesStyle;
  accessory: AccessoryStyle;
  headphonesWorn?: boolean;
}

interface HeadExpr {
  blink: boolean;
  surprised: boolean;
  sleep: boolean;
  glanceUp: boolean;
  screenGlow: boolean;
  mouth: 'closed' | 'open' | 'wide';
}

type PixelGrid = (string | null)[];
type SpriteMatrix = readonly string[];
type SpriteColorMap = Record<string, string | undefined>;
type OffscreenSurface = HTMLCanvasElement | OffscreenCanvas;

const OUTLINE_DARK = '#1c1829';
const SHADOW_GROUND_CORE = 'rgba(18, 14, 28, 0.32)';
const SHADOW_GROUND_SOFT = 'rgba(18, 14, 28, 0.14)';

const CAPY_WIDTH = 22;
const CAPY_HEIGHT = 17;

const MUSIC_FADE_DURATION_SEC = 0.4;
const DESK1_LEFT_WOOFER_X = 34;
const DESK1_LEFT_WOOFER_Y = 111;
const DESK1_RIGHT_WOOFER_X = 78;
const DESK1_RIGHT_WOOFER_Y = 111;
const DESK1_MUG_X = 35;
const DESK1_MUG_Y = 121;
const TURNTABLE_X = 432;
const TURNTABLE_Y = 66;
const TURNTABLE_SPEAKER_X = 452;
const TURNTABLE_SPEAKER_Y = 64;

const SKIN_RAMPS: readonly SkinRamp[] = [
  { hi: '#ffe5cf', mid: '#f5c29e', sh: '#cc8f6e', blush: '#ed9487' },
  { hi: '#f7d1ac', mid: '#e2a77b', sh: '#af724d', blush: '#db7e6b' },
  { hi: '#dfaa7e', mid: '#c08256', sh: '#8c5332', blush: '#b56050' },
  { hi: '#b87c58', mid: '#905839', sh: '#613520', blush: '#91463b' },
];

const HAIR_RAMPS: Record<string, HairRamp> = {
  espresso: { hi: '#614338', mid: '#402922', sh: '#261714' },
  chestnut: { hi: '#8c583d', mid: '#643a27', sh: '#3f2116' },
  auburn: { hi: '#bc5a3d', mid: '#8e3826', sh: '#5c2016' },
  honey: { hi: '#dba958', mid: '#b07b34', sh: '#7a4f1d' },
  raven: { hi: '#454e6e', mid: '#292e42', sh: '#181a29' },
  plum: { hi: '#a35284', mid: '#74315d', sh: '#4a1c3b' },
  silver: { hi: '#4b526e', mid: '#2d3247', sh: '#1b1d2b', streak: '#dce7f7' },
  cyber: { hi: '#423b73', mid: '#28234d', sh: '#171330', streak: '#42f2ff' },
};

const EYE_RAMPS: readonly EyeRamp[] = [
  { hi: '#3f4f80', mid: '#252c4a', dark: '#181529' },
  { hi: '#5e4033', mid: '#3b251c', dark: '#1c1214' },
  { hi: '#34665c', mid: '#1f423d', dark: '#142426' },
  { hi: '#5b4175', mid: '#39264d', dark: '#1b1429' },
];

const seloutCache = new Map<string, string>();
const frameCache = new Map<string, OffscreenSurface>();
const MAX_CACHE_ENTRIES = 2048;

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

let lastCapyBounds: { x: number; y: number; w: number; h: number } | null = null;

function hashString(str: string): number {
  let h = 2166136261 >>> 0;
  const s = String(str ?? '');
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

function normalizeSeed(seed: unknown): number {
  if (typeof seed === 'number' && Number.isFinite(seed)) {
    return Math.abs(Math.floor(seed)) >>> 0;
  }
  if (seed === undefined || seed === null) return 0;
  return hashString(String(seed));
}

function normalizeDir(dir: string): CharacterDir {
  const d = String(dir || 'down').toLowerCase();
  if (d === 'up' || d === 'n' || d === 'north') return 'up';
  if (d === 'left' || d === 'w' || d === 'west') return 'left';
  if (d === 'right' || d === 'e' || d === 'east') return 'right';
  return 'down';
}

function normalizeState(state: string): CharacterAnimState {
  const s = String(state || 'idle').toLowerCase();
  if ((STATES as readonly string[]).includes(s)) return s as CharacterAnimState;
  if (s === 'working') return 'work';
  if (s === 'walking') return 'walk';
  if (s === 'thinking') return 'think';
  if (s === 'coffee') return 'rest_coffee';
  if (s === 'sit' || s === 'sitting') return 'rest_sit';
  if (s === 'sleep' || s === 'sleeping' || s === 'nap') return 'rest_sleep';
  if (s === 'talking' || s === 'chat') return 'talk';
  return 'idle';
}

function getLongPalette(): CharacterPalette {
  return {
    skin: SKIN_RAMPS[0],
    eye: { hi: '#4a5d8f', mid: '#2a3352', dark: '#19172b' },
    hair: HAIR_RAMPS.chestnut,
    hairStyle: 'long_layered',
    hairFlip: false,
    tail: null,
    top: { hi: '#425675', mid: '#2d3c54', sh: '#1c2638' },
    inner: { hi: '#617694', mid: '#475973', sh: '#2d3a4f' },
    tee: { hi: '#fffbf2', mid: '#eae2d3', sh: '#c2b7a5' },
    accent: { hi: '#fffdf7', mid: '#dce3ee', sh: '#9ba8be' },
    pants: { hi: '#46618c', mid: '#2f4366', sh: '#1e2c45' },
    shoes: { hi: '#edf2fa', mid: '#9aa8bd', sh: '#4e596e' },
    hat: 'hood_down',
    glasses: 'long_rect',
    accessory: 'long_hoodie',
  };
}

function getArchetypePalette(
  archetype: CharacterArchetype,
  seed: number,
  isLong = false
): CharacterPalette {
  if (isLong) {
    return getLongPalette();
  }

  const s = normalizeSeed(seed);
  const variant = s % 16;
  const skinShift = variant % 4;
  const hairAlt = (variant >> 2) % 2;
  const accentAlt = (variant >> 3) % 2;
  const styleAlt = ((variant >> 1) ^ (variant >> 3)) & 1;
  const eye = EYE_RAMPS[(variant + archetype.length) % EYE_RAMPS.length];

  switch (archetype) {
    case 'coordinator': {
      const defaultSkin = variant === 0 ? 1 : (1 + skinShift) % 4;
      const blazerNavy = accentAlt === 0;
      return {
        skin: SKIN_RAMPS[defaultSkin],
        eye,
        hair: hairAlt ? HAIR_RAMPS.raven : HAIR_RAMPS.espresso,
        hairStyle: 'parted',
        hairFlip: styleAlt === 1,
        tail: styleAlt === 1 ? 'bun' : null,
        top: blazerNavy
          ? { hi: '#3f5c9e', mid: '#293e70', sh: '#19274a' }
          : { hi: '#4b5369', mid: '#32384a', sh: '#1e2230' },
        inner: { hi: '#ffffff', mid: '#edf2fa', sh: '#c5cfe0' },
        accent: { hi: '#ffe375', mid: '#ebb42d', sh: '#9e6e0d' },
        tie: blazerNavy ? '#d13d53' : '#3594b8',
        pants: { hi: '#3a4159', mid: '#252a3b', sh: '#161926' },
        shoes: { hi: '#543b30', mid: '#36231c', sh: '#1f130f' },
        hat: null,
        glasses: null,
        accessory: 'coordinator',
      };
    }

    case 'engineer': {
      const defaultSkin = variant === 0 ? 0 : skinShift;
      return {
        skin: SKIN_RAMPS[defaultSkin],
        eye,
        hair: hairAlt ? HAIR_RAMPS.chestnut : HAIR_RAMPS.espresso,
        hairStyle: 'tousled',
        hairFlip: styleAlt === 1,
        tail: styleAlt === 1 ? 'ahoge' : null,
        top: accentAlt
          ? { hi: '#40adc4', mid: '#267f99', sh: '#165266' }
          : { hi: '#38baae', mid: '#218b86', sh: '#135a59' },
        inner: { hi: '#52657d', mid: '#354357', sh: '#202938' },
        accent: { hi: '#f8fafc', mid: '#dce3ee', sh: '#9ba8be' },
        pants: { hi: '#405a82', mid: '#2b3e5e', sh: '#1b2840' },
        shoes: { hi: '#e8eef7', mid: '#9aa8bd', sh: '#4c576b' },
        hat: 'hood_down',
        glasses: 'rect',
        accessory: 'headphones',
        headphonesWorn: styleAlt === 1,
      };
    }

    case 'researcher': {
      const defaultSkin = variant === 0 ? 2 : (2 + skinShift) % 4;
      return {
        skin: SKIN_RAMPS[defaultSkin],
        eye,
        hair: hairAlt ? HAIR_RAMPS.espresso : HAIR_RAMPS.auburn,
        hairStyle: 'scholarly',
        hairFlip: styleAlt === 1,
        tail: 'low_bun',
        top: accentAlt
          ? { hi: '#82a86d', mid: '#5a7d4a', sh: '#39542f' }
          : { hi: '#8dab62', mid: '#648243', sh: '#3f5729' },
        inner: { hi: '#fffaf0', mid: '#f2e6cd', sh: '#cbb99e' },
        accent: { hi: '#b57344', mid: '#854e29', sh: '#542e15' },
        pants: { hi: '#735949', mid: '#523e32', sh: '#36271e' },
        shoes: { hi: '#593c2e', mid: '#3b261c', sh: '#24150f' },
        hat: null,
        glasses: 'round',
        accessory: 'satchel',
      };
    }

    case 'designer': {
      const defaultSkin = variant === 0 ? 1 : (1 + skinShift) % 4;
      return {
        skin: SKIN_RAMPS[defaultSkin],
        eye,
        hair: hairAlt ? HAIR_RAMPS.auburn : HAIR_RAMPS.plum,
        hairStyle: 'wavy',
        hairFlip: styleAlt === 1,
        tail: 'wavy_long',
        top: accentAlt
          ? { hi: '#f58b6e', mid: '#d66047', sh: '#993b29' }
          : { hi: '#ff816e', mid: '#e05546', sh: '#a3332a' },
        inner: { hi: '#ffd966', mid: '#f0b32e', sh: '#b37a0e' },
        accent: accentAlt
          ? { hi: '#3ac9bf', mid: '#22968e', sh: '#14635d' }
          : { hi: '#d9486f', mid: '#a62b4d', sh: '#6e1732' },
        pants: { hi: '#464359', mid: '#2d2b3d', sh: '#1c1a26' },
        shoes: { hi: '#694646', mid: '#472d2d', sh: '#2e1b1b' },
        hat: 'beret',
        glasses: null,
        accessory: 'scarf',
      };
    }

    case 'verifier': {
      const defaultSkin = variant === 0 ? 3 : (3 + skinShift) % 4;
      return {
        skin: SKIN_RAMPS[defaultSkin],
        eye,
        hair: hairAlt ? HAIR_RAMPS.espresso : HAIR_RAMPS.raven,
        hairStyle: 'cropped',
        hairFlip: styleAlt === 1,
        tail: null,
        top: accentAlt
          ? { hi: '#3ec78a', mid: '#239664', sh: '#13613f' }
          : { hi: '#37bd7e', mid: '#1f8c5a', sh: '#125938' },
        inner: { hi: '#4e5669', mid: '#353b4a', sh: '#20242e' },
        accent: { hi: '#ffe36e', mid: '#dbad2c', sh: '#8f670f' },
        pants: { hi: '#3a4152', mid: '#272c38', sh: '#181b26' },
        shoes: { hi: '#3b404f', mid: '#252933', sh: '#151821' },
        hat: 'visor_cap',
        glasses: 'monocle',
        accessory: 'clipboard',
      };
    }

    case 'architect': {
      const defaultSkin = variant === 0 ? 0 : skinShift;
      return {
        skin: SKIN_RAMPS[defaultSkin],
        eye,
        hair: HAIR_RAMPS.silver,
        hairStyle: 'swept_silver',
        hairFlip: styleAlt === 1,
        tail: styleAlt === 1 ? 'ponytail' : null,
        top: accentAlt
          ? { hi: '#454d69', mid: '#2c3145', sh: '#191d2b' }
          : { hi: '#3b4157', mid: '#252838', sh: '#161824' },
        inner: { hi: '#5e6882', mid: '#40475e', sh: '#282d3d' },
        accent: { hi: '#a3ebff', mid: '#45c3f7', sh: '#1b73a3' },
        pants: { hi: '#565d75', mid: '#3c4257', sh: '#252938' },
        shoes: { hi: '#393c4a', mid: '#232530', sh: '#14151e' },
        hat: null,
        glasses: null,
        accessory: 'tablet',
      };
    }

    case 'monitor': {
      const defaultSkin = variant === 0 ? 2 : (2 + skinShift) % 4;
      return {
        skin: SKIN_RAMPS[defaultSkin],
        eye,
        hair: hairAlt ? HAIR_RAMPS.honey : HAIR_RAMPS.chestnut,
        hairStyle: 'spiky',
        hairFlip: styleAlt === 1,
        tail: null,
        top: accentAlt
          ? { hi: '#5062ba', mid: '#354387', sh: '#202859' }
          : { hi: '#4959ad', mid: '#303b7a', sh: '#1d2452' },
        inner: { hi: '#ffcb57', mid: '#f09f22', sh: '#ad650c' },
        accent: { hi: '#9cf8ff', mid: '#2ad9f0', sh: '#11819c' },
        alertLed: '#ff5252',
        pants: { hi: '#3a3f57', mid: '#272b3d', sh: '#171926' },
        shoes: { hi: '#4b536e', mid: '#2d3245', sh: '#1a1d2b' },
        hat: 'backwards_cap',
        glasses: 'visor',
        accessory: 'antenna',
      };
    }

    case 'specialist':
    default: {
      const defaultSkin = variant === 0 ? 3 : (3 + skinShift) % 4;
      return {
        skin: SKIN_RAMPS[defaultSkin],
        eye,
        hair: HAIR_RAMPS.cyber,
        hairStyle: 'dual_tone',
        hairFlip: styleAlt === 1,
        tail: styleAlt === 1 ? 'ponytail' : null,
        top: accentAlt
          ? { hi: '#8a4ad1', mid: '#602e9c', sh: '#3c1a69' }
          : { hi: '#7c43bf', mid: '#54288c', sh: '#35165e' },
        inner: { hi: '#8cf9ff', mid: '#2ce0ed', sh: '#118d9e' },
        accent: { hi: '#9efcff', mid: '#3cf2ff', sh: '#14a0b5' },
        pants: { hi: '#32304d', mid: '#211f36', sh: '#131224' },
        shoes: { hi: '#393657', mid: '#232138', sh: '#141324' },
        hat: 'cyber_goggles',
        glasses: null,
        accessory: 'cyber_core',
      };
    }
  }
}

function createGrid(w = SPRITE_W, h = SPRITE_H): PixelGrid {
  return new Array<string | null>(w * h).fill(null);
}

function px(grid: PixelGrid, x: number, y: number, color: string | null, w = SPRITE_W, h = SPRITE_H): void {
  const ix = Math.round(x);
  const iy = Math.round(y);
  if (ix < 0 || ix >= w || iy < 0 || iy >= h || !color) return;
  grid[iy * w + ix] = color;
}

function getPx(grid: PixelGrid, x: number, y: number, w = SPRITE_W, h = SPRITE_H): string | null {
  if (x < 0 || x >= w || y < 0 || y >= h) return null;
  return grid[y * w + x];
}

function span(grid: PixelGrid, x1: number, x2: number, y: number, color: string, w = SPRITE_W, h = SPRITE_H): void {
  for (let x = x1; x <= x2; x += 1) {
    px(grid, x, y, color, w, h);
  }
}

function rect(
  grid: PixelGrid,
  x: number,
  y: number,
  rw: number,
  rh: number,
  color: string,
  w = SPRITE_W,
  h = SPRITE_H
): void {
  for (let yy = y; yy < y + rh; yy += 1) {
    for (let xx = x; xx < x + rw; xx += 1) {
      px(grid, xx, yy, color, w, h);
    }
  }
}

function seloutFromHex(hex: string, baseOutline = OUTLINE_DARK): string {
  if (!hex || hex[0] !== '#' || hex.length !== 7) return baseOutline;
  const key = `${baseOutline}|${hex}`;
  const cached = seloutCache.get(key);
  if (cached) return cached;

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

  const res = `#${or.toString(16).padStart(2, '0')}${og.toString(16).padStart(2, '0')}${ob.toString(16).padStart(2, '0')}`;
  seloutCache.set(key, res);
  return res;
}

function applySeloutOutline(
  bodyGrid: PixelGrid,
  outGrid: PixelGrid,
  w = SPRITE_W,
  h = SPRITE_H,
  baseOutline = OUTLINE_DARK,
  bottomDarkY = 25
): void {
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const c = getPx(bodyGrid, x, y, w, h);
      if (c) {
        px(outGrid, x, y, c, w, h);
        continue;
      }
      const below = getPx(bodyGrid, x, y + 1, w, h);
      const right = getPx(bodyGrid, x + 1, y, w, h);
      const left = getPx(bodyGrid, x - 1, y, w, h);
      const above = getPx(bodyGrid, x, y - 1, w, h);
      if (!below && !right && !left && !above) continue;

      if ((above || left) && !(below || right)) {
        px(outGrid, x, y, baseOutline, w, h);
      } else if (y >= bottomDarkY) {
        px(outGrid, x, y, baseOutline, w, h);
      } else {
        const src = below || right || left || above;
        px(outGrid, x, y, src ? seloutFromHex(src, baseOutline) : baseOutline, w, h);
      }
    }
  }
}

function mirrorHorizontal(grid: PixelGrid, w = SPRITE_W, h = SPRITE_H): PixelGrid {
  const out = createGrid(w, h);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const c = getPx(grid, x, y, w, h);
      if (c) px(out, w - 1 - x, y, c, w, h);
    }
  }
  return out;
}

function drawFrontHairAndHat(
  body: PixelGrid,
  detail: PixelGrid,
  pal: CharacterPalette,
  hy: number,
  expr: HeadExpr
): void {
  const h = pal.hair;
  const flip = pal.hairFlip;
  const screenGlow = expr.screenGlow;

  span(body, 8, 15, hy - 1, h.hi);
  span(body, 7, 16, hy + 0, h.hi);
  span(body, 6, 17, hy + 1, h.mid);
  span(body, 6, 17, hy + 2, h.mid);

  span(body, 9, 13, hy + 0, h.hi);
  px(body, 8, hy + 1, h.hi);
  px(body, 14, hy + 1, h.hi);

  rect(body, 6, hy + 2, 1, 5, h.mid);
  px(body, 6, hy + 6, h.sh);
  rect(body, 17, hy + 2, 1, 5, h.mid);
  px(body, 17, hy + 6, h.sh);

  span(detail, 8, 15, hy + 3, pal.skin.sh);

  switch (pal.hairStyle) {
    case 'long_layered':
      span(body, 7, 10, hy + 3, h.mid);
      px(body, 8, hy + 3, h.hi);
      px(body, 10, hy + 4, h.sh);
      span(body, 13, 16, hy + 3, h.mid);
      px(body, 14, hy + 3, h.hi);
      px(body, 15, hy + 4, h.sh);
      px(body, 7, hy + 4, h.mid);
      px(body, 16, hy + 4, h.mid);
      px(body, 11, hy - 2, h.hi);
      px(body, 12, hy - 2, h.mid);
      break;
    case 'parted': {
      const sideX = flip ? 12 : 8;
      span(body, sideX, sideX + 3, hy + 3, h.mid);
      px(body, flip ? 11 : 12, hy + 2, h.sh);
      px(body, flip ? 15 : 8, hy + 3, h.sh);
      px(body, flip ? 7 : 16, hy + 3, h.mid);
      if (pal.tail === 'bun') {
        span(body, 10, 13, hy - 2, h.mid);
        span(body, 11, 12, hy - 2, h.hi);
      }
      break;
    }
    case 'tousled':
      px(body, 7, hy + 3, h.mid);
      px(body, 9, hy + 3, h.hi);
      px(body, 11, hy + 3, h.mid);
      px(body, 13, hy + 3, h.hi);
      px(body, 16, hy + 3, h.sh);
      if (pal.tail === 'ahoge') {
        px(body, 11, hy - 2, h.hi);
        px(body, 12, hy - 3, h.mid);
      } else {
        px(body, 9, hy - 2, h.hi);
        px(body, 14, hy - 2, h.mid);
      }
      break;
    case 'scholarly':
      rect(body, 6, hy + 3, 2, 5, h.mid);
      rect(body, 16, hy + 3, 2, 5, h.mid);
      px(body, 6, hy + 7, h.sh);
      px(body, 17, hy + 7, h.sh);
      px(body, 9, hy + 3, h.hi);
      px(body, 14, hy + 3, h.hi);
      break;
    case 'wavy':
      rect(body, 5, hy + 3, 2, 8, h.mid);
      rect(body, 17, hy + 3, 2, 8, h.mid);
      px(body, 5, hy + 5, h.hi);
      px(body, 18, hy + 6, h.hi);
      px(body, 5, hy + 10, h.sh);
      px(body, 18, hy + 10, h.sh);
      span(body, 7, 10, hy + 3, h.mid);
      px(body, 14, hy + 3, h.hi);
      px(body, 15, hy + 3, h.mid);
      break;
    case 'cropped':
      span(body, 8, 15, hy + 2, h.sh);
      px(body, 10, hy + 3, h.mid);
      px(body, 13, hy + 3, h.mid);
      break;
    case 'swept_silver':
      px(body, 10, hy - 2, h.hi);
      px(body, 12, hy - 2, h.streak ?? h.hi);
      px(body, 13, hy - 1, h.streak ?? h.hi);
      span(body, flip ? 11 : 8, flip ? 15 : 12, hy + 2, h.streak ?? h.hi);
      px(body, flip ? 13 : 10, hy + 3, h.streak ?? h.hi);
      px(body, flip ? 14 : 9, hy + 3, h.mid);
      break;
    case 'spiky':
      px(body, 8, hy - 2, h.hi);
      px(body, 11, hy - 2, h.mid);
      px(body, 14, hy - 2, h.hi);
      px(body, 7, hy + 3, h.mid);
      px(body, 11, hy + 3, h.hi);
      px(body, 16, hy + 3, h.mid);
      break;
    case 'dual_tone':
      if (flip) {
        rect(body, 15, hy + 1, 2, 5, h.streak ?? h.hi);
        px(body, 14, hy + 0, h.streak ?? h.hi);
        px(body, 8, hy + 3, h.mid);
      } else {
        rect(body, 7, hy + 1, 2, 5, h.streak ?? h.hi);
        px(body, 8, hy + 0, h.streak ?? h.hi);
        px(body, 15, hy + 3, h.mid);
      }
      break;
  }

  if (pal.hat === 'beret') {
    const b = pal.accent;
    const tilt = flip ? -1 : 0;
    span(body, 7 + tilt, 14 + tilt, hy - 3, b.hi);
    span(body, 6 + tilt, 16 + tilt, hy - 2, b.hi);
    span(body, 5 + tilt, 16 + tilt, hy - 1, b.mid);
    span(body, 6 + tilt, 15 + tilt, hy + 0, b.sh);
    px(body, 10 + tilt, hy - 4, b.sh);
  } else if (pal.hat === 'visor_cap') {
    const c = pal.top;
    span(body, 8, 15, hy - 2, c.hi);
    span(body, 7, 16, hy - 1, c.mid);
    span(body, 7, 16, hy + 0, c.mid);
    span(body, 6, 17, hy + 1, c.sh);
    span(body, 7, 16, hy + 1, c.mid);
    px(body, 11, hy - 1, pal.accent.hi);
    px(body, 12, hy - 1, pal.accent.mid);
  } else if (pal.hat === 'backwards_cap') {
    const c = pal.top;
    const trim = pal.inner;
    span(body, 8, 15, hy - 2, c.hi);
    span(body, 7, 16, hy - 1, c.mid);
    span(body, 7, 16, hy + 0, c.mid);
    span(body, 9, 14, hy + 1, trim.hi);
    span(body, 10, 13, hy + 1, pal.skin.mid);
  } else if (pal.hat === 'cyber_goggles') {
    const g = pal.accent;
    span(body, 6, 17, hy + 0, '#27243d');
    span(body, 6, 17, hy + 1, '#1d1a2e');
    rect(body, 7, hy + 0, 4, 2, g.mid);
    px(body, 8, hy + 0, g.hi);
    px(body, 7, hy + 1, g.sh);
    rect(body, 13, hy + 0, 4, 2, g.mid);
    px(body, 14, hy + 0, g.hi);
    px(body, 13, hy + 1, g.sh);
  }

  if (pal.accessory === 'coordinator') {
    rect(body, 5, hy + 5, 2, 3, '#272c3b');
    px(detail, 5, hy + 6, pal.accent.hi);
    px(detail, 6, hy + 8, '#414a5e');
    px(detail, 7, hy + 8, '#54ebff');
  } else if (pal.accessory === 'headphones' && pal.headphonesWorn) {
    span(body, 7, 16, hy - 1, '#2d3447');
    px(body, 6, hy + 0, '#3e475e');
    px(body, 17, hy + 0, '#3e475e');
    rect(body, 5, hy + 4, 2, 4, '#293042');
    rect(body, 17, hy + 4, 2, 4, '#293042');
    px(detail, 5, hy + 5, pal.top.hi);
    px(detail, 18, hy + 5, pal.top.hi);
  } else if (pal.accessory === 'antenna') {
    px(body, 17, hy + 3, '#2d3347');
    px(body, 17, hy + 2, '#a7b4cf');
    px(body, 17, hy + 1, '#a7b4cf');
    px(body, 17, hy + 0, expr.blink ? pal.accent.hi : pal.alertLed ?? '#ff5252');
  }

  if (screenGlow) {
    px(detail, 9, hy + 1, '#9ef3ff');
    px(detail, 14, hy + 1, '#9ef3ff');
  }
}

function drawBackHairAndHat(
  body: PixelGrid,
  detail: PixelGrid,
  pal: CharacterPalette,
  hy: number,
  expr: HeadExpr
): void {
  const h = pal.hair;
  span(body, 8, 15, hy - 1, h.hi);
  span(body, 7, 16, hy + 0, h.hi);
  span(body, 6, 17, hy + 1, h.mid);
  rect(body, 6, hy + 2, 12, 7, h.mid);
  span(body, 7, 16, hy + 9, h.sh);
  px(body, 9, hy + 3, h.hi);
  px(body, 14, hy + 3, h.hi);
  px(body, 11, hy + 4, h.hi);
  px(body, 8, hy + 7, h.sh);
  px(body, 15, hy + 7, h.sh);
  span(body, 8, 15, hy + 8, h.sh);

  if (pal.hairStyle === 'long_layered') {
    px(body, 11, hy - 2, h.hi);
    px(body, 12, hy - 2, h.mid);
    px(body, 7, hy + 5, h.hi);
    px(body, 16, hy + 5, h.sh);
    span(body, 8, 15, hy + 9, h.sh);
  } else if (pal.hairStyle === 'tousled') {
    px(body, 9, hy - 2, h.hi);
    px(body, 14, hy - 2, h.mid);
  } else if (pal.tail === 'low_bun' || pal.tail === 'bun') {
    span(body, 10, 13, hy + 9, h.sh);
    span(body, 10, 13, hy + 10, h.mid);
    span(body, 11, 12, hy + 9, h.hi);
  } else if (pal.tail === 'ponytail') {
    rect(body, 10, hy + 6, 4, 6, h.mid);
    span(body, 11, 12, hy + 6, pal.accent ? pal.accent.mid : h.hi);
    span(body, 11, 12, hy + 11, h.sh);
  } else if (pal.hairStyle === 'wavy') {
    rect(body, 5, hy + 4, 2, 8, h.mid);
    rect(body, 17, hy + 4, 2, 8, h.mid);
    span(body, 6, 17, hy + 10, h.sh);
  } else if (pal.hairStyle === 'swept_silver') {
    px(body, 10, hy - 2, h.hi);
    px(body, 12, hy - 2, h.streak ?? h.hi);
    px(body, 11, hy + 2, h.streak ?? h.hi);
    px(body, 12, hy + 3, h.streak ?? h.hi);
    px(body, 13, hy + 4, h.streak ?? h.hi);
  } else if (pal.hairStyle === 'spiky') {
    px(body, 8, hy - 2, h.hi);
    px(body, 11, hy - 2, h.mid);
    px(body, 14, hy - 2, h.hi);
  } else if (pal.hairStyle === 'dual_tone') {
    rect(body, 8, hy + 1, 2, 7, h.streak ?? h.hi);
    px(body, 9, hy + 0, h.streak ?? h.hi);
  }

  if (pal.hat === 'beret') {
    const b = pal.accent;
    span(body, 7, 15, hy - 3, b.hi);
    span(body, 6, 16, hy - 2, b.mid);
    span(body, 6, 16, hy - 1, b.mid);
    span(body, 7, 15, hy + 0, b.sh);
    px(body, 11, hy - 4, b.sh);
  } else if (pal.hat === 'visor_cap') {
    const c = pal.top;
    span(body, 8, 15, hy - 2, c.hi);
    span(body, 7, 16, hy - 1, c.mid);
    span(body, 7, 16, hy + 0, c.mid);
    span(body, 9, 14, hy + 1, c.sh);
  } else if (pal.hat === 'backwards_cap') {
    const c = pal.top;
    const trim = pal.inner;
    span(body, 8, 15, hy - 2, c.hi);
    span(body, 7, 16, hy - 1, c.mid);
    span(body, 7, 16, hy + 0, c.mid);
    span(body, 8, 15, hy + 1, trim.hi);
    span(body, 7, 16, hy + 2, trim.mid);
  } else if (pal.hat === 'cyber_goggles') {
    span(body, 6, 17, hy + 0, '#27243d');
    span(body, 6, 17, hy + 1, '#1d1a2e');
  }

  if (pal.accessory === 'coordinator') {
    rect(body, 5, hy + 5, 2, 3, '#272c3b');
    px(detail, 5, hy + 6, pal.accent.hi);
  } else if (pal.accessory === 'headphones' && pal.headphonesWorn) {
    span(body, 7, 16, hy - 1, '#2d3447');
    rect(body, 5, hy + 4, 2, 4, '#293042');
    rect(body, 17, hy + 4, 2, 4, '#293042');
    px(detail, 5, hy + 5, pal.top.hi);
    px(detail, 18, hy + 5, pal.top.hi);
  } else if (pal.accessory === 'antenna') {
    px(body, 17, hy + 3, '#2d3347');
    px(body, 17, hy + 2, '#a7b4cf');
    px(body, 17, hy + 1, '#a7b4cf');
    px(body, 17, hy + 0, expr.blink ? pal.accent.hi : pal.alertLed ?? '#ff5252');
  }

  if (expr.screenGlow) {
    span(detail, 8, 15, hy - 1, '#9cf3ff');
    px(detail, 7, hy + 0, '#72dcf2');
    px(detail, 16, hy + 0, '#72dcf2');
  }
}

function drawFrontFaceDetails(
  detail: PixelGrid,
  pal: CharacterPalette,
  hy: number,
  expr: HeadExpr
): void {
  const eyeY = hy + 5;
  const browY = hy + 4;
  const browCol = pal.hair.sh;
  const eye = pal.eye;

  px(detail, 7, hy + 7, pal.skin.blush);
  px(detail, 16, hy + 7, pal.skin.blush);

  if (expr.surprised) {
    span(detail, 8, 9, browY - 1, browCol);
    span(detail, 14, 15, browY - 1, browCol);
  } else if (expr.glanceUp) {
    span(detail, 8, 9, browY, browCol);
    span(detail, 14, 15, browY - 1, browCol);
  } else if (expr.sleep) {
    span(detail, 8, 9, browY + 1, browCol);
    span(detail, 14, 15, browY + 1, browCol);
  } else {
    span(detail, 8, 9, browY, browCol);
    span(detail, 14, 15, browY, browCol);
  }

  if (expr.sleep) {
    span(detail, 8, 9, eyeY + 1, '#2b2230');
    span(detail, 14, 15, eyeY + 1, '#2b2230');
  } else if (expr.blink) {
    span(detail, 8, 9, eyeY + 1, '#261e2e');
    span(detail, 14, 15, eyeY + 1, '#261e2e');
  } else if (expr.surprised) {
    rect(detail, 8, eyeY, 2, 2, '#fffdf7');
    rect(detail, 14, eyeY, 2, 2, '#fffdf7');
    px(detail, 9, eyeY + 1, eye.dark);
    px(detail, 14, eyeY + 1, eye.dark);
  } else if (expr.glanceUp) {
    px(detail, 8, eyeY, '#fff9eb');
    px(detail, 9, eyeY, eye.hi);
    px(detail, 8, eyeY + 1, '#dce5f5');
    px(detail, 9, eyeY + 1, eye.mid);

    px(detail, 14, eyeY, '#fff9eb');
    px(detail, 15, eyeY, eye.hi);
    px(detail, 14, eyeY + 1, '#dce5f5');
    px(detail, 15, eyeY + 1, eye.mid);
  } else {
    px(detail, 8, eyeY, '#fff9eb');
    px(detail, 9, eyeY, eye.hi);
    px(detail, 8, eyeY + 1, eye.mid);
    px(detail, 9, eyeY + 1, eye.dark);

    px(detail, 14, eyeY, '#fff9eb');
    px(detail, 15, eyeY, eye.hi);
    px(detail, 14, eyeY + 1, eye.mid);
    px(detail, 15, eyeY + 1, eye.dark);
  }

  const mouthY = hy + 8;
  if (expr.surprised) {
    span(detail, 11, 12, mouthY, '#5e2729');
    span(detail, 11, 12, mouthY + 1, '#3b1518');
  } else if (expr.mouth === 'wide') {
    span(detail, 10, 13, mouthY, '#662b2d');
    span(detail, 11, 12, mouthY + 1, '#f7d8d0');
  } else if (expr.mouth === 'open') {
    span(detail, 11, 12, mouthY, '#662b2d');
    px(detail, 11, mouthY + 1, '#d97e73');
  } else if (expr.sleep) {
    px(detail, 11, mouthY, pal.skin.sh);
  } else if (pal.accessory === 'coordinator' || pal.accessory === 'long_hoodie') {
    px(detail, 10, mouthY, pal.skin.sh);
    span(detail, 11, 12, mouthY, '#9c4e44');
    px(detail, 13, mouthY, pal.skin.sh);
  } else {
    span(detail, 11, 12, mouthY, pal.skin.sh);
  }

  if (pal.glasses === 'long_rect') {
    const f = '#262e42';
    const low = '#4c5a78';
    span(detail, 7, 10, eyeY - 1, f);
    span(detail, 7, 10, eyeY + 2, low);
    px(detail, 7, eyeY, f);
    px(detail, 7, eyeY + 1, f);
    px(detail, 10, eyeY, f);
    px(detail, 10, eyeY + 1, f);
    span(detail, 11, 12, eyeY, f);
    span(detail, 13, 16, eyeY - 1, f);
    span(detail, 13, 16, eyeY + 2, low);
    px(detail, 13, eyeY, f);
    px(detail, 13, eyeY + 1, f);
    px(detail, 16, eyeY, f);
    px(detail, 16, eyeY + 1, f);
    px(detail, 8, eyeY, '#bceeff');
    px(detail, 14, eyeY, '#bceeff');
  } else if (pal.glasses === 'rect') {
    const f = '#232a3b';
    span(detail, 7, 10, eyeY - 1, f);
    span(detail, 7, 10, eyeY + 2, f);
    px(detail, 7, eyeY, f);
    px(detail, 7, eyeY + 1, f);
    px(detail, 10, eyeY, f);
    px(detail, 10, eyeY + 1, f);
    span(detail, 11, 12, eyeY, f);
    span(detail, 13, 16, eyeY - 1, f);
    span(detail, 13, 16, eyeY + 2, f);
    px(detail, 13, eyeY, f);
    px(detail, 13, eyeY + 1, f);
    px(detail, 16, eyeY, f);
    px(detail, 16, eyeY + 1, f);
    px(detail, 8, eyeY, '#b5f3ff');
    px(detail, 14, eyeY, '#b5f3ff');
  } else if (pal.glasses === 'round') {
    const f = '#b58436';
    span(detail, 8, 9, eyeY - 1, f);
    span(detail, 8, 9, eyeY + 2, f);
    px(detail, 7, eyeY, f);
    px(detail, 7, eyeY + 1, f);
    px(detail, 10, eyeY, f);
    px(detail, 10, eyeY + 1, f);
    span(detail, 11, 12, eyeY, f);
    span(detail, 14, 15, eyeY - 1, f);
    span(detail, 14, 15, eyeY + 2, f);
    px(detail, 13, eyeY, f);
    px(detail, 13, eyeY + 1, f);
    px(detail, 16, eyeY, f);
    px(detail, 16, eyeY + 1, f);
    px(detail, 8, eyeY, '#fff5d1');
    px(detail, 14, eyeY, '#fff5d1');
  } else if (pal.glasses === 'monocle') {
    const f = pal.accent.mid;
    span(detail, 14, 15, eyeY - 1, f);
    span(detail, 14, 15, eyeY + 2, f);
    px(detail, 13, eyeY, f);
    px(detail, 13, eyeY + 1, f);
    px(detail, 16, eyeY, f);
    px(detail, 16, eyeY + 1, f);
    px(detail, 15, eyeY, '#9cf8ff');
    px(detail, 16, eyeY + 3, pal.accent.sh);
  } else if (pal.glasses === 'visor') {
    const v = pal.accent;
    span(detail, 7, 16, eyeY, v.hi);
    span(detail, 7, 16, eyeY + 1, v.mid);
    px(detail, 8, eyeY, '#ebffff');
    px(detail, 9, eyeY, '#ebffff');
    px(detail, 14, eyeY, '#ebffff');
    px(detail, 16, eyeY + 1, v.sh);
  }
}

function drawSculptedHeadFrontBack(
  body: PixelGrid,
  detail: PixelGrid,
  pal: CharacterPalette,
  dir: CharacterDir,
  hy: number,
  expr: HeadExpr
): void {
  const s = pal.skin;
  const isUp = dir === 'up';

  span(body, 8, 15, hy + 0, s.hi);
  span(body, 7, 16, hy + 1, s.hi);
  span(body, 6, 17, hy + 2, s.mid);
  span(body, 6, 17, hy + 3, s.mid);
  span(body, 6, 17, hy + 4, s.mid);
  span(body, 6, 17, hy + 5, s.mid);
  span(body, 6, 17, hy + 6, s.mid);
  span(body, 7, 16, hy + 7, s.mid);
  span(body, 8, 15, hy + 8, s.mid);
  span(body, 9, 14, hy + 9, s.sh);

  if (!isUp) {
    px(body, 6, hy + 5, s.sh);
    px(body, 6, hy + 6, s.sh);
    px(body, 17, hy + 5, s.sh);
    px(body, 17, hy + 6, s.sh);
    px(body, 7, hy + 7, s.sh);
    px(body, 16, hy + 7, s.sh);
    px(body, 8, hy + 8, s.sh);
    px(body, 15, hy + 8, s.sh);
    span(body, 10, 13, hy + 9, s.mid);
    span(body, 9, 14, hy + 2, s.hi);
  }

  px(body, 5, hy + 5, s.mid);
  px(body, 5, hy + 6, s.sh);
  px(body, 18, hy + 5, s.mid);
  px(body, 18, hy + 6, s.sh);

  if (isUp) {
    drawBackHairAndHat(body, detail, pal, hy, expr);
    return;
  }

  drawFrontHairAndHat(body, detail, pal, hy, expr);
  drawFrontFaceDetails(detail, pal, hy, expr);
}

function drawTorsoFrontBack(
  body: PixelGrid,
  detail: PixelGrid,
  pal: CharacterPalette,
  archetype: CharacterArchetype,
  dir: CharacterDir,
  ty: number,
  screenGlow: boolean
): void {
  const isUp = dir === 'up';
  const t = pal.top;
  const inner = pal.inner;
  const acc = pal.accent;

  span(body, 10, 13, ty - 1, pal.skin.sh);

  span(body, 8, 15, ty + 0, t.hi);
  span(body, 7, 16, ty + 1, t.mid);
  span(body, 7, 16, ty + 2, t.mid);
  span(body, 7, 16, ty + 3, t.mid);
  span(body, 7, 16, ty + 4, t.mid);
  span(body, 8, 15, ty + 5, t.mid);
  span(body, 8, 15, ty + 6, t.sh);
  span(body, 7, 16, ty + 7, t.sh);

  for (let row = 1; row <= 4; row += 1) {
    px(body, 7, ty + row, t.hi);
    px(body, 16, ty + row, t.sh);
  }
  px(body, 8, ty + 5, t.hi);
  px(body, 15, ty + 5, t.sh);

  if (isUp) {
    if (pal.accessory === 'long_hoodie') {
      const tee = pal.tee ?? pal.accent;
      span(detail, 9, 14, ty + 0, inner.hi);
      span(detail, 8, 15, ty + 1, inner.mid);
      span(detail, 9, 14, ty + 2, inner.sh);
      span(detail, 8, 15, ty + 7, tee.mid);
      span(detail, 9, 14, ty + 7, tee.hi);
    } else if (archetype === 'engineer') {
      span(detail, 9, 14, ty + 0, inner.hi);
      span(detail, 8, 15, ty + 1, inner.mid);
      span(detail, 9, 14, ty + 2, inner.sh);
      if (!pal.headphonesWorn) {
        rect(body, 6, ty + 0, 2, 2, '#293042');
        rect(body, 16, ty + 0, 2, 2, '#293042');
      }
    } else if (archetype === 'researcher') {
      px(detail, 8, ty + 1, acc.mid);
      px(detail, 9, ty + 2, acc.mid);
      px(detail, 10, ty + 3, acc.mid);
      px(detail, 11, ty + 4, acc.mid);
      rect(body, 13, ty + 4, 4, 4, acc.mid);
      span(detail, 13, 16, ty + 4, acc.hi);
      px(detail, 15, ty + 5, '#fff8e0');
      px(detail, 14, ty + 6, '#e8c468');
    } else if (archetype === 'designer') {
      span(detail, 8, 15, ty + 0, inner.hi);
      span(detail, 9, 14, ty + 1, inner.mid);
      rect(detail, 13, ty + 2, 2, 3, inner.sh);
      px(detail, 14, ty + 5, inner.hi);
    } else if (archetype === 'monitor') {
      span(detail, 9, 14, ty + 0, inner.hi);
      span(detail, 7, 16, ty + 7, inner.mid);
    } else if (archetype === 'specialist') {
      rect(detail, 11, ty + 1, 2, 5, inner.sh);
      px(detail, 11, ty + 2, inner.hi);
      px(detail, 12, ty + 2, inner.hi);
    }
    if (screenGlow) {
      px(detail, 8, ty + 0, '#9cf3ff');
      px(detail, 15, ty + 0, '#9cf3ff');
    }
    return;
  }

  if (pal.accessory === 'long_hoodie') {
    const tee = pal.tee ?? pal.accent;
    span(detail, 9, 14, ty + 0, inner.mid);
    span(detail, 10, 13, ty + 0, tee.hi);
    span(detail, 10, 13, ty + 1, tee.mid);
    span(detail, 11, 12, ty + 2, tee.sh);
    px(detail, 11, ty + 3, '#cbd5e1');
    px(detail, 12, ty + 3, '#94a3b8');
    px(detail, 11, ty + 4, '#94a3b8');
    px(detail, 12, ty + 4, '#64748b');
    rect(detail, 9, ty + 5, 6, 2, inner.mid);
    span(detail, 10, 13, ty + 5, inner.hi);
    span(detail, 8, 15, ty + 7, tee.mid);
    span(detail, 9, 14, ty + 7, tee.hi);
    return;
  }

  switch (archetype) {
    case 'coordinator':
      span(detail, 10, 13, ty + 0, inner.hi);
      span(detail, 11, 12, ty + 1, inner.mid);
      span(detail, 11, 12, ty + 2, inner.sh);
      px(detail, 11, ty + 0, pal.tie ?? '#d13d53');
      px(detail, 11, ty + 1, pal.tie ?? '#d13d53');
      px(detail, 12, ty + 2, pal.tie ?? '#d13d53');
      px(detail, 11, ty + 3, pal.tie ?? '#d13d53');
      px(detail, 9, ty + 1, t.hi);
      px(detail, 14, ty + 1, t.sh);
      px(detail, 14, ty + 2, acc.hi);
      px(detail, 14, ty + 3, acc.mid);
      span(detail, 8, 15, ty + 6, t.sh);
      break;

    case 'engineer':
      span(detail, 9, 14, ty + 0, inner.mid);
      rect(detail, 9, ty + 5, 6, 2, inner.mid);
      span(detail, 10, 13, ty + 5, inner.hi);
      px(detail, 10, ty + 1, acc.hi);
      px(detail, 10, ty + 2, acc.mid);
      px(detail, 13, ty + 1, acc.hi);
      px(detail, 13, ty + 2, acc.mid);
      if (!pal.headphonesWorn) {
        rect(body, 6, ty - 1, 2, 3, '#293042');
        rect(body, 16, ty - 1, 2, 3, '#293042');
        px(detail, 6, ty + 0, t.hi);
        px(detail, 17, ty + 0, t.hi);
      }
      break;

    case 'researcher':
      span(detail, 10, 13, ty + 0, inner.hi);
      span(detail, 11, 12, ty + 1, inner.mid);
      px(detail, 11, ty + 3, t.sh);
      px(detail, 11, ty + 5, t.sh);
      px(detail, 15, ty + 1, acc.mid);
      px(detail, 14, ty + 2, acc.mid);
      px(detail, 13, ty + 3, acc.mid);
      px(detail, 12, ty + 4, acc.mid);
      px(detail, 11, ty + 5, acc.mid);
      rect(body, 6, ty + 4, 3, 4, acc.mid);
      span(detail, 6, 8, ty + 4, acc.hi);
      px(detail, 7, ty + 5, '#fff7de');
      break;

    case 'designer':
      span(detail, 8, 15, ty + 0, inner.hi);
      span(detail, 8, 15, ty + 1, inner.mid);
      rect(detail, 8, ty + 2, 2, 4, inner.mid);
      px(detail, 8, ty + 5, inner.hi);
      px(detail, 9, ty + 6, inner.sh);
      px(detail, 12, ty + 3, t.hi);
      px(detail, 14, ty + 4, t.hi);
      span(detail, 8, 15, ty + 7, t.sh);
      break;

    case 'verifier':
      rect(detail, 10, ty + 0, 4, 6, inner.mid);
      px(detail, 11, ty + 1, inner.hi);
      rect(detail, 8, ty + 4, 2, 2, t.sh);
      rect(detail, 14, ty + 4, 2, 2, t.sh);
      rect(detail, 13, ty + 2, 3, 3, '#f0f5fc');
      px(detail, 14, ty + 1, acc.hi);
      px(detail, 14, ty + 3, '#22c55e');
      break;

    case 'architect':
      span(detail, 9, 14, ty - 1, t.mid);
      span(detail, 10, 13, ty - 1, t.hi);
      rect(detail, 11, ty + 1, 2, 6, inner.sh);
      rect(body, 15, ty + 2, 3, 4, '#242938');
      rect(detail, 15, ty + 3, 2, 2, acc.mid);
      px(detail, 15, ty + 3, acc.hi);
      px(detail, 16, ty + 2, '#e8fbff');
      break;

    case 'monitor':
      span(detail, 9, 14, ty + 0, inner.hi);
      span(detail, 7, 16, ty + 3, inner.mid);
      span(detail, 8, 11, ty + 3, inner.hi);
      span(detail, 7, 16, ty + 7, inner.sh);
      rect(detail, 11, ty + 1, 2, 6, '#dce3f0');
      break;

    case 'specialist':
      rect(detail, 8, ty + 0, 2, 2, inner.mid);
      rect(detail, 14, ty + 0, 2, 2, inner.mid);
      px(detail, 8, ty + 0, inner.hi);
      px(detail, 15, ty + 0, inner.hi);
      rect(detail, 11, ty + 2, 2, 2, inner.hi);
      px(detail, 11, ty + 4, inner.mid);
      px(detail, 8, ty + 6, inner.mid);
      px(detail, 15, ty + 6, inner.mid);
      break;
  }
}

function drawLegsFrontBack(
  body: PixelGrid,
  detail: PixelGrid,
  pal: CharacterPalette,
  dir: CharacterDir,
  state: CharacterAnimState,
  frame: number,
  by: number,
  archetype: CharacterArchetype
): void {
  const p = pal.pants;
  const s = pal.shoes;
  const hipY = 24 + by;
  const hasSneakerStripe = archetype === 'engineer' || pal.accessory === 'long_hoodie';

  if (state === 'work' || state === 'rest_sit' || state === 'rest_sleep') {
    const sy = state === 'rest_sleep' ? 24 + Math.min(1, by) : 25;
    span(body, 8, 15, sy, p.mid);
    span(body, 8, 10, sy, p.hi);
    px(detail, 11, sy, p.sh);
    px(detail, 12, sy, p.sh);
    rect(body, 7, sy + 1, 4, 2, p.mid);
    rect(body, 13, sy + 1, 4, 2, p.mid);
    rect(body, 7, sy + 2, 4, 2, s.mid);
    rect(body, 13, sy + 2, 4, 2, s.mid);
    px(detail, 8, sy + 2, s.hi);
    px(detail, 14, sy + 2, s.hi);
    span(detail, 7, 10, sy + 3, s.sh);
    span(detail, 13, 16, sy + 3, s.sh);
    return;
  }

  span(body, 8, 15, hipY, p.mid);
  px(detail, 11, hipY, p.sh);
  px(detail, 12, hipY, p.sh);

  let lOff = 0;
  let rOff = 0;
  if (state === 'walk') {
    if (frame === 0) {
      lOff = 0;
      rOff = -1;
    } else if (frame === 2) {
      lOff = -1;
      rOff = 0;
    }
  }

  rect(body, 8, hipY + 1, 3, 2 + lOff, p.mid);
  px(detail, 8, hipY + 1, p.hi);
  px(detail, 10, hipY + 1, p.sh);
  rect(body, 7, hipY + 3 + lOff, 4, 2, s.mid);
  px(detail, 8, hipY + 3 + lOff, s.hi);
  if (hasSneakerStripe) px(detail, 7, hipY + 4 + lOff, pal.accent.hi);
  span(detail, 7, 10, hipY + 4 + lOff, dir === 'up' && lOff < 0 ? '#181426' : s.sh);

  rect(body, 13, hipY + 1, 3, 2 + rOff, p.mid);
  px(detail, 13, hipY + 1, p.sh);
  px(detail, 15, hipY + 1, p.hi);
  rect(body, 13, hipY + 3 + rOff, 4, 2, s.mid);
  px(detail, 14, hipY + 3 + rOff, s.hi);
  if (hasSneakerStripe) px(detail, 16, hipY + 4 + rOff, pal.accent.hi);
  span(detail, 13, 16, hipY + 4 + rOff, dir === 'up' && rOff < 0 ? '#181426' : s.sh);
}

function drawArmsFrontBack(
  body: PixelGrid,
  detail: PixelGrid,
  pal: CharacterPalette,
  archetype: CharacterArchetype,
  dir: CharacterDir,
  state: CharacterAnimState,
  frame: number,
  ty: number
): void {
  const sleeve = archetype === 'engineer' || pal.accessory === 'long_hoodie' ? pal.inner : pal.top;
  const skin = pal.skin;
  const cuff = archetype === 'monitor' ? pal.inner.mid : sleeve.sh;

  if (state === 'error') {
    const hitch = frame % 2 === 0 ? -1 : 0;
    rect(body, 4, ty - 1 + hitch, 2, 4, sleeve.mid);
    px(detail, 4, ty - 1 + hitch, sleeve.hi);
    rect(body, 4, ty - 2 + hitch, 2, 1, skin.mid);
    rect(body, 18, ty - 1 + hitch, 2, 4, sleeve.mid);
    px(detail, 19, ty - 1 + hitch, sleeve.sh);
    rect(body, 18, ty - 2 + hitch, 2, 1, skin.mid);
    return;
  }

  if (state === 'think' && dir === 'down') {
    rect(body, 5, ty + 1, 2, 4, sleeve.mid);
    span(body, 6, 8, ty + 4, sleeve.sh);
    px(body, 9, ty + 4, skin.mid);
    rect(body, 17, ty + 1, 2, 3, sleeve.mid);
    rect(body, 14, ty - 1, 3, 2, sleeve.hi);
    rect(body, 13, ty - 2, 2, 2, skin.mid);
    return;
  }

  if (state === 'rest_coffee' && dir === 'down') {
    rect(body, 5, ty + 1, 2, 4, sleeve.mid);
    px(detail, 5, ty + 1, sleeve.hi);
    px(detail, 5, ty + 4, cuff);
    rect(body, 5, ty + 5, 2, 1, skin.mid);
    const sip = frame === 2 ? -1 : 0;
    rect(body, 17, ty + 1, 2, 3, sleeve.mid);
    rect(body, 15, ty + 3 + sip, 2, 2, skin.mid);
    rect(body, 14, ty + 2 + sip, 3, 3, '#fbf6ed');
    span(detail, 14, 16, ty + 2 + sip, '#613c27');
    px(body, 17, ty + 3 + sip, '#e3dacb');
    px(detail, 14, ty + 4 + sip, '#cfc3b2');
    return;
  }

  if (state === 'talk' && dir === 'down') {
    rect(body, 5, ty + 1, 2, 4, sleeve.mid);
    px(detail, 5, ty + 4, cuff);
    rect(body, 5, ty + 5, 2, 1, skin.mid);
    const gest = frame === 1 || frame === 2 ? -1 : 0;
    rect(body, 17, ty + 1, 2, 3, sleeve.mid);
    rect(body, 18, ty - 1 + gest, 2, 3, sleeve.hi);
    rect(body, 18, ty - 2 + gest, 2, 1, skin.mid);
    return;
  }

  if (state === 'work') {
    const lTap = frame === 0 || frame === 1 ? -1 : 0;
    const rTap = frame === 2 || frame === 3 ? -1 : 0;
    if (dir === 'up') {
      rect(body, 5, ty + 1, 2, 3, sleeve.mid);
      rect(body, 5, ty + 0 + lTap, 2, 1, skin.mid);
      rect(body, 17, ty + 1, 2, 3, sleeve.mid);
      rect(body, 17, ty + 0 + rTap, 2, 1, skin.mid);
      px(detail, 5, ty + 0 + lTap, '#c2f7ff');
      px(detail, 18, ty + 0 + rTap, '#c2f7ff');
    } else {
      rect(body, 5, ty + 1, 2, 4, sleeve.mid);
      rect(body, 7, ty + 4 + lTap, 3, 2, sleeve.hi);
      rect(body, 9, ty + 4 + lTap, 2, 2, skin.mid);

      rect(body, 17, ty + 1, 2, 4, sleeve.mid);
      rect(body, 14, ty + 4 + rTap, 3, 2, sleeve.hi);
      rect(body, 13, ty + 4 + rTap, 2, 2, skin.mid);
    }
    return;
  }

  let lOff = 0;
  let rOff = 0;
  if (state === 'walk') {
    if (frame === 0) {
      lOff = 1;
      rOff = -1;
    } else if (frame === 2) {
      lOff = -1;
      rOff = 1;
    }
  }
  rect(body, 5, ty + 1 + lOff, 2, 4, sleeve.mid);
  px(detail, 5, ty + 1 + lOff, sleeve.hi);
  px(detail, 6, ty + 2 + lOff, sleeve.sh);
  px(detail, 5, ty + 4 + lOff, cuff);
  rect(body, 5, ty + 5 + lOff, 2, 1, skin.mid);

  rect(body, 17, ty + 1 + rOff, 2, 4, sleeve.mid);
  px(detail, 18, ty + 1 + rOff, sleeve.sh);
  px(detail, 17, ty + 2 + rOff, sleeve.sh);
  px(detail, 18, ty + 4 + rOff, cuff);
  rect(body, 17, ty + 5 + rOff, 2, 1, skin.mid);
}

function buildSideProfile(
  pal: CharacterPalette,
  archetype: CharacterArchetype,
  state: CharacterAnimState,
  frame: number,
  blink: boolean
): PixelGrid {
  const body = createGrid();
  const detail = createGrid();

  const walkBob = state === 'walk' && (frame === 1 || frame === 3) ? -1 : 0;
  const sitShift = state === 'work' || state === 'rest_sit' ? 1 : 0;
  const sleepShift = state === 'rest_sleep' ? (frame >= 2 ? 2 : 1) : 0;
  const workBob = state === 'work' && frame === 2 ? 1 : 0;
  const breath = (state === 'idle' || state === 'rest_sit') && frame === 2 ? 1 : 0;
  const by = walkBob + sitShift + sleepShift + workBob;
  const upperBy = by + (state === 'rest_sleep' || state === 'walk' ? 0 : breath);

  const hy = 5 + upperBy;
  const ty = 16 + upperBy;
  const screenGlow = state === 'work';

  const p = pal.pants;
  const s = pal.shoes;
  const hasSneakerStripe = archetype === 'engineer' || pal.accessory === 'long_hoodie';

  if (state === 'work' || state === 'rest_sit' || state === 'rest_sleep') {
    const sy = 25 + Math.min(1, sleepShift);
    span(body, 8, 14, sy, p.mid);
    span(body, 8, 11, sy, p.hi);
    rect(body, 7, sy + 1, 3, 2, p.sh);
    rect(body, 6, sy + 2, 4, 2, s.mid);
    px(detail, 6, sy + 2, s.hi);
    span(detail, 6, 9, sy + 3, s.sh);
  } else if (state === 'walk') {
    const hipY = 24 + walkBob;
    if (frame === 0) {
      span(body, 8, 14, hipY, p.mid);
      rect(body, 7, hipY + 1, 3, 3, p.sh);
      rect(body, 6, hipY + 4, 4, 1, s.sh);
      rect(body, 12, hipY + 1, 3, 3, p.mid);
      px(detail, 12, hipY + 1, p.hi);
      rect(body, 12, hipY + 4, 4, 1, s.mid);
      px(detail, 12, hipY + 4, s.hi);
      if (hasSneakerStripe) px(detail, 15, hipY + 4, pal.accent.hi);
    } else if (frame === 2) {
      span(body, 8, 14, hipY, p.mid);
      rect(body, 12, hipY + 1, 3, 3, p.sh);
      rect(body, 12, hipY + 4, 4, 1, s.sh);
      rect(body, 7, hipY + 1, 3, 3, p.hi);
      rect(body, 6, hipY + 4, 4, 1, s.mid);
      px(detail, 6, hipY + 4, s.hi);
      if (hasSneakerStripe) px(detail, 9, hipY + 4, pal.accent.hi);
    } else {
      rect(body, 10, hipY, 4, 3, p.mid);
      px(detail, 10, hipY + 1, p.hi);
      rect(body, 8, hipY + 3, 6, 2, s.mid);
      px(detail, 9, hipY + 3, s.hi);
      if (hasSneakerStripe) px(detail, 8, hipY + 4, pal.accent.hi);
      span(detail, 8, 13, hipY + 4, s.sh);
    }
  } else {
    const hipY = 24 + by;
    rect(body, 10, hipY, 4, 3, p.mid);
    px(detail, 10, hipY + 1, p.hi);
    px(detail, 13, hipY + 1, p.sh);
    rect(body, 8, hipY + 3, 6, 2, s.mid);
    px(detail, 9, hipY + 3, s.hi);
    if (hasSneakerStripe) px(detail, 8, hipY + 4, pal.accent.hi);
    span(detail, 8, 13, hipY + 4, s.sh);
  }

  const t = pal.top;
  span(body, 10, 12, ty - 1, pal.skin.sh);
  span(body, 9, 14, ty + 0, t.hi);
  rect(body, 8, ty + 1, 7, 5, t.mid);
  span(body, 9, 14, ty + 6, t.sh);
  span(body, 8, 15, ty + 7, t.sh);
  for (let row = 1; row <= 5; row += 1) {
    px(body, 8, ty + row, t.hi);
    px(body, 14, ty + row, t.sh);
  }

  if (pal.accessory === 'long_hoodie') {
    const tee = pal.tee ?? pal.accent;
    span(detail, 9, 14, ty + 0, pal.inner.mid);
    px(detail, 8, ty + 1, tee.hi);
    span(detail, 8, 15, ty + 7, tee.mid);
    span(detail, 9, 14, ty + 7, tee.hi);
  } else if (archetype === 'designer') {
    span(detail, 8, 14, ty + 0, pal.inner.hi);
    span(detail, 8, 14, ty + 1, pal.inner.mid);
    rect(detail, 13, ty + 2, 2, 3, pal.inner.sh);
  } else if (archetype === 'monitor') {
    span(detail, 9, 14, ty + 0, pal.inner.hi);
    span(detail, 8, 14, ty + 3, pal.inner.mid);
    span(detail, 8, 15, ty + 7, pal.inner.sh);
  } else if (archetype === 'researcher') {
    rect(body, 11, ty + 4, 4, 4, pal.accent.mid);
    span(detail, 11, 14, ty + 4, pal.accent.hi);
    px(detail, 12, ty + 5, '#fff7de');
  } else if (archetype === 'coordinator') {
    px(detail, 9, ty + 2, pal.accent.hi);
    px(detail, 8, ty + 1, pal.inner.hi);
    span(detail, 8, 15, ty + 7, t.sh);
  } else if (archetype === 'specialist') {
    rect(detail, 8, ty + 2, 2, 2, pal.inner.hi);
    rect(detail, 13, ty + 0, 2, 2, pal.inner.mid);
  } else if (archetype === 'architect') {
    span(detail, 9, 13, ty - 1, t.hi);
    rect(body, 10, ty + 3, 4, 4, '#242938');
    rect(detail, 10, ty + 4, 3, 2, pal.accent.mid);
    px(detail, 10, ty + 4, pal.accent.hi);
  } else if (archetype === 'verifier') {
    rect(detail, 8, ty + 2, 3, 3, '#f0f5fc');
    px(detail, 9, ty + 3, '#22c55e');
  }

  const sk = pal.skin;
  span(body, 9, 14, hy + 0, sk.hi);
  span(body, 8, 15, hy + 1, sk.hi);
  rect(body, 7, hy + 2, 9, 6, sk.mid);
  span(body, 8, 15, hy + 8, sk.mid);
  span(body, 9, 13, hy + 9, sk.sh);
  px(body, 6, hy + 6, sk.mid);
  px(detail, 10, hy + 7, sk.blush);
  px(detail, 12, hy + 5, sk.sh);

  const h = pal.hair;
  span(body, 9, 14, hy - 1, h.hi);
  span(body, 8, 15, hy + 0, h.hi);
  span(body, 7, 15, hy + 1, h.mid);
  span(body, 7, 10, hy + 2, h.mid);
  rect(body, 12, hy + 1, 4, 8, h.mid);
  rect(body, 14, hy + 2, 2, 7, h.sh);
  if (pal.hairStyle === 'long_layered') {
    px(body, 12, hy - 2, h.hi);
    px(body, 13, hy - 2, h.mid);
    px(body, 7, hy + 3, h.mid);
    px(body, 13, hy + 4, h.hi);
  } else if (pal.hairStyle === 'dual_tone' || pal.hairStyle === 'swept_silver') {
    rect(body, 10, hy + 1, 2, 3, h.streak ?? h.hi);
  }
  if (pal.tail === 'ponytail' || pal.tail === 'wavy_long') {
    rect(body, 16, hy + 5, 2, 5, h.mid);
    px(body, 17, hy + 9, h.sh);
  } else if (pal.tail === 'low_bun' || pal.tail === 'bun') {
    rect(body, 16, hy + 5, 2, 3, h.sh);
    px(body, 16, hy + 5, h.mid);
  } else if (pal.tail === 'ahoge') {
    px(body, 12, hy - 2, h.hi);
    px(body, 13, hy - 3, h.mid);
  }

  if (pal.hat === 'beret') {
    span(body, 8, 15, hy - 3, pal.accent.hi);
    span(body, 7, 16, hy - 2, pal.accent.mid);
    span(body, 7, 16, hy - 1, pal.accent.mid);
    span(body, 8, 15, hy + 0, pal.accent.sh);
    px(body, 12, hy - 4, pal.accent.sh);
  } else if (pal.hat === 'visor_cap') {
    span(body, 8, 15, hy - 2, pal.top.hi);
    span(body, 7, 16, hy - 1, pal.top.mid);
    span(body, 7, 16, hy + 0, pal.top.mid);
    span(body, 4, 9, hy + 1, pal.top.sh);
  } else if (pal.hat === 'backwards_cap') {
    span(body, 8, 15, hy - 2, pal.top.hi);
    span(body, 7, 16, hy - 1, pal.top.mid);
    span(body, 7, 16, hy + 0, pal.top.mid);
    span(body, 14, 18, hy + 1, pal.inner.hi);
    span(body, 14, 17, hy + 2, pal.inner.mid);
  } else if (pal.hat === 'cyber_goggles') {
    span(body, 7, 15, hy + 0, '#27243d');
    span(body, 7, 15, hy + 1, '#1d1a2e');
    rect(body, 7, hy + 0, 3, 2, pal.accent.mid);
    px(detail, 7, hy + 0, pal.accent.hi);
  }

  if (pal.accessory === 'antenna') {
    px(body, 14, hy + 3, '#2d3347');
    px(body, 14, hy + 1, '#a7b4cf');
    px(body, 14, hy + 2, '#a7b4cf');
    px(body, 14, hy + 0, blink ? pal.accent.hi : pal.alertLed ?? '#ff5252');
  } else if (pal.accessory === 'headphones') {
    if (pal.headphonesWorn) {
      rect(body, 11, hy + 3, 3, 4, '#293042');
      px(detail, 12, hy + 4, pal.top.hi);
    } else {
      rect(body, 11, hy + 9, 3, 3, '#293042');
      px(detail, 12, hy + 10, pal.top.hi);
    }
  } else if (pal.accessory === 'coordinator') {
    rect(body, 11, hy + 4, 2, 3, '#272c3b');
    px(detail, 8, hy + 7, '#54ebff');
  }

  const eyeY = hy + 5;
  span(detail, 8, 9, hy + 4, pal.hair.sh);
  if (state === 'rest_sleep' || blink) {
    span(detail, 8, 9, eyeY + 1, '#261e2e');
  } else if (state === 'error') {
    rect(detail, 8, eyeY, 2, 2, '#fffdf7');
    px(detail, 8, eyeY + 1, pal.eye.dark);
  } else {
    px(detail, 8, eyeY, '#fff9eb');
    px(detail, 9, eyeY, pal.eye.hi);
    px(detail, 8, eyeY + 1, pal.eye.mid);
    px(detail, 9, eyeY + 1, pal.eye.dark);
  }

  if (pal.glasses === 'long_rect') {
    const fc = '#262e42';
    span(detail, 7, 10, eyeY - 1, fc);
    span(detail, 8, 9, eyeY + 2, '#4c5a78');
    px(detail, 7, eyeY, fc);
    px(detail, 7, eyeY + 1, fc);
    px(detail, 10, eyeY, fc);
    px(detail, 10, eyeY + 1, fc);
    px(detail, 8, eyeY, '#bceeff');
  } else if (pal.glasses === 'rect' || pal.glasses === 'round') {
    const fc = pal.glasses === 'round' ? '#b58436' : '#232a3b';
    span(detail, 7, 10, eyeY - 1, fc);
    span(detail, 7, 10, eyeY + 2, fc);
    px(detail, 7, eyeY, fc);
    px(detail, 7, eyeY + 1, fc);
    px(detail, 10, eyeY, fc);
    px(detail, 10, eyeY + 1, fc);
  } else if (pal.glasses === 'visor') {
    span(detail, 7, 10, eyeY, pal.accent.hi);
    span(detail, 7, 10, eyeY + 1, pal.accent.mid);
    px(detail, 8, eyeY, '#ebffff');
  }

  if (screenGlow) {
    px(detail, 7, hy + 2, '#9cf3ff');
    px(detail, 6, hy + 6, '#b8f7ff');
  }

  const sleeve = archetype === 'engineer' || pal.accessory === 'long_hoodie' ? pal.inner : t;
  if (state === 'work') {
    const tap = frame % 2 === 0 ? -1 : 0;
    rect(body, 10, ty + 1, 3, 3, sleeve.hi);
    rect(body, 6, ty + 3 + tap, 5, 2, sleeve.mid);
    rect(body, 4, ty + 3 + tap, 2, 2, sk.mid);
    px(detail, 4, ty + 3 + tap, '#c2f7ff');
  } else if (state === 'rest_coffee') {
    const sip = frame === 2 ? -1 : 0;
    rect(body, 10, ty + 1, 2, 4, sleeve.hi);
    rect(body, 7, ty + 3 + sip, 3, 2, sk.mid);
    rect(body, 4, ty + 2 + sip, 3, 3, '#fbf6ed');
    span(detail, 4, 6, ty + 2 + sip, '#613c27');
  } else if (state === 'think') {
    rect(body, 10, ty + 1, 2, 3, sleeve.hi);
    rect(body, 7, ty - 1, 3, 2, sk.mid);
  } else if (state === 'error') {
    rect(body, 8, ty - 2, 3, 4, sleeve.hi);
    rect(body, 7, ty - 3, 2, 2, sk.mid);
  } else if (state === 'talk') {
    const gest = frame === 1 || frame === 2 ? -1 : 0;
    rect(body, 9, ty + 1, 3, 3, sleeve.hi);
    rect(body, 6, ty + 2 + gest, 3, 2, sk.mid);
  } else {
    let swing = 0;
    if (state === 'walk') {
      if (frame === 0) swing = -2;
      else if (frame === 2) swing = 2;
    }
    rect(body, 10 + swing, ty + 1, 3, 4, sleeve.hi);
    px(detail, 12 + swing, ty + 2, sleeve.sh);
    rect(body, 10 + swing, ty + 5, 2, 1, sk.mid);
  }

  const finalGrid = createGrid();
  applySeloutOutline(body, finalGrid);
  for (let i = 0; i < detail.length; i += 1) {
    if (detail[i]) finalGrid[i] = detail[i];
  }
  return finalGrid;
}

function drawParticles(grid: PixelGrid, state: CharacterAnimState, frame: number): void {
  if (state === 'rest_coffee') {
    const s1 = 'rgba(255, 255, 255, 0.90)';
    const s2 = 'rgba(210, 232, 250, 0.72)';
    const step = frame % 4;
    px(grid, 15 + (step % 2), 17 - step, s1);
    px(grid, 16 - (step % 2), 15 - step, s2);
    px(grid, 15 + ((step + 1) % 2), 13 - Math.floor(step / 2), s2);
  } else if (state === 'rest_sleep') {
    const rise = frame % 4;
    const zCol = '#ecf3ff';
    const zSh = '#3b4878';
    const zx = 16 + Math.floor(rise / 2);
    const zy = 6 - rise;
    if (zy >= 1) {
      px(grid, zx, zy, zCol);
      px(grid, zx + 1, zy, zCol);
      px(grid, zx + 1, zy + 1, zCol);
      px(grid, zx, zy + 2, zCol);
      px(grid, zx + 1, zy + 2, zCol);
      px(grid, zx + 2, zy + 2, zSh);
    }
    const Zx = 19;
    const Zy = 4 - ((rise + 2) % 4);
    span(grid, Zx, Zx + 2, Zy, zCol);
    px(grid, Zx + 1, Zy + 1, zCol);
    span(grid, Zx, Zx + 2, Zy + 2, zCol);
    px(grid, Zx + 3, Zy + 2, zSh);
  } else if (state === 'think') {
    const angle = frame % 4;
    const ox = [18, 20, 19, 17][angle];
    const oy = [2, 1, 0, 1][angle];
    const sparkCore = angle % 2 === 0 ? '#ffe566' : '#70f5ff';
    const sparkRim = angle % 2 === 0 ? '#ffab2e' : '#2bc8e8';
    px(grid, ox, oy, '#ffffff');
    px(grid, ox - 1, oy, sparkCore);
    px(grid, ox + 1, oy, sparkCore);
    px(grid, ox, oy - 1, sparkRim);
    px(grid, ox, oy + 1, sparkRim);
  } else if (state === 'error') {
    const flash = frame % 2 === 0;
    const fg = flash ? '#ff3b4e' : '#ffaa2b';
    const hi = flash ? '#ffd6db' : '#fff2ba';
    const dy = flash ? 0 : 1;
    rect(grid, 10, dy, 4, 4, OUTLINE_DARK);
    rect(grid, 10, dy + 4, 4, 2, OUTLINE_DARK);
    rect(grid, 11, dy, 2, 3, fg);
    px(grid, 11, dy, hi);
    rect(grid, 11, dy + 4, 2, 1, fg);
    const sy = 9 + (frame % 2);
    px(grid, 18, sy, '#3b7dd8');
    px(grid, 18, sy + 1, '#9ce8ff');
  } else if (state === 'talk') {
    if (frame === 1 || frame === 2) {
      px(grid, 20, 10, '#ffffff');
      px(grid, 21, 9, '#9ceeff');
      px(grid, 21, 11, '#9ceeff');
    }
  }
}

function buildSpriteGrid(
  archetype: CharacterArchetype,
  seed: number,
  state: CharacterAnimState,
  dir: CharacterDir,
  frame: number,
  isLong = false
): PixelGrid {
  const pal = getArchetypePalette(archetype, seed, isLong);
  const f = ((Math.floor(frame || 0) % 4) + 4) % 4;
  const st = normalizeState(state);
  const d = normalizeDir(dir);

  const blink =
    (st === 'idle' || st === 'rest_sit' || st === 'rest_coffee' || st === 'think') && f === 2;

  let finalGrid: PixelGrid;
  if (d === 'left' || d === 'right') {
    finalGrid = buildSideProfile(pal, archetype, st, f, blink);
    if (d === 'right') {
      finalGrid = mirrorHorizontal(finalGrid);
    }
  } else {
    const body = createGrid();
    const detail = createGrid();

    const walkBob = st === 'walk' && (f === 1 || f === 3) ? -1 : 0;
    const sitShift = st === 'work' || st === 'rest_sit' ? 1 : 0;
    const sleepShift = st === 'rest_sleep' ? (f >= 2 ? 2 : 1) : 0;
    const workBob = st === 'work' && f === 2 ? 1 : 0;
    const breath = (st === 'idle' || st === 'rest_sit') && f === 2 ? 1 : 0;

    const by = walkBob + sitShift + sleepShift + workBob;
    const upperBy = by + (st === 'rest_sleep' || st === 'walk' ? 0 : breath);

    drawLegsFrontBack(body, detail, pal, d, st, f, by, archetype);

    const ty = 16 + upperBy;
    drawTorsoFrontBack(body, detail, pal, archetype, d, ty, st === 'work');

    drawArmsFrontBack(body, detail, pal, archetype, d, st, f, ty);

    const hy = 5 + upperBy;
    const mouth: HeadExpr['mouth'] =
      st === 'talk'
        ? f === 2
          ? 'wide'
          : f === 1 || f === 3
            ? 'open'
            : 'closed'
        : 'closed';
    drawSculptedHeadFrontBack(body, detail, pal, d, hy, {
      blink,
      surprised: st === 'error',
      sleep: st === 'rest_sleep',
      glanceUp: st === 'think' && !blink,
      screenGlow: st === 'work',
      mouth,
    });

    finalGrid = createGrid();
    applySeloutOutline(body, finalGrid);
    for (let i = 0; i < detail.length; i += 1) {
      if (detail[i]) finalGrid[i] = detail[i];
    }
  }

  for (let sx = 7; sx <= 16; sx += 1) {
    if (!getPx(finalGrid, sx, 30)) px(finalGrid, sx, 30, SHADOW_GROUND_CORE);
  }
  for (let sx = 9; sx <= 14; sx += 1) {
    if (!getPx(finalGrid, sx, 31)) px(finalGrid, sx, 31, SHADOW_GROUND_SOFT);
  }

  drawParticles(finalGrid, st, f);

  return finalGrid;
}

function makeOffscreenCanvas(w: number, h: number): OffscreenSurface | null {
  if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
  }
  if (typeof OffscreenCanvas !== 'undefined') {
    return new OffscreenCanvas(w, h);
  }
  return null;
}

function renderGridToCanvas(grid: PixelGrid): OffscreenSurface | null {
  const canvas = makeOffscreenCanvas(SPRITE_W, SPRITE_H);
  if (!canvas) return null;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;
  if (!ctx) return null;
  ctx.imageSmoothingEnabled = false;
  for (let y = 0; y < SPRITE_H; y += 1) {
    for (let x = 0; x < SPRITE_W; x += 1) {
      const color = grid[y * SPRITE_W + x];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  return canvas;
}

function getCachedSpriteCanvas(
  archetype: CharacterArchetype,
  seed: number,
  state: CharacterAnimState,
  dir: CharacterDir,
  frame: number,
  isLong = false
): OffscreenSurface | null {
  const arch: CharacterArchetype = (ARCHETYPES as readonly string[]).includes(archetype)
    ? archetype
    : 'engineer';
  const seedBucket = normalizeSeed(seed) % 16;
  const st = normalizeState(state);
  const d = normalizeDir(dir);
  const f = ((Math.floor(frame || 0) % 4) + 4) % 4;
  const key = `${isLong ? 'long' : 'std'}|${arch}|${seedBucket}|${st}|${d}|${f}`;

  const cached = frameCache.get(key);
  if (cached) return cached;

  if (frameCache.size >= MAX_CACHE_ENTRIES) {
    frameCache.clear();
  }

  const grid = buildSpriteGrid(arch, seedBucket, st, d, f, isLong);
  const surface = renderGridToCanvas(grid);
  if (surface) {
    frameCache.set(key, surface);
  }
  return surface;
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

export function drawCharacter(ctx: CanvasRenderingContext2D, opts: DrawCharacterOptions): void {
  if (!ctx) return;
  const {
    archetype = 'engineer',
    seed = 0,
    state = 'idle',
    dir = 'down',
    frame = 0,
    x = 0,
    y = 0,
    scale = 1,
    isLong = false,
    variant,
  } = opts;

  const useLong = Boolean(isLong || variant === 'long');
  const s = Number.isFinite(scale) && scale > 0 ? scale : 1;
  const drawW = SPRITE_W * s;
  const drawH = SPRITE_H * s;
  const dx = Math.round(x - drawW / 2);
  const dy = Math.round(y - drawH);

  const sprite = getCachedSpriteCanvas(archetype, seed, state, dir, frame, useLong);
  if (sprite) {
    const prevSmooth = ctx.imageSmoothingEnabled;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite as CanvasImageSource, dx, dy, drawW, drawH);
    ctx.imageSmoothingEnabled = prevSmooth;
    return;
  }

  const fallbackGrid = buildSpriteGrid(
    archetype,
    normalizeSeed(seed) % 16,
    normalizeState(state),
    normalizeDir(dir),
    frame,
    useLong
  );
  drawPixelGrid(ctx, fallbackGrid, SPRITE_W, SPRITE_H, dx, dy);
}

type CapyPoseKind =
  | 'sit'
  | 'blink'
  | 'ear'
  | 'walk_0'
  | 'walk_1'
  | 'walk_2'
  | 'walk_3'
  | 'dance_0'
  | 'dance_1'
  | 'drowsy'
  | 'sleep';

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

function getCapyTheme(timeState: RoomTimeState, lampOn: boolean, palette: RoomPalette): CapyColorTheme {
  const dim = timeState === 'sleeping' && !lampOn;
  const late = timeState === 'late_night';
  return {
    selout: palette.capySelout || OUTLINE_DARK,
    fur: dim
      ? { hi: '#9e7358', mid: '#7d5841', sh: '#5a3c2c', ear: '#472e22', snout: '#4e3325', blush: '#a86764' }
      : late
        ? { hi: '#c98e63', mid: '#a36b46', sh: '#75492e', ear: '#593622', snout: '#663e28', blush: '#d47b73' }
        : { hi: '#e0a16e', mid: '#bd7b4c', sh: '#8c5432', ear: '#693d24', snout: '#73452a', blush: '#eb8f85' },
    eye: '#241612',
    eyeGlint: '#fff8eb',
    yuzu: dim
      ? { hi: '#cc9a1e', mid: '#a87312', sh: '#7a4d0a' }
      : { hi: '#fde047', mid: '#f59e0b', sh: '#c26408' },
    leaf: dim
      ? { hi: '#3c8c4e', mid: '#276638', sh: '#184224' }
      : { hi: '#68d975', mid: '#34a853', sh: '#1e7037' },
    groundCore: 'rgba(28, 24, 41, 0.30)',
    groundSoft: 'rgba(28, 24, 41, 0.14)',
  };
}

function buildCapyGrid(theme: CapyColorTheme, pose: CapyPoseKind): PixelGrid {
  const w = CAPY_WIDTH;
  const h = CAPY_HEIGHT;
  const body = createGrid(w, h);
  const detail = createGrid(w, h);

  const isDrowsy = pose === 'drowsy' || pose === 'sleep';
  const yuzuBob = pose === 'walk_1' || pose === 'walk_3' || pose === 'dance_1' ? -1 : 0;
  const headDrop = isDrowsy ? 1 : pose === 'dance_1' ? -1 : 0;
  const bodyDrop = isDrowsy ? 1 : pose === 'dance_1' ? -1 : 0;

  const yy = 1 + yuzuBob + headDrop;
  span(body, 5, 7, yy, theme.yuzu.hi, w, h);
  span(body, 4, 8, yy + 1, theme.yuzu.mid, w, h);
  span(body, 5, 7, yy + 2, theme.yuzu.sh, w, h);
  px(detail, 5, yy + 1, theme.yuzu.hi, w, h);
  px(body, 6, yy - 1, theme.leaf.mid, w, h);
  px(body, 7, yy - 1, theme.leaf.hi, w, h);
  px(body, 8, yy, theme.leaf.sh, w, h);

  const hy = 4 + headDrop;
  const earLift = pose === 'ear' || pose === 'dance_1' ? -1 : 0;
  rect(body, 9, hy - 1 + earLift, 2, 2, theme.fur.ear, w, h);
  px(detail, 9, hy - 1 + earLift, theme.fur.mid, w, h);

  span(body, 4, 9, hy, theme.fur.hi, w, h);
  span(body, 2, 10, hy + 1, theme.fur.mid, w, h);
  span(body, 1, 10, hy + 2, theme.fur.mid, w, h);
  span(body, 1, 10, hy + 3, theme.fur.mid, w, h);
  span(body, 2, 9, hy + 4, theme.fur.sh, w, h);

  span(detail, 4, 8, hy, theme.fur.hi, w, h);
  rect(detail, 1, hy + 2, 2, 2, theme.fur.snout, w, h);
  px(detail, 1, hy + 2, theme.fur.sh, w, h);
  px(detail, 8, hy + 3, theme.fur.blush, w, h);

  if (pose === 'dance_0' || pose === 'dance_1') {
    px(detail, 4, hy + 2, theme.eye, w, h);
    px(detail, 5, hy + 1, theme.eye, w, h);
    px(detail, 6, hy + 2, theme.eye, w, h);
  } else if (pose === 'blink' || isDrowsy) {
    span(detail, 4, 6, hy + 2, theme.eye, w, h);
  } else {
    rect(detail, 4, hy + 1, 2, 2, theme.eye, w, h);
    px(detail, 4, hy + 1, theme.eyeGlint, w, h);
  }

  const by = 7 + bodyDrop;
  span(body, 10, 17, by, theme.fur.hi, w, h);
  span(body, 8, 18, by + 1, theme.fur.hi, w, h);
  span(body, 6, 19, by + 2, theme.fur.mid, w, h);
  span(body, 5, 19, by + 3, theme.fur.mid, w, h);
  span(body, 5, 18, by + 4, theme.fur.mid, w, h);
  span(body, 6, 17, by + 5, theme.fur.sh, w, h);
  if (pose === 'sleep') {
    px(body, 19, by + 2, theme.fur.hi, w, h);
    px(body, 19, by + 3, theme.fur.mid, w, h);
  }
  span(detail, 11, 16, by + 1, theme.fur.hi, w, h);
  span(detail, 10, 15, by + 4, theme.fur.mid, w, h);

  if (!isDrowsy) {
    const legY = by + 5;
    if (pose === 'walk_0') {
      rect(body, 5, legY, 3, 3, theme.fur.sh, w, h);
      rect(body, 10, legY, 3, 2, theme.fur.mid, w, h);
      rect(body, 14, legY, 3, 3, theme.fur.sh, w, h);
    } else if (pose === 'walk_1' || pose === 'walk_3') {
      rect(body, 6, legY, 3, 2, theme.fur.sh, w, h);
      rect(body, 11, legY, 2, 2, theme.fur.mid, w, h);
      rect(body, 14, legY, 3, 2, theme.fur.sh, w, h);
    } else if (pose === 'walk_2') {
      rect(body, 7, legY, 3, 2, theme.fur.mid, w, h);
      rect(body, 11, legY, 3, 3, theme.fur.sh, w, h);
      rect(body, 15, legY, 3, 3, theme.fur.sh, w, h);
    } else if (pose === 'dance_1') {
      rect(body, 5, legY, 3, 2, theme.fur.sh, w, h);
      rect(body, 10, legY, 3, 2, theme.fur.mid, w, h);
      rect(body, 15, legY, 3, 2, theme.fur.sh, w, h);
    } else {
      rect(body, 6, legY, 3, 2, theme.fur.sh, w, h);
      rect(body, 10, legY, 3, 2, theme.fur.mid, w, h);
      rect(body, 14, legY, 3, 2, theme.fur.sh, w, h);
    }
  }

  const out = createGrid(w, h);
  applySeloutOutline(body, out, w, h, theme.selout, isDrowsy ? 12 : 14);
  for (let i = 0; i < detail.length; i += 1) {
    if (detail[i]) out[i] = detail[i];
  }

  const shadowY = isDrowsy ? 14 : 15;
  for (let sx = 4; sx <= 18; sx += 1) {
    if (!getPx(out, sx, shadowY, w, h)) px(out, sx, shadowY, theme.groundCore, w, h);
  }
  for (let sx = 6; sx <= 16; sx += 1) {
    if (!getPx(out, sx, shadowY + 1, w, h)) px(out, sx, shadowY + 1, theme.groundSoft, w, h);
  }
  return out;
}

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

function drawSpriteMatrix(
  ctx: CanvasRenderingContext2D,
  matrix: SpriteMatrix,
  colorMap: SpriteColorMap,
  x: number,
  y: number
): void {
  const baseX = Math.round(x);
  const baseY = Math.round(y);
  let lastColor = '';

  for (let rowIdx = 0; rowIdx < matrix.length; rowIdx += 1) {
    const row = matrix[rowIdx];
    const drawY = baseY + rowIdx;
    for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
      const ch = row[colIdx];
      if (ch === '.' || ch === ' ') continue;
      const color = colorMap[ch];
      if (!color) continue;
      if (color !== lastColor) {
        ctx.fillStyle = color;
        lastColor = color;
      }
      ctx.fillRect(baseX + colIdx, drawY, 1, 1);
    }
  }
}

function drawZzzDrift(
  ctx: CanvasRenderingContext2D,
  originX: number,
  originY: number,
  timeSec: number,
  reducedMotion: boolean,
  outlineColor: string,
  riseSpan = 6
): void {
  const zColors: SpriteColorMap = { O: outlineColor, Z: '#e2e8f0' };
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

export function drawCapybaraPet(
  ctx: CanvasRenderingContext2D,
  opts: DrawCapybaraPetOptions
): { x: number; y: number } {
  const {
    timeState,
    isMusicActive,
    elapsedSec,
    bounds,
    lampOn = false,
    reducedMotion = false,
  } = opts;

  const minX = Math.round(bounds.x);
  const maxX = Math.max(minX, Math.round(bounds.x + bounds.w - CAPY_WIDTH));
  const minY = Math.round(bounds.y);
  const maxY = Math.max(minY, Math.round(bounds.y + bounds.h - CAPY_HEIGHT));

  const clampPos = (rawX: number, rawY: number): { x: number; y: number } => ({
    x: Math.max(minX, Math.min(maxX, Math.round(rawX))),
    y: Math.max(minY, Math.min(maxY, Math.round(rawY))),
  });

  const spanX = maxX - minX;
  const restX = Math.round(minX + spanX * 0.78);
  const leftX = Math.round(minX + spanX * 0.14);
  const baseY = Math.round(minY + (maxY - minY) * 0.55);

  const timeSec = reducedMotion ? 0 : elapsedSec;
  let pos = clampPos(restX, baseY);
  let flipX = false;
  let pose: CapyPoseKind = 'sit';

  if (timeState === 'sleeping') {
    const breathUp = !reducedMotion && Math.sin(timeSec * 1.8) > 0.35;
    pos = clampPos(restX, baseY);
    pose = breathUp ? 'sleep' : 'drowsy';
  } else if (timeState === 'late_night') {
    const sleepyNod = isMusicActive && !reducedMotion && Math.sin(timeSec * Math.PI * 2.2) > 0.4;
    pos = clampPos(restX, baseY + (sleepyNod ? -1 : 0));
    pose = 'drowsy';
  } else if (reducedMotion) {
    pos = clampPos(restX, baseY);
    pose = 'sit';
  } else {
    const loop = timeSec % 20;
    let cx = restX;
    let cy = baseY;
    let isWalking = false;

    if (loop < 3.5) {
      cx = restX;
      cy = baseY;
      flipX = false;
    } else if (loop < 8.2) {
      const p = (loop - 3.5) / 4.7;
      cx = Math.round(restX - p * (restX - leftX));
      cy = Math.round(baseY + Math.sin(p * Math.PI) * 2);
      flipX = false;
      isWalking = true;
    } else if (loop < 12.2) {
      cx = leftX;
      cy = baseY + 1;
      flipX = loop >= 10.6;
    } else if (loop < 17.0) {
      const p = (loop - 12.2) / 4.8;
      cx = Math.round(leftX + p * (restX - leftX));
      cy = Math.round(baseY + 1 - Math.sin(p * Math.PI) * 1);
      flipX = true;
      isWalking = true;
    } else {
      cx = restX;
      cy = baseY;
      flipX = loop < 18.4;
    }

    if (isMusicActive) {
      const danceFrame = Math.floor(timeSec * 4.4) % 2;
      const hopY = danceFrame === 1 ? -1 : 0;
      pos = clampPos(cx, cy + hopY);
      pose = danceFrame === 1 ? 'dance_1' : 'dance_0';
    } else if (isWalking) {
      const walkPoses: readonly CapyPoseKind[] = ['walk_0', 'walk_1', 'walk_2', 'walk_3'];
      const step = Math.floor(timeSec * 5.6) % walkPoses.length;
      pos = clampPos(cx, cy);
      pose = walkPoses[step];
    } else {
      const blinkNow = timeSec % 4.1 >= 3.88;
      const earTwitch = timeSec % 3.2 >= 2.96;
      pose = blinkNow ? 'blink' : earTwitch ? 'ear' : 'sit';
      pos = clampPos(cx, cy);
    }
  }

  const theme = getCapyTheme(timeState, lampOn, opts.palette);
  const capyGrid = buildCapyGrid(theme, pose);
  drawPixelGrid(ctx, capyGrid, CAPY_WIDTH, CAPY_HEIGHT, pos.x, pos.y, flipX);

  if (timeState === 'sleeping') {
    const zX = Math.max(minX, pos.x - 4);
    const zY = Math.max(12, pos.y - 2);
    drawZzzDrift(ctx, zX, zY, timeSec + 1.2, reducedMotion, theme.selout, 4);
  }

  lastCapyBounds = { x: pos.x, y: pos.y, w: CAPY_WIDTH, h: CAPY_HEIGHT };
  return {
    x: Math.round(pos.x + CAPY_WIDTH / 2),
    y: Math.round(pos.y + CAPY_HEIGHT / 2),
  };
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

const WOOFER_FRAME_0: SpriteMatrix = [
  'SDDS',
  'DCCD',
  'DCCD',
  'SDDS',
];

const WOOFER_FRAME_1: SpriteMatrix = [
  'GCCG',
  'CAAC',
  'CAAC',
  'GCCG',
];

const WOOFER_COLORS: SpriteColorMap = {
  S: '#1e2434',
  M: '#64748b',
  D: '#334155',
  C: '#cbd5e1',
  G: '#34a853',
  A: '#86efac',
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
  O: '#16212c',
  B: '#34a853',
};

const NOTE_COLORS_GOLD: SpriteColorMap = {
  O: '#2a1c16',
  B: '#fbbc04',
};

const NOTE_COLORS_BLUE: SpriteColorMap = {
  O: '#16212c',
  B: '#60a5fa',
};

const NOTE_COLORS_CORAL: SpriteColorMap = {
  O: '#2a181f',
  B: '#f472b6',
};

const GBA_POINTER_ARROW: SpriteMatrix = [
  'OOOOOOOOO',
  'OHHHHHHYO',
  '.OYYYYAO.',
  '..OYAYO..',
  '...OAO...',
  '....O....',
];

const GBA_POINTER_COLORS: SpriteColorMap = {
  O: '#2a1c16',
  H: '#fff3b0',
  Y: '#fbbc04',
  A: '#f59e0b',
};

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
    fillPixelRect(ctx, originX, originY - 2, 1, 2, '#fff9f0');
    fillPixelRect(ctx, originX + 2, originY - 5, 1, 2, '#e2e8f0');
    ctx.restore();
    return;
  }

  const wisps = [
    { offset: 0, dxBias: 0, color: '#fff9f0' },
    { offset: 0.35, dxBias: 2, color: '#e2e8f0' },
    { offset: 0.7, dxBias: 1, color: '#cbd5e1' },
  ];

  for (let i = 0; i < wisps.length; i += 1) {
    const wisp = wisps[i];
    const phase = (timeSec * 0.58 + wisp.offset) % 1;
    const py = Math.round(originY - phase * maxRise);
    const pxx = Math.round(originX + wisp.dxBias + Math.sin(phase * Math.PI * 2 + i) * 1.1);
    const alpha = Math.sin(phase * Math.PI) * 0.72;
    if (alpha <= 0.05) continue;
    ctx.save();
    ctx.globalAlpha = alpha;
    fillPixelRect(ctx, pxx, py, 1, 2, wisp.color);
    ctx.restore();
  }
}

function drawEqualizerBars(
  ctx: CanvasRenderingContext2D,
  baseX: number,
  baseY: number,
  timeSec: number,
  phaseOffset: number
): void {
  const barColors = ['#34a853', '#fbbc04', '#60a5fa'];
  for (let b = 0; b < 3; b += 1) {
    const wave = (Math.sin(timeSec * 8.5 + phaseOffset + b * 1.9) + 1) * 0.5;
    const h = 2 + Math.round(wave * 5);
    const bx = baseX + b * 2;
    const by = baseY - h;
    fillPixelRect(ctx, bx, by, 1, h, barColors[b]);
    fillPixelRect(ctx, bx, by, 1, 1, '#ffffff');
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

    if (!isMusicActive) return;

    drawSpriteMatrix(ctx, WOOFER_FRAME_0, WOOFER_COLORS, DESK1_LEFT_WOOFER_X, DESK1_LEFT_WOOFER_Y);
    drawSpriteMatrix(ctx, WOOFER_FRAME_0, WOOFER_COLORS, DESK1_RIGHT_WOOFER_X, DESK1_RIGHT_WOOFER_Y);
    ctx.save();
    ctx.globalAlpha = 0.9;
    drawSpriteMatrix(ctx, NOTE_SINGLE, NOTE_COLORS_GREEN, DESK1_LEFT_WOOFER_X, DESK1_LEFT_WOOFER_Y - 15);
    drawSpriteMatrix(ctx, NOTE_DOUBLE, NOTE_COLORS_GOLD, DESK1_RIGHT_WOOFER_X - 1, DESK1_RIGHT_WOOFER_Y - 16);
    drawSpriteMatrix(ctx, NOTE_SINGLE, NOTE_COLORS_GOLD, TURNTABLE_X - 2, TURNTABLE_Y - 12);
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
    drawSpriteMatrix(ctx, wooferMatrix, WOOFER_COLORS, DESK1_LEFT_WOOFER_X, DESK1_LEFT_WOOFER_Y);
    drawSpriteMatrix(ctx, wooferMatrix, WOOFER_COLORS, DESK1_RIGHT_WOOFER_X, DESK1_RIGHT_WOOFER_Y);

    drawEqualizerBars(ctx, DESK1_LEFT_WOOFER_X - 1, DESK1_LEFT_WOOFER_Y - 6, timeSec, 0);
    drawEqualizerBars(ctx, DESK1_RIGHT_WOOFER_X - 1, DESK1_RIGHT_WOOFER_Y - 6, timeSec, 1.4);
    drawEqualizerBars(ctx, TURNTABLE_SPEAKER_X, TURNTABLE_SPEAKER_Y, timeSec, 0.7);
  }

  if (noteFadeMultiplier <= 0) return;

  const cycleSec = 2.4;
  const notes: readonly {
    baseX: number;
    baseY: number;
    offsetSec: number;
    doubleNote: boolean;
    colors: SpriteColorMap;
    arcAmp: number;
  }[] = [
    { baseX: DESK1_LEFT_WOOFER_X + 2, baseY: DESK1_LEFT_WOOFER_Y - 7, offsetSec: 0, doubleNote: false, colors: NOTE_COLORS_GREEN, arcAmp: 2.6 },
    { baseX: DESK1_LEFT_WOOFER_X + 2, baseY: DESK1_LEFT_WOOFER_Y - 7, offsetSec: 1.2, doubleNote: true, colors: NOTE_COLORS_BLUE, arcAmp: -2.4 },
    { baseX: DESK1_RIGHT_WOOFER_X + 2, baseY: DESK1_RIGHT_WOOFER_Y - 7, offsetSec: 0.6, doubleNote: true, colors: NOTE_COLORS_GOLD, arcAmp: 2.6 },
    { baseX: DESK1_RIGHT_WOOFER_X + 2, baseY: DESK1_RIGHT_WOOFER_Y - 7, offsetSec: 1.8, doubleNote: false, colors: NOTE_COLORS_CORAL, arcAmp: -2.6 },
    { baseX: TURNTABLE_X, baseY: TURNTABLE_Y - 4, offsetSec: 0.9, doubleNote: false, colors: NOTE_COLORS_GOLD, arcAmp: 1.8 },
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
    const drawY = item.baseY - Math.round(phase * 20);
    const baseAlpha =
      phase < 0.16 ? phase / 0.16 : phase > 0.65 ? Math.max(0, (1 - phase) / 0.35) : 0.95;
    const finalAlpha = Math.max(0, Math.min(1, baseAlpha * noteFadeMultiplier));
    if (finalAlpha <= 0.02) continue;
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
  const x1 = Math.min(ROOM_WIDTH - 2, Math.round(bx + bw - 1));
  const y1 = Math.min(ROOM_HEIGHT - 2, Math.round(by + bh - 1));
  const pulse = reducedMotion || isHovered ? 0.92 : 0.58 + 0.22 * Math.sin(timeSec * 3.4);
  const arm = 4;
  const col = isHovered ? '#fff3b0' : '#fbbc04';
  const shadow = '#2a1c16';

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

function resolveHotspotAnchor(id: RoomHotspotId): { pointerX: number; pointerY: number } | null {
  for (let i = 0; i < ROOM_HOTSPOTS.length; i += 1) {
    if (ROOM_HOTSPOTS[i].id === id) {
      return {
        pointerX: ROOM_HOTSPOTS[i].pointerX,
        pointerY: ROOM_HOTSPOTS[i].pointerY,
      };
    }
  }
  return null;
}

function resolveCapyBox(capyAnchor?: { x: number; y: number } | null): {
  x: number;
  y: number;
  w: number;
  h: number;
} | null {
  if (capyAnchor) {
    return {
      x: Math.round(capyAnchor.x - CAPY_WIDTH / 2),
      y: Math.round(capyAnchor.y - CAPY_HEIGHT / 2),
      w: CAPY_WIDTH,
      h: CAPY_HEIGHT,
    };
  }
  return lastCapyBounds;
}

function drawHotspotPointer(
  ctx: CanvasRenderingContext2D,
  hoveredHotspot: RoomHotspotId | null,
  selectedHotspot: RoomHotspotId | null,
  hoveredRegion: RoomHotspotRegion | null | undefined,
  capyAnchor: { x: number; y: number } | null | undefined,
  timeSec: number,
  reducedMotion: boolean
): void {
  const capyBox = resolveCapyBox(capyAnchor);

  if (selectedHotspot && selectedHotspot !== hoveredHotspot) {
    if (selectedHotspot === 'capybara' && capyBox) {
      drawHotspotBrackets(
        ctx,
        capyBox.x - 1,
        capyBox.y - 1,
        capyBox.w + 2,
        capyBox.h + 1,
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
    if (hoveredRegion.id === 'capybara' && capyBox) {
      drawHotspotBrackets(
        ctx,
        capyBox.x - 1,
        capyBox.y - 1,
        capyBox.w + 2,
        capyBox.h + 1,
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

  if (activeId === 'capybara' && capyBox) {
    pointerX = capyBox.x + Math.round(capyBox.w / 2);
    pointerY = capyBox.y - 3;
  } else if (hoveredRegion) {
    pointerX = hoveredRegion.pointerX;
    pointerY = hoveredRegion.pointerY;
  } else if (activeId) {
    const anchor = resolveHotspotAnchor(activeId);
    if (anchor) {
      pointerX = anchor.pointerX;
      pointerY = anchor.pointerY;
    }
  }

  if (pointerX === null || pointerY === null) return;

  const bounceSteps = [0, 1, 2, 1];
  const bounce = reducedMotion ? 0 : bounceSteps[Math.floor(timeSec * 5) % bounceSteps.length];
  const drawX = Math.max(0, Math.min(ROOM_WIDTH - 9, Math.round(pointerX - 4)));
  const drawY = Math.max(0, Math.round(pointerY - 5 + bounce));
  drawSpriteMatrix(ctx, GBA_POINTER_ARROW, GBA_POINTER_COLORS, drawX, drawY);
}

export function drawDeskAndMusicEffects(
  ctx: CanvasRenderingContext2D,
  opts: DrawDeskAndMusicEffectsOptions
): void {
  const {
    timeState,
    isMusicActive,
    tick,
    elapsedSec,
    hoveredHotspot,
    selectedHotspot,
    hoveredRegion,
    reducedMotion = false,
    capyAnchor,
  } = opts;

  const timeSec = reducedMotion ? 0 : elapsedSec ?? tick / 15;

  if (timeState !== 'sleeping') {
    drawSmoothSteam(ctx, DESK1_MUG_X, DESK1_MUG_Y - 2, timeSec, reducedMotion, 8);
  }

  drawMusicEffects(ctx, isMusicActive, timeSec, reducedMotion);
  drawHotspotPointer(
    ctx,
    hoveredHotspot,
    selectedHotspot,
    hoveredRegion,
    capyAnchor,
    timeSec,
    reducedMotion
  );
}
