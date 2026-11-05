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

// period: shown on the hub pages. highlights: shown on the home cards, says what is inside the hub.
export const worlds: Record<World, { label: string; path: string; period: string; highlights: string; blurb: string }> = {
  biology: {
    label: 'Molecular Biology',
    path: '/biology',
    period: 'BSc DUTH · 2018 – 2023',
    highlights: 'The DUTH and BRFAA journey',
    blurb: 'Thesis research on gene regulatory networks (cell culture, adenoviral infection, qPCR), two years of recombinant DNA work, and scientific presentations…',
  },
  coding: {
    label: 'Software Engineering',
    path: '/coding',
    period: '42 Heilbronn · 2023 – 2026',
    highlights: 'The 42 Journey',
    blurb: 'Projects from low-level C (memory management, multiprocessing, sorting algorithms), C++ and Python, to full-stack web development and UX/UI design...',
  },
}

// About section on the home page: newest first, like the reference timeline.
// sub: smaller entries shown indented under a main entry (e.g. lab roles during the BSc).
// logo: a key into the logo map in Home.tsx (files live in src/assets/logos/).
type TimelineLogo = '42' | 'duth' | 'brfaa'
type TimelineSub = { dates: string; title: string; text: string; logo?: TimelineLogo }
export const timeline: { dates: string; title: string; text: string; tag: string; logo?: TimelineLogo; sub?: TimelineSub[] }[] = [
  {
    dates: 'Mar 2023 — Sep 2026',
    title: 'Software Engineering · 42 Heilbronn',
    text: 'Scholarship programme in software engineering: C, C++, Python, Docker and full-stack web. My graduation project was PongJam, a realtime multiplayer web platform where I designed and built the frontend.',
    tag: 'Software engineering',
    logo: '42',
  },
  {
    dates: 'Sep 2018 — Jul 2023',
    title: 'BSc Molecular Biology & Genetics · Democritus University of Thrace',
    text: 'Graduated with Distinction (9.22/10, top 3 of my class), supported by an NSRF scholarship. Thesis on gene regulatory networks in breast cancer cells, graded 10/10.',
    tag: 'Molecular biology',
    logo: 'duth',
    sub: [
      {
        dates: 'Mar 2022 — Feb 2023',
        title: 'Research intern · Biomedical Research Foundation of the Academy of Athens',
        logo: 'brfaa',
        text: 'Thesis research: Prox1 overexpression in breast cancer cell lines (MCF7, MDA-MB-231) using adenoviral vectors, analysed with qPCR.',
      },
      {
        dates: 'Feb 2020 — Dec 2021',
        title: 'Laboratory assistant · Democritus University of Thrace',
        text: 'Two years of hands-on training in a university lab alongside my studies.',
      },
    ],
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

// Coding hub (the 42 journey page).
// curriculum: the core curriculum from the 42 transcript, shown in the expandable table.
// Exams are left out because they have no description or workload.
export const codingHub = {
  intro: [
    '42 has no classes and no teachers. Its curriculum is project-based and peer-to-peer: students “learn to learn” by building projects together and taking ideas from each other.',
    'I joined 42 Heilbronn on a full scholarship in March 2023.',
  ],
  ranking: 'In 2026, the World University Rankings for Innovation (WURI) named 42 the 3rd most innovative educational institution in the world.',
  certificate: {
    heading: 'Core curriculum, completed',
    text: 'In September 2026 I completed the core curriculum and received 42’s certificate “Curriculum of Architect in Digital Technologies”, at Junior Developer level.',
    link: '', // TODO: the Credly badge URL
  },
  holyGraph: 'The Holy Graph is 42’s map of the core curriculum. Every project I completed is lit up in blue.',
  curriculum: [
    { rank: 0, projects: [
      { name: 'Libft', details: 'Reimplementation of key C standard library functions and custom utilities.', hours: 70 },
    ] },
    { rank: 1, projects: [
      { name: 'ft_printf', details: 'Custom printf using variadic functions and format specifiers in C.', hours: 70 },
      { name: 'get_next_line', details: 'Read file or input content line by line with buffer management in C.', hours: 70 },
      { name: 'Born2beroot', details: 'Introduction to system administration and virtualisation with Linux.', hours: 40 },
    ] },
    { rank: 2, projects: [
      { name: 'so_long', details: 'Create a 2D game with player movement, collectibles and event handling in C.', hours: 60 },
      { name: 'pipex', details: 'Implement UNIX pipe mechanics to connect processes and manage I/O in C.', hours: 50 },
      { name: 'push_swap', details: 'Sort a stack with a minimal set of operations using sorting algorithms in C.', hours: 60 },
    ] },
    { rank: 3, projects: [
      { name: 'minishell', details: 'Team project: develop a mini bash handling signals, commands, paths and env variables in C.', hours: 210 },
      { name: 'Philosophers', details: 'Learn concurrency using threads and mutexes in the dining philosophers problem in C.', hours: 70 },
    ] },
    { rank: 4, projects: [
      { name: 'miniRT', details: 'Team project: build a ray tracer rendering 3D scenes with shapes and lighting in C.', hours: 280 },
      { name: 'NetPractice', details: 'Configure IP routing and subnetting to build functional network connections.', hours: 50 },
      { name: 'CPP Module 00', details: 'Understand C++ basics vs C: namespaces, classes, stdlib and intro to OOP.', hours: 22 },
      { name: 'CPP Module 01', details: 'Study memory allocation, references and member pointers in C++.', hours: 12 },
      { name: 'CPP Module 02', details: 'Explore polymorphism, function overloading and canonical form in C++.', hours: 12 },
      { name: 'CPP Module 03', details: 'Learn inheritance principles and how to extend class behaviour in C++.', hours: 12 },
      { name: 'CPP Module 04', details: 'Use abstract classes, interfaces and subtype polymorphism in C++.', hours: 12 },
    ] },
    { rank: 5, projects: [
      { name: 'CPP Module 05', details: 'Handle exceptions with try/catch and understand error management in C++.', hours: 25 },
      { name: 'CPP Module 06', details: 'Apply static, dynamic, const and reinterpret casts properly in C++.', hours: 25 },
      { name: 'CPP Module 07', details: 'Learn to write and use generic functions and classes with templates in C++.', hours: 25 },
      { name: 'CPP Module 08', details: 'Use STL-style containers, iterators and algorithms via templates in C++.', hours: 25 },
      { name: 'CPP Module 09', details: 'Deepen understanding of STL containers like vector, map, set and deque.', hours: 40 },
      { name: 'webserv', details: 'Team project: build an HTTP server to handle requests, responses and browser testing in C++.', hours: 175 },
      { name: 'Inception', details: 'Learn system administration fundamentals by virtualising multiple Docker images.', hours: 210 },
    ] },
    { rank: 6, projects: [
      { name: 'ft_transcendence', details: 'Team project: build and manage a full-stack web game platform from scratch (PongJam).', hours: 245 },
    ] },
  ],
}

export const biologyHub = {
  facts: [
    'BSc Molecular Biology & Genetics, 240 ECTS',
    'Final grade 9.22 / 10 ("Excellent"), top 3 of the cohort',
    'Thesis graded 10 / 10',
  ],
  intro: ['TODO: a short paragraph on the degree and what drew you to molecular biology.'],
  techniques: ['Cell culture', 'PCR / qPCR', 'DNA cloning', 'Adenoviral overexpression', 'Gel electrophoresis'],
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
    summary: 'BSc thesis at BRFAA: Prox1 overexpression in breast cancer cell lines, measured with qPCR.',
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
