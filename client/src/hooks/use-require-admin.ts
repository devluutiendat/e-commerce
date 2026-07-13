"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useCurrentUser } from "@/hooks/use-auth";
import { UserRole } from "@/types";

export function useRequireAdmin() {
  const router = useRouter();
  const { isLoading } = useCurrentUser();
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  useEffect(() => {
    if (!isHydrated || isLoading) return;
    if (!user) {
      router.replace("/login");
    } else if (user.role !== UserRole.ADMIN) {
      router.replace("/");
    }
  }, [user, isHydrated, isLoading, router]);

  return { user, isReady: isHydrated && !isLoading && user?.role === UserRole.ADMIN };
}
