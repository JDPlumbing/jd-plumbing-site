'use client'
import { useEffect, useState } from 'react'
import { listAuditLogs } from '@/lib/audit'

export default function AuditLog() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    const result = await listAuditLogs()
    setLogs(result)
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Audit Log</h2>
      <div className="space-y-2">
        {logs.map((log) => (
          <div
            key={log.id}
            className="border border-gray-300 rounded p-3 bg-gray-50 text-sm"
          >
            <div>
              <strong>{log.actor || 'Unknown'}</strong> — {log.action}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(log.created_at).toLocaleString()}
            </div>
            {log.meta && (
              <pre className="text-xs mt-1 bg-gray-100 p-2 rounded overflow-x-auto">
                {JSON.stringify(log.meta, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}