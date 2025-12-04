declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      subscriptionPlan?: string;
      subscriptionStatus?: string;
      stripeCustomerId?: string | null;
    };
  }

  interface User {
    role?: string;
    subscriptionPlan?: string;
    subscriptionStatus?: string;
    stripeCustomerId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    plan?: string;
    subscriptionStatus?: string;
    stripeCustomerId?: string | null;
  }
}
