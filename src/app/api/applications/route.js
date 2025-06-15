import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();
    const applicationCollection = dbConnect(collectionNameObj.applicationCollection);

    const result = await applicationCollection.insertOne({
      ...body,
      appliedAt: new Date(),
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Apply error:", error);
    return NextResponse.json({ message: "Failed to submit application" }, { status: 500 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
  }

  const applicationCollection = dbConnect(collectionNameObj.applicationCollection);
  const applications = await applicationCollection.find({ email }).toArray();

  return new Response(JSON.stringify(applications), { status: 200 });
}

