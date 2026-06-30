"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Heart, Search, ShoppingBag, LogOut, LayoutGrid, User2 } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { UserRole } from "../../types"

export function SiteHeader() {
  const router = useRouter()
  const [search, setSearch] = useState("")

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(
      search.trim()
        ? `/products?search=${encodeURIComponent(search.trim())}`
        : "/products"
    )
  }
  const user = {
    name: "John Doe",
    email: "john.doe..example.com",
    role: UserRole.USER,
  }

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
               
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart" aria-label="Cart">
                <ShoppingBag className="size-5" />
              
              </Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-marigold-tint text-marigold-deep text-xs font-semibold">
                        {user.name}
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
                    onClick={() => {}}
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
