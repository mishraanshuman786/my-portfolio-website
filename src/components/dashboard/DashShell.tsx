"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { DashboardStats } from "@/lib/types";
import {
  IconCheck,
  IconChat,
  IconClose,
  IconFile,
  IconFolder,
  IconLogout,
} from "@/components/ui/Icons";

type Toast = { id: number; msg: string; tone: "ok" | "err" };
const ToastCtx = createContext<(msg: string, tone?: "ok" | "err") => void>(() => {});
export const useToast = () => useContext(ToastCtx);

type Tab = "projects" | "resumes" | "messages";

const TABS: Array<{ id: Tab; label: string; icon: (p: { className?: string }) => ReactNode; path: string }> = [
  { id: "projects", label: "Projects", icon: (p) => <IconFolder {...p} />, path: "~/dashboard/projects" },
  { id: "resumes", label: "Resumes", icon: (p) => <IconFile {...p} />, path: "~/dashboard/resumes" },
  { id: "messages", label: "Messages", icon: (p) => <IconChat {...p} />, path: "~/dashboard/messages" },
];

export function DashShell({
  tab,
  stats,
  children,
}: {
  tab: Tab;
  stats: DashboardStats;
  children: ReactNode;
}) {
  const router = useRouter();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const pushToast = useCallback((msg: string, tone: "ok" | "err" = "ok") => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, msg, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    router.push("/login");
    router.refresh();
  }

  const badgeFor = (t: Tab) =>
    t === "messages" && stats.unread > 0 ? stats.unread : t === "projects" ? stats.projects : t === "resumes" ? stats.resumes : 0;

  const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <ToastCtx.Provider value={pushToast}>
      <div className="flex min-h-screen flex-col bg-ink lg:flex-row">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-coal/60 lg:flex">
          <div className="border-b border-line px-6 py-5">
            <Link href="/" className="flex items-center gap-1 font-mono text-sm text-cream">
              <span className="text-amber">~/</span>anshuman
              <span className="blink -mb-0.5 inline-block h-4 w-[6px] bg-amber" />
            </Link>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
              control room
            </p>
          </div>

          <nav className="flex-1 px-3 py-5">
            {TABS.map((t) => (
              <a
                key={t.id}
                href={`/dashboard?tab=${t.id}`}
                className={cn(
                  "mb-1 flex items-center justify-between px-3 py-2.5 font-mono text-[13px] uppercase tracking-[0.1em] transition-all",
                  tab === t.id
                    ? "border-l-2 border-amber bg-surface text-cream"
                    : "border-l-2 border-transparent text-faint hover:bg-surface/50 hover:text-muted"
                )}
              >
                <span className="flex items-center gap-3">
                  {t.icon({ className: "h-4 w-4" })}
                  {t.label}
                </span>
                <span
                  className={cn(
                    "min-w-[22px] border px-1.5 py-0.5 text-center text-[10px]",
                    t.id === "messages" && stats.unread > 0
                      ? "border-coral/50 bg-coral/15 text-coral"
                      : "border-line text-faint"
                  )}
                >
                  {badgeFor(t.id)}
                </span>
              </a>
            ))}
          </nav>

          <div className="border-t border-line p-4">
            <div className="mb-4 grid grid-cols-2 gap-px border border-line bg-line text-center">
              <div className="bg-ink px-2 py-3">
                <p className="font-display text-xl font-bold text-amber">{stats.messages}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-faint">messages</p>
              </div>
              <div className="bg-ink px-2 py-3">
                <p className="font-display text-xl font-bold text-coral">{stats.unread}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-faint">unread</p>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center justify-center gap-2 border border-line px-3 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-muted transition hover:border-coral/60 hover:text-coral"
            >
              <IconLogout className="h-4 w-4" /> Log out
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-md">
            <div className="flex h-14 items-center justify-between gap-4 px-5 sm:px-8">
              <p className="hidden font-mono text-[12px] text-faint sm:block">
                <span className="text-mint">➜</span> {activeTab.path}
              </p>
              <p className="font-display text-lg font-bold uppercase tracking-tight text-cream lg:hidden">
                {activeTab.label}
              </p>
              <div className="flex items-center gap-3">
                <span className="hidden items-center gap-2 border border-mint/40 bg-mint/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-mint md:flex">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
                  admin session
                </span>
                <Link
                  href="/"
                  className="border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition hover:border-amber/50 hover:text-amber"
                >
                  View site ↗
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="grid h-8 w-8 place-items-center border border-line text-muted transition hover:border-coral/60 hover:text-coral lg:hidden"
                  aria-label="Log out"
                >
                  <IconLogout className="h-4 w-4" />
                </button>
              </div>
            </div>
            {/* Mobile tabs */}
            <div className="flex border-t border-line lg:hidden">
              {TABS.map((t) => (
                <a
                  key={t.id}
                  href={`/dashboard?tab=${t.id}`}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 px-2 py-3 font-mono text-[11px] uppercase tracking-[0.1em] transition",
                    tab === t.id
                      ? "border-b-2 border-amber bg-surface/60 text-cream"
                      : "border-b-2 border-transparent text-faint"
                  )}
                >
                  {t.icon({ className: "h-3.5 w-3.5" })}
                  {t.label}
                  {t.id === "messages" && stats.unread > 0 && (
                    <span className="border border-coral/50 bg-coral/15 px-1 text-[9px] text-coral">
                      {stats.unread}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </header>

          <main className="min-w-0 flex-1 px-5 py-8 sm:px-8">{children}</main>

          <footer className="border-t border-line px-5 py-4 font-mono text-[11px] text-faint sm:px-8">
            anshuman@portfolio:~$ session secured with HMAC-signed cookie · data lives in PostgreSQL
          </footer>
        </div>

        {/* Toasts */}
        <div className="pointer-events-none fixed bottom-5 right-5 z-[90] flex w-72 flex-col gap-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={cn(
                "toast-in pointer-events-auto flex items-start gap-2.5 border px-4 py-3 font-mono text-[12px] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)]",
                t.tone === "ok"
                  ? "border-mint/50 bg-coal text-mint"
                  : "border-coral/50 bg-coal text-coral"
              )}
            >
              {t.tone === "ok" ? (
                <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              ) : (
                <IconClose className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              )}
              <span className="text-cream">{t.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </ToastCtx.Provider>
  );
}
