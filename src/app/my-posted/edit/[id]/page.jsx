"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

const EditJobPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`/api/jobs/update/${id}`);
      const data = await res.json();
      setJob(data);
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedJob = {
      name: e.target.name.value,
      email: e.target.email.value,
      company: e.target.company.value,
      jobTitle: e.target.jobTitle.value,
      location: e.target.location.value,
      jobType: e.target.jobType.value,
      category: e.target.category.value,
      salaryRange: e.target.salaryRange.value,
      experience: e.target.experience.value,
      deadline: e.target.deadline.value,
      applyLink: e.target.applyLink.value,
      website: e.target.website.value,
      description: e.target.description.value,
      responsibilities: e.target.responsibilities.value,
      requirements: e.target.requirements.value,
      perks: e.target.perks.value,
    };

    const res = await fetch(`/api/jobs/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedJob),
    });

    const result = await res.json();
    if (res.ok) {
      toast.success("Job updated successfully");
      router.push("/my-posted-jobs");
    } else {
      toast.error(result.message || "Update failed");
    }
  };

  if (!job) return <p className="text-center mt-6">Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white shadow-md rounded-lg mx-auto dark:bg-gray-900">
        <input
        name="name"
        defaultValue={job.name}
        placeholder="Name"
        className="border p-2 w-full"
        required
        readOnly
      />
      <input
        name="email"
        type="email"
        defaultValue={job.email}
        placeholder="Email"
        className="border p-2 w-full"
        required
        readOnly
      />
      <input
        name="company"
        defaultValue={job.company}
        placeholder="Company"
        className="border p-2 w-full"
      />
      <input
        name="jobTitle"
        defaultValue={job.jobTitle}
        placeholder="Job Title"
        className="border p-2 w-full"
        required
      />
      <input
        name="location"
        defaultValue={job.location}
        placeholder="Location"
        className="border p-2 w-full"
        required
      />
      <select
        name="jobType"
        defaultValue={job.jobType}
        className="border p-2 w-full"
        required
      >
        <option value="">Select Job Type</option>
        <option value="full-time">Full Time</option>
        <option value="part-time">Part Time</option>
        <option value="internship">Internship</option>
        <option value="contract">Contract</option>
      </select>
      <input
        name="category"
        defaultValue={job.category}
        placeholder="Category"
        className="border p-2 w-full"
      />
      <input
        name="salaryRange"
        defaultValue={job.salaryRange}
        placeholder="Salary Range"
        className="border p-2 w-full"
      />
      <input
        name="experience"
        defaultValue={job.experience}
        placeholder="Experience"
        className="border p-2 w-full"
      />
      <input
        type="date"
        name="deadline"
        defaultValue={job.deadline ? job.deadline.split('T')[0] : ""}
        className="border p-2 w-full"
      />
      <input
        name="applyLink"
        defaultValue={job.applyLink}
        placeholder="Apply Link"
        className="border p-2 w-full"
      />
      <input
        name="website"
        defaultValue={job.website}
        placeholder="Website"
        className="border p-2 w-full"
      />
      <textarea
        name="description"
        defaultValue={job.description}
        placeholder="Job Description"
        className="border p-2 w-full"
        rows={4}
      />
      <textarea
        name="responsibilities"
        defaultValue={job.responsibilities}
        placeholder="Responsibilities"
        className="border p-2 w-full"
        rows={3}
      />
      <textarea
        name="requirements"
        defaultValue={job.requirements}
        placeholder="Requirements"
        className="border p-2 w-full"
        rows={3}
      />
      <textarea
        name="perks"
        defaultValue={job.perks}
        placeholder="Perks"
        className="border p-2 w-full"
        rows={3}
      />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mt-4"
      >
        Update Job
      </button>
    </form>
  );
};

export default EditJobPage;
