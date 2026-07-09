"use client"

import Link from "next/link"
import Image from "next/image"
import { Package, Loader2 } from "lucide-react"
import { useOrders } from "@/hooks/use-orders"
import { OrderStatusBadge } from "@/components/ui/order-status-badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatVND, formatDate } from "@/lib/utils"

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useOrders()

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-24 flex justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-24 text-center">
        <p className="font-display text-lg font-semibold">Sign in to view your orders</p>
        <Link href="/login" className="mt-4 inline-block"><Button size="sm">Sign in</Button></Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl font-bold tracking-tight mb-8">Orders</h1>

      {!orders || orders.length === 0 ? (
        <div className="py-24 text-center">
          <Package className="size-8 mx-auto text-muted-foreground mb-3" />
          <p className="font-display text-lg font-semibold">No orders yet</p>
          <Link href="/products" className="mt-4 inline-block"><Button size="sm">Browse products</Button></Link>
        </div>
      ) : (
        <Card className="py-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14"></TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const cover = order.product ? (order.product.images) : undefined
                const lineTotal = order.totalPrice ?? (order.product ? order.product.price * order.quantity : 0)
                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="relative size-10 bg-muted rounded-md overflow-hidden border">
                        {cover && (
                          <Image src={cover} alt={order.product?.name ?? ""} fill className="object-cover" unoptimized />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-40 truncate">
                      {order.product?.name ?? `Order #${order.id}`}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(order.createdAt)}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell className="font-medium">{formatVND(lineTotal)}</TableCell>
                    <TableCell><OrderStatusBadge status={order.status} /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
