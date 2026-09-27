# CBM Clean — website institucional

Site de serviços de limpeza com três páginas públicas (início, serviços, contactos),
formulário de orçamento ligado a uma API REST e botão flutuante de WhatsApp.

```
cbm-clean/
├── web/      React 19 + TypeScript + Vite + Tailwind 4 + React Router + React Hook Form + Zod
├── server/   Node + Express + TypeScript + Prisma + PostgreSQL + Zod
└── docker-compose.yml
```

---

## 1. Antes de tudo: os dados da empresa

Tudo o que é específico da CBM Clean está reunido em poucos sítios. Procure os
comentários `EDITAR`:

| O quê | Onde |
| --- | --- |
| Nome, morada, NIF, email, cidade, horário, redes sociais | `web/src/data/company.ts` |
| Os três números de telemóvel e o do botão de WhatsApp | `web/src/data/company.ts` → `contactos` |
| Textos e lista de serviços | `web/src/data/services.ts` e `server/prisma/seed.ts` |
| Domínio, JSON-LD e meta tags iniciais | `web/index.html` |
| Sitemap e robots | `web/public/sitemap.xml`, `web/public/robots.txt` |
| Logótipo | `web/src/components/Logo.tsx` (SVG provisório com folhas e gota) |

A cidade usada nos textos de SEO local é a do ficheiro `company.ts` — muda-se num
sítio e propaga-se para títulos, descrições e dados estruturados.

---

## 2. Arranque rápido com Docker

```bash
cp server/.env.example server/.env      # ajuste as variáveis
docker compose up --build
```

- Site: <http://localhost:8080>
- API: <http://localhost:4000/api/health>
- PostgreSQL: `localhost:5432`

Na primeira vez, popule o catálogo de serviços:

```bash
docker compose exec api npx tsx prisma/seed.ts
```

---

## 3. Desenvolvimento local

### Base de dados

Só o PostgreSQL via Docker (o resto corre na máquina):

```bash
docker compose up -d db
```

### API

```bash
cd server
cp .env.example .env
npm install
npm run prisma:generate     # obrigatório antes do primeiro arranque
npm run prisma:migrate      # cria as tabelas
npm run seed                # insere os cinco serviços
npm run dev                 # http://localhost:4000
```

### Site

```bash
cd web
npm install
npm run dev                 # http://localhost:5173
```

Em desenvolvimento o Vite encaminha `/api` para o Express, por isso não é preciso
definir `VITE_API_URL`.

---

## 4. API REST

| Método | Rota | O que faz |
| --- | --- | --- |
| `GET` | `/api/health` | Estado do serviço e da base de dados |
| `GET` | `/api/services` | Lista os serviços ativos, por ordem |
| `GET` | `/api/services/:slug` | Detalhe de um serviço |
| `POST` | `/api/quotes` | Regista um pedido de orçamento e notifica por email |

O `POST /api/quotes` é validado pelo mesmo schema Zod que valida o formulário no
browser (`server/src/schemas/quote.schema.ts` e `web/src/lib/quoteSchema.ts`),
está limitado a 20 pedidos por IP em cada 15 minutos e tem um campo-armadilha
para submissões automáticas.

Exemplo:

```bash
curl -X POST http://localhost:4000/api/quotes \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Maria Santos",
    "email": "maria@exemplo.pt",
    "phone": "+351 900 000 000",
    "city": "Vila Real",
    "serviceSlug": "limpezas-pos-obra",
    "frequency": "PONTUAL",
    "message": "T3 depois de remodelação, com vidros e caixilharias.",
    "consent": true
  }'
```

---

## 5. Email

Se `MAIL_HOST` e `MAIL_TO` estiverem preenchidos, cada pedido gera uma
notificação com o endereço do cliente em `reply-to`. Se ficarem vazios, o pedido
é apenas gravado na base de dados e registado no log — o site continua a
funcionar. Uma falha de envio nunca devolve erro ao visitante, porque o pedido já
está guardado.

Para consultar os pedidos recebidos:

```bash
cd server && npm run prisma:studio
```

---

## 6. SEO local

- `title`, `description`, canonical e Open Graph atualizados por rota (`web/src/lib/seo.ts`)
- Dados estruturados `CleaningService`, `ItemList` e `ContactPage`
- Secção «Onde trabalhamos» na página inicial com as localidades de `company.ts`
- `sitemap.xml` e `robots.txt` em `web/public/`
- HTML em `pt-PT`, títulos hierárquicos e imagens/ícones com `aria-hidden`

Depois do site publicado: registe o domínio no Google Search Console, submeta o
sitemap e crie a ficha no Google Business Profile com a mesma morada e telefone
do site — é o que mais pesa nas pesquisas «empresa de limpeza em …».

---

## 7. Deploy

**Site (`web/`)** — build estático, serve em qualquer CDN:

```bash
npm run build      # gera web/dist
```

Em Vercel, Netlify ou Cloudflare Pages: comando `npm run build`, pasta `dist`, e
uma regra de *rewrite* de `/*` para `/index.html` (já incluída no `nginx.conf`
da imagem Docker). Defina `VITE_API_URL` com o endereço público da API.

**API (`server/`)** — Railway, Render, Fly.io ou um VPS com a imagem Docker:

1. `DATABASE_URL` a apontar para o PostgreSQL de produção
2. `CORS_ORIGIN` com o domínio do site (ex.: `https://www.cbmclean.pt`)
3. `npx prisma migrate deploy` no arranque (já no `command` do compose)
4. HTTPS à frente da aplicação — `trust proxy` está ativo

---

## 8. Notas técnicas

- **Fallback de conteúdo:** se a API estiver em baixo, o site mostra o catálogo
  local de `web/src/data/services.ts` em vez de uma página vazia.
- **Acessibilidade:** link de salto para o conteúdo, foco visível, `aria-label`
  nos controlos, contraste verificado e `prefers-reduced-motion` respeitado.
- **Segurança:** Helmet, CORS por lista de origens, corpo limitado a 100 kB,
  rate limiting no formulário e validação em ambos os lados.
