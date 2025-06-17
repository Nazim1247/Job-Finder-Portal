"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("Message sent!");
      setForm({ name: "", email: "", message: "" });
    } else {
      toast.error("Failed to send message.");
    }
  };

  return (
    <motion.section
    initial={{ rotate: -5, opacity: 0 }}
  whileInView={{ rotate: 0, opacity: 1 }}
  transition={{ duration: 0.8 }}
    >
      <section className="bg-color py-4 my-4 rounded-2xl px-4 max-w-6xl mx-auto">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">📞 Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded">
            Send Message
          </button>
        </form>
      </div>
    </section>
    </motion.section>
  );
}
