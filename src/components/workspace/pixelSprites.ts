import type { RoomHotspotId, RoomHotspotRegion, RoomTimeState } from '../../data/workspace';
import type { RoomPalette } from './pixelPalette';

export type SpriteMatrix = readonly string[];

export type SpriteColorMap = Record<string, string | undefined>;

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

const HOTSPOT_POINTER_ANCHORS: Record<RoomHotspotId, { pointerX: number; pointerY: number }> = {
  window: { pointerX: 112, pointerY: 6 },
  shelf: { pointerX: 254, pointerY: 12 },
  bed: { pointerX: 42, pointerY: 70 },
  monitor: { pointerX: 172, pointerY: 42 },
  speakers: { pointerX: 122, pointerY: 54 },
  lamp: { pointerX: 232, pointerY: 50 },
  capybara: { pointerX: 218, pointerY: 122 },
};

const CODE_BUFFER: readonly string[] = [
  'KKKDFWDDDDDDDDDDDDDD',
  'DDFFOWSSSSSSSSSSDDDD',
  'DDDDKKKKDFWODDDDDDDD',
  'DDDDDDFFFWONNNWDDDDD',
  'DDKKDFFWDDDDDDDDDDDD',
  'DDDDFFFOSSSSSSSSSDDD',
  'DDDDDDFFWWONNNDDDDDD',
  'DDWDDDDDDDDDDDDDDDDD',
];

const UI_PANEL_ROWS: readonly string[] = [
  'PPPPPPPPPPPP',
  'PAAAAAAAAAAP',
  'PAFFAAYYAAAP',
  'PAAAAAAAAAAP',
  'PAWWWWWWAAAP',
  'PAWWWWAAAAAP',
  'PAAAAAAAAAAP',
  'PGGGGGGPPPPP',
  'PPPPPPPPPPPP',
  'PAAAAAAAAAAP',
  'PAKKKKAAWWAP',
  'PAAAAAWWWWAP',
  'PAAAAAAAAAAP',
  'PAASSSAAFFAP',
  'PAAAAAAAAAAP',
  'PPPPPPPPPPPP',
  'PAAFFAAYYAAP',
  'PPPPPPPPPPPP',
  'PPPPPPPPPPPP',
];

const MONITOR_CODE_COLORS: SpriteColorMap = {
  B: '#1A2033',
  T: '#252E47',
  A: '#323E5E',
  U: '#60A5FA',
  R: '#EA4335',
  Y: '#FBBC04',
  G: '#34A853',
  D: '#111624',
  V: '#232C42',
  N: '#4B5878',
  K: '#B794F4',
  F: '#60A5FA',
  S: '#4ADE80',
  O: '#F472B6',
  W: '#E2E8F0',
  C: '#67E8F9',
  P: '#182034',
};

const MONITOR_CODE_COLORS_NIGHT: SpriteColorMap = {
  ...MONITOR_CODE_COLORS,
  U: '#38BDF8',
  C: '#22D3EE',
  P: '#151D30',
};

const MONITOR_WAKING_FRAME_0: SpriteMatrix = [
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
  'BTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTSSSTTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTTSSTTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTTSSTTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTOOOOOOTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTOCCCCCCOTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTOMMMMMMOOOTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTOMMMMMMOMOTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTOMMMMMMOMOTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTOMMMMMMOOOTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTODDDDDOTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTOODDDDDOOTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTOOOOOOOOOTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTAAAAAAAAAAAAAAATTTTTTTTTTTTB',
  'BTTTTTTTTTTTAYYYYYYAAADDDDATTTTTTTTTTTTB',
  'BTTTTTTTTTTTAAAAAAAAAAAAAAATTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTGGGGGGGTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTB',
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
];

const MONITOR_WAKING_FRAME_1: SpriteMatrix = [
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
  'BTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTTSSTTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTSSTSSTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTTTSSTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTOOOOOOTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTOCCCCCCOTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTOMMMMMMOOOTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTOMMMMMMOMOTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTOMMMMMMOMOTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTOMMMMMMOOOTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTODDDDDOTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTOODDDDDOOTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTOOOOOOOOOTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTAAAAAAAAAAAAAAATTTTTTTTTTTTB',
  'BTTTTTTTTTTTAYYYYYYYYYADDDATTTTTTTTTTTTB',
  'BTTTTTTTTTTTAAAAAAAAAAAAAAATTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTGGGGGGGTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTB',
  'BTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTB',
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
];

const MONITOR_WAKING_COLORS: SpriteColorMap = {
  B: '#2A1D16',
  T: '#3D291F',
  A: '#54392B',
  Y: '#FBBF24',
  D: '#6E4C3A',
  O: '#2A1C16',
  M: '#F5EFE6',
  C: '#5C3420',
  S: '#FDE68A',
  G: '#F59E0B',
};

