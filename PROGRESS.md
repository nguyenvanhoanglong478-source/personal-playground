# PROGRESS.md - Tiến Độ Trang Cá Nhân Long Hoàng

Cập nhật lần cuối: 2026-11-11

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
