# PROGRESS.md - Tiến Độ Trang Cá Nhân Long Hoàng

Cập nhật lần cuối: 2026-11-12

## 1. Thông Tin Đã Cập Nhật

- **Thông tin cơ bản**:
  - Tên: Long Hoàng
  - Năm sinh: 2007
  - Nghề nghiệp: Sinh viên, Design tự do
  - Ảnh đại diện: `public/avatar.jpg`
  - Liên hệ: `nguyenvanhoanglong478@gmail.com`, `https://github.com/nguyenvanhoanglong478-source`
- **Kinh nghiệm**: Tổng hợp 4 nhóm kinh nghiệm thực tế từ toàn bộ lịch sử trò chuyện và các dự án trên GitHub (`Thiết kế giao diện và Trải nghiệm người dùng`, `Phát triển Web Frontend và Đồ họa Tương tác`, `Phát triển Ứng dụng Android Nguyên bản`, `Dịch vụ API, Thời gian thực và Kiểm thử Tự động`).
- **Top 5 dự án dung lượng và mã nguồn lớn nhất trên GitHub**:
  1. `Deliver-Simulator` — `https://github.com/nguyenvanhoanglong478-source/Deliver-Simulator`
  2. `snaptask-android` — `https://github.com/nguyenvanhoanglong478-source/snaptask-android`
  3. `mini-tms-project` — `https://github.com/nguyenvanhoanglong478-source/mini-tms-project`
  4. `AgentMesh` — `https://github.com/nguyenvanhoanglong478-source/AgentMesh`
  5. `Marginal` — `https://github.com/nguyenvanhoanglong478-source/Marginal`
- **Làm sạch nội dung và mã nguồn**: Đã xóa toàn bộ dòng chú thích code trong `src/`, xóa toàn bộ văn bản trong ngoặc đơn và ngoặc vuông trên giao diện hiển thị cả bản Tiếng Việt và English.

## 2. Nâng Cấp Thiết Kế & Chuyển Động (UI/UX & Animations)

- **Hero Section & Ảnh đại diện**: Thẻ ảnh đại diện lơ lửng (`animate-float-gentle`), dải hào quang tỏa sáng (`animate-pulse-ring`), huy hiệu trạng thái nhận việc, nút CTA từ tính.
- **Thẻ 5 Dự án (Bento Grid)**: Hiệu ứng 3D Tilt nghiêng theo góc di chuột, vệt sáng radial spotlight, nút bấm GitHub tương tác mượt mà.
- **Nền động & Scroll Reveal**: Canvas 2D 60fps, chuyển động `whileInView` cho các phân khu, hỗ trợ `prefers-reduced-motion`.

## 3. Bảng Màu Google Modern Gradient & Chữ Đơn Sắc Trung Tính (Light & Dark Mode)

- **Dải màu Google Signature**: Giữ hệ thống token `#4285F4`, `#9B72CB`, `#D96570`, `#EA4335`, `#FBBC04`, `#34A853` trong `src/index.css` và `tailwind.config.js` dành riêng cho nền hào quang, viền phát quang, hiệu ứng hover và nền nút bấm.
- **Chế độ Sáng (Light Mode)**: Nền `#F8F9FA`, bề mặt kính mờ + `#F0F4F9`, toàn bộ chữ đơn sắc đen tuyền `#111111` (tiêu đề) và xám trung tính `#4B4E53` (nội dung).
- **Chế độ Tối (Dark Mode)**: Nền `#131314`, bề mặt kính mờ trên `#1E1F20` + `#282A2C`, toàn bộ chữ đơn sắc trắng ngà `#F5F5F7` (tiêu đề) và xám nhạt `#C4C7C5` (nội dung).
- **Chữ Đơn Sắc Tuyệt Đối**:
  - Loại bỏ toàn bộ Text Gradient và chữ màu ở tất cả component (`Navbar`, `Hero`, `About`, `Experience`, `ProjectsBento`, `SkillsMatrix`, `BuiltWithDiagram`, `Contact`) kể cả nhãn `<text>` trong SVG preview dự án.
  - Giữ dải Google Gradient trên nền **Google Aura Mesh**, viền phát quang của ảnh đại diện, viền/spotlight khi hover thẻ dự án Bento, gạch chân mục nav đang chọn và nền nút bấm chính / nút GitHub.
  - Chuyển màu mượt mà `360ms` khi đổi giữa chế độ Sáng và Tối, đồng bộ `<meta name="theme-color">`, `public/favicon.svg` và Canvas 2D.
  - Đã tinh chỉnh responsive `Navbar.tsx` để không cắt chữ hoặc đẩy nút menu trên màn hình 360px–375px.

