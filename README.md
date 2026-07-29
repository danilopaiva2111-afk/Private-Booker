# Pro One Tennis Coach

Landing page esportiva e cinematográfica para a academia **Pro One Tennis Coach** (Instagram [@proonetenniscoach](https://instagram.com/proonetenniscoach)), construída em Next.js + React Three Fiber.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** para estilos
- **Framer Motion** para animações e parallax no scroll
- **React Three Fiber / drei / three.js** para a bola de tênis 3D do hero
- Cards com efeito de tilt 3D via CSS transform (`TiltCard`)

## Imagens: como trocar pelos conteúdos reais

Todas as imagens de `public/images/*.svg` são **placeholders gerados**, com o texto indicando o que cada uma representa (ex: "FOTO — QUADRA PRINCIPAL"). Para usar as fotos reais do Instagram/academia:

1. Salve as fotos reais em `public/images/` com o **mesmo nome de arquivo** (ex: substitua `hero-court.svg` por um `hero-court.jpg`).
2. Se trocar a extensão (svg → jpg/png/webp), atualize a referência correspondente no componente que a usa (busque pelo nome do arquivo em `src/components/`).
3. A logo fica em `public/images/logo.svg` (horizontal) e `public/images/logo-mark.svg` (ícone, usado no navbar/footer). Troque pela arte oficial da Pro One quando disponível.

Lista de imagens usadas e onde:

| Arquivo | Seção |
| --- | --- |
| `hero-court.svg` | Fundo do Hero |
| `about-academy.svg` | Seção Sobre |
| `coach-portrait.svg`, `coach-action.svg` | Seção Coach |
| `program-*.svg` | Cards de Programas |
| `facility-*.svg` | Seção Estrutura |
| `gallery-1..6.svg` | Galeria (Instagram) |
| `avatar-1..3.svg` | Depoimentos |
| `cta-bg.svg` | Banner final de CTA |

## Conteúdo para revisar/editar

O texto foi escrito como um ponto de partida profissional e precisa ser revisado com informações reais da academia:

- **Contato** (`src/components/Contact.tsx`): endereço, telefone/WhatsApp (`WHATSAPP_NUMBER`), e-mail e horário estão com valores de exemplo.
- **Planos e preços** (`src/components/Plans.tsx`): valores estão como "A combinar" — defina os preços reais.
- **Sobre / estatísticas** (`src/components/About.tsx`): ano de fundação e números são ilustrativos.
- **Coach** (`src/components/Coach.tsx`): credenciais são genéricas, ajuste para o currículo real do treinador.
- **Depoimentos** (`src/components/Testimonials.tsx`): nomes e falas são fictícios.

## Build de produção

```bash
npm run build
npm run start
```
