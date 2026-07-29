import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

export default function FinalCta() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <Image
        src="/images/cta-bg.svg"
        alt="Quadra da Pro One Tennis Coach ao entardecer"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 py-24 text-center">
        <RevealOnScroll className="flex flex-col items-center gap-6">
          <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-lime">
            <span className="h-px w-8 bg-lime" />
            Sua evolução começa aqui
            <span className="h-px w-8 bg-lime" />
          </span>
          <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-wide text-white text-balance sm:text-6xl md:text-7xl">
            Bora treinar com a{" "}
            <span className="text-lime">Pro One</span>?
          </h2>
          <p className="max-w-xl text-lg text-white/70">
            Marque sua aula experimental gratuita e sinta na prática o que é
            treinar tênis com método e propósito.
          </p>
          <a
            href="#contato"
            className="mt-2 rounded-full bg-lime px-10 py-5 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:scale-105"
          >
            Agendar Aula Experimental
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}
