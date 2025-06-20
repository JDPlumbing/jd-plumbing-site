// src/app/admin/page.tsx
export default function AdminHome() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">🛠 JD Admin Dashboard</h1>
      <p className="text-gray-400 mb-6">Pick a module to get started:</p>
      <ul className="space-y-2 underline text-blue-400">
        <li><a href="/admin/journal">📝 Journal</a></li>
        <li><a href="/admin/files">🗂 Files</a></li>
        <li><a href="/admin/quotes">💸 Quotes</a></li>
        <li><a href="/admin/pages">📄 Pages</a></li>
        <li><a href="/admin/train">📦 Training</a></li>
        <li><a href="/admin/settings">⚙️ Settings</a></li>
      </ul>
    </div>
  )
}
