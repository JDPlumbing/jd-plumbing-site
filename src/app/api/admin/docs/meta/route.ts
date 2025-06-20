import { NextResponse } from "next/server";
import { getAllMetadata } from "@/lib/docs";

export async function GET() {
  return NextResponse.json(getAllMetadata());
}
