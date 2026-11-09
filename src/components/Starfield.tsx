import { useEffect, useRef } from 'react'

// Animated background drawn on a canvas: a near-black sky with tiny drifting "stars".
// MODE 'letters': the stars are DNA bases (A T C G, purple = biology) and bits (0 1, cyan = software).
// MODE 'dots': plain purple dots. Switch here to compare.
const MODE: 'letters' | 'dots' = 'letters'

// Letter sizes in px: most letters are near MIN_SIZE (far away), a few reach MAX_SIZE (close).
const MIN_SIZE = 5
const MAX_SIZE = 11

const BIO = { chars: ['A', 'T', 'C', 'G'], rgb: '167, 139, 250' } // purple
const CODE = { chars: ['0', '1'], rgb: '124, 200, 245' } // cyan

type Star = { x: number; y: number; vx: number; vy: number; a: number; tw: number; depth: number; char: string; rgb: string; bright: boolean }

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let frame = 0
    let stars: Star[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Letters take more room than dots, so there are fewer of them.
      const count = Math.round((w * h) / (MODE === 'letters' ? 3000 : 2500))
      // Everything drifts to the right, like a gentle wind. Perspective: size and speed both
      // follow depth, so the big (close) letters move clearly faster than the small (far) ones.
      stars = Array.from({ length: count }, () => {
        const bright = Math.random() < 0.03
        const depth = bright ? 0.85 + Math.random() * 0.15 : Math.random() ** 2.5 // most far away, a few close
        const set = Math.random() < 0.5 ? BIO : CODE
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0.02 + depth * 0.5,
          vy: (Math.random() - 0.5) * 0.05,
          a: bright ? 0.8 : 0.12 + depth * 0.4,
          tw: Math.random() * Math.PI * 2,
          depth,
          char: set.chars[Math.floor(Math.random() * set.chars.length)],
          rgb: MODE === 'letters' ? set.rgb : '130, 118, 235',
          bright,
        }
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (const s of stars) {
        s.x = (s.x + s.vx + w) % w
        s.y = (s.y + s.vy + h) % h
        s.tw += 0.01
        const alpha = s.a * (0.6 + 0.4 * Math.sin(s.tw))
        ctx.fillStyle = `rgba(${s.rgb}, ${alpha})`
        if (MODE === 'letters') {
          const size = MIN_SIZE + s.depth * (MAX_SIZE - MIN_SIZE)
          ctx.font = `500 ${size.toFixed(1)}px "JetBrains Mono", ui-monospace, monospace`
          ctx.fillText(s.char, s.x, s.y)
        } else {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.bright ? 1.8 + s.depth : 0.3 + s.depth * 1.1, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      if (!reduce) frame = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
      {/* near-black base with a faint deep-purple glow only at the far right edge */}
      <div className="absolute inset-0 bg-[#08080c]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_90%_at_100%_55%,rgba(48,32,110,0.55)_0%,rgba(30,20,70,0.25)_45%,transparent_75%)] animate-[glow_14s_ease-in-out_infinite_alternate] motion-reduce:animate-none" />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
