
"use client";

import { Briefcase, MapPin, DollarSign } from "lucide-react";

const JobCard = ({ job }) => {
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
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobCard;
