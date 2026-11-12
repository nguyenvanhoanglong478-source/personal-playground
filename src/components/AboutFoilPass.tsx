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
  renderBackPassTexture,
  renderFrontPassTexture,
} from './aboutPassTextures';

interface AboutFoilPassProps {
  locale: Locale;
  theme: 'light' | 'dark';
}

const COLS = 24;
const BODY_ROWS = 28;
const STUB_ROWS = 8;
const ROWS = BODY_ROWS + STUB_ROWS;
const BODY_VERTS = COLS * BODY_ROWS;
const STUB_VERTS = COLS * STUB_ROWS;
const TOTAL_VERTS = BODY_VERTS + STUB_VERTS;
const TEAR_ROW = BODY_ROWS;

const CARD_H = 1.48;
const CARD_W = CARD_H * (PASS_WIDTH / PASS_HEIGHT);
const HALF_W = CARD_W * 0.5;
const HALF_H = CARD_H * 0.5;
const FOV_SCALE = 1.18;
const STUB_SPLIT_RATIO = 0.775;
const PBD_ITERATIONS = 16;

interface ConstraintsData {
  i1: Int32Array;
  i2: Int32Array;
  restLen: Float32Array;
  stiffness: Float32Array;
  isCrossSeam: Uint8Array;
  seamCol: Int16Array;
  count: number;
}

interface MeshState {
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  oldX: Float32Array;
  oldY: Float32Array;
  oldZ: Float32Array;
  restX: Float32Array;
  restY: Float32Array;
  nx: Float32Array;
  ny: Float32Array;
  nz: Float32Array;
  uv: Float32Array;
  seamBroken: Uint8Array;
  bodyIndices: Uint16Array;
  stubIndices: Uint16Array;
  constraints: ConstraintsData;
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
  tearWaveActive: boolean;
  tearWaveStartTime: number;
  stubAlpha: number;
  bendIntensity: number;
}

const VERT_SHADER_SRC = `
  precision mediump float;

  attribute vec3 aPos;
  attribute vec3 aNormal;
  attribute vec2 aUv;
  attribute float aSeamBroken;

  uniform float uFlipAngle;
  uniform float uTiltX;
  uniform float uTiltY;
  uniform float uAspect;
  uniform float uFovScale;
  uniform float uIsShadow;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vSeamBroken;

  void main() {
    vec3 pos = aPos;
    vec3 norm = aNormal;

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

    if (uIsShadow > 0.5) {
      float zLift = max(0.0, fPos.z + 0.15);
      fPos.x += 0.028 + zLift * 0.08;
      fPos.y -= 0.044 + zLift * 0.09;
      fPos.z = -0.22;
    }

    float camDist = 3.2;
    float w = max(0.8, camDist - fPos.z);

    vUv = aUv;
    vNormal = normalize(fNorm);
    vWorldPos = fPos;
    vSeamBroken = aSeamBroken;

    gl_Position = vec4(
      fPos.x * camDist * (uFovScale / uAspect),
      fPos.y * camDist * uFovScale,
      clamp(-fPos.z * 0.12, -0.95, 0.95) * w,
      w
    );
  }
`;

