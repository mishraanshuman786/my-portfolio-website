import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ROLES = [
  {
    period: "Dec 2024 — Apr 2026",
    role: "Senior Full Stack Developer",
    company: "Digixito Media Pvt. Ltd.",
    place: "Noida, India",
    current: true,
    bullets: [
      "Developing scalable applications using Next.js, NestJS and PostgreSQL",
      "Building reusable UI component systems with Tailwind CSS and Material UI",
      "Designing secure APIs with authentication and optimised queries",
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Tailwind CSS"],
  },
  {
    period: "Dec 2023 — Nov 2024",
    role: "Full Stack Developer",
    company: "Hindsol Software Pvt. Ltd.",
    place: "Varanasi, India",
    current: false,
    bullets: [
      "Built responsive websites using Next.js and Tailwind CSS",
      "Integrated REST APIs, authentication and payment gateways",
      "Developed backend services using Node.js, Express.js and MongoDB",
    ],
    stack: ["Next.js", "Node.js", "Express.js", "MongoDB"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <SectionHeading
            index="03"
            kicker="experience"
            title={
              <>
                Where I&apos;ve
                <br />
                <span className="text-amber">put in the hours</span>
              </>
            }
          />
        </Reveal>

        <div className="relative mt-16 space-y-6">
          <span className="absolute bottom-4 left-[7px] top-4 w-px bg-line" aria-hidden="true" />
          {ROLES.map((r, i) => (
            <Reveal key={r.company} delay={i * 120}>
              <article className="group relative pl-10 sm:pl-14">
                <span
                  className={
                    "absolute left-0 top-2 grid h-[15px] w-[15px] place-items-center rounded-full border " +
                    (r.current
                      ? "border-amber bg-amber/20 shadow-[0_0_18px_rgba(255,178,36,0.45)]"
                      : "border-line bg-ink")
                  }
                >
                  <span className={"h-1.5 w-1.5 rounded-full " + (r.current ? "bg-amber" : "bg-faint")} />
                </span>

                <div className="border border-line bg-surface/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber/40 hover:bg-surface sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-cream sm:text-3xl">
                        {r.role}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        <span className="text-mint">{r.company}</span> · {r.place}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {r.current && (
                        <span className="border border-amber/40 bg-amber/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-amber">
                          current
                        </span>
                      )}
                      <p className="font-mono text-[12px] uppercase tracking-wider text-faint">
                        {r.period}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {r.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                        <span className="mt-[9px] h-1 w-3 shrink-0 bg-amber/70" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {r.stack.map((s) => (
                      <span
                        key={s}
                        className="border border-line px-3 py-1 font-mono text-[11px] text-faint transition-colors group-hover:text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
