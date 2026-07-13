"use client";

import { Loader2 } from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { useRequireAdmin } from "@/hooks/use-require-admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isReady } = useRequireAdmin();

  if (!isReady) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="size-6 animate-spin text-ink-soft" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 flex gap-10">
      <AdminSidebar />
      <div className="flex-1 py-8 min-w-0">{children}</div>
    </div>
  );
}
