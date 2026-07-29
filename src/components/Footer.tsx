import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <a href="#top" className="flex items-center gap-2">
            <Image
              src="/images/logo-mark.svg"
              alt="Pro One Tennis Coach"
              width={32}
              height={32}
            />
            <span className="font-display text-lg tracking-wide text-white">
              PRO ONE <span className="text-lime">TENNIS COACH</span>
            </span>
          </a>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            <a href="#sobre" className="hover:text-lime">Sobre</a>
            <a href="#programas" className="hover:text-lime">Programas</a>
            <a href="#estrutura" className="hover:text-lime">Estrutura</a>
            <a href="#planos" className="hover:text-lime">Planos</a>
            <a href="#contato" className="hover:text-lime">Contato</a>
            <a
              href="https://instagram.com/proonetenniscoach"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lime"
            >
              Instagram
            </a>
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Pro One Tennis Coach. Todos os direitos reservados.</p>
          <p>Feito para quem joga para vencer.</p>
        </div>
      </div>
    </footer>
  );
}
