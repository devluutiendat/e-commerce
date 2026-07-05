import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "@/types";

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  length: 0,
  clear: () => {},
  key: () => null,
};

interface WishlistState {
  items: Product[];
  isInWishlist: (productId: number) => boolean;
  toggle: (product: Product) => void;
  remove: (productId: number) => void;
  clear: () => void;
}

// Wishlist persists to sessionStorage: it survives reloads within the same
// browser tab/session, but clears when the tab/browser is closed.
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      isInWishlist: (productId) =>
        get().items.some((item) => item.id === productId),

      toggle: (product) => {
        const exists = get().items.some((item) => item.id === product.id);
        set({
          items: exists
            ? get().items.filter((item) => item.id !== product.id)
            : [...get().items, product],
        });
      },

      remove: (productId) =>
        set({ items: get().items.filter((item) => item.id !== productId) }),

      clear: () => set({ items: [] }),
    }),
    {
      name: "shop_wishlist",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? sessionStorage
          : (noopStorage as Storage)
      ),
      skipHydration: true,
    }
  )
);
