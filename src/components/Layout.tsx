import type { ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Starfield from './Starfield'

export default function Layout({ children }: { children: ReactNode }) {
  // Scrolling to the top on a page change happens in App, after the old page has faded out.
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-clip">
      <Starfield />
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-8">{children}</main>
      <Footer />
    </div>
  )
}
