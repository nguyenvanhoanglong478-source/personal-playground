# DESIGN.md — Marginalia & Folio (Sổ Tay Chú Giải Của Marcus)

## 1. Concept Chủ Đạo: The Annotated Builder's Folio

Trang web cá nhân của **Marcus** được thiết kế dựa trên hình mẫu một **ấn phẩm học thuật có lề chú giải (Marginalia & Folio)**.
Thay vì một mẫu portfolio công nghệ chung chung, mỗi phân khu trên trang kết hợp giữa **cột nội dung chính** và **lề chú giải (Marginalia)** dẫn chứng trực tiếp đến các tệp mã nguồn thật của 4 dự án:
1. **Marginal** (`frontend/package.json`, `worker/wrangler.toml`, `worker/src/index.js`)
2. **SnapTask** (`app/build.gradle.kts`, `gradle/libs.versions.toml`, `.github/workflows/build_apk.yml`)
3. **Team Quiz Battle** (`package.json`, `server.js`, `public/js/editor.js`)
4. **Be The Driver / Một Ngày Làm Shipper** (`index.html`, `build.py`, `src/loop.js`, `sw.js`)

## 2. Hệ Thống Kiểu Chữ (Typography)

Hỗ trợ trọn vẹn bảng mã dấu Tiếng Việt:
- **Display & Editorial Serif**: `Newsreader` (Google Fonts) — mang lại cảm giác trang sách học thuật cổ điển nhưng sắc sảo ở kích thước lớn.
- **UI & Body Sans**: `Be Vietnam Pro` (Google Fonts) — thiết kế chuyên biệt cho cấu trúc dấu tiếng Việt, dễ đọc ở mọi kích thước màn hình.
- **Code & Marginalia Mono**: `JetBrains Mono` (Google Fonts) — dùng cho đường dẫn tệp, phiên bản thư viện, chỉ mục chương và các placeholder `[[...]]`.

## 3. Bảng Màu Kép (Dual Theme Tokens)

Khai báo 100% trong `:root` tại `src/index.css`, không sử dụng mã màu hex thô rải rác ngoài khối biến:

### Chế độ Sáng (Archival Paper)
- `--bg-primary`: `#F6F3EC` (Giấy bản thảo ấm)
- `--bg-surface`: `#EDE8DD` (Giấy lề chú giải)
- `--bg-elevated`: `#FAF8F4` (Thẻ nổi)
- `--text-primary`: `#141413` (Mực Iron Gall — độ tương phản `15.4:1` chuẩn WCAG AAA)
- `--text-secondary`: `#524F49` (Chì than — độ tương phản `7.2:1` chuẩn WCAG AAA)
- `--accent-primary`: `#C83E2B` (Đỏ Chu Sa / Scholar's Vermilion)
- `--accent-secondary`: `#1D5B4C` (Xanh Thông Thư Viện / Library Spruce)

### Chế độ Tối (Nocturnal Study)
- `--bg-primary`: `#0E100F` (Đá phiến đêm)
- `--bg-surface`: `#171A18` (Bìa sổ tối)
- `--bg-elevated`: `#1E221F` (Thẻ nổi đêm)
- `--text-primary`: `#F2EFE9` (Ngà ấm — độ tương phản `16.2:1` chuẩn WCAG AAA)
- `--text-secondary`: `#A39E93` (Tro ấm — độ tương phản `7.4:1` chuẩn WCAG AAA)
- `--accent-primary`: `#F05A43` (Đỏ Chu Sa Sáng)
- `--accent-secondary`: `#45B899` (Xanh Ngọc Bích)

## 4. Quy Tắc Chuyển Động & Hiệu Năng

- Chỉ animate `transform` và `opacity` với thời lượng 300ms–600ms.
- Đồ họa nền Hero (`HeroFolioCanvas.tsx`) được tải trễ (`React.lazy` + `Suspense`), tự giảm mật độ nút trên màn hình di động (`< 768px`) và dừng hoàn toàn khi người dùng bật `prefers-reduced-motion: reduce`.
