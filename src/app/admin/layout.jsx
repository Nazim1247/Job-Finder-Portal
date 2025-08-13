"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaPlus, FaClipboardList, FaUsers } from "react-icons/fa";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex max-w-6xl mx-auto min-h-72">
      {/* Sidebar */}
      <div
        className={`border-r transition-all duration-300 shadow ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 focus:outline-none flex items-center gap-2 font-bold"
        >
        <FaBars />{isOpen ? 'Admin Panel' : ''}
        </button>

        {/* Menu Items */}
        <nav className="mt-2">
          <Link
            href="/admin/postJobs"
            className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 hover:text-white"
          >
            <FaPlus /> {isOpen && "Post New Job"}
          </Link>
          
          <Link
            href="/admin/my-posted-jobs"
            className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 hover:text-white"
          >
            <FaClipboardList /> {isOpen && "Manage Jobs"}
          </Link>
          <Link
            href="/admin/all-applications"
            className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 hover:text-white"
          >
            <FaUsers /> {isOpen && "View Applicants"}
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6">
        {children}
      </div>
    </div>
  );
}
