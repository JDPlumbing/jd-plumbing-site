// types/index.ts

export interface Project {
  id: string;
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  status?: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  customer_id?: string;
  created_at?: string;
}

export interface Job {
  id: string;
  project_id?: string;
  title: string;
  description?: string;
  assigned_to?: string;
  scheduled_for?: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at?: string;
}

export interface Task {
  id: string;
  job_id?: string;
  title: string;
  description?: string;
  assigned_to?: string;
  due_date?: string;
  status?: 'todo' | 'in_progress' | 'done' | 'cancelled';
  created_at?: string;
}

export interface Quote {
  id: string;
  project_id?: string;
  customer_id?: string;
  scope: string;
  total: number;
  status?: 'draft' | 'sent' | 'accepted' | 'rejected';
  created_at?: string;
}

export interface Estimate {
  id: string;
  job_id?: string;
  labor_hours?: number;
  material_cost?: number;
  total: number;
  notes?: string;
  created_at?: string;
}

export interface Invoice {
  id: string;
  quote_id?: string;
  total: number;
  status?: 'draft' | 'unpaid' | 'paid' | 'overdue';
  due_date?: string;
  created_at?: string;
}

export interface Person {
  id: string;
  role: 'admin' | 'tech' | 'sub' | 'office' | 'customer' | 'agent';
  name: string;
  email?: string;
  phone?: string;
  meta?: Record<string, any>;
  created_at?: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
  folio?: string;
  created_at?: string;
}

export interface AuditLog {
  id: string;
  actor_id: string;
  action: string;
  target_type: string;
  target_id: string;
  meta?: Record<string, any>;
  timestamp: string;
}

export interface Schedule {
  id: string;
  project_id?: string;
  task_id?: string;
  title: string;
  start: string;
  end: string;
  created_at?: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: any;
  published: boolean;
  created_at?: string;
}

export interface File {
  id: string;
  name: string;
  url: string;
  size?: number;
  type?: string;
  folder?: string;
  created_at?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: any;
  visibility: 'public' | 'internal';
  published: boolean;
  created_at?: string;
}

export interface TrainingExample {
  id: string;
  input: string;
  output: string;
  schema?: string;
  created_at?: string;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
  created_at?: string;
}
