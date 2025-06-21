// src/app/api/logs/create/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      actor_id,         // who did it
      action,           // e.g. 'created_job'
      subject_table,    // e.g. 'jobs'
      subject_id,       // uuid of the job/task/whatever
      metadata = {},    // any extra info (e.g. confidence level, quote, notes)
    } = body

    if (!actor_id || !action || !subject_table || !subject_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabase.from('logs').insert([
      {
        actor_id,
        action,
        subject_table,
        subject_id,
        metadata,
      }
    ]).select().single()

    if (error) throw error

    return NextResponse.json({ success: true, log: data })
  } catch (err: any) {
    console.error('Log creation failed:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
