import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const dir = path.resolve('src/uploads/train');

export async function GET() {
  const files = fs.readdirSync(dir);
  const entries = files.map(f => {
    const full = fs.readFileSync(path.join(dir, f), 'utf-8');
    return JSON.parse(full);
  });
  return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const slug = data.slug || 'entry';
  const filename = `${new Date().toISOString().split('T')[0]}-${slug}.json`;
  const filepath = path.join(dir, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true });
}
