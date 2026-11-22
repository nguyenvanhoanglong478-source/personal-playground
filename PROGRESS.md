# PROGRESS.md - Tiến Độ Trang Cá Nhân Long Hoàng

Cập nhật lần cuối: 2026-11-14

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

## 12. Cập Nhật Toàn Diện Nội Dung Hồ Sơ Cá Nhân & Danh Mục Dự Án

- **Hero & Giới thiệu (`src/data/profile.ts`, `src/components/Hero.tsx`, `src/components/PokemonProfileCard.tsx`)**:
  - Cập nhật `role` (`Designer tự do & Người làm sản phẩm` / `Freelance Designer & Product Maker`), `slogan` (`Mình thiết kế cho đẹp, rồi tự code cho nó chạy thật.` / `I design it to look right, then code it until it actually works.`) và bổ sung trường `heroIntro` trong `ProfileInfo`, sửa hiển thị khoảng trắng giữa các từ của `slogan` trên `Hero.tsx` bằng `React.Fragment`.
  - Tinh chỉnh `.pokemon-dex-ribbon` trên `PokemonProfileCard.tsx` cho phép xuống dòng gọn gàng trên màn hình hẹp dưới `640px` và giữ `.slice(0, 5)` cho 5 chip dự án trên lá bài.
- **Câu chuyện 5 đoạn & 4 Nguyên tắc làm việc (`src/data/profile.ts`, `src/components/About.tsx`)**:
  - Cập nhật `aboutParagraphs` gồm 5 đoạn văn song ngữ (`vi`/`en`) nguyên văn, cùng mảng `methodology` gồm 4 nguyên tắc có số thứ tự `01`–`04`, tiêu đề ngắn và mô tả chi tiết hiển thị dạng lưới 2×2.
- **Kinh nghiệm 4 mảng & 6 Dự án (`src/data/experience.ts`, `src/data/projects.ts`, `src/components/ProjectsBento.tsx`)**:
  - Cập nhật trọn vẹn 4 nhóm kinh nghiệm thực tế (`01` Thiết kế & Pixel Art, `02` Web App & Game Tương Tác, `03` Di động Android & PWA Offline, `04` Back-end, Proxy Đám Mây, AI & Kiểm Thử).
  - Cập nhật 6 dự án song ngữ nguyên văn (`01` `Một ngày làm shipper`, `02` `Marginal`, `03` `Team Quiz Battle`, `04` `SnapTask Android`, `05` `TMS Mini v2.0`, `06` `AgentMesh`) kèm đường dẫn GitHub thật, SVG minh họa mới cho `Team Quiz Battle` và lưới so le Zig-Zag 3 cặp cân đối.
- **5 Nhóm Nền Tảng & Kỹ Năng (`src/data/skills.ts`, `src/components/SkillsMatrix.tsx`)**:
  - Thay thế phân loại cũ bằng đúng 5 nhóm (`Nền tảng và triển khai`, `Thiết kế và sáng tạo`, `Front-end, đồ họa và âm thanh`, `Back-end, thời gian thực và AI`, `Quy trình, kiểm thử và công cụ`), hiển thị dạng chip tương tác kết hợp thanh đối chiếu dự án đã áp dụng (`Áp dụng trong dự án` / `Applied in`), tuyệt đối không dùng thanh phần trăm.
- **Liên hệ & Hợp tác (`src/data/profile.ts`, `src/components/Contact.tsx`)**:
  - Cập nhật tiêu đề và lời nhắn phần Liên hệ nguyên văn (`Cùng làm một thứ chạy được nhé` / `Let's build something that works`), giữ nguyên email `nguyenvanhoanglong478@gmail.com` và GitHub cá nhân.
- **Kiểm chứng**: Chạy `impeccable detect --json` (`[]`), `tsc -b && vite build` và kiểm thử Playwright trên `1440px`, `820px`, `375px`, `360px` cho cả `VI/EN` và `Light/Dark` (`ALL PLAYWRIGHT CHECKS PASSED: 0 console errors, 0 page errors, 0 overflow`).
- **Skill áp dụng**: `taste-skill`, `hallmark`, `impeccable`, `no-ai-slop`.

## 13. Bổ Sung Mạng Xã Hội Instagram, Facebook, X & Đồng Bộ Footer

- **Dữ liệu Liên kết Mạng Xã Hội (`src/data/profile.ts`)**:
  - Thêm kiểu `SocialPlatform`, `SocialLinkItem` và mảng `PROFILE_DATA.contacts.socials` gồm 4 liên kết (`GITHUB`, `INSTAGRAM` `instagram.com/duongwym`, `FACEBOOK` `facebook.com/share/1HZNvbuB6m`, `X` `x.com/LongNgu56546236`), giữ nguyên `email` (`nguyenvanhoanglong478@gmail.com`) và `githubUrl`.
- **Biểu tượng Đơn sắc & Khu vực Liên hệ (`src/components/SocialIcon.tsx`, `src/components/Contact.tsx`)**:
  - Tạo component `SocialIcon` đơn sắc (`currentColor`) thống nhất cho `github`, `instagram`, `facebook`, `x`.
  - Mở rộng cột liên hệ bên trái (`lg:col-span-6`) thành bố cục bento 5 thẻ cân đối với cột soạn email (`lg:col-span-6`): thẻ `EMAIL` phủ rộng `sm:col-span-2` phía trên lưới 2×2 cho `GITHUB`, `INSTAGRAM`, `FACEBOOK`, `X`. Toàn bộ 5 nút đều dùng `.google-btn-github` kèm `.google-pill-aura`, bo tròn viên thuốc `9999px`, viền xoay Google Modern Gradient khi tương tác và `min-w-0 truncate` chống tràn chữ trên `360px`/`375px`.
- **Footer (`src/components/Footer.tsx`)**:
  - Bổ sung 5 nút icon nhanh `.folio-btn-icon` kèm `.google-pill-aura` cho `Email`, `GITHUB`, `INSTAGRAM`, `FACEBOOK`, `X` đặt cạnh nút quay về đầu trang.
- **Kiểm chứng**: Chạy `impeccable detect --json` (`[]`), `tsc -b && vite build` và kiểm thử Playwright trên `1440px`, `820px`, `375px`, `360px` cho cả `VI/EN` và `Light/Dark`, bao gồm cả chế độ cảm ứng (`ALL PLAYWRIGHT CHECKS PASSED: 0 console errors, 0 page errors, 0 overflow`).
- **Skill áp dụng**: `taste-skill`, `hallmark`, `impeccable`, `no-ai-slop`.

## 14. Thiết Lập & Triển Khai Cloudflare Pages

- **Cấu hình Build & Script (`vite.config.ts`, `package.json`)**:
  - Xác nhận `vite.config.ts` sử dụng `base: './'` cùng các tài nguyên `public/avatar.jpg`, `public/favicon.svg` hoạt động sạch trên tên miền gốc Cloudflare Pages, đồng thời chạy `npm run build` (`tsc -b && vite build`) không lỗi.
  - Thêm script `"pages:deploy": "npm run build && npx wrangler pages deploy dist --project-name=longhoang --branch=main"` vào `package.json`.
- **Xác thực & Tạo Project (`wrangler`)**:
  - Đăng nhập thành công vào tài khoản Cloudflare (`nguyenvanhoanglong478@gmail.com`) thông qua OAuth Device Flow với quyền `account:read`, `user:read`, `pages:write`.
  - Tạo dự án Cloudflare Pages `longhoang` (`--production-branch=main --force`) và triển khai thư mục `dist/` (8 tệp) lên nhánh production `main`.
- **Liên kết & Tài liệu (`README.md`, `PROGRESS.md`)**:
  - Cập nhật đường dẫn Live Demo chính thức (`https://longhoang.pages.dev/`) và bản deploy kiểm tra (`https://9db9997f.longhoang.pages.dev`) sau khi xác nhận HTTP `200` cho trang chủ, `avatar.jpg` và `favicon.svg`.

## 15. Vé Định Danh Hologram Uốn Dẻo 3D & Xé Cuống Vé Răng Cưa (AboutFoilPass.tsx)

- **Thay thế cột trái mục `02. Về tôi` (`src/components/AboutFoilPass.tsx`, `src/components/aboutPassTextures.ts`, `src/components/About.tsx`, `src/App.tsx`, `src/index.css`)**:
  - Giữ nguyên toàn bộ cột bên phải của `About.tsx` (5 đoạn văn tự sự và lưới 4 nguyên tắc làm việc) và thay khung thẻ chân dung tĩnh cột trái (`lg:col-span-4`) bằng `AboutFoilPass`.
  - Dựng hệ texture 2× Retina (`640×1040`) song ngữ `vi`/`en` từ `PROFILE_DATA` cho **Mặt trước** (dải Hologram trên cùng, ảnh `./avatar.jpg` kèm khung bát giác lăng kính, bảng thông số `HỌ TÊN / NĂM SINH / NGÔN NGỮ / LĨNH VỰC`, mã ma trận QR 11×11 và barcode `NO. 2007-LH-02`) và **Mặt sau** (sơ đồ Radar kỹ thuật plotting 4 nguyên tắc làm việc cùng con dấu tròn Linh thú Capybara `VERIFIED PRODUCT MAKER // 2007`).
- **Nâng cấp Toàn diện Engine Vật lý Giấy 3D Không Co Giãn (3D Verlet + PBD)**:
  - Lưới 3D mịn `COLS = 24`, `ROWS = 36` (864 đỉnh: Thân 28 hàng + Cuống 8 hàng) tích hợp chuyển động Verlet với `damping = 0.94` và lực hồi phục mềm `restSpring` (`0.008–0.065` khi kéo, `0.085` khi thả tay).
  - Bộ giải ràng buộc khoảng cách PBD (Position-Based Dynamics) 16 iterations/frame gồm: Structural Constraints (độ cứng `0.98`, giữ diện tích không đổi và kích hoạt hiện tượng phồng uốn 3D Buckling khi kéo gập), Shear Constraints (độ cứng `0.85`, chống méo xiên khung giấy) và Bending Constraints 2-bước & 3-bước (độ cứng `0.42` và `0.28`, tạo đường cong mượt mà như giấy tráng bạc cao cấp).
  - Cơ chế Kéo & Cuộn Nếp Gấp 3D (Analytical + PBD Hybrid Sheet Curl & Corner Peel): Đồng bộ hướng kéo chuột với góc quay lật `Math.cos(mesh.flipAngle)`, cuộn góc vé nâng lên trục `Z` và uốn cong parabol mượt mà không bị kéo giãn cục bộ kiểu cao su.
- **Cơ chế Xé Cuống Vé Răng Cưa Từng Cột (Per-Column Progressive Zipper Tear & Jagged Edge)**:
  - Mảng `seamBroken: Uint8Array(COLS)` và WebGL attribute `aSeamBroken` -> varying `vSeamBroken` quản lý độc lập từng cột trên đường răng cưa `TEAR_ROW = 28`.
  - Khi kéo trực tiếp cuống vé: Cột gần điểm nắm căng quá ngưỡng sẽ đứt trước, chuyển lực căng sang cột liền kề toạc dần sang bên kia tạo khe rách chữ V chân thực; khi đứt > 55% số cột sẽ tự động rách nốt theo quán tính.
  - Khi bấm nút `Xé cuống vé`: Sóng xé kéo khoá quét từ trái sang phải trong 320ms kèm xung lực bóc nhấc nhẹ ra trước và xuống dưới tại từng cột.
  - Mép rách răng cưa & viền xơ giấy trắng nhám: GLSL Fragment Shader kết hợp hàm chu kỳ lỗ đục răng cưa (`abs(sin(u * 28 * PI)) * 0.0085`) và nhiễu xơ giấy tự nhiên để `discard` tạo mép răng cưa nhấp nhô, pha màu ruột giấy trắng `vec3(0.95, 0.94, 0.91)` và triệt tiêu độ bóng Hologram sát vết rách; bóng đổ của vé cũng tự động mang hình mép rách răng cưa.
  - Phản lực giật nảy thân vé (Upper Body Recoil) khi đứt hẳn cuống vé và cuống vé rơi nghiêng tự do chao lượn trong không khí (`air flutter`).
- **Sửa Lỗi Phối Cảnh WebGL & Khử Đường Gãy Pháp Tuyến**:
  - Dùng chuẩn Perspective-Correct Clip Space `w = max(0.8, camDist - fPos.z)` khử hoàn toàn méo chữ Affine Mapping theo đường chéo tam giác.
  - Thiết lập `gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)` và chuẩn hóa alpha xuất ra `vec4(clamp(lit, 0.0, 1.0), outAlpha)` loại bỏ viền đen Premultiplied Alpha.
  - Tính pháp tuyến liên tục (`computeNormals`) xuyên qua đường răng cưa cho các cột chưa đứt giữa hàng 27 của thân và hàng 0 của cuống vé, xoá sạch vệt gãy bóng ngang bụng vé khi chưa xé.
  - Xoá bỏ hoàn toàn các đoạn mã Canvas 2D rasterizer cũ (`drawSection`, `toScreen`).
- **Tinh chỉnh Cảm giác Vật lý Đầm & Không Gian Kéo Tràn Viền (Critically Damped & Overscan Bleed)**:
  - **Vật lý giảm chấn tới hạn (Critically Damped Paper)**: Giảm `damping` tích hợp Verlet xuống `0.80` khi kéo và `0.65` khi thả chuột; áp dụng hồi vị mũ không vọt lố (`x += (tx - x) * 0.16`, `z += (0 - z) * 0.18`), dập tắt hoàn toàn dao động bật qua lại trục $Z = 0$, giúp tờ vé lướt êm đúng một nhịp đầm chắc về trạng thái phẳng ban đầu.
  - **Kéo tràn viền ra ngoài khung (Overscan Bleed WebGL Canvas)**: Mở rộng canvas WebGL lên $2.2\times$ bề ngang và $1.9\times$ bề dọc (`w-[220%] h-[190%] left-[-60%] top-[-45%]`) với `overflow: visible` trên thẻ cha và `z-30`/`z-40` khi tương tác, kết hợp điều chỉnh tỉ lệ `uFovScale = 1.18 / 1.9` để vé ở trạng thái tĩnh vẫn giữ nguyên kích thước chuẩn trong placeholder; vùng bắt chuột trong suốt khớp khung vé cho phép chuột kéo xuyên suốt toàn màn hình (`window` pointer listeners) tràn qua cả khu vực giới thiệu bên phải mà không bao giờ bị cắt góc.
  - **Xé cuống vé 1:1 theo tay kéo (Direct Cursor-Driven Progressive Tear)**: Bỏ hoàn toàn cơ chế tự động rách ở ngưỡng 55%; xác định chiều xé theo nửa bên tay nắm (`grabU <= 0.5` xé từ trái sang, `grabU > 0.5` xé từ phải sang), ánh xạ trực tiếp quãng đường kéo tay thành số cột đứt `targetTornCols = (pullDistance - 0.035) / 0.38 * COLS`; dừng chuột ở đâu vết rách dừng nguyên tại cột đó (như rách dở 6/24 cột lộ khe chữ V và lõi xơ giấy trắng), chỉ khi kéo hết quãng đường $\ge 96\%$ cuống vé mới đứt hẳn rời ra.
- **Khung Vẽ Toàn Màn Hình (100vw × 100vh Full-Viewport Canvas) & Bắt Toạ Độ Khung Giữ Chỗ (slotRef)**:
  - Chuyển thẻ `<canvas>` WebGL thành canvas toàn màn hình cố định (`pointer-events-none fixed inset-0 z-50 h-screen w-screen`) với `uSlotOffset` và `uFovScale` nội suy động theo toạ độ màn hình của `slotRef` (`getBoundingClientRect`).
  - Khi đứng yên hoặc cuộn trang, thẻ vé luôn nằm chuẩn xác từng pixel tại cột trái mục `02. Về tôi`; khi kéo chuột, vé có thể di chuyển khắp 100% không gian màn hình trình duyệt (tràn qua cả cột bên phải, header hay footer) mà không bao giờ bị cắt viền.
- **Khớp Chuẩn 100% Đường Đục Lỗ Răng Cưa (STUB_SPLIT_RATIO = 0.775)**:
  - Xuất hằng số chuẩn dùng chung `STUB_SPLIT_RATIO = 0.775` trong `aboutPassTextures.ts`. Đồng bộ vị trí rãnh khuyết bán nguyệt hai bên, đường nét đứt, chuỗi lỗ tròn và điểm xé rách của cả mặt trước lẫn mặt sau tại đúng tọa độ `PASS_HEIGHT * 0.775`.
  - Thiết lập vùng chồng lấn lưới `SEAM_OVERLAP = 0.012` quanh tỉ lệ `0.775` để lát cắt răng cưa đối xứng `cutY = 0.775 + tornEdgeOffset(vUv.x)` đi xuyên qua tâm chính xác của các chấm đục lỗ.
- **Tự Động Đồng Bộ Giao Diện Sáng / Tối (data-theme)**:
  - Giao diện Sáng (Light mode): Tự động chọn foil `silver-holo` (nền giấy tráng bạc trắng sáng, mực đen sắc nét, ánh cầu vồng thanh lịch).
  - Giao diện Tối (Dark mode): Tự động chọn foil `obsidian-gold` (nền đen carbon mờ, ánh vàng kim amber, hologram sắc lạnh).
  - Tích hợp `MutationObserver` lắng nghe thuộc tính `data-theme` và `class` của `document.documentElement` để đổi chất liệu vé ngay lập tức khi người dùng click nút đổi giao diện trên Navbar.
- **Tinh Gọn Bảng Điều Khiển Vé Còn Đúng 2 Nút**:
  - Loại bỏ các nút chọn foil thủ công dư thừa, giữ lại thanh điều khiển tối giản gồm 2 nút bấm: `Lật mặt vé` (`Lật mặt sau` / `Lật mặt trước`) và `Khôi phục vé`.
- **Sửa Triệt Để Lỗi Hở Khe Giữa Thân Vé và Cuống Vé (Gapless Unified Mesh)**:
  - Khắc phục lỗi phân mảnh toạ độ khiến thân vé và cuống vé bị tách rời tạo khe hở đen ~13–20px khi mới tải trang: Loại bỏ tham số chồng lấn lưới `SEAM_OVERLAP = 0.012` gây lệch pha giữa toạ độ vật lý `py` và texture UV `v`; ánh xạ chuẩn 1:1 `py = HALF_H - v * CARD_H` cho cả thân vé (hàng 27 kết thúc tại `v = 0.775`, `py = -0.275`) và cuống vé (hàng 0 bắt đầu tại `v = 0.775`, `py = -0.275`).
  - Trong Fragment Shader: Bỏ hoàn toàn lệnh `discard` ở trạng thái chưa xé (`vSeamBroken <= 0.45`), đảm bảo thân vé và cuống vé liên kết liền mạch 100% không tì vết, hiển thị trọn vẹn chuỗi lỗ đục perforation và rãnh khuyết bán nguyệt hai mép. Chỉ khi người dùng nắm cuống xé rách (`vSeamBroken > 0.45`), shader mới kích hoạt lát cắt mép răng cưa `cutY = 0.775 ∓ edgeOffset` để lộ lõi xơ giấy trắng nhám chân thực.
