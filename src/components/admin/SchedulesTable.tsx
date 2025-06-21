'use client'

import { useEffect, useState } from 'react'
import { fetchSchedules } from '@/lib/schedules'
import type { Schedule } from '@/types'
import ScheduleEditor from './ScheduleEditor'

export default function SchedulesTable() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Schedule | null>(null)

  const load = () => {
    setLoading(true)
    fetchSchedules().then((data: Schedule[]) => {
      setSchedules(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Schedules</h2>
        <button
          onClick={() =>
            setSelected({
                id: '',
                title: '',
                start_time: '',
                end_time: '',
                description: '',
                job_id: '',
                assigned_to: '',
                location: '',
                created_at: '',
                type: 'visit', // ✅ add this
                scheduled_for: '', // ✅ and this
              })

          }
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          + Add Schedule
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Start</th>
            <th className="p-2">Title</th>
            <th className="p-2">Location</th>
            <th className="p-2">Person</th>
            <th className="p-2">Job</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelected(item)}
            >
              <td className="p-2">{item.start_time?.split('T')[0] || '—'}</td>
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.location || '—'}</td>
              <td className="p-2">{item.assigned_to?.slice(0, 6) || '-'}</td>
              <td className="p-2">{item.job_id?.slice(0, 6) || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <ScheduleEditor
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
