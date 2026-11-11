export type Locale = 'vi' | 'en';

export interface BilingualText {
  vi: string;
  en: string;
}

export interface ProfileData {
  name: string;
  birthYear: string;
  role: BilingualText;
  brandSubtitle: BilingualText;
  avatarUrl: string;
  slogan: BilingualText;
  introMain: BilingualText;
  aboutStory: BilingualText;
  methodSummary: BilingualText;
  contacts: {
    email: string;
    githubUrl: string;
    githubHandle: string;
  };
}

export const PROFILE_DATA: ProfileData = {
  name: 'Long Hoàng',
  birthYear: '2007',
  role: {
    vi: 'Sinh viên, Design tự do',
    en: 'Student, Freelance Designer',
  },
  brandSubtitle: {
    vi: 'Sinh viên & Design tự do',
    en: 'Student & Freelance Designer',
  },
  avatarUrl: './avatar.jpg',
  slogan: {
    vi: 'Thiết kế rõ ràng. Tự tay biến ý tưởng thành sản phẩm chạy thật.',
    en: 'Clear visual craft. Turning ideas into working software.',
  },
  introMain: {
    vi: 'Tôi kết hợp tư duy thiết kế giao diện tự do với lập trình thực chiến để xây dựng ứng dụng web, di động Android và công cụ tương tác trên trình duyệt.',
    en: 'I combine freelance interface design with hands-on software engineering across web applications, Android mobile apps, and interactive browser tools.',
  },
  aboutStory: {
    vi: 'Sinh năm 2007, hiện tôi đang là sinh viên đồng thời làm thiết kế tự do. Tôi chú trọng cách sắp xếp bố cục, tỷ lệ chữ và độ tương phản, sau đó tự viết mã nguồn để sản phẩm vận hành mượt mà trên nhiều thiết bị.',
    en: 'Born in 2007, I am currently a student working alongside as a freelance designer. I focus on layout structure, typography hierarchy, and color contrast, then write the full codebase myself so products run reliably across devices.',
  },
  methodSummary: {
    vi: 'Từ khâu dựng giao diện bằng Figma và Tailwind CSS đến đóng gói ứng dụng Android hay viết kiểm thử tự động Playwright, tôi luôn ưu tiên tính thực tế, gọn nhẹ và dễ bảo trì.',
    en: 'From shaping interfaces in Tailwind CSS and Canvas to packaging Android apps and writing Playwright test suites, I prioritize practical performance and maintainable code.',
  },
  contacts: {
    email: 'nguyenvanhoanglong478@gmail.com',
    githubUrl: 'https://github.com/nguyenvanhoanglong478-source',
    githubHandle: 'nguyenvanhoanglong478-source',
  },
};

