"use client";

import { useRef, useState, type DragEvent } from "react";
import { cn, formatKb, timeAgo } from "@/lib/utils";
import type { ResumeView } from "@/lib/types";
import { useToast } from "@/components/dashboard/DashShell";
import {
  IconDownload,
  IconFile,
  IconTrash,
  IconUpload,
} from "@/components/ui/Icons";

export function ResumesManager({ initial }: { initial: ResumeView[] }) {
  const toast = useToast();
  const [items, setItems] = useState(initial);
  const [label, setLabel] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function pick(f: File | null) {
    setFile(f);
    if (f && !label) setLabel(f.name.replace(/\.[^.]+$/, ""));
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) pick(f);
  }

  async function upload() {
    if (!file) {
      toast("Pick a file first", "err");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("label", label.trim());
      const res = await fetch("/api/resumes", { method: "POST", body: fd });
      const data = (await res.json()) as ResumeView & { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setItems((prev) => [data, ...prev]);
      setFile(null);
      setLabel("");
      if (inputRef.current) inputRef.current.value = "";
      toast("Resume uploaded — the homepage CV button now serves the latest one");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Upload failed", "err");
    } finally {
      setUploading(false);
    }
  }

  async function remove(id: number) {
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((r) => r.id !== id));
      toast("Resume deleted");
    } catch {
      toast("Could not delete resume", "err");
    } finally {
      setConfirmId(null);
    }
  }

  return (
    <div>
      <div>
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-cream">Resumes</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted">
          The newest resume powers the <span className="font-mono text-amber">&quot;Download CV&quot;</span>{" "}
          button on the homepage. Files are stored as binary in PostgreSQL — no stray folders on disk.
        </p>
      </div>

      {/* Upload zone */}
      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "group flex cursor-pointer flex-col items-center justify-center border border-dashed px-6 py-12 text-center transition-all",
            dragging
              ? "border-mint bg-mint/[0.06]"
              : "border-line bg-surface/30 hover:border-amber/60 hover:bg-surface/60"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
            className="hidden"
            onChange={(e) => pick(e.target.files?.[0] ?? null)}
          />
          <span
            className={cn(
              "grid h-14 w-14 place-items-center border transition-all",
              dragging ? "border-mint text-mint" : "border-line text-faint group-hover:border-amber/60 group-hover:text-amber"
            )}
          >
            <IconUpload className="h-6 w-6" />
          </span>
          <p className="mt-5 font-mono text-sm text-cream">
            {file ? file.name : "Drop your resume here"}
          </p>
          <p className="mt-2 font-mono text-[11px] text-faint">
            {file ? `${formatKb(Math.max(1, Math.round(file.size / 1024)))} — ready` : "or click to browse · PDF, DOC, DOCX or image · max 5 MB"}
          </p>
        </div>

        <div className="flex flex-col justify-between border border-line bg-coal/70 p-6">
          <div>
            <label className="mono-label mb-2 block text-faint" htmlFor="r-label">label</label>
            <input
              id="r-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Anshuman Mishra — CV 2026"
              className="w-full border border-line bg-ink px-3.5 py-2.5 font-mono text-sm text-cream placeholder:text-faint outline-none transition focus:border-amber/70"
            />
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-faint">
              A short human-readable name shown in this list and used for the download.
            </p>
          </div>
          <button
            type="button"
            onClick={upload}
            disabled={uploading || !file}
            className="mt-5 flex items-center justify-center gap-2 bg-amber px-5 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-ink transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {uploading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                Uploading…
              </>
            ) : (
              <>
                <IconUpload className="h-4 w-4" /> Upload resume
              </>
            )}
          </button>
        </div>
      </div>

      {/* List */}
      {items.length === 0 ? (
        <div className="mt-10 border border-dashed border-line p-14 text-center">
          <p className="font-mono text-sm text-faint">// no resumes uploaded</p>
          <p className="mt-2 text-sm text-muted">The homepage will show a &quot;Request CV&quot; mailto link until you upload one.</p>
        </div>
      ) : (
        <div className="mt-10 space-y-3">
          {items.map((r, i) => (
            <div
              key={r.id}
              className="flex flex-col gap-4 border border-line bg-surface/40 p-5 transition-colors hover:bg-surface sm:flex-row sm:items-center"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center border border-mint/40 bg-mint/10 text-mint">
                <IconFile className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-display text-lg font-bold text-cream">{r.label}</h3>
                  {i === 0 && (
                    <span className="border border-amber/40 bg-amber/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-amber">
                      live on homepage
                    </span>
                  )}
                </div>
                <p className="mt-1 truncate font-mono text-[12px] text-muted">{r.originalName}</p>
                <p className="mt-1 font-mono text-[11px] text-faint">
                  {formatKb(r.sizeKb)} · {r.mimeType} · uploaded {timeAgo(r.createdAt)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={`/api/resumes/${r.id}/file`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 border border-line px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition hover:border-mint/60 hover:text-mint"
                >
                  <IconDownload className="h-3.5 w-3.5" /> View
                </a>
                {confirmId === r.id ? (
                  <button
                    type="button"
                    onClick={() => remove(r.id)}
                    className="border border-coral bg-coral/15 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-coral"
                  >
                    Sure?
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmId(r.id)}
                    className="flex items-center gap-1.5 border border-line px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition hover:border-coral/60 hover:text-coral"
                  >
                    <IconTrash className="h-3.5 w-3.5" /> Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
