import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

const PLANS = [
  {
    name: "Iniciante",
    frequency: "2x por semana",
    price: "A combinar",
    highlight: false,
    features: [
      "Aulas em grupo",
      "Fundamentos técnicos",
      "Avaliação inicial de nível",
      "Acesso à quadra em horário de treino",
    ],
  },
  {
    name: "Performance",
    frequency: "3x por semana",
    price: "A combinar",
    highlight: true,
    features: [
      "Turmas reduzidas por nível",
      "Preparação física inclusa",
      "Análise de vídeo periódica",
      "Acompanhamento de evolução",
    ],
  },
  {
    name: "Particular",
    frequency: "Sob demanda",
    price: "A combinar",
    highlight: false,
    features: [
      "Aulas 100% individuais",
      "Plano de treino personalizado",
      "Flexibilidade de horários",
      "Foco total no seu objetivo",
    ],
  },
];

export default function Plans() {
  return (
    <section id="planos" className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 lg:px-10">
        <SectionHeading
          kicker="Planos"
          title="Escolha o plano ideal para o seu jogo"
          description="Valores e horários personalizados conforme o programa e a disponibilidade de quadra. Fale com a gente para montar o plano ideal."
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan, index) => (
            <RevealOnScroll key={plan.name} delay={index * 0.12}>
              <TiltCard
                className={`flex h-full flex-col gap-6 rounded-3xl border p-8 ${
                  plan.highlight
                    ? "border-lime bg-gradient-to-b from-lime/10 to-transparent"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.highlight && (
                  <span className="w-fit rounded-full bg-lime px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
                    Mais procurado
                  </span>
                )}
                <div>
                  <h3 className="font-display text-3xl uppercase tracking-wide text-white">
                    {plan.name}
                  </h3>
                  <p className="text-sm uppercase tracking-wide text-white/50">
                    {plan.frequency}
                  </p>
                </div>
                <p className="font-display text-2xl text-lime">
                  {plan.price}
                </p>
                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-white/70"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contato"
                  className={`mt-2 rounded-full px-6 py-3 text-center text-sm font-bold uppercase tracking-wide transition-transform hover:scale-105 ${
                    plan.highlight
                      ? "bg-lime text-ink"
                      : "border border-white/25 text-white hover:border-lime hover:text-lime"
                  }`}
                >
                  Quero esse plano
                </a>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
