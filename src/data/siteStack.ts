import rawPackageJson from '../../package.json';
import { BilingualText } from './profile';

interface SiteStackNode {
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

const INTERNAL_GLUE_PACKAGES = new Set([
  'react-dom',
  '@vitejs/plugin-react',
  'postcss',
  'autoprefixer',
]);

const KNOWN_PACKAGE_REASONS: Record<string, PackageMeta> = {
  vite: {
    displayName: 'Vite',
    role: 'build',
    reason: {
      vi: 'Khởi chạy máy chủ phát triển nhanh, tách vendor/icon và tải trễ các phân khu tương tác.',
      en: 'Provides fast local builds, splits vendor chunks, and lazy-loads interactive sections.',
    },
  },
  react: {
    displayName: 'React',
    role: 'framework',
    reason: {
      vi: 'Tổ chức giao diện theo từng thành phần độc lập và tách riêng khỏi tệp dữ liệu.',
      en: 'Structures the interface into modular components decoupled from data files.',
    },
  },
  typescript: {
    displayName: 'TypeScript',
    role: 'language',
    reason: {
      vi: 'Kiểm tra chặt chẽ kiểu dữ liệu dự án, song ngữ và cấu trúc đọc từ package.json.',
      en: 'Enforces strict type safety across project schemas, localization, and package imports.',
    },
  },
  tailwindcss: {
    displayName: 'Tailwind CSS',
    role: 'styling',
    reason: {
      vi: 'Xây dựng lưới bố cục đáp ứng kết hợp bộ biến màu và khoảng cách dùng chung.',
      en: 'Builds the responsive grid system anchored to shared CSS design tokens.',
    },
  },
  'lucide-react': {
    displayName: 'Lucide Icons',
    role: 'icons',
    reason: {
      vi: 'Cung cấp bộ biểu tượng vector nét mảnh đồng nhất trên toàn giao diện.',
      en: 'Supplies uniform stroke-based vector icons across all sections and controls.',
    },
  },
  lenis: {
    displayName: 'Lenis',
    role: 'motion',
    reason: {
      vi: 'Tạo cảm giác cuộn trang quán tính mượt trên chuột máy tính, tự tắt trên màn hình cảm ứng và khi mở modal.',
      en: 'Adds smooth inertial wheel scrolling on desktop pointers while staying off on touch devices and open modals.',
    },
  },
};

function getLiveSiteStack(): {
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
  ].filter(({ name }) => !INTERNAL_GLUE_PACKAGES.has(name));

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
        vi: 'Thư viện được khai báo trực tiếp trong tệp package.json của dự án.',
        en: 'Declared directly in the root package.json manifest.',
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
