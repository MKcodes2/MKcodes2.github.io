import type { CSSProperties } from 'react'

// A small, still stack of document pages with no frame or background. The top sheet cross-dissolves
// from one page to the next every 3.2 s and starts again after the last page (animation in index.css,
// .page-stack). With reduced motion it shows the first page only. With an href, the stack opens that document.
const SHOW = 3.2 // seconds per page
const FADE = 0.8 // seconds of each dissolve

export default function PageStack({ pages, href }: { pages: string[]; href?: string }) {
  const cycle = pages.length * SHOW
  const label = 'The pages of my thesis excerpt, one after another'
  const stack = (
    <div className="page-stack" style={{ '--cycle': `${cycle}s` } as CSSProperties}>
      {[3, 2, 1].map((d) => (
        <div key={d} className="page-stack-sheet" style={{ transform: `translate(calc(${d} * var(--sheet)), calc(${d} * var(--sheet)))` }} />
      ))}
      <div className="page-stack-top">
        {pages.map((src, i) => (
          // Page i starts fading in FADE seconds before its turn, so it is fully shown when its turn starts.
          <img key={src} src={src} alt="" width={1190} height={1684} draggable={false}
            style={{ animationDelay: `${-((cycle - (i * SHOW - FADE)) % cycle)}s` }} />
        ))}
      </div>
    </div>
  )
  return href ? (
    // The stack lifts a little on hover, and a short line under it says what a click does.
    <a href={href} target="_blank" rel="noreferrer" aria-label={`${label} (opens the excerpt in a new tab)`} className="group relative block rounded-lg">
      <div className="transition-transform duration-300 group-hover:-translate-y-1.5">{stack}</div>
      <span aria-hidden className="mt-4 block lg:absolute lg:inset-x-0 lg:top-[calc(100%+18px)] text-center text-sm text-muted transition-colors duration-300 group-hover:text-[#c4b1ff]">Read the 4-page excerpt ↗</span>
    </a>
  ) : (
    <div role="img" aria-label={label}>{stack}</div>
  )
}