## 4. Nâng Cấp Bố Cục Editorial & Staggered Showcase

- **Hero bìa tạp chí lệch tâm (`Hero.tsx`)**: Mở đầu bằng tiêu đề hiển thị lớn bên trái, vùng nội dung + cột mốc `2007` / `Sinh viên, Design tự do` lùi lề với đường kẻ phân cách mảnh và ảnh đại diện hạ bậc đối trọng kèm `useScroll` parallax nhẹ, giữ nguyên `animate-float-gentle` và `.google-border-frame`.
- **Về tôi (`About.tsx`)**: Dàn trang 4/8 cùng đường kẻ phân tách kiến trúc và bảng thông tin tối giản.
- **Kinh nghiệm dạng cột kiến trúc (`Experience.tsx`)**: Cột trái ghim mượt (`lg:sticky`) tiêu đề + chỉ mục 01–04, cột phải trình bày 4 khối kinh nghiệm theo trục kẻ dọc mảnh.
- **5 Dự án Staggered Zig-Zag (`ProjectsBento.tsx`)**: 5 thẻ dự án bố trí so le (`01, 03, 05` bên trái; `02, 04` lệch phải và hạ thấp độ cao), tích hợp watermark số thứ tự `01`–`05` đơn sắc cỡ lớn, parallax theo tầng, giữ nguyên 3D Tilt, radial spotlight, glowing gradient border và Scroll Reveal.
- **Skill áp dụng**: `taste-skill`, `hallmark`, `impeccable` (bao gồm `impeccable detect --json` trả về 0 cảnh báo), `no-ai-slop`.

## 5. Nâng Cấp Nút Bấm Tương Tác Kính Mờ & Viền Gradient Chuyển Động

- **Ngôn ngữ nút viên thuốc kính mờ (`src/index.css`)**:
  - Áp dụng đồng bộ cho toàn bộ nút bấm (`.folio-btn-primary`, `.folio-btn-secondary`, `.folio-btn-compact`, `.folio-btn-icon`, `.google-btn-github`) tại `Navbar`, `Hero`, `ProjectsBento`, `Contact`, `Footer`.
  - Ruột nút bán trong suốt với `backdrop-filter: blur(14px)`: Dark Mode `rgba(30, 31, 32, 0.85)` (`rgba(38, 39, 41, 0.90)` khi hover), Light Mode `rgba(255, 255, 255, 0.85)` (`rgba(255, 255, 255, 0.92)` khi hover), tuyệt đối không tô kín gradient hay màu đặc kể cả khi di chuột.
  - Viền Google chuyển động liên tục (`@property --btn-angle` xoay `7.5s` theo `@keyframes google-btn-spin`, kết hợp `#4285F4`, `#34A853`, `#FBBC04`, `#EA4335` và điểm tối chuyển tiếp tinh tế) kèm hào quang phát sáng ngoài mép (`.google-pill-aura`) nằm sau lớp kính mờ, đồng thời nâng nút mượt `translateY(-2px)` và tăng sáng viền khi hover.
  - Chữ và biểu tượng trên toàn bộ nút bấm giữ màu đơn sắc chuẩn (`#E3E3E3` ở Dark Mode, `#1F1F1F` ở Light Mode).
- **Skill áp dụng**: `taste-skill`, `hallmark`, `impeccable`, `no-ai-slop`.

## 6. Loại Bỏ Con Trỏ Tùy Chỉnh & Kích Hoạt Hiệu Ứng Nút Chỉ Khi Hover

- **Khôi phục con trỏ hệ thống (`App.tsx`, `HeroFolioCanvas.tsx`, `ProjectsBento.tsx`, `src/index.css`)**:
  - Xóa hoàn toàn component `CustomCursor.tsx`, gỡ bỏ `<CustomCursor />` khỏi `App.tsx`.
  - Xóa bộ lắng nghe `pointermove` toàn trang và quầng sáng bám chuột khỏi `HeroFolioCanvas.tsx`, xóa hiệu ứng spotlight bám chuột khỏi `ProjectsBento.tsx`.
  - Khai báo `cursor: pointer` rõ ràng cho toàn bộ `a[href]`, `button`, `[role='button']` và hệ thống nút kính mờ; không còn bất kỳ rule `cursor: none` nào trong dự án.
