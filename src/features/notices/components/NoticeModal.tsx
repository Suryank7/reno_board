import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { toast } from "sonner";
import { noticeSchema, NoticeInput } from "@/validators/notice.schema";

interface NoticeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCategory?: "EXAM" | "EVENT" | "GENERAL";
  initialData?: NoticeInput & { id: string };
  onSuccess: () => void;
}

export function NoticeModal({ isOpen, onOpenChange, defaultCategory = "GENERAL", initialData, onSuccess }: NoticeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!initialData;
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NoticeInput>({
    resolver: zodResolver(noticeSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      body: initialData.body,
      category: initialData.category,
      priority: initialData.priority,
      publishDate: initialData.publishDate,
    } : {
      title: "",
      body: "",
      category: defaultCategory,
      priority: "NORMAL",
      publishDate: new Date().toISOString(),
    },
  });

  // Reset form when opened or initialData changes
  React.useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          title: initialData.title,
          body: initialData.body,
          category: initialData.category,
          priority: initialData.priority,
          publishDate: initialData.publishDate,
        });
      } else {
        reset({
          title: "",
          body: "",
          category: defaultCategory,
          priority: "NORMAL",
          publishDate: new Date().toISOString(),
        });
      }
    }
  }, [isOpen, defaultCategory, initialData, reset]);

  const onSubmit = async (data: NoticeInput) => {
    setIsSubmitting(true);
    try {
      const url = isEditing ? `/api/notices/${initialData.id}` : "/api/notices";
      const method = isEditing ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(isEditing ? "Failed to update notice" : "Failed to create notice");
      
      toast.success(isEditing ? "Notice updated successfully!" : "Notice created successfully!");
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error(isEditing ? "Failed to update notice." : "Failed to create notice.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight text-slate-900 dark:text-white">
              {isEditing ? "Edit Notice" : "Create Notice"}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-slate-500 dark:text-slate-400">
              {isEditing ? "Modify the notice details below." : "Add a new notice to the board. Click save when you're done."}
            </Dialog.Description>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
              <input 
                {...register("title")} 
                className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent dark:bg-slate-800/50 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter notice title"
              />
              {errors.title && <p className="text-[10px] text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
              <select 
                {...register("category")} 
                className="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 dark:border-slate-700 bg-transparent dark:bg-slate-800/50 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 [&>option]:bg-white dark:[&>option]:bg-slate-900"
              >
                <option value="EXAM">EXAM</option>
                <option value="EVENT">EVENT</option>
                <option value="GENERAL">GENERAL</option>
              </select>
              {errors.category && <p className="text-[10px] text-red-500">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Priority</label>
              <select 
                {...register("priority")} 
                className="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 dark:border-slate-700 bg-transparent dark:bg-slate-800/50 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 [&>option]:bg-white dark:[&>option]:bg-slate-900"
              >
                <option value="NORMAL">NORMAL</option>
                <option value="URGENT">URGENT</option>
              </select>
              {errors.priority && <p className="text-[10px] text-red-500">{errors.priority.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Body</label>
              <textarea 
                {...register("body")} 
                className="flex min-h-[80px] w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent dark:bg-slate-800/50 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                placeholder="Type the notice content..."
              />
              {errors.body && <p className="text-[10px] text-red-500">{errors.body.message}</p>}
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-2">
              <Dialog.Close asChild>
                <button type="button" className="mt-2 inline-flex h-10 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-slate-900 dark:text-white ring-offset-white dark:ring-offset-slate-900 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:mt-0">
                  Cancel
                </button>
              </Dialog.Close>
              <button disabled={isSubmitting} type="submit" className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 dark:bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-900/90 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-blue-600 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                {isSubmitting ? "Saving..." : "Save Notice"}
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white dark:ring-offset-slate-900 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 data-[state=open]:text-slate-500 dark:data-[state=open]:text-slate-400 text-slate-500 dark:text-slate-400">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
