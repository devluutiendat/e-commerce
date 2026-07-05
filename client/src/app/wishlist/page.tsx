"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist-store";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const clear = useWishlistStore((s) => s.clear);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-700 tracking-tight">Wishlist</h1>
          <p className="text-sm text-ink-soft mt-1">
            Saved for this session — {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>
        {items.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clear}>
            Clear all
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center">
          <Heart className="size-8 mx-auto text-ink-soft mb-3" />
          <p className="font-display text-lg">Nothing saved yet</p>
          <p className="text-sm text-ink-soft mt-1">
            Tap the heart on any product to keep it here for this session.
          </p>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}
