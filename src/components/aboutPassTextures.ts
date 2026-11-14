import { Locale, PROFILE_DATA } from '../data/profile';

export type FoilEdition = 'silver-holo' | 'obsidian-gold' | 'google-prism';

export interface EditionStyle {
  id: FoilEdition;
  code: string;
  label: { vi: string; en: string };
  cardBgTop: string;
  cardBgBottom: string;
  cardBorder: string;
  inkPrimary: string;
  inkSecondary: string;
  inkFaint: string;
  cellBg: string;
  cellBorder: string;
  foilStripInk: string;
  foilStripBg: string;
  blueprintGrid: string;
  blueprintAccent: string;
  sealBg: string;
  sealStroke: string;
  qrColor: string;
  holoIntensity: number;
  baseWarmTint: [number, number, number];
}

export const PASS_WIDTH = 640;
export const PASS_HEIGHT = 1040;
export const PASS_TEX_SCALE = 2;
export const STUB_SPLIT_RATIO = 0.775;

function fadeSmooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function hashGrid2(ix: number, iy: number, period: number): number {
  const wx = ((ix % period) + period) % period;
  const wy = ((iy % period) + period) % period;
  let h = (wx * 374761393 + wy * 668265263) | 0;
  h = ((h ^ (h >> 13)) * 1274126177) | 0;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}

function tileValueNoise(u: number, v: number, freq: number): number {
  const x = u * freq;
  const y = v * freq;
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = fadeSmooth(x - ix);
  const fy = fadeSmooth(y - iy);
  const v00 = hashGrid2(ix, iy, freq);
  const v10 = hashGrid2(ix + 1, iy, freq);
  const v01 = hashGrid2(ix, iy + 1, freq);
  const v11 = hashGrid2(ix + 1, iy + 1, freq);
  const vx0 = v00 + (v10 - v00) * fx;
  const vx1 = v01 + (v11 - v01) * fx;
  return vx0 + (vx1 - vx0) * fy;
}

export function createFoilSilkTexture(size = 1024): HTMLCanvasElement {
  const baseSize = 256;
  const lowCanvas = document.createElement('canvas');
  lowCanvas.width = baseSize;
  lowCanvas.height = baseSize;
  const lowCtx = lowCanvas.getContext('2d');

  const texCanvas = document.createElement('canvas');
  texCanvas.width = size;
  texCanvas.height = size;
  const ctx = texCanvas.getContext('2d');
  if (!lowCtx || !ctx) return texCanvas;

  const img = lowCtx.createImageData(baseSize, baseSize);
  const data = img.data;
  const twoPi = Math.PI * 2;

  for (let y = 0; y < baseSize; y++) {
    const v = y / baseSize;
    for (let x = 0; x < baseSize; x++) {
      const u = x / baseSize;
      const diagA = u + v;
      const diagB = u - v;

      const waveRibbon =
        0.5 +
        0.30 * Math.sin(twoPi * diagA * 2.0 + Math.cos(twoPi * diagB) * 0.65) +
        0.20 * Math.cos(twoPi * diagA * 3.0 - Math.sin(twoPi * v) * 0.45);

      const nLow = tileValueNoise(u, v, 4);
      const nMid = tileValueNoise(u, v, 8);
      const smoothSilk = Math.max(0, Math.min(1, nLow * 0.68 + nMid * 0.32));

      const satinFlow =
        0.5 +
        0.32 * Math.sin(twoPi * (diagA + smoothSilk * 0.25)) +
        0.18 * Math.cos(twoPi * (diagB * 2.0 + smoothSilk * 0.18));

      const idx = (y * baseSize + x) * 4;
      data[idx] = Math.round(Math.max(0, Math.min(255, waveRibbon * 255)));
      data[idx + 1] = Math.round(Math.max(0, Math.min(255, satinFlow * 255)));
      data[idx + 2] = Math.round(Math.max(0, Math.min(255, smoothSilk * 255)));
      data[idx + 3] = 255;
    }
  }

  lowCtx.putImageData(img, 0, 0);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(lowCanvas, 0, 0, size, size);

  return texCanvas;
}

