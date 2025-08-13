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
      <section
        id="contact"
        className="bg-color py-8 my-4 rounded-2xl px-6 max-w-6xl mx-auto"
      >
        <h2 className="text-3xl text-indigo-600 font-bold mb-6 text-center">
          📞 Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border px-4 py-1 rounded"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border px-4 py-1 rounded"
              required
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border px-4 py-1 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-1 rounded"
            >
              Send Message
            </button>
          </form>

          {/* Static Contact Information */}
          <div className=" shadow p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">
              Our Contact Info
            </h3>
            <p className="mb-2">
              <strong>📍 Address:</strong> 1234 Street Name, Dhaka, Bangladesh
            </p>
            <p className="mb-2">
              <strong>📞 Phone:</strong> +880 1234 567 890
            </p>
            <p className="mb-2">
              <strong>✉️ Email:</strong> contact@yourdomain.com
            </p>
            <p>
              <strong>🕒 Working Hours:</strong> Sat - Thu, 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </section>
    </motion.section>
  );
}
