export const LOUNGE_CAPACITY = 44;
export const SAFETY_MARGIN = 37;
export const SLOT_MINUTES = 15;
export const DAY_START_HOUR = 6;
export const DAY_END_HOUR = 24;

export type ReservationRange = {
  id?: string;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  partySize: number;
};

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/** Slot start-minutes (SLOT_MINUTES-wide) covered by [start, end). */
function slotsInRange(startMin: number, endMin: number): number[] {
  const slots: number[] = [];
  for (
    let s = Math.floor(startMin / SLOT_MINUTES) * SLOT_MINUTES;
    s < endMin;
    s += SLOT_MINUTES
  ) {
    slots.push(s);
  }
  return slots;
}

/** Map of slot-start-minute -> total people occupying the lounge during that slot. */
export function buildOccupancyMap(
  reservations: ReservationRange[]
): Map<number, number> {
  const map = new Map<number, number>();
  for (const r of reservations) {
    const start = timeToMinutes(r.startTime);
    const end = timeToMinutes(r.endTime);
    for (const slot of slotsInRange(start, end)) {
      map.set(slot, (map.get(slot) ?? 0) + r.partySize);
    }
  }
  return map;
}

/**
 * Peak simultaneous occupancy that would result from adding a candidate
 * reservation on top of the existing reservations for that day.
 * Only slots touched by the candidate's own time range are relevant, since
 * that is the only range whose occupancy changes.
 */
export function peakOccupancyForCandidate(
  existing: ReservationRange[],
  candidate: { startTime: string; endTime: string; partySize: number }
): number {
  const existingMap = buildOccupancyMap(existing);
  const start = timeToMinutes(candidate.startTime);
  const end = timeToMinutes(candidate.endTime);
  let peak = 0;
  for (const slot of slotsInRange(start, end)) {
    const total = (existingMap.get(slot) ?? 0) + candidate.partySize;
    if (total > peak) peak = total;
  }
  return peak;
}

export type HourOccupancy = { hour: number; count: number };

/** Peak occupancy per hour (0-23) for a set of reservations on a single day. */
export function hourlyOccupancy(
  reservations: ReservationRange[]
): HourOccupancy[] {
  const map = buildOccupancyMap(reservations);
  const result: HourOccupancy[] = [];
  for (let hour = 0; hour < 24; hour++) {
    let peak = 0;
    for (let m = hour * 60; m < (hour + 1) * 60; m += SLOT_MINUTES) {
      const count = map.get(m) ?? 0;
      if (count > peak) peak = count;
    }
    result.push({ hour, count: peak });
  }
  return result;
}

export type CapacityCheck = {
  peak: number;
  status: "ok" | "warning" | "blocked";
};

export function checkCapacity(
  existing: ReservationRange[],
  candidate: { startTime: string; endTime: string; partySize: number }
): CapacityCheck {
  const peak = peakOccupancyForCandidate(existing, candidate);
  if (peak > LOUNGE_CAPACITY) return { peak, status: "blocked" };
  if (peak > SAFETY_MARGIN) return { peak, status: "warning" };
  return { peak, status: "ok" };
}
