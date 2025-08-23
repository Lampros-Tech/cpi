// app/api/delegates/route.ts

import clientPromise from "@/lib/mongodbDelegates";
import { NextRequest, NextResponse } from "next/server";
import { SortDirection } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // --- Pagination Parameters ---
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    // --- Sorting Parameters ---
    // 'sort' can be 'voting_power' or 'influence'. Default to 'voting_power'.
    const sortField = searchParams.get("sort") || "voting_power";
    // 'isAsc' determines the sort order. Default to false (descending).
    const isAsc = searchParams.get("isAsc") === 'true';
    const sortDirection: SortDirection = isAsc ? 1 : -1;

    // Whitelist the sortable fields to prevent sorting on an unintended field.
    const validSortFields: { [key: string]: string } = {
        voting_power: "voting_power",
        influence: "influence"
    };
    const sortKey = validSortFields[sortField] || "voting_power"; // Default to voting_power if invalid field is provided

    const client = await clientPromise;
    const db = client.db("CPI");
    const collection = db.collection("OPdelegates");

    // The aggregation pipeline now includes a $sort stage.
    // The order is crucial: 1. Sort the entire collection, 2. Skip, 3. Limit.
    const dataPipeline = [
      { $sort: { [sortKey]: sortDirection } }, // Dynamically set the field and direction
      { $skip: skip },
      { $limit: limit }
    ];
    
    // Fetch the sorted/paginated data and the total document count in parallel.
    const [data, total] = await Promise.all([
      collection.aggregate(dataPipeline).toArray(),
      collection.countDocuments({})
    ]);

    return NextResponse.json({
      success: true,
      page,
      limit,
      total,
      data,
    });
    
  } catch (error) {
    console.error("API Error in /api/delegates:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error. Check server logs." },
      { status: 500 }
    );
  }
}