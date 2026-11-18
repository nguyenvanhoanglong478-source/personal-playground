import {
  ROOM_HEIGHT,
  ROOM_WIDTH,
  RoomHotspotId,
  RoomHotspotRegion,
  RoomTimeState,
} from '../../data/workspace';
import { RoomPalette } from './pixelPalette';

export interface DeskSlot {
  id: string;
  x: number;
  y: number;
  chairX: number;
  chairY: number;
  facing: 'up' | 'down' | 'left' | 'right';
  monitorX: number;
  monitorY: number;
}

export interface RestSlot {
  id: string;
  kind: 'sofa' | 'coffee' | 'bookshelf' | 'window' | 'plant';
  x: number;
  y: number;
  facing: 'up' | 'down' | 'left' | 'right';
}

export interface DrawRoomBaseLayerOptions {
  timeState: RoomTimeState;
  lampOn: boolean;
  isMusicActive: boolean;
  tick: number;
  elapsedSec?: number;
  palette: RoomPalette;
  activeDeskIds?: Set<string> | readonly string[];
}

export interface DrawRoomForegroundLayerOptions {
  timeState: RoomTimeState;
  lampOn: boolean;
  isMusicActive: boolean;
  tick: number;
  elapsedSec?: number;
  palette: RoomPalette;
}

export interface DrawLightingOverlayOptions {
  timeState: RoomTimeState;
  lampOn: boolean;
  isMusicActive: boolean;
  tick: number;
  elapsedSec?: number;
  palette: RoomPalette;
}

export const DESK_SLOTS: readonly DeskSlot[] = [
  { id: 'desk-1', x: 58, y: 128, chairX: 58, chairY: 152, facing: 'up', monitorX: 58, monitorY: 116 },
  { id: 'desk-2', x: 124, y: 128, chairX: 124, chairY: 152, facing: 'up', monitorX: 124, monitorY: 116 },
  { id: 'desk-3', x: 208, y: 128, chairX: 208, chairY: 152, facing: 'up', monitorX: 208, monitorY: 116 },
  { id: 'desk-4', x: 274, y: 128, chairX: 274, chairY: 152, facing: 'up', monitorX: 274, monitorY: 116 },
  { id: 'desk-5', x: 58, y: 216, chairX: 58, chairY: 240, facing: 'up', monitorX: 58, monitorY: 204 },
  { id: 'desk-6', x: 124, y: 216, chairX: 124, chairY: 240, facing: 'up', monitorX: 124, monitorY: 204 },
  { id: 'desk-7', x: 208, y: 216, chairX: 208, chairY: 240, facing: 'up', monitorX: 208, monitorY: 204 },
  { id: 'desk-8', x: 274, y: 216, chairX: 274, chairY: 240, facing: 'up', monitorX: 274, monitorY: 204 },
];

export const REST_SLOTS: readonly RestSlot[] = [
  { id: 'rest-sofa-1', kind: 'sofa', x: 368, y: 196, facing: 'down' },
  { id: 'rest-sofa-2', kind: 'sofa', x: 404, y: 196, facing: 'down' },
  { id: 'rest-coffee', kind: 'coffee', x: 356, y: 115, facing: 'up' },
  { id: 'rest-bookshelf', kind: 'bookshelf', x: 443, y: 115, facing: 'up' },
  { id: 'rest-window', kind: 'window', x: 114, y: 92, facing: 'up' },
  { id: 'rest-plant', kind: 'plant', x: 416, y: 272, facing: 'right' },
];

export const CAPY_LOUNGE_RECT: { x: number; y: number; w: number; h: number } = {
  x: 342,
  y: 240,
  w: 92,
  h: 18,
};

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
  createHotspot('window', 72, 10, 90, 39, 117, 8),
  createHotspot('window', 322, 10, 86, 39, 365, 8),
  createHotspot('shelf', 418, 18, 50, 80, 443, 16),
  createHotspot('bed', 348, 162, 106, 42, 398, 160),
  createHotspot('monitor', 41, 103, 34, 14, 58, 100),
  createHotspot('speakers', 32, 105, 8, 12, 36, 103),
  createHotspot('speakers', 76, 105, 8, 12, 80, 103),
  createHotspot('lamp', 74, 116, 11, 13, 80, 114),
  createHotspot('capybara', 332, 204, 128, 56, 388, 202),
];

interface NavNode {
  id: string;
  x: number;
  y: number;
}

const NAV_NODES: readonly NavNode[] = [
  { id: 'top-L', x: 19, y: 96 },
  { id: 'top-win', x: 114, y: 96 },
  { id: 'slot-win', x: 114, y: 92 },
  { id: 'top-C', x: 166, y: 96 },
  { id: 'top-R', x: 316, y: 96 },
  { id: 'lng-top-M', x: 316, y: 128 },
  { id: 'lng-top-K', x: 356, y: 128 },
  { id: 'lng-top-B', x: 443, y: 128 },
  { id: 'slot-cof', x: 356, y: 115 },
  { id: 'slot-book', x: 443, y: 115 },
  { id: 'mid-L', x: 19, y: 178 },
  { id: 'mid-1', x: 58, y: 178 },
  { id: 'mid-2', x: 124, y: 178 },
  { id: 'mid-C', x: 166, y: 178 },
  { id: 'mid-3', x: 208, y: 178 },
  { id: 'mid-4', x: 274, y: 178 },
  { id: 'mid-R', x: 316, y: 178 },
  { id: 'chr-1', x: 58, y: 152 },
  { id: 'chr-2', x: 124, y: 152 },
  { id: 'chr-3', x: 208, y: 152 },
  { id: 'chr-4', x: 274, y: 152 },
  { id: 'sofa-L', x: 316, y: 212 },
  { id: 'sofa-1', x: 368, y: 212 },
  { id: 'sofa-2', x: 404, y: 212 },
  { id: 'slot-s1', x: 368, y: 196 },
  { id: 'slot-s2', x: 404, y: 196 },
  { id: 'bot-L', x: 19, y: 272 },
  { id: 'bot-5', x: 58, y: 272 },
  { id: 'bot-6', x: 124, y: 272 },
  { id: 'bot-C', x: 166, y: 272 },
  { id: 'bot-7', x: 208, y: 272 },
  { id: 'bot-8', x: 274, y: 272 },
  { id: 'bot-R', x: 316, y: 272 },
  { id: 'slot-plt', x: 416, y: 272 },
  { id: 'chr-5', x: 58, y: 240 },
  { id: 'chr-6', x: 124, y: 240 },
  { id: 'chr-7', x: 208, y: 240 },
  { id: 'chr-8', x: 274, y: 240 },
];

const NAV_EDGES: readonly (readonly [string, string])[] = [
  ['top-L', 'top-win'],
  ['top-win', 'top-C'],
  ['top-C', 'top-R'],
  ['lng-top-M', 'lng-top-K'],
  ['lng-top-K', 'lng-top-B'],
  ['mid-L', 'mid-1'],
  ['mid-1', 'mid-2'],
  ['mid-2', 'mid-C'],
  ['mid-C', 'mid-3'],
  ['mid-3', 'mid-4'],
  ['mid-4', 'mid-R'],
  ['sofa-L', 'sofa-1'],
  ['sofa-1', 'sofa-2'],
  ['bot-L', 'bot-5'],
  ['bot-5', 'bot-6'],
  ['bot-6', 'bot-C'],
  ['bot-C', 'bot-7'],
  ['bot-7', 'bot-8'],
  ['bot-8', 'bot-R'],
  ['bot-R', 'slot-plt'],
  ['top-L', 'mid-L'],
  ['mid-L', 'bot-L'],
  ['top-C', 'mid-C'],
  ['mid-C', 'bot-C'],
  ['top-R', 'lng-top-M'],
  ['lng-top-M', 'mid-R'],
  ['mid-R', 'sofa-L'],
  ['sofa-L', 'bot-R'],
  ['top-win', 'slot-win'],
  ['mid-1', 'chr-1'],
  ['mid-2', 'chr-2'],
  ['mid-3', 'chr-3'],
  ['mid-4', 'chr-4'],
  ['bot-5', 'chr-5'],
  ['bot-6', 'chr-6'],
  ['bot-7', 'chr-7'],
  ['bot-8', 'chr-8'],
  ['lng-top-B', 'slot-book'],
  ['lng-top-K', 'slot-cof'],
  ['sofa-1', 'slot-s1'],
  ['sofa-2', 'slot-s2'],
];

const NODE_MAP = new Map<string, NavNode>(NAV_NODES.map((n) => [n.id, n]));
const BASE_ADJ = new Map<string, Array<{ id: string; d: number }>>(
  NAV_NODES.map((n) => [n.id, []])
);

for (const [aId, bId] of NAV_EDGES) {
  const a = NODE_MAP.get(aId);
  const b = NODE_MAP.get(bId);
  if (!a || !b) continue;
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  BASE_ADJ.get(aId)?.push({ id: bId, d });
  BASE_ADJ.get(bId)?.push({ id: aId, d });
}

interface EdgeProjection {
  edgeIdx: number;
  aId: string;
  bId: string;
  x: number;
  y: number;
  dist: number;
}

function projectOntoSegment(
  pxVal: number,
  pyVal: number,
  ax: number,
  ay: number,
  bx: number,
  by: number
): { x: number; y: number; t: number; dist: number } {
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) {
    return { x: ax, y: ay, t: 0, dist: Math.hypot(pxVal - ax, pyVal - ay) };
  }
  let t = ((pxVal - ax) * dx + (pyVal - ay) * dy) / lenSq;
  if (t < 0) t = 0;
  else if (t > 1) t = 1;
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  return { x: Math.round(cx), y: Math.round(cy), t, dist: Math.hypot(pxVal - cx, pyVal - cy) };
}

function findClosestEdgeProjection(pxVal: number, pyVal: number): EdgeProjection {
  let best: EdgeProjection | null = null;
  for (let i = 0; i < NAV_EDGES.length; i += 1) {
    const [aId, bId] = NAV_EDGES[i];
    const a = NODE_MAP.get(aId);
    const b = NODE_MAP.get(bId);
    if (!a || !b) continue;
    const proj = projectOntoSegment(pxVal, pyVal, a.x, a.y, b.x, b.y);
    if (!best || proj.dist < best.dist - 1e-6) {
      best = { edgeIdx: i, aId, bId, x: proj.x, y: proj.y, dist: proj.dist };
    }
  }
  return best ?? { edgeIdx: 0, aId: 'top-L', bId: 'top-win', x: 19, y: 96, dist: 0 };
}

function collapseCollinear(points: Array<{ x: number; y: number }>): Array<{ x: number; y: number }> {
  if (points.length <= 2) return points;
  const out = [points[0]];
  for (let i = 1; i < points.length - 1; i += 1) {
    const prev = out[out.length - 1];
    const curr = points[i];
    const next = points[i + 1];
    const sameX = prev.x === curr.x && curr.x === next.x;
    const sameY = prev.y === curr.y && curr.y === next.y;
    if (!sameX && !sameY) out.push(curr);
  }
  out.push(points[points.length - 1]);
  return out;
}

