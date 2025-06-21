import { createClient } from '@/lib/supabase'

const supabase = createClient()

export async function listPages() {
  const { data, error } = await supabase.from('pages').select('*').order('title')
  if (error) {
    console.error('[pages:list]', error)
    return []
  }
  return data
}

export async function savePage(page: any) {
  if (page.id) {
    const { error } = await supabase.from('pages').update(page).eq('id', page.id)
    if (error) console.error('[pages:update]', error)
  } else {
    const { error } = await supabase.from('pages').insert([page])
    if (error) console.error('[pages:insert]', error)
  }
}

export async function deletePage(id: string) {
  const { error } = await supabase.from('pages').delete().eq('id', id)
  if (error) console.error('[pages:delete]', error)
}