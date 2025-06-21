// lib/settings.ts
import { supabase } from '@/lib/supabase'
import type { Setting } from '@/types'

export async function getSettings(): Promise<Setting[]> {
  const { data, error } = await supabase.from('settings').select('*')
  if (error) throw error
  return data || []
}

export async function updateSetting(id: string, value: string) {
  const { data, error } = await supabase
    .from('settings')
    .update({ value })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}
