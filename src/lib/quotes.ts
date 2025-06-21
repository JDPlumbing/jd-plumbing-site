// src/lib/quotes.ts
import { supabase } from '@/lib/supabase';
import type { Quote } from '@/types';

export async function listQuotes(): Promise<Quote[]> {
  const { data, error } = await supabase.from('quotes').select('*');
  if (error) throw error;
  return data || [];
}

export async function createQuote(payload: Partial<Quote>) {
  const { data, error } = await supabase.from('quotes').insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateQuote(id: string, updates: Partial<Quote>) {
  const { data, error } = await supabase.from('quotes').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteQuote(id: string) {
  const { error } = await supabase.from('quotes').delete().eq('id', id);
  if (error) throw error;
}
