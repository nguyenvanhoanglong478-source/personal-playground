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
export const STUB_SPLIT_RATIO = 0.75;

export const EDITION_STYLES: Record<FoilEdition, EditionStyle> = {
  'silver-holo': {
    id: 'silver-holo',
    code: '01',
    label: { vi: 'Silver Holo', en: 'Silver Holo' },
    cardBgTop: '#F8FAFD',
    cardBgBottom: '#E6ECF5',
    cardBorder: 'rgba(17, 17, 17, 0.22)',
    inkPrimary: '#111111',
    inkSecondary: '#3A3F48',
    inkFaint: '#3E434C',
    cellBg: 'rgba(255, 255, 255, 0.72)',
    cellBorder: 'rgba(17, 17, 17, 0.16)',
    foilStripInk: '#111111',
    foilStripBg: 'rgba(255, 255, 255, 0.56)',
    blueprintGrid: 'rgba(17, 17, 17, 0.08)',
    blueprintAccent: 'rgba(17, 17, 17, 0.34)',
    sealBg: '#EEF2F8',
    sealStroke: '#111111',
    qrColor: '#111111',
    holoIntensity: 0.72,
    baseWarmTint: [0.96, 0.98, 1.0],
  },
  'obsidian-gold': {
    id: 'obsidian-gold',
    code: '02',
    label: { vi: 'Obsidian Gold', en: 'Obsidian Gold' },
    cardBgTop: '#16181C',
    cardBgBottom: '#0F1013',
    cardBorder: 'rgba(243, 211, 122, 0.36)',
    inkPrimary: '#F5F5F7',
    inkSecondary: '#C8CCD4',
    inkFaint: '#E6C46D',
    cellBg: 'rgba(30, 32, 38, 0.88)',
    cellBorder: 'rgba(243, 211, 122, 0.24)',
    foilStripInk: '#F5F5F7',
    foilStripBg: 'rgba(18, 20, 24, 0.76)',
    blueprintGrid: 'rgba(243, 211, 122, 0.08)',
    blueprintAccent: 'rgba(243, 211, 122, 0.44)',
    sealBg: '#1C1E24',
    sealStroke: '#F3D37A',
    qrColor: '#F5F5F7',
    holoIntensity: 0.84,
    baseWarmTint: [1.0, 0.88, 0.56],
  },
  'google-prism': {
    id: 'google-prism',
    code: '03',
    label: { vi: 'Google Prism', en: 'Google Prism' },
    cardBgTop: '#FFFFFF',
    cardBgBottom: '#EDF3FC',
    cardBorder: 'rgba(66, 133, 244, 0.36)',
    inkPrimary: '#111111',
    inkSecondary: '#3C414A',
    inkFaint: '#1D4ED8',
    cellBg: 'rgba(255, 255, 255, 0.78)',
    cellBorder: 'rgba(66, 133, 244, 0.24)',
    foilStripInk: '#111111',
    foilStripBg: 'rgba(255, 255, 255, 0.70)',
    blueprintGrid: 'rgba(66, 133, 244, 0.10)',
    blueprintAccent: 'rgba(66, 133, 244, 0.42)',
    sealBg: '#F4F7FC',
    sealStroke: '#111111',
    qrColor: '#111111',
    holoIntensity: 0.94,
    baseWarmTint: [0.92, 0.96, 1.0],
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
  if (edition !== 'google-prism' || theme === 'light') {
    return EDITION_STYLES[edition];
  }
  return {
    ...EDITION_STYLES['google-prism'],
    cardBgTop: '#161A24',
    cardBgBottom: '#11141C',
    cardBorder: 'rgba(138, 180, 248, 0.36)',
    inkPrimary: '#F5F5F7',
    inkSecondary: '#C8CFD9',
    inkFaint: '#93C5FD',
    cellBg: 'rgba(26, 31, 44, 0.84)',
    cellBorder: 'rgba(138, 180, 248, 0.26)',
    foilStripInk: '#F5F5F7',
    foilStripBg: 'rgba(19, 22, 31, 0.76)',
    blueprintGrid: 'rgba(138, 180, 248, 0.09)',
    blueprintAccent: 'rgba(138, 180, 248, 0.44)',
    sealBg: '#1A2030',
    sealStroke: '#F5F5F7',
    qrColor: '#F5F5F7',
  };
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
  grad.addColorStop(1, palette.cardBgBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  if (palette.id === 'obsidian-gold') {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.lineWidth = 1;
    for (let i = -h; i < w + h; i += 10) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + h * 0.45, h);
      ctx.stroke();
    }
    ctx.restore();
  } else if (palette.id === 'google-prism') {
    ctx.save();
    const prismWash = ctx.createLinearGradient(0, 0, w, h);
    prismWash.addColorStop(0, 'rgba(66, 133, 244, 0.14)');
    prismWash.addColorStop(0.28, 'rgba(155, 114, 203, 0.10)');
    prismWash.addColorStop(0.54, 'rgba(217, 101, 112, 0.11)');
    prismWash.addColorStop(0.78, 'rgba(251, 188, 4, 0.11)');
    prismWash.addColorStop(1, 'rgba(52, 168, 83, 0.13)');
    ctx.fillStyle = prismWash;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 1.5;
    for (let i = -200; i < w + 320; i += 96) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - 220, h);
      ctx.stroke();
    }
    ctx.restore();
  } else {
    ctx.save();
    const sheen = ctx.createRadialGradient(w * 0.3, h * 0.2, 10, w * 0.5, h * 0.45, w);
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
    sheen.addColorStop(0.6, 'rgba(220, 230, 245, 0.18)');
    sheen.addColorStop(1, 'rgba(180, 195, 218, 0.24)');
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }
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

  const rainbow = ctx.createLinearGradient(x, y, x + w, y + h);
  rainbow.addColorStop(0, 'rgba(66, 133, 244, 0.34)');
  rainbow.addColorStop(0.18, 'rgba(0, 229, 255, 0.28)');
  rainbow.addColorStop(0.36, 'rgba(52, 168, 83, 0.28)');
  rainbow.addColorStop(0.56, 'rgba(251, 188, 4, 0.32)');
  rainbow.addColorStop(0.78, 'rgba(234, 67, 53, 0.30)');
  rainbow.addColorStop(1, 'rgba(155, 114, 203, 0.34)');
  ctx.fillStyle = palette.foilStripBg;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = rainbow;
  ctx.fillRect(x, y, w, h);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1;
  for (let gx = x - h; gx < x + w + h; gx += 12) {
    ctx.beginPath();
    ctx.moveTo(gx, y);
    ctx.lineTo(gx + h, y + h);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  drawRoundedRectPath(ctx, x, y, w, h, 10);
  ctx.strokeStyle = palette.cellBorder;
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

function paintCapybaraSeal(
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

  const sealGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
  sealGrad.addColorStop(0, '#4285F4');
  sealGrad.addColorStop(0.26, '#9B72CB');
  sealGrad.addColorStop(0.52, '#D96570');
  sealGrad.addColorStop(0.76, '#FBBC04');
  sealGrad.addColorStop(1, '#34A853');

  ctx.strokeStyle = sealGrad;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, radius - 9, 0, Math.PI * 2);
  ctx.strokeStyle = palette.blueprintAccent;
  ctx.setLineDash([4, 6]);
  ctx.lineWidth = 1.4;
  ctx.stroke();
  ctx.setLineDash([]);

  const s = (radius * 1.15) / 48;
  ctx.save();
  ctx.translate(cx - 24 * s, cy - 23 * s);
  ctx.scale(s, s);

  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  ctx.moveTo(24, 4.6);
  ctx.bezierCurveTo(24.42, 7.65, 25.55, 8.78, 28.6, 9.2);
  ctx.bezierCurveTo(25.55, 9.62, 24.42, 10.75, 24, 13.8);
  ctx.bezierCurveTo(23.58, 10.75, 22.45, 9.62, 19.4, 9.2);
  ctx.bezierCurveTo(22.45, 8.78, 23.58, 7.65, 24, 4.6);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = palette.sealStroke;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 2.05;
  ctx.beginPath();
  ctx.moveTo(13.8, 35.8);
  ctx.bezierCurveTo(13.1, 30.0, 13.6, 24.4, 15.6, 21.0);
  ctx.bezierCurveTo(14.5, 18.2, 15.0, 15.8, 17.1, 15.7);
  ctx.bezierCurveTo(18.7, 15.6, 19.4, 17.3, 19.0, 19.2);
  ctx.bezierCurveTo(22.8, 17.9, 28.4, 18.5, 32.8, 20.3);
  ctx.bezierCurveTo(34.8, 21.1, 35.7, 22.5, 35.7, 24.9);
  ctx.lineTo(35.4, 28.8);
  ctx.bezierCurveTo(35.3, 31.3, 33.5, 32.6, 30.3, 32.6);
  ctx.bezierCurveTo(27.9, 32.6, 26.2, 33.2, 25.5, 34.4);
  ctx.bezierCurveTo(25.1, 35.0, 25.1, 35.4, 25.2, 35.8);
  ctx.stroke();

  ctx.lineWidth = 1.9;
  ctx.beginPath();
  ctx.moveTo(12.2, 35.8);
  ctx.quadraticCurveTo(19.5, 36.6, 26.8, 35.8);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(23.2, 22.0);
  ctx.quadraticCurveTo(25.5, 23.9, 27.8, 22.0);
  ctx.stroke();

  ctx.lineWidth = 1.7;
  ctx.beginPath();
  ctx.moveTo(31.8, 23.7);
  ctx.bezierCurveTo(32.3, 24.2, 32.6, 24.7, 32.7, 25.3);
  ctx.stroke();

  ctx.lineWidth = 1.75;
  ctx.beginPath();
  ctx.moveTo(35.3, 28.6);
  ctx.bezierCurveTo(33.4, 28.8, 32.0, 29.6, 31.2, 30.7);
  ctx.stroke();

  ctx.restore();
  ctx.restore();
}

