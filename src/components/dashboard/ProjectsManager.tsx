"use client";

import { useState, type FormEvent } from "react";
import { cn, ACCENT_HEX, CATEGORY_LABEL, initialsOf, timeAgo } from "@/lib/utils";
import type { ProjectView } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/dashboard/DashShell";
import {
  IconEdit,
  IconPlus,
  IconStar,
  IconTrash,
} from "@/components/ui/Icons";

const EMPTY_FORM = {
  title: "",
  tagline: "",
  description: "",
  category: "web",
  techStack: "",
  liveUrl: "",
  repoUrl: "",
  accent: "amber",
  featured: false,
  sortOrder: 10,
};

type FormState = typeof EMPTY_FORM;

function toForm(p: ProjectView): FormState {
  return {
    title: p.title,
    tagline: p.tagline ?? "",
    description: p.description,
    category: p.category,
    techStack: p.techStack.join(", "),
    liveUrl: p.liveUrl ?? "",
    repoUrl: p.repoUrl ?? "",
    accent: p.accent,
    featured: p.featured,
    sortOrder: p.sortOrder,
  };
}

export function ProjectsManager({ initial }: { initial: ProjectView[] }) {
  const toast = useToast();
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectView | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  function openNew() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setOpen(true);
  }

  function openEdit(p: ProjectView) {
    setEditing(p);
    setForm(toForm(p));
    setFormError(null);
    setOpen(true);
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setFormError("Title and description are required.");
      return;
    }
    setSaving(true);
    setFormError(null);
    const payload = {
      title: form.title,
      tagline: form.tagline,
      description: form.description,
      category: form.category,
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      liveUrl: form.liveUrl,
      repoUrl: form.repoUrl,
      accent: form.accent,
      featured: form.featured,
      sortOrder: Number(form.sortOrder) || 0,
    };
    try {
      const res = await fetch(editing ? `/api/projects/${editing.id}` : "/api/projects", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as ProjectView & { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setItems((prev) => {
        if (editing) return prev.map((p) => (p.id === editing.id ? data : p));
        return [data, ...prev];
      });
      toast(editing ? "Project updated" : "Project published to the site");
      setOpen(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((p) => p.id !== id));
      toast("Project deleted");
    } catch {
      toast("Could not delete project", "err");
    } finally {
      setConfirmId(null);
    }
  }

  const field =
    "w-full border border-line bg-ink px-3.5 py-2.5 font-mono text-sm text-cream placeholder:text-faint outline-none transition focus:border-amber/70";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-cream">
            Projects
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            Everything here renders live on the homepage{" "}
            <span className="font-mono text-faint">(#work section)</span>.
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="flex items-center gap-2 bg-amber px-5 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-ink transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(255,178,36,0.5)]"
        >
          <IconPlus className="h-4 w-4" /> New project
        </button>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 border border-dashed border-line p-14 text-center">
          <p className="font-mono text-sm text-faint">// no projects yet</p>
          <p className="mt-2 text-sm text-muted">Create your first project and it appears on the site instantly.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {items.map((p) => {
            const hex = ACCENT_HEX[p.accent] ?? ACCENT_HEX.amber;
            return (
              <div
                key={p.id}
                className="group flex flex-col gap-4 border border-line bg-surface/40 p-5 transition-colors hover:border-line/80 hover:bg-surface sm:flex-row sm:items-center"
              >
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center border font-display text-sm font-bold"
                  style={{ borderColor: `${hex}55`, color: hex, background: `${hex}0f` }}
                >
                  {initialsOf(p.title)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display text-lg font-bold text-cream">{p.title}</h3>
                    <span
                      className="border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]"
                      style={{ borderColor: `${hex}44`, color: hex }}
                    >
                      {CATEGORY_LABEL[p.category] ?? p.category}
                    </span>
                    {p.featured && (
                      <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-amber">
                        <IconStar className="h-3 w-3" /> featured
                      </span>
                    )}
                  </div>
                  <p className="mt-1 truncate text-sm text-muted">
                    {p.tagline || p.description.slice(0, 90)}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-faint">
                    {p.techStack.slice(0, 4).join(" · ") || "no stack listed"} — updated {timeAgo(p.updatedAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(p)}
                    className="flex items-center gap-1.5 border border-line px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition hover:border-amber/60 hover:text-amber"
                  >
                    <IconEdit className="h-3.5 w-3.5" /> Edit
                  </button>
                  {confirmId === p.id ? (
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      className="border border-coral bg-coral/15 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-coral"
                    >
                      Sure?
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmId(p.id)}
                      className="flex items-center gap-1.5 border border-line px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition hover:border-coral/60 hover:text-coral"
                    >
                      <IconTrash className="h-3.5 w-3.5" /> Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? `edit — ${editing.title}` : "new project"}
        wide
      >
        <form onSubmit={save} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mono-label mb-1.5 block text-faint" htmlFor="p-title">title *</label>
              <input id="p-title" className={field} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="ShipGPT" />
            </div>
            <div>
              <label className="mono-label mb-1.5 block text-faint" htmlFor="p-tagline">tagline</label>
              <input id="p-tagline" className={field} value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} placeholder="One-line pitch" />
            </div>
          </div>

          <div>
            <label className="mono-label mb-1.5 block text-faint" htmlFor="p-desc">description *</label>
            <textarea id="p-desc" rows={4} className={cn(field, "resize-none leading-relaxed")} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What it does, what you built, what was hard…" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mono-label mb-1.5 block text-faint" htmlFor="p-cat">category</label>
              <select id="p-cat" className={field} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {Object.entries(CATEGORY_LABEL).map(([k, v]) => (
                  <option key={k} value={k} className="bg-ink">{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mono-label mb-1.5 block text-faint" htmlFor="p-order">sort order</label>
              <input id="p-order" type="number" className={field} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
            </div>
          </div>

          <div>
            <label className="mono-label mb-1.5 block text-faint" htmlFor="p-tech">tech stack (comma separated)</label>
            <input id="p-tech" className={field} value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} placeholder="Next.js, NestJS, PostgreSQL" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mono-label mb-1.5 block text-faint" htmlFor="p-live">live url</label>
              <input id="p-live" className={field} value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} placeholder="https://…" />
            </div>
            <div>
              <label className="mono-label mb-1.5 block text-faint" htmlFor="p-repo">repo url</label>
              <input id="p-repo" className={field} value={form.repoUrl} onChange={(e) => setForm({ ...form, repoUrl: e.target.value })} placeholder="https://github.com/…" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 border border-line bg-ink/60 px-4 py-3.5">
            <div>
              <p className="mono-label mb-2 text-faint">accent</p>
              <div className="flex gap-2">
                {Object.entries(ACCENT_HEX).map(([k, hex]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setForm({ ...form, accent: k })}
                    aria-label={`accent ${k}`}
                    className={cn(
                      "h-7 w-7 rounded-full border-2 transition-transform hover:scale-110",
                      form.accent === k ? "border-cream" : "border-transparent"
                    )}
                    style={{ background: hex }}
                  />
                ))}
              </div>
            </div>
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="h-4 w-4 accent-amber"
              />
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted">
                Featured <span className="text-faint">(big card)</span>
              </span>
            </label>
          </div>

          {formError && (
            <p className="border border-coral/40 bg-coral/10 px-3.5 py-2.5 font-mono text-[12px] text-coral">
              {formError}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border border-line px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-muted transition hover:text-cream"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-amber px-6 py-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-ink transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {saving ? "Saving…" : editing ? "Save changes" : "Publish"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