export function findPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): Array<{ x: number; y: number }> {
  const sx = Math.round(x1);
  const sy = Math.round(y1);
  const tx = Math.round(x2);
  const ty = Math.round(y2);

  if (Math.hypot(tx - sx, ty - sy) <= 1) {
    return [{ x: tx, y: ty }];
  }

  const startProj = findClosestEdgeProjection(sx, sy);
  const endProj = findClosestEdgeProjection(tx, ty);

  if (startProj.edgeIdx === endProj.edgeIdx && startProj.dist <= 16 && endProj.dist <= 16) {
    const raw: Array<{ x: number; y: number }> = [];
    if (startProj.x !== sx || startProj.y !== sy) raw.push({ x: startProj.x, y: startProj.y });
    if (endProj.x !== startProj.x || endProj.y !== startProj.y) {
      raw.push({ x: endProj.x, y: endProj.y });
    }
    if (tx !== endProj.x || ty !== endProj.y) raw.push({ x: tx, y: ty });
    return collapseCollinear(raw.length ? raw : [{ x: tx, y: ty }]);
  }

  const nodes = new Map<string, NavNode>(NODE_MAP);
  const adj = new Map<string, Array<{ id: string; d: number }>>();
  for (const [k, list] of BASE_ADJ.entries()) {
    adj.set(k, list.slice());
  }

  const attachVirtual = (vId: string, proj: EdgeProjection): void => {
    nodes.set(vId, { id: vId, x: proj.x, y: proj.y });
    const a = nodes.get(proj.aId);
    const b = nodes.get(proj.bId);
    if (!a || !b) return;
    const da = Math.hypot(proj.x - a.x, proj.y - a.y);
    const db = Math.hypot(proj.x - b.x, proj.y - b.y);
    adj.set(vId, [
      { id: proj.aId, d: da },
      { id: proj.bId, d: db },
    ]);
    adj.get(proj.aId)?.push({ id: vId, d: da });
    adj.get(proj.bId)?.push({ id: vId, d: db });
  };

  attachVirtual('__start', startProj);
  attachVirtual('__end', endProj);
  if (startProj.edgeIdx === endProj.edgeIdx) {
    const dSE = Math.hypot(endProj.x - startProj.x, endProj.y - startProj.y);
    adj.get('__start')?.push({ id: '__end', d: dSE });
    adj.get('__end')?.push({ id: '__start', d: dSE });
  }

  const dist = new Map<string, number>();
  const prev = new Map<string, string>();
  const visited = new Set<string>();
  for (const id of nodes.keys()) dist.set(id, Infinity);
  dist.set('__start', 0);

  while (true) {
    let u: string | null = null;
    let bestD = Infinity;
    for (const [id, d] of dist.entries()) {
      if (!visited.has(id) && d < bestD) {
        bestD = d;
        u = id;
      }
    }
    if (u === null || u === '__end') break;
    visited.add(u);

    const neighbors = adj.get(u) ?? [];
    for (const edge of neighbors) {
      if (visited.has(edge.id)) continue;
      const alt = bestD + edge.d;
      if (alt + 1e-6 < (dist.get(edge.id) ?? Infinity)) {
        dist.set(edge.id, alt);
        prev.set(edge.id, u);
      }
    }
  }

  const routeIds: string[] = [];
  let cur: string | undefined = '__end';
  while (cur && cur !== '__start') {
    routeIds.push(cur);
    cur = prev.get(cur);
  }
  routeIds.reverse();

  const pts: Array<{ x: number; y: number }> = [];
  if (startProj.x !== sx || startProj.y !== sy) {
    pts.push({ x: startProj.x, y: startProj.y });
  }
  for (const id of routeIds) {
    const n = nodes.get(id);
    if (!n) continue;
    const last = pts[pts.length - 1];
    if (!last || last.x !== n.x || last.y !== n.y) {
      pts.push({ x: n.x, y: n.y });
    }
  }
  const last = pts[pts.length - 1];
  if (!last || last.x !== tx || last.y !== ty) {
    pts.push({ x: tx, y: ty });
  }

  if (pts.length > 1 && pts[0].x === sx && pts[0].y === sy) {
    pts.shift();
  }

  return collapseCollinear(pts);
}

const BAYER_4X4: readonly (readonly number[])[] = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
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

const PENDANT_XS: readonly number[] = [57, 168, 316, 412];

function makeRng(seed: number): () => number {
  let s = (seed >>> 0) || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function px(ctx: CanvasRenderingContext2D, x: number, y: number, color: string): void {
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

function box(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  outline: string
): void {
  rect(ctx, x, y, w, h, outline);
  if (w > 2 && h > 2) {
    rect(ctx, x + 1, y + 1, w - 2, h - 2, fill);
  }
}

function ditherRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  colorA: string,
  colorB: string | null,
  step = 2
): void {
  for (let yy = 0; yy < h; yy += 1) {
    for (let xx = 0; xx < w; xx += 1) {
      const useB = (xx + yy) % step === 0;
      const c = useB ? colorB : colorA;
      if (c) px(ctx, x + xx, y + yy, c);
    }
  }
}

function drawMatrix(
  ctx: CanvasRenderingContext2D,
  matrix: readonly string[],
  colors: Record<string, string | undefined>,
  ox: number,
  oy: number
): void {
  for (let row = 0; row < matrix.length; row += 1) {
    const line = matrix[row];
    const py = oy + row;
    for (let col = 0; col < line.length; col += 1) {
      const ch = line[col];
      if (ch === '.' || ch === ' ') continue;
      const color = colors[ch];
      if (!color) continue;
      px(ctx, ox + col, py, color);
    }
  }
}

function createCanvas(w: number, h: number): HTMLCanvasElement | null {
  if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
  }
  return null;
}

function drawFloor(ctx: CanvasRenderingContext2D, p: RoomPalette): void {
  const rng = makeRng(480321);
  const plankH = 8;
  const rowOffsets = [0, 17, 29, 9, 23];

  for (let y = 77; y < 312; y += plankH) {
    const row = ((y - 77) / plankH) | 0;
    let x = 8 - rowOffsets[row % rowOffsets.length];
    let colIdx = 0;
    while (x < 472) {
      const len = 36 + ((rng() * 11) | 0);
      const x0 = Math.max(8, x);
      const x1 = Math.min(472, x + len);
      const w = x1 - x0;
      const h = Math.min(plankH, 312 - y);
      if (w > 0 && h > 0) {
        const idx = (row * 2 + colIdx + ((rng() * 2) | 0)) % p.floorPlanks.length;
        const base = p.floorPlanks[idx];
        rect(ctx, x0, y, w, h, base);

        if ((row + colIdx) % 4 === 0 && w > 8 && h > 3) {
          rect(ctx, x0 + 2, y + 1, w - 4, 1, p.floorHi);
        }
        if (w > 16 && h > 4) {
          const gx = x0 + 5 + ((rng() * Math.max(1, w - 18)) | 0);
          const gy = y + 3 + ((rng() * Math.max(1, h - 5)) | 0);
          const gw = Math.min(10 + ((rng() * 8) | 0), x1 - gx - 3);
          if (gw > 3) rect(ctx, gx, gy, gw, 1, p.floorGrain);
        }

        if (y + h - 1 < 312) rect(ctx, x0, y + h - 1, w, 1, p.floorSeam);
        if (x1 < 472) rect(ctx, x1 - 1, y, 1, h - 1, p.floorJoint);
      }
      x += len;
      colIdx += 1;
    }
  }

  const tx0 = 8;
  const ty0 = 77;
  const tw = 60;
  const th = 25;
  for (let ty = ty0; ty < ty0 + th; ty += 8) {
    for (let tx = tx0; tx < tx0 + tw; tx += 10) {
      const tileW = Math.min(10, tx0 + tw - tx);
      const tileH = Math.min(8, ty0 + th - ty);
      const alt = (((tx / 10) | 0) + ((ty / 8) | 0)) % 2 === 0;
      rect(ctx, tx, ty, tileW, tileH, alt ? p.terrazzoBase : p.terrazzoAlt);
      rect(ctx, tx, ty + tileH - 1, tileW, 1, p.terrazzoLine);
      rect(ctx, tx + tileW - 1, ty, 1, tileH, p.terrazzoLine);
    }
  }
  const trRng = makeRng(7711);
  for (let i = 0; i < 42; i += 1) {
    const fx = tx0 + 2 + ((trRng() * (tw - 4)) | 0);
    const fy = ty0 + 2 + ((trRng() * (th - 4)) | 0);
    const col = p.terrazzoFlecks[(trRng() * p.terrazzoFlecks.length) | 0];
    px(ctx, fx, fy, col);
  }
  rect(ctx, tx0, ty0 + th, tw + 1, 2, p.terrazzoTrim);
  rect(ctx, tx0 + tw, ty0, 2, th + 2, p.terrazzoTrim);
  rect(ctx, tx0, ty0 + th + 2, tw + 2, 1, p.softAo);
  rect(ctx, 27, 77, 4, 29, '#2a303d');
  rect(ctx, 28, 77, 2, 29, '#475569');
  rect(ctx, 28, 104, 18, 2, '#2a303d');
  rect(ctx, 29, 104, 16, 1, '#64748b');

  const drawNordicRug = (rx: number, ry: number, rw: number, rh: number): void => {
    rect(ctx, rx, ry, rw, rh, p.nordicRugBg);
    rect(ctx, rx + 2, ry + 2, rw - 4, rh - 4, p.nordicRugBorder);
    rect(ctx, rx + 4, ry + 4, rw - 8, rh - 8, p.nordicRugBg);
    for (let yy = ry + 10; yy < ry + rh - 8; yy += 12) {
      rect(ctx, rx + 6, yy, rw - 12, 1, p.nordicRugStripe);
    }
    for (let cx = rx + 16; cx < rx + rw - 12; cx += 22) {
      for (let cy = ry + 18; cy < ry + rh - 14; cy += 28) {
        px(ctx, cx, cy - 2, p.nordicRugAccent);
        rect(ctx, cx - 1, cy - 1, 3, 1, p.nordicRugAccent);
        rect(ctx, cx - 2, cy, 5, 1, p.nordicRugBorder);
        rect(ctx, cx - 1, cy + 1, 3, 1, p.nordicRugAccent);
        px(ctx, cx, cy + 2, p.nordicRugAccent);
      }
    }
    for (let fx = rx + 3; fx < rx + rw - 2; fx += 3) {
      rect(ctx, fx, ry - 2, 1, 2, p.nordicRugStripe);
      rect(ctx, fx, ry + rh, 1, 2, p.nordicRugStripe);
    }
  };
  drawNordicRug(26, 108, 130, 148);
  drawNordicRug(176, 108, 130, 148);

  rect(ctx, 8, 77, 464, 3, p.wallShadow);
  rect(ctx, 8, 80, 464, 2, p.softAo);
  rect(ctx, 8, 77, 2, 235, p.wallShadow);
  rect(ctx, 470, 77, 2, 235, p.wallShadow);
}

