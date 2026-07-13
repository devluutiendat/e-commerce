"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Package, ShoppingCart, Users, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutGrid, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/users", label: "Users", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-line min-h-[calc(100vh-4rem)] py-8 pr-6">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-xs text-ink-soft hover:text-ink transition-colors mb-6"
      >
        <ArrowLeft className="size-3.5" />
        Back to shop
      </Link>
      <nav className="space-y-1">
        {links.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-sm transition-colors",
                active
                  ? "bg-ink text-paper"
                  : "text-ink-soft hover:bg-marigold-tint hover:text-ink"
              )}
            >
              <Icon className="size-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
