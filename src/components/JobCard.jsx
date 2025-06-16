
"use client";

import Link from "next/link";
import { Briefcase, MapPin, DollarSign } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { FaBookmark } from "react-icons/fa";


const JobCard = ({ job }) => {
  const {data:session} = useSession();
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
    
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-6 hover:shadow-lg transition-all duration-300">
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
        
      </div>
      <div className="flex justify-between items-center mt-4">
        <Link href={`/jobs/${job._id}`}>
  <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-700 transition">View Details</button>
</Link>

<button
    onClick={() => handleSaveJob(job)}
    className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
  title="Bookmark">
    <FaBookmark />
  </button>
  <Link
          href={`/apply/${job._id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >Apply Now
        </Link>
      </div>
    </div>
    
  );
};

export default JobCard;
