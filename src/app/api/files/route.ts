// src/app/api/files/route.ts
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { writeFile, readdir, stat, rm, mkdir } from 'fs/promises'
import fs from 'fs'

const uploadRoot = path.join(process.cwd(), 'src/uploads/files')

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  const folder = formData.get('folder')?.toString() || 'Uncategorized'

  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

  const targetDir = path.join(uploadRoot, folder)
  await mkdir(targetDir, { recursive: true })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const filepath = path.join(targetDir, file.name)

  await writeFile(filepath, buffer)

  return NextResponse.json({ status: 'ok', folder, filename: file.name })
}

export async function GET() {
  const walk = async (dir: string, folder = ''): Promise<any[]> => {
    const files = await readdir(dir, { withFileTypes: true })
    let out: any[] = []

    for (const f of files) {
      const fullPath = path.join(dir, f.name)
      const relativePath = path.relative(uploadRoot, fullPath)
      const currentFolder = path.dirname(relativePath)

      if (f.isDirectory()) {
        const sub = await walk(fullPath, currentFolder)
        out = [...out, ...sub]
      } else {
        const stats = await stat(fullPath)
        out.push({
          name: f.name,
          folder: currentFolder,
          path: `/uploads/files/${relativePath.replace(/\\/g, '/')}`,
          size: stats.size,
          modified: stats.mtime,
          type: path.extname(f.name).replace('.', ''),
        })
      }
    }
    return out
  }

  const list = await walk(uploadRoot)
  return NextResponse.json(list)
}

export async function DELETE(req: NextRequest) {
  const { path: filePath } = await req.json()
  if (!filePath) return NextResponse.json({ error: 'Missing file path' }, { status: 400 })

  const fullPath = path.join(process.cwd(), 'public', filePath)
  await rm(fullPath)

  return NextResponse.json({ status: 'deleted', path: filePath })
}
