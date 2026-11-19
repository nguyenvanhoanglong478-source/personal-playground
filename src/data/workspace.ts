import { Locale } from './profile';

export type RoomTimeState = 'waking' | 'working' | 'late_night' | 'sleeping';

export type RoomHotspotId =
  | 'monitor'
  | 'speakers'
  | 'lamp'
  | 'window'
  | 'bed'
  | 'capybara'
  | 'shelf';

export interface RoomHotspotRegion {
  id: RoomHotspotId;
  x: number;
  y: number;
  w: number;
  h: number;
  pointerX: number;
  pointerY: number;
}

export interface SpotifyTrackInfo {
  isPlaying: boolean;
  isPaused?: boolean;
  isDemo?: boolean;
  title: string;
  artist: string;
  album?: string;
  albumArtUrl?: string;
  trackUrl?: string;
  progressMs?: number;
  startedAtMs?: number;
  endsAtMs?: number;
  durationMs?: number;
}

export interface FavoriteGameItem {
  id: string;
  code: string;
  logoUrl: string;
  logoSurface: 'cover' | 'dark' | 'neutral';
  name: { vi: string; en: string };
  genre: string;
}

export interface WorkspaceConfig {
  timezone: string;
  lanyardUserId: string;
  spotifyEndpointUrl: string;
  pollIntervalMs: number;
}

export interface WorkspaceUiLabels {
  sectionTag: string;
  title: string;
  autoModeLabel: string;
  gmtSuffix: string;
  spotifyHeader: string;
  spotifyDemoBtn: string;
  spotifyDemoStopBtn: string;
  spotifyIdleText: string;
  gamesHeader: string;
  gamesListAriaLabel: string;
  lampToggleBtn: string;
  lampOnLabel: string;
  lampOffLabel: string;
  spotifyLiveBadge: string;
  spotifyDemoBadge: string;
  spotifyPausedBadge: string;
  canvasAriaLabel: string;
  hotspotNames: Record<RoomHotspotId, string>;
}

export const ROOM_WIDTH = 480;
export const ROOM_HEIGHT = 320;

export const FAVORITE_GAMES: FavoriteGameItem[] = [
  {
    id: 'lol',
    code: 'LoL',
    logoUrl: './games/lol.svg',
    logoSurface: 'cover',
    name: { vi: 'Liên Minh Huyền Thoại', en: 'League of Legends' },
    genre: 'PC · MOBA',
  },
  {
    id: 'tft',
    code: 'TFT',
    logoUrl: './games/tft.png',
    logoSurface: 'cover',
    name: { vi: 'TFT', en: 'TFT' },
    genre: 'Auto Battler',
  },
  {
    id: 'valorant',
    code: 'VAL',
    logoUrl: './games/valorant.svg',
    logoSurface: 'cover',
    name: { vi: 'Valorant', en: 'Valorant' },
    genre: 'PC · FPS',
  },
  {
    id: 'wild-rift',
    code: 'WR',
    logoUrl: './games/wild-rift.png',
    logoSurface: 'cover',
    name: { vi: 'Tốc Chiến', en: 'Wild Rift' },
    genre: 'Mobile · MOBA',
  },
  {
    id: 'gta6',
    code: 'GTA6',
    logoUrl: './games/gta6.svg',
    logoSurface: 'dark',
    name: { vi: 'GTA 6', en: 'GTA 6' },
    genre: 'Open World',
  },
  {
    id: 'gta5',
    code: 'GTA5',
    logoUrl: './games/gta5.svg',
    logoSurface: 'dark',
    name: { vi: 'GTA 5', en: 'GTA 5' },
    genre: 'PC · Open World',
  },
  {
    id: 'cs2',
    code: 'CS2',
    logoUrl: './games/cs2.svg',
    logoSurface: 'cover',
    name: { vi: 'CS2', en: 'CS2' },
    genre: 'PC · FPS',
  },
  {
    id: 'minecraft',
    code: 'MC',
    logoUrl: './games/minecraft.svg',
    logoSurface: 'neutral',
    name: { vi: 'Minecraft', en: 'Minecraft' },
    genre: 'Sandbox',
  },
];

export const WORKSPACE_CONFIG: WorkspaceConfig = {
  timezone: 'Asia/Ho_Chi_Minh',
  lanyardUserId: '',
  spotifyEndpointUrl: 'https://longhoang.pages.dev/api/spotify',
  pollIntervalMs: 5500,
};

