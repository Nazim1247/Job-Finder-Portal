"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="text-center mt-4">Loading...</p>;
  if (!session) return <p className="text-center mt-4">You are not logged in.</p>;

  const { name, email, image, role } = session.user;

  return (
    <div className="bg-color max-w-xl mx-auto p-6 my-6 rounded-xl shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={image || "/default-avatar.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-gray-400">{email}</p>
          <p className="text-sm text-green-600 dark:text-green-400 font-medium capitalize">{role || "user"}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Link href={'/edit-profile'} className="btn btn-primary w-full">✏️ Edit Profile</Link>
        <Link href={'/resume-builder'} className="btn btn-outline w-full">📄 Build Resume</Link>
      </div>
    </div>
  );
}
