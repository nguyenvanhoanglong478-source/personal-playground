import { RoomTimeState } from '../../data/workspace';

export interface RoomPalette {
  timeState: RoomTimeState;
  lampOn: boolean;
  outline: string;
  inkOutline: string;
  inkWood: string;
  inkIndigo: string;
  outerWall: string;
  outerTrim: string;
  ceiling: string;
  ceilingTrim: string;
  wallTop: string;
  wallMid: string;
  wallShade: string;
  brickA: string;
  brickB: string;
  brickC: string;
  brickMortar: string;
  chairRailHi: string;
  chairRail: string;
  chairRailSh: string;
  wainscotBg: string;
  wainscotIn: string;
  wainscotHi: string;
  wainscotSh: string;
  baseboard: string;
  floorPlanks: readonly string[];
  floorSeam: string;
  floorJoint: string;
  floorHi: string;
  floorGrain: string;
  terrazzoBase: string;
  terrazzoAlt: string;
  terrazzoLine: string;
  terrazzoTrim: string;
  terrazzoFlecks: readonly string[];
  wallShadow: string;
  castShadow: string;
  softAo: string;
  winFrame: string;
  winFrameHi: string;
  winSill: string;
  winSillHi: string;
  skyTop: string;
  skyMid: string;
  skyLow: string;
  skySunsetUpper: string;
  skySunsetLower: string;
  skyHorizon: string;
  cloudHi: string;
  cloudSh: string;
  treeFar: string;
  treeNear: string;
  cityWinAmber: string;
  cityWinCyan: string;
  birdSilhouette: string;
  moonColor: string;
  moonShadow: string;
  shootingStarCore: string;
  shootingStarTrail: string;
  windowGlassGlare: string;
  fairyWire: string;
  fairyBulbCore: string;
  fairyBulbWarm: string;
  fairyGlowColor: string;
  fairyGlowAlpha: number;
  beamColor: string;
  beamEdge: string;
  moteColor: string;
  windowBeamColor: string;
  windowBeamAlpha: number;
  dustMoteColor: string;
  deskTop: string;
  deskTopHi: string;
  deskTopSh: string;
  deskFront: string;
  deskWalnut: string;
  deskWalnutHi: string;
  deskBirch: string;
  deskBirchHi: string;
  deskLeg: string;
  chairFabric: string;
  chairHi: string;
  chairSh: string;
  chairAlt: string;
  chairAltHi: string;
  chairAltSh: string;
  chairMetal: string;
  nordicRugBg: string;
  nordicRugBorder: string;
  nordicRugAccent: string;
  nordicRugStripe: string;
  kilimBg: string;
  kilimBorder: string;
  kilimAccent: string;
  kilimSage: string;
  sofaBase: string;
  sofaHi: string;
  sofaSh: string;
  sofaPillowA: string;
  sofaPillowB: string;
  blanketA: string;
  blanketB: string;
  pendantShade: string;
  pendantBrass: string;
  pendantGlow: string;
  lampGlow: string;
  pendantHalo: string;
  plantDark: string;
  plantMid: string;
  plantHi: string;
  potFill: string;
  potSh: string;
  fridgeBody: string;
  fridgeHi: string;
  fridgeSh: string;
  chassisRim: string;
  chassisLight: string;
  chassisMid: string;
  chassisShadow: string;
  speakerConeDark: string;
  speakerConeRim: string;
  vinylDisc: string;
  vinylLabel: string;
  lampShadeLight: string;
  lampShadeMid: string;
  lampShadeShadow: string;
  lampBulbGlow: string;
  mugLight: string;
  mugShadow: string;
  coffeeSurface: string;
  cubGreenLight: string;
  cubGreenMid: string;
  cubGreenShadow: string;
  cubCream: string;
  cubSeat: string;
  clockFace: string;
  clockRim: string;
  clockHand: string;
  clockSecondHand: string;
  capySelout: string;
  charSelout: string;
  aoColor: string;
  ambientTint: string;
  ambientAlpha: number;
  lampGlowColor: string;
  lampGlowAlpha: number;
  screenGlowColor: string;
  screenGlowAlpha: number;
}

