"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import { useSession } from "next-auth/react";

const MyPostedJobsPage = () => {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchMyJobs = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(`/api/jobs/my-posted?email=${session.user.email}`);
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
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-center">You haven't posted any jobs yet.</p>
      )}
    </div>
  );
};

export default MyPostedJobsPage;
