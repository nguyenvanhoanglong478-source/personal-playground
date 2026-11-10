# Editorial Studio & Archive (Hồ Sơ Builder & Triển Lãm Dự Án)

Ấn phẩm số và phòng lưu trữ mở dành cho Founder & Builder đa lĩnh vực, kết hợp kiến trúc hệ thống chịu tải cao với góc nhìn thẩm mỹ đương đại (Editorial Magazine Style).

Trang web được thiết kế lại toàn bộ từ đầu theo chuẩn nghệ thuật khắt khe từ bộ ba kỹ năng: **taste-skill 2.5**, **hallmark 2.0**, **impeccable 4.8** và bộ lọc **no-ai-slop**. Tuyệt đối không sử dụng bố cục AI rập khuôn, không dùng số liệu bịa đặt và nói không với các hiệu ứng thừa thãi.

## 5 Phân Khu Nghệ Thuật Chính

1. **01. Tuyên Ngôn & Bìa Tập San (Masthead & Editorial Manifesto)**
   - Khung thông số xuất bản dạng tạp chí in ấn cao cấp, hiển thị trạng thái làm việc thực tế tại TP. Hồ Chí Minh.
   - Bảng định danh cá nhân hóa tức thì: Cho phép nhập ký hiệu monogram và tên thật để cập nhật toàn bộ trang bìa và chân trang trong tích tắc.
   - Mục lục tác phẩm và hộp thoại quy chuẩn ấn phẩm đạt chuẩn trợ năng.

2. **02. Triển Lãm Dự Án Tiêu Biểu (Curated Works Exhibition)**
   - Dự án chủ lực (Flagship Exhibit): Nền tảng phân tích và điều phối tín hiệu thời gian thực với sơ đồ luồng dữ liệu SVG động và nút phát xung kiểm thử.
   - Các công trình thực chiến thứ cấp: Dao động ký âm thanh Web Audio và cơ chế lưu trữ cục bộ Local-First.
   - Bộ lọc lĩnh vực động giúp tập trung quan sát từng nhóm giải pháp kỹ thuật.

3. **03. Năng Lực Hệ Thống & Kiểm Toán Hiệu Năng (System Architecture Benchmarks)**
   - Bản vẽ ma trận kiến trúc với 3 mô hình kỹ thuật: ARCH-01 (Bộ đệm vòng Ring Buffer), ARCH-02 (DSP âm thanh trình duyệt) và ARCH-03 (Cấu trúc dữ liệu độc lập).
   - Thanh trượt điều tần mô phỏng tốc độ gói tin và nhịp xung kiểm thử hệ thống.
   - Phân tích thách thức, giải pháp kỹ thuật và bài học thực tế cho từng cấu trúc.

4. **04. Kệ Tư Liệu & Đời Sống Sáng Tạo (Studio Bibliography & Equipment Ledger)**
   - Bộ tổng hợp âm thanh Web Audio API đa âm kết hợp dao động ký sóng thời gian thực trên Canvas 2D (tự sinh hợp âm toán học, không dùng tệp mp3 tĩnh).
   - Kệ sách tâm đắc, danh sách giai điệu viết mã, đồ nghề làm việc và sở thích ngoài màn hình.
   - Bộ mô phỏng 4 trạng thái dữ liệu giao diện chuẩn mực: Có dữ liệu (Ready), Trống (Empty), Đang tải (Loading) và Báo lỗi (Error).
   - Ngăn kéo đọc trải nghiệm thực tế và nút nghe âm sắc tương ứng cho từng tư liệu.

5. **05. Kênh Tín Hiệu & Xưởng Dữ Liệu Thật (Live Studio Editor & Signal Channel)**
   - Trình biên tập dữ liệu thật tại chỗ: Cho phép nhập tựa sách, thiết bị hoặc bản nhạc thật của bạn, tự động lưu vào trình duyệt và hỗ trợ xuất tệp JSON dự phòng (`editorial-studio-archive.json`).
   - Mọi dữ liệu ban đầu đều được gắn thẻ `[REAL DATA]` minh bạch.
   - Kênh gửi tín hiệu hợp tác trực tiếp kết nối ứng dụng thư điện tử qua giao thức `mailto:`.

## Tiêu Chuẩn Kỹ Thuật & Thẩm Mỹ

- **Độ tương phản chữ đạt chuẩn WCAG AAA**: Tối thiểu 7.16:1 và lên đến 18.16:1 cho cả hai chế độ màu Tối (Deep Obsidian `#0C0D0E`) và Sáng (Pure Ivory `#F8F7F4`), viền đạt chuẩn WCAG 1.4.11 (> 3.0:1).
- **Hệ thống Design Tokens chuẩn mực**: 100% màu sắc và kiểu chữ được quản lý qua biến `:root`, không có mã màu thô rải rác ngoài biến, không dùng `transition: all`.
- **Hoạt động không cần thư viện bên ngoài**: Xây dựng hoàn toàn bằng HTML5, CSS thuần và Vanilla JavaScript, tối ưu hóa kích thước tải trang cực nhẹ.
- **Trợ năng & Phím tắt hoàn chỉnh**: Điều hướng bàn phím đầy đủ, liên kết chuyển nhanh (Skip Link), phím Escape đóng hộp thoại và mục lục di động, kích thước vùng chạm tối thiểu đạt chuẩn 44x44px.
- **Không có hiện tượng tràn chiều ngang**: Kiểm thử tự động bằng Playwright trên các dải màn hình Desktop 1440px, Tablet 820px và Mobile 375px.

## Cấu Trúc Mã Nguồn

```text
personal-playground/
├── index.html        # Khung cấu trúc ngữ nghĩa 5 phân khu tạp chí
├── styles.css        # Hệ thống giao diện kép, biến màu CSS và bố cục Editorial
├── app.js            # Bộ điều phối sự kiện, dao động ký Web Audio và xử lý dữ liệu
├── DESIGN.md         # Bản đặc tả định hướng thẩm mỹ và kiểm định tương phản WCAG
├── .gitignore        # Cấu hình bỏ qua tệp tạm
└── README.md         # Tài liệu giới thiệu ấn phẩm
```

## Khởi Chạy Cục Bộ

```bash
# Sử dụng Python
python -m http.server 8090

# Hoặc mở trực tiếp file index.html trên bất kỳ trình duyệt web hiện đại nào
```

Địa chỉ xem thử nghiệm: `http://localhost:8090`
