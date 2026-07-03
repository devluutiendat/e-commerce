import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-marigold-deep font-semibold mb-4">
            Every tag tells the truth
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-700 leading-[1.05] tracking-tight">
            Goods priced like
            <br />
            they should be.
          </h1>
          <p className="mt-5 text-ink-soft max-w-md text-base leading-relaxed">
            No inflated &ldquo;was&rdquo; prices, no countdown timers. Just clear
            stock, fair tags, and a checkout that gets out of your way.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3.5 text-sm font-medium hover:bg-marigold-deep transition-colors rounded-sm"
            >
              Browse the catalog
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/products?sortBy=createdAt&order=desc"
              className="text-sm font-medium text-ink-soft hover:text-ink transition-colors"
            >
              See what&rsquo;s new
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:flex justify-center">
          <div className="price-tag bg-marigold text-paper font-display text-2xl font-700 px-8 py-5 rotate-[-4deg] shadow-xl">
            29.990.000₫
          </div>
          <div className="price-tag bg-ink text-paper font-display text-lg font-700 px-6 py-4 absolute top-20 -left-4 rotate-[6deg] shadow-lg">
            -10%
          </div>
          <div className="price-tag bg-paper-raised border border-line text-ink font-display text-base font-600 px-5 py-3 absolute bottom-4 right-2 rotate-[3deg] shadow-md">
            In stock
          </div>
        </div>
      </div>
    </section>
  );
}
