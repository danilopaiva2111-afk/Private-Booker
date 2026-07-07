import { z } from "zod";
import { LOUNGE_CAPACITY, timeToMinutes } from "@/lib/occupancy";

const timeRegex = /^([01]\d|2[0-3]):(00|15|30|45)$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const reservationInputSchema = z
  .object({
    name: z.string().trim().min(2, "Informe o nome completo"),
    email: z.string().trim().email("E-mail inválido"),
    phone: z
      .string()
      .trim()
      .min(8, "Telefone inválido")
      .max(20, "Telefone inválido"),
    date: z.string().regex(dateRegex, "Data inválida"),
    startTime: z
      .string()
      .regex(timeRegex, "Horário de entrada inválido (múltiplos de 15 min)"),
    endTime: z
      .string()
      .regex(timeRegex, "Horário de saída inválido (múltiplos de 15 min)"),
    partySize: z
      .number()
      .int()
      .min(1, "Quantidade de pessoas deve ser ao menos 1")
      .max(LOUNGE_CAPACITY, `Quantidade de pessoas não pode exceder ${LOUNGE_CAPACITY}`),
    confirmOverride: z.boolean().optional().default(false),
  })
  .refine((data) => timeToMinutes(data.endTime) > timeToMinutes(data.startTime), {
    message: "Horário de saída deve ser depois do horário de entrada",
    path: ["endTime"],
  });

export type ReservationInput = z.infer<typeof reservationInputSchema>;
