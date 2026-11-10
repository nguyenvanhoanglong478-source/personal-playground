# DESIGN.md: Không Gian Tương Tác Cá Nhân (Founder / Builder Playground)

## 1. Design Read & Định hướng (R-37)

> Reading this as: Interactive Founder/Builder Personal Playground & Curated Vault for visitors and collaborators, in an Asymmetric Kinetic Studio style, dial ENERGY 3 / RHYTHM 3 / MOTION 3.

- **Identity (Bản sắc)**: Không gian thử nghiệm sáng tạo và góc lưu trữ cá nhân của một Founder / Builder đa lĩnh vực (kết hợp công nghệ, sản phẩm và góc nhìn cá nhân).
- **Primary Goal (Mục tiêu chính)**: Mang lại trải nghiệm tương tác độc bản để gây ấn tượng mạnh về cá tính sáng tạo, kết hợp góc cá nhân (Sách, âm nhạc, công cụ sử dụng, sở thích) và trình chỉnh sửa trực tiếp dữ liệu thật ngay trên trình duyệt.
- **Three Dials (Ba chỉ số sống động)**:
  - **ENERGY: 3 (Bold)**: Nghệ thuật chữ kích thước lớn có cấu trúc bất đối xứng, mô phỏng trường vật lý tương tác (Interactive Kinetic Field Canvas) và bộ phát âm thanh Web Audio API thực tế.
  - **RHYTHM: 3 (Varied, Asymmetric, Mixed Compositions)**: Bốn phân khu chính đều có cấu trúc bố cục khác biệt hoàn toàn, không lặp lại khuôn mẫu thẻ 3 cột hay bento-grid.
  - **MOTION: 3 (Choreographed & Interactive)**: Chuyển động phản hồi trực tiếp theo thao tác con trỏ, kéo thả hạt vật lý trên canvas, sóng âm thanh thời gian thực và hiệu ứng chuyển cảnh theo cuộn trang (tôn trọng `prefers-reduced-motion`).
- **Identity Motif (Dấu ấn nhận diện lặp lại)**: Hệ tọa độ bản vẽ kỹ thuật (`[X, Y]` telemetry coordinates) kết hợp khung góc vát chuẩn xác (chamfered studio frames) và ký hiệu viết tắt hình học (`[LOGO] / N.`).

## 2. Bảng màu & Độ tương phản đã kiểm chứng (R-01, R-21, R-25, R-29, R-34)

Giới hạn đúng 2 màu nền cốt lõi + 1 màu nhấn chủ đạo (Acid Chartreuse), hỗ trợ chuyển đổi hoàn chỉnh giữa hai giao diện Tối (Carbon Studio) và Sáng (Paper Studio):

### Chế độ Tối (Carbon Studio - Mặc định cho không gian thử nghiệm sáng tạo)
- **Nền chính (`--bg-primary`)**: `#111210` (Carbon Black)
- **Nền nổi (`--bg-elevated`)**: `#1A1C18` (Graphite Surface)
- **Chữ chính (`--text-primary`)**: `#EDEDEA` (Tỷ lệ tương phản `16.02:1` trên `#111210` và `14.64:1` trên `#1A1C18` -> Đạt chuẩn WCAG AAA)
- **Chữ phụ (`--text-muted`)**: `#B5B6AE` (Tỷ lệ tương phản `9.18:1` trên `#111210` và `8.39:1` trên `#1A1C18` -> Đạt chuẩn WCAG AAA)
- **Viền tương tác (`--border-interactive`)**: `#73766D` (Tỷ lệ tương phản `3.71:1` trên `#1A1C18` -> Đạt chuẩn WCAG 1.4.11 Non-Text 3:1)
- **Màu nhấn duy nhất (`--accent`)**: `#D4FF00` (Acid Chartreuse, tỷ lệ tương phản `16.20:1` với nền/chữ `#111210` -> Chỉ dùng cho điểm nhấn tiêu điểm và nút hành động chính)

### Chế độ Sáng (Warm Paper Studio)
- **Nền chính (`--bg-primary`)**: `#F4F3EE` (Warm Uncoated Paper)
- **Nền nổi (`--bg-elevated`)**: `#EAE8DF` (Pressed Cardstock)
- **Chữ chính (`--text-primary`)**: `#111210` (Tỷ lệ tương phản `16.91:1` trên `#F4F3EE` và `15.30:1` trên `#EAE8DF` -> Đạt chuẩn WCAG AAA)
- **Chữ phụ (`--text-muted`)**: `#484A44` (Tỷ lệ tương phản `8.08:1` trên `#F4F3EE` và `7.32:1` trên `#EAE8DF` -> Đạt chuẩn WCAG AAA)
- **Viền tương tác (`--border-interactive`)**: `#6B6E65` (Tỷ lệ tương phản `4.23:1` trên `#EAE8DF` -> Đạt chuẩn WCAG 1.4.11 Non-Text 3:1)
- **Màu nhấn chữ/nhãn trên nền sáng (`--accent-ink`)**: `#3D4D00` (Deep Olive Chartreuse, tỷ lệ tương phản `8.36:1` trên `#F4F3EE`), bề mặt nút chính giữ `#D4FF00` với chữ `#111210` (`16.20:1`).

