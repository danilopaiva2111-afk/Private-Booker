import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

const PROGRAMS = [
  {
    image: "/images/program-kids.svg",
    tag: "4 a 12 anos",
    title: "Tennis Kids",
    description:
      "Iniciação lúdica ao tênis, com foco em coordenação motora, fundamentos técnicos e amor pelo esporte desde cedo.",
  },
  {
    image: "/images/program-adults.svg",
    tag: "A partir de 13 anos",
    title: "Tênis Adulto",
    description:
      "Turmas por nível técnico, do iniciante ao avançado, com progressão estruturada de fundamentos, tática e jogo.",
  },
  {
    image: "/images/program-performance.svg",
    tag: "Competitivo",
    title: "Alta Performance",
    description:
      "Preparação física, técnica e mental para atletas que competem em torneios regionais e nacionais.",
  },
  {
    image: "/images/program-private.svg",
    tag: "Individual",
    title: "Aula Particular",
    description:
      "Treino 100% personalizado, com plano de desenvolvimento sob medida para seus objetivos em quadra.",
  },
];

export default function Programs() {
  return (
    <section id="programas" className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 lg:px-10">
        <SectionHeading
          kicker="Programas"
          title="Um caminho para cada fase do seu jogo"
          description="Da primeira raquetada à quadra de competição, a Pro One tem um programa estruturado para o seu momento."
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((program, index) => (
            <RevealOnScroll key={program.title} delay={index * 0.1}>
              <TiltCard className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-soft">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-soft via-ink-soft/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-lime px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
                    {program.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h3 className="font-display text-2xl uppercase tracking-wide text-white">
                    {program.title}
                  </h3>
                  <p className="text-sm text-white/60">
                    {program.description}
                  </p>
                </div>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
