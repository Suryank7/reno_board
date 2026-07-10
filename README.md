# Reno Enterprise Notice Management System

## Overview

This is an Enterprise Notice Management System built as a module for Reno Platforms. It is a production-ready application designed with scale, maintainability, and enterprise UX in mind.

The system supports full Create, Read, Update, and Delete (CRUD) operations for institutional notices, featuring a polished interface inspired by Reno Platforms' design language.

## Architecture & Engineering Decisions

*   **Framework**: Next.js Pages Router for reliable server-side API execution and straightforward routing.
*   **Database Setup**: TiDB Cloud (MySQL) with Prisma ORM.
*   **Native Ordering**: The `Priority` enum in Prisma is ordered specifically with `URGENT` first. This enables `orderBy: { priority: "asc" }` to natively sort urgent notices to the top at the database level, avoiding costly browser-side array sorting.
*   **Validation**: Used a shared Zod schema (`notice.schema.ts`) for both client-side form validation (via React Hook Form) and strict server-side payload validation in the API routes.
*   **Feature-First Architecture**: Instead of a flat `components/` directory, domain logic is grouped under `src/features/notices/` (components, hooks, services). This mimics large-scale enterprise patterns.
*   **Aesthetics**: Glassmorphic elements, Framer Motion transitions, and a dot-grid background inspired by modern SaaS applications (Vercel, Linear, Reno Platforms).

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js (Pages Router), React |
| **Language** | Strict TypeScript |
| **Database** | TiDB Cloud (MySQL), Prisma ORM |
| **Styling** | Tailwind CSS v4, Framer Motion |
| **Components** | shadcn/ui, Radix UI, Lucide React |
| **Forms** | React Hook Form, Zod |
| **Images** | Cloudinary (Signed Unsigned Upload) |
| **Testing** | Playwright (E2E) |

## Local Setup Instructions

1.  **Clone and Install**:
    ```bash
    git clone <repository-url>
    cd reno-notice-board
    npm install
    ```

2.  **Environment Variables**:
    Copy the template to create your local `.env` file:
    ```bash
    cp .env.example .env
    ```
    *Add your TiDB Cloud connection string and Cloudinary credentials to the `.env` file.*

3.  **Database Sync**:
    Push the Prisma schema to your TiDB database:
    ```bash
    npx prisma db push
    npx prisma generate
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run the End-to-End Playwright test flow:
```bash
npx playwright test
```

## Future Improvements Roadmap

*   **Role-Based Access Control (RBAC)**: Implement NextAuth.js to restrict notice creation to Admins/Faculty, while Students have read-only access.
*   **Audit Logs**: Track who created, edited, or deleted a notice.
*   **Scheduled Publishing**: Allow users to draft notices and set a future visibility date via cron jobs.
*   **Real-time Updates**: Implement WebSockets or Server-Sent Events to push urgent notices to connected clients instantly.

## AI Usage Disclosure

As a Senior Staff Software Engineer, I utilized AI (Claude 3.5 Sonnet / Gemini) as a pair-programming partner during development. 

*   **AI was used for**: Scaffolding repetitive boilerplate (shadcn UI setups), generating the Zod validation schemas, and optimizing the Prisma schema for native MySQL ordering.
*   **Manual direction**: All architectural decisions (feature-first directory layout, shared validation layers, database sorting logic), code reviews, UX/UI aesthetic direction, and engineering trade-off evaluations were driven manually.
