import { Locale } from './profile';

export const PACKS_PER_BOX = 12;
export const CARDS_PER_PACK = 10;
export const POKEMON_CARD_BACK_URL = './pokemon/card-back.jpg';
export const POKEMON_STORAGE_KEY = 'longhoang_pokemon_box_v1';

export type PokemonCardTier =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'ultra'
  | 'secret';

export type PokemonFoilStyle =
  | 'none'
  | 'holo-regular'
  | 'holo-cosmos'
  | 'holo-v'
  | 'holo-vmax'
  | 'holo-fullart'
  | 'holo-shiny'
  | 'holo-sir'
  | 'holo-rainbow'
  | 'holo-gold'
  | 'holo-acespec';

export type BoxThemeId =
  | 'all'
  | 'sv3pt5'
  | 'swsh12pt5'
  | 'swsh7'
  | 'sv8pt5'
  | 'sv4pt5'
  | 'base1';

export type BinderSortMode =
  | 'rarity_desc'
  | 'price_desc'
  | 'price_asc'
  | 'power_desc'
  | 'hp_desc'
  | 'name_asc';

export interface PokemonCatalogCard {
  id: string;
  name: string;
  set: string;
  num: string;
  rarity: string;
  tier: PokemonCardTier;
  type: string;
  hp?: number;
  atk?: number;
  power?: number;
  price?: number;
  img?: string;
}

export interface PokemonCatalogData {
  sets: Record<string, string>;
  cards: PokemonCatalogCard[];
}

export interface BoosterBoxOption {
  id: BoxThemeId;
  setIds: string[] | null;
  label: { vi: string; en: string };
  packTag: string;
  accentGradient: string;
}

export interface SavedBoxState {
  boxId: BoxThemeId;
  packsRemaining: number;
  totalPacksOpened: number;
  collection: Record<string, number>;
  soundEnabled: boolean;
}

export const BOOSTER_BOX_OPTIONS: BoosterBoxOption[] = [
  {
    id: 'all',
    setIds: null,
    label: { vi: 'All-Star Mix (Tất cả bộ)', en: 'All-Star Mix (All Sets)' },
    packTag: 'ALL-STAR COLLECTION',
    accentGradient: 'linear-gradient(145deg, #16181f 0%, #242936 52%, #13151b 100%)',
  },
  {
    id: 'sv3pt5',
    setIds: ['sv3pt5'],
    label: { vi: 'Scarlet & Violet: 151', en: 'Scarlet & Violet: 151' },
    packTag: 'SV 151 · KANTO',
    accentGradient: 'linear-gradient(145deg, #1b1724 0%, #2c2038 52%, #14131a 100%)',
  },
  {
    id: 'swsh12pt5',
    setIds: ['swsh12pt5', 'swsh12pt5gg'],
    label: { vi: 'Crown Zenith + Gallery', en: 'Crown Zenith + Gallery' },
    packTag: 'CROWN ZENITH',
    accentGradient: 'linear-gradient(145deg, #171a24 0%, #262e42 52%, #12141c 100%)',
  },
  {
    id: 'swsh7',
    setIds: ['swsh7'],
    label: { vi: 'Evolving Skies', en: 'Evolving Skies' },
    packTag: 'EVOLVING SKIES',
    accentGradient: 'linear-gradient(145deg, #121c22 0%, #1d323b 52%, #10161a 100%)',
  },
  {
    id: 'sv8pt5',
    setIds: ['sv8pt5'],
    label: { vi: 'Prismatic Evolutions', en: 'Prismatic Evolutions' },
    packTag: 'PRISMATIC EVOLUTIONS',
    accentGradient: 'linear-gradient(145deg, #1e1824 0%, #2f2538 52%, #141319 100%)',
  },
  {
    id: 'sv4pt5',
    setIds: ['sv4pt5'],
    label: { vi: 'Paldean Fates', en: 'Paldean Fates' },
    packTag: 'PALDEAN FATES',
    accentGradient: 'linear-gradient(145deg, #161b22 0%, #23303d 52%, #12151a 100%)',
  },
  {
    id: 'base1',
    setIds: ['base1'],
    label: { vi: 'Base Set (1999)', en: 'Base Set (1999)' },
    packTag: 'CLASSIC 1999',
    accentGradient: 'linear-gradient(145deg, #211915 0%, #38281c 52%, #161311 100%)',
  },
];

