import { Link, useParams } from 'react-router-dom'
import Page from '../components/Page'
import NotFound from './NotFound'
import { pagesByWorld, worlds, type World } from '../content'

// One template for every project / biology page; content comes from content.ts.
export default function Detail({ world }: { world: World }) {
  const { slug } = useParams()
  const list = pagesByWorld(world)
  const index = list.findIndex((p) => p.slug === slug)
  if (index === -1) return <NotFound />
  const page = list[index]
  const next = list[(index + 1) % list.length]
  const base = worlds[world].path

  return (
    <Page>
      <div className="pt-16" />
      <Link to={base} className="text-sm text-muted hover:text-text">← {worlds[world].label}</Link>
      <h1 className="headline-gradient mt-4 text-5xl sm:text-6xl font-semibold tracking-[-0.04em]">{page.title}</h1>
      <p className="mt-3 text-lg text-muted max-w-2xl">{page.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {page.meta.map((m) => <li key={m} className="rounded-full border border-line px-3 py-1 text-sm text-muted">{m}</li>)}
      </ul>

      <article className="mt-10 max-w-2xl space-y-10">
        {page.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl font-semibold">{s.heading}</h2>
            <div className="mt-3 space-y-3 text-muted leading-relaxed">{s.body.map((b) => <p key={b}>{b}</p>)}</div>
          </section>
        ))}
      </article>

      {page.links.length > 0 && (
        <div className="mt-10 flex gap-3">
          {page.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="rounded-full border border-line px-4 py-2 text-sm hover:border-violet">
              {l.label} ↗
            </a>
          ))}
        </div>
      )}

      {next !== page && (
        <Link to={`${base}/${next.slug}`} className="mt-16 mb-24 block border-t border-line pt-6 group">
          <span className="text-sm text-muted">Next</span>
          <span className="block text-2xl font-semibold group-hover:text-lavender">{next.title} →</span>
        </Link>
      )}
    </Page>
  )
}
