export default function BillingSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg space-y-3 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-50 shadow-lg">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Billing</p>
        <h1 className="text-2xl font-semibold">Subscription activated</h1>
        <p className="text-slate-300">You can close this window and return to the dashboard.</p>
      </div>
    </main>
  );
}