function drawWalls(ctx: CanvasRenderingContext2D, p: RoomPalette): void {
  rect(ctx, 0, 0, ROOM_WIDTH, 6, p.ceiling);
  rect(ctx, 8, 4, ROOM_WIDTH - 16, 1, p.ceilingTrim);
  rect(ctx, 8, 5, ROOM_WIDTH - 16, 1, p.outline);

  rect(ctx, 8, 6, ROOM_WIDTH - 16, 46, p.wallTop);
  rect(ctx, 8, 6, ROOM_WIDTH - 16, 4, p.wallMid);

  const drawBrickPatch = (bx0: number, by0: number, bw: number, bh: number): void => {
    rect(ctx, bx0, by0, bw, bh, p.brickMortar);
    const rng = makeRng(bx0 * 31 + by0);
    for (let by = by0; by < by0 + bh; by += 4) {
      const row = ((by - by0) / 4) | 0;
      const shift = (row % 2) * 4;
      for (let bx = bx0 - shift; bx < bx0 + bw; bx += 8) {
        const x0 = Math.max(bx0, bx);
        const x1 = Math.min(bx0 + bw, bx + 7);
        if (x1 - x0 <= 1) continue;
        const r = rng();
        const col = r < 0.35 ? p.brickA : r < 0.72 ? p.brickB : p.brickC;
        rect(ctx, x0, by, x1 - x0, 3, col);
      }
    }
  };
  drawBrickPatch(10, 8, 56, 42);
  drawBrickPatch(164, 8, 12, 42);
  drawBrickPatch(284, 8, 34, 42);

  const wRng = makeRng(9125);
  for (let i = 0; i < 90; i += 1) {
    const sx = 68 + ((wRng() * 395) | 0);
    const sy = 10 + ((wRng() * 38) | 0);
    if (sx > 162 && sx < 178) continue;
    if (sx > 282 && sx < 320) continue;
    px(ctx, sx, sy, wRng() > 0.5 ? p.wallMid : p.wallShade);
  }

  rect(ctx, 8, 52, ROOM_WIDTH - 16, 1, p.chairRailHi);
  rect(ctx, 8, 53, ROOM_WIDTH - 16, 1, p.chairRail);
  rect(ctx, 8, 54, ROOM_WIDTH - 16, 1, p.chairRailSh);

  rect(ctx, 8, 55, ROOM_WIDTH - 16, 19, p.wainscotBg);
  for (let pxX = 12; pxX < 466; pxX += 20) {
    rect(ctx, pxX, 57, 16, 15, p.wainscotIn);
    rect(ctx, pxX, 57, 16, 1, p.wainscotSh);
    rect(ctx, pxX, 57, 1, 15, p.wainscotSh);
    rect(ctx, pxX + 1, 71, 15, 1, p.wainscotHi);
    rect(ctx, pxX + 15, 58, 1, 14, p.wainscotHi);
  }

  rect(ctx, 8, 74, ROOM_WIDTH - 16, 2, p.baseboard);
  rect(ctx, 8, 76, ROOM_WIDTH - 16, 1, p.outline);

  rect(ctx, 0, 0, 8, ROOM_HEIGHT, p.outerWall);
  rect(ctx, 7, 5, 1, ROOM_HEIGHT - 5, p.outerTrim);
  rect(ctx, ROOM_WIDTH - 8, 0, 8, ROOM_HEIGHT, p.outerWall);
  rect(ctx, ROOM_WIDTH - 8, 5, 1, ROOM_HEIGHT - 5, p.outerTrim);
}

function drawWindowFrame(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  p: RoomPalette
): void {
  rect(ctx, x - 1, y + h + 1, w + 4, 3, p.wallShadow);
  box(ctx, x, y, w, h, p.outline, p.outline);
  rect(ctx, x + 1, y + 1, w - 2, h - 2, p.winFrame);
  rect(ctx, x + 1, y + 1, w - 2, 1, p.winFrameHi);
  box(ctx, x - 2, y + h - 3, w + 4, 5, p.winSill, p.outline);
  rect(ctx, x - 1, y + h - 2, w + 2, 1, p.winSillHi);
}

function drawWindowBench(ctx: CanvasRenderingContext2D, p: RoomPalette): void {
  const bx = 92;
  const by = 76;
  const bw = 44;
  const bh = 10;
  rect(ctx, bx + 1, by + bh, bw - 2, 3, p.castShadow);
  box(ctx, bx, by, bw, bh, p.deskWalnut, p.outline);
  rect(ctx, bx + 1, by + 1, bw - 2, 4, p.sofaBase);
  rect(ctx, bx + 2, by + 1, bw - 4, 1, p.sofaHi);
  box(ctx, bx + 3, by - 1, 9, 5, p.sofaPillowA, p.outline);
  rect(ctx, bx + 4, by, 7, 1, '#fef08a');
}

function drawServerRack(ctx: CanvasRenderingContext2D, p: RoomPalette): void {
  const x = 13;
  const y = 14;
  const w = 32;
  const h = 64;
  rect(ctx, x - 1, 78, w + 5, 4, p.castShadow);
  box(ctx, x, y, w, h, '#222836', p.outline);
  rect(ctx, x + 1, y + 1, w - 2, 2, '#3d465c');
  for (let gx = x + 4; gx < x + w - 4; gx += 2) {
    px(ctx, gx, y + 4, '#11141c');
  }
  box(ctx, x + 3, y + 7, w - 6, h - 11, '#121620', '#414b63');
  for (let i = 0; i < 5; i += 1) {
    const by = y + 9 + i * 10;
    box(ctx, x + 4, by, w - 8, 8, '#283042', '#0f121a');
    rect(ctx, x + 5, by + 1, w - 10, 1, '#47536b');
    for (let dx = x + 6; dx < x + 18; dx += 3) {
      rect(ctx, dx, by + 3, 2, 3, '#171c26');
    }
    if (i === 1 || i === 3) {
      px(ctx, x + 19, by + 5, i === 1 ? '#38bdf8' : '#f59e0b');
      px(ctx, x + 20, by + 6, i === 1 ? '#38bdf8' : '#f59e0b');
    }
  }
  for (let i = 0; i < 16; i += 1) {
    px(ctx, x + 5 + i, y + 10 + i * 2, 'rgba(186, 230, 253, 0.14)');
  }

  const pxX = 49;
  const pxY = 59;
  rect(ctx, pxX + 1, 78, 12, 3, p.castShadow);
  rect(ctx, pxX + 2, pxY - 6, 2, 13, p.plantMid);
  rect(ctx, pxX + 5, pxY - 10, 2, 17, p.plantHi);
  rect(ctx, pxX + 8, pxY - 5, 2, 12, p.plantDark);
  px(ctx, pxX + 2, pxY - 3, p.plantHi);
  px(ctx, pxX + 5, pxY - 7, p.plantDark);
  box(ctx, pxX + 1, pxY + 7, 11, 12, '#cbd5e1', p.outline);
  rect(ctx, pxX, pxY + 6, 13, 3, '#e2e8f0');
  rect(ctx, pxX, pxY + 6, 13, 1, p.outline);
  rect(ctx, pxX + 9, pxY + 9, 2, 9, '#94a3b8');
}

function drawKanbanGlassBoard(ctx: CanvasRenderingContext2D, p: RoomPalette): void {
  const x = 174;
  const y = 10;
  const w = 84;
  const h = 40;
  rect(ctx, x + 2, y + 2, w, h + 1, p.wallShadow);
  rect(ctx, x - 1, y + 2, 2, 2, '#94a3b8');
  rect(ctx, x + w - 1, y + 2, 2, 2, '#94a3b8');
  rect(ctx, x - 1, y + h - 5, 2, 2, '#94a3b8');
  rect(ctx, x + w - 1, y + h - 5, 2, 2, '#94a3b8');

  box(ctx, x, y, w, h - 2, '#d8e4f0', p.outline);
  rect(ctx, x + 2, y + 2, w - 4, h - 7, '#f3f8fc');
  rect(ctx, x + 2, y + 2, w - 4, 2, '#e2ecf5');

  rect(ctx, x + 5, y + 5, 24, 2, '#475569');
  rect(ctx, x + 56, y + 5, 22, 2, '#cbd5e1');
  rect(ctx, x + 56, y + 5, 16, 2, '#10b981');

  rect(ctx, x + 28, y + 9, 1, h - 16, '#cbd5e1');
  rect(ctx, x + 55, y + 9, 1, h - 16, '#cbd5e1');

  rect(ctx, x + 6, y + 9, 16, 2, '#64748b');
  rect(ctx, x + 33, y + 9, 16, 2, '#3b82f6');
  rect(ctx, x + 60, y + 9, 16, 2, '#10b981');

  const cards: readonly [number, number, number, number, string][] = [
    [x + 6, y + 13, 9, 4, '#fde047'],
    [x + 17, y + 13, 8, 4, '#fb7185'],
    [x + 6, y + 19, 11, 4, '#93c5fd'],
    [x + 32, y + 13, 10, 4, '#86efac'],
    [x + 44, y + 13, 8, 4, '#c4b5fd'],
    [x + 33, y + 19, 12, 4, '#fdba74'],
    [x + 59, y + 13, 10, 4, '#86efac'],
    [x + 71, y + 13, 8, 4, '#93c5fd'],
    [x + 60, y + 19, 11, 4, '#fde047'],
  ];
  for (const [cx, cy, cw, ch, col] of cards) {
    rect(ctx, cx + 1, cy + 1, cw, ch, '#cbd5e1');
    rect(ctx, cx, cy, cw, ch, col);
    rect(ctx, cx + 1, cy + 1, cw - 3, 1, 'rgba(255,255,255,0.5)');
  }

  box(ctx, x + 7, y + 26, 11, 6, '#e0f2fe', '#0284c7');
  rect(ctx, x + 19, y + 29, 5, 1, '#64748b');
  box(ctx, x + 32, y + 26, 12, 6, '#dcfce7', '#16a34a');
  rect(ctx, x + 45, y + 29, 6, 1, '#64748b');
  box(ctx, x + 59, y + 26, 12, 6, '#fef3c7', '#d97706');

  rect(ctx, x + 8, y + h - 3, w - 16, 3, '#64748b');
  rect(ctx, x + 14, y + h - 4, 7, 2, '#ef4444');
  rect(ctx, x + 23, y + h - 4, 7, 2, '#2563eb');
  rect(ctx, x + 64, y + h - 4, 9, 2, '#1e293b');
}

function drawWallClockAndShelf(ctx: CanvasRenderingContext2D, p: RoomPalette): void {
  const cx = 271;
  const cy = 22;
  const r = 9;
  rect(ctx, cx - r + 1, cy - r + 1, r * 2 + 1, r * 2 + 1, 'rgba(0,0,0,0.14)');
  for (let dy = -r; dy <= r; dy += 1) {
    for (let dx = -r; dx <= r; dx += 1) {
      const d2 = dx * dx + dy * dy;
      if (d2 <= r * r + 2) {
        if (d2 >= (r - 1) * (r - 1)) px(ctx, cx + dx, cy + dy, p.outline);
        else if (d2 >= (r - 2) * (r - 2)) px(ctx, cx + dx, cy + dy, p.clockRim);
        else px(ctx, cx + dx, cy + dy, p.clockFace);
      }
    }
  }
  px(ctx, cx, cy - 6, '#475569');
  px(ctx, cx, cy + 6, '#475569');
  px(ctx, cx - 6, cy, '#475569');
  px(ctx, cx + 6, cy, '#475569');

  rect(ctx, 262, 46, 20, 2, p.wallShadow);
  box(ctx, 261, 42, 21, 4, p.deskWalnut, p.outline);
  rect(ctx, 262, 43, 19, 1, p.deskWalnutHi);
  rect(ctx, 264, 36, 5, 4, '#facc15');
  rect(ctx, 266, 40, 1, 2, '#ca8a04');
  rect(ctx, 265, 41, 3, 1, '#a16207');
  rect(ctx, 274, 37, 4, 2, p.plantHi);
  box(ctx, 273, 39, 6, 3, p.potFill, p.outline);
}

function drawIndiePosters(ctx: CanvasRenderingContext2D, p: RoomPalette): void {
  const x = 288;
  const y = 12;
  const w = 26;
  const h = 34;
  rect(ctx, x + 1, y + 1, w, h, p.wallShadow);
  box(ctx, x, y, w, h, '#a67549', p.outline);
  rect(ctx, x + 2, y + 2, w - 4, h - 4, '#f5efe6');
  const ax = x + 4;
  const ay = y + 4;
  const aw = w - 8;
  const ah = h - 8;
  rect(ctx, ax, ay, aw, 6, '#1e1b4b');
  rect(ctx, ax, ay + 6, aw, 6, '#6d28d9');
  rect(ctx, ax, ay + 12, aw, 6, '#ea580c');
  rect(ctx, ax, ay + 18, aw, ah - 18, '#fbbf24');
  rect(ctx, ax + 6, ay + 12, 6, 6, '#fef08a');
  for (let i = 0; i < 8; i += 1) {
    rect(ctx, ax + i, ay + ah - 1 - i, 1, i + 1, '#1e1b4b');
    rect(ctx, ax + aw - 1 - i, ay + ah - 1 - i, 1, i + 1, '#1e1b4b');
  }
  rect(ctx, ax + 5, ay + ah - 5, 8, 5, '#312e81');
  px(ctx, ax + 3, ay + 3, '#fef9c3');
  px(ctx, ax + 14, ay + 4, '#fef9c3');
  rect(ctx, ax + 4, ay + 7, 2, 4, '#f8fafc');
  px(ctx, ax + 4, ay + 11, '#f97316');
}

