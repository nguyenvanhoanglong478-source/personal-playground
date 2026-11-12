# Automated Agent Routing & Design Quality Rules

Tệp này thiết lập cơ chế tự động điều phối các bộ skill thiết kế web và chống AI slop cho mọi tác vụ trong dự án.

## Quy tắc Tự động Kích hoạt Skill (Automatic Skill Activation)

Khi nhận bất kỳ yêu cầu nào thuộc các nhóm tác vụ bên dưới, AI phải **tự động đọc và tuân thủ các quy tắc trong tệp SKILL.md tương ứng** trước khi lập kế hoạch hoặc sinh mã nguồn:

### 1. Khi Xây dựng, Thiết kế mới hoặc Tái cấu trúc Giao diện Web
- **Ngữ cảnh kích hoạt**: Người dùng yêu cầu tạo trang web mới, làm landing page, thêm phân khu giao diện, hoặc tái thiết kế (redesign) lại toàn bộ trang.
- **Skill bắt buộc tự động đọc**:
  - `taste-skill` (`.agents/skills/taste-skill/SKILL.md`): Áp dụng định hướng nghệ thuật (art direction), tỷ lệ thị giác chuẩn xác, một ý tưởng rõ ràng cho mỗi khung nhìn, tránh các bố cục AI rập khuôn.
  - `hallmark` (`.agents/skills/hallmark/SKILL.md`): Tránh hội tụ mẫu thiết kế AI (template convergence), cấm lạm dụng gradient tím xanh hoặc bento-grid cưỡng ép.

### 2. Khi Đánh giá, Tinh chỉnh hoặc Nâng cấp Giao diện Có sẵn
- **Ngữ cảnh kích hoạt**: Người dùng yêu cầu review, audit, làm đẹp hơn, làm sắc nét hơn (polish), làm táo bạo hơn (bolder), tối ưu khoảng trắng hoặc sửa lỗi bố cục.
- **Skill bắt buộc tự động đọc**:
  - `impeccable` (`.agents/skills/impeccable/SKILL.md`): Sử dụng vốn từ vựng thiết kế chuyên nghiệp, kiểm tra phân cấp thị giác, độ bền bỉ ở mọi trạng thái rỗng/lỗi, và kiểm thử khả năng đáp ứng trên thiết bị di động.

### 3. Khi Soạn thảo, Chỉnh sửa Câu chữ & Nội dung Website
- **Ngữ cảnh kích hoạt**: Người dùng yêu cầu viết lời giới thiệu, tiêu đề chính (headline), lời kêu gọi hành động (CTA), câu chuyện cá nhân, hoặc bài viết.
- **Skill bắt buộc tự động đọc**:
  - `no-ai-slop` (`.agents/skills/no-ai-slop/SKILL.md`): Loại bỏ hơn 20 mẫu AI slop trong văn phong, gạt bỏ từ ngữ sáo rỗng (buzzwords), giữ giọng điệu tự nhiên, chân thực và có chủ ngữ rõ ràng.

### 4. Tiêu chuẩn Bàn giao Cốt lõi (Craftsmanship Gate)
- Không dùng số liệu thống kê hoặc lời chứng thực bịa đặt.
- Kiểm chứng độ tương phản màu đạt chuẩn WCAG AA (tối thiểu 4.5:1 cho chữ thường, 3:1 cho thành phần đồ họa).
- Kiểm tra trực tiếp trên trình duyệt ở 3 dải màn hình (Mobile 375px, Tablet 820px, Desktop 1440px) để đảm bảo không tràn chiều ngang và mọi nút bấm đều hoạt động thực tế.

### 5. Tự động Cập nhật GitHub Pages
- GitHub Pages của dự án phục vụ từ nhánh `gh-pages` (`https://nguyenvanhoanglong478-source.github.io/personal-playground/`).
- Sau mỗi lần chỉnh sửa và đẩy thay đổi lên nhánh `main`, AI hoặc người dùng cần chạy `npm run deploy` (`scripts/deploy-gh-pages.mjs`) để build lại bản production và cập nhật đồng bộ nhánh `gh-pages` (hoặc kích hoạt GitHub Actions qua `.github/workflows/deploy.yml` sau khi token được cấp quyền `workflow`).
