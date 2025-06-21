'use client'
import { useEffect, useRef, useState } from 'react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [...messages, userMessage] }),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()
    const botMessage: Message = {
      id: Date.now().toString() + '-bot',
      role: 'assistant',
      content: data?.reply || '(No response)'
    }
    setMessages((prev) => [...prev, botMessage])
    setLoading(false)
  }

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto border rounded shadow mt-4">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-2 rounded ${
              m.role === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'
            }`}
          >
            <strong>{m.role === 'user' ? 'You' : 'Drippy'}:</strong> {m.content}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
      <div className="p-4 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Ask me anything..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}