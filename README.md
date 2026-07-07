## Lounge Private Itaú — Sistema de Reservas

Aplicação Next.js (App Router) + Prisma/Postgres (Supabase) para gerenciar as
reservas do Lounge Private do Itaú, com controle de capacidade simultânea,
agenda horizontal e dashboard com heatmap de ocupação.

### Regras de capacidade

- Capacidade simultânea máxima: **44 pessoas**.
- Margem de segurança: **37 pessoas**. Reservas que levem a ocupação
  simultânea para mais de 37 (e até 44) exigem confirmação explícita do
  usuário ("Ao inserir essa reserva você estará acima da margem de segurança
  do lounge, deseja continuar?").
- Reservas que levariam a ocupação simultânea acima de 44 são **bloqueadas**
  e não podem ser criadas.
- A verificação considera a sobreposição real de horários (entrada/saída) de
  todas as reservas do mesmo dia, em janelas de 15 minutos.

### Funcionalidades

- Cadastro de reserva: nome, e-mail, telefone, data, quantidade de pessoas,
  horário de entrada e horário de saída.
- Agenda horizontal por dia (com filtro de data), mostrando as reservas como
  blocos ao longo das horas e o total de pessoas simultâneas por hora.
- Dashboard com heatmap de ocupação média por hora x dia da semana.
- Cancelamento de reservas diretamente pela agenda.

### Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Prisma 7 + Postgres/Supabase (via `@prisma/adapter-pg`)
- Zod para validação de entrada

### Variáveis de ambiente

Copie `.env.example` para `.env` e preencha com as connection strings do seu
projeto Supabase (**Project Settings → Database → Connection string**):

- `DATABASE_URL` — conexão via pooler (porta 6543, `?pgbouncer=true`), usada
  pela aplicação em runtime.
- `DIRECT_URL` — conexão direta (porta 5432), usada apenas pelo Prisma CLI
  para rodar migrations.

### Rodando localmente

```bash
npm install
cp .env.example .env
npx prisma migrate deploy   # aplica as migrations versionadas no Supabase
npm run dev
```

Acesse `http://localhost:3000` para a agenda e `http://localhost:3000/dashboard`
para o dashboard.

### Deploy no Netlify

O repositório já inclui `netlify.toml` com o plugin `@netlify/plugin-nextjs`
(instalado como devDependency), que trata as rotas de API como funções
serverless. O build command já roda `npx prisma migrate deploy` antes do
`next build`, então as migrations são aplicadas automaticamente a cada deploy.

1. No Netlify, **Add new site → Import an existing project** e aponte para
   este repositório/branch.
2. Build command e publish directory já vêm do `netlify.toml` — não precisa
   alterar.
3. Em **Site settings → Environment variables**, adicione `DATABASE_URL` e
   `DIRECT_URL` com os valores do Supabase (os mesmos do `.env`).
4. Dispare o deploy — o próprio build do Netlify roda a migration contra o
   `DIRECT_URL` antes de compilar o app.

### Estrutura relevante

- `prisma/schema.prisma` — modelo `Reservation`.
- `src/lib/occupancy.ts` — cálculo de ocupação simultânea e regras de
  capacidade/margem de segurança.
- `src/lib/heatmap.ts` — agregação de ocupação por hora x dia da semana.
- `src/app/api/reservations` — criação/listagem/remoção de reservas.
- `src/app/api/occupancy` — ocupação por hora para um dia específico.
- `src/app/api/heatmap` — dados agregados para o dashboard.
- `src/components/BookingPage.tsx` — página principal (formulário + agenda).
- `src/components/HorizontalAgenda.tsx` — agenda horizontal.
- `src/components/Heatmap.tsx` — heatmap do dashboard.
