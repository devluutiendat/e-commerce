import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row justify-between gap-6">
        <div>
          <p className="font-display text-lg font-700">
            Chợ<span className="text-marigold">Tốt</span>
          </p>
          <p className="text-sm text-ink-soft mt-1 max-w-xs">
            Everyday goods, honestly priced. No markup theatre, just the tag.
          </p>
        </div>
        <div className="flex gap-10 text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-ink-soft font-medium mb-1">
              Shop
            </span>
            <Link href="/products" className="hover:text-marigold-deep transition-colors">
              All products
            </Link>
            <Link href="/wishlist" className="hover:text-marigold-deep transition-colors">
              Wishlist
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-ink-soft font-medium mb-1">
              Account
            </span>
            <Link href="/orders" className="hover:text-marigold-deep transition-colors">
              Orders
            </Link>
            <Link href="/profile" className="hover:text-marigold-deep transition-colors">
              Profile
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-ink-soft">
        Built on the E-Commerce API · {new Date().getFullYear()}
      </div>
    </footer>
  );
}
