'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className="w-full bg-neutral-950 border-b border-gray-800 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src="/logo.png"
          alt="JD Plumbing Logo"
          width={48}
          height={48}
          className="rounded"
        />
        <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition">
          JD Plumbing
        </Link>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/" className="hover:text-blue-400 transition">Home</Link>
        <Link href="/services" className="hover:text-blue-400 transition">Services</Link>
        <Link href="/quote" className="hover:text-blue-400 transition">Get a Quote</Link>
        <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
        <Link href="/journal" className="hover:text-blue-400 transition">Journal</Link>
        <span className="text-gray-500 cursor-not-allowed">Training</span>
      </nav>

      <a
        href="tel:7544447057"
        className="ml-4 bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
      >
        Call 754.444.7057
      </a>
    </header>
  );
}