const MONITOR_SLEEPING_FRAME_ON: SpriteMatrix = [
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSGGSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSGSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSLLSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
];

const MONITOR_SLEEPING_FRAME_DIM: SpriteMatrix = [
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSGGSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSGSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSDDSSB',
  'BSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB',
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
];

const MONITOR_SLEEPING_COLORS: SpriteColorMap = {
  B: '#121521',
  S: '#151928',
  G: '#1E2438',
  L: '#34D399',
  D: '#1B3A32',
};

function buildEditorScreenMatrix(scrollOffset: number, cursorOn: boolean): SpriteMatrix {
  const rows: string[] = [
    'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    'BTRTYTGTBAAAAAAAAABTTTTTTTVPPPPPPPPPPPPB',
    'BDDDDDDDDUUUUUUUUUDDDDDDDDVPPPPPPPPPPPPB',
  ];

  for (let i = 0; i < 19; i += 1) {
    const lineIdx = (i + scrollOffset) % CODE_BUFFER.length;
    let codeLine = CODE_BUFFER[lineIdx];
    if (cursorOn && i === 4) {
      codeLine = `${codeLine.slice(0, 12)}C${codeLine.slice(13)}`;
    }
    const lineNumDigit = ((lineIdx + 1) % 9) + 1;
    const gutter = i % 2 === 0 ? `N${lineNumDigit}` : `D${lineNumDigit}`;
    const panelRow = UI_PANEL_ROWS[i] ?? 'PPPPPPPPPPPP';
    rows.push(`B${gutter}VD${codeLine}DV${panelRow}B`);
  }

  rows.push('BAAAAAAAAAAAAAAAAAAAGGGAAAAAAAAAAAAAAAAB');
  rows.push('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
  return rows;
}

const LONG_SEATED_HEAD: readonly string[] = [
  '.......OOOOOOOOO........',
  '......OHHllhhHHHO.......',
  '.....OHHlhHHHHHhHO......',
  '....OHHHHHhHHHHhHHO.....',
  '....OHhHHssGGGssHHO.....',
  '....OHsGGRLGGRLGdHO.....',
  '....OdcGssGGssGdHHO.....',
  '.....OcsssddaaHHHO......',
];

const LONG_SEATED_BODY_F0: readonly string[] = [
  '..OO.OOOddCCddOOO.......',
  '.OssOOBBmCCCCmBBOO.OO...',
  '.OdsObbBBBBBBBBbbOOssO..',
  '.ObbObBBBBBBBBBBbBOsdO..',
  '.OBBObBBBBSSBBBBbBObbO..',
  '.OSB.OBBBBSSBBBBO.OBBO..',
  '..OO.OBBBBBBBBBBO.OSBO..',
  '.....OBBbBBBBbBBO..OO...',
  '.....OBBBBBBBBBBO.......',
  '.....OBBBSSSSBBBO.......',
  '.....OBBBSSSSBBBO.......',
  '.....OBBBBBBBBBBO.......',
  '.....OSSSSSSSSSSO.......',
  '.....OJJjjKKjjJJO.......',
  '.....OJJJJKKJJJJO.......',
  '.....OJJJKOOKJJJO.......',
  '.....OJJKO..OKJJO.......',
  '.....OJJKO..OKJJO.......',
  '.....OHHHO..OHHHO.......',
  '.....OWWWO..OWWWO.......',
  '.....OOOOO..OOOOO.......',
  '....xxxxxxx.xxxxxxx.....',
];

const LONG_SEATED_BODY_F1: readonly string[] = [
  '..................OO....',
  '..OO.OOOddCCddOOOOssO...',
  '.OssOOBBmCCCCmBBBOsdO...',
  '.OdsObbBBBBBBBBbbObbO...',
  '.ObbObBBBBBBBBBBbBObO...',
  '.OBBObBBBBSSBBBBbBSSO...',
  '..OO.OBBBBSSBBBBO.OO....',
  '.....OBBbBBBBbBBO.......',
  '.....OBBBBBBBBBBO.......',
  '.....OBBBSSSSBBBO.......',
  '.....OBBBSSSSBBBO.......',
  '.....OBBBBBBBBBBO.......',
  '.....OSSSSSSSSSSO.......',
  '.....OJJjjKKjjJJO.......',
  '.....OJJJJKKJJJJO.......',
  '.....OJJJKOOKJJJO.......',
  '.....OJJKO..OKJJO.......',
  '.....OJJKO..OKJJO.......',
  '.....OHHHO..OHHHO.......',
  '.....OWWWO..OWWWO.......',
  '.....OOOOO..OOOOO.......',
  '....xxxxxxx.xxxxxxx.....',
];

const LONG_SEATED_BODY_F2: readonly string[] = [
  '...OO.............OO....',
  '..OssOOOddCCddOOOOssO...',
  '..OdsOBBmCCCCmBBBdsOO...',
  '..ObBObbBBBBBBBBbbBO....',
  '..OBBObBBBSSBBBBbBO.....',
  '..OSBObBBBSSBBBBOOO.....',
  '...OOOBBBBBBBBBBO.......',
  '.....OBBbBBBBbBBO.......',
  '.....OBBBBBBBBBBO.......',
  '.....OBBBSSSSBBBO.......',
  '.....OBBBSSSSBBBO.......',
  '.....OBBBBBBBBBBO.......',
  '.....OSSSSSSSSSSO.......',
  '.....OJJjjKKjjJJO.......',
  '.....OJJJJKKJJJJO.......',
  '.....OJJJKOOKJJJO.......',
  '.....OJJKO..OKJJO.......',
  '.....OJJKO..OKJJO.......',
  '.....OHHHO..OHHHO.......',
  '.....OWWWO..OWWWO.......',
  '.....OOOOO..OOOOO.......',
  '....xxxxxxx.xxxxxxx.....',
];

function buildLongSeatedMatrix(typingFrame: number, headBobDown: boolean): SpriteMatrix {
  const body =
    typingFrame === 1
      ? LONG_SEATED_BODY_F1
      : typingFrame === 2
        ? LONG_SEATED_BODY_F2
        : LONG_SEATED_BODY_F0;
  if (!headBobDown) {
    return [
      '........................',
      '........................',
      ...LONG_SEATED_HEAD,
      ...body,
    ];
  }

  const headChin = LONG_SEATED_HEAD[LONG_SEATED_HEAD.length - 1];
  const mergedNeckRow = `${body[0].slice(0, 5)}${headChin.slice(5)}`;
  return [
    '........................',
    '........................',
    '........................',
    ...LONG_SEATED_HEAD.slice(0, -1),
    mergedNeckRow,
    ...body.slice(1),
  ];
}

const LONG_WAKING_HEAD_OPEN: readonly string[] = [
  '......OOOOOOOOOO......',
  '.....OHHllhhHHHHO.....',
  '....OHHlhHHHHHhHHO....',
  '...OHHHHHhHHHHhHHHO...',
  '...OHhHHssshhhssHHO...',
  '...OHsGGGGGsGGGGGsO...',
  '...OsGLERGdsGRELGsO...',
  '...OdGGGGGsdGGGGGdO...',
  '....OssssssssssssO....',
  '.....OOddssssddOO.....',
];

const LONG_WAKING_HEAD_BLINK: readonly string[] = [
  '......OOOOOOOOOO......',
  '.....OHHllhhHHHHO.....',
  '....OHHlhHHHHHhHHO....',
  '...OHHHHHhHHHHhHHHO...',
  '...OHhHHssshhhssHHO...',
  '...OHsGGGGGsGGGGGsO...',
  '...OsGLKKGdsGKKLGsO...',
  '...OdGGGGGsdGGGGGdO...',
  '....OssssssssssssO....',
  '.....OOddssssddOO.....',
];

const LONG_WAKING_BODY_HOLD: readonly string[] = [
  '....OOOBBmCCmBBOOO....',
  '...ObBBBBmCCmBBBBbO...',
  '..ObBBBBBCCCCBBBBBbO..',
  '..OBBBObBBCCBBbOBBBO..',
  '..OBBOOBBBBBBBBOOBBO..',
  '..OBBOOBBBSSBBBOssOO..',
  '..OssOOBBBSSBBBOMKKMO.',
  '..OdsOOBBBBBBBBOMMMOO.',
  '...OO.OBBSSSSBBOMmMO..',
  '......OSSSSSSSSOmmmO..',
  '......OJJjjKKjjOO.OO..',
  '......OJJJJKKJJJO.....',
  '......OJJJKOOKJJO.....',
  '......OJJKO..OKJJO....',
  '......OJJKO..OKJJO....',
  '......OJJKO..OKJJO....',
  '......OHHHO..OHHHO....',
  '......OWWWO..OWWWO....',
  '......OOOOO..OOOOO....',
  '.....xxxxxx..xxxxxx...',
];

const LONG_WAKING_BODY_SIP: readonly string[] = [
  '....OOOBBmCCmBBOOO....',
  '...ObBBBBmCCmBBBBbO...',
  '..ObBBBBBCCCCBBBOOO...',
  '..OBBBObBBCCBBbOMKKMO.',
  '..OBBOOBBBBBBBBOMMMOO.',
  '..OBBOOBBBSSBBBOMmMOO.',
  '..OssOOBBBSSBBBOmMmO..',
  '..OdsOOBBBBBBBBOssO...',
  '...OO.OBBSSSSBBOOO....',
  '......OSSSSSSSSO......',
  '......OJJjjKKjjO......',
  '......OJJJJKKJJJO.....',
  '......OJJJKOOKJJO.....',
  '......OJJKO..OKJJO....',
  '......OJJKO..OKJJO....',
  '......OJJKO..OKJJO....',
  '......OHHHO..OHHHO....',
  '......OWWWO..OWWWO....',
  '......OOOOO..OOOOO....',
  '.....xxxxxx..xxxxxx...',
];

function buildLongWakingMatrix(isBlinking: boolean, isSipping: boolean): SpriteMatrix {
  const head = isBlinking ? LONG_WAKING_HEAD_BLINK : LONG_WAKING_HEAD_OPEN;
  const body = isSipping ? LONG_WAKING_BODY_SIP : LONG_WAKING_BODY_HOLD;
  return [...head, ...body];
}

const LONG_SLEEPING_F0: SpriteMatrix = [
  '......................................',
  '......................................',
  '......................................',
  '.......OOOOOOOOO......................',
  '......OHHllhhHHHHO....................',
  '.....OHHlhHHHHHhHHO.......OOOOOOO.....',
  '....OHHHssshhssddHHO.....OGGGLGGGO....',
  '....OHhssKKssKKssHHO.....O.......O....',
  '....OHsssppssssdsHO...................',
  '.....OsssdssssddHO....................',
  '.....OOddCCddBBbOOOOOOO...............',
  '......OBBmCCmBBBBBBBBbbOOOO...........',
  '......OBBBBBBBBBBBBBBBBBBBbOO.........',
  '.....OBBBBBSSBBBBBBBBBBBBBBbO.........',
  '....OOBBBBBBBBBBBBBBBBBBBBBO..........',
  '....OOMMMMMMMMMMMMMMMMMMMMMMOO........',
  '...OMMMMMMMMMMMMMMMMMMMMMMMMMMO.......',
  '...OMMWWWWWWWWWWWWWWWWWWWWWWWMO.......',
  '..OQQQqqQQQQQQQQqqQQQQQQqqQQQQQO......',
  '..OQQqqqQQQQQQQqqqQQQQQqqqQQQQQO......',
  '..OQQQQQQQqqQQQQQQQQqqQQQQQQQQQO......',
  '..OqqQQQQqqqQQQQQQQqqqQQQQQQqqQO......',
  '..UQQQQQQQQQQQQQQQQQQQQQQQQQQQQU......',
  '...UUUUUUUUUUUUUUUUUUUUUUUUUUUU.......',
];

const LONG_SLEEPING_F1: SpriteMatrix = [
  '......................................',
  '......................................',
  '......................................',
  '.......OOOOOOOOO......................',
  '......OHHllhhHHHHO....................',
  '.....OHHlhHHHHHhHHO.......OOOOOOO.....',
  '....OHHHssshhssddHHO.....OGGGLGGGO....',
  '....OHhssKKssKKssHHO.....O.......O....',
  '....OHsssppssssdsHO...................',
  '.....OsssdssssddHO....................',
  '.....OOddCCddBBbOOOOOOO...............',
  '......OBBmCCmBBBBBBBBbbOOOO...........',
  '......OBBBBBBBBBBBBBBBBBBBbOO.........',
  '.....OBBBBBSSBBBBBBBBBBBBBBbO.........',
  '....OOMMMMMMMMMMMMMMMMMMMMMMOO........',
  '...OMMMMMMMMMMMMMMMMMMMMMMMMMMO.......',
  '...OMMWWWWWWWWWWWWWWWWWWWWWWWMO.......',
  '..OQQQqqQQQQQQQQqqQQQQQQqqQQQQQO......',
  '..OQQqqqQQQQQQQqqqQQQQQqqqQQQQQO......',
  '..OQQQQQQQqqQQQQQQQQqqQQQQQQQQQO......',
  '..OqqQQQQqqqQQQQQQQqqqQQQQQQqqQO......',
  '..OQQQQQQQQQQQQQQQQQQQQQQQQQQQQO......',
  '..UQQQQqqqQQQQQQQQQQqqqQQQQQQQQU......',
  '...UUUUUUUUUUUUUUUUUUUUUUUUUUUU.......',
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
    O: isSleep ? palette.inkOutline : '#231918',
    H: dim ? '#151824' : '#1E202B',
    h: dim ? '#262B3D' : '#363A4D',
    l: dim ? '#363D57' : '#4E5570',
    s: dim ? '#A68372' : isLate && !lampOn ? '#E3B291' : '#F3C29F',
    d: dim ? '#8A6759' : isLate && !lampOn ? '#C78A6B' : '#D99B78',
    a: dim ? '#694C42' : '#A96E52',
    p: dim ? '#B26F72' : '#E68A82',
    G: '#1E2438',
    L: isLate ? '#93E5FF' : '#DCE8FF',
    R: isLate ? '#67E8F9' : '#EBF4FF',
    c: isLate ? '#7DD3FC' : '#F3C29F',
    E: '#1E202B',
    K: '#2A1C16',
    C: dim ? '#A9A8B8' : '#F2EAD8',
    m: dim ? '#898B9E' : '#D4C8B0',
    B: dim ? '#313A52' : '#4B5568',
    b: dim ? '#465270' : '#697791',
    S: dim ? '#212738' : '#323A4D',
    J: dim ? '#1B2233' : '#283044',
    j: dim ? '#28324A' : '#39445E',
    M: isSleep ? palette.sheetTrim : '#F5EFE6',
    W: isSleep ? palette.quiltLight : '#E5E7EB',
    Q: palette.quiltMid,
    q: palette.quiltPattern,
    U: palette.quiltShadow,
    x: 'rgba(20, 16, 28, 0.36)',
  };
}

