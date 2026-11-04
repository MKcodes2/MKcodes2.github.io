import { Link } from 'react-router-dom'

interface CardProps {
  to: string
  title: string
  text: string
  eyebrow?: string
  large?: boolean
}

export default function Card({ to, title, text, eyebrow, large }: CardProps) {
  return (
    <Link
      to={to}
      className={`group block h-full rounded-3xl border border-line bg-surface backdrop-blur-sm p-6 transition-all hover:border-lavender/60 hover:bg-white/[0.05] ${large ? 'sm:p-10' : ''}`}
    >
      {eyebrow && <p className="label mb-3">{eyebrow}</p>}
      <h3 className={`font-bold tracking-tight ${large ? 'text-3xl sm:text-4xl' : 'text-xl'}`}>{title}</h3>
      <p className="mt-3 text-muted">{text}</p>
      <span className="mt-6 inline-block text-sm gradient-text">Explore →</span>
    </Link>
  )
}
