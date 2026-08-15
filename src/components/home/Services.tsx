import type { ComponentType } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  IconArrowUpRight,
  IconBraces,
  IconChip,
  IconGlobe,
  IconMonitor,
  IconSmartphone,
} from "@/components/ui/Icons";

type Service = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  blurb: string;
  detail: string;
  stack: string[];
  tone: string;
};

const SERVICES: Service[] = [
  {
    icon: IconGlobe,
    title: "Web Development",
    blurb: "Fast, SEO-healthy web apps and sites",
    detail:
      "Marketing sites, dashboards and full SaaS builds — server-rendered Next.js front-ends with NestJS or Express backends, auth, payments and admin panels included.",
    stack: ["Next.js", "NestJS", "Express.js", "Tailwind CSS", "Material UI"],
    tone: "text-amber",
  },
  {
    icon: IconSmartphone,
    title: "App Development",
    blurb: "Cross-platform mobile apps in React Native",
    detail:
      "One codebase, both stores. Shared APIs and auth with the web build — like mytreks.ai, which runs as both a website and a mobile app.",
    stack: ["React Native", "Node.js", "REST APIs", "Firebase"],
    tone: "text-mint",
  },
  {
    icon: IconMonitor,
    title: "Desktop Development",
    blurb: "Desktop tools that talk to the cloud",
    detail:
      "Cross-platform desktop applications with web technology — local-first flows, installers and cloud sync where it matters.",
    stack: ["Electron", "React", "Node.js", "SQLite / Postgres"],
    tone: "text-skyx",
  },
  {
    icon: IconChip,
    title: "AI & RAG Systems",
    blurb: "LLM features that survive production",
    detail:
      "RAG pipelines over your documents, MCP servers, agentic workflows and chat copilots — with embeddings, evaluation and streaming UX done properly.",
    stack: ["LangChain.js", "RAG", "MCP Servers", "Embeddings", "Vector DBs"],
    tone: "text-coral",
  },
  {
    icon: IconBraces,
    title: "Backends & APIs",
    blurb: "The part users never see — until it breaks",
    detail:
      "Secure REST APIs with JWT auth, clean schema design and optimised queries across PostgreSQL, MongoDB and MySQL. Documented, tested, deployable on AWS, Vercel or Render.",
    stack: ["PostgreSQL", "MongoDB", "MySQL", "JWT", "Docker", "AWS"],
    tone: "text-amber",
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <SectionHeading
            index="06"
            kicker="services"
            title={
              <>
                What you can
                <br />
                <span className="text-amber">hire me for</span>
              </>
            }
            description="Web, mobile, desktop or AI — one engineer across the whole surface. Hover a row to see what's inside."
          />
        </Reveal>

        <div className="mt-14 border-t border-line">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="group grid grid-cols-[48px_minmax(0,1fr)] items-start gap-5 border-b border-line py-7 transition-colors duration-300 hover:bg-surface/50 sm:grid-cols-[80px_56px_minmax(0,1fr)_40px] sm:gap-8 sm:px-4">
                <p className="pt-1 font-mono text-sm text-faint transition-colors group-hover:text-amber">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <span className={`hidden h-11 w-11 place-items-center border border-line transition-colors group-hover:border-current sm:grid ${s.tone}`}>
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-cream transition-colors group-hover:text-amber sm:text-3xl">
                      {s.title}
                    </h3>
                    <p className="font-mono text-[12px] text-faint">{s.blurb}</p>
                  </div>
                  <div className="grid grid-rows-[1fr] transition-all duration-300 md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                        {s.detail}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2 pb-1">
                        {s.stack.map((t) => (
                          <span
                            key={t}
                            className="border border-line px-2.5 py-1 font-mono text-[11px] text-faint"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`hidden justify-self-end pt-1 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:block ${s.tone}`}>
                  <IconArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
