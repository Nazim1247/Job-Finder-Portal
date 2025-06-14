"use client";
import React, { useEffect } from 'react';

const FindJobsPage = () => {
    const fetchJobs = async () => {
  try {
    const res = await fetch("/api/jobs");
    const data = await res.json();
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
            Find All Jobs
        </div>
    );
};

export default FindJobsPage;