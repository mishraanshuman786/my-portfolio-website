"use client";

import { useMemo, useState, type ComponentType } from "react";
import { cn, ACCENT_HEX, CATEGORY_LABEL, initialsOf } from "@/lib/utils";
import type { ProjectView } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  IconArrowUpRight,
  IconChip,
  IconCode,
  IconGlobe,
  IconMonitor,
  IconSmartphone,
  IconStar,
} from "@/components/ui/Icons";

const CAT_ICON: Record<string, ComponentType<{ className?: string }>> = {
  web: IconGlobe,
  mobile: IconSmartphone,
  desktop: IconMonitor,
  ai: IconChip,
};

function ProjectCard({ p, big = false }: { p: ProjectView; big?: boolean }) {
  const hex = ACCENT_HEX[p.accent] ?? ACCENT_HEX.amber;
  const Icon = CAT_ICON[p.category] ?? IconGlobe;

  return (
    <article
      className={cn(
        "group relative flex flex-col border border-line bg-surface/40 transition-all duration-300 hover:-translate-y-1.5 hover:bg-surface",
        big && "md:col-span-2 md:flex-row"
      )}
      style={{ boxShadow: `inset 0 1px 0 ${hex}22` }}
    >
      {/* monogram tile */}
      <div
        className={cn(
          "relative overflow-hidden border-b border-line",
          big ? "h-44 md:h-auto md:w-2/5 md:border-b-0 md:border-r" : "h-40"
        )}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 120% at 20% 0%, ${hex}1f 0%, transparent 55%), radial-gradient(120% 120% at 100% 100%, ${hex}14 0%, transparent 50%)`,
          }}
        />
        <div className="grid-bg absolute inset-0 opacity-60" />
        <span
          className="absolute -bottom-6 -right-2 select-none font-display text-[7rem] font-extrabold leading-none opacity-[0.13] transition-all duration-500 group-hover:opacity-25 group-hover:scale-105"
          style={{ color: hex }}
        >
          {initialsOf(p.title)}
        </span>
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className="grid h-8 w-8 place-items-center border bg-ink/70"
            style={{ borderColor: `${hex}55`, color: hex }}
          >
            <Icon className="h-4 w-4" />
          </span>
          <span
            className="border bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ borderColor: `${hex}44`, color: hex }}
          >
            {CATEGORY_LABEL[p.category] ?? p.category}
          </span>
          {p.featured && (
            <span className="flex items-center gap-1 border border-amber/40 bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-amber">
              <IconStar className="h-3 w-3" /> featured
            </span>
          )}
        </div>
      </div>

      {/* body */}
      <div className={cn("flex flex-1 flex-col p-6", big && "md:p-8")}>
        <h3
          className={cn(
            "font-display font-bold uppercase leading-tight tracking-tight text-cream",
            big ? "text-3xl sm:text-4xl" : "text-2xl"
          )}
        >
          {p.title}
        </h3>
        {p.tagline && <p className="mt-2 text-sm font-medium" style={{ color: hex }}>{p.tagline}</p>}
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{p.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.techStack.map((t) => (
            <span
              key={t}
              className="border border-line px-2.5 py-1 font-mono text-[11px] text-faint transition-colors hover:text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        {(p.liveUrl || p.repoUrl) && (
          <div className="mt-6 flex items-center gap-5 border-t border-line pt-4">
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group/l inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.12em] text-cream transition hover:text-amber"
              >
                Live <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
              </a>
            )}
            {p.repoUrl && (
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="group/l inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.12em] text-muted transition hover:text-mint"
              >
                <IconCode className="h-3.5 w-3.5" /> Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export function Projects({ projects }: { projects: ProjectView[] }) {
  const categories = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    return ["all", ...["ai", "web", "mobile", "desktop"].filter((c) => present.has(c))];
  }, [projects]);

  const [filter, setFilter] = useState("all");
  const filtered = projects.filter((p) => filter === "all" || p.category === filter);
  const featured = filter === "all" ? filtered.filter((p) => p.featured) : [];
  const rest = filter === "all" ? filtered.filter((p) => !p.featured) : filtered;

  return (
    <section id="work" className="relative scroll-mt-24 border-t border-line bg-coal/40">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHeading
              index="04"
              kicker="selected work"
              title={
                <>
                  Things I&apos;ve
                  <br />
                  <span className="text-amber">built & shipped</span>
                </>
              }
              description="Live from the database — this grid is managed through the dashboard, so new work shows up here the moment it's added."
            />
          </Reveal>

          <Reveal delay={140}>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={cn(
                    "border px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] transition-all duration-200",
                    filter === c
                      ? "border-amber bg-amber text-ink"
                      : "border-line text-muted hover:border-amber/50 hover:text-cream"
                  )}
                >
                  {c === "all" ? `All (${projects.length})` : CATEGORY_LABEL[c] ?? c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 border border-dashed border-line p-16 text-center font-mono text-sm text-faint">
            <p className="text-2xl text-muted">// nothing here yet</p>
            <p className="mt-2">Add projects from the dashboard and they appear instantly.</p>
          </div>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 80} className={cn(i === 0 && "md:col-span-2")}>
                <ProjectCard p={p} big={i === 0} />
              </Reveal>
            ))}
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 80}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
