import { supabase } from '@/lib/supabase'
import { Person } from '@/types'

export async function listPeople(): Promise<Person[]> {
  const { data, error } = await supabase.from('people').select('*').order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data as Person[]
}

export async function createPerson(person: Partial<Person>): Promise<Person> {
  const { data, error } = await supabase.from('people').insert([person]).select().single()
  if (error) throw new Error(error.message)
  return data as Person
}

export async function updatePerson(id: string, updates: Partial<Person>): Promise<Person> {
  const { data, error } = await supabase.from('people').update(updates).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data as Person
}

export async function deletePerson(id: string): Promise<void> {
  const { error } = await supabase.from('people').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
