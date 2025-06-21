// types/index.ts

export interface Project {
  id: string
  title: string
  status: 'planned' | 'planning' | 'active' | 'complete' | 'cancelled';
  start_date: string
  end_date: string
  description: string
  customer_id?: string
  created_at: string
  updated_at?: string
  meta?: Record<string, any>; // Additional metadata
  address_id?: string; // ID of the associated address
  address?: Address; // Optional address object for convenience
  updated_by?: string; // ID of the person who last updated this project
  jobs?: Job[]; // Optional list of jobs associated with this project 
  name?: string; // Optional name field for the project
  person_id?: string; // ID of the person associated with this project
  person?: Person; // Optional person object for convenience
  files?: File[]; // Optional list of files associated with this project
  journal_entries?: JournalEntry[]; // Optional list of journal entries associated with this project
  training_examples?: TrainingExample[]; // Optional list of training examples associated with this project
  audit_logs?: AuditLog[]; // Optional list of audit logs associated with this project
  settings?: Setting[]; // Optional list of settings associated with this project
  schedule?: Schedule[]; // Optional list of schedules associated with this project
  created_by?: string; // ID of the person who created this project

  created_by_person?: Person; // Optional person object for the creator of this project
  updated_by_person?: Person; // Optional person object for the last updater of this project
  customer?: Person; // Optional customer object for convenience
  tasks?: Task[]; // Optional list of tasks associated with this project
  comments?: string[]; // Optional list of comments associated with this project
  notes?: string; // Optional notes field for additional information
  tags?: string[]; // Optional tags field for categorization
  created_at_date?: Date; // Date object for the creation date of the project
  updated_at_date?: Date; // Date object for the last update date of the project
  scheduled_for?: string; // ISO date string when the project is scheduled for
  start_time?: string; // ISO time string for the start time of the project
  end_time?: string; // ISO time string for the end time of the project
  author_id?: string; // ID of the author of this project
  author?: Person; // Optional person object for the author of this project
  category?: string; // Optional category field for the project
  category_id?: string; // ID of the category associated with this project
  category_name?: string; // Name of the category associated with this project
  category_slug?: string; // Slug of the category associated with this project
  category_meta?: Record<string, any>; // Additional metadata for the category
  category_created_at?: string; // ISO date string when the category was created
  category_updated_at?: string; // ISO date string when the category was last updated
  category_created_by?: string; // ID of the person who created the category
  category_updated_by?: string; // ID of the person who last updated the category
  category_created_by_person?: Person; // Optional person object for the creator of the category
  category_updated_by_person?: Person; // Optional person object for the last updater of the category
  category_meta_data?: Record<string, any>; // Additional metadata for the category

  category_notes?: string; // Optional notes field for the category
  category_tags?: string[]; // Optional tags field for the category
  category_files?: File[]; // Optional list of files associated with the category
  category_journal_entries?: JournalEntry[]; // Optional list of journal entries associated with the category
  category_training_examples?: TrainingExample[]; // Optional list of training examples associated with the category

}

export interface Job {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  quoted_price?: number;
  created_at: string;
  updated_at?: string;
  project_id?: string;
  scheduled_for?: string; // ← needed for ScheduleCalendar
  updated_by?: string;
  customer_id?: string; // ID of the customer associated with this job
  customer?: Person; // Optional customer object for convenience
  address_id?: string; // ID of the associated address
  address?: Address; // Optional address object for convenience
  tasks?: Task[]; // Optional list of tasks associated with this job
  files?: File[]; // Optional list of files associated with this job
  meta?: Record<string, any>; // Additional metadata
  estimate?: Estimate; // Optional estimate object for this job
  invoice?: Invoice; // Optional invoice object for this job
  quote?: Quote; // Optional quote object for this job
  person_id?: string; // ID of the person assigned to this job
  person?: Person; // Optional person object for convenience
  schedule?: Schedule[]; // Optional list of schedules associated with this job
  journal_entries?: JournalEntry[]; // Optional list of journal entries associated with this job
  training_examples?: TrainingExample[]; // Optional list of training examples associated with this job
  audit_logs?: AuditLog[]; // Optional list of audit logs associated with this job
  settings?: Setting[]; // Optional list of settings associated with this job   

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
  updated_at?: string;
  priority?: 'low' | 'medium' | 'high';
  completed_at?: string; // ISO date string when the task was completed
  meta?: Record<string, any>; // Additional metadata
  subtasks?: Task[]; // Optional nested tasks for subtasks
  files?: File[]; // Optional list of files associated with this task
  comments?: string[]; // Optional list of comments associated with this task 
}

