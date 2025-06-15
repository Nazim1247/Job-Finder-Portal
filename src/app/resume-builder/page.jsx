"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// ✅ Dynamically import PDFDownloadLink to avoid SSR issues
const PDFDownloadLink = dynamic(
  () =>
    import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

// ✅ Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  text: {
    marginBottom: 4,
  },
});

// ✅ Resume PDF Component
const ResumePDF = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>{formData.name || "Your Name"}</Text>
        <Text style={styles.text}>{formData.email}</Text>
        <Text style={styles.text}>{formData.phone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Overview</Text>
        <Text>{formData.overview}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Skills</Text>
        <Text>{formData.skills}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Languages</Text>
        <Text>{formData.languages}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Education</Text>
        <Text>{formData.education}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Experience</Text>
        <Text>{formData.experience}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Projects</Text>
        <Text>{formData.projects}</Text>
      </View>
    </Page>
  </Document>
);

// ✅ Main ResumeBuilder Component
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
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      {/* Form Side */}
      <div className="space-y-4">
        <h2 className="text-3xl text-blue-600 font-bold text-center">Fill Resume Details</h2>
        {[
          "name",
          "email",
          "phone",
          "overview",
          "skills",
          "languages",
          "education",
          "experience",
          "projects",
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

        {/* ✅ PDF Download Button */}
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

      {/* Resume Preview Side */}
      <div className="p-4 border rounded  ">
        <h2 className="text-2xl font-bold">{formData.name || "Your Name"}</h2>
        <p>{formData.email}</p>
        <p>{formData.phone}</p>
        <hr className="my-4" />
        <div className="space-y-8">
          <p>
          <strong>Overview:</strong> {formData.overview}
        </p>
        <p>
          <strong>Skills:</strong> {formData.skills}
        </p>
        <p>
          <strong>Languages:</strong> {formData.languages}
        </p>
        <p>
          <strong>Education:</strong> {formData.education}
        </p>
        <p>
          <strong>Experience:</strong> {formData.experience}
        </p>
        <p>
          <strong>Projects:</strong> {formData.projects}
        </p>
        </div>
      </div>
    </div>
  );
}
