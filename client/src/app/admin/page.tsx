"use client"

import Link from "next/link"
import { Package, ShoppingCart, Users, ArrowUpRight } from "lucide-react"
import { useProducts } from "@/hooks/use-products"
import { useOrders } from "@/hooks/use-orders"
import { useUsers } from "@/hooks/use-users"
import { formatVND, discountedPrice } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function StatCard({ label, value, icon: Icon, href }: {
  label: string; value: string | number; icon: typeof Package; href: string
}) {
  return (
    <Card className="group hover:shadow-md transition-shadow py-5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Icon className="size-5 text-marigold-deep" />
          <Link href={href} className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="size-4 text-muted-foreground" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-display text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
      </CardContent>
    </Card>
  )
}

export default function AdminOverviewPage() {
  const { data: productsData } = useProducts({ page: 1, limit: 1 })
  const { data: orders } = useOrders()
  const { data: usersData } = useUsers({ page: 1, limit: 1 })

  const productsResult = productsData ? productsData : null
  const userCount = Array.isArray(usersData) ? usersData.length : 0
  const revenue =
    orders?.reduce((sum, o) =>
      sum + (o.totalPrice ?? (o.product
        ? discountedPrice(o.product.price, o.product.discountPercent) * o.quantity : 0)), 0
    ) ?? 0

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight mb-1">Overview</h1>
      <p className="text-sm text-muted-foreground mb-8">A snapshot of the shop right now.</p>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Products" value={productsResult?.meta.total ?? "–"} icon={Package} href="/admin/products" />
        <StatCard label="Orders" value={orders?.length ?? "–"} icon={ShoppingCart} href="/admin/orders" />
        <StatCard label="Users" value={userCount ?? "–"} icon={Users} href="/admin/users" />
      </div>

      <Separator className="my-8" />

      <Card className="py-5">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">Total order value</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-display text-3xl font-bold">{formatVND(revenue)}</p>
          <p className="text-xs text-muted-foreground mt-1">Across all {orders?.length ?? 0} orders</p>
        </CardContent>
      </Card>
    </div>
  )
}
