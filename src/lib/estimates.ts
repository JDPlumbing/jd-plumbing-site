import { supabase } from './supabase'

export async function fetchEstimates() {
  const { data, error } = await supabase
    .from('estimates')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data
}

export async function createEstimate(payload) {
  const { data, error } = await supabase
    .from('estimates')
    .insert([payload])
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateEstimate(id, updates) {
  const { data, error } = await supabase
    .from('estimates')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function deleteEstimate(id) {
  const { error } = await supabase
    .from('estimates')
    .delete()
    .eq('id', id)
  if (error) throw new Error(error.message)
}