import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className="flex items-center justify-center gap-1.5 mt-12">
      <Button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="p-2 border border-line rounded-sm hover:border-ink disabled:opacity-40 disabled:hover:border-line transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </Button>

      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-1.5">
          {i > 0 && pages[i - 1] !== p - 1 && (
            <span className="px-1 text-ink-soft text-sm">…</span>
          )}
          <Button
            onClick={() => onChange(p)}
            className={`size-9 text-sm font-medium rounded-sm border transition-colors ${
              p === page
                ? "bg-ink text-paper border-ink"
                : "border-line hover:border-ink"
            }`}
          >
            {p}
          </Button>
        </span>
      ))}

      <Button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="p-2 border border-line rounded-sm hover:border-ink disabled:opacity-40 disabled:hover:border-line transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