- **Kiểm chứng**: Đã nâng cấp tiếp sang kiến trúc Local Card Space ở Mục 16.

## 16. Khóa Vé Cố Định Trong `slotRef`, Tách Vùng Chạm Mobile & Đồng Bộ Metadata

- **Khóa `<canvas>` WebGL Cố Định Trong `slotRef` (`src/components/AboutFoilPass.tsx`, `src/components/About.tsx`, `src/index.css`)**:
  - Đặt `<canvas ref={canvasRef} />` trực tiếp bên trong `<div ref={slotRef}>` với `className="about-foil-canvas pointer-events-none absolute inset-0 block h-full w-full"` và `overflow-hidden` trên `slotRef` (`relative z-10 aspect-[360/560] w-full overflow-hidden`). Xóa bỏ hoàn toàn `<canvas>` `fixed inset-0 z-50 h-screen w-screen`, `bleedRef`, uniform `uSlotOffset` trong Vertex Shader, và listener `window.addEventListener('scroll', ...)`.
  - Cập nhật kích thước canvas theo CSS pixels của `slotRef` × `Math.min(window.devicePixelRatio || 1, 2)` qua `ResizeObserver` trên `slotRef`, kết hợp `IntersectionObserver` (`rootMargin: '120px'`) tự tạm dừng `requestAnimationFrame` khi `slotRef` rời khung hình.
  - Chuẩn hóa phép chiếu góc nhìn cục bộ với `uAspect = canvas.width / Math.max(1, canvas.height)` và `uFovScale = (2.0 / CARD_H) * 0.82` (khớp `scale = 0.82` trong `mapPointerToNdc`), đồng thời giới hạn biên độ kéo `pullX` (`[-0.11, 0.11]`), `pullY` (`[-0.14, 0.12]`) và vị trí rơi cuống vé (`minY = restY - 0.115`) để hiệu ứng uốn cong 3D, lật mặt và xé cuống nằm trọn trong `slotRef` mà không cắt mép hay đè lên `Navbar`, `Hero`, đoạn văn `About` và hai nút bấm.
  - Cấp phát trước các mảng đệm GPU (`packedPos`, `packedNorm`, `packedSeam`) và tránh cập nhật state `setIsDragBent` lặp mỗi frame khi trạng thái uốn chưa thay đổi.
- **Tách Vùng Chạm Mobile & Nhịp Không Gian Responsive (`src/components/AboutFoilPass.tsx`, `src/index.css`)**:
  - Chia vùng tương tác bên trong `slotRef` thành hai lớp độc lập: vùng thân trên (`top-0 h-[77.5%]`, `touch-pan-y`) giữ nguyên cuộn dọc trang tự nhiên trên mobile với bộ lọc tương tác có chủ đích (`130ms` hoặc kéo ngang rõ ràng), và vùng cuống dưới (`bottom-0 h-[22.5%]`, `touch-none`) cho phép nắm kéo cuống xuống dưới để xé vé ngay lập tức mà không bị trình duyệt cuộn dọc cướp thao tác.
  - Giữ kích thước tối thiểu `>= 44×44px` cho cả hai nút `Lật mặt vé` / `Khôi phục vé` trên mọi màn hình (`.about-foil-stage .folio-btn-compact`), tinh chỉnh độ tương phản `--text-faint` đạt WCAG AA (`#575B62` sáng, `#A6ACB2` tối) và thu gọn `--space-section-y` trên mobile (`3.5rem` dưới `640px`, `5rem` từ `640px`).
- **Dọn Mã Thừa & Đồng Bộ Metadata (`HeroFolioCanvas.tsx`, `Hero.tsx`, `App.tsx`, `package.json`, `index.html`, `profile.ts`, `PokemonProfileCard.tsx`, `projects.ts`, `ProjectsBento.tsx`)**:
  - Gỡ import lazy `LazyHeroFolioCanvas` và prop `theme` không còn dùng trong `Hero.tsx` / `App.tsx`, đồng thời xóa bỏ hoàn toàn `src/components/HeroFolioCanvas.tsx`.
  - Cập nhật `package.json` (`"name": "long-hoang-portfolio"`, `"description": "Hồ sơ cá nhân và danh mục dự án của Long Hoàng"`) thay cho tên dự án mẫu cũ, đồng bộ `index.html` khớp vai trò `"Designer tự do & Người làm sản phẩm"` và `"6 dự án tiêu biểu"`.
  - Cập nhật nhãn thẻ `PokemonProfileCard.tsx` (`5 / 6` và `001/006 ★ SAR`) cùng `UI_LABELS` (`5 DỰ ÁN NỔI BẬT` / `FEATURED PROJECTS`) để phản ánh đúng 5 dự án nổi bật trích xuất từ tổng 6 dự án; xác minh qua `gh repo list nguyenvanhoanglong478-source` rằng `Team Quiz Battle` chưa có repo riêng nên giữ nguyên link hồ sơ GitHub với nhãn nút rõ ràng (`Trang GitHub` / `GitHub Profile`).
- **Kiểm chứng cuối cùng (sau khi cập nhật `AboutFoilPass.tsx`)**:
  - Kiểm tra zero comment trong `src/`: đạt (`ZERO_COMMENTS_OK`).
  - `npm.cmd run build` (`tsc -b && vite build`): thành công với 0 lỗi (`dist/assets/index-B3YLel8y.js`, không còn bundle `HeroFolioCanvas`).
  - `impeccable detect --json` trên các file đã sửa: trả về `[]` (0 vấn đề).
  - Playwright trên preview server (`1440×900`, `820×1180`, `375×812`, `360×780`, `430×932`; cả Dark/Light và VI/EN): `dx=0, dy=0, dw=0, dh=0` khóa chặt canvas trong `slotRef` trước và sau cuộn nhanh, `scrollWidth === innerWidth` trên tất cả viewport, `navbar_stays_above_canvas: true`, `body_touch_action: "pan-y"`, `stub_touch_action: "none"`, xé cuống bằng chuột/chạm (`data-torn="true"`), khôi phục vé (`data-torn="false"`), lật mặt vé (`data-flipped="true"`), uốn 3D (`data-drag-bent="true"`), hai nút `>= 44×44px` và 0 lỗi console/page.

## 17. Tối Ưu Toàn Diện Tải Trang, WebGL/React Runtime, Workflow & Đồng Bộ Tài Liệu

- **Nhóm 1 — Tải trang, chống FOUC & tách Bundle (`index.html`, `src/main.tsx`, `src/App.tsx`, `src/components/About.tsx`, `vite.config.ts`)**:
  - Thêm `<link rel="preload" as="image" href="./avatar.jpg" />` và inline script đồng bộ trong `<head>` đọc `localStorage` (`longhoang_folio_theme_v1` kèm fallback `prefers-color-scheme: light`, và `longhoang_folio_locale_v1`) để đặt `data-theme`, `<meta name="theme-color">` và `lang` lên `<html>` trước lần vẽ đầu tiên.
  - Bọc `<App />` trong `<MotionConfig reducedMotion="user">` tại `src/main.tsx`.
  - Lazy-load `<AboutFoilPass />` qua `React.lazy` + `<Suspense>` với `AboutFoilPassFallback` giữ đúng tỷ lệ `aspect-[360/560]`, caption và hàng 2 nút `44px` tại `src/components/About.tsx`; tách thêm chunk `icons: ['lucide-react']` trong `vite.config.ts`.
  - Nâng cấp scroll spy tại `src/App.tsx` bằng `IntersectionObserver` theo `ratioMap` nhiều ngưỡng (`[0, 0.08, 0.18, 0.35, 0.55, 0.75, 1]`, `rootMargin: '-18% 0px -42% 0px'`) để chọn chính xác section có tỷ lệ hiển thị cao nhất trên cả màn hình cao và mobile.
- **Nhóm 2 — Hiệu năng WebGL, GPU & React Runtime (`AboutFoilPass.tsx`, `PokemonProfileCard.tsx`, `SkillsMatrix.tsx`, `Experience.tsx`, `Hero.tsx`)**:
  - Tách phần khởi tạo WebGL context một lần khỏi hook `syncTextures()` theo `locale`/`edition`/`theme` trong `AboutFoilPass.tsx`, bổ sung dọn dẹp tài nguyên WebGL khi unmount, tránh chạy trùng `syncTextures()` khi mount, và thêm `img.onerror` fallback sạch về chữ lồng `LH`.
  - Trích biến local cho các typed array (`x, y, z, oldX, oldY, oldZ, restX, restY, uv, seamBroken, i1, i2, restLen, stiffness`) trong `stepPhysicsAndRender` và áp dụng số vòng PBD thích ứng (`16` iterations khi kéo hoặc biến dạng lớn, `8` iterations khi đang thả hồi phục nhẹ).
  - Gắn `decoding="async"` và `fetchPriority="high"` cho ảnh avatar thẻ Hero tại `PokemonProfileCard.tsx`.
  - Thêm `IntersectionObserver` cho khung marquee công nghệ tại `SkillsMatrix.tsx` (`rootMargin: '80px 0px'`, tạm dừng `animationPlayState: 'paused'` khi ngoài viewport).
  - Đổi key danh sách phụ thuộc `locale` sang chỉ số ổn định (`key={pointIdx}` trong `Experience.tsx` và `key={idx}` trên `sloganWords` trong `Hero.tsx`) để đổi ngôn ngữ không unmount DOM node.
- **Nhóm 3 — Workflow & Scripts (`package.json`, `.github/workflows/deploy.yml`, `scripts/deploy-gh-pages.mjs`)**:
  - Bổ sung `"typecheck": "tsc -b --noEmit"` và `"verify": "npm run typecheck && npm run build"` vào `package.json`.
  - Thêm bước `Run typecheck` trước build và xuất bảng tóm tắt trạng thái Cloudflare Pages + GitHub Pages vào `$GITHUB_STEP_SUMMARY` trong `.github/workflows/deploy.yml`.
  - Bổ sung kiểm tra `git status --porcelain` cảnh báo working tree bẩn trước build và in URL GitHub Pages sau khi push tại `scripts/deploy-gh-pages.mjs`.
- **Nhóm 4 — Đồng bộ Tài liệu & Sơ đồ (`src/data/siteStack.ts`, `src/components/BuiltWithDiagram.tsx`, `DESIGN.md`, `PROGRESS.md`)**:
  - Cập nhật mô tả gói `vite` trong `siteStack.ts` phản ánh việc tách chunk và lazy-load khối WebGL tương tác; cập nhật bước `05. DEPLOY` trong `BuiltWithDiagram.tsx` thành `Cloudflare + GitHub Pages`; đồng bộ `DESIGN.md` khớp 100% kiến trúc 6 dự án và `AboutFoilPass` cố định trong `slotRef`.
- **Kiểm chứng**:
  - `npm.cmd run verify` (`tsc -b --noEmit` + `vite build`): Bundle chính `index` giảm từ `158.81 kB` (`gzip 47.77 kB`) xuống `106.69 kB` (`gzip 30.95 kB`), tách riêng lazy chunk `AboutFoilPass` `41.52 kB` (`gzip 14.36 kB`) và `icons` `14.20 kB` (`gzip 3.35 kB`), kèm `motion` `127.37 kB` (`gzip 42.29 kB`), `vendor` `133.92 kB` (`gzip 43.12 kB`), `index.css` `55.03 kB` (`gzip 11.83 kB`), `index.html` `2.91 kB` (`gzip 1.21 kB`).
  - `impeccable detect --json`: `[]`; `node --check scripts/deploy-gh-pages.mjs` đạt; kiểm tra zero code comments trong `src/`: `ZERO_COMMENTS_OK`.
  - Playwright (`375×812` cảm ứng, `820×1180`, `1440×900`; Light/Dark, VI/EN): 0 lỗi console/page, 0 overflow ngang, `data-theme`/`lang` đồng bộ ngay từ `readystatechange:interactive` & `domcontentloaded` trước khi React mount (kể cả khi `reload`), `About` lazy chunk CLS `0.0000` (tổng CLS `0.02`–`0.15` do webfont swap ở Hero), marquee chạy khi in-view và paused ngoài viewport, đầy đủ thao tác Pokemon card, vé WebGL, 6 dự án Bento, Skills chip, Contact mailto và Navbar scroll spy cả 7 section.


## 18. Tinh Gọn Nội Dung Tự Nhiên & Thiết Kế Lại Logo Ngôi Sao Trừu Tượng (`BrandLogo`)

- **Viết lại toàn bộ nội dung chuẩn giọng thật, gọn thẳng trọng tâm (`src/data/profile.ts`, `experience.ts`, `projects.ts`, `skills.ts`, `index.html`)**:
  - Áp dụng giọng nói thẳng thắn, mộc mạc đúng chất maker 19 tuổi (*"Mình thiết kế cho đẹp, rồi tự code cho nó chạy thật."*), loại bỏ hoàn toàn văn CV, từ ngữ sáo rỗng AI slop, chi tiết nhật ký sửa bug vụn (mặt trăng/cúp, route health-check Render, tách file âm thanh/font, bài test 1800 bước) và phần lặp dự án trong `About`.
  - Rút gọn `heroIntro` còn 2 câu, `aboutParagraphs` từ 5 đoạn xuống 3 đoạn (Bản thân -> Việc mình làm -> Mục tiêu & Hợp tác), 4 thẻ `methodology` mỗi thẻ 1 câu tự nhiên, và các `UI_LABELS` subheading ngắn tối đa 1 câu đi thẳng vào ý.
  - Chuẩn hóa `experience.ts` còn 2 gạch đầu dòng súc tích cho mỗi mảng việc; `projects.ts` giữ đủ 6 dự án với 2 câu mô tả ngắn và 3–5 công nghệ đáng chú ý mỗi dự án; đồng bộ 4 nguyên tắc mặt sau vé WebGL và tinh gọn `evidence` trong `skills.ts`.
- **Logo ngôi sao 4 cánh trừu tượng lấy cảm hứng Gemini (`src/components/BrandLogo.tsx`, `public/favicon.svg`, `aboutPassTextures.ts`)**:
  - Thay thế `CapybaraLogo.tsx` (đã xóa) bằng `BrandLogo.tsx` (`viewBox="0 0 48 48"`, `aria-label="Long Hoàng Logo"`, `useId()` chống trùng ID gradient) với ngôi sao 4 cánh đường cong lõm chính tâm `(22, 25)` kèm tia sao phụ nhỏ ở góc trên phải `(37.5, 10.5)`, tô dải **Google Modern Gradient** (`#4285F4` -> `#9B72CB` -> `#D96570` -> `#FBBC04` -> `#34A853`), giữ hào quang & xoay nhẹ khi hover trên `Navbar`/`Footer` (tôn trọng `prefers-reduced-motion: reduce`).
  - Đồng bộ `BrandLogo` vào `Navbar.tsx`, `PokemonProfileCard.tsx`, `Footer.tsx`, cập nhật `public/favicon.svg` trên nền bo góc tối `#131314`, và nâng cấp con dấu mặt sau vé WebGL trong `aboutPassTextures.ts` sang `paintStarSeal`.


## 19. Bổ Sung Chú Capybara Pixel Art Tương Tác Trên Đường Viền Footer (`FooterPet`)

- **Đồ họa & Vị trí (`src/components/FooterPet.tsx`, `src/components/Footer.tsx`, `src/App.tsx`, `src/index.css`)**:
  - Truyền `theme` xuống `<Footer locale={locale} theme={theme} />`, đặt `FooterPet` gắn sát ngay trên `border-t` của `<footer>` bên trong `.folio-container` (không `position: fixed`, không tràn ngang).
  - Dựng chú Capybara pixel art hoàn toàn bằng SVG `<rect>` (`shapeRendering="crispEdges"`, `viewBox="0 0 19 16"`, `38×32px` trong nút bấm `44×44px`) với thân nâu ấm, má hồng, quả cam + lá xanh trên đầu, 4 nhịp chân đi bộ (`scaleX(-1)` khi đổi chiều), chớp mắt, tư thế ngủ gật `zZz` và tia sao 4 cánh Google Gradient `✦` khi tương tác.
- **Tương tác Sáng/Tối, Bong Bóng Thoại & Tối Ưu Hiệu Năng**:
  - **Light Mode**: tự dạo qua lại trong biên đo bởi `ResizeObserver` (`[0, trackWidth - 44]`) và dừng nghỉ ngẫu nhiên `1.5–2.5s`; **Dark Mode**: ngồi ngủ gật, chạm/hover sẽ tạm tỉnh dậy đáp lời rồi lim dim ngủ lại.
  - Bong bóng thoại xoay vòng câu nói tự nhiên VI/EN (kèm lời chào riêng khi đánh thức ở Dark Mode), tự đổi căn lề trái/giữa/phải tránh bị cắt chữ gần hai mép màn hình mobile, tự ẩn sau `3.5s`, tạm dừng mọi vòng lặp qua `IntersectionObserver` khi footer ngoài viewport và tôn trọng `useReducedMotion()`.


## 20. Dọn Gọn Cột Trái Mục Liên Hệ, Thêm Nút Sao Chép Email & Thẻ Nhận Việc (`Contact.tsx`, `profile.ts`)

- **Xóa 4 thẻ card mạng xã hội lớn bị cắt link tại `src/components/Contact.tsx`**:
  - Giữ nguyên 5 nút tròn mạng xã hội & email kèm `<FooterPet />` tại `src/components/Footer.tsx` và dữ liệu `PROFILE_DATA.contacts.socials` trong `src/data/profile.ts`.
  - Gỡ bỏ hoàn toàn 4 thẻ card mạng xã hội lớn ở cột trái `#contact` để tránh trùng lặp và lỗi cắt `...` đường dẫn.
- **Thẻ Email kèm nút Sao chép 1 chạm & Thẻ nhận việc cân đối 2 cột (`Contact.tsx`, `src/data/profile.ts`)**:
  - Giữ nút mở trình gửi mail `nguyenvanhoanglong478@gmail.com` và bổ sung nút sao chép 1 chạm (`navigator.clipboard.writeText`, đạt kích thước chạm tối thiểu `44px` trên mobile, hiện phản hồi `"Đã chép!"` / `"Copied!"` và thông báo `aria-live="polite"`).
  - Thêm thẻ thông tin nhận việc/hợp tác (`flex-1`) ngay dưới thẻ Email để cân bằng tự nhiên với khung `Soạn nhanh email` bên phải: hiển thị chấm xanh trạng thái sẵn sàng, 3 hạng mục nhận làm song ngữ VI/EN sạch văn phong tự nhiên, thời gian phản hồi trong ngày và dòng dẫn hướng xuống thanh mạng xã hội ở `Footer`.


