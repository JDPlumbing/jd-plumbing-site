"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DocUploader } from "@/components/DocUploader";

type DocMeta = {
  title: string;
  slug: string;
  description: string;
  visibility: string;
  published: boolean;
  updatedAt: string;
};

export default function AdminDocsPage() {
  const [docs, setDocs] = useState<Record<string, DocMeta>>({});

  useEffect(() => {
    fetch("/api/admin/docs/meta")
      .then((res) => res.json())
      .then((data) => setDocs(data || {}));
  }, []);

  const togglePublish = async (filename: string) => {
    const meta = docs[filename];
    const res = await fetch("/api/admin/docs/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename,
        content: "", // no content change
        meta: { published: !meta.published },
      }),
    });
    if (res.ok) {
      setDocs((prev) => ({
        ...prev,
        [filename]: { ...prev[filename], published: !prev[filename].published },
      }));
    }
  };

  const handleDelete = async (filename: string) => {
    const confirmed = confirm(`Delete ${docs[filename]?.title || filename}?`);
    if (!confirmed) return;

    const res = await fetch("/api/admin/delete-doc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });

    if (res.ok) {
      setDocs((prev) => {
        const updated = { ...prev };
        delete updated[filename];
        return updated;
      });
    }
  };

  return (
    <div className="p-6 space-y-12">
      <div>
        <h1 className="text-2xl font-bold mb-6">📚 Docs Manager</h1>
        <DocUploader />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">🗃️ All Uploaded Docs</h2>
        {Object.keys(docs).length === 0 ? (
          <p className="text-gray-500 text-sm">No documents found.</p>
        ) : (
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="bg-neutral-800 text-gray-400">
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Slug</th>
                <th className="p-2">Visibility</th>
                <th className="p-2">Published</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(docs).map(([filename, meta]) => (
                <tr key={filename} className="border-b border-neutral-700">
                  <td className="p-2">{meta.title}</td>
                  <td className="p-2 text-blue-400">{meta.slug}</td>
                  <td className="p-2">{meta.visibility}</td>
                  <td className="p-2">{meta.published ? "✅" : "—"}</td>
                  <td className="p-2 space-x-2">
                    <Link
                      href={`/admin/docs/view/${encodeURIComponent(filename)}`}
                      className="text-indigo-400 hover:underline"
                    >
                      View (admin)
                    </Link>
                    <a
                      href={`/docs/${encodeURIComponent(meta.slug)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      View (public)
                    </a>
                    <Link
                      href={`/admin/docs/edit/${encodeURIComponent(filename)}`}
                      className="text-yellow-400 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => togglePublish(filename)}
                      className="text-green-400 hover:underline"
                    >
                      {meta.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDelete(filename)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
