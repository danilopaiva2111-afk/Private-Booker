import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";

const TESTIMONIALS = [
  {
    avatar: "/images/avatar-1.svg",
    name: "Marina S.",
    role: "Aluna — Tênis Adulto",
    quote:
      "Em oito meses de Pro One evoluí mais do que em anos jogando por conta própria. O acompanhamento é muito próximo.",
  },
  {
    avatar: "/images/avatar-2.svg",
    name: "Rafael T.",
    role: "Pai de aluno — Tennis Kids",
    quote:
      "Meu filho criou uma rotina, disciplina e uma paixão real pelo esporte. A didática com as crianças é excelente.",
  },
  {
    avatar: "/images/avatar-3.svg",
    name: "Bruno C.",
    role: "Aluno — Alta Performance",
    quote:
      "Preparação física, tática e mental no mesmo lugar. Hoje compito com muito mais confiança em quadra.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-ink-soft py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 lg:px-10">
        <SectionHeading
          kicker="Depoimentos"
          title="Quem treina com a gente, sente a diferença"
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <RevealOnScroll key={testimonial.name} delay={index * 0.12}>
              <figure className="flex h-full flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-8">
                <span className="font-display text-5xl text-lime">“</span>
                <blockquote className="flex-1 text-base text-white/70">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={44}
                    height={44}
                    className="rounded-full border border-white/10"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-white/50">
                      {testimonial.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
