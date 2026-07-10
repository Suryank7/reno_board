// ─────────────────────────────────────────────────────────────
// NoticeFilters Component
// Search bar + Category + Priority filter controls
// ─────────────────────────────────────────────────────────────

import { Search, Filter, X } from "lucide-react";

interface NoticeFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  priorityFilter: string;
  onPriorityChange: (priority: string) => void;
}

export function NoticeFilters({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  priorityFilter,
  onPriorityChange,
}: NoticeFiltersProps) {
  const hasActiveFilters =
    searchQuery || categoryFilter !== "ALL" || priorityFilter !== "ALL";

  const clearFilters = () => {
    onSearchChange("");
    onCategoryChange("ALL");
    onPriorityChange("ALL");
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search notices..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          aria-label="Search notices"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex items-center gap-2">
        <Filter className="hidden h-4 w-4 text-slate-400 sm:block" />

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          aria-label="Filter by category"
        >
          <option value="ALL">All Categories</option>
          <option value="EXAM">Exam</option>
          <option value="EVENT">Event</option>
          <option value="GENERAL">General</option>
        </select>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          aria-label="Filter by priority"
        >
          <option value="ALL">All Priorities</option>
          <option value="URGENT">Urgent</option>
          <option value="NORMAL">Normal</option>
        </select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-600"
            aria-label="Clear all filters"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
