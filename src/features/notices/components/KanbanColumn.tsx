import { Plus } from "lucide-react";
import React from "react";
import { motion, Variants } from "framer-motion";

interface KanbanColumnProps {
  title: string;
  count: number;
  isCollapsed?: boolean;
  onToggleCollapse: () => void;
  onAddClick: () => void;
  children?: React.ReactNode;
}

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function KanbanColumn({ title, count, isCollapsed, onToggleCollapse, onAddClick, children }: KanbanColumnProps) {
  if (isCollapsed) {
    return (
      <div 
        onClick={onToggleCollapse}
        className="w-14 flex-shrink-0 flex flex-col items-center py-6 border-r border-slate-200/50 dark:border-slate-800 h-full bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
      >
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-300 tracking-widest" style={{ writingMode: 'vertical-rl' }}>
          {title} <span className="text-[10px] ml-2 text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-full px-1">{count}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="w-[320px] flex-shrink-0 flex flex-col h-full bg-transparent">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div 
          onClick={onToggleCollapse}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{title}</span>
          <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full px-2 py-0.5 text-xs font-bold">{count}</span>
        </div>
        <button onClick={onAddClick} className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <motion.div 
        className="flex flex-col gap-4 overflow-y-auto hide-scrollbar pb-4 h-full"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </div>
  );
}
