import type { Product } from "@/types";
import { ProductCard } from "./product-card";
import { Skeleton } from "../ui/skeleton";


export function ProductGrid({ products }: { products: Product[] }) {
  
 if
   (!products || products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-lg">No products match yet</p>
        <p className="text-sm text-ink-soft mt-1">Try widening your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-[4/5] w-full" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-2.5 w-1/3" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
