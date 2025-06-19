"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ApplyPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const jobTitle = searchParams.get("jobTitle");
  const company = searchParams.get("company");
  const location = searchParams.get("location");
  const salary = searchParams.get("salary");
  const description = searchParams.get("description");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    resumeLink: "",
    coverLetter: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        jobId: id,
        jobTitle,
        jobCompany: company,
        jobLocation: location,
        jobSalary: salary,
        jobDescription: description,
      }),
    });

    const result = await res.json();
    if (res.ok) {
      toast.success("Application submitted successfully!");
      router.push("/my-applications");
    } else {
      toast.error(result.message || "Failed to apply.");
    }
  };

  return (
    <div className="bg-color max-w-xl mx-auto p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 my-4">
      <h2 className="text-xl text-center font-bold mb-4">Apply for {jobTitle}</h2>
      <p className="text-center text-sm text-gray-500 mb-4">{company} — {location}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-4 py-2 rounded"
          type="text"
          placeholder="Your Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />
        <input
          className="w-full border px-4 py-2 rounded"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          className="w-full border px-4 py-2 rounded"
          type="url"
          placeholder="Link to Resume"
          value={formData.resumeLink}
          onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
          required
        />
        <textarea
          className="w-full border px-4 py-2 rounded"
          rows="4"
          placeholder="Write your cover letter..."
          value={formData.coverLetter}
          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyPage;
