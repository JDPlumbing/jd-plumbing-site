'use client'

import { useEffect, useState } from 'react'
import { listFiles, uploadFile, deleteFile } from '@/lib/files'
import type { FileMeta } from '@/types'

export default function FilesManager() {
  const [files, setFiles] = useState<FileMeta[]>([])
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    const data = await listFiles()
    setFiles(data)
  }

  const handleUpload = async () => {
    if (!file) return
    const folder = 'uploads' // or any default folder logic
    await uploadFile(file, folder)
    setFile(null)
    await fetchFiles()
  }

  const handleDelete = async (name: string) => {
    await deleteFile(name)
    await fetchFiles()
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">File Manager</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>
      <ul className="space-y-2">
        {files.map((f) => (
          <li
            key={f.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <div>
              <p className="font-medium">{f.name}</p>
              <p className="text-sm text-gray-500">
                {f.type || 'unknown'} — {f.size ?? '?'} bytes
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href={f.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View
              </a>
              <button
                onClick={() => handleDelete(f.name)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
