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

## IMPORTANTE: conteúdo de exemplo — revisar antes de publicar

Este site foi montado sem acesso ao conteúdo real de
`passoapasso.org.br` (o fetch automático foi bloqueado por proteção
anti-bot do site). A estrutura, o texto sobre equoterapia e a proposta de
funil de doação são reais e prontos para uso, mas **todo dado factual
específico sobre a organização é placeholder** e precisa ser substituído
por informação real antes de publicar. No site, esses trechos aparecem
com sublinhado tracejado (passe o mouse para ver a instrução).

Checklist do que trocar:

- [ ] CNPJ, razão social e endereço (aparecem no rodapé e no hero)
- [ ] Telefone, e-mail e link de WhatsApp (`.float-cta` e rodapé)
- [ ] Links reais de Instagram/Facebook
- [ ] Números de impacto (anos de atuação, crianças atendidas/ano,
      sessões realizadas, cavalos na equipe) — seção "ledger" logo
      abaixo do hero
- [ ] Ano de fundação (seção "Nossa missão")
- [ ] Critérios de encaminhamento / fila de espera (seção "Quem é
      atendido")
- [ ] Chave Pix real (seção "Doação única")
- [ ] Link real da plataforma de doação/assinatura recorrente (botões
      "Doar agora" e "Quero apadrinhar" hoje apontam para `#`)
- [ ] Link real do relatório de prestação de contas (seção "Instituto")
- [ ] Depoimentos reais, com autorização das famílias/parceiros citados
      (os atuais são exemplos ilustrativos, claramente marcados)
- [ ] Logos reais de patrocinadores, com autorização de uso de marca
- [ ] Lista atualizada de materiais aceitos em doação (ração, itens de
      manejo, materiais pedagógicos)
- [ ] Confirmar com contador/jurídico a resposta sobre dedutibilidade
      fiscal de doações e benefícios fiscais para empresas antes de
      publicar essa informação
- [ ] Fotos reais da instituição (hoje o visual usa apenas formas/ícones
      SVG e um efeito de partículas em canvas — não há fotografias)
- [ ] Conectar o formulário de newsletter a um serviço real (ex.:
      Mailchimp, Brevo, ou backend próprio) — hoje ele só mostra uma
      mensagem de confirmação, sem enviar nada

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
