import Link from "next/link";
import { IconArrowUpRight } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#top" className="flex items-center gap-1 font-mono text-sm text-cream">
              <span className="text-amber">~/</span>anshuman
              <span className="blink -mb-0.5 inline-block h-4 w-[7px] bg-amber" />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Full Stack MERN + AI Engineer — building web, mobile, desktop and AI-driven products
              from Noida, India.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-3 sm:grid-cols-3">
            {[
              ["About", "#about"],
              ["Skills", "#skills"],
              ["Experience", "#experience"],
              ["Work", "#work"],
              ["AI Lab", "#ai-lab"],
              ["Services", "#services"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[12px] uppercase tracking-[0.12em] text-faint transition hover:text-amber"
              >
                {label}
              </a>
            ))}
            <Link
              href="/login"
              className="flex items-center gap-1 font-mono text-[12px] uppercase tracking-[0.12em] text-faint transition hover:text-mint"
            >
              Dashboard <IconArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] text-faint sm:flex-row sm:items-center">
          <p>© 2026 Anshuman Mishra — all systems operational</p>
          <p>
            built with <span className="text-cream">Next.js</span> ·{" "}
            <span className="text-cream">PostgreSQL</span> ·{" "}
            <span className="text-cream">Drizzle ORM</span>
          </p>
          <a href="#top" className="text-muted transition hover:text-amber">
            ↑ back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
