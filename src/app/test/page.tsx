// src/app/test/page.tsx
import { supabase } from '@/lib/supabase'

export default async function TestPage() {
  const { data, error } = await supabase.from('people').select('*').limit(10)
  return (
    <div>
      <h1>Test People</h1>
      <pre>{JSON.stringify(data || error, null, 2)}</pre>
    </div>
  )
}
