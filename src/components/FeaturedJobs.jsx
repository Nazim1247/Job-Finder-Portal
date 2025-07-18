"use client";
import Link from "next/link";
// import { Bookmark } from "lucide-react";
// import { useState } from "react";
import { FaArrowRightToBracket, FaLocationDot } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { FaBookmark } from "react-icons/fa";
import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";


export default function FeaturedJobs() {
  // const router = useRouter();
    const {data:session} = useSession();
  // const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const featuredJobs = [
    {
      id: "1",
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "Dhaka, Bangladesh",
      salary: "$40,000 – $60,000",
      description: "Build modern UI with React and Tailwind CSS.",
    },
    {
      id: "2",
      title: "Digital Marketer",
      company: "Growth Agency",
      location: "Chittagong, Bangladesh",
      salary: "$30,000 – $50,000",
      description: "Create and manage digital marketing campaigns.",
    },
    {
      id: "3",
      title: "Logistics Coordinator",
      company: "QuickShip Ltd.",
      location: "Khulna, Bangladesh",
      salary: "$35,000 – $55,000",
      description: "Manage shipments and ensure timely delivery.",
    },
    {
      id: "4",
      title: "Teacher (Math)",
      company: "Sunrise School",
      location: "Rajshahi, Bangladesh",
      salary: "$25,000 – $40,000",
      description: "Teach secondary-level math and prepare lesson plans.",
    },
    {
      id: "5",
      title: "Nurse",
      company: "GreenLife Hospital",
      location: "Sylhet, Bangladesh",
      salary: "$28,000 – $45,000",
      description: "Provide medical care and support to patients.",
    },
    {
      id: "6",
      title: "Backend Developer",
      company: "CodeCraft",
      location: "Dhaka, Bangladesh",
      salary: "$50,000 – $75,000",
      description: "Build REST APIs with Node.js and MongoDB.",
    },
  ];

    const handleSaveJob = async (job) => {
        // console.log(job)
    try {
      const res = await fetch('/api/save-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        jobId: job.id,
        jobTitle: job.title,
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
  transition={{ duration: 0.8, ease: "easeOut" }}
   >
     <section className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600 text-center">
        Featured Jobs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-color rounded-xl p-5 shadow hover:shadow-lg transition duration-300 relative flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold">
              {job.title}
            </h3>
            <p className="text-gray-500">{job.company}</p>
            <div className="mt-2 text-gray-400 text-sm flex items-center gap-2">
            <FaLocationDot className="text-blue-600"/>
            <p>{job.location}</p>
            </div>
            <p className="text-gray-400 text-sm">💰 {job.salary}</p>
            <div className="text-gray-400 text-sm flex gap-2">
            <MdDescription className="mt-1 text-blue-600"/>
            <p>{job.description}</p>
            </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                <Link
               href={{
    pathname: `/apply/${job.id}`,
    query: {
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      salary: job.salary,
    },
  }}
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
            >
              Apply Now
            </Link>
            <button
                onClick={() => handleSaveJob(job)}
                className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
              title="Bookmark">
                <FaBookmark />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-2/3 md:w-1/4 lg:w-1/6 mx-auto mt-4">
        <Link href={"/findJobs"} className="bg-gray-300 text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-400 transition flex items-center gap-4 animate-pulse">View All Jobs <span><FaArrowRightToBracket className="mt-1"/></span></Link>
      </div>
    </section>
   </motion.section>
  );
}
