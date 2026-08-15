import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  kicker,
  title,
  description,
  className,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="mono-label text-amber">
        <span className="text-faint">[</span> {index} <span className="text-faint">]</span>
        <span className="mx-3 inline-block h-px w-8 translate-y-[-3px] bg-amber/60" />
        {kicker}
      </p>
      <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-cream sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
