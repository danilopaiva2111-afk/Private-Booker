# Instituto Passo a Passo — Landing Page de Doações e Patrocínio

Site estático (HTML/CSS/JS puros, sem build, sem dependências externas)
voltado para captação de doações individuais e patrocínio corporativo para
o Instituto Passo a Passo (equoterapia). Vive em `ong-site/`, separado do
app de reservas do Lounge Itaú que ocupa o restante deste repositório —
os dois projetos não compartilham código nem build.

## Como visualizar

Basta abrir o arquivo no navegador:

```bash
open ong-site/index.html      # macOS
xdg-open ong-site/index.html  # Linux
```

Ou suba um servidor local simples:

```bash
npx serve ong-site
```

## Como publicar

Por não depender do Next.js nem de build, pode ser hospedado como site
estático em qualquer plataforma (Netlify, Vercel, GitHub Pages, Cloudflare
Pages) apontando para a pasta `ong-site/`, publicando `index.html`
diretamente — sem relação com o `netlify.toml` da raiz, que é do app de
reservas.

## Conteúdo: o que já é real e o que ainda é placeholder

O fetch automático de `passoapasso.org.br` foi bloqueado (proteção
anti-bot), então o conteúdo real foi obtido a partir de screenshots do
site atual enviados pelo usuário. Isso permitiu usar dados verdadeiros
em boa parte do site — mas nem tudo foi capturado nas imagens
disponíveis. No HTML, o que ainda é placeholder aparece com sublinhado
tracejado (passe o mouse para ver a instrução de substituição).

**Já é conteúdo real** (extraído do site atual):
- Missão, propósito e valores ("Quem somos", seção "Nossa missão")
- Definição, história e reconhecimento institucional da equoterapia
  (citação de Claudia Mota 2014, Hipócrates, ANDE-Brasil, CFM, COFFITO)
- Público atendido (2 a 21 anos) e os 5 programas (Hipoterapia, Educação
  e Reeducação, Pré-esportivo, Esporte Educacional Equestre, PAEDA)
- Carta de valores do voluntariado e as 3 modalidades (Permanente,
  Eventual, A distância)
- Endereço e telefone (Itatiba/SP) e filiação à ANDE-Brasil
- Nomenclatura dos níveis de patrocínio (Trote e Galope) e parceiros
  atuais confirmados (AZ Armaturen, L. Corrêa Materiais para
  Construção, O Boticário)
- Enquadramento "Pessoa Física" / "Pessoa Jurídica" para as formas de
  contribuição, como no site atual
- Fundação (27/07/2005), história de origem (Claudia da Costa Mota,
  Haras da Orla) e visão ("ser referência nacional...") — seção "Nossa
  história", dentro de "Instituto"
- Diretoria estatutária (Claudia da Costa Mota, Vera Brick, Marcos
  Lucena de Souza, Afonso Bruno Filho, Márcia Regina Gama) — seção
  "Quem lidera o Instituto"
- Reconhecimentos oficiais: Utilidade Pública Municipal (Lei nº
  4272/2010), participação no CMDCA/CONDEFI/CMAS de Itatiba, menções da
  Câmara Municipal de Louveira/Itatiba e da Revista Resource Alliance &
  Filantropia — seção "Reconhecimento"
- Depoimento real de um aluno (Gustavo) do curso "XIV Gestão para
  Centros de Equoterapia", da Escola de Equo&Terapias do Instituto
  (subdomínio `eos.passoapasso.org.br`) — citado como prova social da
  "formação" mencionada na visão, logo abaixo de "Nossa visão"

**Ainda é placeholder** — checklist do que falta trocar:

- [ ] CNPJ e razão social (rodapé e hero) — não capturado nas imagens
- [ ] E-mail oficial e link de WhatsApp (`.float-cta` e rodapé)
- [ ] Links reais de Instagram/Facebook
- [ ] Números de impacto (anos de atuação, crianças atendidas/ano,
      sessões realizadas, cavalos na equipe) — seção "ledger" logo
      abaixo do hero
- [ ] Chave Pix real (seção "Doação única")
- [ ] Link real da plataforma de doação/assinatura recorrente (botões
      "Doar agora" e "Quero apadrinhar" hoje apontam para `#`)
- [ ] Link real do relatório de prestação de contas (seção "Instituto")
- [ ] Depoimentos reais, com autorização das famílias/parceiros citados
      (os atuais são exemplos ilustrativos, claramente marcados)
- [ ] Logos reais dos parceiros (hoje aparecem só como texto — os nomes
      são reais, mas faltam as imagens/artes, com autorização de uso)
- [ ] Confirmar lista vigente de parceiros Trote/Galope com o Instituto
- [ ] Confirmar com contador/jurídico a resposta sobre dedutibilidade
      fiscal de doações e benefícios fiscais para empresas antes de
      publicar essa informação
- [ ] Fotos reais da instituição e da diretoria (hoje o visual usa
      apenas formas/ícones SVG e um efeito de partículas em canvas — o
      site original tem fotos reais de sessões de equoterapia e da
      equipe que valeria reaproveitar; não usamos as fotos de rosto da
      diretoria vistas nos prints por não termos os arquivos originais
      nem autorização explícita de uso)
- [ ] Conectar o formulário de newsletter a um serviço real (ex.:
      Mailchimp, Brevo, ou backend próprio) — hoje ele só mostra uma
      mensagem de confirmação, sem enviar nada

Não foram replicadas as seções "Escola" e "Unidades de Negócios" do
menu original — nenhuma screenshot cobriu o conteúdo dessas páginas, e
preencher com dados inventados seria pior do que simplesmente omitir.

## Decisões de design

- Paleta e tipografia (serifada para títulos, humanista para texto,
  monoespaçada para números de impacto e rótulos) inspiradas no
  picadeiro ao amanhecer e no conceito de progresso gradual do próprio
  nome "Passo a Passo" — evitando o visual genérico de "site de ONG"
  (creme + serifa + terracota).
- A trilha vertical à esquerda (visível em telas largas) funciona como
  indicador de progresso de leitura, reforçando a ideia de "um passo de
  cada vez".
- Botões de valor de doação, cópia de chave Pix e formulário de
  newsletter são funcionais no front-end, mas não estão conectados a
  nenhum gateway de pagamento ou serviço de e-mail real — isso precisa
  ser integrado antes de publicar.
