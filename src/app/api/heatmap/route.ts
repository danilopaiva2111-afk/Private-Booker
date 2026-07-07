import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildHeatmap } from "@/lib/heatmap";

export async function GET() {
  const reservations = await prisma.reservation.findMany({
    orderBy: [{ date: "asc" }],
  });

  const byDate = new Map<string, typeof reservations>();
  for (const r of reservations) {
    const list = byDate.get(r.date) ?? [];
    list.push(r);
    byDate.set(r.date, list);
  }

  const cells = buildHeatmap(byDate);

  return NextResponse.json({
    cells,
    totalReservations: reservations.length,
    totalDays: byDate.size,
  });
}
