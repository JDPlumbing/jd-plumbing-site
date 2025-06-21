'use client'
import { useState } from 'react'
import { createInvoice, updateInvoice, deleteInvoice } from '@/lib/invoices'
import type { Invoice } from '@/types'

interface Props {
  initial: Invoice
  onClose: () => void
  onSave: () => void
}
export default function InvoiceEditor({ initial, onClose, onSave }: Props) {

  const [form, setForm] = useState({
    job_id: initial?.job_id || '',
    total_amount: initial?.total_amount || 0,
    status: initial?.status || 'draft',
    due_date: initial?.due_date || ''
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    if (initial?.id) {
      await updateInvoice(initial.id, form)
    } else {
      await createInvoice(form)
    }
    setSaving(false)
    onSave()
  }

  const handleDelete = async () => {
    if (initial?.id && confirm('Delete this invoice?')) {
      await deleteInvoice(initial.id)
      onSave()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">
          {initial?.id ? 'Edit Invoice' : 'New Invoice'}
        </h3>

        <label className="block mb-2">
          Job ID
          <input
            className="w-full border p-2"
            value={form.job_id}
            onChange={(e) => setForm({ ...form, job_id: e.target.value })}
          />
        </label>

        <label className="block mb-2">
          Amount
          <input
            type="number"
            className="w-full border p-2"
            value={form.total_amount}
            onChange={(e) => setForm({ ...form, total_amount: parseFloat(e.target.value) })}
          />
        </label>

        <label className="block mb-2">
          Status
          <select
            className="w-full border p-2"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as Invoice['status'] })
            }

          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

        <label className="block mb-4">
          Due Date
          <input
            type="date"
            className="w-full border p-2"
            value={form.due_date}
            onChange={(e) => setForm({ ...form, due_date: e.target.value })}
          />
        </label>

        <div className="flex justify-between items-center">
          {initial?.id && (
            <button onClick={handleDelete} className="text-red-600">
              Delete
            </button>
          )}
          <div className="flex gap-2">
            <button onClick={onClose}>Cancel</button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-1 rounded"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}