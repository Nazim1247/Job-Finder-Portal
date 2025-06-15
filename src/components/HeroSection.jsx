"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// import hero from "/public/hero.jpg"

export default function HeroSection() {
  return (
    <section className="bg-indigo-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        
        {/* Left Text with Framer Motion */}
        <motion.div
          className="md:w-1/2 text-center md:text-left space-y-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 leading-tight">
            Find Your <span className="text-indigo-500">Dream Job</span> Today
          </h1>
          <p className="text-gray-400 text-lg">
            Build your resume and apply to jobs in just a few clicks. Start your career journey with us!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/jobs"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              🔍 Browse Jobs
            </a>
            <a
              href="/resume-builder"
              className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-100 transition"
            >
              📝 Build Resume
            </a>
          </div>
        </motion.div>

        {/* Right Image with Framer Motion */}
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/hero-pic.jpg"
            alt="Job search illustration"
            width={500}
            height={500}
            className="mx-auto rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
