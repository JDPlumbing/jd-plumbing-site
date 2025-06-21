'use client'

import { useEffect, useState } from 'react'
import { fetchEstimates } from '@/lib/estimates'
import type { Estimate } from '@/types'
import EstimateEditor from './EstimateEditor'

export default function EstimatesTable() {
  const [estimates, setEstimates] = useState<Estimate[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Estimate | null>(null)

  const load = () => {
    setLoading(true)
    fetchEstimates().then((data: Estimate[]) => {
      setEstimates(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <p>Loading estimates...</p>

  return (
    <div className="p-4 border rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Estimates</h2>
        <button
          onClick={() =>
            setSelected({
              id: '',
              job_id: '',
              labor_hours: 0,
              material_cost: 0,
              total: 0,
              notes: '',
              created_at: '',
              title: '',
              scope: '',
              exclusions: '',
              verified: false,
              total_amount: 0,
            } as Estimate)
          }
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          + New Estimate
        </button>
      </div>

      <table className="w-full text-left border">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Verified</th>
          </tr>
        </thead>
        <tbody>
          {estimates.map((e) => (
            <tr
              key={e.id}
              className="border-t cursor-pointer hover:bg-gray-100"
              onClick={() => setSelected(e)}
            >
              <td className="p-2">{e.id.slice(0, 8)}...</td>
              <td className="p-2">{(e as any).title || '—'}</td>
              <td className="p-2">${e.total_amount?.toFixed(2) || '0.00'}</td>

              <td className="p-2">{(e as any).verified ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <EstimateEditor
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
