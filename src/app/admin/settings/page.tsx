'use client'

import { useEffect, useState } from 'react'

export default function SettingsPage() {
  const [model, setModel] = useState('')
  const [schemas, setSchemas] = useState<string[]>([])
  const [availableSchemas, setAvailableSchemas] = useState<string[]>([])

  // Load available schemas from file system
  useEffect(() => {
    fetch('/api/schemas')
      .then(res => res.json())
      .then(data => setAvailableSchemas(data))
  }, [])

  // Load existing settings
  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setModel(data.defaultModel)
        setSchemas(data.defaultSchemas || [])
      })
  }, [])

  const toggleSchema = (s: string) => {
    setSchemas(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  const save = async () => {
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        defaultModel: model,
        defaultSchemas: schemas,
      }),
    })
    alert('Settings saved')
  }

  return (
    <div className="p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-2">
        <label className="block">Model</label>
        <input
          className="p-2 bg-neutral-800 rounded w-full"
          value={model}
          onChange={e => setModel(e.target.value)}
          placeholder="e.g. gpt-4"
        />
      </div>

      <div className="space-y-2">
        <label className="block">Default Schemas</label>
        <div className="flex flex-wrap gap-2">
          {availableSchemas.map(s => (
            <button
              key={s}
              onClick={() => toggleSchema(s)}
              className={`px-2 py-1 rounded ${
                schemas.includes(s)
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-700 text-gray-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={save}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        💾 Save Settings
      </button>
    </div>
  )
}
