// ─────────────────────────────────────────────────────────────
// Notice API Service
// Centralizes all API calls related to notices.
// Keeps fetch logic out of UI components.
// ─────────────────────────────────────────────────────────────

import type { NoticeFormData } from "@/validators/notice.schema";

export interface Notice {
  id: string;
  title: string;
  body: string;
  category: "EXAM" | "EVENT" | "GENERAL";
  priority: "URGENT" | "NORMAL";
  publishDate: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

const API_BASE = "/api/notices";

// ── Fetch all notices ─────────────────────────────────────────
export async function fetchNotices(): Promise<Notice[]> {
  const response = await fetch(API_BASE);
  const json: ApiResponse<Notice[]> = await response.json();

  if (!json.success) {
    throw new Error(json.error ?? "Failed to fetch notices");
  }

  return json.data ?? [];
}

// ── Create a new notice ───────────────────────────────────────
export async function createNotice(data: NoticeFormData): Promise<Notice> {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json: ApiResponse<Notice> = await response.json();

  if (!json.success) {
    const errorMessage = json.errors
      ? Object.values(json.errors).flat().join(", ")
      : json.error ?? "Failed to create notice";
    throw new Error(errorMessage);
  }

  return json.data as Notice;
}

// ── Update an existing notice ─────────────────────────────────
export async function updateNotice(
  id: string,
  data: NoticeFormData
): Promise<Notice> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json: ApiResponse<Notice> = await response.json();

  if (!json.success) {
    const errorMessage = json.errors
      ? Object.values(json.errors).flat().join(", ")
      : json.error ?? "Failed to update notice";
    throw new Error(errorMessage);
  }

  return json.data as Notice;
}

// ── Delete a notice ───────────────────────────────────────────
export async function deleteNotice(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  const json: ApiResponse<{ id: string }> = await response.json();

  if (!json.success) {
    throw new Error(json.error ?? "Failed to delete notice");
  }
}

// ── Upload image to Cloudinary ────────────────────────────────
export async function uploadImage(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary is not configured");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data.secure_url;
}
