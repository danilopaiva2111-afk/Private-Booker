"use client";

import { DAY_END_HOUR, DAY_START_HOUR, SAFETY_MARGIN, LOUNGE_CAPACITY, timeToMinutes } from "@/lib/occupancy";
import { Reservation } from "@/lib/types";

const TOTAL_HOURS = DAY_END_HOUR - DAY_START_HOUR;
const DAY_START_MIN = DAY_START_HOUR * 60;
const TOTAL_MIN = TOTAL_HOURS * 60;

type Props = {
  reservations: Reservation[];
  occupancy: { hour: number; count: number }[];
  onDelete: (id: string) => void;
};

type Lane = { endMin: number };

function assignLanes(reservations: Reservation[]) {
  const sorted = [...reservations].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
  );
  const lanes: Lane[] = [];
  const placed: { reservation: Reservation; lane: number }[] = [];

  for (const r of sorted) {
    const start = timeToMinutes(r.startTime);
    let laneIndex = lanes.findIndex((lane) => lane.endMin <= start);
    if (laneIndex === -1) {
      laneIndex = lanes.length;
      lanes.push({ endMin: timeToMinutes(r.endTime) });
    } else {
      lanes[laneIndex].endMin = timeToMinutes(r.endTime);
    }
    placed.push({ reservation: r, lane: laneIndex });
  }

  return { placed, laneCount: Math.max(lanes.length, 1) };
}

function occupancyColor(count: number) {
  if (count > LOUNGE_CAPACITY) return "bg-red-600 text-white";
  if (count > SAFETY_MARGIN) return "bg-amber-400 text-amber-950";
  if (count > 0) return "bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100";
  return "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600";
}

export function HorizontalAgenda({ reservations, occupancy, onDelete }: Props) {
  const { placed, laneCount } = assignLanes(reservations);
  const laneHeight = 44;

  const visibleOccupancy = occupancy.filter(
    (o) => o.hour >= DAY_START_HOUR && o.hour < DAY_END_HOUR
  );

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Agenda horizontal
        </h2>
        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-200 dark:bg-emerald-900" /> Normal
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Acima da margem ({SAFETY_MARGIN}+)
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600" /> Capacidade máxima ({LOUNGE_CAPACITY})
          </span>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div style={{ minWidth: TOTAL_HOURS * 64 }}>
          {/* hour header */}
          <div className="grid" style={{ gridTemplateColumns: `repeat(${TOTAL_HOURS}, minmax(0, 1fr))` }}>
            {Array.from({ length: TOTAL_HOURS }, (_, i) => DAY_START_HOUR + i).map((hour) => (
              <div
                key={hour}
                className="border-l border-zinc-100 px-1 pb-1 text-center text-xs font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
              >
                {hour.toString().padStart(2, "0")}h
              </div>
            ))}
          </div>

          {/* occupancy per hour */}
          <div className="grid" style={{ gridTemplateColumns: `repeat(${TOTAL_HOURS}, minmax(0, 1fr))` }}>
            {visibleOccupancy.map(({ hour, count }) => (
              <div
                key={hour}
                className={`border-l border-zinc-100 py-1.5 text-center text-xs font-semibold dark:border-zinc-800 ${occupancyColor(count)}`}
                title={`${count} pessoas simultâneas às ${hour}h`}
              >
                {count}
              </div>
            ))}
          </div>

          {/* reservation bars */}
          <div
            className="relative mt-2 border-t border-zinc-100 dark:border-zinc-800"
            style={{ height: laneCount * laneHeight + 8 }}
          >
            {/* hour gridlines */}
            <div
              className="pointer-events-none absolute inset-0 grid"
              style={{ gridTemplateColumns: `repeat(${TOTAL_HOURS}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: TOTAL_HOURS }).map((_, i) => (
                <div key={i} className="border-l border-zinc-100 dark:border-zinc-800" />
              ))}
            </div>

            {placed.length === 0 && (
              <p className="absolute inset-0 flex items-center justify-center text-sm text-zinc-400">
                Nenhuma reserva para este dia
              </p>
            )}

            {placed.map(({ reservation, lane }) => {
              const start = timeToMinutes(reservation.startTime);
              const end = timeToMinutes(reservation.endTime);
              const left = ((start - DAY_START_MIN) / TOTAL_MIN) * 100;
              const width = ((end - start) / TOTAL_MIN) * 100;
              return (
                <div
                  key={reservation.id}
                  className="group absolute flex items-center justify-between gap-2 overflow-hidden rounded-md bg-orange-100 px-2 text-xs text-orange-900 shadow-sm ring-1 ring-orange-300 dark:bg-orange-950 dark:text-orange-100 dark:ring-orange-800"
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    top: lane * laneHeight + 4,
                    height: laneHeight - 8,
                  }}
                  title={`${reservation.name} · ${reservation.partySize} pessoas · ${reservation.startTime}–${reservation.endTime}`}
                >
                  <span className="truncate">
                    <strong>{reservation.name}</strong> · {reservation.partySize}p ·{" "}
                    {reservation.startTime}–{reservation.endTime}
                  </span>
                  <button
                    onClick={() => onDelete(reservation.id)}
                    className="shrink-0 rounded-full px-1.5 text-orange-700 hover:bg-orange-200 dark:text-orange-300 dark:hover:bg-orange-900"
                    title="Cancelar reserva"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
