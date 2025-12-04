 "use client";

import { useState } from "react";

type Props = {
  disabled?: boolean;
};

export function CheckoutButton({ disabled }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Unable to start checkout");
      setLoading(false);
      return;
    }

    const data = (await res.json()) as { url?: string };
    if (data.url) {
      window.location.href = data.url;
    } else {
      setError("No checkout URL returned");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={disabled || loading}
        onClick={handleCheckout}
        className="flex h-11 w-full items-center justify-center rounded-xl bg-amber-400 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting..." : "Upgrade to Pro"}
      </button>
      {error ? <p className="text-sm text-amber-200">{error}</p> : null}
    </div>
  );
}
