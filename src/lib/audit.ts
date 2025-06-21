import { supabase } from '@/lib/supabase'
import type { AuditLog } from '@/types'

export async function listAuditLogs(): Promise<AuditLog[]> {
  const { data, error } = await supabase.from('audit_logs').select('*').order('timestamp', { ascending: false })
  if (error) throw error
  return data || []
}
