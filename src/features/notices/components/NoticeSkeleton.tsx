// ─────────────────────────────────────────────────────────────
// NoticeSkeleton Component
// Loading skeleton cards matching NoticeCard layout.
// Uses shimmer animation — never generic spinners.
// ─────────────────────────────────────────────────────────────

export function NoticeSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          {/* Badge skeletons */}
          <div className="mb-3 flex items-center gap-2">
            <div className="h-5 w-16 rounded-full skeleton-shimmer" />
            <div className="h-5 w-14 rounded-full skeleton-shimmer" />
          </div>

          {/* Title skeleton */}
          <div className="mb-2 h-5 w-3/4 rounded skeleton-shimmer" />

          {/* Body skeleton lines */}
          <div className="mb-1 h-4 w-full rounded skeleton-shimmer" />
          <div className="mb-1 h-4 w-full rounded skeleton-shimmer" />
          <div className="mb-4 h-4 w-2/3 rounded skeleton-shimmer" />

          {/* Footer skeleton */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <div className="h-4 w-28 rounded skeleton-shimmer" />
            <div className="flex gap-1">
              <div className="h-8 w-8 rounded-lg skeleton-shimmer" />
              <div className="h-8 w-8 rounded-lg skeleton-shimmer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
