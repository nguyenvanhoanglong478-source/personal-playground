# DESIGN.md — Long Hoàng Portfolio (Google Modern Gradient)

## 1. Concept & Hệ Thống Thiết Kế

Trang cá nhân của **Long Hoàng** kết hợp bố cục Folio / Bento hiện đại theo phong cách **Google Modern Gradient**, lấy cảm hứng từ hệ sinh thái **Google AI / Gemini** và **Material Design 3**, hỗ trợ đầy đủ 2 chế độ **Sáng (Light Mode)** và **Tối (Dark Mode)**.

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
- Áp dụng **Google Aura Mesh Gradient** cho nền trang, viền phát quang (ảnh đại diện ở Hero/About, gạch chân mục điều hướng, huy hiệu monogram), hiệu ứng spotlight/viền khi di chuột trên thẻ dự án và nền của các nút bấm chính / nút GitHub.
- Toàn bộ hệ thống chữ viết (tên **Long Hoàng**, tiêu đề chính, tiêu đề thẻ dự án, mô tả, nhãn, liên kết) chuyển hoàn toàn về **màu đơn sắc trung tính**, tuyệt đối không dùng chữ màu hoặc Text Gradient.

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

- Bento Grid 5 dự án hỗ trợ nghiêng 3D theo con trỏ chuột, vệt sáng radial spotlight và viền sáng Gradient Google khi hover.
- Đồ họa nền (`HeroFolioCanvas.tsx`) vẽ hạt sáng và sóng hài hòa 60fps bằng bảng màu Google, tự tắt hiệu ứng mạnh khi `prefers-reduced-motion: reduce`.
