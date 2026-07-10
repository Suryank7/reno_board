// ─────────────────────────────────────────────────────────────
// NoticeCard Component
// Displays a single notice as a responsive card with
// category badges, priority indicators, and action buttons.
// ─────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import {
  Calendar,
  Edit3,
  Trash2,
  AlertTriangle,
  BookOpen,
  CalendarDays,
  Megaphone,
  ImageIcon,
} from "lucide-react";
import type { Notice } from "@/features/notices/services/notice-service";

interface NoticeCardProps {
  notice: Notice;
  onEdit: (notice: Notice) => void;
  onDelete: (notice: Notice) => void;
  isDeleting: boolean;
}

const CATEGORY_CONFIG = {
  EXAM: {
    label: "Exam",
    icon: BookOpen,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  EVENT: {
    label: "Event",
    icon: CalendarDays,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  GENERAL: {
    label: "General",
    icon: Megaphone,
    className: "bg-slate-50 text-slate-600 border-slate-200",
  },
} as const;

export function NoticeCard({
  notice,
  onEdit,
  onDelete,
  isDeleting,
}: NoticeCardProps) {
  const isUrgent = notice.priority === "URGENT";
  const categoryConfig = CATEGORY_CONFIG[notice.category];
  const CategoryIcon = categoryConfig.icon;

  const formattedDate = (() => {
    try {
      return format(new Date(notice.publishDate), "MMM dd, yyyy");
    } catch {
      return "Invalid date";
    }
  })();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className={`group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${
        isUrgent
          ? "border-rose-200 ring-1 ring-rose-100"
          : "border-slate-200 hover:border-indigo-200"
      } ${isDeleting ? "pointer-events-none opacity-50" : ""}`}
    >
      {/* Urgent top border accent */}
      {isUrgent && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500" />
      )}

      {/* Image (if present) */}
      {notice.image && (
        <div className="relative h-40 w-full overflow-hidden bg-slate-100">
          <Image
            src={notice.image}
            alt={notice.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <div className={`p-5 ${isUrgent ? "pt-6" : ""}`}>
        {/* Top row: badges */}
        <div className="mb-3 flex items-center gap-2">
          {/* Priority Badge */}
          {isUrgent && (
            <span className="urgent-badge inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-700 border border-rose-200">
              <AlertTriangle className="h-3 w-3" />
              Urgent
            </span>
          )}

          {/* Category Badge */}
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryConfig.className}`}
          >
            <CategoryIcon className="h-3 w-3" />
            {categoryConfig.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-base font-semibold leading-snug text-slate-900 line-clamp-2">
          {notice.title}
        </h3>

        {/* Body */}
        <p className="mb-4 text-sm leading-relaxed text-slate-600 line-clamp-3">
          {notice.body}
        </p>

        {/* Footer: date + actions */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={notice.publishDate}>{formattedDate}</time>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              onClick={() => onEdit(notice)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label={`Edit notice: ${notice.title}`}
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(notice)}
              disabled={isDeleting}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 focus-visible:ring-2 focus-visible:ring-rose-500 disabled:opacity-50"
              aria-label={`Delete notice: ${notice.title}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* No image indicator */}
        {!notice.image && (
          <div className="absolute right-4 top-4 text-slate-200">
            <ImageIcon className="h-5 w-5" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
