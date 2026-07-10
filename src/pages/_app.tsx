// ─────────────────────────────────────────────────────────────
// _app.tsx — Global Layout Wrapper (Pages Router)
// Sets up fonts, Sonner toaster, and Framer Motion transitions
// ─────────────────────────────────────────────────────────────

import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <div className={`${inter.variable} font-sans`}>
      {/* Global toast notifications */}
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            fontFamily: "var(--font-body)",
          },
        }}
      />

      {/* Page transition animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
