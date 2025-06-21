// src/app/admin/jobs/page.tsx
import JobList from '@/components/JobList'

export default function JobsPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Jobs Dashboard</h1>
      <JobList />
    </main>
  )
}
