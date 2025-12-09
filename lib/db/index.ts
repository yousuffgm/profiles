import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema"

export const getDbClient = () => {
    const isProd = process.env.NODE_ENV === "production";
    const client = neon(isProd? process.env.PROD_DATABASE_URL!:process.env.DEV_DATABASE_URL!);
    return drizzle(client, { schema });
};
