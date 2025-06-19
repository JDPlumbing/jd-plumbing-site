import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const file = path.join(process.cwd(), 'src/config/settings.json')

export async function GET() {
  const data = fs.readFileSync(file, 'utf-8')
  return NextResponse.json(JSON.parse(data))
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  fs.writeFileSync(file, JSON.stringify(body, null, 2), 'utf-8')
  return NextResponse.json({ ok: true })
}