export const TIER_LIST: PokemonCardTier[] = [
  'common',
  'uncommon',
  'rare',
  'ultra',
  'secret',
];

export const TIER_ORDER: Record<PokemonCardTier, number> = {
  common: 0,
  uncommon: 1,
  rare: 2,
  ultra: 3,
  secret: 4,
};

export const TIER_LABELS: Record<Locale, Record<PokemonCardTier, string>> = {
  vi: {
    common: 'Thường',
    uncommon: 'Ít gặp',
    rare: 'Hiếm',
    ultra: 'Cực hiếm',
    secret: 'Bí mật',
  },
  en: {
    common: 'Common',
    uncommon: 'Uncommon',
    rare: 'Rare',
    ultra: 'Ultra Rare',
    secret: 'Secret Hit',
  },
};

export const FOIL_STYLE_LABELS: Record<Locale, Record<PokemonFoilStyle, string>> = {
  vi: {
    none: 'Giấy mờ (Non-Holo)',
    'holo-regular': 'Holo ánh gương',
    'holo-cosmos': 'Holo sao vũ trụ',
    'holo-v': 'Holo lăng kính V / ex',
    'holo-vmax': 'Vân nổi VMAX / VSTAR',
    'holo-fullart': 'Full Art vân nổi',
    'holo-shiny': 'Ánh kim lưới Shiny',
    'holo-sir': 'Lăng kính vân nổi SIR',
    'holo-rainbow': 'Cầu vồng Rainbow',
    'holo-gold': 'Vàng ánh kim 24K',
    'holo-acespec': 'Pha lê hồng ACE SPEC',
  },
  en: {
    none: 'Matte (Non-Holo)',
    'holo-regular': 'Classic Mirror Holo',
    'holo-cosmos': 'Cosmos Galaxy Holo',
    'holo-v': 'Prism Foil (V / ex)',
    'holo-vmax': 'Etched VMAX / VSTAR',
    'holo-fullart': 'Textured Full Art',
    'holo-shiny': 'Crosshatch Shiny Foil',
    'holo-sir': 'Etched Prism SIR',
    'holo-rainbow': 'Iridescent Rainbow',
    'holo-gold': '24K Etched Gold',
    'holo-acespec': 'Magenta Crystal ACE',
  },
};

export function getCardFoilStyle(card: PokemonCatalogCard): PokemonFoilStyle {
  const r = card.rarity.trim().toLowerCase();
  if (!r || r === 'common' || r === 'uncommon' || r === 'none') {
    return 'none';
  }
  if (r === 'rare') {
    return card.set.toLowerCase().startsWith('sv') ? 'holo-regular' : 'none';
  }
  if (r.includes('rainbow')) {
    return 'holo-rainbow';
  }
  if (r.includes('hyper') || r.includes('secret') || r.includes('gold')) {
    return 'holo-gold';
  }
  if (r.includes('ace spec')) {
    return 'holo-acespec';
  }
  if (r.includes('special illustration') || r.includes('shiny ultra')) {
    return 'holo-sir';
  }
  if (r.includes('radiant') || r.includes('shiny') || r.includes('amazing')) {
    return 'holo-shiny';
  }
  if (r.includes('vmax') || r.includes('vstar')) {
    return 'holo-vmax';
  }
  if (r.includes('illustration') || r.includes('ultra')) {
    return 'holo-fullart';
  }
  if (r.includes('double rare') || r.includes('holo v') || r.includes('holo ex') || r.includes('holo gx')) {
    return 'holo-v';
  }
  if (r.includes('cosmos') || (r === 'rare holo' && card.set.toLowerCase() === 'base1')) {
    return 'holo-cosmos';
  }
  if (r.includes('holo') || r.includes('trainer gallery')) {
    return 'holo-regular';
  }
  return 'none';
}

