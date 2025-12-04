import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { CheckoutButton } from "@/components/checkout-button";
import { redirect } from "next/navigation";

const statusCopy: Record<string, string> = {
  ACTIVE: "You have full access to the editor and publishing pipeline.",
  TRIAL: "Trial is live — publish privately while you set up billing.",
  PAST_DUE: "Payment failed. Update your method to keep access.",
  CANCELED: "Canceled at period end. Reactivate anytime.",
  INACTIVE: "No subscription yet. Upgrade to unlock publishing.",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { subscriptions: true, projects: true },
  });

  const latestSubscription = user?.subscriptions[0];
  const subscriptionStatus = latestSubscription?.status ?? session.user.subscriptionStatus ?? "INACTIVE";
  const subscriptionPlan = latestSubscription?.plan ?? session.user.subscriptionPlan ?? "FREE";

  return (
    <main className="min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Dashboard</p>
              <h1 className="text-3xl font-semibold text-white">Welcome, {user?.name ?? "creator"}</h1>
              <p className="text-slate-300">{statusCopy[subscriptionStatus] ?? ""}</p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-100">
              Plan: {subscriptionPlan}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Subscription</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{subscriptionStatus}</h3>
              <p className="mt-1 text-sm text-slate-300">
                {latestSubscription?.stripePriceId ? "Linked to Stripe" : "Ready to activate via Stripe checkout."}
              </p>
              <div className="mt-4">
                <CheckoutButton disabled={subscriptionStatus === "ACTIVE" || subscriptionStatus === "TRIAL"} />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Projects</p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                {user?.projects.length ?? 0} visual novels started
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                Project table is ready for scenes, choices, and assets. Add editor views next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
