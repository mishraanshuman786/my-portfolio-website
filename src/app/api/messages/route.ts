import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { messageView } from "@/lib/serialize";

export const dynamic = "force-dynamic";

const SERVICES = new Set([
  "Web Development",
  "App Development",
  "Desktop Development",
  "AI / RAG System",
  "Backend & APIs",
  "Something else",
]);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot — bots love filling this in.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const text = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Please tell me your name" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "That email doesn't look right" }, { status: 400 });
  }
  if (!SERVICES.has(service)) {
    return NextResponse.json({ error: "Please pick a service" }, { status: 400 });
  }
  if (text.length < 10) {
    return NextResponse.json(
      { error: "Message is a little too short (min 10 characters)" },
      { status: 400 }
    );
  }
  if (text.length > 4000) {
    return NextResponse.json({ error: "Message is too long (max 4000 characters)" }, { status: 400 });
  }

  const [row] = await db
    .insert(messages)
    .values({ name: name.slice(0, 120), email: email.slice(0, 200), service, body: text })
    .returning();

  return NextResponse.json(messageView(row), { status: 201 });
}

export async function GET() {
  if (!(await requireUser())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await db.select().from(messages).orderBy(desc(messages.createdAt));
  return NextResponse.json(rows.map(messageView));
}