export const POKEMON_UNBOXER_LABELS = {
  vi: {
    kicker: 'POKÉMON BOX',
    boxSelectAria: 'Chọn hộp bài Pokémon',
    soundOnAria: 'Tắt âm thanh mở pack',
    soundOffAria: 'Bật âm thanh mở pack',
    packsLeft: (left: number) => `${left}/${PACKS_PER_BOX} pack`,
    packBadge: (packNum: number) => `PACK #${packNum} / ${PACKS_PER_BOX}`,
    cardsPerPack: `${CARDS_PER_PACK} thẻ ngẫu nhiên`,
    tearHint: 'Kéo ngang hoặc bấm để xé pack',
    ripButton: 'Xé pack ngay',
    rippingLabel: 'Đang xé mép pack...',
    drawingLabel: 'Đang rút 10 thẻ ra khỏi pack...',
    cardCounter: (idx: number) => `Thẻ ${idx} / ${CARDS_PER_PACK}`,
    tapToFlip: 'Bấm thẻ để lật',
    flipCardBtn: (idx: number) => `Lật thẻ #${idx}`,
    nextCard: 'Thẻ tiếp',
    finishPack: 'Xem 10 thẻ',
    revealAll: 'Lật nhanh',
    inspectCard: 'Phóng to 3D',
    summaryTitle: (packNum: number) => `Kết quả Pack #${packNum}`,
    hitsLabel: (hits: number) => `${hits} thẻ hiếm`,
    nextPackBtn: (nextNum: number) => `Xé Pack #${nextNum}/${PACKS_PER_BOX}`,
    boxDoneTitle: 'Đã mở hết 12/12 pack trong hộp này',
    newBoxBtn: 'Mở hộp mới (12 pack)',
    freshBoxShort: 'Hộp mới',
    collectionBtn: (unique: number) => `Bộ sưu tập (${unique})`,
    catalogCount: (count: number) => `${count.toLocaleString('vi-VN')} thẻ`,
    loadingCatalog: 'Đang tải kho thẻ Pokémon...',
    loadError: 'Không tải được dữ liệu thẻ. Bấm để thử lại.',
    retryBtn: 'Thử lại',
    binderTitle: 'Bộ sưu tập đã mở',
    binderSub: (unique: number, total: number, packs: number, valStr: string) =>
      `${unique} mẫu · ${total} thẻ · ${packs} pack · Giá trị ${valStr}`,
    filterAll: 'Tất cả',
    rarityFilterAria: 'Lọc theo độ hiếm',
    valueFilterAria: 'Lọc theo giá trị',
    powerFilterAria: 'Lọc theo sức mạnh',
    sortAria: 'Sắp xếp thẻ',
    valueAny: 'Mọi giá trị',
    valueMin: (v: number) => `Giá ≥ $${v}`,
    powerAny: 'Mọi sức mạnh',
    powerMin: (v: number) => `Sức mạnh ≥ ${v}`,
    sortRarityDesc: 'Độ hiếm cao nhất',
    sortPriceDesc: 'Giá trị cao nhất',
    sortPriceAsc: 'Giá trị thấp nhất',
    sortPowerDesc: 'Sức mạnh cao nhất',
    sortHpDesc: 'HP cao nhất',
    sortNameAsc: 'Tên A → Z',
    resetFilters: 'Xóa lọc',
    searchPlaceholder: 'Tìm tên Pokémon hoặc bộ thẻ...',
    emptyBinder: 'Chưa có thẻ nào. Hãy xé pack đầu tiên để bắt đầu sưu tập.',
    emptySearch: 'Không có thẻ nào khớp bộ lọc hiện tại.',
    loadMore: (rem: number) => `Xem thêm (${rem})`,
    resetCollection: 'Xóa bộ sưu tập',
    closeModal: 'Đóng',
    ownedLabel: (n: number) => `Đang có ×${n}`,
    setLabel: 'Bộ thẻ',
    rarityLabel: 'Độ hiếm',
    typeLabel: 'Hệ',
    hpLabel: 'HP',
    atkLabel: 'Sát thương',
    powerLabel: 'Sức mạnh',
    valueLabel: 'Giá thị trường',
    foilLabel: 'Hiệu ứng foil',
    tiltHint: 'Rê chuột hoặc chạm kéo để soi ánh foil 3D',
  },
  en: {
    kicker: 'POKÉMON BOX',
    boxSelectAria: 'Choose Pokémon Booster Box',
    soundOnAria: 'Mute pack sound effects',
    soundOffAria: 'Unmute pack sound effects',
    packsLeft: (left: number) => `${left}/${PACKS_PER_BOX} packs`,
    packBadge: (packNum: number) => `PACK #${packNum} / ${PACKS_PER_BOX}`,
    cardsPerPack: `${CARDS_PER_PACK} random cards`,
    tearHint: 'Swipe across or click to rip pack',
    ripButton: 'Rip pack',
    rippingLabel: 'Ripping foil top...',
    drawingLabel: 'Sliding 10 cards from pack...',
    cardCounter: (idx: number) => `Card ${idx} / ${CARDS_PER_PACK}`,
    tapToFlip: 'Tap card to flip',
    flipCardBtn: (idx: number) => `Flip card #${idx}`,
    nextCard: 'Next card',
    finishPack: 'View all 10',
    revealAll: 'Reveal all',
    inspectCard: 'Inspect 3D',
    summaryTitle: (packNum: number) => `Pack #${packNum} Pulls`,
    hitsLabel: (hits: number) => `${hits} hits`,
    nextPackBtn: (nextNum: number) => `Open Pack #${nextNum}/${PACKS_PER_BOX}`,
    boxDoneTitle: 'All 12/12 packs opened in this box',
    newBoxBtn: 'Open new box (12 packs)',
    freshBoxShort: 'New box',
    collectionBtn: (unique: number) => `Binder (${unique})`,
    catalogCount: (count: number) => `${count.toLocaleString('en-US')} cards`,
    loadingCatalog: 'Loading Pokémon card vault...',
    loadError: 'Could not load card data. Click to retry.',
    retryBtn: 'Retry',
    binderTitle: 'Opened Card Binder',
    binderSub: (unique: number, total: number, packs: number, valStr: string) =>
      `${unique} unique · ${total} cards · ${packs} packs · Value ${valStr}`,
    filterAll: 'All',
    rarityFilterAria: 'Filter by rarity',
    valueFilterAria: 'Filter by market value',
    powerFilterAria: 'Filter by combat power',
    sortAria: 'Sort cards',
    valueAny: 'Any value',
    valueMin: (v: number) => `Value ≥ $${v}`,
    powerAny: 'Any power',
    powerMin: (v: number) => `Power ≥ ${v}`,
    sortRarityDesc: 'Highest rarity',
    sortPriceDesc: 'Highest value',
    sortPriceAsc: 'Lowest value',
    sortPowerDesc: 'Highest power',
    sortHpDesc: 'Highest HP',
    sortNameAsc: 'Name A → Z',
    resetFilters: 'Reset',
    searchPlaceholder: 'Search Pokémon or set...',
    emptyBinder: 'No cards yet. Rip your first booster pack to start your binder.',
    emptySearch: 'No cards match your active filters.',
    loadMore: (rem: number) => `Load more (${rem})`,
    resetCollection: 'Clear binder',
    closeModal: 'Close',
    ownedLabel: (n: number) => `Owned ×${n}`,
    setLabel: 'Set',
    rarityLabel: 'Rarity',
    typeLabel: 'Type',
    hpLabel: 'HP',
    atkLabel: 'Max ATK',
    powerLabel: 'Power',
    valueLabel: 'Market value',
    foilLabel: 'Card finish',
    tiltHint: 'Hover or drag to inspect 3D holo foil',
  },
} as const;

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCardPrice(price?: number): string {
  if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
    return '—';
  }
  return usdFormatter.format(price);
}

