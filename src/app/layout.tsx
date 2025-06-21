import './globals.css'
import { Header }  from '@/components/Header'
import { Footer } from '@/components/Footer'


export const metadata = {
  title: 'JD Plumbing Admin',
  description: 'JD Plumbing SoFlo Admin Panel',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
