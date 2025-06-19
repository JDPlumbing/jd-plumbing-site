"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      redirect: false,
      username: formData.get("username"),
      password: formData.get("password")
    });

    if (res?.error) setError("Invalid credentials");
    else router.push("/admin");
  };

  return (
    <div className="max-w-sm mx-auto mt-24">
      <h1 className="text-2xl mb-6 text-center">Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" className="w-full p-2 bg-neutral-800 border border-gray-700 rounded" placeholder="Username" />
        <input name="password" type="password" className="w-full p-2 bg-neutral-800 border border-gray-700 rounded" placeholder="Password" />
        <button className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Sign In</button>
      </form>
    </div>
  );
}