- **Hiệu ứng nút bấm chỉ kích hoạt khi hover trực tiếp (`src/index.css`, `Hero.tsx`)**:
  - Gỡ bỏ hiệu ứng magnetic mouse-tracking và wrapper bám chuột trên nút CTA chính tại `Hero.tsx`.
  - Chuyển toàn bộ nút viên thuốc kính mờ (`.folio-btn-primary`, `.folio-btn-secondary`, `.folio-btn-compact`, `.folio-btn-icon`, `.google-btn-github`) về trạng thái mặc định tĩnh sạch (`opacity: 0` ở lớp viền conic-gradient `::after` và hào quang `.google-pill-aura`, giữ viền mảnh tĩnh `--btn-border-static`, không chạy `@keyframes google-btn-spin` khi đứng yên).
  - Chỉ kích hoạt viền gradient Google xoay, hào quang tỏa nhẹ (`.google-pill-aura`), làm sáng lớp kính mờ (`--btn-glass-bg-hover`) và nâng nhẹ (`translateY(-2px) scale(1.015)`) khi di chuột trực tiếp `:hover`, rồi chuyển mượt về trạng thái tĩnh khi rời chuột.
- **Skill áp dụng**: `impeccable`, `no-ai-slop`.

## 7. Thiết Kế & Tích Hợp Logo Linh Thú Capybara (Capybara Spirit Emblem)

- **Biểu tượng SVG Sacred Geometry (`src/components/CapybaraLogo.tsx`)**:
  - Tạo hình Linh thú Capybara góc nghiêng điềm tĩnh (mũi vuông bo tròn đặc trưng, mắt nhắm Zen, tai vểnh nhẹ) bằng nét đơn `currentColor` (`#111111` Light Mode / `#F5F5F7` Dark Mode) kết hợp tinh tú 4 cánh trên đỉnh đầu và vòng hào quang mảnh dùng **Google Modern Gradient** (`#4285F4` -> `#9B72CB` -> `#D96570` -> `#EA4335` -> `#FBBC04` -> `#34A853`).
  - Dùng `useId()` tạo ID gradient duy nhất chống xung đột khi gắn ở nhiều nơi, hỗ trợ props `size`, `className`, `showAura`; đứng yên tĩnh lặng khi nghỉ và xoay/nâng tinh tú 4 cánh nhẹ khi hover nhóm thương hiệu (`group-hover`), tuân thủ `prefers-reduced-motion: reduce`.
- **Đồng bộ giao diện & Favicon (`Navbar.tsx`, `Footer.tsx`, `public/favicon.svg`)**:
  - Tích hợp `CapybaraLogo` thay thế huy hiệu chữ `L` tại `Navbar.tsx` và gắn tại chữ ký chân trang trong `Footer.tsx`, giữ toàn bộ phần chữ đi kèm màu đơn sắc trung tính.
  - Cập nhật `public/favicon.svg` đồng bộ biểu tượng Capybara trên nền bo góc có `@media (prefers-color-scheme: dark)` hiển thị sắc nét ở kích thước `16x16` và `32x32`.
- **Skill áp dụng**: `taste-skill`, `hallmark`, `impeccable`, `no-ai-slop`.

## 8. Tự Động Hóa Đẩy & Cập Nhật GitHub Pages

- **Cập nhật nhánh `gh-pages`**: Build bản production từ `main` (`npm run build`) và đồng bộ lên nhánh `gh-pages` phục vụ trực tiếp tại `https://nguyenvanhoanglong478-source.github.io/personal-playground/`.
- **Kịch bản tự động triển khai (`scripts/deploy-gh-pages.mjs`, `npm run deploy`, `AGENTS.md`)**: Bổ sung lệnh `npm run deploy` sử dụng worktree độc lập để tự build và đẩy lên `gh-pages`, đồng thời ghi quy tắc tự động cập nhật GitHub Pages sau mỗi lần chỉnh sửa vào `AGENTS.md`.
- **GitHub Actions Workflow (`.github/workflows/deploy.yml`)**: Soạn sẵn workflow tự build & đẩy lên `gh-pages` mỗi khi có push lên `main`; chỉ cần chạy `gh auth refresh -h github.com -s workflow` rồi push tệp này một lần do token hiện tại chưa có quyền `workflow`.

