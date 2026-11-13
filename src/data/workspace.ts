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

export interface WorkspaceConfig {
  timezone: string;
  lanyardUserId: string;
  spotifyEndpointUrl: string;
  pollIntervalMs: number;
}

export interface WorkspaceUiLabels {
  sectionTag: string;
  title: string;
  subtitle: string;
  autoModeLabel: string;
  gmtSuffix: string;
  spotifyHeader: string;
  spotifyDemoBtn: string;
  spotifyDemoStopBtn: string;
  spotifyIdleText: string;
  spotifyPausedText: string;
  spotifyUnconfiguredHint: string;
  dialogPromptHint: string;
  lampToggleBtn: string;
  lampOnLabel: string;
  lampOffLabel: string;
  loadingText: string;
  spotifyLiveBadge: string;
  spotifyDemoBadge: string;
  spotifyPausedBadge: string;
  canvasAriaLabel: string;
  hotspotsAriaLabel: string;
  hotspotNames: Record<RoomHotspotId, string>;
}

export const ROOM_WIDTH = 320;
export const ROOM_HEIGHT = 180;

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
    album: '320x180 Sessions',
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
      vi: 'Pha ly cà phê sữa đá bên cửa sổ nắng sớm trước khi ngồi vào bàn.',
      en: 'Grabbing iced milk coffee by the sunlit window before starting the day.',
    },
  },
  working: {
    label: { vi: 'Làm việc', en: 'Working' },
    hours: '09:00 - 17:59',
    hint: {
      vi: 'Ngồi trước màn hình vẽ giao diện, viết code và chỉnh từng chi tiết nhỏ.',
      en: 'At the desk designing layouts, writing code, and testing small interactions.',
    },
  },
  late_night: {
    label: { vi: 'Tối', en: 'Late night' },
    hours: '18:00 - 23:59',
    hint: {
      vi: 'Bật đèn bàn vàng ấm để làm nốt mấy phần còn dang dở trong đêm.',
      en: 'Warm desk lamp switched on while wrapping up late-night builds.',
    },
  },
  sleeping: {
    label: { vi: 'Đi ngủ', en: 'Sleeping' },
    hours: '00:00 - 06:59',
    hint: {
      vi: 'Cả phòng tắt đèn nghỉ ngơi bên ánh trăng và chú capybara đang ngủ.',
      en: 'Lights out for the night under moonlight with a sleepy capybara on the rug.',
    },
  },
};

export const HOTSPOT_DIALOGUES: Record<RoomHotspotId, Record<Locale, string[]>> = {
  monitor: {
    vi: [
      'Màn hình chính mở song song bản vẽ giao diện và trình soạn code.',
      'Mọi khoảng cách pixel và dấu tiếng Việt đều được căn chỉnh trực tiếp tại đây.',
      'Bản dựng cục bộ luôn được bấm thử hết các luồng trước khi đưa lên mạng.',
    ],
    en: [
      'The main screen splits cleanly between UI layouts and the code editor.',
      'Every pixel margin and contrast check gets tuned right at this desk.',
      'Local builds get clicked through end to end before anything ships live.',
    ],
  },
  speakers: {
    vi: [
      'Cặp loa hai bên bàn giữ nhạc lofi nhỏ nhẹ đủ để tập trung code.',
      'Khi nhạc dừng, căn phòng chỉ còn lại tiếng gõ phím lách tách.',
      'Vài bản nhạc chậm ban đêm giúp giữ nhịp đều lúc dò lỗi giao diện.',
    ],
    en: [
      'Desk speakers keep soft lo-fi low enough to stay focused.',
      'When music stops, the room settles into quiet mechanical keystrokes.',
      'Slow beats late at night keep a steady pace while fixing layout bugs.',
    ],
  },
  lamp: {
    vi: [
      'Đèn bàn cổ ngỗng đang tỏa ánh vàng ấm dịu mắt cho cả góc làm việc.',
      'Ban ngày đèn nghỉ dưới nắng tự nhiên và chỉ sáng lên khi trời tối.',
    ],
    en: [
      'The gooseneck desk lamp casts a warm yellow pool across the desk.',
      'The lamp stays off in daylight and takes over once dusk rolls in.',
    ],
  },
  window: {
    vi: [
      'Khung cửa sổ đổi màu trời, nắng và trăng sao theo đúng giờ Việt Nam.',
      'Nắng sớm nghiêng qua rèm vào ban ngày rồi nhường chỗ cho trăng sao ban đêm.',
    ],
    en: [
      'The window shifts sky colors, sunbeams, and stars with real Vietnam time.',
      'Morning sunbeams slant past the curtains and trade for stars after dusk.',
    ],
  },
  bed: {
    vi: [
      'Chiếc giường gỗ sát tường luôn được gấp gọn chăn kẻ ô vào ban ngày.',
      'Quá nửa đêm rồi thì gập máy lại đi ngủ cho đầu óc tỉnh táo.',
    ],
    en: [
      'The wooden bed against the wall keeps a folded plaid quilt by day.',
      'Once midnight passes, it is time to close the laptop and get some sleep.',
    ],
  },
  capybara: {
    vi: [
      'Chú capybara đội quả cam nhỏ đang thư giãn ngay trên tấm thảm dệt.',
      'Người bạn nhỏ ở chân trang luôn giữ vẻ bình tĩnh dù code có nhiều lỗi.',
      'Đêm xuống chú cuộn tròn ngủ khò ngay cạnh góc bàn làm việc.',
    ],
    en: [
      'A chill capybara balances a tiny orange on its head on the woven rug.',
      'This little companion from the footer stays calm even when bugs pile up.',
      'At night it curls up into a sleepy loaf right beside the desk.',
    ],
  },
  shelf: {
    vi: [
      'Trên kệ gỗ có mô hình Honda Cub xanh kem kỷ niệm dự án Deliver Simulator.',
      'Cạnh chiếc Cub là mấy cuốn sổ phác thảo và chậu cây xanh tưới mỗi sáng.',
      'Trên tường gần kệ còn treo khung thẻ Holo lấp lánh làm cảm hứng pixel.',
    ],
    en: [
      'The wooden shelf holds a cream and green Honda Cub model honoring Deliver Simulator.',
      'Next to the Cub sit wireframe sketchbooks and a potted plant watered each morning.',
      'A framed holo card hangs nearby as inspiration for the pixel room details.',
    ],
  },
};

