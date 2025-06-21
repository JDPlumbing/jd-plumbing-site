import { createClient } from '@/lib/supabase'

const supabase = createClient()

export async function listDocs() {
  const { data, error } = await supabase.storage.from('docs').list('', { limit: 100 })
  if (error) {
    console.error('[docs:list]', error)
    return []
  }
  return data.map((item) => ({
    id: item.name,
    name: item.name,
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/docs/${item.name}`
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