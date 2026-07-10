// ─────────────────────────────────────────────────────────────
// Header Component
// Reno-branded enterprise header with indigo accent
// ─────────────────────────────────────────────────────────────

import { Bell, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/40 bg-white/60 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo & Title */}
        <div className="flex items-center gap-4 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-hover shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
            <Bell className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight text-slate-900">
              Notice Board
            </h1>
            <p className="text-[13px] font-medium text-slate-500">
              Reno Enterprise Management
            </p>
          </div>
        </div>

        {/* Right side badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary-hover">
            <Sparkles className="h-3 w-3" />
            <span className="hidden sm:inline">Enterprise</span> v1.0
          </span>
        </div>
      </div>
    </header>
  );
}