const CAPY_ALERT_OPEN: SpriteMatrix = [
  '.....gGGO...........',
  '....OYRRO...........',
  '....ORRUO.OO........',
  '...OOHHHOODO........',
  '.OOHFFFFFHHO........',
  'OKKFFEFFFPFFO.......',
  'OKFFFFFSSSFFOOOOO...',
  '.OOFSSSSFHHHHHHHHHO.',
  '..OFFFFFFFFFFBFFFFFO',
  '..OFFFFFFFFBBBBFFFFO',
  '..OSFFFFFFFBBBBFFSSO',
  '...OSSSSSSBBBBSSSSO.',
  '....ODDOODDOODDOO...',
  '....ODDOODDOODDOO...',
  '....OOOO.OO..OOOO...',
  '...xxxxxx..xxxxxxx..',
  '....................',
];

const CAPY_ALERT_BLINK: SpriteMatrix = [
  '.....gGGO...........',
  '....OYRRO...........',
  '....ORRUO.OO........',
  '...OOHHHOODO........',
  '.OOHFFFFFHHO........',
  'OKKFFKKFFPFFO.......',
  'OKFFFFFSSSFFOOOOO...',
  '.OOFSSSSFHHHHHHHHHO.',
  '..OFFFFFFFFFFBFFFFFO',
  '..OFFFFFFFFBBBBFFFFO',
  '..OSFFFFFFFBBBBFFSSO',
  '...OSSSSSSBBBBSSSSO.',
  '....ODDOODDOODDOO...',
  '....ODDOODDOODDOO...',
  '....OOOO.OO..OOOO...',
  '...xxxxxx..xxxxxxx..',
  '....................',
];

