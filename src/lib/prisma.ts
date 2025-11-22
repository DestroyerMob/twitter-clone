// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client"; // or from your generated path if you've customized output
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"; // 👈 note: Sqlite, not SQLite

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Optional: make TS happy if it complains about string | undefined
const dbUrl = process.env.DATABASE_URL;

const adapter = new PrismaBetterSqlite3({
  url: dbUrl, // e.g. "file:./dev.db" from your .env
});

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}