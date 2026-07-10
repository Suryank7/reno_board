import { Search, Bell, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSearch } from "@/context/SearchContext";

export function TopBar() {
  const { resolvedTheme, setTheme } = useTheme();
  const { searchQuery, setSearchQuery } = useSearch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-[80px] w-full items-center justify-between backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-gray-100 dark:border-slate-800 px-6 lg:px-8 transition-colors">
      
      {/* Mobile left side (Logo) */}
      <div className="flex lg:hidden items-center gap-3">
        <button className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 shrink-0 transition-colors">
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-bold text-gray-900 dark:text-white text-lg">NoticeGo</span>
      </div>

      {/* Desktop left side (Greeting) */}
      <div className="hidden lg:flex flex-col flex-1">
         <span className="text-[12px] text-gray-500 font-medium">Hello,</span>
         <h1 className="text-[16px] font-bold text-gray-900 dark:text-white">Mr. Ryan Miller</h1>
      </div>

      {/* Right side: Search & Icons */}
      <div className="flex items-center gap-4 lg:gap-6 flex-1 lg:flex-none justify-end">
        
        {/* Search Pill */}
        <div className="flex items-center bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full px-3 py-2 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/30 focus-within:border-blue-400 transition-all w-full max-w-[200px] sm:max-w-[280px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[13px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 px-2 min-w-0 font-medium"
            aria-label="Search"
          />
          <Search className="h-3.5 w-3.5 text-gray-400 shrink-0 ml-1" />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 border-l border-gray-100 dark:border-slate-800 pl-4 lg:pl-6">
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 h-[6px] w-[6px] rounded-full bg-yellow-400"></span>
          </button>
          <button 
            onClick={() => mounted && setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            {mounted ? (resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />) : <div className="h-5 w-5" />}
          </button>
        </div>
        
      </div>
    </header>
  );
}
