import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema"
import env from "@/lib/env";
const client = neon(env.url);
export const db = drizzle(client, { schema });