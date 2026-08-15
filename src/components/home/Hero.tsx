"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { ResumeView } from "@/lib/types";
import { IconArrowUpRight, IconDownload } from "@/components/ui/Icons";

const ROLES = [
  "MERN Stack Developer",
  "RAG Systems Engineer",
  "Agentic Workflow Builder",
  "React Native App Dev",
  "NestJS API Architect",
];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    let t: ReturnType<typeof setTimeout> | undefined;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), 1700);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((v) => v + 1);
    } else {
      t = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 34 : 68
      );
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [text, deleting, idx, words]);

  return text;
}

type TermLine =
  | { type: "cmd"; text: string }
  | { type: "out"; text: string; cls?: string }
  | { type: "json"; lines: string[] };

const TERM: TermLine[] = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "anshuman.mishra — full stack mern + ai engineer", cls: "text-mint" },
  { type: "cmd", text: "cat capabilities.json" },
  {
    type: "json",
    lines: [
      "{",
      '  "frontend":  ["next.js", "react", "tailwind"],',
      '  "backend":   ["nestjs", "express", "node"],',
      '  "databases": ["postgres", "mongodb", "mysql"],',
      '  "ai":        ["langchain", "rag", "mcp"]',
      "}",
    ],
  },
  { type: "cmd", text: "status --now" },
  { type: "out", text: "● open to work · noida, india · 2.5+ yrs", cls: "text-amber" },
];

function Terminal() {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (line >= TERM.length) return;
    const item = TERM[line];
    let t: ReturnType<typeof setTimeout>;
    if (item.type === "cmd") {
      if (chars < item.text.length) {
        t = setTimeout(() => setChars((c) => c + 1), 26 + Math.random() * 42);
      } else {
        t = setTimeout(() => {
          setLine((l) => l + 1);
          setChars(0);
        }, 420);
      }
    } else {
      t = setTimeout(
        () => {
          setLine((l) => l + 1);
          setChars(0);
        },
        item.type === "json" ? 260 : 380
      );
    }
    return () => clearTimeout(t);
  }, [line, chars]);

  return (
    <div className="corners relative border border-line bg-coal/90 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-coral/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
        <span className="ml-3 font-mono text-[11px] tracking-wider text-faint">
          anshuman@noida: ~/portfolio
        </span>
      </div>
      <div className="min-h-[280px] px-4 py-4 font-mono text-[12.5px] leading-[1.9] sm:px-5 sm:text-[13px]">
        {TERM.slice(0, Math.min(line + 1, TERM.length)).map((item, i) => {
          const isCurrent = i === line;
          if (item.type === "cmd") {
            const shown = isCurrent ? item.text.slice(0, chars) : item.text;
            return (
              <div key={i} className="text-cream">
                <span className="text-mint">➜</span> <span className="text-faint">~</span>{" "}
                {shown}
                {isCurrent && <span className="blink inline-block h-[15px] w-[7px] translate-y-[2px] bg-cream" />}
              </div>
            );
          }
          if (item.type === "out") {
            if (isCurrent) return null;
            return (
              <div key={i} className={cn("pl-4 text-muted", item.cls)}>
                {item.text}
              </div>
            );
          }
          if (isCurrent) return null;
          return (
            <div key={i} className="pl-4">
              {item.lines.map((l, j) => (
                <div key={j} className="text-skyx">
                  {l.replace(/"([^"]+)":/g, '"$1":').includes('"') ? (
                    <>
                      {l.split(/("(?:[^"]+)")/g).map((part, k) =>
                        k % 2 === 1 ? (
                          <span key={k} className="text-amber">
                            {part}
                          </span>
                        ) : (
                          <span key={k} className="text-skyx">
                            {part}
                          </span>
                        )
                      )}
                    </>
                  ) : (
                    l
                  )}
                </div>
              ))}
            </div>
          );
        })}
        {line >= TERM.length && (
          <div className="text-cream">
            <span className="text-mint">➜</span> <span className="text-faint">~</span>{" "}
            <span className="blink inline-block h-[15px] w-[7px] translate-y-[2px] bg-amber" />
          </div>
        )}
      </div>
    </div>
  );
}

