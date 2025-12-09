import { getServerSession } from "next-auth";
import Link from "next/link";


export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();

  if (!session) {
    // Redirect to login page if not authenticated
    return (
      <div className="flex items-center justify-center h-screen text-xl">
            You are not logged in.<a href="/login" className="ml-2 text-blue-500 underline">Login</a>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-2">
            Hello, {user?.name || "User"} 👋
          </p>
        </div>

        <nav className="space-y-4">
          <Link href="/dashboard" className="block text-gray-700 hover:text-black">Home</Link>
          <Link href="/dashboard/profile" className="block text-gray-700 hover:text-black">Profile</Link>
          <Link href="/dashboard/settings" className="block text-gray-700 hover:text-black">Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}