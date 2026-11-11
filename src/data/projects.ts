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
  linkPlaceholder: string;
  repoUrl: string;
  sourceProof: string;
  technologies: TechItem[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'marginal',
    indexNumber: '01',
    title: 'Marginal',
    subtitle: {
      vi: 'Ứng dụng web đọc và học ngoại ngữ qua bài báo học thuật',
      en: 'Web app for learning foreign languages through academic articles',
    },
    description: {
      vi: 'Dành cho người tự học ngoại ngữ muốn đọc trực tiếp tài liệu chuyên ngành. Ứng dụng hỗ trợ dán bài báo hoặc đường dẫn URL để dịch theo ngữ cảnh, hỏi đáp thuật ngữ và luyện phát âm.',
      en: 'Built for language learners reading domain literature. Users paste text or article URLs to get contextual sentence translation, terminology Q&A, and pronunciation practice.',
    },
    linkPlaceholder: '[[link]]',
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/Marginal',
    sourceProof: 'frontend/package.json · worker/wrangler.toml',
    technologies: [
      {
        name: 'JavaScript',
        category: 'language',
        detail: {
          vi: 'Ngôn ngữ chính cho giao diện React và Cloudflare Worker.',
          en: 'Primary language for the React frontend and Cloudflare Worker.',
        },
      },
      {
        name: 'React',
        category: 'framework',
        detail: {
          vi: 'Xây dựng các màn hình đọc bài báo, trò chuyện và luyện viết.',
          en: 'Powers the modular reader, chat panel, and writing practice views.',
        },
      },
      {
        name: 'Tailwind CSS',
        category: 'framework',
        detail: {
          vi: 'Thiết kế bố cục đọc chữ rõ ràng và đáp ứng trên nhiều màn hình.',
          en: 'Styles the responsive reading layout and interface controls.',
        },
      },
      {
        name: 'Gemini API',
        category: 'tool',
        detail: {
          vi: 'Xử lý dịch ngữ cảnh, chấm ngữ pháp và giải thích thuật ngữ.',
          en: 'Provides contextual translation, grammar checks, and terminology Q&A.',
        },
      },
      {
        name: 'Cloudflare Workers',
        category: 'deploy',
        detail: {
          vi: 'Làm máy chủ trung gian giấu khóa API và tải bài báo vượt qua giới hạn CORS.',
          en: 'Acts as an API proxy to protect keys and fetch external articles past CORS.',
        },
      },
      {
        name: 'GitHub Pages',
        category: 'deploy',
        detail: {
          vi: 'Lưu trữ và phục vụ bản dựng giao diện tĩnh của ứng dụng.',
          en: 'Hosts the compiled static frontend bundle.',
        },
      },
    ],
  },
  {
    id: 'snaptask',
    indexNumber: '02',
    title: 'SnapTask',
    subtitle: {
      vi: 'Ứng dụng Android ghi chú việc cần làm bằng hình ảnh',
      en: 'Android app for photo-first task notes and reminders',
    },
    description: {
      vi: 'Giúp người dùng bận rộn chụp ảnh nhanh đầu việc thay vì gõ tay dài dòng. Hỗ trợ phân loại thư mục, nhắc nhở theo lịch và ghim ghi chú ra màn hình chính.',
      en: 'Helps busy users capture tasks with quick photos instead of typing long notes. Includes folder organization, scheduled reminders, and Home Screen widgets.',
    },
    linkPlaceholder: '[[link]]',
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/snaptask-android',
    sourceProof: 'app/build.gradle.kts · gradle/libs.versions.toml',
    technologies: [
      {
        name: 'Kotlin',
        category: 'language',
        detail: {
          vi: 'Ngôn ngữ chính phát triển ứng dụng Android cùng Kotlin Coroutines.',
          en: 'Core Android language paired with Kotlin Coroutines for async tasks.',
        },
      },
      {
        name: 'Jetpack Compose',
        category: 'framework',
        detail: {
          vi: 'Xây dựng giao diện hiện đại theo chuẩn Material 3 và màn hình lịch biểu.',
          en: 'Builds the declarative Material 3 UI, board, and calendar views.',
        },
      },
      {
        name: 'CameraX',
        category: 'framework',
        detail: {
          vi: 'Chụp và xử lý ảnh ghi chú công việc trực tiếp trong ứng dụng.',
          en: 'Handles in-app camera capture directly attached to tasks.',
        },
      },
      {
        name: 'Jetpack Glance',
        category: 'framework',
        detail: {
          vi: 'Tạo ba mẫu widget hiển thị việc cần làm ngay trên màn hình chính.',
          en: 'Powers three customizable Home Screen task widgets.',
        },
      },
      {
        name: 'Room (SQLite)',
        category: 'tool',
        detail: {
          vi: 'Lưu trữ danh sách công việc và đường dẫn ảnh cục bộ không cần mạng.',
          en: 'Persists tasks and image metadata offline in local SQLite.',
        },
      },
      {
        name: 'GitHub Actions',
        category: 'deploy',
        detail: {
          vi: 'Tự động đóng gói tệp cài đặt APK tối ưu dung lượng theo từng kiến trúc CPU.',
          en: 'Automates multi-ABI APK builds on every push.',
        },
      },
    ],
  },
  {
    id: 'quiz-battle',
    indexNumber: '03',
    title: 'Team Quiz Battle',
    subtitle: {
      vi: 'Trò chơi web trắc nghiệm 2 đội theo thời gian thực',
      en: 'Real-time two-team multiplayer quiz racing game',
    },
    description: {
      vi: 'Dành cho lớp học hoặc buổi sinh hoạt nhóm cần tổ chức thi đấu đối kháng trực tiếp. Người chơi dùng điện thoại nhập mã phòng 6 ký tự để trả lời câu hỏi và đẩy xe đội mình về đích.',
      en: 'Designed for classrooms and group sessions hosting live team competitions. Players join via a 6-character room code on mobile and race their team car by answering accurately.',
    },
    linkPlaceholder: '[[link]]',
    repoUrl: 'https://github.com/anhmt821152-ctrl/bea',
    sourceProof: 'package.json · server.js',
    technologies: [
      {
        name: 'JavaScript',
        category: 'language',
        detail: {
          vi: 'Dùng xuyên suốt ở máy chủ điều phối phòng chơi và giao diện người tham gia.',
          en: 'Runs both the game room server and mobile client screens.',
        },
      },
      {
        name: 'Node.js',
        category: 'framework',
        detail: {
          vi: 'Môi trường chạy máy chủ xử lý phòng thi, tính điểm và phiên đăng nhập quản trị.',
          en: 'Server runtime managing lobbies, scoring, and host sessions.',
        },
      },
      {
        name: 'Express',
        category: 'framework',
        detail: {
          vi: 'Phục vụ các trang giao diện người chơi, trang quản trị và kiểm tra trạng thái.',
          en: 'Serves player and host web pages along with health check endpoints.',
        },
      },
      {
        name: 'Socket.IO',
        category: 'framework',
        detail: {
          vi: 'Đồng bộ câu hỏi, đồng hồ đếm ngược và vị trí xe đua theo thời gian thực.',
          en: 'Syncs questions, timers, and car positions across clients in real time.',
        },
      },
      {
        name: 'Render',
        category: 'deploy',
        detail: {
          vi: 'Nền tảng lưu trữ dịch vụ web và tự động cập nhật khi có mã nguồn mới.',
          en: 'Hosts the Node.js web service with automatic deploys on commit.',
        },
      },
    ],
  },
  {
    id: 'be-the-driver',
    indexNumber: '04',
    title: 'Be The Driver',
    subtitle: {
      vi: 'Trò chơi mô phỏng một ngày làm tài xế giao hàng 8-bit',
      en: '8-bit urban delivery driver life-simulation browser game',
    },
    description: {
      vi: 'Mô phỏng hành trình 24 tháng mưu sinh của một tài xế giao hàng với mục tiêu tiết kiệm 100 triệu đồng. Người chơi cân đối đơn hàng giờ cao điểm, sức khỏe, nhiên liệu và các biến cố đời sống.',
      en: 'Simulates a 24-month journey of a delivery rider working toward a 100M VND savings goal. Players balance peak-hour orders, stamina, fuel costs, and daily life events.',
    },
    linkPlaceholder: '[[link]]',
    repoUrl: 'https://github.com/nguyenvanhoanglong478-source/Deliver-Simulator',
    sourceProof: 'build.py · src/loop.js · tests/test_gameplay.py',
    technologies: [
      {
        name: 'JavaScript',
        category: 'language',
        detail: {
          vi: 'Điều khiển vòng lặp đồng hồ trò chơi, quy tắc đơn hàng và lưu tiến trình cục bộ.',
          en: 'Drives the unified game loop, delivery logic, and local save repair.',
        },
      },
      {
        name: 'Python',
        category: 'language',
        detail: {
          vi: 'Chạy kịch bản đóng gói thành một tệp HTML duy nhất và bộ kiểm thử tự động.',
          en: 'Powers the single-file HTML bundler and automated test scripts.',
        },
      },
      {
        name: 'HTML5 Canvas',
        category: 'tool',
        detail: {
          vi: 'Vẽ cảnh quan đường phố ngày đêm, thời tiết mưa và hiệu ứng chạy xe.',
          en: 'Renders day/night street scenery, rain weather, and delivery motion.',
        },
      },
      {
        name: 'Web Audio API',
        category: 'tool',
        detail: {
          vi: 'Tổng hợp âm thanh 8-bit trực tiếp trong trình duyệt mà không cần tải tệp lớn.',
          en: 'Synthesizes 8-bit sound effects directly in the browser.',
        },
      },
      {
        name: 'Playwright',
        category: 'tool',
        detail: {
          vi: 'Kiểm thử tự động toàn bộ luồng chơi, lưu trạng thái và chế độ ngoại tuyến.',
          en: 'Automates 13 browser test suites across gameplay and offline states.',
        },
      },
      {
        name: 'GitHub Pages',
        category: 'deploy',
        detail: {
          vi: 'Phân phối trò chơi tĩnh nhẹ và hỗ trợ chơi ngoại tuyến qua Service Worker.',
          en: 'Serves the lightweight PWA game build with offline caching.',
        },
      },
    ],
  },
];
