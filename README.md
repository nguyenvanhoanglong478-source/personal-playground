# Personal Playground (Founder / Builder Interactive Space)

Không gian tương tác trực quan và kệ lưu trữ cá nhân dành cho Founder & Builder đa lĩnh vực, kết hợp công nghệ, sản phẩm và góc nhìn cá nhân.

Trang web được thiết kế theo định hướng tương tác bất đối xứng (Asymmetric Kinetic Studio) với các chỉ số thiết kế `ENERGY 3 / RHYTHM 3 / MOTION 3`, không sử dụng bố cục mẫu lặp lại hay dữ liệu bịa đặt.

## Tính năng nổi bật

1. **Sân khấu Vật lý tương tác (Kinetic Canvas)**
   - Mô phỏng trường hạt vật lý 2D với 5 trụ cột xoay quanh tâm định danh: Công nghệ, Sản phẩm, Sách & Tư duy, Âm nhạc, Đồ nghề.
   - Hỗ trợ kéo thả chuột, phím tắt bàn phím (Phím cách, phím Enter, phím M), 3 chế độ lực (Lực đàn hồi liên kết, Quỹ đạo xoay tâm, Sóng giao thoa) và phản hồi âm thanh trực tiếp.
2. **Bản vẽ Hệ thống (System Architecture Blueprints)**
   - Bố cục danh mục và sơ đồ kiến trúc SVG thời gian thực.
   - Thanh trượt điều chỉnh tần số xử lý mô phỏng tốc độ luân chuyển gói tin trên sơ đồ.
3. **Góc Cá Nhân: Sách, Âm nhạc, Đồ nghề & Sở thích (Curated Vault)**
   - Bộ tổng hợp âm thanh Web Audio API đa âm (phát chuỗi hợp âm trực tiếp, không dùng tệp âm thanh tĩnh bên ngoài) kết hợp biểu đồ sóng dao động ký.
   - Phân cấp mục Tiêu điểm (Spotlight) và Sổ cái chi tiết (Ledger) có ngăn kéo mở rộng.
   - Kiểm thử đầy đủ 3 trạng thái dữ liệu giao diện: Empty State, Loading State và Error State.
4. **Xưởng Dữ liệu Thật & Kênh Kết nối (Live Studio Editor)**
   - Trình thêm và sửa mục cá nhân trực tiếp trên giao diện web, lưu trữ vào LocalStorage và hỗ trợ xuất tệp JSON (`personal-playground-data.json`).
   - Mọi dữ liệu mẫu ban đầu đều được gắn nhãn `[REAL DATA]` minh bạch để người dùng thay thế bằng dữ liệu thật của mình.
   - Biểu mẫu liên hệ trực tiếp kết nối với ứng dụng gửi thư qua giao thức `mailto:`.
5. **Hỗ trợ Giao diện Kép & Trợ năng (Accessibility & Themes)**
   - Hai chế độ màu hoàn chỉnh: Tối (Carbon `#111210`) và Sáng (Paper `#F4F3EE`), màu nhấn Acid Chartreuse (`#D4FF00`).
   - Độ tương phản chữ đạt chuẩn WCAG AAA (từ `8.08:1` đến `16.91:1`).
   - Hỗ trợ đầy đủ điều hướng bằng bàn phím, liên kết chuyển nhanh nội dung (skip link), phím Escape đóng hộp thoại.
   - Tương thích tốt trên thiết bị di động, máy tính bảng và màn hình lớn, không có hiện tượng tràn chiều ngang.

## Cấu trúc thư mục

```text
personal-playground/
├── index.html        # Khung cấu trúc ngữ nghĩa HTML5
├── styles.css        # Hệ thống giao diện kép, biến màu CSS và bố cục phản hồi
├── app.js            # Động cơ vật lý Canvas, bộ tổng hợp Web Audio API và xử lý dữ liệu
├── DESIGN.md         # Bản đặc tả định hướng thẩm mỹ và kiểm định tương phản WCAG
├── .gitignore        # Cấu hình bỏ qua tệp tạm
└── README.md         # Hướng dẫn và mô tả dự án
```

## Cách chạy dự án cục bộ

Dự án sử dụng chuẩn HTML5, CSS và JavaScript thuần (Vanilla JS), không cần cài đặt thư viện phụ thuộc hay qua bước biên dịch.

Bạn có thể mở trực tiếp tệp `index.html` trên trình duyệt, hoặc chạy bằng một máy chủ web tĩnh đơn giản:

```bash
# Sử dụng Python
python -m http.server 8090

# Hoặc sử dụng Node.js (npx serve)
npx serve .
```

Sau đó truy cập: `http://localhost:8090`
