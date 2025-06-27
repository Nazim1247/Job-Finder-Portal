// components/ResumePDF.jsx
"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

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

export default ResumePDF;
