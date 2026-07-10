import { Plus } from "lucide-react";
import React from "react";

interface KanbanColumnProps {
  title: string;
  count: number;
  onAddClick?: () => void;
  children: React.ReactNode;
}

export function KanbanColumn({ title, count, onAddClick, children }: KanbanColumnProps) {
  return (
    <div className="flex-1 min-w-[320px] flex flex-col h-full bg-transparent p-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-1">
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold text-slate-800 tracking-tight">{title}</span>
          <span className="bg-blue-100 text-blue-700 rounded-full px-2.5 py-0.5 text-xs font-black shadow-sm">
            {count}
          </span>
        </div>
        {onAddClick && (
          <button 
            onClick={onAddClick}
            className="text-slate-400 hover:text-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-8 overflow-y-auto hide-scrollbar pb-8 h-full mt-2">
        {children}
      </div>
    </div>
  );
}
