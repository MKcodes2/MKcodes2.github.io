import { motion } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../components/Card'
import GlowDivider from '../components/GlowDivider'
import Page from '../components/Page'
import { honours, leadership, profile, timeline, worlds } from '../content'
import { useSectionNav } from '../components/useSectionNav'
import HeroPortrait from '../components/HeroPortrait'

// Fades a block in as it scrolls into view.
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeader({ label, title, aside }: { label: string; title: string; aside?: string }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="label !text-base">{label}</p>
        <h2 className="mt-10 text-4xl sm:text-6xl font-bold leading-none tracking-[-0.04em]">{title}</h2>
      </div>
      {aside && <p className="max-w-md text-muted">{aside}</p>}
    </div>
  )
}

// Separator with the same space above and below it.
function Divider() {
  return (
    <div className="py-24">
      <GlowDivider />
    </div>
  )
}

export default function Home() {
  const goTo = useSectionNav()
  const { state } = useLocation()

  // Arriving from another page via a navbar link: jump to that section.
  useEffect(() => {
    const id = (state as { section?: string } | null)?.section
    if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50)
  }, [state])

  return (
    <Page>
      {/* ---------- Hero ---------- */}
      {/* The hero fills exactly one screen (minus the navbar), so the next section always
          starts below the fold, at any zoom level. On large screens the portrait spans
          from the role label down to the buttons. */}
      <section className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center pt-10 pb-24">
      <div className="grid gap-x-12 lg:grid-cols-[1.3fr_1fr]">
        <p className="label lg:col-start-1">{profile.role}</p>
        <div className="mt-6 lg:col-start-1 lg:row-start-2">
          {/* One continuous gradient over "science to software": white into purple (biology),
              shifting at "to", into blue-cyan (code) on "software". */}
          <h1 aria-label={profile.slogan} className="text-5xl sm:text-7xl xl:text-8xl font-semibold leading-[0.95] tracking-[-0.045em] text-white">
            Designing systems, from <span className="worlds-gradient">science to software</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{profile.intro}</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4 lg:col-start-1 lg:row-start-3">
          <button type="button" onClick={() => goTo('worlds')}
            className="rounded-full bg-white px-6 py-3.5 font-semibold text-bg hover:bg-lavender transition-colors">
            View my Work ↗
          </button>
          <button type="button" onClick={() => goTo('about')}
            className="outline-button rounded-full px-6 py-3.5 font-semibold">
            About me
          </button>
        </div>
        <div className="relative mt-12 lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:mt-0">
          <HeroPortrait />
        </div>
      </div>
        <p className="label absolute inset-x-0 bottom-6 text-center !text-[0.65rem]">Scroll to explore</p>
      </section>

      {/* ---------- Two worlds ---------- */}
      <section id="worlds" className="pt-24">
        <Reveal><SectionHeader label="My work" title="Two worlds, one curiosity." /></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {(['biology', 'coding'] as const).map((w, i) => (
            <Reveal key={w} delay={i * 0.1}>
              <Card to={worlds[w].path} eyebrow={worlds[w].period} title={worlds[w].label} text={worlds[w].blurb} large accent={w} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- About: timeline ---------- */}
      <Divider />
      <section id="about">
        <Reveal><SectionHeader label="About" title="Where I’ve learned and built." /></Reveal>
        <div className="mt-10 border-t border-line">
          {timeline.map((t) => (
            <Reveal key={t.title}>
              <div className="grid gap-3 border-b border-line py-10 md:grid-cols-[12rem_1fr_auto] md:gap-10">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted pt-2">{t.dates}</p>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{t.title}</h3>
                  <p className="mt-3 max-w-3xl text-muted leading-relaxed">{t.text}</p>
                </div>
                <span className="self-start rounded-full border border-line px-3 py-1.5 text-xs uppercase tracking-wider text-muted">{t.tag}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Honours & Awards ---------- */}
      <Divider />
      <section id="honours" className="pb-24">
        <Reveal><SectionHeader label="Honours & Awards" title="Recognition along the way." /></Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {honours.map((h, i) => (
            <Reveal key={h.title} delay={(i % 2) * 0.1}>
              <div className="flex h-full gap-5 rounded-3xl border border-line bg-surface p-6 backdrop-blur-sm">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white/[0.04]">
                  {h.image && <img src={h.image} alt="" className="h-full w-full object-cover" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{h.title}</h3>
                  {h.year && <p className="font-mono text-xs text-muted mt-1">{h.year}</p>}
                  <p className="mt-2 text-sm text-muted">{h.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal><h3 className="mt-20 label">Leadership</h3></Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {leadership.map((l) => (
            <Reveal key={l.title}>
              <div className="h-full rounded-3xl border border-line bg-surface p-6 backdrop-blur-sm">
                <h4 className="font-bold">{l.title}</h4>
                <p className="mt-2 text-sm text-muted">{l.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Page>
  )
}
