// All site text lives here, so copy can be edited without touching components.
// Anything marked TODO is waiting for Mary Kate's own words or details.

export type World = 'coding' | 'biology'

export interface Link {
  label: string
  href: string
}

export interface Section {
  heading: string
  body: string[]
}

export interface DetailPage {
  slug: string
  world: World
  title: string
  summary: string // one line, used on cards
  meta: string[] // small facts under the title (team size, stack, dates)
  featured?: boolean // full case study vs shorter page
  sections: Section[]
  links: Link[]
}

export const contact = {
  email: 'marykate.evan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mary-kate-evangelidou-881518393/',
  github: 'https://github.com/MKcodes2',
  cv: '/cv.pdf', // put the CV file at public/cv.pdf
}

export const profile = {
  name: 'Mary Kate Evangelidou',
  short: 'MK',
  role: 'Molecular Biologist · Software Developer',
  slogan: 'Designing systems, across science and software',
  intro:
    'I’m Mary Kate, or just MK, a molecular biologist and software developer. I love neuroscience, developmental and behavioural biology, and I’d like to bring coding into that research.',
    // 'I’m Mary Kate, or just MK, a Molecular Biologist and Software Developer who’s passionate about neuroscience, developmental & behavioural biology, coding & UX/UI design.',
}

export const worlds: Record<World, { label: string; path: string; period: string; blurb: string }> = {
  biology: {
    label: 'Molecular Biology & Genetics',
    path: '/biology',
    period: 'BSc DUTH · 2018 – 2023',
    blurb: 'Research on gene regulatory netowrks, lab techniques, and many scientific presentations',
  },
  coding: {
    label: 'Software Engineering',
    path: '/coding',
    period: '42 Heilbronn · 2023 – 2026',
    blurb: 'From low-level C and C++ to full-stack web development and UX/UI Design. My graduation project is where code and design finally clicked.',
  },
}

// About section on the home page: newest first, like the reference timeline.
export const timeline: { dates: string; title: string; text: string; tag: string }[] = [
  {
    dates: 'Mar 2023 — Sep 2026',
    title: '42 Heilbronn · Software Engineering',
    text: 'Scholarship programme in software engineering: C, C++, Python, Docker and full-stack web. My graduation project was PongJam, a realtime multiplayer web platform where I designed and built the frontend.',
    tag: 'Software engineering',
  },
  {
    dates: 'Sep 2018 — Jul 2023',
    title: 'Democritus University of Thrace · BSc Molecular Biology & Genetics',
    text: 'Graduated with Distinction (9.22/10, top 3 of my class). Thesis at BRFAA in Athens on gene regulatory networks in breast cancer cells, graded 10/10.',
    tag: 'Molecular biology',
  },
]

export const honours: { title: string; year: string; text: string; image?: string }[] = [
  { title: 'Harvard high school summer programme', year: 'TODO', text: 'TODO: name of the programme and what you did.' },
  { title: 'Euroscola', year: 'TODO', text: 'TODO: what it was and what you did.' },
  { title: 'NSRF scholarship', year: 'TODO', text: 'For academic and social merit during my BSc.' },
  { title: '42 Heilbronn scholarship', year: '2023', text: 'Full scholarship for the software engineering programme.' },
]

export const leadership: { title: string; text: string }[] = [
  { title: 'Class president', text: 'TODO: school, years.' },
  { title: 'University Board of Directors', text: 'TODO: role and years.' },
  { title: '42 Student Council', text: 'TODO: role and years.' },
]

export const codingHub = {
  intro: [
    'TODO: what 42 is (peer-to-peer, project-based, no teachers), the scholarship, and what you learned there.',
  ],
}

