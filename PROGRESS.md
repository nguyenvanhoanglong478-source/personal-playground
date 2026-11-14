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

## 28. Tắt Viền Phát Sáng Khi Bấm Vé & Khôi Phục Nhũ Kim Loại Silver/Platinum (`AboutFoilPass`)
- **Tắt glow ngoài khi tương tác (`src/index.css`)**:
  - Xóa bỏ rule `.about-foil-stage[data-interacting='true'] .about-foil-canvas` dùng `--accent-glow` gây quầng sáng viền quanh thẻ mỗi khi bấm hoặc kéo.
  - Giữ cố định bóng đổ mềm tự nhiên `filter: drop-shadow(0 14px 24px rgba(0, 0, 0, 0.22));` trên `.about-foil-canvas` cho mọi trạng thái tĩnh và tương tác.
- **Khôi phục ánh nhũ kim loại Silver / Platinum sắc nét không phủ sương cầu vồng (`src/components/AboutFoilPass.tsx`)**:
  - Bổ sung uniform `uBend` (`mesh.bendIntensity`) trong `FRAG_SHADER_SRC` và `GlContextState.locs.uBend`, tính các dải nhũ bạch kim hẹp (`pow(max(0.0, sin(foilPhase * 7.5)), 4.0)` & `pow(max(0.0, cos(foilPhase * 13.0 + 1.1)), 6.0)`, `specPower = mix(28.0, 68.0, curvature)`) dựa trên `normalTilt`, `curvature`, `fresnel`, `uBend` và dải header `vUv.y < 0.085`.
  - Giảm cường độ nhũ còn `0.25` bên trong khung tranh Onsen Capybara (`vUv.x ∈ [0.315, 0.685]`, `vUv.y ∈ [0.113, 0.340]`) và áp dụng `inkContrastKeep` để bảo toàn độ sắc nét của chữ đậm trên nền giấy Light Mode.
- **Kiểm chứng (`task-5128` + build + Playwright)**:
  - `cmd /c "npm run verify"` thoát `0` (`dist/assets/AboutFoilPass-CX3g9nWQ.js 41.06 kB`, `dist/assets/index-B0KqgGoL.css 61.06 kB`).
  - Playwright ở cả Dark Mode & Light Mode (Desktop `1440×900` & Mobile `375×812`): `idle_filter === drag_filter === "drop-shadow(rgba(0, 0, 0, 0.22) 0px 14px 24px)"`, xác nhận ánh nhũ bạc sắc nét khi nghiêng/uốn vé, lật mặt thành công, không tràn ngang và `0` lỗi console/page.
