import { DocUploader } from "@/components/DocUploader";

export default function AdminDocsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📚 Docs Manager</h1>
      <DocUploader />
    </div>
  );
}
