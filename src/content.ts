// All site text lives here, so copy can be edited without touching components.
// Anything marked TODO is waiting for Mary Kate's own words or details.

import pjSignupVideo from './assets/pongjam/registration.mp4'
import pjSignupPoster from './assets/pongjam/registration-poster.webp'
import pjComputerFrame from './assets/pongjam/computer-frame.webp'
import pjModesVideo from './assets/pongjam/game-modes.mp4'
import pjModesPoster from './assets/pongjam/game-modes-poster.webp'
import pjCustomImg from './assets/pongjam/custom-game.webp'
import pjTournVideo from './assets/pongjam/tournaments.mp4'
import pjTournPoster from './assets/pongjam/tournaments-poster.webp'
import pjChatVideo from './assets/pongjam/chat.mp4'
import pjChatPoster from './assets/pongjam/chat-poster.webp'
import pjGameVideo from './assets/pongjam/game.mp4'
import pjGamePoster from './assets/pongjam/game-poster.webp'
import pjSettingsVideo from './assets/pongjam/user-settings.mp4'
import pjSettingsPoster from './assets/pongjam/user-settings-poster.webp'
import logo42 from './assets/logos/42white.webp'
import logoNsrf from './assets/logos/eu-nsrf.webp'
import logoHarvard from './assets/logos/harvard.webp'
import logoHms from './assets/logos/hms.webp'
import logoPanhellenics from './assets/logos/panhellenics.webp'
import logoEuroscola from './assets/logos/euroscola.webp'

export type World = 'coding' | 'biology'

export interface Link {
  label: string
  href: string
}

// A screen recording (silent, looping video with a still poster) or a still image.
export interface Media {
  video?: string
  poster?: string
  image?: string
  alt: string
}

export interface Section {
  heading: string
  body: string[] // paragraphs; supports **bold**, _italic_, ==accent colour== and [links](https://…)
  features?: { title: string; text: string; media: Media }[] // tiles with a recording each
  points?: { title: string; text: string }[] // short titled paragraphs, e.g. design decisions
  pointsHeading?: string // optional sub-heading shown above the points
}

export interface DetailPage {
  slug: string
  world: World
  title: string
  summary: string // one line, used on cards
  meta: string[] // small facts under the title (team size, stack, dates)
  featured?: boolean // full case study vs shorter page
  hero?: Media // large recording under the title
  heroFrame?: string // optional device image (transparent screen) the hero plays inside
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
    text: 'A project-based, peer-to-peer program with no teachers or classes. My projects ranged from C and Unix systems (processes, threads, memory allocation, a bash-like shell) to C++, an HTTP server and Docker. My graduation project was PongJam, a realtime multiplayer web platform where I designed the UI and built it into the frontend.',
    tag: 'Software engineering',
    logo: '42',
  },
  {
    dates: 'Sep 2018 — Jul 2023',
    title: 'BSc Molecular Biology & Genetics · Democritus University of Thrace',
    text: 'A 240 ECTS Bachelor of Science combining theoretical foundations with extensive laboratory training, from genetics, biochemistry and genomics to bioinformatics and Molecular Neuroscience. Graduated with Distinction (9.22/10, top 3 of my class), and earned a Teaching Certification in Biosciences alongside the degree.',
    tag: 'Molecular biology',
    logo: 'duth',
    sub: [
      {
        dates: 'Mar 2022 — Feb 2023',
        title: 'Undergraduate researcher · Biomedical Research Foundation of the Academy of Athens',
        logo: 'brfaa',
        text: 'Thesis research on how the transcription factor Prox1 affects DNA-repair genes in breast cancer cells (MCF7, MDA-MB-231): primer design from RNA-seq data, mammalian cell culture, adenoviral overexpression, RNA extraction, cDNA synthesis and real-time PCR. Graded 10/10.',
      },
      {
        dates: 'Feb 2020 — Dec 2021',
        title: 'Laboratory research trainee · Democritus University of Thrace',
        text: 'Selected for a laboratory training program in DNA cloning, building my own recombinant vectors (PCR, restriction digests, ligation, bacterial transformation, DNA isolation, gel electrophoresis), all documented in a detailed hand-written lab book with a self-designed cover.',
      },
    ],
  },
]

// image: picture or logo in the box on the left. imageStyle 'logo' = centred with padding, 'soft' = fills the box with faded edges, 'bare' = no box behind it (for transparent round logos).
export const honours: { title: string; year: string; text: string; image?: string; imageStyle?: 'logo' | 'soft' | 'bare' }[] = [
  { title: '42 Heilbronn scholarship', year: '2023', text: '18-month full scholarship: 140 hours a month on site and a faster project pace than the standard curriculum.', image: logo42 },
  { title: 'NSRF scholarship', year: '2020', text: 'One of 40 students across DUTH selected on academic merit and social criteria for financial support.', image: logoNsrf },
  { title: 'Panhellenic Examinations, Physics', year: '2018', text: 'Scored 100/100 in Physics in the national university entrance exams, in the top 0.11% nationally.', image: logoPanhellenics },
  { title: 'Harvard University, High School Summer Program', year: '2017', text: 'Three intensive weeks with Harvard’s Center for Hellenic Studies: philosophy, social and political science, and an EU summit simulation.', image: logoHarvard },
  { title: 'Euroscola, European Parliament', year: '2016', text: 'Selected as my region’s representative for a plenary simulation in English, debating EU policy with students from across the EU.', image: logoEuroscola },
  { title: 'Thalis Mathematics Competition', year: '2015', text: 'Award in the 74th Panhellenic Mathematics Competition “Thalis” of the Hellenic Mathematical Society.', image: logoHms, imageStyle: 'bare' },
]

