import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { contact, profile } from '../content'
import { useSectionNav } from './useSectionNav'

type Item = { label: string; section?: string; to?: string }

const items: Item[] = [
  { label: 'About', section: 'about' },
  { label: 'Molecular Biology work', to: '/biology' },
  { label: 'Coding projects', to: '/coding' },
  { label: 'Honours & Awards', section: 'honours' },
  { label: 'Contact', section: 'contact' },
]

const linkClass = 'nav-sweep text-sm'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const goTo = useSectionNav()
  const { pathname } = useLocation()

  // Clicking the name always brings you back to the top of the home page. If we're already
  // on the home page, the router has nowhere new to go, so we scroll up ourselves.
  const goHome = () => {
    setOpen(false)
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderItem = (item: Item, onClick?: () => void) =>
    item.to ? (
      <NavLink key={item.label} to={item.to} onClick={onClick}
        className={({ isActive }) => (isActive ? 'text-sm text-text' : linkClass)}>
        {item.label}
      </NavLink>
    ) : (
      <button key={item.label} type="button" className={`${linkClass} text-left`}
        onClick={() => { goTo(item.section!); onClick?.() }}>
        {item.label}
      </button>
    )

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/40 backdrop-blur-md">
      {/* Edge padding in vw keeps the name and buttons at the same distance from the screen edges,
          even when zooming. The 1fr | auto | 1fr grid keeps the links centred between them. */}
      <div className="grid h-16 grid-cols-[1fr_auto] xl:grid-cols-[1fr_auto_1fr] items-center gap-6 px-[3vw]">
        <Link to="/" onClick={goHome} className="sweep-light justify-self-start whitespace-nowrap font-bold tracking-tight text-lg">
          {profile.name}
        </Link>

        <nav className="hidden xl:flex items-center gap-8 whitespace-nowrap">{items.map((i) => renderItem(i))}</nav>

        <div className="hidden xl:flex items-center justify-self-end gap-3 whitespace-nowrap">
          <a href={contact.cv} download
            className="brand-button rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(106,124,246,0.45)] hover:brightness-110">
            Download CV ↓
          </a>
          <a href={`mailto:${contact.email}`}
            className="outline-button rounded-full px-5 py-2.5 text-sm font-medium">
            Let’s Talk ↗
          </a>
        </div>

        <button type="button" className="xl:hidden justify-self-end text-sm rounded-full border border-line px-4 py-2"
          aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="xl:hidden flex flex-col gap-4 border-t border-line px-[3vw] py-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {items.map((i) => renderItem(i, () => setOpen(false)))}
            <div className="flex gap-3 pt-2">
              <a href={contact.cv} download className="brand-button rounded-full px-4 py-2 text-sm text-white">Download CV ↓</a>
              <a href={`mailto:${contact.email}`} className="outline-button rounded-full px-4 py-2 text-sm">Let’s Talk ↗</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
