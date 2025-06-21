// src/app/api/jobs/update/route.ts
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
      .from('jobs')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    await supabase.from('logs').insert([
      {
        actor_id: updated_by,
        action: 'updated_job',
        subject_table: 'jobs',
        subject_id: id,
        metadata: updates
      }
    ])

    return NextResponse.json({ success: true, job: data })
  } catch (err: any) {
    console.error('Job update failed:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
