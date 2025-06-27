"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import PDFDownloadLink and ResumePDF
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const ResumePDF = dynamic(() => import("@/components/ResumePDF"), {
  ssr: false,
});

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    overview: "",
    skills: "",
    languages: "",
    education: "",
    experience: "",
    projects: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-color shadow max-w-6xl mx-auto rounded-xl my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 shadow rounded-xl">
        <div className="space-y-4">
          <h2 className="text-3xl text-blue-600 font-bold text-center">
            Fill Resume Details
          </h2>

          {[
            "name",
            "email",
            "phone",
            "overview",
            "skills",
            "projects",
            "experience",
            "education",
            "languages",
          ].map((field) => (
            <textarea
              key={field}
              name={field}
              rows={field === "overview" || field === "projects" ? 4 : 2}
              placeholder={
                field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")
              }
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          ))}

          <div className="mt-4">
            <PDFDownloadLink
              document={<ResumePDF formData={formData} />}
              fileName="resume.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <button className="bg-gray-400 text-white px-4 py-2 rounded">
                    Preparing PDF...
                  </button>
                ) : (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                    Download PDF
                  </button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>

        {/* Preview Side */}
        <div className="p-4 border rounded">
          <h2 className="text-2xl font-bold">
            {formData.name || "Your Name"}
          </h2>
          <p>{formData.email}</p>
          <p>{formData.phone}</p>
          <hr className="my-4" />
          <div className="space-y-4">
            <p>
              <strong>Overview:</strong> {formData.overview}
            </p>
            <p>
              <strong>Skills:</strong> {formData.skills}
            </p>
            <p>
              <strong>Projects:</strong> {formData.projects}
            </p>
            <p>
              <strong>Experience:</strong> {formData.experience}
            </p>
            <p>
              <strong>Education:</strong> {formData.education}
            </p>
            <p>
              <strong>Languages:</strong> {formData.languages}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
