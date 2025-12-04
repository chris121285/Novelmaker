import Link from "next/link";
import { RegisterForm } from "@/components/auth-forms";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen">
      <RegisterForm />
      <div className="absolute inset-x-0 top-6 flex justify-center text-sm text-slate-300">
        <p className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
          Already have an account?
          <Link href="/login" className="text-amber-200 hover:text-amber-100">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