## 21. Bổ Sung Tab "Không Gian" GBA Pixel Art & Nhạc Spotify (`WorkspacePage`)

- **Kiến trúc Tab & Điều hướng URL (`src/App.tsx`, `src/components/Navbar.tsx`)**:
  - Thêm bộ chuyển tab `Hồ sơ` / `Không gian` (`Profile` / `Workspace`) trên cả Desktop lẫn Mobile (`min-h-[44px]`), đồng bộ với query `?tab=workspace` qua `window.history.replaceState` và lazy-load `WorkspacePage` bằng `React.lazy` + `<Suspense>`.
  - Bảo toàn trọn vẹn 7 phân khu của `Hồ sơ`, thẻ `AboutFoilPass` và chân trang `Footer` + `FooterPet`; hỗ trợ bấm các neo `#about`..`#contact` từ tab `Không gian` để quay về đúng phân khu trên `Hồ sơ`.
- **Phòng Pixel Art 320×180 Phong Cách Pokémon GBA (`pixelPalette.ts`, `roomEnvironment.ts`, `pixelSprites.ts`, `WorkspaceRoom.tsx`)**:
  - Render trên `<canvas width={320} height={180}>` với `.pixelated-canvas` (`image-rendering: pixelated; crisp-edges`) và `ctx.imageSmoothingEnabled = false`, nhịp vẽ ~15fps (`66ms`) tự dừng khi tab ẩn và tuân thủ `useReducedMotion()`.
  - Vẽ chi tiết tường phào, sàn gỗ có mắt gỗ/mạch ván, cửa sổ đổi trời mây/hoàng hôn/trăng sao, thảm dệt có tua rua, giường chăn kẻ ô, kệ gỗ trưng bày **mô hình xe Honda Cub xanh kem** (kỷ niệm `Deliver Simulator`), khung thẻ Holo, đồng hồ và cây xanh.
  - Tia nắng sáng/ngày, ánh trăng khuya và quầng đèn bàn vàng ấm dùng **Ordered Bayer 4×4 / 2×2 dithering** từng pixel thay vì blur mờ; nhân vật **Long Hoàng** và chú **Capybara đội cam** thay đổi dáng đứng uống cà phê (`waking`), ngồi gõ phím (`working` / `late_night` có ánh hắt màn hình lên kính) và ngủ trong chăn kèm `zZz` (`sleeping`).
- **Tương tác Điểm chạm, Hộp thoại GBA & Spotify (`src/data/workspace.ts`, `src/hooks/useSpotifyStatus.ts`, `src/components/WorkspacePage.tsx`, `src/index.css`)**:
  - Tự động đọc giờ Việt Nam (`Asia/Ho_Chi_Minh`, `GMT+7`) qua `getVietnamClockInfo()`, cho phép chuyển thử 5 chế độ (`Tự động · Giờ VN`, `Sáng`, `Làm việc`, `Tối`, `Đi ngủ`) và bật/tắt **Đèn bàn** từ cả canvas lẫn nút pill.
  - 7 vùng chạm (`monitor`, `speakers`, `lamp`, `window`, `bed`, `capybara`, `shelf`) kèm nút nhanh `>= 44px`, con trỏ vàng `▼` trên canvas và hộp thoại `.pokemon-gba-dialog` viền kép chạy chữ song ngữ VI/EN sạch từ khóa (không em-dash, không ngoặc trong chuỗi hiển thị).
  - Tích hợp `useSpotifyStatus` (poll `25000ms` khi tab visible) và chế độ **Nghe thử Lofi** (`SIMULATED_LOFI_TRACKS`) với thẻ `Nhạc nền đang phát`, icon đĩa nhạc `Disc3` dự phòng không phụ thuộc ảnh ngoài, thanh tiến độ thời gian thực và hiệu ứng loa rung + nốt nhạc `♪`/`♫`.
- **Hướng Dẫn Bật Spotify Thật (`src/data/workspace.ts`)**:
  - Mở `src/data/workspace.ts` và chỉnh đối tượng `WORKSPACE_CONFIG`:
    1. **Dùng Discord Lanyard**: Tham gia máy chủ Discord Lanyard để bật đồng bộ trạng thái tài khoản, bật hiển thị Spotify trên Discord rồi điền Discord User ID vào `lanyardUserId: 'ID_DISCORD_CUA_BAN'`. Hook sẽ gọi `https://api.lanyard.rest/v1/users/${id}` và chỉ trích xuất `data.spotify` (bỏ qua hoàn toàn các game/activity khác).
    2. **Dùng Endpoint JSON riêng**: Nếu có API proxy riêng trả về JSON dạng `SpotifyTrackInfo` hoặc `{ track: SpotifyTrackInfo }`, giữ `lanyardUserId: ''` và điền URL vào `spotifyEndpointUrl: 'https://...'`.
    3. Khi cả hai trường đều để `''`, giao diện hiển thị gợi ý cùng nút **Nghe thử Lofi**.
- **Kiểm chứng**:
  - Kiểm tra tĩnh mã nguồn `src/`: `0` comment thực (`//`, `/*`), `0` text gradient, `0` em-dash hay ký tự thừa trong `src/data/workspace.ts`.
  - `npm.cmd run verify` (`tsc -b --noEmit && vite build`): pass sạch với `0` lỗi TypeScript/Vite.
  - Playwright trên preview build ở `1440×900` (Light & Dark, VI & EN) và `375×812` cảm ứng (`has_touch=True`, Light & Dark, VI & EN): `0` console error, `0` page error, `0` tràn ngang (`scrollWidth <= innerWidth`), mọi nút chạm đạt `>= 44px`, kiểm tra đủ 7 hotspot trên canvas, bật/tắt đèn bàn, bật/tắt Lofi Demo, đồng bộ `?tab=workspace`, nhảy `#projects` từ Workspace về Profile, giữ nguyên `AboutFoilPass` & `FooterPet`, và kiểm tra trực quan 6 ảnh chụp màn hình qua `read_file`.


## 22. Kết Nối Spotify Trực Tiếp Qua Cloudflare Pages Function (`functions/api/spotify.js`, `scripts/spotify-auth.mjs`)

- **Proxy Cloudflare Pages Function (`functions/api/spotify.js`)**:
  - Thêm serverless endpoint `GET /api/spotify` chạy cùng hạ tầng Cloudflare Pages (`longhoang`), đổi `SPOTIFY_REFRESH_TOKEN` sang access token ở phía server và gọi `https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode` (hỗ trợ cả nhạc `track` lẫn podcast `episode`).
  - Bảo vệ bởi CORS allowlist (`https://longhoang.pages.dev`, `*.longhoang.pages.dev`, `https://nguyenvanhoanglong478-source.github.io`, `localhost` / `127.0.0.1`), header `Cache-Control: no-store, max-age=0`, phản hồi sạch `{ isPlaying: false, configured: false }` (`HTTP 200`) khi chưa nạp secrets để tránh lỗi console, hoặc `502` đã loại bỏ thông tin nhạy cảm nếu token lỗi.
- **Tích Hợp Frontend (`src/data/workspace.ts`, `src/hooks/useSpotifyStatus.ts`)**:
  - Gắn `WORKSPACE_CONFIG.spotifyEndpointUrl = 'https://longhoang.pages.dev/api/spotify'` dùng chung cho cả Cloudflare Pages lẫn GitHub Pages.
  - Cập nhật `useSpotifyStatus` đọc cờ `configured` từ phản hồi JSON: khi Cloudflare chưa có secrets (`configured: false`), giao diện vẫn hiện gợi ý thân thiện cùng nút **Nghe thử Lofi**; ngay khi secrets được nạp, trang tự nhận trạng thái Spotify thật mà không cần build lại.
- **Công Cụ Lấy Refresh Token & Nạp Secrets (`scripts/spotify-auth.mjs`, `package.json`, `.gitignore`)**:
  - Thêm lệnh `npm run spotify:setup` mở máy chủ callback cục bộ tại `http://127.0.0.1:4389/callback` (tuân thủ quy định Spotify Developer Dashboard bắt buộc IP `127.0.0.1` thay vì `localhost`), tự đổi authorization code lấy `Refresh Token`, kiểm tra ngay endpoint `/currently-playing`, lưu `.dev.vars` (đã thêm `.dev.vars`, `.dev.vars.*`, `.wrangler` vào `.gitignore`) và hỗ trợ đẩy thẳng cả 3 secrets lên Cloudflare Pages qua `npx wrangler pages secret bulk .dev.vars --project-name longhoang`.
- **Kiểm chứng**:
  - Biên dịch thử Pages Function bằng `npx wrangler pages functions build functions` thành công (`Compiled Worker successfully`).
  - Chạy bộ kiểm thử 8 kịch bản cho `onRequest` (`OPTIONS`, CORS allowlist, `405`, thiếu secrets, Spotify `204`, `track` đang phát, podcast `episode`, lỗi token không rò rỉ secret): pass `8/8`.
  - Chạy `npm run verify` (`tsc -b --noEmit && tsc -b && vite build`): pass `0` lỗi.


## 23. Nâng Cấp Đồ Họa GBA Phòng Làm Việc, Làm Sạch UI & Đồng Bộ Trạng Thái Tạm Dừng Spotify

- **Đồng bộ Trạng thái Tạm Dừng Spotify & Lời Thoại Ngắn Gọn (`functions/api/spotify.js`, `src/data/workspace.ts`, `src/hooks/useSpotifyStatus.ts`)**:
  - `functions/api/spotify.js`: `normalizeSpotifyPlayback` trả về đầy đủ metadata, `progressMs`, `durationMs` kèm `isPlaying: false, isPaused: true, configured: true` khi `record.item` đang tạm dừng, giữ nguyên `isPlaying: true, isPaused: false` khi đang phát và trả `{ isPlaying: false, isPaused: false, configured: true }` khi `204` hoặc không có `item`, giữ CORS allowlist và `Cache-Control: no-store, max-age=0`.
  - `src/data/workspace.ts`: Đặt `pollIntervalMs: 5500`, bổ sung `isPaused?: boolean` & `progressMs?: number` cho `SpotifyTrackInfo`, thêm nhãn `spotifyPausedBadge` (`'Tạm dừng'`/`'Paused'`) và `spotifyPausedText`, đổi `spotifyHeader` thành `'Long đang nghe'` / `'Long is listening'`, bỏ `subtitle` và `dialogPromptHint`, rút gọn `TIME_STATE_META[*].hint` và `HOTSPOT_DIALOGUES` / `getHotspotDialogue` còn 1 câu tự nhiên.
  - `src/hooks/useSpotifyStatus.ts`: Bổ sung cache-buster `?_=` + `{ cache: 'no-store', signal }` và `window` `focus` bên cạnh `visibilitychange`; chuẩn hóa `isPlaying`/`is_playing`/`playing`, `progressMs`/`progress_ms`, `durationMs`/`duration_ms`, giữ thông tin bài hát và đóng băng `progressMs` khi chuyển sang tạm dừng (kể cả payload tối giản `{ isPlaying: false }` ngay sau khi đang phát) rồi dừng bộ đếm `1s`.
- **Nâng Cấp Phòng Pixel GBA 320×180 & Chuyển Động Mượt (`src/components/workspace/pixelPalette.ts`, `src/components/workspace/roomEnvironment.ts`, `src/components/workspace/pixelSprites.ts`, `src/components/workspace/WorkspaceRoom.tsx`)**:
  - `WorkspaceRoom.tsx`: Thay vòng lặp cố định 66ms bằng `requestAnimationFrame` mượt theo `dtSec` (`Math.min(0.05, ...)`), truyền cả `tick` và `elapsedSec` cho môi trường, sprite và ánh sáng, tự tạm dừng khi tab ẩn và đứng yên ở `0` dưới `useReducedMotion()`.
  - `pixelPalette.ts` & `roomEnvironment.ts`: Bổ sung bảng màu GBA 4 thời điểm (`waking`, `working`, `late_night`, `sleeping`), phào tường gỗ, vân sàn gỗ, dây đèn LED buổi tối, bầu trời cửa sổ nhiều lớp (mây trôi, chim bay, hoàng hôn 5 dải, trăng khuyết và sao băng), đồng hồ kim giây quét mượt, ánh kim khung thẻ Holo, cây lá lay nhẹ, Honda Cub trên kệ, đèn bàn Bayer 4×4 và hạt bụi trong tia nắng.
  - `pixelSprites.ts`: Tinh chỉnh sprite nhân vật **Long Hoàng** ngồi gọn trong ghế (`156, 77`, chân nằm giữa hai tay vịn `x: 159..187, y: 100..111`, đầu không che màn hình `49..67`) với tư thế gõ phím, di chuột, nhấc cốc, vươn vai và thở khi ngủ; capybara đội cam đi lại trong phạm vi thảm dệt; trình bảo vệ sao Gemini trong khung màn hình ngủ; thanh EQ trên đỉnh hai loa (`113, 58` & `207, 58`) tách khỏi làn khói cà phê và tắt rung loa/EQ ngay khi tạm dừng kèm hiệu ứng mờ nốt nhạc `0.4s`.
- **Tinh Gọn Giao Diện Workspace (`src/components/WorkspacePage.tsx`)**:
  - Loại bỏ phụ đề dưới `<h1>`, dòng nhắc dưới `.pokemon-gba-dialog`, gợi ý `spotifyUnconfiguredHint` và thẻ `TIME_STATE_META` trùng lặp dưới khối Spotify; triển khai đủ 3 trạng thái thẻ Spotify (`Live`/`Demo`, `Tạm dừng`/`Paused` với badge vàng và thanh tiến độ đóng băng, và trạng thái nghỉ) cùng nút `Nghe thử Lofi` / `Tắt Demo`.
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - Kiểm tra TypeScript AST qua `ts.createSourceFile`: `0` comment (`//` hoặc `/*`) trong 7 tệp `src/data/workspace.ts`, `src/hooks/useSpotifyStatus.ts`, `src/components/WorkspacePage.tsx` và `src/components/workspace/*`.
  - Kiểm thử đơn vị `functions/api/spotify.js` `onRequest`: pass `8/8` kịch bản (`OPTIONS` & CORS allowlist, origin không hợp lệ, `localhost` CORS & thiếu secrets, `POST` `405`, Spotify `204`, bài đang phát kèm `progressMs`, bài tạm dừng trả `isPlaying: false, isPaused: true, progressMs`, lỗi upstream `502` không lộ secret).
  - Chạy `cmd /c "npm run verify"` (`tsc -b --noEmit && tsc -b && vite build`): thoát `0`, `0` lỗi.
  - Kiểm thử Playwright trên `vite preview` (`127.0.0.1:4173`) ở Desktop `1440×900` (Light & Dark, VI & EN) và Mobile `375×812` cảm ứng (`has_touch=True`, Light & Dark, VI & EN):
    - Đạt toàn bộ 4 khung giờ phòng (`Sáng`, `Làm việc`, `Tối`, `Đi ngủ`) và đối chiếu trực quan 11 ảnh chụp màn hình: nhân vật ngồi khớp ghế/bàn, Bayer dithering nắng/trăng/đèn bàn, Honda Cub, Capybara trong thảm, giao diện gọn không còn thẻ thừa; nhãn `"Long đang nghe"` / `"Long is listening"` và bật/tắt `"Nghe thử Lofi"` / `"Tắt Demo"` hoạt động chuẩn.
    - Xác minh **Spotify Pause Sync** qua route mock `**/api/spotify**`: chuyển từ `isPlaying: true` (`"Midnight Lo-Fi Test"`, đồng hồ và EQ/nốt nhạc chạy) sang cả payload tạm dừng đầy đủ lẫn payload tối giản `{ isPlaying: false }` -> giao diện chuyển ngay sang `"Tạm dừng"` / `"Paused"`, đĩa ngừng xoay, thanh tiến độ và đồng hồ đóng băng hoàn toàn, canvas dừng rung loa, dừng EQ và tắt hẳn nốt nhạc sau cửa sổ mờ `0.4s`.
    - `0` lỗi console, `0` lỗi trang, `0` tràn ngang (`scrollWidth <= innerWidth`), tab `Hồ sơ` giữ nguyên không hồi quy; toàn bộ `14/14` nút trong `#workspace` trên Mobile `375×812` đạt kích thước chạm `>= 44×44px` (ghi nhận nút đổi theme sẵn có ở `Navbar.tsx` giữ `h = 44px`, `w = 38px` trên `375px` do không nằm trong phạm vi chỉnh sửa đợt này).


## 24. Chuẩn Hóa 6 Lớp Z-Order Nhân Vật & Gọn Giao Diện Hộp Thoại GBA (`WorkspaceRoom`)

- **Tách Lớp Môi Trường & Ranh Giới Di Chuyển (`src/components/workspace/roomEnvironment.ts`)**:
  - Xuất chuẩn `WALKABLE_RECT` (`{ x: 76, y: 88, w: 30, h: 62 }`) cho sàn gỗ trống giữa giường và bàn, cùng `RUG_WALK_RECT` (`{ x: 118, y: 127, w: 108, h: 24 }`) trong lòng thảm dưới chân bánh xe ghế xoay.
  - Tách giường thành `drawBedBase` (gối trắng `20..62, 89..102`) và `drawBedBlanket` (nẹp chăn `103+b..106+b` & chăn kẻ ô `107+b..146`); tách ghế xoay thành `drawChairSeatBase` và `drawChairBackOverlay` (`161..185, 97..114`) ôm lưng nhân vật; làm dịu Bayer dithering nắng cửa sổ khi phủ qua vùng bàn phím/loa/laptop (`111..190, 56..92`).
- **Tinh Chỉnh Tư Thế Nhân Vật & Điều Phối 6 Lớp (`src/components/workspace/pixelSprites.ts`, `WorkspaceRoom.tsx`)**:
  - `drawSleepingCharacter`: đầu và vai nhân vật tỉ lệ chuẩn nằm chính giữa gối thật của giường (`x: 27..57, y: 86..107`), thân được `drawBedBlanket` đắp phủ bên trên (xóa hoàn toàn hình nhân vật tí hon trên gối) kèm nhịp thở `{0, -1}` và `zZz`.
  - `drawSeatedCharacter`: nhân vật ngồi quay lưng hướng màn hình (`156..205, 73..104`) với tay gõ phím, di chuột và nhấc cốc cà phê, phần lưng dưới được `drawChairBackOverlay` ôm gọn phía sau (không còn chân đứng đè ghế).
  - `drawWakingAndCapybaraLayer`: nhân vật buổi sáng đứng uống cà phê hoàn toàn trong `WALKABLE_RECT`, sắp thứ tự Y cùng Capybara di chuyển trong `RUG_WALK_RECT`; `WorkspaceRoom.tsx` dựng đúng thứ tự 6 lớp Z-order.
