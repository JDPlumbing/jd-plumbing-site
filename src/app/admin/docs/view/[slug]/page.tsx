"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type DocMeta = {
  title: string;
  description: string;
  visibility: string;
  published: boolean;
  updatedAt: string;
};

export default function DocViewer() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [meta, setMeta] = useState<DocMeta | null>(null);

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

  if (!slug) return <div>Invalid filename.</div>;

  return (
    <div className="p-6">
      <Link
        href="/admin/docs"
        className="text-blue-500 hover:underline text-sm mb-4 inline-block"
      >
        ← Back to Docs
      </Link>

      {meta && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">{meta.title}</h1>
          <p className="text-gray-400 text-sm mb-1">{meta.description}</p>
          <p className="text-gray-500 text-xs italic">
            Last updated: {new Date(meta.updatedAt).toLocaleString()}
          </p>
          <div className="mt-2 text-xs">
            <span
              className={`inline-block px-2 py-1 rounded ${
                meta.published ? "bg-green-800" : "bg-yellow-800"
              }`}
            >
              {meta.published ? "Published" : "Draft"}
            </span>{" "}
            <span className="ml-2 text-neutral-400">({meta.visibility})</span>
          </div>
        </div>
      )}

      <div className="prose prose-invert max-w-none bg-neutral-900 p-6 rounded text-base">
        {content.trim() ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
            </ReactMarkdown>
        ) : (
            <p className="text-gray-500 italic">This document is currently empty.</p>
        )}
        </div>

    </div>
  );
}
