// app/api/jobs/route.js
import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// POST: Add a new Job
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

// GET: Get All Jobs
export async function GET() {
  try {
    const jobCollection = dbConnect(collectionNameObj.jobCollection);
    const jobs = await jobCollection.find().sort({ postedAt: -1 }).toArray();

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("GET jobs error:", error);
    return NextResponse.json({ message: "Failed to fetch jobs." }, { status: 500 });
  }
}

