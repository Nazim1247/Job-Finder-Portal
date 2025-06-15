import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const body = await request.json();

    const { jobId, jobTitle, company, location, email } = body;

    if (!email || !jobId) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const savedJob = {
      jobId,
      jobTitle,
      company,
      location,
      email,
      savedAt: new Date(),
    };

    const savedJobCollection = dbConnect(collectionNameObj.savedJobCollection);

    // Check if this job is already saved by the same user
    const existing = await savedJobCollection.findOne({ jobId, email });
    if (existing) {
      return NextResponse.json({ success: false, message: "Already saved this job" }, { status: 409 });
    }

    const result = await savedJobCollection.insertOne(savedJob);

    return NextResponse.json({ success: true, insertedId: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error("Save Job Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const savedJobCollection = dbConnect(collectionNameObj.savedJobCollection);
    const savedJobs = await savedJobCollection.find({ email }).toArray();

    return NextResponse.json({ success: true, data: savedJobs }, { status: 200 });

  } catch (error) {
    console.error("Get Saved Jobs Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}