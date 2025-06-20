import fs from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import JsonRenderer from '@/components/tiptap/JsonRenderer'

// ✅ Patch: define proper type for `params` to satisfy Next.js App Router
type Props = {
  params: {
    slug: string
  }
}

export default async function JournalEntryPage({ params }: Props) {
  const dir = path.join(process.cwd(), 'src/uploads/journal')
  const filePath = path.join(dir, `${params.slug}.json`)

  let raw = ''
  let entry: any = null

  try {
    raw = await fs.readFile(filePath, 'utf-8')
  } catch (err) {
    console.error('❌ Failed to read journal file:', err)
    return notFound()
  }

  try {
    entry = JSON.parse(raw)
  } catch (err) {
    console.error('❌ Failed to parse JSON:', err)
    return notFound()
  }

  // ✅ Patch: ensure entry includes required flags for public viewing
  if (
    typeof entry !== 'object' ||
    typeof entry.title !== 'string' ||
    typeof entry.content !== 'object' ||
    entry.published !== true ||
    entry.visibility !== 'public'
  ) {
    console.warn('⛔ Malformed or non-public entry:', entry)
    return notFound()
  }

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
}
