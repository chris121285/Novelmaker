# Novelmaker

Subscription-based visual novel maker scaffold built with Next.js 16 (App Router), Tailwind, Auth.js (NextAuth v5), Prisma, Postgres, and Stripe.

## Stack
- Next.js (TypeScript, App Router), Tailwind 4 base styles
- Auth.js: Google OAuth + email/password credentials
- Prisma ORM with Postgres
- Stripe subscriptions (checkout + webhook)

## Local setup
1) Install deps: `npm install`
2) Copy env: `cp .env.example .env` and fill values:
   - `DATABASE_URL` (Render Postgres or local)
   - `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
   - `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_APP_URL`
3) Generate Prisma client: `npx prisma generate`
4) Run migrations: `npx prisma migrate dev --name init`
5) Dev server: `npm run dev`

## Key paths
- Auth config & handler: `src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`
- Registration API: `src/app/api/auth/register/route.ts`
- Stripe checkout + webhook: `src/app/api/stripe/create-checkout-session/route.ts`, `src/app/api/stripe/webhook/route.ts`
- Prisma schema: `prisma/schema.prisma`
- UI: landing `src/app/page.tsx`, auth pages `src/app/login`, `src/app/register`, dashboard `src/app/dashboard`

## Deploy (Render)
- Provision Postgres and set `DATABASE_URL`.
- Add env vars from above.
- Expose Stripe webhook endpoint: `/api/stripe/webhook`.
- Set Stripe checkout success/cancel URLs: `/billing/success`, `/billing/cancel`.
