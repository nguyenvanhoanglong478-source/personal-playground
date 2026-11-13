export type Locale = 'vi' | 'en';

export interface BilingualText {
  vi: string;
  en: string;
}

export interface MethodologyPrinciple {
  index: string;
  title: BilingualText;
  description: BilingualText;
}

export type SocialPlatform = 'github' | 'instagram' | 'facebook' | 'x';

export interface SocialLinkItem {
  id: SocialPlatform;
  label: string;
  href: string;
  displayText: string;
}

export interface ProfileInfo {
  name: string;
  birthYear: string;
  role: BilingualText;
  brandSubtitle: BilingualText;
  avatarUrl: string;
  slogan: BilingualText;
  heroIntro: BilingualText;
  aboutParagraphs: {
    vi: string[];
    en: string[];
  };
  methodology: MethodologyPrinciple[];
  contacts: {
    email: string;
    githubUrl: string;
    githubHandle: string;
    socials: SocialLinkItem[];
  };
}

export const PROFILE_DATA: ProfileInfo = {
  name: 'Long Hoàng',
  birthYear: '2007',
  role: {
    vi: 'Designer tự do & Người làm sản phẩm',
    en: 'Freelance Designer & Product Maker',
  },
  brandSubtitle: {
    vi: 'Designer tự do & Người làm sản phẩm',
    en: 'Freelance Designer & Product Maker',
  },
  avatarUrl: './avatar.jpg',
  slogan: {
    vi: 'Mình thiết kế cho đẹp, rồi tự code cho nó chạy thật.',
    en: 'I design it to look right, then code it until it works.',
  },
  heroIntro: {
    vi: 'Mình là Long Hoàng, sinh năm 2007, làm design tự do và tự học code. Mình thích tự tay làm trọn một sản phẩm, từ vẽ giao diện, viết code cho đến lúc đưa lên mạng chạy thật.',
    en: "I'm Long Hoàng, born in 2007, a freelance designer who codes. I like taking a product all the way from first sketch to a live build.",
  },
  aboutParagraphs: {
    vi: [
      'Mình 19 tuổi, làm designer tự do. Mình học thêm lập trình đơn giản vì muốn những bản vẽ mình làm ra có thể bấm vào dùng thật, chứ không chỉ nằm yên trong file thiết kế.',
      'Mình hay làm web app, game nhỏ và ứng dụng Android. Ở mỗi sản phẩm, mình tự lo từ phần nhìn như chế độ sáng và tối, chữ Việt gọn trên điện thoại cho tới phần chạy ngầm phía sau như server thời gian thực hay proxy AI.',
      'Mục tiêu sắp tới của mình là tiếp tục làm ra những thứ dùng sướng tay, có ích thật và gắn AI vào đúng chỗ cần thiết. Nếu bạn đang tìm một người vừa lo được phần nhìn vừa tự code được, cứ nhắn cho mình.',
    ],
    en: [
      "I'm 19 and work as a freelance designer. I picked up coding because I wanted my designs to work in real life, not just sit inside mockups.",
      'I build web apps, browser games, and Android tools end to end, caring as much about light and dark polish and mobile touch feel as the backend and AI wiring underneath.',
      "Right now I'm focused on shipping useful, tactile products with practical AI features. If you need someone who can both design and build, let's talk.",
    ],
  },
  methodology: [
    {
      index: '01',
      title: {
        vi: 'Làm cuốn chiếu từng phần',
        en: 'Build step by step',
      },
      description: {
        vi: 'Chia việc thành từng phần nhỏ, làm gọn và chạy ổn phần nào rồi mới sang phần tiếp theo.',
        en: 'Break work into small pieces and make sure each part feels solid before moving on.',
      },
    },
    {
      index: '02',
      title: {
        vi: 'Giữ bản chính luôn ổn',
        en: 'Keep the live site safe',
      },
      description: {
        vi: 'Muốn thử giao diện hay tính năng mới thì tách nhánh riêng, tránh làm hỏng bản mọi người đang xem.',
        en: 'Test new layouts or ideas on separate branches so the live site never breaks.',
      },
    },
    {
      index: '03',
      title: {
        vi: 'Tự test cho kỹ',
        en: 'Test like a real user',
      },
      description: {
        vi: 'Viết test tự động bằng Playwright cho những chỗ bấm phức tạp để bắt lỗi sớm trước khi đưa lên mạng.',
        en: 'Run automated Playwright checks on interactive flows to catch edge cases before shipping.',
      },
    },
    {
      index: '04',
      title: {
        vi: 'Chăm chút mấy thứ nhỏ',
        en: 'Care about the small stuff',
      },
      description: {
        vi: 'Từ độ rõ của chữ, dấu tiếng Việt đến cảm giác vuốt trên điện thoại, chỗ nào chưa thuận tay là sửa lại ngay.',
        en: 'From readable type and contrast to how things feel under a thumb on mobile, I fix whatever feels off.',
      },
    },
  ],
  contacts: {
    email: 'nguyenvanhoanglong478@gmail.com',
    githubUrl: 'https://github.com/nguyenvanhoanglong478-source',
    githubHandle: 'nguyenvanhoanglong478-source',
    socials: [
      {
        id: 'github',
        label: 'GITHUB',
        href: 'https://github.com/nguyenvanhoanglong478-source',
        displayText: 'github.com/nguyenvanhoanglong478-source',
      },
      {
        id: 'instagram',
        label: 'INSTAGRAM',
        href: 'https://www.instagram.com/duongwym?dlrf=dXlxZzFhMWpqYzJw',
        displayText: 'instagram.com/duongwym',
      },
      {
        id: 'facebook',
        label: 'FACEBOOK',
        href: 'https://www.facebook.com/share/1HZNvbuB6m/',
        displayText: 'facebook.com/share/1HZNvbuB6m',
      },
      {
        id: 'x',
        label: 'X',
        href: 'https://x.com/LongNgu56546236',
        displayText: 'x.com/LongNgu56546236',
      },
    ],
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
      roleLabel: 'Vai trò',
      ctaProjects: 'Xem dự án',
      ctaContact: 'Liên hệ',
      indexHeader: '5 DỰ ÁN NỔI BẬT',
      statusAvailable: 'Sẵn sàng nhận dự án thiết kế',
    },
    about: {
      sectionIndex: '02 / GIỚI THIỆU BẢN THÂN',
      heading: 'Về Long Hoàng',
      portraitAlt: 'Ảnh chân dung của Long Hoàng',
      nameLabel: 'Họ tên',
      birthLabel: 'Năm sinh',
      roleLabel: 'Vai trò',
      methodTitle: 'Nguyên tắc làm việc',
    },
    experience: {
      sectionIndex: '03 / KINH NGHIỆM',
      heading: 'Kinh nghiệm thiết kế và lập trình',
      subheading: 'Bốn mảng việc mình trực tiếp làm qua các dự án, từ vẽ giao diện đến dựng server.',
    },
    projects: {
      sectionIndex: '04 / DỰ ÁN TIÊU BIỂU',
      heading: 'Sản phẩm tự thiết kế và xây dựng',
      subheading: 'Sáu sản phẩm mình tự nghĩ ý tưởng, thiết kế, viết code và đưa lên mạng.',
      repoLabel: 'GitHub',
      techLabel: 'Công nghệ sử dụng',
    },
    skills: {
      sectionIndex: '05 / NỀN TẢNG VÀ KỸ NĂNG',
      heading: 'Công nghệ áp dụng trong dự án thật',
      subheading: 'Bấm từng mục để xem công nghệ đó được mình dùng vào dự án nào.',
      evidencePrefix: 'Áp dụng trong dự án',
      categories: {
        platforms: 'Nền tảng và triển khai',
        design: 'Thiết kế và sáng tạo',
        frontend: 'Front-end, đồ họa và âm thanh',
        backend: 'Back-end, thời gian thực và AI',
        workflow: 'Quy trình, kiểm thử và công cụ',
      },
    },
    builtWith: {
      sectionIndex: '06 / KIẾN TRÚC TRANG WEB',
      heading: 'Trang web này được xây dựng bằng gì',
      subheading: 'Những thư viện chính đang chạy cho trang này, đọc trực tiếp từ tệp package.json.',
      pipelineTitle: 'Luồng biên dịch và hiển thị',
    },
    contact: {
      sectionIndex: '07 / LIÊN HỆ VÀ HỢP TÁC',
      heading: 'Cùng làm một thứ chạy được nhé',
      subheading: 'Cần tìm người làm giao diện kiêm luôn code, hoặc có ý tưởng muốn làm chung? Cứ gửi email cho mình.',
      mailtoButton: 'Mở trình gửi thư',
      composeLabel: 'Soạn nhanh email',
      subjectLabel: 'Tiêu đề thư',
      bodyLabel: 'Nội dung trao đổi',
      subjectPlaceholder: 'Nhập tiêu đề trao đổi công việc hoặc thiết kế',
      bodyPlaceholder: 'Nhập nội dung bạn muốn nhắn cho mình...',
    },
    footer: {
      colophon: 'Long Hoàng · Designer tự do & Người làm sản phẩm.',
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
      roleLabel: 'Role',
      ctaProjects: 'View projects',
      ctaContact: 'Contact me',
      indexHeader: 'FEATURED PROJECTS',
      statusAvailable: 'Available for freelance design',
    },
    about: {
      sectionIndex: '02 / ABOUT ME',
      heading: 'About Long Hoàng',
      portraitAlt: 'Portrait of Long Hoàng',
      nameLabel: 'Full name',
      birthLabel: 'Birth year',
      roleLabel: 'Role',
      methodTitle: 'Working principles',
    },
    experience: {
      sectionIndex: '03 / EXPERIENCE',
      heading: 'Design and engineering experience',
      subheading: 'Four hands-on areas I handle directly across projects, from product UI to servers.',
    },
    projects: {
      sectionIndex: '04 / FEATURED PROJECTS',
      heading: 'Products designed and built end to end',
      subheading: 'Six products I dreamed up, designed, coded, and shipped myself.',
      repoLabel: 'GitHub',
      techLabel: 'Technologies',
    },
    skills: {
      sectionIndex: '05 / PLATFORMS AND SKILLS',
      heading: 'Skills applied in real products',
      subheading: 'Pick any tag to see which real project uses that tool or stack.',
      evidencePrefix: 'Applied in',
      categories: {
        platforms: 'Platforms',
        design: 'Design',
        frontend: 'Front-end',
        backend: 'Back-end',
        workflow: 'Workflow',
      },
    },
    builtWith: {
      sectionIndex: '06 / SITE ARCHITECTURE',
      heading: 'What this website is built with',
      subheading: 'Core libraries running this portfolio right now, pulled straight from package.json.',
      pipelineTitle: 'Build and runtime pipeline',
    },
    contact: {
      sectionIndex: '07 / CONTACT AND COLLABORATION',
      heading: "Let's build something that works",
      subheading: 'Need someone to design and build a product, or want to collaborate on a new idea? Drop me an email.',
      mailtoButton: 'Open email client',
      composeLabel: 'Quick email draft',
      subjectLabel: 'Subject',
      bodyLabel: 'Message',
      subjectPlaceholder: 'Enter subject for design or product work',
      bodyPlaceholder: 'Write your message here...',
    },
    footer: {
      colophon: 'Long Hoàng · Freelance Designer & Product Maker.',
      backToTop: 'Back to top',
    },
  },
};
