import { z } from "zod";

export const noticeSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  body: z.string().min(1, "Body is required"),
  category: z.enum(["EXAM", "EVENT", "GENERAL"]),
  priority: z.enum(["URGENT", "NORMAL"]),
  publishDate: z.string().datetime().or(z.date()),
  image: z.string().url().optional().or(z.literal("")),
});

export type NoticeInput = z.infer<typeof noticeSchema>;
