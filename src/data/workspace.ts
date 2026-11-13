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
  isDemo?: boolean;
  title: string;
  artist: string;
  album?: string;
  albumArtUrl?: string;
  trackUrl?: string;
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
  spotifyUnconfiguredHint: string;
  dialogPromptHint: string;
  lampToggleBtn: string;
  lampOnLabel: string;
  lampOffLabel: string;
  loadingText: string;
  spotifyLiveBadge: string;
  spotifyDemoBadge: string;
  canvasAriaLabel: string;
  hotspotsAriaLabel: string;
  hotspotNames: Record<RoomHotspotId, string>;
}

export const ROOM_WIDTH = 320;
export const ROOM_HEIGHT = 180;

export const WORKSPACE_CONFIG: WorkspaceConfig = {
  timezone: 'Asia/Ho_Chi_Minh',
  lanyardUserId: '',
  spotifyEndpointUrl: '',
  pollIntervalMs: 25000,
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
      vi: 'Pha ly cà phê sữa đá, hít thở chút nắng sáng rồi mở máy xem việc trong ngày.',
      en: 'Iced milk coffee in hand, catching morning light before opening the code editor.',
    },
  },
  working: {
    label: { vi: 'Làm việc', en: 'Working' },
    hours: '09:00 - 17:59',
    hint: {
      vi: 'Ngồi bàn vẽ giao diện, gõ code và thử từng chi tiết nhỏ cho đến khi chạy mượt.',
      en: 'At the desk shaping interfaces, writing code, and testing small interactions.',
    },
  },
  late_night: {
    label: { vi: 'Tối', en: 'Late night' },
    hours: '18:00 - 23:59',
    hint: {
      vi: 'Bật đèn bàn vàng ấm, mở vài nhịp lofi nhẹ rồi làm nốt mấy phần còn dang dở.',
      en: 'Warm desk lamp on, soft lo-fi looping while wrapping up late-night builds.',
    },
  },
  sleeping: {
    label: { vi: 'Đi ngủ', en: 'Sleeping' },
    hours: '00:00 - 06:59',
    hint: {
      vi: 'Cả phòng tắt đèn nghỉ ngơi, chỉ còn trăng ngoài cửa sổ và chú capybara cuộn tròn.',
      en: 'Lights out for the night, moonlit window and a sleepy capybara on the rug.',
    },
  },
};

export const HOTSPOT_DIALOGUES: Record<RoomHotspotId, Record<Locale, string[]>> = {
  monitor: {
    vi: [
      'Màn hình chính mở song song bản vẽ giao diện và trình soạn code.',
      'Chỉnh từng khoảng cách pixel, dấu tiếng Việt và độ tương phản sáng tối ngay tại đây.',
      'Chạy thử bản dựng cục bộ rồi bấm qua hết các luồng trước khi đưa lên mạng.',
    ],
    en: [
      'Main display splits cleanly between UI mockups and the code editor.',
      'Fine-tuning pixel spacing, Vietnamese typography, and light-dark contrast right here.',
      'Testing local builds and clicking through every flow before shipping anything live.',
    ],
  },
  speakers: {
    vi: [
      'Cặp loa nhỏ hai bên bàn giữ nhạc nền lofi vừa đủ nghe để không bị phân tâm.',
      'Khi tắt nhạc, loa đứng yên nhường chỗ cho tiếng gõ phím lách tách.',
      'Thỉnh thoảng bật vài beat chậm ban đêm trong lúc dò lỗi giao diện.',
    ],
    en: [
      'Desk speakers keep soft lo-fi beats playing low enough to stay focused.',
      'When the playlist pauses, the room settles down to quiet mechanical keystrokes.',
      'Slow late-night beats help keep a steady rhythm while fixing layout bugs.',
    ],
  },
  lamp: {
    vi: [
      'Đèn bàn cổ ngỗng ánh vàng ấm, bật lên là cả góc làm việc dịu mắt hẳn.',
      'Ban ngày để đèn nghỉ, tối đến chỉ cần quầng sáng vàng nhỏ này là đủ tập trung.',
    ],
    en: [
      'Warm gooseneck desk lamp that softens the whole desk corner when switched on.',
      'Stays off under daytime sun, then becomes the main pool of light after dusk.',
    ],
  },
  window: {
    vi: [
      'Khung cửa sổ nhìn ra bầu trời pixel đổi màu nắng mây theo đúng giờ Việt Nam.',
      'Buổi sáng nắng nghiêng qua rèm, tối về lại có sao nhấp nháy và vầng trăng khuyết.',
    ],
    en: [
      'Window overlooking a pixel sky that shifts colors with real Vietnam time.',
      'Morning sunbeams slant past the curtains, trading for twinkling stars and a crescent moon at night.',
    ],
  },
  bed: {
    vi: [
      'Chiếc giường gỗ sát tường với chiếc chăn kẻ ô được gấp gọn ban ngày.',
      'Khuya quá rồi thì gập máy lại đi ngủ một giấc cho đầu óc tỉnh táo.',
    ],
    en: [
      'Compact wooden bed against the wall with a neatly folded plaid quilt by day.',
      'When midnight rolls past, time to close the laptop and get proper rest.',
    ],
  },
  capybara: {
    vi: [
      'Chú capybara đội quả cam nhỏ trên đầu nằm chill ngay góc thảm dệt.',
      'Giống bạn đồng hành ở chân trang, luôn bình tĩnh kể cả lúc lỗi dồn dập.',
      'Đêm xuống là chú cuộn tròn ngủ khò bên cạnh góc bàn làm việc.',
    ],
    en: [
      'A chill capybara balancing a tiny orange on its head right on the woven rug.',
      'Same companion from the footer bar, staying calm even when bugs pile up.',
      'Once night deepens, it curls up into a sleepy loaf beside the desk.',
    ],
  },
  shelf: {
    vi: [
      'Trên kệ gỗ có mô hình xe Honda Cub xanh kem, món kỷ niệm từ dự án Deliver Simulator.',
      'Cạnh chiếc Cub là vài cuốn sổ phác thảo giao diện và chậu cây xanh tưới mỗi sáng.',
      'Sát bên còn treo khung thẻ Pokémon lấp lánh làm cảm hứng vẽ pixel.',
    ],
    en: [
      'Wooden shelf holding a green and cream Honda Cub model, a tribute to Deliver Simulator.',
      'Beside the Cub sit wireframe sketchbooks and a leafy potted plant watered each morning.',
      'Nearby hangs a holo card frame that inspired the pixel details across this site.',
    ],
  },
};

