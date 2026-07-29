import RevealOnScroll from "./RevealOnScroll";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <RevealOnScroll
      className={`flex flex-col gap-4 ${isCenter ? "items-center text-center" : "items-start text-left"}`}
    >
      <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-lime">
        <span className="h-px w-8 bg-lime" />
        {kicker}
      </span>
      <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-wide text-white sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-xl text-base text-white/60 sm:text-lg ${isCenter ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </RevealOnScroll>
  );
}
