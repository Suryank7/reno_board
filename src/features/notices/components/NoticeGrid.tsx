// ─────────────────────────────────────────────────────────────
// NoticeGrid Component
// Responsive grid layout for notice cards with AnimatePresence
// ─────────────────────────────────────────────────────────────

import { AnimatePresence } from "framer-motion";
import { NoticeCard } from "./NoticeCard";
import type { Notice } from "@/features/notices/services/notice-service";

interface NoticeGridProps {
  notices: Notice[];
  onEdit: (notice: Notice) => void;
  onDelete: (notice: Notice) => void;
  deletingId: string | null;
}

export function NoticeGrid({
  notices,
  onEdit,
  onDelete,
  deletingId,
}: NoticeGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {notices.map((notice) => (
          <NoticeCard
            key={notice.id}
            notice={notice}
            onEdit={onEdit}
            onDelete={onDelete}
            isDeleting={deletingId === notice.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