const FRAG_SHADER_SRC = `
  precision mediump float;

  uniform sampler2D uFrontTex;
  uniform sampler2D uBackTex;
  uniform float uEdition;
  uniform float uHoloIntensity;
  uniform vec2 uPointer;
  uniform float uBend;
  uniform float uPartAlpha;
  uniform float uIsShadow;
  uniform float uIsStub;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vSeamBroken;

  float tornEdgeOffset(float u) {
    float tooth = abs(sin(u * 28.0 * 3.14159265)) * 0.0085;
    float fiber = (sin(u * 97.0) * 0.5 + sin(u * 211.0) * 0.35 + cos(u * 347.0) * 0.15) * 0.0055;
    return tooth + fiber;
  }

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

  vec3 silverHoloSpectrum(float t) {
    float p = fract(t);
    return 0.5 + 0.5 * cos(6.28318 * (p + vec3(0.0, 0.33, 0.67)));
  }

  vec3 obsidianGoldSpectrum(float t) {
    float p = fract(t);
    vec3 gold = vec3(1.0, 0.84, 0.45);
    vec3 violet = vec3(0.65, 0.45, 0.85);
    vec3 emerald = vec3(0.35, 0.85, 0.55);
    if (p < 0.5) return mix(gold, emerald, p * 2.0);
    return mix(emerald, violet, (p - 0.5) * 2.0);
  }

  void main() {
    vec4 tex = gl_FrontFacing
      ? texture2D(uFrontTex, vUv)
      : texture2D(uBackTex, vec2(1.0 - vUv.x, vUv.y));

    if (tex.a < 0.03) discard;

    float distToCut = 999.0;
    if (vSeamBroken > 0.45) {
      float cutY = 0.775 - 0.012 + tornEdgeOffset(vUv.x);
      if (uIsStub < 0.5) {
        if (vUv.y > cutY) discard;
        distToCut = abs(vUv.y - cutY);
      } else {
        if (vUv.y < cutY) discard;
        distToCut = abs(vUv.y - cutY);
      }
    }

    if (uIsShadow > 0.5) {
      float shadowAlpha = 0.16 * tex.a * uPartAlpha * clamp(1.0 - vWorldPos.z * 0.4, 0.1, 1.0);
      gl_FragColor = vec4(0.0, 0.0, 0.0, shadowAlpha);
      return;
    }

    vec3 N = normalize(vNormal) * (gl_FrontFacing ? 1.0 : -1.0);
    vec3 V = normalize(vec3(0.0, 0.0, 3.2) - vWorldPos);
    vec3 L = normalize(vec3(-0.35 + uPointer.x * 0.38, 0.52 - uPointer.y * 0.35, 0.84));
    vec3 H = normalize(L + V);

    float ndl = dot(N, L);
    float diffuse = clamp(0.70 + 0.30 * ndl, 0.32, 1.0);

    float curvature = clamp(length(N.xy) * 1.55, 0.0, 1.0);
    float creaseShadow = smoothstep(0.0, 0.65, curvature * max(0.0, -ndl + 0.18));
    diffuse -= creaseShadow * 0.32;

    float specPower = mix(18.0, 42.0, curvature);
    float spec = pow(max(dot(N, H), 0.0), specPower);

    float ndv = clamp(dot(N, V), 0.0, 1.0);
    float fresnel = pow(1.0 - ndv, 2.4);

    float normalAngle = atan(N.y, N.x);
    float normalTilt = 1.0 - abs(N.z);
    float foilPhase =
      vUv.x * 0.54 +
      vUv.y * 0.34 +
      normalAngle * 0.318 +
      normalTilt * 1.80 +
      uPointer.x * 0.24 +
      uPointer.y * 0.14;

    vec3 rainbow = uEdition < 0.5
      ? silverHoloSpectrum(foilPhase)
      : (uEdition < 1.5 ? obsidianGoldSpectrum(foilPhase) : googleSpectrum(foilPhase));

    float isTopStrip = smoothstep(0.0, 0.075, 0.075 - vUv.y);
    float foilMask = (0.05 + 0.70 * normalTilt + 0.48 * curvature + 0.38 * isTopStrip + 0.28 * spec + 0.18 * fresnel + 0.12 * uBend) * uHoloIntensity;
    float glintBand = smoothstep(0.32, 0.94, sin(foilPhase * 8.2) * 0.5 + 0.5);

    if (distToCut < 0.0050) {
      float fiberBlend = smoothstep(0.0050, 0.0005, distToCut);
      vec3 paperCore = vec3(0.95, 0.94, 0.91);
      tex.rgb = mix(tex.rgb, paperCore, fiberBlend);
      foilMask *= (1.0 - fiberBlend);
      spec *= (1.0 - fiberBlend);
    }

    vec3 lit = tex.rgb * diffuse;
    lit += rainbow * foilMask * (0.58 + 0.42 * glintBand);
    lit += vec3(1.0) * (spec * 0.32 * (0.4 + 0.6 * uHoloIntensity));

    float outAlpha = tex.a * uPartAlpha;
    gl_FragColor = vec4(clamp(lit, 0.0, 1.0), outAlpha);
  }
`;

