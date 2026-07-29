import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

const CREDENTIALS = [
  "Certificação internacional de treinamento de tênis",
  "Ex-atleta profissional de circuito nacional",
  "Especialista em biomecânica de saque e preparação física",
  "+12 anos formando atletas competitivos",
];

export default function Coach() {
  return (
    <section id="coach" className="relative bg-ink-soft py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <RevealOnScroll className="relative mx-auto w-full max-w-sm lg:mx-0">
          <TiltCard className="aspect-[3/4] w-full rounded-3xl border border-white/10">
            <Image
              src="/images/coach-portrait.svg"
              alt="Retrato do head coach da Pro One Tennis Coach"
              fill
              className="object-cover"
            />
          </TiltCard>
          <div className="absolute -right-4 -top-4 flex h-20 w-20 rotate-6 items-center justify-center rounded-full bg-lime text-center font-display text-xs uppercase leading-tight text-ink shadow-xl">
            Head
            <br />
            Coach
          </div>
        </RevealOnScroll>

        <div className="flex flex-col gap-8">
          <SectionHeading
            kicker="Quem comanda o treino"
            title="Um coach, um método, um objetivo: sua evolução"
          />

          <RevealOnScroll delay={0.15} className="flex flex-col gap-6">
            <p className="max-w-xl text-base text-white/60 sm:text-lg">
              À frente da Pro One está um treinador dedicado a transformar
              técnica em resultado. Cada aluno recebe um plano de treino
              individualizado, com acompanhamento de evolução, correção
              biomecânica e preparação mental para competir com confiança.
            </p>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CREDENTIALS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={0.25}>
            <TiltCard className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/coach-action.svg"
                alt="Coach da Pro One Tennis Coach em treino de quadra"
                fill
                className="object-cover"
              />
            </TiltCard>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
