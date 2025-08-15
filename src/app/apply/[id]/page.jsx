"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const ApplyPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    resumeLink: "",
    coverLetter: "",
  });

  // Step 1: Static params check
  const jobTitle = searchParams.get("title");
  const company = searchParams.get("company");
  const location = searchParams.get("location");
  const salary = searchParams.get("salary");
  const description = searchParams.get("description");

  const isStaticJob = jobTitle && company;

  // Step 2: Set user info
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        fullName: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  // Step 3: Fetch dynamic job if not static
  useEffect(() => {
    if (!isStaticJob) {
      const fetchJob = async () => {
        try {
          const res = await fetch(`/api/jobs/${id}`);
          if (!res.ok) throw new Error("Failed to fetch job");
          const data = await res.json();
          setJob(data);
        } catch (error) {
          console.error(error);
          toast.error("Job not found");
          router.push("/findJobs");
        }
      };
      fetchJob();
    } else {
      // Static job data set
      setJob({
        title: jobTitle,
        company,
        location,
        salary,
        description,
      });
    }
  }, [id, isStaticJob]);

  // Step 4: Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = isStaticJob
      ? {
          jobTitle,
          jobCompany: company,
          jobLocation: location,
          jobSalary: salary,
          jobDescription: description,
        }
      : {
          jobTitle: job?.jobTitle,
          jobCompany: job?.company,
          jobLocation: job?.location,
          jobSalary: job?.salary,
          jobDescription: job?.description,
        };

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        jobId: id,
        ...jobData,
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

  if (!job) return <p className="text-center mt-10">Loading job...</p>;

  return (
    <div className="bg-color max-w-xl mx-auto p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 my-4">
      <h2 className="text-xl text-center font-bold mb-4">Apply for {job.title}</h2>
      <p className="text-center text-sm text-gray-500 mb-4">
        {job.company} — {job.location}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-4 py-2 rounded"
          type="text"
          value={formData.fullName}
          readOnly
        />
        <input
          className="w-full border px-4 py-2 rounded"
          type="email"
          value={formData.email}
          readOnly
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyPage;
