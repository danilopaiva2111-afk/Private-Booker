const WORDS = [
  "AULA EXPERIMENTAL GRATUITA",
  "TENNIS KIDS",
  "ALTA PERFORMANCE",
  "AULA PARTICULAR",
];

export default function MarqueeCta() {
  const line = [...WORDS, ...WORDS];

  return (
    <div className="relative overflow-hidden border-y border-lime/20 bg-lime py-4">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {[...line, ...line].map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="flex items-center gap-10 font-display text-2xl uppercase tracking-wide text-ink sm:text-3xl"
          >
            {word}
            <span className="text-ink/40">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
