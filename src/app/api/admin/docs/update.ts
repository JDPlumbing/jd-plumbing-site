import { NextRequest, NextResponse } from "next/server";
import { updateDocContent, updateDocMetadata } from "@/lib/docs";

export async function POST(req: NextRequest) {
  const { filename, content, meta } = await req.json();

  if (!filename || !content || !meta) {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }

  try {
    updateDocContent(filename, content);
    updateDocMetadata(filename, meta);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update failed:", err);
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}
