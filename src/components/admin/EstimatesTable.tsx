'use client'
import { useEffect, useState } from 'react'
import { fetchEstimates } from '@/lib/estimates'
import EstimateEditor from './EstimateEditor'

export default function EstimatesTable() {
  const [estimates, setEstimates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  const load = () => {
    setLoading(true)
    fetchEstimates().then((data) => {
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
          onClick={() => setSelected({})}
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
              <td className="p-2">{e.title}</td>
              <td className="p-2">${e.total_amount}</td>
              <td className="p-2">{e.verified ? '✅' : '❌'}</td>
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