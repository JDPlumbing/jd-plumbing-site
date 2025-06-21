'use client'

import { useEffect, useState } from 'react'
import { listPages, savePage, deletePage } from '@/lib/pages'
import type { Page } from '@/types'

export default function PageEditor() {
  const [pages, setPages] = useState<Page[]>([])
  const [editing, setEditing] = useState<Partial<Page> | null>(null)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    const data = await listPages()
    setPages(data)
  }

  const handleSave = async () => {
    if (!editing) return
    await savePage(editing)
    setEditing(null)
    await fetchPages()
  }

  const handleDelete = async (id: string) => {
    await deletePage(id)
    await fetchPages()
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Public Pages</h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() =>
          setEditing({
            title: '',
            slug: '',
            content: '',
            visibility: 'private',
            published: false,
          })
        }
      >
        New Page
      </button>

      {editing && (
        <div className="border p-4 rounded space-y-2">
          <input
            type="text"
            placeholder="Title"
            value={editing.title || ''}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Slug"
            value={editing.slug || ''}
            onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Content"
            value={editing.content || ''}
            onChange={(e) => setEditing({ ...editing, content: e.target.value })}
            className="w-full p-2 border rounded"
            rows={6}
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editing.visibility === 'public'}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  visibility: e.target.checked ? 'public' : 'private',
                })
              }
            />
            <span>Public</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editing.published || false}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  published: e.target.checked,
                })
              }
            />
            <span>Published</span>
          </label>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}

      <ul className="space-y-2">
        {pages.map((p) => (
          <li
            key={p.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{p.title}</p>
              <p className="text-sm text-gray-600">/{p.slug}</p>
              <p className="text-sm">
                {p.visibility} {p.published ? '✔️' : '⏳'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="text-blue-600"
                onClick={() => setEditing(p)}
              >
                Edit
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDelete(p.id)}
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
