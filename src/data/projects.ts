import { BilingualText } from './profile';

export type SkillCategory = 'language' | 'framework' | 'tool' | 'deploy';

export interface TechItem {
  name: string;
  category: SkillCategory;
  detail: BilingualText;
}

export interface ProjectItem {
  id: 'marginal' | 'snaptask' | 'quiz-battle' | 'be-the-driver';
  indexNumber: string;
  title: string;
  subtitle: BilingualText;
  description: BilingualText;
  marginaliaAnnotation: BilingualText;
  linkPlaceholder: string;
  repoUrl: string;
  bentoSpan: 'wide' | 'tall' | 'standard';
  evidenceFiles: string[];
  technologies: TechItem[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'marginal',
    indexNumber: 'FOLIO — 01',
    title: 'Marginal',
    subtitle: {
      vi: 'Web app đọc và học ngoại ngữ qua bài báo học thuật',
      en: 'Web app for foreign language learning through academic articles',
    },
    description: {
      vi: 'Cho phép dán văn bản hoặc URL bài báo khoa học để dịch từng câu theo ngữ cảnh, hỏi đáp AI về thuật ngữ học thuật, luyện viết có chấm sửa ngữ pháp và luyện phát âm trực tiếp trên trình duyệt.',
      en: 'Allows pasting academic articles or URLs for sentence-by-sentence contextual translation, AI terminology Q&A, writing grammar correction, and browser-native pronunciation practice.',
    },
    marginaliaAnnotation: {
      vi: 'Kiến trúc bảo mật khóa API: Dùng Cloudflare Worker kết hợp Durable Object (GeminiProxy ghim vùng US-West) đứng giữa trình duyệt và Gemini 2.5 Flash, đồng thời vượt rào cản CORS khi tải bài báo từ URL bất kỳ.',
      en: 'API Key Isolation: Uses a Cloudflare Worker + Durable Object (GeminiProxy pinned to US-West) between the static frontend and Gemini 2.5 Flash, bypassing browser CORS when fetching external article URLs.',
    },
    linkPlaceholder: '[[link]]',
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/Marginal',
    bentoSpan: 'wide',
    evidenceFiles: [
      'frontend/package.json',
      'frontend/vite.config.js',
      'frontend/tailwind.config.js',
      'worker/package.json',
      'worker/wrangler.toml',
      'worker/src/index.js',
      'frontend/src/lib/speech.js',
    ],
    technologies: [
      {
        name: 'JavaScript (ES6+)',
        category: 'language',
        detail: {
          vi: 'Ngôn ngữ chính cho cả giao diện React (.jsx) và Cloudflare Worker proxy.',
          en: 'Core language across React (.jsx) components and the Cloudflare Worker proxy.',
        },
      },
      {
        name: 'React 18',
        category: 'framework',
        detail: {
          vi: 'react ^18.3.1 & react-dom ^18.3.1 (tách biệt ArticleReader, ChatPanel, WritingPractice, PronunciationPractice).',
          en: 'react ^18.3.1 & react-dom ^18.3.1 powering modular reader, chat, writing, and pronunciation views.',
        },
      },
      {
        name: 'Tailwind CSS 3',
        category: 'framework',
        detail: {
          vi: 'tailwindcss ^3.4.4 kết hợp PostCSS & Autoprefixer định hình bố cục đọc học thuật.',
          en: 'tailwindcss ^3.4.4 with PostCSS & Autoprefixer for clean academic reading typography.',
        },
      },
      {
        name: 'Vite 5',
        category: 'tool',
        detail: {
          vi: 'vite ^5.3.1 & @vitejs/plugin-react ^4.3.1 đóng gói frontend tốc độ cao.',
          en: 'vite ^5.3.1 & @vitejs/plugin-react ^4.3.1 for fast frontend bundling.',
        },
      },
      {
        name: 'Gemini 2.5 Flash & Web Speech API',
        category: 'tool',
        detail: {
          vi: 'Tích hợp mô hình gemini-2.5-flash qua Worker và SpeechSynthesis / SpeechRecognition nội tại của trình duyệt.',
          en: 'Integrates gemini-2.5-flash via Worker alongside browser-native SpeechSynthesis & SpeechRecognition.',
        },
      },
      {
        name: 'Cloudflare Workers & GitHub Pages',
        category: 'deploy',
        detail: {
          vi: 'Backend triển khai bằng Wrangler ^4.0.0 (Durable Objects SQLite); Frontend tĩnh triển khai qua gh-pages ^6.1.1.',
          en: 'Backend deployed via Wrangler ^4.0.0 (Durable Objects SQLite); static frontend deployed via gh-pages ^6.1.1.',
        },
      },
    ],
  },
  {
    id: 'snaptask',
    indexNumber: 'FOLIO — 02',
    title: 'SnapTask',
    subtitle: {
      vi: 'App Android ghi chú việc cần làm bằng ảnh',
      en: 'Android photo-first task & reminder note-taking app',
    },
    description: {
      vi: 'Ứng dụng Android原生 giúp chụp ảnh nhanh công việc cần làm, phân loại theo thư mục, xem bảng tiến độ (Board/Calendar), đặt lịch nhắc nhở thông báo và hiển thị trực tiếp lên màn hình chính qua bộ 3 Widget.',
      en: 'Native Android app for capturing tasks via camera, organizing into folders, tracking on Board/Calendar views, scheduling reminders, and pinning to 3 Home Screen widgets.',
    },
    marginaliaAnnotation: {
      vi: 'Tối ưu cho máy cấu hình thấp: Chia tách ABI (arm64-v8a, armeabi-v7a) trong app/build.gradle.kts giúp giảm dung lượng APK xuống ~10MB, kết hợp Coil Compose tiết kiệm RAM khi tải ảnh chụp.',
      en: 'Low-RAM Optimization: Configures ABI splits (arm64-v8a, armeabi-v7a) in app/build.gradle.kts to shrink APK size to ~10MB, paired with Coil Compose for memory-safe image loading.',
    },
    linkPlaceholder: '[[link]]',
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/snaptask-android',
    bentoSpan: 'tall',
    evidenceFiles: [
      'app/build.gradle.kts',
      'gradle/libs.versions.toml',
      'app/src/main/AndroidManifest.xml',
      '.github/workflows/build_apk.yml',
    ],
    technologies: [
      {
        name: 'Kotlin 1.9',
        category: 'language',
        detail: {
          vi: 'Kotlin 1.9.22 (JVM Target 17) kết hợp Kotlin Coroutines 1.8.0 xử lý bất đồng bộ.',
          en: 'Kotlin 1.9.22 (JVM Target 17) with Kotlin Coroutines 1.8.0 for asynchronous flows.',
        },
      },
      {
        name: 'Jetpack Compose (Material 3)',
        category: 'framework',
        detail: {
          vi: 'Compose BOM 2024.02.02, Material 3 UI, Activity Compose 1.8.2.',
          en: 'Compose BOM 2024.02.02, Material 3 declarative UI, Activity Compose 1.8.2.',
        },
      },
      {
        name: 'CameraX & Coil Compose',
        category: 'framework',
        detail: {
          vi: 'AndroidX CameraX 1.3.2 (core, camera2, lifecycle, view) chụp ảnh trực tiếp & Coil 2.6.0 hiển thị ảnh mượt.',
          en: 'AndroidX CameraX 1.3.2 for direct camera capture & Coil 2.6.0 for memory-efficient image rendering.',
        },
      },
      {
        name: 'Room Database (SQLite)',
        category: 'tool',
        detail: {
          vi: 'AndroidX Room 2.6.1 (runtime, ktx, kapt compiler) lưu trữ cục bộ TaskEntity & lược đồ schema v3.',
          en: 'AndroidX Room 2.6.1 (runtime, ktx, kapt compiler) for local SQLite persistence with schema v3.',
        },
      },
      {
        name: 'Jetpack Glance (AppWidget)',
        category: 'framework',
        detail: {
          vi: 'AndroidX Glance 1.0.0 xây dựng 3 Home Screen Widgets (SnapTask, Locket Focus, Notion Stack).',
          en: 'AndroidX Glance 1.0.0 powering 3 Home Screen Widgets (SnapTask, Locket Focus, Notion Stack).',
        },
      },
      {
        name: 'Gradle Kotlin DSL & GitHub Actions',
        category: 'deploy',
        detail: {
          vi: 'Android Gradle Plugin 8.3.1 & workflow .github/workflows/build_apk.yml tự động biên dịch APK.',
          en: 'Android Gradle Plugin 8.3.1 & .github/workflows/build_apk.yml for automated multi-ABI APK builds.',
        },
      },
    ],
  },
  {
    id: 'quiz-battle',
    indexNumber: 'FOLIO — 03',
    title: 'Team Quiz Battle',
    subtitle: {
      vi: 'Web game trắc nghiệm 2 đội thời gian thực, deploy trên Render',
      en: 'Real-time two-team multiplayer quiz racing game on Render',
    },
    description: {
      vi: 'Trò chơi đua xe trắc nghiệm thời gian thực dành cho 2 đội (tối đa 30 người chơi/đội). Người chơi quét mã phòng 6 ký tự trên điện thoại để trả lời câu hỏi A/B/C/D; trả lời càng nhanh và chính xác càng đẩy xe của đội mình về đích.',
      en: 'Real-time two-team quiz race supporting up to 30 players per team. Players join via a 6-character room code on mobile and tap A/B/C/D; fast and accurate answers propel their team’s race car toward the finish line.',
    },
    marginaliaAnnotation: {
      vi: 'Quản trị phòng thi không cần cơ sở dữ liệu ngoài: Máy chủ server.js xác thực Host bằng chữ ký HMAC-SHA256 trong cookie HttpOnly (khóa IP 15 phút nếu sai mật khẩu 5 lần) và cho phép soạn/nhập/xuất bộ câu hỏi JSON ngay tại sảnh chờ.',
      en: 'Zero-DB Room Engine: server.js authenticates the Host via HMAC-SHA256 signed HttpOnly cookies (with 15-min brute-force lockout) and includes an in-lobby JSON question set editor.',
    },
    linkPlaceholder: '[[link]]',
    repoUrl: 'https://github.com/anhmt821152-ctrl/bea',
    bentoSpan: 'standard',
    evidenceFiles: [
      'package.json',
      'server.js',
      'data/questions.json',
      'public/host.html',
      'public/play.html',
      'public/js/editor.js',
    ],
    technologies: [
      {
        name: 'Node.js & Express 4',
        category: 'framework',
        detail: {
          vi: 'Node.js >= 18 & Express ^4.18.2 phục vụ giao diện tĩnh, xác thực admin và điểm kiểm tra /healthz.',
          en: 'Node.js >= 18 & Express ^4.18.2 serving game views, admin auth, and the /healthz check endpoint.',
        },
      },
      {
        name: 'Socket.IO 4',
        category: 'framework',
        detail: {
          vi: 'socket.io ^4.7.2 đồng bộ trạng thái phòng chờ, bộ đếm ngược câu hỏi và vị trí xe đua tức thời.',
          en: 'socket.io ^4.7.2 synchronizing lobby rooms, question countdowns, and live race car positions.',
        },
      },
      {
        name: 'JavaScript (ES6+) & HTML5/CSS3',
        category: 'language',
        detail: {
          vi: 'Hệ thống client thuần (host.js, play.js, editor.js, login.js) nhẹ, phản hồi tức thì trên trình duyệt di động.',
          en: 'Zero-dependency vanilla client scripts (host.js, play.js, editor.js) for instant mobile responsiveness.',
        },
      },
      {
        name: 'HMAC HttpOnly Session & JSON Store',
        category: 'tool',
        detail: {
          vi: 'Xác thực phiên Host bằng chữ ký mật mã Node crypto và trình biên tập bộ đề xuất/nhập JSON.',
          en: 'Cryptographic HMAC session cookies via Node crypto plus JSON question import/export validation.',
        },
      },
      {
        name: 'Render.com',
        category: 'deploy',
        detail: {
          vi: 'Triển khai Web Service tự động (Auto-Deploy on Commit) với giám sát /healthz.',
          en: 'Deployed as a Render Web Service with Auto-Deploy on Commit and /healthz monitoring.',
        },
      },
    ],
  },
  {
    id: 'be-the-driver',
    indexNumber: 'FOLIO — 04',
    title: 'Be The Driver (Một Ngày Làm Shipper)',
    subtitle: {
      vi: 'Game mô phỏng tài xế giao hàng & đời sống đô thị 8-bit',
      en: '8-bit urban delivery driver & life simulation game',
    },
    description: {
      vi: 'Trò chơi mô phỏng hành trình 24 tháng của một tài xế công nghệ nơi đô thị với mục tiêu tích lũy 100 triệu VND. Quản lý xăng xe, thể lực, đơn ghép giờ cao điểm, biến động giá vàng/cổ phiếu, tiền gửi về quê và các bước ngoặt cuộc sống.',
      en: 'Simulates a 24-month journey of a city delivery rider aiming to save 100M VND while balancing stamina, fuel, peak-hour combo orders, gold/stock fluctuations, family remittances, and life events.',
    },
    marginaliaAnnotation: {
      vi: 'Đóng gói độc lập & Kiểm thử nghiêm ngặt: Kịch bản Python build.py gom toàn bộ mã nguồn thành một tệp HTML kèm Service Worker chạy offline, được bảo chứng bởi 13 bộ kiểm thử tự động Playwright (bao gồm cả fuzz testing).',
      en: 'Self-Contained & Fuzz-Tested: A custom Python build.py bundler compiles the game into a single offline-capable PWA HTML artifact, backed by 13 Playwright test suites including random-play fuzzing.',
    },
    linkPlaceholder: '[[link]]',
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/Deliver-Simulator',
    bentoSpan: 'wide',
    evidenceFiles: [
      'index.html',
      'build.py',
      'src/loop.js',
      'src/audio.js',
      'src/state.js',
      'sw.js',
      'manifest.webmanifest',
      'tests/test_gameplay.py',
    ],
    technologies: [
      {
        name: 'JavaScript (ES6+) & HTML5/CSS3',
        category: 'language',
        detail: {
          vi: 'Vòng lặp đồng hồ trò chơi thống nhất (src/loop.js) và bộ tự kiểm tra/sửa lỗi trạng thái (repairState).',
          en: 'Unified game clock loop (src/loop.js) with schema validation and state self-repair (repairState).',
        },
      },
      {
        name: 'HTML5 Canvas 2D & Web Audio API',
        category: 'framework',
        detail: {
          vi: 'Đồ họa cảnh phố ngày/đêm, mưa rơi, hiệu ứng hạt và bộ tổng hợp âm thanh 8-bit không cần file mẫu.',
          en: 'Day/night scrolling streetscape, rain & particle effects, plus synthesized 8-bit Web Audio SFX.',
        },
      },
      {
        name: 'Python 3',
        category: 'language',
        detail: {
          vi: 'Viết trình đóng gói tùy biến build.py (nhúng tài nguyên, sinh Service Worker) và kịch bản kiểm thử.',
          en: 'Powers the custom build.py single-file artifact bundler, Service Worker generator, and test scripts.',
        },
      },
      {
        name: 'PWA (Service Worker & Manifest)',
        category: 'tool',
        detail: {
          vi: 'Chiến lược network-first kèm fallback ngoại tuyến trong sw.js và manifest.webmanifest cài đặt lên màn hình chính.',
          en: 'Network-first caching with offline fallback in sw.js plus installable manifest.webmanifest.',
        },
      },
      {
        name: 'Playwright (Python)',
        category: 'tool',
        detail: {
          vi: '13 bộ kiểm thử trình duyệt tự động (test_gameplay, test_life, test_offline, test_fuzz...).',
          en: '13 automated browser test suites covering gameplay, life events, offline mode, and fuzz testing.',
        },
      },
      {
        name: 'GitHub Pages',
        category: 'deploy',
        detail: {
          vi: 'Phân phối bản dựng tĩnh nhẹ (~217KB sau tối ưu bảng màu sprite) và hỗ trợ xuất bản Claude Artifact.',
          en: 'Serves the lightweight static build (~217KB optimized palette) and supports self-contained Artifact export.',
        },
      },
    ],
  },
];
