import Page from '../components/Page'
import Card from '../components/Card'
import { biologyHub, codingHub, pagesByWorld, worlds, type World } from '../content'
import certificateImg from '../assets/school42/credly.webp'
import holyGraphImg from '../assets/school42/holy-graph.webp'

export default function WorldHub({ world }: { world: World }) {
  const w = worlds[world]
  const items = pagesByWorld(world)
  const featured = items.filter((p) => p.featured)
  const more = items.filter((p) => !p.featured)

  return (
    <Page>
      <div className="pt-16" />
      <p className="label">{w.period}</p>
      {/* Same type as the home slogan. The gradient sits on an inline span so descenders (the g) are not cut. */}
      <h1 className="mt-4 text-5xl sm:text-7xl font-semibold leading-[1.05] tracking-[-0.045em]">
        <span className={world === 'coding' ? 'hub-gradient-coding' : 'hub-gradient-biology'}>{w.label}</span>
      </h1>

      {world === 'coding' ? <CodingIntro /> : <BiologyIntro />}

      <h2 className="mt-16 mb-4 text-xl font-semibold">{world === 'coding' ? 'Projects' : 'Work'}</h2>
      <div className="grid gap-6 pb-24 sm:grid-cols-2">
        {featured.map((p) => (
          <Card key={p.slug} to={`${w.path}/${p.slug}`} title={p.title} text={p.summary} eyebrow={p.meta[0]} accent={world} large />
        ))}
        {more.map((p) => (
          <Card key={p.slug} to={`${w.path}/${p.slug}`} title={p.title} text={p.summary} eyebrow={p.meta[0]} accent={world} />
        ))}
      </div>
    </Page>
  )
}

function CodingIntro() {
  const totalHours = codingHub.curriculum.reduce((sum, r) => sum + r.projects.reduce((s, p) => s + p.hours, 0), 0)
  const projectCount = codingHub.curriculum.reduce((sum, r) => sum + r.projects.length, 0)

  return (
    <>
      <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
        {codingHub.intro.map((p) => <p key={p}>{p}</p>)}
      </div>
      <p className="mt-6 max-w-3xl border-l-2 border-[#7cc8f5]/60 pl-4 text-[#a6dcfa]">{codingHub.ranking}</p>

      {/* Certificate and Holy Graph side by side on wide screens. */}
      <h2 className="mt-16 text-xl font-semibold">{codingHub.certificate.heading}</h2>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <figure>
          {/* Opens the official PDF in a new tab, like the GitHub and LinkedIn links. */}
          <a href={codingHub.certificate.pdf} target="_blank" rel="noreferrer" className="group/cert relative block overflow-hidden rounded-2xl border border-[#7cc8f5]/30 transition-all duration-300 hover:border-[#7cc8f5]/80 hover:shadow-[0_0_40px_-6px_rgba(124,200,245,0.55)]">
            <img src={certificateImg} alt="42 certificate of completion: Curriculum of Architect in Digital Technologies" loading="lazy" className="w-full transition-transform duration-500 group-hover/cert:scale-[1.02]" />
            <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1.5 text-sm text-[#7cc8f5] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/cert:opacity-100 group-focus-visible/cert:opacity-100">
              Open the official certificate ↗
            </span>
          </a>
          <figcaption className="mt-4 text-muted leading-relaxed">
            {codingHub.certificate.text}
            {codingHub.certificate.link && (
              <> <a href={codingHub.certificate.link} target="_blank" rel="noreferrer" className="text-[#7cc8f5] hover:underline">See it on Credly ↗</a></>
            )}
          </figcaption>
        </figure>
        <figure>
          <img src={holyGraphImg} alt="The 42 Holy Graph, with the completed core curriculum projects highlighted" loading="lazy" className="mx-auto w-full max-w-md rounded-2xl mix-blend-lighten" />
          <figcaption className="mt-4 text-muted leading-relaxed">{codingHub.holyGraph}</figcaption>
        </figure>
      </div>

      {/* Full project list, hidden until the visitor opens it. */}
      <details className="group mt-10 rounded-2xl border border-[#7cc8f5]/30 bg-surface backdrop-blur-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-[#7cc8f5] [&::-webkit-details-marker]:hidden">
          <span className="font-medium">See the full list of core curriculum projects</span>
          <span aria-hidden className="text-xl transition-transform duration-300 group-open:rotate-45">+</span>
        </summary>
        <div className="overflow-x-auto px-5 pb-5">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
                <th className="py-3 pr-4 font-medium">Project</th>
                <th className="py-3 pr-4 font-medium">What it covers</th>
                <th className="py-3 text-right font-medium">Workload</th>
              </tr>
            </thead>
            {codingHub.curriculum.map((r) => (
              <tbody key={r.rank}>
                <tr>
                  <td colSpan={3} className="pt-5 pb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#7cc8f5]">Rank {r.rank}</td>
                </tr>
                {r.projects.map((p) => (
                  <tr key={p.name} className="border-b border-line/60 align-top">
                    <td className="py-2.5 pr-4 font-medium text-text whitespace-nowrap">{p.name}</td>
                    <td className="py-2.5 pr-4 text-muted">{p.details}</td>
                    <td className="py-2.5 text-right text-muted whitespace-nowrap">{p.hours} h</td>
                  </tr>
                ))}
              </tbody>
            ))}
            <tfoot>
              <tr className="text-text">
                <td className="pt-4 pr-4 font-semibold">Total</td>
                <td className="pt-4 pr-4 text-muted">{projectCount} projects</td>
                <td className="pt-4 text-right font-semibold whitespace-nowrap">{totalHours} h</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </details>
    </>
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
