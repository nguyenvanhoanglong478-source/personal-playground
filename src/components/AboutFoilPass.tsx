import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { RefreshCw, Repeat2, Scissors, Sparkles } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';
import {
  EDITION_STYLES,
  FOIL_EDITIONS_ORDER,
  FoilEdition,
  PASS_HEIGHT,
  PASS_WIDTH,
  STUB_SPLIT_RATIO,
  renderBackPassTexture,
  renderFrontPassTexture,
} from './aboutPassTextures';

interface AboutFoilPassProps {
  locale: Locale;
  theme: 'light' | 'dark';
}

interface MeshState {
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  vz: Float32Array;
  nx: Float32Array;
  ny: Float32Array;
  nz: Float32Array;
  restX: Float32Array;
  restY: Float32Array;
  uv: Float32Array;
  bodyIndices: Uint16Array;
  stubIndices: Uint16Array;
  dragActive: boolean;
  dragZone: 'body' | 'stub';
  grabU: number;
  grabV: number;
  startScreenX: number;
  startScreenY: number;
  curScreenX: number;
  curScreenY: number;
  hoverNdcX: number;
  hoverNdcY: number;
  hovering: boolean;
  flipAngle: number;
  flipVel: number;
  targetFlipAngle: number;
  isTorn: boolean;
  stubDropY: number;
  stubDropVelY: number;
  stubDropRot: number;
  stubAlpha: number;
  bendIntensity: number;
}

const COLS = 16;
const BODY_ROWS = 18;
const STUB_ROWS = 7;
const BODY_VERTS = COLS * BODY_ROWS;
const STUB_VERTS = COLS * STUB_ROWS;
const TOTAL_VERTS = BODY_VERTS + STUB_VERTS;

const CARD_H = 1.48;
const CARD_W = CARD_H * (PASS_WIDTH / PASS_HEIGHT);
const HALF_W = CARD_W * 0.5;
const HALF_H = CARD_H * 0.5;
const FOV_SCALE = 1.18;
const TEAR_PULL_THRESHOLD = 0.145;

const VERT_SHADER_SRC = `
  attribute vec3 aPos;
  attribute vec3 aNormal;
  attribute vec2 aUv;

  uniform float uFlipAngle;
  uniform float uTiltX;
  uniform float uTiltY;
  uniform float uAspect;
  uniform float uFovScale;
  uniform float uDropY;
  uniform float uDropRot;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 pos = aPos;
    vec3 norm = aNormal;

    if (abs(uDropRot) > 0.0001 || abs(uDropY) > 0.0001) {
      float rc = cos(uDropRot);
      float rs = sin(uDropRot);
      float px0 = pos.x;
      float py0 = pos.y + 0.55;
      pos.x = px0 * rc - py0 * rs;
      pos.y = px0 * rs + py0 * rc - 0.55 + uDropY;
      float nx0 = norm.x;
      float ny0 = norm.y;
      norm.x = nx0 * rc - ny0 * rs;
      norm.y = nx0 * rs + ny0 * rc;
    }

    float cf = cos(uFlipAngle);
    float sf = sin(uFlipAngle);
    vec3 rPos = vec3(
      pos.x * cf + pos.z * sf,
      pos.y,
      -pos.x * sf + pos.z * cf
    );
    vec3 rNorm = vec3(
      norm.x * cf + norm.z * sf,
      norm.y,
      -norm.x * sf + norm.z * cf
    );

    float cx = cos(uTiltX);
    float sx = sin(uTiltX);
    float cy = cos(uTiltY);
    float sy = sin(uTiltY);

    vec3 yPos = vec3(rPos.x * cy + rPos.z * sy, rPos.y, -rPos.x * sy + rPos.z * cy);
    vec3 fPos = vec3(yPos.x, yPos.y * cx - yPos.z * sx, yPos.y * sx + yPos.z * cx);

    vec3 yNorm = vec3(rNorm.x * cy + rNorm.z * sy, rNorm.y, -rNorm.x * sy + rNorm.z * cy);
    vec3 fNorm = vec3(yNorm.x, yNorm.y * cx - yNorm.z * sx, yNorm.y * sx + yNorm.z * cx);

    float camDist = 3.2;
    float proj = camDist / max(0.8, camDist - fPos.z);

    vUv = aUv;
    vNormal = fNorm;
    vWorldPos = fPos;

    gl_Position = vec4(
      fPos.x * proj * (uFovScale / uAspect),
      fPos.y * proj * uFovScale,
      clamp(-fPos.z * 0.14, -0.95, 0.95),
      1.0
    );
  }
`;

