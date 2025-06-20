import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { slugify } from '@/lib/slugify'
import { schemaMap } from '@/schemas'
import type { SchemaKey } from '@/schemas'

const TRAIN_DIR = path.join(process.cwd(), 'src/uploads/train')

// Ensure directory exists
fs.mkdirSync(TRAIN_DIR, { recursive: true })

export async function POST(req: NextRequest) {
  const {
    input,
    expected,
    intent,
    notes,
    timestamp = new Date().toISOString(),
    slug,
    ...schemaRefs
  } = await req.json()

  const usedSchemas = Object.entries(schemaRefs)
    .filter(([_, value]) => value)
    .map(([key]) => key)

  const schemas = usedSchemas.map(ref =>
    ref in schemaMap
      ? schemaMap[ref as keyof typeof schemaMap]
      : `⚠️ Missing schema: ${ref}`
  )

  const content = {
    input,
    expected,
    intent,
    notes,
    schemas,
    timestamp,
  }

  const filename = `${timestamp.slice(0, 10)}-${slugify(slug)}.json`
  const file = path.join(TRAIN_DIR, filename)

  fs.writeFileSync(file, JSON.stringify(content, null, 2))

  return NextResponse.json({ ok: true, file: filename })
}

export async function GET() {
  try {
    const files = fs.readdirSync(TRAIN_DIR).filter(f => f.endsWith('.json'))
    const examples = files.map(filename => {
      const raw = fs.readFileSync(path.join(TRAIN_DIR, filename), 'utf-8')
      return JSON.parse(raw)
    })

    // Sort most recent first
    examples.sort((a, b) => b.timestamp.localeCompare(a.timestamp))

    return NextResponse.json({ examples })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
