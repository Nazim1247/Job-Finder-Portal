"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
// import hero from "/public/hero.jpg"

export default function HeroSection() {
  return (
    <motion.section
    initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <section className="bg-color bg-indigo-50 dark:bg-gray-900 py-8 px-4 max-w-6xl mx-auto mt-4 rounded-2xl">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        
        {/* Left Text with Framer Motion */}
        <motion.div
          className="md:w-1/2 text-center md:text-left space-y-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 leading-tight">
            Find Your <span className="text-indigo-500">Dream Job</span> Today
          </h1>
          <p className="text-lg">
            Build your resume and apply to jobs in just a few clicks. Start your career journey with us!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/findJobs"
              className="bg-indigo-600 text-white px-6 md:px-2 py-3 rounded-lg hover:bg-indigo-700 transition animate-pulse"
            >
              🔍 Browse Jobs
            </Link>
            {/* <a
              href="/resume-builder"
              className="bg-green-600 text-white hover:bg-green-700 px-6 md:px-2 py-3 rounded-lg transition animate-pulse"
            >
              📝 Build Resume
            </a> */}
          </div>
        </motion.div>

        {/* Right Image with Framer Motion */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/hero-pic.jpg"
            alt="Job search illustration"
            width={500}
            height={500}
            className="mx-auto rounded-2xl animate-pulse"
          />
        </motion.div>
      </div>
    </section>
    </motion.section>
  );
}