function buildGridConstraints(
  restX: Float32Array,
  restY: Float32Array
): ConstraintsData {
  const maxConstraints = 8000;
  const i1 = new Int32Array(maxConstraints);
  const i2 = new Int32Array(maxConstraints);
  const restLen = new Float32Array(maxConstraints);
  const stiffness = new Float32Array(maxConstraints);
  const isCrossSeam = new Uint8Array(maxConstraints);
  const seamCol = new Int16Array(maxConstraints);
  let count = 0;

  const add = (
    a: number,
    b: number,
    stiff: number,
    crossSeam: boolean,
    colIndex: number,
    forcedLen?: number
  ) => {
    if (count >= maxConstraints) return;
    i1[count] = a;
    i2[count] = b;
    const len =
      forcedLen !== undefined
        ? forcedLen
        : Math.hypot(restX[b] - restX[a], restY[b] - restY[a]);
    restLen[count] = len;
    stiffness[count] = stiff;
    isCrossSeam[count] = crossSeam ? 1 : 0;
    seamCol[count] = colIndex;
    count++;
  };

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const idx = r * COLS + c;

      if (c + 1 < COLS) {
        add(idx, idx + 1, 0.98, false, -1);
      }

      if (r + 1 < ROWS) {
        const next = (r + 1) * COLS + c;
        const isSeam = r === TEAR_ROW - 1;
        add(idx, next, 0.98, isSeam, isSeam ? c : -1, isSeam ? 0.0 : undefined);
      }

      if (r + 1 < ROWS && c + 1 < COLS) {
        const d1 = (r + 1) * COLS + (c + 1);
        const isSeam = r === TEAR_ROW - 1;
        add(idx, d1, 0.85, isSeam, isSeam ? c : -1);
      }
      if (r + 1 < ROWS && c - 1 >= 0) {
        const d2 = (r + 1) * COLS + (c - 1);
        const isSeam = r === TEAR_ROW - 1;
        add(idx, d2, 0.85, isSeam, isSeam ? c : -1);
      }

      if (c + 2 < COLS) {
        add(idx, idx + 2, 0.42, false, -1);
      }
      if (c + 3 < COLS) {
        add(idx, idx + 3, 0.28, false, -1);
      }

      if (r + 2 < ROWS) {
        const next2 = (r + 2) * COLS + c;
        const isSeam = r === TEAR_ROW - 2 || r === TEAR_ROW - 1;
        add(idx, next2, 0.42, isSeam, isSeam ? c : -1);
      }
      if (r + 3 < ROWS) {
        const next3 = (r + 3) * COLS + c;
        const isSeam =
          r === TEAR_ROW - 3 || r === TEAR_ROW - 2 || r === TEAR_ROW - 1;
        add(idx, next3, 0.28, isSeam, isSeam ? c : -1);
      }
    }
  }

  return { i1, i2, restLen, stiffness, isCrossSeam, seamCol, count };
}