function drawOverheadPendants(ctx: CanvasRenderingContext2D, p: RoomPalette): void {
  const isLit = p.timeState !== 'sleeping' || p.lampOn;
  for (const lx of PENDANT_XS) {
    rect(ctx, lx, 5, 1, 9, p.outline);
    rect(ctx, lx - 1, 13, 3, 2, p.pendantBrass);
    rect(ctx, lx - 3, 15, 7, 2, p.pendantShade);
    rect(ctx, lx - 4, 17, 9, 2, p.outline);
    rect(ctx, lx - 3, 17, 7, 1, p.pendantShade);
    rect(ctx, lx - 2, 19, 5, 1, isLit ? p.pendantGlow : p.chassisShadow);
  }
}

function drawBookshelfAndTurntable(ctx: CanvasRenderingContext2D, p: RoomPalette): void {
  const x = 418;
  const y = 18;
  const w = 50;
  const h = 80;
  rect(ctx, x - 1, y + h, w + 3, 4, p.castShadow);
  box(ctx, x, y, w, h, '#6f472d', p.outline);
  rect(ctx, x + 1, y + 1, w - 2, 2, '#916040');

  const topSy = y + 3;
  rect(ctx, x + 3, topSy, w - 6, 12, '#2f1b11');
  rect(ctx, x + 2, topSy + 12, w - 4, 2, '#916040');
  drawMatrix(
    ctx,
    HONDA_CUB_MATRIX,
    {
      o: p.outline,
      G: p.cubGreenMid,
      L: p.cubGreenLight,
      D: p.cubGreenShadow,
      C: p.cubCream,
      S: p.cubSeat,
      T: '#232836',
      M: '#94a3b8',
      R: '#e05347',
      Y: '#facc15',
      H: '#f8fafc',
    },
    x + 3,
    topSy
  );
  box(ctx, x + 36, topSy + 7, 8, 5, p.potFill, p.outline);
  rect(ctx, x + 35, topSy + 4, 9, 4, p.plantMid);
  rect(ctx, x + 37, topSy + 3, 5, 2, p.plantHi);

  const bookColors = [
    '#e05a47',
    '#3b82c4',
    '#4ca674',
    '#eab308',
    '#a855f7',
    '#ec4899',
    '#f97316',
    '#e2e8f0',
    '#6366f1',
  ];
  const rng = makeRng(7743);

  for (let s = 1; s < 3; s += 1) {
    const sy = y + 4 + s * 13;
    rect(ctx, x + 3, sy, w - 6, 11, '#2f1b11');
    rect(ctx, x + 2, sy + 11, w - 4, 2, '#916040');
    let bx = x + 4;
    while (bx < x + w - 7) {
      if (s === 1 && bx > x + 32) {
        rect(ctx, x + 35, sy + 3, 6, 6, '#38bdf8');
        rect(ctx, x + 36, sy + 4, 2, 3, '#4ade80');
        rect(ctx, x + 37, sy + 9, 2, 2, '#cbd5e1');
        break;
      }
      if (rng() < 0.14) {
        bx += 3;
        continue;
      }
      const bw = 2 + ((rng() * 2) | 0);
      const bh = 6 + ((rng() * 4) | 0);
      const col = bookColors[(rng() * bookColors.length) | 0];
      rect(ctx, bx, sy + (11 - bh), bw, bh, col);
      px(ctx, bx, sy + (11 - bh), 'rgba(255,255,255,0.32)');
      px(ctx, bx + bw - 1, sy + 10, 'rgba(0,0,0,0.28)');
      bx += bw + 1;
    }
  }

  const ty = y + 43;
  rect(ctx, x + 3, ty, w - 6, 16, '#2b1910');
  rect(ctx, x + 2, ty + 16, w - 4, 2, '#916040');
  box(ctx, x + 6, ty + 7, 22, 9, '#b68254', p.outline);
  rect(ctx, x + 8, ty + 6, 13, 7, p.vinylDisc);
  rect(ctx, x + 13, ty + 8, 3, 3, p.vinylLabel);
  px(ctx, x + 14, ty + 9, '#f8fafc');
  rect(ctx, x + 23, ty + 8, 2, 5, '#cbd5e1');
  box(ctx, x + 31, ty + 4, 12, 12, '#3d2a20', p.outline);
  rect(ctx, x + 34, ty + 6, 6, 4, '#1e293b');
  rect(ctx, x + 35, ty + 11, 4, 4, '#1e293b');

  const vy = y + 61;
  rect(ctx, x + 3, vy, w - 6, 15, '#2b1910');
  rect(ctx, x + 23, vy, 2, 15, '#916040');
  const sleeveCols = ['#f97316', '#38bdf8', '#eab308', '#a855f7', '#ec4899', '#10b981', '#f8fafc'];
  for (let i = 0; i < 6; i += 1) {
    rect(ctx, x + 5 + i * 3, vy + 3, 2, 12, sleeveCols[i % sleeveCols.length]);
    rect(ctx, x + 27 + i * 3, vy + 4, 2, 11, sleeveCols[(i + 3) % sleeveCols.length]);
  }

  const vinePts: readonly [number, number][] = [
    [x + 44, y + 10],
    [x + 45, y + 14],
    [x + 46, y + 18],
    [x + 45, y + 23],
    [x + 46, y + 28],
    [x + 45, y + 34],
    [x + 46, y + 39],
    [x + 44, y + 44],
  ];
  for (const [vx, vyPt] of vinePts) {
    rect(ctx, vx, vyPt, 3, 3, p.plantMid);
    px(ctx, vx + 1, vyPt, p.plantHi);
    px(ctx, vx, vyPt + 2, p.plantDark);
  }
}

function drawCoffeeBarFridgeAndCooler(ctx: CanvasRenderingContext2D, p: RoomPalette): void {
  const cx = 322;
  const cy = 60;
  const cw = 52;
  const ch = 38;
  rect(ctx, cx, cy + ch, cw + 2, 4, p.castShadow);
  box(ctx, cx, cy + 12, cw, ch - 12, '#7d4f32', p.outline);
  box(ctx, cx - 1, cy + 9, cw + 2, 5, '#d49d6a', p.outline);
  rect(ctx, cx, cy + 10, cw, 1, '#f0d7b5');
  box(ctx, cx + 3, cy + 16, 21, 18, '#663e25', '#472a18');
  box(ctx, cx + 28, cy + 16, 21, 18, '#663e25', '#472a18');
  rect(ctx, cx + 21, cy + 22, 1, 4, '#eab308');
  rect(ctx, cx + 30, cy + 22, 1, 4, '#eab308');

  const mx = 326;
  const my = 50;
  box(ctx, mx, my + 4, 20, 15, '#cbd5e1', p.outline);
  rect(ctx, mx + 1, my + 5, 18, 2, '#f8fafc');
  rect(ctx, mx + 3, my + 9, 14, 7, '#334155');
  box(ctx, mx + 5, my, 10, 5, '#64748b', p.outline);
  rect(ctx, mx + 6, my + 1, 8, 3, '#451a03');
  rect(ctx, mx + 4, my + 6, 3, 2, '#f8fafc');
  rect(ctx, mx + 8, my + 9, 4, 2, '#e2e8f0');
  rect(ctx, mx + 12, my + 10, 4, 1, '#78350f');
  rect(ctx, mx + 8, my + 13, 4, 4, '#f8fafc');
  rect(ctx, mx + 9, my + 13, 2, 1, '#78350f');
  rect(ctx, mx + 3, my + 17, 14, 1, '#e2e8f0');
  px(ctx, mx + 16, my + 7, '#22c55e');

  rect(ctx, cx + 27, cy + 3, 6, 6, '#e0f2fe');
  rect(ctx, cx + 28, cy + 5, 4, 4, '#78350f');
  rect(ctx, cx + 27, cy, 6, 3, '#f8fafc');
  rect(ctx, cx + 36, cy + 4, 5, 5, '#f8fafc');
  rect(ctx, cx + 36, cy - 1, 5, 5, '#fde047');
  box(ctx, cx + 43, cy + 2, 6, 7, '#78350f', p.outline);
  rect(ctx, cx + 43, cy + 1, 6, 2, '#d97706');

  const fx = 377;
  const fy = 62;
  const fw = 17;
  const fh = 36;
  rect(ctx, fx, fy + fh, fw + 1, 4, p.castShadow);
  box(ctx, fx, fy, fw, fh, p.fridgeBody, p.outline);
  rect(ctx, fx + 1, fy + 1, fw - 2, 2, p.fridgeHi);
  rect(ctx, fx + fw - 3, fy + 2, 2, fh - 4, p.fridgeSh);
  rect(ctx, fx + 1, fy + 11, fw - 2, 1, p.outline);
  rect(ctx, fx + 3, fy + 5, 2, 4, '#e2e8f0');
  rect(ctx, fx + 3, fy + 15, 2, 7, '#e2e8f0');
  px(ctx, fx + 9, fy + 16, '#ef4444');
  px(ctx, fx + 11, fy + 19, '#facc15');
  rect(ctx, fx + 8, fy + 22, 4, 3, '#f8fafc');

  const wx = 397;
  const wy = 52;
  rect(ctx, wx, 98, 18, 4, p.castShadow);
  box(ctx, wx + 1, wy + 17, 16, 29, '#e2e8f0', p.outline);
  rect(ctx, wx + 2, wy + 18, 2, 27, '#ffffff');
  rect(ctx, wx + 14, wy + 18, 2, 27, '#94a3b8');
  rect(ctx, wx + 4, wy + 21, 10, 8, '#64748b');
  px(ctx, wx + 6, wy + 22, '#3b82f6');
  px(ctx, wx + 11, wy + 22, '#ef4444');
  box(ctx, wx + 2, wy + 1, 14, 16, '#60a5fa', p.outline);
  rect(ctx, wx + 4, wy + 2, 2, 13, '#bae6fd');
  rect(ctx, wx + 11, wy + 3, 4, 12, '#3b82f6');
  rect(ctx, wx + 6, wy - 1, 6, 3, '#2563eb');
}

