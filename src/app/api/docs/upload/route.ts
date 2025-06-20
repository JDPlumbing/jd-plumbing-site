// app/api/docs/upload/route.ts
import { IncomingForm } from "formidable";
import { writeFile } from "fs/promises";
import path from "path";
import { mkdirSync } from "fs";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const form = new IncomingForm({ uploadDir: "/tmp", keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req as any, async (err, fields, files) => {
      if (err) {
        console.error("Upload error:", err);
        return resolve(new Response("Upload failed", { status: 500 }));
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;

      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      mkdirSync(uploadsDir, { recursive: true });

      const destPath = path.join(uploadsDir, file.originalFilename || "untitled.txt");

      try {
        await writeFile(destPath, await file.toBuffer());
        resolve(new Response(JSON.stringify({ status: "ok", filename: file.originalFilename }), { status: 200 }));
      } catch (writeErr) {
        console.error("Write error:", writeErr);
        resolve(new Response("Failed to write file", { status: 500 }));
      }
    });
  });
}