function createMeshState(): MeshState {
  const x = new Float32Array(TOTAL_VERTS);
  const y = new Float32Array(TOTAL_VERTS);
  const z = new Float32Array(TOTAL_VERTS);
  const oldX = new Float32Array(TOTAL_VERTS);
  const oldY = new Float32Array(TOTAL_VERTS);
  const oldZ = new Float32Array(TOTAL_VERTS);
  const restX = new Float32Array(TOTAL_VERTS);
  const restY = new Float32Array(TOTAL_VERTS);
  const nx = new Float32Array(TOTAL_VERTS);
  const ny = new Float32Array(TOTAL_VERTS);
  const nz = new Float32Array(TOTAL_VERTS);
  const uv = new Float32Array(TOTAL_VERTS * 2);
  const seamBroken = new Uint8Array(COLS);

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
      oldX[idx] = px;
      oldY[idx] = py;
      oldZ[idx] = 0;
      restX[idx] = px;
      restY[idx] = py;
      nx[idx] = 0;
      ny[idx] = 0;
      nz[idx] = 1;
      uv[idx * 2] = u;
      uv[idx * 2 + 1] = v;
    }
  }

  for (let r = 0; r < STUB_ROWS; r++) {
    const v =
      STUB_SPLIT_RATIO + (r / (STUB_ROWS - 1)) * (1.0 - STUB_SPLIT_RATIO);
    const py = HALF_H - v * CARD_H;
    for (let c = 0; c < COLS; c++) {
      const u = c / (COLS - 1);
      const px = -HALF_W + u * CARD_W;
      const idx = BODY_VERTS + r * COLS + c;
      x[idx] = px;
      y[idx] = py;
      z[idx] = 0;
      oldX[idx] = px;
      oldY[idx] = py;
      oldZ[idx] = 0;
      restX[idx] = px;
      restY[idx] = py;
      nx[idx] = 0;
      ny[idx] = 0;
      nz[idx] = 1;
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

  const constraints = buildGridConstraints(restX, restY);

  return {
    x,
    y,
    z,
    oldX,
    oldY,
    oldZ,
    restX,
    restY,
    nx,
    ny,
    nz,
    uv,
    seamBroken,
    bodyIndices,
    stubIndices,
    constraints,
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
    tearWaveActive: false,
    tearWaveStartTime: 0,
    stubAlpha: 1.0,
    bendIntensity: 0,
  };
}

function computeNormals(mesh: MeshState) {
  const { x, y, z, nx, ny, nz, seamBroken } = mesh;

  for (let r = 0; r < ROWS; r++) {
    const isBody = r < BODY_ROWS;
    const stubRow = r - BODY_ROWS;

    for (let c = 0; c < COLS; c++) {
      const c0 = Math.max(0, c - 1);
      const c1 = Math.min(COLS - 1, c + 1);

      let iU = 0;
      let iD = 0;

      if (isBody) {
        const r0 = Math.max(0, r - 1);
        iU = r0 * COLS + c;

        if (r < BODY_ROWS - 1) {
          iD = (r + 1) * COLS + c;
        } else {
          if (seamBroken[c] === 0) {
            iD = BODY_VERTS + 1 * COLS + c;
            iU = (BODY_ROWS - 2) * COLS + c;
          } else {
            iD = (BODY_ROWS - 1) * COLS + c;
            iU = (BODY_ROWS - 2) * COLS + c;
          }
        }
      } else {
        const r1 = Math.min(STUB_ROWS - 1, stubRow + 1);
        iD = BODY_VERTS + r1 * COLS + c;

        if (stubRow > 0) {
          iU = BODY_VERTS + (stubRow - 1) * COLS + c;
        } else {
          if (seamBroken[c] === 0) {
            iU = (BODY_ROWS - 2) * COLS + c;
            iD = BODY_VERTS + 1 * COLS + c;
          } else {
            iU = BODY_VERTS + c;
            iD = BODY_VERTS + 1 * COLS + c;
          }
        }
      }

      const idx = isBody ? r * COLS + c : BODY_VERTS + stubRow * COLS + c;
      const iL = isBody ? r * COLS + c0 : BODY_VERTS + stubRow * COLS + c0;
      const iR = isBody ? r * COLS + c1 : BODY_VERTS + stubRow * COLS + c1;

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

      nx[idx] = cx / len;
      ny[idx] = cy / len;
      nz[idx] = cz / len;
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

  const ext =
    gl.getExtension('EXT_texture_filter_anisotropic') ||
    gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
  if (ext) {
    const maxAniso = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT) || 4;
    gl.texParameterf(
      gl.TEXTURE_2D,
      ext.TEXTURE_MAX_ANISOTROPY_EXT,
      Math.min(4, maxAniso)
    );
  }

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
}

interface GlContextState {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  posBuffer: WebGLBuffer;
  normBuffer: WebGLBuffer;
  uvBuffer: WebGLBuffer;
  seamBuffer: WebGLBuffer;
  bodyIdxBuffer: WebGLBuffer;
  stubIdxBuffer: WebGLBuffer;
  frontTex: WebGLTexture;
  backTex: WebGLTexture;
  locs: {
    aPos: number;
    aNormal: number;
    aUv: number;
    aSeamBroken: number;
    uFrontTex: WebGLUniformLocation | null;
    uBackTex: WebGLUniformLocation | null;
    uFlipAngle: WebGLUniformLocation | null;
    uTiltX: WebGLUniformLocation | null;
    uTiltY: WebGLUniformLocation | null;
    uAspect: WebGLUniformLocation | null;
    uFovScale: WebGLUniformLocation | null;
    uIsShadow: WebGLUniformLocation | null;
    uIsStub: WebGLUniformLocation | null;
    uEdition: WebGLUniformLocation | null;
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
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(0);
  const inViewRef = useRef<boolean>(true);
  const activePointerIdRef = useRef<number | null>(null);

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

  const renderFrame = useCallback(() => {
    const glState = glStateRef.current;
    if (!glState) return;

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
    const packedSeam = new Float32Array(TOTAL_VERTS);

    for (let i = 0; i < TOTAL_VERTS; i++) {
      packedPos[i * 3] = mesh.x[i];
      packedPos[i * 3 + 1] = mesh.y[i];
      packedPos[i * 3 + 2] = mesh.z[i];
      packedNorm[i * 3] = mesh.nx[i];
      packedNorm[i * 3 + 1] = mesh.ny[i];
      packedNorm[i * 3 + 2] = mesh.nz[i];
      const col = i % COLS;
      packedSeam[i] = mesh.seamBroken[col];
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

    gl.bindBuffer(gl.ARRAY_BUFFER, glState.seamBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, packedSeam, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(locs.aSeamBroken);
    gl.vertexAttribPointer(locs.aSeamBroken, 1, gl.FLOAT, false, 0, 0);

    gl.useProgram(glState.program);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, glState.frontTex);
    gl.uniform1i(locs.uFrontTex, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, glState.backTex);
    gl.uniform1i(locs.uBackTex, 1);

    const tiltX = mesh.hovering && !mesh.dragActive ? mesh.hoverNdcY * 0.12 : 0;
    const tiltY = mesh.hovering && !mesh.dragActive ? -mesh.hoverNdcX * 0.12 : 0;

    gl.uniform1f(locs.uFlipAngle, mesh.flipAngle);
    gl.uniform1f(locs.uTiltX, tiltX);
    gl.uniform1f(locs.uTiltY, tiltY);
    gl.uniform1f(locs.uAspect, aspect);
    gl.uniform1f(locs.uFovScale, FOV_SCALE);
    gl.uniform1f(
      locs.uHoloIntensity,
      EDITION_STYLES[editionRef.current].holoIntensity
    );
    gl.uniform2f(locs.uPointer, mesh.hoverNdcX, mesh.hoverNdcY);
    gl.uniform1f(locs.uBend, mesh.bendIntensity);

    const editionIndex =
      editionRef.current === 'silver-holo'
        ? 0.0
        : editionRef.current === 'obsidian-gold'
          ? 1.0
          : 2.0;
    gl.uniform1f(locs.uEdition, editionIndex);

    gl.disable(gl.DEPTH_TEST);
    gl.uniform1f(locs.uIsShadow, 1.0);
    gl.uniform1f(locs.uPartAlpha, 1.0);
    gl.uniform1f(locs.uIsStub, 0.0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glState.bodyIdxBuffer);
    gl.drawElements(gl.TRIANGLES, mesh.bodyIndices.length, gl.UNSIGNED_SHORT, 0);

    if (mesh.stubAlpha > 0.01) {
      gl.uniform1f(locs.uPartAlpha, mesh.stubAlpha);
      gl.uniform1f(locs.uIsStub, 1.0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glState.stubIdxBuffer);
      gl.drawElements(gl.TRIANGLES, mesh.stubIndices.length, gl.UNSIGNED_SHORT, 0);
    }

    gl.enable(gl.DEPTH_TEST);
    gl.uniform1f(locs.uIsShadow, 0.0);
    gl.uniform1f(locs.uPartAlpha, 1.0);
    gl.uniform1f(locs.uIsStub, 0.0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glState.bodyIdxBuffer);
    gl.drawElements(gl.TRIANGLES, mesh.bodyIndices.length, gl.UNSIGNED_SHORT, 0);

    if (mesh.stubAlpha > 0.01) {
      gl.uniform1f(locs.uPartAlpha, mesh.stubAlpha);
      gl.uniform1f(locs.uIsStub, 1.0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glState.stubIdxBuffer);
      gl.drawElements(gl.TRIANGLES, mesh.stubIndices.length, gl.UNSIGNED_SHORT, 0);
    }
  }, []);

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

      const damping = 0.94;
      const cosFlip = Math.cos(mesh.flipAngle);
      const curlSign = cosFlip >= 0 ? 1 : -1;

      for (let i = 0; i < TOTAL_VERTS; i++) {
        const isStub = i >= BODY_VERTS;
        const col = i % COLS;

        if (mesh.isTorn && isStub) {
          const tiltOffset = (col / (COLS - 1) - 0.5) * 0.0006;
          const flutter = Math.sin(now * 0.009 + col * 0.45) * 0.0008;
          const vx = (mesh.x[i] - mesh.oldX[i]) * 0.96 + tiltOffset;
          const vy = (mesh.y[i] - mesh.oldY[i]) * 0.96 - 0.0028;
          const vz = (mesh.z[i] - mesh.oldZ[i]) * 0.96 + flutter;

          mesh.oldX[i] = mesh.x[i];
          mesh.oldY[i] = mesh.y[i];
          mesh.oldZ[i] = mesh.z[i];

          mesh.x[i] += vx;
          mesh.y[i] += vy;
          mesh.z[i] += vz;
        } else {
          let vx = (mesh.x[i] - mesh.oldX[i]) * damping;
          let vy = (mesh.y[i] - mesh.oldY[i]) * damping;
          let vz = (mesh.z[i] - mesh.oldZ[i]) * damping;

          let spring = 0.085;
          if (mesh.dragActive) {
            const u = mesh.uv[i * 2];
            const v = mesh.uv[i * 2 + 1];
            const distFromGrab = Math.hypot(u - mesh.grabU, v - mesh.grabV);
            spring = Math.min(0.065, 0.008 + distFromGrab * 0.05);
          }

          const targetX = mesh.restX[i];
          const targetY = mesh.restY[i];
          const targetZ = 0;

          vx += (targetX - mesh.x[i]) * spring;
          vy += (targetY - mesh.y[i]) * spring;
          vz += (targetZ - mesh.z[i]) * spring;

          mesh.oldX[i] = mesh.x[i];
          mesh.oldY[i] = mesh.y[i];
          mesh.oldZ[i] = mesh.z[i];

          mesh.x[i] += vx;
          mesh.y[i] += vy;
          mesh.z[i] += vz;
        }
      }

      if (mesh.dragActive) {
        const deltaScreenX =
          (mesh.curScreenX - mesh.startScreenX) * Math.cos(mesh.flipAngle);
        const deltaScreenY = mesh.curScreenY - mesh.startScreenY;
        const dragDist = Math.hypot(deltaScreenX, deltaScreenY);

        if (dragDist > 1e-4) {
          for (let i = 0; i < TOTAL_VERTS; i++) {
            const isStub = i >= BODY_VERTS;
            if (mesh.isTorn && isStub) continue;

            const u = mesh.uv[i * 2];
            const v = mesh.uv[i * 2 + 1];
            const du = u - mesh.grabU;
            const dv = v - mesh.grabV;
            const dist = Math.hypot(du, dv * (PASS_HEIGHT / PASS_WIDTH));

            const peelWeight = Math.exp(-dist * 2.2);

            if (peelWeight > 0.005) {
              const pullX = deltaScreenX * HALF_W * 1.35;
              const pullY = deltaScreenY * HALF_H * 1.35;

              const curlZ =
                (dragDist * 0.72 +
                  Math.sin(Math.min(Math.PI, dist * 3.5)) * 0.35) *
                peelWeight *
                curlSign;

              const grabStrength = 0.48 * peelWeight;
              mesh.x[i] +=
                (mesh.restX[i] + pullX - mesh.x[i]) * grabStrength;
              mesh.y[i] += (mesh.restY[i] + pullY - mesh.y[i]) * grabStrength;
              mesh.z[i] += (curlZ - mesh.z[i]) * grabStrength;
            }
          }
        }
      }

      if (mesh.dragActive && mesh.dragZone === 'stub' && !mesh.isTorn) {
        const pullDown = mesh.startScreenY - mesh.curScreenY;

        for (let c = 0; c < COLS; c++) {
          if (mesh.seamBroken[c] === 1) continue;
          const bIdx = (BODY_ROWS - 1) * COLS + c;
          const sIdx = BODY_VERTS + c;

          const dx = mesh.x[sIdx] - mesh.x[bIdx];
          const dy = mesh.y[sIdx] - mesh.y[bIdx];
          const dz = mesh.z[sIdx] - mesh.z[bIdx];
          const stretch = Math.hypot(dx, dy, dz);

          const colU = c / (COLS - 1);
          const distToGrabCol = Math.abs(colU - mesh.grabU);
          const colThreshold = Math.max(
            0.028,
            0.046 - (1.0 - distToGrabCol) * 0.022
          );

          const hasAdjacentBroken =
            (c > 0 && mesh.seamBroken[c - 1] === 1) ||
            (c < COLS - 1 && mesh.seamBroken[c + 1] === 1);
          const adjThreshold = hasAdjacentBroken
            ? colThreshold * 0.72
            : colThreshold;

          if (stretch > adjThreshold || pullDown > 0.12) {
            mesh.seamBroken[c] = 1;
            mesh.z[sIdx] += 0.035 * curlSign;
            mesh.y[sIdx] -= 0.02;
          }
        }

        let brokenCount = 0;
        for (let c = 0; c < COLS; c++) {
          if (mesh.seamBroken[c] === 1) brokenCount++;
        }

        if (brokenCount > COLS * 0.55 && brokenCount < COLS) {
          for (let c = 0; c < COLS; c++) {
            mesh.seamBroken[c] = 1;
          }
          brokenCount = COLS;
        }

        if (brokenCount === COLS && !mesh.isTorn) {
          mesh.isTorn = true;
          mesh.dragActive = false;
          setIsTorn(true);
          setIsInteracting(false);

          for (let r = 24; r < BODY_ROWS; r++) {
            const rowFactor = (r - 23) / 4.0;
            for (let c = 0; c < COLS; c++) {
              const bIdx = r * COLS + c;
              mesh.y[bIdx] += 0.038 * rowFactor;
              mesh.oldY[bIdx] = mesh.y[bIdx] - 0.022 * rowFactor;
              mesh.z[bIdx] +=
                (Math.sin(c * 0.5) * 0.035 + 0.02) * rowFactor * curlSign;
            }
          }
        }
      }

      if (mesh.tearWaveActive && !mesh.isTorn) {
        const elapsed = (now - mesh.tearWaveStartTime) * 0.001;
        const waveDuration = 0.32;
        const progress = Math.min(1.0, elapsed / waveDuration);
        const targetCol = Math.floor(progress * COLS);

        for (let c = 0; c <= targetCol && c < COLS; c++) {
          if (mesh.seamBroken[c] === 0) {
            mesh.seamBroken[c] = 1;
            const sIdx = BODY_VERTS + c;
            mesh.z[sIdx] += 0.045 * curlSign;
            mesh.y[sIdx] -= 0.025;
          }
        }

        if (progress >= 1.0) {
          mesh.tearWaveActive = false;
          mesh.isTorn = true;
          setIsTorn(true);

          for (let r = 24; r < BODY_ROWS; r++) {
            const rowFactor = (r - 23) / 4.0;
            for (let c = 0; c < COLS; c++) {
              const bIdx = r * COLS + c;
              mesh.y[bIdx] += 0.038 * rowFactor;
              mesh.oldY[bIdx] = mesh.y[bIdx] - 0.022 * rowFactor;
              mesh.z[bIdx] +=
                (Math.sin(c * 0.5) * 0.035 + 0.02) * rowFactor * curlSign;
            }
          }
        }
      }

      const { i1, i2, restLen, stiffness, isCrossSeam, seamCol, count } =
        mesh.constraints;

      for (let it = 0; it < PBD_ITERATIONS; it++) {
        for (let c = 0; c < count; c++) {
          if (isCrossSeam[c] === 1 && mesh.seamBroken[seamCol[c]] === 1)
            continue;

          const a = i1[c];
          const b = i2[c];

          const dx = mesh.x[b] - mesh.x[a];
          const dy = mesh.y[b] - mesh.y[a];
          const dz = mesh.z[b] - mesh.z[a];

          let dist = Math.hypot(dx, dy, dz);
          if (dist < 1e-6) dist = 1e-6;

          const l = restLen[c];
          const diff = (dist - l) / dist;
          const stiff = stiffness[c];

          const corrX = dx * diff * 0.5 * stiff;
          const corrY = dy * diff * 0.5 * stiff;
          const corrZ = dz * diff * 0.5 * stiff;

          mesh.x[a] += corrX;
          mesh.y[a] += corrY;
          mesh.z[a] += corrZ;

          mesh.x[b] -= corrX;
          mesh.y[b] -= corrY;
          mesh.z[b] -= corrZ;
        }
      }

      const flipForce = (mesh.targetFlipAngle - mesh.flipAngle) * 125;
      mesh.flipVel = (mesh.flipVel + flipForce * dt) * Math.exp(-12.5 * dt);
      mesh.flipAngle += mesh.flipVel * dt;

      if (mesh.isTorn && mesh.stubAlpha > 0) {
        mesh.stubAlpha = Math.max(0, mesh.stubAlpha - 1.15 * dt);
      }

      computeNormals(mesh);

      let maxDisp = 0;
      let kinetic =
        Math.abs(mesh.flipVel) + Math.abs(mesh.targetFlipAngle - mesh.flipAngle);
      for (let i = 0; i < BODY_VERTS; i++) {
        const disp =
          Math.abs(mesh.x[i] - mesh.restX[i]) +
          Math.abs(mesh.y[i] - mesh.restY[i]) +
          Math.abs(mesh.z[i]);
        if (disp > maxDisp) maxDisp = disp;
        const vel =
          Math.abs(mesh.x[i] - mesh.oldX[i]) +
          Math.abs(mesh.y[i] - mesh.oldY[i]) +
          Math.abs(mesh.z[i] - mesh.oldZ[i]);
        kinetic += vel;
      }

      mesh.bendIntensity = Math.min(1.0, maxDisp * 3.5);
      setIsDragBent(maxDisp > 0.035);

      renderFrame();

      const stubActive = mesh.isTorn && mesh.stubAlpha > 0.01;
      const tearWaveRunning = mesh.tearWaveActive && !mesh.isTorn;
      if (
        mesh.dragActive ||
        mesh.hovering ||
        stubActive ||
        tearWaveRunning ||
        kinetic > 0.006
      ) {
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
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    });

    if (gl) {
      const program = createProgram(gl);
      if (program) {
        const mesh = meshRef.current;
        const posBuffer = gl.createBuffer();
        const normBuffer = gl.createBuffer();
        const uvBuffer = gl.createBuffer();
        const seamBuffer = gl.createBuffer();
        const bodyIdxBuffer = gl.createBuffer();
        const stubIdxBuffer = gl.createBuffer();
        const frontTex = gl.createTexture();
        const backTex = gl.createTexture();

        if (
          posBuffer &&
          normBuffer &&
          uvBuffer &&
          seamBuffer &&
          bodyIdxBuffer &&
          stubIdxBuffer &&
          frontTex &&
          backTex
        ) {
          gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, mesh.uv, gl.STATIC_DRAW);

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bodyIdxBuffer);
          gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            mesh.bodyIndices,
            gl.STATIC_DRAW
          );

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, stubIdxBuffer);
          gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            mesh.stubIndices,
            gl.STATIC_DRAW
          );

          gl.enable(gl.BLEND);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
          gl.enable(gl.DEPTH_TEST);
          gl.depthFunc(gl.LEQUAL);

          glStateRef.current = {
            gl,
            program,
            posBuffer,
            normBuffer,
            uvBuffer,
            seamBuffer,
            bodyIdxBuffer,
            stubIdxBuffer,
            frontTex,
            backTex,
            locs: {
              aPos: gl.getAttribLocation(program, 'aPos'),
              aNormal: gl.getAttribLocation(program, 'aNormal'),
              aUv: gl.getAttribLocation(program, 'aUv'),
              aSeamBroken: gl.getAttribLocation(program, 'aSeamBroken'),
              uFrontTex: gl.getUniformLocation(program, 'uFrontTex'),
              uBackTex: gl.getUniformLocation(program, 'uBackTex'),
              uFlipAngle: gl.getUniformLocation(program, 'uFlipAngle'),
              uTiltX: gl.getUniformLocation(program, 'uTiltX'),
              uTiltY: gl.getUniformLocation(program, 'uTiltY'),
              uAspect: gl.getUniformLocation(program, 'uAspect'),
              uFovScale: gl.getUniformLocation(program, 'uFovScale'),
              uIsShadow: gl.getUniformLocation(program, 'uIsShadow'),
              uIsStub: gl.getUniformLocation(program, 'uIsStub'),
              uEdition: gl.getUniformLocation(program, 'uEdition'),
              uPartAlpha: gl.getUniformLocation(program, 'uPartAlpha'),
              uHoloIntensity: gl.getUniformLocation(program, 'uHoloIntensity'),
              uPointer: gl.getUniformLocation(program, 'uPointer'),
              uBend: gl.getUniformLocation(program, 'uBend'),
            },
          };
        }
      }
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);
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
      if (
        activePointerIdRef.current === null ||
        e.pointerId === activePointerIdRef.current
      ) {
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
    if (shouldReduceMotion || (e.pointerType === 'mouse' && e.button !== 0))
      return;
    const mapped = mapPointerToNdc(e.clientX, e.clientY);
    const mesh = meshRef.current;
    activePointerIdRef.current = e.pointerId;
    mesh.dragActive = true;
    mesh.dragZone =
      mapped.v >= STUB_SPLIT_RATIO - 0.03 && !mesh.isTorn ? 'stub' : 'body';
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
      if (shouldReduceMotion) {
        for (let c = 0; c < COLS; c++) mesh.seamBroken[c] = 1;
        mesh.isTorn = true;
        mesh.stubAlpha = 0;
        setIsTorn(true);
        renderFrame();
      } else {
        mesh.tearWaveActive = true;
        mesh.tearWaveStartTime = performance.now();
        startLoop();
      }
      return;
    }

    mesh.isTorn = false;
    mesh.tearWaveActive = false;
    mesh.stubAlpha = 1.0;
    for (let c = 0; c < COLS; c++) {
      mesh.seamBroken[c] = 0;
    }

    for (let i = 0; i < TOTAL_VERTS; i++) {
      mesh.x[i] = mesh.restX[i];
      mesh.y[i] = mesh.restY[i];
      mesh.z[i] = 0;
      mesh.oldX[i] = mesh.x[i];
      mesh.oldY[i] = mesh.y[i];
      mesh.oldZ[i] = 0;
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
