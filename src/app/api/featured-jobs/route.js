import dbConnect, { collectionNameObj } from "@/lib/dbConnect";


export async function GET() {
  try {
    const jobCollection = dbConnect(collectionNameObj.jobCollection);
    const featuredJobs = await jobCollection.find({}).sort({ postedAt: -1 }).limit(6).toArray();

    return Response.json(featuredJobs);
  } catch (error) {
    console.error("Error fetching featured jobs:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
