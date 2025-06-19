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
  const body = await req.json();
  const slug = `${new Date().toISOString().split('T')[0]}-${body.title.toLowerCase().replace(/\s+/g, '-')}.json`;
  await fs.writeFile(path.join(journalDir, slug), JSON.stringify(body, null, 2));
  return NextResponse.json({ status: 'ok' });
}