function drawLoungeBase(ctx: CanvasRenderingContext2D, p: RoomPalette): void {
  const rx = 332;
  const ry = 152;
  const rw = 128;
  const rh = 106;
  rect(ctx, rx, ry, rw, rh, p.kilimBg);
  rect(ctx, rx + 2, ry + 2, rw - 4, rh - 4, p.kilimBorder);
  rect(ctx, rx + 5, ry + 5, rw - 10, rh - 10, p.kilimBg);
  rect(ctx, rx + 7, ry + 7, rw - 14, rh - 14, p.kilimAccent);
  rect(ctx, rx + 9, ry + 9, rw - 18, rh - 18, p.kilimBg);

  for (let cy = ry + 24; cy <= ry + rh - 22; cy += 26) {
    for (let cx = rx + 24; cx <= rx + rw - 22; cx += 26) {
      for (let d = -7; d <= 7; d += 1) {
        const span = 7 - Math.abs(d);
        rect(ctx, cx - span, cy + d, span * 2 + 1, 1, p.kilimSage);
      }
      rect(ctx, cx - 2, cy - 2, 5, 5, p.kilimAccent);
      px(ctx, cx, cy, p.kilimBorder);
    }
  }
  for (let fy = ry + 3; fy < ry + rh - 2; fy += 3) {
    rect(ctx, rx - 2, fy, 2, 1, p.kilimAccent);
    rect(ctx, rx + rw, fy, 2, 1, p.kilimAccent);
  }

  const sx = 348;
  const sy = 162;
  const sw = 106;
  rect(ctx, sx + 2, sy + 33, 84, 5, p.castShadow);
  rect(ctx, 424, 217, 28, 4, p.castShadow);
  rect(ctx, sx + 4, sy + 33, 4, 3, '#5c3b28');
  rect(ctx, 424, 216, 4, 3, '#5c3b28');
  rect(ctx, 446, 216, 4, 3, '#5c3b28');

  box(ctx, sx + 6, sy, sw - 12, 18, p.sofaBase, p.outline);
  rect(ctx, sx + 8, sy + 2, sw - 16, 3, p.sofaHi);
  for (let tx = sx + 18; tx < sx + sw - 14; tx += 18) {
    px(ctx, tx, sy + 8, p.sofaSh);
  }

  for (let c = 0; c < 3; c += 1) {
    const cx = sx + 8 + c * 29;
    box(ctx, cx, sy + 14, 30, 19, p.sofaBase, p.outline);
    rect(ctx, cx + 2, sy + 15, 26, 3, p.sofaHi);
    rect(ctx, cx + 2, sy + 29, 26, 3, p.sofaSh);
  }

  box(ctx, 422, 184, 28, 33, p.sofaBase, p.outline);
  rect(ctx, 424, 186, 24, 3, p.sofaHi);
  rect(ctx, 424, 212, 24, 4, p.sofaSh);

  box(ctx, sx, sy + 8, 10, 26, p.sofaBase, p.outline);
  rect(ctx, sx + 2, sy + 9, 6, 4, p.sofaHi);
  box(ctx, sx + sw - 10, sy + 8, 10, 38, p.sofaBase, p.outline);
  rect(ctx, sx + sw - 8, sy + 9, 6, 4, p.sofaHi);

  box(ctx, sx + 2, sy + 13, 12, 17, p.blanketA, p.outline);
  for (let by = sy + 15; by < sy + 29; by += 3) {
    rect(ctx, sx + 3, by, 10, 1, p.blanketB);
  }
  box(ctx, sx + 13, sy + 10, 11, 9, p.sofaPillowA, p.outline);
  rect(ctx, sx + 15, sy + 12, 6, 3, '#fde68a');
  box(ctx, 430, sy + 11, 11, 9, p.sofaPillowB, p.outline);
  rect(ctx, 432, sy + 13, 5, 3, '#fecaca');
}

function drawHeroDeskOneBase(ctx: CanvasRenderingContext2D, slot: DeskSlot, p: RoomPalette): void {
  const dx = slot.x - 26;
  const dy = slot.y - 16;
  const dw = 52;
  const dh = 20;

  rect(ctx, dx + 2, dy + 22, dw - 4, 7, p.castShadow);
  rect(ctx, slot.chairX - 8, slot.chairY - 4, 16, 7, p.castShadow);

  rect(ctx, dx + 3, dy + 20, 4, 10, p.deskLeg);
  rect(ctx, dx + dw - 7, dy + 20, 4, 10, p.deskLeg);
  rect(ctx, dx + 3, dy + 28, 5, 2, p.outline);
  rect(ctx, dx + dw - 8, dy + 28, 5, 2, p.outline);

  box(ctx, dx, dy, dw, dh, p.deskTop, p.outline);
  rect(ctx, dx + 1, dy + 1, dw - 2, 2, p.deskTopHi);
  rect(ctx, dx + 4, dy + 6, 17, 1, p.deskTopSh);
  rect(ctx, dx + 29, dy + 11, 15, 1, p.deskTopSh);
  box(ctx, dx, dy + dh - 1, dw, 6, p.deskFront, p.outline);
  rect(ctx, dx + 1, dy + dh, dw - 2, 1, p.deskTopSh);

  rect(ctx, 44, 121, 28, 9, '#29394d');

  box(ctx, 47, 123, 16, 5, '#1e293b', p.outline);
  for (let kx = 49; kx <= 60; kx += 2) {
    px(ctx, kx, 124, '#cbd5e1');
    px(ctx, kx, 126, '#94a3b8');
  }
  px(ctx, 49, 124, '#f97316');
  rect(ctx, 53, 126, 5, 1, '#e2e8f0');
  box(ctx, 65, 124, 4, 4, '#334155', p.outline);
  px(ctx, 66, 125, '#94a3b8');

  const drawSpeaker = (sx: number, sy: number): void => {
    box(ctx, sx, sy, 6, 11, p.chassisMid, p.outline);
    rect(ctx, sx + 1, sy + 1, 4, 1, p.chassisRim);
    rect(ctx, sx + 2, sy + 2, 2, 2, p.speakerConeRim);
    rect(ctx, sx + 1, sy + 5, 4, 4, p.speakerConeDark);
    rect(ctx, sx + 2, sy + 6, 2, 2, p.speakerConeRim);
  };
  drawSpeaker(33, 106);
  drawSpeaker(77, 106);

  rect(ctx, 50, 114, 4, 3, p.chassisShadow);
  rect(ctx, 47, 116, 10, 2, p.chassisMid);
  box(ctx, 41, 103, 22, 12, '#1e293b', p.outline);
  rect(ctx, 42, 104, 20, 1, p.chassisRim);

  box(ctx, 65, 107, 10, 8, p.chassisLight, p.outline);
  rect(ctx, 64, 115, 12, 2, p.chassisRim);
  rect(ctx, 65, 116, 10, 1, p.chassisShadow);

  box(ctx, 34, 122, 5, 5, p.mugLight, p.outline);
  rect(ctx, 35, 123, 3, 1, p.coffeeSurface);
  px(ctx, 39, 124, p.outline);

  rect(ctx, 78, 125, 5, 2, p.chassisShadow);
  rect(ctx, 80, 119, 1, 6, p.lampShadeMid);
  rect(ctx, 77, 118, 3, 1, p.lampShadeLight);
  box(ctx, 74, 117, 6, 4, p.lampShadeMid, p.outline);
  rect(ctx, 75, 118, 4, 1, p.lampShadeLight);
  rect(ctx, 75, 121, 4, 1, p.lampOn ? p.lampBulbGlow : p.chassisShadow);

  const cx = slot.chairX;
  const cy = slot.chairY;
  rect(ctx, cx - 5, cy - 1, 10, 2, p.chairMetal);
  px(ctx, cx - 6, cy + 1, p.outline);
  px(ctx, cx + 5, cy + 1, p.outline);
  px(ctx, cx, cy + 1, p.outline);
  rect(ctx, cx - 1, cy - 5, 2, 4, p.chairMetal);
  box(ctx, cx - 7, cy - 10, 14, 6, p.chairFabric, p.outline);
  rect(ctx, cx - 6, cy - 9, 12, 1, p.chairHi);
}

function drawDeskAndChairBase(
  ctx: CanvasRenderingContext2D,
  slot: DeskSlot,
  index: number,
  p: RoomPalette
): void {
  if (index === 0) {
    drawHeroDeskOneBase(ctx, slot, p);
    return;
  }

  const dx = slot.x - 26;
  const dy = slot.y - 16;
  const dw = 52;
  const dh = 20;

  const topCol = index % 3 === 1 ? p.deskWalnut : index % 3 === 2 ? p.deskBirch : p.deskTop;
  const hiCol = index % 3 === 1 ? p.deskWalnutHi : index % 3 === 2 ? p.deskBirchHi : p.deskTopHi;

  rect(ctx, dx + 2, dy + 22, dw - 4, 7, p.castShadow);
  rect(ctx, slot.chairX - 8, slot.chairY - 4, 16, 7, p.castShadow);

  rect(ctx, dx + 3, dy + 20, 4, 10, p.deskLeg);
  rect(ctx, dx + dw - 7, dy + 20, 4, 10, p.deskLeg);
  rect(ctx, dx + 3, dy + 28, 5, 2, p.outline);
  rect(ctx, dx + dw - 8, dy + 28, 5, 2, p.outline);

  box(ctx, dx, dy, dw, dh, topCol, p.outline);
  rect(ctx, dx + 1, dy + 1, dw - 2, 2, hiCol);
  rect(ctx, dx + 4, dy + 6, 17, 1, p.deskTopSh);
  rect(ctx, dx + 29, dy + 11, 15, 1, p.deskTopSh);
  box(ctx, dx, dy + dh - 1, dw, 6, p.deskFront, p.outline);
  rect(ctx, dx + 1, dy + dh, dw - 2, 1, p.deskTopSh);

  const matColors = [
    '#29394d',
    '#244743',
    '#384742',
    '#2b404d',
    '#28364a',
    '#4a3533',
    '#27314a',
    '#3d304a',
  ];
  rect(ctx, slot.x - 14, dy + 9, 28, 9, matColors[index % matColors.length]);

  box(ctx, slot.x - 11, dy + 11, 16, 5, '#1e293b', p.outline);
  for (let kx = slot.x - 9; kx <= slot.x + 2; kx += 2) {
    px(ctx, kx, dy + 12, '#cbd5e1');
    px(ctx, kx, dy + 14, '#94a3b8');
  }
  px(ctx, slot.x - 9, dy + 12, index % 2 === 0 ? '#f97316' : '#38bdf8');
  rect(ctx, slot.x - 5, dy + 14, 5, 1, '#e2e8f0');
  box(ctx, slot.x + 7, dy + 12, 4, 4, '#334155', p.outline);
  px(ctx, slot.x + 8, dy + 13, '#94a3b8');

  const my = slot.monitorY - 12;
  if (index === 3) {
    const m1x = slot.monitorX - 16;
    const m2x = slot.monitorX + 1;
    rect(ctx, m1x + 6, my + 11, 3, 3, '#334155');
    rect(ctx, m2x + 6, my + 11, 3, 3, '#334155');
    rect(ctx, m1x + 4, my + 13, 7, 2, '#1e293b');
    rect(ctx, m2x + 4, my + 13, 7, 2, '#1e293b');
    box(ctx, m1x, my, 15, 12, '#1e293b', p.outline);
    box(ctx, m2x, my, 15, 12, '#1e293b', p.outline);
  } else if (index === 1 || index === 7) {
    const mx = slot.monitorX - 15;
    const vx = slot.monitorX + 7;
    rect(ctx, mx + 9, my + 11, 3, 3, '#334155');
    rect(ctx, mx + 6, my + 13, 9, 2, '#1e293b');
    box(ctx, mx, my + 1, 20, 11, '#1e293b', p.outline);
    rect(ctx, vx + 3, my + 11, 3, 3, '#334155');
    box(ctx, vx, my - 2, 10, 14, '#1e293b', p.outline);
  } else if (index === 2) {
    const mx = slot.monitorX - 10;
    rect(ctx, mx + 8, my + 11, 4, 3, '#475569');
    box(ctx, mx, my, 20, 11, '#334155', p.outline);
    box(ctx, slot.x - 14, dy + 10, 11, 7, '#334155', p.outline);
    rect(ctx, slot.x - 13, dy + 11, 9, 5, '#1e293b');
    rect(ctx, dx + dw - 12, dy + 3, 3, 4, '#fb7185');
    rect(ctx, dx + dw - 9, dy + 4, 3, 4, '#facc15');
    rect(ctx, dx + dw - 6, dy + 5, 3, 4, '#38bdf8');
  } else if (index === 4) {
    const mx = slot.monitorX - 13;
    rect(ctx, mx + 8, my + 11, 3, 3, '#94a3b8');
    box(ctx, mx, my, 19, 12, '#334155', p.outline);
    box(ctx, slot.monitorX + 8, my + 4, 11, 8, '#64748b', p.outline);
    rect(ctx, slot.monitorX + 7, dy + 9, 13, 2, '#94a3b8');
  } else {
    const mx = slot.monitorX - 11;
    rect(ctx, mx + 9, my + 11, 4, 3, '#334155');
    rect(ctx, mx + 6, my + 13, 10, 2, '#1e293b');
    box(ctx, mx, my, 22, 12, '#1e293b', p.outline);
  }

  const lampLeft = index % 2 === 0;
  const lx = lampLeft ? dx + 3 : dx + dw - 9;
  const ly = dy + 2;
  rect(ctx, lx + 1, ly + 8, 5, 2, '#475569');
  rect(ctx, lx + 3, ly + 3, 1, 5, '#94a3b8');
  box(ctx, lx, ly, 6, 4, index % 3 === 0 ? '#d97706' : '#334155', p.outline);
  rect(ctx, lx + 1, ly + 3, 4, 1, p.timeState === 'sleeping' ? '#475569' : '#fef08a');

  const mugX = lampLeft ? dx + dw - 9 : dx + 4;
  const mugColors = [
    '#f8fafc',
    '#ef4444',
    '#f59e0b',
    '#14b8a6',
    '#f8fafc',
    '#4ade80',
    '#38bdf8',
    '#c084fc',
  ];
  box(ctx, mugX, dy + 11, 5, 5, mugColors[index % mugColors.length], p.outline);
  rect(ctx, mugX + 1, dy + 12, 3, 1, '#78350f');
  px(ctx, mugX + 5, dy + 13, p.outline);

  if (index === 1) {
    rect(ctx, dx + 3, dy + 12, 4, 3, '#facc15');
    rect(ctx, dx + 4, dy + 10, 3, 2, '#fde047');
    px(ctx, dx + 7, dy + 11, '#f97316');
  } else if (index === 5) {
    rect(ctx, dx + dw - 14, dy + 3, 5, 4, '#f8fafc');
    px(ctx, dx + dw - 14, dy + 2, '#f97316');
    px(ctx, dx + dw - 10, dy + 2, '#1e293b');
    px(ctx, dx + dw - 11, dy + 4, '#f97316');
    box(ctx, dx + 10, dy + 11, 7, 5, '#e2e8f0', '#64748b');
  } else if (index === 3 || index === 7) {
    const sx = lampLeft ? dx + dw - 15 : dx + 10;
    rect(ctx, sx, dy + 3, 4, 3, p.plantMid);
    px(ctx, sx + 1, dy + 2, p.plantHi);
    box(ctx, sx, dy + 6, 4, 3, p.potFill, p.outline);
  } else if (index === 4) {
    rect(ctx, dx + 9, dy + 3, 7, 2, '#e0f2fe');
    px(ctx, dx + 15, dy + 3, '#0284c7');
  } else {
    rect(ctx, dx + dw - 15, dy + 4, 4, 4, '#fde047');
  }

  const cx = slot.chairX;
  const cy = slot.chairY;
  const cFill = index % 2 === 0 ? p.chairFabric : p.chairAlt;
  const cHi = index % 2 === 0 ? p.chairHi : p.chairAltHi;
  rect(ctx, cx - 5, cy - 1, 10, 2, p.chairMetal);
  px(ctx, cx - 6, cy + 1, p.outline);
  px(ctx, cx + 5, cy + 1, p.outline);
  px(ctx, cx, cy + 1, p.outline);
  rect(ctx, cx - 1, cy - 5, 2, 4, p.chairMetal);
  box(ctx, cx - 7, cy - 10, 14, 6, cFill, p.outline);
  rect(ctx, cx - 6, cy - 9, 12, 1, cHi);
}

