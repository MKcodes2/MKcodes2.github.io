import { Link, useParams } from 'react-router-dom'
import Page from '../components/Page'
import MediaView from '../components/MediaView'
import NotFound from './NotFound'
import { pagesByWorld, worlds, type Section, type World } from '../content'
import { accent, inline } from '../richText'

// Colours per world: cyan for Software Engineering, purple for Molecular Biology.

// Where the screen sits inside the computer frame image (measured on the 1798 x 1176 px original:
// screen at 36,37, 1726 x 955 px), as percentages, with a little extra so no gap shows under the bezel.
const screen = { left: '1.95%', top: '3.05%', width: '96.1%', height: '81.4%' }

// One template for every project / biology page; content comes from content.ts.
export default function Detail({ world }: { world: World }) {
  const { slug } = useParams()
  const list = pagesByWorld(world)
  const index = list.findIndex((p) => p.slug === slug)
  if (index === -1) return <NotFound />
  const page = list[index]
  const next = list[(index + 1) % list.length]
  const base = worlds[world].path
  const a = accent[world]

  return (
    <Page>
      <div className="pt-16" />
      <Link to={base} className="text-sm text-muted hover:text-text">← {world === 'coding' ? 'Coding projects' : worlds[world].label}</Link>
      {/* The gradient sits on an inline span so descenders are not cut, as on the hub pages. */}
      {/* Wide screens: text on the left, hero video on the right. Phones: the video stacks under the buttons. */}
      <div className={page.hero ? 'mt-4 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]' : 'mt-4'}>
        <div>
          {/* The gradient sits on an inline span so descenders are not cut, as on the hub pages. */}
          <h1 className="text-5xl sm:text-6xl font-semibold leading-[1.1] tracking-[-0.04em]">
            <span className={world === 'coding' ? 'hub-gradient-coding' : 'hub-gradient-biology'}>{page.title}</span>
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl text-pretty">{page.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {page.meta.map((m) => <li key={m} className="rounded-full border border-line px-3 py-1 text-sm text-muted">{m}</li>)}
          </ul>

          {page.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {page.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${a.button}`}>
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>

        {/* The hero recording, shown inside a computer frame when the page has one. */}
        {page.hero && page.heroFrame && (
          <div className="relative mx-auto w-full max-w-lg lg:mr-0" style={{ aspectRatio: '1798 / 1176' }}>
            <div className="absolute overflow-hidden bg-black" style={screen}>
              <MediaView media={page.hero} className="h-full object-fill" />
            </div>
            <img src={page.heroFrame} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
          </div>
        )}
        {page.hero && !page.heroFrame && (
          <div className={`overflow-hidden rounded-2xl border ${a.frame}`}>
            <MediaView media={page.hero} />
          </div>
        )}
      </div>

      <article className="mt-20 space-y-16">
        {page.sections.map((s) => <SectionView key={s.heading} s={s} a={a} />)}
      </article>

      {next !== page && (
        <Link to={`${base}/${next.slug}`} className="mt-20 mb-24 block border-t border-line pt-6 group">
          <span className="text-sm text-muted">Next</span>
          <span className="block text-2xl font-semibold group-hover:text-lavender">{next.title} →</span>
        </Link>
      )}
      {next === page && <div className="pb-24" />}
    </Page>
  )
}


function SectionView({ s, a }: { s: Section; a: (typeof accent)[World] }) {
  return (
    <section>
      {/* Same mono label style as the home page section labels (MY WORK, ABOUT), in the world colour. */}
      <h2 className={`label !text-base ${a.heading}`}>{s.heading}</h2>
      {s.body.length > 0 && (
        <div className="mt-8 space-y-3 text-muted leading-relaxed">{s.body.map((b) => <p key={b}>{inline(b, a)}</p>)}</div>
      )}

      {s.features && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {s.features.map((f) => (
            <figure key={f.title} className={`overflow-hidden rounded-2xl border bg-surface backdrop-blur-sm ${a.frame}`}>
              <div className="aspect-video overflow-hidden bg-black/40">
                <MediaView media={f.media} className="h-full object-cover object-top" />
              </div>
              <figcaption className="p-5">
                <h3 className="font-semibold text-text">{f.title}</h3>
                <p className="mt-1.5 text-muted leading-relaxed">{f.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {/* Decision points stacked one under the other, full width like the other sections. */}
      {s.points && s.pointsHeading && <h3 className="mt-12 text-lg font-semibold text-text">{s.pointsHeading}</h3>}
      {s.points && (
        <div className={`${s.pointsHeading ? 'mt-6' : 'mt-8'} space-y-8`}>
          {s.points.map((p) => (
            <div key={p.title} className={`border-l-2 pl-4 ${a.bar}`}>
              <h3 className="font-semibold text-text">{p.title}</h3>
              <p className="mt-1.5 text-muted leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
