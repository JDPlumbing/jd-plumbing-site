'use client'

import { useEffect, useState } from 'react'

export default function AdminLab() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [schemaList, setSchemaList] = useState<string[]>([])
  const [selectedSchemas, setSelectedSchemas] = useState<string[]>([])

  useEffect(() => {
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

  const run = async () => {
    const res = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        schemaRefs: selectedSchemas,
      }),
    })
    const data = await res.json()
    setResponse(data.output || JSON.stringify(data, null, 2))
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">🧠 Drippy Agent Playground</h1>

      <div>
        <label className="font-semibold block mb-1">Prompt Input:</label>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          className="w-full h-40 p-2 rounded bg-neutral-900 text-white"
        />
      </div>

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

      <button onClick={run} className="bg-blue-600 text-white px-4 py-2 rounded">
        Run Agent
      </button>

      {response && (
        <div className="bg-neutral-800 p-4 rounded whitespace-pre-wrap text-sm text-green-300">
          <strong className="text-white">🧠 Response:</strong>
          <pre className="mt-2">{response}</pre>
        </div>
      )}
    </div>
  )
}
