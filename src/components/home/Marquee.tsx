const ITEMS = [
  "React.js",
  "Next.js",
  "Node.js",
  "NestJS",
  "Express.js",
  "TypeScript",
  "React Native",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "LangChain.js",
  "RAG Systems",
  "MCP Servers",
  "Tailwind CSS",
  "Docker",
  "AWS",
];

function Row({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-row overflow-hidden border-y border-line bg-coal/60 py-4">
      <div
        className={
          "marquee-track flex w-max items-center gap-8 pr-8 " +
          (reverse ? "marquee-reverse" : "")
        }
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 font-display text-lg font-semibold uppercase tracking-wide text-muted transition hover:text-cream"
          >
            {item}
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-amber" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section aria-label="Technology stack ticker" className="relative">
      <Row />
    </section>
  );
}