export const WORKSPACE_UI_LABELS: Record<Locale, WorkspaceUiLabels> = {
  vi: {
    sectionTag: 'KHÔNG GIAN CÁ NHÂN',
    title: 'Góc làm việc của Long',
    subtitle: '',
    autoModeLabel: 'Tự động · Giờ VN',
    gmtSuffix: 'GMT+7',
    spotifyHeader: 'Long đang nghe',
    spotifyDemoBtn: 'Nghe thử Lofi',
    spotifyDemoStopBtn: 'Tắt Demo',
    spotifyIdleText: 'Hiện chưa phát bài nào',
    spotifyPausedText: 'Đang tạm dừng',
    spotifyUnconfiguredHint: 'Chưa kết nối Spotify trực tiếp, bạn có thể nghe thử nhạc lo-fi.',
    dialogPromptHint: '',
    lampToggleBtn: 'Đèn bàn',
    lampOnLabel: 'Đang bật',
    lampOffLabel: 'Đang tắt',
    loadingText: 'Đang mở căn phòng...',
    spotifyLiveBadge: 'Trực tiếp',
    spotifyDemoBadge: 'Demo',
    spotifyPausedBadge: 'Tạm dừng',
    canvasAriaLabel: 'Phòng làm việc pixel art tương tác của Long Hoàng',
    hotspotsAriaLabel: 'Các đồ vật tương tác trong phòng',
    hotspotNames: {
      monitor: 'Màn hình',
      speakers: 'Cặp loa',
      lamp: 'Đèn bàn',
      window: 'Cửa sổ',
      bed: 'Giường ngủ',
      capybara: 'Capybara',
      shelf: 'Kệ xe Cub',
    },
  },
  en: {
    sectionTag: 'PERSONAL WORKSPACE',
    title: "Long's Workspace",
    subtitle: '',
    autoModeLabel: 'Auto · VN Time',
    gmtSuffix: 'GMT+7',
    spotifyHeader: 'Long is listening',
    spotifyDemoBtn: 'Play Lo-fi Demo',
    spotifyDemoStopBtn: 'Stop Demo',
    spotifyIdleText: 'Nothing playing right now',
    spotifyPausedText: 'Paused',
    spotifyUnconfiguredHint: 'Live Spotify is offline, try the lo-fi demo instead.',
    dialogPromptHint: '',
    lampToggleBtn: 'Desk lamp',
    lampOnLabel: 'On',
    lampOffLabel: 'Off',
    loadingText: 'Loading workspace...',
    spotifyLiveBadge: 'Live',
    spotifyDemoBadge: 'Demo',
    spotifyPausedBadge: 'Paused',
    canvasAriaLabel: "Long Hoàng's interactive pixel art workspace room",
    hotspotsAriaLabel: 'Interactive room objects',
    hotspotNames: {
      monitor: 'Monitor',
      speakers: 'Speakers',
      lamp: 'Desk lamp',
      window: 'Window',
      bed: 'Bed',
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
        ? 'Màn hình đang chạy trình bảo vệ sao nhỏ lướt nhẹ trong đêm.'
        : 'The monitor rests in sleep mode with a tiny star screensaver drifting by.';
    }
    return HOTSPOT_DIALOGUES.monitor[locale][0];
  }

  if (id === 'bed') {
    if (timeState === 'sleeping') {
      return locale === 'vi'
        ? 'Long đang ngủ say dưới chiếc chăn kẻ ô sau một ngày dài làm sản phẩm.'
        : 'Long is fast asleep under the plaid quilt after a full day of building.';
    }
    if (timeState === 'waking') {
      return locale === 'vi'
        ? 'Chăn gối đã gấp gọn sau khi thức dậy đón buổi sáng.'
        : 'The plaid quilt is neatly folded right after waking up.';
    }
    return HOTSPOT_DIALOGUES.bed[locale][timeState === 'late_night' ? 1 : 0];
  }

  if (id === 'capybara') {
    if (timeState === 'sleeping') {
      return HOTSPOT_DIALOGUES.capybara[locale][2];
    }
    if (timeState === 'late_night') {
      return locale === 'vi'
        ? 'Chú capybara đội cam nhỏ đang lim dim mắt nghỉ trên thảm dệt.'
        : 'The orange-topped capybara is getting drowsy on the woven rug.';
    }
    if (track && track.isPlaying) {
      return locale === 'vi'
        ? 'Chú capybara đội cam đang nhún nhảy trên thảm theo nhịp nhạc lofi.'
        : 'The orange-topped capybara is dancing on the rug to the beat.';
    }
    if (track && !track.isPlaying) {
      return locale === 'vi'
        ? 'Chú capybara ngồi ngoan trên tấm thảm đợi nhạc bật lại.'
        : 'The capybara sits calmly on the rug waiting for the music to resume.';
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
