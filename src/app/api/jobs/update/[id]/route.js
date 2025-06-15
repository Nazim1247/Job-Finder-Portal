// /src/app/api/jobs/update/[id]/route.js
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    const p = await params;
    const jobCollection = dbConnect(collectionNameObj.jobCollection)
    const query = {_id: new ObjectId(p.id)}
    const singleJob = await jobCollection.findOne(query)
    return NextResponse.json(singleJob)
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const jobCollection = dbConnect(collectionNameObj.jobCollection);

    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: body };

    const result = await jobCollection.updateOne(filter, updateDoc);

    if (result.matchedCount === 0) {
      return Response.json({ message: "Job not found" }, { status: 404 });
    }

    return Response.json({ message: "Job updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
