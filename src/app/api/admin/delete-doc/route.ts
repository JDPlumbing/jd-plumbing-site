import { NextRequest, NextResponse } from "next/server";
import { deleteDoc } from "@/lib/docs";

export async function POST(req: NextRequest) {
  const { filename } = await req.json();

  if (!filename) {
    return NextResponse.json({ error: "Filename is required." }, { status: 400 });
  }

  try {
    deleteDoc(filename);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Delete error:", err);
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
