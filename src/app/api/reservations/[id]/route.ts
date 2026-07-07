import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await prisma.reservation.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
