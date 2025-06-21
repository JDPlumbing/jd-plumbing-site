// src/app/api/tasks/create/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      created_by,
      assigned_to,
      title,
      description,
      due_date,
      status = 'open',
      related_job_id
    } = body

    if (!created_by || !assigned_to || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabase.from('tasks').insert([
      {
        created_by,
        assigned_to,
        title,
        description,
        due_date,
        status,
        related_job_id
      }
    ]).select().single()

    if (error) throw error

    // Optional: log task creation
    await supabase.from('logs').insert([
      {
        actor_id: created_by,
        action: 'created_task',
        subject_table: 'tasks',
        subject_id: data.id,
        metadata: {
          title,
          assigned_to,
          related_job_id,
          due_date
        }
      }
    ])

    return NextResponse.json({ success: true, task: data })
  } catch (err: any) {
    console.error('Task creation failed:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
