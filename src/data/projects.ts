import { BilingualText } from './profile';

export type TechCategory = 'language' | 'framework' | 'tool' | 'deploy';

export interface TechItem {
  name: string;
  category: TechCategory;
  detail: BilingualText;
}

export interface ProjectItem {
  id:
    | 'deliver-simulator'
    | 'marginal'
    | 'team-quiz-battle'
    | 'snaptask-android'
    | 'mini-tms-project'
    | 'agent-mesh';
  indexNumber: string;
  title: string;
  subtitle: BilingualText;
  description: BilingualText;
  repoUrl: string;
  repoCtaLabel?: BilingualText;
  technologies: TechItem[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'deliver-simulator',
    indexNumber: '01',
    title: 'Một ngày làm shipper',
    subtitle: {
      vi: 'Game mô phỏng cuộc sống tài xế giao hàng',
      en: 'Delivery driver life simulator',
    },
    description: {
      vi: 'Game mô phỏng hành trình nhận đơn, giữ thể lực, đổ xăng và lo cho gia đình để dành dụm 100 triệu đồng trong 24 tháng. Mình tự vẽ pixel art, code vòng lặp game, làm âm thanh WebAudio và kiểm thử tự động.',
      en: 'A life-sim game where you take delivery orders and balance stamina, fuel, and family needs to save 100 million VND in 24 months. I drew the pixel art, coded the game loop, built the WebAudio sounds, and wrote automated tests.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/Deliver-Simulator',
    technologies: [
      {
        name: 'HTML, CSS, JavaScript',
        category: 'language',
        detail: {
          vi: 'Code toàn bộ logic nhận đơn, sự kiện đời sống và giao diện game.',
          en: 'Powers the delivery loop, life events, and complete game UI.',
        },
      },
      {
        name: 'Canvas',
        category: 'framework',
        detail: {
          vi: 'Vẽ hiệu ứng chuyển động và hạt trong lúc chạy xe giao hàng.',
          en: 'Renders road movement and particle effects while riding.',
        },
      },
      {
        name: 'WebAudio',
        category: 'framework',
        detail: {
          vi: 'Tạo hiệu ứng âm thanh retro và nhạc nền bật tắt riêng.',
          en: 'Synthesizes retro sound effects and toggleable background loops.',
        },
      },
      {
        name: 'Service Worker',
        category: 'deploy',
        detail: {
          vi: 'Cho phép cài đặt lên máy và chơi mượt ngay cả khi mất mạng.',
          en: 'Lets players install the game and play offline smoothly.',
        },
      },
      {
        name: 'Playwright',
        category: 'tool',
        detail: {
          vi: 'Tự động kiểm tra các luồng bấm và dữ liệu lưu trước khi cập nhật.',
          en: 'Automatically verifies user clicks and saved state before updates.',
        },
      },
    ],
  },
  {
    id: 'marginal',
    indexNumber: '02',
    title: 'Marginal',
    subtitle: {
      vi: 'Học ngoại ngữ qua bài báo học thuật',
      en: 'Learn languages from academic articles',
    },
    description: {
      vi: 'Web app đọc bài báo học thuật bằng ngoại ngữ, tích hợp luyện viết, luyện phát âm và khung chat hỏi bài cùng AI. Mình tự thiết kế giao diện đọc, nối proxy Cloudflare tới Gemini API và chỉnh cách dịch tiếng Việt cho dễ đọc.',
      en: 'A web app for studying foreign-language articles with writing practice, speech feedback, and an AI study chat. I designed the reading UI, wired the Cloudflare proxy to Gemini, and tuned the Vietnamese translations.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/Marginal',
    technologies: [
      {
        name: 'React',
        category: 'framework',
        detail: {
          vi: 'Dựng màn hình đọc bài báo, luyện viết, phát âm và chat.',
          en: 'Builds the article reader, writing, speech, and chat screens.',
        },
      },
      {
        name: 'Vite',
        category: 'tool',
        detail: {
          vi: 'Đóng gói và chạy thử giao diện nhanh trong lúc phát triển.',
          en: 'Compiles and serves fast local dev builds cleanly.',
        },
      },
      {
        name: 'Cloudflare Workers',
        category: 'deploy',
        detail: {
          vi: 'Làm lớp proxy nhận yêu cầu từ trình duyệt và gọi sang AI.',
          en: 'Proxies browser requests securely toward the AI backend.',
        },
      },
      {
        name: 'Durable Objects',
        category: 'deploy',
        detail: {
          vi: 'Giữ kết nối ổn định ở khu vực Tây Bắc Mỹ để tránh bị chặn vùng.',
          en: 'Pins execution to North America West to avoid regional blocks.',
        },
      },
      {
        name: 'Gemini API',
        category: 'tool',
        detail: {
          vi: 'Xử lý dịch thuật theo ngữ cảnh học thuật và giải đáp trong khung chat.',
          en: 'Handles contextual article translation and study-chat explanations.',
        },
      },
    ],
  },
  {
    id: 'team-quiz-battle',
    indexNumber: '03',
    title: 'Team Quiz Battle',
    subtitle: {
      vi: 'Game trắc nghiệm hai đội chơi trực tiếp',
      en: 'Live two-team quiz game',
    },
    description: {
      vi: 'Trò chơi đố vui hai đội đấu trực tiếp ngay trên trình duyệt, chủ phòng tự soạn câu hỏi và chỉnh thời gian từ 5 đến 300 giây cho từng câu. Mình tự code cả giao diện sảnh chờ, phần đồng bộ thời gian thực và server Node.js.',
      en: 'A real-time two-team browser quiz where the host writes questions and sets timers from 5 to 300 seconds per round. I built the lobby and player UI, live scoring sync, and Node.js backend.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source',
    repoCtaLabel: {
      vi: 'Trang GitHub',
      en: 'GitHub Profile',
    },
    technologies: [
      {
        name: 'Node.js',
        category: 'framework',
        detail: {
          vi: 'Chạy máy chủ quản lý phòng chơi và bộ đếm thời gian.',
          en: 'Runs the backend managing quiz rooms and round timers.',
        },
      },
      {
        name: 'Express',
        category: 'framework',
        detail: {
          vi: 'Phục vụ giao diện trình duyệt và các đường dẫn cơ bản.',
          en: 'Serves the browser client and core web endpoints.',
        },
      },
      {
        name: 'Socket.IO',
        category: 'framework',
        detail: {
          vi: 'Đồng bộ câu hỏi, đáp án và điểm số giữa các đội theo thời gian thực.',
          en: 'Syncs questions, answers, and live team scores instantly.',
        },
      },
      {
        name: 'Render',
        category: 'deploy',
        detail: {
          vi: 'Triển khai máy chủ Node.js hoạt động liên tục cho mọi phòng chơi.',
          en: 'Hosts the persistent Node.js server for live quiz sessions.',
        },
      },
    ],
  },
  {
    id: 'snaptask-android',
    indexNumber: '04',
    title: 'SnapTask Android',
    subtitle: {
      vi: 'Ghi chú việc cần làm bằng ảnh',
      en: 'Photo-based to-do notes',
    },
    description: {
      vi: 'Ứng dụng Android giúp chụp nhanh một tấm ảnh và biến ngay thành việc cần nhớ trong ngày. Mình tự làm bộ nhận diện Ink & Flash với logo nút chụp có dấu tick, hỗ trợ cả chế độ sáng và tối.',
      en: 'An Android app that lets you snap a photo and turn it straight into a daily task. I designed its Ink & Flash visual identity, capture-tick logo, and light and dark screens.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/snaptask-android',
    technologies: [
      {
        name: 'Android',
        category: 'framework',
        detail: {
          vi: 'Nền tảng gốc giúp thao tác chụp ảnh và lưu việc nhanh trên điện thoại.',
          en: 'Native mobile platform enabling fast camera capture and task entry.',
        },
      },
      {
        name: 'Kotlin',
        category: 'language',
        detail: {
          vi: 'Viết toàn bộ logic xử lý ảnh, danh sách việc và giao diện.',
          en: 'Handles camera capture flow, task lists, and app state.',
        },
      },
      {
        name: 'Antigravity',
        category: 'tool',
        detail: {
          vi: 'Công cụ hỗ trợ chỉnh sửa code, tinh chỉnh icon và luồng giao diện.',
          en: 'Used to iterate on Kotlin code, vector icons, and UI polish.',
        },
      },
    ],
  },
  {
    id: 'mini-tms-project',
    indexNumber: '05',
    title: 'TMS Mini v2.0',
    subtitle: {
      vi: 'Quản lý vận tải và theo dõi đội xe',
      en: 'Fleet dispatch and route tracker',
    },
    description: {
      vi: 'Cổng web quản lý chuyến hàng có màn hình riêng cho tài xế và quản lý điều phối. Mình thiết kế bố cục theo dõi trạng thái xe, bản đồ lộ trình trực quan và bảng báo cáo chuyến đi.',
      en: 'A fleet dispatch portal with dedicated screens for drivers and dispatchers. I designed and coded the trip status boards, interactive route map views, and delivery reports.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/mini-tms-project',
    technologies: [
      {
        name: 'HTML & CSS',
        category: 'language',
        detail: {
          vi: 'Dựng bố cục bảng điều phối, màn hình tài xế và thẻ trạng thái gọn gàng.',
          en: 'Builds the dispatch dashboard, driver screens, and responsive cards.',
        },
      },
      {
        name: 'JavaScript',
        category: 'language',
        detail: {
          vi: 'Xử lý phân quyền tài khoản, cập nhật chuyến xe và xuất báo cáo.',
          en: 'Drives role switching, live trip status updates, and trip reports.',
        },
      },
      {
        name: 'Leaflet',
        category: 'framework',
        detail: {
          vi: 'Hiển thị bản đồ lộ trình trực quan để theo dõi từng tuyến giao hàng.',
          en: 'Renders interactive route maps for tracking active deliveries.',
        },
      },
    ],
  },
  {
    id: 'agent-mesh',
    indexNumber: '06',
    title: 'AgentMesh',
    subtitle: {
      vi: 'Mô phỏng và giám sát mạng tác nhân AI',
      en: 'Multi-agent AI swarm monitor',
    },
    description: {
      vi: 'Công cụ web mô phỏng cách nhiều tác nhân AI trao đổi việc với nhau và chờ người duyệt trước các bước quan trọng. Mình thiết kế giao diện sơ đồ nút mạng trên Canvas, luồng log trực tiếp và cấu hình chạy offline.',
      en: 'A browser tool simulating how multiple AI agents pass tasks and pause for human approval on risky steps. I built the Canvas node graph, live event log, and offline PWA mode.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/AgentMesh',
    technologies: [
      {
        name: 'Canvas',
        category: 'framework',
        detail: {
          vi: 'Vẽ sơ đồ các nút tác nhân và luồng tin nhắn chạy qua lại giữa chúng.',
          en: 'Draws live agent node graphs and message paths between nodes.',
        },
      },
      {
        name: 'HTML, CSS, JavaScript',
        category: 'language',
        detail: {
          vi: 'Điều khiển kịch bản chạy thử, bộ lọc log và cổng duyệt thủ công.',
          en: 'Drives scenario simulation, log filters, and manual approval gates.',
        },
      },
      {
        name: 'Service Worker',
        category: 'deploy',
        detail: {
          vi: 'Giữ web app cài được lên máy và mở dùng mượt ngay cả khi ngoại tuyến.',
          en: 'Caches the app locally so it installs and runs without network access.',
        },
      },
      {
        name: 'Playwright',
        category: 'tool',
        detail: {
          vi: 'Kiểm thử tự động kịch bản tương tác và luồng sự kiện trên màn hình.',
          en: 'Runs automated tests on graph interactions and telemetry events.',
        },
      },
    ],
  },
];
