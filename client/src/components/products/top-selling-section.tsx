"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid, ProductGridSkeleton, } from "@/components/products/product-grid";
import { useTopSellingProducts } from "@/hooks/use-products";

export function TopSellingSection() {
  const { data: products, isLoading, isError } = useTopSellingProducts();

  if (isError) return null;


  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-marigold-deep font-semibold mb-2">
            Selling fast
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-700 tracking-tight">
            Top picks this week
          </h2>
        </div>
        <Link
          href="/products"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
        >
          View all
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
      {isLoading ? (
        <ProductGridSkeleton count={4} />
      ) : (
        <ProductGrid products={products ?? []} />
      )}    
    </section>
  );
}
