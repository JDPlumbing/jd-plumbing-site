import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const dirPath = path.join(process.cwd(), 'src/uploads/docs');

  try {
    const files = fs.readdirSync(dirPath).map((name) => {
      const stats = fs.statSync(path.join(dirPath, name));
      return {
        name,
        size: stats.size,
        created: stats.birthtime,
      };
    });

    return NextResponse.json({ files });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read docs' }, { status: 500 });
  }
}