export const WORKSPACE_UI_LABELS: Record<Locale, WorkspaceUiLabels> = {
  vi: {
    sectionTag: 'KHÔNG GIAN CÁ NHÂN',
    title: 'Góc làm việc của Long',
    subtitle:
      'Căn phòng pixel 320x180 tự đổi ánh sáng theo giờ Việt Nam. Bấm vào từng đồ vật hoặc đổi khung giờ bên dưới để xem chuyện gì đang diễn ra.',
    autoModeLabel: 'Tự động · Giờ VN',
    gmtSuffix: 'GMT+7',
    spotifyHeader: 'Nhạc nền đang phát',
    spotifyDemoBtn: 'Nghe thử Lofi',
    spotifyDemoStopBtn: 'Tắt Demo',
    spotifyIdleText: 'Hiện chưa phát bài nào',
    spotifyUnconfiguredHint:
      'Chưa gắn mã Discord Lanyard, bạn có thể bật Nghe thử Lofi để xem loa và chú capybara nhún theo nhạc.',
    dialogPromptHint: 'Bấm vào màn hình, đèn bàn, capybara hoặc kệ xe Cub để xem ghi chú.',
    lampToggleBtn: 'Đèn bàn',
    lampOnLabel: 'Đang bật',
    lampOffLabel: 'Đang tắt',
    loadingText: 'Đang mở căn phòng...',
    spotifyLiveBadge: 'Trực tiếp',
    spotifyDemoBadge: 'Demo',
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
    subtitle:
      'A 320x180 pixel room that shifts light and mood with Vietnam time. Click any item or switch time presets below to inspect the room.',
    autoModeLabel: 'Auto · VN Time',
    gmtSuffix: 'GMT+7',
    spotifyHeader: 'Now playing',
    spotifyDemoBtn: 'Play Lo-fi Demo',
    spotifyDemoStopBtn: 'Stop Demo',
    spotifyIdleText: 'Nothing playing right now',
    spotifyUnconfiguredHint:
      'Live Spotify link is not set yet. Hit Play Lo-fi Demo to watch the speakers and capybara groove.',
    dialogPromptHint: 'Click the monitor, desk lamp, capybara, or Cub shelf to inspect.',
    lampToggleBtn: 'Desk lamp',
    lampOnLabel: 'On',
    lampOffLabel: 'Off',
    loadingText: 'Loading workspace...',
    spotifyLiveBadge: 'Live',
    spotifyDemoBadge: 'Demo',
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
          ? 'Đèn bàn đang bật vàng ấm giữa đêm khuya. Bấm lại vào đèn để tắt trước khi ngủ nhé.'
          : 'The warm desk lamp is still glowing late at night. Click it again to turn it off before sleeping.';
      }
      return HOTSPOT_DIALOGUES.lamp[locale][0];
    }

    if (timeState === 'late_night') {
      return locale === 'vi'
        ? 'Đèn bàn đang tắt, góc làm việc chỉ còn ánh sáng xanh từ màn hình. Bấm vào đèn để bật ánh vàng ấm lên.'
        : 'Desk lamp is off, leaving cool monitor light across the desk. Click the lamp to switch on the warm glow.';
    }
    return HOTSPOT_DIALOGUES.lamp[locale][1];
  }

  if (id === 'speakers') {
    if (track && track.isPlaying) {
      if (track.isDemo) {
        return locale === 'vi'
          ? `Loa bàn đang phát thử bản ${track.title} của ${track.artist}.`
          : `Desk speakers are looping demo track ${track.title} by ${track.artist}.`;
      }
      return locale === 'vi'
        ? `Đang phát ${track.title} của ${track.artist} qua Spotify.`
        : `Now playing ${track.title} by ${track.artist} on Spotify.`;
    }

    if (timeState === 'sleeping') {
      return locale === 'vi'
        ? 'Cặp loa đang tắt hẳn để giữ yên tĩnh cho giấc ngủ ban đêm.'
        : 'Both studio speakers are silent for the night.';
    }
    return HOTSPOT_DIALOGUES.speakers[locale][1];
  }

  if (id === 'window') {
    if (timeState === 'waking') {
      return locale === 'vi'
        ? 'Nắng sớm nghiêng qua rèm cửa, mây trắng trôi nhẹ trên bầu trời buổi sáng.'
        : 'Early morning sunbeams slant past the curtains while pixel clouds drift by.';
    }
    if (timeState === 'working') {
      return locale === 'vi'
        ? 'Trời ban ngày sáng rõ ngoài cửa sổ, nắng tự nhiên rọi vào đủ sáng cả bàn.'
        : 'Bright daytime sky outside the window, pouring natural sunlight across the desk.';
    }
    if (timeState === 'late_night') {
      return locale === 'vi'
        ? 'Hoàng hôn chuyển sang trời tối bên ngoài, vài ngôi sao đầu đêm bắt đầu lấp lánh.'
        : 'Dusk fades into evening outside the window as the first stars begin to twinkle.';
    }
    return locale === 'vi'
      ? 'Bầu trời đêm sâu thẳm ngoài cửa sổ, vầng trăng khuyết và sao đang canh giấc ngủ.'
      : 'Deep midnight sky outside with a pixel crescent moon and twinkling stars.';
  }

  if (id === 'monitor') {
    if (timeState === 'waking') {
      return locale === 'vi'
        ? 'Màn hình vừa bật giao diện chào buổi sáng, sẵn sàng cho một ngày thiết kế và code mới.'
        : 'Monitor just booted its warm morning screen, ready for a fresh day of design and code.';
    }
    if (timeState === 'late_night') {
      return locale === 'vi'
        ? 'Ánh màn hình hắt nhẹ lên mắt kính khi chỉnh nốt code và chi tiết giao diện ban đêm.'
        : 'Cool monitor light glints off the glasses while polishing late-night code and UI details.';
    }
    if (timeState === 'sleeping') {
      return locale === 'vi'
        ? 'Màn hình đã tắt nghỉ, chỉ còn chấm đèn chờ nhấp nháy nhẹ ở góc dưới.'
        : 'Monitor is asleep for the night with only a tiny standby LED blinking softly.';
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
        ? 'Vừa rời giường buổi sáng, chăn gối đã gấp gọn để bắt đầu ngày mới.'
        : 'Fresh out of bed for the morning with the quilt already neatly folded.';
    }
    return HOTSPOT_DIALOGUES.bed[locale][timeState === 'late_night' ? 1 : 0];
  }

  if (id === 'capybara') {
    if (timeState === 'sleeping') {
      return HOTSPOT_DIALOGUES.capybara[locale][2];
    }
    if (timeState === 'late_night') {
      return locale === 'vi'
        ? 'Chú capybara đội cam nhỏ đã lim dim mắt nằm nghỉ trên tấm thảm dệt.'
        : 'The orange-topped capybara is getting drowsy, curled neatly on the woven rug.';
    }
    if (track && track.isPlaying) {
      return locale === 'vi'
        ? 'Chú capybara đội quả cam nhỏ đang gật gù trên thảm theo nhịp nhạc lofi.'
        : 'The capybara with its tiny orange is bobbing happily on the rug to the beat.';
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
