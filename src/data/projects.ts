import { BilingualText } from './profile';

export type SkillCategory = 'language' | 'framework' | 'tool' | 'deploy';

export interface TechItem {
  name: string;
  category: SkillCategory;
  detail: BilingualText;
}

export interface ProjectItem {
  id: 'deliver-simulator' | 'snaptask-android' | 'mini-tms-project' | 'agent-mesh' | 'marginal';
  indexNumber: string;
  title: string;
  subtitle: BilingualText;
  description: BilingualText;
  repoUrl: string;
  technologies: TechItem[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'deliver-simulator',
    indexNumber: '01',
    title: 'Deliver Simulator',
    subtitle: {
      vi: 'Trò chơi mô phỏng cuộc sống tài xế giao hàng 8-bit',
      en: '8-bit delivery rider and urban life simulation game',
    },
    description: {
      vi: 'Mô phỏng hành trình 24 tháng của một tài xế giao hàng với mục tiêu tích lũy 100 triệu đồng. Trò chơi kết hợp vòng lặp ngày đêm trên Canvas 2D, âm thanh tổng hợp Web Audio và chế độ chơi ngoại tuyến.',
      en: 'Simulates a 24-month delivery rider career targeting 100M VND in savings. Features a day-night Canvas 2D streetscape, synthesized 8-bit Web Audio sound effects, and offline PWA play.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/Deliver-Simulator',
    technologies: [
      {
        name: 'JavaScript',
        category: 'language',
        detail: {
          vi: 'Điều khiển vòng lặp đồng hồ trò chơi, kinh tế và lưu trạng thái cục bộ.',
          en: 'Powers the unified game loop, delivery mechanics, and local state persistence.',
        },
      },
      {
        name: 'Python',
        category: 'language',
        detail: {
          vi: 'Đóng gói trò chơi thành tệp HTML độc lập và chạy kịch bản kiểm thử.',
          en: 'Bundles assets into a standalone HTML build and drives test automation.',
        },
      },
      {
        name: 'HTML5 Canvas',
        category: 'tool',
        detail: {
          vi: 'Kết xuất đồ họa đường phố ngày đêm, thời tiết mưa và chuyển động xe.',
          en: 'Renders dynamic streetscapes, rain weather, and delivery tracks.',
        },
      },
      {
        name: 'Web Audio API',
        category: 'tool',
        detail: {
          vi: 'Tổng hợp âm thanh 8-bit trực tiếp không cần tải tệp âm thanh lớn.',
          en: 'Synthesizes retro sound effects directly in the browser.',
        },
      },
      {
        name: 'Playwright',
        category: 'tool',
        detail: {
          vi: 'Tự động kiểm thử luồng chơi, lưu tiến trình và trạng thái ngoại tuyến.',
          en: 'Automates 13 end-to-end browser test suites including offline play.',
        },
      },
      {
        name: 'GitHub Pages',
        category: 'deploy',
        detail: {
          vi: 'Phân phối bản dựng PWA nhẹ kèm Service Worker cài đặt lên màn hình.',
          en: 'Hosts the lightweight PWA build with Service Worker caching.',
        },
      },
    ],
  },
  {
    id: 'snaptask-android',
    indexNumber: '02',
    title: 'SnapTask Android',
    subtitle: {
      vi: 'Ứng dụng Android ghi chú việc cần làm bằng ảnh',
      en: 'Android photo-first task note and reminder app',
    },
    description: {
      vi: 'Giúp chụp nhanh hình ảnh công việc thay vì gõ tay, phân loại theo thư mục và đặt lịch nhắc nhở. Tích hợp ba mẫu widget màn hình chính và tối ưu dung lượng cài đặt cho điện thoại phổ thông.',
      en: 'Lets users capture daily tasks with instant camera photos, organize folders, and schedule reminders. Includes three home screen widgets and multi-ABI APK optimization.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/snaptask-android',
    technologies: [
      {
        name: 'Kotlin',
        category: 'language',
        detail: {
          vi: 'Ngôn ngữ chính phát triển ứng dụng Android cùng Coroutines.',
          en: 'Core Android language paired with Kotlin Coroutines.',
        },
      },
      {
        name: 'Jetpack Compose',
        category: 'framework',
        detail: {
          vi: 'Xây dựng toàn bộ giao diện Material 3, bảng việc và lịch biểu.',
          en: 'Drives the declarative Material 3 UI, board, and calendar views.',
        },
      },
      {
        name: 'CameraX',
        category: 'framework',
        detail: {
          vi: 'Chụp và gắn ảnh trực tiếp vào từng đầu việc ngay trong ứng dụng.',
          en: 'Provides fast in-app camera capture attached to task items.',
        },
      },
      {
        name: 'Jetpack Glance',
        category: 'framework',
        detail: {
          vi: 'Xây dựng ba mẫu widget hiển thị trực tiếp trên màn hình chính.',
          en: 'Powers three customizable home screen widgets.',
        },
      },
      {
        name: 'Room Database',
        category: 'tool',
        detail: {
          vi: 'Lưu trữ cục bộ dữ liệu công việc và đường dẫn ảnh bằng SQLite.',
          en: 'Persists tasks and photo links offline using SQLite.',
        },
      },
      {
        name: 'GitHub Actions',
        category: 'deploy',
        detail: {
          vi: 'Tự động biên dịch và xuất tệp cài đặt APK cho mỗi lần cập nhật.',
          en: 'Automates multi-architecture APK builds on every push.',
        },
      },
    ],
  },
  {
    id: 'mini-tms-project',
    indexNumber: '03',
    title: 'TMS Mini v2.0',
    subtitle: {
      vi: 'Hệ thống quản lý vận tải và theo dõi đội xe',
      en: 'Transportation management and fleet tracking web system',
    },
    description: {
      vi: 'Hệ thống web phân quyền riêng cho tài xế và quản lý điều phối. Hỗ trợ theo dõi trạng thái vận hành đội xe, xem bản đồ tuyến đường trực quan và xuất báo cáo chuyến đi.',
      en: 'Role-based web portal separating driver workflows and dispatcher controls. Supports live fleet status monitoring, interactive route mapping, and trip analytics.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/mini-tms-project',
    technologies: [
      {
        name: 'HTML5',
        category: 'language',
        detail: {
          vi: 'Cấu trúc giao diện cho cổng quản lý, tài xế, đội xe và báo cáo.',
          en: 'Structures multi-screen portals for dispatchers, drivers, and reports.',
        },
      },
      {
        name: 'CSS3',
        category: 'language',
        detail: {
          vi: 'Hệ thống biến màu trạng thái đội xe và bố cục bảng điều khiển.',
          en: 'Defines status color tokens and responsive dashboard layouts.',
        },
      },
      {
        name: 'JavaScript',
        category: 'language',
        detail: {
          vi: 'Xử lý phân quyền đăng nhập, trạng thái đơn hàng và cập nhật dữ liệu.',
          en: 'Manages role authentication, order filtering, and live dashboard state.',
        },
      },
      {
        name: 'Leaflet',
        category: 'framework',
        detail: {
          vi: 'Hiển thị bản đồ số trực quan phục vụ giám sát lộ trình di chuyển.',
          en: 'Renders interactive route maps for real-time fleet tracking.',
        },
      },
    ],
  },
  {
    id: 'agent-mesh',
    indexNumber: '04',
    title: 'AgentMesh',
    subtitle: {
      vi: 'Trình mô phỏng và giám sát mạng lưới đa tác nhân AI',
      en: 'Multi-agent AI swarm visualizer and telemetry monitor',
    },
    description: {
      vi: 'Mô phỏng sự phối hợp giữa nhiều tác nhân AI theo phong cách giao diện công nghiệp. Tích hợp dòng sự kiện thời gian thực, thước đo ngữ cảnh và cổng kiểm duyệt thủ công trước tác vụ nhạy cảm.',
      en: 'Visualizes multi-agent AI coordination in a precision industrial interface. Includes real-time telemetry logs, context window meters, and a human approval gate.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/AgentMesh',
    technologies: [
      {
        name: 'HTML5 Canvas',
        category: 'tool',
        detail: {
          vi: 'Vẽ sơ đồ nút mạng tác nhân, kéo thả và luồng hạt truyền thông điệp.',
          en: 'Draws interactive agent graphs, zoom controls, and message particle flows.',
        },
      },
      {
        name: 'JavaScript',
        category: 'language',
        detail: {
          vi: 'Mô phỏng bốn kịch bản điều phối đa tác nhân và bộ lọc sự kiện.',
          en: 'Runs four multi-agent simulation scenarios and event filtering.',
        },
      },
      {
        name: 'Service Worker',
        category: 'tool',
        detail: {
          vi: 'Hỗ trợ lưu đệm ngoại tuyến và cài đặt dạng ứng dụng web độc lập.',
          en: 'Provides offline PWA caching and installable app manifest.',
        },
      },
      {
        name: 'Python',
        category: 'language',
        detail: {
          vi: 'Viết bộ kiểm thử tự động kiểm tra toàn bộ thành phần mô phỏng.',
          en: 'Powers automated end-to-end verification tests.',
        },
      },
      {
        name: 'Playwright',
        category: 'tool',
        detail: {
          vi: 'Kiểm định tự động mười hạng mục tương tác không phát sinh lỗi.',
          en: 'Verifies ten UI and simulation interaction suites automatically.',
        },
      },
    ],
  },
  {
    id: 'marginal',
    indexNumber: '05',
    title: 'Marginal',
    subtitle: {
      vi: 'Ứng dụng web đọc bài báo học thuật và học ngoại ngữ',
      en: 'Academic article reader for foreign language learning',
    },
    description: {
      vi: 'Công cụ giúp người tự học đọc trực tiếp tài liệu khoa học bằng tiếng nước ngoài. Hỗ trợ dịch từng câu theo ngữ cảnh, hỏi đáp thuật ngữ với AI, sửa ngữ pháp bài viết và luyện phát âm ngay trên trình duyệt.',
      en: 'Helps self-learners read domain papers in a foreign language. Provides contextual translation, AI terminology chat, grammar feedback, and browser-native speech practice.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/Marginal',
    technologies: [
      {
        name: 'React',
        category: 'framework',
        detail: {
          vi: 'Phân tách rõ các khu vực đọc bài, hỏi đáp, luyện viết và phát âm.',
          en: 'Separates the article reader, chat panel, writing, and speech tabs.',
        },
      },
      {
        name: 'Tailwind CSS',
        category: 'framework',
        detail: {
          vi: 'Định hình không gian đọc chữ sạch sẽ trên máy tính và điện thoại.',
          en: 'Styles an uncluttered reading surface across desktop and mobile.',
        },
      },
      {
        name: 'Vite',
        category: 'tool',
        detail: {
          vi: 'Biên dịch và đóng gói giao diện tĩnh siêu nhanh.',
          en: 'Compiles and bundles the static frontend cleanly.',
        },
      },
      {
        name: 'Gemini API',
        category: 'tool',
        detail: {
          vi: 'Cung cấp khả năng dịch thuật ngữ cảnh và chấm lỗi ngữ pháp tự động.',
          en: 'Delivers contextual translation and grammar correction.',
        },
      },
      {
        name: 'Cloudflare Workers',
        category: 'deploy',
        detail: {
          vi: 'Làm máy chủ trung gian bảo vệ khóa API và tải bài báo từ URL ngoài.',
          en: 'Acts as an edge proxy isolating API keys and fetching external URLs.',
        },
      },
      {
        name: 'GitHub Pages',
        category: 'deploy',
        detail: {
          vi: 'Lưu trữ và phục vụ toàn bộ ứng dụng giao diện tĩnh.',
          en: 'Serves the static production web application.',
        },
      },
    ],
  },
];
