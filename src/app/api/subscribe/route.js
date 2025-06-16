import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { email } = await req.json();
    const newsletterCollection = dbConnect(collectionNameObj.newsletterCollection);

    const existing = await newsletterCollection.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Already subscribed" }, { status: 400 });
    }

    await newsletterCollection.insertOne({ email, subscribedAt: new Date() });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ message: "Failed to subscribe" }, { status: 500 });
  }
}
