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
      vi: 'Thiết kế giao diện, nhận diện và pixel art',
      en: 'UI/UX, Branding & Pixel Art',
    },
    roleTag: {
      vi: 'Thiết kế sản phẩm & Đồ họa',
      en: 'Product Design & Graphics',
    },
    summary: {
      vi: 'Mình thiết kế giao diện và vẽ đồ họa cho chính các sản phẩm của mình, từ logo đến icon.',
      en: 'I design the interface and draw the graphics for my own products, from logos to icons.',
    },
    highlights: {
      vi: [
        'Vẽ ảnh xe Honda Cub pixel art và bộ icon 16x16 chi tiết cho game shipper, làm lại những icon chưa cân đối như mặt trăng và cúp.',
        'Thiết kế lại logo và giao diện kiểu Ink & Flash cho SnapTask, chọn nút chụp có dấu tick màu vàng trên nền mực, giữ cả bản sáng lẫn tối.',
        'Thử hai hướng giao diện cho game shipper, 8-bit hoài cổ và flat kiểu ứng dụng giao hàng hiện đại, rồi để hai hướng chạy trên hai nhánh riêng.',
      ],
      en: [
        'Drew the pixel art Honda Cub and a detailed 16x16 icon set for the shipper game, redoing unbalanced ones like the moon and the trophy.',
        'Redesigned the logo and the Ink & Flash interface for SnapTask, choosing a capture button with a tick, yellow on ink, with both light and dark versions.',
        'Tried two directions for the shipper game, retro 8-bit and a flat modern delivery-app look, each kept on its own branch.',
      ],
    },
    tools: ['Pixel art', 'Logo & Branding', 'Light & Dark Theme', 'VT323 & Nunito', 'Antigravity'],
  },
  {
    id: 'frontend-interactive',
    index: '02',
    title: {
      vi: 'Phát triển web app và game tương tác',
      en: 'Interactive Front-end & Web Games',
    },
    roleTag: {
      vi: 'Lập trình Giao diện & Game Web',
      en: 'Front-end & Web Game Dev',
    },
    summary: {
      vi: 'Mình viết giao diện web và game chạy ngay trên trình duyệt, tập trung vào độ mượt và trải nghiệm.',
      en: 'I build web interfaces and games that run right in the browser, focusing on smoothness and experience.',
    },
    highlights: {
      vi: [
        'Xây Marginal bằng React, gồm các màn đọc bài báo, luyện viết, luyện phát âm và khung chat hỗ trợ bằng AI.',
        'Làm game shipper với vòng lặp trung tâm cho phép tạm dừng cả lúc đang chạy hiệu ứng, âm thanh hiệu ứng bằng WebAudio, thống kê cuối ngày và hệ thống đời sống nhiều kết thúc.',
        'Làm giao diện Team Quiz Battle cho cả chủ phòng lẫn người chơi, có sảnh chờ, tab soạn câu hỏi và thời gian trả lời riêng cho từng câu.',
      ],
      en: [
        'Built Marginal in React, with screens for reading articles, writing practice, pronunciation practice and an AI-assisted chat panel.',
        'Built the shipper game around a central loop that can pause even mid-animation, with WebAudio sound effects, end-of-day stats and a life system with multiple endings.',
        'Built the Team Quiz Battle interface for host and players, with a lobby, a question editor tab and per-question answer times.',
      ],
    },
    tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'Tailwind CSS', 'Canvas', 'WebAudio'],
  },
  {
    id: 'mobile-android',
    index: '03',
    title: {
      vi: 'Ứng dụng di động và web chạy offline',
      en: 'Mobile Android & Cross-platform PWA',
    },
    roleTag: {
      vi: 'Di động Android & PWA',
      en: 'Android & Offline PWA',
    },
    summary: {
      vi: 'Mình làm sản phẩm chạy tốt trên điện thoại, cả ứng dụng Android lẫn web cài được và chơi không cần mạng.',
      en: 'I make products that work well on phones, both an Android app and web apps that can be installed and used offline.',
    },
    highlights: {
      vi: [
        'Làm ứng dụng Android SnapTask để ghi chú việc cần làm bằng ảnh.',
        'Biến game shipper thành web chơi được offline bằng service worker và manifest, tách nhạc và phông chữ ra file riêng để tải nhanh trên GitHub Pages.',
        'Chỉnh bố cục riêng cho mobile, như màn chính một cột, thanh chỉ số gọn một hàng, các mục gấp được và trang Nâng cấp có ô giá đều nhau.',
      ],
      en: [
        'Built the Android app SnapTask for capturing to-dos with a photo.',
        'Turned the shipper game into an offline-capable web app with a service worker and manifest, splitting music and fonts into separate files so it loads fast on GitHub Pages.',
        'Tuned layouts for mobile, such as a single-column home screen, a compact one-row stats bar, collapsible sections and an Upgrade page with evenly sized price cells.',
      ],
    },
    tools: ['Android', 'Kotlin', 'PWA', 'Service Worker', 'Web App Manifest', 'Responsive Design'],
  },
  {
    id: 'backend-qa',
    index: '04',
    title: {
      vi: 'Back-end, proxy đám mây, tích hợp AI và kiểm thử',
      en: 'Back-end, Cloud Proxy & QA',
    },
    roleTag: {
      vi: 'Hạ tầng, AI Proxy & Kiểm thử',
      en: 'Server, AI Proxy & Automated QA',
    },
    summary: {
      vi: 'Mình tự dựng phần máy chủ cần thiết, nối với AI và kiểm thử để sản phẩm chạy ổn định.',
      en: 'I set up the server side I need, connect it to AI and test it so products run reliably.',
    },
    highlights: {
      vi: [
        'Viết Cloudflare Worker làm proxy tới Gemini API cho Marginal, rồi sửa lỗi bị Google chặn theo vùng bằng cách ghim Durable Object ở khu vực Tây Bắc Mỹ.',
        'Xây máy chủ thời gian thực cho Team Quiz Battle bằng Node.js, Express và Socket.IO, triển khai trên Render với đường kiểm tra sức khỏe riêng.',
        'Kiểm thử game shipper bằng Playwright, viết kiểm tra hợp lệ cho dữ liệu lưu và đổi service worker sang ưu tiên mạng sau khi tìm ra lỗi do bộ nhớ đệm cũ.',
      ],
      en: [
        'Wrote a Cloudflare Worker as a proxy to the Gemini API for Marginal, then fixed a regional block from Google by pinning the Durable Object to the western North America region.',
        'Built the real-time server for Team Quiz Battle with Node.js, Express and Socket.IO, deployed on Render with a dedicated health check route.',
        'Tested the shipper game with Playwright, added validation for saved data and switched the service worker to network-first after tracing a bug to stale cache.',
      ],
    },
    tools: [
      'Cloudflare Workers',
      'Durable Objects',
      'Gemini API',
      'Node.js',
      'Express',
      'Socket.IO',
      'Render',
      'Playwright',
      'Python build scripts',
    ],
  },
];
