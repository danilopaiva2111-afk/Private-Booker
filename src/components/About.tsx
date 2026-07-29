import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

const STATS = [
  { value: "+12", label: "Anos de experiência em quadra" },
  { value: "+300", label: "Alunos treinados" },
  { value: "4", label: "Quadras profissionais" },
  { value: "98%", label: "Satisfação dos alunos" },
];

export default function About() {
  return (
    <section id="sobre" className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div className="flex flex-col gap-10">
          <SectionHeading
            kicker="Sobre a academia"
            title="Onde técnica, disciplina e paixão pelo tênis se encontram"
            description="A Pro One Tennis Coach nasceu para formar jogadores completos — dentro e fora da quadra. Combinamos metodologia de alta performance, estrutura profissional e acompanhamento próximo para alunos de todas as idades e níveis, do primeiro contato com a raquete à competição."
          />

          <RevealOnScroll delay={0.15}>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 border-l-2 border-lime/40 pl-4"
                >
                  <span className="font-display text-4xl text-lime sm:text-5xl">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-white/50">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.1} className="relative">
          <TiltCard className="aspect-[4/5] w-full rounded-3xl border border-white/10">
            <Image
              src="/images/about-academy.svg"
              alt="Estrutura da academia Pro One Tennis Coach"
              fill
              className="object-cover"
            />
          </TiltCard>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/10 bg-ink-soft/90 px-6 py-4 backdrop-blur-md sm:block">
            <p className="font-display text-3xl text-lime">Est. 2014</p>
            <p className="text-xs uppercase tracking-wide text-white/60">
              Formando atletas de alto nível
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
