// src/app/api/addresses/list/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { city, state, zip } = body

    let query = supabase.from('addresses').select('*')

    if (city) query = query.ilike('city', city)
    if (state) query = query.eq('state', state)
    if (zip) query = query.eq('zip', zip)

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, addresses: data })
  } catch (err: any) {
    console.error('Address list failed:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
