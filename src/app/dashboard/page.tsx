import { Heatmap } from "@/components/Heatmap";
import { LOUNGE_CAPACITY, SAFETY_MARGIN } from "@/lib/occupancy";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Dashboard de ocupação</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Capacidade máxima de {LOUNGE_CAPACITY} pessoas simultâneas · margem de
          segurança em {SAFETY_MARGIN}.
        </p>
      </div>

      <Heatmap />
    </div>
  );
}
