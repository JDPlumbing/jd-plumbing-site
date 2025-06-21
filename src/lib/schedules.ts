import { supabase } from './supabase'

export async function fetchSchedules() {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .order('scheduled_for', { ascending: true })
  if (error) throw new Error(error.message)
  return data
}

export async function createSchedule(payload) {
  const { data, error } = await supabase
    .from('schedules')
    .insert([payload])
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateSchedule(id, updates) {
  const { data, error } = await supabase
    .from('schedules')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function deleteSchedule(id) {
  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq('id', id)
  if (error) throw new Error(error.message)
}