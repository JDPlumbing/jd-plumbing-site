'use client'

import { useEffect, useState } from 'react'
import TrainingExampleEditor from '@/components/TrainingExampleEditor'

export default function TrainPage() {
  const [entries, setEntries] = useState<any[]>([])
  const [schemaList, setSchemaList] = useState<string[]>([])
  const [selectedSchemas, setSelectedSchemas] = useState<string[]>([])

  const load = async () => {
    const res = await fetch('/api/train')
    const data = await res.json()
    setEntries(data.reverse())
  }

  useEffect(() => {
    load()
    fetch('/api/internal/schema-list')
      .then(res => res.json())
      .then(data => setSchemaList(data.schemas || []))
  }, [])

  const toggleSchema = (tag: string) => {
    setSelectedSchemas(prev =>
      prev.includes(tag)
        ? prev.filter(s => s !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">🧠 Drippy Training Playground</h1>

      <div>
        <label className="font-semibold block mb-1">Schemas:</label>
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto border border-neutral-700 rounded p-2 bg-neutral-900 text-white">
          {schemaList.map(tag => (
            <button
              key={tag}
              onClick={() => toggleSchema(tag)}
              className={`px-2 py-1 rounded text-sm ${
                selectedSchemas.includes(tag)
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-700 text-gray-300 hover:bg-neutral-600'
              }`}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <TrainingExampleEditor onSaved={load} schemaRefs={selectedSchemas} />

      <div className="mt-6 space-y-4">
        {entries.map((e, i) => (
          <div key={i} className="border p-4 rounded bg-neutral-800 text-white">
            <p className="text-sm text-gray-400">{e.timestamp}</p>
            <p><b>Input:</b> {e.input}</p>
            <p><b>Expected:</b> {e.expected}</p>
            <div className="text-sm text-gray-300">
              <span className="mr-4">🎯 {e.intent}</span>
              <span className="mr-4">🔧 grip: {e.grip}</span>
              <span className="mr-4">🚿 drip: {e.drip}</span>
              <span className="mr-4">🧩 scrip: {e.scrip}</span>
            </div>
            {e.schemaRefs?.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Schema Context: {e.schemaRefs.join(', ')}
              </p>
            )}
            {e.notes && <p className="text-xs italic mt-1">💬 {e.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
