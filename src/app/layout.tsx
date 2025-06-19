import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'JD Plumbing',
  description: 'South Florida plumbing done right – licensed, insured, and built on integrity.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-gray-100 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