export interface Quote {
  id: string;
  project_id?: string;
  customer_id?: string;
  title?: string;
  total_amount?: number;
  scope?: string;
  status?: 'draft' | 'sent' | 'accepted' | 'rejected';
  created_at?: string;  
  updated_at?: string;
  updated_by?: string; // ID of the person who last updated this quote  
  exclusions?: string;
  notes?: string;
  labor_hours?: number; // Optional field for labor hours
  material_cost?: number; // Optional field for material cost
  total?: number; // Optional field for total cost
  verified?: boolean; // Optional field to indicate if the quote has been verified
  files?: File[]; // Optional list of files associated with this quote
  person_id?: string; // ID of the person associated with this quote
  person?: Person; // Optional person object for convenience
  address_id?: string; // ID of the associated address
  address?: Address; // Optional address object for convenience
  meta?: Record<string, any>; // Additional metadata
  journal_entries?: JournalEntry[]; // Optional list of journal entries associated with this quote
  training_examples?: TrainingExample[]; // Optional list of training examples associated with this quote
  audit_logs?: AuditLog[]; // Optional list of audit logs associated with this quote
  settings?: Setting[]; // Optional list of settings associated with this quote
  schedule?: Schedule[]; // Optional list of schedules associated with this quote
  created_by?: string; // ID of the person who created this quote
  created_by_person?: Person; // Optional person object for the creator of this quote
  updated_by_person?: Person; // Optional person object for the last updater of this quote
  job_id?: string; // ID of the job associated with this quote
  job?: Job; // Optional job object for convenience
  customer?: Person; // Optional customer object for convenience
  project?: Project; // Optional project object for convenience
  tasks?: Task[]; // Optional list of tasks associated with this quote
  comments?: string[]; // Optional list of comments associated with this quote
  
}


export interface Estimate {
  id: string
  job_id: string
  title: string
  scope: string
  exclusions: string
  labor_hours: number
  material_cost: number
  total: number
  total_amount: number
  notes: string
  verified: boolean
  created_at: string
  updated_at?: string
  updated_by?: string // ID of the person who last updated this estimate
  person_id?: string // ID of the person associated with this estimate
  person?: Person // Optional person object for convenience
  address_id?: string // ID of the associated address
  address?: Address // Optional address object for convenience
  files?: File[] // Optional list of files associated with this estimate
  meta?: Record<string, any> // Additional metadata
  journal_entries?: JournalEntry[] // Optional list of journal entries associated with this estimate
  training_examples?: TrainingExample[] // Optional list of training examples associated with this estimate
  audit_logs?: AuditLog[] // Optional list of audit logs associated with this estimate
  settings?: Setting[] // Optional list of settings associated with this estimate
  schedule?: Schedule[] // Optional list of schedules associated with this estimate
  created_by?: string // ID of the person who created this estimate
  
}


