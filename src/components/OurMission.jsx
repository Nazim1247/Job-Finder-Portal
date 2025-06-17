"use client";

import { motion } from "framer-motion";

export default function OurMission() {
  return (
    <motion.section
    initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <section className="bg-color py-10 my-6 max-w-6xl mx-auto rounded-2xl">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-6">
          Our Mission
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Our mission is to empower individuals by connecting them with meaningful career opportunities.
          We strive to bridge the gap between talent and opportunity through technology, trust, and transparency.
        </p>
        <p className="text-lg leading-relaxed">
          Whether you're a recent graduate or an experienced professional, our goal is to help you grow and
          achieve your career dreams — one job at a time.
        </p>
      </div>
    </section>
    </motion.section>
  );
}
