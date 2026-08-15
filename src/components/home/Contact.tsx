"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  IconCheck,
  IconMail,
  IconPhone,
  IconPin,
  IconSend,
} from "@/components/ui/Icons";

const SERVICES = [
  "Web Development",
  "App Development",
  "Desktop Development",
  "AI / RAG System",
  "Backend & APIs",
  "Something else",
];

const CHANNELS = [
  {
    icon: IconMail,
    label: "email",
    value: "mishraanshuman146@gmail.com",
    href: "mailto:mishraanshuman146@gmail.com",
    tone: "text-amber",
  },
  {
    icon: IconPhone,
    label: "phone",
    value: "+91 77060 87842",
    href: "tel:+917706087842",
    tone: "text-mint",
  },
  {
    icon: IconPin,
    label: "base",
    value: "Noida, India — works anywhere (IST)",
    href: undefined,
    tone: "text-skyx",
  },
];

type Errors = Partial<Record<"name" | "email" | "service" | "message", string>>;

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Your name, please";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) next.email = "Valid email needed";
    if (!service) next.service = "Pick a service";
    if (message.trim().length < 10) next.message = "Tell me a little more (10+ chars)";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setState("sending");
    setServerError(null);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, message, website: "" }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong");
      }
      setState("sent");
      setName("");
      setEmail("");
      setService("");
      setMessage("");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
      setState("idle");
    }
  }

  const inputCls = (bad?: string) =>
    cn(
      "w-full border bg-ink px-4 py-3 font-mono text-sm text-cream placeholder:text-faint outline-none transition focus:border-amber/70",
      bad ? "border-coral/70" : "border-line"
    );

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-line bg-coal/40">
      <div className="pointer-events-none absolute -bottom-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-amber/[0.06] blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          {/* Left — pitch + channels */}
          <div>
            <Reveal>
              <SectionHeading
                index="07"
                kicker="contact"
                title={
                  <>
                    Have a build
                    <br />
                    <span className="text-amber">in mind?</span>
                  </>
                }
                description="App, web platform, desktop tool or an AI feature that needs to be real — send the shape of the problem and I'll reply within 24 hours."
              />
            </Reveal>

            <div className="mt-10 space-y-3">
              {CHANNELS.map((c, i) => (
                <Reveal key={c.label} delay={i * 90}>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="group flex items-center gap-4 border border-line bg-surface/40 px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber/50 hover:bg-surface"
                    >
                      <span className={`grid h-10 w-10 place-items-center border border-line ${c.tone}`}>
                        <c.icon className="h-4.5 w-4.5" />
                      </span>
                      <span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                          {c.label}
                        </span>
                        <span className="mt-0.5 block text-sm font-medium text-cream transition-colors group-hover:text-amber">
                          {c.value}
                        </span>
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 border border-line bg-surface/40 px-5 py-4">
                      <span className={`grid h-10 w-10 place-items-center border border-line ${c.tone}`}>
                        <c.icon className="h-4.5 w-4.5" />
                      </span>
                      <span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                          {c.label}
                        </span>
                        <span className="mt-0.5 block text-sm font-medium text-cream">{c.value}</span>
                      </span>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>

            <Reveal delay={260}>
              <p className="mt-8 font-mono text-[12px] leading-relaxed text-faint">
                <span className="text-mint">tip:</span> messages land straight in the{" "}
                <a href="/login" className="text-amber underline-offset-4 hover:underline">dashboard inbox</a>{" "}
                — this site runs its own Next.js + PostgreSQL backend.
              </p>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={140}>
            <div className="corners relative border border-line bg-coal/80 p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <p className="mono-label text-cream">new_message.form</p>
                <span className="font-mono text-[11px] text-faint">POST /api/messages</span>
              </div>

              {state === "sent" ? (
                <div className="py-14 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-mint/50 bg-mint/10 text-mint">
                    <IconCheck className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold uppercase text-cream">
                    Message received
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">
                    It&apos;s in the inbox. Expect a reply at your email within 24 hours — usually much faster.
                  </p>
                  <button
                    type="button"
                    onClick={() => setState("idle")}
                    className="mt-8 border border-line px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-muted transition hover:border-mint/60 hover:text-mint"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className="mono-label mb-2 block text-faint">name *</label>
                      <input
                        id="c-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ada Lovelace"
                        className={inputCls(errors.name)}
                      />
                      {errors.name && <p className="mt-1.5 font-mono text-[11px] text-coral">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="c-email" className="mono-label mb-2 block text-faint">email *</label>
                      <input
                        id="c-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ada@company.dev"
                        className={inputCls(errors.email)}
                      />
                      {errors.email && <p className="mt-1.5 font-mono text-[11px] text-coral">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-service" className="mono-label mb-2 block text-faint">what do you need? *</label>
                    <select
                      id="c-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className={cn(inputCls(errors.service), "appearance-none", !service && "text-faint")}
                    >
                      <option value="" disabled>Select a service…</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s} className="bg-ink text-cream">
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className="mt-1.5 font-mono text-[11px] text-coral">{errors.service}</p>}
                  </div>

                  <div>
                    <label htmlFor="c-message" className="mono-label mb-2 block text-faint">the problem *</label>
                    <textarea
                      id="c-message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="We need a quiz app with AI explanations, web + mobile…"
                      className={cn(inputCls(errors.message), "resize-none leading-relaxed")}
                    />
                    <div className="mt-1.5 flex items-center justify-between">
                      {errors.message ? (
                        <p className="font-mono text-[11px] text-coral">{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <p className="font-mono text-[11px] text-faint">{message.length}/4000</p>
                    </div>
                  </div>

                  {serverError && (
                    <p className="border border-coral/40 bg-coral/10 px-4 py-3 font-mono text-[12px] text-coral">
                      {serverError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="group flex w-full items-center justify-center gap-2.5 bg-amber px-6 py-4 font-mono text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-12px_rgba(255,178,36,0.6)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {state === "sending" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <IconSend className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