- **Loại Bỏ Hàng Nút Điểm Chạm Dưới Hộp Thoại (`src/components/WorkspacePage.tsx`, `src/data/workspace.ts`, `DESIGN.md`)**:
  - Xóa `HOTSPOT_ORDER` và hàng 7 nút bên dưới `.pokemon-gba-dialog`, giữ tương tác bấm trực tiếp 7 vùng trên `<canvas>` và thẻ `"Long đang nghe"` / `"Long is listening"` đồng bộ Play/Pause Spotify; cập nhật lại `DESIGN.md` khớp thiết kế hiện hành.
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - AST TypeScript check (`ts.createSourceFile`): `0` comment trong 7 tệp workspace (`src/data/workspace.ts`, `src/hooks/useSpotifyStatus.ts`, `src/components/WorkspacePage.tsx`, `src/components/workspace/*`) và `0` dấu ngoặc/em-dash thừa trong chuỗi `workspace.ts`.
  - `cmd /c "npm run verify"` (`tsc -b --noEmit && tsc -b && vite build`): thoát `0`, `0` lỗi (`dist/assets/WorkspacePage-CgZyTSlI.js 100.04 kB`).
  - Playwright trên `vite preview` (`127.0.0.1:4173`) ở Desktop `1440×900` và Mobile cảm ứng `375×812` (kiểm tra 11 ảnh chụp màn hình qua `read_file`): đạt cả 4 trạng thái (`Sáng`, `Làm việc`, `Tối`, `Đi ngủ`), xác nhận không còn hàng nút dưới `.pokemon-gba-dialog`, bấm trực tiếp lên `<canvas>` (`bed`, `capybara`, `monitor`) cập nhật đúng hộp thoại trên cả Desktop & Mobile, đồng bộ Spotify Play -> Pause đóng băng ở `00:44`, `Hồ sơ` không hồi quy, `0` lỗi console/page, `0` tràn ngang và `7/7` nút trong `#workspace` đạt `>= 44×44px` trên Mobile.


## 25. Thiết Kế Lại Toàn Bộ Sprite Chibi Pixel Art Nhân Vật Long Hoàng (`pixelSprites.ts`)

- **Chuẩn Hóa Ma Trận & Selective Colored Outlines (`src/components/workspace/pixelSprites.ts`)**:
  - Ép độ rộng hàng đồng nhất bằng `assertUniformMatrixWidth` trên mọi khung ma trận nhân vật (không lệch cột).
  - Áp dụng viền màu có chọn lọc `1px` theo chất liệu thay cho viền đen/dày: tóc `o` (`#2B1D17` / `#241814` / `#1E161C`), da `k` (`#8F5943` / `#7D4D3A` / `#684339`), áo `O` (`#1E2436` / `#181D2C` / `#151926`), quần/giày `Q` (`#182030` / `#121824`), cốc sứ `m` (`#786B63` / `#5D524C`).
- **Tái Thiết Kế 3 Tư Thế Nhân Vật (`waking`, `working`/`late_night`, `sleeping`)**:
  - `waking` (`22×31`): tỷ lệ chibi gọn gàng, tóc nâu hạt dẻ 3 sắc độ (`H`, `h`, `l`) bo tròn có lọn mái, mắt sáng `W` (`#FFFFFF`) + `E` (`#1F2433`), kính gọng mảnh `1px` (`G`/`g`) nối cầu mũi kèm phản quang nhẹ `L`, cổ `1px` (`ddd`) nối cổ áo `CCC` (bỏ hẳn dải da kéo dài giữa ngực), hoodie kéo khóa xám-navy, quần jeans tối, giày sneaker trắng/xám và cốc cà phê gốm trắng (`M`/`c`/`F`) có quai rỗng (`WAKING_BODY_HOLD_CUP`, `WAKING_BODY_BREATHE`, `WAKING_BODY_LIFT_CUP`).
  - `working` & `late_night` (`52×33`): tư thế ngồi góc `3/4` hướng màn hình với gáy tóc tạo lớp rõ nét, cổ áo gọn không tràn xuống phím, chuyển động gõ phím / di chuột / nhấp cà phê, ôm khít phía sau bởi `drawChairBackOverlay`.
  - `sleeping` (`34×22`): đầu và vai tỷ lệ chuẩn đặt giữa gối giường, bàn tay đặt nhẹ sát mép chăn và nằm dưới lớp chăn caro `drawBedBlanket`.
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `cmd /c "npm run verify"` (`tsc -b --noEmit && tsc -b && vite build`): thoát `0`, `0` lỗi (`dist/assets/WorkspacePage-Buaw_-pi.js 101.21 kB`).
  - Kiểm tra AST (`ts.createSourceFile`) & runtime: `AST_COMMENT_COUNT=0`, `MATRIX_RUNTIME_ALL_POSES_OK=true`.
  - Playwright trên `vite preview` (`127.0.0.1:4174`): chụp và đối chiếu cận cảnh phóng đại `8×` nearest-neighbor cho 4 tư thế (`waking` đứng, `working` ngồi, `late_night` ngồi, `sleeping` trên giường) cùng toàn cảnh Desktop `1440×900` và Mobile `375×812` — `0` console error, `0` page error.


## 26. Tái Cấu Trúc Unified Character Rig & Hiệu Chỉnh Điểm Neo Ghế Ngồi (`pixelSprites.ts`, `WorkspaceRoom.tsx`)

- **Mô Hình Lắp Ghép Thống Nhất (`UNIFIED CHARACTER RIG`, `src/components/workspace/pixelSprites.ts`)**:
  - Hợp nhất toàn bộ 3 tư thế thành một hệ thống thành phần dùng chung (`CHAR_PALETTE`, `getLongPalette`, `createEmptyGrid`, `stampGridLayer`, `finalizeGridMatrix`) giữ nguyên `1px` Selective Colored Outlines và loại bỏ hoàn toàn kiểu tô chấm caro trên tóc.
  - Chuẩn hóa kích thước dùng chung xuyên suốt mọi tư thế: đầu `12×12` (`HEAD_FRONT_OPEN`/`BLINK`/`SIP`, `HEAD_BACK_CENTER`/`GLANCE_LEFT`/`GLANCE_RIGHT`, `HEAD_SLEEP`), thân hoodie thon gọn rộng `14px` (`TORSO_FRONT`/`FRONT_BREATHE`, `TORSO_BACK` có mũ trùm gập sau gáy, `TORSO_SLEEP`), chân `LEGS_FRONT` và tay lắp ghép (`WAKING_ARMS_*`, `SEATED_ARMS_*`, `SLEEP_RESTING_HAND`).
  - Tư thế ngồi (`50×20`, `drawY = seatAnchor.seatTopY - 13`): lùi nhẹ khối đầu khỏi dải bàn phím để lộ rõ thanh RGB và hàng phím, hai cánh tay mảnh `2–3px` chạm mép dưới bàn phím & chuột, vai/mũ hoodie tách bạch phía trên tựa lưng ghế `drawChairBackOverlay`.
  - Tư thế đứng (`21×29`) giữ nhịp thở/nhấp cà phê/vươn vai trong `WALKABLE_RECT`; tư thế ngủ (`20×19`, `SLEEP_DRAW_X = 32, SLEEP_DRAW_Y = 89`) dùng chung khối đầu & vai `14px` nằm giữa gối dưới lớp chăn `drawBedBlanket`.
- **Neo Ghế Xoay Theo Dữ Liệu Tọa Độ Thực (`src/components/workspace/WorkspaceRoom.tsx`)**:
  - Định nghĩa `SEATED_CHAIR_ANCHOR` (`seatCenterX: 173, seatTopY: 96`) và truyền qua `seatAnchor` cho lớp vẽ nhân vật.
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `cmd /c "npm run verify"` (`tsc -b --noEmit && tsc -b && vite build`): thoát `0`, `0` lỗi (`dist/assets/WorkspacePage-CWoJkRKz.js 92.78 kB`).
  - Kiểm tra AST (`ts.createSourceFile`) & runtime: `AST_COMMENT_COUNT=0`, `MATRIX_RUNTIME_ALL_POSES_OK=true`.
  - Playwright trên `vite preview`: chụp & rà soát trực tiếp ảnh zoom `8×` cho cả 4 tư thế (`crop_waking_standing.png`, `crop_working_seated.png`, `crop_late_night_seated.png`, `crop_sleeping_bed.png`) cùng ảnh Desktop `1440×900` và Mobile `375×812` — `console_errors: []`, `page_errors: []`.


## 27. Logo Capybara Pixel Art, Tinh Gọn Navbar, Hào Quang Thẻ Đơn Sắc & Vé 3D Capybara Onsen

- **Biểu Tượng Thương Hiệu Capybara Pixel Art (`src/components/BrandLogo.tsx`, `public/favicon.svg`, `src/components/PokemonProfileCard.tsx`, `src/components/Footer.tsx`)**:
  - Thay ngôi sao Gemini bằng huy hiệu chân dung chính diện **Pixel Art Capybara Portrait & Sitting Bust** trên lưới `16×16` (`viewBox="0 0 16 16"`, `shapeRendering="crispEdges"`, `aria-label="Long Hoàng — Capybara Pixel Logo"`), hoàn toàn khác biệt với chú Capybara đi bộ ngang thân ở `FooterPet`.
  - Thiết kế gồm đầu bo tròn, tai nhỏ, mắt `1×2`, mảng mõm `#734928` với mũi chữ `T` (`#24150E`), má hồng ấm (`#E58B7B`), lông ngực caramel & hai chân trước ngồi gọn (`#D09560`, `#B87B48`, `#9C6639`), viền màu chọn lọc (`#3B2417`, `#2C1B12`) và quả quýt/cam (`#F97316`, `#FDBA74`) kèm lá xanh (`#22C55E`, `#15803D`) đội trên đầu.
  - Gỡ bỏ hoàn toàn vòng hào quang `conic-gradient` cầu vồng; `showAura` nay dùng quầng sáng ấm nhẹ kèm hiệu ứng nhấc nhẹ khi hover (`group-hover:-translate-y-0.5 group-hover:scale-105`, tôn trọng `motion-reduce`).
  - Đồng bộ `public/favicon.svg` trên nền bo góc tối (`rx="4"`, `#18181B`, viền trong `#3F3F46`), gắn `size={22}` tại `PokemonProfileCard.tsx` (giữ nguyên ảnh thật `./avatar.jpg`) và `size={36}` tại `Footer.tsx`.
- **Tinh Gọn Thanh Điều Hướng `Navbar.tsx` (`src/components/Navbar.tsx`, `src/data/profile.ts`)**:
  - Xóa dòng phụ đề dài `PROFILE_DATA.brandSubtitle[locale]` cạnh logo, chỉ giữ `<BrandLogo size={34} showAura />` + tên `Long Hoàng`.
  - Thu gọn chiều cao thanh điều hướng (`py-1.5 sm:py-2` ở hàng chính, `py-1` ở thanh tab di động, `lg:min-h-[34px]` cho pill tab desktop trong khi vẫn giữ vùng chạm `min-h-[44px]` trên di động).
  - Bỏ tiền tố đánh số `01.`–`07.` khỏi `UI_LABELS[locale].nav` (`Giới thiệu`, `Về tôi`, `Kinh nghiệm`, `Dự án`, `Kỹ năng`, `Công nghệ` / `Intro`, `About`, `Experience`, `Projects`, `Skills`, `Stack`) và loại bỏ mục `Liên hệ` trùng lặp khỏi hàng điều hướng giữa.
  - Xóa toàn bộ thanh gạch chân cầu vồng `.google-border-frame` dưới tab và mục nav đang chọn, thay bằng trạng thái pill đơn sắc tương phản cao (`bg-folio-surface font-semibold text-folio-ink shadow-sm ring-1 ring-black/10 dark:ring-white/15` cho tab và `bg-folio-elevated font-semibold text-folio-ink ring-1 ring-black/10 dark:ring-white/15` cho mục nav).
- **Viền & Hào Quang Hover Thẻ Đơn Sắc (`src/index.css`, `src/components/Experience.tsx`, `src/components/ProjectsBento.tsx`, `src/components/SkillsMatrix.tsx`)**:
  - Bảo toàn 100% nền **Google Aura Mesh** (`.google-aura-backdrop`).
  - Chuyển hiệu ứng hover trên toàn bộ thẻ nội dung (`.folio-card`, `.google-gradient-hover-border`, `.folio-chip`) từ dải màu cầu vồng sang **đơn sắc theo giao diện**:
    - **Dark Mode (`html[data-theme='dark']`)**: viền và hào quang phát sáng **trắng dịu** (`--border-strong: rgba(255, 255, 255, 0.55)`, `--shadow-glow: 0 12px 36px -6px rgba(255, 255, 255, 0.16), 0 0 20px -2px rgba(255, 255, 255, 0.12)`, dải sáng viền `linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.65) 100%)`).
    - **Light Mode (`html[data-theme='light']`)**: viền và hào quang phát sáng **đen than** (`--border-strong: rgba(17, 17, 17, 0.45)`, `--shadow-glow: 0 12px 34px -6px rgba(17, 17, 17, 0.16), 0 0 18px -2px rgba(17, 17, 17, 0.10)`, dải sáng viền `linear-gradient(135deg, rgba(17,17,17,0.65) 0%, rgba(17,17,17,0.18) 50%, rgba(17,17,17,0.55) 100%)`).
- **Tái Thiết Kế Vé 3D `AboutFoilPass` & Tranh Pixel Capybara Onsen (`src/components/AboutFoilPass.tsx`, `src/components/aboutPassTextures.ts`)**:
  - Gỡ bỏ hoàn toàn lớp phủ lóa cầu vồng (`googleSpectrum`, `silverHoloSpectrum`, `obsidianGoldSpectrum`, `foilMask`, `glintBand`) trong `FRAG_SHADER_SRC` của `AboutFoilPass.tsx` và `prismWash` trong `aboutPassTextures.ts`, giữ lại ánh sáng khuếch tán giấy bìa mờ 3D tự nhiên (`diffuse` + bóng nếp gấp `creaseShadow` + phản xạ trắng nhẹ `vec3(1.0) * spec * 0.10`) giúp chữ và tranh sắc nét tuyệt đối khi kéo uốn, lật mặt và xé cuống vé.
  - Chuyển dải tiêu đề (`paintFoilBand`), khung bát giác quanh hình minh họa, biểu đồ Radar mặt sau và bảng màu `EDITION_STYLES` về tông biên tập đơn sắc (giấy sáng mực đen ở Light Mode, Obsidian bạch kim ở Dark Mode); cập nhật con dấu tròn mặt sau (`paintStarSeal`) thành dấu mộc **Pixel Capybara Stamp** đơn sắc.
  - Thay ảnh chân dung trên mặt trước vé bằng hàm `paintOnsenCapybaraScene` (`ctx.imageSmoothingEnabled = false`) vẽ trực tiếp bức tranh **Pixel Art Capybara ngâm suối nước nóng Onsen** trên lưới nguyên `36×36` (`7×7` px mỗi ô): chú Capybara thư giãn trong bồn gỗ Hinoki bốc khói mờ, đội khăn trắng gấp gọn và quả yuzu trên đầu, 2 quả yuzu nổi trên mặt nước xanh ngọc gợn sóng, khóm trúc xanh cùng đèn đá Nhật (`Tōrō`) phát sáng ấm phía sau và bầu trời tự đổi theo giao diện (đêm trăng khuyết đầy sao ở Dark Mode, bình minh sương mờ ở Light Mode).
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `cmd /c "npm run verify"` (`tsc -b --noEmit && tsc -b && vite build`): thoát `0`, `0` lỗi (`dist/assets/AboutFoilPass-DHUFSyDX.js 39.52 kB`, `dist/assets/index-CbUDVdKy.js 118.81 kB`).
  - Kiểm tra AST (`ts.createScanner`) & CSS trên toàn bộ tệp chỉnh sửa: `TS_COMMENTS=0`, `CSS_COMMENTS=0`.
  - Playwright trên `vite preview` (`127.0.0.1:4173`) ở cả **Dark Mode** và **Light Mode**, trên **Desktop (`1440×900`)** và **Mobile (`375×812` cảm ứng)**: xác nhận trực quan qua ảnh chụp màn hình thanh `Navbar` gọn gàng không phụ đề/không gạch chân cầu vồng, logo Capybara pixel sắc nét, hiệu ứng hover thẻ phát sáng trắng (Dark) / đen (Light) trên nền `.google-aura-backdrop`, vé 3D `AboutFoilPass` sắc nét với cảnh Capybara Onsen cùng đầy đủ thao tác kéo uốn (`data-drag-bent="true"`), lật mặt (`data-flipped="true"`), xé cuống (`data-torn="true"`), khôi phục (`data-torn="false"`), tab `Không gian` (`?tab=workspace`) hoạt động ổn định, `scrollWidth <= innerWidth` và `0` lỗi console/page.


## 28. Khôi Phục Hiệu Ứng Foil Cầu Vồng Mịn & Gỡ Bỏ Drop Shadow / Click Glow (`AboutFoilPass.tsx`, `src/index.css`)

- **Shader Foil Lăng Kính Cầu Vồng Mịn & Làm Mượt Pháp Tuyến (`src/components/AboutFoilPass.tsx`)**:
  - Khôi phục hiệu ứng foil cầu vồng lăng kính mượt trong `FRAG_SHADER_SRC` với `uniform float uBend` (`mesh.bendIntensity`) và dải sóng cosine `smoothstep` (`bandPrimary`, `bandSecondary`) không dùng `atan` xoáy tâm.
  - Làm mượt trường vector pháp tuyến từ các đỉnh lân cận trong `computeNormals()` qua bộ đệm `TEMP_NX`, `TEMP_NY`, `TEMP_NZ` (giữ ranh giới đường xé `seamBroken`) để ánh sáng và dải cầu vồng trượt đều khi uốn cong vé.
  - Bảo vệ độ rõ tranh minh họa Capybara Onsen bằng `artMask` (`0.26` bên trong khung tranh) và bảo vệ độ tương phản chữ trên nền giấy sáng Light Mode qua `isLightCard` (`lightTextKeep`, `inkContrastKeep`, `pastelPearl`).
