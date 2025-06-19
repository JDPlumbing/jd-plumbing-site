// src/app/api/journal/route.ts
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const journalDir = path.join(process.cwd(), 'src/uploads/journal');

export async function GET() {
  const files = await fs.readdir(journalDir);
  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith('.json'))
      .map(async (file) => {
        const content = await fs.readFile(path.join(journalDir, file), 'utf-8');
        return JSON.parse(content);
      })
  );
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const body = await req.json()

  const safeTitle = (body.title || 'untitled').trim().toLowerCase().replace(/\s+/g, '-')
  const dateStamp = new Date().toISOString().split('T')[0]
  const slug = `${dateStamp}-${safeTitle}.json`

  const fullPath = path.join(journalDir, slug)
  console.log('📁 Saving journal entry to:', fullPath)

  await fs.writeFile(fullPath, JSON.stringify(body, null, 2))

  return NextResponse.json({ status: 'ok' })
}
