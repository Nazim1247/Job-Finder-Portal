"use client";
import React from 'react';
import toast from 'react-hot-toast';

const PostJobsPage = () => {
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const form = e.target;

    const jobData = {
      name: form.name.value,
      email: form.email.value,
      company: form.company.value,
      jobTitle: form.jobTitle.value,
      location: form.location.value,
      jobType: form.jobType.value,
      category: form.category.value,
      salaryRange: form.salaryRange.value,
      experience: form.experience.value,
      deadline: form.deadline.value,
      applyLink: form.applyLink.value,
      website: form.website.value,
      description: form.description.value,
      responsibilities: form.responsibilities.value,
      requirements: form.requirements.value,
      perks: form.perks.value,
    };

    // console.log("Job Data:", jobData);
    try {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    });

    const data = await res.json();

    if (data?.insertedId) {
      toast.success("Job posted successfully!");
      form.reset();
    } else {
      toast.error("Failed to post job.");
    }
  } catch (error) {
    console.error("Job post error:", error);
    toast.error("Something went wrong.");
  }

    }
    return (
        <div className='mt-4'>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 bg-white shadow-md rounded-lg mx-auto">
      <input className="w-full border p-2 rounded" name="name" placeholder="Your Name" required />
      <input className="w-full border p-2 rounded" name="email" placeholder="Email" type="email" required />
      <input className="w-full border p-2 rounded" name="company" placeholder="Company Name" required />
      <input className="w-full border p-2 rounded" name="jobTitle" placeholder="Job Title" required />
      <input className="w-full border p-2 rounded" name="location" placeholder="Location" required />
      
      <select name="jobType" className="w-full border p-2 rounded" required>
        <option value="">Select Job Type</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="contract">Contract</option>
        <option value="internship">Internship</option>
      </select>

      <input className="w-full border p-2 rounded" name="category" placeholder="Category (e.g., Web Development)" required />
      <input className="w-full border p-2 rounded" name="salaryRange" placeholder="Salary Range (e.g., $1000 - $1500)" required />
      <select name="experience" className="w-full border p-2 rounded" required>
        <option value="">Experience Level</option>
        <option value="entry">Entry</option>
        <option value="mid">Mid</option>
        <option value="senior">Senior</option>
      </select>
      <input className="w-full border p-2 rounded" type="date" name="deadline" required />
      <input className="w-full border p-2 rounded" name="applyLink" placeholder="Apply Link (Google Form/Website)" required />
      <input className="w-full border p-2 rounded" name="website" placeholder="Company Website (Optional)" />

      <textarea className="w-full border p-2 rounded lg:col-span-2" name="description" placeholder="Job Description" rows={3}></textarea>
      <textarea className="w-full border p-2 rounded lg:col-span-2" name="responsibilities" placeholder="Responsibilities" rows={3}></textarea>
      <textarea className="w-full border p-2 rounded lg:col-span-2" name="requirements" placeholder="Requirements" rows={3}></textarea>
      <textarea className="w-full border p-2 rounded lg:col-span-2" name="perks" placeholder="Perks & Benefits" rows={3}></textarea>

      <button type="submit" className="lg:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Submit Job Post
      </button>
    </form>


        </div>
    );
};

export default PostJobsPage;