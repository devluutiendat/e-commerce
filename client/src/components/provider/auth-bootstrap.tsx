"use client";

import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth-store";
import { useHydrateStores } from "@/hooks/use-hydrate-stores";

export function AuthBootstrap() {
  useHydrateStores();
  const { isError } = useCurrentUser();
  const setUser = useAuthStore((s) => s.setUser);
  const setHydrated = useAuthStore((s) => s.setHydrated);

  useEffect(() => {
    setHydrated();
  }, [setHydrated]);

  useEffect(() => {
    if (isError) setUser(null);
  }, [isError, setUser]);

  return null;
}
