"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setEmail("");
      toast.success("Thanks for subscribing!");
    } else {
      toast.error("Failed to subscribe. Try again.");
    }
  };

  return (
   <motion.section
   initial={{ y: 20, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
   >
     <section className="max-w-6xl mx-auto rounded-2xl bg-indigo-50 dark:bg-cyan-900 py-12 px-4 mt-10">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-gray-200 text-2xl font-bold mb-4">📩 Subscribe to our Newsletter</h2>
        <p className="text-gray-300 mb-4">Get job updates and career tips directly to your inbox.</p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            className="text-gray-400 w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded">
            Subscribe
          </button>
        </form>
      </div>
    </section>
   </motion.section>
  );
}
