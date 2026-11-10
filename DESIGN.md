# DESIGN.md: Ngôn ngữ Thiết kế & Bản đặc tả Kiến trúc

Tài liệu này xác lập định hướng nghệ thuật (Art Direction) và hệ thống quy chuẩn thiết kế theo các bộ skill: `taste-skill` (2.5), `hallmark` (2.0), `impeccable` (4.8), `no-ai-slop` và `antislop`.

## 1. Bản sắc & Định vị Nghệ thuật (Art Direction)

- **Định vị**: Trang cá nhân kiêm không gian làm việc số của một Founder & Builder đa lĩnh vực (Công nghệ, Sản phẩm và Đời sống sáng tạo).
- **Nguyên tắc cốt lõi (Taste & Hallmark Floor)**:
  - Một ý tưởng rõ ràng cho mỗi khung nhìn (One section per screen at 1280x800).
  - Tỷ lệ lề hai bên đồng đều tuyệt đối (Equal edges).
  - Không dùng gradient tím xanh AI, không bento grid nhồi nhét, không thẻ lồng trong thẻ.
  - Toàn bộ màu sắc và phông chữ đều đi qua hệ thống Token khai báo tại `:root`.
  - Không dùng `transition: all`, không chuyển động kích thước (`width`, `height`, `top`, `left`).
  - Thiết lập `overflow-x: clip` cho cả `html` và `body`.
  - Chữ hiển thị có `overflow-wrap: break-word; min-width: 0`.

## 2. Hệ thống Token Thiết kế (:root Tokens)

Toàn bộ thuộc tính màu sắc, kiểu chữ và khoảng cách được quản lý tập trung:

### Bảng màu Carbon Studio (Chế độ Tối - Mặc định)
- Nền chính: `#111210`
- Nền khối nâng cao: `#1A1C18`
- Nền phụ lồng ghép: `#151713`
- Màu chữ chính: `#EDEDEA` (Đạt chuẩn WCAG AAA 16.02:1)
- Màu chữ phụ: `#B5B6AE` (Đạt chuẩn WCAG AAA 9.18:1)
- Viền thành phần: `#73766D` (Đạt chuẩn Non-Text 3.71:1)
- Điểm nhấn đơn sắc duy nhất: `#D4FF00` (Acid Chartreuse, tương phản 16.20:1)

### Bảng màu Warm Paper Studio (Chế độ Sáng)
- Nền chính: `#F4F3EE`
- Nền khối nâng cao: `#EAE8DF`
- Nền phụ lồng ghép: `#E2DFD3`
- Màu chữ chính: `#111210` (Đạt chuẩn WCAG AAA 16.91:1)
- Màu chữ phụ: `#484A44` (Đạt chuẩn WCAG AAA 8.08:1)
- Viền thành phần: `#6B6E65` (Đạt chuẩn Non-Text 4.23:1)
- Điểm nhấn mực: `#3D4D00` (Tương phản 8.36:1)

## 3. Hệ thống Typography (Be Vietnam Pro, Plus Jakarta Sans, IBM Plex Mono)

- **Tiêu đề trưng bày (`Be Vietnam Pro`, 800)**: Tối ưu chuyên biệt cho hệ dấu tiếng Việt ở kích thước lớn, hình học sắc nét.
- **Nội dung đọc (`Plus Jakarta Sans`, 400, 500, 600)**: Rõ ràng, thoáng đãng ở mọi mức thu phóng màn hình.
- **Thông số kỹ thuật (`IBM Plex Mono`, 500)**: Dành riêng cho tọa độ `[X, Y]`, tần số `Hz` và các nhãn chức năng. Không dùng chữ in hoa giãn cách rộng vô nghĩa.

## 4. Bốn Phân khu Chức năng Độc bản

1. **Sân khấu Vật lý (`#stage`)**: Tiêu đề đanh thép, giới thiệu ngắn gọn trong 1 câu, nút hành động chính, kết hợp bàn thí nghiệm tương tác 5 trụ cột thời gian thực và Web Audio synthesizer.
2. **Bản vẽ Hệ thống (`#lab`)**: Bố cục Master-Detail kiến trúc mạch SVG, cho phép điều chỉnh tần số xử lý và quan sát dòng dữ liệu luân chuyển.
3. **Góc Cá Nhân (`#vault`)**: Bàn xoay âm thanh dao động ký, 1 mục Tiêu điểm nổi bật kết hợp Sổ cái chi tiết có ngăn kéo, ô tìm kiếm và trình kiểm thử 3 trạng thái giao diện (Ready, Empty, Loading, Error).
4. **Xưởng Dữ liệu & Kênh Kết nối (`#studio`)**: Bộ biên tập dữ liệu thật lưu vào LocalStorage và xuất tệp JSON, kèm biểu mẫu liên hệ xác thực đầy đủ.
