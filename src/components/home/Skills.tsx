import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  IconBraces,
  IconChip,
  IconCode,
  IconDatabase,
  IconGlobe,
  IconLayers,
} from "@/components/ui/Icons";
import type { ComponentType } from "react";

type Group = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  note: string;
  skills: string[];
};

const GROUPS: Group[] = [
  {
    icon: IconGlobe,
    title: "Frontend",
    note: "Interfaces that feel instant",
    skills: ["React.js", "Redux", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Material UI"],
  },
  {
    icon: IconBraces,
    title: "Backend",
    note: "Secure, well-shaped APIs",
    skills: ["Node.js", "Express.js", "NestJS", "REST APIs", "JWT", "Bcrypt"],
  },
  {
    icon: IconDatabase,
    title: "Databases",
    note: "Modelled for the query, not the ORM",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Vector Databases"],
  },
  {
    icon: IconChip,
    title: "AI & RAG",
    note: "LLMs that use real tools",
    skills: ["LangChain.js", "RAG Systems", "MCP Servers", "LLM Integration", "Embeddings"],
  },
  {
    icon: IconLayers,
    title: "Dev & Cloud",
    note: "Shipped, monitored, deployed",
    skills: ["Git", "GitHub", "Docker", "Postman", "AWS EC2/S3", "Vercel", "Render", "Firebase"],
  },
  {
    icon: IconCode,
    title: "Languages",
    note: "Daily drivers",
    skills: ["JavaScript", "TypeScript"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 border-t border-line bg-coal/40">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              index="02"
              kicker="skills"
              title={
                <>
                  Weapons of
                  <br />
                  <span className="text-mint">choice</span>
                </>
              }
              description="A working toolbox, not a keyword dump — everything below has shipped to production in the last 2.5 years."
            />
          </Reveal>
          <Reveal delay={150}>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-faint">
              6 domains · 30+ tools
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-line">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 60}>
              <div className="group grid gap-4 border-b border-line py-7 transition-colors duration-300 hover:bg-surface/50 sm:grid-cols-[64px_minmax(0,1fr)_minmax(0,2fr)] sm:gap-8 sm:px-4 lg:grid-cols-[80px_280px_minmax(0,1fr)]">
                <p className="font-mono text-sm text-faint transition-colors group-hover:text-amber">
                  /{String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center border border-line text-muted transition-colors duration-300 group-hover:border-amber/50 group-hover:text-amber">
                      <g.icon className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold uppercase tracking-tight text-cream">
                        {g.title}
                      </h3>
                      <p className="mt-0.5 font-mono text-[11px] text-faint">{g.note}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:pt-1">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className="border border-line bg-ink px-3 py-1.5 font-mono text-[12px] text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-mint/50 hover:text-mint"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
