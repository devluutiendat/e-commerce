import { Badge } from "@/components/ui/badge"

export function OrderStatusBadge({ status }: { status: boolean }) {
  return (
    <Badge variant={status ? "success" : "warning"}>
      <span className={`size-1.5 rounded-full ${status ? "bg-green" : "bg-marigold"}`} />
      {status ? "Confirmed" : "Pending"}
    </Badge>
  )
}
