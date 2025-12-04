"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";

function GoogleButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-medium text-slate-50 transition hover:border-white/30 hover:bg-white/10"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4">
        <path
          fill="#FFC107"
          d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.4 1.2 8.7 3.3l5.7-5.7C34.6 3.4 29.6 1 24 1 11.8 1 2 10.8 2 23s9.8 22 22 22 22-9.8 22-22c0-1.1-.1-2.1-.4-3.1z"
        />
        <path
          fill="#FF3D00"
          d="M6.3 14.7l6.6 4.8C14.3 16.4 18.8 13 24 13c3.3 0 6.4 1.2 8.7 3.3l5.7-5.7C34.6 3.4 29.6 1 24 1 15.5 1 8.2 6.1 6.3 14.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 45c5.2 0 10.2-2 13.9-5.4l-6.4-5.4C29.3 35 26.8 36 24 36c-5.2 0-9.6-3.4-11.2-8l-6.5 5.1C8.2 41.9 15.5 45 24 45z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.6 5.8-6.7 7.1l6.4 5.4C38.2 39.3 41 33.7 41 27c0-1.1-.1-2.1-.4-3.1z"
        />
      </svg>
      Continue with Google
    </button>
  );
}

function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 px-6 py-10">
      <div className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Vivid Forge</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
        <p className="text-slate-300">{subtitle}</p>
      </div>
      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
        {children}
      </div>
    </div>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (formData: FormData) => {
    setError(null);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }
      router.replace("/dashboard");
    });
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue building your story worlds.">
      <GoogleButton />
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
        <span className="h-px flex-1 bg-white/10" />
        <span>Password</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <form action={onSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-slate-200">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-50 outline-none ring-amber-300/60 focus:border-amber-300/50 focus:ring-2"
            placeholder="creator@studio.com"
          />
        </div>
        <div>
          <label className="text-sm text-slate-200">Password</label>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-50 outline-none ring-amber-300/60 focus:border-amber-300/50 focus:ring-2"
            placeholder="••••••••"
          />
        </div>
        {error ? <p className="text-sm text-amber-200">{error}</p> : null}
        <button
          type="submit"
          disabled={isPending}
          className="flex h-11 w-full items-center justify-center rounded-xl bg-amber-400 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (formData: FormData) => {
    setError(null);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Registration failed");
        return;
      }

      await signIn("credentials", { redirect: false, email, password });
      router.replace("/dashboard");
    });
  };

  return (
    <AuthShell
      title="Create your studio account"
      subtitle="Email + password with immediate Stripe-ready profile."
    >
      <GoogleButton />
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
        <span className="h-px flex-1 bg-white/10" />
        <span>or</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <form action={onSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-slate-200">Name</label>
          <input
            name="name"
            type="text"
            required
            minLength={2}
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-50 outline-none ring-amber-300/60 focus:border-amber-300/50 focus:ring-2"
            placeholder="Studio name"
          />
        </div>
        <div>
          <label className="text-sm text-slate-200">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-50 outline-none ring-amber-300/60 focus:border-amber-300/50 focus:ring-2"
            placeholder="creator@studio.com"
          />
        </div>
        <div>
          <label className="text-sm text-slate-200">Password</label>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-50 outline-none ring-amber-300/60 focus:border-amber-300/50 focus:ring-2"
            placeholder="At least 8 characters"
          />
        </div>
        {error ? <p className="text-sm text-amber-200">{error}</p> : null}
        <button
          type="submit"
          disabled={isPending}
          className="flex h-11 w-full items-center justify-center rounded-xl bg-amber-400 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}
