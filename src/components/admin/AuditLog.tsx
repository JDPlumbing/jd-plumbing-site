'use client'
import { useEffect, useState } from 'react'
import { listAuditLogs } from '@/lib/audit'
import type { AuditLog } from '@/types'

export default function AuditLogViewer() {
  const [logs, setLogs] = useState<AuditLog[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      const result = await listAuditLogs()
      setLogs(result)
    }
    fetchLogs()
  }, [])

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Audit Log</h2>
      {logs.map((log) => (
        <div key={log.id} className="border p-3 rounded">
          <p>
            <strong>{log.actor_id || 'Unknown'}</strong> — {log.action}
          </p>
          <p className="text-sm text-gray-600">
            {new Date(log.timestamp).toLocaleString()}
          </p>
          <p className="text-sm">
            Target: {log.target_type} ({log.target_id})
          </p>
          {log.meta && (
            <pre className="bg-gray-100 p-2 mt-2 text-xs rounded overflow-x-auto">
              {JSON.stringify(log.meta, null, 2)}
            </pre>
          )}
        </div>
      ))}
    </div>
  )
}
