"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function SavedJobsPage() {
  const { data: session } = useSession();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/save-job?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setSavedJobs(data.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-80 max-w-6xl mx-auto px-4 mt-6 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Saved Jobs</h1>
      {savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((job) => (
            <div key={job._id} className="p-5 border rounded shadow">
              <h2 className="text-xl font-semibold text-gray-400 mb-2">{job.jobTitle}</h2>
              <p className="text-gray-400 mb-1"><strong>Company:</strong> {job.company}</p>
              <p className="text-gray-400 mb-1"><strong>Location:</strong> {job.location}</p>
              <p className="text-gray-400 text-sm mt-2">Saved: {new Date(job.savedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Not Found any data</p>
      )}
    </div>
  );
}