export const UI_LABELS = {
  vi: {
    nav: {
      hero: '01. Giới thiệu',
      about: '02. Về tôi',
      experience: '03. Kinh nghiệm',
      projects: '04. Dự án',
      skills: '05. Kỹ năng',
      stack: '06. Công nghệ trang',
      contact: '07. Liên hệ',
      themeLight: 'Sáng',
      themeDark: 'Tối',
    },
    hero: {
      folioTag: '01 / HỒ SƠ CÁ NHÂN',
      birthLabel: 'Năm sinh',
      roleLabel: 'Nghề nghiệp',
      ctaProjects: 'Xem dự án',
      ctaContact: 'Liên hệ',
      indexHeader: '5 DỰ ÁN TIÊU BIỂU',
      statusAvailable: 'Sẵn sàng nhận dự án thiết kế',
    },
    about: {
      sectionIndex: '02 / THÔNG TIN CƠ BẢN',
      heading: 'Về Long Hoàng',
      portraitAlt: 'Ảnh chân dung của Long Hoàng',
      nameLabel: 'Họ tên',
      birthLabel: 'Năm sinh',
      roleLabel: 'Nghề nghiệp',
      methodTitle: 'Định hướng thực hiện',
    },
    experience: {
      sectionIndex: '03 / KINH NGHIỆM',
      heading: 'Kinh nghiệm thiết kế và lập trình',
      subheading: 'Tổng hợp từ quá trình thiết kế tự do và phát triển các dự án web, di động, đồ họa tương tác và kiểm thử tự động.',
    },
    projects: {
      sectionIndex: '04 / DỰ ÁN NỔI BẬT',
      heading: '5 dự án mã nguồn nhiều nhất trên GitHub',
      subheading: 'Các dự án có dung lượng và khối lượng mã nguồn lớn nhất được xây dựng và lưu trữ trên tài khoản GitHub cá nhân.',
      repoLabel: 'GitHub',
      techLabel: 'Công nghệ sử dụng',
    },
    skills: {
      sectionIndex: '05 / KỸ NĂNG VÀ CÔNG CỤ',
      heading: 'Công nghệ thành thạo từ dự án thực tế',
      subheading: 'Tổng hợp các ngôn ngữ, thư viện, công cụ đồ họa và nền tảng triển khai đã áp dụng trực tiếp.',
      categories: {
        language: 'Ngôn ngữ lập trình',
        framework: 'Framework và thư viện',
        tool: 'Công cụ và kiểm thử',
        deploy: 'Nền tảng triển khai',
      },
    },
    builtWith: {
      sectionIndex: '06 / KIẾN TRÚC TRANG WEB',
      heading: 'Trang web này được xây dựng bằng gì',
      subheading: 'Danh sách công nghệ cốt lõi đang vận hành trang cá nhân này, trích xuất trực tiếp từ tệp package.json.',
      pipelineTitle: 'Luồng biên dịch và hiển thị',
    },
    contact: {
      sectionIndex: '07 / LIÊN HỆ',
      heading: 'Kết nối với tôi',
      subheading: 'Gửi email trực tiếp hoặc ghé thăm kho lưu trữ dự án trên GitHub của tôi.',
      mailtoButton: 'Mở trình gửi thư',
      composeLabel: 'Soạn nhanh email',
      subjectLabel: 'Tiêu đề thư',
      bodyLabel: 'Nội dung trao đổi',
      subjectPlaceholder: 'Nhập tiêu đề trao đổi công việc hoặc thiết kế',
      bodyPlaceholder: 'Nhập nội dung bạn muốn nhắn cho tôi...',
    },
    footer: {
      colophon: 'Long Hoàng — Sinh viên & Design tự do.',
      backToTop: 'Về đầu trang',
    },
  },
  en: {
    nav: {
      hero: '01. Intro',
      about: '02. About',
      experience: '03. Experience',
      projects: '04. Projects',
      skills: '05. Skills',
      stack: '06. Site stack',
      contact: '07. Contact',
      themeLight: 'Light',
      themeDark: 'Dark',
    },
    hero: {
      folioTag: '01 / PERSONAL PORTFOLIO',
      birthLabel: 'Born',
      roleLabel: 'Occupation',
      ctaProjects: 'View projects',
      ctaContact: 'Contact me',
      indexHeader: 'TOP 5 PROJECTS',
      statusAvailable: 'Available for freelance design',
    },
    about: {
      sectionIndex: '02 / BASIC PROFILE',
      heading: 'About Long Hoàng',
      portraitAlt: 'Portrait of Long Hoàng',
      nameLabel: 'Full name',
      birthLabel: 'Birth year',
      roleLabel: 'Occupation',
      methodTitle: 'Working approach',
    },
    experience: {
      sectionIndex: '03 / EXPERIENCE',
      heading: 'Design and engineering experience',
      subheading: 'Synthesized from freelance UI design work alongside building web platforms, Android apps, interactive graphics, and automated test suites.',
    },
    projects: {
      sectionIndex: '04 / FEATURED PROJECTS',
      heading: 'Top 5 largest repositories on GitHub',
      subheading: 'Selected projects ranked by source code volume and repository size from my personal GitHub account.',
      repoLabel: 'GitHub',
      techLabel: 'Technologies',
    },
    skills: {
      sectionIndex: '05 / SKILLS AND TOOLS',
      heading: 'Technical stack from real projects',
      subheading: 'Languages, frameworks, graphic engines, and deployment platforms applied across shipped projects.',
      categories: {
        language: 'Programming languages',
        framework: 'Frameworks and libraries',
        tool: 'Tools and testing',
        deploy: 'Deployment platforms',
      },
    },
    builtWith: {
      sectionIndex: '06 / SITE ARCHITECTURE',
      heading: 'What this website is built with',
      subheading: 'Core technologies running this site, synced directly from the root package.json manifest.',
      pipelineTitle: 'Build and runtime pipeline',
    },
    contact: {
      sectionIndex: '07 / CONTACT',
      heading: 'Get in touch',
      subheading: 'Send me an email directly or browse my repositories on GitHub.',
      mailtoButton: 'Open email client',
      composeLabel: 'Quick email draft',
      subjectLabel: 'Subject',
      bodyLabel: 'Message',
      subjectPlaceholder: 'Enter subject for design or engineering work',
      bodyPlaceholder: 'Write your message here...',
    },
    footer: {
      colophon: 'Long Hoàng — Student & Freelance Designer.',
      backToTop: 'Back to top',
    },
  },
};