export interface Invoice {
  id: string
  job_id: string
  total_amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  due_date: string
  created_at: string
  updated_at?: string
  updated_by?: string // ID of the person who last updated this invoice
  person_id?: string // ID of the person associated with this invoice
  person?: Person // Optional person object for convenience
  address_id?: string // ID of the associated address
  address?: Address // Optional address object for convenience
  files?: File[] // Optional list of files associated with this invoice
  meta?: Record<string, any> // Additional metadata
  journal_entries?: JournalEntry[] // Optional list of journal entries associated with this invoice
  training_examples?: TrainingExample[] // Optional list of training examples associated with this invoice
  audit_logs?: AuditLog[] // Optional list of audit logs associated with this invoice
  settings?: Setting[] // Optional list of settings associated with this invoice
  schedule?: Schedule[] // Optional list of schedules associated with this invoice
  created_by?: string // ID of the person who created this invoice
  created_by_person?: Person // Optional person object for the creator of this invoice
  updated_by_person?: Person // Optional person object for the last updater of this invoice
  job?: Job // Optional job object for convenience
  customer?: Person // Optional customer object for convenience
  project?: Project // Optional project object for convenience
  tasks?: Task[]; // Optional list of tasks associated with this invoice
  comments?: string[]; // Optional list of comments associated with this invoice
  notes?: string; // Optional notes field for additional information
  title?: string; // Optional title field for the invoice
  description?: string; // Optional description field for the invoice
  payment_terms?: string; // Optional field for payment terms
  payment_due_date?: string; // Optional field for payment due date
  payment_received_date?: string; // Optional field for payment received date
  payment_method?: 'bank_transfer' | 'credit_card' | 'cash' | 'check' | 'other'; // Optional field for payment method
  payment_reference?: string; // Optional field for payment reference
  payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'; // Optional field for payment status
  payment_amount?: number; // Optional field for payment amount
  payment_currency?: string; // Optional field for payment currency
  payment_exchange_rate?: number; // Optional field for payment exchange rate
  payment_notes?: string; // Optional field for payment notes
  payment_receipt_url?: string; // Optional field for payment receipt URL
  payment_receipt_file?: File; // Optional file object for payment receipt
  payment_receipt?: string; // Optional field for payment receipt details
  payment_receipt_date?: string; // Optional field for payment receipt date
  payment_receipt_meta?: Record<string, any>; // Optional metadata for payment receipt
  payment_receipt_files?: File[]; // Optional list of files associated with the payment receipt

  payment_receipt_journal_entries?: JournalEntry[]; // Optional list of journal entries associated with the payment receipt
  payment_receipt_training_examples?: TrainingExample[]; // Optional list of training examples associated with the payment receipt
  payment_receipt_audit_logs?: AuditLog[]; // Optional list of audit logs associated with the payment receipt
  payment_receipt_settings?: Setting[]; // Optional list of settings associated with the payment receipt
  payment_receipt_schedule?: Schedule[]; // Optional list of schedules associated with the payment receipt

}



export interface Person {
  id: string;
  role: 'admin' | 'tech' | 'sub' | 'office' | 'customer' | 'agent';
  name: string;
  email?: string;
  phone?: string;
  meta?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
  updated_by?: string; // ID of the person who last updated this person
  address_id?: string; // ID of the associated address
  address?: Address; // Optional address object for convenience
  jobs?: Job[]; // Optional list of jobs associated with this person
  projects?: Project[]; // Optional list of projects associated with this person
  tasks?: Task[]; // Optional list of tasks associated with this person

  schedules?: Schedule[]; // Optional list of schedules associated with this person
  files?: File[]; // Optional list of files associated with this person
  journal_entries?: JournalEntry[]; // Optional list of journal entries associated with this person
  training_examples?: TrainingExample[]; // Optional list of training examples associated with this person
  audit_logs?: AuditLog[]; // Optional list of audit logs associated with this person
  settings?: Setting[]; // Optional list of settings associated with this person
  created_by?: string; // ID of the person who created this person
  created_by_person?: Person; // Optional person object for the creator of this person
  updated_by_person?: Person; // Optional person object for the last updater of this person
  customer_id?: string; // ID of the customer associated with this person
  customer?: Person; // Optional customer object for convenience
  projects_count?: number; // Optional count of projects associated with this person
  jobs_count?: number; // Optional count of jobs associated with this person
  tasks_count?: number; // Optional count of tasks associated with this person
  schedules_count?: number; // Optional count of schedules associated with this person
  files_count?: number; // Optional count of files associated with this person
  journal_entries_count?: number; // Optional count of journal entries associated with this person
  training_examples_count?: number; // Optional count of training examples associated with this person
  audit_logs_count?: number; // Optional count of audit logs associated with this person
  settings_count?: number; // Optional count of settings associated with this person
  address_count?: number; // Optional count of addresses associated with this person
  addresses?: Address[]; // Optional list of addresses associated with this person
  notes?: string; // Optional notes field for additional information
  tags?: string[]; // Optional tags field for categorization
  
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
  updated_at?: string;
  updated_by?: string; // ID of the person who last updated this address

