import * as Dialog from "@radix-ui/react-dialog";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

interface NoticeDetailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  notice: {
    title: string;
    body: string;
    category: "EXAM" | "EVENT" | "GENERAL";
    priority: "URGENT" | "NORMAL";
    publishDate: Date;
  } | null;
}

export function NoticeDetailModal({ isOpen, onOpenChange, notice }: NoticeDetailModalProps) {
  if (!notice) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[600px] translate-x-[-50%] translate-y-[-50%] bg-white dark:bg-slate-900 border-none shadow-2xl rounded-2xl p-0 overflow-hidden duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <Dialog.Title className="sr-only">Notice Details</Dialog.Title>
          <Dialog.Description className="sr-only">Detailed view of the notice</Dialog.Description>
        
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-md text-[11px] font-bold tracking-wider border border-slate-200 dark:border-slate-700 shadow-sm">
              {notice.category}
            </span>
            {notice.priority === "URGENT" && (
              <div className="flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                </span>
                URGENT
              </div>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            {notice.title}
          </h2>
          <div className="flex items-center gap-2 mt-4 text-slate-500 dark:text-slate-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Published on {format(notice.publishDate, "MMMM d, yyyy")}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="text-slate-700 dark:text-slate-300 text-base leading-relaxed whitespace-pre-wrap">
            {notice.body}
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 px-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Dialog.Close asChild>
            <button 
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              Close
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
