// lib/pages.ts

import { supabase } from '@/lib/supabase'
import type { Page } from '@/types'

export async function listPages(): Promise<Page[]> {
  const { data, error } = await supabase.from('pages').select('*')
  if (error) throw error
  return data || []
}

export async function savePage(page: Partial<Page>): Promise<Page> {
  const { data, error } = await supabase
    .from('pages')
    .upsert([page], { onConflict: 'id' })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deletePage(id: string) {
  const { error } = await supabase.from('pages').delete().eq('id', id)
  if (error) throw error
}
