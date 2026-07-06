import { ProductQuery } from "@/types";

export const queryKeys = {
   products: {
    all: ["products"] as const,
    list: (params?: ProductQuery) => ["products", "list", params] as const,
    topSelling: () => ["products", "top-selling"] as const,
    detail: (id: number) => ["products", "detail", id] as const,
  },
  users: {
    all: ["users"] as const,
    me: () => ["users", "me"] as const,
    list: (params?: { page?: number; limit?: number }) =>
      ["users", "list", params] as const,
    detail: (id: number) => ["users", "detail", id] as const,
  },
};
