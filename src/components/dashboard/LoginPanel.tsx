"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconLogout } from "@/components/ui/Icons";

export function LoginPanel({ showHint }: { showHint: boolean }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [shake, setShake] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Login failed");
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-5 py-16">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-[-20%] h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-amber/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-30%] right-[-10%] h-[380px] w-[380px] rounded-full bg-mint/[0.05] blur-[110px]" />

      <div className={cn("relative w-full max-w-md", shake && "shake")}>
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-faint transition hover:text-amber"
        >
          ← back to site
        </Link>

        <div className="corners border border-line bg-coal/90 shadow-[0_32px_90px_-30px_rgba(0,0,0,0.9)]">
          <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-coral/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
            <span className="ml-2 font-mono text-[11px] tracking-wider text-faint">
              auth@portfolio — secure shell
            </span>
          </div>

          <div className="px-6 py-7 sm:px-8">
            <p className="font-mono text-sm text-muted">
              <span className="text-mint">➜</span> <span className="text-faint">~</span> login --admin
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-cream">
              Dashboard <span className="text-amber">access</span>
            </h1>
            <p className="mt-2 text-sm text-muted">
              Manage projects, resumes and the contact inbox.
            </p>

            <form onSubmit={onSubmit} className="mt-7 space-y-4">
              <div>
                <label htmlFor="u" className="mono-label mb-1.5 block text-faint">username</label>
                <input
                  id="u"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-line bg-ink px-4 py-3 font-mono text-sm text-cream placeholder:text-faint outline-none transition focus:border-amber/70"
                  placeholder="admin"
                />
              </div>
              <div>
                <label htmlFor="p" className="mono-label mb-1.5 block text-faint">password</label>
                <input
                  id="p"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-line bg-ink px-4 py-3 font-mono text-sm text-cream placeholder:text-faint outline-none transition focus:border-amber/70"
                  placeholder="••••••••••"
                />
              </div>

              {error && (
                <p className="border border-coral/40 bg-coral/10 px-3.5 py-2.5 font-mono text-[12px] text-coral">
                  ✗ {error}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="flex w-full items-center justify-center gap-2.5 bg-amber px-6 py-3.5 font-mono text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-12px_rgba(255,178,36,0.55)] disabled:opacity-60"
              >
                {busy ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                    Verifying…
                  </>
                ) : (
                  <>
                    <IconLogout className="h-4 w-4 rotate-180" /> Authenticate
                  </>
                )}
              </button>
            </form>

            {showHint && (
              <div className="mt-6 border border-mint/30 bg-mint/[0.06] px-4 py-3.5">
                <p className="mono-label text-mint">dev credentials (no env vars set)</p>
                <p className="mt-2 font-mono text-[12px] leading-relaxed text-muted">
                  username: <span className="text-cream">anshuman</span>
                  <br />
                  password: <span className="text-cream">anshuman@2026</span>
                </p>
                <p className="mt-2 font-mono text-[10px] text-faint">
                  Set ADMIN_USERNAME / ADMIN_PASSWORD / AUTH_SECRET in .env to change them.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-[11px] text-faint">
          sessions are HMAC-signed cookies · 7-day expiry
        </p>
      </div>
    </div>
  );
}
