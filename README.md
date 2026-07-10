# Enterprise Notice Board

A highly premium, interactive Kanban-style notice board built with modern enterprise B2B SaaS architecture. It emphasizes performance, real-time interactivity, and a bespoke, whitespace-heavy aesthetic inspired by Linear and RoomGI.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (Pages Router)
- **Language**: TypeScript (Strict Mode)
- **Database**: [TiDB Serverless](https://www.pingcap.com/tidb-serverless/) (MySQL)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Primitives**: [Radix UI](https://www.radix-ui.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching**: [SWR](https://swr.vercel.app/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Toast Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## ✨ Key Features

1. **Kanban Shell**: Horizontal-scrolling canvas with collapsing/expanding column state architecture (`w-[320px]` down to `w-14` vertical side-tabs).
2. **Premium Micro-interactions**: Smooth Framer Motion staggering entry animations and physically accurate hover lift (`hover:-translate-y-1`). 
3. **Bespoke UI Components**: Bypassed generic library defaults for a custom-engineered `NoticeCard` and `NoticeModal`. Features include "pinging" URGENT indicator dots and diffuse shadows (`shadow-soft`).
4. **Universal Dark Mode**: Seamless, bespoke dark mode toggle using `next-themes` mapped dynamically across the entire application interface.
5. **Interactive Cards**: Embedded intuitive inline CRUD capabilities—hover to Edit or Delete with optimistic UI updates.
6. **Global Search Engine**: Context-driven top bar search instantly filters notices across all categories simultaneously.
7. **Notice Detail Engine**: Expansive un-editable view modals for comprehensive reading experience without layout shifting.
8. **Enterprise Validation**: Strict Zod schemas validating both client-side forms and server-side API payloads.
9. **Real-time Client**: Configured with SWR for optimistic UI updates and instant fetching.

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- A TiDB Cloud Serverless account (MySQL)

### Setup Instructions

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Copy the `.env.example` to `.env` and insert your TiDB connection string.
   ```bash
   # .env
   DATABASE_URL="mysql://username:password@gateway01...tidbcloud.com:4000/notice_board?sslaccept=strict"
   ```

3. **Push the Schema:**
   Sync the Prisma schema to your TiDB database.
   ```bash
   npx prisma db push
   ```
   *(Note: This creates the tables without requiring a migration history)*

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deployment (Vercel)

This project is fully optimized for Vercel deployment out-of-the-box.

1. Push your code to GitHub.
2. Import the repository in Vercel.
3. In the Vercel **Environment Variables** settings, add your `DATABASE_URL`.
4. Deploy! Vercel will automatically run `npm run build` which invokes the `prisma generate` post-install hook.

---
*Built with strict enterprise UI/UX standards.*
