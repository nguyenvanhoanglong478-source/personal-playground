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

## 3. Tái Thiết Kế Bảng Màu Google Modern Gradient (Light & Dark Mode)

- **Dải màu Google Signature**: Tích hợp hệ thống token màu `#4285F4`, `#9B72CB`, `#D96570`, `#EA4335`, `#FBBC04`, `#34A853` trong `src/index.css` và `tailwind.config.js`.
- **Chế độ Sáng (Google Workspace / Material You)**: Nền `#F8F9FA`, bề mặt `#FFFFFF` kính mờ + `#F0F4F9`, chữ `#1F1F1F` / `#444746`, quầng nền Pastel Gradient Google nhẹ và bóng mềm đa sắc.
- **Chế độ Tối (Google Gemini Dark)**: Nền `#131314`, bề mặt `#1E1F20` kính mờ + `#282A2C`, chữ `#E3E3E3` / `#C4C7C5`, hào quang Google Aura Mesh Gradient phía sau.
- **Ứng dụng Chuyển sắc & Chuyển đổi Mượt mà**:
  - Text Gradient cho tên `Long Hoàng`, tiêu đề các phân khu và các nút liên kết GitHub.
  - Viền Gradient Google cho ảnh đại diện ở Hero và About, cùng viền phát quang khi hover 5 thẻ dự án Bento.
  - Chuyển màu mượt mà `360ms` khi đổi giữa chế độ Sáng và Tối, đồng bộ `<meta name="theme-color">`, `public/favicon.svg` và Canvas 2D.
  - Đã tinh chỉnh responsive `Navbar.tsx` để không cắt chữ hoặc đẩy nút menu trên màn hình 360px–375px.
