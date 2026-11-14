import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { RefreshCw, Repeat2 } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';
import {
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

interface PendingTouch {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  timerId: number;
  zone: 'body' | 'stub';
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
  packedPos: Float32Array;
  packedNorm: Float32Array;
  packedSeam: Float32Array;
  seamBroken: Uint8Array;
  bodyIndices: Uint16Array;
  stubIndices: Uint16Array;
  constraints: ConstraintsData;
  dragActive: boolean;
  dragZone: 'body' | 'stub';
  tearStartSide: 'left' | 'right';
  maxTornCols: number;
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
    float fiber = (sin(u * 97.0) * 0.5 + sin(u * 211.0) * 0.35 + cos(u * 347.0) * 0.15) * 0.0025;
    return max(0.001, tooth + fiber);
  }

  void main() {
    vec4 tex = gl_FrontFacing
      ? texture2D(uFrontTex, vUv)
      : texture2D(uBackTex, vec2(1.0 - vUv.x, vUv.y));

    if (tex.a < 0.03) discard;

    float distToCut = 999.0;
    if (vSeamBroken > 0.45) {
      float edgeOffset = tornEdgeOffset(vUv.x);
      if (uIsStub < 0.5) {
        float cutY = 0.775 - edgeOffset;
        if (vUv.y > cutY) discard;
        if (vUv.y > 0.74) {
          distToCut = abs(vUv.y - cutY);
        }
      } else {
        float cutY = 0.775 + edgeOffset;
        if (vUv.y < cutY) discard;
        if (vUv.y < 0.81) {
          distToCut = abs(vUv.y - cutY);
        }
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
    float diffuse = clamp(0.80 + 0.20 * ndl, 0.44, 1.0);

    float normalTilt = 1.0 - abs(N.z);
    float curvature = clamp(length(N.xy) * 1.55, 0.0, 1.0);
    float creaseShadow = smoothstep(0.0, 0.65, curvature * max(0.0, -ndl + 0.18));
    diffuse -= creaseShadow * 0.28;

    float ndv = clamp(dot(N, V), 0.0, 1.0);
    float fresnel = pow(1.0 - ndv, 2.5);

    float specPower = mix(28.0, 68.0, curvature);
    float spec = pow(max(dot(N, H), 0.0), specPower);

    float foilPhase =
      vUv.x * 0.65 +
      vUv.y * 0.42 +
      atan(N.y, N.x) * 0.35 +
      normalTilt * 2.1 +
      uPointer.x * 0.34 +
      uPointer.y * 0.22;

    float bandPrimary = pow(max(0.0, sin(foilPhase * 7.5)), 4.0);
    float bandSecondary = pow(max(0.0, cos(foilPhase * 13.0 + 1.1)), 6.0);
    float foilBands = bandPrimary * 0.62 + bandSecondary * 0.85;

    float isHeader = smoothstep(0.095, 0.035, vUv.y);
    float artBoxX = step(0.315, vUv.x) * step(vUv.x, 0.685);
    float artBoxY = step(0.113, vUv.y) * step(vUv.y, 0.340);
    float artMask = gl_FrontFacing ? (artBoxX * artBoxY) : 0.0;
    float foilProtection = mix(1.0, 0.25, artMask);

    float tiltActivation = clamp(curvature * 1.05 + normalTilt * 1.45 + uBend * 0.90 + fresnel * 0.55, 0.0, 1.25);
    float headerActivation = isHeader * (0.24 + 0.76 * clamp(curvature * 1.6 + uBend * 1.1, 0.0, 1.0));
    float luma = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    float inkContrastKeep = mix(0.62, 1.0, smoothstep(0.08, 0.42, luma));
    float foilWeight = (foilBands * (tiltActivation * 0.24 + headerActivation * 0.19) + spec * (0.09 + 0.18 * tiltActivation + 0.14 * isHeader)) * foilProtection * inkContrastKeep;

    vec3 silverFoilColor = mix(vec3(0.95, 0.97, 1.00), vec3(0.84, 0.92, 1.00), bandSecondary);

    if (distToCut < 0.0050) {
      float fiberBlend = smoothstep(0.0050, 0.0005, distToCut);
      vec3 paperCore = vec3(0.95, 0.94, 0.91);
      tex.rgb = mix(tex.rgb, paperCore, fiberBlend);
      foilWeight *= (1.0 - fiberBlend);
    }

    vec3 lit = tex.rgb * diffuse;
    lit += silverFoilColor * foilWeight;

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
  const packedPos = new Float32Array(TOTAL_VERTS * 3);
  const packedNorm = new Float32Array(TOTAL_VERTS * 3);
  const packedSeam = new Float32Array(TOTAL_VERTS);
  const seamBroken = new Uint8Array(COLS);

  for (let r = 0; r < BODY_ROWS; r++) {
    const vNorm = r / (BODY_ROWS - 1);
    const v = vNorm * STUB_SPLIT_RATIO;
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
    const vNorm = r / (STUB_ROWS - 1);
    const v = STUB_SPLIT_RATIO + vNorm * (1.0 - STUB_SPLIT_RATIO);
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
    packedPos,
    packedNorm,
    packedSeam,
    seamBroken,
    bodyIndices,
    stubIndices,
    constraints,
    dragActive: false,
    dragZone: 'body',
    tearStartSide: 'left',
    maxTornCols: 0,
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
    uPartAlpha: WebGLUniformLocation | null;
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
  const slotRef = useRef<HTMLDivElement | null>(null);
  const bodyHitRef = useRef<HTMLDivElement | null>(null);
  const stubHitRef = useRef<HTMLDivElement | null>(null);
  const activeCaptureTargetRef = useRef<HTMLDivElement | null>(null);
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
  const activePointerTypeRef = useRef<string>('mouse');
  const pendingTouchRef = useRef<PendingTouch | null>(null);
  const dragBentRef = useRef<boolean>(false);

  const [edition, setEdition] = useState<FoilEdition>(() =>
    theme === 'dark' ? 'obsidian-gold' : 'silver-holo'
  );
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
    const detectTheme = () => {
      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        document.documentElement.classList.contains('dark') ||
        theme === 'dark';
      setEdition(isDark ? 'obsidian-gold' : 'silver-holo');
    };

    detectTheme();

    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    return () => observer.disconnect();
  }, [theme]);

  const syncCanvasSize = useCallback(() => {
    const slot = slotRef.current;
    const canvas = canvasRef.current;
    if (!slot || !canvas) return;

    const cw = canvas.clientWidth || slot.clientWidth;
    const ch = canvas.clientHeight || slot.clientHeight;
    if (cw < 2 || ch < 2) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(cw * dpr);
    const targetH = Math.round(ch * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
  }, []);

  const renderFrame = useCallback(() => {
    const glState = glStateRef.current;
    if (!glState) return;

    const { gl, locs } = glState;
    const canvas = canvasRef.current;
    const slot = slotRef.current;
    if (!canvas || !slot) return;

    const cw = canvas.clientWidth || slot.clientWidth;
    const ch = canvas.clientHeight || slot.clientHeight;
    if (cw < 2 || ch < 2) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(cw * dpr);
    const targetH = Math.round(ch * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (!inViewRef.current && !meshRef.current.dragActive) {
      return;
    }

    const mesh = meshRef.current;
    const uAspect = canvas.width / Math.max(1, canvas.height);
    const uFovScale = (2.0 / CARD_H) * 0.82;

    const { packedPos, packedNorm, packedSeam } = mesh;

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

    const tiltX = mesh.hovering && !mesh.dragActive ? mesh.hoverNdcY * 0.09 : 0;
    const tiltY = mesh.hovering && !mesh.dragActive ? -mesh.hoverNdcX * 0.09 : 0;

    gl.uniform1f(locs.uFlipAngle, mesh.flipAngle);
    gl.uniform1f(locs.uTiltX, tiltX);
    gl.uniform1f(locs.uTiltY, tiltY);
    gl.uniform1f(locs.uAspect, uAspect);
    gl.uniform1f(locs.uFovScale, uFovScale);
    gl.uniform2f(locs.uPointer, mesh.hoverNdcX, mesh.hoverNdcY);
    gl.uniform1f(locs.uBend, mesh.bendIntensity);

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

      const damping = mesh.dragActive ? 0.80 : 0.65;
      const cosFlip = Math.cos(mesh.flipAngle);
      const curlSign = cosFlip >= 0 ? 1 : -1;
      const {
        x,
        y,
        z,
        oldX,
        oldY,
        oldZ,
        restX,
        restY,
        uv,
        seamBroken,
      } = mesh;
      const { i1, i2, restLen, stiffness, isCrossSeam, seamCol, count } =
        mesh.constraints;

      for (let i = 0; i < TOTAL_VERTS; i++) {
        const isStub = i >= BODY_VERTS;
        const col = i % COLS;

        if (mesh.isTorn && isStub) {
          const minY = restY[i] - 0.115;
          if (y[i] > minY) {
            const tiltOffset = (col / (COLS - 1) - 0.5) * 0.00025;
            const flutter = Math.sin(now * 0.008 + col * 0.45) * 0.00045;
            const vx = (x[i] - oldX[i]) * 0.85 + tiltOffset;
            const vy = (y[i] - oldY[i]) * 0.85 - 0.0009;
            const vz = (z[i] - oldZ[i]) * 0.85 + flutter;

            oldX[i] = x[i];
            oldY[i] = y[i];
            oldZ[i] = z[i];

            x[i] += vx;
            y[i] = Math.max(minY, y[i] + vy);
            z[i] += vz;
          }
        } else if (!mesh.dragActive) {
          const tx = restX[i];
          const ty = restY[i];

          x[i] += (tx - x[i]) * 0.16;
          y[i] += (ty - y[i]) * 0.16;
          z[i] += (0 - z[i]) * 0.18;

          oldX[i] = x[i] - (x[i] - oldX[i]) * 0.4;
          oldY[i] = y[i] - (y[i] - oldY[i]) * 0.4;
          oldZ[i] = z[i] - (z[i] - oldZ[i]) * 0.4;
        } else {
          let vx = (x[i] - oldX[i]) * damping;
          let vy = (y[i] - oldY[i]) * damping;
          let vz = (z[i] - oldZ[i]) * damping;

          const u = uv[i * 2];
          const v = uv[i * 2 + 1];
          const distFromGrab = Math.hypot(u - mesh.grabU, v - mesh.grabV);
          const spring = Math.min(0.045, 0.005 + distFromGrab * 0.035);

          vx += (restX[i] - x[i]) * spring;
          vy += (restY[i] - y[i]) * spring;
          vz += (0 - z[i]) * spring;

          oldX[i] = x[i];
          oldY[i] = y[i];
          oldZ[i] = z[i];

          x[i] += vx;
          y[i] += vy;
          z[i] += vz;
        }
      }

      if (mesh.dragActive) {
        const deltaScreenX =
          (mesh.curScreenX - mesh.startScreenX) * Math.cos(mesh.flipAngle);
        const deltaScreenY = mesh.curScreenY - mesh.startScreenY;
        const dragDist = Math.hypot(deltaScreenX, deltaScreenY);

        if (dragDist > 1e-4) {
          const pullX = Math.max(-0.11, Math.min(0.11, deltaScreenX * HALF_W * 0.36));
          const pullY = Math.max(-0.14, Math.min(0.12, deltaScreenY * HALF_H * 0.36));
          const effectiveDrag = Math.min(1.15, dragDist);

          for (let i = 0; i < TOTAL_VERTS; i++) {
            const isStub = i >= BODY_VERTS;
            if (mesh.isTorn && isStub) continue;

            const u = uv[i * 2];
            const v = uv[i * 2 + 1];
            const du = u - mesh.grabU;
            const dv = v - mesh.grabV;
            const dist = Math.hypot(du, dv * (PASS_HEIGHT / PASS_WIDTH));

            const peelWeight = Math.exp(-dist * 2.2);

            if (peelWeight > 0.005) {
              const curlZ =
                (effectiveDrag * 0.24 +
                  Math.sin(Math.min(Math.PI, dist * 3.2)) *
                    0.13 *
                    Math.min(1.0, effectiveDrag * 1.45)) *
                peelWeight *
                curlSign;

              const grabStrength = 0.48 * peelWeight;
              x[i] += (restX[i] + pullX - x[i]) * grabStrength;
              y[i] += (restY[i] + pullY - y[i]) * grabStrength;
              z[i] += (curlZ - z[i]) * grabStrength;
            }
          }
        }
      }

      if (mesh.dragActive && mesh.dragZone === 'stub' && !mesh.isTorn) {
        const deltaX =
          (mesh.curScreenX - mesh.startScreenX) * Math.cos(mesh.flipAngle);
        const deltaY = mesh.startScreenY - mesh.curScreenY;
        const pullDistance = Math.hypot(deltaX * 0.8, Math.max(0, deltaY));

        const TEAR_START_DEADZONE = 0.035;
        const FULL_TEAR_DRAG_DISTANCE = 0.38;

        const rawProgress = Math.max(
          0,
          (pullDistance - TEAR_START_DEADZONE) / FULL_TEAR_DRAG_DISTANCE
        );
        const targetTornCols = Math.min(COLS, Math.floor(rawProgress * COLS));
        mesh.maxTornCols = Math.max(mesh.maxTornCols, targetTornCols);

        if (mesh.tearStartSide === 'left') {
          for (let c = 0; c < COLS; c++) {
            seamBroken[c] = c < mesh.maxTornCols ? 1 : 0;
          }
        } else {
          for (let c = 0; c < COLS; c++) {
            const colFromRight = COLS - 1 - c;
            seamBroken[c] = colFromRight < mesh.maxTornCols ? 1 : 0;
          }
        }

        if (mesh.maxTornCols >= COLS && !mesh.isTorn) {
          mesh.isTorn = true;
          mesh.dragActive = false;
          setIsTorn(true);
          setIsInteracting(false);

          for (let r = 24; r < BODY_ROWS; r++) {
            const rowFactor = (r - 23) / 4.0;
            for (let c = 0; c < COLS; c++) {
              const bIdx = r * COLS + c;
              y[bIdx] += 0.005 * rowFactor;
              oldY[bIdx] = y[bIdx] - 0.002 * rowFactor;
              z[bIdx] +=
                (Math.sin(c * 0.5) * 0.005 + 0.003) * rowFactor * curlSign;
            }
          }
        }
      }

      const iterations =
        mesh.dragActive || mesh.bendIntensity > 0.12 ? PBD_ITERATIONS : 8;

      for (let it = 0; it < iterations; it++) {
        for (let c = 0; c < count; c++) {
          if (isCrossSeam[c] === 1 && seamBroken[seamCol[c]] === 1) continue;

          const a = i1[c];
          const b = i2[c];

          const dx = x[b] - x[a];
          const dy = y[b] - y[a];
          const dz = z[b] - z[a];

          let dist = Math.hypot(dx, dy, dz);
          if (dist < 1e-6) dist = 1e-6;

          const l = restLen[c];
          const diff = (dist - l) / dist;
          const stiff = stiffness[c];

          const corrX = dx * diff * 0.5 * stiff;
          const corrY = dy * diff * 0.5 * stiff;
          const corrZ = dz * diff * 0.5 * stiff;

          x[a] += corrX;
          y[a] += corrY;
          z[a] += corrZ;

          x[b] -= corrX;
          y[b] -= corrY;
          z[b] -= corrZ;
        }
      }

      const flipForce = (mesh.targetFlipAngle - mesh.flipAngle) * 125;
      mesh.flipVel = (mesh.flipVel + flipForce * dt) * Math.exp(-12.5 * dt);
      mesh.flipAngle += mesh.flipVel * dt;

      if (mesh.isTorn && mesh.stubAlpha > 0) {
        mesh.stubAlpha = Math.max(0, mesh.stubAlpha - 2.2 * dt);
      }

      computeNormals(mesh);

      let maxDisp = 0;
      let kinetic =
        Math.abs(mesh.flipVel) + Math.abs(mesh.targetFlipAngle - mesh.flipAngle);
      for (let i = 0; i < BODY_VERTS; i++) {
        const disp =
          Math.abs(x[i] - restX[i]) +
          Math.abs(y[i] - restY[i]) +
          Math.abs(z[i]);
        if (disp > maxDisp) maxDisp = disp;
        const vel =
          Math.abs(x[i] - oldX[i]) +
          Math.abs(y[i] - oldY[i]) +
          Math.abs(z[i]);
        kinetic += vel;
      }

      mesh.bendIntensity = Math.min(1.0, maxDisp * 3.8);
      const nextBent = maxDisp > 0.028;
      if (dragBentRef.current !== nextBent) {
        dragBentRef.current = nextBent;
        setIsDragBent(nextBent);
      }

      renderFrame();

      const stubActive = mesh.isTorn && mesh.stubAlpha > 0.01;
      if (mesh.dragActive || mesh.hovering || stubActive || kinetic > 0.003) {
        rafRef.current = requestAnimationFrame(stepPhysicsAndRender);
      } else {
        mesh.flipAngle = mesh.targetFlipAngle;
        mesh.bendIntensity = 0;
        if (dragBentRef.current) {
          dragBentRef.current = false;
          setIsDragBent(false);
        }
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

  const syncTexturesRef = useRef(syncTextures);
  syncTexturesRef.current = syncTextures;

  useEffect(() => {
    frontTexCanvasRef.current = document.createElement('canvas');
    backTexCanvasRef.current = document.createElement('canvas');

    let mounted = true;

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
              uPartAlpha: gl.getUniformLocation(program, 'uPartAlpha'),
              uPointer: gl.getUniformLocation(program, 'uPointer'),
              uBend: gl.getUniformLocation(program, 'uBend'),
            },
          };
        }
      }
    }

    syncCanvasSize();
    if (document.fonts && document.fonts.status !== 'loaded') {
      document.fonts.ready.then(() => {
        if (mounted) syncTexturesRef.current();
      });
    }

    return () => {
      mounted = false;
      if (pendingTouchRef.current !== null) {
        window.clearTimeout(pendingTouchRef.current.timerId);
        pendingTouchRef.current = null;
      }
      stopLoop();
      const currentGlState = glStateRef.current;
      if (currentGlState) {
        const ctx = currentGlState.gl;
        ctx.deleteBuffer(currentGlState.posBuffer);
        ctx.deleteBuffer(currentGlState.normBuffer);
        ctx.deleteBuffer(currentGlState.uvBuffer);
        ctx.deleteBuffer(currentGlState.seamBuffer);
        ctx.deleteBuffer(currentGlState.bodyIdxBuffer);
        ctx.deleteBuffer(currentGlState.stubIdxBuffer);
        ctx.deleteTexture(currentGlState.frontTex);
        ctx.deleteTexture(currentGlState.backTex);
        ctx.deleteProgram(currentGlState.program);
        glStateRef.current = null;
      }
    };
  }, [stopLoop, syncCanvasSize]);

  useEffect(() => {
    syncTextures();
  }, [syncTextures]);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    const handleResize = () => {
      syncCanvasSize();
      renderFrame();
    };

    handleResize();

    const ro = new ResizeObserver(handleResize);
    ro.observe(slot);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [renderFrame, syncCanvasSize]);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        inViewRef.current = visible;
        if (visible) {
          syncCanvasSize();
          renderFrame();
          const mesh = meshRef.current;
          if (
            mesh.dragActive ||
            mesh.hovering ||
            (mesh.isTorn && mesh.stubAlpha > 0.01) ||
            Math.abs(mesh.targetFlipAngle - mesh.flipAngle) > 0.001
          ) {
            startLoop();
          }
        } else {
          stopLoop();
        }
      },
      { rootMargin: '120px' }
    );
    io.observe(slot);

    return () => {
      io.disconnect();
    };
  }, [renderFrame, startLoop, stopLoop, syncCanvasSize]);

  const mapPointerToNdc = useCallback((clientX: number, clientY: number) => {
    const slot = slotRef.current;
    if (!slot) return { ndcX: 0, ndcY: 0, u: 0.5, v: 0.5 };
    const rect = slot.getBoundingClientRect();
    const scale = 0.82;
    const cardH = Math.max(1, rect.height * scale);
    const cardW = Math.max(1, cardH * (PASS_WIDTH / PASS_HEIGHT));
    const cx = rect.left + rect.width * 0.5;
    const cy = rect.top + rect.height * 0.5;
    const ndcX = (clientX - cx) / (cardW * 0.5);
    const ndcY = (cy - clientY) / (cardH * 0.5);

    const mesh = meshRef.current;
    const cosFlip = Math.cos(mesh.flipAngle);
    const localNdcX = Math.abs(cosFlip) > 0.2 ? ndcX / cosFlip : ndcX;
    const u = Math.max(0, Math.min(1, (localNdcX + 1) * 0.5));
    const v = Math.max(0, Math.min(1, (1 - ndcY) * 0.5));

    return {
      ndcX,
      ndcY,
      u,
      v,
    };
  }, []);

  const clearPendingTouch = useCallback(() => {
    if (pendingTouchRef.current !== null) {
      window.clearTimeout(pendingTouchRef.current.timerId);
      pendingTouchRef.current = null;
    }
  }, []);

  const activatePassDrag = useCallback(
    (
      pointerId: number,
      pointerType: string,
      clientX: number,
      clientY: number,
      forcedZone?: 'body' | 'stub',
      captureTarget?: HTMLDivElement | null
    ) => {
      clearPendingTouch();
      const mapped = mapPointerToNdc(clientX, clientY);
      const mesh = meshRef.current;
      activePointerIdRef.current = pointerId;
      activePointerTypeRef.current = pointerType;
      activeCaptureTargetRef.current = captureTarget || null;
      mesh.dragActive = true;
      mesh.dragZone =
        forcedZone === 'stub' && !mesh.isTorn
          ? 'stub'
          : mapped.v >= STUB_SPLIT_RATIO - 0.03 && !mesh.isTorn
            ? 'stub'
            : 'body';
      mesh.tearStartSide = mapped.u <= 0.5 ? 'left' : 'right';
      mesh.grabU = mapped.u;
      mesh.grabV = mapped.v;
      mesh.startScreenX = mapped.ndcX;
      mesh.startScreenY = mapped.ndcY;
      mesh.curScreenX = mapped.ndcX;
      mesh.curScreenY = mapped.ndcY;
      mesh.hoverNdcX = mapped.ndcX;
      mesh.hoverNdcY = mapped.ndcY;
      try {
        captureTarget?.setPointerCapture(pointerId);
      } catch {
        activePointerIdRef.current = pointerId;
      }
      setIsInteracting(true);
      startLoop();
    },
    [clearPendingTouch, mapPointerToNdc, startLoop]
  );

  const releaseDrag = useCallback(() => {
    clearPendingTouch();
    const mesh = meshRef.current;
    if (activePointerTypeRef.current !== 'mouse') {
      mesh.hovering = false;
      mesh.hoverNdcX = 0;
      mesh.hoverNdcY = 0;
    }
    if (activePointerIdRef.current !== null) {
      try {
        activeCaptureTargetRef.current?.releasePointerCapture(
          activePointerIdRef.current
        );
      } catch {
        activeCaptureTargetRef.current = null;
      }
    }
    activeCaptureTargetRef.current = null;
    if (!mesh.dragActive) return;
    mesh.dragActive = false;
    activePointerIdRef.current = null;
    setIsInteracting(false);
    startLoop();
  }, [clearPendingTouch, startLoop]);

  useEffect(() => {
    if (!isInteracting) return;

    const onWinMove = (e: PointerEvent) => {
      if (
        activePointerIdRef.current !== null &&
        e.pointerId !== activePointerIdRef.current
      ) {
        return;
      }
      const mapped = mapPointerToNdc(e.clientX, e.clientY);
      const mesh = meshRef.current;
      mesh.hoverNdcX = mapped.ndcX;
      mesh.hoverNdcY = mapped.ndcY;
      if (mesh.dragActive) {
        mesh.curScreenX = mapped.ndcX;
        mesh.curScreenY = mapped.ndcY;
      }
      startLoop();
    };

    const onWinEnd = (e: PointerEvent) => {
      if (
        activePointerIdRef.current === null ||
        e.pointerId === activePointerIdRef.current
      ) {
        releaseDrag();
      }
    };

    window.addEventListener('pointermove', onWinMove);
    window.addEventListener('pointerup', onWinEnd);
    window.addEventListener('pointercancel', onWinEnd);
    return () => {
      window.removeEventListener('pointermove', onWinMove);
      window.removeEventListener('pointerup', onWinEnd);
      window.removeEventListener('pointercancel', onWinEnd);
    };
  }, [isInteracting, mapPointerToNdc, releaseDrag, startLoop]);

  const handleBodyPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || (e.pointerType === 'mouse' && e.button !== 0)) {
      return;
    }

    if (e.pointerType === 'mouse') {
      activatePassDrag(
        e.pointerId,
        e.pointerType,
        e.clientX,
        e.clientY,
        undefined,
        bodyHitRef.current
      );
      return;
    }

    clearPendingTouch();
    activePointerTypeRef.current = e.pointerType;
    const mapped = mapPointerToNdc(e.clientX, e.clientY);
    const mesh = meshRef.current;
    const zone: 'body' | 'stub' =
      mapped.v >= STUB_SPLIT_RATIO - 0.03 && !mesh.isTorn ? 'stub' : 'body';
    const pointerId = e.pointerId;
    const pointerType = e.pointerType;
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const holdDelay = 130;

    const timerId = window.setTimeout(() => {
      const pending = pendingTouchRef.current;
      if (!pending || pending.pointerId !== pointerId) return;
      activatePassDrag(
        pointerId,
        pointerType,
        startClientX,
        startClientY,
        zone,
        bodyHitRef.current
      );
    }, holdDelay);

    pendingTouchRef.current = {
      pointerId,
      startClientX,
      startClientY,
      timerId,
      zone,
    };
  };

  const handleStubPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || (e.pointerType === 'mouse' && e.button !== 0)) {
      return;
    }
    activatePassDrag(
      e.pointerId,
      e.pointerType,
      e.clientX,
      e.clientY,
      meshRef.current.isTorn ? 'body' : 'stub',
      stubHitRef.current
    );
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || meshRef.current.dragActive) return;

    const pending = pendingTouchRef.current;
    if (pending && e.pointerId === pending.pointerId) {
      const dx = e.clientX - pending.startClientX;
      const dy = e.clientY - pending.startClientY;
      const dist = Math.hypot(dx, dy);

      if (dist > 8 && Math.abs(dy) > Math.abs(dx) * 1.15) {
        clearPendingTouch();
        return;
      }

      if (dist > 10 && Math.abs(dx) >= Math.abs(dy) * 0.7) {
        activatePassDrag(
          e.pointerId,
          e.pointerType,
          pending.startClientX,
          pending.startClientY,
          pending.zone,
          bodyHitRef.current
        );
        const mapped = mapPointerToNdc(e.clientX, e.clientY);
        meshRef.current.curScreenX = mapped.ndcX;
        meshRef.current.curScreenY = mapped.ndcY;
      }
      return;
    }

    if (e.pointerType !== 'mouse') return;

    const mapped = mapPointerToNdc(e.clientX, e.clientY);
    const mesh = meshRef.current;
    mesh.hoverNdcX = Math.max(-1.2, Math.min(1.2, mapped.ndcX));
    mesh.hoverNdcY = Math.max(-1.2, Math.min(1.2, mapped.ndcY));
    mesh.hovering = true;
    startLoop();
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const mesh = meshRef.current;
    mesh.hovering = false;
    if (e.pointerType !== 'mouse') {
      clearPendingTouch();
    }
    if (e.pointerType !== 'mouse' || !mesh.dragActive) {
      mesh.hoverNdcX = 0;
      mesh.hoverNdcY = 0;
      startLoop();
    }
  };

  const handlePendingPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      pendingTouchRef.current !== null &&
      e.pointerId === pendingTouchRef.current.pointerId
    ) {
      clearPendingTouch();
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

  const handleRestore = () => {
    clearPendingTouch();
    const mesh = meshRef.current;
    mesh.isTorn = false;
    mesh.maxTornCols = 0;
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

  return (
    <div
      ref={stageRef}
      data-flipped={isFlipped ? 'true' : 'false'}
      data-torn={isTorn ? 'true' : 'false'}
      data-edition={edition}
      data-interacting={isInteracting ? 'true' : 'false'}
      data-drag-bent={isDragBent ? 'true' : 'false'}
      className="about-foil-stage relative mx-auto flex w-full max-w-[360px] flex-col items-center gap-3.5 lg:mx-0"
    >
      <div
        ref={slotRef}
        className="relative z-10 aspect-[360/560] w-full overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="about-foil-canvas pointer-events-none absolute inset-0 block h-full w-full"
        />

        <div
          ref={bodyHitRef}
          onPointerDown={handleBodyPointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePendingPointerEnd}
          onPointerCancel={handlePendingPointerEnd}
          onPointerLeave={handlePointerLeave}
          aria-label={
            locale === 'vi'
              ? 'Vé định danh Hologram tương tác của Long Hoàng, có thể kéo uốn cong và lật hai mặt'
              : 'Interactive holographic creator pass for Long Hoàng with 3D bending and two-sided flip'
          }
          role="region"
          className="pointer-events-auto absolute inset-x-0 top-0 z-10 h-[77.5%] cursor-grab touch-pan-y active:cursor-grabbing"
        />

        <div
          ref={stubHitRef}
          onPointerDown={handleStubPointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePendingPointerEnd}
          onPointerCancel={handlePendingPointerEnd}
          onPointerLeave={handlePointerLeave}
          aria-label={
            locale === 'vi'
              ? 'Cuống vé định danh có thể kéo xuống để xé theo đường răng cưa'
              : 'Tearable ticket stub region along the perforated edge'
          }
          className="pointer-events-auto absolute inset-x-0 bottom-0 z-10 h-[22.5%] cursor-grab touch-none active:cursor-grabbing"
        />

        <img
          src={PROFILE_DATA.avatarUrl}
          alt={labels.portraitAlt}
          className="sr-only"
        />
      </div>

      <p className="relative z-20 text-center font-mono text-[11px] text-folio-faint">
        {locale === 'vi'
          ? 'Kéo trên vé để uốn nếp · Nắm cuống dưới để xé'
          : 'Drag pass to bend foil · Pull bottom stub to tear'}
      </p>

      <div className="relative z-20 flex w-full flex-wrap items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={handleFlip}
          className="folio-btn-compact min-h-[44px] min-w-[44px]"
        >
          <span className="google-pill-aura" aria-hidden="true" />
          <Repeat2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{locale === 'vi' ? 'Lật mặt vé' : 'Flip Pass'}</span>
        </button>

        <button
          type="button"
          onClick={handleRestore}
          className="folio-btn-compact min-h-[44px] min-w-[44px]"
        >
          <span className="google-pill-aura" aria-hidden="true" />
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{locale === 'vi' ? 'Khôi phục vé' : 'Restore Pass'}</span>
        </button>
      </div>
    </div>
  );
};