export const EDITION_STYLES: Record<FoilEdition, EditionStyle> = {
  'silver-holo': {
    id: 'silver-holo',
    code: '01',
    label: { vi: 'Silver Holo', en: 'Silver Holo' },
    cardBgTop: '#FAFBFD',
    cardBgBottom: '#EDF1F7',
    cardBorder: 'rgba(17, 17, 17, 0.24)',
    inkPrimary: '#111111',
    inkSecondary: '#3A3F48',
    inkFaint: '#4D535E',
    cellBg: 'rgba(255, 255, 255, 0.84)',
    cellBorder: 'rgba(17, 17, 17, 0.16)',
    foilStripInk: '#111111',
    foilStripBg: 'rgba(17, 17, 17, 0.055)',
    blueprintGrid: 'rgba(17, 17, 17, 0.065)',
    blueprintAccent: 'rgba(17, 17, 17, 0.34)',
    sealBg: '#F1F4F9',
    sealStroke: '#111111',
    qrColor: '#111111',
    holoIntensity: 0.1,
    baseWarmTint: [0.98, 0.99, 1.0],
  },
  'obsidian-gold': {
    id: 'obsidian-gold',
    code: '02',
    label: { vi: 'Obsidian Gold', en: 'Obsidian Gold' },
    cardBgTop: '#181A1F',
    cardBgBottom: '#101216',
    cardBorder: 'rgba(245, 245, 247, 0.24)',
    inkPrimary: '#F5F5F7',
    inkSecondary: '#C8CCD4',
    inkFaint: '#9CA3AF',
    cellBg: 'rgba(28, 31, 38, 0.88)',
    cellBorder: 'rgba(245, 245, 247, 0.16)',
    foilStripInk: '#F5F5F7',
    foilStripBg: 'rgba(245, 245, 247, 0.075)',
    blueprintGrid: 'rgba(245, 245, 247, 0.06)',
    blueprintAccent: 'rgba(245, 245, 247, 0.36)',
    sealBg: '#1D2028',
    sealStroke: '#F5F5F7',
    qrColor: '#F5F5F7',
    holoIntensity: 0.1,
    baseWarmTint: [0.95, 0.96, 0.98],
  },
  'google-prism': {
    id: 'google-prism',
    code: '03',
    label: { vi: 'Google Prism', en: 'Google Prism' },
    cardBgTop: '#FAFBFD',
    cardBgBottom: '#EDF1F7',
    cardBorder: 'rgba(17, 17, 17, 0.24)',
    inkPrimary: '#111111',
    inkSecondary: '#3A3F48',
    inkFaint: '#4D535E',
    cellBg: 'rgba(255, 255, 255, 0.84)',
    cellBorder: 'rgba(17, 17, 17, 0.16)',
    foilStripInk: '#111111',
    foilStripBg: 'rgba(17, 17, 17, 0.055)',
    blueprintGrid: 'rgba(17, 17, 17, 0.065)',
    blueprintAccent: 'rgba(17, 17, 17, 0.34)',
    sealBg: '#F1F4F9',
    sealStroke: '#111111',
    qrColor: '#111111',
    holoIntensity: 0.1,
    baseWarmTint: [0.98, 0.99, 1.0],
  },
};

export const FOIL_EDITIONS_ORDER: FoilEdition[] = [
  'silver-holo',
  'obsidian-gold',
  'google-prism',
];

function resolveEditionPalette(
  edition: FoilEdition,
  theme: 'light' | 'dark'
): EditionStyle {
  if (theme === 'dark') {
    return EDITION_STYLES['obsidian-gold'];
  }
  if (edition === 'obsidian-gold') {
    return EDITION_STYLES['obsidian-gold'];
  }
  return EDITION_STYLES['silver-holo'];
}

function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function clipTicketSilhouette(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const r = 28;
  const sideNotchR = 16;
  const endNotchR = 18;
  const splitY = h * STUB_SPLIT_RATIO;

  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(w * 0.5 - endNotchR, 0);
  ctx.arc(w * 0.5, 0, endNotchR, Math.PI, 0, true);
  ctx.lineTo(w - r, 0);
  ctx.quadraticCurveTo(w, 0, w, r);
  ctx.lineTo(w, splitY - sideNotchR);
  ctx.arc(w, splitY, sideNotchR, -Math.PI * 0.5, Math.PI * 0.5, true);
  ctx.lineTo(w, h - r);
  ctx.quadraticCurveTo(w, h, w - r, h);
  ctx.lineTo(w * 0.5 + endNotchR, h);
  ctx.arc(w * 0.5, h, endNotchR, 0, Math.PI, true);
  ctx.lineTo(r, h);
  ctx.quadraticCurveTo(0, h, 0, h - r);
  ctx.lineTo(0, splitY + sideNotchR);
  ctx.arc(0, splitY, sideNotchR, Math.PI * 0.5, -Math.PI * 0.5, true);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
}