export const SIMULATED_LOFI_TRACKS: SpotifyTrackInfo[] = [
  {
    isPlaying: true,
    isDemo: true,
    title: 'Saigon Rain on Tin Roof',
    artist: 'Tân & Tape',
    album: 'Midnight Sketchbook',
    durationMs: 184000,
  },
  {
    isPlaying: true,
    isDemo: true,
    title: 'Trà Đá & Pixel Grid',
    artist: 'Bình Thạnh Lo-Fi',
    album: '480x320 Sessions',
    durationMs: 202000,
  },
  {
    isPlaying: true,
    isDemo: true,
    title: 'Late Commit at 01:40',
    artist: 'Kaito & Cô Tám',
    album: 'Warm Lamp Tapes',
    durationMs: 171000,
  },
];

export const TIME_STATE_META: Record<
  RoomTimeState,
  {
    label: { vi: string; en: string };
    hours: string;
    hint: { vi: string; en: string };
  }
> = {
  waking: {
    label: { vi: 'Sáng', en: 'Morning' },
    hours: '07:00 - 08:59',
    hint: {
      vi: 'Pha ly cà phê sữa đá ở quầy bar bên cửa sổ nắng sớm khi cả studio bắt đầu ngày mới.',
      en: 'Grabbing iced milk coffee at the espresso bar by the sunlit window as the studio wakes up.',
    },
  },
  working: {
    label: { vi: 'Làm việc', en: 'Working' },
    hours: '09:00 - 17:59',
    hint: {
      vi: 'Ngồi tại bàn chính vẽ giao diện, viết code và trao đổi nhịp nhàng cùng các bạn trong studio.',
      en: 'At the main desk designing layouts, writing code, and building alongside studio teammates.',
    },
  },
  late_night: {
    label: { vi: 'Tối', en: 'Late night' },
    hours: '18:00 - 23:59',
    hint: {
      vi: 'Bật đèn bàn vàng ấm để cùng vài cú đêm trong studio làm nốt mấy phần còn dang dở.',
      en: 'Warm desk lamps switched on while wrapping up late-night builds with fellow night owls.',
    },
  },
  sleeping: {
    label: { vi: 'Đi ngủ', en: 'Sleeping' },
    hours: '00:00 - 06:59',
    hint: {
      vi: 'Cả studio dịu đèn nghỉ ngơi, Long chợp mắt trên sofa góc phòng bên chú capybara ngủ trên thảm Kilim.',
      en: 'Lights dim over the studio as Long rests on the lounge sofa while the capybara naps on the Kilim rug.',
    },
  },
};

