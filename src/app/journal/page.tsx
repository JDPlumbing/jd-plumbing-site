// src/app/journal/page.tsx
import fs from 'fs'
import path from 'path'
import JsonRenderer from '@/components/tiptap/JsonRenderer' // ✅ make sure this exists

type Entry = {
  title: string
  content: any // <- was 'body'
  date: string
  visibility: 'internal' | 'login' | 'public'
  published: boolean
}


export default function PublicJournalPage() {
  const journalDir = path.join(process.cwd(), 'src/uploads/journal')
  const files = fs.readdirSync(journalDir)

  const entries: Entry[] = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(journalDir, file), 'utf-8')
      try {
        return JSON.parse(raw) as Entry
      } catch {
        return null
      }
    })
    .filter(
      (entry): entry is Entry =>
        !!entry && entry.published && entry.visibility === 'public'
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <section className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">
        JD Plumbing Journal
      </h1>

      {entries.length === 0 && (
        <p className="text-gray-400">No public entries yet. Stay tuned.</p>
      )}

      <div className="space-y-8">
        {entries.map((entry, i) => (
          <article
            key={i}
            className="bg-neutral-800 border border-neutral-700 rounded p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">
              {entry.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(entry.date).toLocaleString()}
            </p>
            <div className="prose prose-invert max-w-none">
              <JsonRenderer content={entry.content} />

            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
