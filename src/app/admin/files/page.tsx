'use client'

import { useEffect, useState } from 'react'

type FileMeta = {
  name: string
  folder: string
  path: string
  size: number
  modified: string
  type: string
}

const PREDEFINED_FOLDERS = ['Quotes', 'Jobs', 'Marketing', 'Photos', 'Permits']

function formatSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(1)} ${units[i]}`
}

export default function AdminFilesPage() {
  const [file, setFile] = useState<File | null>(null)
  const [folder, setFolder] = useState(PREDEFINED_FOLDERS[0])
  const [files, setFiles] = useState<FileMeta[]>([])

  const upload = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)
    await fetch('/api/files', { method: 'POST', body: formData })
    setFile(null)
    await refresh()
  }

  const refresh = async () => {
    const res = await fetch('/api/files')
    const data = await res.json()
    setFiles(data.sort((a: any, b: any) => new Date(b.modified).getTime() - new Date(a.modified).getTime()))
  }

  const deleteFile = async (filePath: string) => {
    const confirmed = confirm(`Delete "${filePath}"?`)
    if (!confirmed) return
    await fetch('/api/files', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: filePath }),
    })
    await refresh()
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">File Manager</h1>

      <div className="flex gap-4 items-center">
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <select
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="bg-neutral-800 text-white px-2 py-1 rounded"
        >
          {PREDEFINED_FOLDERS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <button onClick={upload} className="bg-blue-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {files.map((file) => (
          <li
            key={file.path}
            className="border border-neutral-700 p-4 rounded bg-neutral-800 text-white space-y-2"
          >
            {['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(file.type.toLowerCase()) && (
              <img
                src={file.path}
                alt={file.name}
                className="h-48 object-cover rounded border"
              />
            )}
            <div className="font-semibold">{file.name}</div>
            <div className="text-xs text-neutral-400">
              Folder: <span className="text-neutral-300">{file.folder}</span>
            </div>
            <div className="text-xs text-neutral-400">
              {formatSize(file.size)} • {file.type.toUpperCase()} • {new Date(file.modified).toLocaleString()}
            </div>
            <div className="flex gap-2 mt-2">
              <a
                href={file.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline text-sm"
              >
                Download
              </a>
              <button
                onClick={() => deleteFile(file.path)}
                className="text-red-400 text-sm"
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
