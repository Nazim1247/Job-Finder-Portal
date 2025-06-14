"use client";
import JobCard from '@/components/JobCard';
import React, { useEffect, useState } from 'react';

const FindJobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const fetchJobs = async () => {
  try {
    const res = await fetch("/api/jobs");
    const data = await res.json();
    setJobs(data);
    console.log(data);
  } catch (error) {
    console.error("Fetch jobs error:", error);
  }
};

useEffect(() => {
  fetchJobs();
}, []);


    return (
        <div>
           <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Available Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
        </div>
    );
};

export default FindJobsPage;