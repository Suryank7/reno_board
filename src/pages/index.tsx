// ─────────────────────────────────────────────────────────────
// index.tsx — Notice Board Dashboard (Main Page)
// Assembles all components: Header, Filters, Grid, Dialogs
// ─────────────────────────────────────────────────────────────

import { useState, useMemo, useCallback } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { Header } from "@/components/layout/Header";
import { NoticeForm } from "@/features/notices/components/NoticeForm";
import { NoticeGrid } from "@/features/notices/components/NoticeGrid";
import { NoticeFilters } from "@/features/notices/components/NoticeFilters";
import { DeleteDialog } from "@/features/notices/components/DeleteDialog";
import { NoticeSkeleton } from "@/features/notices/components/NoticeSkeleton";
import { EmptyState } from "@/features/notices/components/EmptyState";
import { useNotices } from "@/features/notices/hooks/use-notices";
import type { Notice } from "@/features/notices/services/notice-service";
import type { NoticeFormData } from "@/validators/notice.schema";

export default function HomePage() {
  // ── State ─────────────────────────────────────────────────
  const {
    notices,
    isLoading,
    error,
    isSubmitting,
    isDeleting,
    handleCreateNotice,
    handleUpdateNotice,
    handleDeleteNotice,
  } = useNotices();

  // Form dialog state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

  // Delete dialog state
  const [noticeToDelete, setNoticeToDelete] = useState<Notice | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  // ── Filtered notices (client-side) ────────────────────────
  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          notice.title.toLowerCase().includes(query) ||
          notice.body.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (categoryFilter !== "ALL" && notice.category !== categoryFilter) {
        return false;
      }

      // Priority filter
      if (priorityFilter !== "ALL" && notice.priority !== priorityFilter) {
        return false;
      }

      return true;
    });
  }, [notices, searchQuery, categoryFilter, priorityFilter]);

  const hasActiveFilters =
    searchQuery !== "" ||
    categoryFilter !== "ALL" ||
    priorityFilter !== "ALL";

  // ── Handlers ──────────────────────────────────────────────
  const openCreateForm = useCallback(() => {
    setEditingNotice(null);
    setIsFormOpen(true);
  }, []);

  const openEditForm = useCallback((notice: Notice) => {
    setEditingNotice(notice);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingNotice(null);
  }, []);

  const openDeleteDialog = useCallback((notice: Notice) => {
    setNoticeToDelete(notice);
    setIsDeleteDialogOpen(true);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setNoticeToDelete(null);
  }, []);

  const handleFormSubmit = useCallback(
    async (data: NoticeFormData) => {
      try {
        if (editingNotice) {
          await handleUpdateNotice(editingNotice.id, data);
          toast.success("Notice updated successfully");
        } else {
          await handleCreateNotice(data);
          toast.success("Notice published successfully");
        }
        closeForm();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        toast.error(message);
      }
    },
    [editingNotice, handleCreateNotice, handleUpdateNotice, closeForm]
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!noticeToDelete) return;
    try {
      await handleDeleteNotice(noticeToDelete.id);
      toast.success("Notice deleted successfully");
      closeDeleteDialog();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete notice";
      toast.error(message);
    }
  }, [noticeToDelete, handleDeleteNotice, closeDeleteDialog]);

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      <Head>
        <title>Notice Board — Reno Enterprise Management System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        {/* Dot grid background */}
        <div className="fixed inset-0 dot-grid opacity-30 pointer-events-none" />

        <Header />

        <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Notice Board
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage institutional notices and announcements
              </p>
            </div>

            <button
              onClick={openCreateForm}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 hover:shadow-md"
              id="create-notice-button"
            >
              <Plus className="h-4 w-4" />
              Create Notice
            </button>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <NoticeFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              priorityFilter={priorityFilter}
              onPriorityChange={setPriorityFilter}
            />
          </div>

          {/* Notice count */}
          {!isLoading && !error && notices.length > 0 && (
            <div className="mb-4 text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filteredNotices.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-700">
                {notices.length}
              </span>{" "}
              notices
            </div>
          )}

          {/* Content Area */}
          {isLoading ? (
            <NoticeSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
                <AlertCircle className="h-7 w-7 text-rose-500" />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-slate-900">
                Something went wrong
              </h3>
              <p className="text-sm text-slate-500">{error}</p>
            </div>
          ) : filteredNotices.length === 0 ? (
            <EmptyState
              onCreateClick={openCreateForm}
              hasFilters={hasActiveFilters}
            />
          ) : (
            <NoticeGrid
              notices={filteredNotices}
              onEdit={openEditForm}
              onDelete={openDeleteDialog}
              deletingId={isDeleting}
            />
          )}
        </main>
      </div>

      {/* ── Form Dialog (Create / Edit) ───────────────────────── */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={closeForm}
            />

            {/* Dialog Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-lg overflow-y-auto border-l border-slate-200 bg-white shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  {editingNotice ? "Edit Notice" : "Create Notice"}
                </h2>
                <button
                  onClick={closeForm}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Close form"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <NoticeForm
                  notice={editingNotice}
                  onSubmit={handleFormSubmit}
                  onCancel={closeForm}
                  isSubmitting={isSubmitting}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation Dialog ────────────────────────── */}
      <DeleteDialog
        notice={noticeToDelete}
        isOpen={isDeleteDialogOpen}
        isDeleting={isDeleting === noticeToDelete?.id}
        onConfirm={handleConfirmDelete}
        onCancel={closeDeleteDialog}
      />
    </>
  );
}
