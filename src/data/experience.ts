import { BilingualText } from './profile';

export interface ExperienceEntry {
  id: string;
  index: string;
  title: BilingualText;
  roleTag: BilingualText;
  summary: BilingualText;
  highlights: {
    vi: string[];
    en: string[];
  };
  tools: string[];
}

export const EXPERIENCE_DATA: ExperienceEntry[] = [
  {
    id: 'freelance-design',
    index: '01',
    title: {
      vi: 'Thiết kế giao diện và Trải nghiệm người dùng',
      en: 'Freelance UI Design and Visual Systems',
    },
    roleTag: {
      vi: 'Design tự do',
      en: 'Freelance Designer',
    },
    summary: {
      vi: 'Thiết kế hệ thống giao diện web và ứng dụng hiện đại theo hướng tối giản, bố cục bất đối xứng, chú trọng phân cấp chữ viết và khả năng đọc tiếng Việt.',
      en: 'Designs modern web and app interfaces with deliberate hierarchy, asymmetric editorial grids, dual-theme contrast, and clean Vietnamese typography.',
    },
    highlights: {
      vi: [
        'Xây dựng bộ biến màu CSS và thiết kế đồng bộ cho cả hai chế độ Sáng và Tối.',
        'Thiết kế bố cục Bento Grid, bảng điều khiển quản trị vận tải TMS và giao diện công nghiệp AgentMesh.',
        'Đáp ứng mượt mà trên mọi kích thước màn hình từ điện thoại 360px đến máy tính 1440px.',
      ],
      en: [
        'Built semantic CSS variable palettes supporting both light and dark modes.',
        'Crafted asymmetric Bento layouts, TMS logistics dashboards, and precision monitor screens.',
        'Structured responsive views scaling cleanly from 360px mobile to 1440px desktop screens.',
      ],
    },
    tools: ['Tailwind CSS', 'CSS3 Design Tokens', 'Figma', 'Responsive Grids', 'SVG'],
  },
  {
    id: 'frontend-interactive',
    index: '02',
    title: {
      vi: 'Phát triển Web Frontend và Đồ họa Tương tác',
      en: 'Frontend Engineering and Interactive Graphics',
    },
    roleTag: {
      vi: 'Phát triển Web',
      en: 'Frontend Developer',
    },
    summary: {
      vi: 'Hiện thực hóa các thiết kế phức tạp thành ứng dụng React, TypeScript và trò chơi trình duyệt sử dụng HTML5 Canvas 2D, WebGL và Web Audio API.',
      en: 'Translates visual concepts into production React and TypeScript web apps as well as interactive browser games using Canvas 2D, Three.js WebGL, and Web Audio.',
    },
    highlights: {
      vi: [
        'Xây dựng ứng dụng học ngoại ngữ qua bài báo học thuật với React, Vite và Tailwind CSS.',
        'Phát triển đồ họa hạt 3D bằng Three.js cùng GLSL Shaders trong Nebula Forge 3D và trò chơi mô phỏng 8-bit Deliver Simulator.',
        'Tích hợp Service Worker và Web App Manifest để ứng dụng cài đặt và chạy ổn định khi ngoại tuyến.',
      ],
      en: [
        'Engineered an academic reading and language study platform with React, Vite, and Tailwind CSS.',
        'Built real-time particle systems with Three.js and GLSL shaders plus an 8-bit Canvas delivery simulator.',
        'Implemented Service Workers and Web App Manifests for offline-first PWA support.',
      ],
    },
    tools: ['React', 'TypeScript', 'JavaScript', 'Vite', 'HTML5 Canvas', 'Three.js', 'Web Audio API', 'PWA'],
  },
  {
    id: 'mobile-android',
    index: '03',
    title: {
      vi: 'Phát triển Ứng dụng Android Nguyên bản',
      en: 'Native Android App Development',
    },
    roleTag: {
      vi: 'Lập trình Android',
      en: 'Android Developer',
    },
    summary: {
      vi: 'Thiết kế và lập trình ứng dụng di động ghi chú bằng hình ảnh tối ưu cho thiết bị phổ thông với Kotlin và Jetpack Compose.',
      en: 'Builds photo-first Android productivity apps optimized for low-memory devices using Kotlin and modern Jetpack libraries.',
    },
    highlights: {
      vi: [
        'Xây dựng giao diện Material 3 bằng Jetpack Compose kết hợp CameraX và Coil.',
        'Lưu trữ dữ liệu công việc ngoại tuyến qua Room Database cùng bộ ba widget màn hình chính bằng Jetpack Glance.',
        'Cấu hình tách gói APK theo từng kiến trúc chip nhằm giảm dung lượng cài đặt.',
      ],
      en: [
        'Developed declarative Material 3 screens with Jetpack Compose, CameraX, and Coil.',
        'Persisted local task databases via Room and created three home widgets with Jetpack Glance.',
        'Configured multi-ABI APK splits to minimize installation size on everyday phones.',
      ],
    },
    tools: ['Kotlin', 'Jetpack Compose', 'CameraX', 'Room Database', 'Jetpack Glance'],
  },
  {
    id: 'backend-qa',
    index: '04',
    title: {
      vi: 'Dịch vụ API, Thời gian thực và Kiểm thử Tự động',
      en: 'Edge APIs, Real-Time Services and Test Automation',
    },
    roleTag: {
      vi: 'Hệ thống & Kiểm thử',
      en: 'Edge & QA Automation',
    },
    summary: {
      vi: 'Thiết lập lớp trung gian bảo mật khóa AI, đồng bộ nhiều người chơi trực tuyến và tự động hóa kiểm thử trình duyệt cùng quy trình đóng gói.',
      en: 'Deploys serverless API proxies, real-time multiplayer servers, and automated browser test pipelines.',
    },
    highlights: {
      vi: [
        'Triển khai Cloudflare Workers và Durable Objects bảo vệ khóa Gemini API cho ứng dụng Marginal.',
        'Xây dựng máy chủ Node.js, Express và Socket.IO cho trò chơi trắc nghiệm hai đội Team Quiz Battle trên Render.',
        'Viết kịch bản đóng gói bằng Python cùng 13 bộ kiểm thử Playwright và quy trình GitHub Actions tự động.',
      ],
      en: [
        'Deployed Cloudflare Workers with Durable Objects to protect Gemini API keys and bypass CORS.',
        'Created real-time multiplayer game rooms with Node.js, Express, and Socket.IO hosted on Render.',
        'Automated single-file builds with Python, browser E2E suites with Playwright, and CI workflows with GitHub Actions.',
      ],
    },
    tools: ['Cloudflare Workers', 'Node.js', 'Socket.IO', 'Python', 'Playwright', 'GitHub Actions'],
  },
];
