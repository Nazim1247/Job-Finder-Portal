"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session)

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [session, status]);

  if (status === "loading") return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <ul className="space-y-4">
        <li><Link href="/postJobs" className="text-blue-600">➕ Post New Job</Link></li>
        <li><Link href="/findJobs" className="text-blue-600">➕ All Posted Jobs</Link></li>
        <li><Link href="/my-posted-jobs" className="text-blue-600">📋 Manage Jobs</Link></li>
        <li><Link href="/all-applications" className="text-blue-600">👥 View Applicants</Link></li>
      </ul>
    </div>
  );
}
