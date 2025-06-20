import fs from "fs";
import path from "path";

export type DocMeta = {
  title: string;
  slug: string;
  description: string;
  visibility: "public" | "private";
  published: boolean;
  updatedAt: string;
};


const uploadsDir = path.join(process.cwd(), "public", "uploads");
const metaFile = path.join(uploadsDir, ".meta", "index.json");

function ensureMetaFile() {
  if (!fs.existsSync(metaFile)) {
    fs.writeFileSync(metaFile, "{}");
  }
}

export function getDocList(): string[] {
  const files = fs.readdirSync(uploadsDir);
  return files.filter(f => f.endsWith(".md") || f.endsWith(".txt"));
}

export function getDocContent(filename: string): string | null {
  const filePath = path.join(uploadsDir, path.basename(filename));
  try {
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.error("❌ Failed to read file:", filePath, err);
    return null;
  }
}

export function updateDocContent(filename: string, content: string): void {
  const filePath = path.join(uploadsDir, path.basename(filename));
  fs.writeFileSync(filePath, content, "utf-8");
}

export function getAllMetadata(): Record<string, DocMeta> {
  ensureMetaFile();
  return JSON.parse(fs.readFileSync(metaFile, "utf-8"));
}

export function getDocMetadata(filename: string): DocMeta | null {
  try {
    const all = getAllMetadata();
    return all[filename] || null;
  } catch (err) {
    console.error("❌ Failed to get metadata for:", filename, err);
    return null;
  }
}
export function findDocBySlug(slug: string): [string, DocMeta] | null {
  const all = getAllMetadata();
  slug = slug.toLowerCase();
  return (
    Object.entries(all).find(
      ([_, meta]) => meta.slug?.toLowerCase() === slug && meta.published
    ) || null
  );
}


export function updateDocMetadata(filename: string, meta: Partial<DocMeta>): void {
  ensureMetaFile();
  const all = getAllMetadata();
  const existing = all[filename] || {
    title: filename.replace(/\.(md|txt)$/i, ""),
    description: "",
    visibility: "private",
    published: false,
    updatedAt: new Date().toISOString(),
  };
  const updated = {
  ...existing,
  ...meta,
  slug: meta.slug || existing.slug || generateSlug(meta.title || filename),
  updatedAt: new Date().toISOString(),
};

  all[filename] = updated;
  fs.writeFileSync(metaFile, JSON.stringify(all, null, 2));
}

export function deleteDoc(filename: string): void {
  const filePath = path.join(uploadsDir, path.basename(filename));
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  ensureMetaFile();
  const all = getAllMetadata();
  delete all[filename];
  fs.writeFileSync(metaFile, JSON.stringify(all, null, 2));
}
function generateSlug(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, "") // remove extension
    .replace(/\s+/g, "-")     // spaces to dashes
    .replace(/[^\w\-]/g, "")  // remove non-word chars
    .toLowerCase();
}
