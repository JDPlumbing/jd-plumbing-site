'use client'
import { useEffect, useState } from 'react'
import { listDocs, uploadDoc, deleteDoc } from '@/lib/docs'

export default function DocsManager() {
  const [docs, setDocs] = useState([])
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    fetchDocs()
  }, [])

  const fetchDocs = async () => {
    const data = await listDocs()
    setDocs(data)
  }

  const handleUpload = async () => {
    if (!file) return
    await uploadDoc(file)
    setFile(null)
    await fetchDocs()
  }

  const handleDelete = async (id: string) => {
    await deleteDoc(id)
    await fetchDocs()
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Document Management</h2>
      <div className="flex gap-2 mb-4">
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </div>
      <ul className="space-y-2">
        {docs.map((doc: any) => (
          <li key={doc.id} className="flex justify-between items-center border p-2 rounded">
            <span>{doc.name}</span>
            <div className="flex gap-2">
              <a
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View
              </a>
              <button onClick={() => handleDelete(doc.id)} className="text-red-500">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}