function paintCardSubstrate(
  ctx: CanvasRenderingContext2D,
  palette: EditionStyle,
  w: number,
  h: number
) {
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, palette.cardBgTop);
  grad.addColorStop(0.52, palette.cardBgTop);
  grad.addColorStop(1, palette.cardBgBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  const ribbonGlow = ctx.createLinearGradient(0, h * 0.12, w, h * 0.88);
  if (palette.id === 'obsidian-gold') {
    ribbonGlow.addColorStop(0, 'rgba(255, 255, 255, 0.030)');
    ribbonGlow.addColorStop(0.48, 'rgba(255, 255, 255, 0.006)');
    ribbonGlow.addColorStop(1, 'rgba(255, 255, 255, 0.022)');
  } else {
    ribbonGlow.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
    ribbonGlow.addColorStop(0.5, 'rgba(244, 247, 252, 0.20)');
    ribbonGlow.addColorStop(1, 'rgba(218, 226, 238, 0.16)');
  }
  ctx.fillStyle = ribbonGlow;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

function paintFoilBand(
  ctx: CanvasRenderingContext2D,
  palette: EditionStyle,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  drawRoundedRectPath(ctx, x, y, w, h, 10);
  ctx.clip();

  ctx.fillStyle = palette.foilStripBg;
  ctx.fillRect(x, y, w, h);

  const bandSheen = ctx.createLinearGradient(x, y, x + w, y + h);
  if (palette.id === 'obsidian-gold') {
    bandSheen.addColorStop(0, 'rgba(255, 255, 255, 0.09)');
    bandSheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
    bandSheen.addColorStop(1, 'rgba(255, 255, 255, 0.07)');
  } else {
    bandSheen.addColorStop(0, 'rgba(17, 17, 17, 0.035)');
    bandSheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.55)');
    bandSheen.addColorStop(1, 'rgba(17, 17, 17, 0.045)');
  }
  ctx.fillStyle = bandSheen;
  ctx.fillRect(x, y, w, h);
  ctx.restore();

  ctx.save();
  drawRoundedRectPath(ctx, x, y, w, h, 10);
  ctx.strokeStyle = palette.cardBorder;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

function paintPerforationLine(
  ctx: CanvasRenderingContext2D,
  palette: EditionStyle,
  w: number,
  splitY: number
) {
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  for (let px = 30; px <= w - 30; px += 18) {
    ctx.beginPath();
    ctx.arc(px, splitY, 3.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = palette.cellBorder;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([7, 11]);
  ctx.beginPath();
  ctx.moveTo(26, splitY);
  ctx.lineTo(w - 26, splitY);
  ctx.stroke();
  ctx.restore();
}

function paintDeterministicQR(
  ctx: CanvasRenderingContext2D,
  color: string,
  cellBg: string,
  border: string,
  x: number,
  y: number,
  size: number
) {
  ctx.save();
  drawRoundedRectPath(ctx, x, y, size, size, 10);
  ctx.fillStyle = cellBg;
  ctx.fill();
  ctx.strokeStyle = border;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const modules = 11;
  const pad = 14;
  const modSize = (size - pad * 2) / modules;
  ctx.fillStyle = color;

  const isFinder = (r: number, c: number) =>
    (r < 3 && c < 3) || (r < 3 && c >= modules - 3) || (r >= modules - 3 && c < 3);

  let seed = 200702;
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const inFinder = isFinder(r, c);
      const finderFilled =
        inFinder &&
        !((r === 1 && c === 1) || (r === 1 && c === modules - 2) || (r === modules - 2 && c === 1));
      const filled = inFinder ? finderFilled : (seed & 3) !== 0;
      if (filled) {
        ctx.fillRect(
          x + pad + c * modSize + 0.6,
          y + pad + r * modSize + 0.6,
          modSize - 1.2,
          modSize - 1.2
        );
      }
    }
  }
  ctx.restore();
}

function paintBarcode(
  ctx: CanvasRenderingContext2D,
  color: string,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.fillStyle = color;
  const widths = [3, 2, 5, 2, 3, 6, 2, 4, 2, 3, 5, 2, 2, 4, 6, 2, 3, 2, 5, 3, 2, 4, 3, 5, 2, 3];
  let cx = x;
  let idx = 0;
  while (cx < x + w - 4) {
    const bw = widths[idx % widths.length];
    if (idx % 2 === 0 && cx + bw <= x + w) {
      ctx.fillRect(cx, y, bw, h);
    }
    cx += bw + (idx % 3 === 0 ? 4 : 3);
    idx++;
  }
  ctx.restore();
}

function paintStarSeal(
  ctx: CanvasRenderingContext2D,
  palette: EditionStyle,
  cx: number,
  cy: number,
  radius: number
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = palette.sealBg;
  ctx.fill();
  ctx.strokeStyle = palette.sealStroke;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, radius - 8, 0, Math.PI * 2);
  ctx.strokeStyle = palette.blueprintAccent;
  ctx.setLineDash([4, 5]);
  ctx.lineWidth = 1.4;
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.imageSmoothingEnabled = false;
  const grid = [
    '......YYYY......',
    '.....YYYYYY.....',
    '...TTTTTTTTTT...',
    '..IIHHHHHHHHII..',
    '.IIHHHHHHHHHHII.',
    '..IHHIIHHHHIHII.',
    '..IHHHHHHHHHHII.',
    '..IHHHHMMHHHHII.',
    '...IHHHHHHHHII..',
    '....IIIIIIII....',
    '..WWWWWWWWWWWW..',
    '.WWWWWWWWWWWWWW.',
    '....WWWWWWWW....',
  ];
  const cell = 4;
  const cols = 16;
  const rows = grid.length;
  const ox = Math.round(cx - (cols * cell) * 0.5);
  const oy = Math.round(cy - (rows * cell) * 0.5);

  for (let r = 0; r < rows; r++) {
    const rowStr = grid[r];
    for (let c = 0; c < cols; c++) {
      const ch = rowStr[c];
      if (ch === '.') continue;
      if (ch === 'I' || ch === 'M') {
        ctx.fillStyle = palette.inkPrimary;
      } else if (ch === 'H') {
        ctx.fillStyle = palette.inkSecondary;
      } else if (ch === 'T') {
        ctx.fillStyle = palette.sealBg;
      } else if (ch === 'Y' || ch === 'W') {
        ctx.fillStyle = palette.blueprintAccent;
      }
      ctx.fillRect(ox + c * cell, oy + r * cell, cell, cell);
      if (ch === 'T') {
        ctx.fillStyle = palette.inkPrimary;
        if (c === 3 || c === 12 || r === 2) {
          ctx.fillRect(ox + c * cell, oy + r * cell, cell, 1);
        }
      }
    }
  }

  ctx.restore();
}

