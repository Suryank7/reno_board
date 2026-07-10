// ─────────────────────────────────────────────────────────────
// API Route: /api/notices/[id]
// Handles: GET (single), PUT (update), DELETE (remove)
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
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({
      success: false,
      error: "Notice ID is required",
    });
  }

  switch (req.method) {
    case "GET":
      return handleGet(id, res);
    case "PUT":
    case "PATCH":
      return handleUpdate(id, req, res);
    case "DELETE":
      return handleDelete(id, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
      return res.status(405).json({
        success: false,
        error: `Method ${req.method} not allowed`,
      });
  }
}

// ── GET /api/notices/[id] ─────────────────────────────────────
async function handleGet(
  id: string,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const notice = await prisma.notice.findUnique({
      where: { id },
    });

    if (!notice) {
      return res.status(404).json({
        success: false,
        error: "Notice not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: notice,
    });
  } catch (error) {
    console.error(`[GET /api/notices/${id}] Error:`, error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch notice",
    });
  }
}

// ── PUT /api/notices/[id] ─────────────────────────────────────
// Updates an existing notice after server-side Zod validation.
async function handleUpdate(
  id: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    // Check if notice exists
    const existing = await prisma.notice.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: "Notice not found",
      });
    }

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

    const updatedNotice = await prisma.notice.update({
      where: { id },
      data: {
        title,
        body,
        category,
        priority,
        publishDate: new Date(publishDate),
        image: image || null,
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedNotice,
    });
  } catch (error) {
    console.error(`[PUT /api/notices/${id}] Error:`, error);
    return res.status(500).json({
      success: false,
      error: "Failed to update notice",
    });
  }
}

// ── DELETE /api/notices/[id] ──────────────────────────────────
async function handleDelete(
  id: string,
  res: NextApiResponse<ApiResponse>
) {
  try {
    // Check if notice exists
    const existing = await prisma.notice.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: "Notice not found",
      });
    }

    await prisma.notice.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      data: { id },
    });
  } catch (error) {
    console.error(`[DELETE /api/notices/${id}] Error:`, error);
    return res.status(500).json({
      success: false,
      error: "Failed to delete notice",
    });
  }
}