export function getCardPower(card: PokemonCatalogCard): number {
  if (typeof card.power === 'number' && Number.isFinite(card.power)) {
    return card.power;
  }
  return (card.hp ?? 0) + (card.atk ?? 0);
}

interface CompactCatalogPayload {
  v: 2;
  setIds: string[];
  setNames: string[];
  rarities: string[];
  types: string[];
  cards: Array<
    [
      string,
      string,
      number,
      string,
      number,
      number,
      number,
      number,
      number,
      number,
      string?,
    ]
  >;
}

function unpackCatalog(
  raw: CompactCatalogPayload | PokemonCatalogData
): PokemonCatalogData {
  if (!('v' in raw) || raw.v !== 2) {
    return raw as PokemonCatalogData;
  }
  const sets: Record<string, string> = {};
  raw.setIds.forEach((sid, idx) => {
    sets[sid] = raw.setNames[idx] ?? sid.toUpperCase();
  });

  const cards: PokemonCatalogCard[] = raw.cards.map((row) => {
    const hp = row[7] > 0 ? row[7] : undefined;
    const atk = row[8] > 0 ? row[8] : undefined;
    const powerVal = (row[7] ?? 0) + (row[8] ?? 0);
    const price = row[9] > 0 ? row[9] : undefined;
    const card: PokemonCatalogCard = {
      id: row[0],
      name: row[1],
      set: raw.setIds[row[2]] ?? 'unknown',
      num: row[3],
      rarity: raw.rarities[row[4]] ?? 'Common',
      tier: TIER_LIST[row[5]] ?? 'common',
      type: raw.types[row[6]] ?? 'Colorless',
    };
    if (hp !== undefined) card.hp = hp;
    if (atk !== undefined) card.atk = atk;
    if (powerVal > 0) card.power = powerVal;
    if (price !== undefined) card.price = price;
    if (row[10]) card.img = row[10];
    return card;
  });

  return { sets, cards };
}

