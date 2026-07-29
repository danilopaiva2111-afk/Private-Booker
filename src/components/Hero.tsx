"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";

const TennisBallScene = dynamic(() => import("./TennisBallScene"), {
  ssr: false,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-ink"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <Image
          src="/images/hero-court.svg"
          alt="Quadra de tênis da Pro One Tennis Coach"
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent" />
      </motion.div>

      <div className="absolute inset-0 -z-0 opacity-90">
        <TennisBallScene />
      </div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pt-28 lg:px-10"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-lime"
        >
          <span className="h-px w-10 bg-lime" />
          Academia de Alta Performance
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="max-w-4xl font-display text-6xl uppercase leading-[0.88] tracking-wide text-white text-balance sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Pro One <br />
          <span className="text-lime">Tennis Coach</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="max-w-xl text-lg text-white/70 sm:text-xl"
        >
          Treinamento técnico, físico e mental para quem quer evoluir de
          verdade dentro da quadra — de aulas para iniciantes à preparação
          competitiva de alta performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <a
            href="#contato"
            className="group relative overflow-hidden rounded-full bg-lime px-8 py-4 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:scale-105"
          >
            Agende sua Aula Experimental
          </a>
          <a
            href="#programas"
            className="rounded-full border border-white/25 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-lime hover:text-lime"
          >
            Conheça os Programas
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
          Role para explorar
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-lime to-transparent" />
      </motion.div>
    </section>
  );
}
