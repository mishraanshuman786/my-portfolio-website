"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconClose, IconMenu } from "@/components/ui/Icons";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#work", label: "Work" },
  { href: "/#ai-lab", label: "AI Lab" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
  { href:"/learning", label:"Learning"}
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-1 font-mono text-sm text-cream">
          <span className="text-amber">~/</span>
          <span className="font-medium tracking-tight">anshuman</span>
          <span className="blink -mb-0.5 inline-block h-4 w-[7px] bg-amber" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[12px] uppercase tracking-[0.14em] text-muted transition hover:text-cream"
            >
              <span className="mr-1 text-faint transition group-hover:text-amber">
                {String(i + 1).padStart(2, "0")}
              </span>
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden border border-amber/40 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.14em] text-amber transition hover:bg-amber hover:text-ink sm:block"
          >
            Dashboard ↗
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center border border-line text-cream lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={cn(
          "overflow-hidden border-b border-line bg-ink/95 backdrop-blur-md transition-all duration-300 lg:hidden",
          open ? "max-h-[420px]" : "max-h-0 border-b-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 border-b border-line/50 py-3 font-mono text-sm uppercase tracking-[0.12em] text-muted transition hover:text-amber"
            >
              <span className="text-faint">{String(i + 1).padStart(2, "0")}</span>
              {l.label}
            </a>
          ))}
          <Link
            href="/login"
            className="mt-3 border border-amber/40 px-4 py-3 text-center font-mono text-sm uppercase tracking-[0.12em] text-amber"
          >
            Dashboard ↗
          </Link>
        </nav>
      </div>
    </header>
  );
}
