import { promises as fs } from 'fs'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'src/uploads/pages')

export async function GET() {
  const files = await fs.readdir(UPLOAD_DIR)
  const entries = await Promise.all(
    files.map(async (f) => {
      const fullPath = path.join(UPLOAD_DIR, f)
      const raw = await fs.readFile(fullPath, 'utf8')
      return JSON.parse(raw)
    })
  )
  return Response.json(entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
}

export async function POST(req: Request) {
  const data = await req.json()
  const { title, slug, content, status, scheduledFor } = data
  const createdAt = new Date().toISOString()
  const filename = `${createdAt.slice(0, 10)}-${slug}.json`
  const filePath = path.join(UPLOAD_DIR, filename)

  const entry = {
    title,
    slug,
    content,
    status,
    createdAt,
    scheduledFor,
    versions: [{ content, timestamp: createdAt }],
  }

  await fs.writeFile(filePath, JSON.stringify(entry, null, 2))
  return Response.json({ success: true })
}

export async function DELETE(req: Request) {
  const { slug } = await req.json()
  const files = await fs.readdir(UPLOAD_DIR)
  const fileToDelete = files.find((f) => f.includes(slug))
  if (!fileToDelete) return new Response('Not found', { status: 404 })

  await fs.unlink(path.join(UPLOAD_DIR, fileToDelete))
  return Response.json({ success: true })
}
