import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { reservationInputSchema } from "@/lib/validation";
import { checkCapacity, LOUNGE_CAPACITY, SAFETY_MARGIN } from "@/lib/occupancy";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  const reservations = await prisma.reservation.findMany({
    where: date ? { date } : undefined,
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });
  return NextResponse.json({ reservations });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = reservationInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { confirmOverride, ...data } = parsed.data;

  const existing = await prisma.reservation.findMany({
    where: { date: data.date },
    select: { startTime: true, endTime: true, partySize: true },
  });

  const capacity = checkCapacity(existing, data);

  if (capacity.status === "blocked") {
    return NextResponse.json(
      {
        error: "capacity_exceeded",
        peak: capacity.peak,
        capacity: LOUNGE_CAPACITY,
        message: `Essa reserva faria o lounge ultrapassar sua capacidade máxima de ${LOUNGE_CAPACITY} pessoas simultâneas (pico estimado: ${capacity.peak}). Reserva não permitida.`,
      },
      { status: 409 }
    );
  }

  if (capacity.status === "warning" && !confirmOverride) {
    return NextResponse.json(
      {
        needsConfirmation: true,
        peak: capacity.peak,
        safetyMargin: SAFETY_MARGIN,
        message:
          "Ao inserir essa reserva você estará acima da margem de segurança do lounge, deseja continuar?",
      },
      { status: 200 }
    );
  }

  const reservation = await prisma.reservation.create({ data });

  return NextResponse.json(
    { reservation, peak: capacity.peak, status: capacity.status },
    { status: 201 }
  );
}
