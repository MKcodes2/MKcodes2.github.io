import { contact, profile } from '../content'

// The Contact section: shown at the bottom of every page.
export default function Footer() {
  const links = [
    { label: 'Email', href: `mailto:${contact.email}`, text: contact.email },
    { label: 'LinkedIn', href: contact.linkedin, text: 'Mary Kate Evangelidou' },
    { label: 'GitHub', href: contact.github, text: 'MKcodes2' },
    { label: 'CV', href: contact.cv, text: 'Download PDF ↓' },
  ]
  return (
    <footer id="contact" className="border-t border-line bg-bg/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-16">
        <p className="label">Contact</p>
        <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">Let’s talk.</h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <li key={l.label}>
              <p className="text-xs text-muted">{l.label}</p>
              <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                {...(l.label === 'CV' ? { download: true } : {})}
                className="mt-1 inline-block break-all hover:text-lavender">{l.text}</a>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-xs text-muted">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  )
}
