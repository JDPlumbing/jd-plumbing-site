// src/app/api/tasks/list/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { assigned_to, status, related_job_id } = body

    let query = supabase.from('tasks').select('*')

    if (assigned_to) {
      query = query.eq('assigned_to', assigned_to)
    }

    if (status) {
      query = query.eq('status', status)
    }

    if (related_job_id) {
      query = query.eq('related_job_id', related_job_id)
    }

    const { data, error } = await query.order('due_date', { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, tasks: data })
  } catch (err: any) {
    console.error('Task list failed:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
