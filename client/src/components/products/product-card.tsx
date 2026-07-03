"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import type { Product } from "@/types";
import { PriceTag } from "@/components/ui/price-tag";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {

  return (
    <div className="group animate-rise">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/5] bg-paper-raised border border-line overflow-hidden rounded-sm">
          {product.images && product.images.length > 0 ? (
            <Image
              src={(product.images)}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-ink-soft text-sm">
              No image
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="absolute top-2.5 right-2.5 p-2 bg-paper/90 backdrop-blur rounded-full hover:bg-paper transition-colors"
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
              )}
            />
          </button>

          {!!product.discountPercent && (
            <span className="absolute top-2.5 left-2.5 bg-red text-paper text-[11px] font-semibold px-2 py-1 rounded-sm">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        <div className="mt-3 space-y-1.5">
          <p className="text-[11px] uppercase tracking-wide text-ink-soft">
            {product.type}
          </p>
          <h3 className="text-sm font-medium leading-snug line-clamp-2">
            {product.name}
          </h3>
          <PriceTag price={product.price} discountPercent={product.discountPercent} size="sm" />
        </div>
      </Link>
    </div>
  );
}