const staticBaseCache = new Map<string, HTMLCanvasElement>();

function drawStaticBaseToContext(ctx: CanvasRenderingContext2D, p: RoomPalette): void {
  drawFloor(ctx, p);
  drawWalls(ctx, p);
  drawServerRack(ctx, p);
  drawWindowFrame(ctx, 72, 10, 90, 39, p);
  drawWindowBench(ctx, p);
  drawKanbanGlassBoard(ctx, p);
  drawWallClockAndShelf(ctx, p);
  drawIndiePosters(ctx, p);
  drawWindowFrame(ctx, 322, 10, 86, 39, p);
  drawOverheadPendants(ctx, p);
  drawBookshelfAndTurntable(ctx, p);
  drawCoffeeBarFridgeAndCooler(ctx, p);
  drawLoungeBase(ctx, p);

  for (let i = 0; i < DESK_SLOTS.length; i += 1) {
    drawDeskAndChairBase(ctx, DESK_SLOTS[i], i, p);
  }
}

function getStaticBase(p: RoomPalette): HTMLCanvasElement | null {
  const key = `${p.timeState}:${p.lampOn ? 1 : 0}`;
  const cached = staticBaseCache.get(key);
  if (cached) return cached;

  const canvas = createCanvas(ROOM_WIDTH, ROOM_HEIGHT);
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.imageSmoothingEnabled = false;
  drawStaticBaseToContext(ctx, p);
  staticBaseCache.set(key, canvas);
  return canvas;
}

function drawWindowSkyAnimated(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  timeMs: number,
  p: RoomPalette,
  phaseOffset: number
): void {
  const gx = x + 2;
  const gy = y + 2;
  const gw = w - 4;
  const gh = h - 6;
  const timeSec = timeMs * 0.001;
  const isNight = p.timeState === 'late_night' || p.timeState === 'sleeping';

  if (p.timeState === 'waking') {
    rect(ctx, gx, gy, gw, 8, p.skyTop);
    rect(ctx, gx, gy + 8, gw, 8, p.skyMid);
    rect(ctx, gx, gy + 16, gw, 8, p.skySunsetUpper);
    rect(ctx, gx, gy + 24, gw, gh - 24, p.skySunsetLower);
  } else if (p.timeState === 'late_night') {
    rect(ctx, gx, gy, gw, 9, p.skyTop);
    rect(ctx, gx, gy + 9, gw, 9, p.skyMid);
    rect(ctx, gx, gy + 18, gw, 8, p.skySunsetUpper);
    rect(ctx, gx, gy + 26, gw, gh - 26, p.skySunsetLower);
  } else {
    rect(ctx, gx, gy, gw, 11, p.skyTop);
    rect(ctx, gx, gy + 11, gw, 11, p.skyMid);
    rect(ctx, gx, gy + 22, gw, gh - 22, p.skyLow);
  }

  if (isNight) {
    const stars: readonly [number, number][] = [
      [8, 4],
      [22, 8],
      [37, 3],
      [51, 11],
      [67, 5],
      [79, 12],
      [15, 16],
      [60, 17],
    ];
    for (let i = 0; i < stars.length; i += 1) {
      const [sx, sy] = stars[i];
      const blink = ((Math.floor(timeMs / 480) + i * 3 + phaseOffset) % 5) === 0;
      px(ctx, gx + (sx % gw), gy + sy, blink ? '#fef08a' : '#93c5fd');
    }
    if (phaseOffset === 0) {
      rect(ctx, gx + 68, gy + 4, 5, 6, p.moonColor);
      rect(ctx, gx + 71, gy + 5, 3, 4, p.skyTop);
    }
    if (p.timeState === 'sleeping') {
      const starCycle = (timeSec + phaseOffset * 3.5) % 8.0;
      if (starCycle >= 1.2 && starCycle < 1.85) {
        const progress = (starCycle - 1.2) / 0.65;
        const headX = Math.round(gx + gw - 12 - progress * 26);
        const headY = Math.round(gy + 3 + progress * 11);
        for (let t = 0; t < 5; t += 1) {
          const tx = headX + t * 2;
          const ty = headY - t;
          if (tx >= gx && tx < gx + gw && ty >= gy && ty < gy + gh) {
            px(ctx, tx, ty, t === 0 ? p.shootingStarCore : p.shootingStarTrail);
          }
        }
      }
    }

    const buildings: readonly [number, number, number][] = [
      [0, 14, 13],
      [13, 18, 11],
      [24, 12, 14],
      [38, 21, 12],
      [50, 15, 13],
      [63, 19, 11],
      [74, 13, 14],
    ];
    for (let i = 0; i < buildings.length; i += 1) {
      const [bx, bh, bw] = buildings[i];
      if (bx >= gw) continue;
      const clampedW = Math.min(bw, gw - bx);
      const by = gy + gh - bh;
      rect(ctx, gx + bx, by, clampedW, bh, i % 2 === 0 ? p.treeNear : p.treeFar);
      const densityMod = p.timeState === 'sleeping' ? 2 : 3;
      for (let wy = by + 2; wy < gy + gh - 2; wy += 4) {
        for (let wx = bx + 2; wx < bx + clampedW - 2; wx += 4) {
          const lit = p.timeState === 'sleeping' ? (wx + wy + i) % 4 === 0 : (wx + wy + i) % densityMod !== 0;
          if (lit) {
            px(ctx, gx + wx, wy, (wx + i) % 2 === 0 ? p.cityWinAmber : p.cityWinCyan);
          }
        }
      }
    }
  } else {
    for (let bx = 0; bx < gw; bx += 5) {
      const hillH = 5 + ((Math.sin(bx * 0.25 + phaseOffset) * 2.5) | 0);
      rect(ctx, gx + bx, gy + gh - hillH - 2, 5, hillH + 2, p.treeFar);
      const nearH = 3 + ((Math.cos(bx * 0.35 + phaseOffset * 2) * 2) | 0);
      rect(ctx, gx + bx, gy + gh - nearH, 5, nearH, p.treeNear);
    }

    if (p.timeState === 'waking') {
      const birdCycle = (timeSec + phaseOffset * 2.5) % 10.5;
      if (birdCycle < 5.6) {
        const wingUp = Math.floor(timeSec * 4.5) % 2 === 0;
        const birds: readonly [number, number][] = [
          [Math.round(gx - 2 + birdCycle * 11), Math.round(gy + 6 + Math.sin(birdCycle * 2.1) * 1.5)],
          [Math.round(gx - 8 + birdCycle * 10.5), Math.round(gy + 10 + Math.cos(birdCycle * 1.8) * 1.2)],
        ];
        for (const [bx, by] of birds) {
          if (bx >= gx && bx + 2 < gx + gw && by >= gy && by + 1 < gy + gh) {
            if (wingUp) {
              px(ctx, bx, by, p.birdSilhouette);
              px(ctx, bx + 1, by + 1, p.birdSilhouette);
              px(ctx, bx + 2, by, p.birdSilhouette);
            } else {
              px(ctx, bx, by + 1, p.birdSilhouette);
              px(ctx, bx + 1, by, p.birdSilhouette);
              px(ctx, bx + 2, by + 1, p.birdSilhouette);
            }
          }
        }
      }
    }
  }

  const drift = Math.floor(timeMs * 0.005 + phaseOffset * 34);
  const clouds = [
    { base: 8, cy: gy + 6, w: 18 },
    { base: 52, cy: gy + 12, w: 20 },
  ];
  for (const c of clouds) {
    const cx = ((c.base + drift) % (gw + 22)) - 18;
    for (let dx = 0; dx < c.w; dx += 1) {
      const pxX = gx + cx + dx;
      if (pxX < gx || pxX >= gx + gw) continue;
      rect(ctx, pxX, c.cy + 2, 1, 2, p.cloudSh);
      rect(ctx, pxX, c.cy + 1, 1, 2, p.cloudHi);
      if (dx >= 3 && dx < c.w - 4) px(ctx, pxX, c.cy, p.cloudHi);
      if (dx >= 7 && dx < c.w - 7) px(ctx, pxX, c.cy - 1, p.cloudHi);
    }
  }

  const m1 = gx + ((gw / 3) | 0);
  const m2 = gx + (((gw * 2) / 3) | 0);
  rect(ctx, m1, gy, 2, gh, p.winFrame);
  rect(ctx, m2, gy, 2, gh, p.winFrame);
  rect(ctx, gx, gy + 15, gw, 2, p.winFrame);

  if (p.timeState === 'late_night' || (p.timeState === 'sleeping' && p.lampOn)) {
    const t = Math.floor(timeMs / 400);
    for (let fx = 3; fx < gw - 3; fx += 7) {
      const sag = Math.round(Math.sin((fx / gw) * Math.PI) * 4);
      const fy = gy + 2 + sag;
      px(ctx, gx + fx - 1, fy - 1, p.fairyWire);
      const warm = (fx + t) % 2 === 0 ? p.fairyBulbCore : p.fairyBulbWarm;
      px(ctx, gx + fx, fy, warm);
    }
  }

  for (let i = 0; i < 6; i += 1) {
    px(ctx, gx + 4 + i, gy + 4 + i, 'rgba(255,255,255,0.22)');
    px(ctx, m1 + 5 + i, gy + 5 + i, 'rgba(255,255,255,0.22)');
  }
}

