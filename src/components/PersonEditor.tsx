'use client'

import { useState } from 'react'
import { updatePerson } from '@/lib/people'
import { Person } from '@/types'

export default function PersonEditor({
  person,
  onUpdated
}: {
  person: Person
  onUpdated: () => void
}) {
  const [name, setName] = useState(person.name)
  const [email, setEmail] = useState(person.email || '')
  const [phone, setPhone] = useState(person.phone || '')
  const [role, setRole] = useState(person.role)
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)
    try {
      await updatePerson(person.id, { name, email, phone, role })
      onUpdated()
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'border rounded p-2 w-full bg-white text-black dark:bg-gray-800 dark:text-white'

  return (
    <div className="space-y-2 mt-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={inputClass}
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as Person['role'])}
        className={inputClass}
      >
        <option value="admin">Admin</option>
        <option value="agent">Agent</option>
        <option value="customer">Customer</option>
        <option value="system">System</option>
      </select>
      <button
        onClick={save}
        disabled={saving}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
    </div>
  )
}
