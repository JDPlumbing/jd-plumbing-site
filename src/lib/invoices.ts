// lib/invoices.ts
import { supabase } from '@/lib/supabase'
import type { Invoice } from '@/types'

export async function listInvoices(): Promise<Invoice[]> {
  const { data, error } = await supabase.from('invoices').select('*')
  if (error) throw error
  return data || []
}

export async function createInvoice(payload: Partial<Invoice>): Promise<Invoice> {
  const { data, error } = await supabase
    .from('invoices')
    .insert(payload)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice> {
  const { data, error } = await supabase
    .from('invoices')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteInvoice(id: string): Promise<void> {
  const { error } = await supabase.from('invoices').delete().eq('id', id)
  if (error) throw error
}
