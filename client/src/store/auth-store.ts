import { create } from "zustand";
import type { User } from "@/types";
import { tokenStorage } from "@/lib/api/client";

interface AuthState {
  user: User | null;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  setHydrated: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isHydrated: false,
  setUser: (user) => set({ user }),
  setHydrated: () => set({ isHydrated: true }),
  logout: () => {
    tokenStorage.clear();
    set({ user: null });
  },
}));
