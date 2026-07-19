"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { ProductGrid, ProductGridSkeleton } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";
import { Pagination } from "@/components/ui/pagination";
import type { ProductQuery } from "@/types";

const LIMIT = 12;

function ProductsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query: ProductQuery = useMemo(
    () => ({
      page: Number(searchParams.get("page") ?? 1),
      limit: LIMIT,
      search: searchParams.get("search") ?? undefined,
      type: searchParams.get("type") ?? undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      sortBy: (searchParams.get("sortBy") as ProductQuery["sortBy"]) ?? "createdAt",
      order: (searchParams.get("order") as ProductQuery["order"]) ?? "desc",
    }),
    [searchParams]
  );

  const { data, isLoading, isError, isFetching } = useProducts(query);

  function updateQuery(next: ProductQuery) {
    const params = new URLSearchParams();
    Object.entries(next).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && key !== "limit") {
        params.set(key, String(value));
      }
    });
    router.push(`/products?${params.toString()}`);
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.meta.total / LIMIT)) : 1;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-700 tracking-tight">
            {query.search ? `datas for "${query.search}"` : "All products"}
          </h1>
          {data && (
            <p className="text-sm text-ink-soft mt-1">
              {data.meta.total} {data.meta.total === 1 ? "item" : "items"}
            </p>
          )}
        </div>
        <SlidersHorizontal className="size-4 text-ink-soft lg:hidden" />
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-10">
        <div className="hidden lg:block">
          <ProductFilters value={query} onChange={updateQuery} />
        </div>

        <div className={isFetching ? "opacity-60 transition-opacity" : "transition-opacity"}>
          {isError ? (
            <div className="py-24 text-center">
              <p className="font-display text-lg">Couldn&rsquo;t load products</p>
              <p className="text-sm text-ink-soft mt-1">
                Check that the API is running and reachable.
              </p>
            </div>
          ) : isLoading ? (
            <ProductGridSkeleton count={LIMIT} />
          ) : (
            <>
              <ProductGrid products={data?.products ?? []} />
              <Pagination
                page={query.page ?? 1}
                totalPages={totalPages}
                onChange={(page) => updateQuery({ ...query, page })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 sm:px-6 py-10"><ProductGridSkeleton /></div>}>
      <ProductsPageInner />
    </Suspense>
  );
}
