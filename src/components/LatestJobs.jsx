"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
// import JobCard from "./JobCard";
import { FaBookmark, FaDollarSign } from "react-icons/fa";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { MdLocationPin } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { motion } from "framer-motion";


export default function LatestJobs() {
    const {data:session} = useSession();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch("/api/featured-jobs");
      const data = await res.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  
  const handleSaveJob = async (job) => {
  try {
    const res = await fetch('/api/save-job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobId: job._id,
        jobTitle: job.jobTitle,
        company: job.company,
        location: job.location,
        email: session?.user?.email,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Job saved successfully!');
    } else {
      toast.error(data.message || 'Something went wrong.');
    }
  } catch (error) {
    console.error('Error saving job:', error);
    toast.error('Failed to save job.');
  }
};

  return (
    <motion.section
    initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="py-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">Latest Jobs</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs && jobs.map((job) => (
            // <JobCard key={job._id} job={job}/>
          <div key={job._id} className="dark:bg-gray-800 rounded-xl p-4 shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
            <p className="text-gray-200">{job.company}</p>
            <div className="text-sm text-gray-300 flex items-center space-x-2">
            <MdLocationPin className="text-blue-600"/>
            <p>
            {job.location}</p>
            </div>
            <div className="mt-2 text-gray-400 line-clamp-3 flex items-center space-x-2">
            <FaDollarSign className="text-yellow-600"/>
            <p>
            {job.salaryRange}</p>
            </div>

            <div className="mt-4 flex gap-3">
              <Link href={`/jobs/${job._id}`}>
                <button className="bg-blue-600 text-white px-2 md:px-4 py-2 rounded hover:bg-blue-700">
                  View Details
                </button>
              </Link>
              <Link href={`/apply/${job._id}`}>
                <button className="bg-green-600 text-white px-2 md:px-4 py-2 rounded hover:bg-green-700">
                  Apply Now
                </button>
              </Link>
              <button
                  onClick={() => handleSaveJob(job)}
                  className="inline-block px-2 md:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                title="Bookmark">
                  <FaBookmark />
                </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-2/3 md:w-1/6 mx-auto mt-5">
        <Link href={"/findJobs"} className="bg-gray-300 text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-400 transition flex items-center gap-4 animate-pulse">View All Jobs <span><FaArrowRightToBracket className="mt-1"/></span></Link>
      </div>
    </div>
    </motion.section>
  );
}