  person_id?: string; // ID of the person associated with this address
  person?: Person; // Optional person object for convenience
  job_id?: string; // ID of the job associated with this address
  job?: Job; // Optional job object for convenience
  project_id?: string; // ID of the project associated with this address
  project?: Project; // Optional project object for convenience
  customer_id?: string; // ID of the customer associated with this address
  customer?: Person; // Optional customer object for convenience
  files?: File[]; // Optional list of files associated with this address
  journal_entries?: JournalEntry[]; // Optional list of journal entries associated with this address
  training_examples?: TrainingExample[]; // Optional list of training examples associated with this address
  audit_logs?: AuditLog[]; // Optional list of audit logs associated with this address
  settings?: Setting[]; // Optional list of settings associated with this address
  created_by?: string; // ID of the person who created this address
  created_by_person?: Person; // Optional person object for the creator of this address
  updated_by_person?: Person; // Optional person object for the last updater of this address
  meta?: Record<string, any>; // Additional metadata
  notes?: string; // Optional notes field for additional information
  tags?: string[]; // Optional tags field for categorization
  
}

export interface AuditLog {
  id: string;
  actor_id: string;
  action: string;
  target_type: string;
  target_id: string;
  meta?: Record<string, any>;
  timestamp: string;
  created_at?: string;
  updated_at?: string;
  updated_by?: string; // ID of the person who last updated this audit log
  actor?: Person; // Optional person object for the actor
  target?: Project | Job | Task | Person | Address | Quote | Invoice | Estimate; // Optional target object for convenience
  target_job?: Job; // Optional job object for the target
  target_project?: Project; // Optional project object for the target
  target_task?: Task; // Optional task object for the target
  target_person?: Person; // Optional person object for the target
  target_address?: Address; // Optional address object for the target
  target_quote?: Quote; // Optional quote object for the target
  target_invoice?: Invoice; // Optional invoice object for the target
  target_estimate?: Estimate; // Optional estimate object for the target
  target_files?: File[]; // Optional list of files associated with the target
  target_journal_entries?: JournalEntry[]; // Optional list of journal entries associated with the target
  target_training_examples?: TrainingExample[]; // Optional list of training examples associated with the target
  target_audit_logs?: AuditLog[]; // Optional list of audit logs associated with the target
  target_settings?: Setting[]; // Optional list of settings associated with the target
  target_schedule?: Schedule[]; // Optional list of schedules associated with the target
  target_files_count?: number; // Optional count of files associated with the target
  target_journal_entries_count?: number; // Optional count of journal entries associated with the target
  target_training_examples_count?: number; // Optional count of training examples associated with the target
  target_audit_logs_count?: number; // Optional count of audit logs associated with the target
  target_settings_count?: number; // Optional count of settings associated with the target
  target_schedule_count?: number; // Optional count of schedules associated with the target
  target_meta?: Record<string, any>; // Additional metadata for the target
  target_notes?: string; // Optional notes field for the target
  target_tags?: string[]; // Optional tags field for the target
  target_created_by?: string; // ID of the person who created the target
  target_created_by_person?: Person; // Optional person object for the creator of the target
  target_updated_by?: string; // ID of the person who last updated the target
  target_updated_by_person?: Person; // Optional person object for the last updater of the target
  target_created_at?: string; // ISO date string when the target was created
  target_updated_at?: string; // ISO date string when the target was last updated
  target_created_at_date?: Date; // Date object for the creation date of the target
  target_updated_at_date?: Date; // Date object for the last update date of the target
  target_scheduled_for?: string; // ISO date string when the target is scheduled for
  target_start_time?: string; // ISO time string for the start time of the target
  target_end_time?: string; // ISO time string for the end time of the target
  target_description?: string; // Optional description field for the target
  target_status?: 'scheduled' | 'completed' | 'cancelled'; // Optional status field for the target
  
}

