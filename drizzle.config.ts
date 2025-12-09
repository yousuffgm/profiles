import { defineConfig } from "drizzle-kit";
const isProd = process.env.NODE_ENV === "production";
export default defineConfig({
  dialect: "postgresql",
  schema: "lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: isProd? process.env.PROD_DATABASE_URL!:process.env.DEV_DATABASE_URL!,
  },
});