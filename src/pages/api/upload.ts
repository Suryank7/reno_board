// ─────────────────────────────────────────────────────────────
// API Route: /api/upload
// Handles: POST (Cloudinary image upload via URL)
// Bonus feature for notice image attachments
// ─────────────────────────────────────────────────────────────

import type { NextApiRequest, NextApiResponse } from "next";

type ApiResponse = {
  success: boolean;
  data?: { url: string };
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`,
    });
  }

  try {
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({
        success: false,
        error: "No image data provided",
      });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return res.status(500).json({
        success: false,
        error: "Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.",
      });
    }

    const formData = new FormData();
    formData.append("file", imageData);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const data = await response.json();

    return res.status(200).json({
      success: true,
      data: { url: data.secure_url },
    });
  } catch (error) {
    console.error("[POST /api/upload] Error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to upload image",
    });
  }
}
