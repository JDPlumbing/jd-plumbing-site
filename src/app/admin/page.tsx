// src/app/admin/page.tsx

import Link from 'next/link'

const tools = [
  {
    href: '/admin/journal',
    title: '📝 Journal',
    description: 'Write, edit, and manage daily logs or research notes.',
  },
  {
    href: '/admin/files',
    title: '🗂 Files',
    description: 'Upload and organize documents, images, and assets.',
  },
  {
    href: '/admin/quotes',
    title: '💸 Quotes',
    description: 'Create and manage service estimates and pricing.',
  },
  {
    href: '/admin/pages',
    title: '📄 Pages',
    description: 'Edit static content and marketing pages.',
  },
  {
    href: '/admin/train',
    title: '📦 Training',
    description: 'Build prompt-response examples for LLM refinement.',
  },
  {
    href: '/admin/settings',
    title: '⚙️ Settings',
    description: 'Configure Drippy, API keys, and schema aliases.',
  },
]

export default function AdminDashboard() {
  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">🛠 JD Admin Dashboard</h1>
      <p className="text-gray-400 mb-10">
        Welcome back. Choose a module to get to work.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block border border-neutral-800 bg-neutral-900 rounded-xl p-6 hover:border-blue-500 transition"
          >
            <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
            <p className="text-gray-400 text-sm">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
