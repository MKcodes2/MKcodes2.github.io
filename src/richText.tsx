import type { ReactNode } from 'react'
import type { World } from './content'

// Colours of each world (coding blue, biology purple), shared by the detail and hub pages.
export const accent = {
  coding: { frame: 'border-[#7cc8f5]/30', text: 'text-[#7cc8f5]', button: 'border-[#7cc8f5]/50 text-[#a6dcfa] hover:border-[#7cc8f5] hover:shadow-[0_0_30px_-8px_rgba(124,200,245,0.6)]', bar: 'border-[#7cc8f5]/60', heading: '!text-[#7cc8f5]' },
  biology: { frame: 'border-[#a78bfa]/30', text: 'text-[#a78bfa]', button: 'border-[#a78bfa]/50 text-[#c4b1ff] hover:border-[#a78bfa] hover:shadow-[0_0_30px_-8px_rgba(167,139,250,0.6)]', bar: 'border-[#a78bfa]/60', heading: '!text-[#a78bfa]' },
}

// A small subset of Markdown for body text: **bold**, _italic_, ==bold in the accent colour==, ++underlined++ and [text](url). Formats can be nested
// (e.g. a link inside italics). Underscores inside words (like so_long) are left alone.
const inlinePattern = /\*\*(.+?)\*\*|(?<![\w])_(.+?)_(?![\w])|\[([^\]]+)\]\(([^)\s]+)\)|==(.+?)==|\+\+(.+?)\+\+/g

export function inline(text: string, a: (typeof accent)[World]): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(inlinePattern)) {
    const i = m.index ?? 0
    if (i > last) out.push(text.slice(last, i))
    if (m[1] !== undefined) out.push(<strong key={i} className="font-semibold text-text">{inline(m[1], a)}</strong>)
    else if (m[2] !== undefined) out.push(<em key={i}>{inline(m[2], a)}</em>)
    else if (m[5] !== undefined) out.push(<strong key={i} className={`font-semibold ${a.text}`}>{inline(m[5], a)}</strong>)
    else if (m[6] !== undefined) out.push(<u key={i} className="underline-offset-2">{inline(m[6], a)}</u>)
    else out.push(<a key={i} href={m[4]} target="_blank" rel="noreferrer" className={`${a.text} underline-offset-4 hover:underline`}>{m[3]}</a>)
    last = i + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}
