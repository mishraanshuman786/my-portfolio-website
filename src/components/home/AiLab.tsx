import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBolt, IconBraces, IconChip, IconDatabase, IconSpark } from "@/components/ui/Icons";

const PIPELINE = [
  { label: "query", sub: "user intent" },
  { label: "embed", sub: "vectorise" },
  { label: "retrieve", sub: "vector store" },
  { label: "reason", sub: "LLM + tools" },
  { label: "answer", sub: "with citations" },
];

const CAPABILITIES = [
  {
    icon: IconDatabase,
    title: "RAG pipelines",
    text: "Ingestion, chunking, embeddings and retrieval tuned per corpus — the pattern behind ShipGPT.",
    tone: "text-mint",
  },
  {
    icon: IconBraces,
    title: "MCP servers",
    text: "Model Context Protocol servers that expose real tools and data to LLMs safely and predictably.",
    tone: "text-amber",
  },
  {
    icon: IconChip,
    title: "Agentic workflows",
    text: "LangChain.js agents that plan, call tools, self-correct and hand off — not just chat.",
    tone: "text-skyx",
  },
  {
    icon: IconBolt,
    title: "LLM integration",
    text: "Prompt scaffolds, structured outputs, streaming responses and evaluation loops in production apps.",
    tone: "text-coral",
  },
];

export function AiLab() {
  return (
    <section id="ai-lab" className="relative scroll-mt-24 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-mint/[0.05] blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <SectionHeading
            index="05"
            kicker="ai lab"
            title={
              <>
                Retrieval, agents
                <br />
                <span className="text-mint">& agentic workflows</span>
              </>
            }
            description="The second half of my craft: making LLMs useful in production — grounded in your data, wired to your tools."
          />
        </Reveal>

        {/* Pipeline diagram */}
        <Reveal delay={120}>
          <div className="corners relative mt-14 border border-line bg-coal/70 p-6 sm:p-10">
            <p className="mono-label text-faint">rag_pipeline.flow — how an answer gets grounded</p>
            <div className="mt-8 flex flex-col items-stretch gap-0 lg:flex-row lg:items-center">
              {PIPELINE.map((step, i) => (
                <div key={step.label} className="contents">
                  <div className="group relative flex-1 border border-line bg-ink px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-mint/50">
                    <span className="absolute left-2 top-2 font-mono text-[10px] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-display text-lg font-bold uppercase tracking-tight text-cream transition-colors group-hover:text-mint">
                      {step.label}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-faint">{step.sub}</p>
                  </div>
                  {i < PIPELINE.length - 1 && (
                    <div className="flex justify-center py-1 lg:px-1 lg:py-0" aria-hidden="true">
                      <svg className="h-6 w-6 rotate-90 text-amber lg:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M3 12h16" strokeDasharray="4 3" className="flow-dash" />
                        <path d="m15 7 5 5-5 5" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-3 border-t border-dashed border-line pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              <IconSpark className="h-3.5 w-3.5 text-mint" />
              <span>
                tool loop — the LLM can call <span className="text-amber">MCP tools</span>, observe results and retry before answering
              </span>
            </div>
          </div>
        </Reveal>

        {/* Capabilities */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="group h-full border border-line bg-surface/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-surface sm:p-7">
                <div className="flex items-center justify-between">
                  <span className={`grid h-10 w-10 place-items-center border border-line ${c.tone}`}>
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] text-faint">/{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-tight text-cream">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ShipGPT spotlight */}
        <Reveal delay={100}>
          <div className="mt-6 flex flex-col gap-6 border border-amber/25 bg-gradient-to-r from-amber/[0.07] to-transparent p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <p className="mono-label text-amber">case in point — ShipGPT</p>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-cream">
                A production RAG system that answers questions over internal documents with cited
                context — chunking strategy, vector retrieval and prompt scaffolds built to survive
                real users.
              </p>
            </div>
            <a
              href="#work"
              className="shrink-0 self-start border border-amber/50 px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.14em] text-amber transition hover:bg-amber hover:text-ink sm:self-auto"
            >
              See it in work ↓
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
