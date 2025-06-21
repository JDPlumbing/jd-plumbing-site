// src/app/api/tasks/update/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { id, updated_by, updates = {} } = body

    if (!id || !updated_by) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    await supabase.from('logs').insert([
      {
        actor_id: updated_by,
        action: 'updated_task',
        subject_table: 'tasks',
        subject_id: id,
        metadata: updates
      }
    ])

    return NextResponse.json({ success: true, task: data })
  } catch (err: any) {
    console.error('Task update failed:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
