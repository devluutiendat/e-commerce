"use client"

import { Loader2, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useOrders, useUpdateOrder, useDeleteOrder } from "@/hooks/use-orders"
import { OrderStatusBadge } from "@/components/ui/order-status-badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { formatVND, formatDate, discountedPrice } from "@/lib/utils"
import { getErrorMessage } from "@/lib/api/client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function AdminOrdersPage() {
  const { data: orders, isLoading } = useOrders()
  const updateOrder = useUpdateOrder()
  const deleteOrder = useDeleteOrder()

  function toggleStatus(orderId: number, currentStatus: boolean) {
    updateOrder.mutate({ id: orderId, dto: { status: !currentStatus } }, {
      onSuccess: () => toast.success("Order status updated"),
      onError: (error) => toast.error(getErrorMessage(error)),
    })
  }

  function handleDelete(orderId: number) {
    deleteOrder.mutate(orderId, {
      onSuccess: () => toast.success("Order removed"),
      onError: (error) => toast.error(getErrorMessage(error)),
    })
  }

  return (
    <TooltipProvider>
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight mb-1">Orders</h1>
        <p className="text-sm text-muted-foreground mb-8">
          {orders ? `${orders.length} total` : "Loading…"}
        </p>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : !orders || orders.length === 0 ? (
          <p className="text-sm text-muted-foreground py-16 text-center">No orders yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const lineTotal =
                  order.totalPrice ??
                  (order.product
                    ? discountedPrice(order.product.price, order.product.discountPercent) * order.quantity
                    : 0)
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium max-w-40 truncate">
                      {order.product?.name ?? `Order #${order.id}`}
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-32 truncate">
                      {order.user?.name ?? `#${order.userId}`}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(order.createdAt)}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell className="font-medium">{formatVND(lineTotal)}</TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button onClick={() => toggleStatus(order.id, order.status)}>
                            <OrderStatusBadge status={order.status} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Click to toggle status</TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(order.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        aria-label="Delete order"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </TooltipProvider>
  )
}