const CAPY_ALERT_EAR: SpriteMatrix = [
  '.....gGGO...........',
  '....OYRRO..O........',
  '....ORRUO.ODO.......',
  '...OOHHHHOOD........',
  '.OOHFFFFFHHO........',
  'OKKFFEFFFPFFO.......',
  'OKFFFFFSSSFFOOOOO...',
  '.OOFSSSSFHHHHHHHHHO.',
  '..OFFFFFFFFFFBFFFFFO',
  '..OFFFFFFFFBBBBFFFFO',
  '..OSFFFFFFFBBBBFFSSO',
  '...OSSSSSSBBBBSSSSO.',
  '....ODDOODDOODDOO...',
  '....ODDOODDOODDOO...',
  '....OOOO.OO..OOOO...',
  '...xxxxxx..xxxxxxx..',
  '....................',
];

const CAPY_HAPPY_BOB: SpriteMatrix = [
  '.....gGGO...........',
  '....OYRRO...........',
  '....ORRUO.OO........',
  '...OOHHHOODO........',
  '.OOHFFKFFHHO........',
  'OKKFFKFKFPFFO.......',
  'OKFFFFFSSSFFOOOOO...',
  '.OOFSSSSFHHHHHHHHHO.',
  '..OFFFFFFFFFFBFFFFFO',
  '..OFFFFFFFFBBBBFFFFO',
  '..OSFFFFFFFBBBBFFSSO',
  '...OSSSSSSBBBBSSSSO.',
  '....ODDOODDOODDOO...',
  '....OOOO.OO..OOOO...',
  '....................',
  '...xxxxxx..xxxxxxx..',
  '....................',
];

