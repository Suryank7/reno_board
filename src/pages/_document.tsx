// ─────────────────────────────────────────────────────────────
// _document.tsx — Custom Document (Pages Router)
// SEO meta tags, font preloads, and HTML structure
// ─────────────────────────────────────────────────────────────

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO Meta */}
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Enterprise Notice Management System by Reno Platforms — Manage institutional notices with full CRUD operations, priority sorting, and responsive design."
        />
        <meta
          name="keywords"
          content="notice board, enterprise, ERP, Reno Platforms, institutional management"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Reno Notice Management System"
        />
        <meta
          property="og:description"
          content="Enterprise-grade notice management with priority sorting and full CRUD operations."
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
