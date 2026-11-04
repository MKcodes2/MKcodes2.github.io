import Page from '../components/Page'
import Card from '../components/Card'
import { biologyHub, codingHub, pagesByWorld, worlds, type World } from '../content'

export default function WorldHub({ world }: { world: World }) {
  const w = worlds[world]
  const items = pagesByWorld(world)
  const featured = items.filter((p) => p.featured)
  const more = items.filter((p) => !p.featured)

  return (
    <Page>
      <div className="pt-16" />
      <p className="label">{w.period}</p>
      <h1 className="headline-gradient mt-4 text-5xl sm:text-7xl font-semibold tracking-[-0.045em]">{w.label}</h1>

      {world === 'coding' ? (
        <div className="mt-6 max-w-2xl space-y-4 text-muted">{codingHub.intro.map((p) => <p key={p}>{p}</p>)}</div>
      ) : (
        <BiologyIntro />
      )}

      <h2 className="mt-12 mb-4 text-xl font-semibold">{world === 'coding' ? 'Projects' : 'Work'}</h2>
      <div className="grid gap-6 pb-24 sm:grid-cols-2">
        {featured.map((p) => (
          <Card key={p.slug} to={`${w.path}/${p.slug}`} title={p.title} text={p.summary} eyebrow={p.meta[0]} large />
        ))}
        {more.map((p) => (
          <Card key={p.slug} to={`${w.path}/${p.slug}`} title={p.title} text={p.summary} eyebrow={p.meta[0]} />
        ))}
      </div>
    </Page>
  )
}

function BiologyIntro() {
  return (
    <div className="mt-6 max-w-2xl space-y-6 text-muted">
      <ul className="space-y-1 text-text">{biologyHub.facts.map((f) => <li key={f}>{f}</li>)}</ul>
      {biologyHub.intro.map((p) => <p key={p}>{p}</p>)}
      <div>
        <h2 className="text-text font-semibold mb-2">Lab techniques</h2>
        <div className="flex flex-wrap gap-2">
          {biologyHub.techniques.map((t) => (
            <span key={t} className="rounded-full border border-line px-3 py-1 text-sm">{t}</span>
          ))}
        </div>
      </div>
      <p>{biologyHub.labAssistant}</p>
      <div className="rounded-3xl border border-line bg-surface p-6 backdrop-blur-sm">
        <h2 className="text-text font-semibold">{biologyHub.teaching.heading}</h2>
        <p className="mt-2">{biologyHub.teaching.body}</p>
      </div>
    </div>
  )
}
