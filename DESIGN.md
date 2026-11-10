# DESIGN.md: Editorial Studio & Archive (Bản Đặc Tả Thiết Kế Tạp Chí Triển Lãm Đương Đại)

## 1. Định hướng Nghệ thuật (Art Direction: Editorial Studio)

- **Phong cách chủ đạo**: Tạp chí nghệ thuật & Không gian triển lãm sản phẩm đương đại (Editorial Studio & Archive) lấy cảm hứng từ các ấn phẩm thiết kế cao cấp (Pentagram, Figma Config, It's Nice That).
- **Nguyên tắc cốt lõi (Tuân thủ Hallmark 2.0 & Taste-skill 2.5)**:
  - Bố cục tạp chí bất đối xứng, khoảng trắng cấu trúc vững chắc, tỷ lệ lề hai bên đồng đều tuyệt đối (Equal edges).
  - Một ý tưởng chủ đạo cho mỗi khung nhìn (One section per screen at 1280x800).
  - Không dùng các mẫu AI slop: không gradient xanh tím mờ nhạt, không bento-grid rập khuôn, không thẻ lồng trong thẻ.
  - Toàn bộ màu sắc và phông chữ đều đi qua hệ thống Token khai báo tại `:root`.
  - Không dùng `transition: all`, không can thiệp chuyển động vào các thuộc tính kích thước (`width`, `height`, `top`, `left`).
  - Thiết lập `overflow-x: clip` cho cả `html` và `body`.
  - Tiêu đề và nội dung trên màn hình đầu tiên hiển thị đầy đủ ở 1280x800 mà không cần cuộn trang.

## 2. Hệ thống Token Thiết kế (:root Tokens)

Toàn bộ thuộc tính màu sắc, kiểu chữ và khoảng cách được quản lý tập trung:

### Bảng màu Deep Obsidian & Raw Ink (Chế độ Tối - Mặc định)
- Nền chính: `#0C0D0E` (Obsidian Ink)
- Nền khối nâng cao: `#16181A` (Graphite Sheet)
- Nền phụ lồng ghép: `#111214` (Deep Inset)
- Màu chữ chính: `#F8F7F4` (Unbleached Paper, tương phản 18.16:1, chuẩn WCAG AAA)
- Màu chữ phụ: `#A2A49D` (Muted Lead, tương phản 7.72:1, chuẩn WCAG AAA)
- Viền thành phần: `#676A63` (Tương phản Non-Text 3.54:1, chuẩn WCAG 1.4.11)
- Màu điểm nhấn đơn sắc: `#D4FF00` (Acid Chartreuse, tương phản 16.77:1)

### Bảng màu Pure Ivory Paper (Chế độ Sáng)
- Nền chính: `#F8F7F4` (Ivory Paper)
- Nền khối nâng cao: `#EFECE6` (Pressed Cardboard)
- Nền phụ lồng ghép: `#E7E4DC` (Warm Inset)
- Màu chữ chính: `#0C0D0E` (Obsidian Ink, tương phản 18.16:1, chuẩn WCAG AAA)
- Màu chữ phụ: `#52544E` (Deep Graphite, tương phản 7.16:1, chuẩn WCAG AAA)
- Viền thành phần: `#72756E` (Tương phản Non-Text 4.37:1, chuẩn WCAG 1.4.11)
- Màu điểm nhấn chữ/nhãn: `#3D4D00` (Olive Ink, tương phản 8.67:1)

## 3. Hệ thống Typography (Be Vietnam Pro, Plus Jakarta Sans, IBM Plex Mono)

- **Tiêu đề trưng bày (`Be Vietnam Pro`, 800)**: Tối ưu chuyên biệt cho hệ dấu tiếng Việt ở kích thước lớn, hình học sắc nét.
- **Nội dung đọc (`Plus Jakarta Sans`, 400, 500, 600)**: Rõ ràng, thoáng đãng ở mọi mức thu phóng màn hình.
- **Thông số kỹ thuật (`IBM Plex Mono`, 500)**: Dành riêng cho số thứ tự tập san `VOL. 01`, mã dự án `EXP-XX`, tần số `Hz` và các nhãn chức năng. Không dùng chữ in hoa giãn cách rộng vô nghĩa.

## 4. Bốn Phân khu Triển lãm Độc bản

1. **Bìa Tạp chí & Tuyên ngôn Sáng tạo (`#cover`)**: Đầu đề tạp chí (Masthead) hiển thị địa điểm, thời gian thực và trạng thái sẵn sàng hợp tác. Tiêu đề khổ lớn bất đối xứng kèm bản tuyên ngôn ngắn gọn, thanh cá nhân hóa định danh và thanh cuốn dự án tương tác.
2. **Triển lãm Dự án Tiêu biểu (`#works`)**: Bố cục phòng trưng bày không rập khuôn: 1 dự án chủ lực khổ lớn có sơ đồ mạch tương tác, kèm các dự án vệ tinh dạng cột đôi bất đối xứng có thể mở xem mã nguồn và thông số thực tế.
3. **Năng lực Kiến trúc & Kỹ thuật (`#craft`)**: Bàn kiểm tra kiến trúc hệ thống (System Architecture Benchmarks): điều chỉnh tần số xử lý thời gian thực, quan sát dòng gói tin luân chuyển và đọc 3 ghi chú kỹ thuật cô đọng.
4. **Kệ Lưu Trữ & Triết lý Đời sống (`#archive`)**: Kệ sưu tầm sách, âm nhạc và bộ đồ nghề với bộ tạo âm thanh Web Audio API, lọc phân loại, tìm kiếm tức thì và bộ kiểm thử đầy đủ 4 trạng thái giao diện (Ready, Empty, Loading, Error).
5. **Kênh Tín hiệu Trực tiếp & Thông tin Xuất bản (`#colophon`)**: Biểu mẫu liên hệ tối giản kết nối trực tiếp với ứng dụng gửi thư, kèm thông tin xuất bản và nút xuất tệp dữ liệu JSON.
