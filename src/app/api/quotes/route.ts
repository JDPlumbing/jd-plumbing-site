// src/app/api/quotes/route.ts
import { writeFile, readdir, readFile, rm, mkdir } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import slugify from 'slugify'

const uploadDir = path.join(process.cwd(), 'src/uploads/quotes')
await mkdir(uploadDir, { recursive: true })

export async function POST(req: NextRequest) {
  const data = await req.json()
  const slug = slugify(data.customer || 'quote', { lower: true, strict: true })
  const date = new Date().toISOString().split('T')[0]
  const filename = `${date}-${slug}.json`
  const fullPath = path.join(uploadDir, filename)
  await writeFile(fullPath, JSON.stringify({ ...data, createdAt: new Date().toISOString() }, null, 2))
  return NextResponse.json({ status: 'ok', file: filename })
}

export async function GET() {
  const files = await readdir(uploadDir)
  const quotes = await Promise.all(
    files
      .filter(f => f.endsWith('.json'))
      .map(async f => {
        const full = path.join(uploadDir, f)
        const raw = await readFile(full, 'utf-8')
        return { ...JSON.parse(raw), filename: f }
      })
  )
  quotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return NextResponse.json(quotes)
}

export async function DELETE(req: NextRequest) {
  const { filename } = await req.json()
  if (!filename) return NextResponse.json({ error: 'Missing filename' }, { status: 400 })
  await rm(path.join(uploadDir, filename))
  return NextResponse.json({ status: 'deleted' })
}
