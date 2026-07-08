"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShoppingBag, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useProduct } from "@/hooks/use-products";
import { PriceTag } from "@/components/ui/price-tag";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const productId = Number(id);
  const router = useRouter();
  const { data: product, isLoading, isError } = useProduct(productId);

  const [quantity, setQuantity] = useState(1);
  const isInWishlist = useWishlistStore((s) =>
    product ? s.isInWishlist(product.id) : false,
  );
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const addToCart = useCartStore((s) => s.addItem);
  const user = useAuthStore((s) => s.user);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 flex justify-center">
        <Loader2 className="size-6 animate-spin text-ink-soft" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 text-center">
        <p className="font-display text-lg">Product not found</p>
        <Link
          href="/products"
          className="text-sm text-marigold-deep mt-2 inline-block"
        >
          Back to all products
        </Link>
      </div>
    );
  }

  function handleAddToCart() {
    if (!product) return;
    addToCart(product, quantity);
    toast.success(`Added ${quantity} × ${product.name} to cart`);
  }

  function handleBuyNow() {
    if (!product) return;
    if (!user) {
      router.push("/login");
      return;
    }
    addToCart(product, quantity);
    router.push("/cart");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink transition-colors mb-6"
      >
        <ArrowLeft className="size-3.5" />
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative aspect-square bg-paper-raised border border-line rounded-sm overflow-hidden">
          {product.images ? (
            <Image
              src={product.images}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              unoptimized
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-ink-soft text-sm">
              No image
            </div>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-ink-soft mb-2">
            {product.type}
          </p>
          <h1 className="font-display text-3xl font-700 tracking-tight leading-tight">
            {product.name}
          </h1>

          <div className="mt-5">
            <PriceTag
              price={product.price}
              discountPercent={product.discountPercent}
              size="lg"
            />
          </div>

          <p className="mt-6 text-sm text-ink-soft leading-relaxed whitespace-pre-line">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center border border-line rounded-sm">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="size-10 flex items-center justify-center hover:bg-marigold-tint transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="size-10 flex items-center justify-center hover:bg-marigold-tint transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className="size-10 flex items-center justify-center border border-line rounded-sm hover:border-ink transition-colors"
            >
              <Heart
                className={cn(
                  "size-4",
                  isInWishlist ? "fill-red text-red" : "",
                )}
              />
            </button>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAddToCart}
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              <ShoppingBag className="size-4" />
              Add to cart
            </Button>
            <Button onClick={handleBuyNow} size="lg" className="flex-1">
              Buy now
            </Button>
          </div>

          {!user && (
            <p className="text-xs text-ink-soft mt-3">
              <Link href="/login" className="underline hover:text-ink">
                Sign in
              </Link>{" "}
              to check out faster.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
