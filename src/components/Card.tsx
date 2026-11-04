import { Link } from 'react-router-dom'

interface CardProps {
  to: string
  title: string
  text: string
  eyebrow?: string
  large?: boolean
  accent?: 'biology' | 'coding' // colour of the hover glow
}

// Hover glow per world: purple for Molecular Biology, cyan for Software.
const glow = {
  biology: 'hover:border-[#a78bfa]/70 hover:shadow-[0_0_40px_-6px_rgba(167,139,250,0.55)]',
  coding: 'hover:border-[#7cc8f5]/70 hover:shadow-[0_0_40px_-6px_rgba(124,200,245,0.55)]',
}

export default function Card({ to, title, text, eyebrow, large, accent }: CardProps) {
  return (
    <Link
      to={to}
      className={`group block h-full rounded-3xl border border-line bg-surface backdrop-blur-sm p-6 transition-all duration-300 hover:bg-white/[0.05] ${accent ? glow[accent] : 'hover:border-lavender/60'} ${large ? 'sm:p-10' : ''}`}
    >
      {eyebrow && <p className="label mb-3">{eyebrow}</p>}
      <h3 className={`font-bold tracking-tight ${large ? 'text-3xl sm:text-4xl' : 'text-xl'}`}>{title}</h3>
      <p className="mt-3 text-muted">{text}</p>
      <span className="mt-6 inline-block text-sm gradient-text">Explore →</span>
    </Link>
  )
}
