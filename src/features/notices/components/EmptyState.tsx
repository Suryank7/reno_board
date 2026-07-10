// ─────────────────────────────────────────────────────────────
// EmptyState Component
// Displayed when no notices exist in the system.
// ─────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { ClipboardList, Plus } from "lucide-react";

interface EmptyStateProps {
  onCreateClick: () => void;
  hasFilters: boolean;
}

export function EmptyState({ onCreateClick, hasFilters }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {/* Illustration */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50">
        <ClipboardList className="h-10 w-10 text-indigo-400" />
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-slate-900">
        {hasFilters ? "No matching notices" : "No notices yet"}
      </h3>

      {/* Description */}
      <p className="mb-6 max-w-sm text-sm text-slate-500">
        {hasFilters
          ? "Try adjusting your search or filters to find what you're looking for."
          : "Get started by creating your first notice. It will appear here once published."}
      </p>

      {/* CTA */}
      {!hasFilters && (
        <button
          onClick={onCreateClick}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40"
        >
          <Plus className="h-4 w-4" />
          Create First Notice
        </button>
      )}
    </motion.div>
  );
}
