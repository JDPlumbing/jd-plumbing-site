import { supabase } from '@/lib/supabase'
import type { DocFile } from '@/types'

export async function listDocs(): Promise<DocFile[]> {
  const { data, error } = await supabase.storage.from('docs').list('', { limit: 100 })
  if (error || !data) {
    console.error('[docs:list]', error)
    return []
  }

  return data.map((item) => ({
    id: item.name,
    name: item.name,
    path: item.name,
    type: (item.metadata as any)?.mimetype || '',
    size: (item.metadata as any)?.size || 0,
    created_at: (item.metadata as any)?.created_at || '',
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/docs/${item.name}`,
  }))
}

export async function uploadDoc(file: File) {
  const fileName = `${Date.now()}-${file.name}`
  const { error } = await supabase.storage.from('docs').upload(fileName, file)
  if (error) {
    console.error('[docs:upload]', error)
  }
}

export async function deleteDoc(name: string) {
  const { error } = await supabase.storage.from('docs').remove([name])
  if (error) {
    console.error('[docs:delete]', error)
  }
}

export const uploadDocFile = uploadDoc
export const deleteDocFile = deleteDoc