## 9. Thẻ Hồ Sơ Pokémon Holographic 3D (`Hero.tsx` & `src/index.css`)

- **Nghiêng 3D Vật Lý (`Hero.tsx`)**: Khung thẻ hồ sơ `.holo-card.google-border-frame` đặt trong vùng `perspective: 1000px` với tương tác con trỏ gói gọn riêng bên trong thẻ (`onPointerMove` / `onPointerLeave`), nội suy bằng `useMotionValue` + `useSpring` (`stiffness: 260, damping: 22`) cho góc nghiêng `-12deg` đến `+12deg` theo `--rotate-x`, `--rotate-y`, `--pointer-x`, `--pointer-y` và `--pointer-from-center`.
- **Hiệu Ứng Đa Lớp Foil & Specular Glare (`src/index.css`)**:
  - `.holo-foil-layer`: Dải quang phổ **Google Modern Gradient & Prismatic Rainbow** kèm vân sọc chéo vi mô `repeating-linear-gradient(115deg, ...)` dịch chuyển phản quang khi di chuột, căn chỉnh riêng thông số `mix-blend-mode` và `opacity` cho cả `Light Mode` và `Dark Mode`.
  - `.holo-sparkle-layer` & `.holo-glare-layer`: Vân ánh kim/ngôi sao vùng tiêu điểm và luồng sáng chiếu điểm `radial-gradient` (`mix-blend-mode: overlay`) đồng bộ với viền `.google-border-frame` sáng rực theo góc nghiêng.
  - **Bảo toàn chữ & Tĩnh khi nghỉ**: Toàn bộ văn bản, badge `2007` và 5 chip dự án nằm ở lớp `translateZ(24px)` (`z-20`) phía trên lớp foil để giữ trọn màu đơn sắc và độ tương phản chuẩn; lớp hologram về `opacity: 0` khi rời chuột và tắt nghiêng 3D dưới `@media (prefers-reduced-motion: reduce)`.
- **Skill áp dụng**: `taste-skill`, `hallmark`, `impeccable`, `no-ai-slop`.

## 10. Thẻ Bài Pokémon TCG Silver Holo EX 3D (`src/components/PokemonProfileCard.tsx`)

- **Kiến trúc 5 tầng giải phẫu thẻ bài thực thụ**:
  - **Card Header Bar**: Huy hiệu vát chéo `BASIC` tích hợp socket `CapybaraLogo`, tiêu đề `Long Hoàng` kèm tem kim loại vát `EX`, chỉ số `HP 2007` từ `PROFILE_DATA.birthYear` và viên ngọc `PrismTypeOrb`.
  - **Illustration Frame & Pokédex Ribbon**: Khung ảnh kim loại phay xước `aspect-[4/3]` cho `./avatar.jpg` kèm thanh `.pokemon-dex-ribbon` hiển thị `NO. 2007 • Sinh viên, Design tự do • HT: VI/EN` hỗ trợ song ngữ `vi`/`en`.
  - **Attacks / Moves Section**: Hai viên ngọc `ColorlessEnergyOrb`, tiêu đề `5 DỰ ÁN TIÊU BIỂU` / `TOP 5 PROJECTS`, sát thương `5×` và 5 nút `.pokemon-project-chip` gắn thẳng link GitHub `repoUrl` (`target="_blank" rel="noopener noreferrer"`) với `cursor: pointer`.
  - **Weakness / Resistance / Retreat & Footer**: Thanh 3 cột (`weakness ×2`, `resistance -30` với icon `Shield`, `retreat` 2 Energy Orbs) cùng chân thẻ `Illus. Long Hoàng` và nhãn hiếm `001/005 ★ SAR`.
