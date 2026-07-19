"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useProducts, useDeleteProduct } from "@/hooks/use-products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination } from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { formatVND } from "@/lib/utils"
import { getErrorMessage } from "@/lib/api/client"

const LIMIT = 10

export default function AdminProductsPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useProducts({ page, limit: LIMIT })
  const deleteProduct = useDeleteProduct()
  const [pendingDelete, setPendingDelete] = useState<number | null>(null)

  const totalPages = data ? Math.max(1, Math.ceil(data.meta.total / LIMIT)) : 1
  function handleDelete(id: number) {
    setPendingDelete(id)
    deleteProduct.mutate(id, {
      onSuccess: () => toast.success("Product deleted"),
      onError: (error) => toast.error(getErrorMessage(error)),
      onSettled: () => setPendingDelete(null),
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {data?.meta.total !== undefined ? `${data.meta.total} total` : "Loading…"}
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/admin/products/new">
            <Plus className="size-4" />
            New product
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : !data || data.products.length === 0 ? (
        <p className="text-sm text-muted-foreground py-16 text-center">No products yet.</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14"></TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.products.map((product : any) => {
                const cover = (product.images)
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative size-10 bg-muted rounded-md overflow-hidden border">
                        {cover && (
                          <Image
                            src={cover}
                            alt={product.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-48 truncate">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.type}</Badge>
                    </TableCell>
                    <TableCell>{formatVND(product.price)}</TableCell>
                    <TableCell>
                      {product.discountPercent
                        ? <Badge variant="destructive">-{product.discountPercent}%</Badge>
                        : <span className="text-muted-foreground text-xs">–</span>
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/products/${product.id}`} aria-label="Edit">
                            <Pencil className="size-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          disabled={pendingDelete === product.id}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          aria-label="Delete"
                        >
                          {pendingDelete === product.id
                            ? <Loader2 className="size-4 animate-spin" />
                            : <Trash2 className="size-4" />
                          }
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  )
}
