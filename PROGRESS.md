# PROGRESS.md - Tiến Độ Tái Thiết Kế Toàn Diện Trang Cá Nhân Marcus

Cập nhật lần cuối: 2026-11-11

## 1. Concept & Quyết Định Thiết Kế Đã Chốt

- **Concept chủ đạo**: **MARGINALIA & FOLIO - Sổ Tay Chú Giải Của Người Đọc & Người Xây (The Annotated Builder's Folio)**
  - Gắn trực tiếp với con người Marcus: người tự học và tự xây dựng công cụ đọc bài báo học thuật, học ngoại ngữ (`Marginal`), ứng dụng ghi chú bằng hình ảnh (`SnapTask`), game tương tác thời gian thực (`Team Quiz Battle`) và mô phỏng đời sống (`Be The Driver`).
  - Xuyên suốt từ Hero đến Footer: bố cục bất đối xứng lấy cảm hứng từ **trang bản thảo học thuật có cột lề chú giải (Marginalia Rail)**. Mọi dự án và kỹ năng đều đi kèm "chú thích bên lề" dẫn chứng trực tiếp từ tệp mã nguồn thật (`frontend/package.json`, `worker/wrangler.toml`, `app/build.gradle.kts`, `server.js`, `build.py`).
- **Typography (Hỗ trợ đầy đủ dấu Tiếng Việt)**:
  - Display / Serif Học Thuật: `Newsreader` (Google Fonts, hỗ trợ `vietnamese` subset, tạo cảm giác tạp chí học thuật và sách in cổ điển nhưng sắc nét).
  - Sans-serif Giao Diện & Nội Dung: `Be Vietnam Pro` (Google Fonts, thiết kế chuyên biệt cho cấu trúc dấu tiếng Việt).
  - Monospace Chú Giải & Mã Nguồn: `JetBrains Mono` (Google Fonts, hiển thị đường dẫn tệp, phiên bản gói và chỉ mục chú giải).
- **Bảng Màu (Dual Theme - Quản lý 100% qua biến `:root` CSS, đạt chuẩn WCAG AA/AAA, không dùng gradient tím-xanh)**:
  - **Light Mode (Archival Folio - Giấy Bản Thảo)**:
    - `--bg-primary`: `#F6F3EC`
    - `--bg-surface`: `#EDE8DD`
    - `--bg-elevated`: `#FAF8F4`
    - `--text-primary`: `#141413` (Iron Gall Ink - tương phản 15.4:1)
    - `--text-secondary`: `#524F49` (Graphite Note - tương phản 7.2:1)
    - `--accent-primary`: `#C83E2B` (Vermilion / Đỏ Chu Sa - dấu triện & gạch chân học thuật)
    - `--accent-secondary`: `#1D5B4C` (Spruce Ink - nhãn bằng chứng mã nguồn)
    - `--border-subtle`: `#D6CFC2`
  - **Dark Mode (Nocturnal Study - Đêm Đọc Sách)**:
    - `--bg-primary`: `#0E100F`
    - `--bg-surface`: `#171A18`
    - `--bg-elevated`: `#1E221F`
    - `--text-primary`: `#F2EFE9` (Warm Ivory - tương phản 16.2:1)
    - `--text-secondary`: `#A39E93` (Warm Ash - tương phản 7.4:1)
    - `--accent-primary`: `#F05A43` (Luminous Vermilion)
    - `--accent-secondary`: `#45B899` (Emerald Ink)
    - `--border-subtle`: `#262A27`
- **Thư Viện & Công Nghệ Của Trang Này**:
  - `react` + `react-dom` (`^18.3.1`)
  - `typescript` (`^5.6.3`)
  - `vite` + `@vitejs/plugin-react` (`^5.4.11` / `^4.3.3`)
  - `tailwindcss` (`^3.4.15`) + `postcss` + `autoprefixer`
  - `framer-motion` (`^11.11.17`)
  - `lucide-react` (`^0.460.0`)
  - Canvas 2D nhẹ (`HeroFolioCanvas.tsx`, tải lazy qua `React.lazy` + `Suspense`)

## 2. Các Skill Đã Đọc Và Áp Dụng

1. **`taste-skill` (v2.5.1)** (`C:\Users\nguye\.gemini\config\plugins\taste-skill\skills/taste-skill/SKILL.md`)
2. **`hallmark` (v2.0.0)** (`C:\Users\nguye\.gemini\config\plugins\hallmark\skills\hallmark/SKILL.md`)
3. **`impeccable` (v4.8.2)** (`C:\Users\nguye\.gemini\config\plugins\impeccable\skills\impeccable/SKILL.md`)
4. **`no-ai-slop`** (`C:\Users\nguye\.gemini\config\plugins\no-ai-slop\skills\no-ai-slop/SKILL.md`)

## 3. Kết Quả Khảo Sát Công Nghệ Từ Mã Nguồn Thật (Mục 4)

Đã tìm thấy mã nguồn thật của **cả 4 dự án** (trên máy local và qua GitHub API):

1. **Marginal** (Repo: `https://github.com/nguyenvanhoanglong478-source/Marginal`)
   - *Bằng chứng tệp*: `frontend/package.json`, `frontend/vite.config.js`, `frontend/tailwind.config.js`, `worker/package.json`, `worker/wrangler.toml`, `worker/src/index.js`, `frontend/src/lib/speech.js`.
   - *Công nghệ chính*: **JavaScript (ES6+)**, **React 18**, **Tailwind CSS 3**, **Vite 5**, **Gemini 2.5 Flash & Web Speech API**, **Cloudflare Workers & GitHub Pages**.
2. **SnapTask** (Local: `../snaptask-android` & Repo: `https://github.com/nguyenvanhoanglong478-source/snaptask-android`)
   - *Bằng chứng tệp*: `app/build.gradle.kts`, `gradle/libs.versions.toml`, `app/src/main/AndroidManifest.xml`, `.github/workflows/build_apk.yml`.
   - *Công nghệ chính*: **Kotlin 1.9 (Coroutines)**, **Jetpack Compose (Material 3)**, **CameraX & Coil Compose**, **Room Database (SQLite)**, **Jetpack Glance (AppWidget)**, **Gradle Kotlin DSL & GitHub Actions**.
3. **Team Quiz Battle** (Repo: `https://github.com/anhmt821152-ctrl/bea`)
   - *Bằng chứng tệp*: `package.json`, `server.js`, `README.md`, `public/host.html`, `public/play.html`, `public/js/editor.js`.
   - *Công nghệ chính*: **Node.js & Express 4**, **Socket.IO 4**, **JavaScript (ES6+) & HTML5/CSS3**, **HMAC HttpOnly Session & JSON Store**, **Render.com**.
4. **Be The Driver** (đổi tên thành *Một Ngày Làm Shipper / Deliver-Simulator* trong commit `600729c` và `a0a4ea8`; Local: `../Deliver-Simulator` & Repo: `https://github.com/nguyenvanhoanglong478-source/Deliver-Simulator`)
   - *Bằng chứng tệp*: `index.html`, `build.py`, `src/loop.js`, `src/audio.js`, `sw.js`, `manifest.webmanifest`, `tests/test_gameplay.py`.
   - *Công nghệ chính*: **JavaScript (ES6+) & HTML5/CSS3**, **HTML5 Canvas 2D & Web Audio API**, **Python 3**, **PWA (Service Worker & Manifest)**, **Playwright (Python)**, **GitHub Pages**.

## 4. Trạng Thái Tiến Độ

- **Việc đã xong**:
  - [x] Mục 0: Kiểm tra Git, tạo nhánh sao lưu `backup/truoc-khi-lam-lai` an toàn trước khi xóa code cũ.
  - [x] Mục 2: Đọc và nạp 4 bộ skill (`taste-skill`, `hallmark`, `impeccable`, `no-ai-slop`).
  - [x] Mục 4: Khảo sát mã nguồn thật của cả 4 dự án (`Marginal`, `SnapTask`, `Team Quiz Battle`, `Be The Driver / Deliver-Simulator`).
  - [x] Xây dựng `src/data/*.ts` (`profile.ts`, `projects.ts`, `skills.ts` tự tổng hợp khử trùng lặp, `siteStack.ts` đọc trực tiếp từ `package.json`).
  - [x] Xây dựng toàn bộ 7 thành phần giao diện: `Navbar`, `Hero` (+ lazy-loaded `HeroFolioCanvas`), `About`, `ProjectsBento`, `SkillsMatrix`, `BuiltWithDiagram`, `Contact`, `Footer`, `CustomCursor`.
  - [x] Chạy `npm run build` (`tsc -b && vite build`) thành công 100%, không lỗi TypeScript.
  - [x] Kiểm thử trên trình duyệt ở 3 kích thước `360px`, `768px`, `1440px` (cả Sáng/Tối và VI/EN).
  - [x] Viết `README.md`, `DESIGN.md` và workflow `.github/workflows/deploy.yml`.
- **Các chỗ thiếu thông tin cần Marcus tự điền sau (đã đánh dấu bằng `[[...]]`)**:
  - Vai trò chi tiết trong `src/data/profile.ts`: `[[ví dụ: Developer tự học / Indie builder]]`
  - Phần bổ sung giới thiệu trong `src/data/profile.ts`: `[[bổ sung quê quán, sở thích, mục tiêu nghề nghiệp]]`
  - Đường dẫn ảnh chân dung thật trong `src/data/profile.ts`: `[[đường dẫn ảnh, nếu không có thì dùng khung placeholder đẹp]]`
  - Thông tin liên hệ thật trong `src/data/profile.ts`: `[[email]]`, `[[GitHub]]`, `[[LinkedIn/Facebook]]`
  - Link bản chạy thử trực tuyến của từng dự án trong `src/data/projects.ts`: `[[link]]` (hiện đã gắn sẵn link GitHub Repo thật cho cả 4 dự án).