- **Gỡ Bỏ Hoàn Toàn Drop Shadow & Hào Quang Bấm/Kéo (`src/components/AboutFoilPass.tsx`, `src/index.css`)**:
  - Xóa lượt vẽ bóng đổ WebGL (`uIsShadow`) khỏi `VERT_SHADER_SRC`, `FRAG_SHADER_SRC`, `GlContextState` và vòng vẽ chính trong `src/components/AboutFoilPass.tsx`.
  - Xóa `filter: drop-shadow(...)` trên `.about-foil-canvas` và quy tắc `.about-foil-stage[data-interacting='true'] .about-foil-canvas` dùng `--accent-glow` trong `src/index.css`.
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `TS_COMMENTS=0` trong `src/components/AboutFoilPass.tsx` và `CSS_COMMENTS=0` trong `src/index.css`.
  - `cmd /c "npm run verify"` (`tsc -b --noEmit && tsc -b && vite build`): thoát `0`, `0` lỗi (`dist/assets/AboutFoilPass-l2hasdhh.js 41.54 kB`, `dist/assets/index-prhVbFbk.css 61.01 kB`).
  - Playwright trên `vite preview` (`Desktop 1440×900` & `Mobile 375×812`, Dark & Light): `idle_filter: "none"`, `drag_filter: "none"`, `interacting_during_drag: "true"`, `drag_bent_during_drag: "true"`, `flipped_after_click: "true"`, `torn_after_drag: "true"`, `restored_torn: "false"`, `no_overflow: true`, `console_errors: []`, `page_errors: []`, chữ Light Mode và tranh Capybara Onsen sắc nét.


## 29. Thiết Kế Lại Phòng Pixel `320×180` Phong Cách Pixel Office Loft & Sprite Chibi Selout (`pixelPalette.ts`, `roomEnvironment.ts`, `pixelSprites.ts`)

- **Bảng Màu Pixel Office Loft (`src/components/workspace/pixelPalette.ts`)**:
  - Nâng cấp `RoomPalette` theo 4 khung giờ (`waking`, `working`, `late_night`, `sleeping`) với hệ token vật liệu studio loft: gạch mộc (`brickHi`, `brickMid`, `brickSh`, `brickMortar`), lam gỗ ốp tường (`wainscotHighlight`–`wainscotShadow`, `baseboardTrim`), sàn gỗ sồi mật ong/hun khói (`floorHighlight`, `floorMid`, `floorShadow`, `floorGrain`, `floorSeam`, `floorRimReflect`), khung thép cửa sổ (`mullionDark`, `mullionHi`), ánh sáng đường chân trời (`citySkyGlow`, `cityWinAmber`, `cityWinCyan`), đèn thả trần (`pendantShade`, `pendantGlow`), dây đèn (`fairyWire`, `fairyBulbCore`, `fairyBulbWarm`, `fairyGlowColor`), máy đĩa than (`vinylDisc`, `vinylLabel`) và màu selout riêng (`capySelout`, `charSelout`).
- **Không Gian Studio Loft `320×180` (`src/components/workspace/roomEnvironment.ts`)**:
  - `drawBackWall` & `drawBrickPatch`: tường kết hợp mảng gạch mộc lộ thiên với lam gỗ ốp chân tường và phào chỉ.
  - `drawWindow` & `drawWindowSky`: cửa sổ toàn cảnh chia ô thép mảnh hiển thị mây trôi/chim bay ban ngày và đường chân trời thành phố rực sáng kèm trăng sao ban đêm.
  - `drawOverheadPendants` & `drawFairyLights`: bổ sung cụm đèn thả trần và dây đèn fairy light phát quầng sáng ấm (`drawFairyGlow`) kết hợp Ordered Bayer 4×4 dithering (`drawBayerWindowBeam`, `drawBayerLampCone`, `drawBayerRadialPool`).
  - `drawFloorPlanks` & `drawWovenRug`: lát sàn gỗ sồi ghép thanh so le mảnh, giữ nguyên ranh giới di chuyển `WALKABLE_RECT` (`74, 84, 32×66`) và `RUG_WALK_RECT` (`116, 125, 112×28`) trên tấm thảm **Kilim** dệt hoa văn kèm tua rua hai đầu.
  - `drawDisplayShelfAndPlant`: kệ gỗ óc chó trưng bày mô hình **Honda Cub xanh kem**, máy đĩa than **Vinyl turntable** đang quay, thẻ Holo ánh kim, đồng hồ treo tường và dây trầu bà rủ nhẹ.
- **Sprite Chibi Long Điêu Khắc & Linh Vật Capybara Selout (`src/components/workspace/pixelSprites.ts`)**:
  - Áp dụng bộ tạo lưới pixel và viền màu chọn lọc (`createPixelGrid`, `applySeloutLayer`, `seloutFromHex`, `mirrorPixelGrid`, `drawPixelGrid`).
  - Tái thiết kế 3 bộ khung chibi của **Long Hoàng** (`buildWakingLongGrid` đi/uống cà phê, `buildSeatedLongGrid` ngồi gõ phím/nhìn màn hình phía sau `drawChairBackOverlay`, `buildSleepingLongGrid` nằm gối đầu dưới lớp chăn `drawBedBlanket`) cùng **Capybara mascot** selout (`buildCapyGrid`) tương tác trên thảm Kilim.
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `TS_COMMENTS=0` trên `pixelPalette.ts`, `roomEnvironment.ts`, `pixelSprites.ts`, `WorkspaceRoom.tsx`.
  - `cmd /c "npm run verify"` (`tsc -b --noEmit && tsc -b && vite build`): thoát `0`, `0` lỗi (`1961` modules).
  - Playwright trên `vite preview` (`1440×900` & `375×812`): `console_errors: []`, `page_errors: []`, `0` tràn ngang (`1440/1440`, `375/375`), đạt 7/7 hotspot canvas (`window`, `shelf`, `bed`, `monitor`, `speakers`, `lamp`, `capybara`), bật/tắt đèn bàn, Spotify Lo-fi Demo Play/Stop, tab `Hồ sơ` không hồi quy, và rà soát trực tiếp ảnh chụp `working_light`, `morning_light`, `late_night_dark`, `sleeping_dark`, `mobile_375_dark`, `closeup_room`, `closeup_room_late_night`.


## 30. Mở Rộng Phòng Pixel Office Loft `480×320`, Dẫn Đường `findPath` & 5 NPC Studio (`src/data/workspace.ts`, `pixelPalette.ts`, `roomEnvironment.ts`, `pixelSprites.ts`, `WorkspaceRoom.tsx`)

- **Bố Cục Studio Loft `480×320` Hoàn Chỉnh (`src/data/workspace.ts`, `src/components/workspace/pixelPalette.ts`, `src/components/workspace/roomEnvironment.ts`)**:
  - Nâng độ phân giải gốc lên `ROOM_WIDTH = 480`, `ROOM_HEIGHT = 320` (tỉ lệ `3:2`) với bảng màu 4 khung giờ (`waking`, `working`, `late_night`, `sleeping`) và chế độ đèn bàn `lampOn` từ `getRoomPalette`.
  - Dựng không gian studio đầy đủ chi tiết: tường gạch mộc kết hợp lam gỗ ốp chân tường (`drawWalls`), 2 cửa sổ toàn cảnh khung thép mảnh đổi cảnh theo 4 khung giờ kèm tia nắng/hào quang (`drawWindowFrame`, `drawWindowSkyAnimated`, `drawSunbeamsAndHalos`), tủ máy chủ với đèn LED nháy (`drawServerRack`, `drawServerLeds`), bảng kính **Kanban** (`drawKanbanGlassBoard`), 8 cụm bàn làm việc (`DESK_SLOTS`: `desk-1`..`desk-8`) trên 2 tấm thảm Nordic (`drawFloor`), quầy **espresso bar / tủ lạnh / cây nước** (`drawCoffeeBarFridgeAndCooler`), kệ gỗ óc chó trưng bày **Honda Cub xanh kem** và **máy đĩa than Vinyl** (`drawBookshelfAndTurntable`, `drawCafeAndTurntableAnimations`), khu sofa thảm **Kilim** (`drawLoungeBase`) cùng linh vật **Capybara** (`CAPY_LOUNGE_RECT`), lớp tiền cảnh che khuất tự nhiên (`drawRoomForegroundLayer`: lưng ghế ergonomic, bàn trà, sofa, cây monstera) và đồ thị dẫn đường dọc lối đi `findPath` giữa các bàn làm việc và 6 điểm nghỉ (`REST_SLOTS`).
