import { PrismaClient } from "@prisma/client";

// Re-use the Prisma client in dev to avoid exhausting database connections.
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = db;
}
