'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Jobs', href: '/admin/jobs' },
  { name: 'Quotes', href: '/admin/quotes' },
  { name: 'Schedules', href: '/admin/schedules' },
  { name: 'Invoices', href: '/admin/invoices' },
  { name: 'Files', href: '/admin/files' },
  { name: 'Journal', href: '/admin/journal' },
  { name: 'Pages', href: '/admin/pages' },
  { name: 'Settings', href: '/admin/settings' }
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 space-y-2">
      <h2 className="text-xl font-bold mb-4">Admin</h2>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`block px-3 py-2 rounded hover:bg-gray-700 ${
            pathname === link.href ? 'bg-gray-800' : ''
          }`}
        >
          {link.name}
        </Link>
      ))}
    </aside>
  )
}