export const leadership: { title: string; text: string }[] = [
  { title: '42 Student Council', text: 'Elected by the students of 42 Heilbronn to its last student council.' },
  { title: 'Student Cultural Club “PYXIDA”, DUTH', text: 'Elected special secretary, linking the cultural and artistic student groups to the Board.' },
  { title: 'Class president', text: 'Elected high school class president for consecutive years.' },
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
    pdf: 'https://drive.google.com/file/d/1BWljwkQD3v05ia4kNPe_8_6_ULGgZ3iH/view', // official certificate (PDF on Google Drive), opens in a new tab
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
  labAssistant: 'Lab assistant, DUTH, Feb 2020 – Dec 2021. TODO: one or two lines on what you did.',
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
    summary: 'A realtime multiplayer Pong platform, built from scratch by a team of five as our graduation project at 42. I designed the UI and built it into the frontend: the neon arcade look, the icon-based navbar and the layout of every page.',
    meta: ['Frontend development', 'UX/UI design', 'TypeScript', 'TailwindCSS', 'HTML', 'Docker', 'README', 'Documentation'],
    featured: true,
    hero: { video: pjSignupVideo, poster: pjSignupPoster, alt: 'Screen recording of signing up for PongJam' },
    heroFrame: pjComputerFrame,
    sections: [
      {
        heading: 'Project description',
        body: [
          '_The goal of this project was to build a modern web platform for the **legendary Pong game**—but with a twist: multiplayer, tournaments, chat, 3D graphics, and even AI opponents._',
          'In simpler words: imagine gathering with friends, entering your nicknames, and playing Pong directly in your browser—not only **one-on-one** on the same keyboard, but also **remotely against players online**, or even against a computer-controlled opponent (**AI**). The platform keeps track of who plays against whom, organises **tournaments**, and lets you **chat live** while the games unfold.',
          'Behind the scenes, we combined a frontend in ==TypeScript + TailwindCSS== with a backend of **microservices** (for authentication, matchmaking, chat, etc.) powered by **Fastify** and **SQLite**. For security, we added **Google login**, **2-Factor Authentication**, and **JWT tokens**, while monitoring is handled through **Prometheus** & **Grafana**. The game itself is enhanced with **3D visuals** (BabylonJS) that give a fresh look to the classic pong.',
          'In its final form, this project is not just “Pong”—it’s _a full multiplayer gaming experience on the web, reimagined with today’s technologies, AI challenges, and 3D design_.',
        ],
      },
      {
        heading: 'My role',
        body: ['PongJam was a team project of five people. I was responsible for the ==UI/UX design== and for building it into the ==frontend==: the look and **layout of every page**, the asset generation, and the organisation of the **navigation bar** and its icons. I also authored the project [README ↗](https://github.com/MKcodes2/PongJam#readme) with full **installation instructions** for launching the game.'],
      },
      {
        heading: 'What you can do',
        body: [],
        features: [
          {
            title: 'Game modes',
            text: 'Play 1v1 on one keyboard (WASD and arrow keys), against an AI at different levels, or online with 2 or 4 players.',
            media: { video: pjModesVideo, poster: pjModesPoster, alt: 'Screen recording of choosing a game mode' },
          },
          {
            title: 'Custom games',
            text: 'Choose the number of players, the AI difficulty, a time or score limit, obstacles and a kicker mode.',
            media: { image: pjCustomImg, alt: 'The custom game settings screen' },
          },
          {
            title: 'Tournaments',
            text: 'An admin creates the tournament, everyone plays everyone (round robin) and the highest total score wins.',
            media: { video: pjTournVideo, poster: pjTournPoster, alt: 'Screen recording of the tournaments page' },
          },
          {
            title: 'The game',
            text: 'Every custom setting changes the match, so the same game can be anything from classic Pong to every option switched on at once.',
            media: { video: pjGameVideo, poster: pjGamePoster, alt: 'Gameplay recording: a simple match, then one with every setting switched on' },
          },
          {
            title: 'User settings',
            text: 'Upload a new avatar, update your username, email and 2FA method, and change your password, all from one page.',
            media: { video: pjSettingsVideo, poster: pjSettingsPoster, alt: 'Screen recording of the user settings page' },
          },
          {
            title: 'Live chat',
            text: 'Private and tournament chats. Block a user, invite them to a 1v1, or minimise the chat while you play.',
            media: { video: pjChatVideo, poster: pjChatPoster, alt: 'Screen recording of the live chat' },
          },
        ],
      },
      {
        heading: 'Decisions and why',
        body: [],
        points: [
          {
            title: 'Icons instead of a crowded navbar',
            text: 'As the project grew, the navbar collected 10 to 12 text links, because everyone added a link to their own page. It was chaos. I reorganised it: game modes and tournaments moved to the home page, and the navbar became about five core icons (settings, users, profile, tournaments and so on) that I designed myself. In a game you don’t want lots of words around you; icons are quicker to read and more fun.',
          },
          {
            title: 'The home page is the game',
            text: 'With the game modes and tournaments on the home page, players land straight on what they came for: playing.',
          },
          {
            title: 'A neon arcade identity',
            text: 'Dark purple backgrounds, neon accents and a glowing outlined logo give PongJam the feel of a retro arcade.',
          },
        ],
      },
      // TODO: 'What I would improve', in Mary Kate's words.
    ],
    links: [{ label: 'View on GitHub', href: 'https://github.com/MKcodes2/PongJam' }],
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
