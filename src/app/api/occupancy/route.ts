import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hourlyOccupancy } from "@/lib/occupancy";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "date query param required" }, { status: 400 });
  }

  const reservations = await prisma.reservation.findMany({
    where: { date },
    orderBy: [{ startTime: "asc" }],
  });

  const occupancy = hourlyOccupancy(reservations);

  return NextResponse.json({ reservations, occupancy });
}
