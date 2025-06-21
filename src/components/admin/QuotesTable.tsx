'use client'
import { useEffect, useState } from 'react'
import { fetchQuotes } from '@/lib/quotes'
import QuoteEditor from './QuoteEditor'

export default function QuotesTable() {
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  const load = () => {
    setLoading(true)
    fetchQuotes().then((data) => {
      setQuotes(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <p>Loading quotes...</p>

  return (
    <div className="p-4 border rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Quotes</h2>
        <button
          onClick={() => setSelected({})}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          + New Quote
        </button>
      </div>

      <table className="w-full text-left border">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Status</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q) => (
            <tr
              key={q.id}
              className="border-t cursor-pointer hover:bg-gray-100"
              onClick={() => setSelected(q)}
            >
              <td className="p-2">{q.id.slice(0, 8)}...</td>
              <td className="p-2">{q.title}</td>
              <td className="p-2">{q.status}</td>
              <td className="p-2">${q.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <QuoteEditor
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