const CAPY_SLEEPY_LOAF: SpriteMatrix = [
  '....................',
  '.....gGGO...........',
  '....OYRRO...........',
  '....ORRUO.OO........',
  '...OOHHHOODO........',
  '.OOHFFFFFHHO........',
  'OKKFFKKFFPFFOOOO....',
  'OKFFFFFSSSFFHHHHHHO.',
  '.OOFSSSSFHHFFFFFFFFO',
  '..OFFFFFFFFFBBBFFFFO',
  '..OFFFFFFFFBBBBFFSSO',
  '..OSSSSSSSBBBBSSSSO.',
  '...OSSSSSSSSSSSSSO..',
  '....OOOOOOOOOOOOO...',
  '...xxxxxxxxxxxxxxx..',
  '....................',
];

function getCapyPalette(timeState: RoomTimeState, lampOn: boolean): SpriteColorMap {
  const isSleep = timeState === 'sleeping' && !lampOn;
  return {
    O: '#3B241A',
    K: '#2A1810',
    E: '#2A1810',
    F: isSleep ? '#7E5A44' : '#A67855',
    H: isSleep ? '#987258' : '#C6956F',
    B: isSleep ? '#8A6750' : '#B58966',
    S: isSleep ? '#5D402E' : '#7D563B',
    D: isSleep ? '#452D1E' : '#5C3C28',
    P: isSleep ? '#B46A67' : '#E68A82',
    R: isSleep ? '#C66F00' : '#FB8C00',
    Y: isSleep ? '#CF9B04' : '#FBBC04',
    U: isSleep ? '#A34F00' : '#D96800',
    G: isSleep ? '#288240' : '#34A853',
    g: '#267A3D',
    x: 'rgba(38, 22, 16, 0.34)',
  };
}

