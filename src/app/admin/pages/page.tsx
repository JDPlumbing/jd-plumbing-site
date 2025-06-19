'use client'

import { useEffect, useState } from 'react'
import PageEditor from '@/components/PageEditor'
import { slugify } from '@/lib/slugify'

type PageEntry = {
  title: string
  slug: string
  content: string
  status: 'draft' | 'private' | 'public'
  createdAt: string
  scheduledFor?: string
}

export default function PagesAdmin() {
  const [pages, setPages] = useState<PageEntry[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'draft' | 'private' | 'public'>('draft')
  const [scheduledFor, setScheduledFor] = useState('')

  const fetchPages = async () => {
    const res = await fetch('/api/pages')
    const data = await res.json()
    setPages(data)
  }

  useEffect(() => {
    fetchPages()
  }, [])

  const submit = async () => {
    const slug = slugify(title)
    await fetch('/api/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, content, status, scheduledFor }),
    })
    setTitle('')
    setContent('')
    setStatus('draft')
    setScheduledFor('')
    fetchPages()
  }

  const del = async (slug: string) => {
    await fetch('/api/pages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    })
    fetchPages()
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pages</h1>

      <div className="space-y-2">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded bg-neutral-800 text-white"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as PageEntry['status'])}
          className="w-full p-2 border rounded bg-neutral-800 text-white"
        >
          <option value="draft">Draft</option>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        <input
          type="datetime-local"
          value={scheduledFor}
          onChange={(e) => setScheduledFor(e.target.value)}
          className="w-full p-2 border rounded bg-neutral-800 text-white"
        />

        <PageEditor content={content} onChange={setContent} />

        <button
          onClick={submit}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Save Page
        </button>
      </div>

      <hr className="border-neutral-700" />

      <div className="space-y-4">
        {pages.map((p) => (
          <div key={p.slug} className="border rounded p-4 space-y-1 bg-neutral-800 text-white">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-400">{p.createdAt}</p>
            <p className="text-sm italic">/{p.slug}</p>
            <p className="text-sm">Status: {p.status}</p>
            {p.scheduledFor && <p className="text-sm">Scheduled: {p.scheduledFor}</p>}
            <button
              onClick={() => del(p.slug)}
              className="mt-2 text-sm text-red-400 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
