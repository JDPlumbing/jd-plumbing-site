'use client'
import { useEffect, useState } from 'react'
import { fetchInvoices } from '@/lib/invoices'
import InvoiceEditor from './InvoiceEditor'

export default function InvoicesTable() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  const load = () => {
    setLoading(true)
    fetchInvoices().then((data) => {
      setInvoices(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <p>Loading invoices...</p>

  return (
    <div className="p-4 border rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Invoices</h2>
        <button
          onClick={() => setSelected({})}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          + New Invoice
        </button>
      </div>

      <table className="w-full text-left border">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Job</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Due</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr
              key={inv.id}
              className="border-t cursor-pointer hover:bg-gray-100"
              onClick={() => setSelected(inv)}
            >
              <td className="p-2">{inv.id.slice(0, 8)}...</td>
              <td className="p-2">{inv.job_id}</td>
              <td className="p-2">${inv.total_amount?.toFixed(2)}</td>
              <td className="p-2">{inv.status}</td>
              <td className="p-2">{inv.due_date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <InvoiceEditor
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