const STEAM_FRAMES: readonly SpriteMatrix[] = [
  [
    '......',
    '......',
    '..m...',
    '...m..',
    '...l..',
    '..l...',
    '..h...',
    '...h..',
    '...h..',
    '..h...',
    '..m...',
    '......',
  ],
  [
    '......',
    '...m..',
    '...l..',
    '..l...',
    '..h...',
    '...h..',
    '...h..',
    '..h...',
    '..m...',
    '...m..',
    '...l..',
    '......',
  ],
  [
    '..m...',
    '..l...',
    '...l..',
    '...h..',
    '..h...',
    '..h...',
    '...h..',
    '...m..',
    '..m...',
    '..l...',
    '......',
    '......',
  ],
  [
    '...m..',
    '...l..',
    '..l...',
    '..h...',
    '...h..',
    '..h...',
    '..m...',
    '...m..',
    '...l..',
    '..m...',
    '......',
    '......',
  ],
];

const STEAM_COLORS: SpriteColorMap = {
  h: '#FFF9F0',
  l: '#E2E8F0',
  m: '#94A3B8',
};

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

function drawMonitorScreen(
  ctx: CanvasRenderingContext2D,
  timeState: RoomTimeState,
  t: number
): void {
  if (timeState === 'working' || timeState === 'late_night') {
    const scrollOffset = Math.floor(t / 6) % 4;
    const cursorOn = Math.floor(t / 8) % 2 === 0;
    const matrix = buildEditorScreenMatrix(scrollOffset, cursorOn);
    const colors = timeState === 'late_night' ? MONITOR_CODE_COLORS_NIGHT : MONITOR_CODE_COLORS;
    drawSpriteMatrix(ctx, matrix, colors, 152, 52);
    return;
  }

  if (timeState === 'waking') {
    const frame = Math.floor(t / 8) % 2;
    const matrix = frame === 0 ? MONITOR_WAKING_FRAME_0 : MONITOR_WAKING_FRAME_1;
    drawSpriteMatrix(ctx, matrix, MONITOR_WAKING_COLORS, 152, 52);
    return;
  }

  const ledOn = Math.floor(t / 12) % 2 === 0;
  const matrix = ledOn ? MONITOR_SLEEPING_FRAME_ON : MONITOR_SLEEPING_FRAME_DIM;
  drawSpriteMatrix(ctx, matrix, MONITOR_SLEEPING_COLORS, 152, 52);
}

function drawZzzDrift(
  ctx: CanvasRenderingContext2D,
  originX: number,
  originY: number,
  t: number,
  reducedMotion: boolean
): void {
  if (reducedMotion) {
    drawSpriteMatrix(ctx, Z_SMALL, Z_COLORS, originX, originY - 4);
    drawSpriteMatrix(ctx, Z_LARGE, Z_COLORS, originX + 6, originY - 11);
    return;
  }

  const steps = 32;
  const slots = [0, 11, 22];
  for (let i = 0; i < slots.length; i += 1) {
    const phase = ((t + slots[i]) % steps) / steps;
    const drawX = originX + i * 4 + Math.round(Math.sin(phase * Math.PI * 2) * 1.5);
    const drawY = originY - Math.round(phase * 13);
    const alpha = phase < 0.2 ? phase / 0.2 : phase > 0.72 ? Math.max(0, (1 - phase) / 0.28) : 0.92;
    const mat = i === 1 ? Z_LARGE : Z_SMALL;
    ctx.save();
    ctx.globalAlpha = alpha;
    drawSpriteMatrix(ctx, mat, Z_COLORS, drawX, drawY);
    ctx.restore();
  }
}