function drawSunbeamsAndHalos(
  ctx: CanvasRenderingContext2D,
  timeMs: number,
  p: RoomPalette
): void {
  const windows = [74, 324];
  for (const wx of windows) {
    for (let row = 0; row < 64; row += 1) {
      const shift = (row * 0.55) | 0;
      const y = 49 + row;
      const xStart = wx + shift;
      const len = 82 - ((row * 0.35) | 0);
      if (len <= 0) continue;
      for (let xx = 0; xx < len; xx += 1) {
        if (((xx + row) & 1) === 0 && (row < 48 || ((xx + row) & 3) === 0)) {
          px(ctx, xStart + xx, y, xx < 6 || xx > len - 6 ? p.beamEdge : p.beamColor);
        }
      }
    }
  }

  if (p.timeState === 'waking' || p.timeState === 'working') {
    const t = timeMs * 0.0012;
    for (let i = 0; i < 10; i += 1) {
      const baseX = i < 5 ? 92 + i * 16 : 340 + (i - 5) * 15;
      const mx = baseX + Math.round(Math.sin(t + i * 1.7) * 5);
      const my = 62 + ((i * 11 + Math.floor(t * 4)) % 46);
      px(ctx, mx, my, p.moteColor);
    }
  }

  if (p.timeState !== 'sleeping' || p.lampOn) {
    for (const lx of PENDANT_XS) {
      ditherRect(ctx, lx - 6, 20, 13, 12, p.pendantHalo, null, 2);
    }
  }
}

function drawAnimatedClockHands(
  ctx: CanvasRenderingContext2D,
  timeMs: number,
  p: RoomPalette
): void {
  const cx = 271;
  const cy = 22;
  const sec = (timeMs / 1000) % 60;
  const min = (timeMs / 60000) % 60;
  const angM = (min / 60) * Math.PI * 2 - Math.PI / 2;
  const angS = (sec / 60) * Math.PI * 2 - Math.PI / 2;

  for (let r = 1; r <= 5; r += 1) {
    px(ctx, cx + Math.round(Math.cos(angM) * r), cy + Math.round(Math.sin(angM) * r), p.clockHand);
  }
  for (let r = 1; r <= 6; r += 1) {
    px(
      ctx,
      cx + Math.round(Math.cos(angS) * r),
      cy + Math.round(Math.sin(angS) * r),
      p.clockSecondHand
    );
  }
  px(ctx, cx, cy, p.outline);
}

function drawServerLeds(ctx: CanvasRenderingContext2D, timeMs: number): void {
  const t = Math.floor(timeMs / 170);
  const x = 13;
  const y = 14;
  for (let i = 0; i < 5; i += 1) {
    const by = y + 9 + i * 10;
    const onA = (t + i * 3) % 4 !== 0;
    const onB = (t + i * 5 + 1) % 3 === 0;
    px(ctx, x + 22, by + 3, onA ? '#22c55e' : '#14532d');
    px(ctx, x + 24, by + 3, onB ? (i === 3 ? '#f59e0b' : '#38bdf8') : '#1e293b');
  }
  const pulse = Math.floor(timeMs / 140) % 24;
  if (pulse < 18) {
    px(ctx, 29, 82 + pulse, '#38bdf8');
  }
}

function drawCafeAndTurntableAnimations(
  ctx: CanvasRenderingContext2D,
  timeMs: number,
  isMusicActive: boolean,
  p: RoomPalette
): void {
  if (p.timeState !== 'sleeping') {
    const tick = Math.floor(timeMs / 260);
    for (let i = 0; i < 3; i += 1) {
      const step = (tick + i * 2) % 6;
      const sx = 335 + ((step + i) % 2);
      const sy = 61 - step;
      px(ctx, sx, sy, step < 3 ? 'rgba(255,255,255,0.68)' : 'rgba(255,255,255,0.28)');
    }
  }

  const bStep = Math.floor(timeMs / 320) % 10;
  if (bStep < 7) {
    px(ctx, 405 + (bStep % 2), 66 - bStep, '#e0f2fe');
  }

  if (isMusicActive) {
    const lpStep = Math.floor(timeMs / 240) % 4;
    const glintOffsets: readonly [number, number][] = [
      [427, 68],
      [435, 68],
      [435, 72],
      [427, 72],
    ];
    const [gx, gy] = glintOffsets[lpStep];
    px(ctx, gx, gy, '#cbd5e1');
    px(ctx, 439, 69, '#f8fafc');
    px(ctx, 438, 70, '#cbd5e1');
    px(ctx, 459, 66, '#22c55e');
  }
}

function drawMonitorScreen(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  active: boolean,
  timeMs: number,
  variant: number | 'chart',
  p: RoomPalette
): void {
  const isNight = p.timeState === 'late_night' || p.timeState === 'sleeping';
  if (!active) {
    rect(ctx, sx, sy, sw, sh, '#0f172a');
    if (p.timeState !== 'sleeping') {
      const bTick = Math.floor(timeMs / 450);
      const bx = sx + 2 + (bTick % Math.max(2, sw - 4));
      const by = sy + 2 + (Math.floor(bTick / 3) % Math.max(2, sh - 4));
      rect(ctx, bx, by, 2, 2, '#334155');
    }
    return;
  }

  rect(ctx, sx, sy, sw, sh, '#0b132b');
  const tick = Math.floor(timeMs / 230);
  const syntaxColors = ['#38bdf8', '#4ade80', '#facc15', '#f472b6', '#c084fc'];

  if (variant === 'chart') {
    rect(ctx, sx + 1, sy + 1, sw - 2, 1, '#38bdf8');
    const bars = Math.max(3, Math.floor((sw - 3) / 3));
    for (let i = 0; i < bars; i += 1) {
      const barH = 2 + ((tick + i * 2) % Math.max(3, sh - 4));
      const col = syntaxColors[(i + 1) % syntaxColors.length];
      rect(ctx, sx + 2 + i * 3, sy + sh - 1 - barH, 2, barH, col);
    }
  } else {
    for (let row = 0; row < sh - 2; row += 2) {
      const lineIdx = (row + tick) % 7;
      const indent = (lineIdx % 3) * 2;
      const len = Math.min(sw - 3 - indent, 2 + ((lineIdx * 5 + row) % Math.max(2, sw - 4)));
      const col = syntaxColors[(lineIdx + variant) % syntaxColors.length];
      rect(ctx, sx + 1 + indent, sy + 1 + row, Math.max(2, len), 1, col);
    }
    if (tick % 2 === 0 && sw > 4 && sh > 4) {
      px(ctx, sx + sw - 3, sy + sh - 3, '#f8fafc');
    }
  }

  const glowAlpha = isNight ? 'rgba(56, 189, 248, 0.17)' : 'rgba(56, 189, 248, 0.08)';
  ditherRect(ctx, sx, sy + sh + 2, sw, 4, glowAlpha, null, 2);
}

function drawDeskAnimatedDetails(
  ctx: CanvasRenderingContext2D,
  slot: DeskSlot,
  index: number,
  activeSet: Set<string>,
  timeMs: number,
  p: RoomPalette
): void {
  const active = activeSet.has(slot.id);
  const my = slot.monitorY - 12;

  if (index === 0) {
    drawMonitorScreen(ctx, 42, 104, 20, 10, active, timeMs, 0, p);
    drawMonitorScreen(ctx, 66, 108, 8, 6, active, timeMs, 'chart', p);
    if (p.lampOn) {
      ditherRect(ctx, 70, 121, 12, 8, p.lampGlow, null, 2);
    }
    return;
  }

  if (index === 3) {
    drawMonitorScreen(ctx, slot.monitorX - 15, my + 1, 13, 10, active, timeMs, index, p);
    drawMonitorScreen(ctx, slot.monitorX + 2, my + 1, 13, 10, active, timeMs, 'chart', p);
  } else if (index === 1 || index === 7) {
    drawMonitorScreen(ctx, slot.monitorX - 14, my + 2, 18, 9, active, timeMs, index, p);
    drawMonitorScreen(ctx, slot.monitorX + 8, my - 1, 8, 12, active, timeMs, index + 2, p);
  } else if (index === 2) {
    drawMonitorScreen(ctx, slot.monitorX - 9, my + 1, 18, 9, active, timeMs, 'chart', p);
  } else if (index === 4) {
    drawMonitorScreen(ctx, slot.monitorX - 12, my + 1, 17, 10, active, timeMs, index, p);
    drawMonitorScreen(ctx, slot.monitorX + 9, my + 5, 9, 6, active, timeMs, 'chart', p);
  } else {
    drawMonitorScreen(ctx, slot.monitorX - 10, my + 1, 20, 10, active, timeMs, index, p);
  }

  if (p.timeState !== 'sleeping') {
    const lampLeft = index % 2 === 0;
    const dx = slot.x - 26;
    const dy = slot.y - 16;
    const lx = lampLeft ? dx + 3 : dx + 52 - 9;
    ditherRect(ctx, lx - 2, dy + 4, 10, 7, p.lampGlow, null, 2);
  }
}

export function drawRoomBaseLayer(
  ctx: CanvasRenderingContext2D,
  opts: DrawRoomBaseLayerOptions
): void {
  ctx.imageSmoothingEnabled = false;
  const p = opts.palette;
  const timeMs = (opts.elapsedSec ?? opts.tick / 15) * 1000;
  const activeSet =
    opts.activeDeskIds instanceof Set
      ? opts.activeDeskIds
      : new Set(opts.activeDeskIds ?? []);

  const staticLayer = getStaticBase(p);
  if (staticLayer) {
    ctx.drawImage(staticLayer, 0, 0);
  } else {
    drawStaticBaseToContext(ctx, p);
  }

  drawWindowSkyAnimated(ctx, 72, 10, 90, 39, timeMs, p, 0);
  drawWindowSkyAnimated(ctx, 322, 10, 86, 39, timeMs, p, 1);
  drawSunbeamsAndHalos(ctx, timeMs, p);

  drawAnimatedClockHands(ctx, timeMs, p);
  drawServerLeds(ctx, timeMs);
  drawCafeAndTurntableAnimations(ctx, timeMs, opts.isMusicActive, p);

  for (let i = 0; i < DESK_SLOTS.length; i += 1) {
    drawDeskAnimatedDetails(ctx, DESK_SLOTS[i], i, activeSet, timeMs, p);
  }
}

function drawErgonomicChairBack(
  ctx: CanvasRenderingContext2D,
  slot: DeskSlot,
  index: number,
  p: RoomPalette
): void {
  const cx = slot.chairX;
  const cy = slot.chairY;
  const cFill = index % 2 === 0 ? p.chairFabric : p.chairAlt;
  const cHi = index % 2 === 0 ? p.chairHi : p.chairAltHi;
  const cSh = index % 2 === 0 ? p.chairSh : p.chairAltSh;

  box(ctx, cx - 7, cy - 15, 14, 10, cFill, p.outline);
  rect(ctx, cx - 6, cy - 14, 12, 2, cHi);
  rect(ctx, cx - 5, cy - 11, 10, 4, cSh);
  rect(ctx, cx - 8, cy - 10, 2, 4, p.outline);
  rect(ctx, cx + 6, cy - 10, 2, 4, p.outline);
  px(ctx, cx - 8, cy - 10, p.chairMetal);
  px(ctx, cx + 7, cy - 10, p.chairMetal);
}

