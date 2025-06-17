"use client";
import JobCard from '@/components/JobCard';
import JobFilterForm from '@/components/JobFilterForm';
import React, { useEffect, useState } from 'react';

const FindJobsPage = () => {
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [jobs, setJobs] = useState([]);


useEffect(() => {
    const fetchJobs = async () => {
  try {
    const res = await fetch("/api/jobs");
    const data = await res.json();
    setJobs(data);
    // console.log(data);
  } catch (error) {
    console.error("Fetch jobs error:", error);
  }
};
  fetchJobs();
}, []);

// filter logic 
  const filteredJobs = jobs.filter((job) => {
    const categoryMatch = category ? job.category?.toLowerCase().includes(category.toLowerCase()) : true;
    const locationMatch = location ? job.location?.toLowerCase().includes(location.toLowerCase()) : true;
    return categoryMatch && locationMatch;
  });


    return (
        <div>
           <div className="max-w-6xl mx-auto p-4 shadow rounded-xl my-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Available Jobs</h1>
      
        <JobFilterForm 
        category={category}
        location={location}
        setCategory={setCategory}
        setLocation={setLocation}/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
        </div>
    );
};

export default FindJobsPage;