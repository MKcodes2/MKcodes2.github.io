import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import WorldHub from './pages/WorldHub'
import Detail from './pages/Detail'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  return (
    <Layout>
      <AnimatePresence mode="wait">
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
