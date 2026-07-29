"use client";

import { useState, type FormEvent } from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";

const WHATSAPP_NUMBER = "5511000000000";

const INFO = [
  {
    label: "Endereço",
    value: "Av. Exemplo, 1000 — São Paulo, SP",
  },
  {
    label: "Horário",
    value: "Seg a Sáb, 6h às 22h",
  },
  {
    label: "Telefone / WhatsApp",
    value: "(11) 00000-0000",
  },
  {
    label: "E-mail",
    value: "contato@proonetenniscoach.com.br",
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = `Olá! Meu nome é ${name || "—"}.%0A${
      phone ? `Telefone: ${phone}%0A` : ""
    }${message ? `Mensagem: ${message}` : "Quero agendar uma aula experimental na Pro One Tennis Coach."}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <section id="contato" className="relative overflow-hidden bg-ink-soft py-24 sm:py-32">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-lime/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div className="flex flex-col gap-10">
          <SectionHeading
            kicker="Contato"
            title="Vamos para a quadra?"
            description="Preencha o formulário ou fale direto pelo WhatsApp para agendar sua aula experimental na Pro One Tennis Coach."
          />

          <RevealOnScroll delay={0.15} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {INFO.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-lime">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-white/70">{item.value}</p>
              </div>
            ))}
          </RevealOnScroll>

          <RevealOnScroll delay={0.25} className="flex gap-4">
            <a
              href="https://instagram.com/proonetenniscoach"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-lime hover:text-lime"
            >
              Instagram
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-lime px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:scale-105"
            >
              WhatsApp Direto
            </a>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-ink p-8"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Nome
              </label>
              <input
                id="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-lime"
                placeholder="Seu nome completo"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Telefone
              </label>
              <input
                id="phone"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-lime"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Mensagem
              </label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-lime"
                placeholder="Conte um pouco sobre seu objetivo com o tênis"
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded-full bg-lime px-6 py-4 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:scale-105"
            >
              Enviar via WhatsApp
            </button>
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
}
