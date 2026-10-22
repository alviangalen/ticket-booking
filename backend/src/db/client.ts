import { PrismaClient } from "@prisma/client";

// Global cache for Prisma Client across Lambda warm container invocations
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// CRITICAL (AGENTS.md Rule 2): Instantiate outside Lambda handler scope
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
