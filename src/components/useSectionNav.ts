import { useLocation, useNavigate } from 'react-router-dom'

// Scroll to a section of the home page, going back to the home page first if needed.
export function useSectionNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (id: string) => {
    const el = document.getElementById(id)
    if (pathname === '/' || id === 'contact') {
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { section: id } })
    }
  }
}
