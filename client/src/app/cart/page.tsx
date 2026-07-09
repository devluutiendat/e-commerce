"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { useCreateOrder } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/ui/price-tag";
import { formatVND, discountedPrice } from "@/lib/utils";
import { getErrorMessage } from "@/lib/api/client";

export default function CartPage() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const clearCart = useCartStore((s) => s.clear);
  const user = useAuthStore((s) => s.user);
  const createOrder = useCreateOrder();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = lines.reduce(
    (sum, l) => sum + discountedPrice(l.product.price, l.product.discountPercent) * l.quantity,
    0
  );

  async function handleCheckout() {
    if (!user) {
      router.push("/login");
      return;
    }
    setIsCheckingOut(true);
    try {
      for (const line of lines) {
        await createOrder.mutateAsync({
          productId: line.product.id,
          quantity: line.quantity,
        });
      }
      clearCart();
      toast.success("Order placed! Track it from your orders page.");
      router.push("/orders");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsCheckingOut(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-24 text-center">
        <ShoppingBag className="size-8 mx-auto text-ink-soft mb-3" />
        <p className="font-display text-lg">Your cart is empty</p>
        <p className="text-sm text-ink-soft mt-1 mb-6">
          Saved for this session only — browse and add something you like.
        </p>
        <Link href="/products">
          <Button>Browse products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl font-700 tracking-tight mb-8">Your cart</h1>

      <div className="grid lg:grid-cols-[1fr_320px] gap-10">
        <div className="divide-y divide-line border-y border-line">
          {lines.map((line) => {
            const cover = line.product.images;
            return (
              <div key={line.product.id} className="flex gap-4 py-5">
                <Link
                  href={`/products/${line.product.id}`}
                  className="relative size-20 shrink-0 bg-paper-raised border border-line rounded-sm overflow-hidden"
                >
                  {cover && (
                    <Image
                      src={cover}
                      alt={line.product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${line.product.id}`}
                    className="text-sm font-medium hover:text-marigold-deep transition-colors line-clamp-1"
                  >
                    {line.product.name}
                  </Link>
                  <p className="text-xs text-ink-soft mt-0.5">{line.product.type}</p>
                  <div className="mt-2">
                    <PriceTag
                      price={line.product.price}
                      discountPercent={line.product.discountPercent}
                      size="sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(line.product.id)}
                    aria-label="Remove from cart"
                    className="text-ink-soft hover:text-red transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <div className="flex items-center border border-line rounded-sm">
                    <button
                      onClick={() =>
                        setQuantity(line.product.id, Math.max(1, line.quantity - 1))
                      }
                      className="size-7 flex items-center justify-center text-sm hover:bg-marigold-tint transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-xs font-medium">
                      {line.quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(line.product.id, line.quantity + 1)}
                      className="size-7 flex items-center justify-center text-sm hover:bg-marigold-tint transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-fit border border-line rounded-sm p-5 space-y-4">
          <h2 className="font-display text-lg font-700">Summary</h2>
          <div className="flex justify-between text-sm">
            <span className="text-ink-soft">
              {lines.length} {lines.length === 1 ? "item" : "items"}
            </span>
            <span className="font-medium">{formatVND(total)}</span>
          </div>
          <div className="border-t border-line pt-4 flex justify-between items-baseline">
            <span className="text-sm font-medium">Total</span>
            <span className="font-display text-xl font-700">{formatVND(total)}</span>
          </div>
          <Button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            size="lg"
            className="w-full"
          >
            {user ? "Place order" : "Sign in to check out"}
          </Button>
          {isCheckingOut && (
            <p className="text-xs text-ink-soft flex items-center gap-1.5">
              <Loader2 className="size-3 animate-spin" />
              Placing your order…
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
