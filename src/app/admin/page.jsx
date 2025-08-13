"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log(session)

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [session, status]);

  if (status === "loading") return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin panel. Here you can manage everything.</p>
     
    </div>
  );
}
