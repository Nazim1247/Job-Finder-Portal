"use client";

import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <motion.section
    initial={{ scale: 0.8, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
    >
    <section
      id="about"
      className="bg-color py-10 max-w-6xl mx-auto rounded-2xl"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-6">
          About Us
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Welcome to <span className="font-semibold">JobFinder</span> — your
          trusted career partner. We connect job seekers with top companies
          across various industries. Our platform is designed to help you find
          the perfect opportunity, whether you're just starting out or looking
          to level up your career.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          With real-time listings, resume-building tools, and helpful resources,
          we make your job search smarter and more successful. Join thousands
          who’ve found their dream jobs with JobFinder.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8 text-left">
          <div className="border border-white rounded-xl shadow p-5 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-indigo-500 mb-2">
              🎯 Our Mission
            </h3>
            <p className="">
              To bridge the gap between talent and opportunity by providing a
              reliable, user-friendly platform for job seekers and employers.
            </p>
          </div>
          <div className="border border-white rounded-xl shadow p-5 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-indigo-500 mb-2">
              🌍 Our Vision
            </h3>
            <p className="">
              To be the most trusted global career platform where every
              professional finds the right opportunity at the right time.
            </p>
          </div>
          <div className="border border-white rounded-xl shadow p-5 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-indigo-500 mb-2">
              🚀 Why Choose Us
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Verified job listings</li>
              <li>AI-powered job recommendations</li>
              <li>Free resume & cover letter builder</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    </motion.section>
  );
}
