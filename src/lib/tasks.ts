import { supabase } from './supabase'
import { Task } from '@/types'


export async function listTasks(): Promise<Task[]> {
  const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createTask(input: Partial<Task>) {
  const { error } = await supabase.from('tasks').insert([input])
  if (error) throw error
}

export async function updateTask(id: string, updates: Partial<Task>) {
  const { error } = await supabase.from('tasks').update(updates).eq('id', id)
  if (error) throw error
}

export async function deleteTask(id: string) {
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) throw error
}
