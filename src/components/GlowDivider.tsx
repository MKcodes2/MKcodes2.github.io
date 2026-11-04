// Section separator: a thin line, slightly thicker and light blue in the middle,
// turning purple and tapering to nothing at both ends.
export default function GlowDivider() {
  const line = 'linear-gradient(90deg, transparent 0%, #8b6ff5 18%, #a78bfa 32%, #7cc8f5 50%, #a78bfa 68%, #8b6ff5 82%, transparent 100%)'
  const taper = 'polygon(0 50%, 50% 0, 100% 50%, 50% 100%)'
  return (
    <div aria-hidden className="relative mx-auto h-px w-full max-w-6xl opacity-90">
      <div className="absolute inset-0" style={{ background: line, clipPath: taper }} />
    </div>
  )
}
