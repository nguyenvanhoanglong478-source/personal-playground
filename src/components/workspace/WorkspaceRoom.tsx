import React, { useCallback, useEffect, useRef } from 'react';
import { Locale } from '../../data/profile';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
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
  CharacterAnimState,
  CharacterArchetype,
  CharacterDir,
  SPRITE_H,
  SPRITE_W,
  drawCapybaraPet,
  drawCharacter,
  drawDeskAndMusicEffects,
} from './pixelSprites';
import {
  CAPY_LOUNGE_RECT,
  DESK_SLOTS,
  REST_SLOTS,
  ROOM_HOTSPOTS,
  drawLightingOverlay,
  drawRoomBaseLayer,
  drawRoomForegroundLayer,
  findPath,
} from './roomEnvironment';

export interface WorkspaceRoomProps {
  timeState: RoomTimeState;
  lampOn: boolean;
  isMusicActive: boolean;
  selectedHotspot: RoomHotspotId | null;
  onSelectHotspot: (id: RoomHotspotId) => void;
  locale?: Locale;
}

type AgentStatusKind = 'working' | 'idle' | 'stopped';
type ActivitySlotMode = 'desk' | 'rest';

interface RosterProfile {
  id: string;
  name: string;
  isLong: boolean;
  archetype: CharacterArchetype;
  seed: number;
  defaultDeskIndex: number;
  defaultRestIndex: number;
}

interface SimCharacter {
  id: string;
  name: string;
  isLong: boolean;
  archetype: CharacterArchetype;
  seed: number;
  mode: ActivitySlotMode;
  deskIndex: number;
  restIndex: number;
  baseAnim: CharacterAnimState;
  status: AgentStatusKind;
  x: number;
  y: number;
  dir: CharacterDir;
  animState: CharacterAnimState;
  frame: number;
  frameTimer: number;
  path: Array<{ x: number; y: number }>;
  targetX: number;
  targetY: number;
  targetFacing: CharacterDir;
  nextActionAtSec: number;
  arrivedAtSec: number;
  talkUntilSec: number;
  bubbleMsg: { vi: string; en: string } | null;
}

interface BoxRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface NametagMeta {
  font: string;
  label: string;
  padX: number;
  dotSpace: number;
  boxW: number;
  boxH: number;
}

const WALK_SPEED_PX = 56;
const CAPY_HIT_W = 24;
const CAPY_HIT_H = 19;

const STATUS_COLORS: Record<AgentStatusKind, string> = {
  working: '#22c55e',
  idle: '#38bdf8',
  stopped: '#eab308',
};

const ROSTER_PROFILES: readonly RosterProfile[] = [
  {
    id: 'long',
    name: 'Long Hoàng',
    isLong: true,
    archetype: 'coordinator',
    seed: 0,
    defaultDeskIndex: 0,
    defaultRestIndex: 2,
  },
  {
    id: 'atlas',
    name: 'Atlas',
    isLong: false,
    archetype: 'engineer',
    seed: 1,
    defaultDeskIndex: 1,
    defaultRestIndex: 2,
  },
  {
    id: 'nova',
    name: 'Nova',
    isLong: false,
    archetype: 'researcher',
    seed: 2,
    defaultDeskIndex: 2,
    defaultRestIndex: 3,
  },
  {
    id: 'pixel',
    name: 'Pixel',
    isLong: false,
    archetype: 'designer',
    seed: 3,
    defaultDeskIndex: 3,
    defaultRestIndex: 0,
  },
  {
    id: 'kaito',
    name: 'Kaito',
    isLong: false,
    archetype: 'architect',
    seed: 4,
    defaultDeskIndex: 6,
    defaultRestIndex: 4,
  },
  {
    id: 'sora',
    name: 'Sora',
    isLong: false,
    archetype: 'verifier',
    seed: 5,
    defaultDeskIndex: 7,
    defaultRestIndex: 1,
  },
];

const DESK_PHRASES: readonly { vi: string; en: string }[] = [
  { vi: 'Chỉnh từng pixel nhỏ', en: 'Tuning pixel spacing' },
  { vi: 'Tối ưu vòng lặp 60fps', en: 'Tuning 60fps canvas' },
  { vi: 'Kiểm tra luồng UI', en: 'Verifying UI flows' },
  { vi: 'Hoàn thiện PR mới', en: 'Reviewing PR build' },
];

const THINK_PHRASES: readonly { vi: string; en: string }[] = [
  { vi: 'Đang nghĩ bố cục mới', en: 'Sketching new layout' },
  { vi: 'Soát lại kiến trúc', en: 'Checking architecture' },
];

const LONG_PHRASES: Record<RoomTimeState, { vi: string; en: string }> = {
  waking: { vi: 'Pha cà phê đón nắng sáng', en: 'Morning coffee walk' },
  working: { vi: 'Code & vẽ giao diện', en: 'Building & polishing UI' },
  late_night: { vi: 'Code nốt dưới đèn bàn', en: 'Late-night lamp build' },
  sleeping: { vi: 'Zzz... nghỉ trên sofa', en: 'Zzz... resting on sofa' },
};

const REST_PHRASES: Record<
  'sofa' | 'coffee' | 'bookshelf' | 'window' | 'plant',
  { vi: string; en: string }
> = {
  coffee: { vi: 'Làm ly cà phê nhé', en: 'Grabbing espresso' },
  bookshelf: { vi: 'Ngắm mô hình xe Cub', en: 'Checking Cub shelf' },
  window: { vi: 'Ngắm trời ngoài cửa sổ', en: 'Looking out the window' },
  sofa: { vi: 'Nghỉ chân trên sofa', en: 'Lounging on the sofa' },
  plant: { vi: 'Tưới góc cây xanh', en: 'Watering studio plants' },
};

const SLEEP_PHRASE = { vi: 'Zzz... ngủ ngon', en: 'Zzz... quiet nap' };

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function truncLabel(text: string, maxLen: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > maxLen ? `${clean.slice(0, maxLen - 1)}…` : clean;
}

function boxesOverlap(a: BoxRect, b: BoxRect, pad = 2): boolean {
  return !(
    a.x + a.w + pad <= b.x ||
    b.x + b.w + pad <= a.x ||
    a.y + a.h + pad <= b.y ||
    b.y + b.h + pad <= a.y
  );
}

function drawRoundedRect(
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  c.beginPath();
  c.moveTo(x + r, y);
  c.lineTo(x + w - r, y);
  c.quadraticCurveTo(x + w, y, x + w, y + r);
  c.lineTo(x + w, y + h - r);
  c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  c.lineTo(x + r, y + h);
  c.quadraticCurveTo(x, y + h, x, y + h - r);
  c.lineTo(x, y + r);
  c.quadraticCurveTo(x, y, x + r, y);
  c.closePath();
}

