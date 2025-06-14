// app/api/jobs/route.js
import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name, email, company, jobTitle, location,
      jobType, category, salaryRange, experience,
      deadline, applyLink, website, description,
      responsibilities, requirements, perks
    } = body;

    const job = {
      name,
      email,
      company,
      jobTitle,
      location,
      jobType,
      category,
      salaryRange,
      experience,
      deadline,
      applyLink,
      website,
      description,
      responsibilities,
      requirements,
      perks,
      postedAt: new Date(),
    };

    const jobCollection = dbConnect(collectionNameObj.jobCollection);
    const result = await jobCollection.insertOne(job);

    return NextResponse.json({ success: true, insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Job POST error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
