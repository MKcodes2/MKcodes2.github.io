import { useEffect, useRef } from 'react'

// Animated background: a dark gradient with slowly drifting purple dots, drawn on a canvas.
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
    let dots: { x: number; y: number; r: number; vx: number; vy: number; a: number; tw: number }[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((w * h) / 2500) // denser on bigger screens
      // Every dot drifts to the right, like a gentle wind. Speeds vary a lot,
      // and closer (bigger, brighter) dots move faster, which gives a sense of depth.
      dots = Array.from({ length: count }, () => {
        const depth = Math.random() ** 3 // most dots small and far away, a few close
        const bright = Math.random() < 0.03 // a few highlighted dots
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: bright ? 1.8 + Math.random() * 0.8 : 0.3 + depth * 1.1,
          vx: 0.05 + depth * 0.55 + (bright ? 0.4 : 0),
          vy: (Math.random() - 0.5) * 0.05,
          a: bright ? 0.9 : 0.15 + depth * 0.45,
          tw: Math.random() * Math.PI * 2,
        }
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        d.x = (d.x + d.vx + w) % w
        d.y = (d.y + d.vy + h) % h
        d.tw += 0.01
        const alpha = d.a * (0.6 + 0.4 * Math.sin(d.tw))
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(130, 118, 235, ${alpha})`
        ctx.fill()
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
