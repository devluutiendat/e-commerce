"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ImageUploader } from "@/components/admin/image-uploader"
import { useCreateProduct, useUpdateProduct } from "@/hooks/use-products"
import { getErrorMessage } from "@/lib/api/client"
import type { Product } from "@/types"
import { CloudinaryUploadWidgetInfo } from "next-cloudinary"
import { Textarea } from "../ui/textarea"

interface ProductFormProps {
  product?: Product
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const isEdit = !!product
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()

  const [form, setForm] = useState({
    name: product?.name ?? "",
    type: product?.type ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    discountPercent: product?.discountPercent?.toString() ?? "",
  })
  const [uploadedImage, setUploadedImage] = useState<CloudinaryUploadWidgetInfo | null>(null);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!uploadedImage) {
      toast.error("Add at least one product image")
      return
    }
    const dto = {
      name: form.name,
      type: form.type,
      description: form.description,
      price: Number(form.price),
      discountPercent: form.discountPercent ? Number(form.discountPercent) : undefined,
      images: uploadedImage.url
    }
    if (isEdit) {
      updateProduct.mutate({ id: product.id, dto }, {
        onSuccess: () => { toast.success("Product updated"); router.push("/admin/products") },
        onError: (error) => toast.error(getErrorMessage(error)),
      })
    } else {
      createProduct.mutate(dto, {
        onSuccess: () => { toast.success("Product created"); router.push("/admin/products") },
        onError: (error) => toast.error(getErrorMessage(error)),
      })
    }
  }

  const isPending = createProduct.isPending || updateProduct.isPending

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Image</CardTitle>
          <CardDescription>Upload via Cloudinary. First image is the cover.</CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUploader Image={uploadedImage} onChange={setUploadedImage} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Product name</Label>
              <Input id="name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="type">Category</Label>
              <Input id="type" required value={form.type} onChange={(e) => update("type", e.target.value)} placeholder="e.g. Electronics" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" required rows={5} value={form.description} onChange={(e : React.ChangeEvent<HTMLTextAreaElement>) => update("description", e.target.value)} />
          </div>
          <Separator />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price (VND)</Label>
              <Input id="price" type="number" min={0} required value={form.price} onChange={(e) => update("price", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="discountPercent">Discount % <span className="text-muted-foreground">(optional)</span></Label>
              <Input id="discountPercent" type="number" min={0} max={100} value={form.discountPercent} onChange={(e) => update("discountPercent", e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : isEdit ? "Save changes" : "Create product"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
