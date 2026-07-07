import { hourlyOccupancy, ReservationRange } from "@/lib/occupancy";

export const WEEKDAY_LABELS = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb",
];

export function weekdayFromDateString(date: string): number {
  return new Date(`${date}T00:00:00`).getDay();
}

export type HeatmapCell = {
  weekday: number;
  hour: number;
  avgOccupancy: number;
  maxOccupancy: number;
  sampleDays: number;
};

/**
 * Aggregates reservations (each tagged with its date) into an hour x weekday
 * grid. For every weekday, the average is computed over the distinct dates
 * observed for that weekday, so hours with no reservations still pull the
 * average down for days that occurred.
 */
export function buildHeatmap(
  reservationsByDate: Map<string, ReservationRange[]>
): HeatmapCell[] {
  const datesByWeekday = new Map<number, string[]>();
  for (const date of reservationsByDate.keys()) {
    const wd = weekdayFromDateString(date);
    const list = datesByWeekday.get(wd) ?? [];
    list.push(date);
    datesByWeekday.set(wd, list);
  }

  const cells: HeatmapCell[] = [];
  for (let weekday = 0; weekday < 7; weekday++) {
    const dates = datesByWeekday.get(weekday) ?? [];
    const sums = new Array(24).fill(0);
    const maxes = new Array(24).fill(0);
    for (const date of dates) {
      const occ = hourlyOccupancy(reservationsByDate.get(date) ?? []);
      occ.forEach(({ hour, count }) => {
        sums[hour] += count;
        if (count > maxes[hour]) maxes[hour] = count;
      });
    }
    for (let hour = 0; hour < 24; hour++) {
      cells.push({
        weekday,
        hour,
        avgOccupancy: dates.length ? sums[hour] / dates.length : 0,
        maxOccupancy: maxes[hour],
        sampleDays: dates.length,
      });
    }
  }
  return cells;
}
