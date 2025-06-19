// src/app/api/internal/schema/route.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const tag = url.searchParams.get('tag') // e.g., 'grip3'

  if (!tag) {
    return NextResponse.json({ error: 'Missing tag param' }, { status: 400 })
  }

  const filePath = path.join(process.cwd(), 'src/schemas', `${tag}.md`)

  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    return NextResponse.json({ tag, content: data })
  } catch (err) {
    return NextResponse.json({ error: 'Schema not found' }, { status: 404 })
  }
}
