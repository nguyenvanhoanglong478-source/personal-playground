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
      vi: 'Thiết kế UI/UX & Nhận diện',
      en: 'UI/UX & Brand Identity',
    },
    roleTag: {
      vi: 'Thiết kế giao diện & Đồ họa',
      en: 'Product UI & Graphics',
    },
    summary: {
      vi: 'Mình tự vẽ giao diện, logo và đồ họa cho các sản phẩm tự làm để vừa nhìn thuận mắt vừa dễ bấm.',
      en: 'I design interfaces, logos, and custom graphics for my own products so they feel clear and easy to use.',
    },
    highlights: {
      vi: [
        'Tự vẽ pixel art xe Honda Cub, bộ icon 16x16 cho game shipper và thử nghiệm cả hai hướng giao diện hoài cổ lẫn hiện đại.',
        'Làm bộ nhận diện Ink & Flash kèm logo nút chụp có dấu tick cho SnapTask Android với đủ hai giao diện sáng và tối.',
      ],
      en: [
        'Drew the pixel-art Honda Cub, a matching 16x16 icon set for the shipper game, and explored both retro and modern layouts.',
        'Created the Ink & Flash look and capture-tick logo for SnapTask Android with crisp light and dark themes.',
      ],
    },
    tools: ['Pixel art', 'Logo & Branding', 'Light & Dark Theme', 'Antigravity'],
  },
  {
    id: 'frontend-interactive',
    index: '02',
    title: {
      vi: 'Web App & Game Web',
      en: 'Web Apps & Browser Games',
    },
    roleTag: {
      vi: 'Giao diện tương tác',
      en: 'Interactive Front-end',
    },
    summary: {
      vi: 'Mình code web app và game chạy thẳng trên trình duyệt, chăm kỹ chuyển động, âm thanh và bố cục điện thoại.',
      en: 'I build web apps and games that run right in the browser, tuning interactions, sound, and mobile layouts.',
    },
    highlights: {
      vi: [
        'Dựng Marginal bằng React và Tailwind CSS gồm màn đọc bài báo song ngữ, luyện viết, luyện phát âm và khung chat hỏi bài.',
        'Lập trình game shipper và phòng đấu trắc nghiệm Team Quiz Battle mượt trên điện thoại lẫn máy tính, kèm âm thanh WebAudio.',
      ],
      en: [
        'Built Marginal with React and Tailwind CSS, packing bilingual article reading, writing, speech practice, and AI chat into one screen.',
        'Coded the shipper game and live two-team rooms in Team Quiz Battle with WebAudio feedback and clean responsive screens.',
      ],
    },
    tools: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Canvas', 'WebAudio'],
  },
  {
    id: 'mobile-android',
    index: '03',
    title: {
      vi: 'Android & PWA Offline',
      en: 'Android & Offline PWA',
    },
    roleTag: {
      vi: 'Ứng dụng di động',
      en: 'Mobile & Offline Web',
    },
    summary: {
      vi: 'Mình làm ứng dụng chạy gọn trên điện thoại, từ app Android gốc đến web app cài được và mở không cần mạng.',
      en: 'I build tools made for phones, from a native Android app to installable web apps that still work offline.',
    },
    highlights: {
      vi: [
        'Phát triển ứng dụng Android SnapTask bằng Kotlin để chụp nhanh ảnh và lưu ngay thành việc cần làm.',
        'Đưa Service Worker vào game shipper và AgentMesh để cài lên màn hình chính điện thoại và dùng ổn ngay cả khi mất mạng.',
      ],
      en: [
        'Built SnapTask in Kotlin so you can snap a quick photo and turn it straight into a to-do item on Android.',
        'Added Service Workers to the shipper game and AgentMesh so both install on a home screen and work reliably offline.',
      ],
    },
    tools: ['Android', 'Kotlin', 'PWA', 'Service Worker', 'Web App Manifest', 'Responsive UI'],
  },
  {
    id: 'backend-qa',
    index: '04',
    title: {
      vi: 'Back-end, Proxy AI & Kiểm thử',
      en: 'Back-end, AI Proxy & QA',
    },
    roleTag: {
      vi: 'Server, AI & Test tự động',
      en: 'Server, AI & Automated QA',
    },
    summary: {
      vi: 'Mình tự dựng phần server cần thiết, nối qua AI và viết kịch bản test để sản phẩm chạy ổn trước khi mở cho mọi người.',
      en: 'I set up the servers I need, wire up AI APIs, and write automated checks before shipping.',
    },
    highlights: {
      vi: [
        'Viết Cloudflare Worker cùng Durable Objects làm proxy gọi Gemini API cho Marginal, và dựng server Socket.IO trên Render cho phòng đấu trắc nghiệm.',
        'Viết kịch bản Playwright để kiểm tra tự động các luồng bấm phức tạp và dữ liệu lưu trên game shipper lẫn AgentMesh.',
      ],
      en: [
        'Wrote a Cloudflare Worker with Durable Objects to proxy Gemini API calls for Marginal, plus a Node.js and Socket.IO room server for Team Quiz Battle.',
        'Wrote Playwright test flows to catch UI and save-state bugs across the shipper game and AgentMesh before deploying.',
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
      'Python',
    ],
  },
];