function drawLongHoang(
  ctx: CanvasRenderingContext2D,
  timeState: RoomTimeState,
  lampOn: boolean,
  isMusicActive: boolean,
  palette: RoomPalette,
  t: number,
  reducedMotion: boolean
): void {
  const colors = getLongPalette(timeState, lampOn, palette);

  if (timeState === 'working' || timeState === 'late_night') {
    const typingFrame = Math.floor(t / 3) % 3;
    const headBobDown = isMusicActive && !reducedMotion && Math.floor(t / 6) % 2 === 1;
    const matrix = buildLongSeatedMatrix(typingFrame, headBobDown);
    drawSpriteMatrix(ctx, matrix, colors, 161, 74);
    return;
  }

  if (timeState === 'waking') {
    const isBlinking = !reducedMotion && t % 45 >= 42;
    const isSipping = !reducedMotion && Math.floor(t / 24) % 2 === 1;
    const matrix = buildLongWakingMatrix(isBlinking, isSipping);
    drawSpriteMatrix(ctx, matrix, colors, 95, 84);
    return;
  }

  const breathFrame = !reducedMotion && Math.floor(t / 14) % 2 === 1 ? 1 : 0;
  const matrix = breathFrame === 1 ? LONG_SLEEPING_F1 : LONG_SLEEPING_F0;
  drawSpriteMatrix(ctx, matrix, colors, 20, 84);
  drawZzzDrift(ctx, 34, 79, t, reducedMotion);
}

function drawCapybara(
  ctx: CanvasRenderingContext2D,
  timeState: RoomTimeState,
  lampOn: boolean,
  isMusicActive: boolean,
  t: number,
  reducedMotion: boolean
): void {
  const colors = getCapyPalette(timeState, lampOn);

  if (timeState === 'late_night' || timeState === 'sleeping') {
    drawSpriteMatrix(ctx, CAPY_SLEEPY_LOAF, colors, 208, 131);
    if (timeState === 'sleeping') {
      drawZzzDrift(ctx, 204, 128, t + 6, reducedMotion);
    }
    return;
  }

  if (isMusicActive && !reducedMotion && Math.floor(t / 6) % 2 === 1) {
    drawSpriteMatrix(ctx, CAPY_HAPPY_BOB, colors, 208, 130);
    return;
  }

  const isBlinking = !reducedMotion && t % 48 >= 45;
  const isEarTwitch = !reducedMotion && t % 36 >= 33;
  const matrix = isBlinking
    ? CAPY_ALERT_BLINK
    : isEarTwitch
      ? CAPY_ALERT_EAR
      : CAPY_ALERT_OPEN;
  drawSpriteMatrix(ctx, matrix, colors, 208, 131);
}

function drawCoffeeSteam(ctx: CanvasRenderingContext2D, timeState: RoomTimeState, t: number): void {
  if (timeState !== 'waking' && timeState !== 'working') {
    return;
  }
  const frame = Math.floor(t / 4) % STEAM_FRAMES.length;
  ctx.save();
  ctx.globalAlpha = 0.72;
  drawSpriteMatrix(ctx, STEAM_FRAMES[frame], STEAM_COLORS, 138, 66);
  ctx.restore();
}