export const biologyHub = {
  facts: [
    'BSc Molecular Biology & Genetics, 240 ECTS',
    'Final grade 9.22 / 10 ("Excellent"), top 3 of the cohort',
    'Thesis graded 10 / 10',
  ],
  intro: ['TODO: a short paragraph on the degree and what drew you to molecular biology.'],
  techniques: ['Cell culture', 'PCR / RT-qPCR', 'DNA cloning', 'Adenoviral overexpression', 'Gel electrophoresis'],
  labAssistant: 'Lab assistant, DUTh, Feb 2020 – Dec 2021. TODO: one or two lines on what you did.',
  teaching: {
    heading: 'Teaching Certification',
    body: 'TODO: what the certification covered (teaching methodology, educational psychology, adult education, teaching practicum).',
  },
}

export const pages: DetailPage[] = [
  // ---------- Coding ----------
  {
    slug: 'pongjam',
    world: 'coding',
    title: 'PongJam',
    summary: 'Realtime multiplayer Pong platform. I designed and built the whole frontend and UI.',
    meta: ['Graduation project', 'Team of 5', 'TypeScript · TailwindCSS · Socket.io · BabylonJS'],
    featured: true,
    sections: [
      { heading: 'The problem', body: ['TODO'] },
      { heading: 'My role', body: ['TODO'] },
      { heading: 'Decisions and why', body: ['TODO: the grouped icon navigation, the game-mode page, the neon visual identity.'] },
      { heading: 'What I would improve', body: ['TODO'] },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/MKcodes2/PongJam' }],
  },
  {
    slug: 'minirt',
    world: 'coding',
    title: 'miniRT',
    summary: 'A ray tracer in C. I wrote the scene parser and designed the dual-mode experience.',
    meta: ['Team of 2', 'C'],
    featured: true,
    sections: [
      { heading: 'The problem', body: ['TODO'] },
      { heading: 'My role', body: ['TODO'] },
      { heading: 'Decisions and why', body: ['TODO: HD vs interactive mode, the README diagrams.'] },
      { heading: 'What I would improve', body: ['TODO'] },
    ],
    links: [{ label: 'GitHub', href: '#' }], // TODO: link to the MKcodes2 fork
  },
  { slug: 'minishell', world: 'coding', title: 'minishell', summary: 'TODO: one line.', meta: ['C'], sections: [{ heading: 'About', body: ['TODO'] }], links: [{ label: 'GitHub', href: '#' }] },
  { slug: 'so_long', world: 'coding', title: 'so_long', summary: 'TODO: one line.', meta: ['C'], sections: [{ heading: 'About', body: ['TODO'] }], links: [{ label: 'GitHub', href: '#' }] },
  { slug: 'push_swap', world: 'coding', title: 'push_swap', summary: 'TODO: one line.', meta: ['C'], sections: [{ heading: 'About', body: ['TODO'] }], links: [{ label: 'GitHub', href: '#' }] },
  // ---------- Biology ----------
  {
    slug: 'thesis',
    world: 'biology',
    title: 'Gene regulatory networks in cancer cells',
    summary: 'BSc thesis at BRFAA: Prox1 overexpression in breast cancer cell lines, measured with RT-qPCR.',
    meta: ['BRFAA, Athens', 'Mar 2022 – Feb 2023', 'Grade 10 / 10'],
    featured: true,
    sections: [
      { heading: 'The question', body: ['TODO'] },
      { heading: 'What I did', body: ['TODO'] },
      { heading: 'What I found', body: ['TODO'] },
      { heading: 'What I would do next', body: ['TODO'] },
    ],
    links: [],
  },
  {
    slug: 'presentations',
    world: 'biology',
    title: 'Molecular biology presentations',
    summary: 'Five presentations I researched and designed. Originals are in Greek.',
    meta: ['Science communication', 'Visual design'],
    sections: [{ heading: 'About', body: ['TODO: one card per presentation with an English title and 2–3 lines.'] }],
    links: [],
  },
  {
    slug: 'lab-book',
    world: 'biology',
    title: 'Lab book cover',
    summary: 'A lab notebook cover I designed myself, long before I learned to code.',
    meta: ['Visual design'],
    sections: [{ heading: 'About', body: ['TODO'] }],
    links: [],
  },
]

export const pagesByWorld = (world: World) => pages.filter((p) => p.world === world)
