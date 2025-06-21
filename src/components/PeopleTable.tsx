'use client'

import { useEffect, useState } from 'react'
import { listPeople, createPerson, deletePerson } from '@/lib/people'
import { Person } from '@/types'
import PersonEditor from './PersonEditor'

export default function PeopleTable() {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState<Person['role']>('agent')
  const [creating, setCreating] = useState(false)

  async function refresh() {
    setLoading(true)
    try {
      const data = await listPeople()
      setPeople(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate() {
    if (!newName) return
    setCreating(true)
    try {
      await createPerson({ name: newName, role: newRole })
      setNewName('')
      refresh()
    } catch (e) {
      console.error(e)
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this person?')) return
    try {
      await deletePerson(id)
      refresh()
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const inputClass =
    'border rounded p-2 mr-2 bg-white text-black dark:bg-gray-800 dark:text-white'

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded shadow bg-gray-50 dark:bg-gray-900">
        <h2 className="text-lg font-semibold mb-2 dark:text-white">Add New Person</h2>
        <input
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className={inputClass}
        />
        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value as Person['role'])}
          className={inputClass}
        >
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
          <option value="customer">Customer</option>
          <option value="system">System</option>
        </select>
        <button
          onClick={handleCreate}
          disabled={creating}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          {creating ? 'Creating...' : 'Add Person'}
        </button>
      </div>

      {people.length === 0 && (
        <div className="text-gray-700 dark:text-gray-300">No people yet.</div>
      )}

      {people.map((person) => (
        <div
          key={person.id}
          className="border p-4 rounded shadow relative bg-white dark:bg-gray-800"
        >
          <button
            onClick={() => handleDelete(person.id)}
            className="absolute top-2 right-2 text-red-500 text-sm"
          >
            🗑 Delete
          </button>
          <h2 className="font-semibold text-lg dark:text-white">{person.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {person.email} • {person.phone}
          </p>
          <p className="text-xs dark:text-gray-400">
            Role: <code>{person.role}</code>
          </p>
          <PersonEditor person={person} onUpdated={refresh} />
        </div>
      ))}
    </div>
  )
}
