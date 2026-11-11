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
- Áp dụng Text Gradient cho tên **Long Hoàng**, tiêu đề chính các phân khu, viền ảnh đại diện và nút liên kết **GitHub**, kết hợp hào quang **Google Aura Mesh Gradient** mờ ảo ở nền.

### Chế độ Sáng (Google Workspace / Material You)
- `--bg-primary`: `#F8F9FA` kết hợp các quầng Pastel Mesh Gradient nhẹ ở nền
- `--bg-surface`: `rgba(255, 255, 255, 0.86)` kính mờ kèm đổ bóng mềm nhiều sắc độ
- `--bg-elevated`: `#F0F4F9`
- `--text-primary`: `#1F1F1F` (tiêu đề)
- `--text-secondary`: `#444746` (nội dung)
- `--accent-primary`: `#1A73E8` (chuẩn tương phản WCAG AA trên nền sáng)
- `--accent-secondary`: `#188038`

### Chế độ Tối (Google Gemini Dark)
- `--bg-primary`: `#131314` kết hợp quầng sáng Mesh Gradient Google phía sau
- `--bg-surface`: `rgba(30, 31, 32, 0.80)` kính mờ trên nền `#1E1F20`
- `--bg-elevated`: `#282A2C`
- `--text-primary`: `#E3E3E3` (tiêu đề)
- `--text-secondary`: `#C4C7C5` (nội dung)
- `--accent-primary`: `#8AB4F8`
- `--accent-secondary`: `#81C995`

## 4. Chuyển Động & Kiểm Chứng

- Bento Grid 5 dự án hỗ trợ nghiêng 3D theo con trỏ chuột, vệt sáng radial spotlight và viền sáng Gradient Google khi hover.
- Đồ họa nền (`HeroFolioCanvas.tsx`) vẽ hạt sáng và sóng hài hòa 60fps bằng bảng màu Google, tự tắt hiệu ứng mạnh khi `prefers-reduced-motion: reduce`.
