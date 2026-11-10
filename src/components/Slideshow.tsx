import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { Slide } from '../content'

// A simple slideshow for presentation slides: one slide at a time, with previous / next buttons,
// a slide counter and a full-screen button. Arrow keys work once it has focus, and on phones a
// swipe turns the slide. Only the current slide is shown; the slides next to it load in the
// background so turning feels instant. With a single image it shows the image only.
// A slide can also be a recording of its animations: it plays once when the slide is reached,
// stops on the finished slide and offers a Replay button. With reduced motion the finished slide
// is shown as a still instead.
const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Slideshow({ slides, alt, ratio = '16 / 9', accentText }: {
  slides: Slide[]
  alt: string
  ratio?: string
  accentText: string
}) {
  const [i, setI] = useState(0)
  const [ended, setEnded] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const startX = useRef<number | null>(null)
  const n = slides.length
  const go = (d: number) => { setEnded(false); setI((v) => (v + d + n) % n) }

  // Warm the cache for the neighbouring slides (for a recording, its first frame).
  useEffect(() => {
    if (n < 2) return
    for (const k of [i + 1, i - 1]) {
      const s = slides[(k + n) % n]
      new Image().src = typeof s === 'string' ? s : s.poster
    }
  }, [i, n, slides])

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  }
  const onDown = (e: PointerEvent) => { if (e.pointerType !== 'mouse') startX.current = e.clientX }
  const onUp = (e: PointerEvent) => {
    if (startX.current === null) return
    const dx = e.clientX - startX.current
    startX.current = null
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
  }
  const canFull = typeof document !== 'undefined' && document.fullscreenEnabled
  const full = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else box.current?.requestFullscreen()
  }
  const replay = () => {
    const v = video.current
    if (!v) return
    v.currentTime = 0
    setEnded(false)
    void v.play()
  }

  const s = slides[i]
  const label = n > 1 ? `${alt}, slide ${i + 1} of ${n}` : alt
  const btn = 'flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-text/40 hover:text-text'

  return (
    <div>
      <div
        ref={box}
        tabIndex={n > 1 ? 0 : undefined}
        onKeyDown={n > 1 ? onKey : undefined}
        onPointerDown={n > 1 ? onDown : undefined}
        onPointerUp={n > 1 ? onUp : undefined}
        role={n > 1 ? 'region' : undefined}
        aria-roledescription={n > 1 ? 'slideshow' : undefined}
        aria-label={n > 1 ? alt : undefined}
        className="slideshow relative overflow-hidden rounded-xl bg-black shadow-[0_20px_40px_-20px_rgb(0_0_0/0.8)] ring-1 ring-white/10 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        style={{ aspectRatio: ratio }}
      >
        {typeof s === 'string' || reduceMotion() ? (
          <img key={i} src={typeof s === 'string' ? s : s.still} alt={label}
            draggable={false} className="slide-fade h-full w-full select-none object-contain" />
        ) : (
          <>
            <video key={i} ref={video} src={s.video} poster={s.poster} aria-label={`${label} (animated)`}
              autoPlay muted playsInline preload="auto" onEnded={() => setEnded(true)}
              className="slide-fade h-full w-full object-contain" />
            {ended && (
              <button type="button" onClick={replay}
                className="absolute bottom-3 right-3 rounded-full border border-white/25 bg-black/60 px-3 py-1.5 text-sm text-white/90 backdrop-blur-sm transition-colors hover:bg-black/80">
                Replay ↻
              </button>
            )}
          </>
        )}
      </div>

      {n > 1 && (
        <div className="mt-3 flex items-center gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className={btn}>←</button>
          <button type="button" onClick={() => go(1)} aria-label="Next slide" className={btn}>→</button>
          <span className="ml-2 font-mono text-sm text-muted" aria-live="polite">
            <span className={accentText}>{String(i + 1).padStart(2, '0')}</span> / {String(n).padStart(2, '0')}
          </span>
          {canFull && (
            <button type="button" onClick={full} className="ml-auto text-sm text-muted transition-colors hover:text-text">
              Full screen ⤢
            </button>
          )}
        </div>
      )}
    </div>
  )
}
