import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession();
  const user = session?.user;

  return (
    <div>
      <h1 className="text-2xl font-semibold">Your Profile</h1>

      <div className="mt-6 bg-white p-6 rounded-xl shadow max-w-lg">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        {user?.image && (
          <img
            src={user.image}
            className="w-24 h-24 rounded-full mt-4"
            alt="Profile"
          />
        )}
      </div>
    </div>
  );
}