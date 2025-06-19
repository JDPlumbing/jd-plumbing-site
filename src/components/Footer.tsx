import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-gray-400 text-sm py-6 px-6 border-t border-gray-800 mt-8">
      <div className="text-xs text-gray-500 mt-4 text-center space-x-4">
        <Link href="/journal" className="hover:underline">Journal</Link>
        <Link href="/train" className="hover:underline">Training</Link>
        <Link href="/terms" className="hover:underline">Terms</Link>
        <span className="text-gray-600">|</span>
        <Link href="/admin" className="text-gray-600 hover:underline">Admin</Link>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>📞 754.444.7057 | 📧 admin@jdplumbingsoflo.com</p>
        <p>License #CFC1428158 | Fully insured</p>
      </div>
    </footer>
  );
}
