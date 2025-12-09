import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { getDbClient } from "@/lib/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { compare } from "bcryptjs";
import type { User } from "next-auth";

// -----------------------------
// Types
// -----------------------------
type LoginCredentials = {
  email: string;
  password: string;
};

// -----------------------------
// Providers Configuration
// -----------------------------
export const providers = [
  // Google OAuth
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),


  
  // Credentials Login
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },

    async authorize(credentials): Promise<User | null> {
      if (!credentials) return null;

      const { email, password } = credentials as LoginCredentials;

      // 1️⃣ Find user by email
      const user = await getDbClient().query.users.findFirst({
        where: (u) => eq(u.email, email),
      });

      if (!user) return null;

      // 2️⃣ Check password hash
      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) return null;

      // 3️⃣ Return user (NextAuth will include it in JWT)
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image ?? null,
      };
    },
  }),
];