# DESIGN.md — Long Hoàng Portfolio (Google Modern Gradient)

## 1. Concept & Hệ Thống Thiết Kế

Trang cá nhân của **Long Hoàng** sử dụng phong cách **Editorial & Staggered Showcase** kết hợp bảng hiệu ứng **Google Modern Gradient** (hào quang nền, viền phát quang, hiệu ứng hover và viền nút bấm chuyển động) cùng **chữ viết đơn sắc trung tính** tuyệt đối trên cả **Light Mode** và **Dark Mode**.

### Kiến trúc Bố cục Biên tập
- **Editorial Cover Hero**: Tên `Long Hoàng.` cỡ lớn lệch tâm làm neo thị giác bên trái, cụm khẩu hiệu in nghiêng và phần dẫn lùi lề kèm đường kẻ phân cách mảnh, cân bằng đối trọng với thẻ ảnh đại diện đặt thấp hơn và có hiệu ứng lơ lửng + parallax nhẹ khi cuộn.
- **Architectural Columns (`#experience`)**: Cột trái chứa tiêu đề lớn và chỉ mục neo được ghim mượt (`position: sticky`) khi cuộn trên màn hình rộng; cột phải trình bày 4 nhóm kinh nghiệm dọc theo trục kẻ mảnh.
- **Staggered Zig-Zag Showcase (`#projects`)**: 5 dự án GitHub bố trí so le trái/phải theo nhịp Zig-Zag (`01, 03, 05` lệch trái; `02, 04` lệch phải và hạ thấp độ cao kèm parallax cuộn), tích hợp số thứ tự khổng lồ (`01`–`05`) dạng watermark đơn sắc mờ ở góc mỗi thẻ, giữ nguyên 3D Tilt, radial spotlight và viền sáng Google khi di chuột.

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
- Áp dụng **Google Aura Mesh Gradient** cho nền trang, viền phát quang (ảnh đại diện ở Hero/About, gạch chân mục điều hướng, hào quang và tinh tú đỉnh đầu trên biểu tượng **Linh thú Capybara**), hiệu ứng khi di chuột trên thẻ dự án và **viền xoay conic-gradient kèm hào quang ngoài** cho toàn bộ nút bấm dạng viên thuốc kính mờ (`rgba(255, 255, 255, 0.85)` Light / `rgba(30, 31, 32, 0.85)` Dark, tuyệt đối không tô đặc ruột nút).
- Toàn bộ hệ thống chữ viết (tên **Long Hoàng**, tiêu đề chính, tiêu đề thẻ dự án, mô tả, nhãn, liên kết và chữ trên nút `#1F1F1F` / `#E3E3E3`) chuyển hoàn toàn về **màu đơn sắc trung tính**, tuyệt đối không dùng chữ màu hoặc Text Gradient.

### Chế độ Sáng (Google Workspace / Material You)
- `--bg-primary`: `#F8F9FA` kết hợp các quầng Pastel Mesh Gradient nhẹ ở nền
- `--bg-surface`: `rgba(255, 255, 255, 0.88)` kính mờ kèm đổ bóng mềm nhiều sắc độ
- `--bg-elevated`: `#F0F4F9`
- `--text-primary`: `#111111` (đen tuyền cho tiêu đề, tên, từ khóa)
- `--text-secondary`: `#4B4E53` (xám trung tính cho nội dung)
- `--text-faint`: `#686C73` (chú giải phụ)

### Chế độ Tối (Google Gemini Dark)
- `--bg-primary`: `#131314` kết hợp quầng sáng Mesh Gradient Google phía sau
- `--bg-surface`: `rgba(30, 31, 32, 0.82)` kính mờ trên nền `#1E1F20`
- `--bg-elevated`: `#282A2C`
- `--text-primary`: `#F5F5F7` (trắng ngà tinh khiết cho tiêu đề, tên, từ khóa)
- `--text-secondary`: `#C4C7C5` (xám nhạt cho nội dung)
- `--text-faint`: `#9AA0A6` (chú giải phụ)

## 4. Chuyển Động & Kiểm Chứng

