import { BilingualText } from './profile';

export type SkillGroupId = 'platforms' | 'design' | 'frontend' | 'backend' | 'workflow';

export interface SkillChipItem {
  id: string;
  label: BilingualText;
  projects: string[];
  evidence: BilingualText;
}

export interface SkillGroup {
  id: SkillGroupId;
  items: SkillChipItem[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'platforms',
    items: [
      {
        id: 'web',
        label: { vi: 'Web', en: 'Web' },
        projects: ['Một ngày làm shipper', 'Marginal', 'Team Quiz Battle', 'TMS Mini v2.0', 'AgentMesh'],
        evidence: {
          vi: 'Toàn bộ sản phẩm web chạy trực tiếp trên trình duyệt máy tính và điện thoại.',
          en: 'All web products running natively across desktop and mobile browsers.',
        },
      },
      {
        id: 'pwa-offline',
        label: { vi: 'PWA Offline', en: 'PWA Offline' },
        projects: ['Một ngày làm shipper', 'AgentMesh'],
        evidence: {
          vi: 'Cài đặt lên màn hình chính và chạy ngoại tuyến ổn định qua Service Worker.',
          en: 'Installable home screen web apps functioning reliably offline via Service Workers.',
        },
      },
      {
        id: 'android',
        label: { vi: 'Android', en: 'Android' },
        projects: ['SnapTask Android'],
        evidence: {
          vi: 'Ứng dụng di động ghi chú bằng ảnh viết cho thiết bị Android.',
          en: 'Native Android mobile app built for photo-based task notes.',
        },
      },
      {
        id: 'cloudflare-edge',
        label: { vi: 'Cloudflare Edge', en: 'Cloudflare Edge' },
        projects: ['Marginal'],
        evidence: {
          vi: 'Chạy lớp proxy trung gian sát người dùng, cố định vùng kết nối Gemini API.',
          en: 'Edge proxy routing Gemini API requests from a fixed North America West region.',
        },
      },
      {
        id: 'github-pages',
        label: { vi: 'GitHub Pages', en: 'GitHub Pages' },
        projects: ['Một ngày làm shipper', 'Marginal', 'TMS Mini v2.0', 'AgentMesh'],
        evidence: {
          vi: 'Triển khai và phục vụ giao diện web tĩnh trực tiếp từ kho mã nguồn.',
          en: 'Hosting static builds directly from personal GitHub repositories.',
        },
      },
      {
        id: 'render',
        label: { vi: 'Render', en: 'Render' },
        projects: ['Team Quiz Battle'],
        evidence: {
          vi: 'Vận hành máy chủ Node.js và Socket.IO cho các phòng đấu trực tiếp.',
          en: 'Hosting the Node.js and Socket.IO server for live quiz rooms.',
        },
      },
    ],
  },
  {
    id: 'design',
    items: [
      {
        id: 'ui-ux',
        label: { vi: 'UI/UX', en: 'UI/UX' },
        projects: ['Một ngày làm shipper', 'Marginal', 'Team Quiz Battle', 'SnapTask Android', 'TMS Mini v2.0', 'AgentMesh'],
        evidence: {
          vi: 'Thiết kế luồng sử dụng, phân cấp chữ viết và bố cục nhất quán theo nhu cầu thật.',
          en: 'Shaped user flows, type hierarchy and clean layouts around real tasks.',
        },
      },
      {
        id: 'logo-branding',
        label: { vi: 'Logo & Branding', en: 'Logo & Branding' },
        projects: ['SnapTask Android', 'Một ngày làm shipper'],
        evidence: {
          vi: 'Thiết kế logo nút chụp có dấu tick cho SnapTask và nhận diện phong cách Ink & Flash.',
          en: 'Created the capture-button-and-tick logo for SnapTask and its Ink & Flash identity.',
        },
      },
      {
        id: 'pixel-art',
        label: { vi: 'Pixel Art 8-bit', en: 'Pixel Art 8-bit' },
        projects: ['Một ngày làm shipper'],
        evidence: {
          vi: 'Vẽ tay xe Honda Cub pixel art và bộ icon 16x16 cho thanh trạng thái trong game.',
          en: 'Hand-drawn pixel art Honda Cub and a 16x16 HUD icon set in the shipper game.',
        },
      },
      {
        id: 'light-dark-ui',
        label: { vi: 'Giao diện sáng và tối', en: 'Light & Dark UI' },
        projects: ['SnapTask Android', 'Marginal'],
        evidence: {
          vi: 'Giữ độ tương phản rõ ràng trên cả hai chế độ sáng và tối.',
          en: 'Maintained crisp contrast across both light and dark surface modes.',
        },
      },
      {
        id: 'responsive',
        label: { vi: 'Responsive', en: 'Responsive' },
        projects: ['Một ngày làm shipper', 'Marginal', 'Team Quiz Battle', 'TMS Mini v2.0', 'AgentMesh'],
        evidence: {
          vi: 'Tinh chỉnh bố cục một cột gọn gàng, ô giá đều nhau và hiển thị chuẩn trên di động.',
          en: 'Refined single-column layouts and even mobile grid cells across screen widths.',
        },
      },
    ],
  },
  {
    id: 'frontend',
    items: [
      {
        id: 'html',
        label: { vi: 'HTML', en: 'HTML' },
        projects: ['Một ngày làm shipper', 'Team Quiz Battle', 'TMS Mini v2.0', 'AgentMesh'],
        evidence: {
          vi: 'Cấu trúc ngữ nghĩa sạch cho game trình duyệt và hệ thống cổng điều phối.',
          en: 'Semantic markup powering browser games and dispatch dashboards.',
        },
      },
      {
        id: 'css',
        label: { vi: 'CSS', en: 'CSS' },
        projects: ['Một ngày làm shipper', 'Team Quiz Battle', 'TMS Mini v2.0', 'AgentMesh'],
        evidence: {
          vi: 'Biến màu chủ đề, bố cục lưới responsive và hiệu ứng phản hồi mượt mà.',
          en: 'Custom properties, responsive grids and smooth tactile UI states.',
        },
      },
      {
        id: 'javascript',
        label: { vi: 'JavaScript', en: 'JavaScript' },
        projects: ['Một ngày làm shipper', 'Team Quiz Battle', 'TMS Mini v2.0', 'AgentMesh'],
        evidence: {
          vi: 'Điều khiển vòng lặp game, sự kiện thời gian thực và lưu trữ trạng thái.',
          en: 'Driving game loops, real-time room state and local storage persistence.',
        },
      },
      {
        id: 'typescript',
        label: { vi: 'TypeScript', en: 'TypeScript' },
        projects: ['Marginal', 'SnapTask Android'],
        evidence: {
          vi: 'Kiểm soát chặt cấu trúc dữ liệu giao diện web và cấu hình dự án.',
          en: 'Strict static types keeping component data and UI state predictable.',
        },
      },
      {
        id: 'react',
        label: { vi: 'React', en: 'React' },
        projects: ['Marginal'],
        evidence: {
          vi: 'Tổ chức các màn đọc bài báo, luyện viết, luyện phát âm và chat AI.',
          en: 'Structuring article reading, writing practice, speech and AI chat screens.',
        },
      },
      {
        id: 'vite',
        label: { vi: 'Vite', en: 'Vite' },
        projects: ['Marginal'],
        evidence: {
          vi: 'Phát triển nhanh và đóng gói mã nguồn tối ưu cho GitHub Pages.',
          en: 'Fast local dev feedback and lean production bundles for GitHub Pages.',
        },
      },
      {
        id: 'tailwind-css',
        label: { vi: 'Tailwind CSS', en: 'Tailwind CSS' },
        projects: ['Marginal'],
        evidence: {
          vi: 'Định kiểu giao diện đọc bài gọn gàng trên màn hình lớn lẫn điện thoại.',
          en: 'Consistent utility styling across desktop and mobile reading screens.',
        },
      },
      {
        id: 'canvas',
        label: { vi: 'Canvas', en: 'Canvas' },
        projects: ['Một ngày làm shipper', 'AgentMesh'],
        evidence: {
          vi: 'Vẽ hiệu ứng hạt chuyển động và sơ đồ mạng đa tác nhân tương tác.',
          en: 'Rendering particle scenes and interactive multi-agent node graphs.',
        },
      },
      {
        id: 'webaudio',
        label: { vi: 'WebAudio', en: 'WebAudio' },
        projects: ['Một ngày làm shipper'],
        evidence: {
          vi: 'Tổng hợp âm thanh hiệu ứng, tách công tắc và âm lượng riêng cho nhạc nền.',
          en: 'Synthesizing retro SFX with independent background music toggle and volume.',
        },
      },
      {
        id: 'service-worker',
        label: { vi: 'Service Worker', en: 'Service Worker' },
        projects: ['Một ngày làm shipper', 'AgentMesh'],
        evidence: {
          vi: 'Hỗ trợ chơi ngoại tuyến và chiến lược ưu tiên mạng tránh kẹt cache cũ.',
          en: 'Enabling offline play with network-first caching to avoid stale assets.',
        },
      },
    ],
  },
  {
    id: 'backend',
    items: [
      {
        id: 'nodejs',
        label: { vi: 'Node.js', en: 'Node.js' },
        projects: ['Team Quiz Battle'],
        evidence: {
          vi: 'Vận hành máy chủ thời gian thực cho các phòng đấu trắc nghiệm hai đội.',
          en: 'Running the real-time back-end for live two-team quiz rooms.',
        },
      },
      {
        id: 'express',
        label: { vi: 'Express', en: 'Express' },
        projects: ['Team Quiz Battle'],
        evidence: {
          vi: 'Phục vụ giao diện trình duyệt và đường kiểm tra sức khỏe cho Render.',
          en: 'Serving static routes and the dedicated health check endpoint on Render.',
        },
      },
      {
        id: 'socket-io',
        label: { vi: 'Socket.IO', en: 'Socket.IO' },
        projects: ['Team Quiz Battle'],
        evidence: {
          vi: 'Đồng bộ câu hỏi, đồng hồ đếm ngược, đáp án và điểm số tức thời.',
          en: 'Syncing questions, countdowns, answers and live scores across players.',
        },
      },
      {
        id: 'cloudflare-workers',
        label: { vi: 'Cloudflare Workers', en: 'Cloudflare Workers' },
        projects: ['Marginal'],
        evidence: {
          vi: 'Nhận yêu cầu từ web và chuyển tiếp an toàn tới Gemini API.',
          en: 'Receiving site requests and proxying calls safely to the Gemini API.',
        },
      },
      {
        id: 'durable-objects',
        label: { vi: 'Durable Objects', en: 'Durable Objects' },
        projects: ['Marginal'],
        evidence: {
          vi: 'Ghim vùng thực thi Tây Bắc Mỹ giúp kết nối Gemini ổn định không bị chặn vùng.',
          en: 'Pinned to North America West so Gemini requests stay unblocked.',
        },
      },
      {
        id: 'gemini-api',
        label: { vi: 'Gemini API', en: 'Gemini API' },
        projects: ['Marginal'],
        evidence: {
          vi: 'Xử lý dịch thuật theo ngữ cảnh học thuật và hỗ trợ giải thích trong khung chat.',
          en: 'Powering contextual academic translation and interactive chat explanations.',
        },
      },
    ],
  },
  {
    id: 'workflow',
    items: [
      {
        id: 'git',
        label: { vi: 'Git', en: 'Git' },
        projects: ['Một ngày làm shipper', 'Marginal', 'Team Quiz Battle', 'SnapTask Android', 'TMS Mini v2.0', 'AgentMesh'],
        evidence: {
          vi: 'Tách nhánh thử nghiệm giao diện mới để bảo vệ bản chính luôn ổn định.',
          en: 'Isolating new layout experiments on separate branches so main stays safe.',
        },
      },
      {
        id: 'github',
        label: { vi: 'GitHub', en: 'GitHub' },
        projects: ['Một ngày làm shipper', 'Marginal', 'Team Quiz Battle', 'SnapTask Android', 'TMS Mini v2.0', 'AgentMesh'],
        evidence: {
          vi: 'Lưu trữ mã nguồn công khai, nhật ký thay đổi và tự động đóng gói phát hành.',
          en: 'Hosting open repositories, changelogs and automated release builds.',
        },
      },
      {
        id: 'playwright',
        label: { vi: 'Playwright', en: 'Playwright' },
        projects: ['Một ngày làm shipper', 'AgentMesh'],
        evidence: {
          vi: 'Chạy 12 file kiểm thử cùng bài bấm ngẫu nhiên 1800 bước tìm lỗi giao diện.',
          en: 'Running twelve test suites and an 1800-step random-click stress test.',
        },
      },
      {
        id: 'python-build-scripts',
        label: { vi: 'Python build scripts', en: 'Python build scripts' },
        projects: ['Một ngày làm shipper', 'AgentMesh'],
        evidence: {
          vi: 'Ghép các module nhỏ thành một trang game chạy mượt và kiểm tra hợp lệ dữ liệu.',
          en: 'Merging small game modules into a single playable build and validating saves.',
        },
      },
      {
        id: 'antigravity',
        label: { vi: 'Antigravity', en: 'Antigravity' },
        projects: ['SnapTask Android', 'Marginal'],
        evidence: {
          vi: 'Công cụ chính hỗ trợ chỉnh sửa code, tinh chỉnh logo và hoàn thiện giao diện.',
          en: 'Primary workspace used for refining code, vector logos and UI craft.',
        },
      },
      {
        id: 'working-with-ai',
        label: { vi: 'Làm việc cùng AI', en: 'Working with AI' },
        projects: ['Một ngày làm shipper', 'Marginal', 'Team Quiz Battle', 'SnapTask Android'],
        evidence: {
          vi: 'Phối hợp AI ở khâu rà lỗi, thử nghiệm ý tưởng và giữ phần kiểm chứng thủ công.',
          en: 'Using AI thoughtfully for prototyping and debugging while testing every step manually.',
        },
      },
    ],
  },
];
