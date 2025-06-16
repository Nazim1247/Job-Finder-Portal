import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    const contactCollection = dbConnect(collectionNameObj.contactCollection);

    await contactCollection.insertOne({ name, email, message, sentAt: new Date() });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }
}
