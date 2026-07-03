import { cn } from "@/lib/utils";
import { formatVND, discountedPrice } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  discountPercent?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "pl-4 pr-2.5 py-1 text-xs",
  md: "pl-5 pr-3 py-1.5 text-sm",
  lg: "pl-6 pr-4 py-2 text-base",
};

export function PriceTag({ price, discountPercent, size = "md", className }: PriceTagProps) {
  const hasDiscount = !!discountPercent && discountPercent > 0;
  const final = discountedPrice(price, discountPercent);

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "price-tag bg-marigold text-paper font-display font-semibold whitespace-nowrap",
          sizes[size]
        )}
      >
        {formatVND(final)}
      </span>
      {hasDiscount && (
        <span className="text-ink-soft text-xs line-through decoration-red/70">
          {formatVND(price)}
        </span>
      )}
      {hasDiscount && (
        <span className="text-red text-xs font-semibold">-{discountPercent}%</span>
      )}
    </div>
  );
}
