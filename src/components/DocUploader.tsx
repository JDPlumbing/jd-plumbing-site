"use client";

import { useState, useEffect } from "react";

export function DocUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<Record<string, any>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload-doc", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setMessage("✅ Upload successful.");
      setFile(null);
      const updated = await fetch("/api/admin/docs/meta").then((r) => r.json());
      setFiles(updated);
    } else {
      setMessage("❌ Upload failed.");
    }
  };

  const handleDelete = async (filename: string) => {
    const confirmed = window.confirm(`Delete "${filename}"?`);
    if (!confirmed) return;

    const res = await fetch("/api/admin/delete-doc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });

    if (res.ok) {
      setMessage("🗑️ File deleted.");
      const updated = await fetch("/api/admin/docs/meta").then((r) => r.json());
      setFiles(updated);
    } else {
      setMessage("❌ Delete failed.");
    }
  };

  useEffect(() => {
    fetch("/api/admin/docs/meta")
      .then((res) => res.json())
      .then((data) => setFiles(data));
  }, []);

  return (
    <div className="p-6 bg-neutral-900 rounded border border-neutral-700">
      <h2 className="text-xl font-bold mb-4">📤 Upload a Private Document</h2>

      <label className="inline-block bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded cursor-pointer text-gray-200 mb-4">
        Choose File
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>

      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded ml-4"
      >
        Upload
      </button>

      {message && <p className="mt-4 text-sm text-gray-400">{message}</p>}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">📂 Uploaded Files</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          {Object.entries(files).map(([filename, meta]) => (
            <li
              key={filename}
              className="flex justify-between items-center border-b border-gray-700 pb-1"
            >
              <span>{meta.title || filename}</span>
              <div className="space-x-2">
                <a
                  href={`/uploads/${filename}`}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
                <button
                  onClick={() => handleDelete(filename)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
