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
