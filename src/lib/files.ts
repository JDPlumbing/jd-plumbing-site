// lib/files.ts
import { supabase } from '@/lib/supabase'
import type { FileMeta } from '@/types'

export async function listFiles(): Promise<FileMeta[]> {
  const { data, error } = await supabase.storage.from('files').list('uploads', { limit: 100 })

  if (error) {
    console.error('[files:list]', error)
    return []
  }

  return data.map((item) => ({
    id: item.name,
    name: item.name,
    path: item.name,
    type: item.metadata?.mimetype || '',
    size: item.metadata?.size || 0,
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/files/uploads/${item.name}`,
  }))
}


export async function uploadFile(file: File, folder: string): Promise<string> {
  const filename = `${Date.now()}-${file.name}`
  const { error } = await supabase.storage.from('uploads').upload(`${folder}/${filename}`, file)
  if (error) throw error
  return filename
}

export async function deleteFile(path: string): Promise<void> {
  const { error } = await supabase.storage.from('uploads').remove([path])
  if (error) throw error
}
