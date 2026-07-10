// ─────────────────────────────────────────────────────────────
// NoticeForm Component
// Unified form for creating and editing notices.
// Uses React Hook Form + Zod for client-side validation.
// ─────────────────────────────────────────────────────────────

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Upload, X } from "lucide-react";
import { useState, useRef } from "react";
import {
  noticeSchema,
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  type NoticeFormData,
} from "@/validators/notice.schema";
import { uploadImage } from "@/features/notices/services/notice-service";
import type { Notice } from "@/features/notices/services/notice-service";

interface NoticeFormProps {
  notice?: Notice | null;
  onSubmit: (data: NoticeFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  EXAM: "Exam",
  EVENT: "Event",
  GENERAL: "General",
};

const PRIORITY_LABELS: Record<string, string> = {
  URGENT: "Urgent",
  NORMAL: "Normal",
};

export function NoticeForm({
  notice,
  onSubmit,
  onCancel,
  isSubmitting,
}: NoticeFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    notice?.image ?? null
  );
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NoticeFormData>({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      title: notice?.title ?? "",
      body: notice?.body ?? "",
      category: notice?.category ?? "GENERAL",
      priority: notice?.priority ?? "NORMAL",
      publishDate: notice?.publishDate
        ? format(new Date(notice.publishDate), "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
      image: notice?.image ?? "",
    },
  });

  const watchedPriority = watch("priority");

  // ── Handle Image Upload ───────────────────────────────────
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    setIsUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setValue("image", url);
    } catch {
      // If upload fails, still keep the preview but clear the URL
      setValue("image", "");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isEditing = !!notice;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      {/* Title Field */}
      <div>
        <label
          htmlFor="notice-title"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Title <span className="text-rose-500">*</span>
        </label>
        <input
          id="notice-title"
          type="text"
          placeholder="Enter notice title..."
          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
            errors.title ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-200"
          }`}
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-rose-600">{errors.title.message}</p>
        )}
      </div>

      {/* Body Field */}
      <div>
        <label
          htmlFor="notice-body"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Body <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="notice-body"
          rows={4}
          placeholder="Write notice content..."
          className={`w-full resize-none rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
            errors.body ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-200"
          }`}
          {...register("body")}
        />
        {errors.body && (
          <p className="mt-1 text-xs text-rose-600">{errors.body.message}</p>
        )}
      </div>

      {/* Category & Priority Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Category */}
        <div>
          <label
            htmlFor="notice-category"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Category <span className="text-rose-500">*</span>
          </label>
          <select
            id="notice-category"
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
              errors.category ? "border-rose-300" : "border-slate-200"
            }`}
            {...register("category")}
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-xs text-rose-600">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Priority */}
        <div>
          <label
            htmlFor="notice-priority"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Priority <span className="text-rose-500">*</span>
          </label>
          <select
            id="notice-priority"
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
              watchedPriority === "URGENT"
                ? "border-rose-300 bg-rose-50 text-rose-700"
                : "border-slate-200 bg-white text-slate-900"
            } ${errors.priority ? "border-rose-300" : ""}`}
            {...register("priority")}
          >
            {PRIORITY_OPTIONS.map((pri) => (
              <option key={pri} value={pri}>
                {PRIORITY_LABELS[pri]}
              </option>
            ))}
          </select>
          {errors.priority && (
            <p className="mt-1 text-xs text-rose-600">
              {errors.priority.message}
            </p>
          )}
        </div>
      </div>

      {/* Publish Date */}
      <div>
        <label
          htmlFor="notice-date"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Publish Date <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="notice-date"
            type="date"
            className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
              errors.publishDate ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-200"
            }`}
            {...register("publishDate")}
          />
        </div>
        {errors.publishDate && (
          <p className="mt-1 text-xs text-rose-600">
            {errors.publishDate.message}
          </p>
        )}
      </div>

      {/* Image Upload (Bonus) */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Image{" "}
          <span className="text-xs font-normal text-slate-400">(optional)</span>
        </label>

        {imagePreview ? (
          <div className="relative overflow-hidden rounded-lg border border-slate-200">
            <img
              src={imagePreview}
              alt="Notice preview"
              className="h-32 w-full object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-black/70"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
            {isUploadingImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
              </div>
            )}
          </div>
        ) : (
          <label
            htmlFor="notice-image"
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/50 py-6 transition-colors hover:border-indigo-300 hover:bg-indigo-50/30"
          >
            <Upload className="mb-2 h-6 w-6 text-slate-400" />
            <span className="text-sm text-slate-500">
              Click to upload an image
            </span>
            <span className="mt-0.5 text-xs text-slate-400">
              PNG, JPG, WEBP up to 5MB
            </span>
          </label>
        )}
        <input
          ref={fileInputRef}
          id="notice-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isUploadingImage}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEditing ? "Update Notice" : "Publish Notice"}
        </button>
      </div>
    </form>
  );
}