export const HOTSPOT_DIALOGUES: Record<RoomHotspotId, Record<Locale, string[]>> = {
  monitor: {
    vi: [
      'Bàn làm việc chính của Long mở song song bản vẽ giao diện và trình soạn code.',
      'Mọi khoảng cách pixel và dấu tiếng Việt đều được căn chỉnh trực tiếp tại cụm bàn đầu.',
      'Cả nhóm đối chiếu bảng Kanban kính và bấm thử hết các luồng trước khi đưa lên mạng.',
    ],
    en: [
      'Long works at the lead workstation with UI layouts and the code editor side by side.',
      'Every pixel margin and contrast check gets tuned right at the front desk cluster.',
      'Teammates check the glass Kanban board and click through local builds before anything ships.',
    ],
  },
  speakers: {
    vi: [
      'Cặp loa studio giữ nhạc lofi nhỏ nhẹ đủ để cả nhóm tập trung code.',
      'Khi nhạc dừng, căn phòng chỉ còn lại tiếng gõ phím lách tách và tiếng máy pha cà phê.',
      'Vài bản nhạc chậm ban đêm giúp giữ nhịp đều lúc dò lỗi giao diện.',
    ],
    en: [
      'Studio speakers keep soft lo-fi low enough for everyone to stay focused.',
      'When music stops, the loft settles into quiet keystrokes and soft espresso steam.',
      'Slow beats late at night keep a steady pace while fixing layout bugs.',
    ],
  },
  lamp: {
    vi: [
      'Đèn bàn đồng đang tỏa ánh vàng ấm dịu mắt cho góc làm việc của Long.',
      'Ban ngày đèn nghỉ dưới nắng tự nhiên và chỉ sáng lên khi trời chuyển tối.',
    ],
    en: [
      "The brass desk lamp casts a warm yellow pool across Long's workstation.",
      'The lamp stays off in daylight and takes over once dusk rolls into the loft.',
    ],
  },
  window: {
    vi: [
      'Khung cửa sổ lớn đổi màu trời, nắng sớm và phố đêm theo đúng giờ Việt Nam.',
      'Nắng mai nghiêng qua cửa kính vào ban ngày rồi nhường chỗ cho trăng sao và đèn phố ban đêm.',
    ],
    en: [
      'The panoramic windows shift sky colors, sunbeams, and city lights with real Vietnam time.',
      'Morning sunbeams slant through the studio glass and trade for stars and skyline lights after dusk.',
    ],
  },
  bed: {
    vi: [
      'Góc sofa nhung ấm cúng kèm gối tựa và chăn len cho những lúc nghỉ giải lao giữa buổi.',
      'Quá nửa đêm rồi thì gập máy lại, ngả lưng trên sofa studio chợp mắt một lát cho tỉnh táo.',
    ],
    en: [
      'A cozy velvet lounge sofa with knit pillows tucked in the corner for midday breaks.',
      'Once midnight passes, it is time to close the laptop and catch a late nap on the studio sofa.',
    ],
  },
  capybara: {
    vi: [
      'Chú capybara đội quả cam nhỏ đang thư giãn ngay trên tấm thảm Kilim giữa studio.',
      'Người bạn nhỏ của studio luôn giữ vẻ bình tĩnh dù code có nhiều lỗi đến đâu.',
      'Đêm xuống chú cuộn tròn ngủ khò trên tấm thảm Kilim ngay cạnh góc sofa nghỉ ngơi.',
    ],
    en: [
      'A chill capybara balances a tiny orange on its head on the Kilim rug in the studio.',
      'This little studio companion stays calm even when bugs pile up.',
      'At night it curls up into a sleepy loaf on the Kilim rug beside the lounge sofa.',
    ],
  },
  shelf: {
    vi: [
      'Trên kệ gỗ óc chó có mô hình Honda Cub xanh kem kỷ niệm dự án Deliver Simulator.',
      'Cạnh chiếc Cub là giá sách, máy đĩa than, sổ phác thảo và mấy chậu cây xanh của studio.',
      'Trên tường gần kệ còn treo khung tranh hoàng hôn làm cảm hứng phối màu cho cả căn phòng.',
    ],
    en: [
      'The walnut shelf holds a cream and green Honda Cub model honoring Deliver Simulator.',
      'Beside the Cub sit wireframe sketchbooks, a vinyl turntable, and studio plants watered each morning.',
      'A framed sunset poster hangs nearby as color inspiration for the studio loft.',
    ],
  },
};

export const WORKSPACE_UI_LABELS: Record<Locale, WorkspaceUiLabels> = {
  vi: {
    sectionTag: 'KHÔNG GIAN CÁ NHÂN',
    title: 'Góc làm việc của Long',
    autoModeLabel: 'Tự động · Giờ VN',
    gmtSuffix: 'GMT+7',
    spotifyHeader: 'Long đang nghe',
    spotifyDemoBtn: 'Nghe thử Lofi',
    spotifyDemoStopBtn: 'Tắt Demo',
    spotifyIdleText: 'Hiện chưa phát bài nào',
    gamesHeader: 'Game hay chơi',
    gamesListAriaLabel: 'Danh sách game hay chơi của Long',
    lampToggleBtn: 'Đèn bàn',
    lampOnLabel: 'Đang bật',
    lampOffLabel: 'Đang tắt',
    spotifyLiveBadge: 'Trực tiếp',
    spotifyDemoBadge: 'Demo',
    spotifyPausedBadge: 'Tạm dừng',
    canvasAriaLabel: 'Phòng làm việc pixel art tương tác của Long Hoàng',
    hotspotNames: {
      monitor: 'Màn hình',
      speakers: 'Cặp loa',
      lamp: 'Đèn bàn',
      window: 'Cửa sổ',
      bed: 'Góc nghỉ ngơi',
      capybara: 'Capybara',
      shelf: 'Kệ xe Cub',
    },
  },
  en: {
    sectionTag: 'PERSONAL WORKSPACE',
    title: "Long's Workspace",
    autoModeLabel: 'Auto · VN Time',
    gmtSuffix: 'GMT+7',
    spotifyHeader: 'Long is listening',
    spotifyDemoBtn: 'Play Lo-fi Demo',
    spotifyDemoStopBtn: 'Stop Demo',
    spotifyIdleText: 'Nothing playing right now',
    gamesHeader: 'Games I Play',
    gamesListAriaLabel: "Long's favorite games list",
    lampToggleBtn: 'Desk lamp',
    lampOnLabel: 'On',
    lampOffLabel: 'Off',
    spotifyLiveBadge: 'Live',
    spotifyDemoBadge: 'Demo',
    spotifyPausedBadge: 'Paused',
    canvasAriaLabel: "Long Hoàng's interactive pixel art workspace room",
    hotspotNames: {
      monitor: 'Monitor',
      speakers: 'Speakers',
      lamp: 'Desk lamp',
      window: 'Window',
      bed: 'Lounge sofa',
      capybara: 'Capybara',
      shelf: 'Cub shelf',
    },
  },
};

