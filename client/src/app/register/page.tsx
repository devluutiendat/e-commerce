"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useRegister } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/api/client";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const register = useRegister();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    register.mutate(form, {
      onSuccess: () => {
        toast.success("Account created — sign in to continue");
        router.push("/login");
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  }

  return (
    <div className="mx-auto max-w-sm px-4 sm:px-6 py-20">
      <h1 className="font-display text-2xl font-700 tracking-tight">Create account</h1>
      <p className="text-sm text-ink-soft mt-1.5 mb-8">
        Takes about a minute.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Nguyễn Văn A"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="At least 6 characters"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+84…"
          />
        </div>
        <div>
          <Label htmlFor="address">Address (optional)</Label>
          <Input
            id="address"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="Street, city"
          />
        </div>
        <Button type="submit" disabled={register.isPending} className="w-full" size="lg">
          Create account
        </Button>
      </form>

      <p className="text-sm text-ink-soft mt-6 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-marigold-deep font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
