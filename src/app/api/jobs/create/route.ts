// src/app/api/jobs/create/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      address_id,
      created_by,
      assigned_to,
      job_type,
      urgency,
      confidence,
      quoted_price,
      notes
    } = body

    if (!address_id || !created_by || !job_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabase.from('jobs').insert([
      {
        address_id,
        created_by,
        assigned_to,
        job_type,
        urgency,
        confidence,
        quoted_price,
        notes
      }
    ]).select().single()

    if (error) throw error

    return NextResponse.json({ success: true, job: data })
  } catch (err: any) {
    console.error('Job creation failed:', err)
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 })
  }
}
