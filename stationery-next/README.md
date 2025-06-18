# TAB Stationery Next.js App

## Tech Stack
- **Next.js 15**
- **TailwindCSS**
- **React Hook Form + Zod** for validation
- **@tanstack/react-query** for data fetching/caching
- **Radix UI** components
- **NextAuth.js** for authentication
- **Cloudinary** for avatar upload via link or file

## Setup
```bash
npm install
npm run dev
```

## Pages & Components
- `/products` - Home page with products
- `/auth/login`, `/auth/signup` - Auth pages
- `/product/[id]` - Single product page
- `/profile` - User profile page
- `/cart` - User cart page

## Features
- **Filtering:** Sidebar filters for category, price range, stock
- **Sorting:** Dropdown to sort by name, date, or price
- **Pagination:** Products paginated
- **Profile Edit:** Update name, lastname, and avatar
- **Cart:** Add/remove/view items with quantity

## Forms
- Built with `react-hook-form` and `zod`
- Avatar supports both file upload (Multer) and link paste (Cloudinary)
