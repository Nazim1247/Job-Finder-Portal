"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const allJobs = [
  { title: "Frontend Developer", category: "tech" },
  { title: "Marketing Specialist", category: "marketing" },
  { title: "Logistics Manager", category: "logistics" },
  { title: "Teacher", category: "education" },
  { title: "Nurse", category: "healthcare" },
];

export default function JobsPage() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = allJobs.filter(
        (job) => job.category === selectedCategory
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [selectedCategory]);

  return (
    <div className="p-4 min-h-80 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {selectedCategory
          ? `Jobs in ${selectedCategory}`
          : "All Available Jobs"}
      </h2>

      <ul className="space-y-3">
        {filteredJobs.map((job, index) => (
          <li
            key={index}
            className="p-4 shadow rounded border border-gray-500 text-3xl text-center text-blue-600"
          >
            {job.title} 
          </li>
        ))}
        <li className="text-center text-2xl">Not Found any job for this category</li>
      </ul>
    </div>
  );
}
