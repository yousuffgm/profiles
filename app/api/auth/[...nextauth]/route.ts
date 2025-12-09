import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getDbClient } from "@/lib/db";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
        if (user) token.user = user;
        return token;
        },
        async session({ session, token }) {
        session.user = token.user as {
            id: string;
            name: string | null;
            email: string;
            image: string | null;
        };
        return session;
        },
    },
    adapter: DrizzleAdapter(getDbClient()),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };