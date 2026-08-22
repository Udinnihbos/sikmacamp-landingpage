"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-grain">
      <NavBar />

      <section className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-16 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
          Masuk
        </p>
        <h1 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
          Masuk ke akun kamu
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-muted">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-brass/50"
            />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-muted">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-brass/50"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-brass py-2.5 font-mono text-xs uppercase tracking-widest text-base transition-colors hover:bg-brasshi disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted">
          Belum punya akun?{" "}
          <Link href="/sign-up" className="text-brass hover:text-brasshi">
            Daftar
          </Link>
        </p>
      </section>

      <Footer />
    </main>
  );
}
