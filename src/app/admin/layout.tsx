import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-neutral-950 text-gray-100">
      <aside className="w-64 bg-neutral-900 p-6 border-r border-neutral-800">
        <h2 className="text-xl font-bold mb-6">🔧 Admin Panel</h2>
        <nav className="space-y-3">
        <Link href="/admin/docs" className="block hover:underline">📚 Docs</Link>
        <Link href="/admin/quotes" className="block hover:underline">💸 Quotes</Link>
        <Link href="/admin/journal" className="block hover:underline">📝 Journal</Link>
        <Link href="/admin/pages" className="block hover:underline">🧱 Pages</Link>
        <Link href="/admin/train" className="block hover:underline">📦 Training</Link>
        <Link href="/admin/files" className="block hover:underline">🗂 Files</Link>
        <Link href="/admin/settings" className="block hover:underline">⚙️ Settings</Link>
        </nav>

      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
