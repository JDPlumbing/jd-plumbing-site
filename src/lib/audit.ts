import { createClient } from '@/lib/supabase'

const supabase = createClient()

export async function listAuditLogs() {
  const { data, error } = await supabase
    .from('audit')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(100)

  if (error) {
    console.error('[audit:list]', error)
    return []
  }

  return data
}