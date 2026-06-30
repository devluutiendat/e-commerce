
export const queryKeys = {
  users: {
    all: ["users"] as const,
    me: () => ["users", "me"] as const,
    list: (params?: { page?: number; limit?: number }) =>
      ["users", "list", params] as const,
    detail: (id: number) => ["users", "detail", id] as const,
  },
};
