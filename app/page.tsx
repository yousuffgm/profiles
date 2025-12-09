import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <div className="mt-10">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the Next.js Boilerplate
      </h1>

      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        This is a full-featured starter with NextAuth, Drizzle ORM, Neon
        PostgreSQL, TailwindCSS, and a clean folder structure.
      </p>

      {session ? (
        <a
          href="/dashboard"
          className="px-6 py-3 bg-black text-white rounded-lg text-lg"
        >
          Go to Dashboard →
        </a>
      ) : (
        <a
          href="/login"
          className="px-6 py-3 bg-black text-white rounded-lg text-lg"
        >
          Login to continue →
        </a>
      )}
    </div>
  );
}