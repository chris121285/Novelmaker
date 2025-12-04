import Link from "next/link";

const featureRows = [
  {
    title: "Branching stories in minutes",
    body: "Visual editor with scene templates, audio layers, and smart defaults so you ship episodes weekly.",
  },
  {
    title: "Subscriptions baked in",
    body: "Stripe-powered plans, customer portal, and webhooks keep player access and revenue in sync.",
  },
  {
    title: "Team-friendly auth",
    body: "Google SSO for collaborators plus email/password for players — all unified in a single identity layer.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-14 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl shadow-2xl shadow-amber-500/10 sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-amber-300">
            <span className="rounded-full border border-amber-200/30 px-3 py-1">Vivid Forge</span>
            <span className="text-white/60">Visual novel SaaS toolkit</span>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl">
                Build, gate, and grow your visual novels — no backend hassle.
              </h1>
              <p className="text-lg text-slate-300 sm:text-xl">
                A subscription-ready creation suite with Google SSO, email login, and Stripe billing out of the box.
                Craft branching paths, publish to the web, and keep revenue aligned to player access.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="rounded-full bg-amber-400 px-6 py-3 text-base font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-300"
                >
                  Start free — email
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-white/20 px-6 py-3 text-base font-medium text-slate-50 transition hover:-translate-y-0.5 hover:border-white/40"
                >
                  Continue with Google
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-full bg-white/10 px-6 py-3 text-base font-medium text-amber-100 transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  View dashboard
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl">
              <div className="absolute right-6 top-6 h-10 w-10 rounded-full bg-amber-300/20 blur-2xl" />
              <div className="absolute bottom-6 left-10 h-16 w-16 rounded-full bg-sky-400/10 blur-3xl" />
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-slate-200/80">
                  <span>Storyboard</span>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-200">Live</span>
                </div>
                <div className="grid gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-amber-200">
                      <span>Episode 1</span>
                      <span className="text-xs text-slate-300">Pro tier</span>
                    </div>
                    <p className="mt-2 text-slate-300">Branching: intro → choice → reveal → cliffhanger</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-sky-200">
                      <span>Episode 2</span>
                      <span className="text-xs text-slate-300">Beta</span>
                    </div>
                    <p className="mt-2 text-slate-300">New route unlocked by subscription webhook.</p>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-emerald-100">
                    <span>Stripe connected</span>
                    <span className="text-xs uppercase tracking-widest">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {featureRows.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-amber-500/5"
            >
              <div className="h-10 w-10 rounded-xl bg-amber-400/20 text-amber-100 ring-1 ring-amber-300/30" />
              <h3 className="text-lg font-semibold text-slate-50">{feature.title}</h3>
              <p className="text-sm leading-6 text-slate-300">{feature.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-200">How it works</p>
              <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">Auth, billing, editor — wired up.</h2>
              <p className="text-slate-300">
                Deploy to Render, connect Google and Stripe, and you have a functioning subscription system before you
                design your first character.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-slate-50 transition hover:-translate-y-0.5 hover:border-white/40"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-amber-400 px-5 py-3 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                Create account
              </Link>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Google + email auth", body: "NextAuth wired for Google SSO and password accounts." },
              { title: "Prisma + Postgres", body: "Ready for Render managed Postgres with migrations." },
              { title: "Stripe subscriptions", body: "Checkout session endpoint and webhook to sync access." },
              { title: "VN projects", body: "Project table to store story graphs and assets." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h4 className="text-sm font-semibold text-slate-50">{item.title}</h4>
                <p className="mt-2 text-xs text-slate-300">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
