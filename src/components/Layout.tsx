import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import Starfield from './Starfield'

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname, state } = useLocation()
  // Start every new page at the top, unless we were sent to a specific section.
  useEffect(() => {
    if (!(state as { section?: string } | null)?.section) window.scrollTo(0, 0)
  }, [pathname, state])

  return (
    <div className="relative min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-8">{children}</main>
      <Footer />
    </div>
  )
}