function paintOnsenCapybaraScene(
  ctx: CanvasRenderingContext2D,
  theme: 'light' | 'dark',
  imgX: number,
  imgY: number,
  frameSize: number
) {
  ctx.save();
  ctx.imageSmoothingEnabled = false;

  const gridSize = 36;
  const p = 7;
  const ox = Math.round(imgX + (frameSize - gridSize * p) * 0.5);
  const oy = Math.round(imgY + (frameSize - gridSize * p) * 0.5);

  const px = (c: number, r: number, wCells: number, hCells: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(ox + c * p, oy + r * p, wCells * p, hCells * p);
  };

  const isDark = theme === 'dark';

  px(0, 0, 36, 4, isDark ? '#0B111E' : '#CFE4F5');
  px(0, 4, 36, 3, isDark ? '#111A2E' : '#DDEFFB');
  px(0, 7, 36, 4, isDark ? '#18243D' : '#EBF5FC');
  px(0, 11, 36, 6, isDark ? '#1E2D47' : '#D6E8F5');

  if (isDark) {
    px(26, 2, 3, 4, '#FDE68A');
    px(25, 3, 1, 2, '#FDE68A');
    px(26, 3, 2, 2, '#111A2E');
    px(27, 2, 1, 1, '#FEF9C3');

    px(11, 2, 1, 1, '#FEF9C3');
    px(15, 4, 1, 1, '#93C5FD');
    px(21, 2, 1, 1, '#FEF9C3');
    px(23, 6, 1, 1, '#93C5FD');
    px(13, 7, 1, 1, '#FEF9C3');
  } else {
    px(25, 2, 4, 4, '#FDE68A');
    px(26, 3, 2, 2, '#FEF9C3');
    px(11, 4, 6, 1, '#F8FAFC');
    px(13, 3, 3, 1, '#FFFFFF');
    px(19, 7, 6, 1, '#F8FAFC');
  }

  const mtBack = isDark ? '#162238' : '#9BB7CE';
  const mtFront = isDark ? '#1E2F4A' : '#82A3BE';
  px(0, 12, 36, 5, mtBack);
  px(8, 11, 10, 1, mtBack);
  px(10, 10, 6, 1, mtBack);
  px(20, 11, 9, 1, mtBack);
  px(22, 10, 5, 1, mtBack);

  px(0, 14, 36, 4, mtFront);
  px(12, 13, 12, 1, mtFront);
  px(15, 12, 6, 1, mtFront);

  const bambooDark = isDark ? '#1B432C' : '#24583A';
  const bambooMid = isDark ? '#2E6B47' : '#357A52';
  const bambooLight = isDark ? '#488E63' : '#57A773';

  px(3, 4, 1, 13, bambooDark);
  px(4, 4, 1, 13, bambooMid);
  px(4, 7, 1, 1, bambooLight);
  px(4, 11, 1, 1, bambooLight);
  px(4, 15, 1, 1, bambooLight);

  px(6, 6, 1, 11, bambooDark);
  px(7, 6, 1, 11, bambooMid);
  px(7, 9, 1, 1, bambooLight);
  px(7, 13, 1, 1, bambooLight);

  px(2, 5, 2, 1, bambooLight);
  px(5, 4, 3, 1, bambooLight);
  px(6, 5, 3, 1, bambooMid);
  px(8, 7, 2, 1, bambooLight);
  px(2, 9, 2, 1, bambooMid);

  px(30, 7, 2, 1, '#64748B');
  px(28, 8, 6, 1, '#94A3B8');
  px(27, 9, 8, 1, '#475569');
  px(29, 10, 4, 3, '#475569');
  px(30, 10, 2, 3, '#F59E0B');
  px(30, 11, 1, 1, '#FEF08A');
  px(28, 13, 6, 1, '#64748B');
  px(30, 14, 2, 3, '#64748B');
  px(29, 14, 1, 3, '#475569');

  px(0, 16, 36, 4, '#27303F');
  px(1, 15, 6, 2, '#364152');
  px(2, 15, 4, 1, '#4B5565');
  px(7, 16, 5, 2, '#364152');
  px(8, 16, 3, 1, '#647082');
  px(24, 16, 5, 2, '#364152');
  px(25, 16, 3, 1, '#647082');
  px(28, 15, 7, 3, '#364152');
  px(29, 15, 5, 1, '#4B5565');
  px(2, 17, 3, 1, bambooMid);
  px(30, 17, 3, 1, bambooMid);

  px(0, 19, 36, 1, isDark ? '#7DD3FC' : '#A5F3FC');
  px(0, 20, 36, 3, isDark ? '#155563' : '#1D7082');
  px(0, 23, 36, 4, isDark ? '#1C697A' : '#258599');
  px(0, 27, 36, 4, isDark ? '#237B8F' : '#2F99AD');

  const rippleBright = isDark ? '#A5F3FC' : '#E0F7FA';
  const rippleMid = isDark ? '#38BDF8' : '#7DD3FC';
  px(3, 21, 5, 1, rippleMid);
  px(28, 21, 5, 1, rippleMid);
  px(2, 24, 4, 1, rippleBright);
  px(10, 28, 16, 1, rippleMid);
  px(12, 29, 12, 1, rippleBright);

  const steamCore = isDark ? 'rgba(255, 255, 255, 0.52)' : 'rgba(255, 255, 255, 0.78)';
  const steamSoft = isDark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(255, 255, 255, 0.48)';
  px(8, 17, 1, 2, steamSoft);
  px(7, 15, 1, 2, steamCore);
  px(8, 13, 1, 2, steamCore);
  px(7, 11, 1, 2, steamSoft);

  px(11, 10, 1, 2, steamSoft);
  px(10, 8, 1, 2, steamCore);
  px(11, 6, 1, 2, steamSoft);

  px(26, 17, 1, 2, steamSoft);
  px(27, 15, 1, 2, steamCore);
  px(26, 13, 1, 2, steamCore);
  px(25, 11, 1, 2, steamSoft);

  const outline = '#2A1810';
  const furShadow = '#8A4F2D';
  const furMain = '#A8643B';
  const furLight = '#C27A4E';
  const muzzleDark = '#5C331C';
  const muzzleMid = '#704025';
  const blush = '#E07A5F';

  px(11, 25, 14, 2, isDark ? '#2A5C6A' : '#367585');
  px(10, 22, 16, 3, outline);
  px(11, 22, 14, 3, furShadow);
  px(12, 22, 12, 2, furMain);

  px(9, 25, 4, 1, rippleBright);
  px(14, 25, 8, 1, rippleBright);
  px(23, 25, 4, 1, rippleBright);

  px(11, 13, 2, 2, outline);
  px(11, 14, 1, 1, muzzleDark);
  px(23, 13, 2, 2, outline);
  px(24, 14, 1, 1, muzzleDark);

  px(12, 12, 12, 10, outline);
  px(11, 14, 14, 7, outline);

  px(13, 13, 10, 8, furMain);
  px(12, 15, 12, 5, furMain);
  px(13, 13, 10, 2, furLight);
  px(12, 19, 2, 2, furShadow);
  px(22, 19, 2, 2, furShadow);

  px(15, 15, 6, 6, muzzleMid);
  px(16, 14, 4, 7, muzzleDark);
  px(16, 16, 1, 1, outline);
  px(19, 16, 1, 1, outline);
  px(17, 19, 2, 1, outline);

  px(13, 16, 2, 1, outline);
  px(21, 16, 2, 1, outline);

  px(12, 17, 2, 1, blush);
  px(22, 17, 2, 1, blush);

  px(13, 11, 10, 2, '#CBD5E1');
  px(13, 10, 10, 2, '#FFFFFF');
  px(14, 11, 8, 1, '#E2E8F0');

  px(16, 8, 4, 2, '#F59E0B');
  px(17, 7, 2, 3, '#FACC15');
  px(17, 8, 1, 1, '#FEF08A');
  px(19, 6, 2, 1, '#22C55E');
  px(18, 7, 1, 1, '#15803D');

  px(4, 25, 4, 2, '#F59E0B');
  px(5, 24, 2, 3, '#FACC15');
  px(5, 25, 1, 1, '#FEF08A');
  px(6, 23, 2, 1, '#22C55E');
  px(3, 27, 6, 1, rippleBright);

  px(29, 24, 4, 2, '#F59E0B');
  px(30, 23, 2, 3, '#FACC15');
  px(30, 24, 1, 1, '#FEF08A');
  px(31, 22, 2, 1, '#22C55E');
  px(28, 26, 6, 1, rippleBright);

  px(0, 30, 36, 1, '#E6B382');
  px(0, 31, 36, 2, '#D4955E');
  px(0, 33, 36, 1, '#8C5327');
  px(0, 34, 36, 2, '#B87642');
  px(4, 31, 5, 1, '#DFAA78');
  px(16, 31, 6, 1, '#DFAA78');
  px(28, 31, 5, 1, '#DFAA78');
  px(9, 31, 1, 5, '#6E3E1B');
  px(18, 31, 1, 5, '#6E3E1B');
  px(27, 31, 1, 5, '#6E3E1B');

  ctx.restore();
}