function drawFloorHighlight(
  c: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  isSelected: boolean,
  isDark: boolean,
  timeSec: number,
  reducedMotion: boolean
): void {
  const pulse = reducedMotion ? 1 : 0.78 + 0.22 * Math.sin(timeSec * 5.5);
  c.save();
  c.fillStyle = isSelected
    ? isDark
      ? `rgba(56, 189, 248, ${(0.22 * pulse).toFixed(3)})`
      : `rgba(14, 165, 233, ${(0.18 * pulse).toFixed(3)})`
    : isDark
      ? 'rgba(248, 250, 252, 0.12)'
      : 'rgba(15, 23, 42, 0.09)';
  c.beginPath();
  c.ellipse(sx, sy - 1, isSelected ? 10 : 8, isSelected ? 4 : 3, 0, 0, Math.PI * 2);
  c.fill();

  c.strokeStyle = isSelected
    ? isDark
      ? `rgba(56, 189, 248, ${(0.9 * pulse).toFixed(3)})`
      : `rgba(2, 132, 199, ${(0.92 * pulse).toFixed(3)})`
    : isDark
      ? 'rgba(248, 250, 252, 0.65)'
      : 'rgba(15, 23, 42, 0.48)';
  c.lineWidth = 1;
  c.beginPath();
  c.ellipse(sx, sy - 1, isSelected ? 10 : 8, isSelected ? 4 : 3, 0, 0, Math.PI * 2);
  c.stroke();
  c.restore();
}

function drawSelectedMarker(
  c: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  timeSec: number,
  reducedMotion: boolean
): void {
  const bob = reducedMotion ? 0 : Math.round(Math.sin(timeSec * 6) * 1.2);
  const topY = sy - SPRITE_H - 5 + bob;
  c.save();
  c.fillStyle = '#0f172a';
  c.fillRect(sx - 2, topY - 1, 4, 3);
  c.fillRect(sx - 1, topY + 2, 2, 1);
  c.fillStyle = '#38bdf8';
  c.fillRect(sx - 1, topY, 2, 2);
  c.fillRect(sx, topY + 2, 1, 1);
  c.restore();
}

function measureNametag(
  c: CanvasRenderingContext2D,
  name: string,
  zoom: number,
  isLong: boolean
): NametagMeta {
  const font = isLong
    ? zoom < 0.85
      ? '700 9.5px "Inter", system-ui, sans-serif'
      : '700 10px "Inter", system-ui, sans-serif'
    : zoom < 0.85
      ? '600 9px "Inter", system-ui, sans-serif'
      : '600 9.5px "Inter", system-ui, sans-serif';
  c.save();
  c.font = font;
  const label = truncLabel(name, 14);
  const tw = Math.ceil(c.measureText(label).width);
  c.restore();
  const padX = isLong ? 6 : 5;
  const dotSpace = 8;
  return {
    font,
    label,
    padX,
    dotSpace,
    boxW: tw + padX * 2 + dotSpace,
    boxH: isLong ? 15 : 14,
  };
}

function drawNametagBox(
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
  boxW: number,
  boxH: number,
  meta: NametagMeta,
  status: AgentStatusKind,
  isLong: boolean,
  isSelected: boolean,
  isHovered: boolean,
  isDark: boolean
): void {
  c.save();
  c.font = meta.font;

  if (isSelected) {
    c.fillStyle = '#0284c7';
  } else if (isLong) {
    c.fillStyle = isDark ? 'rgba(30, 27, 46, 0.92)' : 'rgba(255, 251, 235, 0.95)';
  } else if (isHovered) {
    c.fillStyle = isDark ? 'rgba(30, 41, 59, 0.94)' : 'rgba(241, 245, 249, 0.96)';
  } else {
    c.fillStyle = isDark ? 'rgba(15, 23, 42, 0.84)' : 'rgba(255, 255, 255, 0.88)';
  }

  drawRoundedRect(c, x, y, boxW, boxH, 3);
  c.fill();

  c.lineWidth = isLong || isSelected ? 1.2 : 1;
  if (isSelected) {
    c.strokeStyle = '#38bdf8';
  } else if (isLong) {
    c.strokeStyle = isHovered
      ? '#fbbf24'
      : isDark
        ? 'rgba(251, 191, 36, 0.72)'
        : 'rgba(217, 119, 6, 0.68)';
  } else if (isHovered) {
    c.strokeStyle = isDark ? 'rgba(248, 250, 252, 0.45)' : 'rgba(15, 23, 42, 0.35)';
  } else {
    c.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.32)' : 'rgba(15, 23, 42, 0.16)';
  }
  c.stroke();

  c.fillStyle = STATUS_COLORS[status];
  c.beginPath();
  c.arc(x + meta.padX + 2.5, y + boxH / 2, 2.3, 0, Math.PI * 2);
  c.fill();

  c.fillStyle = isSelected
    ? '#ffffff'
    : isLong
      ? isDark
        ? '#fef3c7'
        : '#1e1b4b'
      : isDark
        ? '#e2e8f0'
        : '#1e293b';
  c.textBaseline = 'middle';
  c.textAlign = 'left';
  c.fillText(meta.label, x + meta.padX + meta.dotSpace, y + boxH / 2 + 0.5);
  c.restore();
}

function drawCrowdedStatusPip(
  c: CanvasRenderingContext2D,
  cx: number,
  y: number,
  status: AgentStatusKind,
  isDark: boolean
): void {
  c.save();
  c.fillStyle = isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)';
  c.beginPath();
  c.arc(Math.round(cx), Math.round(y), 3.6, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = STATUS_COLORS[status];
  c.beginPath();
  c.arc(Math.round(cx), Math.round(y), 2.4, 0, Math.PI * 2);
  c.fill();
  c.restore();
}

function measureBubble(
  c: CanvasRenderingContext2D,
  text: string
): { label: string; boxW: number; boxH: number } {
  c.save();
  c.font = '600 10px "JetBrains Mono", ui-monospace, monospace';
  const label = truncLabel(text, 28);
  const metrics = c.measureText(label);
  c.restore();
  return {
    label,
    boxW: Math.ceil(metrics.width) + 14,
    boxH: 18,
  };
}

function drawBubble(
  c: CanvasRenderingContext2D,
  bx: number,
  by: number,
  boxW: number,
  boxH: number,
  targetX: number,
  pointerDir: 'up' | 'down',
  label: string,
  opts: { isSelected: boolean; isTalk: boolean; isDark: boolean }
): void {
  const { isSelected, isTalk, isDark } = opts;
  c.save();
  c.font = '600 10px "JetBrains Mono", ui-monospace, monospace';
  const x = Math.round(bx);
  const y = Math.round(by);
  const tx = Math.round(clamp(targetX, x + 7, x + boxW - 7));

  const bg = isTalk
    ? isDark
      ? '#172e45'
      : '#eff6ff'
    : isDark
      ? 'rgba(20, 26, 38, 0.94)'
      : 'rgba(255, 255, 255, 0.96)';
  const border = isSelected
    ? '#38bdf8'
    : isTalk
      ? '#38bdf8'
      : isDark
        ? '#475569'
        : '#94a3b8';
  const fg = isDark ? '#f1f5f9' : '#0f172a';

  c.shadowColor = isDark ? 'rgba(0,0,0,0.35)' : 'rgba(15,23,42,0.10)';
  c.shadowBlur = 4;
  c.shadowOffsetY = 1;
  c.fillStyle = bg;
  drawRoundedRect(c, x, y, boxW, boxH, 4);
  c.fill();
  c.shadowColor = 'transparent';

  c.lineWidth = isSelected ? 1.4 : 1;
  c.strokeStyle = border;
  c.stroke();

  c.fillStyle = bg;
  c.strokeStyle = border;
  c.lineWidth = 1;
  if (pointerDir === 'up') {
    c.beginPath();
    c.moveTo(tx - 4, y + 1);
    c.lineTo(tx + 4, y + 1);
    c.lineTo(tx, y - 4);
    c.closePath();
    c.fill();
    c.beginPath();
    c.moveTo(tx - 4, y);
    c.lineTo(tx, y - 4);
    c.lineTo(tx + 4, y);
    c.stroke();
  } else {
    c.beginPath();
    c.moveTo(tx - 4, y + boxH - 1);
    c.lineTo(tx + 4, y + boxH - 1);
    c.lineTo(tx, y + boxH + 4);
    c.closePath();
    c.fill();
    c.beginPath();
    c.moveTo(tx - 4, y + boxH);
    c.lineTo(tx, y + boxH + 4);
    c.lineTo(tx + 4, y + boxH);
    c.stroke();
  }

  c.fillStyle = fg;
  c.textBaseline = 'middle';
  c.textAlign = 'center';
  c.fillText(label, x + boxW / 2, y + boxH / 2 + 0.5);
  c.restore();
}

