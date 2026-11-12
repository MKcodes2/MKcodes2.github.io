import { motion } from 'framer-motion'
import { useLayoutEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../components/Card'
import GlowDivider from '../components/GlowDivider'
import Page from '../components/Page'
import { honours, leadership, profile, timeline, worlds } from '../content'

// Fades the four edges of a picture into the card, for logos that only exist on a white background.
const fade = 'linear-gradient(to right, transparent, black 22%, black 78%, transparent), linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)'
const softEdges = { maskImage: fade, WebkitMaskImage: fade, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' } as const
import { useSectionNav } from '../components/useSectionNav'
import HeroPortrait from '../components/HeroPortrait'
import dnaArt from '../assets/worlds/dna.webp'
import computerArt from '../assets/worlds/computer.webp'
import logo42 from '../assets/logos/heilbronn42.webp'
import logoDuth from '../assets/logos/duth-mbg.webp'
import logoBrfaa from '../assets/logos/brfaa.webp'

// Timeline logos, shown on the right of each entry. All three share one width
// (logoClass) so their right and left edges line up from top to bottom.
const logos = {
  '42': { src: logo42, alt: '42 Heilbronn' },
  duth: { src: logoDuth, alt: 'Department of Molecular Biology & Genetics, Democritus University of Thrace' },
  brfaa: { src: logoBrfaa, alt: 'Biomedical Research Foundation of the Academy of Athens' },
}
const logoClass = 'w-40 h-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 select-none'

// Illustration shown inside each world card.
const worldArt = { biology: dnaArt, coding: computerArt }

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

  // Arriving from another page via a navbar link: land directly on that section, before the
  // page is painted, so the hero never shows first.
  useLayoutEffect(() => {
    const id = (state as { section?: string } | null)?.section
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
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
          {/* One continuous gradient over "science and software": white into purple (biology),
              shifting at "and", into blue-cyan (code) on "software". The visible text is written
              here (not taken from content.ts) because the gradient needs its own <span>;
              profile.slogan is still used for screen readers via aria-label. */}
          <h1 aria-label={profile.slogan} className="text-5xl sm:text-7xl xl:text-8xl font-semibold leading-[0.95] tracking-[-0.045em] text-white">
            Designing systems across <span className="worlds-gradient">science and software</span>
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-muted">{profile.intro}</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4 lg:col-start-1 lg:row-start-3">
          <button type="button" onClick={() => goTo('worlds')}
            className="fill-hover rounded-full bg-white px-6 py-3.5 font-semibold text-bg">
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
              <Card to={worlds[w].path} eyebrow={worlds[w].highlights} title={worlds[w].label} text={worlds[w].blurb} large accent={w} image={worldArt[w]} />
            </Reveal>
          ))}
        </div>
        {/* The bridge between the two worlds: biology words in purple, computing words in cyan.
            The two equivalents (proteins = software) are highlighted so the analogy reads at a glance. */}
        <Reveal delay={0.2}>
          <p className="mx-auto mt-14 max-w-2xl text-center text-lg sm:text-xl leading-relaxed text-muted">
            <span className="rounded-md bg-[#a78bfa]/15 px-1.5 font-semibold text-[#c4b1ff]">Proteins</span> are to the <span className="text-[#a78bfa]">body</span> what{' '}
            <span className="rounded-md bg-[#7cc8f5]/15 px-1.5 font-semibold text-[#a6dcfa]">software</span> is to <span className="text-[#7cc8f5]">hardware</span>.
            <br className="hidden sm:block" /> I like working at that level, in both worlds.
          </p>
        </Reveal>
      </section>

      {/* ---------- About: timeline ---------- */}
      <Divider />
      <section id="about">
        <Reveal><SectionHeader label="About" title="Where I’ve learned and built." /></Reveal>
        <div className="mt-10 border-t border-line">
          {timeline.map((t) => (
            <Reveal key={t.title}>
              {/* Logos on the left, dates above each title.
                  relative: lets a sub-entry logo (BRFAA) sit in the left column. */}
              <div className="relative grid gap-5 border-b border-line py-10 md:grid-cols-[12rem_1fr] md:gap-10">
                {t.logo ? (
                  <img src={logos[t.logo].src} alt={logos[t.logo].alt} loading="lazy" className={`md:mt-1 ${logoClass}`} />
                ) : (
                  <span className="hidden md:block" />
                )}
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{t.dates}</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight">{t.title}</h3>
                  <p className="mt-3 text-muted leading-relaxed">{t.text}</p>
                  {/* Sub-entries: indented, joined by a thin purple line. */}
                  {t.sub && (
                    <ul className="mt-8 space-y-6 border-l border-[#a78bfa]/40 pl-6">
                      {t.sub.map((s) => (
                        <li key={s.title}>
                          <div className="relative">
                            <span aria-hidden className="absolute -left-[1.85rem] top-1.5 h-2.5 w-2.5 rounded-full bg-[#a78bfa]" />
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{s.dates}</p>
                          </div>
                          {/* On wide screens the logo moves to the left column,
                              keeping its place in height: its top lines up with this title. */}
                          {s.logo && (
                            <img src={logos[s.logo].src} alt={logos[s.logo].alt} loading="lazy" className={`mt-4 md:absolute md:left-0 md:mt-1.5 ${logoClass}`} />
                          )}
                          <h4 className="mt-1.5 text-lg font-semibold tracking-tight">{s.title}</h4>
                          <p className="mt-1.5 text-muted leading-relaxed">{s.text}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
              <div className="flex h-full gap-5 rounded-3xl border border-white/[0.16] bg-surface p-6 backdrop-blur-sm">
                <div className={`h-24 w-24 shrink-0 ${h.imageStyle === 'bare' ? '' : 'overflow-hidden rounded-2xl bg-white/[0.04]'}`}>
                  {h.image && (
                    <img
                      src={h.image}
                      alt=""
                      className={`h-full w-full ${h.imageStyle === 'logo' ? 'object-contain p-4 opacity-80' : h.imageStyle === 'bare' ? 'object-contain' : 'object-cover'}`}
                      style={h.imageStyle === 'soft' ? softEdges : undefined}
                    />
                  )}
                </div>
                <div>
                  {h.year && <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{h.year}</p>}
                  <h3 className="mt-1.5 text-lg font-bold">{h.title}</h3>
                  <p className="mt-2 text-sm text-muted">{h.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal><h3 className="mt-20 text-2xl sm:text-3xl font-bold tracking-[-0.03em]">Leadership</h3></Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {leadership.map((l) => (
            <Reveal key={l.title}>
              <div className="h-full rounded-3xl border border-white/[0.16] bg-surface p-6 backdrop-blur-sm">
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
