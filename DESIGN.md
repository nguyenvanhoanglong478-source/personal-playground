# DESIGN.md — Long Hoàng Portfolio (Google Modern Gradient)

## 1. Concept & Hệ Thống Thiết Kế

Trang cá nhân của **Long Hoàng** sử dụng phong cách **Editorial & Staggered Showcase** kết hợp bảng hiệu ứng **Google Modern Gradient** (hào quang nền, viền phát quang, hiệu ứng hover và viền nút bấm chuyển động) cùng **chữ viết đơn sắc trung tính** tuyệt đối trên cả **Light Mode** và **Dark Mode**.

### Kiến trúc Bố cục Biên tập
- **Editorial Cover Hero**: Tên `Long Hoàng.` cỡ lớn lệch tâm làm neo thị giác bên trái, cụm khẩu hiệu in nghiêng và phần dẫn lùi lề kèm đường kẻ phân cách mảnh, cân bằng đối trọng với thẻ ảnh đại diện đặt thấp hơn và có hiệu ứng lơ lửng + parallax nhẹ khi cuộn.
- **Architectural Columns (`#experience`)**: Cột trái chứa tiêu đề lớn và chỉ mục neo được ghim mượt (`position: sticky`) khi cuộn trên màn hình rộng; cột phải trình bày 4 nhóm kinh nghiệm dọc theo trục kẻ mảnh.
- **Staggered Zig-Zag Showcase (`#projects`)**: 6 dự án bố trí so le trái/phải theo nhịp Zig-Zag (`01, 03, 05` lệch trái; `02, 04, 06` lệch phải và hạ thấp độ cao kèm parallax cuộn), tích hợp số thứ tự khổng lồ (`01`–`06`) dạng watermark đơn sắc mờ ở góc mỗi thẻ, giữ nguyên 3D Tilt và viền sáng Google khi di chuột.

## 2. Kiểu Chữ (Typography)

Hỗ trợ trọn vẹn bảng mã dấu Tiếng Việt:
- **Display & Editorial Serif**: `Newsreader` (Google Fonts) — dùng cho tiêu đề chính và các đề mục lớn.
- **UI & Body Sans**: `Be Vietnam Pro` (Google Fonts) — tối ưu cho văn bản Tiếng Việt ở mọi kích thước màn hình.
- **Code & Technical Mono**: `JetBrains Mono` (Google Fonts) — dùng cho chỉ mục, nhãn công nghệ, nút GitHub và đường dẫn kho lưu trữ.

## 3. Bảng Màu Kép & Dải Màu Google Signature Gradients

Toàn bộ token màu được khai báo tập trung tại `:root`, `html[data-theme='light']` và `html[data-theme='dark']` trong `src/index.css` với chuyển màu mượt mà `360ms cubic-bezier(0.22, 1, 0.36, 1)`.

### Dải Màu Chủ Đạo Google Signature
- `--google-blue`: `#4285F4`
- `--google-purple`: `#9B72CB`
- `--google-coral`: `#D96570`
- `--google-red`: `#EA4335`
- `--google-yellow`: `#FBBC04`
- `--google-green`: `#34A853`
- Áp dụng **Google Aura Mesh Gradient** cho nền trang, viền phát quang (ảnh đại diện ở Hero/About, gạch chân mục điều hướng, hào quang và biểu tượng ngôi sao trừu tượng trên `BrandLogo`), hiệu ứng khi di chuột trên thẻ dự án và **viền xoay conic-gradient kèm hào quang ngoài** cho toàn bộ nút bấm dạng viên thuốc kính mờ (`rgba(255, 255, 255, 0.85)` Light / `rgba(30, 31, 32, 0.85)` Dark, tuyệt đối không tô đặc ruột nút).
- Toàn bộ hệ thống chữ viết (tên **Long Hoàng**, tiêu đề chính, tiêu đề thẻ dự án, mô tả, nhãn, liên kết và chữ trên nút `#1F1F1F` / `#E3E3E3`) chuyển hoàn toàn về **màu đơn sắc trung tính**, tuyệt đối không dùng chữ màu hoặc Text Gradient.

### Chế độ Sáng (Google Workspace / Material You)
- `--bg-primary`: `#F8F9FA` kết hợp các quầng Pastel Mesh Gradient nhẹ ở nền
- `--bg-surface`: `rgba(255, 255, 255, 0.88)` kính mờ kèm đổ bóng mềm nhiều sắc độ
- `--bg-elevated`: `#F0F4F9`
- `--text-primary`: `#111111` (đen tuyền cho tiêu đề, tên, từ khóa)
- `--text-secondary`: `#4B4E53` (xám trung tính cho nội dung)
- `--text-faint`: `#575B62` (chú giải phụ, đạt WCAG AA)