function setSimTarget(
  sim: SimCharacter,
  targetX: number,
  targetY: number,
  targetFacing: CharacterDir,
  snapImmediately: boolean
): void {
  sim.targetX = targetX;
  sim.targetY = targetY;
  sim.targetFacing = targetFacing;

  if (snapImmediately) {
    sim.x = targetX;
    sim.y = targetY;
    sim.dir = targetFacing;
    sim.path = [];
    return;
  }

  if (Math.hypot(targetX - sim.x, targetY - sim.y) <= 1.5) {
    sim.x = targetX;
    sim.y = targetY;
    sim.path = [];
    return;
  }

  const lastWp = sim.path[sim.path.length - 1];
  if (lastWp && Math.hypot(lastWp.x - targetX, lastWp.y - targetY) <= 1.5) {
    return;
  }

  const waypoints = findPath(sim.x, sim.y, targetX, targetY);
  if (
    waypoints.length > 1 &&
    Math.hypot(waypoints[0].x - sim.x, waypoints[0].y - sim.y) < 2
  ) {
    waypoints.shift();
  }
  sim.path = waypoints;
}

function computeRestAnimForSlot(
  kind: 'sofa' | 'coffee' | 'bookshelf' | 'window' | 'plant',
  timeState: RoomTimeState,
  elapsedSec: number,
  arrivedAtSec: number
): CharacterAnimState {
  if (timeState === 'sleeping') return 'rest_sleep';
  if (kind === 'coffee') return 'rest_coffee';
  if (kind === 'bookshelf' || kind === 'window') return 'think';
  if (kind === 'sofa') {
    if (elapsedSec - arrivedAtSec > 9) return 'rest_sleep';
    return 'rest_sit';
  }
  return 'idle';
}

function createInitialRoster(timeState: RoomTimeState): SimCharacter[] {
  return ROSTER_PROFILES.map((p, idx) => {
    const startDesk =
      timeState === 'working' ||
      (timeState === 'late_night' && (p.isLong || idx === 1 || idx === 4));
    const slotDesk = DESK_SLOTS[p.defaultDeskIndex] ?? DESK_SLOTS[0];
    const restIdx =
      timeState === 'sleeping' && p.isLong
        ? 0
        : timeState === 'sleeping' && p.id === 'sora'
          ? 1
          : p.defaultRestIndex;
    const slotRest = REST_SLOTS[restIdx] ?? REST_SLOTS[0];

    const useDesk =
      timeState === 'sleeping' ? !p.isLong && p.id !== 'sora' : startDesk;
    const x = useDesk ? slotDesk.chairX : slotRest.x;
    const y = useDesk ? slotDesk.chairY : slotRest.y;
    const dir: CharacterDir = useDesk ? slotDesk.facing : slotRest.facing;

    const baseAnim: CharacterAnimState =
      timeState === 'sleeping'
        ? 'rest_sleep'
        : useDesk
          ? 'work'
          : computeRestAnimForSlot(slotRest.kind, timeState, 0, 0);

    const status: AgentStatusKind =
      timeState === 'sleeping'
        ? 'stopped'
        : useDesk
          ? 'working'
          : 'idle';

    return {
      id: p.id,
      name: p.name,
      isLong: p.isLong,
      archetype: p.archetype,
      seed: p.seed,
      mode: useDesk ? 'desk' : 'rest',
      deskIndex: p.defaultDeskIndex,
      restIndex: restIdx,
      baseAnim,
      status,
      x,
      y,
      dir,
      animState: baseAnim,
      frame: idx % 4,
      frameTimer: 0,
      path: [],
      targetX: x,
      targetY: y,
      targetFacing: dir,
      nextActionAtSec: 3.2 + idx * 1.9,
      arrivedAtSec: 0,
      talkUntilSec: 0,
      bubbleMsg: p.isLong ? LONG_PHRASES[timeState] : null,
    };
  });
}

function kickOffAmbientArrivals(
  roster: SimCharacter[],
  timeState: RoomTimeState
): void {
  if (timeState === 'waking') {
    const atlas = roster.find((s) => s.id === 'atlas');
    if (atlas) {
      atlas.x = 19;
      atlas.y = 96;
      const target = REST_SLOTS[atlas.restIndex] ?? REST_SLOTS[2];
      setSimTarget(atlas, target.x, target.y, target.facing, false);
    }
    const pixel = roster.find((s) => s.id === 'pixel');
    if (pixel) {
      pixel.x = 19;
      pixel.y = 178;
      const desk = DESK_SLOTS[pixel.deskIndex] ?? DESK_SLOTS[3];
      pixel.mode = 'desk';
      pixel.baseAnim = 'work';
      pixel.status = 'working';
      setSimTarget(pixel, desk.chairX, desk.chairY, desk.facing, false);
    }
  } else if (timeState === 'working') {
    const nova = roster.find((s) => s.id === 'nova');
    if (nova) {
      const coffee = REST_SLOTS[2];
      nova.x = coffee.x;
      nova.y = coffee.y;
      const desk = DESK_SLOTS[nova.deskIndex] ?? DESK_SLOTS[2];
      nova.mode = 'desk';
      nova.baseAnim = 'work';
      nova.status = 'working';
      setSimTarget(nova, desk.chairX, desk.chairY, desk.facing, false);
    }
  }
}

