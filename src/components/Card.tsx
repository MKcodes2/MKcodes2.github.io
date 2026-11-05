import { Link } from 'react-router-dom'

interface CardProps {
  to: string
  title: string
  text: string
  eyebrow?: string
  large?: boolean
  accent?: 'biology' | 'coding' // colour of the border and the hover glow
  image?: string // optional illustration shown to the left of the text
}

// Each world keeps its colour on the border at all times (purple for Molecular Biology,
// cyan for Software); hovering makes the border brighter and adds a matching glow.
const tone = {
  biology: 'border-[#a78bfa]/45 hover:border-[#a78bfa]/80 hover:shadow-[0_0_40px_-6px_rgba(167,139,250,0.55)]',
  coding: 'border-[#7cc8f5]/45 hover:border-[#7cc8f5]/80 hover:shadow-[0_0_40px_-6px_rgba(124,200,245,0.55)]',
}

export default function Card({ to, title, text, eyebrow, large, accent, image }: CardProps) {
  return (
    <Link
      to={to}
      className={`group flex h-full ${image ? 'items-center' : 'items-start'} gap-6 rounded-3xl border bg-surface backdrop-blur-sm p-6 transition-all duration-300 hover:bg-white/[0.05] ${accent ? tone[accent] : 'border-line hover:border-lavender/60'} ${large ? 'sm:p-10 sm:gap-8' : ''}`}
    >
      {image && (
        // Fixed-size box, image fitted inside: the tall DNA and the wider computer take the
          // same space, so the text in both cards starts at the same place.
          <div className="flex h-36 w-20 sm:h-48 sm:w-28 shrink-0 items-center justify-center">
            <img src={image} alt="" aria-hidden className="max-h-full max-w-full object-contain select-none" draggable={false} />
          </div>
      )}
      <div>
        {eyebrow && <p className="label mb-3">{eyebrow}</p>}
        <h3 className={`font-bold tracking-tight ${large ? 'text-3xl sm:text-4xl' : 'text-xl'}`}>{title}</h3>
        <p className="mt-3 text-muted">{text}</p>
        {/* Same colour as the card's border (purple or cyan); gradient when there is no accent. */}
        <span className={`mt-6 inline-block text-base font-medium ${accent === 'biology' ? 'text-[#a78bfa]' : accent === 'coding' ? 'text-[#7cc8f5]' : 'gradient-text'}`}>Explore →</span>
      </div>
    </Link>
  )
}