const BASE_PALETTES: Record<RoomTimeState, Omit<RoomPalette, 'timeState' | 'lampOn'>> = {
  waking: {
    outline: '#241922',
    inkOutline: '#241922',
    inkWood: '#2e201b',
    inkIndigo: '#1c1829',
    outerWall: '#231922',
    outerTrim: '#4d3a44',
    ceiling: '#3b2b32',
    ceilingTrim: '#5c444c',
    wallTop: '#f6ebd8',
    wallMid: '#ebdac0',
    wallShade: '#e0cca9',
    brickA: '#be6f54',
    brickB: '#ae6149',
    brickC: '#ce7f62',
    brickMortar: '#dbc2a2',
    chairRailHi: '#fbf2e2',
    chairRail: '#b48256',
    chairRailSh: '#784e33',
    wainscotBg: '#c69365',
    wainscotIn: '#b27e52',
    wainscotHi: '#e0b082',
    wainscotSh: '#875a3a',
    baseboard: '#5e3c28',
    floorPlanks: ['#dca770', '#d6a069', '#d1a36b', '#e0b37d', '#d9a36c'],
    floorSeam: '#bc8653',
    floorJoint: '#b47d4b',
    floorHi: '#e8ba86',
    floorGrain: '#c7905a',
    terrazzoBase: '#5f6875',
    terrazzoAlt: '#545d6a',
    terrazzoLine: '#414954',
    terrazzoTrim: '#8d97a5',
    terrazzoFlecks: ['#cbd5e1', '#94a3b8', '#e2b687', '#38bdf8'],
    wallShadow: 'rgba(36, 25, 34, 0.18)',
    castShadow: 'rgba(36, 25, 34, 0.23)',
    softAo: 'rgba(36, 25, 34, 0.10)',
    winFrame: '#363e4d',
    winFrameHi: '#566278',
    winSill: '#b68458',
    winSillHi: '#e5b88b',
    skyTop: '#6db7eb',
    skyMid: '#abd9f7',
    skyLow: '#fee6be',
    skySunsetUpper: '#d8dbf4',
    skySunsetLower: '#f9d6b6',
    skyHorizon: '#fee6be',
    cloudHi: '#fffdf8',
    cloudSh: '#e6d6e0',
    treeFar: '#6ca684',
    treeNear: '#478262',
    cityWinAmber: '#fcd368',
    cityWinCyan: '#7dd3fc',
    birdSilhouette: '#3a455e',
    moonColor: '#fff7ce',
    moonShadow: '#dfce8c',
    shootingStarCore: '#fffdf4',
    shootingStarTrail: '#d9ecff',
    windowGlassGlare: '#fffdf5',
    fairyWire: '#4d3f3e',
    fairyBulbCore: '#ece3ce',
    fairyBulbWarm: '#d6ba8a',
    fairyGlowColor: '#ffd584',
    fairyGlowAlpha: 0,
    beamColor: 'rgba(255, 232, 163, 0.20)',
    beamEdge: 'rgba(255, 232, 163, 0.09)',
    moteColor: 'rgba(255, 248, 212, 0.78)',
    windowBeamColor: '#ffe8a3',
    windowBeamAlpha: 0.22,
    dustMoteColor: '#fff8d4',
    deskTop: '#d7995f',
    deskTopHi: '#ecb882',
    deskTopSh: '#ba7c47',
    deskFront: '#8e562f',
    deskWalnut: '#9f6a45',
    deskWalnutHi: '#bd845b',
    deskBirch: '#e2c399',
    deskBirchHi: '#f3dab4',
    deskLeg: '#3d3e4a',
    chairFabric: '#3c6e78',
    chairHi: '#58939e',
    chairSh: '#264850',
    chairAlt: '#5f556e',
    chairAltHi: '#7e728f',
    chairAltSh: '#3f384a',
    chairMetal: '#373a46',
    nordicRugBg: '#eee4d1',
    nordicRugBorder: '#4f6968',
    nordicRugAccent: '#cc744e',
    nordicRugStripe: '#d6c5aa',
    kilimBg: '#ac4a42',
    kilimBorder: '#6e2c29',
    kilimAccent: '#efd7a8',
    kilimSage: '#51856f',
    sofaBase: '#447980',
    sofaHi: '#659fa7',
    sofaSh: '#2d5258',
    sofaPillowA: '#e89d57',
    sofaPillowB: '#dc6c5e',
    blanketA: '#f4e1bb',
    blanketB: '#dcb881',
    pendantShade: '#2e333f',
    pendantBrass: '#dca046',
    pendantGlow: '#ffe99e',
    lampGlow: 'rgba(255, 222, 132, 0.16)',
    pendantHalo: 'rgba(255, 230, 150, 0.14)',
    plantDark: '#255c3c',
    plantMid: '#3a8a53',
    plantHi: '#68c06d',
    potFill: '#cf714b',
    potSh: '#96482c',
    fridgeBody: '#bbe2d5',
    fridgeHi: '#dff8ef',
    fridgeSh: '#87b8a9',
    chassisRim: '#6d7a96',
    chassisLight: '#54607a',
    chassisMid: '#3a4257',
    chassisShadow: '#252b3b',
    speakerConeDark: '#1e2231',
    speakerConeRim: '#78829e',
    vinylDisc: '#1c202e',
    vinylLabel: '#e05347',
    lampShadeLight: '#f4c96b',
    lampShadeMid: '#d99b43',
    lampShadeShadow: '#a16e24',
    lampBulbGlow: '#ffe68f',
    mugLight: '#fff9ec',
    mugShadow: '#d2c2ae',
    coffeeSurface: '#5c3422',
    cubGreenLight: '#7ad090',
    cubGreenMid: '#4ba769',
    cubGreenShadow: '#307748',
    cubCream: '#f8eed7',
    cubSeat: '#ba6e40',
    clockFace: '#f8fafc',
    clockRim: '#d99b43',
    clockHand: '#1e293b',
    clockSecondHand: '#dc2626',
    capySelout: '#1c1829',
    charSelout: '#1c1829',
    aoColor: '#54362d',
    ambientTint: '#ffe3ad',
    ambientAlpha: 0.05,
    lampGlowColor: '#ffce75',
    lampGlowAlpha: 0.16,
    screenGlowColor: '#8fd6ff',
    screenGlowAlpha: 0.08,
  },
  working: {
    outline: '#241922',
    inkOutline: '#241922',
    inkWood: '#2e201b',
    inkIndigo: '#1c1829',
    outerWall: '#231922',
    outerTrim: '#4d3a44',
    ceiling: '#3b2b32',
    ceilingTrim: '#5c444c',
    wallTop: '#f5ead7',
    wallMid: '#ebdac0',
    wallShade: '#dfcaa8',
    brickA: '#ba6c52',
    brickB: '#ab5e46',
    brickC: '#c97b5f',
    brickMortar: '#d8be9e',
    chairRailHi: '#fbf2e2',
    chairRail: '#b48256',
    chairRailSh: '#784e33',
    wainscotBg: '#c59264',
    wainscotIn: '#b17d51',
    wainscotHi: '#dcab7e',
    wainscotSh: '#845738',
    baseboard: '#5e3c28',
    floorPlanks: ['#d9a46d', '#d39d66', '#cea068', '#ddb07a', '#d6a069'],
    floorSeam: '#ba8350',
    floorJoint: '#b27a48',
    floorHi: '#e3b582',
    floorGrain: '#c48d57',
    terrazzoBase: '#5d6673',
    terrazzoAlt: '#525b68',
    terrazzoLine: '#3f4752',
    terrazzoTrim: '#8b95a3',
    terrazzoFlecks: ['#cbd5e1', '#94a3b8', '#e2b687', '#38bdf8'],
    wallShadow: 'rgba(36, 25, 34, 0.20)',
    castShadow: 'rgba(36, 25, 34, 0.25)',
    softAo: 'rgba(36, 25, 34, 0.11)',
    winFrame: '#333b48',
    winFrameHi: '#525d70',
    winSill: '#b48256',
    winSillHi: '#e2b588',
    skyTop: '#6ec0fa',
    skyMid: '#9cd7fc',
    skyLow: '#d5f0ff',
    skySunsetUpper: '#b5e2fd',
    skySunsetLower: '#cbebfe',
    skyHorizon: '#d5f0ff',
    cloudHi: '#ffffff',
    cloudSh: '#cde5f8',
    treeFar: '#6ca684',
    treeNear: '#478262',
    cityWinAmber: '#fde68a',
    cityWinCyan: '#bae6fd',
    birdSilhouette: '#2d3e5e',
    moonColor: '#fff7ce',
    moonShadow: '#dfce8c',
    shootingStarCore: '#ffffff',
    shootingStarTrail: '#cfe8ff',
    windowGlassGlare: '#ffffff',
    fairyWire: '#4a3d3b',
    fairyBulbCore: '#e6dfce',
    fairyBulbWarm: '#ceb489',
    fairyGlowColor: '#ffd27a',
    fairyGlowAlpha: 0,
    beamColor: 'rgba(255, 245, 196, 0.16)',
    beamEdge: 'rgba(255, 245, 196, 0.08)',
    moteColor: 'rgba(255, 251, 214, 0.72)',
    windowBeamColor: '#fff5c4',
    windowBeamAlpha: 0.16,
    dustMoteColor: '#fffbe0',
    deskTop: '#d4965c',
    deskTopHi: '#e9b57f',
    deskTopSh: '#b87a45',
    deskFront: '#8c542d',
    deskWalnut: '#9c6742',
    deskWalnutHi: '#ba8158',
    deskBirch: '#dfc096',
    deskBirchHi: '#f0d7b1',
    deskLeg: '#3d3e4a',
    chairFabric: '#396b75',
    chairHi: '#55909b',
    chairSh: '#24464e',
    chairAlt: '#5d536b',
    chairAltHi: '#7b6f8c',
    chairAltSh: '#3d3647',
    chairMetal: '#373a46',
    nordicRugBg: '#ece2cf',
    nordicRugBorder: '#4e6766',
    nordicRugAccent: '#c9714b',
    nordicRugStripe: '#d4c3a8',
    kilimBg: '#a8473f',
    kilimBorder: '#6b2a27',
    kilimAccent: '#edd5a6',
    kilimSage: '#4f826c',
    sofaBase: '#42767d',
    sofaHi: '#629ca4',
    sofaSh: '#2b5056',
    sofaPillowA: '#e59a54',
    sofaPillowB: '#d9695b',
    blanketA: '#f2dfb9',
    blanketB: '#d9b57e',
    pendantShade: '#2e333f',
    pendantBrass: '#d99b43',
    pendantGlow: '#ffe594',
    lampGlow: 'rgba(255, 222, 132, 0.14)',
    pendantHalo: 'rgba(255, 230, 150, 0.12)',
    plantDark: '#23593a',
    plantMid: '#378750',
    plantHi: '#65bd6a',
    potFill: '#cc6e48',
    potSh: '#94462a',
    fridgeBody: '#b8dfd2',
    fridgeHi: '#dcf5ec',
    fridgeSh: '#84b5a6',
    chassisRim: '#6a7791',
    chassisLight: '#515d75',
    chassisMid: '#373f54',
    chassisShadow: '#232838',
    speakerConeDark: '#1e2230',
    speakerConeRim: '#727c98',
    vinylDisc: '#191d2b',
    vinylLabel: '#dc4f43',
    lampShadeLight: '#efc363',
    lampShadeMid: '#d99b43',
    lampShadeShadow: '#9e6b22',
    lampBulbGlow: '#ffe384',
    mugLight: '#fff9ed',
    mugShadow: '#cfc0ac',
    coffeeSurface: '#593221',
    cubGreenLight: '#73c788',
    cubGreenMid: '#479f64',
    cubGreenShadow: '#2e7245',
    cubCream: '#f5ead1',
    cubSeat: '#b36a3d',
    clockFace: '#f8fafc',
    clockRim: '#d99b43',
    clockHand: '#1e293b',
    clockSecondHand: '#dc2626',
    capySelout: '#1c1829',
    charSelout: '#1c1829',
    aoColor: '#52342b',
    ambientTint: '#fff7e0',
    ambientAlpha: 0,
    lampGlowColor: '#ffca6c',
    lampGlowAlpha: 0.14,
    screenGlowColor: '#75d5ff',
    screenGlowAlpha: 0.09,
  },
  late_night: {
    outline: '#11101b',
    inkOutline: '#11101b',
    inkWood: '#1f161b',
    inkIndigo: '#161529',
    outerWall: '#0f0f1a',
    outerTrim: '#262538',
    ceiling: '#191827',
    ceilingTrim: '#2d2c42',
    wallTop: '#262a40',
    wallMid: '#202437',
    wallShade: '#191c2d',
    brickA: '#4c3239',
    brickB: '#402930',
    brickC: '#5b3c43',
    brickMortar: '#28212b',
    chairRailHi: '#4a4d68',
    chairRail: '#32344b',
    chairRailSh: '#171826',
    wainscotBg: '#272436',
    wainscotIn: '#1f1d2c',
    wainscotHi: '#39354d',
    wainscotSh: '#13121d',
    baseboard: '#151421',
    floorPlanks: ['#473732', '#42332e', '#3e2f2b', '#4b3a35', '#44342f'],
    floorSeam: '#322521',
    floorJoint: '#2e221e',
    floorHi: '#52403a',
    floorGrain: '#392b27',
    terrazzoBase: '#212636',
    terrazzoAlt: '#1b202e',
    terrazzoLine: '#121520',
    terrazzoTrim: '#3a4259',
    terrazzoFlecks: ['#475569', '#38bdf8', '#64748b', '#a855f7'],
    wallShadow: 'rgba(6, 6, 14, 0.44)',
    castShadow: 'rgba(6, 6, 14, 0.48)',
    softAo: 'rgba(6, 6, 14, 0.22)',
    winFrame: '#191b26',
    winFrameHi: '#2f3447',
    winSill: '#403338',
    winSillHi: '#5e4c52',
    skyTop: '#0b122b',
    skyMid: '#152046',
    skyLow: '#233363',
    skySunsetUpper: '#4c3b73',
    skySunsetLower: '#9e536e',
    skyHorizon: '#2b3366',
    cloudHi: '#415382',
    cloudSh: '#29375e',
    treeFar: '#16203d',
    treeNear: '#0f162c',
    cityWinAmber: '#fde047',
    cityWinCyan: '#38bdf8',
    birdSilhouette: '#2c2147',
    moonColor: '#fef9c3',
    moonShadow: '#c7ae6e',
    shootingStarCore: '#fff5cc',
    shootingStarTrail: '#b8a6e8',
    windowGlassGlare: '#e0cef0',
    fairyWire: '#334155',
    fairyBulbCore: '#fff4c2',
    fairyBulbWarm: '#fdba74',
    fairyGlowColor: '#ffba54',
    fairyGlowAlpha: 0.56,
    beamColor: 'rgba(130, 175, 255, 0.08)',
    beamEdge: 'rgba(130, 175, 255, 0.04)',
    moteColor: 'rgba(255, 232, 160, 0.55)',
    windowBeamColor: '#9db8ff',
    windowBeamAlpha: 0.12,
    dustMoteColor: '#ffe5b4',
    deskTop: '#7a5038',
    deskTopHi: '#966549',
    deskTopSh: '#5e3b28',
    deskFront: '#442a1b',
    deskWalnut: '#593b2d',
    deskWalnutHi: '#704d3c',
    deskBirch: '#856649',
    deskBirchHi: '#9e7c5b',
    deskLeg: '#252633',
    chairFabric: '#294f5a',
    chairHi: '#3d6e7c',
    chairSh: '#18333b',
    chairAlt: '#3b344d',
    chairAltHi: '#52496b',
    chairAltSh: '#252031',
    chairMetal: '#222430',
    nordicRugBg: '#373545',
    nordicRugBorder: '#263a3e',
    nordicRugAccent: '#80483a',
    nordicRugStripe: '#4b485c',
    kilimBg: '#6b2c2c',
    kilimBorder: '#421819',
    kilimAccent: '#b09670',
    kilimSage: '#355c4b',
    sofaBase: '#2f535c',
    sofaHi: '#46747f',
    sofaSh: '#1e373e',
    sofaPillowA: '#b8733d',
    sofaPillowB: '#9e4740',
    blanketA: '#9a8b72',
    blanketB: '#736552',
    pendantShade: '#191b24',
    pendantBrass: '#b37a32',
    pendantGlow: '#ffda75',
    lampGlow: 'rgba(255, 194, 88, 0.24)',
    pendantHalo: 'rgba(255, 200, 100, 0.20)',
    plantDark: '#173d28',
    plantMid: '#26613c',
    plantHi: '#3f8a4c',
    potFill: '#964e34',
    potSh: '#63301f',
    fridgeBody: '#486b66',
    fridgeHi: '#628c85',
    fridgeSh: '#304a46',
    chassisRim: '#5b6682',
    chassisLight: '#47506b',
    chassisMid: '#30374d',
    chassisShadow: '#1f2333',
    speakerConeDark: '#191c2b',
    speakerConeRim: '#5e6887',
    vinylDisc: '#161926',
    vinylLabel: '#c94942',
    lampShadeLight: '#e8b75c',
    lampShadeMid: '#b98336',
    lampShadeShadow: '#855a22',
    lampBulbGlow: '#ffdf7d',
    mugLight: '#dfd5cc',
    mugShadow: '#a79992',
    coffeeSurface: '#45261b',
    cubGreenLight: '#60a575',
    cubGreenMid: '#3d7e54',
    cubGreenShadow: '#27593a',
    cubCream: '#d1c5b2',
    cubSeat: '#8b5135',
    clockFace: '#dbd1e2',
    clockRim: '#b37a32',
    clockHand: '#1e293b',
    clockSecondHand: '#d96459',
    capySelout: '#1c1829',
    charSelout: '#1c1829',
    aoColor: '#2d1e29',
    ambientTint: '#111430',
    ambientAlpha: 0.14,
    lampGlowColor: '#ffb857',
    lampGlowAlpha: 0.42,
    screenGlowColor: '#69d2ff',
    screenGlowAlpha: 0.22,
  },
  sleeping: {
    outline: '#0d0c17',
    inkOutline: '#0d0c17',
    inkWood: '#18131b',
    inkIndigo: '#131426',
    outerWall: '#0b0b14',
    outerTrim: '#1f1e30',
    ceiling: '#131220',
    ceilingTrim: '#242336',
    wallTop: '#1d2033',
    wallMid: '#181b2b',
    wallShade: '#131624',
    brickA: '#3d2830',
    brickB: '#332028',
    brickC: '#4a313a',
    brickMortar: '#201a24',
    chairRailHi: '#3a3d54',
    chairRail: '#26283b',
    chairRailSh: '#12131f',
    wainscotBg: '#1e1c2b',
    wainscotIn: '#181624',
    wainscotHi: '#2d2a3f',
    wainscotSh: '#0f0e17',
    baseboard: '#11101c',
    floorPlanks: ['#382c2a', '#342927', '#302524', '#3c2f2d', '#362a28'],
    floorSeam: '#261d1b',
    floorJoint: '#231a18',
    floorHi: '#423431',
    floorGrain: '#2c2220',
    terrazzoBase: '#1a1e2b',
    terrazzoAlt: '#151924',
    terrazzoLine: '#0d1018',
    terrazzoTrim: '#2e354a',
    terrazzoFlecks: ['#334155', '#2563eb', '#475569', '#7c3aed'],
    wallShadow: 'rgba(4, 4, 12, 0.50)',
    castShadow: 'rgba(4, 4, 12, 0.54)',
    softAo: 'rgba(4, 4, 12, 0.26)',
    winFrame: '#141620',
    winFrameHi: '#262b3d',
    winSill: '#33282e',
    winSillHi: '#4d3e45',
    skyTop: '#070c1f',
    skyMid: '#0f1838',
    skyLow: '#1a2752',
    skySunsetUpper: '#141f45',
    skySunsetLower: '#192650',
    skyHorizon: '#1d2b57',
    cloudHi: '#34446e',
    cloudSh: '#212c4d',
    treeFar: '#121a33',
    treeNear: '#0b1022',
    cityWinAmber: '#eab308',
    cityWinCyan: '#0284c7',
    birdSilhouette: '#192242',
    moonColor: '#fff6c0',
    moonShadow: '#cfc07d',
    shootingStarCore: '#ffffff',
    shootingStarTrail: '#8fb8ff',
    windowGlassGlare: '#8ba6db',
    fairyWire: '#28263a',
    fairyBulbCore: '#4d5170',
    fairyBulbWarm: '#3a3d57',
    fairyGlowColor: '#8ca8ff',
    fairyGlowAlpha: 0,
    beamColor: 'rgba(130, 175, 255, 0.12)',
    beamEdge: 'rgba(130, 175, 255, 0.05)',
    moteColor: 'rgba(184, 206, 255, 0.45)',
    windowBeamColor: '#9dbeff',
    windowBeamAlpha: 0.16,
    dustMoteColor: '#b8ceff',
    deskTop: '#5e3f2f',
    deskTopHi: '#75503c',
    deskTopSh: '#472e21',
    deskFront: '#332016',
    deskWalnut: '#473026',
    deskWalnutHi: '#593e32',
    deskBirch: '#69513c',
    deskBirchHi: '#7d624a',
    deskLeg: '#1b1c29',
    chairFabric: '#203d47',
    chairHi: '#2f5663',
    chairSh: '#12262e',
    chairAlt: '#2e283d',
    chairAltHi: '#403854',
    chairAltSh: '#1d1926',
    chairMetal: '#191b26',
    nordicRugBg: '#2b2938',
    nordicRugBorder: '#1d2d30',
    nordicRugAccent: '#63372e',
    nordicRugStripe: '#3a384a',
    kilimBg: '#542224',
    kilimBorder: '#331214',
    kilimAccent: '#8c775a',
    kilimSage: '#28473a',
    sofaBase: '#244048',
    sofaHi: '#365b66',
    sofaSh: '#172a30',
    sofaPillowA: '#8f5931',
    sofaPillowB: '#7a3733',
    blanketA: '#7a6e5c',
    blanketB: '#595043',
    pendantShade: '#14161f',
    pendantBrass: '#7d5626',
    pendantGlow: '#474354',
    lampGlow: 'rgba(255, 184, 89, 0.18)',
    pendantHalo: 'rgba(255, 200, 100, 0.10)',
    plantDark: '#123020',
    plantMid: '#1e4d30',
    plantHi: '#326e3d',
    potFill: '#753d2a',
    potSh: '#4d2518',
    fridgeBody: '#385450',
    fridgeHi: '#4d706b',
    fridgeSh: '#243835',
    chassisRim: '#48506e',
    chassisLight: '#3b425c',
    chassisMid: '#282d42',
    chassisShadow: '#1a1e2e',
    speakerConeDark: '#131724',
    speakerConeRim: '#434a66',
    vinylDisc: '#121521',
    vinylLabel: '#8f393b',
    lampShadeLight: '#8f785a',
    lampShadeMid: '#6e5a44',
    lampShadeShadow: '#4f3f32',
    lampBulbGlow: '#ffdb78',
    mugLight: '#96939e',
    mugShadow: '#6e6b78',
    coffeeSurface: '#2e1c1a',
    cubGreenLight: '#467461',
    cubGreenMid: '#305849',
    cubGreenShadow: '#1f3e34',
    cubCream: '#948f96',
    cubSeat: '#5c3b33',
    clockFace: '#999db8',
    clockRim: '#6b4e3b',
    clockHand: '#1d1a2b',
    clockSecondHand: '#784a58',
    capySelout: '#1c1829',
    charSelout: '#1c1829',
    aoColor: '#1b1829',
    ambientTint: '#090d24',
    ambientAlpha: 0.34,
    lampGlowColor: '#ffb859',
    lampGlowAlpha: 0,
    screenGlowColor: '#4d7db8',
    screenGlowAlpha: 0.05,
  },
};

