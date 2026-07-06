"use client"

import { useState } from "react"
import type { ProductQuery } from "@/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface ProductFiltersProps {
  value: ProductQuery
  onChange: (value: ProductQuery) => void
}

const SORT_OPTIONS: { value: NonNullable<ProductQuery["sortBy"]>; label: string }[] = [
  { value: "createdAt", label: "Newest" },
  { value: "price", label: "Price" },
  { value: "name", label: "Name A–Z" },
]

export function ProductFilters({ value, onChange }: ProductFiltersProps) {
  const [minPrice, setMinPrice] = useState(value.minPrice?.toString() ?? "")
  const [maxPrice, setMaxPrice] = useState(value.maxPrice?.toString() ?? "")
  const [type, setType] = useState(value.type ?? "")

  function applyFilters() {
    onChange({
      ...value,
      page: 1,
      type: type || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    })
  }

  function reset() {
    setMinPrice("")
    setMaxPrice("")
    setType("")
    onChange({ page: 1, limit: value.limit })
  }

  return (
    <aside className="space-y-6">
      <div className="space-y-2">
        <Label>Sort by</Label>
        <Select
          value={value.sortBy ?? "createdAt"}
          onValueChange={(v) =>
            onChange({ ...value, sortBy: v as ProductQuery["sortBy"], page: 1 })
          }
        >
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={value.order ?? "desc"}
          onValueChange={(v) =>
            onChange({ ...value, order: v as ProductQuery["order"], page: 1 })
          }
        >
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">↓ Descending</SelectItem>
            <SelectItem value="asc">↑ Ascending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="filter-type">Category</Label>
        <Input
          id="filter-type"
          placeholder="e.g. Electronics"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Price range (VND)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="text-muted-foreground text-sm shrink-0">–</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={applyFilters} className="flex-1">
          Apply
        </Button>
        <Button size="sm" variant="ghost" onClick={reset}>
          Reset
        </Button>
      </div>
    </aside>
  )
}
