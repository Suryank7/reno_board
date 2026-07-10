// ─────────────────────────────────────────────────────────────
// API Route: /api/notices
// Handles: GET (list all) and POST (create new)
// ─────────────────────────────────────────────────────────────

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";
import { noticeSchema } from "@/validators/notice.schema";

type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({
        success: false,
        error: `Method ${req.method} not allowed`,
      });
  }
}

// ── GET /api/notices ──────────────────────────────────────────
// Fetches all notices, sorted by:
//   1. priority ASC  → URGENT (enum index 1) before NORMAL (enum index 2)
//   2. publishDate DESC → newest first within same priority
// This sorting is handled NATIVELY in the database via Prisma orderBy.
async function handleGet(
  _req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: [
        { priority: "asc" },
        { publishDate: "desc" },
      ],
    });

    return res.status(200).json({
      success: true,
      data: notices,
    });
  } catch (error) {
    console.error("[GET /api/notices] Database error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch notices. Please try again later.",
    });
  }
}

// ── POST /api/notices ─────────────────────────────────────────
// Creates a new notice after server-side Zod validation.
async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    // Server-side validation with Zod
    const parseResult = noticeSchema.safeParse(req.body);

    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        errors: fieldErrors as Record<string, string[]>,
      });
    }

    const { title, body, category, priority, publishDate, image } =
      parseResult.data;

    const notice = await prisma.notice.create({
      data: {
        title,
        body,
        category,
        priority,
        publishDate: new Date(publishDate),
        image: image || null,
      },
    });

    return res.status(201).json({
      success: true,
      data: notice,
    });
  } catch (error) {
    console.error("[POST /api/notices] Error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to create notice. Please try again later.",
    });
  }
}
