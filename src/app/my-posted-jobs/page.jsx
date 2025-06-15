"use client";

// import JobCard from "@/components/JobCard";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Briefcase } from "lucide-react";
import { MapPin } from "lucide-react";
import { DollarSign } from "lucide-react";
import Link from "next/link";

const MyPostedJobsPage = () => {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchMyJobs = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(`/api/jobs/my-posted?email=${session?.user?.email}`);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching your jobs:", error);
      }
    };

    fetchMyJobs();
  }, [session]);

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;
  if (!session) return <p className="text-center mt-10">Please login to view your posted jobs.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Posted Jobs</h2>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            // <JobCard key={job._id} job={job} />
            <div key={job._id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-6 hover:shadow-lg transition-all duration-300">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {job.jobTitle}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {job.company}
        </p>
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-2">
          <Briefcase size={16} />
          <span>{job.jobType}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={16} />
          <span>{job.salaryRange}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Deadline: {job.deadline}
        </p>
        {/* <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Apply Now
        </a> */}
      </div>
      <div className="space-x-6">
        <Link href={`/api/jobs/${job._id}`}>
  <button className="text-blue-600 underline mt-4">View Details</button>
</Link>
<Link href={`/my-posted/edit/${job._id}`}>
  <button className="bg-yellow-500 text-white px-4 py-1 rounded">Update</button>
</Link>
<Link href={`/my-posted/edit/${job._id}`}>
  <button className="bg-red-500 text-white px-4 py-1 rounded">Delate</button>
</Link>
      </div>
    </div>
          ))}
        </div>
      ) : (
        <p className="text-center">You haven't posted any jobs yet.</p>
      )}
    </div>
  );
};

export default MyPostedJobsPage;
