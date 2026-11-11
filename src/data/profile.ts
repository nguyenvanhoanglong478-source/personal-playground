export type Locale = 'vi' | 'en';

export interface BilingualText {
  vi: string;
  en: string;
}

export interface ProfileData {
  name: string;
  rolePlaceholder: BilingualText;
  slogan: BilingualText;
  introMain: BilingualText;
  introPlaceholder: BilingualText;
  aboutStory: BilingualText;
  marginaliaNote: BilingualText;
  portraitPathPlaceholder: string;
  contacts: {
    email: string;
    github: string;
    githubDetectedUrl: string;
    social: string;
  };
}

export const PROFILE_DATA: ProfileData = {
  name: 'Marcus',
  rolePlaceholder: {
    vi: '[[ví dụ: Developer tự học / Indie builder]]',
    en: '[[e.g., Self-taught Developer / Indie builder]]',
  },
  slogan: {
    vi: 'Đọc kỹ tài liệu. Tự xây công cụ cho việc học và làm việc.',
    en: 'Read deeply. Build small tools for study and work.',
  },
  introMain: {
    vi: 'Tôi tự xây dựng các dự án cá nhân, tập trung vào công cụ hỗ trợ học ngoại ngữ và đọc tài liệu học thuật.',
    en: 'I build personal software projects, focusing on tools for learning foreign languages and reading academic articles.',
  },
  introPlaceholder: {
    vi: '[[bổ sung quê quán, sở thích, mục tiêu nghề nghiệp]]',
    en: '[[add hometown, personal interests, and career goals]]',
  },
  aboutStory: {
    vi: 'Tôi thích học ngoại ngữ trực tiếp qua các bài báo khoa học thay vì học từng từ riêng lẻ. Mỗi dự án của tôi đều bắt đầu từ một nhu cầu cụ thể trong lúc đọc tài liệu, ghi chú công việc hay giải trí cùng bạn bè.',
    en: 'I prefer learning languages by reading real academic papers instead of memorizing isolated flashcards. Each of my projects starts from a practical need in reading, note-taking, or group play.',
  },
  marginaliaNote: {
    vi: 'Ghi chú lề: Giữ mọi công cụ gọn nhẹ, rõ mã nguồn và chạy ổn định trên thiết bị phổ thông.',
    en: 'Margin note: Keep tools lightweight, transparent in code, and reliable on everyday devices.',
  },
  portraitPathPlaceholder: '[[đường dẫn ảnh, nếu không có thì dùng khung placeholder đẹp]]',
  contacts: {
    email: '[[email]]',
    github: '[[GitHub]]',
    githubDetectedUrl: 'https://github.com/nguyenvanhoanglong478-source',
    social: '[[LinkedIn/Facebook]]',
  },
};

