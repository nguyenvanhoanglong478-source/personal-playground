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
    en: 'I design it to look right, then code it until it actually works.',
  },
  heroIntro: {
    vi: 'Mình là Long Hoàng, sinh năm 2007, làm designer tự do và tự học lập trình để làm sản phẩm từ đầu đến cuối. Mình đã tự làm một web app đọc ngoại ngữ, một game mô phỏng shipper, một game trắc nghiệm hai đội chơi trực tiếp và một ứng dụng Android ghi chú bằng ảnh.',
    en: "I'm Long Hoàng, born in 2007, a freelance designer who taught myself to code so I can build products from start to finish. I've built a web app for reading foreign languages, a delivery driver simulation game, a live two-team quiz game and an Android app that turns photos into to-dos.",
  },
  aboutParagraphs: {
    vi: [
      'Mình 19 tuổi, làm designer tự do. Mình thích những thứ vừa đẹp vừa dùng được thật, nên mình tự học lập trình để không phải dừng ở bản thiết kế. Từ ý tưởng, giao diện, code, âm thanh cho đến lúc đưa lên mạng, mình muốn tự tay làm trọn vẹn.',
      'Sản phẩm của mình thường bắt đầu từ một nhu cầu có thật. Marginal ra đời vì mình muốn học ngoại ngữ bằng các bài báo học thuật thay vì đoạn hội thoại giáo trình. Một ngày làm shipper là game mô phỏng cuộc sống tài xế giao hàng, nơi bạn phải tiết kiệm 100 triệu đồng trong 24 tháng và lo cả thể lực, xăng xe lẫn chuyện gia đình. Team Quiz Battle cho hai đội đấu trắc nghiệm trực tiếp, và người chủ phòng tự soạn câu hỏi, tự chỉnh thời gian trả lời. SnapTask biến một tấm ảnh thành việc cần làm.',
      'Mình làm việc theo từng bước nhỏ. Mình giữ chắc phần đang chạy ổn và kiểm tra kỹ rồi mới đi tiếp. Mình để ý chi tiết, từ icon 16x16 vẽ tay đến việc giao diện hiển thị đúng trên điện thoại lẫn máy tính. Vì tò mò về ngôn ngữ nên mình luôn cố làm song ngữ Việt và Anh.',
      'Hướng đi sắp tới của mình là làm những công cụ số, ứng dụng và trò chơi dùng thật sự được, chạy mượt, có thiết kế chỉn chu. Mình kết hợp công nghệ web và di động hiện đại với AI ở những chỗ nó thật sự giúp ích.',
      'Nếu bạn có một ý tưởng và cần một người vừa thiết kế vừa biến nó thành sản phẩm chạy được, cứ nhắn cho mình.',
    ],
    en: [
      "I'm 19 and work as a freelance designer. I like things that are both good-looking and actually usable, so I taught myself to code instead of stopping at the mockup. From the idea, interface, code and sound all the way to putting it online, I want to build it end to end.",
      "My products usually start from a real need. I made Marginal because I wanted to learn languages from academic articles rather than textbook dialogues. Shipper Simulator is a game about a delivery driver's life, where you try to save 100 million dong in 24 months while managing stamina, fuel and family. Team Quiz Battle lets two teams compete live, and the host writes the questions and sets the answer time. SnapTask turns a photo into a to-do.",
      "I work in small steps. I keep what already works stable and test carefully before moving on. I care about details, from hand-drawn 16x16 icons to making sure the interface holds up on both phone and desktop. Because I'm curious about languages, I try to make everything bilingual in Vietnamese and English.",
      "Next, I want to keep making digital tools, apps and games that are genuinely useful, run smoothly and are carefully designed. I combine modern web and mobile technology with AI where it actually helps.",
      "If you have an idea and need someone who can both design it and turn it into a working product, get in touch.",
    ],
  },
  methodology: [
    {
      index: '01',
      title: {
        vi: 'Chia nhỏ, xong mới đi tiếp',
        en: 'Small steps, finish before moving on',
      },
      description: {
        vi: 'Mình chia việc thành từng nhóm nhỏ, làm xong và kiểm tra nhóm nào mới sang nhóm tiếp theo. Phần đời sống trong game shipper được làm theo năm giai đoạn như vậy.',
        en: 'I split work into small groups and test each one before starting the next. The life system in the shipper game was built in five stages this way.',
      },
    },
    {
      index: '02',
      title: {
        vi: 'Giữ chắc phần đang chạy',
        en: 'Protect what works',
      },
      description: {
        vi: 'Mình không viết lại khi chưa cần. Khi cân nhắc đổi engine cho game, mình quyết định giữ web, và khi thử giao diện mới thì làm trên nhánh riêng để bản chính giữ nguyên.',
        en: "I don't rewrite without a reason. When I considered switching the game engine, I kept the web version, and when I tried a new look I did it on a separate branch so the main one stayed intact.",
      },
    },
    {
      index: '03',
      title: {
        vi: 'Kiểm thử trước khi tin',
        en: 'Test before trusting',
      },
      description: {
        vi: 'Mình viết kiểm thử tự động cho từng nhóm tính năng. Game shipper có mười hai file test và một bài bấm ngẫu nhiên 1800 bước để tìm lỗi mà mắt thường không thấy.',
        en: 'I write automated tests for each feature group. The shipper game has twelve test files and a random-click run of 1800 steps to catch bugs the eye would miss.',
      },
    },
    {
      index: '04',
      title: {
        vi: 'Chi tiết nhỏ cũng là sản phẩm',
        en: 'Small details are the product',
      },
      description: {
        vi: 'Mình vẽ lại icon 16x16 cho cân đối, chọn font hiển thị đúng dấu tiếng Việt và sửa từng ô giá lệch trên mobile.',
        en: 'I redraw 16x16 icons until they look balanced, pick fonts that render Vietnamese diacritics correctly and fix misaligned price cells on mobile one by one.',
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
      indexHeader: '5 DỰ ÁN TIÊU BIỂU',
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
      subheading: 'Bốn mảng công việc thực tế từ thiết kế đồ họa, giao diện web, ứng dụng Android cho đến hạ tầng và kiểm thử tự động.',
    },
    projects: {
      sectionIndex: '04 / DỰ ÁN TIÊU BIỂU',
      heading: 'Sản phẩm tự thiết kế và xây dựng',
      subheading: 'Các dự án thực tế do mình trực tiếp lên ý tưởng, thiết kế giao diện, lập trình, kiểm thử và đưa lên mạng.',
      repoLabel: 'GitHub',
      techLabel: 'Công nghệ sử dụng',
    },
    skills: {
      sectionIndex: '05 / NỀN TẢNG VÀ KỸ NĂNG',
      heading: 'Công nghệ áp dụng trong dự án thật',
      subheading: 'Năm nhóm nền tảng, thiết kế, lập trình và quy trình thực hành qua từng sản phẩm. Chọn từng chip để xem dự án đã áp dụng.',
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
      subheading: 'Danh sách công nghệ cốt lõi đang vận hành trang cá nhân này, trích xuất trực tiếp từ tệp package.json.',
      pipelineTitle: 'Luồng biên dịch và hiển thị',
    },
    contact: {
      sectionIndex: '07 / LIÊN HỆ VÀ HỢP TÁC',
      heading: 'Cùng làm một thứ chạy được nhé',
      subheading: 'Nếu bạn cần một designer biết tự code, hoặc muốn biến một ý tưởng thành sản phẩm thật, mình rất sẵn lòng trao đổi. Việc freelance, hợp tác hay chỉ là chia sẻ ý tưởng đều được.',
      mailtoButton: 'Mở trình gửi thư',
      composeLabel: 'Soạn nhanh email',
      subjectLabel: 'Tiêu đề thư',
      bodyLabel: 'Nội dung trao đổi',
      subjectPlaceholder: 'Nhập tiêu đề trao đổi công việc hoặc thiết kế',
      bodyPlaceholder: 'Nhập nội dung bạn muốn nhắn cho mình...',
    },
    footer: {
      colophon: 'Long Hoàng — Designer tự do & Người làm sản phẩm.',
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
      indexHeader: 'TOP 5 PROJECTS',
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
      subheading: 'Four hands-on areas spanning product design, interactive front-end, Android apps, cloud proxies and automated testing.',
    },
    projects: {
      sectionIndex: '04 / FEATURED PROJECTS',
      heading: 'Products designed and built end to end',
      subheading: 'Real products where I handled the idea, interface, code, testing and deployment myself.',
      repoLabel: 'GitHub',
      techLabel: 'Technologies',
    },
    skills: {
      sectionIndex: '05 / PLATFORMS AND SKILLS',
      heading: 'Skills applied in real products',
      subheading: 'Five groups covering platforms, design, front-end, back-end and workflow. Select any chip to see which projects use it.',
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
      subheading: 'Core technologies running this site, synced directly from the root package.json manifest.',
      pipelineTitle: 'Build and runtime pipeline',
    },
    contact: {
      sectionIndex: '07 / CONTACT AND COLLABORATION',
      heading: "Let's build something that works",
      subheading: "If you need a designer who can also code, or want to turn an idea into a real product, I'd be glad to talk. Freelance work, collaboration or just sharing ideas are all welcome.",
      mailtoButton: 'Open email client',
      composeLabel: 'Quick email draft',
      subjectLabel: 'Subject',
      bodyLabel: 'Message',
      subjectPlaceholder: 'Enter subject for design or product work',
      bodyPlaceholder: 'Write your message here...',
    },
    footer: {
      colophon: 'Long Hoàng — Freelance Designer & Product Maker.',
      backToTop: 'Back to top',
    },
  },
};
