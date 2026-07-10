import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import { KanbanColumn } from "@/features/notices/components/KanbanColumn";
import { NoticeCard } from "@/features/notices/components/NoticeCard";
import { NoticeModal } from "@/features/notices/components/NoticeModal";
import { NoticeDetailModal } from "@/features/notices/components/NoticeDetailModal";
import { NoticeInput } from "@/validators/notice.schema";
import { toast } from "sonner";
import { useSearch } from "@/context/SearchContext";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Category = "EXAM" | "EVENT" | "GENERAL";
type Notice = NoticeInput & { id: string };

export default function NoticeBoard() {
  const { data: notices = [], mutate } = useSWR<Notice[]>("/api/notices", fetcher);
  
  const [collapsed, setCollapsed] = useState<Record<Category, boolean>>({
    EXAM: false,
    EVENT: false,
    GENERAL: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("GENERAL");
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [viewingNotice, setViewingNotice] = useState<Notice | null>(null);
  const { searchQuery } = useSearch();

  const toggleCollapse = (cat: Category) => {
    setCollapsed(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleAddClick = (cat: Category) => {
    setActiveCategory(cat);
    setEditingNotice(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this notice?")) return;
    
    try {
      const res = await fetch(`/api/notices/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Notice deleted");
      mutate();
    } catch (err) {
      toast.error("Failed to delete notice");
    }
  };

  const getNoticesByCategory = (cat: Category) => {
    if (!Array.isArray(notices)) return [];
    
    let filtered = notices.filter(n => n.category === cat);
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.body.toLowerCase().includes(q)
      );
    }
    
    return filtered;
  };

  const columns: { title: Category }[] = [
    { title: "EXAM" },
    { title: "EVENT" },
    { title: "GENERAL" }
  ];

  return (
    <>
      <Head>
        <title>Notice Board | Premium</title>
      </Head>
      <main className="flex overflow-x-auto h-[calc(100vh-80px)] items-start px-8 py-6 bg-[#F8F9FA] dark:bg-[#0B0F19] transition-colors hide-scrollbar">
        <div className="flex gap-6 mx-auto">
        {columns.map(({ title }) => {
          const catNotices = getNoticesByCategory(title);
          return (
            <KanbanColumn 
              key={title}
              title={title} 
              count={catNotices.length} 
              isCollapsed={collapsed[title]}
              onToggleCollapse={() => toggleCollapse(title)}
              onAddClick={() => handleAddClick(title)}
            >
              {!collapsed[title] && catNotices.map(notice => (
                <NoticeCard 
                  key={notice.id} 
                  notice={{
                    ...notice,
                    publishDate: new Date(notice.publishDate)
                  }} 
                  onClick={() => setViewingNotice(notice)}
                  onEdit={(e) => {
                    e.stopPropagation();
                    setEditingNotice(notice);
                    setIsModalOpen(true);
                  }}
                  onDelete={(e) => handleDelete(notice.id, e)}
                />
              ))}
            </KanbanColumn>
          );
        })}
        </div>
      </main>

      <NoticeModal 
        isOpen={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setEditingNotice(null);
        }}
        defaultCategory={activeCategory}
        initialData={editingNotice || undefined}
        onSuccess={() => mutate()} 
      />

      <NoticeDetailModal
        isOpen={!!viewingNotice}
        onOpenChange={(open) => !open && setViewingNotice(null)}
        notice={viewingNotice ? {
          ...viewingNotice,
          publishDate: new Date(viewingNotice.publishDate)
        } : null}
      />
    </>
  );
}
