import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FACTS: Array<[string, string]> = [
  ["Based in", "Noida, India"],
  ["Experience", "2.5+ years, full-time"],
  ["Currently", "Senior Full Stack @ Digixito Media"],
  ["Focus", "MERN + Generative AI products"],
];

const EDUCATION = [
  { degree: "Master of Computer Applications (MCA)", place: "Varanasi, India" },
  { degree: "Bachelor of Computer Applications (BCA)", place: "Varanasi, India" },
  { degree: "Computer Operator & Programming Assistant", place: "1-year ITI" },
];

const SOFT_SKILLS = ["Problem Solving", "Communication", "Quick Learner", "Team Collaboration"];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Left — sticky intro + portrait */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionHeading
                index="01"
                kicker="about"
                title={
                  <>
                    The engineer
                    <br />
                    <span className="text-amber">behind the stack</span>
                  </>
                }
              />
            </Reveal>

            <Reveal delay={120}>
              <div className="corners relative mt-10 max-w-sm border border-line bg-coal p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/avatar.jpeg"
                  alt="Illustrated portrait of Anshuman Mishra"
                  className="w-full object-cover"
                  width={640}
                  height={640}
                />
                <div className="flex items-center justify-between px-1 pb-1 pt-3 font-mono text-[11px] text-faint">
                  <span>anshuman.render()</span>
                  <span className="text-mint">● online</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 border-l-2 border-amber/70 pl-5">
                <p className="mono-label text-faint">education</p>
                <ul className="mt-4 space-y-4">
                  {EDUCATION.map((e) => (
                    <li key={e.degree}>
                      <p className="text-sm font-medium text-cream">{e.degree}</p>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-faint">
                        {e.place}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right — narrative */}
          <div>
            <Reveal>
              <p className="text-xl leading-relaxed text-cream sm:text-2xl">
                I build products the way I like my APIs —{" "}
                <span className="text-amber">fast, typed and predictable</span>. From a quiz-based
                learning platform serving web and mobile, to a production RAG system answering
                questions over internal documents.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 leading-relaxed text-muted">
                Over the last 2.5+ years I&apos;ve worked across the whole surface of a product:
                designing secure REST APIs with authentication and optimised queries in{" "}
                <span className="text-cream">NestJS and Express</span>, engineering front-ends with{" "}
                <span className="text-cream">Next.js, Tailwind and Material UI</span>, and modelling
                data in <span className="text-cream">PostgreSQL, MongoDB and MySQL</span>.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                The newest layer of my work is <span className="text-mint">AI engineering</span> —
                LangChain.js agents, retrieval-augmented generation, embeddings and MCP servers
                that let models safely use real tools. That combination — solid full-stack craft
                plus applied LLM systems — is what I bring to every build.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
                {FACTS.map(([k, v]) => (
                  <div key={k} className="group bg-ink px-5 py-5 transition-colors hover:bg-surface">
                    <p className="mono-label text-faint">{k}</p>
                    <p className="mt-2 text-sm font-medium text-cream transition-colors group-hover:text-amber">
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-10">
                <p className="mono-label text-faint">beyond the code</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {SOFT_SKILLS.map((s) => (
                    <span
                      key={s}
                      className="cursor-default border border-line px-4 py-2 font-mono text-[12px] text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-mint/60 hover:text-mint"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
