import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
// console.log("EMAIL", email)
  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const jobCollection = dbConnect(collectionNameObj.jobCollection);
 
  const myJobs = await jobCollection.find({ email }).toArray();
// console.log("jobs", myJobs)
  return Response.json(myJobs);
}
