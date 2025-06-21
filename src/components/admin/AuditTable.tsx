'use client'
import { useEffect, useState } from 'react'
import { listAuditLogs } from '@/lib/audit'
import type { AuditLog } from '@/types'

export default function AuditTable() {
  const [logs, setLogs] = useState<AuditLog[]>([])

  useEffect(() => {
    const fetch = async () => {
      const data = await listAuditLogs()
      setLogs(data)
    }
    fetch()
  }, [])

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-bold mb-4">Audit Table</h2>
      <table className="min-w-full text-sm border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Actor</th>
            <th className="p-2 border">Action</th>
            <th className="p-2 border">Target</th>
            <th className="p-2 border">Meta</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="p-2 border">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="p-2 border">{log.actor_id}</td>
              <td className="p-2 border">{log.action}</td>
              <td className="p-2 border">{log.target_type} ({log.target_id})</td>
              <td className="p-2 border text-xs whitespace-pre-wrap">
                {JSON.stringify(log.meta || {}, null, 2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
