import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

const FACILITIES = [
  {
    image: "/images/facility-1.svg",
    title: "Quadras profissionais",
    description: "Piso rápido e saibro, com iluminação para treinos noturnos.",
  },
  {
    image: "/images/facility-2.svg",
    title: "Quadra de treinamento",
    description: "Espaço dedicado a análise de vídeo e correção técnica.",
  },
  {
    image: "/images/facility-3.svg",
    title: "Preparação física",
    description: "Área de fitness e funcional para performance em quadra.",
  },
];

export default function Facilities() {
  return (
    <section id="estrutura" className="relative bg-ink-soft py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 lg:px-10">
        <SectionHeading
          kicker="Estrutura"
          title="Ambiente profissional para treinar sério"
          description="Infraestrutura pensada para o desempenho: quadras, equipamentos e tecnologia para acompanhar cada detalhe da sua evolução."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {FACILITIES.map((facility, index) => (
            <RevealOnScroll key={facility.title} delay={index * 0.12}>
              <TiltCard className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink via-ink/20 to-transparent p-6">
                  <h3 className="font-display text-xl uppercase tracking-wide text-white">
                    {facility.title}
                  </h3>
                  <p className="text-sm text-white/60">
                    {facility.description}
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
