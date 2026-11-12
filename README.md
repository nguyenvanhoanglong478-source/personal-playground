# Long Hoàng — Hồ Sơ Cá Nhân & Dự Án

Trang web cá nhân của **Long Hoàng**, xây dựng bằng **Vite + React + TypeScript + Tailwind CSS + Framer Motion**.

## Live Demo

- **Cloudflare Pages:** https://longhoang.pages.dev/
- **GitHub Pages:** https://nguyenvanhoanglong478-source.github.io/personal-playground/

## Cách chạy & triển khai

Yêu cầu: **Node.js >= 18**.

```bash
npm install
npm run dev
npm run build
npm run pages:deploy
```

## Cấu trúc dữ liệu trong `src/data/`

- `src/data/profile.ts`: Thông tin cơ bản và nội dung song ngữ VI / EN.
- `src/data/experience.ts`: Các nhóm kinh nghiệm làm việc và công cụ áp dụng.
- `src/data/projects.ts`: 5 dự án dung lượng mã nguồn lớn nhất kèm đường dẫn GitHub tương ứng.
- `src/data/skills.ts`: Danh sách kỹ năng tổng hợp tự động từ các dự án.
- `src/data/siteStack.ts`: Đọc trực tiếp các gói cốt lõi từ `package.json`.
