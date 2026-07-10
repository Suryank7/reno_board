import { Calendar, Edit2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { motion, Variants } from "framer-motion";

interface NoticeCardProps {
  notice: {
    id: string;
    title: string;
    body: string;
    category: "EXAM" | "EVENT" | "GENERAL";
    priority: "URGENT" | "NORMAL";
    publishDate: Date;
  };
  onClick?: () => void;
  onEdit?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  },
};

export function NoticeCard({ notice, onClick, onEdit, onDelete }: NoticeCardProps) {
  const isUrgent = notice.priority === "URGENT";

  return (
    <motion.div
      variants={itemVariants}
      onClick={onClick}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-soft dark:shadow-none transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] cursor-pointer group relative"
    >
      {/* ── Top Row (Category & Priority) ── */}
      <div className="flex justify-between items-start mb-3">
        <span className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider border border-slate-100 dark:border-slate-700">
          {notice.category}
        </span>

        {isUrgent && (
          <div className="flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
            </span>
            URGENT
          </div>
        )}
      </div>

      {/* Action Buttons (Hover) */}
      <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={onEdit} 
          className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button 
          onClick={onDelete} 
          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Body (Title & Text) ── */}
      {/* ── Body (Title & Text) ── */}
      <h3 className="text-slate-900 dark:text-slate-100 font-bold line-clamp-2 leading-snug mb-1">
        {notice.title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 line-clamp-2 text-sm leading-relaxed mb-4">
        {notice.body}
      </p>

      {/* ── Footer Row ── */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-700 text-[9px] font-bold text-white shadow-sm">
            AD
          </div>
          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Admin</span>
        </div>

        <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
          <Calendar className="h-3 w-3" />
          <time dateTime={notice.publishDate.toISOString()} className="text-[11px]">
            {format(notice.publishDate, "MMM d")}
          </time>
        </div>
      </div>
    </motion.div>
  );
}
