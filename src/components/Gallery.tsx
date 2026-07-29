import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";

const GALLERY = [
  "/images/gallery-1.svg",
  "/images/gallery-2.svg",
  "/images/gallery-3.svg",
  "/images/gallery-4.svg",
  "/images/gallery-5.svg",
  "/images/gallery-6.svg",
];

export default function Gallery() {
  return (
    <section id="galeria" className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 lg:px-10">
        <SectionHeading
          kicker="Galeria"
          title="Direto da quadra"
          description="Acompanhe o dia a dia da Pro One Tennis Coach no Instagram."
          align="center"
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {GALLERY.map((src, index) => (
            <RevealOnScroll key={src} delay={index * 0.06}>
              <a
                href="https://instagram.com/proonetenniscoach"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl border border-white/10"
              >
                <Image
                  src={src}
                  alt={`Publicação ${index + 1} do Instagram da Pro One Tennis Coach`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ink/0 text-lime opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-ink/60 group-hover:opacity-100 group-hover:backdrop-blur-sm">
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Ver no Instagram
                  </span>
                </div>
              </a>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="flex justify-center">
          <a
            href="https://instagram.com/proonetenniscoach"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/25 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-lime hover:text-lime"
          >
            Seguir @proonetenniscoach
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}