### Chế độ Tối (Google Gemini Dark)
- `--bg-primary`: `#131314` kết hợp quầng sáng Mesh Gradient Google phía sau
- `--bg-surface`: `rgba(30, 31, 32, 0.82)` kính mờ trên nền `#1E1F20`
- `--bg-elevated`: `#282A2C`
- `--text-primary`: `#F5F5F7` (trắng ngà tinh khiết cho tiêu đề, tên, từ khóa)
- `--text-secondary`: `#C4C7C5` (xám nhạt cho nội dung)
- `--text-faint`: `#A6ACB2` (chú giải phụ, đạt WCAG AA)

## 4. Chuyển Động & Kiểm Chứng

- Con trỏ chuột hệ thống nguyên bản được giữ trọn vẹn trên toàn trang (không dùng custom cursor, không dùng spotlight theo con trỏ); toàn bộ thẻ `a[href]`, `button`, `[role='button']` hiển thị `cursor: pointer`. Root `src/main.tsx` bọc `<MotionConfig reducedMotion="user">`, kết hợp inline script trong `index.html` đồng bộ `data-theme` / `lang` trước lần vẽ đầu tiên để loại bỏ nháy sáng/tối.
- Toàn bộ nút bấm tương tác (`.folio-btn-primary`, `.folio-btn-secondary`, `.folio-btn-compact`, `.folio-btn-icon`, `.google-btn-github`) đứng yên tĩnh lặng ở trạng thái mặc định với nền kính mờ `backdrop-filter: blur(14px)` và viền tĩnh mảnh `--btn-border-static`. Chỉ khi di chuột trực tiếp vào từng nút (`:hover`), viền conic-gradient Google xoay theo `--btn-angle`, hào quang ngoài (`.google-pill-aura`) và hiệu ứng nâng nhẹ `translateY(-2px) scale(1.015)` mới xuất hiện rồi chuyển mượt về trạng thái tĩnh khi rời chuột.
- Bento Grid 6 dự án hỗ trợ nghiêng 3D khi hover thẻ và viền sáng Google (`.google-gradient-hover-border`).
- Nền trang dùng **Google Aura Mesh** CSS thuần (`.google-aura-backdrop`), giữ marquee ở `SkillsMatrix.tsx` tự tạm dừng GPU khi ngoài khung nhìn (`IntersectionObserver`) và tự dừng khi `prefers-reduced-motion: reduce`.
- Biểu tượng thương hiệu (`BrandLogo.tsx` & `public/favicon.svg`) thiết kế theo phong cách **Abstract Star Emblem** lấy cảm hứng từ ngôi sao 4 cánh đường cong lõm của Gemini kết hợp tia sao phụ ở góc trên phải (`viewBox="0 0 48 48"`, `aria-label="Long Hoàng Logo"`); hai khối sao dùng dải **Google Modern Gradient** (`#4285F4` -> `#9B72CB` -> `#D96570` -> `#FBBC04` -> `#34A853`) với ID riêng biệt (`useId()`), `favicon.svg` đặt trên nền bo góc tối `#131314`, giữ hiệu ứng hào quang & xoay nhẹ khi di chuột (`group-hover`) và tôn trọng `prefers-reduced-motion: reduce`.
- **Thẻ Bài Pokémon TCG Silver Holo EX 3D (`src/components/PokemonProfileCard.tsx`, `Hero.tsx`, `src/index.css`)**: Thay thế khung hồ sơ cũ ở cột phải Hero bằng thẻ sưu tầm chuẩn 5 tầng giải phẫu lấy cảm hứng từ `simeydotme/pokemon-cards-css` (khung bạc kim loại `18px`, `.pokemon-stage-pill` với socket `BrandLogo` + nhãn `BASIC`, tên `Long Hoàng` kèm huy hiệu vát `EX`, `HP 2007` + `PrismTypeOrb`, khung ảnh kim loại `aspect-[4/3]` ưu tiên tải ảnh `fetchPriority="high" decoding="async"` kèm thanh `.pokemon-dex-ribbon` `NO. 2007 • ...`, vùng chiêu thức `5 DỰ ÁN NỔI BẬT` + tỷ lệ `5 / 6` với 2 `ColorlessEnergyOrb` và 5 chip `.pokemon-project-chip` trỏ thẳng kho GitHub, hàng `.weakness / resistance / retreat` (`×2`, `-30`), và chân thẻ `Illus. Long Hoàng` / `001/006 ★ SAR`). Vùng `.pokemon-card-perspective` (`perspective: 900px`) kết hợp `useMotionValue` + `useSpring` (`stiffness: 240, damping: 24, mass: 0.9`) xoay `--rotate-x` / `--rotate-y` (`±12deg` chuột desktop, `±9deg` cảm ứng) và `--card-scale` (`1.018` / `1.012`), hòa trộn `.pokemon-card__shine`, `.pokemon-card__sparkle` và `.pokemon-card__glare` riêng cho **Dark Mode (Obsidian / Silver)** và **Light Mode (Platinum / Silver)**; toàn bộ chữ giữ màu đơn sắc trên lớp nổi `translateZ(12px)`, tắt hoàn toàn dưới `prefers-reduced-motion: reduce`.
- **Tối ưu Tương tác Cảm ứng & Thiết bị Di động (`PokemonProfileCard.tsx`, `Navbar.tsx`, `ProjectsBento.tsx`, `tailwind.config.js`, `src/index.css`)**:
  - `.pokemon-card-stage` và `.pokemon-card-rotator` đặt `touch-action: pan-y`, `-webkit-user-select: none; user-select: none`, `-webkit-touch-callout: none` để vuốt cuộn trang dọc không bị giật hay bôi đen chữ; vòng đời `Pointer Events` thống nhất (`onPointerEnter`, `onPointerDown`, `onPointerMove`, `onPointerUp`, `onPointerCancel`, `onPointerLeave` kèm `window` `pointerup`/`pointercancel` chống kẹt góc nghiêng) và bỏ qua khi chạm trực tiếp vào thẻ `<a>` chip dự án (`target?.closest('a')`).
  - Trên thiết bị cảm ứng (`@media (hover: none) and (pointer: coarse)`), thẻ kích hoạt **Ambient Holo Shimmer (`pokemon-ambient-shimmer`, `9s`)** nhẹ ở trạng thái nghỉ (`data-interacting="false"`), tự tạm dừng khi người dùng chạm xoay (`data-interacting="true"`) và tắt hẳn dưới `prefers-reduced-motion: reduce`.
  - Chống kẹt trạng thái Hover (`Sticky Hover`) bằng `future: { hoverOnlyWhenSupported: true }` trong `tailwind.config.js`, bọc các quy tắc `:hover` trong `@media (hover: hover) and (pointer: fine)`, giới hạn `TiltProjectCard` chỉ phản ứng với `pointerType === 'mouse'`, đồng thời bổ sung phản hồi xúc giác `:active` (`transform: scale(0.97)` kèm viền/hào quang tức thời khi nhấn giữ) và `-webkit-tap-highlight-color: transparent; touch-action: manipulation`.
  - Mở rộng vùng chạm tối thiểu `44×44px` trên `@media (pointer: coarse), (max-width: 1023px)` cho toàn bộ nút bấm (`.folio-btn-icon`, `.google-btn-github`, `--control-height-sm: 44px`), liên kết thương hiệu `Navbar` (`min-h-[44px]`) và 5 `.pokemon-project-chip` (`min-height: 44px`, khoảng cách `gap-2`).
