# PROGRESS.md - Nhật Ký Rà Soát, Chỉnh Sửa & Hoàn Thiện Trang Cá Nhân Marcus

Cập nhật lần cuối: 2026-11-11

## 1. Concept & Quyết Định Thiết Kế Đã Chốt (Giữ Nguyên)

- **Concept**: **Marginalia & Folio** (Sổ tay bản thảo có cột lề chú giải).
- **Typography**: `Newsreader` (Display/Serif), `Be Vietnam Pro` (UI/Body), `JetBrains Mono` (Code/Index/Labels).
- **Bảng màu**: Archival Paper Light (`#F6F3EC`, `#141413`, `#C83E2B`, `#1D5B4C`) & Nocturnal Study Dark (`#0E100F`, `#F2EFE9`, `#F05A43`, `#45B899`).
- **Tính năng giữ nguyên**: Song ngữ VI/EN, chuyển đổi Light/Dark mode lưu localStorage, Hero lazy Canvas, mỗi dự án có SVG minh họa riêng, mục Kỹ năng tự tổng hợp từ dự án, mục Cấu trúc trang đọc trực tiếp từ `package.json`, `mailto` composer, tôn trọng `prefers-reduced-motion`.

## 2. Các Skill Đã Đọc & Áp Dụng Trong Đợt Chỉnh Sửa Này

1. **`impeccable` (v4.8.2)** — [`polish.md`](file:///C:/Users/nguye/.gemini/config/plugins/impeccable/skills/impeccable/reference/polish.md), [`layout.md`](file:///C:/Users/nguye/.gemini/config/plugins/impeccable/skills/impeccable/reference/layout.md), [`clarify.md`](file:///C:/Users/nguye/.gemini/config/plugins/impeccable/skills/impeccable/reference/clarify.md): Thiết lập bộ CSS tokens dùng chung (spacing `4/8px`, `--radius-card`, `--radius-inner`, `--radius-control`, `--pad-card`, `--control-height`), đồng bộ chiều cao hàng trong grid, làm gọn câu chữ UI.
2. **`no-ai-slop`**: Cắt bỏ câu chữ thừa, loại bỏ ghi chú kỹ thuật nội bộ hiển thị cho người xem, thống nhất ngôi xưng `"tôi"` / `"I"`, chuẩn hóa độ dài mô tả dự án tối đa 2 câu.
3. **`hallmark` (v2.0.0)** & **`taste-skill` (v2.5.1)**: Đảm bảo CSS tuân thủ `:root` tokens, `overflow-x: clip`, tương phản chữ >= WCAG AA, và nhịp điệu lưới đồng nhất.

## 3. Đã Hoàn Thành Chỉnh Sửa Hệ Thống

- [x] Mục 0: Đọc `PROGRESS.md`, `git log`, tạo nhánh sao lưu `backup/truoc-khi-chinh-sua`, rà soát toàn trang bằng Playwright ở `360px`, `768px`, `1440px` (Light/Dark).
- [x] Mục 1: Thiết lập bộ token thống nhất trong `src/index.css` (`.folio-section`, `.folio-container`, `.folio-section-header`, `.folio-card`, `.folio-card-inner`, `.folio-chip`, `.folio-btn-primary`, `.folio-btn-secondary`, `.folio-btn-compact`), đồng bộ đánh số `01` đến `06`, chỉnh lại `ProjectsBento` (thẳng hàng giữa các card cùng hàng), `SkillsMatrix` (4 băng ngang đều, bỏ khoảng trống thừa), và `BuiltWithDiagram` (6 công nghệ cốt lõi cân đối 2 hàng × 3 cột).
- [x] Mục 2 & 3: Sửa lỗi gõ nhầm `"Ứng dụng Android原生"`, viết lại văn phong ngắn gọn đúng ngôi `"tôi"` / `"I"`, mô tả dự án tối đa 2 câu (bản VI & EN tương đương ý), bỏ toàn bộ ghi chú kỹ thuật nội bộ hiển thị ra ngoài (`[SRC: ...]`, `[DATA INTEGRITY]`, `[AUTO-DERIVED: ...]`, gợi ý sửa file & lệnh `git checkout` ở Footer).
- [ ] Mục 4: Chụp lại ảnh giao diện ở `360px`, `768px`, `1440px` (Sáng/Tối) đối chiếu bản trước, kiểm tra Lighthouse / build và cập nhật `README.md`.
