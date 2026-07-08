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

export interface CartLine {
  product: Product;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
}

// The API has no cart endpoint — only direct order creation — so the cart
// lives client-side (sessionStorage) until the user checks out, at which
// point each line becomes a POST /orders call.
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],

      addItem: (product, quantity = 1) => {
        const existing = get().lines.find((l) => l.product.id === product.id);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.product.id === product.id
                ? { ...l, quantity: l.quantity + quantity }
                : l
            ),
          });
        } else {
          set({ lines: [...get().lines, { product, quantity }] });
        }
      },

      removeItem: (productId) =>
        set({ lines: get().lines.filter((l) => l.product.id !== productId) }),

      setQuantity: (productId, quantity) =>
        set({
          lines: get().lines.map((l) =>
            l.product.id === productId ? { ...l, quantity } : l
          ),
        }),

      clear: () => set({ lines: [] }),
    }),
    {
      name: "shop_cart",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? sessionStorage
          : (noopStorage as Storage)
      ),
      skipHydration: true,
    }
  )
);
