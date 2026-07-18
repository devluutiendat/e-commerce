"use client"

import { useState } from "react"
import { Loader2, Trash2, Shield, ShieldOff } from "lucide-react"
import { toast } from "sonner"
import { useUsers, useDeleteUser, useUpdateUserRole } from "@/hooks/use-users"
import { useAuthStore } from "@/store/auth-store"
import { UserRole } from "@/types"
import { getErrorMessage } from "@/lib/api/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function AdminUsersPage() {
  const { data, isLoading } = useUsers()
  const updateRole = useUpdateUserRole()
  const deleteUser = useDeleteUser()
  const currentUser = useAuthStore((s) => s.user)
  const [pendingId, setPendingId] = useState<number | null>(null)

  const users = Array.isArray(data) ? data : data ?? []

  function toggleRole(id: number, currentRole: UserRole) {
    const nextRole = currentRole === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN
    setPendingId(id)
    updateRole.mutate({ id, dto: { role: nextRole } }, {
      onSuccess: () => toast.success("Role updated"),
      onError: (error) => toast.error(getErrorMessage(error)),
      onSettled: () => setPendingId(null),
    })
  }

  function handleDelete(id: number) {
    setPendingId(id)
    deleteUser.mutate(id, {
      onSuccess: () => toast.success("User removed"),
      onError: (error) => toast.error(getErrorMessage(error)),
      onSettled: () => setPendingId(null),
    })
  }

  return (
    <TooltipProvider>
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight mb-1">Users</h1>
        <p className="text-sm text-muted-foreground mb-8">{users.length} total</p>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : users.length === 0 ? (
          <p className="text-sm text-muted-foreground py-16 text-center">No users yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user : any) => {
                const initials = user.name
                  ? user.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase()
                  : "?"
                const isSelf = user.id === currentUser?.id
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-marigold-tint text-marigold-deep text-xs font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">
                      {user.name}
                      {isSelf && <span className="text-xs text-muted-foreground ml-2">(you)</span>}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === UserRole.ADMIN ? "default" : "secondary"}>
                        {user.role === UserRole.ADMIN ? "Admin" : "Customer"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {!isSelf && (
                        <div className="flex items-center justify-end gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleRole(user.id, user.role)}
                                disabled={pendingId === user.id}
                              >
                                {pendingId === user.id
                                  ? <Loader2 className="size-4 animate-spin" />
                                  : user.role === UserRole.ADMIN
                                    ? <ShieldOff className="size-4" />
                                    : <Shield className="size-4" />
                                }
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {user.role === UserRole.ADMIN ? "Revoke admin" : "Make admin"}
                            </TooltipContent>
                          </Tooltip>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(user.id)}
                            disabled={pendingId === user.id}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      )}
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
