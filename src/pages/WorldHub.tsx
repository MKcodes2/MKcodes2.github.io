import { Link } from 'react-router-dom'
import Page from '../components/Page'
import Card from '../components/Card'
import { biologyHub, codingHub, pagesByWorld, worlds, type World } from '../content'
import { accent, inline } from '../richText'
import certificateDark from '../assets/school42/credly.webp'
import certificateBright from '../assets/school42/credly-bright.webp'
import holyGraphImg from '../assets/school42/holy-graph.webp'
import MediaView from '../components/MediaView'
import showcaseVideo from '../assets/molecularBiology/showcase.mp4'
import showcasePoster from '../assets/molecularBiology/showcase-poster.webp'
import laptopFrame from '../assets/molecularBiology/laptop-frame.webp'

// Where the screen sits inside the laptop frame image (1309 x 699 px, widened so the screen is 16:9;
// screen at 152,52, 999 x 562 px), as percentages, with about 1 px extra so no gap shows under the bezel.
const laptopScreen = { left: '11.55%', top: '7.35%', width: '76.45%', height: '80.6%' }

// Which certificate image the coding hub shows: 'dark' (my Canva dark edit) or 'bright' (the original white one).
// Change this one word to compare them. Each has its own size class so the height still follows the text column.
const CERTIFICATE: 'dark' | 'bright' = 'dark'
const certificates = {
  dark: { src: certificateDark, width: 'lg:w-[min(100cqw,calc(100cqh*1200/840))]' },
  bright: { src: certificateBright, width: 'lg:w-[min(100cqw,calc(100cqh*993/699))]' },
}

