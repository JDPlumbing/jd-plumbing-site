import { NextRequest, NextResponse } from "next/server";
import { getDocContent, getDocMetadata } from "@/lib/docs";

export async function GET(req: NextRequest) {
  const filename = req.nextUrl.searchParams.get("filename");

  if (!filename) {
    return NextResponse.json({ error: "Filename required." }, { status: 400 });
  }

  const content = getDocContent(filename);
  const meta = getDocMetadata(filename);

  if (!content || !meta) {
    return NextResponse.json({ error: "Document not found or invalid." }, { status: 404 });
  }

  return NextResponse.json({ content, meta });
}
