// ─────────────────────────────────────────────────────────────
// DeleteDialog Component
// Confirmation dialog before deleting a notice.
// Uses native HTML <dialog> for accessibility and simplicity.
// ─────────────────────────────────────────────────────────────

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2, X } from "lucide-react";
import type { Notice } from "@/features/notices/services/notice-service";

interface DeleteDialogProps {
  notice: Notice | null;
  isOpen: boolean;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteDialog({
  notice,
  isOpen,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteDialogProps) {
  if (!isOpen || !notice) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onCancel}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-200 bg-white p-6 shadow-2xl"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
          >
            {/* Close button */}
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Warning Icon */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
              <AlertTriangle className="h-6 w-6 text-rose-600" />
            </div>

            {/* Title */}
            <h2
              id="delete-dialog-title"
              className="mb-2 text-lg font-semibold text-slate-900"
            >
              Delete Notice
            </h2>

            {/* Description */}
            <p
              id="delete-dialog-description"
              className="mb-1 text-sm text-slate-600"
            >
              Are you sure you want to delete{" "}
              <span className="font-medium text-slate-900">
                &ldquo;{notice.title}&rdquo;
              </span>
              ?
            </p>
            <p className="mb-6 text-sm text-slate-500">
              This action cannot be undone. The notice will be permanently
              removed from the system.
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={onCancel}
                disabled={isDeleting}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-rose-700 disabled:opacity-50"
              >
                {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isDeleting ? "Deleting..." : "Delete Notice"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
