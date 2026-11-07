import { useEffect, useRef } from 'react'
import type { Media } from '../content'

// Shows a still image, or a silent looping screen recording. The recording only plays while
// it is on screen (so the page stays light), and never plays by itself for visitors who
// asked their system for reduced motion: they get the poster and normal video controls.
export default function MediaView({ media, className = '' }: { media: Media; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const video = ref.current
    if (!video || reduced) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [reduced])

  if (!media.video) {
    return <img src={media.image} alt={media.alt} loading="lazy" className={`block w-full ${className}`} />
  }
  return (
    <video
      ref={ref}
      src={media.video}
      poster={media.poster}
      aria-label={media.alt}
      muted
      loop
      playsInline
      preload="none"
      controls={reduced}
      className={`block w-full ${className}`}
    />
  )
}
