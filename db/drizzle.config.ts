import type { Config } from "drizzle-kit";

export default{
    schema: "./schemas/schema.model.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
      },
} satisfies Config