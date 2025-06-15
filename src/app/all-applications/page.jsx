"use client";
import { useEffect, useState } from "react";

const AllApplicationsPage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchAllApplications = async () => {
      try {
        const res = await fetch("/api/applications/all-applications");
        const data = await res.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchAllApplications();
  }, []);

  return (
    <div className="min-h-80 max-w-6xl mx-auto py-6 px-4 dark:bg-gray-900">
  <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">All Job Applications</h1>
  {applications.length > 0 ? (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.map((app) => (
        <li key={app._id} className="border border-gray-300 p-5 rounded-lg shadow-md">
          <p><strong>Applicant Name:</strong> {app.applicantName}</p>
          <p><strong>Email:</strong> {app.email}</p>
          <p><strong>Job ID:</strong> {app.jobId}</p>
          <p><strong>Job Title:</strong> {app.jobTitle}</p>
          <p><strong>Applied At:</strong> {new Date(app.appliedAt).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-center text-gray-500">Not Found any Data</p>
  )}
</div>

  );
};

export default AllApplicationsPage;