function drawMusicEffects(
  ctx: CanvasRenderingContext2D,
  isMusicActive: boolean,
  t: number,
  reducedMotion: boolean
): void {
  if (!isMusicActive) {
    return;
  }

  const wooferFrame = !reducedMotion && Math.floor(t / 3) % 2 === 1 ? 1 : 0;
  const wooferMatrix = wooferFrame === 1 ? WOOFER_FRAME_1 : WOOFER_FRAME_0;
  drawSpriteMatrix(ctx, wooferMatrix, WOOFER_COLORS, 118, 68);
  drawSpriteMatrix(ctx, wooferMatrix, WOOFER_COLORS, 212, 68);

  if (reducedMotion) {
    ctx.save();
    ctx.globalAlpha = 0.9;
    drawSpriteMatrix(ctx, NOTE_SINGLE, NOTE_COLORS_GREEN, 120, 48);
    drawSpriteMatrix(ctx, NOTE_DOUBLE, NOTE_COLORS_GOLD, 213, 47);
    ctx.restore();
    return;
  }

  const cycle = 36;
  const notes: readonly {
    baseX: number;
    baseY: number;
    offset: number;
    doubleNote: boolean;
    colors: SpriteColorMap;
    arcAmp: number;
  }[] = [
    { baseX: 121, baseY: 56, offset: 0, doubleNote: false, colors: NOTE_COLORS_GREEN, arcAmp: 3.2 },
    { baseX: 121, baseY: 56, offset: 18, doubleNote: true, colors: NOTE_COLORS_BLUE, arcAmp: -2.8 },
    { baseX: 215, baseY: 56, offset: 9, doubleNote: true, colors: NOTE_COLORS_GOLD, arcAmp: 3.0 },
    { baseX: 215, baseY: 56, offset: 27, doubleNote: false, colors: NOTE_COLORS_GREEN, arcAmp: -3.2 },
  ];

  for (let i = 0; i < notes.length; i += 1) {
    const item = notes[i];
    const phase = ((t + item.offset) % cycle) / cycle;
    const drawX = item.baseX - 3 + Math.round(Math.sin(phase * Math.PI * 2) * item.arcAmp);
    const drawY = item.baseY - Math.round(phase * 24);
    const alpha = phase < 0.16 ? phase / 0.16 : phase > 0.65 ? Math.max(0, (1 - phase) / 0.35) : 0.95;
    const mat = item.doubleNote ? NOTE_DOUBLE : NOTE_SINGLE;
    ctx.save();
    ctx.globalAlpha = alpha;
    drawSpriteMatrix(ctx, mat, item.colors, drawX, drawY);
    ctx.restore();
  }
}

function drawWindowStars(
  ctx: CanvasRenderingContext2D,
  timeState: RoomTimeState,
  t: number
): void {
  if (timeState !== 'late_night' && timeState !== 'sleeping') {
    return;
  }

  for (let i = 0; i < STAR_NODES.length; i += 1) {
    const star = STAR_NODES[i];
    const frame = (Math.floor(t / 5) + star.phase) % 4;
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

function drawHotspotPointer(
  ctx: CanvasRenderingContext2D,
  hoveredHotspot: RoomHotspotId | null,
  selectedHotspot: RoomHotspotId | null,
  hoveredRegion: RoomHotspotRegion | null | undefined,
  t: number,
  reducedMotion: boolean
): void {
  let pointerX: number | null = null;
  let pointerY: number | null = null;

  if (hoveredRegion) {
    pointerX = hoveredRegion.pointerX;
    pointerY = hoveredRegion.pointerY;
  } else {
    const activeId = hoveredHotspot ?? selectedHotspot;
    if (activeId) {
      const anchor = HOTSPOT_POINTER_ANCHORS[activeId];
      pointerX = anchor.pointerX;
      pointerY = anchor.pointerY;
    }
  }

  if (pointerX === null || pointerY === null) {
    return;
  }

  const bounceSteps = [0, 1, 2, 1];
  const bounce = reducedMotion ? 0 : bounceSteps[Math.floor(t / 3) % bounceSteps.length];
  const drawX = Math.max(0, Math.min(311, Math.round(pointerX - 4)));
  const drawY = Math.max(0, Math.round(pointerY - 5 + bounce));
  drawSpriteMatrix(ctx, GBA_POINTER_ARROW, GBA_POINTER_COLORS, drawX, drawY);
}

export function drawCharacterAndEffects(
  ctx: CanvasRenderingContext2D,
  options: {
    timeState: RoomTimeState;
    lampOn: boolean;
    isMusicActive: boolean;
    tick: number;
    palette: RoomPalette;
    hoveredHotspot: RoomHotspotId | null;
    selectedHotspot: RoomHotspotId | null;
    hoveredRegion?: RoomHotspotRegion | null;
    reducedMotion?: boolean;
  }
): void {
  const {
    timeState,
    lampOn,
    isMusicActive,
    tick,
    palette,
    hoveredHotspot,
    selectedHotspot,
    hoveredRegion,
    reducedMotion = false,
  } = options;
  const effectiveTick = reducedMotion ? 0 : Math.max(0, Math.floor(tick));

  drawWindowStars(ctx, timeState, effectiveTick);
  drawMonitorScreen(ctx, timeState, effectiveTick);
  drawCoffeeSteam(ctx, timeState, effectiveTick);
  drawLongHoang(ctx, timeState, lampOn, isMusicActive, palette, effectiveTick, reducedMotion);
  drawCapybara(ctx, timeState, lampOn, isMusicActive, effectiveTick, reducedMotion);
  drawMusicEffects(ctx, isMusicActive, effectiveTick, reducedMotion);
  drawHotspotPointer(ctx, hoveredHotspot, selectedHotspot, hoveredRegion, effectiveTick, reducedMotion);
}
