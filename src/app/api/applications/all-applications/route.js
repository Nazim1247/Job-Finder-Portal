import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// GET: Get All Applications
export async function GET() {
  try {
    const applicationCollection = dbConnect(collectionNameObj.applicationCollection);
    const applications = await applicationCollection.find().sort({appliedAt: -1}).toArray();
    return NextResponse.json(applications, {status: 200});

    // const jobCollection = dbConnect(collectionNameObj.jobCollection);
    // const jobs = await jobCollection.find().sort({ postedAt: -1 }).toArray();

    // return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("GET applications error:", error);
    return NextResponse.json({ message: "Failed to fetch applications." }, { status: 500 });
  }
}