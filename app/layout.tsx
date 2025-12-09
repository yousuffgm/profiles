import "./globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js Boilerplate",
  description: "Production-ready starter with Auth + Drizzle + Neon",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Top Navigation */}
        <header className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold">My App</h1>

          <nav className="flex items-center space-x-4">
            {session ? (
              <>
                <a href="/dashboard" className="text-gray-700 hover:text-black">
                  Dashboard
                </a>
                <form action="/api/auth/signout" method="post">
                  <button
                    className="px-4 py-2 bg-black text-white rounded-md text-sm"
                    type="submit"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <a
                href="/login"
                className="px-4 py-2 bg-black text-white rounded-md text-sm"
              >
                Login
              </a>
            )}
          </nav>
        </header>

        {/* Page Body */}
        <main className="p-6 max-w-5xl mx-auto">{children}</main>
      </body>
    </html>
  );
}