export function renderFrontPassTexture(
  canvas: HTMLCanvasElement,
  locale: Locale,
  edition: FoilEdition,
  theme: 'light' | 'dark',
  _avatarImage?: HTMLImageElement | null
) {
  canvas.width = PASS_WIDTH * PASS_TEX_SCALE;
  canvas.height = PASS_HEIGHT * PASS_TEX_SCALE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.setTransform(PASS_TEX_SCALE, 0, 0, PASS_TEX_SCALE, 0, 0);

  const w = PASS_WIDTH;
  const h = PASS_HEIGHT;
  const splitY = h * STUB_SPLIT_RATIO;
  const palette = resolveEditionPalette(edition, theme);

  ctx.clearRect(0, 0, w, h);
  ctx.save();
  clipTicketSilhouette(ctx, w, h);
  ctx.clip();

  paintCardSubstrate(ctx, palette, w, h);

  const marginX = 36;
  const contentW = w - marginX * 2;
  paintFoilBand(ctx, palette, marginX, 34, contentW, 44);

  ctx.fillStyle = palette.foilStripInk;
  ctx.font = '600 16px "JetBrains Mono", monospace';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillText(
    locale === 'vi' ? '02. VỀ TÔI // CREATOR PASS' : '02. ABOUT // CREATOR PASS',
    marginX + 16,
    56
  );
  ctx.textAlign = 'right';
  ctx.fillText('ADMIT ONE', w - marginX - 16, 56);

  const portraitCx = w * 0.5;
  const portraitCy = 236;
  const frameSize = 236;

  ctx.save();
  ctx.strokeStyle = palette.blueprintAccent;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 7]);
  ctx.beginPath();
  ctx.arc(portraitCx, portraitCy, frameSize * 0.62, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = palette.cardBorder;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4 + Math.PI / 8;
    const rad = frameSize * 0.58;
    const px = portraitCx + Math.cos(a) * rad;
    const py = portraitCy + Math.sin(a) * rad;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  const imgX = portraitCx - frameSize * 0.5;
  const imgY = portraitCy - frameSize * 0.5;
  ctx.save();
  drawRoundedRectPath(ctx, imgX, imgY, frameSize, frameSize, 22);
  ctx.fillStyle = palette.sealBg;
  ctx.fill();
  ctx.clip();

  paintOnsenCapybaraScene(ctx, theme, imgX, imgY, frameSize);
  ctx.restore();

  ctx.save();
  drawRoundedRectPath(ctx, imgX, imgY, frameSize, frameSize, 22);
  ctx.strokeStyle = palette.cardBorder;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = palette.inkPrimary;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.font = '700 44px "Newsreader", Georgia, serif';
  ctx.fillText('LONG HOÀNG', w * 0.5, 434);

  ctx.fillStyle = palette.inkSecondary;
  ctx.font = '500 20px "Be Vietnam Pro", system-ui, sans-serif';
  ctx.fillText(PROFILE_DATA.role[locale], w * 0.5, 468);

  const specs =
    locale === 'vi'
      ? [
          { label: 'HỌ TÊN', value: 'Long Hoàng' },
          { label: 'NĂM SINH', value: '2007 — 19 TUỔI' },
          { label: 'NGÔN NGỮ', value: 'VI / EN' },
          { label: 'LĨNH VỰC', value: 'WEB · GAME · ANDROID' },
        ]
      : [
          { label: 'NAME', value: 'Long Hoàng' },
          { label: 'BORN', value: '2007 — AGE 19' },
          { label: 'LANG', value: 'VI / EN' },
          { label: 'SCOPE', value: 'WEB · GAME · ANDROID' },
        ];

  const gridTop = 502;
  const cellGap = 14;
  const cellW = (contentW - cellGap) * 0.5;
  const cellH = 104;

  specs.forEach((spec, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = marginX + col * (cellW + cellGap);
    const cy = gridTop + row * (cellH + cellGap);

    drawRoundedRectPath(ctx, cx, cy, cellW, cellH, 12);
    ctx.fillStyle = palette.cellBg;
    ctx.fill();
    ctx.strokeStyle = palette.cellBorder;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = palette.inkFaint;
    ctx.font = '600 14px "JetBrains Mono", monospace';
    ctx.fillText(spec.label, cx + 16, cy + 34);

    ctx.fillStyle = palette.inkPrimary;
    ctx.font = '600 19px "JetBrains Mono", monospace';
    ctx.fillText(spec.value, cx + 16, cy + 72);
  });

  const qrSize = 166;
  const stubTop = splitY + 34;
  paintDeterministicQR(
    ctx,
    palette.qrColor,
    palette.cellBg,
    palette.cellBorder,
    marginX,
    stubTop,
    qrSize
  );

  const barX = marginX + qrSize + 24;
  const barW = w - marginX - barX;
  paintBarcode(ctx, palette.inkPrimary, barX, stubTop + 6, barW, 84);

  ctx.textAlign = 'left';
  ctx.fillStyle = palette.inkPrimary;
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText('NO. 2007-LH-02', barX, stubTop + 124);

  ctx.fillStyle = palette.inkFaint;
  ctx.font = '500 15px "Be Vietnam Pro", system-ui, sans-serif';
  ctx.fillText(
    locale === 'vi' ? 'Kéo cuống vé xuống để xé' : 'Drag stub down to tear',
    barX,
    stubTop + 156
  );

  ctx.restore();

  paintPerforationLine(ctx, palette, w, splitY);

  ctx.save();
  clipTicketSilhouette(ctx, w, h);
  ctx.strokeStyle = palette.cardBorder;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();
}