## 3. Nghệ thuật chữ & Lý do lựa chọn (R-06, R-31)

- **Tiêu đề trưng bày (`Be Vietnam Pro`, 700-800)**: Chọn vì cấu trúc hình học khỏe khoắn được thiết kế chuyên biệt cho hệ thống dấu tiếng Việt, giúp các tiêu đề kích thước lớn giữ độ đồng nhất tuyệt đối ở mọi ký tự có dấu phức tạp.
- **Văn bản nội dung (`Plus Jakarta Sans`, 400-600)**: Chọn vì cấu trúc nét rõ ràng, hỗ trợ dấu tiếng Việt sắc nét ở mọi kích thước và giữ độ dễ đọc cao khi thu phóng 200%.
- **Thông số kỹ thuật & Tọa độ (`IBM Plex Mono`, 400-500)**: Chỉ dùng cho chỉ số tọa độ tương tác, tần số âm thanh (Hz) và nhãn `[REAL DATA]`, gợi liên tưởng đến máy đo trong phòng thí nghiệm kỹ thuật.

## 4. Lý do một dòng cho từng quyết định thiết kế chính (R-31)

- **Why this color (Tại sao dùng bảng màu Carbon `#111210` & Acid Chartreuse `#D4FF00`)?**: Tạo độ tương phản thị giác cực đại (`16.20:1`) làm nổi bật các hạt tương tác vật lý và tia sóng âm thanh mà không cần lạm dụng gradient hay hiệu ứng phát sáng tràn lan.
- **Why this layout (Tại sao bố cục bất đối xứng 4 phân khu khác biệt)?**: Phản ánh tư duy đa chiều của một Builder qua 4 không gian: Bàn thí nghiệm vật lý (Hero), Bản vẽ kiến trúc (Lab Matrix), Kệ sưu tầm cá nhân có bàn xoay âm thanh (Curated Vault), và Xưởng chỉnh sửa dữ liệu trực tiếp (Live Studio).
- **Why this typography (Tại sao kết hợp Be Vietnam Pro, Plus Jakarta Sans và IBM Plex Mono)?**: Phân tách rõ 3 tầng thông tin gồm tuyên ngôn sáng tạo bản địa hóa chuẩn xác (Be Vietnam Pro), nội dung tường thuật tiếng Việt dễ đọc (Plus Jakarta Sans) và dữ liệu đo đạc thời gian thực (IBM Plex Mono).
- **Why this spacing (Tại sao dùng thang khoảng trắng biến thiên theo nhịp điệu)?**: Khoảng trắng lớn ở phần tuyên ngôn giúp mắt tập trung vào khung tương tác, chuyển sang mật độ cô đọng ở bảng bản vẽ kỹ thuật để so sánh thông số nhanh.
- **Why use interactive panels instead of uniform cards (Tại sao dùng kệ tương tác và bảng tách đôi thay vì lưới thẻ đồng nhất)?**: Mỗi hạng mục (dự án, sách, bản nhạc, công cụ) có cấu trúc thông tin và hành vi tương tác riêng nên không thể nhốt chung vào các ô thẻ giống hệt nhau.
- **Why use procedural canvas & Web Audio synthesizer (Tại sao dùng đồ họa vector tương tác và bộ tạo âm thanh trực tiếp)?**: Biến người xem từ người đọc thụ động thành người trực tiếp chạm, kéo hạt vật lý và gảy hợp âm ngay trên trang web.

## 5. Chính sách Dữ liệu thật & Nhãn giữ chỗ trung thực (R-17, R-18, R-23, R-36, R-38)

- Không bịa đặt số liệu thống kê, không tạo đánh giá khách hàng giả (testimonials), không dùng ảnh đại diện giả.
- Biểu trưng dùng ký hiệu hình học kết hợp nhãn `[LOGO]` có thể đổi trực tiếp sang tên thật của chủ nhân.
- Mọi mục mẫu trong Kệ cá nhân (Sách, Âm nhạc, Công cụ, Sở thích) và Phòng thí nghiệm đều gắn nhãn `[REAL DATA]` rõ ràng và đi kèm chức năng **Chỉnh sửa trực tiếp trên web (Live Studio Editor)** lưu vào `localStorage` hoặc xuất/nhập JSON.
