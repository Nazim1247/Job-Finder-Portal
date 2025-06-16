"use client";

import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <motion.section
    initial={{ scale: 0.8, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <section className="bg-gray-100 dark:bg-gray-900 py-10 max-w-6xl mx-auto rounded-2xl">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-6">
          About Us
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
          Welcome to JobFinder — your trusted career partner. We connect job seekers
          with top companies across various industries. Our platform is designed to help
          you find the perfect opportunity, whether you're just starting out or looking
          to level up your career.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          With real-time listings, resume-building tools, and helpful resources, we make
          your job search smarter and more successful. Join thousands who’ve found their
          dream jobs with JobFinder.
        </p>
      </div>
    </section>
    </motion.section>
  );
}
