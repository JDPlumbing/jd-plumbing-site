import { createClient } from '@/lib/supabase'

const supabase = createClient()

export async function listFiles() {
  const { data, error } = await supabase.storage.from('files').list('', { limit: 100 })
  if (error) {
    console.error('[files:list]', error)
    return []
  }

  return data.map((f) => ({
    name: f.name,
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/files/${f.name}`,
    metadata: {
      size: f.metadata?.size,
      mimetype: f.metadata?.mimetype
    }
  }))
}

export async function uploadFile(file: File) {
  const fileName = `${Date.now()}-${file.name}`
  const { error } = await supabase.storage.from('files').upload(fileName, file)
  if (error) {
    console.error('[files:upload]', error)
  }
}

export async function deleteFile(name: string) {
  const { error } = await supabase.storage.from('files').remove([name])
  if (error) {
    console.error('[files:delete]', error)
  }
}