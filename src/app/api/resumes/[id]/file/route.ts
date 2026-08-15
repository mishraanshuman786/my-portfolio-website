import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { resumes } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId)) {
    return NextResponse.json({ error: "Invalid resume id" }, { status: 400 });
  }

  const [row] = await db.select().from(resumes).where(eq(resumes.id, numId)).limit(1);
  if (!row) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  const safeName = row.originalName.replace(/[^\w.\-]+/g, "_");
  return new NextResponse(new Uint8Array(row.data), {
    status: 200,
    headers: {
      "Content-Type": row.mimeType || "application/octet-stream",
      "Content-Disposition": `inline; filename="${safeName}"`,
      "Cache-Control": "private, max-age=60",
    },
  });
}
