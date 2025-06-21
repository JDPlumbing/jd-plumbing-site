'use client'

import { useEffect, useState } from 'react'
import { fetchProjects } from '@/lib/projects'
import type { Project } from '@/types'
import ProjectEditor from './ProjectEditor'

export default function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Project | null>(null)

  const load = () => {
    setLoading(true)
    fetchProjects().then((data: Project[]) => {
      setProjects(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <p>Loading projects...</p>

  return (
    <div className="p-4 border rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Projects</h2>
        <button
          onClick={() =>
            setSelected({
              id: '',
              title: '',
              name: '',
              description: '',
              start_date: '',
              end_date: '',
              status: 'planning',
              customer_id: '',
              created_at: '',
            })
          }
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          + New Project
        </button>
      </div>

      <table className="w-full text-left border">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Status</th>
            <th className="p-2">Start</th>
            <th className="p-2">End</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr
              key={p.id}
              className="border-t cursor-pointer hover:bg-gray-100"
              onClick={() => setSelected(p)}
            >
              <td className="p-2">{p.id.slice(0, 8)}...</td>
              <td className="p-2">{p.title}</td> // ✅ fix this line

              <td className="p-2">{p.status}</td>
              <td className="p-2">{p.start_date || '—'}</td>
              <td className="p-2">{p.end_date || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <ProjectEditor
          initial={selected}
          onClose={() => setSelected(null)}
          onSave={() => {
            setSelected(null)
            load()
          }}
        />
      )}
    </div>
  )
}
