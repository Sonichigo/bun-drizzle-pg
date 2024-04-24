// import "dotenv/config";
// import { migrate } from "drizzle-orm/postgres-js/migrator";
// import postgres from "postgres";
// import { drizzle as LocalDrizzle } from "drizzle-orm/postgres-js";

// // Could not import from drizzle.ts due to mts v ts compatibility issues
// let db;
// const migrationClient = postgres(process.env.POSTGRES_URL as string, {
//     max: 1,
// });
// db = LocalDrizzle(migrationClient);
// await migrate(db, { migrationsFolder: "./db/migrations" });
// await migrationClient.end();