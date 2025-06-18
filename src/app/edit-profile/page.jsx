"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setForm({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session, status]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/edit-profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (result.success) {
      toast.success("Profile updated successfully!");
      router.push("/profile");
    } else {
      toast.error("Failed to update profile.");
    }
  };

  if (status === "loading") return <p className="text-center">Loading...</p>;

  return (
    <div className="bg-color max-w-md mx-auto my-6 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
