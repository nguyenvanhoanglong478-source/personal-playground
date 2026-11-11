import rawPackageJson from '../../package.json';
import { BilingualText } from './profile';

export interface SiteStackNode {
  pkgName: string;
  displayName: string;
  version: string;
  role: 'build' | 'framework' | 'language' | 'styling' | 'motion' | 'icons';
  isDevDependency: boolean;
  reason: BilingualText;
}

interface PackageMeta {
  displayName: string;
  role: SiteStackNode['role'];
  reason: BilingualText;
}

const KNOWN_PACKAGE_REASONS: Record<string, PackageMeta> = {
  vite: {
    displayName: 'Vite',
    role: 'build',
    reason: {
      vi: 'Khởi động máy chủ phát triển tức thì và chia nhỏ gói mã (code-splitting) cho phần đồ họa Canvas.',
      en: 'Provides instant dev server startup and clean Rollup code-splitting for the lazy-loaded Canvas.',
    },
  },
  react: {
    displayName: 'React',
    role: 'framework',
    reason: {
      vi: 'Xây dựng giao diện theo hướng thành phần (component) tách biệt hoàn toàn với tầng dữ liệu src/data/*.ts.',
      en: 'Powers declarative component architecture cleanly decoupled from the src/data/*.ts content layer.',
    },
  },
  'react-dom': {
    displayName: 'React DOM',
    role: 'framework',
    reason: {
      vi: 'Kết xuất cây giao diện vào DOM với chế độ StrictMode kiểm tra vòng đời an toàn.',
      en: 'Mounts and reconciles the component tree into the browser DOM under StrictMode.',
    },
  },
  typescript: {
    displayName: 'TypeScript',
    role: 'language',
    reason: {
      vi: 'Kiểm tra kiểu dữ liệu nghiêm ngặt cho cấu trúc dự án, nhãn song ngữ VI/EN và đọc trực tiếp package.json.',
      en: 'Enforces strict type safety across project schemas, bilingual VI/EN strings, and direct package.json imports.',
    },
  },
  tailwindcss: {
    displayName: 'Tailwind CSS',
    role: 'styling',
    reason: {
      vi: 'Kết hợp hệ thống biến màu CSS (:root) tạo lưới Bento bất đối xứng và cột lề chú giải (Marginalia) chuẩn xác.',
      en: 'Pairs with CSS custom properties (:root) to construct the asymmetric Bento grid and Marginalia rails.',
    },
  },
  'framer-motion': {
    displayName: 'Framer Motion',
    role: 'motion',
    reason: {
      vi: 'Điều phối chuyển động chữ hiện dần theo từ, hiệu ứng cuộn mượt chỉ dùng transform/opacity và tôn trọng prefers-reduced-motion.',
      en: 'Orchestrates word-by-word hero reveals and scroll transitions using only transform/opacity while honoring prefers-reduced-motion.',
    },
  },
  'lucide-react': {
    displayName: 'Lucide Icons',
    role: 'icons',
    reason: {
      vi: 'Cung cấp bộ biểu tượng vector nét mảnh đồng bộ với phong cách bản vẽ kỹ thuật mà không dùng emoji.',
      en: 'Supplies crisp stroke-based vector icons matching the technical folio aesthetic without relying on emojis.',
    },
  },
  '@vitejs/plugin-react': {
    displayName: 'Vite Plugin React',
    role: 'build',
    reason: {
      vi: 'Hỗ trợ Fast Refresh và biên dịch JSX/TSX tối ưu trong quá trình phát triển.',
      en: 'Enables Fast Refresh and optimized JSX/TSX compilation during development.',
    },
  },
  postcss: {
    displayName: 'PostCSS',
    role: 'styling',
    reason: {
      vi: 'Xử lý chuỗi biến đổi CSS và tối ưu hóa quy tắc kiểu dáng cho trình duyệt.',
      en: 'Processes the CSS transformation pipeline for Tailwind and browser compatibility.',
    },
  },
  autoprefixer: {
    displayName: 'Autoprefixer',
    role: 'styling',
    reason: {
      vi: 'Tự động bổ sung tiền tố vendor cho các thuộc tính CSS hiện đại.',
      en: 'Automatically adds vendor prefixes for cross-browser CSS consistency.',
    },
  },
};

/**
 * Đọc trực tiếp tệp package.json thật của chính trang web này (Mục 4.6).
 * Nếu thêm hoặc xóa bất kỳ gói nào trong package.json, hàm này sẽ tự động cập nhật danh sách!
 */
export function getLiveSiteStack(): {
  projectName: string;
  projectVersion: string;
  packages: SiteStackNode[];
} {
  const deps: Record<string, string> = rawPackageJson.dependencies || {};
  const devDeps: Record<string, string> = rawPackageJson.devDependencies || {};

  const allEntries: Array<{ name: string; version: string; isDev: boolean }> = [
    ...Object.entries(deps).map(([name, version]) => ({ name, version, isDev: false })),
    ...Object.entries(devDeps)
      .filter(([name]) => !name.startsWith('@types/'))
      .map(([name, version]) => ({ name, version, isDev: true })),
  ];

  const packages: SiteStackNode[] = allEntries.map(({ name, version, isDev }) => {
    const meta = KNOWN_PACKAGE_REASONS[name];
    if (meta) {
      return {
        pkgName: name,
        displayName: meta.displayName,
        version,
        role: meta.role,
        isDevDependency: isDev,
        reason: meta.reason,
      };
    }

    return {
      pkgName: name,
      displayName: name,
      version,
      role: isDev ? 'build' : 'framework',
      isDevDependency: isDev,
      reason: {
        vi: `Thư viện được khai báo trực tiếp trong package.json (${isDev ? 'devDependencies' : 'dependencies'}).`,
        en: `Package declared directly in package.json (${isDev ? 'devDependencies' : 'dependencies'}).`,
      },
    };
  });

  return {
    projectName: rawPackageJson.name,
    projectVersion: rawPackageJson.version,
    packages,
  };
}

export const LIVE_SITE_STACK = getLiveSiteStack();
