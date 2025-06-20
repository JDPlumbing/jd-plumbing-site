import { NextResponse } from "next/server";
import { getDocList } from "@/lib/docs";

export async function GET() {
  const files = getDocList();
  return NextResponse.json({ files });
}