export interface Schedule {
  id: string;
  title: string;
  type: 'visit' | 'call' | 'meeting' | 'inspection';
  scheduled_for: string; // ISO date string
  person_id?: string;
  project_id?: string;
  job_id?: string;
  location?: string;
  assigned_to?: string;
  created_at?: string;
  updated_at?: string;
  start_time?: string; // ISO time string
  end_time?: string; // ISO time string
  description?: string;
  status?: 'scheduled' | 'completed' | 'cancelled';
  updated_by?: string; // ID of the person who last updated this schedule
  person?: Person; // Optional person object for convenience
  project?: Project; // Optional project object for convenience
  job?: Job; // Optional job object for convenience
  address_id?: string; // ID of the associated address
  address?: Address; // Optional address object for convenience
  files?: File[]; // Optional list of files associated with this schedule
  meta?: Record<string, any>; // Additional metadata
  journal_entries?: JournalEntry[]; // Optional list of journal entries associated with this schedule
  training_examples?: TrainingExample[]; // Optional list of training examples associated with this schedule
  audit_logs?: AuditLog[]; // Optional list of audit logs associated with this schedule
  settings?: Setting[]; // Optional list of settings associated with this schedule
  created_by?: string; // ID of the person who created this schedule
  created_by_person?: Person; // Optional person object for the creator of this schedule
  updated_by_person?: Person; // Optional person object for the last updater of this schedule
  
  customer_id?: string; // ID of the customer associated with this schedule
  customer?: Person; // Optional customer object for convenience
  tasks?: Task[]; // Optional list of tasks associated with this schedule
  comments?: string[]; // Optional list of comments associated with this schedule
  notes?: string; // Optional notes field for additional information
  tags?: string[]; // Optional tags field for categorization
  meta_data?: Record<string, any>; // Optional metadata for the schedule
  created_at_date?: Date; // Date object for the creation date of the schedule
  updated_at_date?: Date; // Date object for the last update date of the schedule
  scheduled_for_date?: Date; // Date object for the scheduled date of the schedule
  start_time_date?: Date; // Date object for the start time of the schedule
  end_time_date?: Date; // Date object for the end time of the schedule
  visibility?: 'public' | 'private' | 'internal'; // Optional visibility field for the schedule
  published?: boolean; // Optional field to indicate if the schedule is published
  content?: string; // Optional content field for additional information
  slug?: string; // Optional slug field for URL-friendly identification
  idempotency_key?: string; // Optional idempotency key for ensuring unique operations
  created_by_id?: string; // ID of the person who created this schedule
  updated_by_id?: string; // ID of the person who last updated this schedule
  
}



