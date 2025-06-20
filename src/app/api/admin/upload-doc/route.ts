import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { updateDocMetadata } from "@/lib/docs";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = file.name;
  const savePath = path.join(process.cwd(), "public", "uploads", filename);

  try {
    await writeFile(savePath, buffer);

    // Register metadata
    updateDocMetadata(filename, {
      title: filename.replace(/\.(md|txt)$/i, ""),
      description: "",
      visibility: "private",
      published: false,
    });

    return NextResponse.json({ success: true, path: `/uploads/${filename}` });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
