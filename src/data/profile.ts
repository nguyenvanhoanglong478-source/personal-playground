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
    vi: 'Đọc sâu từng trang học thuật. Tự tay đóng từng công cụ nhỏ.',
    en: 'Close reading of scholarly texts. Hand-crafted software tools.',
  },
  introMain: {
    vi: 'Tôi tự xây dựng các dự án cá nhân, tập trung vào công cụ hỗ trợ học ngoại ngữ và đọc tài liệu học thuật.',
    en: 'I independently build personal software projects, focusing on tools for foreign language acquisition and reading academic literature.',
  },
  introPlaceholder: {
    vi: '[[bổ sung quê quán, sở thích, mục tiêu nghề nghiệp]]',
    en: '[[add hometown, personal interests, and career goals]]',
  },
  marginaliaNote: {
    vi: 'Chú giải lề (Marginalia): Thay vì ghi nhớ từ vựng rời rạc, tôi thích học qua ngữ cảnh của các bài báo khoa học thực thụ và tự viết phần mềm để giải quyết nhu cầu đọc - ghi chú mỗi ngày.',
    en: 'Marginalia Note: Rather than memorizing isolated flashcards, I learn through the context of real academic papers and build software to solve my own daily reading and note-taking workflows.',
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
      hero: '01. Bản thảo',
      about: '02. Về Marcus',
      projects: '03. Dự án',
      skills: '04. Kỹ năng',
      stack: '05. Cấu trúc trang',
      contact: '06. Liên hệ',
      themeLight: 'Giấy sáng',
      themeDark: 'Đêm tối',
    },
    hero: {
      folioTag: 'TẬP BẢN THẢO SỐ 01 / SỔ TAY CHÚ GIẢI & HỒ SƠ DỰ ÁN',
      roleLabel: 'Vai trò:',
      ctaProjects: 'Xem dự án',
      ctaContact: 'Liên hệ',
      marginaliaHeader: 'CHÚ GIẢI NGỮ CẢNH (MARGINALIA)',
      scrollHint: 'Cuộn xuống để đọc bản thảo & bằng chứng mã nguồn',
    },
    about: {
      sectionIndex: 'CHƯƠNG 01 / NGƯỜI ĐỌC & NGƯỜI XÂY',
      heading: 'Về tôi & Triết lý làm sản phẩm',
      portraitCaption: 'Khung chân dung bản thảo',
      placeholderGuide: 'Các mục trong ngoặc vuông [[...]] là vị trí giữ chỗ trung thực chờ cập nhật trong src/data/profile.ts',
      readingMethodTitle: 'Phương pháp tiếp cận',
      readingMethodBody: 'Mỗi dự án bắt đầu từ một vướng mắc thực tế: cần dịch từng câu bài báo học thuật mà không làm lộ khóa API, cần chụp nhanh việc cần làm trên điện thoại cấu hình thấp, hay cần một phòng thi đấu trắc nghiệm trực tuyến cho tập thể.',
    },
    projects: {
      sectionIndex: 'CHƯƠNG 02 / TÁC PHẨM & BẰNG CHỨNG MÃ NGUỒN',
      heading: 'Dự án cá nhân tiêu biểu',
      subheading: 'Công nghệ của từng dự án được trích xuất trực tiếp từ các tệp cấu hình thật (package.json, build.gradle.kts, wrangler.toml, server.js, build.py).',
      evidenceLabel: 'Bằng chứng mã nguồn:',
      linkPlaceholderLabel: 'Liên kết triển khai:',
      repoLabel: 'Mã nguồn GitHub',
      techLabel: 'Công nghệ cốt lõi (từ code thật):',
      filterAll: 'Tất cả (4)',
    },
    skills: {
      sectionIndex: 'CHƯƠNG 03 / HỆ THỐNG KỸ NĂNG TỔNG HỢP',
      heading: 'Kỹ năng và công cụ từ mã nguồn thực tế',
      subheading: 'Tự động tổng hợp và khử trùng lặp 100% từ 4 dự án trên. Không liệt kê bất kỳ công nghệ nào không xuất hiện trong mã nguồn.',
      categories: {
        language: 'Ngôn ngữ lập trình',
        framework: 'Framework & Thư viện cốt lõi',
        tool: 'Công cụ, Cơ sở dữ liệu & Kiểm thử',
        deploy: 'Hạ tầng & Triển khai',
      },
      usedInLabel: 'Xuất hiện trong:',
    },
    builtWith: {
      sectionIndex: 'CHƯƠNG 04 / KIẾN TRÚC CỦA CHÍNH TRANG NÀY',
      heading: 'Trang web này được xây dựng bằng gì',
      subheading: 'Dữ liệu dưới đây được đọc tự động lúc biên dịch từ tệp package.json gốc của chính dự án này. Khi thêm hoặc bớt thư viện trong package.json, sơ đồ và danh sách sẽ tự động cập nhật.',
      pipelineTitle: 'Sơ đồ luồng biên dịch & vận hành thực tế',
      versionLabel: 'Phiên bản trong package.json:',
      sourceFileBadge: 'Nguồn: /package.json (Live Sync)',
    },
    contact: {
      sectionIndex: 'CHƯƠNG 05 / THƯ TÍN & KẾT NỐI',
      heading: 'Gửi tín hiệu cho Marcus',
      subheading: 'Kết nối trực tiếp qua thư điện tử hoặc các kênh mạng xã hội. Không sử dụng máy chủ trung gian.',
      mailtoButton: 'Mở trình gửi thư (mailto)',
      composeLabel: 'Soạn nhanh nội dung thư trước khi mở ứng dụng mail:',
      subjectPlaceholder: 'Tiêu đề thư (ví dụ: Trao đổi về dự án Marginal)',
      bodyPlaceholder: 'Nội dung tin nhắn gửi Marcus...',
      editHint: 'Mẹo: Bạn có thể điền thông tin thật thay cho [[email]], [[GitHub]], [[LinkedIn/Facebook]] ngay trong tệp src/data/profile.ts.',
    },
    footer: {
      colophon: 'Ấn bản Marginalia & Folio — Thiết kế riêng cho Marcus.',
      backupNote: 'Nhánh sao lưu an toàn trước khi làm lại: git checkout backup/truoc-khi-lam-lai',
      backToTop: 'Về trang đầu ↑',
    },
  },
  en: {
    nav: {
      hero: '01. Folio',
      about: '02. About',
      projects: '03. Projects',
      skills: '04. Skills',
      stack: '05. Site Stack',
      contact: '06. Contact',
      themeLight: 'Light Paper',
      themeDark: 'Dark Study',
    },
    hero: {
      folioTag: 'FOLIO ISSUE NO. 01 / ANNOTATED NOTEBOOK & PROJECT ARCHIVE',
      roleLabel: 'Role:',
      ctaProjects: 'Explore Projects',
      ctaContact: 'Get in Touch',
      marginaliaHeader: 'CONTEXTUAL MARGINALIA',
      scrollHint: 'Scroll to inspect the folio & verified source-code evidence',
    },
    about: {
      sectionIndex: 'CHAPTER 01 / THE READER & THE BUILDER',
      heading: 'About Me & Building Philosophy',
      portraitCaption: 'Archival Portrait Frame',
      placeholderGuide: 'Items wrapped in [[...]] are explicit placeholders ready to be filled in src/data/profile.ts',
      readingMethodTitle: 'Engineering Approach',
      readingMethodBody: 'Every project starts from a concrete personal friction: translating academic articles sentence-by-sentence without leaking API keys, capturing photo tasks on low-RAM phones, or hosting a real-time two-team quiz race.',
    },
    projects: {
      sectionIndex: 'CHAPTER 02 / WORKS & SOURCE EVIDENCE',
      heading: 'Selected Personal Projects',
      subheading: 'Every technology tag is extracted directly from verified source files (package.json, build.gradle.kts, wrangler.toml, server.js, build.py).',
      evidenceLabel: 'Verified source evidence:',
      linkPlaceholderLabel: 'Project link:',
      repoLabel: 'GitHub Repository',
      techLabel: 'Core Technologies (from real code):',
      filterAll: 'All Works (4)',
    },
    skills: {
      sectionIndex: 'CHAPTER 03 / VERIFIED SKILL MATRIX',
      heading: 'Skills & Tools Synthesized from Code',
      subheading: 'Automatically aggregated and deduplicated 100% from the 4 projects above. Zero unverified claims.',
      categories: {
        language: 'Programming Languages',
        framework: 'Core Frameworks & Libraries',
        tool: 'Tools, Storage & Testing',
        deploy: 'Infrastructure & Deployment',
      },
      usedInLabel: 'Verified in:',
    },
    builtWith: {
      sectionIndex: 'CHAPTER 04 / SELF-DOCUMENTING ARCHITECTURE',
      heading: 'What This Website Is Built With',
      subheading: 'Generated dynamically by reading this project’s own root package.json. Adding or removing dependencies in package.json automatically updates this diagram and table.',
      pipelineTitle: 'Live Build & Runtime Pipeline',
      versionLabel: 'Version in package.json:',
      sourceFileBadge: 'Source: /package.json (Live Sync)',
    },
    contact: {
      sectionIndex: 'CHAPTER 05 / CORRESPONDENCE',
      heading: 'Send a Direct Note to Marcus',
      subheading: 'Reach out directly via email or social links without any backend tracking.',
      mailtoButton: 'Open Email Client (mailto)',
      composeLabel: 'Quick-draft your message before opening your mail client:',
      subjectPlaceholder: 'Subject (e.g., Discussion regarding Marginal)',
      bodyPlaceholder: 'Your message to Marcus...',
      editHint: 'Tip: Replace [[email]], [[GitHub]], and [[LinkedIn/Facebook]] inside src/data/profile.ts.',
    },
    footer: {
      colophon: 'Marginalia & Folio Edition — Crafted for Marcus.',
      backupNote: 'Safe backup branch before rebuild: git checkout backup/truoc-khi-lam-lai',
      backToTop: 'Back to top ↑',
    },
  },
};