export type Page = {
  id: string
  title: string
  slug: string
  content: string
  published: boolean
  visibility: 'public' | 'private' | 'internal'
  created_at: string
  updated_at?: string
  updated_by?: string; // ID of the person who last updated this page
  created_by?: string; // ID of the person who created this page
  created_by_person?: Person; // Optional person object for the creator of this page
  updated_by_person?: Person; // Optional person object for the last updater of this page
  meta?: Record<string, any>; // Additional metadata
  tags?: string[]; // Optional tags field for categorization
  files?: File[]; // Optional list of files associated with this page
  journal_entries?: JournalEntry[]; // Optional list of journal entries associated with this page
  training_examples?: TrainingExample[]; // Optional list of training examples associated with this page
  audit_logs?: AuditLog[]; // Optional list of audit logs associated with this page
  settings?: Setting[]; // Optional list of settings associated with this page
  schedule?: Schedule[]; // Optional list of schedules associated with this page
  comments?: string[]; // Optional list of comments associated with this page
  created_at_date?: Date; // Date object for the creation date of the page
  updated_at_date?: Date; // Date object for the last update date of the page
  scheduled_for?: string; // ISO date string when the page is scheduled for
  start_time?: string; // ISO time string for the start time of the page
  end_time?: string; // ISO time string for the end time of the page
  description?: string; // Optional description field for the page


  status?: 'draft' | 'published' | 'archived'; // Optional status field for the page
  author_id?: string; // ID of the author of this page
  author?: Person; // Optional person object for the author of this page
  category?: string; // Optional category field for the page
  category_id?: string; // ID of the category associated with this page
  category_name?: string; // Name of the category associated with this page
  category_slug?: string; // Slug of the category associated with this page
  category_meta?: Record<string, any>; // Additional metadata for the category
  category_created_at?: string; // ISO date string when the category was created
  category_updated_at?: string; // ISO date string when the category was last updated
  category_created_by?: string; // ID of the person who created the category
  category_updated_by?: string; // ID of the person who last updated the category
  category_created_by_person?: Person; // Optional person object for the creator of the category
  category_updated_by_person?: Person; // Optional person object for the last updater of the category
  category_meta_data?: Record<string, any>; // Additional metadata for the category
  category_notes?: string; // Optional notes field for the category
  category_tags?: string[]; // Optional tags field for the category
  category_files?: File[]; // Optional list of files associated with the category
  category_journal_entries?: JournalEntry[]; // Optional list of journal entries associated with the category
  category_training_examples?: TrainingExample[]; // Optional list of training examples associated with the category
  category_audit_logs?: AuditLog[]; // Optional list of audit logs associated with the category
  category_settings?: Setting[]; // Optional list of settings associated with the category
  category_schedule?: Schedule[]; // Optional list of schedules associated with the category
  category_created_at_date?: Date; // Date object for the creation date of the category
  category_updated_at_date?: Date; // Date object for the last update date of the category
  category_scheduled_for?: string; // ISO date string when the category is scheduled for
  category_start_time?: string; // ISO time string for the start time of the category
  category_end_time?: string; // ISO time string for the end time of the category
  category_description?: string; // Optional description field for the category
  category_status?: 'draft' | 'published' | 'archived'; // Optional status field for the category
  category_author_id?: string; // ID of the author of the category
  category_author?: Person; // Optional person object for the author of the category
  category_visibility?: 'public' | 'private' | 'internal'; // Optional visibility field for the category
  category_published?: boolean; // Optional field to indicate if the category is published
  category_content?: string; // Optional content field for additional information about the category
  category_idempotency_key?: string; // Optional idempotency key for ensuring unique operations on the category
  category_created_by_id?: string; // ID of the person who created the category

}


export interface File {
  id: string;
  name: string;
  url: string;
  size?: number;
  type?: string;
  folder?: string;
  created_at?: string;
  updated_at?: string;
  updated_by?: string; // ID of the person who last updated this file
  created_by?: string; // ID of the person who created this file
  created_by_person?: Person; // Optional person object for the creator of this file
  updated_by_person?: Person; // Optional person object for the last updater of this file
  meta?: Record<string, any>; // Additional metadata
  tags?: string[]; // Optional tags field for categorization
  description?: string; // Optional description field for additional information
  visibility?: 'public' | 'private' | 'internal'; // Optional visibility field for the file
  published?: boolean; // Optional field to indicate if the file is published
  content?: string; // Optional content field for additional information
  slug?: string; // Optional slug field for URL-friendly identification
  idempotency_key?: string; // Optional idempotency key for ensuring unique operations on the file
  created_at_date?: Date; // Date object for the creation date of the file
  updated_at_date?: Date; // Date object for the last update date of the file
  scheduled_for?: string; // ISO date string when the file is scheduled for
  start_time?: string; // ISO time string for the start time of the file
  end_time?: string; // ISO time string for the end time of the file
  status?: 'draft' | 'published' | 'archived'; // Optional status field for the file
  author_id?: string; // ID of the author of this file
  author?: Person; // Optional person object for the author of this file
  category?: string; // Optional category field for the file
  category_id?: string; // ID of the category associated with this file
  category_name?: string; // Name of the category associated with this file
  category_slug?: string; // Slug of the category associated with this file
  category_meta?: Record<string, any>; // Additional metadata for the category
  category_created_at?: string; // ISO date string when the category was created
  category_updated_at?: string; // ISO date string when the category was last updated
  category_created_by?: string; // ID of the person who created the category
  category_updated_by?: string; // ID of the person who last updated the category
  category_created_by_person?: Person; // Optional person object for the creator of the category
  category_updated_by_person?: Person; // Optional person object for the last updater of the category
  category_meta_data?: Record<string, any>; // Additional metadata for the category
  category_notes?: string; // Optional notes field for the category
  category_tags?: string[]; // Optional tags field for the category

