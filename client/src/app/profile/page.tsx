"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useCurrentUser } from "@/hooks/use-auth"
import { useUpdateUser, useChangePassword } from "@/hooks/use-users"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getErrorMessage } from "@/lib/api/client"
import type { User } from "@/types"

export default function ProfilePage() {
  const { data: user, isLoading } = useCurrentUser()

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-24 flex justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }
  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-24 text-center">
        <p className="font-display text-lg font-semibold">Sign in to view your profile</p>
      </div>
    )
  }
  return <ProfileForms key={user.id} user={user} />
}

function ProfileForms({ user }: { user: User }) {
  const updateUser = useUpdateUser()
  const changePassword = useChangePassword()
  const [profile, setProfile] = useState({ name: user.name ?? "", phone: user.phone ?? "", address: user.address ?? "" })
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" })

  function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateUser.mutate({ id: user.id, dto: profile }, {
      onSuccess: () => toast.success("Profile updated"),
      onError: (error) => toast.error(getErrorMessage(error)),
    })
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    changePassword.mutate(passwords, {
      onSuccess: () => { toast.success("Password changed"); setPasswords({ currentPassword: "", newPassword: "" }) },
      onError: (error) => toast.error(getErrorMessage(error)),
    })
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal info</CardTitle>
          <CardDescription>Update your name, phone, and delivery address.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={profile.address} onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))} />
            </div>
            <Button type="submit" disabled={updateUser.isPending}>
              {updateUser.isPending ? "Saving…" : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
          <CardDescription>Choose a strong password of at least 6 characters.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input id="currentPassword" type="password" required value={passwords.currentPassword} onChange={(e) => setPasswords((p) => ({ ...p, currentPassword: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="newPassword">New password</Label>
              <Input id="newPassword" type="password" required minLength={6} value={passwords.newPassword} onChange={(e) => setPasswords((p) => ({ ...p, newPassword: e.target.value }))} />
            </div>
            <Button type="submit" variant="outline" disabled={changePassword.isPending}>
              {changePassword.isPending ? "Updating…" : "Update password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