export const WorkspaceRoom: React.FC<WorkspaceRoomProps> = ({
  timeState,
  lampOn,
  isMusicActive,
  selectedHotspot,
  onSelectHotspot,
  locale = 'vi',
}) => {
  const shouldReduceMotion = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inViewRef = useRef<boolean>(true);
  const sceneCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const elapsedSecRef = useRef<number>(0);
  const rngStateRef = useRef<number>(1337);
  const rosterRef = useRef<SimCharacter[]>(createInitialRoster(timeState));
  const lastTimeStateRef = useRef<RoomTimeState>(timeState);
  const hoveredRegionRef = useRef<RoomHotspotRegion | null>(null);
  const hoveredNpcIdRef = useRef<string | null>(null);
  const selectedNpcIdRef = useRef<string | null>(null);
  const capyAnchorRef = useRef<{ x: number; y: number }>({
    x: Math.round(CAPY_LOUNGE_RECT.x + CAPY_LOUNGE_RECT.w * 0.7),
    y: Math.round(CAPY_LOUNGE_RECT.y + CAPY_LOUNGE_RECT.h * 0.55),
  });
  const didKickoffRef = useRef<boolean>(false);

  const propsRef = useRef({
    timeState,
    lampOn,
    isMusicActive,
    selectedHotspot,
    locale,
    reducedMotion: shouldReduceMotion,
  });

  propsRef.current = {
    timeState,
    lampOn,
    isMusicActive,
    selectedHotspot,
    locale,
    reducedMotion: shouldReduceMotion,
  };

  const nextRand = useCallback((): number => {
    let x = rngStateRef.current | 0;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    rngStateRef.current = x;
    return ((x >>> 0) % 10000) / 10000;
  }, []);

  const pickFreeDeskIndex = useCallback(
    (simId: string, preferredIdx: number): number => {
      const used = new Set<number>();
      for (const s of rosterRef.current) {
        if (s.id !== simId && s.mode === 'desk') {
          used.add(s.deskIndex);
        }
      }
      if (!used.has(preferredIdx) && preferredIdx > 0 && preferredIdx < DESK_SLOTS.length) {
        return preferredIdx;
      }
      const candidates = [1, 2, 3, 4, 5, 6, 7].filter((idx) => !used.has(idx));
      if (candidates.length === 0) return preferredIdx;
      return candidates[Math.floor(nextRand() * candidates.length)];
    },
    [nextRand]
  );

  const pickFreeRestIndex = useCallback(
    (simId: string, allowedIndices: readonly number[]): number => {
      const used = new Set<number>();
      for (const s of rosterRef.current) {
        if (s.id !== simId && s.mode === 'rest') {
          used.add(s.restIndex);
        }
      }
      const free = allowedIndices.filter((idx) => !used.has(idx));
      const pool = free.length > 0 ? free : allowedIndices;
      return pool[Math.floor(nextRand() * pool.length)];
    },
    [nextRand]
  );

  const applyTimeStateChoreography = useCallback(
    (nextState: RoomTimeState, snap: boolean) => {
      const nowSec = elapsedSecRef.current;
      const roster = rosterRef.current;

      for (let i = 0; i < roster.length; i += 1) {
        const sim = roster[i];
        sim.nextActionAtSec = nowSec + 5 + i * 1.7 + nextRand() * 4;

        if (nextState === 'sleeping') {
          if (sim.isLong) {
            sim.mode = 'rest';
            sim.restIndex = 0;
            sim.baseAnim = 'rest_sleep';
            sim.status = 'stopped';
            sim.bubbleMsg = SLEEP_PHRASE;
            const sofa1 = REST_SLOTS[0];
            setSimTarget(sim, sofa1.x, sofa1.y, sofa1.facing, snap);
          } else if (sim.id === 'sora') {
            sim.mode = 'rest';
            sim.restIndex = 1;
            sim.baseAnim = 'rest_sleep';
            sim.status = 'stopped';
            sim.bubbleMsg = SLEEP_PHRASE;
            const sofa2 = REST_SLOTS[1];
            setSimTarget(sim, sofa2.x, sofa2.y, sofa2.facing, snap);
          } else {
            sim.mode = 'desk';
            sim.baseAnim = 'rest_sleep';
            sim.status = 'stopped';
            sim.bubbleMsg = SLEEP_PHRASE;
            const desk = DESK_SLOTS[sim.deskIndex] ?? DESK_SLOTS[1];
            setSimTarget(sim, desk.chairX, desk.chairY, desk.facing, snap);
          }
          continue;
        }

        if (nextState === 'waking') {
          const goRest = sim.isLong || i % 2 === 1;
          if (goRest) {
            const restIdx = sim.isLong
              ? 2
              : pickFreeRestIndex(sim.id, [2, 3, 4, 5]);
            const restSlot = REST_SLOTS[restIdx] ?? REST_SLOTS[2];
            sim.mode = 'rest';
            sim.restIndex = restIdx;
            sim.baseAnim = computeRestAnimForSlot(restSlot.kind, nextState, nowSec, nowSec);
            sim.status = 'idle';
            sim.bubbleMsg = sim.isLong
              ? LONG_PHRASES.waking
              : REST_PHRASES[restSlot.kind];
            setSimTarget(sim, restSlot.x, restSlot.y, restSlot.facing, snap);
          } else {
            const dIdx = pickFreeDeskIndex(sim.id, sim.deskIndex);
            const desk = DESK_SLOTS[dIdx] ?? DESK_SLOTS[1];
            sim.mode = 'desk';
            sim.deskIndex = dIdx;
            sim.baseAnim = 'work';
            sim.status = 'working';
            sim.bubbleMsg = DESK_PHRASES[i % DESK_PHRASES.length];
            setSimTarget(sim, desk.chairX, desk.chairY, desk.facing, snap);
          }
          continue;
        }

        if (nextState === 'late_night') {
          const isNightOwl = sim.isLong || sim.id === 'atlas' || sim.id === 'kaito';
          if (isNightOwl) {
            const dIdx = sim.isLong ? 0 : pickFreeDeskIndex(sim.id, sim.deskIndex);
            const desk = DESK_SLOTS[dIdx] ?? DESK_SLOTS[0];
            sim.mode = 'desk';
            sim.deskIndex = dIdx;
            sim.baseAnim = sim.id === 'kaito' ? 'think' : 'work';
            sim.status = 'working';
            sim.bubbleMsg = sim.isLong
              ? LONG_PHRASES.late_night
              : DESK_PHRASES[i % DESK_PHRASES.length];
            setSimTarget(sim, desk.chairX, desk.chairY, desk.facing, snap);
          } else {
            const restIdx = pickFreeRestIndex(sim.id, [0, 1, 2, 4]);
            const restSlot = REST_SLOTS[restIdx] ?? REST_SLOTS[0];
            sim.mode = 'rest';
            sim.restIndex = restIdx;
            sim.baseAnim = computeRestAnimForSlot(restSlot.kind, nextState, nowSec, nowSec);
            sim.status = 'idle';
            sim.bubbleMsg = REST_PHRASES[restSlot.kind];
            setSimTarget(sim, restSlot.x, restSlot.y, restSlot.facing, snap);
          }
          continue;
        }

        const goDesk = sim.isLong || i !== 2;
        if (goDesk) {
          const dIdx = sim.isLong ? 0 : pickFreeDeskIndex(sim.id, sim.deskIndex);
          const desk = DESK_SLOTS[dIdx] ?? DESK_SLOTS[0];
          sim.mode = 'desk';
          sim.deskIndex = dIdx;
          sim.baseAnim = 'work';
          sim.status = 'working';
          sim.bubbleMsg = sim.isLong
            ? LONG_PHRASES.working
            : DESK_PHRASES[i % DESK_PHRASES.length];
          setSimTarget(sim, desk.chairX, desk.chairY, desk.facing, snap);
        } else {
          const restIdx = pickFreeRestIndex(sim.id, [2, 3, 4, 0, 1, 5]);
          const restSlot = REST_SLOTS[restIdx] ?? REST_SLOTS[3];
          sim.mode = 'rest';
          sim.restIndex = restIdx;
          sim.baseAnim = computeRestAnimForSlot(restSlot.kind, nextState, nowSec, nowSec);
          sim.status = 'idle';
          sim.bubbleMsg = REST_PHRASES[restSlot.kind];
          setSimTarget(sim, restSlot.x, restSlot.y, restSlot.facing, snap);
        }
      }
    },
    [nextRand, pickFreeDeskIndex, pickFreeRestIndex]
  );

  const stepSimulation = useCallback(
    (dtSec: number) => {
      const current = propsRef.current;
      const nowSec = elapsedSecRef.current;
      const roster = rosterRef.current;

      if (current.reducedMotion) {
        for (const sim of roster) {
          sim.frame = 0;
          sim.path = [];
          sim.animState = sim.baseAnim;
        }
        return;
      }

      for (let i = 0; i < roster.length; i += 1) {
        const sim = roster[i];

        if (sim.path.length === 0 && nowSec >= sim.nextActionAtSec) {
          sim.nextActionAtSec = nowSec + 6 + nextRand() * 8;

          if (current.timeState === 'sleeping') {
            if (sim.mode === 'rest') {
              sim.baseAnim = 'rest_sleep';
            }
          } else if (sim.isLong) {
            if (current.timeState === 'waking') {
              const targetRest = sim.restIndex === 2 ? 4 : sim.restIndex === 4 ? 0 : 2;
              if (sim.mode === 'rest' && nextRand() < 0.35) {
                sim.mode = 'desk';
                sim.deskIndex = 0;
                sim.baseAnim = 'idle';
                sim.status = 'working';
                sim.bubbleMsg = LONG_PHRASES.waking;
                sim.talkUntilSec = nowSec + 2.8;
                const d = DESK_SLOTS[0];
                setSimTarget(sim, d.chairX, d.chairY, d.facing, false);
              } else {
                const slot = REST_SLOTS[targetRest] ?? REST_SLOTS[2];
                sim.mode = 'rest';
                sim.restIndex = targetRest;
                sim.baseAnim = computeRestAnimForSlot(slot.kind, current.timeState, nowSec, nowSec);
                sim.status = 'idle';
                sim.bubbleMsg = REST_PHRASES[slot.kind];
                sim.talkUntilSec = nowSec + 2.8;
                setSimTarget(sim, slot.x, slot.y, slot.facing, false);
              }
            } else {
              const roll = nextRand();
              if (sim.mode === 'rest' || roll < 0.62) {
                sim.mode = 'desk';
                sim.deskIndex = 0;
                sim.baseAnim = roll < 0.25 ? 'think' : 'work';
                sim.status = 'working';
                sim.bubbleMsg =
                  sim.baseAnim === 'think'
                    ? THINK_PHRASES[0]
                    : LONG_PHRASES[current.timeState];
                if (roll < 0.35) sim.talkUntilSec = nowSec + 2.6;
                const d = DESK_SLOTS[0];
                setSimTarget(sim, d.chairX, d.chairY, d.facing, false);
              } else {
                const restIdx = pickFreeRestIndex(sim.id, [2, 4, 3]);
                const slot = REST_SLOTS[restIdx] ?? REST_SLOTS[2];
                sim.mode = 'rest';
                sim.restIndex = restIdx;
                sim.baseAnim = computeRestAnimForSlot(slot.kind, current.timeState, nowSec, nowSec);
                sim.status = 'idle';
                sim.bubbleMsg = REST_PHRASES[slot.kind];
                sim.talkUntilSec = nowSec + 2.8;
                setSimTarget(sim, slot.x, slot.y, slot.facing, false);
              }
            }
          } else {
            const roll = nextRand();
            const wantDesk =
              current.timeState === 'working'
                ? roll < 0.58
                : current.timeState === 'late_night'
                  ? roll < 0.48
                  : roll < 0.32;

            if (wantDesk) {
              const dIdx = pickFreeDeskIndex(sim.id, sim.deskIndex);
              const desk = DESK_SLOTS[dIdx] ?? DESK_SLOTS[1];
              const sameDesk = sim.mode === 'desk' && sim.deskIndex === dIdx;
              sim.mode = 'desk';
              sim.deskIndex = dIdx;
              sim.baseAnim = roll < 0.16 ? 'think' : 'work';
              sim.status = 'working';
              sim.bubbleMsg =
                sim.baseAnim === 'think'
                  ? THINK_PHRASES[i % THINK_PHRASES.length]
                  : DESK_PHRASES[(i + Math.floor(nowSec)) % DESK_PHRASES.length];
              if (!sameDesk || roll < 0.28) {
                sim.talkUntilSec = nowSec + 2.8;
              }
              setSimTarget(sim, desk.chairX, desk.chairY, desk.facing, false);
            } else {
              const restPool =
                current.timeState === 'late_night'
                  ? [0, 1, 2, 3, 4]
                  : [2, 3, 4, 0, 1, 5];
              const restIdx = pickFreeRestIndex(sim.id, restPool);
              const slot = REST_SLOTS[restIdx] ?? REST_SLOTS[2];
              sim.mode = 'rest';
              sim.restIndex = restIdx;
              sim.baseAnim = computeRestAnimForSlot(slot.kind, current.timeState, nowSec, nowSec);
              sim.status = 'idle';
              sim.bubbleMsg = REST_PHRASES[slot.kind];
              sim.talkUntilSec = nowSec + 3.0;
              setSimTarget(sim, slot.x, slot.y, slot.facing, false);
            }
          }
        }

        if (sim.path.length > 0) {
          let remaining = WALK_SPEED_PX * dtSec;
          while (remaining > 0 && sim.path.length > 0) {
            const wp = sim.path[0];
            const dx = wp.x - sim.x;
            const dy = wp.y - sim.y;
            const dist = Math.hypot(dx, dy);
            if (dist <= remaining) {
              sim.x = wp.x;
              sim.y = wp.y;
              sim.path.shift();
              remaining -= dist;
            } else {
              const ux = dx / dist;
              const uy = dy / dist;
              sim.x += ux * remaining;
              sim.y += uy * remaining;
              remaining = 0;
              if (Math.abs(dx) >= Math.abs(dy)) {
                sim.dir = dx >= 0 ? 'right' : 'left';
              } else {
                sim.dir = dy >= 0 ? 'down' : 'up';
              }
            }
          }
          sim.animState = 'walk';
          if (sim.path.length === 0) {
            sim.dir = sim.targetFacing;
            sim.arrivedAtSec = nowSec;
          }
        } else {
          sim.dir = sim.targetFacing;
          if (sim.mode === 'rest') {
            const slot = REST_SLOTS[sim.restIndex] ?? REST_SLOTS[0];
            sim.baseAnim = computeRestAnimForSlot(
              slot.kind,
              current.timeState,
              nowSec,
              sim.arrivedAtSec
            );
          }
          sim.animState = sim.talkUntilSec > nowSec ? 'talk' : sim.baseAnim;
        }

        const fps =
          sim.animState === 'walk'
            ? 8
            : sim.animState === 'work'
              ? 5
              : sim.animState === 'error'
                ? 4
                : 2.5;
        sim.frameTimer += dtSec * fps;
        if (sim.frameTimer >= 1) {
          const adv = Math.floor(sim.frameTimer);
          sim.frameTimer -= adv;
          sim.frame = (sim.frame + adv) % 4;
        }
      }
    },
    [nextRand, pickFreeDeskIndex, pickFreeRestIndex]
  );

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!sceneCanvasRef.current) {
      const offscreen = document.createElement('canvas');
      offscreen.width = ROOM_WIDTH;
      offscreen.height = ROOM_HEIGHT;
      sceneCanvasRef.current = offscreen;
    }
    const sceneCanvas = sceneCanvasRef.current;
    const sceneCtx = sceneCanvas.getContext('2d');
    if (!sceneCtx) return;

    const current = propsRef.current;
    const effectiveElapsedSec = current.reducedMotion ? 0 : elapsedSecRef.current;
    const effectiveTick = current.reducedMotion
      ? 0
      : Math.floor(effectiveElapsedSec * 15);
    const palette = getRoomPalette(current.timeState, current.lampOn);
    const isDarkRoom =
      current.timeState === 'late_night' || current.timeState === 'sleeping';

    const roster = rosterRef.current;
    const sorted = roster
      .slice()
      .sort((a, b) => a.y - b.y || a.id.localeCompare(b.id));

    const activeDeskIds = new Set<string>();
    if (current.timeState !== 'sleeping') {
      for (const sim of sorted) {
        if (
          sim.mode === 'desk' &&
          sim.path.length === 0 &&
          (sim.animState === 'work' ||
            sim.animState === 'think' ||
            sim.animState === 'talk')
        ) {
          const slot = DESK_SLOTS[sim.deskIndex];
          if (slot) activeDeskIds.add(slot.id);
        }
      }
    }

    sceneCtx.imageSmoothingEnabled = false;
    sceneCtx.clearRect(0, 0, ROOM_WIDTH, ROOM_HEIGHT);

    drawRoomBaseLayer(sceneCtx, {
      timeState: current.timeState,
      lampOn: current.lampOn,
      isMusicActive: current.isMusicActive,
      tick: effectiveTick,
      elapsedSec: effectiveElapsedSec,
      palette,
      activeDeskIds,
    });

    const selectedNpcId = selectedNpcIdRef.current;
    const hoveredNpcId = hoveredNpcIdRef.current;
    let capyDrawn = false;
    const capySortY = CAPY_LOUNGE_RECT.y + CAPY_LOUNGE_RECT.h;

    for (const sim of sorted) {
      if (!capyDrawn && sim.y > capySortY) {
        capyAnchorRef.current = drawCapybaraPet(sceneCtx, {
          timeState: current.timeState,
          isMusicActive: current.isMusicActive,
          elapsedSec: effectiveElapsedSec,
          palette,
          bounds: CAPY_LOUNGE_RECT,
          lampOn: current.lampOn,
          reducedMotion: current.reducedMotion,
        });
        capyDrawn = true;
      }

      const sx = Math.round(sim.x);
      const sy = Math.round(sim.y);

      if (sim.id === selectedNpcId || sim.id === hoveredNpcId) {
        drawFloorHighlight(
          sceneCtx,
          sx,
          sy,
          sim.id === selectedNpcId,
          isDarkRoom,
          effectiveElapsedSec,
          current.reducedMotion
        );
      }

      drawCharacter(sceneCtx, {
        archetype: sim.archetype,
        seed: sim.seed,
        state: sim.animState,
        dir: sim.dir,
        frame: sim.frame,
        x: sx,
        y: sy,
        scale: 1,
        isLong: sim.isLong,
        variant: sim.isLong ? 'long' : undefined,
      });
    }

    if (!capyDrawn) {
      capyAnchorRef.current = drawCapybaraPet(sceneCtx, {
        timeState: current.timeState,
        isMusicActive: current.isMusicActive,
        elapsedSec: effectiveElapsedSec,
        palette,
        bounds: CAPY_LOUNGE_RECT,
        lampOn: current.lampOn,
        reducedMotion: current.reducedMotion,
      });
    }

    drawRoomForegroundLayer(sceneCtx, {
      timeState: current.timeState,
      lampOn: current.lampOn,
      isMusicActive: current.isMusicActive,
      tick: effectiveTick,
      elapsedSec: effectiveElapsedSec,
      palette,
    });

    if (selectedNpcId) {
      const selSim = sorted.find((s) => s.id === selectedNpcId);
      if (selSim) {
        drawSelectedMarker(
          sceneCtx,
          Math.round(selSim.x),
          Math.round(selSim.y),
          effectiveElapsedSec,
          current.reducedMotion
        );
      }
    }

    drawLightingOverlay(sceneCtx, {
      timeState: current.timeState,
      lampOn: current.lampOn,
      isMusicActive: current.isMusicActive,
      tick: effectiveTick,
      elapsedSec: effectiveElapsedSec,
      palette,
    });

    const activeHovered = hoveredRegionRef.current;
    drawDeskAndMusicEffects(sceneCtx, {
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
      capyAnchor: capyAnchorRef.current,
    });

    const rect = canvas.getBoundingClientRect();
    const cssW = rect.width > 1 ? Math.round(rect.width) : ROOM_WIDTH;
    const cssH = rect.height > 1 ? Math.round(rect.height) : ROOM_HEIGHT;
    const dpr = Math.min(3, window.devicePixelRatio || 1);
    const targetW = Math.round(cssW * dpr);
    const targetH = Math.round(cssH * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const zoomX = cssW / ROOM_WIDTH;
    const zoomY = cssH / ROOM_HEIGHT;
    const zoom = Math.min(zoomX, zoomY);

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sceneCanvas, 0, 0, cssW, cssH);

    const priorityScore = (s: SimCharacter): number =>
      (s.id === selectedNpcId ? 1000 : 0) +
      (s.isLong ? 800 : 0) +
      (s.id === hoveredNpcId ? 500 : 0) +
      (s.talkUntilSec > effectiveElapsedSec ? 120 : 0) +
      (s.status === 'working' ? 60 : 20);

    const tagCandidates = sorted
      .slice()
      .sort(
        (a, b) =>
          priorityScore(b) - priorityScore(a) ||
          b.y - a.y ||
          a.id.localeCompare(b.id)
      );

    const spriteBoxes: Array<BoxRect & { id: string }> = tagCandidates.map((s) => {
      const sx = s.x * zoomX;
      const sy = s.y * zoomY;
      const sw = Math.round(SPRITE_W * zoom * 0.72);
      const sh = Math.round(SPRITE_H * zoom * 0.85);
      return {
        id: s.id,
        x: Math.round(sx - sw / 2),
        y: Math.round(sy - sh),
        w: sw,
        h: sh,
      };
    });

    const placedTags: Array<
      BoxRect & {
        sim: SimCharacter;
        meta: NametagMeta;
        isSel: boolean;
        isHov: boolean;
      }
    > = [];
    const crowdedPips: Array<{
      cx: number;
      y: number;
      status: AgentStatusKind;
    }> = [];

    for (const sim of tagCandidates) {
      const isSel = sim.id === selectedNpcId;
      const isHov = sim.id === hoveredNpcId;
      const screenX = sim.x * zoomX;
      const screenFootY = sim.y * zoomY;
      const meta = measureNametag(ctx, sim.name, zoom, sim.isLong);

      const minX = 4;
      const maxX = Math.max(4, cssW - meta.boxW - 4);
      const minY = 4;
      const maxY = Math.max(4, cssH - meta.boxH - 4);
      const sideShift = Math.round(
        meta.boxW * 0.5 + SPRITE_W * zoom * 0.42 + 4
      );
      const offsets: readonly [number, number][] = [
        [0, 0],
        [-sideShift, -4],
        [sideShift, -4],
        [0, 15],
        [-sideShift, 12],
        [sideShift, 12],
        [0, 30],
        [-20, 15],
        [20, 15],
      ];

      let chosen: BoxRect | null = null;
      for (const [dx, dy] of offsets) {
        const cand: BoxRect = {
          x: Math.round(clamp(screenX - meta.boxW / 2 + dx, minX, maxX)),
          y: Math.round(clamp(screenFootY + 3 + dy, minY, maxY)),
          w: meta.boxW,
          h: meta.boxH,
        };
        const hitsTag = placedTags.some((p) => boxesOverlap(cand, p, 2));
        const hitsSprite = spriteBoxes.some(
          (sb) => sb.id !== sim.id && boxesOverlap(cand, sb, 1)
        );
        if (!hitsTag && !hitsSprite) {
          chosen = cand;
          break;
        }
      }

      if (!chosen && (sim.isLong || isSel || isHov)) {
        for (const [dx, dy] of offsets) {
          const cand: BoxRect = {
            x: Math.round(clamp(screenX - meta.boxW / 2 + dx, minX, maxX)),
            y: Math.round(clamp(screenFootY + 3 + dy, minY, maxY)),
            w: meta.boxW,
            h: meta.boxH,
          };
          if (!placedTags.some((p) => boxesOverlap(cand, p, 2))) {
            chosen = cand;
            break;
          }
        }
      }

      if (chosen) {
        placedTags.push({
          ...chosen,
          sim,
          meta,
          isSel,
          isHov,
        });
      } else if (sim.isLong || isSel || isHov) {
        placedTags.push({
          x: Math.round(clamp(screenX - meta.boxW / 2, minX, maxX)),
          y: Math.round(clamp(screenFootY + 3, minY, maxY)),
          w: meta.boxW,
          h: meta.boxH,
          sim,
          meta,
          isSel,
          isHov,
        });
      } else {
        crowdedPips.push({
          cx: clamp(screenX, 6, cssW - 6),
          y: clamp(screenFootY + 4, 6, cssH - 6),
          status: sim.status,
        });
      }
    }

    for (const pip of crowdedPips) {
      drawCrowdedStatusPip(ctx, pip.cx, pip.y, pip.status, isDarkRoom);
    }

    for (let i = placedTags.length - 1; i >= 0; i -= 1) {
      const t = placedTags[i];
      drawNametagBox(
        ctx,
        t.x,
        t.y,
        t.w,
        t.h,
        t.meta,
        t.sim.status,
        t.sim.isLong,
        t.isSel,
        t.isHov,
        isDarkRoom
      );
    }

    const bubbleCandidates = tagCandidates.filter((sim) => {
      if (sim.id === selectedNpcId || sim.id === hoveredNpcId) return true;
      if (sim.talkUntilSec > effectiveElapsedSec && sim.bubbleMsg) return true;
      return false;
    });

    const placedBubbles: Array<BoxRect & { dir: 'up' | 'down' }> = [];
    for (const sim of bubbleCandidates) {
      const isSel = sim.id === selectedNpcId;
      const isHov = sim.id === hoveredNpcId;
      const isTalk = sim.talkUntilSec > effectiveElapsedSec;

      if (placedBubbles.length >= 3 && !isSel && !isHov) continue;

      const msgObj =
        sim.bubbleMsg ??
        (sim.isLong
          ? LONG_PHRASES[current.timeState]
          : sim.mode === 'rest'
            ? REST_PHRASES[(REST_SLOTS[sim.restIndex] ?? REST_SLOTS[0]).kind]
            : DESK_PHRASES[sim.seed % DESK_PHRASES.length]);
      const rawText = msgObj[current.locale];
      if (!rawText) continue;

      const screenX = sim.x * zoomX;
      const screenTopY = (sim.y - SPRITE_H) * zoomY;
      const screenFootY = sim.y * zoomY;
      const { label, boxW, boxH } = measureBubble(ctx, rawText);

      const minX = 6;
      const maxX = Math.max(6, cssW - boxW - 6);
      const minY = 6;
      const maxY = Math.max(6, cssH - boxH - 6);

      const placements: readonly { dx: number; y: number; dir: 'up' | 'down' }[] =
        [
          { dx: 0, y: Math.round(screenTopY - boxH - 6), dir: 'down' },
          { dx: 0, y: Math.round(screenTopY - boxH - 26), dir: 'down' },
          { dx: -26, y: Math.round(screenTopY - boxH - 6), dir: 'down' },
          { dx: 26, y: Math.round(screenTopY - boxH - 6), dir: 'down' },
          { dx: 0, y: Math.round(screenFootY + 21), dir: 'up' },
          { dx: -24, y: Math.round(screenFootY + 21), dir: 'up' },
          { dx: 24, y: Math.round(screenFootY + 21), dir: 'up' },
        ];

      let chosen: (BoxRect & { dir: 'up' | 'down' }) | null = null;
      for (const cand of placements) {
        if (cand.y < minY || cand.y > maxY) continue;
        const box: BoxRect & { dir: 'up' | 'down' } = {
          x: Math.round(clamp(screenX - boxW / 2 + cand.dx, minX, maxX)),
          y: cand.y,
          w: boxW,
          h: boxH,
          dir: cand.dir,
        };
        const hitsBubble = placedBubbles.some((p) => boxesOverlap(box, p, 4));
        const hitsTag = placedTags.some((t) => boxesOverlap(box, t, 3));
        if (!hitsBubble && !hitsTag) {
          chosen = box;
          break;
        }
      }

      if (!chosen && (isSel || isHov)) {
        const preferBelow = screenTopY - boxH - 6 < minY;
        const fallbackY = preferBelow
          ? Math.round(clamp(screenFootY + 21, minY, maxY))
          : Math.round(clamp(screenTopY - boxH - 6, minY, maxY));
        chosen = {
          x: Math.round(clamp(screenX - boxW / 2, minX, maxX)),
          y: fallbackY,
          w: boxW,
          h: boxH,
          dir: preferBelow ? 'up' : 'down',
        };
      }

      if (!chosen) continue;

      placedBubbles.push(chosen);
      drawBubble(ctx, chosen.x, chosen.y, chosen.w, chosen.h, screenX, chosen.dir, label, {
        isSelected: isSel,
        isTalk,
        isDark: isDarkRoom,
      });
    }

    ctx.restore();
  }, []);

  useEffect(() => {
    if (!didKickoffRef.current) {
      didKickoffRef.current = true;
      applyTimeStateChoreography(timeState, true);
      if (!shouldReduceMotion) {
        kickOffAmbientArrivals(rosterRef.current, timeState);
      }
    } else if (lastTimeStateRef.current !== timeState) {
      lastTimeStateRef.current = timeState;
      applyTimeStateChoreography(timeState, shouldReduceMotion);
    }
    drawFrame();
  }, [
    timeState,
    lampOn,
    isMusicActive,
    selectedHotspot,
    locale,
    shouldReduceMotion,
    applyTimeStateChoreography,
    drawFrame,
  ]);

  useEffect(() => {
    if (shouldReduceMotion) {
      elapsedSecRef.current = 0;
      applyTimeStateChoreography(propsRef.current.timeState, true);
      drawFrame();
      return;
    }

    let rafId = 0;
    let lastStepMs = performance.now();
    let lastDrawMs = lastStepMs;
    const frameIntervalMs = 1000 / 30;

    const loop = (now: number) => {
      if (document.visibilityState !== 'visible' || !inViewRef.current) {
        rafId = 0;
        return;
      }

      if (now - lastDrawMs >= frameIntervalMs) {
        const dtSec = Math.min(0.08, Math.max(0, (now - lastStepMs) / 1000));
        lastStepMs = now;
        lastDrawMs = now - ((now - lastDrawMs) % frameIntervalMs);
        elapsedSecRef.current += dtSec;
        stepSimulation(dtSec);
        drawFrame();
      }

      rafId = window.requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (rafId !== 0 || document.visibilityState !== 'visible' || !inViewRef.current) return;
      lastStepMs = performance.now();
      lastDrawMs = lastStepMs;
      rafId = window.requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      if (rafId === 0) return;
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && inViewRef.current) {
        lastStepMs = performance.now();
        drawFrame();
        startLoop();
      } else {
        stopLoop();
      }
    };

    const canvas = canvasRef.current;
    const resizeObserver =
      canvas && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            drawFrame();
          })
        : null;
    if (canvas && resizeObserver) {
      resizeObserver.observe(canvas);
    }

    const intersectionObserver =
      canvas && typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              const visible = entries.some((entry) => entry.isIntersecting);
              inViewRef.current = visible;
              if (visible) {
                drawFrame();
                startLoop();
              } else {
                stopLoop();
              }
            },
            { rootMargin: '80px' }
          )
        : null;
    if (canvas && intersectionObserver) {
      intersectionObserver.observe(canvas);
    }

    drawFrame();
    startLoop();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopLoop();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [shouldReduceMotion, stepSimulation, drawFrame, applyTimeStateChoreography]);

  const clientToRoom = (
    clientX: number,
    clientY: number
  ): { rx: number; ry: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;
    return {
      rx: (clientX - rect.left) * (ROOM_WIDTH / rect.width),
      ry: (clientY - rect.top) * (ROOM_HEIGHT / rect.height),
    };
  };

  const hitTestScene = (
    clientX: number,
    clientY: number
  ): { region: RoomHotspotRegion | null; npcId: string | null } => {
    const pt = clientToRoom(clientX, clientY);
    if (!pt) return { region: null, npcId: null };
    const { rx, ry } = pt;

    const capy = capyAnchorRef.current;
    const capyLeft = capy.x - CAPY_HIT_W / 2;
    const capyTop = capy.y - CAPY_HIT_H / 2;
    if (
      rx >= capyLeft &&
      rx <= capyLeft + CAPY_HIT_W &&
      ry >= capyTop &&
      ry <= capyTop + CAPY_HIT_H
    ) {
      return {
        region: {
          id: 'capybara',
          x: Math.round(capyLeft),
          y: Math.round(capyTop),
          w: CAPY_HIT_W,
          h: CAPY_HIT_H,
          pointerX: Math.round(capy.x),
          pointerY: Math.round(capyTop - 2),
        },
        npcId: null,
      };
    }

    const sortedByDepth = rosterRef.current
      .slice()
      .sort((a, b) => b.y - a.y || a.id.localeCompare(b.id));
    const halfW = SPRITE_W / 2 + 2;
    for (const sim of sortedByDepth) {
      if (
        rx >= sim.x - halfW &&
        rx <= sim.x + halfW &&
        ry >= sim.y - SPRITE_H - 2 &&
        ry <= sim.y + 3
      ) {
        return { region: null, npcId: sim.id };
      }
    }

    for (let i = ROOM_HOTSPOTS.length - 1; i >= 0; i -= 1) {
      const region = ROOM_HOTSPOTS[i];
      if (region.id === 'capybara') continue;
      if (
        rx >= region.x &&
        rx <= region.x + region.w &&
        ry >= region.y &&
        ry <= region.y + region.h
      ) {
        return { region, npcId: null };
      }
    }

    const deskOne = DESK_SLOTS[0];
    if (
      deskOne &&
      rx >= deskOne.x - 26 &&
      rx <= deskOne.x + 26 &&
      ry >= deskOne.y - 20 &&
      ry <= deskOne.y + 16
    ) {
      return {
        region:
          ROOM_HOTSPOTS.find((r) => r.id === 'monitor') ?? {
            id: 'monitor',
            x: 41,
            y: 103,
            w: 34,
            h: 14,
            pointerX: 58,
            pointerY: 100,
          },
        npcId: null,
      };
    }

    return { region: null, npcId: null };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType !== 'mouse') return;
    const { region, npcId } = hitTestScene(event.clientX, event.clientY);
    const prevRegion = hoveredRegionRef.current;
    const prevNpc = hoveredNpcIdRef.current;

    const regionChanged =
      (prevRegion === null && region !== null) ||
      (prevRegion !== null && region === null) ||
      (prevRegion !== null &&
        region !== null &&
        (prevRegion.id !== region.id ||
          prevRegion.x !== region.x ||
          prevRegion.y !== region.y));
    const npcChanged = prevNpc !== npcId;

    if (regionChanged || npcChanged) {
      hoveredRegionRef.current = region;
      hoveredNpcIdRef.current = npcId;
      drawFrame();
    }
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType !== 'mouse') return;
    if (hoveredRegionRef.current !== null || hoveredNpcIdRef.current !== null) {
      hoveredRegionRef.current = null;
      hoveredNpcIdRef.current = null;
      drawFrame();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { region, npcId } = hitTestScene(event.clientX, event.clientY);
    if (region) {
      selectedNpcIdRef.current = null;
      onSelectHotspot(region.id);
      drawFrame();
      return;
    }

    if (npcId) {
      const sim = rosterRef.current.find((s) => s.id === npcId);
      if (sim) {
        selectedNpcIdRef.current = sim.id;
        sim.talkUntilSec = elapsedSecRef.current + 3.6;
        if (!sim.bubbleMsg) {
          sim.bubbleMsg = sim.isLong
            ? LONG_PHRASES[propsRef.current.timeState]
            : sim.mode === 'rest'
              ? REST_PHRASES[(REST_SLOTS[sim.restIndex] ?? REST_SLOTS[0]).kind]
              : DESK_PHRASES[sim.seed % DESK_PHRASES.length];
        }
        if (sim.isLong) {
          onSelectHotspot('monitor');
        }
        drawFrame();
      }
      return;
    }

    if (selectedNpcIdRef.current !== null) {
      selectedNpcIdRef.current = null;
      drawFrame();
    }
  };

  const canvasAriaLabel = WORKSPACE_UI_LABELS[locale].canvasAriaLabel;

  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[var(--radius-inner)] border-2 border-folio-border bg-[#0F121D] shadow-soft">
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        aria-label={canvasAriaLabel}
        role="img"
        className="block h-full w-full cursor-pointer select-none touch-pan-y"
      />
    </div>
  );
};
