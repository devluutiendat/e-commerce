"use client";

import { useSyncExternalStore } from "react";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";

let hasTriggered = false;

function triggerHydration() {
  if (hasTriggered) return;
  hasTriggered = true;
  useWishlistStore.persist.rehydrate();
  useCartStore.persist.rehydrate();
}

function subscribe(callback: () => void) {
  const unsubWishlist = useWishlistStore.persist.onFinishHydration(callback);
  const unsubCart = useCartStore.persist.onFinishHydration(callback);
  return () => {
    unsubWishlist();
    unsubCart();
  };
}

/**
 * Triggers and tracks hydration for stores using sessionStorage (which have
 * skipHydration: true to avoid SSR/client mismatches). Mount once near the
 * root of the app. Safe to call from multiple components.
 */
export function useHydrateStores() {
  if (typeof window !== "undefined") triggerHydration();

  return useSyncExternalStore(
    subscribe,
    () => useWishlistStore.persist.hasHydrated() && useCartStore.persist.hasHydrated(),
    () => false
  );
}