function IstClock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="tabular-nums">{now} IST</span>;
}

const STATS: Array<[string, string]> = [
  ["2.5+", "years shipping production code"],
  ["10+", "projects across web & mobile"],
  ["3", "platforms — web · mobile · desktop"],
  ["RAG", "systems, MCP servers & agents"],
];

export function Hero({ latestResume }: { latestResume: ResumeView | null }) {
  const role = useTypewriter(ROLES);

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* layered background */}
      <div className="grid-bg grid-bg-fade pointer-events-none absolute inset-0" />
      <div className="noise" />
      <div className="pointer-events-none absolute -top-40 left-[-10%] h-[520px] w-[520px] rounded-full bg-amber/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute right-[-15%] top-1/3 h-[560px] w-[560px] rounded-full bg-mint/[0.06] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:pb-20">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          {/* Left — identity */}
          <div>
            <p className="mono-label text-mint">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-mint align-middle" />
              available for freelance & full-time
            </p>

            <h1 className="mt-6 font-display font-extrabold uppercase leading-[0.9] tracking-tight">
              <span className="block text-[13vw] text-cream sm:text-7xl lg:text-[5.2rem] xl:text-[6rem]">
                Anshuman
              </span>
              <span className="text-outline block text-[13vw] sm:text-7xl lg:text-[5.2rem] xl:text-[6rem]">
                Mishra
              </span>
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="font-mono text-sm text-faint">$ role:</span>
              <span className="font-mono text-sm text-amber sm:text-base">{role}</span>
              <span className="blink inline-block h-4 w-[8px] bg-amber" />
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Full Stack Developer with <span className="text-cream">2.5+ years</span> building
              scalable products on <span className="text-cream">React, Next.js, Node.js and NestJS</span> —
              plus <span className="text-mint">Generative AI</span>: LangChain.js, RAG pipelines,
              vector databases and MCP servers for AI-driven products.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 bg-amber px-6 py-3.5 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(255,178,36,0.55)]"
              >
                View projects
                <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              {latestResume ? (
                <a
                  href={`/api/resumes/${latestResume.id}/file`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-line px-6 py-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-cream transition hover:border-mint/60 hover:text-mint"
                >
                  <IconDownload className="h-4 w-4" />
                  Download CV
                </a>
              ) : (
                <a
                  href="mailto:mishraanshuman146@gmail.com"
                  className="inline-flex items-center gap-2 border border-line px-6 py-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-cream transition hover:border-mint/60 hover:text-mint"
                >
                  Request CV
                </a>
              )}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[12px] uppercase tracking-[0.12em] text-faint">
              <span className="text-muted">
                <span className="text-amber">◉</span> Noida, India
              </span>
              <span className="text-muted">
                <span className="text-mint">⧗</span> <IstClock />
              </span>
              <span className="hidden text-muted sm:inline">
                <span className="text-coral">▲</span> Senior Full Stack @ Digixito
              </span>
            </div>
          </div>

          {/* Right — terminal */}
          <div className="lg:mt-4">
            <Terminal />
            <div className="mt-4 flex items-center justify-between border border-line bg-surface/60 px-4 py-3 font-mono text-[11px] text-faint">
              <span>session: secure</span>
              <span>
                uptime: <span className="text-mint">2.5 yrs</span>
              </span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
          {STATS.map(([big, small]) => (
            <div
              key={small}
              className="group bg-ink px-5 py-6 transition-colors duration-300 hover:bg-surface sm:px-7"
            >
              <p className="font-display text-3xl font-bold text-cream transition-colors group-hover:text-amber sm:text-4xl">
                {big}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-faint">
                {small}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
