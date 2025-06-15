"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApplyPage = () => {
    const router = useRouter();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    resumeLink: "",
    coverLetter: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`/api/jobs/${id}`);
      const data = await res.json();
      setJob(data);
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, jobId: id, jobTitle: job.jobTitle, jobCompany: job.company }),
    });

    const result = await res.json();
    if (res.ok) {
        router.push("/my-applications")
      toast.success("Application submitted successfully!");
    } else {
      toast.error(result.message || "Failed to apply.");
    }
  };

  if (!job) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow hover:shadow-lg transition-all duration-300 mt-4">
      <h2 className="text-xl text-center font-bold mb-4">Apply for {job.jobTitle}</h2>
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
