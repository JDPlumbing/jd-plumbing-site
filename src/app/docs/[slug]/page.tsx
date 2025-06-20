import { notFound } from "next/navigation";
import { findDocBySlug, getDocContent } from "@/lib/docs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = "force-dynamic";

export default async function PublicDocPage({
  params,
}: {
  params: { slug: string | string[] };
}) {
  const rawSlug = params.slug;
  const decodedSlug = decodeURIComponent(
    Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || ""
  ).toLowerCase();

  const matched = findDocBySlug(decodedSlug);
  if (!matched) {
    console.warn("No public doc found for slug:", decodedSlug);
    notFound();
  }

  const [filename, meta] = matched;
  const content = getDocContent(filename);

  if (!content) {
    console.warn("Doc content not found for file:", filename);
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{meta.title}</h1>
        <p className="text-gray-500 text-sm mt-2">{meta.description}</p>
      </div>

      <div className="prose prose-invert max-w-none bg-neutral-900 p-6 rounded">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content || "*This document is currently empty.*"}
        </ReactMarkdown>
      </div>
    </div>
  );
}