- **Tờ Vé Định Danh Hologram Uốn Dẻo Tương Tác (`src/components/AboutFoilPass.tsx`, `src/components/aboutPassTextures.ts`, `src/components/About.tsx`)**:
  - Tải trễ bằng `React.lazy` + `Suspense` (kèm placeholder đúng tỉ lệ `aspect-[360/560]` giữ **CLS = 0**) ở cột trái `02. Về tôi` (`lg:col-span-4`), giữ nguyên 100% cột bên phải (5 đoạn văn giới thiệu và khung `Nguyên tắc làm việc`).
  - **Mặt trước & Mặt sau (`2x Retina` `640×1040`)**: Mặt trước gồm dải Hologram `02. VỀ TÔI // CREATOR PASS` (`ADMIT ONE`), ảnh chân dung `./avatar.jpg` (có `img.onerror` fallback chữ lồng `LH`) kèm khung bát giác lăng kính, bảng thông số 2×2 (`HỌ TÊN`, `NĂM SINH`, `NGÔN NGỮ`, `LĨNH VỰC`), mã QR 11×11 và mã vạch `NO. 2007-LH-02`; Mặt sau hiển thị sơ đồ Radar tọa độ đồng tâm cho 4 nguyên tắc làm việc và con dấu tròn Hologram ngôi sao 4 cánh (`paintStarSeal`, `VERIFIED PRODUCT MAKER // 2007`).
  - **Khóa `<canvas>` WebGL Cố Định Trong `slotRef` & Vật lý 3D Verlet + PBD (`24×36`)**: Canvas `absolute inset-0` đặt trực tiếp trong `<div ref={slotRef}>` (`aspect-[360/560] overflow-hidden`), kích thước cập nhật qua `ResizeObserver`, lưới 864 đỉnh (Thân 28 hàng + Cuống 8 hàng) với PBD thích ứng (`16` iterations khi kéo/biến dạng lớn, `8` iterations khi thả hồi phục nhẹ), chia 2 vùng chạm trên mobile (`77.5% touch-pan-y` cho thân vé với bộ lọc giữ có chủ đích, `22.5% touch-none` cho cuống dưới để kéo xé theo đường đục lỗ `STUB_SPLIT_RATIO = 0.775`), điều khiển bằng 2 nút (`Lật mặt vé` / `Khôi phục vé`).
  - **Tự Động Đồng Bộ Chất Liệu Theo Theme**: `Silver Holo` trên Light Mode và `Obsidian Gold` trên Dark Mode qua `MutationObserver` (`data-theme` / `class`); dừng vòng lặp rAF khi ngoài khung nhìn (`IntersectionObserver`), nút bấm `>= 44×44px` trên mọi màn hình và tôn trọng `prefers-reduced-motion: reduce`.
