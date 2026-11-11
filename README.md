# Marcus — Marginalia & Folio (Personal Portfolio & Annotated Archive)

Trang web cá nhân của **Marcus**, được thiết kế theo concept **Marginalia & Folio (Sổ Tay Chú Giải Của Người Đọc & Người Xây)** bằng **Vite + React + TypeScript + Tailwind CSS + Framer Motion**.

Toàn bộ danh sách công nghệ của 4 dự án (**Marginal**, **SnapTask**, **Team Quiz Battle**, **Be The Driver**) được trích xuất từ các tệp mã nguồn thật, và mục **"Trang web này được xây dựng bằng gì"** tự động đọc từ chính tệp `package.json` gốc của dự án.

---

## 1. Cách chạy dự án ở máy local

Yêu cầu: **Node.js >= 18**.

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Chạy máy chủ phát triển (mặc định tại http://localhost:5173)
npm run dev

# 3. Kiểm tra kiểu TypeScript và đóng gói bản dựng sản phẩm (ra thư mục dist/)
npm run build

# 4. Xem thử bản dựng sản phẩm (tại http://localhost:4173)
npm run preview
```

---

## 2. Cách sửa nội dung trong `src/data/`

Toàn bộ nội dung văn bản, thông tin cá nhân và dự án được tách riêng trong thư mục `src/data/` để bạn chỉnh sửa nhanh mà không cần can thiệp vào các component giao diện:

1. **`src/data/profile.ts`**:
   - Chứa tên (`Marcus`), câu slogan, lời giới thiệu và các vị trí giữ chỗ `[[...]]`:
     - `rolePlaceholder`: Thay `[[ví dụ: Developer tự học / Indie builder]]` bằng vai trò của bạn.
     - `introPlaceholder`: Thay `[[bổ sung quê quán, sở thích, mục tiêu nghề nghiệp]]` bằng thông tin thật.
     - `portraitPathPlaceholder`: Thay bằng đường dẫn ảnh chân dung (ví dụ `/portrait.jpg` đặt trong thư mục `public/`) và cập nhật thẻ `<img>` trong `src/components/About.tsx` nếu muốn dùng ảnh chụp thay cho bản vẽ khung khắc SVG.
     - `contacts`: Thay `[[email]]`, `[[GitHub]]`, `[[LinkedIn/Facebook]]` bằng địa chỉ thật của bạn.
   - Hỗ trợ song ngữ Tiếng Việt (`vi`) và Tiếng Anh (`en`).

2. **`src/data/projects.ts`**:
   - Chứa thông tin chi tiết của 4 dự án (`Marginal`, `SnapTask`, `Team Quiz Battle`, `Be The Driver`), danh sách tệp bằng chứng (`evidenceFiles`) và mảng công nghệ (`technologies`).
   - Thay `linkPlaceholder: '[[link]]'` bằng URL bản chạy thử (live demo) của từng dự án khi sẵn sàng.

3. **`src/data/skills.ts`**:
   - **Tự động tổng hợp 100%** từ mảng `technologies` trong `src/data/projects.ts`. Khi bạn sửa công nghệ ở `projects.ts`, bảng kỹ năng sẽ tự động cập nhật và khử trùng lặp.

4. **`src/data/siteStack.ts`**:
   - **Tự động đọc trực tiếp từ `/package.json`** của chính dự án này để vẽ sơ đồ và liệt kê phiên bản thư viện ở mục *"Trang web này được xây dựng bằng gì"*.

---

## 3. Cách triển khai (Deploy) lên Vercel hoặc GitHub Pages

### Phương án A: Deploy lên Vercel (Khuyên dùng — Tự động hoàn toàn)
1. Đẩy mã nguồn lên GitHub.
2. Đăng nhập [Vercel](https://vercel.com) → chọn **Add New Project** → chọn repository này.
3. Vercel sẽ tự nhận diện **Framework Preset: Vite** (`Build Command`: `npm run build`, `Output Directory`: `dist`).
4. Nhấn **Deploy**.

### Phương án B: Deploy lên GitHub Pages
Dự án đã cấu hình sẵn `base: './'` trong `vite.config.ts` để tương thích với mọi đường dẫn GitHub Pages:
1. Chạy `npm run build` để tạo thư mục `dist/`.
2. Bạn có thể dùng GitHub Actions (workflow deploy `dist/`) hoặc đẩy thư mục `dist` lên nhánh `gh-pages`:
   ```bash
   npx gh-pages -d dist
   ```

---

## 4. Khôi phục code cũ từ nhánh sao lưu (nếu cần)

Trước khi làm lại trang web, toàn bộ trạng thái code cũ đã được lưu an toàn vào nhánh `backup/truoc-khi-lam-lai`. Để xem hoặc khôi phục lại code cũ bất kỳ lúc nào:

```bash
# Chuyển sang xem nhánh code cũ
git checkout backup/truoc-khi-lam-lai

# Hoặc khôi phục nhánh main về đúng trạng thái trước khi làm lại
git checkout main
git reset --hard backup/truoc-khi-lam-lai
```
