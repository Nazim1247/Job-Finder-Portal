"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MyApplicationsPage = () => {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!session?.user?.email) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/applications?email=${encodeURIComponent(session.user.email)}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setApplications(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchApplications();
  }, [session]);

  if (status === "loading" || loading) return <p className="text-center">Loading...</p>;

  if (!session) return <p className="text-center">Please log in to view your applications.</p>;

  return (
    <div className="min-h-80 max-w-4xl mx-auto mt-6 bg-white rounded-lg shadow-lg dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
  <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">My Job Applications</h1>

  {applications.length > 0 ? (
    <ul className="space-y-6">
      {applications.map((app) => (
        <li
          key={app._id}
          className="border border-gray-300 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-gray-300">Job ID: {app.jobId}</h2>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Applied on: {new Date(app.appliedAt).toLocaleDateString()} at{" "}
              {new Date(app.appliedAt).toLocaleTimeString()}
            </span>
          </div>

          <p className="text-gray-700 mb-2 dark:text-gray-400">
            <strong>Job Title:</strong> {app.jobTitle || "N/A"}
          </p>
          <p className="text-gray-700 mb-2 dark:text-gray-400">
            <strong>Company:</strong> {app.jobCompany || "N/A"}
          </p>
          <p className="text-gray-700 mb-2 dark:text-gray-400">
            <strong>Status:</strong>{" "}
            <span
              className={`font-semibold ${
                app.status === "Accepted"
                  ? "text-green-600"
                  : app.status === "Rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {app.status || "Pending"}
            </span>
          </p>
          <p className="text-gray-600 italic text-sm dark:text-gray-400">{app.notes || "No additional notes."}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-center text-gray-500 text-lg mt-10">
      You haven't applied to any jobs yet.
    </p>
  )}
</div>

  );
};

export default MyApplicationsPage;
