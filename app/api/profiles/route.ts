import { getServerSession } from "next-auth";
import { getDbClient } from "@/lib/db";
import { profiles } from "@/lib/db/schema";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;       // add id
      name: string | null;
      email: string | null;
      image: string | null;
    };
  }
}


export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 403 });

  const data = await req.json();

  await getDbClient()
    .insert(profiles)
    .values({
        userId: session.user.id,
        about: data.about,
        jobTitle: data.jobTitle,
        skills: JSON.stringify(data.skills),
        profileImage: data.image,
        isPublic: data.isPublic,
    })
    .onConflictDoUpdate({
        target: profiles.userId,
        set: {
            about: data.about,
            jobTitle: data.jobTitle,
            skills: JSON.stringify(data.skills),
            profileImage: data.image,
            isPublic: data.isPublic,
        },
    });

  return Response.json({ success: true });
}