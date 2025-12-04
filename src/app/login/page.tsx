import Link from "next/link";
import { LoginForm } from "@/components/auth-forms";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen">
      <LoginForm />
      <div className="absolute inset-x-0 top-6 flex justify-center text-sm text-slate-300">
        <p className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
          New here?
          <Link href="/register" className="text-amber-200 hover:text-amber-100">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