export function getVietnamClockInfo(now = new Date()): {
  hour: number;
  minute: number;
  formattedTime: string;
  timeState: RoomTimeState;
} {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const rawHour = Number(parts.find((part) => part.type === 'hour')?.value ?? '0');
  const rawMinute = Number(parts.find((part) => part.type === 'minute')?.value ?? '0');

  const normalizedHour = Number.isFinite(rawHour) ? rawHour : 0;
  const hour = normalizedHour === 24 ? 0 : normalizedHour;
  const minute = Number.isFinite(rawMinute) ? rawMinute : 0;

  const hh = String(hour).padStart(2, '0');
  const mm = String(minute).padStart(2, '0');
  const formattedTime = `${hh}:${mm}`;

  let timeState: RoomTimeState = 'sleeping';
  if (hour >= 7 && hour <= 8) {
    timeState = 'waking';
  } else if (hour >= 9 && hour <= 17) {
    timeState = 'working';
  } else if (hour >= 18 && hour <= 23) {
    timeState = 'late_night';
  }

  return {
    hour,
    minute,
    formattedTime,
    timeState,
  };
}

export function getHotspotDialogue(
  id: RoomHotspotId,
  timeState: RoomTimeState,
  locale: Locale,
  options?: { lampOn?: boolean; spotifyTrack?: SpotifyTrackInfo | null }
): string {
  const lampOn = Boolean(options?.lampOn);
  const track = options?.spotifyTrack ?? null;

  if (id === 'lamp') {
    if (lampOn) {
      if (timeState === 'sleeping') {
        return locale === 'vi'
          ? 'Đèn bàn vẫn đang bật giữa đêm khuya, bấm lại để tắt trước khi đi ngủ.'
          : 'The desk lamp is still glowing late at night, click it again to switch off.';
      }
      return HOTSPOT_DIALOGUES.lamp[locale][0];
    }

    if (timeState === 'late_night') {
      return locale === 'vi'
        ? 'Đèn bàn đang tắt, bấm vào đèn để bật ánh vàng ấm lên nhé.'
        : 'The desk lamp is off, click it to turn on the warm evening glow.';
    }
    return HOTSPOT_DIALOGUES.lamp[locale][1];
  }

  if (id === 'speakers') {
    if (track && track.isPlaying) {
      if (track.isDemo) {
        return locale === 'vi'
          ? `Loa bàn đang phát thử ${track.title} của ${track.artist}.`
          : `Desk speakers are playing demo ${track.title} by ${track.artist}.`;
      }
      return locale === 'vi'
        ? `Đang phát ${track.title} của ${track.artist} trên Spotify.`
        : `Now playing ${track.title} by ${track.artist} on Spotify.`;
    }

    if (track && !track.isPlaying) {
      return locale === 'vi'
        ? `Spotify đang tạm dừng ở bài ${track.title} của ${track.artist}.`
        : `Spotify is paused on ${track.title} by ${track.artist}.`;
    }

    if (timeState === 'sleeping') {
      return locale === 'vi'
        ? 'Cặp loa đang tắt hẳn để giữ yên tĩnh cho giấc ngủ ban đêm.'
        : 'Both desk speakers are silent for the night.';
    }
    return HOTSPOT_DIALOGUES.speakers[locale][1];
  }

  if (id === 'window') {
    if (timeState === 'waking') {
      return locale === 'vi'
        ? 'Nắng sớm nghiêng qua rèm cửa cùng vài cụm mây trắng trôi nhẹ.'
        : 'Early sunbeams slant past the curtains while pixel clouds drift by.';
    }
    if (timeState === 'working') {
      return locale === 'vi'
        ? 'Bầu trời ban ngày sáng rõ ngoài cửa sổ rọi nắng xuống bàn làm việc.'
        : 'Bright daytime sky outside pours natural sunlight across the desk.';
    }
    if (timeState === 'late_night') {
      return locale === 'vi'
        ? 'Trời chuyển tối ngoài cửa sổ và những ngôi sao đầu tiên bắt đầu lấp lánh.'
        : 'Dusk settles outside the window as the first evening stars twinkle.';
    }
    return locale === 'vi'
      ? 'Trời đêm khuya ngoài cửa sổ chỉ còn vầng trăng khuyết và sao.'
      : 'Deep midnight sky outside shines with a crescent moon and stars.';
  }

  if (id === 'monitor') {
    if (timeState === 'waking') {
      return locale === 'vi'
        ? 'Màn hình vừa bật lên cho một ngày thiết kế và viết code mới.'
        : 'The monitor just booted up for a fresh day of design and coding.';
    }
    if (timeState === 'late_night') {
      return locale === 'vi'
        ? 'Ánh sáng màn hình hắt nhẹ lên mắt kính khi chỉnh nốt code ban đêm.'
        : 'Cool monitor light glints off the glasses while wrapping up late code.';
    }
    if (timeState === 'sleeping') {
      return locale === 'vi'
        ? 'Màn hình đang chạy trình bảo vệ sao nhỏ trong lúc Long chợp mắt trên sofa studio.'
        : 'The monitor rests in sleep mode with drifting stars while Long naps on the lounge sofa.';
    }
    return HOTSPOT_DIALOGUES.monitor[locale][0];
  }

  if (id === 'bed') {
    if (timeState === 'sleeping') {
      return locale === 'vi'
        ? 'Long đang nghỉ ngơi trên chiếc sofa góc studio trong khi cả không gian dịu đèn yên tĩnh.'
        : 'Long is resting on the cozy studio lounge sofa while the loft winds down for the night.';
    }
    if (timeState === 'waking') {
      return locale === 'vi'
        ? 'Gối tựa và chăn len trên sofa góc phòng đã được xếp gọn đón cả studio vào buổi sáng.'
        : 'The lounge sofa pillows and knit blanket are neatly folded for a fresh studio morning.';
    }
    return HOTSPOT_DIALOGUES.bed[locale][timeState === 'late_night' ? 1 : 0];
  }

  if (id === 'capybara') {
    if (timeState === 'sleeping') {
      return HOTSPOT_DIALOGUES.capybara[locale][2];
    }
    if (timeState === 'late_night') {
      return locale === 'vi'
        ? 'Chú capybara đội cam nhỏ đang lim dim mắt nghỉ trên tấm thảm Kilim.'
        : 'The orange-topped capybara is getting drowsy on the Kilim rug.';
    }
    if (track && track.isPlaying) {
      return locale === 'vi'
        ? 'Chú capybara đội cam đang nhún nhảy trên thảm Kilim theo nhịp nhạc lofi.'
        : 'The orange-topped capybara is dancing on the Kilim rug to the beat.';
    }
    if (track && !track.isPlaying) {
      return locale === 'vi'
        ? 'Chú capybara ngồi ngoan trên tấm thảm Kilim đợi nhạc bật lại.'
        : 'The capybara sits calmly on the Kilim rug waiting for the music to resume.';
    }
    return HOTSPOT_DIALOGUES.capybara[locale][0];
  }

  if (timeState === 'waking') {
    return HOTSPOT_DIALOGUES.shelf[locale][1];
  }
  if (timeState === 'late_night') {
    return HOTSPOT_DIALOGUES.shelf[locale][2];
  }
  return HOTSPOT_DIALOGUES.shelf[locale][0];
}
