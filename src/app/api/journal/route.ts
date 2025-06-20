import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Absolute path to journal storage
const JOURNAL_DIR = path.join(process.cwd(), 'src/uploads/journal')

export async function GET() {
  const files = fs.readdirSync(JOURNAL_DIR)
  const entries = files.map((file) => {
    const fullPath = path.join(JOURNAL_DIR, file)
    const content = fs.readFileSync(fullPath, 'utf-8')
    return JSON.parse(content)
  })

  return NextResponse.json(entries)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { id, title, content, visibility, published, createdAt, updatedAt } = body

  if (!id || !title || !content || !visibility) {
    return new NextResponse('Missing required fields', { status: 400 })
  }

  const filePath = path.join(JOURNAL_DIR, `${id}.json`)
  const entry = {
    id,
    title,
    content,
    visibility,
    published: published ?? false, // ✅ ensure default is false if omitted
    createdAt: createdAt ?? new Date().toISOString(),
    updatedAt: updatedAt ?? new Date().toISOString(),
  }

  fs.writeFileSync(filePath, JSON.stringify(entry, null, 2))
  return new NextResponse('Saved', { status: 200 })
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  if (!id) {
    return new NextResponse('Missing ID', { status: 400 })
  }

  const filePath = path.join(JOURNAL_DIR, `${id}.json`)
  if (!fs.existsSync(filePath)) {
    return new NextResponse('Entry not found', { status: 404 })
  }

  fs.unlinkSync(filePath)
  return new NextResponse('Deleted', { status: 200 })
}
