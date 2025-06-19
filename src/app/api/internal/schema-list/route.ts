// src/app/api/internal/schema-list/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const folder = path.join(process.cwd(), 'src/schemas')
  const files = fs.readdirSync(folder)
  const schemaTags = files
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
    .sort()
  return NextResponse.json({ schemas: schemaTags })
}
