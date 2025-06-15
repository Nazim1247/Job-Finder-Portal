import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function DELETE(req, { params }) {
  try {
    const jobCollection = dbConnect(collectionNameObj.jobCollection);
    const id = params.id;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const query = { _id: new ObjectId(id) };
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const currentJob = await jobCollection.findOne(query);

    if (!currentJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    const isOwner = session.user.email === currentJob.email;

    if (!isOwner) {
      return NextResponse.json({ success: false, message: "Not allowed" }, { status: 403 });
    }

    const result = await jobCollection.deleteOne(query);
    return NextResponse.json({ success: true, message: "Job deleted successfully", result });

  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req,{params}){
    const p = await params;
    const jobCollection = dbConnect(collectionNameObj.jobCollection)
    const query = {_id: new ObjectId(p.id)}
    const singleJob = await jobCollection.findOne(query)
    return NextResponse.json(singleJob)
}
