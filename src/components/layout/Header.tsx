// ─────────────────────────────────────────────────────────────
// Header Component
// Reno-branded enterprise header with indigo accent
// ─────────────────────────────────────────────────────────────

import { Bell, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 shadow-md shadow-indigo-500/25">
            <Bell className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              Notice Board
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              Reno Enterprise Management System
            </p>
          </div>
        </div>

        {/* Right side badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            <Sparkles className="h-3 w-3" />
            <span className="hidden sm:inline">Enterprise</span> v1.0
          </span>
        </div>
      </div>
    </header>
  );
}
