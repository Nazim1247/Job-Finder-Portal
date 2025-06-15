
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const applicationCollection = dbConnect(collectionNameObj.applicationCollection);
  const jobs = await applicationCollection.find({ email }).toArray();
console.log('jobs',jobs)
  return NextResponse.json(jobs);
}

