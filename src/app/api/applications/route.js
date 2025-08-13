import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applicationCollection = dbConnect(collectionNameObj.applicationCollection);
    const applications = await applicationCollection
      .find({ email: session?.user?.email })
      .toArray();

    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

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

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const email = searchParams.get("email");

//   if (!email) {
//     return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
//   }

//   const applicationCollection = dbConnect(collectionNameObj.applicationCollection);
//   const applications = await applicationCollection.find({ email }).toArray();

//   return new Response(JSON.stringify(applications), { status: 200 });
// }

