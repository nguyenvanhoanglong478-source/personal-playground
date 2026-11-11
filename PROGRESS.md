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

- **Hệ thống màu sắc & Thẩm mỹ**:
  - Phong cách Dark Mode sang trọng, chiều sâu cao với bề mặt kính mờ Glassmorphism (`backdrop-blur-xl`).
  - Điểm nhấn dải màu Gradient viền sáng Vermilion và Emerald Mint.
  - Phân cấp Typography rõ ràng giữa phông Serif tiêu đề Newsreader, phông Sans Be Vietnam Pro và phông Mono JetBrains Mono.
- **Hero Section & Ảnh đại diện**:
  - Ảnh đại diện đặt trong thẻ thiết kế nổi bật tại Hero với hiệu ứng lơ lửng nhẹ nhàng `animate-float-gentle` và dải hào quang tỏa sáng chuyển động `animate-pulse-ring`.
  - Huy hiệu trạng thái "Sẵn sàng nhận dự án thiết kế" với đèn hiệu xanh ngọc bích phát xung `animate-ping`.
  - Tên "Long Hoàng" và tiêu đề nghề nghiệp xuất hiện ấn tượng với chuyển động chữ so le.
  - Nút kêu gọi hành động với hiệu ứng hút chuột từ tính (magnetic CTA).
- **Thẻ 5 Dự án (Bento Grid)**:
  - Hiệu ứng 3D Tilt nghiêng theo góc di chuột mượt mà (`rotateX`, `rotateY`, `perspective 1000px`).
  - Vệt sáng động (Radial Spotlight Sheen) quét theo chuyển động con trỏ chuột trên mặt thẻ.
  - Nút bấm xem mã nguồn GitHub có hiệu ứng hover đổi màu, bóng sáng và mũi tên di chuyển.
- **Nền động tương tác (Background Canvas 2D)**:
  - Hệ thống các hạt sáng lơ lửng, liên kết chùm sao nhẹ và dải sóng không gian mượt mà 60fps.
  - Quầng sáng ambient gradient nhẹ nhàng theo sau con trỏ chuột, tôn độ tương phản và không làm rối mắt chữ.
- **Scroll Reveal & Micro-interactions**:
  - Toàn bộ các phần nội dung đều xuất hiện mượt mà khi cuộn tới (`whileInView`).
  - Con trỏ chuột tùy biến (Custom Cursor) nhẹ nhàng trên màn hình máy tính.
- **Tối ưu & Khả năng truy cập**:
  - Hỗ trợ đầy đủ `prefers-reduced-motion` tự động ngắt chuyển động mạnh khi người dùng yêu cầu.
  - Đảm bảo độ mượt 60fps, tương thích hoàn hảo từ mobile 360px đến desktop 1440px.