- **Hệ Thống Sprite Chibi `24×32` Selout & 6 Nhân Vật Studio (`src/components/workspace/pixelSprites.ts`, `src/components/workspace/WorkspaceRoom.tsx`)**:
  - Xây dựng bộ vẽ chibi `24×32` (`SPRITE_W × SPRITE_H`) dùng **Selective Colored Outlines** (`applySeloutOutline`, `drawCharacter`, `renderPortraitDataUrl`) với 9 trạng thái hoạt ảnh (`idle`, `walk`, `work`, `think`, `rest_coffee`, `rest_sit`, `rest_sleep`, `error`, `talk`) theo 4 hướng.
  - Tạo hình nhân vật chính **Long Hoàng** (`ROSTER_PROFILES`, `getLongPalette`, bảng tên viền vàng) cùng 5 NPC studio tự động di chuyển, làm việc và nghỉ ngơi (`Atlas`, `Nova`, `Pixel`, `Kaito`, `Sora`), tích hợp bảng tên DPR chống chồng chéo (`drawNametagBox`, `drawCrowdedStatusPip`) và bong bóng thoại hoạt động song ngữ `vi`/`en` (`drawBubble`).
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `cmd /c "npm run verify"` (`tsc -b --noEmit && tsc -b && vite build`): thoát `0`, `0` lỗi (`1961` modules, `dist/assets/WorkspacePage-CFzCLgqy.js 134.70 kB`).
  - Báo cáo QA (#118): `TS_COMMENTS=0` trên bộ 5 tệp workspace (ngoại trừ chuỗi URL `https://longhoang.pages.dev/api/spotify` trong `src/data/workspace.ts`), Playwright `vite preview` trên `1440×900` và `375×812` (`device_scale_factor=2`) đạt `console_errors: []`, `page_errors: []`, `0` tràn ngang, tỉ lệ canvas `3:2` chuẩn xác, đầy đủ tương tác hotspot, Spotify Demo, chuyển ngữ `VI / EN`, tab `Hồ sơ` và kiểm tra trực quan các ảnh chụp trạng thái phòng.

## 31. Thu Gọn Tỉ Lệ Toàn Trang, Thiết Kế Lại Thanh Điều Hướng Một Hàng & Tối Ưu Hóa Độ Mượt

- **Mục tiêu & Thỏa thuận thiết kế**: Thu nhỏ tỉ lệ hiển thị (~12–18%), tái cấu trúc thanh điều hướng trên cùng gọn gàng trên cả PC và Mobile, cắt bỏ các hiệu ứng nền/GPU nặng không cần thiết để tối ưu khung hình trong khi giữ nguyên tương tác 3D chủ động khi rê chuột hoặc chạm trên Thẻ Pokémon (Hero) và Vé 3D cầu vồng (About).
- **Thu nhỏ tỉ lệ & Tinh giản giao diện (`src/index.css`)**:
  - Giảm kích thước nhịp trang: `.folio-container` từ `76rem` xuống `68rem`, `--space-section-y` (`2.5rem` / `3.5rem` / `4.25rem`), `--pad-card` (`1.25rem`), `--pad-card-sm` (`0.9rem`), `--radius-card` (`14px`), `--control-height` (`38px`, `44px` trên di động) và cỡ chữ gốc `body` (`14.5px`–`15px`).
  - Chuyển nền thẻ `--bg-surface` về màu đặc sắc nét (`#FFFFFF` Light / `#1A1B1E` Dark) thay cho `backdrop-filter` chồng lớp; giới hạn `.google-aura-backdrop` xuống `position: absolute; height: 520px` với 2 quầng màu ở đầu trang; chuyển toàn bộ hệ thống nút (`.folio-btn-primary`, `.folio-btn-secondary`, `.folio-btn-compact`, `.folio-btn-icon`, `.google-btn-github`) sang phong cách tối giản phẳng sắc nét (xóa `@property --btn-angle`, `google-btn-spin`, `.google-pill-aura`); loại bỏ `float-gentle`, `pulse-ring`, `folio-marquee`, `.google-gradient-hover-border::before` và `pokemon-ambient-*`.
- **Thanh điều hướng một hàng PC & Mobile (`src/components/Navbar.tsx`, `src/components/BrandLogo.tsx`, `src/App.tsx`)**:
  - Hợp nhất thanh chọn trên cùng thành **1 hàng sticky gọn** (`53px` trên Desktop/Tablet, `44.5px` trên Mobile): tích hợp `BrandLogo (26px)` + cụm tab `role="tablist"` (`Hồ sơ | Không gian`), 7 liên kết mục trang ở giữa (`lg:flex`, tự ẩn khi chuyển sang tab `Không gian`), nút đổi ngôn ngữ (`VI / EN` rút gọn `VI` trên mobile), nút đổi giao diện sáng/tối chỉ dùng icon và bảng chọn 2 cột `#mobile-nav-drawer` (hỗ trợ đóng bằng `Escape` / chạm ra ngoài, chỉ hiển thị ở tab `Hồ sơ`).
- **Tối ưu Runtime & Từng phân khu (`src/hooks/usePrefersReducedMotion.ts`, `src/main.tsx`, `src/components/*`, `src/data/siteStack.ts`)**:
  - Thay thế `framer-motion` bằng hook thuần `usePrefersReducedMotion`, gỡ `<MotionConfig>` trong `src/main.tsx` và các `motion.*` / `useScroll` / `useTransform` tại `Hero.tsx`, `About.tsx`, `AboutFoilPass.tsx`, `Experience.tsx`, `BuiltWithDiagram.tsx`, `Contact.tsx`, `Footer.tsx`, `FooterPet.tsx`, `WorkspacePage.tsx`; giữ mục `04` trong `BuiltWithDiagram.tsx` là `CSS Motion + Lucide` và đưa `framer-motion` vào `INTERNAL_GLUE_PACKAGES` của `src/data/siteStack.ts`.
  - Viết lại tương tác nghiêng & holo trên `PokemonProfileCard.tsx` (`max-w-[350px]`) bằng vòng lặp nội suy `requestAnimationFrame` theo nhu cầu (`LERP_FACTOR = 0.28`, ghi thẳng biến CSS vào DOM, tự dừng khi nghỉ, không kích hoạt React re-render) và thu gọn khung `AboutFoilPass` về `max-w-[300px]`.
  - Cắt bỏ hẳn **Marquee** ở `SkillsMatrix.tsx` và **hiệu ứng 3D Tilt + parallax** trên 6 thẻ `ProjectsBento.tsx` (chuyển sang `hover:-translate-y-0.5` CSS thuần); khóa tốc độ canvas `WorkspaceRoom.tsx` ở `30fps` và tạm dừng render khi cuộn ra ngoài khung nhìn bằng `IntersectionObserver`.
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `cmd /c "npm run verify"` (`tsc -b --noEmit && tsc -b && vite build`): thoát `0`, giảm số module từ `1962` xuống `1606`, chunk `motion-*.js` từ `127.4 kB` xuống `0.92 kB`, CSS `index-*.css` từ `61.3 kB` xuống `50.02 kB`.
  - Playwright `vite preview` trên `1440×900` (Light/Dark), `820×1180` (Light) và `375×812` (Dark): chiều cao Navbar đạt `53px` (PC/Tablet) và `44.5px` (Mobile), `0` lỗi console/page, `0` tràn ngang trên cả 3 kích thước màn hình, kiểm chứng tương tác nghiêng `PokemonProfileCard` (`4.64deg / 6.64deg` -> reset `0.00deg`), dải ribbon `HT: VI/EN` hiển thị đầy đủ trên Tablet, nút menu mobile tự ẩn gọn ở Workspace và `WorkspaceRoom` giữ đúng tỉ lệ `3:2` (`1.505`).

## 32. Thêm Khung Danh Sách "Game Hay Chơi" Trong Tab Không Gian (`FavoriteGamesCard.tsx`, `src/data/workspace.ts`, `WorkspacePage.tsx`)

- **Dữ liệu & Nhãn song ngữ (`src/data/workspace.ts`)**:
  - Khai báo type `FavoriteGameItem` và mảng 8 tựa game `FAVORITE_GAMES` (`Liên Minh Huyền Thoại` / `League of Legends`, `TFT`, `Valorant`, `Tốc Chiến` / `Wild Rift`, `GTA 6`, `GTA 5`, `CS2`, `Minecraft`), đồng bộ nhãn `gamesHeader` / `gamesListAriaLabel` trong `WORKSPACE_UI_LABELS` cho cả `vi` và `en`.
- **Thành phần giao diện (`src/components/workspace/FavoriteGamesCard.tsx`, `src/components/WorkspacePage.tsx`)**:
  - Tạo card `FavoriteGamesCard` dùng `.folio-card` bề mặt đặc đồng bộ với thẻ Spotify phía trên (icon `Gamepad2`, huy hiệu số lượng `8`, mã viết tắt đơn sắc và nhãn nền tảng/thể loại), gắn ngay dưới thẻ **Long đang nghe** trong cột phải (`lg:col-span-4`) để cân bằng chiều cao hai cột trên Desktop.
- **Kiểm chứng sau chỉnh sửa**:
  - `TS_COMMENTS=0`, `impeccable detect --json` trả về `[]` và `cmd /c "npm run verify"` thoát `0` (`1607` modules, `WorkspacePage-*.js 137.15 kB`).
  - Playwright `vite preview` trên `1440×900` (Dark/Light, `VI` & `EN`), `820×1180` (Light) và `375×812` (Dark): `0` lỗi console/page, `0` tràn ngang, `8` tựa game hiển thị đầy đủ (`clippedCount: 0`) trên cả 3 kích thước màn hình.

## 33. Bổ Sung Bộ Logo Chính Thức Cho 8 Game Trong Khung "Game Hay Chơi" (`public/games/`, `FavoriteGamesCard.tsx`)

- **Bộ logo tự host (`public/games/`)**: Lưu 8 biểu tượng/logo game cục bộ không phụ thuộc CDN ngoài (`lol.svg`, `tft.png`, `valorant.svg`, `wild-rift.png`, `gta6.svg`, `gta5.svg`, `cs2.svg`, `minecraft.svg`), nạp qua đường dẫn tương đối `./games/...` tương thích đồng thời Cloudflare Pages và GitHub Pages (`base: './'`).
- **Tích hợp & Tương phản hai chế độ (`src/data/workspace.ts`, `src/components/workspace/FavoriteGamesCard.tsx`)**:
  - Mở rộng `FavoriteGameItem` thêm `logoUrl` và `logoSurface` (`'cover' | 'dark' | 'neutral'`), đặt nền tối `#16171C` cho `gta5.svg` / `gta6.svg` để giữ rõ chữ trắng trên cả Light Mode lẫn Dark Mode, kèm fallback về `game.code` nếu `onError`.
  - Hiển thị đồng bộ khung logo `28×28px` (`rounded-[6px] border border-folio-border`) cạnh tên game trong `FavoriteGamesCard.tsx`.
- **Kiểm chứng sau chỉnh sửa**:
  - `TS_COMMENTS=0`, `impeccable detect --json` trả về `[]` và `cmd /c "npm run verify"` thoát `0` (`dist/games/` chứa đủ `8` tệp logo).
  - Playwright `vite preview` kiểm chứng cả `8` thẻ `<img>` đều tải thành công (`complete: true`, `naturalWidth > 0`), `clippedCount: 0`, `0` lỗi console/page và `0` tràn ngang trên `1440×900`, `820×1180` và `375×812`.

## 34. Thay Thế Vé 3D Bằng Mini-Game Mở Hộp Thẻ Pokémon TCG (12 Pack × 10 Thẻ) (`PokemonPackUnboxer.tsx`, `PokemonPackModals.tsx`, `pokemonPack.ts`)

- **Dọn bỏ vé 3D cũ**: Xóa hoàn toàn `src/components/AboutFoilPass.tsx`, `src/components/aboutPassTextures.ts` và các quy tắc `.about-foil-*` trong `src/index.css`; thay thế bằng `LazyPokemonPackUnboxer` (`React.lazy` + `Suspense`) tại cột trái `02. Về tôi` (`src/components/About.tsx`), giữ nguyên cột phải nội dung giới thiệu & 4 nguyên tắc làm việc.
- **Kho dữ liệu `1.288` thẻ Pokémon thật (`public/data/pokemon-cards.json`, `public/pokemon/card-back.jpg`)**:
  - Hợp nhất không trùng lặp toàn bộ `91` thẻ từ `simeydotme/pokemon-cards-css` cùng 7 bộ kinh điển từ `PokemonTCG/pokemon-tcg-data` (`sv3pt5` 151, `swsh12pt5` + `swsh12pt5gg` Crown Zenith, `swsh7` Evolving Skies, `sv4pt5` Paldean Fates, `sv8pt5` Prismatic Evolutions, `base1` Base Set 1999) đạt `1.288` thẻ thuộc `27` bộ (`166 KB` JSON tải trễ theo nhu cầu) kèm mặt sau thẻ chính thức `public/pokemon/card-back.jpg` (`62 KB`).
- **Trải nghiệm mở hộp (`src/data/pokemonPack.ts`, `PokemonPackUnboxer.tsx`, `PokemonPackModals.tsx`, `src/index.css`)**:
  - Mỗi hộp gồm **12 pack** (`PACKS_PER_BOX = 12`), mỗi pack sinh **10 thẻ ngẫu nhiên không trùng lặp** (`CARDS_PER_PACK = 10`) phân tầng tỷ lệ thực tế (`common`, `uncommon`, `rare`, `ultra`, `secret`), hỗ trợ chọn 7 loại hộp bài, xé pack bằng bấm hoặc vuốt ngang, lật từng thẻ 3D hoặc **Lật nhanh** xem đủ lưới `5×2`, soi ánh foil 3D phóng to `_hires.png` (`CardInspectorModal`) và **Bộ sưu tập** (`CollectionBinderModal`) lưu cục bộ qua `localStorage` kèm lọc thẻ hiếm / tìm kiếm song ngữ `VI / EN`.
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `TS_COMMENTS=0`, `impeccable detect --json` trả về `[]` và `cmd /c "npm run verify"` thoát `0` (`1608` modules, `PokemonPackUnboxer-*.js 33.56 kB | gzip: 9.47 kB` nhẹ hơn vé WebGL cũ `41.35 kB`).
  - Playwright `vite preview` trên `1440×900` (Dark/Light, `VI` & `EN`), `820×1180` (Light) và `375×812` (Dark): nạp đủ `1.288` thẻ, xé Pack #1 giảm còn `11/12 pack`, hiển thị đủ `10/10` ảnh thẻ thật (`naturalWidth > 0`, `unique: 10`), mở/đóng hộp thoại phóng to 3D và Bộ sưu tập `10` thẻ, `0` lỗi console/page và `0` tràn ngang.

## 35. Nâng Cấp Hiệu Ứng Xé Pack, Rút Thẻ, Lật Từng Lá, Âm Thanh Web Audio & Bộ Lọc Độ Hiếm / Giá Trị / Sức Mạnh

- **Làm giàu kho `1.288` thẻ với dữ liệu thị trường & sức mạnh thật (`public/data/pokemon-cards.json`)**:
  - Bổ sung giá thị trường TCGPlayer USD thực tế qua TCGCSV (`1.278/1.288` thẻ có giá thật) cùng chỉ số `hp`, sát thương chiêu mạnh nhất `atk` và tổng sức mạnh `power = hp + atk` từ `PokemonTCG/pokemon-tcg-data` (`203 KB` JSON tải trễ).
- **Âm thanh tổng hợp Web Audio API (`src/utils/pokemonAudio.ts`)**:
  - Tạo 4 hiệu ứng âm thanh không cần tệp mp3: tiếng xé mép giấy bạc (`playPackRipSound`), tiếng trượt rút/gạt thẻ (`playCardSlideSound`), tiếng lật thẻ (`playCardFlipSound`) và chuông sáng theo độ hiếm `rare`/`ultra`/`secret` (`playRarityPullSound`), kèm nút bật/tắt âm thanh lưu `localStorage`.
- **Chuỗi hoạt ảnh mở pack 4 chặng (`PokemonPackUnboxer.tsx`, `src/index.css`)**:
  - Chặng `ripping` (`460ms`): tách mép trên kèm tia sáng quét ngang `.pk-tear-spark` và kéo mép theo cử chỉ vuốt.
  - Chặng `drawing` (`640ms`): hoạt ảnh rút xấp 10 thẻ trượt lên từ miệng túi pack (`.pk-draw-deck`) trong khi vỏ túi trượt rơi xuống (`.pk-draw-pouch`).
  - Chặng `revealing`: chồng thẻ thu nhỏ theo số lá còn lại, mỗi lá bắt đầu úp mặt sau để người dùng tự lật 3D (`rotateY`) kèm vòng sáng hit (`.pk-reveal-burst`), hiển thị giá USD & sức mạnh ngay dưới thẻ, rồi gạt mượt sang trái (`.pk-card-slide-out`) khi chuyển sang lá kế tiếp.
- **Bộ lọc & Sắp xếp Bộ sưu tập (`PokemonPackModals.tsx`)**:
  - Nâng cấp `CollectionBinderModal` với dải lọc **Độ hiếm** 6 mức (`Tất cả`, `Thường`, `Ít gặp`, `Hiếm`, `Cực hiếm`, `Bí mật`), lọc ngưỡng **Giá trị USD** (`≥ $1 / $5 / $20 / $50`), lọc ngưỡng **Sức mạnh** (`≥ 150 / 300 / 450`), 6 chế độ sắp xếp (độ hiếm, giá cao/thấp, sức mạnh, HP, tên A–Z) và hiển thị tổng giá trị bộ sưu tập + giá/sức mạnh trực tiếp trên từng thẻ.
- **Kiểm chứng sau chỉnh sửa**:
  - `TS_COMMENTS=0`, `impeccable detect --json` trả về `[]` và `cmd /c "npm run verify"` thoát `0`.
  - Playwright `vite preview` kiểm chứng đầy đủ luồng xé pack → rút 10 thẻ → lật từng lá (#1, #2) → lật nhanh 10 thẻ → nút bật/tắt âm thanh → lọc Bộ sưu tập theo Độ hiếm / Giá trị / Sức mạnh & sắp xếp trên `1440×900`, `820×1180` và `375×812`, `0` lỗi console/page và `0` tràn ngang.

## 36. Sửa Triệt Để Lỗi Chớp Lộ Thẻ Khi Chuyển Lá & Bổ Sung 11 Hiệu Ứng Foil Đúng Thực Tế Pokémon TCG

- **Khắc phục triệt để lỗi chớp lộ thẻ kế tiếp (`PokemonPackUnboxer.tsx`, `src/index.css`)**:
  - Nguyên nhân gốc: nút DOM `.pk-flip-card` bị React tái sử dụng giữa lá cũ và lá mới nên khi `revealIndex` tăng đồng thời `data-flipped` đổi `true → false`, ảnh mặt trước của lá mới đã nạp sẵn bị hiển thị trong nửa đầu chu kỳ transition ngược `380ms` (`0deg → 90deg`).
  - Cách sửa 3 lớp: gắn `key={`${openedPackNumber}-${revealIndex}-${activeCard.id}`}` để mỗi thẻ mount mới hoàn toàn ở trạng thái úp, chỉ render ảnh mặt trước & lớp foil bên trong `.pk-flip-front` khi `isCardFlipped === true` (ảnh đã được preload sẵn trong bộ nhớ trình duyệt khi xé pack), khóa `visibility: hidden; opacity: 0` cho `.pk-flip-front` lúc úp và reset tức thì góc nghiêng `resetTiltImmediately()` trước khi chuyển lá.
- **11 chất liệu foil đúng thực tế từng loại thẻ Pokémon TCG (`src/data/pokemonPack.ts`, `PokemonPackUnboxer.tsx`, `PokemonPackModals.tsx`, `src/index.css`)**:
  - Phân loại chuẩn xác toàn bộ 22 độ hiếm thật trong kho `1.288` thẻ qua `getCardFoilStyle`: giữ **giấy mờ không foil (`none`)** cho `Common`, `Uncommon` và `Rare` non-holo tiền Scarlet & Violet; phân tách riêng 10 chất liệu thật gồm `holo-regular` (gương sọc), `holo-cosmos` (sao vũ trụ Base/Cosmos), `holo-v` (lăng kính chéo V / Double Rare `ex`), `holo-vmax` (vân nổi VMAX/VSTAR), `holo-fullart` (Full Art/Illustration Rare), `holo-shiny` (lưới ánh kim chéo Shiny/Radiant/Amazing), `holo-sir` (SIR lăng kính vân nổi), `holo-rainbow` (cầu vồng pastel Rainbow), `holo-gold` (vàng ánh kim 24K Secret/Hyper) và `holo-acespec` (pha lê hồng ACE SPEC).
  - Bổ sung 3 lớp shader CSS đáp ứng theo tọa độ `--pk-px/--pk-py/--pk-bgx/--pk-bgy/--pk-hyp` (`.pk-holo-foil`, `.pk-holo-glitter`, `.pk-holo-glare`), nhãn loại foil trong khung lật & hộp thoại phóng to 3D, cùng ánh glint `.pk-mini-glint` chỉ hiện trên thẻ có foil thật trong lưới 10 thẻ & Bộ sưu tập.
- **Kiểm chứng sau chỉnh sửa**:
  - `TS_COMMENTS=0`, `impeccable detect --json` trả về `[]` và `cmd /c "npm run verify"` thoát `0`.
  - Playwright kiểm chứng hồi quy chống chớp lộ thẻ (`frontImgPresentBeforeFlip: false`, `frontVisibilityBeforeFlip: "hidden"` xuyên suốt lúc chuyển sang thẻ #2), xác nhận thẻ Common mang `data-foil="none"` còn thẻ hit mang đúng `data-foil` thực tế và kiểm tra ảnh chụp soi foil 3D ở Dark/Light Mode, `0` lỗi console/page và `0` tràn ngang.

## 37. Tối Ưu Mã Nguồn, Xóa Code Thừa, Gỡ Dependency Không Dùng & Nén Tối Đa Tài Nguyên Tĩnh

- **Gỡ gói & chunk thừa (`package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/data/siteStack.ts`)**:
  - Gỡ hoàn toàn `framer-motion` khỏi `package.json` / `node_modules` (gỡ 4 gói thừa không còn dùng) và xóa entry `motion` khỏi `vite.config.ts`, loại bỏ hẳn chunk rỗng `motion-*.js` khỏi `dist/assets/`.
  - Bật `"noUnusedLocals": true` và `"noUnusedParameters": true` trong `tsconfig.json` để khóa chặt biến/tham số thừa ở mọi lần build về sau.
  - Chuẩn hóa meta OG/Twitter trong `index.html` (`og:image` tuyệt đối `https://longhoang.pages.dev/avatar.jpg`, `og:url`, `twitter:card`) và làm sạch mô tả `siteStack.ts`.
- **Xóa code chết, CSS thừa & hợp nhất logic lặp (`src/hooks/useCardTilt.ts`, `PokemonPackUnboxer.tsx`, `PokemonPackModals.tsx`, `pixelSprites.ts`, `App.tsx`, `About.tsx`, `WorkspacePage.tsx`, `src/index.css`)**:
  - Tách hook dùng chung `src/hooks/useCardTilt.ts`, thay thế hai bộ vòng lặp nghiêng 3D `rAF` bị nhân đôi ở `PokemonPackUnboxer.tsx` và `CardInspectorModal` (`PokemonPackModals.tsx`) — cắt giảm hơn 200 dòng mã trùng lặp và đưa `PokemonPackUnboxer-*.js` xuống `50.10 kB` (`gzip: 13.61 kB`).
  - Xóa mã chết `portraitCache`, `pickArchetype`, `pickSeed`, `renderPortraitDataUrl` khỏi `src/components/workspace/pixelSprites.ts` (giảm `WorkspacePage-*.js` xuống `138.23 kB | gzip: 48.04 kB`), gỡ prop `theme` không dùng dọc chuỗi `App.tsx` → `About.tsx` → `PokemonPackUnboxer.tsx` và `WorkspacePage.tsx`, cùng import `React` thừa trong `App.tsx`.
  - Dọn bỏ 6 biến CSS và 2 lớp CSS chết (`.font-editorial`, `.pixelated-canvas`, `--google-gradient*`, `--accent-glow`, `--btn-text`, `--overlay-scrim`) trong `src/index.css` (đạt `0` lớp CSS thừa trên toàn bộ stylesheet).
- **Tối ưu mạnh tài nguyên tĩnh trong `public/` (`957.4 KB → 233.5 KB`, giảm `75.6%` / tiết kiệm `723.9 KB`)**:
  - Nén `public/data/pokemon-cards.json` sang cấu trúc tuple `v: 2` (`203,485 B → 70,484 B`, **-65.4%**) kèm hàm giải nén `unpackCatalog()` trong `src/data/pokemonPack.ts`, giữ trọn `1.288` thẻ, `27` bộ, giá USD thật, `hp`, `atk` và `power`.
  - Chuyển đổi 4 logo game nặng sang WebP sắc nét (`gta5.svg 411,049 B → gta5.webp 6,818 B` **-98.3%**, `gta6.svg 42,172 B → gta6.webp 4,192 B` **-90.1%**, `tft.png 37,700 B → tft.webp 7,054 B` **-81.3%**, `wild-rift.png 32,657 B → wild-rift.webp 5,176 B` **-84.2%**) và xóa 4 tệp cũ, cập nhật đường dẫn trong `src/data/workspace.ts`.
  - Nén progressive JPEG tối ưu kích thước cho `public/avatar.jpg` (`158,494 B → 75,189 B`, **-52.6%**) và `public/pokemon/card-back.jpg` (`62,675 B → 55,410 B`, **-11.6%**).
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `TS_CSS_COMMENTS=0`, `cmd /c "npm run verify"` (kèm `noUnusedLocals` & `noUnusedParameters`) thoát `0` (`dist/assets/` không còn `motion-*.js`, toàn bộ thư mục `dist/` chỉ còn `775.8 KB`).
  - Playwright `verify_pokemon_unboxer.py` & `verify_workspace_games.py` thoát `0` trên `1440×900`, `820×1180` và `375×812`: `1.288` thẻ giải nén chuẩn, chống chớp lộ thẻ (`frontImgPresent: false`, `frontVisibility: "hidden"`), `8/8` logo game `.webp`/`.svg` hiển thị sắc nét không tràn (`clippedCount: 0`), `0` lỗi console/page và `0` tràn ngang.

## 38. Khắc Phục Mờ Ảnh Thẻ Pokémon (`_hires.png` + Tắt Compositor 3D Lúc Nghỉ) & Chống Spoil Bộ Sưu Tập

- **Khắc phục triệt để hiện tượng mờ ảnh thẻ (`PokemonPackUnboxer.tsx`, `PokemonPackModals.tsx`, `useCardTilt.ts`, `src/index.css`, `public/pokemon/card-back.jpg`)**:
  - Chuyển toàn bộ ảnh thẻ đang lật, preload lúc xé pack, lưới 5×2 kết quả pack và lưới Bộ sưu tập từ bản thumbnail `245×342` (`.png`) sang bản độ phân giải cao **`_hires.png` (`600×825` – `733×1024`, xác minh `27/27` bộ trả về `HTTP 200`)** kèm cơ chế dự phòng tự động `hires → small → fallback`, và khôi phục mặt sau `public/pokemon/card-back.jpg` ở độ phân giải gốc `660×921`.
  - Xóa `will-change: transform` và `transform: rotateX(0deg) rotateY(0deg)` cố định lúc thẻ đang đứng yên: `useCardTilt.ts` chỉ bật `data-tilting="true"` khi đang nghiêng/trả về `0°`, và `.pk-flip-card` chuyển sang `data-flip-settled="true"` (`transform-style: flat; transform: none`) ngay sau khi kết thúc `440ms` hoạt ảnh lật để trình duyệt vẽ ảnh thẻ ở đúng mật độ điểm ảnh gốc của màn hình HiDPI/Retina.
- **Chống spoil thẻ chưa mở trong Bộ sưu tập (`PokemonPackUnboxer.tsx`, `src/data/pokemonPack.ts`)**:
  - Bỏ việc cộng gộp cả 10 thẻ vào `boxState.collection` ngay lúc bấm xé pack (`handleRipPack`); thay bằng hàm `commitPackCardsUpTo` theo dõi chỉ số thẻ đã thực sự mở (`recordedCardCountRef`, `packCountedRef`).
  - Mỗi thẻ chỉ xuất hiện trong `Bộ sưu tập` ngay khoảnh khắc người dùng lật lá đó (`0 → 1 → 2 → …`) hoặc bấm **Lật nhanh** (cộng đúng số lá chưa lật còn lại, tuyệt đối không cộng trùng).
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `TS_CSS_COMMENTS=0`, `cmd /c "npm run verify"` thoát `0` (`PokemonPackUnboxer-*.js 51.34 kB | gzip: 13.96 kB`).
  - Playwright `verify_pokemon_unboxer.py` (`device_scale_factor=2`) thoát `0` trên `1440×900`, `820×1180`, `375×812`: xác nhận `binderBeforeFlip: 0`, cập nhật đúng `Bộ sưu tập (0) → (1) → (2) → (10)` (`10 mẫu · 10 thẻ · 1 pack`, không trùng), ảnh thẻ lật và cả 10 ảnh trong lưới & Bộ sưu tập đạt `naturalWidth >= 600` (`_hires.png`), `flipSettled: "true"`, `transform: "none"` khi nghỉ, `0` lỗi console/page và `0` tràn ngang.

## 39. Thiết Kế Lại Giao Diện Pack Pokémon Mylar 3D & Nâng Cấp Hiệu Ứng Xé → Rút Thẻ Liền Mạch

- **Vỏ Booster Pack Mylar 3D & 7 Bìa Bộ Thẻ Thật (`src/components/PokemonBoosterPack.tsx`, `src/data/pokemonPack.ts`, `src/index.css`)**:
  - Tái tạo cấu tạo gói bài Pokémon TCG thật với tỷ lệ `63:98` (`214px`): 2 mép ép nhiệt răng cưa kim loại trên/dưới (`.pk-foil-crimp-top`, `.pk-foil-crimp-bottom`), 2 khía chữ V hai bên đường xé (`.pk-tear-notch-left/right`), lớp ánh kim trụ `.pk-mylar-sheen` đáp ứng theo con trỏ qua `useCardTilt` (không chạy ngầm lúc nghỉ) và chồng 1–2 bóng gói phía sau khi hộp còn nhiều pack.
  - Bổ sung 7 bảng màu ánh kim, màu sáng trong túi (`glowColor` cố định theo từng bộ để không spoil độ hiếm) và ảnh Chase Card `_hires.png` cắt khung minh họa sắc nét cho từng bộ (`All-Star Vault`, `Pokémon 151`, `Crown Zenith`, `Evolving Skies`, `Prismatic Evolutions`, `Paldean Fates`, `Base Set 1999`), loại bỏ chữ kỹ năng thẻ chèn sau tiêu đề gói.
- **Chuỗi Xé Pack Tương Tác & Rút Thẻ Liền Mạch (`PokemonBoosterPack.tsx`, `PokemonPackUnboxer.tsx`, `pokemonAudio.ts`)**:
  - Khi kéo ngang qua đường xé (hoặc bấm `Xé pack ngay`): đường cắt ánh sáng `--pk-tear` chạy dọc theo tay kèm tiếng giấy bạc sột soạt (`playPackCrinkleTick`), tiếp nối liền mạch trong cùng một khối DOM: nắp ép nhiệt trên tách bật văng lên trên (`.pk-pack-lid`), 6 hạt tia foil bật một lần (`.pk-tear-sparkle`), miệng túi răng cưa phát sáng (`.pk-torn-top-lip`), rồi xấp 10 thẻ trồi thẳng từ bên trong túi lên trong khi thân gói tụt xuống biến mất (`sealed → ripping 520ms → drawing 680ms → revealing`).
  - Nâng cấp `playPackRipSound()` với lớp rách giấy bạc theo dải tần rộng, tiếng zip kim loại nhẹ và tiếng tách mép đáy túi.
- **Bố Cục Khung Pack Gọn Thoáng & Nổi Bật Lá Đắt Nhất (`PokemonPackUnboxer.tsx`, `About.tsx`)**:
  - Sửa lỗi cắt chữ `POKÉMON BOX` ở phần đầu hộp; tách ô chọn hộp bài rộng 100% kèm chấm màu bộ thẻ, đưa nhãn tổng số thẻ (`1.288 thẻ`) cân đối cạnh thanh 12 vạch pack và đặt sân khấu `.pk-stage-mat` hài hòa trên cả Light/Dark Mode.
  - Sửa điều kiện hiển thị để pack cuối `1/12` vẫn chạy đủ hiệu ứng xé và rút thẻ trước khi kết hộp; bổ sung viền nhấn `.pk-best-pull` và huy hiệu `★` cho lá giá trị cao nhất ở lưới kết quả 5×2.
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `TS_CSS_COMMENTS=0`, `UNUSED_CSS_CLASSES=[]` và `cmd /c "npm run verify"` thoát `0` (`PokemonPackUnboxer-*.js 59.82 kB | gzip: 16.15 kB`, `index-*.css 74.34 kB | gzip: 15.15 kB`).
  - Playwright `verify_pokemon_unboxer.py` (`device_scale_factor=2`) thoát `0` trên `1440×900`, `820×1180` và `375×812`: bìa `All-Star Mix` (`naturalWidth: 734`) & `SV: 151` (`naturalWidth: 733`) tải chuẩn, kéo ngang xé Pack #2 thành công (`dragRippedPack2: true`), kiểm chứng trực tiếp pha `ripping` & `drawing` liền mạch, `topPullCount: 1`, bảo toàn trọn vẹn chống chớp lộ thẻ / chống spoil Bộ sưu tập (`0 → 1 → 2 → 10`) và ảnh `_hires.png`, `0` lỗi console/page và `0` tràn ngang.

## 40. Lược Bớt Hiệu Ứng Nặng GPU Cho Thẻ Hero `PokemonProfileCard` (Mượt Trên Cả PC & Mobile)

- **Cắt bỏ triệt để các lớp sơn/blending nặng (`PokemonProfileCard.tsx`, `src/index.css`)**:
  - Xóa 6 lớp phủ đa tầng (`.pokemon-card-bezel-sheen`, `.pokemon-card-stock`, `.pokemon-card__shine--surface/art`, `.pokemon-card__sparkle--surface/art`, `.pokemon-card__glare--surface`), xóa bóng đổ động tính theo tọa độ con trỏ `--poke-frame-shadow-active`, xóa `background-blend-mode: hard-light`, `mix-blend-mode: color-dodge` / `overlay`, `filter()`, `mask-image: radial-gradient(...)`, và 5 tầng `preserve-3d` / `translateZ(12px)` (`.pokemon-card-layer-elevated`).
  - Xóa hoàn toàn 10 biến `--poke-*` và 12 lớp CSS không còn dùng khỏi `src/index.css` (`index-*.css` giảm `74.34 kB → 68.56 kB`, `index-*.js` giảm `115.22 kB → 112.67 kB`).
- **Tương tác thuần GPU compositor & Tách biệt PC vs Mobile (`PokemonProfileCard.tsx`)**:
  - Trên PC (`event.pointerType === 'mouse'`): giữ nghiêng nhẹ `±6deg` kèm 1 vệt sáng chéo `.pokemon-card__glare` thuần `transform: translate3d(...)` + `opacity` khi rê chuột; tự động gỡ `data-tilting` khi nghỉ để chữ & ảnh nét ở độ phân giải gốc (`transform: none`, 0 layer GPU chờ).
  - Trên thiết bị cảm ứng / di động (`pointerType !== 'mouse'`): bỏ qua toàn bộ vòng lặp `rAF` / xoay nghiêng để vuốt chạm và cuộn trang mượt tuyệt đối, giữ nguyên vẹn giao diện thẻ bạc `Long Hoàng EX` trên cả Light & Dark Mode.
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `TS_CSS_COMMENTS=0`, `UNUSED_CSS_CLASSES=[]`, `UNUSED_POKE_VARS=[]` và `cmd /c "npm run verify"` thoát `0`.
  - Playwright `verify_hero_card.py` (`device_scale_factor=2`) thoát `0` trên `1440×900` (Light/Dark/Hover) và `375×812` (Mobile touch): xác nhận `badBlend: []`, `badMask: []`, `badFilter: []`, PC hover nghiêng mượt (`data-tilting="true"`) rồi trả phẳng (`transform: "none"`) khi rời chuột, Mobile chạm không kích hoạt tilt (`transform: "none"`), đủ `5` chip dự án, `0` lỗi console/page và `0` tràn ngang.

## 41. Nâng Tầm 7 Vỏ Pack Sưu Tầm Kim Loại & Diệt Triệt Để 6 Lỗi Hiệu Ứng / Hoạt Ảnh Thừa

- **Nâng cấp diện mạo cả 7 vỏ Booster Pack chuẩn sưu tầm (`src/data/pokemonPack.ts`, `src/components/PokemonBoosterPack.tsx`, `src/index.css`)**:
  - Bổ sung `foilBaseRgb` riêng cho từng bộ thay cho lớp phủ đen chung để giữ trọn sắc kim loại đặc trưng của cả 7 dòng: *All-Star Vault* (Obsidian/Vàng), *Pokémon 151* (Đỏ Crimson/Vàng), *Crown Zenith* (Xanh Navy/Vàng), *Evolving Skies* (Xanh Ngọc Lục Bảo/Bạc Hà), *Prismatic Evolutions* (Thép Xám/Xanh Băng), *Paldean Fates* (Thép Sương/Xanh Trời), *Base Set 1999* (Đồng Cổ/Vàng).
  - Bổ sung khung chỉ kim loại `.pk-pack-foil-frame`, rãnh ép nhiệt lõm 3D trên/dưới `.pk-foil-crimp-top/bottom`, ánh trụ Mylar tĩnh `.pk-mylar-cylinder`, tấm bảng tên in nổi có đường kẻ & dấu kim cương (`POKÉMON TCG` + tiêu đề + `10 THẺ · BOOSTER PACK`), nhãn số thứ tự cân đối `PACK 01/12` và nút gợi ý `Kéo xé`.
  - Căn chỉnh lại `coverArtPosition`, `coverArtScale` và độ cắt nền foil (`55% → 61%`) cho từng bộ để **7/7 vỏ pack không lọt bất kỳ chữ kỹ năng / hộp luật thẻ nào**, đồng thời tôn rõ chân dung biểu tượng (Arceus VSTAR, Charizard 151, Giratina VSTAR, khuôn mặt Umbreon VMAX Moonbreon, Tera Umbreon ex, Shiny Bubble Mew, Holo Charizard 1999).
- **Loại bỏ toàn bộ 6 lỗi hiệu ứng & hoạt ảnh thừa (`PokemonBoosterPack.tsx`, `PokemonPackUnboxer.tsx`, `useCardTilt.ts`, `src/index.css`)**:
  - **Không còn hộp tối mồ côi lúc rút thẻ**: đồng bộ `.pk-pouch-interior` chạy chung `pk-body-drop-away` (`520ms`, trượt gọn `34px` và mờ dần `opacity: 0` mà không đè lên thanh trạng thái phía dưới) cùng `.pk-pack-body-shell`.
  - **Không kẹt thanh sáng `.pk-tear-seam-blade` sau khi kéo xé tay**: chỉ mount đường cắt sáng khi `(phase === 'sealed' && tearProgress > 0) || phase === 'ripping'`.
  - **Không giật lùi nắp pack 1 khung hình lúc chuyển từ kéo tay sang xé**: truyền `--pk-lid-x`, `--pk-lid-y`, `--pk-lid-rot` trực tiếp vào điểm `0%` của `@keyframes pk-lid-fly-off`.
  - **0.00px giật chiều cao hộp bài giữa 3 pha `sealed → ripping → drawing`**: khóa vùng nút đáy ở `min-h-[64px]` đồng nhất (`643.88px` không đổi qua mọi pha).
  - **Không chớp mờ trùng lặp ở thẻ #1 sau khi rút từ pack**: bỏ nhịp `cardTransition = 'entering'` (`opacity: 0.65`) sau pha `drawing → revealing` (giữ `data-transition="idle"`), đồng thời giới hạn vòng `.pk-reveal-burst` chỉ nổ cho thẻ `ultra` / `secret`.
  - **Thuần GPU compositor & tách biệt chuột PC / cảm ứng di động**: thay `.pk-mylar-sheen` vẽ lại `radial-gradient` mỗi khung hình bằng `.pk-mylar-glare` chạy `transform: translate3d(var(--pk-gx), var(--pk-gy), 0)` + `opacity` từ `useCardTilt.ts`, chỉ bật tilt 3D khi `pointerType === 'mouse'` và gọi `resetTiltImmediately()` sạch khi đổi pack / mở hộp mới.
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `TS_CSS_COMMENTS=0`, `UNUSED_PK_CLASSES=[]` và `cmd /c "npm run verify"` thoát `0` (`PokemonPackUnboxer-*.js 61.14 kB | gzip: 16.48 kB`, `index-*.css 69.48 kB | gzip: 14.32 kB`).
  - Playwright `verify_pokemon_unboxer.py` (`device_scale_factor=2`) kiểm chứng toàn bộ 7 ảnh bìa `_hires.png` (`600px`–`734px`), soi trực quan 7/7 vỏ pack sạch tuyệt đối chữ thẻ, xác nhận `heightSealed === heightRipping === heightDrawingPack2 === 643.88px` (`0.00px` jump), `drawingBladeCount: 0`, `drawingPouchAnim: "pk-body-drop-away"`, `firstCardTransition: "idle"`, `pack2Card1Transition: "idle"`, `.pk-mylar-glare` chạy `matrix(...)` thuần GPU, Mobile `packActiveRest: "false"`, bảo toàn chống spoil Bộ sưu tập (`0 → 1 → 2 → 10`) và chống chớp lộ mặt thẻ, `0` lỗi console/page và `0` tràn ngang trên `1440px`, `820px`, `375px`.

## 42. Nâng Cấp Chất Liệu 3D Phồng & Hiệu Ứng "Bọc Nhựa Bóng" Cho 7 Vỏ Booster Pack

- **Phom túi ép nhiệt chuẩn vật lý & độ phồng 3D (`PokemonBoosterPack.tsx`, `src/index.css`)**:
  - Chuyển góc bo vỏ gói và chồng gói nền từ bo tròn kiểu thẻ (`12px`) sang góc cắt máy ép nhiệt sắc nét **`5px`**, mở rộng 2 mép ép nhiệt răng cưa `.pk-foil-crimp-top/bottom` lên `18px` với gờ hàn nhựa bóng + rãnh răng cưa 3D sắc nét, và khớp màu khía xé chữ V (`.pk-tear-notch-left/right`) theo `var(--bg-surface)` hòa liền mạch trên cả Light & Dark Mode.
  - Nâng cấp `.pk-mylar-cylinder` (bo tối sâu hai bên sườn gói, viền sáng Fresnel nhựa bóng tại `2.4%` và `97.6%`, khối phồng trụ lệch tâm) kết hợp `.pk-pillow-bulge` (bóng kẹp lõm sát 2 mép ép nhiệt và gờ cong phản sáng trên/dưới) và bóng tiếp đất 3D `.pk-pack-ground-shadow` cùng đổ bóng đa tầng.
- **Lớp bọc nhựa bóng Cellophane & cặp vệt sáng ngược chiều thuần GPU (`PokemonBoosterPack.tsx`, `src/index.css`)**:
  - Bổ sung `.pk-plastic-wrap` và `.pk-plastic-wrap-lid` mô phỏng lớp màng bọc nhựa BOPP/Cellophane bóng loáng ngay cả ở trạng thái tĩnh (Mobile lẫn Desktop lúc nghỉ): 2 dải phản chiếu ánh sáng chéo sắc cạnh `118deg`, 4 điểm căng nếp nhựa ở 4 góc và viền khúc xạ nhựa trong (`inset` rim bevel), tuyệt đối không dùng `feTurbulence`, `backdrop-filter` hay vòng lặp chạy ngầm.
  - Khi rê chuột trên PC (`pointerType === 'mouse'`), tăng nhẹ góc nghiêng 3D lên `±13deg` kèm 2 vệt lóe nhựa di chuyển ngược chiều nhau thuần GPU compositor (`.pk-mylar-glare` và `.pk-mylar-glare-alt` chạy `transform: translate3d(...)` + `opacity`), tự ẩn ở `prefers-reduced-motion: reduce` và giữ phẳng hoàn toàn trên cảm ứng di động.
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `TS_CSS_COMMENTS=0`, `UNUSED_PK_CLASSES=[]`, `impeccable detect --json src/components/PokemonBoosterPack.tsx src/index.css` trả về `0` lỗi trên toàn bộ mã vỏ pack mới, và `cmd /c "npm run verify"` thoát `0` (`PokemonPackUnboxer-*.js 61.51 kB | gzip: 16.53 kB`, `index-*.css 71.87 kB | gzip: 14.82 kB`).
  - Playwright `verify_pokemon_unboxer.py` (`device_scale_factor=2`) kiểm chứng toàn bộ 7/7 vỏ pack + trạng thái nghiêng 3D hover (`shellTransform: matrix3d(...)`, `.pk-mylar-glare` `opacity: 0.52` và `.pk-mylar-glare-alt` `opacity: 0.3` trượt ngược chiều), `heightSealed = heightRipping = heightDrawingPack2 = 643.88px` (`0.00px` jump), `drawingBladeCount: 0`, `drawingPouchAnim: "pk-body-drop-away"`, `firstCardTransition: "idle"`, Mobile `packActiveRest: "false"`, `0` lỗi console/page và `0` tràn ngang trên `1440px`, `820px`, `375px`.

## 43. Rương Kho Báu Pixel Đồng Nền Trang Chính, 7 Vỏ Pack Chuẩn Pokémon TCG & Thay Thế Toàn Bộ Hiệu Ứng Chấm Tròn Trên Thẻ Bài

- **Rương kho báu GBA Pixel Art mở nắp đặt trực tiếp trên nền trang chính (`public/pokemon/chest-back.webp`, `chest-front.webp`, `PokemonPackUnboxer.tsx`, `PokemonBoosterPack.tsx`, `About.tsx`, `src/index.css`)**:
  - Xuất và tối ưu 2 lớp rương pixel tách nền trong suốt (`390×548`, `chest-back.webp` `20.4 KB`, `chest-front.webp` `8.5 KB` — tổng chỉ `28.9 KB`), áp `image-rendering: pixelated` sắc nét đồng bộ với hệ đồ họa GBA của portfolio.
  - Gỡ hoàn toàn khung `.folio-card` hộp text và `.pk-stage-mat` ở cột trái `#about` (`background-color: rgba(0, 0, 0, 0); border-width: 0px`) để chiếc rương pixel hòa trực tiếp lên nền trang chính ở cả Dark Mode (`#131314`) lẫn Light Mode (`#F8F9FA`), đặt xấp 1–3 pack lọt gọn bên trong khoang rương (pack chính ở giữa nhô cao rõ trọn huy hiệu bộ ngay phía trên ổ khóa đồng, mép đáy lồng sau thành rương; khi mở hết `12/12` pack hiện rương trống kèm nút mở hộp mới).
- **Nâng cấp 7 vỏ pack chuẩn ngoại hình Booster Pack Pokémon TCG chính thức (`src/data/pokemonPack.ts`, `PokemonBoosterPack.tsx`, `src/index.css`)**:
  - Tái dựng đầy đủ cấu tạo gói bài theo mẫu Pokémon TCG chính thức cho cả 7 bộ (*All-Star Vault*, *Pokémon 151*, *Crown Zenith*, *Evolving Skies*, *Prismatic Evolutions*, *Paldean Fates*, *Base Set 1999*): mép ép nhiệt vân kim cương ánh kim theo màu bộ, lỗ treo tròn `.pk-pack-peg-hole`, nhãn đỏ `POKÉMON TCG` + dòng phiên bản, `10 THẺ` + hộp mã bộ + `★ 1+ Holo`, logo `Pokémon` uốn vòm vàng viền xanh dương (`PokemonWordmark` dùng `useId()` chống trùng SVG ID), artwork Chase Card `_hires.png` cắt sạch 100% không lọt chữ thẻ, huy hiệu tên bộ in nổi kèm thẻ phân hạng (`VSTAR`, `EX`, `GG`, `VMAX`, `TERA`, `SHINY`, `1ST`) và lớp bọc nhựa bóng 3D + cặp vệt lóe thuần GPU.
- **Loại bỏ 100% chấm tròn trên hiệu ứng thẻ bài (`src/index.css`)**:
  - Xóa toàn bộ các lớp `radial-gradient(circle ...)` tạo chấm tròn trên `holo-cosmos`, `holo-v`, `holo-sir`, `holo-gold` (`DOT_GLITTER_BLOCKS=0`) và thay bằng sóng ánh kim cực quang lụa, lăng kính thép chéo sắc nét, vân khắc tinh thể chéo và ánh vàng 24K phay xước gương.
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `TS_CSS_COMMENTS=0`, `UNUSED_PK_CLASSES=[]`, `DOT_GLITTER_BLOCKS=0`, `impeccable detect --json` trả về `[]` và `cmd /c "npm run verify"` thoát `0` (`PokemonPackUnboxer-*.js 67.62 kB | gzip: 17.54 kB`, `index-*.css 75.40 kB | gzip: 15.40 kB`).
  - Playwright `verify_pokemon_unboxer.py` (`device_scale_factor=2`) kiểm chứng trọn vẹn trên `1440×900`, `820×1180`, `375×812`: `chestCheck: { rootBg: "rgba(0, 0, 0, 0)", rootBorderW: "0px", chestCount: 2, chestLoaded: true }`, 7/7 bìa `_hires.png` (`600px`–`734px`) soi trực quan sạch 100% chữ thẻ, `heightSealed = heightRipping = heightDrawingPack2 = 581.5px` (`0.00px` jump), `drawingBladeCount: 0`, `drawingPouchAnim: "pk-body-drop-away"`, `firstCardTransition: "idle"`, `dragRippedPack2: true`, Mobile `packActiveRest: "false"`, `0` lỗi console/page và `0` tràn ngang.

## 44. Tự Vẽ Tay Lại Rương Kho Báu Pixel Chuẩn Lưới `82×112` Siêu Nét (`chest-back.png`, `chest-front.png`)

- **Thay thế hoàn toàn ảnh rương WebP mờ cũ bằng sprite pixel art tự vẽ tay từng ô điểm ảnh (`public/pokemon/chest-back.png`, `chest-front.png`, `src/data/pokemonPack.ts`, `PokemonBoosterPack.tsx`, `About.tsx`, `src/index.css`)**:
  - Xóa 2 tệp WebP cũ (`chest-back.webp` `20.4 KB`, `chest-front.webp` `8.5 KB`) vốn bị nhòe từ ảnh JPEG nén không đồng lưới; vẽ tay hoàn toàn rương mới trên lưới điểm ảnh nguyên bản **`82×112`** với bảng màu chuyển sắc ấm/lạnh chuẩn 32-bit GBA/SNES (`Selout` viền đổ màu, gỗ óc chó vân ván, khung đồng vàng ánh nắng, góc ke chữ L đinh tán, 2 bản lề đồng, ổ khóa hình khiên đối xứng và lòng nắp lót nhung đỏ chần bông kèm dither Bayer 2×2).
  - Xuất lossless nguyên khối tỷ lệ `8×` (`656×896` px, hiển thị chuẩn nguyên `4×` tại `328×448` trên desktop) với tổng dung lượng chỉ **`13.5 KB`** (`chest-back.png` `8.75 KB` + `chest-front.png` `4.81 KB`, **nhẹ hơn 53%** so với bản WebP cũ mà sắc nét tuyệt đối từng ô pixel trên cả màn hình Retina/4K lẫn di động).
  - Căn lại tỷ lệ `.pk-chest-stage` (`aspect-ratio: 82 / 112`) và vị trí gói bài lồng khít sau mép gỗ trước rương (`row 76`).
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `TS_CSS_COMMENTS=0`, `UNUSED_PK_CLASSES=[]` và `cmd /c "npm run verify"` thoát `0` (`PokemonPackUnboxer-*.js 67.63 kB | gzip: 17.54 kB`, `index-*.css 75.42 kB | gzip: 15.41 kB`).
  - Playwright `verify_pokemon_unboxer.py` (`device_scale_factor=2`) kiểm chứng trọn vẹn trên `1440×900` (Dark/Light/Hover), `820×1180`, `375×812`: soi ảnh thực tế từng ô pixel rương sắc nét tuyệt đối không viền mờ trên cả nền tối lẫn nền sáng, `heightSealed = heightRipping = heightDrawingPack2 = 568.62px` (`0.00px` jump), `chestLoaded: true`, `drawingBladeCount: 0`, `firstCardTransition: "idle"`, `0` lỗi console/page và `0` tràn ngang.

## 45. Thay Toàn Bộ 7 Vỏ Pack Bằng Ảnh Vỏ Booster Pack Pokémon TCG Chính Hãng Ngoài Đời (`public/pokemon/packs/*.webp`)

- **15 ảnh vỏ gói chính hãng tối ưu cục bộ (`public/pokemon/packs/`, `src/data/pokemonPack.ts`)**:
  - Đối chiếu và thay toàn bộ vỏ CSS tự dựng trước đó bằng 15 ảnh chụp vỏ pack in thật ngoài đời từ kho mã nguồn mở `github.com/1niceroli/ptcg-assets`, nén WebP chuẩn `720p` sắc nét tự host cục bộ (~65–101 KB/ảnh, chỉ tải 1–3 ảnh của hộp đang chọn):
    - *All-Star Mix*: **Mẫu A — `MEGA Dream ex (M2a)`** (High Class 10 thẻ), xòe kèm *Pokémon 151* & *Evolving Skies*.
    - *Scarlet & Violet: 151*: vỏ trắng bạc Mew nguyên bản.
    - *Crown Zenith + Gallery*: vỏ xanh-vàng Zacian & Zamazenta nguyên bản.
    - *Evolving Skies* (`swsh7`), *Prismatic Evolutions* (`sv8pt5`), *Paldean Fates* (`sv4pt5`), *Base Set 1999* (`base1`): đủ **3 mẫu vỏ thật** cho mỗi bộ, xòe 3 mẫu khác nhau trong rương và tự xoay mẫu thật theo từng pack (`#01 → #12`).
- **Hiệu ứng vỏ cong thật, màng bóng nhựa theo viền & tách mép xé `9%` (`PokemonBoosterPack.tsx`, `src/index.css`)**:
  - Loại bỏ ~780 dòng mã CSS/TSX vỏ pack giả cũ (`index-*.css` giảm còn `69.47 kB` / gzip `14.25 kB`; `PokemonPackUnboxer-*.js` giảm còn `56.85 kB` / gzip `15.29 kB`).
  - Dùng `drop-shadow` theo đúng viền alpha cong thắt eo của vỏ thật (bỏ khung chữ nhật), dùng `mask-image` khóa lớp bóng nhựa `.pk-real-plastic` cùng cặp vệt lóe chuột PC thuần GPU (`.pk-mylar-glare` / `.pk-mylar-glare-alt`) đúng trên bề mặt vỏ, và tách khớp `0.00px` dải mép ép nhiệt `9%` phía trên logo `Pokémon` (`draggable={false}` + chặn `dragstart` để kéo xé mượt trên mọi trình duyệt).
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `TS_CSS_COMMENTS=0`, `UNUSED_PK_CLASSES=[]`, `DOT_GLITTER_BLOCKS=0` và `cmd /c "npm run verify"` thoát `0`.
  - Playwright `verify_real_packs_live.py` (`device_scale_factor=2`) kiểm chứng đủ 7/7 hộp bài (`382–416 × 720`), xác nhận xoay mẫu thật (`base1-charizard.webp → base1-blastoise.webp`), kéo xé trực tiếp trên vỏ thật, `heightSealed = heightRipping = 568.62px` (`0.00px` jump), `0` lỗi console/page, `0` request lỗi và `0` tràn ngang trên `1440px`, `820px`, `375px` (Dark & Light Mode).

## 46. Kiểm Định Đủ 100% Thẻ 7 Bộ Hiện Có & Bổ Sung 7 Bộ Pack Mới Đang Hot / Cực Hiếm (Nâng Lên 14 Hộp · 2.828 Thẻ)

- **Kiểm định kho thẻ 7 bộ hiện tại (`public/data/pokemon-cards.json`)**:
  - Đối chiếu 1:1 với dữ liệu chính thức `PokemonTCG/pokemon-tcg-data`: cả 6 bộ riêng lẻ đều **đủ 100% không thiếu bất kỳ lá bài nào** (*SV: 151* `207/207`, *Crown Zenith + Galarian Gallery* `160 + 70 = 230/230`, *Evolving Skies* `237/237`, *Prismatic Evolutions* `180/180`, *Paldean Fates* `245/245`, *Base Set 1999* `102/102`), và vá nốt 1 lá duy nhất thiếu giá của Base Set (`base1-8` Machamp → `$96.52` TCGCSV).
- **Bổ sung 7 bộ pack chính hãng đang hot (2024–2026) & cực hiếm sưu tầm (19 ảnh WebP `720p` mới trong `public/pokemon/packs/`, `src/data/pokemonPack.ts`)**:
  - **Nhóm đang hot 2024–2026**: *Mega: Ascended Heroes* (`me2pt5`, 295 thẻ — Mega Gengar ex, Mega Dragonite ex, Pikachu ex; hỗ trợ nguồn ảnh `images.scrydex.com`), *Mega: Phantasmal Flames* (`me2`, 130 thẻ — 3 vỏ xoay Mega Charizard X · Mega Gengar · Mega Lopunny), *SV: Destined Rivals* (`sv10`, 244 thẻ — 3 vỏ xoay Team Rocket's Mewtwo · Cynthia's Garchomp · Ethan's Ho-Oh), *SV: Surging Sparks* (`sv8`, 252 thẻ — 3 vỏ xoay Stellar Pikachu · Latias · Alolan Exeggutor).
  - **Nhóm sưu tầm cực hiếm / grail**: *Lost Origin + Gallery* (`swsh11` + `swsh11tg`, 247 thẻ — 3 vỏ xoay Origin Giratina · Hisuian Zoroark · Radiant Gardevoir), *Team Up · 2019* (`sm9`, 198 thẻ — 3 vỏ xoay Pikachu & Zekrom · Gengar & Mimikyu · Eevee & Snorlax, chase Latias & Latios GX), *Skyridge · 2003* (`ecard3`, 182 thẻ — 3 vỏ xoay Ho-Oh · Kabutops · Vaporeon, bộ WotC cổ hiếm nhất với Crystal Charizard / Celebi).
  - Bổ sung mapping hiệu ứng foil cho các độ hiếm mới (`Mega Attack Rare` → `holo-sir`, `Mega Hyper Rare` → `holo-gold`, `Rare Prism Star` → `holo-v`, `Rare` dòng `me*` → `holo-regular`, `Rare Holo` dòng `ecard3` → `holo-cosmos`). Tổng kho dữ liệu nâng từ `1.288` lên **`2.828` thẻ thật** (chỉ `149.8 KB` JSON nén `v: 2`).
- **Kiểm chứng sau chỉnh sửa cuối cùng**:
  - `TS_CSS_COMMENTS=0`, `cmd /c "npm run verify"` thoát `0` (`PokemonPackUnboxer-*.js 58.81 kB | gzip: 15.80 kB`).
  - Playwright `verify_real_packs_live.py` (`device_scale_factor=2`) kiểm chứng đủ **14/14 hộp bài** đúng số lượng thẻ từng bộ, tải ảnh mặt thẻ `me2pt5` từ Scrydex (`733×1024`), xác nhận xoay mẫu thật trên bộ mới (`me2-charizard.webp → me2-gengar.webp`), kéo xé `0.00px` jump, `0` lỗi console/page, `0` request lỗi và `0` tràn ngang trên `1440px`, `820px`, `375px`.

## 47. Tối Ưu Tốc Độ Tải Thẻ Pokémon Trên Di Động & PC (Giảm ~15–20× Dung Lượng Ảnh)

- **Nguyên nhân gốc gây chậm trên di động**:
  - Trước đây mọi thẻ bài (kể cả 10 thẻ preload đồng loạt khi xé pack, lưới thu nhỏ 5×2 và 24 thẻ trong Bộ sưu tập) đều tải trực tiếp ảnh PNG gốc chưa nén `733×1024` (`530–800 KB`/thẻ, tương đương `6–8 MB` cho 1 pack và `~15 MB` khi mở Bộ sưu tập), gây nghẽn băng thông 4G khiến thẻ #1 phải chờ các thẻ phía sau.
- **Giải pháp tối ưu toàn diện (`index.html`, `src/data/pokemonPack.ts`, `PokemonPackUnboxer.tsx`, `PokemonPackModals.tsx`, `src/index.css`)**:
  - **Nén WebP 3 cấp qua CDN Cloudflare Edge (`wsrv.nl`) kèm tự động dự phòng về link gốc (`'webp' → 'direct' → 'fallback'`)**:
    - `thumb` (`w=220, q=76`, `~12–23 KB`/thẻ — nhẹ hơn **~40×**): dùng cho lưới **Bộ sưu tập** và các thẻ chưa lật khi bấm **Lật nhanh** sang lưới kết quả 5×2.
    - `card` (`w=440, q=80`, `~45–80 KB`/thẻ — nét chuẩn 2× Retina trên khung `224px`, nhẹ hơn **~10×**): dùng cho sân khấu lật bài và tái sử dụng ngay từ bộ nhớ RAM ở lưới 5×2 không tải lại.
    - `inspect` (`w=640, q=86`, `~85–130 KB`/thẻ): dùng cho hộp **Phóng to 3D**.
  - **Hàng đợi nạp trước ưu tiên tối đa 2 luồng (`pumpPreloadQueue` + `img.decode()`)**: khi xé pack, chỉ nạp thẻ #1 & #2 trước trong `1.2s` hoạt ảnh xé (không bóp băng thông), tự đẩy thẻ hiện tại + 2 thẻ kế tiếp lên đầu hàng đợi khi lật, và hủy ngay hàng đợi cũ khi chuyển sang tổng kết/hộp mới.
  - **Kết nối sớm `preconnect`** (`wsrv.nl`, `images.pokemontcg.io`, `dns-prefetch` `images.scrydex.com`) trong `index.html` và khung chờ mượt `.pk-card-skeleton` khi mạng quá chậm.
- **Kiểm chứng thực tế (`verify_card_speed.py`)**:
  - Mobile `375px` (`has_touch=True, is_mobile=True`): thẻ #1 lật hiển thị sẵn trong **`111ms`** (`440×615` WebP nét căng), mở đủ cả 10 thẻ tổng kết trong **`683ms`** với tổng lưu lượng chỉ **`334.5 KB`** (giảm ~20× so với `~6–8 MB` trước đây), hộp Phóng to 3D dùng `w=640` WebP, Bộ sưu tập dùng `w=220` WebP.
  - Kiểm thử giả lập chặn `wsrv.nl` (`route.abort()`): tự động chuyển mạch dự phòng về `images.pokemontcg.io` mượt mà, `0` ảnh vỡ, `0` lỗi console/page, `UNUSED_PK_CLASSES=[]`, `npm run verify` thoát `0`.

## 48. Khôi Phục Lớp Foil Thẻ (`z-index`) & Nâng Cấp Âm Thanh Mở Pack Gói A (Foley Thực Tế CC0 + Chuông Studio)

- **Sửa lỗi lớp `<img>` đè mất hiệu ứng foil thẻ (`src/index.css`, Commit `08e1e75`)**:
  - Đặt cố định `z-index: 10 / 11 / 12` cho `.pk-holo-foil`, `.pk-holo-glitter` và `.pk-holo-glare` để luôn nằm phía trên ảnh thẻ `z-index: 1` ở cả sân khấu lật bài lẫn hộp Phóng to 3D.
- **Triển khai Bộ Âm Thanh Gói A (Foley Thực Tế + Chuông Studio, 100% CC0 Public Domain)**:
  - Xuất chuẩn hóa, cắt sạch khoảng lặng đầu (`leadTrim`) và nén về **9 tệp MP3 `128 kbps`** tương thích 100% **iPhone Safari, Android và PC** trong `public/pokemon/sfx/` (tổng dung lượng chỉ **`98.4 KB`**):
    - `pack-rip.mp3` (`4.9 KB`, BigSoundBank CC0 *Torn Paper #3*): tiếng xé mép vỏ pack sắc gọn tức thì.
    - `pack-crinkle.mp3` (`5.7 KB`, Kenney RPG CC0 *cloth2*): tiếng rột xoạt khi kéo đường xé (tăng cao độ theo tiến độ kéo).
    - `card-takeout.mp3` (`6.5 KB`, Kenney Casino CC0 *cardTakeOutPackage1*): tiếng rút xấp 10 thẻ ra khỏi gói.
    - `card-flip-1.mp3` (`3.7 KB`) & `card-flip-2.mp3` (`2.0 KB`, Kenney Casino CC0 *cardSlide5* & *cardSlide1*): tiếng lật thẻ giấy thật đảo luân phiên kèm biến thiên cao độ tự nhiên.
    - `card-fan.mp3` (`11.4 KB`, Kenney Casino CC0 *cardFan1*): tiếng xòe 10 thẻ khi bấm **Lật nhanh**.
    - `rare-chime.mp3` (`28.2 KB`, *sfx-audio-library* Vibraphone Triad CC0), `ultra-chime.mp3` (`14.7 KB`, Kenney *jingles_STEEL10*), `secret-chime.mp3` (`21.2 KB`, Kenney *jingles_STEEL02*).
  - Nâng cấp `src/utils/pokemonAudio.ts` & `src/components/PokemonPackUnboxer.tsx`: giải mã sẵn đa âm qua `AudioContext.decodeAudioData()` (`preloadPokemonSfx()`), phát không độ trễ chồng âm mượt và tự động dự phòng bằng Web Audio synth nếu mạng chậm.
- **Kiểm chứng**: `npm run verify` thoát `0`, Playwright xác nhận nạp đủ `9/9` tệp MP3 (`HTTP 200`, `98.4 KB`), chạy trọn chu trình xé pack → lật thẻ → xòe nhanh không lỗi console/page và `0` tràn ngang trên `375px`.






