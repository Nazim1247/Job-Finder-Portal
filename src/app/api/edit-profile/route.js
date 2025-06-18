import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { email, name } = await req.json();

  try {
    const userCollection = dbConnect(collectionNameObj.userCollection);
    const result = await userCollection.updateOne(
      { providerAccountId: session.user.providerAccountId },
      { $set: { name, email } }
    );

    return Response.json({ success: true });
  } catch (err) {
    console.error("Profile update error:", err);
    return Response.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
