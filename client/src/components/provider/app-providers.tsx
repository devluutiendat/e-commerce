

"use client";

import { Toaster } from "sonner";
import { QueryProvider } from "./query-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--color-ink)",
            color: "var(--color-paper)",
            border: "none",
          },
        }}
      />
    </QueryProvider>
  );
}
