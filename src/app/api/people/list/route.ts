// src/app/api/people/list/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { role } = body // optional: filter by 'agent', 'customer', etc

    let query = supabase.from('people').select('*')

    if (role) {
      query = query.eq('role', role)
    }

    const { data, error } = await query.order('name', { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, people: data })
  } catch (err: any) {
    console.error('People list failed:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
