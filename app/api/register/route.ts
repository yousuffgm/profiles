import { getDbClient } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();

  const hashed = await bcrypt.hash(body.password, 10);

  const userExists = await getDbClient()
    .select()
    .from(users)
    .where(eq(users.email, body.email));

  if (userExists.length > 0) {
    return new Response(JSON.stringify({ error: "User exists" }), {
      status: 400
    });
  }

  await getDbClient().insert(users).values({
    id: crypto.randomUUID(),
    email: body.email,
    password: hashed,
    name: body.name
  });

  return new Response(JSON.stringify({ success: true }));
}