export function renderFrontPassTexture(
  canvas: HTMLCanvasElement,
  locale: Locale,
  edition: FoilEdition,
  theme: 'light' | 'dark',
  avatarImage: HTMLImageElement | null
) {
  canvas.width = PASS_WIDTH;
  canvas.height = PASS_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

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

  const ringGrad = ctx.createLinearGradient(
    portraitCx - 140,
    portraitCy - 140,
    portraitCx + 140,
    portraitCy + 140
  );
  ringGrad.addColorStop(0, '#4285F4');
  ringGrad.addColorStop(0.28, '#9B72CB');
  ringGrad.addColorStop(0.55, '#D96570');
  ringGrad.addColorStop(0.78, '#FBBC04');
  ringGrad.addColorStop(1, '#34A853');

  ctx.strokeStyle = ringGrad;
  ctx.lineWidth = 2.5;
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

  if (avatarImage && avatarImage.complete && avatarImage.naturalWidth > 0) {
    const srcW = avatarImage.naturalWidth;
    const srcH = avatarImage.naturalHeight;
    const scale = Math.max(frameSize / srcW, frameSize / srcH);
    const drawW = srcW * scale;
    const drawH = srcH * scale;
    const drawX = imgX + (frameSize - drawW) * 0.5;
    const drawY = imgY + (frameSize - drawH) * 0.16;
    ctx.drawImage(avatarImage, drawX, drawY, drawW, drawH);
  } else {
    ctx.fillStyle = palette.inkFaint;
    ctx.font = '600 44px "Newsreader", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('LH', portraitCx, portraitCy);
  }
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
  canvas.width = PASS_WIDTH;
  canvas.height = PASS_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

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

  const polyGrad = ctx.createLinearGradient(
    radarCx - radarR,
    radarCy - radarR,
    radarCx + radarR,
    radarCy + radarR
  );
  polyGrad.addColorStop(0, 'rgba(66, 133, 244, 0.24)');
  polyGrad.addColorStop(0.5, 'rgba(155, 114, 203, 0.20)');
  polyGrad.addColorStop(1, 'rgba(52, 168, 83, 0.24)');

  ctx.beginPath();
  polyPoints.forEach((pt, idx) => {
    if (idx === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  });
  ctx.closePath();
  ctx.fillStyle = polyGrad;
  ctx.fill();

  const polyStroke = ctx.createLinearGradient(
    radarCx - radarR,
    radarCy - radarR,
    radarCx + radarR,
    radarCy + radarR
  );
  polyStroke.addColorStop(0, '#4285F4');
  polyStroke.addColorStop(0.35, '#9B72CB');
  polyStroke.addColorStop(0.7, '#FBBC04');
  polyStroke.addColorStop(1, '#34A853');
  ctx.strokeStyle = polyStroke;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  const nodeColors = ['#4285F4', '#34A853', '#FBBC04', '#D96570'];
  polyPoints.forEach((pt, i) => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
    ctx.fillStyle = nodeColors[i];
    ctx.fill();
    ctx.strokeStyle = palette.cardBgTop;
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  ctx.restore();

  const principles =
    locale === 'vi'
      ? [
          { code: '01', text: 'Chia nhỏ từng bước' },
          { code: '02', text: 'Giữ chắc phần đang chạy' },
          { code: '03', text: 'Kiểm thử 1800 bước' },
          { code: '04', text: 'Chi tiết 16x16' },
        ]
      : [
          { code: '01', text: 'Small steps first' },
          { code: '02', text: 'Protect what works' },
          { code: '03', text: '1800-step testing' },
          { code: '04', text: '16x16 details' },
        ];

  const badgeColors = ['#4285F4', '#34A853', '#FBBC04', '#D96570'];
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
    ctx.arc(px + 20, py + 24, 5, 0, Math.PI * 2);
    ctx.fillStyle = badgeColors[i];
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.fillStyle = palette.inkFaint;
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText(item.code, px + 34, py + 28);

    ctx.fillStyle = palette.inkPrimary;
    ctx.font = '600 16px "Be Vietnam Pro", system-ui, sans-serif';
    ctx.fillText(item.text, px + 16, py + 56);
  });

  paintCapybaraSeal(ctx, palette, marginX + 74, splitY + 126, 62);

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