const FRAG_SHADER_SRC = `
  precision mediump float;

  uniform sampler2D uFrontTex;
  uniform sampler2D uBackTex;
  uniform float uPart;
  uniform float uTorn;
  uniform float uPartAlpha;
  uniform float uHoloIntensity;
  uniform vec2 uPointer;
  uniform float uBend;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  vec3 googleSpectrum(float t) {
    float p = fract(t) * 6.0;
    vec3 c0 = vec3(0.259, 0.522, 0.957);
    vec3 c1 = vec3(0.000, 0.898, 1.000);
    vec3 c2 = vec3(0.204, 0.659, 0.325);
    vec3 c3 = vec3(0.984, 0.737, 0.016);
    vec3 c4 = vec3(0.918, 0.263, 0.208);
    vec3 c5 = vec3(0.608, 0.447, 0.796);
    if (p < 1.0) return mix(c0, c1, fract(p));
    if (p < 2.0) return mix(c1, c2, fract(p));
    if (p < 3.0) return mix(c2, c3, fract(p));
    if (p < 4.0) return mix(c3, c4, fract(p));
    if (p < 5.0) return mix(c4, c5, fract(p));
    return mix(c5, c0, fract(p));
  }

  void main() {
    if (uTorn > 0.5) {
      float tooth = 0.008 * abs(fract(vUv.x * 26.0) - 0.5) * 2.0;
      if (uPart < 0.5 && vUv.y > 0.746 - tooth) discard;
      if (uPart > 0.5 && vUv.y < 0.750 + tooth) discard;
    }

    vec4 tex = gl_FrontFacing
      ? texture2D(uFrontTex, vUv)
      : texture2D(uBackTex, vec2(1.0 - vUv.x, vUv.y));

    if (tex.a < 0.03) discard;

    vec3 N = normalize(vNormal) * (gl_FrontFacing ? 1.0 : -1.0);
    vec3 V = normalize(vec3(0.0, 0.0, 2.2) - vWorldPos);
    vec3 L = normalize(vec3(-0.34 + uPointer.x * 0.42, 0.48 - uPointer.y * 0.35, 0.84));
    vec3 H = normalize(L + V);

    float ndl = max(dot(N, L), 0.0);
    float crease = clamp(length(N.xy) * 1.45, 0.0, 1.0);
    float diffuse = 0.88 + 0.16 * ndl - 0.20 * crease * (1.0 - ndl);

    float spec = pow(max(dot(N, H), 0.0), 16.0);
    float fresnel = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.4);

    float foilPhase =
      vUv.x * 0.65 +
      vUv.y * 0.42 +
      N.x * 1.35 -
      N.y * 1.10 +
      uPointer.x * 0.28 +
      uPointer.y * 0.18;

    vec3 rainbow = googleSpectrum(foilPhase);
    float glintBand = smoothstep(0.32, 0.96, sin(foilPhase * 9.5) * 0.5 + 0.5);
    float foilMask =
      (0.06 + 0.36 * crease + 0.30 * spec + 0.18 * fresnel + 0.14 * uBend) *
      uHoloIntensity;

    vec3 lit = tex.rgb * diffuse;
    lit += rainbow * foilMask * (0.55 + 0.45 * glintBand);
    lit += vec3(1.0) * (spec * 0.26 * (0.4 + 0.6 * uHoloIntensity));

    float outAlpha = tex.a * uPartAlpha;
    gl_FragColor = vec4(clamp(lit, 0.0, 1.0) * outAlpha, outAlpha);
  }
`;

function createMeshState(): MeshState {
  const x = new Float32Array(TOTAL_VERTS);
  const y = new Float32Array(TOTAL_VERTS);
  const z = new Float32Array(TOTAL_VERTS);
  const vx = new Float32Array(TOTAL_VERTS);
  const vy = new Float32Array(TOTAL_VERTS);
  const vz = new Float32Array(TOTAL_VERTS);
  const nx = new Float32Array(TOTAL_VERTS);
  const ny = new Float32Array(TOTAL_VERTS);
  const nz = new Float32Array(TOTAL_VERTS);
  const restX = new Float32Array(TOTAL_VERTS);
  const restY = new Float32Array(TOTAL_VERTS);
  const uv = new Float32Array(TOTAL_VERTS * 2);

  for (let r = 0; r < BODY_ROWS; r++) {
    const v = (r / (BODY_ROWS - 1)) * STUB_SPLIT_RATIO;
    const py = HALF_H - v * CARD_H;
    for (let c = 0; c < COLS; c++) {
      const u = c / (COLS - 1);
      const px = -HALF_W + u * CARD_W;
      const idx = r * COLS + c;
      x[idx] = px;
      y[idx] = py;
      z[idx] = 0;
      nx[idx] = 0;
      ny[idx] = 0;
      nz[idx] = 1;
      restX[idx] = px;
      restY[idx] = py;
      uv[idx * 2] = u;
      uv[idx * 2 + 1] = v;
    }
  }

  for (let r = 0; r < STUB_ROWS; r++) {
    const v = STUB_SPLIT_RATIO + (r / (STUB_ROWS - 1)) * (1 - STUB_SPLIT_RATIO);
    const py = HALF_H - v * CARD_H;
    for (let c = 0; c < COLS; c++) {
      const u = c / (COLS - 1);
      const px = -HALF_W + u * CARD_W;
      const idx = BODY_VERTS + r * COLS + c;
      x[idx] = px;
      y[idx] = py;
      z[idx] = 0;
      nx[idx] = 0;
      ny[idx] = 0;
      nz[idx] = 1;
      restX[idx] = px;
      restY[idx] = py;
      uv[idx * 2] = u;
      uv[idx * 2 + 1] = v;
    }
  }

  const bodyIndices = new Uint16Array((BODY_ROWS - 1) * (COLS - 1) * 6);
  let bi = 0;
  for (let r = 0; r < BODY_ROWS - 1; r++) {
    for (let c = 0; c < COLS - 1; c++) {
      const a = r * COLS + c;
      const b = a + 1;
      const d = (r + 1) * COLS + c;
      const e = d + 1;
      bodyIndices[bi++] = a;
      bodyIndices[bi++] = d;
      bodyIndices[bi++] = b;
      bodyIndices[bi++] = b;
      bodyIndices[bi++] = d;
      bodyIndices[bi++] = e;
    }
  }

  const stubIndices = new Uint16Array((STUB_ROWS - 1) * (COLS - 1) * 6);
  let si = 0;
  for (let r = 0; r < STUB_ROWS - 1; r++) {
    for (let c = 0; c < COLS - 1; c++) {
      const a = BODY_VERTS + r * COLS + c;
      const b = a + 1;
      const d = BODY_VERTS + (r + 1) * COLS + c;
      const e = d + 1;
      stubIndices[si++] = a;
      stubIndices[si++] = d;
      stubIndices[si++] = b;
      stubIndices[si++] = b;
      stubIndices[si++] = d;
      stubIndices[si++] = e;
    }
  }

  return {
    x,
    y,
    z,
    vx,
    vy,
    vz,
    nx,
    ny,
    nz,
    restX,
    restY,
    uv,
    bodyIndices,
    stubIndices,
    dragActive: false,
    dragZone: 'body',
    grabU: 0.5,
    grabV: 0.5,
    startScreenX: 0,
    startScreenY: 0,
    curScreenX: 0,
    curScreenY: 0,
    hoverNdcX: 0,
    hoverNdcY: 0,
    hovering: false,
    flipAngle: 0,
    flipVel: 0,
    targetFlipAngle: 0,
    isTorn: false,
    stubDropY: 0,
    stubDropVelY: 0,
    stubDropRot: 0,
    stubAlpha: 1,
    bendIntensity: 0,
  };
}

