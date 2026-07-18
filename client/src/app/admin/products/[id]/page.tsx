"use client";

import { use } from "react";
import { Loader2 } from "lucide-react";
import { useProduct } from "@/hooks/use-products";
import { ProductForm } from "@/components/admin/product-form";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: product, isLoading, isError } = useProduct(Number(id));

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="size-5 animate-spin text-ink-soft" />
      </div>
    );
  }

  if (isError || !product) {
    return <p className="text-sm text-red py-16 text-center">Product not found.</p>;
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-700 tracking-tight mb-8">Edit product</h1>
      <ProductForm product={product} />
    </div>
  );
}
