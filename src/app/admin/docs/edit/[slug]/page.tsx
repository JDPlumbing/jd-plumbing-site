"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type DocMeta = {
  title: string;
  slug: string;
  description: string;
  visibility: string;
  published: boolean;
  updatedAt: string;
};

export default function EditDocPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [meta, setMeta] = useState<DocMeta | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!slug) return;
    const filename = Array.isArray(slug) ? slug[0] : slug;

    fetch(`/api/admin/docs/get?filename=${encodeURIComponent(filename)}`)
      .then((res) => res.json())
      .then((data) => {
        setContent(data.content || "");
        setMeta(data.meta || null);
      });
  }, [slug]);

  const handleSave = async () => {
    if (!slug || !meta) return;
    const filename = Array.isArray(slug) ? slug[0] : slug;

    setSaving(true);
    const res = await fetch("/api/admin/docs/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, content, meta }),
    });

    const result = await res.json();
    setSaving(false);
    setMessage(res.ok ? "✅ Saved!" : `❌ Error: ${result.error || "Unknown error"}`);
  };

  const handleMetaChange = (field: keyof DocMeta, value: string | boolean) => {
    setMeta((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  if (!meta) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <button
        onClick={() => router.push("/admin/docs")}
        className="text-blue-500 hover:underline text-sm"
      >
        ← Back to Docs
      </button>

      <h1 className="text-xl font-bold">✏️ Editing: {meta.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="bg-neutral-800 p-2 rounded text-white w-full"
          placeholder="Title"
          value={meta.title}
          onChange={(e) => handleMetaChange("title", e.target.value)}
        />
        <input
          className="bg-neutral-800 p-2 rounded text-white w-full"
          placeholder="Description"
          value={meta.description}
          onChange={(e) => handleMetaChange("description", e.target.value)}
        />
        <input
        className="bg-neutral-800 p-2 rounded text-white w-full"
        placeholder="Slug (URL)"
        value={meta.slug}
        onChange={(e) => handleMetaChange("slug", e.target.value)}
        />

        <select
          className="bg-neutral-800 p-2 rounded text-white"
          value={meta.visibility}
          onChange={(e) => handleMetaChange("visibility", e.target.value)}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={meta.published}
            onChange={(e) => handleMetaChange("published", e.target.checked)}
          />
          Published
        </label>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-[400px] p-4 bg-neutral-900 text-white rounded font-mono text-sm"
        placeholder="Write your markdown here..."
      />

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {saving ? "Saving..." : "💾 Save"}
        </button>
        {message && <p className="text-sm text-gray-400">{message}</p>}
      </div>
    </div>
  );
}
