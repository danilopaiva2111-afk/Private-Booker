"use client";

import { useEffect, useState } from "react";
import { DAY_END_HOUR, DAY_START_HOUR, LOUNGE_CAPACITY } from "@/lib/occupancy";
import { WEEKDAY_LABELS } from "@/lib/heatmap";

type HeatmapCell = {
  weekday: number;
  hour: number;
  avgOccupancy: number;
  maxOccupancy: number;
  sampleDays: number;
};

function cellStyle(value: number) {
  const alpha = Math.min(value / LOUNGE_CAPACITY, 1);
  return {
    backgroundColor: `rgba(234, 88, 12, ${alpha === 0 ? 0.05 : 0.12 + alpha * 0.8})`,
    color: alpha > 0.55 ? "#fff" : undefined,
  };
}

export function Heatmap() {
  const [cells, setCells] = useState<HeatmapCell[] | null>(null);
  const [stats, setStats] = useState<{ totalReservations: number; totalDays: number } | null>(
    null
  );

  useEffect(() => {
    fetch("/api/heatmap")
      .then((r) => r.json())
      .then((json) => {
        setCells(json.cells);
        setStats({ totalReservations: json.totalReservations, totalDays: json.totalDays });
      });
  }, []);

  if (!cells) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
        Carregando heatmap...
      </div>
    );
  }

  const hours = Array.from(
    { length: DAY_END_HOUR - DAY_START_HOUR },
    (_, i) => DAY_START_HOUR + i
  );

  const byKey = new Map(cells.map((c) => [`${c.weekday}-${c.hour}`, c]));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Ocupação média por hora e dia da semana
        </h2>
        {stats && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {stats.totalReservations} reservas em {stats.totalDays} dias
          </p>
        )}
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-separate border-spacing-1 text-xs">
          <thead>
            <tr>
              <th className="w-12 text-left font-normal text-zinc-400"> </th>
              {WEEKDAY_LABELS.map((label) => (
                <th key={label} className="px-1 pb-1 text-center font-medium text-zinc-500 dark:text-zinc-400">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td className="pr-2 text-right font-medium text-zinc-500 dark:text-zinc-400">
                  {hour.toString().padStart(2, "0")}h
                </td>
                {WEEKDAY_LABELS.map((_, weekday) => {
                  const cell = byKey.get(`${weekday}-${hour}`);
                  const value = cell?.avgOccupancy ?? 0;
                  return (
                    <td
                      key={weekday}
                      style={cellStyle(value)}
                      className="rounded-md px-2 py-1.5 text-center tabular-nums"
                      title={
                        cell
                          ? `Média ${value.toFixed(1)} pessoas · pico ${cell.maxOccupancy} · ${cell.sampleDays} dia(s) observado(s)`
                          : "Sem dados"
                      }
                    >
                      {value > 0 ? value.toFixed(0) : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span>Menos ocupado</span>
        <div className="flex h-3 flex-1 overflow-hidden rounded-full">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex-1" style={cellStyle((i / 9) * LOUNGE_CAPACITY)} />
          ))}
        </div>
        <span>Mais ocupado</span>
      </div>
    </div>
  );
}