let catalogCachePromise: Promise<PokemonCatalogData> | null = null;

export function loadPokemonCatalog(): Promise<PokemonCatalogData> {
  if (!catalogCachePromise) {
    catalogCachePromise = fetch('./data/pokemon-cards.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json() as Promise<CompactCatalogPayload | PokemonCatalogData>;
      })
      .then((payload) => unpackCatalog(payload))
      .catch((err) => {
        catalogCachePromise = null;
        throw err;
      });
  }
  return catalogCachePromise;
}

export function getCardImageUrl(
  card: PokemonCatalogCard,
  hires = false
): string {
  if (card.img) {
    return hires ? card.img.replace(/\.png$/i, '_hires.png') : card.img;
  }
  const suffix = hires ? '_hires.png' : '.png';
  return `https://images.pokemontcg.io/${encodeURIComponent(card.set)}/${encodeURIComponent(card.num)}${suffix}`;
}

export function getBoxOption(boxId: BoxThemeId): BoosterBoxOption {
  return (
    BOOSTER_BOX_OPTIONS.find((opt) => opt.id === boxId) ??
    BOOSTER_BOX_OPTIONS[0]
  );
}

export function getBoxPool(
  cards: PokemonCatalogCard[],
  boxId: BoxThemeId
): PokemonCatalogCard[] {
  const option = getBoxOption(boxId);
  if (!option.setIds) return cards;
  const allowed = new Set(option.setIds);
  const filtered = cards.filter((card) => allowed.has(card.set));
  return filtered.length >= CARDS_PER_PACK ? filtered : cards;
}

