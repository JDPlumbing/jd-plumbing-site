'use client'

import TasksTable from '@/components/admin/TasksTable'

export default function AdminTasksPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Tasks</h1>
      <TasksTable />
    </div>
  )
}
