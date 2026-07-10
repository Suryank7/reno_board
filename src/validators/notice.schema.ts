// ─────────────────────────────────────────────────────────────
// Shared Zod Validation Schema for Notices
// Used on BOTH client (React Hook Form) and server (API routes)
// ─────────────────────────────────────────────────────────────

import { z } from "zod";

// ── Enum values (reusable for selects) ────────────────────────
export const CATEGORY_OPTIONS = ["EXAM", "EVENT", "GENERAL"] as const;
export const PRIORITY_OPTIONS = ["URGENT", "NORMAL"] as const;

// ── Schema for creating/updating a notice ─────────────────────
export const noticeSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be 255 characters or fewer")
    .trim(),

  body: z
    .string()
    .min(1, "Body is required")
    .trim(),

  category: z.enum(CATEGORY_OPTIONS, {
    errorMap: () => ({ message: "Category must be Exam, Event, or General" }),
  }),

  priority: z.enum(PRIORITY_OPTIONS, {
    errorMap: () => ({ message: "Priority must be Urgent or Normal" }),
  }),

  publishDate: z
    .string()
    .min(1, "Publish date is required")
    .refine(
      (val) => !isNaN(Date.parse(val)),
      { message: "Publish date must be a valid date" }
    ),

  image: z
    .string()
    .url("Image must be a valid URL")
    .optional()
    .or(z.literal("")),
});

// ── TypeScript types derived from the schema ──────────────────
export type NoticeFormData = z.infer<typeof noticeSchema>;

// ── Schema for API responses ──────────────────────────────────
export const noticeResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  category: z.enum(CATEGORY_OPTIONS),
  priority: z.enum(PRIORITY_OPTIONS),
  publishDate: z.string(),
  image: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type NoticeResponse = z.infer<typeof noticeResponseSchema>;