  category_files?: File[]; // Optional list of files associated with the category
  category_journal_entries?: JournalEntry[]; // Optional list of journal entries associated with the category
  category_training_examples?: TrainingExample[]; // Optional list of training examples associated with the category


  
}

export interface JournalEntry {
  id: string;
  title: string;
  content: any;
  visibility: 'public' | 'internal';
  published: boolean;
  created_at?: string;
  updated_at?: string;
  updated_by?: string; // ID of the person who last updated this journal entry
  created_by?: string; // ID of the person who created this journal entry
  created_by_person?: Person; // Optional person object for the creator of this journal entry
  updated_by_person?: Person; // Optional person object for the last updater of this journal entry
  meta?: Record<string, any>; // Additional metadata
  tags?: string[]; // Optional tags field for categorization  

  files?: File[]; // Optional list of files associated with this journal entry
  training_examples?: TrainingExample[]; // Optional list of training examples associated with this journal entry
  audit_logs?: AuditLog[]; // Optional list of audit logs associated with this journal entry
  settings?: Setting[]; // Optional list of settings associated with this journal entry
  schedule?: Schedule[]; // Optional list of schedules associated with this journal entry
  person_id?: string; // ID of the person associated with this journal entry
  person?: Person; // Optional person object for convenience
  job_id?: string; // ID of the job associated with this journal entry
  job?: Job; // Optional job object for convenience
  project_id?: string; // ID of the project associated with this journal entry
  project?: Project; // Optional project object for convenience
  customer_id?: string; // ID of the customer associated with this journal entry
  customer?: Person; // Optional customer object for convenience
  address_id?: string; // ID of the associated address
  address?: Address; // Optional address object for convenience
  created_at_date?: Date; // Date object for the creation date of the journal entry
  updated_at_date?: Date; // Date object for the last update date of the journal entry
  scheduled_for?: string; // ISO date string when the journal entry is scheduled for
  start_time?: string; // ISO time string for the start time of the journal entry
  end_time?: string; // ISO time string for the end time of the journal entry
  description?: string; // Optional description field for the journal entry
  status?: 'draft' | 'published' | 'archived'; // Optional status field for the journal entry
  author_id?: string; // ID of the author of this journal entry
  author?: Person; // Optional person object for the author of this journal entry
  category?: string; // Optional category field for the journal entry
  category_id?: string; // ID of the category associated with this journal entry
  category_name?: string; // Name of the category associated with this journal entry
  category_slug?: string; // Slug of the category associated with this journal entry
  category_meta?: Record<string, any>; // Additional metadata for the category
  category_created_at?: string; // ISO date string when the category was created
  category_updated_at?: string; // ISO date string when the category was last updated
  category_created_by?: string; // ID of the person who created the category

  category_updated_by?: string; // ID of the person who last updated the category
  category_created_by_person?: Person; // Optional person object for the creator of the category
  category_updated_by_person?: Person; // Optional person object for the last updater of the category
  category_meta_data?: Record<string, any>; // Additional metadata for the category
  category_notes?: string; // Optional notes field for the category

  category_tags?: string[]; // Optional tags field for the category
  category_files?: File[]; // Optional list of files associated with the category
  category_journal_entries?: JournalEntry[]; // Optional list of journal entries associated with the category
  category_training_examples?: TrainingExample[]; // Optional list of training examples associated with the category

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
// --- Public-facing docs (Supabase Storage Bucket: 'docs')
export interface DocFile {
  id: string         // derived from file name
  name: string
  path: string       // relative path in storage
  type: string       // mimetype
  size: number       // bytes
  created_at?: string
  url: string        // public URL
}

export interface FileMeta {
  id: string
  name: string
  path: string
  type: string
  size: number
  url: string
  created_at?: string


}