export function getRoomPalette(timeState: RoomTimeState, lampOn: boolean): RoomPalette {
  const base = BASE_PALETTES[timeState];

  if (timeState === 'late_night') {
    return {
      ...base,
      timeState,
      lampOn,
      ambientAlpha: lampOn ? 0.12 : 0.24,
      lampGlowAlpha: lampOn ? 0.44 : 0,
      lampShadeLight: lampOn ? '#f5cb6e' : '#7a6f75',
      lampShadeMid: lampOn ? '#cd923b' : '#5e545c',
      lampShadeShadow: lampOn ? '#996523' : '#423a42',
      pendantGlow: lampOn ? '#ffdf7d' : '#7a727a',
    };
  }

  if (timeState === 'sleeping') {
    return {
      ...base,
      timeState,
      lampOn,
      ambientAlpha: lampOn ? 0.22 : 0.34,
      lampGlowAlpha: lampOn ? 0.38 : 0,
      lampShadeLight: lampOn ? '#f4c86a' : base.lampShadeLight,
      lampShadeMid: lampOn ? '#c78e38' : base.lampShadeMid,
      lampShadeShadow: lampOn ? '#8f5e22' : base.lampShadeShadow,
      pendantGlow: lampOn ? '#ffda78' : base.pendantGlow,
      fairyBulbCore: lampOn ? '#ffe79c' : base.fairyBulbCore,
      fairyBulbWarm: lampOn ? '#e8a84a' : base.fairyBulbWarm,
      fairyGlowAlpha: lampOn ? 0.28 : 0,
    };
  }

  return {
    ...base,
    timeState,
    lampOn,
    ambientAlpha: lampOn ? Math.max(0, base.ambientAlpha - 0.02) : base.ambientAlpha,
    lampGlowAlpha: lampOn ? base.lampGlowAlpha : 0,
    pendantGlow: lampOn ? base.pendantGlow : '#c9c2b2',
  };
}
