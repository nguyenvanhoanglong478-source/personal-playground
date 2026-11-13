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
          vi: 'Chạy thẳng trên trình duyệt máy tính và điện thoại, không cần cài rườm rà.',
          en: 'Runs directly in desktop and mobile browsers with zero install friction.',
        },
      },
      {
        id: 'pwa-offline',
        label: { vi: 'PWA Offline', en: 'PWA Offline' },
        projects: ['Một ngày làm shipper', 'AgentMesh'],
        evidence: {
          vi: 'Cài lên màn hình chính điện thoại và mở chơi bình thường khi mất mạng.',
          en: 'Installs onto home screens and keeps working cleanly when offline.',
        },
      },
      {
        id: 'android',
        label: { vi: 'Android', en: 'Android' },
        projects: ['SnapTask Android'],
        evidence: {
          vi: 'Viết ứng dụng Android riêng cho thao tác chụp ảnh ghi chú nhanh gọn.',
          en: 'Built as a native Android app for fast photo-to-task capture.',
        },
      },
      {
        id: 'cloudflare-edge',
        label: { vi: 'Cloudflare Edge', en: 'Cloudflare Edge' },
        projects: ['Marginal'],
        evidence: {
          vi: 'Đặt lớp proxy trung gian gần người dùng để gọi Gemini API ổn định.',
          en: 'Routes Gemini API traffic through an edge layer for steady access.',
        },
      },
      {
        id: 'github-pages',
        label: { vi: 'GitHub Pages', en: 'GitHub Pages' },
        projects: ['Một ngày làm shipper', 'Marginal', 'TMS Mini v2.0', 'AgentMesh'],
        evidence: {
          vi: 'Đưa nhanh các bản web app tĩnh lên mạng từ kho mã nguồn.',
          en: 'Ships static web builds live straight from project repositories.',
        },
      },
      {
        id: 'render',
        label: { vi: 'Render', en: 'Render' },
        projects: ['Team Quiz Battle'],
        evidence: {
          vi: 'Giữ máy chủ Node.js và Socket.IO chạy liên tục cho các phòng đấu quiz.',
          en: 'Keeps the Node.js and Socket.IO room server online for live quizzes.',
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
          vi: 'Tự lên luồng bấm, chọn cỡ chữ và chia bố cục từ ý tưởng ban đầu tới bản chạy.',
          en: 'Shaped user flows, type sizing, and layouts from first sketch to shipped app.',
        },
      },
      {
        id: 'logo-branding',
        label: { vi: 'Logo & Branding', en: 'Logo & Branding' },
        projects: ['SnapTask Android', 'Một ngày làm shipper'],
        evidence: {
          vi: 'Tự vẽ logo nút chụp có dấu tick cho SnapTask và đồ họa đồng bộ theo từng dự án.',
          en: 'Created the capture-tick logo for SnapTask and visual identity per product.',
        },
      },
      {
        id: 'pixel-art',
        label: { vi: 'Pixel Art 8-bit', en: 'Pixel Art 8-bit' },
        projects: ['Một ngày làm shipper'],
        evidence: {
          vi: 'Vẽ tay xe Honda Cub và bộ icon 16x16 cho thanh trạng thái trong game shipper.',
          en: 'Hand-drawn Honda Cub sprites and 16x16 HUD icons for the shipper game.',
        },
      },
      {
        id: 'light-dark-ui',
        label: { vi: 'Giao diện sáng và tối', en: 'Light & Dark UI' },
        projects: ['SnapTask Android', 'Marginal'],
        evidence: {
          vi: 'Chỉnh kỹ màu chữ và nền trên cả hai chế độ sáng và tối.',
          en: 'Tuned text and surface clarity across both light and dark themes.',
        },
      },
      {
        id: 'responsive',
        label: { vi: 'Responsive', en: 'Responsive' },
        projects: ['Một ngày làm shipper', 'Marginal', 'Team Quiz Battle', 'TMS Mini v2.0', 'AgentMesh'],
        evidence: {
          vi: 'Xếp gọn bố cục một cột, nút bấm vừa ngón tay trên màn hình điện thoại nhỏ.',
          en: 'Tuned single-column layouts and thumb-friendly controls on small screens.',
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
          vi: 'Dựng khung giao diện rõ ràng cho game trình duyệt và bảng điều phối xe.',
          en: 'Clean page structure for browser games and dispatch dashboards.',
        },
      },
      {
        id: 'css',
        label: { vi: 'CSS', en: 'CSS' },
        projects: ['Một ngày làm shipper', 'Team Quiz Battle', 'TMS Mini v2.0', 'AgentMesh'],
        evidence: {
          vi: 'Chia lưới responsive, biến màu sáng tối và hiệu ứng bấm phản hồi mượt.',
          en: 'Theme variables, responsive grids, and snappy interactive states.',
        },
      },
      {
        id: 'javascript',
        label: { vi: 'JavaScript', en: 'JavaScript' },
        projects: ['Một ngày làm shipper', 'Team Quiz Battle', 'TMS Mini v2.0', 'AgentMesh'],
        evidence: {
          vi: 'Code vòng lặp game, đồng bộ trạng thái phòng chơi và lưu dữ liệu trên máy.',
          en: 'Runs game loops, real-time room state, and local storage persistence.',
        },
      },
      {
        id: 'typescript',
        label: { vi: 'TypeScript', en: 'TypeScript' },
        projects: ['Marginal', 'SnapTask Android'],
        evidence: {
          vi: 'Kiểm soát kiểu dữ liệu rõ ràng cho các màn hình nhiều trạng thái trong React.',
          en: 'Keeps complex React views and component props predictable with types.',
        },
      },
      {
        id: 'react',
        label: { vi: 'React', en: 'React' },
        projects: ['Marginal'],
        evidence: {
          vi: 'Chia màn đọc bài báo, luyện viết, phát âm và chat AI thành các phần tách bạch.',
          en: 'Organizes article reading, writing, speech, and AI chat into clean views.',
        },
      },
      {
        id: 'vite',
        label: { vi: 'Vite', en: 'Vite' },
        projects: ['Marginal'],
        evidence: {
          vi: 'Chạy server thử nghiệm nhanh và đóng gói mã nguồn gọn nhẹ khi xuất bản.',
          en: 'Gives instant local reload and lean bundles ready to publish.',
        },
      },
      {
        id: 'tailwind-css',
        label: { vi: 'Tailwind CSS', en: 'Tailwind CSS' },
        projects: ['Marginal'],
        evidence: {
          vi: 'Ghép giao diện đọc bài và thẻ thông tin đồng đều trên cả máy tính lẫn điện thoại.',
          en: 'Keeps article readers and cards consistent from desktop to phone.',
        },
      },
      {
        id: 'canvas',
        label: { vi: 'Canvas', en: 'Canvas' },
        projects: ['Một ngày làm shipper', 'AgentMesh'],
        evidence: {
          vi: 'Vẽ hiệu ứng hạt chuyển động trong game và sơ đồ các nút AI tương tác.',
          en: 'Draws live particle scenes in games and interactive AI node graphs.',
        },
      },
      {
        id: 'webaudio',
        label: { vi: 'WebAudio', en: 'WebAudio' },
        projects: ['Một ngày làm shipper'],
        evidence: {
          vi: 'Tổng hợp tiếng hiệu ứng và nhạc nền bật tắt độc lập ngay trên trình duyệt.',
          en: 'Synthesizes retro sound effects and independent music loops in-browser.',
        },
      },
      {
        id: 'service-worker',
        label: { vi: 'Service Worker', en: 'Service Worker' },
        projects: ['Một ngày làm shipper', 'AgentMesh'],
        evidence: {
          vi: 'Lưu đệm tài nguyên hợp lý để ứng dụng mở nhanh và chạy được khi offline.',
          en: 'Caches app assets cleanly for quick startup and reliable offline use.',
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
          vi: 'Chạy máy chủ quản lý phòng đấu và đếm giờ trực tiếp cho Team Quiz Battle.',
          en: 'Runs live quiz rooms and synced countdown timers on the server.',
        },
      },
      {
        id: 'express',
        label: { vi: 'Express', en: 'Express' },
        projects: ['Team Quiz Battle'],
        evidence: {
          vi: 'Phục vụ giao diện web và nhận kết nối đầu vào cho ứng dụng phòng đấu.',
          en: 'Serves the browser frontend and handles incoming room endpoints.',
        },
      },
      {
        id: 'socket-io',
        label: { vi: 'Socket.IO', en: 'Socket.IO' },
        projects: ['Team Quiz Battle'],
        evidence: {
          vi: 'Truyền câu hỏi, đáp án và bảng điểm giữa chủ phòng với người chơi ngay lập tức.',
          en: 'Syncs questions, answers, and live scores between host and players.',
        },
      },
      {
        id: 'cloudflare-workers',
        label: { vi: 'Cloudflare Workers', en: 'Cloudflare Workers' },
        projects: ['Marginal'],
        evidence: {
          vi: 'Làm cổng trung gian giữ kín khóa API và chuyển tiếp yêu cầu gọi AI.',
          en: 'Acts as a secure gateway holding API keys and forwarding AI prompts.',
        },
      },
      {
        id: 'durable-objects',
        label: { vi: 'Durable Objects', en: 'Durable Objects' },
        projects: ['Marginal'],
        evidence: {
          vi: 'Cố định vùng chạy ở Tây Bắc Mỹ giúp gọi Gemini API ổn định không bị chặn vùng.',
          en: 'Pins execution to North America West so Gemini calls stay unblocked.',
        },
      },
      {
        id: 'gemini-api',
        label: { vi: 'Gemini API', en: 'Gemini API' },
        projects: ['Marginal'],
        evidence: {
          vi: 'Dịch nghĩa bài báo theo ngữ cảnh học thuật và giải thích từ vựng trong khung chat.',
          en: 'Translates academic passages in context and powers the study chat.',
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
          vi: 'Tách nhánh riêng khi muốn thử giao diện mới để bản mọi người đang xem luôn an toàn.',
          en: 'Separates visual experiments onto feature branches to keep main safe.',
        },
      },
      {
        id: 'github',
        label: { vi: 'GitHub', en: 'GitHub' },
        projects: ['Một ngày làm shipper', 'Marginal', 'Team Quiz Battle', 'SnapTask Android', 'TMS Mini v2.0', 'AgentMesh'],
        evidence: {
          vi: 'Lưu trữ mã nguồn từng dự án và tự động đẩy bản dựng mới lên web khi cập nhật.',
          en: 'Hosts project repositories and triggers automatic deploys on push.',
        },
      },
      {
        id: 'playwright',
        label: { vi: 'Playwright', en: 'Playwright' },
        projects: ['Một ngày làm shipper', 'AgentMesh'],
        evidence: {
          vi: 'Chạy kiểm thử tự động các luồng bấm chính để bắt lỗi giao diện trước khi đưa lên mạng.',
          en: 'Runs automated checks across core user clicks before shipping builds.',
        },
      },
      {
        id: 'python-build-scripts',
        label: { vi: 'Python build scripts', en: 'Python build scripts' },
        projects: ['Một ngày làm shipper', 'AgentMesh'],
        evidence: {
          vi: 'Viết script Python gộp các module nhỏ thành một file game hoàn chỉnh.',
          en: 'Bundles modular game source files into one playable output with Python.',
        },
      },
      {
        id: 'antigravity',
        label: { vi: 'Antigravity', en: 'Antigravity' },
        projects: ['SnapTask Android', 'Marginal'],
        evidence: {
          vi: 'Không gian làm việc chính để tinh chỉnh code, vẽ SVG và hoàn thiện giao diện.',
          en: 'Main workspace for iterating on code, vector shapes, and UI details.',
        },
      },
      {
        id: 'working-with-ai',
        label: { vi: 'Làm việc cùng AI', en: 'Working with AI' },
        projects: ['Một ngày làm shipper', 'Marginal', 'Team Quiz Battle', 'SnapTask Android'],
        evidence: {
          vi: 'Dùng AI rà nhanh phương án và tìm lỗi, rồi tự tay kiểm tra lại từng bước chạy thật.',
          en: 'Uses AI to brainstorm fixes and prototype fast, then tests every path by hand.',
        },
      },
    ],
  },
];