export default function WorldHub({ world }: { world: World }) {
  const w = worlds[world]
  const items = pagesByWorld(world)
  const featured = items.filter((p) => p.featured)
  const more = items.filter((p) => !p.featured)

  return (
    <Page>
      <div className="pt-16" />
      {/* Same back link and gap as on the project pages. */}
      <Link to="/" className="text-sm text-muted hover:text-text">← Home</Link>
      <p className="label mt-10">{w.period}</p>
      {world === 'coding' ? (
        <CodingIntro />
      ) : (
        <BiologyIntro />
      )}

      <h2 className="label !text-base !text-text mt-20 mb-6">{world === 'coding' ? 'Projects' : 'Selected Work'}</h2>
      <div className="grid gap-6 pb-24 sm:grid-cols-2">
        {featured.map((p) => (
          <Card key={p.slug} to={`${w.path}/${p.slug}`} title={p.title} text={p.summary} eyebrow={p.category ?? p.meta[0]} accent={world} roomy />
        ))}
        {more.map((p) => (
          <Card key={p.slug} to={`${w.path}/${p.slug}`} title={p.title} text={p.summary} eyebrow={p.category ?? p.meta[0]} accent={world} roomy />
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
      {/* Same layout as the Molecular Biology hub: title, facts and paragraphs on the left; the
          certificate on the right (40%), its top level with the title. */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,4fr)]">
        <div className="space-y-6 text-muted">
          <HubTitle world="coding" />
          <ul className="space-y-1 text-text">{codingHub.facts.map((f, i) => (
            <li key={f}>
              {f}
              {/* The first fact links to the 42 Network site; arrow only, no underline. */}
              {i === 0 && (
                <a href={codingHub.networkLink} target="_blank" rel="noreferrer" aria-label="The 42 Network website (opens in a new tab)"
                  className="ml-2 inline-block text-[#7cc8f5] transition-transform duration-200 hover:-translate-y-0.5 hover:translate-x-0.5">↗</a>
              )}
            </li>
          ))}</ul>
          <ul className="space-y-3 text-sm">
            {codingHub.about.map((n) => <li key={n} className={`border-l-2 pl-3 text-pretty ${accent.coding.bar}`}>{inline(n, accent.coding)}</li>)}
          </ul>
        </div>
        {/* On wide screens this cell takes the height of the text column (from the top of the title to the
            end of the notes), and the certificate is as tall as that, about centred between the text and the right edge. */}
        <figure className="flex items-start justify-end lg:mt-4 lg:pr-12 lg:[container-type:size]">
          {/* Opens the official PDF in a new tab, like the GitHub and LinkedIn links. */}
          <a href={codingHub.certificate.pdf} target="_blank" rel="noreferrer" className={`group/cert relative block w-full ${certificates[CERTIFICATE].width} overflow-hidden rounded-2xl border border-[#7cc8f5]/30 transition-all duration-300 hover:border-[#7cc8f5]/80 hover:shadow-[0_0_40px_-6px_rgba(124,200,245,0.55)]`}>
            <img src={certificates[CERTIFICATE].src} alt="42 certificate of completion: Curriculum of Architect in Digital Technologies" className="w-full transition-transform duration-500 group-hover/cert:scale-[1.02]" />
            <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2.5 py-1 text-xs text-[#7cc8f5] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/cert:opacity-100 group-focus-visible/cert:opacity-100">
              Open the certificate ↗
            </span>
          </a>
        </figure>
      </div>
      <div className="mt-10 space-y-6 text-muted leading-relaxed">
        {codingHub.intro.map((p) => <p key={p}>{inline(p, accent.coding)}</p>)}
      </div>

      {/* Same pills as the lab techniques on the Molecular Biology hub. */}
      <div className="mt-16 text-muted">
        <h2 className="label !text-base">{codingHub.skills.heading}</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {codingHub.skills.items.map((t) => (
            <span key={t} className="rounded-full border border-line px-3 py-1 text-sm">{t}</span>
          ))}
        </div>
      </div>

      {/* Holy Graph on the left (30%), the coursework text next to it. */}
      <div className="mt-16 grid items-center gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)]">
        <img src={holyGraphImg} alt="The 42 Holy Graph, with the completed core curriculum projects highlighted" loading="lazy" className="mx-auto w-full max-w-sm mix-blend-lighten" />
        <div className="text-muted leading-relaxed">
          <h2 className={`label !text-base ${accent.coding.heading}`}>{codingHub.coursework.heading}</h2>
          {codingHub.coursework.text.map((p) => <p key={p} className="mt-5 text-pretty">{inline(p, accent.coding)}</p>)}
        </div>
      </div>

      {/* Full project list, hidden until the visitor opens it. */}
      <details className="group mt-12 rounded-2xl border border-[#7cc8f5]/30 bg-surface backdrop-blur-sm transition-colors duration-300 hover:border-[#7cc8f5]/55 hover:bg-white/[0.04]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-[#7cc8f5] [&::-webkit-details-marker]:hidden">
          <span className="sweep-coding font-medium">See the full list of core curriculum projects</span>
          <span aria-hidden className="text-xl transition-transform duration-300 group-hover:-translate-x-1 group-open:rotate-45">+</span>
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

// Same type as the home slogan. The gradient sits on an inline span so descenders (the g) are not cut.
function HubTitle({ world }: { world: World }) {
  return (
    <h1 className="mt-4 text-5xl sm:text-7xl font-semibold leading-[1.05] tracking-[-0.045em]">
      <span className={world === 'coding' ? 'hub-gradient-coding' : 'hub-gradient-biology'}>{worlds[world].label}</span>
    </h1>
  )
}

function BiologyIntro() {
  return (
    <>
      {/* Title, facts and paragraph on the left; the lab showcase on the right, from the top of the title
          to the end of the paragraph. On phones the video comes right after the paragraph. */}
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6 text-muted">
          <HubTitle world="biology" />
          <ul className="space-y-1 text-text">{biologyHub.facts.map((f) => <li key={f}>{f}</li>)}</ul>
          {biologyHub.intro.map((p) => <p key={p}>{p}</p>)}
        </div>
        {/* On wide screens this cell takes the height of the text column, and the laptop is as tall as
            that height allows without getting wider than the column (container query units). */}
        <div className="flex items-center justify-end lg:mt-4 lg:[container-type:size]">
          <div
            className="relative w-full lg:w-[min(100cqw,calc(100cqh*1309/699))]"
            style={{ aspectRatio: '1309 / 699' }}
          >
            <div className="absolute overflow-hidden bg-black" style={laptopScreen}>
              <MediaView
                media={{ video: showcaseVideo, poster: showcasePoster, alt: 'Slideshow of my laboratory work' }}
                className="h-full object-cover"
              />
            </div>
            <img src={laptopFrame} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
          </div>
        </div>
      </div>

      {/* Spaced mono labels like the home page sections: silver here, purple for Coursework. */}
      <div className="mt-16 text-muted">
        <h2 className="label !text-base">Lab techniques</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {biologyHub.techniques.map((t) => (
            <span key={t} className="rounded-full border border-line px-3 py-1 text-sm">{t}</span>
          ))}
        </div>
      </div>

      {/* Plain text across the full width, then the full course list, hidden until opened. */}
      <div className="mt-16 text-muted leading-relaxed">
        <h2 className={`label !text-base ${accent.biology.heading}`}>{biologyHub.coursework.heading}</h2>
        <p className="mt-6">{inline(biologyHub.coursework.intro, accent.biology)}</p>
        <p className="mt-6 border-l-2 border-[#a78bfa]/60 pl-4">{inline(biologyHub.coursework.teaching, accent.biology)}</p>
      </div>

      <details className="group mt-8 rounded-2xl border border-[#a78bfa]/30 bg-surface backdrop-blur-sm transition-colors duration-300 hover:border-[#a78bfa]/55 hover:bg-white/[0.04]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-[#a78bfa] [&::-webkit-details-marker]:hidden">
          <span className="sweep-biology font-medium">See the full list of courses</span>
          <span aria-hidden className="text-xl transition-transform duration-300 group-hover:-translate-x-1 group-open:rotate-45">+</span>
        </summary>
        <div className="overflow-x-auto px-5 pb-5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
                <th className="py-3 pr-4 font-medium">Course</th>
                <th className="py-3 text-right font-medium">ECTS</th>
              </tr>
            </thead>
            {biologyHub.coursework.groups.map((g) => (
              <tbody key={g.title || 'core'}>
                {g.title && (
                  <tr>
                    <td colSpan={2} className="pt-6 pb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#a78bfa]">{g.title}</td>
                  </tr>
                )}
                {g.courses.map(([name, ects]) => (
                  <tr key={name} className="border-b border-line/60 align-top">
                    <td className="py-2.5 pr-4 font-medium text-text">{name}</td>
                    <td className="py-2.5 text-right text-muted whitespace-nowrap">{ects}</td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </details>
    </>
  )
}
