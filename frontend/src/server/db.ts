import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "~/env";
import { PrismaClient } from "generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ||
  (() => {
    const pool = new Pool({
      connectionString: env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);

    const client = new PrismaClient({
      adapter,
      log:
        env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    });

    if (env.NODE_ENV !== "production") {
      globalForPrisma.prisma = client;
    }

    return client;
  })();
