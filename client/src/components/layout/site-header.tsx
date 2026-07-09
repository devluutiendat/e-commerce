"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Heart, Search, ShoppingBag, LogOut, LayoutGrid, User2 } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"
import { useWishlistStore } from "@/store/wishlist-store"
import { useCartStore } from "@/store/cart-store"
import { UserRole } from "@/types"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const wishlistCount = useWishlistStore((s) => s.items.length)
  const cartCount = useCartStore((s) => s.lines.length)
  const [search, setSearch] = useState("")

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(
      search.trim()
        ? `/products?search=${encodeURIComponent(search.trim())}`
        : "/products"
    )
  }

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?"

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center gap-6">
          <Link href="/" className="font-display text-xl font-semibold tracking-tight shrink-0">
            Chợ<span className="text-marigold">Tốt</span>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground shrink-0">
            <Link href="/products" className="hover:text-foreground transition-colors">
              Shop
            </Link>
            {user && (
              <Link href="/orders" className="hover:text-foreground transition-colors">
                Orders
              </Link>
            )}
            {user?.role === UserRole.ADMIN && (
              <Link href="/admin" className="hover:text-foreground transition-colors flex items-center gap-1">
                <LayoutGrid className="size-3.5" />
                Admin
              </Link>
            )}
          </nav>

          <form onSubmit={handleSearch} className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="w-full bg-card border border-input rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-[color,box-shadow]"
              />
            </div>
          </form>

          <div className="flex items-center gap-1 ml-auto">
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/wishlist" aria-label="Wishlist">
                <Heart className="size-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-marigold text-paper text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart" aria-label="Cart">
                <ShoppingBag className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-marigold text-paper text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-marigold-tint text-marigold-deep text-xs font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel className="font-normal">
                    <p className="font-medium text-sm truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User2 className="size-4" />
                    Profile
                  </DropdownMenuItem>
                  {user.role === UserRole.ADMIN && (
                    <DropdownMenuItem onClick={() => router.push("/admin")}>
                      <LayoutGrid className="size-4" />
                      Admin panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => {
                    }}
                  >
                    <LogOut className="size-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" size="sm" asChild className="ml-1">
                <Link href="/login">Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