export function renderBackPassTexture(
  canvas: HTMLCanvasElement,
  locale: Locale,
  edition: FoilEdition,
  theme: 'light' | 'dark'
) {
  canvas.width = PASS_WIDTH * PASS_TEX_SCALE;
  canvas.height = PASS_HEIGHT * PASS_TEX_SCALE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.setTransform(PASS_TEX_SCALE, 0, 0, PASS_TEX_SCALE, 0, 0);

  const w = PASS_WIDTH;
  const h = PASS_HEIGHT;
  const splitY = h * STUB_SPLIT_RATIO;
  const palette = resolveEditionPalette(edition, theme);

  ctx.clearRect(0, 0, w, h);
  ctx.save();
  clipTicketSilhouette(ctx, w, h);
  ctx.clip();

  paintCardSubstrate(ctx, palette, w, h);

  ctx.save();
  ctx.strokeStyle = palette.blueprintGrid;
  ctx.lineWidth = 1;
  for (let gx = 40; gx < w; gx += 40) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, splitY);
    ctx.stroke();
  }
  for (let gy = 40; gy < splitY; gy += 40) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(w, gy);
    ctx.stroke();
  }
  ctx.restore();

  const marginX = 36;
  const contentW = w - marginX * 2;
  paintFoilBand(ctx, palette, marginX, 34, contentW, 44);

  ctx.fillStyle = palette.foilStripInk;
  ctx.font = '600 16px "JetBrains Mono", monospace';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillText(
    locale === 'vi' ? 'BẢN VẼ KỸ THUẬT // 02' : 'TECHNICAL SPEC // 02',
    marginX + 16,
    56
  );
  ctx.textAlign = 'right';
  ctx.fillText('REV. 2007', w - marginX - 16, 56);

  const radarCx = w * 0.5;
  const radarCy = 340;
  const radarR = 164;

  ctx.save();
  ctx.strokeStyle = palette.blueprintAccent;
  for (const rScale of [0.35, 0.65, 1.0]) {
    ctx.lineWidth = rScale === 1.0 ? 2 : 1.2;
    ctx.setLineDash(rScale === 0.65 ? [6, 8] : []);
    ctx.beginPath();
    ctx.arc(radarCx, radarCy, radarR * rScale, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(radarCx - radarR - 20, radarCy);
  ctx.lineTo(radarCx + radarR + 20, radarCy);
  ctx.moveTo(radarCx, radarCy - radarR - 20);
  ctx.lineTo(radarCx, radarCy + radarR + 20);
  ctx.stroke();

  const polyPoints = [
    { x: radarCx, y: radarCy - radarR * 0.88 },
    { x: radarCx + radarR * 0.86, y: radarCy },
    { x: radarCx, y: radarCy + radarR * 0.86 },
    { x: radarCx - radarR * 0.82, y: radarCy },
  ];

  ctx.beginPath();
  polyPoints.forEach((pt, idx) => {
    if (idx === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  });
  ctx.closePath();
  ctx.fillStyle =
    palette.id === 'obsidian-gold'
      ? 'rgba(245, 245, 247, 0.09)'
      : 'rgba(17, 17, 17, 0.07)';
  ctx.fill();

  ctx.strokeStyle = palette.inkPrimary;
  ctx.lineWidth = 2.2;
  ctx.stroke();

  polyPoints.forEach((pt) => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 6.5, 0, Math.PI * 2);
    ctx.fillStyle = palette.inkPrimary;
    ctx.fill();
    ctx.strokeStyle = palette.cardBgTop;
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  ctx.restore();

  const principles =
    locale === 'vi'
      ? [
          { code: '01', text: 'Làm cuốn chiếu từng phần' },
          { code: '02', text: 'Giữ bản chính luôn ổn' },
          { code: '03', text: 'Tự test cho kỹ' },
          { code: '04', text: 'Chăm chút mấy thứ nhỏ' },
        ]
      : [
          { code: '01', text: 'Build step by step' },
          { code: '02', text: 'Keep the live site safe' },
          { code: '03', text: 'Test like a real user' },
          { code: '04', text: 'Care about small details' },
        ];

  const pillTop = 556;
  const pillW = (contentW - 14) * 0.5;
  const pillH = 74;

  principles.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const px = marginX + col * (pillW + 14);
    const py = pillTop + row * (pillH + 12);

    drawRoundedRectPath(ctx, px, py, pillW, pillH, 12);
    ctx.fillStyle = palette.cellBg;
    ctx.fill();
    ctx.strokeStyle = palette.cellBorder;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(px + 20, py + 24, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = palette.inkPrimary;
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.fillStyle = palette.inkFaint;
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText(item.code, px + 34, py + 28);

    ctx.fillStyle = palette.inkPrimary;
    ctx.font = '600 16px "Be Vietnam Pro", system-ui, sans-serif';
    ctx.fillText(item.text, px + 16, py + 56);
  });

  paintStarSeal(ctx, palette, marginX + 74, splitY + 126, 62);

  ctx.textAlign = 'left';
  ctx.fillStyle = palette.inkPrimary;
  ctx.font = '600 17px "JetBrains Mono", monospace';
  ctx.fillText('VERIFIED PRODUCT MAKER', marginX + 160, splitY + 106);

  ctx.fillStyle = palette.inkFaint;
  ctx.font = '600 15px "JetBrains Mono", monospace';
  ctx.fillText('// 2007 · LONG HOÀNG', marginX + 160, splitY + 134);

  ctx.fillStyle = palette.inkSecondary;
  ctx.font = '500 14px "Be Vietnam Pro", system-ui, sans-serif';
  ctx.fillText(
    locale === 'vi' ? 'Thiết kế và tự code hoàn chỉnh' : 'Designed and coded end to end',
    marginX + 160,
    splitY + 162
  );

  ctx.restore();

  paintPerforationLine(ctx, palette, w, splitY);

  ctx.save();
  clipTicketSilhouette(ctx, w, h);
  ctx.strokeStyle = palette.cardBorder;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();
}
