import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/prisma";

const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = registerSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { email, name, password } = parsed.data;

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const passwordHash = await hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        name,
        passwordHash,
        subscriptions: {
          create: {
            status: "INACTIVE",
            plan: "FREE",
          },
        },
      },
      select: { id: true, email: true, name: true },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Register error", error);
    return NextResponse.json({ error: "Unable to register" }, { status: 500 });
  }
}
