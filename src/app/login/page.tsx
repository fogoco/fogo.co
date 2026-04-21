"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back");
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-grain p-6">
      <div className="w-full max-w-md">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-400">
          BlockBuilder · Admin
        </p>
        <h1 className="mt-3 font-display text-4xl">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Access the Fogo &amp; Co editor.
        </p>
        <form
          onSubmit={onSubmit}
          className="mt-10 space-y-4 rounded-2xl border border-border bg-card p-8"
        >
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-ember-500"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Password
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-ember-500"
            />
          </label>
          <button
            disabled={loading}
            className="w-full rounded-full bg-ember-500 py-3 text-sm font-medium text-white transition hover:bg-ember-600 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
