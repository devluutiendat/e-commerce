import type { Product } from "@/types";
import { ProductCard } from "./product-card";


export function ProductGrid({ products }: { products: Product[] }) {

  const sampledata: Product[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    type: "Clothing",
    description: "A comfortable cotton t-shirt for everyday wear.",
    price: 19.99,
    discountPercent: 10,
    images:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    createdAt: "2026-06-23T10:00:00Z",
    updatedAt: "2026-06-23T10:00:00Z",
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    type: "Clothing",
    description: "Modern slim-fit jeans with stretch fabric.",
    price: 49.99,
    images:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
    createdAt: "2026-06-23T10:00:00Z",
    updatedAt: "2026-06-23T10:00:00Z",
  },
  {
    id: 3,
    name: "Leather Sneakers",
    type: "Footwear",
    description: "Premium leather sneakers for casual outfits.",
    price: 79.99,
    discountPercent: 15,
    images:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    createdAt: "2026-06-23T10:00:00Z",
    updatedAt: "2026-06-23T10:00:00Z",
  },
  {
    id: 4,
    name: "Canvas Backpack",
    type: "Accessories",
    description: "Durable backpack with multiple compartments.",
    price: 44.99,
    images:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    createdAt: "2026-06-23T10:00:00Z",
    updatedAt: "2026-06-23T10:00:00Z",
  },
  {
    id: 5,
    name: "Sports Watch",
    type: "Accessories",
    description: "Water-resistant watch with fitness tracking.",
    price: 99.99,
    discountPercent: 20,
    images:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    createdAt: "2026-06-23T10:00:00Z",
    updatedAt: "2026-06-23T10:00:00Z",
  },
  {
    id: 6,
    name: "Polarized Sunglasses",
    type: "Accessories",
    description: "UV protection sunglasses with polarized lenses.",
    price: 29.99,
    images:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    createdAt: "2026-06-23T10:00:00Z",
    updatedAt: "2026-06-23T10:00:00Z",
  },
  {
    id: 7,
    name: "Oversized Hoodie",
    type: "Clothing",
    description: "Soft fleece hoodie with oversized fit.",
    price: 59.99,
    discountPercent: 5,
    images:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
    createdAt: "2026-06-23T10:00:00Z",
    updatedAt: "2026-06-23T10:00:00Z",
  },
  {
    id: 8,
    name: "Summer Dress",
    type: "Clothing",
    description: "Lightweight dress perfect for warm weather.",
    price: 39.99,
    images:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
    createdAt: "2026-06-23T10:00:00Z",
    updatedAt: "2026-06-23T10:00:00Z",
  },
];

 if
   (!products) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-lg">No products match yet</p>
        <p className="text-sm text-ink-soft mt-1">Try widening your filters.</p>
      </div>
    );
  } else if (products.length === 0) {
    products = sampledata; // Use sample data if products array is empty
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
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/5] bg-line rounded-sm" />
          <div className="mt-3 space-y-2">
            <div className="h-2.5 w-1/3 bg-line rounded-sm" />
            <div className="h-3.5 w-full bg-line rounded-sm" />
            <div className="h-4 w-1/2 bg-line rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
}
