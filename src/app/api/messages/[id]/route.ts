import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { messageView } from "@/lib/serialize";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  if (!(await requireUser())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId)) {
    return NextResponse.json({ error: "Invalid message id" }, { status: 400 });
  }

  let body: { read?: boolean };
  try {
    body = (await req.json()) as { read?: boolean };
  } catch {
    body = {};
  }

  const [row] = await db
    .update(messages)
    .set({ read: body.read === true })
    .where(eq(messages.id, numId))
    .returning();

  if (!row) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }
  return NextResponse.json(messageView(row));
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await requireUser())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId)) {
    return NextResponse.json({ error: "Invalid message id" }, { status: 400 });
  }
  const [row] = await db.delete(messages).where(eq(messages.id, numId)).returning({ id: messages.id });
  if (!row) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, id: numId });
}
