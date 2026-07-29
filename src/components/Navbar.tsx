"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#coach", label: "Coach" },
  { href: "#programas", label: "Programas" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#galeria", label: "Galeria" },
  { href: "#planos", label: "Planos" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-2">
          <Image
            src="/images/logo-mark.svg"
            alt="Pro One Tennis Coach"
            width={36}
            height={36}
            priority
          />
          <span className="font-display text-xl tracking-wide text-white">
            PRO ONE <span className="text-lime">TENNIS COACH</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium uppercase tracking-wide text-white/70 transition-colors hover:text-lime"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="https://instagram.com/proonetenniscoach"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white/70 transition-colors hover:text-lime"
          >
            @proonetenniscoach
          </a>
          <a
            href="#contato"
            className="rounded-full bg-lime px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:scale-105"
          >
            Agendar Aula
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 lg:hidden"
          aria-label="Abrir menu"
        >
          <span
            className={`h-0.5 w-7 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-7 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-7 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-white/10 bg-ink/95 backdrop-blur-lg lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium uppercase tracking-wide text-white/80 hover:text-lime"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contato"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-lime px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-ink"
                >
                  Agendar Aula
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
