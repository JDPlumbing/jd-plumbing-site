// src/app/api/jobs/list/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { assigned_to, status } = body

    let query = supabase.from('jobs').select('*')

    if (assigned_to) {
      query = query.eq('assigned_to', assigned_to)
    }

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, jobs: data })
  } catch (err: any) {
    console.error('Job list failed:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
