"use client";

import { useCallback, useEffect, useState } from "react";
import { ReservationForm } from "@/components/ReservationForm";
import { HorizontalAgenda } from "@/components/HorizontalAgenda";
import { Reservation } from "@/lib/types";
import { todayISO } from "@/lib/time-options";

type OccupancyResponse = {
  reservations: Reservation[];
  occupancy: { hour: number; count: number }[];
};

export function BookingPage() {
  const [date, setDate] = useState(todayISO());
  const [data, setData] = useState<OccupancyResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAgenda = useCallback(async (targetDate: string) => {
    const res = await fetch(`/api/occupancy?date=${targetDate}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional client-side data fetch on date change
    fetchAgenda(date);
  }, [date, fetchAgenda]);

  async function handleDelete(id: string) {
    await fetch(`/api/reservations/${id}`, { method: "DELETE" });
    fetchAgenda(date);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Reservas do Lounge Private</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Capacidade simultânea máxima de 44 pessoas.
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium">
          Filtrar por dia
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ReservationForm
            key={date}
            date={date}
            onCreated={() => fetchAgenda(date)}
          />
        </div>
        <div className="lg:col-span-2">
          {loading || !data ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
              Carregando agenda...
            </div>
          ) : (
            <HorizontalAgenda
              reservations={data.reservations}
              occupancy={data.occupancy}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
