"use client";

import { useState } from "react";
import { cn, timeAgo } from "@/lib/utils";
import type { MessageView } from "@/lib/types";
import { useToast } from "@/components/dashboard/DashShell";
import { IconCheck, IconChevronDown, IconMail, IconTrash } from "@/components/ui/Icons";

export function MessagesManager({ initial }: { initial: MessageView[] }) {
  const toast = useToast();
  const [items, setItems] = useState(initial);
  const [openId, setOpenId] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const unread = items.filter((m) => !m.read).length;

  async function markRead(id: number) {
    setItems((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      if (!res.ok) throw new Error();
    } catch {
      toast("Could not mark as read", "err");
    }
  }

  function toggle(m: MessageView) {
    if (openId === m.id) {
      setOpenId(null);
      return;
    }
    setOpenId(m.id);
    if (!m.read) void markRead(m.id);
  }

  async function markAllRead() {
    const targets = items.filter((m) => !m.read);
    setItems((prev) => prev.map((m) => ({ ...m, read: true })));
    await Promise.all(
      targets.map((m) =>
        fetch(`/api/messages/${m.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ read: true }),
        }).catch(() => null)
      )
    );
    toast("All messages marked as read");
  }

  async function remove(id: number) {
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((m) => m.id !== id));
      toast("Message deleted");
    } catch {
      toast("Could not delete message", "err");
    } finally {
      setConfirmId(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-cream">
            Inbox
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            Messages from the contact form on the homepage.{" "}
            {unread > 0 ? (
              <span className="font-mono text-coral">{unread} unread</span>
            ) : (
              <span className="font-mono text-mint">all clear</span>
            )}
          </p>
        </div>
        {unread > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="flex items-center gap-2 border border-mint/40 px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-mint transition hover:bg-mint hover:text-ink"
          >
            <IconCheck className="h-3.5 w-3.5" /> Mark all read
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-10 border border-dashed border-line p-14 text-center">
          <p className="font-mono text-sm text-faint">// inbox zero</p>
          <p className="mt-2 text-sm text-muted">
            Send yourself a test message from the{" "}
            <a href="/#contact" className="text-amber underline-offset-4 hover:underline">contact form</a>.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {items.map((m) => {
            const isOpen = openId === m.id;
            return (
              <div
                key={m.id}
                className={cn(
                  "border transition-colors",
                  m.read ? "border-line bg-surface/30" : "border-coral/35 bg-surface/60"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(m)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                >
                  <span
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      m.read ? "bg-faint/40" : "animate-pulse bg-coral"
                    )}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className={cn("font-display text-base font-bold", m.read ? "text-muted" : "text-cream")}>
                        {m.name}
                      </span>
                      <span className="truncate font-mono text-[12px] text-faint">{m.email}</span>
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-2.5">
                      <span className="border border-amber/35 bg-amber/[0.08] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-amber">
                        {m.service}
                      </span>
                      <span className="font-mono text-[11px] text-faint">{timeAgo(m.createdAt)}</span>
                    </span>
                  </span>
                  <IconChevronDown
                    className={cn("h-4 w-4 shrink-0 text-faint transition-transform duration-300", isOpen && "rotate-180")}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-line px-5 py-5 pl-11">
                      <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-muted">{m.body}</p>
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <a
                          href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.service)} enquiry`}
                          className="flex items-center gap-2 bg-amber px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink transition hover:-translate-y-0.5"
                        >
                          <IconMail className="h-3.5 w-3.5" /> Reply by email
                        </a>
                        {confirmId === m.id ? (
                          <button
                            type="button"
                            onClick={() => remove(m.id)}
                            className="border border-coral bg-coral/15 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-coral"
                          >
                            Confirm delete?
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmId(m.id)}
                            className="flex items-center gap-1.5 border border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition hover:border-coral/60 hover:text-coral"
                          >
                            <IconTrash className="h-3.5 w-3.5" /> Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
