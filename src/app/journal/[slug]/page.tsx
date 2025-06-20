import fs from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import JsonRenderer from '@/components/tiptap/JsonRenderer'

interface Props {
  params: { slug: string }
}

export default async function JournalEntryPage({ params }: Props) {
  const filePath = path.join(process.cwd(), 'src/uploads/journal', `${params.slug}.json`)

  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    const entry = JSON.parse(raw)

    // Only show published + public
    if (!entry.published || entry.visibility !== 'public') return notFound()

    return (
      <section className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4 text-blue-400">{entry.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          {new Date(entry.createdAt).toLocaleString()}
        </p>
        <div className="prose prose-invert max-w-none">
          <JsonRenderer content={entry.content} />
        </div>
      </section>
    )
  } catch (err) {
    console.error('❌ Failed to render entry:', err)
    return notFound()
  }
}
