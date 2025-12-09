import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export function getDbClient() {
  const url =
    process.env.DATABASE_URL ||
    process.env.PROD_DATABASE_URL ||
    process.env.DEV_DATABASE_URL;
    console.log("Database URL:", url);
  if (!url) {
    throw new Error("❌ DATABASE_URL is missing.");
  }

  // Create neon client lazily
  const sql = neon(url);

  // Return drizzle instance
  return drizzle(sql, { schema });
}