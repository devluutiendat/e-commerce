"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useLogin } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/api/client";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login.mutate(
      { email, password },
      {
        onSuccess: () => toast.success("Welcome back"),
        onError: (error : any) => toast.error(getErrorMessage(error)),
      }
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 sm:px-6 py-20">
      <h1 className="font-display text-2xl font-700 tracking-tight">Sign in</h1>
      <p className="text-sm text-ink-soft mt-1.5 mb-8">
        Welcome back to Chợ Tốt.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <Button type="submit" disabled={login.isPending} className="w-full" size="lg">
          { login.isPending ? "Signing in..." : "Sign in" }
        </Button>
      </form>

      <p className="text-sm text-ink-soft mt-6 text-center">
        New here?{" "}
        <Link href="/register" className="text-marigold-deep font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