function pickRandomFrom(
  list: PokemonCatalogCard[],
  usedIds: Set<string>
): PokemonCatalogCard | null {
  const candidates = list.filter((item) => !usedIds.has(item.id));
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function pickWithFallback(
  byTier: Record<PokemonCardTier, PokemonCatalogCard[]>,
  preferredOrder: PokemonCardTier[],
  allPool: PokemonCatalogCard[],
  usedIds: Set<string>
): PokemonCatalogCard {
  for (const tier of preferredOrder) {
    const picked = pickRandomFrom(byTier[tier], usedIds);
    if (picked) {
      usedIds.add(picked.id);
      return picked;
    }
  }
  const fallback = pickRandomFrom(allPool, usedIds) ?? allPool[0];
  usedIds.add(fallback.id);
  return fallback;
}

export function generateBoosterPack(
  cards: PokemonCatalogCard[],
  boxId: BoxThemeId
): PokemonCatalogCard[] {
  const pool = getBoxPool(cards, boxId);
  const byTier: Record<PokemonCardTier, PokemonCatalogCard[]> = {
    common: [],
    uncommon: [],
    rare: [],
    ultra: [],
    secret: [],
  };

  for (const card of pool) {
    byTier[card.tier].push(card);
  }

  const usedIds = new Set<string>();
  const pack: PokemonCatalogCard[] = [];

  for (let i = 0; i < 4; i++) {
    pack.push(
      pickWithFallback(
        byTier,
        ['common', 'uncommon', 'rare', 'ultra', 'secret'],
        pool,
        usedIds
      )
    );
  }

  for (let i = 0; i < 3; i++) {
    pack.push(
      pickWithFallback(
        byTier,
        ['uncommon', 'common', 'rare', 'ultra', 'secret'],
        pool,
        usedIds
      )
    );
  }

  const r8 = Math.random();
  const slot8Order: PokemonCardTier[] =
    r8 < 0.15
      ? ['ultra', 'rare', 'uncommon', 'common', 'secret']
      : r8 < 0.45
        ? ['rare', 'uncommon', 'common', 'ultra', 'secret']
        : ['uncommon', 'common', 'rare', 'ultra', 'secret'];
  pack.push(pickWithFallback(byTier, slot8Order, pool, usedIds));

  const r9 = Math.random();
  const slot9Order: PokemonCardTier[] =
    r9 < 0.08
      ? ['secret', 'ultra', 'rare', 'uncommon', 'common']
      : r9 < 0.35
        ? ['ultra', 'rare', 'secret', 'uncommon', 'common']
        : ['rare', 'ultra', 'secret', 'uncommon', 'common'];
  pack.push(pickWithFallback(byTier, slot9Order, pool, usedIds));

  const r10 = Math.random();
  const slot10Order: PokemonCardTier[] =
    r10 < 0.23
      ? ['secret', 'ultra', 'rare', 'uncommon', 'common']
      : r10 < 0.75
        ? ['ultra', 'secret', 'rare', 'uncommon', 'common']
        : ['rare', 'ultra', 'secret', 'uncommon', 'common'];
  pack.push(pickWithFallback(byTier, slot10Order, pool, usedIds));

  return pack;
}

export function isHitTier(tier: PokemonCardTier): boolean {
  return tier === 'rare' || tier === 'ultra' || tier === 'secret';
}

export function loadSavedBoxState(): SavedBoxState {
  const fallback: SavedBoxState = {
    boxId: 'all',
    packsRemaining: PACKS_PER_BOX,
    totalPacksOpened: 0,
    collection: {},
    soundEnabled: true,
  };

  try {
    const raw = window.localStorage.getItem(POKEMON_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<SavedBoxState>;
    const validBox = BOOSTER_BOX_OPTIONS.some((opt) => opt.id === parsed.boxId)
      ? (parsed.boxId as BoxThemeId)
      : 'all';
    const packsRemaining =
      typeof parsed.packsRemaining === 'number' &&
      Number.isInteger(parsed.packsRemaining) &&
      parsed.packsRemaining >= 0 &&
      parsed.packsRemaining <= PACKS_PER_BOX
        ? parsed.packsRemaining
        : PACKS_PER_BOX;
    const totalPacksOpened =
      typeof parsed.totalPacksOpened === 'number' &&
      Number.isInteger(parsed.totalPacksOpened) &&
      parsed.totalPacksOpened >= 0
        ? parsed.totalPacksOpened
        : 0;
    const soundEnabled =
      typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : true;
    const collection: Record<string, number> = {};
    if (parsed.collection && typeof parsed.collection === 'object') {
      for (const [k, v] of Object.entries(parsed.collection)) {
        if (typeof v === 'number' && Number.isInteger(v) && v > 0) {
          collection[k] = v;
        }
      }
    }
    return {
      boxId: validBox,
      packsRemaining,
      totalPacksOpened,
      collection,
      soundEnabled,
    };
  } catch {
    return fallback;
  }
}

export function saveBoxState(state: SavedBoxState): void {
  try {
    window.localStorage.setItem(POKEMON_STORAGE_KEY, JSON.stringify(state));
  } catch {
    return;
  }
}