function drawCoffeeTable(ctx: CanvasRenderingContext2D, p: RoomPalette): void {
  const tx = 360;
  const ty = 218;
  const tw = 52;
  const th = 14;
  rect(ctx, tx + 2, ty + th, tw - 4, 3, p.castShadow);
  rect(ctx, tx + 3, ty + th - 2, 3, 4, '#4a2e1d');
  rect(ctx, tx + tw - 6, ty + th - 2, 3, 4, '#4a2e1d');
  box(ctx, tx, ty, tw, th - 2, p.deskBirch, p.outline);
  rect(ctx, tx + 1, ty + 1, tw - 2, 2, p.deskBirchHi);
  rect(ctx, tx + 1, ty + th - 4, tw - 2, 2, p.deskFront);

  box(ctx, tx + 8, ty + 3, 13, 6, '#f8fafc', '#94a3b8');
  rect(ctx, tx + 14, ty + 3, 1, 6, '#cbd5e1');
  rect(ctx, tx + 9, ty + 5, 4, 2, '#38bdf8');
  rect(ctx, tx + 22, ty + 5, 1, 4, '#f97316');
  rect(ctx, tx + 33, ty + 4, 6, 5, '#b68962');
  box(ctx, tx + 34, ty + 3, 4, 4, '#f8fafc', p.outline);
  rect(ctx, tx + 35, ty + 4, 2, 1, '#92400e');
}

function drawMonsteraPlant(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  p: RoomPalette
): void {
  rect(ctx, x + 3, y + 40, 22, 5, p.castShadow);
  box(ctx, x + 6, y + 26, 16, 15, p.potFill, p.outline);
  rect(ctx, x + 4, y + 24, 20, 4, p.potFill);
  rect(ctx, x + 4, y + 24, 20, 1, p.outline);
  rect(ctx, x + 4, y + 27, 20, 1, p.outline);
  rect(ctx, x + 17, y + 28, 4, 12, p.potSh);

  const leaves: readonly [number, number, number, number, string][] = [
    [x + 1, y + 8, 10, 10, p.plantDark],
    [x + 15, y + 7, 11, 10, p.plantDark],
    [x + 6, y + 2, 14, 12, p.plantMid],
    [x + 12, y + 12, 12, 10, p.plantMid],
    [x + 3, y + 13, 10, 9, p.plantHi],
  ];
  for (const [lx, ly, lw, lh, col] of leaves) {
    box(ctx, lx, ly, lw, lh, col, p.outline);
    rect(ctx, lx + 2, ly + 2, lw - 4, 2, p.plantHi);
    rect(ctx, lx + 2, ly + 5, 2, 1, p.plantDark);
    rect(ctx, lx + ((lw / 2) | 0), ly + 1, 1, lh - 2, p.plantDark);
  }
  rect(ctx, x + 13, y + 16, 2, 9, p.plantDark);
}

function drawFiddleLeafPlant(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  p: RoomPalette
): void {
  rect(ctx, x + 2, y + 27, 18, 4, p.castShadow);
  box(ctx, x + 4, y + 16, 14, 12, '#b68962', p.outline);
  for (let wy = y + 18; wy < y + 27; wy += 3) {
    rect(ctx, x + 5, wy, 12, 1, '#7d563c');
  }
  rect(ctx, x + 10, y + 6, 2, 11, '#5c3b28');
  box(ctx, x + 2, y + 4, 8, 8, p.plantMid, p.outline);
  box(ctx, x + 12, y + 5, 8, 8, p.plantDark, p.outline);
  box(ctx, x + 6, y, 10, 8, p.plantHi, p.outline);
  rect(ctx, x + 8, y + 2, 5, 2, p.plantMid);
}

function drawCornerFern(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  p: RoomPalette
): void {
  rect(ctx, x + 2, y + 23, 16, 4, p.castShadow);
  box(ctx, x + 4, y + 14, 12, 10, '#e2e8f0', p.outline);
  rect(ctx, x + 12, y + 15, 3, 8, '#94a3b8');
  for (let i = -2; i <= 2; i += 1) {
    const fx = x + 9 + i * 3;
    const fy = y + 4 + Math.abs(i) * 2;
    rect(ctx, fx, fy, 3, 10 - Math.abs(i), i === 0 ? p.plantHi : p.plantMid);
    px(ctx, fx + 1, fy - 1, p.plantDark);
  }
}

export function drawRoomForegroundLayer(
  ctx: CanvasRenderingContext2D,
  opts: DrawRoomForegroundLayerOptions
): void {
  ctx.imageSmoothingEnabled = false;
  const p = opts.palette;

  for (let i = 0; i < DESK_SLOTS.length; i += 1) {
    drawErgonomicChairBack(ctx, DESK_SLOTS[i], i, p);
  }

  drawCoffeeTable(ctx, p);
  drawMonsteraPlant(ctx, 439, 256, p);
  drawFiddleLeafPlant(ctx, 334, 280, p);
  drawCornerFern(ctx, 11, 282, p);

  rect(ctx, 0, ROOM_HEIGHT - 8, ROOM_WIDTH, 8, p.outerWall);
  rect(ctx, 7, ROOM_HEIGHT - 8, ROOM_WIDTH - 14, 1, p.outerTrim);
}

function drawAmbientWithWindowCutouts(
  ctx: CanvasRenderingContext2D,
  color: string,
  alpha: number
): void {
  if (alpha <= 0) return;
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;

  ctx.fillRect(0, 0, ROOM_WIDTH, 12);
  ctx.fillRect(0, 12, 74, 31);
  ctx.fillRect(160, 12, 164, 31);
  ctx.fillRect(406, 12, ROOM_WIDTH - 406, 31);
  ctx.fillRect(0, 43, ROOM_WIDTH, ROOM_HEIGHT - 43);

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

function drawDeskOneLampCone(
  ctx: CanvasRenderingContext2D,
  color: string,
  alpha: number
): void {
  if (alpha <= 0) return;
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;

  const yStart = 121;
  const yEnd = 148;
  for (let y = yStart; y <= yEnd; y += 1) {
    const dy = y - yStart;
    const leftX = Math.floor(74 - dy * 0.72);
    const rightX = Math.ceil(81 + dy * 0.14);
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

function drawWindowFairyGlow(
  ctx: CanvasRenderingContext2D,
  p: RoomPalette,
  timeSec: number
): void {
  const isLit = p.timeState === 'late_night' || (p.timeState === 'sleeping' && p.lampOn);
  if (!isLit || p.fairyGlowAlpha <= 0) return;

  ctx.save();
  ctx.fillStyle = p.fairyGlowColor;
  const windows: readonly [number, number][] = [
    [74, 86],
    [324, 82],
  ];
  for (let wIdx = 0; wIdx < windows.length; wIdx += 1) {
    const [gx, gw] = windows[wIdx];
    const gy = 12;
    for (let fx = 3; fx < gw - 3; fx += 7) {
      const sag = Math.round(Math.sin((fx / gw) * Math.PI) * 4);
      const bx = gx + fx;
      const by = gy + 2 + sag;
      const pulse = 0.55 + 0.45 * Math.sin(timeSec * 2.3 + fx * 0.25 + wIdx);
      ctx.globalAlpha = p.fairyGlowAlpha * 0.35 * pulse;
      ctx.fillRect(bx - 1, by - 1, 3, 3);
      ctx.globalAlpha = p.fairyGlowAlpha * 0.16 * pulse;
      ctx.fillRect(bx - 2, by, 1, 1);
      ctx.fillRect(bx + 2, by, 1, 1);
      ctx.fillRect(bx, by - 2, 1, 1);
      ctx.fillRect(bx, by + 2, 1, 1);
    }
  }
  ctx.restore();
}

function drawWindowDiagonalBeam(
  ctx: CanvasRenderingContext2D,
  startX: number,
  endX: number,
  p: RoomPalette
): void {
  if (p.windowBeamAlpha <= 0) return;

  ctx.save();
  ctx.fillStyle = p.windowBeamColor;
  const yStart = 20;
  const yEnd = 136;
  for (let y = yStart; y < yEnd; y += 1) {
    const dy = Math.max(0, y - 48);
    const leftX = Math.floor(startX + dy * 0.32);
    const rightX = Math.ceil(endX + dy * 0.42);
    const vFactor = y < 50 ? 0.45 : Math.max(0, 1 - (y - 50) / 92);
    const span = Math.max(1, rightX - leftX);
    const edgeSpan = Math.min(10, span * 0.25);

    let runStart = -1;
    for (let x = leftX; x <= rightX; x += 1) {
      const distEdge = Math.min(x - leftX, rightX - x);
      const edgeFactor = Math.min(1, distEdge / Math.max(3, edgeSpan));
      const intensity = vFactor * edgeFactor;
      const lit = intensity * 16 > BAYER_4X4[y & 3][x & 3];
      if (lit && runStart === -1) {
        runStart = x;
      } else if (!lit && runStart !== -1) {
        ctx.globalAlpha = p.windowBeamAlpha;
        ctx.fillRect(runStart, y, x - runStart, 1);
        runStart = -1;
      }
    }
    if (runStart !== -1) {
      ctx.globalAlpha = p.windowBeamAlpha;
      ctx.fillRect(runStart, y, rightX - runStart + 1, 1);
    }
  }
  ctx.restore();
}

export function drawLightingOverlay(
  ctx: CanvasRenderingContext2D,
  opts: DrawLightingOverlayOptions
): void {
  const { timeState, lampOn, tick, palette } = opts;
  const timeSec = opts.elapsedSec ?? tick / 15;

  drawAmbientWithWindowCutouts(ctx, palette.ambientTint, palette.ambientAlpha);

  const pendantAlpha =
    timeState === 'late_night'
      ? 0.22
      : timeState === 'sleeping'
        ? lampOn
          ? 0.14
          : 0
        : timeState === 'waking'
          ? 0.11
          : 0.08;

  if (pendantAlpha > 0) {
    for (const lx of PENDANT_XS) {
      drawBayerRadialPool(
        ctx,
        lx,
        28,
        18,
        16,
        16,
        48,
        palette.pendantGlow,
        pendantAlpha,
        1.08
      );
    }
  }

  drawWindowFairyGlow(ctx, palette, timeSec);
  drawWindowDiagonalBeam(ctx, 74, 158, palette);
  drawWindowDiagonalBeam(ctx, 324, 404, palette);

  if (lampOn && palette.lampGlowAlpha > 0) {
    drawDeskOneLampCone(ctx, palette.lampGlowColor, palette.lampGlowAlpha * 0.56);
    drawBayerRadialPool(
      ctx,
      68,
      128,
      26,
      20,
      108,
      152,
      palette.lampGlowColor,
      palette.lampGlowAlpha * 0.62,
      1.15
    );
    drawBayerRadialPool(
      ctx,
      76,
      121,
      11,
      9,
      112,
      132,
      '#fff4b8',
      palette.lampGlowAlpha * 0.52,
      1.2
    );
  }

  if (palette.screenGlowAlpha > 0 && timeState !== 'sleeping') {
    const musicBoost = opts.isMusicActive ? 1 + 0.12 * Math.sin(timeSec * 5.2) : 1;
    const screenAlpha = Math.min(0.32, palette.screenGlowAlpha * musicBoost);
    drawBayerRadialPool(
      ctx,
      56,
      114,
      24,
      16,
      98,
      134,
      palette.screenGlowColor,
      screenAlpha,
      1.04
    );
  }
}
