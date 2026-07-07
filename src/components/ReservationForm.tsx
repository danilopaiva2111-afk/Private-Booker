"use client";

import { useState } from "react";
import { generateTimeOptions } from "@/lib/time-options";
import { LOUNGE_CAPACITY } from "@/lib/occupancy";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Reservation } from "@/lib/types";

const timeOptions = generateTimeOptions();

type FormState = {
  name: string;
  email: string;
  phone: string;
  date: string;
  startTime: string;
  endTime: string;
  partySize: string;
};

function emptyForm(date: string): FormState {
  return {
    name: "",
    email: "",
    phone: "",
    date,
    startTime: "09:00",
    endTime: "10:00",
    partySize: "2",
  };
}

type Props = {
  date: string;
  onCreated: (reservation: Reservation) => void;
};

export function ReservationForm({ date, onCreated }: Props) {
  const [form, setForm] = useState<FormState>(() => emptyForm(date));
  const [errors, setErrors] = useState<string[]>([]);
  const [blockedMessage, setBlockedMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pendingConfirm, setPendingConfirm] = useState<{
    message: string;
  } | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submitReservation(confirmOverride: boolean) {
    setSubmitting(true);
    setErrors([]);
    setBlockedMessage(null);

    const payload = {
      ...form,
      partySize: Number(form.partySize),
      confirmOverride,
    };

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.status === 400) {
        const fieldErrors = data.issues?.fieldErrors ?? {};
        const formErrors = data.issues?.formErrors ?? [];
        setErrors([
          ...formErrors,
          ...Object.values(fieldErrors).flat().filter(Boolean),
        ] as string[]);
        return;
      }

      if (res.status === 409) {
        setBlockedMessage(data.message);
        return;
      }

      if (data.needsConfirmation) {
        setPendingConfirm({ message: data.message });
        return;
      }

      if (res.status === 201) {
        onCreated(data.reservation as Reservation);
        setForm(emptyForm(form.date));
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Nova reserva
      </h2>

      <form
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          submitReservation(false);
        }}
      >
        <label className="flex flex-col gap-1 text-sm sm:col-span-2">
          Nome
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            placeholder="Nome completo"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          E-mail
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            placeholder="nome@email.com"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Telefone
          <input
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            placeholder="(11) 99999-9999"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Data
          <input
            required
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Qtd. de pessoas
          <input
            required
            type="number"
            min={1}
            max={LOUNGE_CAPACITY}
            value={form.partySize}
            onChange={(e) => update("partySize", e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Horário de entrada
          <select
            value={form.startTime}
            onChange={(e) => update("startTime", e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          >
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Horário de saída
          <select
            value={form.endTime}
            onChange={(e) => update("endTime", e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          >
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        {errors.length > 0 && (
          <div className="sm:col-span-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-400">
            <ul className="list-disc pl-4">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {blockedMessage && (
          <div className="sm:col-span-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-400">
            {blockedMessage}
          </div>
        )}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
          >
            {submitting ? "Enviando..." : "Criar reserva"}
          </button>
        </div>
      </form>

      <ConfirmDialog
        open={pendingConfirm !== null}
        title="Margem de segurança"
        message={pendingConfirm?.message ?? ""}
        confirmLabel="Sim, continuar"
        cancelLabel="Cancelar"
        onCancel={() => setPendingConfirm(null)}
        onConfirm={() => {
          setPendingConfirm(null);
          submitReservation(true);
        }}
      />
    </div>
  );
}
