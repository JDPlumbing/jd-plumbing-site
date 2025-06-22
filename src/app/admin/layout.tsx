// At the top of src/app/admin/layout.tsx

import AdminSidebar from '@/components/admin/AdminSidebar';
// Or whatever the correct relative path is
// import AdminSidebar from './AdminSidebar';
// import AdminSidebar from '../../components/AdminSidebar';
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 bg-gray-100 dark:bg-black p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    );
  } catch (err) {
    // This will print whatever was thrown—so you see the real object!
    console.error("Caught error in AdminLayout:", err, JSON.stringify(err));
    return <pre>{JSON.stringify(err, null, 2)}</pre>;
  }
}
