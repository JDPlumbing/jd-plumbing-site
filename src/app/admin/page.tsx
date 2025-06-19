import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <div className="max-w-3xl mx-auto mt-24 text-center">
      <h1 className="text-3xl font-bold">Welcome, {session.user?.name}</h1>
      <p className="text-gray-400 mt-4">This is your admin control center.</p>
    </div>
  );
}
