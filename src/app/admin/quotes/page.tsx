'use client'

import { useEffect, useState } from 'react'

type LineItem = { description: string; cost: number }
type Quote = {
  customer: string
  contact: string
  status: string
  items: LineItem[]
  createdAt: string
  filename: string
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [customer, setCustomer] = useState('')
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState('Draft')
  const [items, setItems] = useState<LineItem[]>([{ description: '', cost: 0 }])

  const addItem = () => setItems([...items, { description: '', cost: 0 }])
  const updateItem = (i: number, key: keyof LineItem, value: any) => {
    const copy = [...items]
    copy[i][key] = key === 'cost' ? parseFloat(value) : value
    setItems(copy)
  }

  const total = items.reduce((sum, i) => sum + (i.cost || 0), 0)

  const submit = async () => {
    const body = { customer, contact, status, items }
    await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    resetForm()
    await refresh()
  }

  const resetForm = () => {
    setCustomer('')
    setContact('')
    setStatus('Draft')
    setItems([{ description: '', cost: 0 }])
  }

  const refresh = async () => {
    const res = await fetch('/api/quotes')
    const data = await res.json()
    setQuotes(data)
  }

  const deleteQuote = async (filename: string) => {
    const confirmed = confirm(`Delete "${filename}"?`)
    if (!confirmed) return
    await fetch('/api/quotes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename }),
    })
    await refresh()
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Quotes</h1>

      <div className="space-y-2 border border-neutral-700 p-4 rounded bg-neutral-800 text-white">
        <input
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          placeholder="Customer Name"
          className="w-full bg-neutral-900 border p-2 rounded"
        />
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact Info"
          className="w-full bg-neutral-900 border p-2 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-neutral-900 border p-2 rounded w-full"
        >
          {['Draft', 'Sent', 'Accepted'].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item.description}
              onChange={(e) => updateItem(i, 'description', e.target.value)}
              placeholder="Item description"
              className="w-3/4 bg-neutral-900 border p-2 rounded"
            />
            <input
              type="number"
              value={item.cost}
              onChange={(e) => updateItem(i, 'cost', e.target.value)}
              placeholder="Cost"
              className="w-1/4 bg-neutral-900 border p-2 rounded"
            />
          </div>
        ))}

        <div className="flex justify-between mt-2">
          <button onClick={addItem} className="text-blue-400 text-sm">
            + Add Line
          </button>
          <div className="text-right font-semibold">Total: ${total.toFixed(2)}</div>
        </div>

        <button onClick={submit} className="bg-green-600 text-white px-4 py-2 rounded mt-4">
          Save Quote
        </button>
      </div>

      <div className="space-y-4">
        {quotes.map((q, idx) => (
          <div key={idx} className="border p-4 rounded bg-neutral-900 text-white">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-lg">{q.customer}</div>
                <div className="text-sm text-neutral-400">{q.contact}</div>
              </div>
              <div className="text-sm text-neutral-300">{q.status}</div>
            </div>
            <ul className="mt-2 space-y-1 text-sm">
              {q.items.map((item, i) => (
                <li key={i}>
                  - {item.description} (${item.cost.toFixed(2)})
                </li>
              ))}
            </ul>
            <div className="mt-2 text-sm text-neutral-400">
              Total: ${q.items.reduce((sum, i) => sum + i.cost, 0).toFixed(2)} —{' '}
              {new Date(q.createdAt).toLocaleString()}
            </div>
            <div className="flex gap-4 mt-2 text-sm">
              <button
                className="text-red-400"
                onClick={() => deleteQuote(q.filename)}
              >
                Delete
              </button>
              <button
                className="text-blue-400"
                onClick={() => alert('PDF/HTML download coming soon')}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
