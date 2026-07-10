import Link from "next/link";
import { LayoutDashboard, List, Settings, HelpCircle, Layers } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[260px] flex-col border-r border-gray-200 bg-white lg:flex shrink-0">
      
      {/* ── Logo Area ── */}
      <div className="flex h-[72px] items-center px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            NoticeGo
          </span>
        </div>
      </div>

      {/* ── User Profile Widget (StudyGo Style) ── */}
      <div className="px-5 mt-2 shrink-0">
        <div className="flex items-center gap-3 rounded-[12px] border border-gray-100 p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors hover:bg-gray-50 cursor-pointer">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
            RM
          </div>
          <div className="flex flex-col overflow-hidden min-w-0">
            <span className="truncate text-[13px] font-bold text-gray-900">
              Ryan Miller
            </span>
            <span className="truncate text-[11px] font-medium text-orange-500">
              ryan.miller@campus.org
            </span>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="mt-8 flex flex-1 flex-col px-4 overflow-y-auto hide-scrollbar">
        
        <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 shrink-0">
          Main Menu
        </div>
        <nav className="flex flex-col gap-1 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-[10px] bg-blue-50 px-3 py-2.5 text-[13px] font-bold text-blue-600 transition-colors"
          >
            <LayoutDashboard className="h-[18px] w-[18px] shrink-0" />
            Dashboard
          </Link>
          <button className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[13px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left">
            <List className="h-[18px] w-[18px] shrink-0" />
            All Notices
          </button>
        </nav>

        <div className="mt-8 mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 shrink-0">
          Account
        </div>
        <nav className="flex flex-col gap-1 shrink-0 pb-8">
          <button className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[13px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left">
            <Settings className="h-[18px] w-[18px] shrink-0" />
            Settings
          </button>
          <button className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[13px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left">
            <HelpCircle className="h-[18px] w-[18px] shrink-0" />
            Help
          </button>
        </nav>

      </div>
    </aside>
  );
}
