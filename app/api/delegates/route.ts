import clientPromise from "@/lib/mongodbDelegates";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("CPI");
    const collection = db.collection("OPdelegates");

    // fetch all documents
    const data = await collection.find({}).toArray();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching delegates:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