function applyGridSprings(
  mesh: MeshState,
  offset: number,
  rows: number,
  kStruct: number,
  kBend: number,
  dt: number
) {
  const { x, y, z, vx, vy, vz, restX, restY } = mesh;

  const pullPair = (i: number, j: number, k: number) => {
    const dx = x[j] - x[i];
    const dy = y[j] - y[i];
    const dz = z[j] - z[i];
    const rdx = restX[j] - restX[i];
    const rdy = restY[j] - restY[i];
    const restLen = Math.hypot(rdx, rdy);
    const dist = Math.hypot(dx, dy, dz) || 1e-5;
    const stretch = (dist - restLen) / dist;
    const fx = dx * stretch * k * dt;
    const fy = dy * stretch * k * dt;
    const fz = dz * stretch * k * dt;
    vx[i] += fx;
    vy[i] += fy;
    vz[i] += fz;
    vx[j] -= fx;
    vy[j] -= fy;
    vz[j] -= fz;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < COLS; c++) {
      const idx = offset + r * COLS + c;
      if (c + 1 < COLS) pullPair(idx, idx + 1, kStruct);
      if (r + 1 < rows) pullPair(idx, idx + COLS, kStruct);
      if (c + 2 < COLS) pullPair(idx, idx + 2, kBend);
      if (r + 2 < rows) pullPair(idx, idx + COLS * 2, kBend);
    }
  }
}

function computeSectionNormals(
  mesh: MeshState,
  offset: number,
  rows: number
) {
  const { x, y, z, nx, ny, nz } = mesh;
  for (let r = 0; r < rows; r++) {
    const r0 = Math.max(0, r - 1);
    const r1 = Math.min(rows - 1, r + 1);
    for (let c = 0; c < COLS; c++) {
      const c0 = Math.max(0, c - 1);
      const c1 = Math.min(COLS - 1, c + 1);

      const iL = offset + r * COLS + c0;
      const iR = offset + r * COLS + c1;
      const iU = offset + r0 * COLS + c;
      const iD = offset + r1 * COLS + c;

      const ux = x[iR] - x[iL];
      const uy = y[iR] - y[iL];
      const uz = z[iR] - z[iL];

      const vx = x[iU] - x[iD];
      const vy = y[iU] - y[iD];
      const vz = z[iU] - z[iD];

      let cx = uy * vz - uz * vy;
      let cy = uz * vx - ux * vz;
      let cz = ux * vy - uy * vx;
      const len = Math.hypot(cx, cy, cz) || 1;
      cx /= len;
      cy /= len;
      cz /= len;

      const idx = offset + r * COLS + c;
      nx[idx] = cx;
      ny[idx] = cy;
      nz[idx] = cz;
    }
  }
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SHADER_SRC);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SHADER_SRC);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

function uploadCanvasTexture(
  gl: WebGLRenderingContext,
  tex: WebGLTexture,
  source: HTMLCanvasElement
) {
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
}

interface GlContextState {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  posBuffer: WebGLBuffer;
  normBuffer: WebGLBuffer;
  uvBuffer: WebGLBuffer;
  bodyIdxBuffer: WebGLBuffer;
  stubIdxBuffer: WebGLBuffer;
  frontTex: WebGLTexture;
  backTex: WebGLTexture;
  locs: {
    aPos: number;
    aNormal: number;
    aUv: number;
    uFrontTex: WebGLUniformLocation | null;
    uBackTex: WebGLUniformLocation | null;
    uFlipAngle: WebGLUniformLocation | null;
    uTiltX: WebGLUniformLocation | null;
    uTiltY: WebGLUniformLocation | null;
    uAspect: WebGLUniformLocation | null;
    uFovScale: WebGLUniformLocation | null;
    uDropY: WebGLUniformLocation | null;
    uDropRot: WebGLUniformLocation | null;
    uPart: WebGLUniformLocation | null;
    uTorn: WebGLUniformLocation | null;
    uPartAlpha: WebGLUniformLocation | null;
    uHoloIntensity: WebGLUniformLocation | null;
    uPointer: WebGLUniformLocation | null;
    uBend: WebGLUniformLocation | null;
  };
}