- **Hiệu ứng 3D & Foil Đa Lớp (`src/index.css`, `Hero.tsx`)**:
  - Tương tác `onPointerMove` gói gọn trong `PokemonProfileCard`, nội suy bằng `useMotionValue` + `useSpring` (`stiffness: 240, damping: 24, mass: 0.9`) xoay `--rotate-x` / `--rotate-y` trong `.pokemon-card-perspective` (`900px`), tích hợp `.pokemon-card__shine` (quang phổ Google Gradient + dải sọc `110deg`), `.pokemon-card__sparkle` và `.pokemon-card__glare` tách token riêng cho **Dark Mode (Obsidian / Silver)** và **Light Mode (Platinum / Silver)**.
  - Đã kiểm thử bằng Playwright trên Chromium thật ở `1440px`, `820px`, `375px` và `360px` (đảm bảo tên `Long Hoàng` và thanh `NO. 2007` không cắt/tràn ở `360px`), chế độ `prefers-reduced-motion: reduce`, `impeccable detect --json` (`[]`) và `tsc -b && vite build`.
- **Skill áp dụng**: `taste-skill`, `hallmark`, `impeccable`, `no-ai-slop`.

## 11. Tối Ưu Tương Tác Cảm Ứng (Touch Devices: Mobile `375px` & Tablet `820px`)

- **Thẻ Bài Pokémon TCG 3D trên Cảm Ứng (`src/components/PokemonProfileCard.tsx`, `src/index.css`)**:
  - Áp dụng `touch-action: pan-y`, `-webkit-user-select: none; user-select: none; -webkit-touch-callout: none` trên `.pokemon-card-stage` và `.pokemon-card-rotator` để vuốt cuộn trang dọc không bị khựng hay bôi đen nhầm chữ.
  - Chuẩn hóa vòng đời Pointer Events (`onPointerEnter`, `onPointerDown`, `onPointerMove`, `onPointerUp`, `onPointerCancel`, `onPointerLeave` cùng bộ lắng nghe `window` `pointerup`/`pointercancel` khi `isInteracting`), giới hạn góc nghiêng cảm ứng ở mức `±9deg` (`scale(1.012)`) và bỏ qua thao tác bắt đầu từ thẻ `<a>` chip dự án (`target?.closest('a')`) để bấm mở GitHub mượt mà.
  - Thêm hiệu ứng **Ambient Holo Shimmer** (`@keyframes pokemon-ambient-shimmer`, `9s`, `prefers-reduced-motion: reduce` tắt hẳn) riêng cho `@media (hover: none) and (pointer: coarse)`, tự tạm dừng khi đang chạm (`data-interacting="true"`).
- **Chống Sticky Hover & Phản Hồi Xúc Giác `:active` (`tailwind.config.js`, `src/components/ProjectsBento.tsx`, `src/index.css`)**:
  - Bật `future: { hoverOnlyWhenSupported: true }` trong `tailwind.config.js`, chuyển toàn bộ kiểu `:hover` trong `src/index.css` vào `@media (hover: hover) and (pointer: fine)` và giới hạn `TiltProjectCard` chỉ chạy trên `pointerType === 'mouse'`.
  - Thêm trạng thái `:active` (`transform: scale(0.97)` kèm viền conic xoay / `.google-pill-aura` trên nút bấm và viền `#4285F4` trên chip dự án) cùng `-webkit-tap-highlight-color: transparent; touch-action: manipulation`.
- **Công Thái Học Vùng Chạm `>= 44px` (`Navbar.tsx`, `PokemonProfileCard.tsx`, `src/index.css`)**:
  - Dưới `@media (pointer: coarse), (max-width: 1023px)`: nâng `--control-height-sm` lên `44px`, `.folio-btn-icon` `44×44px`, `.google-btn-github` `min-height: 44px`, thương hiệu `Navbar` `min-h-[44px]`, và `.pokemon-project-chip` `min-height: 44px` với khoảng cách `gap-2` (`8px`).
- **Kiểm chứng thực tế**: Đã chạy Playwright chế độ `has_touch=True, is_mobile=True` trên `375px` (Dark Mode) & `820px` (Light Mode), kiểm tra `prefers-reduced-motion: reduce` trên cảm ứng, `1440px` Desktop Dark/Light và build production sạch (`ALL PLAYWRIGHT CHECKS PASSED: 0 console errors, 0 page errors, 0 overflow`).
- **Skill áp dụng**: `taste-skill`, `hallmark`, `impeccable`, `no-ai-slop`.
