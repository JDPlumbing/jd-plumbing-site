'use client'
import { useEffect, useState } from 'react'
import { fetchSchedules } from '@/lib/schedules'
import ScheduleEditor from './ScheduleEditor'

export default function SchedulesTable() {
  const [schedules, setSchedules] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  const load = () => {
    setLoading(true)
    fetchSchedules().then((data) => {
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
          onClick={() => setSelected({})}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          + Add Schedule
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Date</th>
            <th className="p-2">Title</th>
            <th className="p-2">Type</th>
            <th className="p-2">Person</th>
            <th className="p-2">Project</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelected(item)}
            >
              <td className="p-2">{item.scheduled_for?.split('T')[0]}</td>
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.type}</td>
              <td className="p-2">{item.person_id?.slice(0, 6) || '-'}</td>
              <td className="p-2">{item.project_id?.slice(0, 6) || '-'}</td>
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