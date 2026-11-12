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
  technologies: TechItem[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'deliver-simulator',
    indexNumber: '01',
    title: 'Một ngày làm shipper',
    subtitle: {
      vi: 'Game mô phỏng cuộc sống tài xế giao hàng',
      en: 'A delivery driver life simulation game',
    },
    description: {
      vi: 'Bạn vào vai một tài xế từ quê lên thành phố, nhận đơn, lo thể lực, xăng xe và gia đình để tiết kiệm 100 triệu đồng trong 24 tháng. Điểm đặc biệt là hệ thống đời sống với sự kiện ngẫu nhiên và nhiều kết thúc. Mình tự làm toàn bộ phần thiết kế, code, âm thanh và kiểm thử.',
      en: 'You play a driver who moves from the countryside to the city, taking orders and managing stamina, fuel and family to save 100 million dong in 24 months. Its standout feature is a life system with random events and multiple endings. I did all of the design, code, sound and testing myself.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/Deliver-Simulator',
    technologies: [
      {
        name: 'HTML, CSS, JavaScript',
        category: 'language',
        detail: {
          vi: 'Viết toàn bộ game thành các module nhỏ rồi ghép lại bằng một script Python thành một trang chạy được.',
          en: 'Used to write the whole game as small modules, merged by a Python script into one playable page.',
        },
      },
      {
        name: 'Canvas',
        category: 'framework',
        detail: {
          vi: 'Vẽ hiệu ứng hạt trong các màn chơi có chuyển động.',
          en: 'Draws particle effects in the animated scenes.',
        },
      },
      {
        name: 'WebAudio',
        category: 'framework',
        detail: {
          vi: 'Tạo âm thanh hiệu ứng, có công tắc và âm lượng riêng cho nhạc nền.',
          en: 'Generates sound effects, with separate switches and volume for background music.',
        },
      },
      {
        name: 'Service Worker',
        category: 'deploy',
        detail: {
          vi: 'Giúp game cài được và chơi offline.',
          en: 'Lets the game be installed and played offline.',
        },
      },
      {
        name: 'Playwright',
        category: 'tool',
        detail: {
          vi: 'Chạy kiểm thử tự động cho từng nhóm tính năng.',
          en: 'Runs automated tests for each feature group.',
        },
      },
      {
        name: 'GitHub Pages',
        category: 'deploy',
        detail: {
          vi: 'Nơi đưa game lên mạng.',
          en: 'Where the game is hosted online.',
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
      en: 'Learn languages through academic articles',
    },
    description: {
      vi: 'Web app để đọc bài báo học thuật bằng ngoại ngữ, kèm luyện viết, luyện phát âm và khung chat hỗ trợ bằng AI. Mình tự làm giao diện, viết phần proxy tới Gemini, chọn giọng đọc tự nhiên của trình duyệt và tinh chỉnh bản dịch tiếng Việt cho tự nhiên hơn.',
      en: 'A web app for reading academic articles in a foreign language, with writing practice, pronunciation practice and an AI-assisted chat. I built the interface, wrote the proxy to Gemini, picked natural-sounding browser voices and refined the Vietnamese translation to read more naturally.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/Marginal',
    technologies: [
      {
        name: 'React',
        category: 'framework',
        detail: {
          vi: 'Dựng các màn đọc bài, luyện viết, luyện phát âm và chat.',
          en: 'Builds the reading, writing, pronunciation and chat screens.',
        },
      },
      {
        name: 'Vite',
        category: 'tool',
        detail: {
          vi: 'Chạy và đóng gói dự án nhanh.',
          en: 'Runs and bundles the project quickly.',
        },
      },
      {
        name: 'Tailwind CSS',
        category: 'framework',
        detail: {
          vi: 'Định kiểu giao diện nhất quán.',
          en: 'Keeps the styling consistent.',
        },
      },
      {
        name: 'Cloudflare Workers',
        category: 'deploy',
        detail: {
          vi: 'Làm proxy nhận yêu cầu từ web và gọi Gemini API.',
          en: 'Acts as a proxy that takes requests from the site and calls the Gemini API.',
        },
      },
      {
        name: 'Durable Objects',
        category: 'deploy',
        detail: {
          vi: 'Giữ kết nối tới Gemini ở một khu vực cố định để tránh bị chặn theo vùng.',
          en: 'Keeps the Gemini connection in a fixed region to avoid regional blocking.',
        },
      },
      {
        name: 'Gemini API',
        category: 'tool',
        detail: {
          vi: 'Xử lý dịch và hỗ trợ học qua chat.',
          en: 'Handles translation and chat-based learning help.',
        },
      },
      {
        name: 'GitHub Pages',
        category: 'deploy',
        detail: {
          vi: 'Nơi đưa phần giao diện lên mạng.',
          en: 'Hosts the front end.',
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
      en: 'A live two-team quiz game',
    },
    description: {
      vi: 'Hai đội đấu trắc nghiệm theo thời gian thực, mọi người cùng chơi trên trình duyệt. Chủ phòng tự soạn bộ câu hỏi ngay trong sảnh chờ và chỉnh thời gian trả lời từ 5 đến 300 giây cho cả phòng hoặc từng câu. Mình làm cả giao diện, máy chủ và phần hướng dẫn song ngữ.',
      en: 'Two teams compete in a real-time quiz, everyone playing in the browser. The host writes question sets right in the lobby and sets answer time from 5 to 300 seconds for the whole room or per question. I built the interface, the server and the bilingual guide.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source',
    technologies: [
      {
        name: 'Node.js',
        category: 'framework',
        detail: {
          vi: 'Chạy máy chủ của game.',
          en: 'Runs the game server.',
        },
      },
      {
        name: 'Express',
        category: 'framework',
        detail: {
          vi: 'Phục vụ trang web và đường kiểm tra sức khỏe cho Render.',
          en: 'Serves the site and the health check route for Render.',
        },
      },
      {
        name: 'Socket.IO',
        category: 'framework',
        detail: {
          vi: 'Đồng bộ câu hỏi, đáp án và điểm số giữa mọi người chơi theo thời gian thực.',
          en: 'Syncs questions, answers and scores between all players in real time.',
        },
      },
      {
        name: 'Render',
        category: 'deploy',
        detail: {
          vi: 'Nơi triển khai máy chủ.',
          en: 'Hosts the server.',
        },
      },
      {
        name: 'Git & GitHub',
        category: 'tool',
        detail: {
          vi: 'Lưu mã nguồn và nhật ký thay đổi.',
          en: 'Stores the code and the changelog.',
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
      vi: 'Ứng dụng Android cho phép chụp một tấm ảnh và biến nó thành việc cần nhớ. Mình đang làm lại bộ nhận diện với logo nút chụp có dấu tick và giao diện Ink & Flash, có cả bản sáng lẫn tối.',
      en: "An Android app that lets you snap a photo and turn it into something to remember. I'm redoing its identity with a capture-button-and-tick logo and an Ink & Flash interface, in both light and dark versions.",
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/snaptask-android',
    technologies: [
      {
        name: 'Android',
        category: 'framework',
        detail: {
          vi: 'Nền tảng chạy ứng dụng.',
          en: 'The platform the app runs on.',
        },
      },
      {
        name: 'Kotlin',
        category: 'language',
        detail: {
          vi: 'Ngôn ngữ chính xử lý logic ứng dụng và trạng thái công việc.',
          en: 'Primary language handling app logic and task states.',
        },
      },
      {
        name: 'Antigravity',
        category: 'tool',
        detail: {
          vi: 'Công cụ mình dùng để chỉnh sửa code và giao diện.',
          en: 'The tool I use to edit the code and interface.',
        },
      },
      {
        name: 'Git & GitHub',
        category: 'tool',
        detail: {
          vi: 'Quản lý mã nguồn trong repo snaptask-android.',
          en: 'Manage the code in the snaptask-android repo.',
        },
      },
    ],
  },
  {
    id: 'mini-tms-project',
    indexNumber: '05',
    title: 'TMS Mini v2.0',
    subtitle: {
      vi: 'Hệ thống quản lý vận tải và theo dõi đội xe',
      en: 'Transportation management and fleet tracking web system',
    },
    description: {
      vi: 'Mình làm hệ thống web này với phân quyền riêng cho tài xế và quản lý điều phối. Người dùng có thể theo dõi trạng thái đội xe, xem bản đồ tuyến đường và kiểm tra báo cáo chuyến đi ngay trên trình duyệt.',
      en: 'I built this web portal with separate workflows for drivers and dispatch managers. Users can monitor fleet status, view interactive route maps and review trip reports in the browser.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/mini-tms-project',
    technologies: [
      {
        name: 'HTML, CSS, JavaScript',
        category: 'language',
        detail: {
          vi: 'Cấu trúc giao diện điều phối, phân quyền và quản lý trạng thái chuyến xe.',
          en: 'Structures the dispatch portals, role auth and live trip states.',
        },
      },
      {
        name: 'Leaflet',
        category: 'framework',
        detail: {
          vi: 'Hiển thị bản đồ tuyến đường phục vụ theo dõi lộ trình đội xe.',
          en: 'Renders interactive route maps for real-time fleet tracking.',
        },
      },
    ],
  },
  {
    id: 'agent-mesh',
    indexNumber: '06',
    title: 'AgentMesh',
    subtitle: {
      vi: 'Trình mô phỏng và giám sát mạng lưới đa tác nhân AI',
      en: 'Multi-agent AI swarm visualizer and telemetry monitor',
    },
    description: {
      vi: 'Mình thiết kế và lập trình trình mô phỏng cách các tác nhân AI phối hợp với nhau. Giao diện hiển thị sơ đồ nút mạng trên Canvas, luồng sự kiện trực tiếp và bước duyệt thủ công trước các tác vụ quan trọng.',
      en: 'I designed and built a simulator showing how multiple AI agents coordinate. It combines an interactive Canvas node graph, a live event stream and a manual approval gate before sensitive actions.',
    },
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/AgentMesh',
    technologies: [
      {
        name: 'Canvas',
        category: 'framework',
        detail: {
          vi: 'Vẽ sơ đồ nút mạng tác nhân và luồng truyền thông điệp.',
          en: 'Draws interactive agent graphs and message particle flows.',
        },
      },
      {
        name: 'HTML, CSS, JavaScript',
        category: 'language',
        detail: {
          vi: 'Chạy kịch bản điều phối đa tác nhân và bộ lọc sự kiện.',
          en: 'Runs multi-agent scenarios and telemetry filtering.',
        },
      },
      {
        name: 'Service Worker',
        category: 'deploy',
        detail: {
          vi: 'Lưu đệm ngoại tuyến để ứng dụng chạy được khi không có mạng.',
          en: 'Provides offline caching and installable PWA support.',
        },
      },
      {
        name: 'Playwright',
        category: 'tool',
        detail: {
          vi: 'Kiểm thử tự động các kịch bản tương tác và luồng sự kiện.',
          en: 'Verifies simulation interactions and event flows automatically.',
        },
      },
    ],
  },
];
