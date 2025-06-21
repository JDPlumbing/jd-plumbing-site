import InvoicesTable from '@/components/admin/InvoicesTable'

export default function InvoicesPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <InvoicesTable />
    </main>
  )
}
