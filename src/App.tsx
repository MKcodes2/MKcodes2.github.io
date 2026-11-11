import { AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import WorldHub from './pages/WorldHub'
import Detail from './pages/Detail'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const latest = useRef(location)
  latest.current = location
  // Go to the top only once the old page has faded out, so its top never flashes on screen.
  // Links to a home section (About, Honours…) skip this: Home jumps straight to the section.
  const toTop = () => {
    if (!(latest.current.state as { section?: string } | null)?.section) window.scrollTo(0, 0)
  }
  return (
    <Layout>
      <AnimatePresence mode="wait" onExitComplete={toTop}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/coding" element={<WorldHub world="coding" />} />
          <Route path="/coding/:slug" element={<Detail world="coding" />} />
          <Route path="/biology" element={<WorldHub world="biology" />} />
          <Route path="/biology/:slug" element={<Detail world="biology" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}
