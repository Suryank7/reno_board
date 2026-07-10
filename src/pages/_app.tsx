import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import { SearchProvider } from "@/context/SearchContext";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { TopBar } from "@/components/layout/TopBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SearchProvider>
        <TopBar />
        <Component {...pageProps} />
        <Toaster position="bottom-right" richColors />
      </SearchProvider>
    </ThemeProvider>
  );
}
