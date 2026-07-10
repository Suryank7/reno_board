// ─────────────────────────────────────────────────────────────
// useNotices Hook
// Custom hook managing notice CRUD state and operations.
// Separates business logic from UI components.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react";
import {
  fetchNotices,
  createNotice,
  updateNotice,
  deleteNotice,
  type Notice,
} from "@/features/notices/services/notice-service";
import type { NoticeFormData } from "@/validators/notice.schema";

interface UseNoticesReturn {
  notices: Notice[];
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
  isDeleting: string | null;
  refetchNotices: () => Promise<void>;
  handleCreateNotice: (data: NoticeFormData) => Promise<void>;
  handleUpdateNotice: (id: string, data: NoticeFormData) => Promise<void>;
  handleDeleteNotice: (id: string) => Promise<void>;
}

export function useNotices(): UseNoticesReturn {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // ── Fetch all notices ─────────────────────────────────────
  const refetchNotices = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchNotices();
      setNotices(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch notices";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Initial fetch ─────────────────────────────────────────
  useEffect(() => {
    refetchNotices();
  }, [refetchNotices]);

  // ── Create a new notice ───────────────────────────────────
  const handleCreateNotice = useCallback(
    async (data: NoticeFormData) => {
      setIsSubmitting(true);
      try {
        await createNotice(data);
        await refetchNotices();
      } finally {
        setIsSubmitting(false);
      }
    },
    [refetchNotices]
  );

  // ── Update an existing notice ─────────────────────────────
  const handleUpdateNotice = useCallback(
    async (id: string, data: NoticeFormData) => {
      setIsSubmitting(true);
      try {
        await updateNotice(id, data);
        await refetchNotices();
      } finally {
        setIsSubmitting(false);
      }
    },
    [refetchNotices]
  );

  // ── Delete a notice ───────────────────────────────────────
  const handleDeleteNotice = useCallback(
    async (id: string) => {
      setIsDeleting(id);
      try {
        await deleteNotice(id);
        // Optimistic UI: remove from list immediately
        setNotices((prev) => prev.filter((n) => n.id !== id));
      } finally {
        setIsDeleting(null);
      }
    },
    []
  );

  return {
    notices,
    isLoading,
    error,
    isSubmitting,
    isDeleting,
    refetchNotices,
    handleCreateNotice,
    handleUpdateNotice,
    handleDeleteNotice,
  };
}