- Con trỏ chuột hệ thống nguyên bản được giữ trọn vẹn trên toàn trang (không dùng custom cursor, không dùng spotlight theo con trỏ); toàn bộ thẻ `a[href]`, `button`, `[role='button']` hiển thị `cursor: pointer`.
- Toàn bộ nút bấm tương tác (`.folio-btn-primary`, `.folio-btn-secondary`, `.folio-btn-compact`, `.folio-btn-icon`, `.google-btn-github`) đứng yên tĩnh lặng ở trạng thái mặc định với nền kính mờ `backdrop-filter: blur(14px)` và viền tĩnh mảnh `--btn-border-static`. Chỉ khi di chuột trực tiếp vào từng nút (`:hover`), viền conic-gradient Google xoay theo `--btn-angle`, hào quang ngoài (`.google-pill-aura`) và hiệu ứng nâng nhẹ `translateY(-2px) scale(1.015)` mới xuất hiện rồi chuyển mượt về trạng thái tĩnh khi rời chuột.
- Bento Grid 5 dự án hỗ trợ nghiêng 3D khi hover thẻ và viền sáng Google (`.google-gradient-hover-border`).
- Đồ họa nền (`HeroFolioCanvas.tsx`) vẽ hạt sáng và sóng hài hòa nhẹ nhàng theo bảng màu Google, không bám theo chuyển động chuột toàn trang và tự dừng khi `prefers-reduced-motion: reduce`.
- Biểu tượng thương hiệu (`CapybaraLogo.tsx` & `public/favicon.svg`) thiết kế theo phong cách **Editorial Sacred Geometry / Monoline Emblem** khắc họa góc nghiêng Linh thú Capybara điềm tĩnh với đôi mắt Zen và tinh tú 4 cánh trên đỉnh đầu; đường nét chính kế thừa `currentColor` (`#111111` Sáng / `#F5F5F7` Tối), điểm nhấn tinh tú và vòng hào quang dùng **Google Modern Gradient** với ID riêng biệt (`useId()`), chỉ chuyển động nhẹ khi di chuột (`group-hover`) và tôn trọng `prefers-reduced-motion: reduce`.
- **Thẻ Bài Pokémon TCG Silver Holo EX 3D (`src/components/PokemonProfileCard.tsx`, `Hero.tsx`, `src/index.css`)**: Thay thế khung hồ sơ cũ ở cột phải Hero bằng thẻ sưu tầm chuẩn 5 tầng giải phẫu lấy cảm hứng từ `simeydotme/pokemon-cards-css` (khung bạc kim loại `18px`, `.pokemon-stage-pill` với socket `CapybaraLogo` + nhãn `BASIC`, tên `Long Hoàng` kèm huy hiệu vát `EX`, `HP 2007` + `PrismTypeOrb`, khung ảnh kim loại `aspect-[4/3]` kèm thanh `.pokemon-dex-ribbon` `NO. 2007 • ...`, vùng chiêu thức `5 DỰ ÁN TIÊU BIỂU` + sát thương `5×` với 2 `ColorlessEnergyOrb` và 5 chip `.pokemon-project-chip` trỏ thẳng kho GitHub, hàng `.weakness / resistance / retreat` (`×2`, `-30`), và chân thẻ `Illus. Long Hoàng` / `001/005 ★ SAR`). Vùng `.pokemon-card-perspective` (`perspective: 900px`) kết hợp `useMotionValue` + `useSpring` (`stiffness: 240, damping: 24, mass: 0.9`) xoay `--rotate-x` / `--rotate-y` (`±12deg`) và `--card-scale` (`1.018`), hòa trộn `.pokemon-card__shine` (quang phổ Google Gradient + dải sọc vi mô `110deg`), `.pokemon-card__sparkle` và `.pokemon-card__glare` riêng cho phiên bản **Obsidian / Silver (Dark Mode)** và **Platinum / Silver (Light Mode)**; toàn bộ chữ giữ màu đơn sắc trên lớp nổi `translateZ(12px)`, tắt hoàn toàn khi nghỉ và dưới `prefers-reduced-motion: reduce`.