export const UI_LABELS = {
  vi: {
    nav: {
      hero: '01. Giới thiệu',
      about: '02. Về tôi',
      projects: '03. Dự án',
      skills: '04. Kỹ năng',
      stack: '05. Công nghệ trang',
      contact: '06. Liên hệ',
      themeLight: 'Sáng',
      themeDark: 'Tối',
    },
    hero: {
      folioTag: '01 / HỒ SƠ CÁ NHÂN & DỰ ÁN',
      roleLabel: 'Vai trò:',
      ctaProjects: 'Xem dự án',
      ctaContact: 'Liên hệ',
      marginaliaHeader: 'DANH MỤC 4 DỰ ÁN',
      scrollHint: 'Cuộn xuống để xem chi tiết dự án và công nghệ.',
    },
    about: {
      sectionIndex: '02 / VỀ TÔI',
      heading: 'Cách tôi học và xây dựng sản phẩm',
      portraitCaption: 'Ảnh chân dung',
      methodTitle: 'Nguyên tắc làm việc',
      methodBody:
        'Tôi tách rõ phần giao diện và dữ liệu, ưu tiên chạy nhanh trên máy cấu hình thấp và kiểm thử các luồng chính trước khi phát hành.',
    },
    projects: {
      sectionIndex: '03 / DỰ ÁN CÁ NHÂN',
      heading: 'Các dự án đã thực hiện',
      subheading:
        'Bốn dự án cá nhân từ công cụ học tập, ứng dụng Android đến trò chơi thời gian thực. Công nghệ hiển thị được lấy trực tiếp từ mã nguồn.',
      linkPlaceholderLabel: 'Bản chạy thử:',
      repoLabel: 'Xem mã nguồn',
      techLabel: 'Công nghệ chính',
    },
    skills: {
      sectionIndex: '04 / KỸ NĂNG VÀ CÔNG CỤ',
      heading: 'Kỹ năng từ dự án thực tế',
      subheading:
        'Tổng hợp các ngôn ngữ, thư viện và nền tảng triển khai đã sử dụng trong 4 dự án trên.',
      categories: {
        language: 'Ngôn ngữ lập trình',
        framework: 'Framework và thư viện',
        tool: 'Công cụ và lưu trữ',
        deploy: 'Nền tảng triển khai',
      },
    },
    builtWith: {
      sectionIndex: '05 / CÔNG NGHỆ XÂY DỰNG TRANG',
      heading: 'Trang web này được xây dựng bằng gì',
      subheading:
        'Danh sách các công nghệ cốt lõi đang chạy trang web này, đọc trực tiếp từ tệp package.json.',
      pipelineTitle: 'Luồng đóng gói và hiển thị',
    },
    contact: {
      sectionIndex: '06 / LIÊN HỆ',
      heading: 'Kết nối với tôi',
      subheading:
        'Bạn có thể gửi email trực tiếp hoặc liên hệ qua các kênh bên dưới.',
      mailtoButton: 'Mở trình gửi thư',
      composeLabel: 'Soạn nhanh nội dung email',
      subjectPlaceholder: 'Tiêu đề thư (ví dụ: Trao đổi về dự án Marginal)',
      bodyPlaceholder: 'Nội dung bạn muốn nhắn...',
    },
    footer: {
      colophon: 'Marcus — Hồ sơ cá nhân và dự án.',
      backToTop: 'Về đầu trang',
    },
  },
  en: {
    nav: {
      hero: '01. Intro',
      about: '02. About',
      projects: '03. Projects',
      skills: '04. Skills',
      stack: '05. Site stack',
      contact: '06. Contact',
      themeLight: 'Light',
      themeDark: 'Dark',
    },
    hero: {
      folioTag: '01 / PERSONAL FOLIO & PROJECTS',
      roleLabel: 'Role:',
      ctaProjects: 'View projects',
      ctaContact: 'Contact me',
      marginaliaHeader: 'PROJECT INDEX (4)',
      scrollHint: 'Scroll down to inspect projects and source-verified technologies.',
    },
    about: {
      sectionIndex: '02 / ABOUT ME',
      heading: 'How I learn and build software',
      portraitCaption: 'Portrait',
      methodTitle: 'Working principles',
      methodBody:
        'I keep data separated from UI components, optimize for everyday devices, and test core flows before shipping.',
    },
    projects: {
      sectionIndex: '03 / PERSONAL PROJECTS',
      heading: 'Selected projects',
      subheading:
        'Four personal projects spanning language learning tools, an Android app, and browser games. Technologies are taken directly from source code.',
      linkPlaceholderLabel: 'Live link:',
      repoLabel: 'Source code',
      techLabel: 'Core technologies',
    },
    skills: {
      sectionIndex: '04 / SKILLS AND TOOLS',
      heading: 'Skills synthesized from real code',
      subheading:
        'Languages, frameworks, tools, and deployment platforms used across the four projects above.',
      categories: {
        language: 'Languages',
        framework: 'Frameworks and libraries',
        tool: 'Tools and storage',
        deploy: 'Deployment platforms',
      },
    },
    builtWith: {
      sectionIndex: '05 / SITE ARCHITECTURE',
      heading: 'What this website is built with',
      subheading:
        'Core technologies powering this site, read directly from its root package.json file.',
      pipelineTitle: 'Build and runtime pipeline',
    },
    contact: {
      sectionIndex: '06 / CONTACT',
      heading: 'Get in touch',
      subheading:
        'Send me an email directly or reach out through the channels below.',
      mailtoButton: 'Open email client',
      composeLabel: 'Quick-draft an email',
      subjectPlaceholder: 'Subject (e.g., Discussion about Marginal)',
      bodyPlaceholder: 'Your message...',
    },
    footer: {
      colophon: 'Marcus — Personal portfolio & projects.',
      backToTop: 'Back to top',
    },
  },
};
