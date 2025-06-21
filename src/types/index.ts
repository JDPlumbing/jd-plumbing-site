export type Job = {
  id: string
  title: string
  description?: string
  assigned_to?: string
  address_id?: string
  status: string
  quoted_price?: number
  created_at: string
}
export type Person = {
  id: string
  name: string
  email?: string
  phone?: string
  role: 'admin' | 'agent' | 'customer' | 'system'
  created_at: string
}
export type Address = {
  id: string
  street: string
  city: string
  state: string
  zip_code: string
  country: string
  created_at: string
}
export type Task = {
  id: string
  title: string
  description?: string
  assigned_to: string
  created_by: string
  due_date?: string
  status: 'todo' | 'in_progress' | 'done' | 'cancelled'
  related_job_id?: string
  created_at: string
}