export const AboutFoilPass: React.FC<AboutFoilPassProps> = ({
  locale,
  theme,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frontTexCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backTexCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const avatarImgRef = useRef<HTMLImageElement | null>(null);

  const meshRef = useRef<MeshState>(createMeshState());
  const glStateRef = useRef<GlContextState | null>(null);
  const fallback2DRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(0);
  const inViewRef = useRef<boolean>(true);
  const activePointerIdRef = useRef<number | null>(null);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 360, h: 560 });

  const [edition, setEdition] = useState<FoilEdition>(() =>
    theme === 'dark' ? 'obsidian-gold' : 'silver-holo'
  );
  const [manualEditionChosen, setManualEditionChosen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTorn, setIsTorn] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragBent, setIsDragBent] = useState(false);

  const editionRef = useRef<FoilEdition>(edition);
  editionRef.current = edition;
  const reducedMotionRef = useRef<boolean>(Boolean(shouldReduceMotion));
  reducedMotionRef.current = Boolean(shouldReduceMotion);

  const labels = UI_LABELS[locale].about;

  useEffect(() => {
    if (!manualEditionChosen) {
      setEdition(theme === 'dark' ? 'obsidian-gold' : 'silver-holo');
    }
  }, [theme, manualEditionChosen]);

  const drawFallback2D = useCallback(() => {
    const canvas = canvasRef.current;
    const frontCanvas = frontTexCanvasRef.current;
    const backCanvas = backTexCanvasRef.current;
    if (!canvas || !frontCanvas || !backCanvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const mesh = meshRef.current;
    const aspect = w / Math.max(1, h);

    ctx.clearRect(0, 0, w, h);

    const drawSection = (
      offset: number,
      rows: number,
      dropY: number,
      dropRot: number,
      alpha: number
    ) => {
      if (alpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      const cf = Math.cos(mesh.flipAngle);
      const tex = cf >= 0 ? frontCanvas : backCanvas;
      const mirrorBack = cf < 0;

      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const i0 = offset + r * COLS + c;
          const i1 = i0 + 1;
          const i2 = offset + (r + 1) * COLS + c;

          const toScreen = (idx: number) => {
            let px = mesh.x[idx];
            let py = mesh.y[idx];
            if (Math.abs(dropRot) > 0.0001 || Math.abs(dropY) > 0.0001) {
              const rc = Math.cos(dropRot);
              const rs = Math.sin(dropRot);
              const py0 = py + 0.55;
              const nx = px * rc - py0 * rs;
              const ny = px * rs + py0 * rc - 0.55 + dropY;
              px = nx;
              py = ny;
            }
            const rx = px * cf;
            const ndcX = rx * (FOV_SCALE / aspect);
            const ndcY = py * FOV_SCALE;
            return [(ndcX * 0.5 + 0.5) * w, (0.5 - ndcY * 0.5) * h];
          };

          const [x0, y0] = toScreen(i0);
          const [x1, y1] = toScreen(i1);
          const [x2, y2] = toScreen(i2);

          const u0 = (mirrorBack ? 1 - mesh.uv[i0 * 2] : mesh.uv[i0 * 2]) * PASS_WIDTH;
          const v0 = mesh.uv[i0 * 2 + 1] * PASS_HEIGHT;
          const du =
            ((mirrorBack ? 1 - mesh.uv[i1 * 2] : mesh.uv[i1 * 2]) -
              (mirrorBack ? 1 - mesh.uv[i0 * 2] : mesh.uv[i0 * 2])) *
            PASS_WIDTH;
          const dv = (mesh.uv[i2 * 2 + 1] - mesh.uv[i0 * 2 + 1]) * PASS_HEIGHT;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x0 - 0.4, y0 - 0.4);
          ctx.lineTo(x1 + 0.4, y1 - 0.4);
          ctx.lineTo(x2 + 0.4, y2 + 0.4);
          ctx.lineTo(x0 + (x2 - x0) + (x1 - x0) + 0.4, y0 + (y2 - y0) + (y1 - y0) + 0.4);
          ctx.closePath();
          ctx.setTransform(
            (x1 - x0) / (Math.abs(du) < 0.001 ? 1 : du),
            (y1 - y0) / (Math.abs(du) < 0.001 ? 1 : du),
            (x2 - x0) / (Math.abs(dv) < 0.001 ? 1 : dv),
            (y2 - y0) / (Math.abs(dv) < 0.001 ? 1 : dv),
            x0,
            y0
          );
          ctx.drawImage(tex, u0, v0, Math.abs(du), Math.abs(dv), 0, 0, Math.abs(du), Math.abs(dv));
          ctx.restore();
        }
      }
      ctx.restore();
    };

    drawSection(0, BODY_ROWS, 0, 0, 1);
    drawSection(BODY_VERTS, STUB_ROWS, mesh.stubDropY, mesh.stubDropRot, mesh.stubAlpha);
  }, []);

  const renderFrame = useCallback(() => {
    const glState = glStateRef.current;
    if (!glState) {
      if (fallback2DRef.current) {
        drawFallback2D();
      }
      return;
    }

    const { gl, locs } = glState;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mesh = meshRef.current;
    const aspect = canvas.width / Math.max(1, canvas.height);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const packedPos = new Float32Array(TOTAL_VERTS * 3);
    const packedNorm = new Float32Array(TOTAL_VERTS * 3);
    for (let i = 0; i < TOTAL_VERTS; i++) {
      packedPos[i * 3] = mesh.x[i];
      packedPos[i * 3 + 1] = mesh.y[i];
      packedPos[i * 3 + 2] = mesh.z[i];
      packedNorm[i * 3] = mesh.nx[i];
      packedNorm[i * 3 + 1] = mesh.ny[i];
      packedNorm[i * 3 + 2] = mesh.nz[i];
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, glState.posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, packedPos, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(locs.aPos);
    gl.vertexAttribPointer(locs.aPos, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, glState.normBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, packedNorm, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(locs.aNormal);
    gl.vertexAttribPointer(locs.aNormal, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, glState.uvBuffer);
    gl.enableVertexAttribArray(locs.aUv);
    gl.vertexAttribPointer(locs.aUv, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(glState.program);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, glState.frontTex);
    gl.uniform1i(locs.uFrontTex, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, glState.backTex);
    gl.uniform1i(locs.uBackTex, 1);

    const tiltX = mesh.hovering && !mesh.dragActive ? mesh.hoverNdcY * 0.14 : 0;
    const tiltY = mesh.hovering && !mesh.dragActive ? -mesh.hoverNdcX * 0.14 : 0;

    gl.uniform1f(locs.uFlipAngle, mesh.flipAngle);
    gl.uniform1f(locs.uTiltX, tiltX);
    gl.uniform1f(locs.uTiltY, tiltY);
    gl.uniform1f(locs.uAspect, aspect);
    gl.uniform1f(locs.uFovScale, FOV_SCALE);
    gl.uniform1f(locs.uTorn, mesh.isTorn ? 1.0 : 0.0);
    gl.uniform1f(locs.uHoloIntensity, EDITION_STYLES[editionRef.current].holoIntensity);
    gl.uniform2f(locs.uPointer, mesh.hoverNdcX, mesh.hoverNdcY);
    gl.uniform1f(locs.uBend, mesh.bendIntensity);

    gl.uniform1f(locs.uPart, 0.0);
    gl.uniform1f(locs.uDropY, 0.0);
    gl.uniform1f(locs.uDropRot, 0.0);
    gl.uniform1f(locs.uPartAlpha, 1.0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glState.bodyIdxBuffer);
    gl.drawElements(gl.TRIANGLES, mesh.bodyIndices.length, gl.UNSIGNED_SHORT, 0);

    if (mesh.stubAlpha > 0.01) {
      gl.uniform1f(locs.uPart, 1.0);
      gl.uniform1f(locs.uDropY, mesh.stubDropY);
      gl.uniform1f(locs.uDropRot, mesh.stubDropRot);
      gl.uniform1f(locs.uPartAlpha, mesh.stubAlpha);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glState.stubIdxBuffer);
      gl.drawElements(gl.TRIANGLES, mesh.stubIndices.length, gl.UNSIGNED_SHORT, 0);
    }
  }, [drawFallback2D]);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const stepPhysicsAndRender = useCallback(
    (now: number) => {
      if (!inViewRef.current) {
        rafRef.current = null;
        return;
      }

      const dt = lastFrameRef.current
        ? Math.min(0.024, Math.max(0.004, (now - lastFrameRef.current) * 0.001))
        : 0.016;
      lastFrameRef.current = now;

      const mesh = meshRef.current;
      const reduced = reducedMotionRef.current;

      if (reduced) {
        mesh.flipAngle = mesh.targetFlipAngle;
        mesh.flipVel = 0;
        renderFrame();
        rafRef.current = null;
        return;
      }

      const subSteps = 2;
      const subDt = dt / subSteps;

      for (let s = 0; s < subSteps; s++) {
        applyGridSprings(mesh, 0, BODY_ROWS, 760, 240, subDt);
        if (!mesh.isTorn || mesh.stubAlpha > 0.01) {
          applyGridSprings(mesh, BODY_VERTS, STUB_ROWS, 760, 240, subDt);
        }

        if (!mesh.isTorn) {
          const seamBodyOffset = (BODY_ROWS - 1) * COLS;
          for (let c = 0; c < COLS; c++) {
            const bIdx = seamBodyOffset + c;
            const sIdx = BODY_VERTS + c;
            const dx = mesh.x[sIdx] - mesh.x[bIdx];
            const dy = mesh.y[sIdx] - mesh.y[bIdx];
            const dz = mesh.z[sIdx] - mesh.z[bIdx];
            const kSeam = 680 * subDt;
            mesh.vx[bIdx] += dx * kSeam;
            mesh.vy[bIdx] += dy * kSeam;
            mesh.vz[bIdx] += dz * kSeam;
            mesh.vx[sIdx] -= dx * kSeam;
            mesh.vy[sIdx] -= dy * kSeam;
            mesh.vz[sIdx] -= dz * kSeam;
          }
        }

        const cosFlip = Math.cos(mesh.flipAngle);
        const dirSign = cosFlip >= 0 ? 1 : -1;

        for (let i = 0; i < TOTAL_VERTS; i++) {
          const isStub = i >= BODY_VERTS;
          const localIdx = isStub ? i - BODY_VERTS : i;
          const r = Math.floor(localIdx / COLS);
          const c = localIdx % COLS;
          const u = c / (COLS - 1);
          const v = isStub
            ? STUB_SPLIT_RATIO + (r / (STUB_ROWS - 1)) * (1 - STUB_SPLIT_RATIO)
            : (r / (BODY_ROWS - 1)) * STUB_SPLIT_RATIO;

          const kRestore = mesh.dragActive ? 36 : 92;
          mesh.vx[i] += (mesh.restX[i] - mesh.x[i]) * kRestore * subDt;
          mesh.vy[i] += (mesh.restY[i] - mesh.y[i]) * kRestore * subDt;
          mesh.vz[i] += -mesh.z[i] * kRestore * subDt;

          if (mesh.dragActive) {
            const du = u - mesh.grabU;
            const dv = v - mesh.grabV;
            const d2 = du * du + dv * dv;
            const weight = Math.exp(-d2 / 0.14);

            const deltaScreenX = mesh.curScreenX - mesh.startScreenX;
            const deltaScreenY = mesh.curScreenY - mesh.startScreenY;
            const pullX = deltaScreenX * HALF_W * 1.15 * dirSign;
            const pullY = deltaScreenY * HALF_H * 1.15;

            const allowPull =
              mesh.dragZone === 'stub'
                ? isStub || weight > 0.35
                : true;

            if (allowPull) {
              const zoneFactor =
                mesh.dragZone === 'stub' && !isStub ? 0.24 : 1.0;
              const targetX = mesh.restX[i] + pullX * weight * zoneFactor;
              const targetY = mesh.restY[i] + pullY * weight * zoneFactor;
              const bendBulge =
                Math.hypot(deltaScreenX, deltaScreenY) * 0.42 * weight * zoneFactor;
              const targetZ =
                (deltaScreenX * du * -0.18 * dirSign + bendBulge) * 1.15;

              const kGrab = 220 * subDt;
              mesh.vx[i] += (targetX - mesh.x[i]) * kGrab;
              mesh.vy[i] += (targetY - mesh.y[i]) * kGrab;
              mesh.vz[i] += (targetZ - mesh.z[i]) * kGrab;
            }
          }

          const damp = Math.exp(-11.5 * subDt);
          mesh.vx[i] *= damp;
          mesh.vy[i] *= damp;
          mesh.vz[i] *= damp;

          mesh.x[i] += mesh.vx[i] * subDt;
          mesh.y[i] += mesh.vy[i] * subDt;
          mesh.z[i] += mesh.vz[i] * subDt;
        }
      }

      const flipForce = (mesh.targetFlipAngle - mesh.flipAngle) * 125;
      mesh.flipVel = (mesh.flipVel + flipForce * dt) * Math.exp(-12.5 * dt);
      mesh.flipAngle += mesh.flipVel * dt;

      if (mesh.isTorn && mesh.stubAlpha > 0) {
        mesh.stubDropVelY -= 4.2 * dt;
        mesh.stubDropY += mesh.stubDropVelY * dt;
        mesh.stubDropRot += 0.55 * dt;
        mesh.stubAlpha = Math.max(0, mesh.stubAlpha - 1.35 * dt);
      }

      computeSectionNormals(mesh, 0, BODY_ROWS);
      computeSectionNormals(mesh, BODY_VERTS, STUB_ROWS);

      let maxDisp = 0;
      let kinetic = Math.abs(mesh.flipVel) + Math.abs(mesh.targetFlipAngle - mesh.flipAngle);
      for (let i = 0; i < TOTAL_VERTS; i++) {
        const disp =
          Math.abs(mesh.x[i] - mesh.restX[i]) +
          Math.abs(mesh.y[i] - mesh.restY[i]) +
          Math.abs(mesh.z[i]);
        if (disp > maxDisp) maxDisp = disp;
        kinetic +=
          Math.abs(mesh.vx[i]) + Math.abs(mesh.vy[i]) + Math.abs(mesh.vz[i]) + disp;
      }

      mesh.bendIntensity = Math.min(1, maxDisp * 3.5);
      setIsDragBent(maxDisp > 0.035);

      if (
        mesh.dragActive &&
        mesh.dragZone === 'stub' &&
        !mesh.isTorn &&
        mesh.startScreenY - mesh.curScreenY > TEAR_PULL_THRESHOLD
      ) {
        mesh.isTorn = true;
        mesh.dragActive = false;
        mesh.stubDropVelY = -1.6;
        mesh.stubDropRot = 0.04;
        setIsTorn(true);
        setIsInteracting(false);
        for (let c = 0; c < COLS; c++) {
          const bIdx = (BODY_ROWS - 1) * COLS + c;
          mesh.vy[bIdx] += 0.42;
        }
      }

      renderFrame();

      const stubActive = mesh.isTorn && mesh.stubAlpha > 0.01;
      if (mesh.dragActive || mesh.hovering || stubActive || kinetic > 0.008) {
        rafRef.current = requestAnimationFrame(stepPhysicsAndRender);
      } else {
        mesh.flipAngle = mesh.targetFlipAngle;
        mesh.bendIntensity = 0;
        setIsDragBent(false);
        rafRef.current = null;
      }
    },
    [renderFrame]
  );

  const startLoop = useCallback(() => {
    if (!inViewRef.current) return;
    if (rafRef.current === null) {
      lastFrameRef.current = performance.now();
      rafRef.current = requestAnimationFrame(stepPhysicsAndRender);
    }
  }, [stepPhysicsAndRender]);

  const syncTextures = useCallback(() => {
    const frontCanvas = frontTexCanvasRef.current;
    const backCanvas = backTexCanvasRef.current;
    if (!frontCanvas || !backCanvas) return;

    renderFrontPassTexture(
      frontCanvas,
      locale,
      edition,
      theme,
      avatarImgRef.current
    );
    renderBackPassTexture(backCanvas, locale, edition, theme);

    const glState = glStateRef.current;
    if (glState) {
      uploadCanvasTexture(glState.gl, glState.frontTex, frontCanvas);
      uploadCanvasTexture(glState.gl, glState.backTex, backCanvas);
    }
    renderFrame();
  }, [edition, locale, renderFrame, theme]);

  useEffect(() => {
    frontTexCanvasRef.current = document.createElement('canvas');
    backTexCanvasRef.current = document.createElement('canvas');

    const img = new Image();
    img.src = PROFILE_DATA.avatarUrl;
    img.onload = () => {
      avatarImgRef.current = img;
      syncTextures();
    };
    if (img.complete) {
      avatarImgRef.current = img;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      powerPreference: 'high-performance',
    });

    if (gl) {
      const program = createProgram(gl);
      if (program) {
        const mesh = meshRef.current;
        const posBuffer = gl.createBuffer();
        const normBuffer = gl.createBuffer();
        const uvBuffer = gl.createBuffer();
        const bodyIdxBuffer = gl.createBuffer();
        const stubIdxBuffer = gl.createBuffer();
        const frontTex = gl.createTexture();
        const backTex = gl.createTexture();

        if (
          posBuffer &&
          normBuffer &&
          uvBuffer &&
          bodyIdxBuffer &&
          stubIdxBuffer &&
          frontTex &&
          backTex
        ) {
          gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, mesh.uv, gl.STATIC_DRAW);

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bodyIdxBuffer);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.bodyIndices, gl.STATIC_DRAW);

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, stubIdxBuffer);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.stubIndices, gl.STATIC_DRAW);

          gl.enable(gl.BLEND);
          gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
          gl.enable(gl.DEPTH_TEST);
          gl.depthFunc(gl.LEQUAL);

          glStateRef.current = {
            gl,
            program,
            posBuffer,
            normBuffer,
            uvBuffer,
            bodyIdxBuffer,
            stubIdxBuffer,
            frontTex,
            backTex,
            locs: {
              aPos: gl.getAttribLocation(program, 'aPos'),
              aNormal: gl.getAttribLocation(program, 'aNormal'),
              aUv: gl.getAttribLocation(program, 'aUv'),
              uFrontTex: gl.getUniformLocation(program, 'uFrontTex'),
              uBackTex: gl.getUniformLocation(program, 'uBackTex'),
              uFlipAngle: gl.getUniformLocation(program, 'uFlipAngle'),
              uTiltX: gl.getUniformLocation(program, 'uTiltX'),
              uTiltY: gl.getUniformLocation(program, 'uTiltY'),
              uAspect: gl.getUniformLocation(program, 'uAspect'),
              uFovScale: gl.getUniformLocation(program, 'uFovScale'),
              uDropY: gl.getUniformLocation(program, 'uDropY'),
              uDropRot: gl.getUniformLocation(program, 'uDropRot'),
              uPart: gl.getUniformLocation(program, 'uPart'),
              uTorn: gl.getUniformLocation(program, 'uTorn'),
              uPartAlpha: gl.getUniformLocation(program, 'uPartAlpha'),
              uHoloIntensity: gl.getUniformLocation(program, 'uHoloIntensity'),
              uPointer: gl.getUniformLocation(program, 'uPointer'),
              uBend: gl.getUniformLocation(program, 'uBend'),
            },
          };
        }
      }
    }

    if (!glStateRef.current) {
      fallback2DRef.current = true;
    }

    syncTextures();
    let mounted = true;
    document.fonts?.ready.then(() => {
      if (mounted) syncTextures();
    });

    return () => {
      mounted = false;
      stopLoop();
    };
  }, [stopLoop, syncTextures]);

  useEffect(() => {
    syncTextures();
  }, [syncTextures]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);
      sizeRef.current = { w: rect.width, h: rect.height };
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        renderFrame();
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        inViewRef.current = visible;
        if (visible) {
          renderFrame();
        } else {
          stopLoop();
        }
      },
      { rootMargin: '120px' }
    );
    io.observe(stage);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [renderFrame, stopLoop]);

  const mapPointerToNdc = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { ndcX: 0, ndcY: 0, u: 0.5, v: 0.5 };
    const rect = canvas.getBoundingClientRect();
    const aspect = rect.width / Math.max(1, rect.height);
    const ndcX = ((clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    const ndcY = 1 - ((clientY - rect.top) / Math.max(1, rect.height)) * 2;
    const worldX = (ndcX * aspect) / FOV_SCALE;
    const worldY = ndcY / FOV_SCALE;

    const mesh = meshRef.current;
    const cosFlip = Math.cos(mesh.flipAngle);
    const localX = Math.abs(cosFlip) > 0.2 ? worldX / cosFlip : worldX;
    const u = Math.max(0, Math.min(1, (localX + HALF_W) / CARD_W));
    const v = Math.max(0, Math.min(1, (HALF_H - worldY) / CARD_H));

    return {
      ndcX: worldX / HALF_W,
      ndcY: worldY / HALF_H,
      u,
      v,
    };
  }, []);

  const releaseDrag = useCallback(() => {
    const mesh = meshRef.current;
    if (!mesh.dragActive) return;
    mesh.dragActive = false;
    activePointerIdRef.current = null;
    setIsInteracting(false);
    startLoop();
  }, [startLoop]);

  useEffect(() => {
    if (!isInteracting) return;
    const onWinEnd = (e: PointerEvent) => {
      if (activePointerIdRef.current === null || e.pointerId === activePointerIdRef.current) {
        releaseDrag();
      }
    };
    window.addEventListener('pointerup', onWinEnd);
    window.addEventListener('pointercancel', onWinEnd);
    return () => {
      window.removeEventListener('pointerup', onWinEnd);
      window.removeEventListener('pointercancel', onWinEnd);
    };
  }, [isInteracting, releaseDrag]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (shouldReduceMotion || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const mapped = mapPointerToNdc(e.clientX, e.clientY);
    const mesh = meshRef.current;
    activePointerIdRef.current = e.pointerId;
    mesh.dragActive = true;
    mesh.dragZone = mapped.v >= STUB_SPLIT_RATIO - 0.03 && !mesh.isTorn ? 'stub' : 'body';
    mesh.grabU = mapped.u;
    mesh.grabV = mapped.v;
    mesh.startScreenX = mapped.ndcX;
    mesh.startScreenY = mapped.ndcY;
    mesh.curScreenX = mapped.ndcX;
    mesh.curScreenY = mapped.ndcY;
    mesh.hoverNdcX = mapped.ndcX;
    mesh.hoverNdcY = mapped.ndcY;
    setIsInteracting(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      return;
    }
    startLoop();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (shouldReduceMotion) return;
    const mapped = mapPointerToNdc(e.clientX, e.clientY);
    const mesh = meshRef.current;
    mesh.hoverNdcX = Math.max(-1.2, Math.min(1.2, mapped.ndcX));
    mesh.hoverNdcY = Math.max(-1.2, Math.min(1.2, mapped.ndcY));

    if (e.pointerType === 'mouse') {
      mesh.hovering = true;
    }
    if (mesh.dragActive && activePointerIdRef.current === e.pointerId) {
      mesh.curScreenX = mapped.ndcX;
      mesh.curScreenY = mapped.ndcY;
    }
    startLoop();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointerIdRef.current === e.pointerId) {
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        return;
      }
      releaseDrag();
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const mesh = meshRef.current;
    mesh.hovering = false;
    if (e.pointerType !== 'mouse' || !mesh.dragActive) {
      mesh.hoverNdcX = 0;
      mesh.hoverNdcY = 0;
      startLoop();
    }
  };

  const handleFlip = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    const mesh = meshRef.current;
    mesh.targetFlipAngle = next ? Math.PI : 0;
    if (shouldReduceMotion) {
      mesh.flipAngle = mesh.targetFlipAngle;
      renderFrame();
    } else {
      startLoop();
    }
  };

  const handleTearOrReset = () => {
    const mesh = meshRef.current;
    if (!isTorn) {
      mesh.isTorn = true;
      mesh.dragActive = false;
      mesh.stubDropVelY = -1.6;
      mesh.stubDropRot = 0.04;
      setIsTorn(true);
      setIsInteracting(false);
      if (shouldReduceMotion) {
        mesh.stubAlpha = 0;
        renderFrame();
      } else {
        for (let c = 0; c < COLS; c++) {
          const bIdx = (BODY_ROWS - 1) * COLS + c;
          mesh.vy[bIdx] += 0.45;
        }
        startLoop();
      }
      return;
    }

    mesh.isTorn = false;
    mesh.stubDropY = 0;
    mesh.stubDropVelY = 0;
    mesh.stubDropRot = 0;
    mesh.stubAlpha = 1;
    for (let i = 0; i < TOTAL_VERTS; i++) {
      mesh.x[i] = mesh.restX[i];
      mesh.y[i] = mesh.restY[i];
      mesh.z[i] = 0;
      mesh.vx[i] = 0;
      mesh.vy[i] = 0;
      mesh.vz[i] = 0;
      mesh.nx[i] = 0;
      mesh.ny[i] = 0;
      mesh.nz[i] = 1;
    }
    setIsTorn(false);
    renderFrame();
    if (!shouldReduceMotion) startLoop();
  };

  const handleSelectEdition = (nextEdition: FoilEdition) => {
    setManualEditionChosen(true);
    setEdition(nextEdition);
  };

  return (
    <div
      ref={stageRef}
      data-flipped={isFlipped ? 'true' : 'false'}
      data-torn={isTorn ? 'true' : 'false'}
      data-edition={edition}
      data-interacting={isInteracting ? 'true' : 'false'}
      data-drag-bent={isDragBent ? 'true' : 'false'}
      className="about-foil-stage mx-auto flex w-full max-w-[360px] flex-col items-center gap-3.5 lg:mx-0"
    >
      <div className="relative w-full">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          aria-label={
            locale === 'vi'
              ? 'Vé định danh Hologram tương tác của Long Hoàng, có thể kéo uốn cong, lật hai mặt và xé cuống vé'
              : 'Interactive holographic creator pass for Long Hoàng with 3D bending, two-sided flip, and tearable stub'
          }
          className="about-foil-canvas block aspect-[360/560] w-full cursor-grab active:cursor-grabbing"
        />
        <img
          src={PROFILE_DATA.avatarUrl}
          alt={labels.portraitAlt}
          className="sr-only"
        />
      </div>

      <p className="text-center font-mono text-[11px] text-folio-faint">
        {locale === 'vi'
          ? 'Kéo trên vé để uốn nếp · Kéo cuống dưới để xé'
          : 'Drag pass to bend foil · Pull bottom stub to tear'}
      </p>

      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={handleFlip}
          className="folio-btn-compact"
        >
          <span className="google-pill-aura" aria-hidden="true" />
          <Repeat2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{locale === 'vi' ? 'Lật vé' : 'Flip Pass'}</span>
        </button>

        <button
          type="button"
          onClick={handleTearOrReset}
          className="folio-btn-compact"
        >
          <span className="google-pill-aura" aria-hidden="true" />
          {isTorn ? (
            <>
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                {locale === 'vi' ? 'Cấp lại vé nguyên vẹn' : 'Issue Fresh Pass'}
              </span>
            </>
          ) : (
            <>
              <Scissors className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{locale === 'vi' ? 'Xé cuống vé' : 'Tear Stub'}</span>
            </>
          )}
        </button>
      </div>

      <div
        role="group"
        aria-label={
          locale === 'vi' ? 'Chọn chất liệu Foil' : 'Select Foil Edition'
        }
        className="flex w-full flex-wrap items-center justify-center gap-2 pt-0.5"
      >
        {FOIL_EDITIONS_ORDER.map((edKey) => {
          const item = EDITION_STYLES[edKey];
          const isActive = edition === edKey;
          return (
            <button
              key={edKey}
              type="button"
              onClick={() => handleSelectEdition(edKey)}
              aria-pressed={isActive}
              data-active={isActive ? 'true' : 'false'}
              className={`folio-btn-compact about-edition-pill !px-3 ${
                isActive ? 'about-edition-pill--active' : ''
              }`}
            >
              <span className="google-pill-aura" aria-hidden="true" />
              {isActive && (
                <Sparkles className="h-3 w-3 shrink-0" aria-hidden="true" />
              )}
              <span>
                {item.code} {item.label[locale]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
