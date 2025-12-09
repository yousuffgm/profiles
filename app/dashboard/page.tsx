import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession();

  const user = session?.user;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Welcome back!</h2>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-lg">You are logged in as:</p>

        <div className="mt-3">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>
    </div>
  );
}