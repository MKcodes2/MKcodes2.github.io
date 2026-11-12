// All site text lives here, so copy can be edited without touching components.
// Anything marked TODO is waiting for Mary Kate's own words or details.

import pjSignupVideo from './assets/pongjam/registration.mp4'
import thesisPage1 from './assets/molecularBiology/thesis-page-1.webp'
import thesisWorkflowVideo from './assets/molecularBiology/thesis-workflow.mp4'
import thesisWorkflowPoster from './assets/molecularBiology/thesis-workflow-poster.webp'
import thesisPage2 from './assets/molecularBiology/thesis-page-2.webp'
import thesisPage3 from './assets/molecularBiology/thesis-page-3.webp'
import thesisPage4 from './assets/molecularBiology/thesis-page-4.webp'
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
import labBookCover from './assets/presentations/lab-book-cover.webp'
import snaresProteinsVideo from './assets/presentations/snares-video/proteins.mp4'
import snaresProteinsStart from './assets/presentations/snares-video/proteins-start.webp'
import snaresFusionVideo from './assets/presentations/snares-video/fusion.mp4'
import snaresFusionStart from './assets/presentations/snares-video/fusion-start.webp'
import logo42 from './assets/logos/42white.webp'
import rtOverview from './assets/minirt/overview.webp'
import rtFile from './assets/minirt/rt-file.webp'
import rtKeys from './assets/minirt/keys-memo.webp'
import rtCameraVideo from './assets/minirt/camera.mp4'
import rtCameraPoster from './assets/minirt/camera-poster.webp'
import rtLightVideo from './assets/minirt/light.mp4'
import rtLightPoster from './assets/minirt/light-poster.webp'
import rtObjectsVideo from './assets/minirt/objects.mp4'
import rtObjectsPoster from './assets/minirt/objects-poster.webp'
import rtStarsVideo from './assets/minirt/stars.mp4'
import rtStarsPoster from './assets/minirt/stars-poster.webp'
import rtColouredLight from './assets/minirt/colored-light.webp'
import rtSpecular from './assets/minirt/specular.webp'
import logoNsrf from './assets/logos/eu-nsrf.webp'
import logoHarvard from './assets/logos/harvard.webp'
import logoHms from './assets/logos/hms.webp'
import logoPanhellenics from './assets/logos/panhellenics.webp'
import logoEuroscola from './assets/logos/euroscola.webp'

export type World = 'coding' | 'biology'

// Presentation slides, one folder per presentation (01.webp, 02.webp, ...), cut from the4presentations_edited_pdfversion.pdf.
// Each ends with its "..." slide on purpose: it signals that teammates' slides are left out.
const slideFiles = import.meta.glob('./assets/presentations/{epigenetics,snares,nobel,epidemic}/*.webp', { eager: true, import: 'default' }) as Record<string, string>
const slidesOf = (deck: string): Slide[] =>
  Object.keys(slideFiles).filter((k) => k.includes(`/presentations/${deck}/`)).sort().map((k) => slideFiles[k])

// A slide is a still image, or a recording of its animations that plays once and stops on the finished
// slide. `poster` is the recording's first frame; `still` is the finished slide, shown instead of the
// recording to visitors who prefer reduced motion.
export type Slide = string | { video: string; poster: string; still: string }

// The SNARE slides 11 and 12 are recordings: their animations build the figures piece by piece.
const snareSlides = slidesOf('snares').map((s, i): Slide =>
  i === 10 ? { video: snaresProteinsVideo, poster: snaresProteinsStart, still: s as string }
  : i === 11 ? { video: snaresFusionVideo, poster: snaresFusionStart, still: s as string }
  : s)

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
  pointsTop?: boolean // beside a media: points packed at the top (one line down) instead of spread over the media's height
  pointsStyle?: 'list' // show the points as a list with ‣ markers instead of side bars
  media?: Media // a recording shown at 60% width, with the points numbered beside it
  decks?: Deck[] // presentations, each a slideshow with a short description beside it
}

// One presentation: its slides as a slideshow, with a small context line, a title and a short description.
export interface Deck {
  title: string
  context: string // course and date, small line above the title
  text: string
  slides: Slide[]
  alt: string
  ratio?: string // width / height of the slides, when not 16 / 9
  notes?: string[] // short side comments under the description
}

export interface DetailPage {
  slug: string
  world: World
  title: string
  summary: string // one line, used on cards
  meta: string[] // small facts under the title (team size, stack, dates); the first is the card's category unless category is set
  category?: string // the card's category on the hub, when it differs from meta[0]
  kicker?: string // small line above the title (place, dates)
  officialTitle?: string // the formal title, shown under the page title as a clarification
  grade?: string // shown on the same clarification line as the official title
  notes?: string[] // short notes under the summary, as a bulleted side note
  featured?: boolean // full case study vs shorter page
  hero?: Media // large recording under the title
  heroArt?: { src: string; alt: string } // a ready-made picture (frame included, transparent background), centred in the right column
  heroFrame?: string // optional device image (transparent screen) the hero plays inside
  heroPages?: string[] // page images shown as a stack, turning one after another (instead of a hero video)
  heroHref?: string // optional link the hero opens when clicked
  sections: Section[]
  links: Link[]
}

export const contact = {
  email: 'marykate.evan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mary-kate-evangelidou/',
  github: 'https://github.com/MKcodes2',
  cv: '/Mary-Kate-Evangelidou-CV.pdf', // CV file at public/Mary-Kate-Evangelidou-CV.pdf (also the downloaded file name)
}

export const profile = {
  name: 'Mary Kate Evangelidou',
  short: 'MK',
  role: 'Molecular Biologist · Software Developer',
  slogan: 'Designing systems across science and software',
  intro:
    'I’m Mary Kate, or just MK. A molecular biologist and software developer, but above all a curious mind. I want to research how genes shape the brain, development and behaviour, and can also bring coding to that research.',
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
    text: 'A 240 ECTS Bachelor of Science combining theoretical foundations with extensive laboratory training, from genetics, biochemistry and genomics to bioinformatics and Molecular Neuroscience. Graduated with a final grade of 9.22/10 ("Excellent", top band 8.5–10), and earned a Teaching Certification in Biosciences alongside the degree.',
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
  facts: [
    '42 Graduate, part of a worldwide network of 50+ campuses and 9,000+ alumni',
    'Project-based curriculum & peer-to-peer learning',
    '25 coding projects completed',
  ],
  networkLink: 'https://www.42network.org', // the arrow after the first fact
  // Short notes about 42 itself, shown with a side bar under the facts.
  about: [
    '42 is a non-profit network of tuition-free IT schools, founded in Paris in 2013 and now in more than 30 countries. In 2026, it was named the ==world’s 3rd most innovative educational institution==.',
    'No teachers, no classes, and campuses open 24/7. Students learn by building projects together: they search, experiment, explain their ideas to each other and take turns helping and being helped.',
  ],
  // My own paragraph, full width under the facts and the certificate.
  intro: [
    'I joined 42 Heilbronn on a full scholarship in March 2023, and it was ==one of the hardest and best experiences of my life==! It taught me to code, but above all it taught me how to learn. A few months in, having only just started with C, we were asked to build our own bash shell in C. Before 42 I would have called that impossible. The 42 motto, “_ask your peer on the left, ask your peer on the right, Google is your friend_”, really works: with supportive peers, what looks impossible becomes doable. I left 42 believing I can build what I set my mind to, with a strong **C and C++ foundation** that makes new programming languages easy to learn.',
  ],
  certificate: {
    heading: 'Core curriculum, completed',
    text: 'In September 2026 I completed the core curriculum and received 42’s certificate “Curriculum of Architect in Digital Technologies”, at Junior Developer level.',
    pdf: 'https://drive.google.com/file/d/1BWljwkQD3v05ia4kNPe_8_6_ULGgZ3iH/view', // official certificate (PDF on Google Drive), opens in a new tab
    link: '', // TODO: the Credly badge URL
  },
  // Pills under my paragraph, like the lab techniques on the Molecular Biology hub.
  skills: {
    heading: 'Languages & tools',
    items: [
      'C', 'C++', 'Python', 'TypeScript', 'HTML & CSS', 'Tailwind CSS', 'Git', 'Docker', 'Linux & Unix',
      'Makefiles', 'Memory management', 'Processes & pipes', 'Threads & mutexes', 'Algorithms & data structures',
      'Object-oriented programming', 'STL & templates', 'Networking (TCP/IP)', 'UX/UI design',
    ],
  },
  coursework: {
    heading: 'Coursework',
    text: [
      'The core curriculum is a ==gamified system of ranks==, from 0 to 6. Each rank is one circle on the Holy Graph, with harder projects than the last, and it only opens once the rank before it is complete: every new student starts with a single project, and each finished circle unlocks the next. This keeps the learning structured rather than scattered, as **every project builds on the knowledge of the circle before it**. Along the way came **five 3-hour exams**, coded completely blind, without even code completion, so every line had to be understood. The projects I completed are lit up in blue.',
      'It started with **Libft**, rebuilding parts of the C standard library, then moved through file handling, Unix processes and pipes, sorting algorithms, a first 2D game and concurrency with threads, all in C, to the first big team projects, **minishell** and **miniRT**. The second half brought **C++**, from object-oriented basics to templates and the STL, an HTTP server (**webserv**) and Docker infrastructure (**Inception**), and it ended with **ft_transcendence**, a full-stack web platform built by a team of five: ==PongJam==.',
    ],
  },
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
    { rank: 7, label: 'Mastery', projects: [
      { name: 'computorv1', details: 'Parse and solve polynomial equations of degree 2 or lower, showing the reduced form, the degree and real or complex solutions in Python.', hours: 49 },
    ] },
  ],
}

export const biologyHub = {
  facts: [
    'BSc Molecular Biology & Genetics, 240 ECTS',
    'Final grade 9.22/10 ("Excellent", top band 8.5–10), ranked 3rd in my year',
    'Thesis grade: 10/10',
  ],
  intro: [
    'My degree at DUTH combined extensive laboratory training with courses from genetics, biochemistry and genomics to bioinformatics and Molecular Neuroscience. Alongside it, I trained for two years in DNA cloning and spent my final year as an undergraduate researcher at BRFAA in Athens.',
  ],
  techniques: [
    'Mammalian cell culture', 'Aseptic technique', 'Adenoviral overexpression', 'Primer design', 'RNA extraction',
    'cDNA synthesis', 'Real-time PCR (qPCR)', 'qPCR data analysis', 'PCR', 'DNA cloning', 'Restriction digests',
    'Ligation', 'Bacterial transformation', 'DNA isolation', 'Gel electrophoresis & electroelution',
    'Lab notebook documentation', 'Recombinant DNA workflows', 'Cryopreservation',
  ],
  coursework: {
    heading: 'Coursework',
    // **bold**, _italic_ (course titles) and ==purple== as on the detail pages.
    intro: 'The degree started from the **STEM fundamentals**, such as _Physics_, _Inorganic_, _Organic_ and _Physical Chemistry_ and _Biostatistics_, then moved into the core of the field: _Biochemistry_, _Genetics_, _Cellular_ and _Molecular Biology_, with **hands-on laboratory courses** throughout. Later years added _Genomics_, _Proteomics_, _Bioinformatics_ and _Systems Biology_, up to **advanced courses** such as _Molecular Neurobiology_, _Developmental Biology_ and _Molecular Immunology_. The full list of courses is below.',
    teaching: 'The degree also included a ==Certificate of Pedagogical and Teaching Competence==, from eight courses including _Pedagogics_, _Counseling & Educational Psychology_, _Organizational Psychology_, _Adult Education_ and _Teaching Methodology_, plus a microteaching practicum.',
    // Course titles and ECTS as on the official English transcript. Regular courses in the order
    // they were completed; the two certificate groups at the end.
    groups: [
      { title: '', courses: [
        ['Physics for Biological Sciences', 5], ['Inorganic Chemistry', 5], ['Introduction to Biology', 5],
        ['Organic Chemistry', 5], ['Laboratory Course I', 5], ['Laboratory Course II', 5], ['English I', 2],
        ['Molecular Biology I', 6], ['Physical Chemistry and Elements of Biophysics', 5], ['Biochemistry I', 4],
        ['Genetics I', 4], ['Introduction to Organismal Biology', 4], ['Molecular Biology II', 5],
        ['Molecular Microbiology', 4], ['Cellular Biology', 5], ['Biochemistry II', 5],
        ['Introduction to Molecular Biology Techniques', 4], ['English II', 2], ['Laboratory Course III', 5],
        ['Laboratory Course IV', 5], ['Genetics II', 4], ['Biostatistics', 3], ['Physiology', 5],
        ['Gene Expression and Cell Signalling', 5], ['Histology', 3], ['Principles of Laboratory Animal Management', 3],
        ['Radiobiology', 3], ['Molecular Immunology', 5], ['Developmental Biology', 4],
        ['Population and Evolutionary Genetics', 5], ['Methods in Molecular Biology', 5],
        ['Modeling of Physical-Chemical Processes in Biology', 3], ['Laboratory Course VI', 5],
        ['Applied Biotechnology', 4], ['Molecular Structure and Function I', 4], ['Regulation of Cell Function', 4],
        ['Genomics', 4], ['Forensic Genetics', 3], ['Advanced Molecular Biology Techniques', 4], ['Proteomics', 3],
        ['Human Genetics', 5], ['Applications of Molecular Biology in Medical Sciences', 5],
        ['Molecular Neurobiology', 4], ['Systems Biology', 3],
      ] },
      { title: 'Courses for the informatics certificate', courses: [
        ['Introduction to Computational Biology', 5], ['Advanced Themes in Computational Biology', 3],
        ['Bioinformatics', 5], ['Advanced Themes in Bioinformatics', 3],
      ] },
      { title: 'Courses for the pedagogical & teaching certificate', courses: [
        ['Counseling & Educational Psychology', 3], ['Pedagogics', 2], ['Teaching Methodology', 5],
        ['Teaching Practical Course I', 6], ['Career Development of Bioscientists', 3], ['Teaching Practical Course II', 3],
        ['Adult Education', 3], ['Organizational Psychology', 3],
      ] },
    ] as { title: string; courses: [string, number][] }[],
  },
}

export const pages: DetailPage[] = [
  // ---------- Coding ----------
  {
    slug: 'pongjam',
    world: 'coding',
    title: 'PongJam',
    summary: 'A realtime multiplayer Pong platform, built from scratch by a team of five as our graduation project at 42. I designed the UI and built it into the frontend: the neon arcade look, the icon-based navbar and the layout of every page.',
    category: 'TypeScript, Tailwind CSS, UX/UI',
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
        pointsStyle: 'list',
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
    summary: 'A ray tracer in C, built by a team of two, that turns a plain text scene file into a rendered image. I wrote the parser that reads every scene and designed the dual mode: full HD render VS interactive mode.',
    category: 'C, Parsing, UX',
    meta: ['C', 'Parser', 'Dual-mode design', 'User experience', 'MLX42', 'README', 'Documentation'],
    featured: true,
    heroArt: { src: rtOverview, alt: 'A monitor showing a .rt scene file on the left and the snowman image miniRT renders from it on the right' },
    sections: [
      {
        heading: 'Project description',
        body: [
          '_The goal of this project is to generate images using the **Raytracing protocol**. Those computer-generated images each represent a scene, as seen from a specific angle and position, defined by simple geometric objects, and each with its own lighting system._',
          'In simpler words: a **.rt file**, full of numbers that follow strict rules, describes a scene: the camera, the light, and objects such as spheres, planes, cylinders and cones. miniRT reads that file and renders the image it describes, using the **MLX42** graphics library.',
          'Beyond the mandatory part (planes, spheres and cylinders, ambient and diffuse light, hard shadows), we added **cones**, **coloured light**, **specular reflection**, **soft shadows**, **live movement** of the camera, light and objects, and a starry background.',
        ],
      },
      {
        heading: 'My role',
        body: ['miniRT was a team project of two. My teammate, wrote the vector math of the ray tracing engine. I wrote the entire ==parser== in C: it reads the .rt scene file, checks every value and serves the engine all the data structures it needs. I designed the ==dual mode== and the **user experience** of running the program: the two launch modes, the instructions in the terminal and the key guide for the interactive mode. I also authored the project [README ↗](https://github.com/MKcodes2/miniRT#readme), with its diagrams and recordings.'],
      },
      {
        heading: 'The scene file',
        body: ['Every scene starts as a .rt text file. The parser reads it line by line, in any order, and builds the scene for the ray tracing engine.'],
        pointsTop: true,
        media: { image: rtFile, alt: 'Diagram of the .rt scene file format, explaining every value of each element' },
        points: [
          { title: 'Three elements, exactly once', text: 'Ambient light (A), camera (C) and light (L) must each appear once in every scene.' },
          { title: 'Objects in any number', text: 'Planes, spheres, cylinders and cones, in any combination and any order.' },
          { title: 'Strict rules for every value', text: 'Colours from 0 to 255, ratios from 0 to 1, a field of view from 0 to 180 degrees, vectors from -1 to 1. The parser checks each one.' },
          { title: 'A clear message for every mistake', text: 'A missing camera, a duplicate light, a wrong identifier or file extension: each case stops the program with its own error message.' },
        ],
      },
      {
        heading: 'What you can do',
        body: [],
        features: [
          {
            title: 'Move the camera',
            text: 'Move and rotate the camera live, as if walking around the scene.',
            media: { video: rtCameraVideo, poster: rtCameraPoster, alt: 'Recording of the camera moving around an ice cream scene' },
          },
          {
            title: 'Move the light',
            text: 'Move the light and watch the shading and the shadows follow it.',
            media: { video: rtLightVideo, poster: rtLightPoster, alt: 'Recording of the light moving across a scene' },
          },
          {
            title: 'Move the objects',
            text: 'Move or rotate one object at a time, or all of them at once.',
            media: { video: rtObjectsVideo, poster: rtObjectsPoster, alt: 'Recording of objects moving and rotating in a scene' },
          },
          {
            title: 'Coloured light',
            text: 'The light has its own RGB colour, which tints the whole scene.',
            media: { image: rtColouredLight, alt: 'The same scene rendered with pink, yellow, purple and green light' },
          },
          {
            title: 'Specular reflection',
            text: 'Smooth surfaces reflect the light like a mirror, with a sharp highlight.',
            media: { image: rtSpecular, alt: 'Specular highlights on a sphere and a half sphere, marked with arrows' },
          },
          {
            title: 'A starry background',
            text: 'Where no plane closes the scene, random stars replace the empty black.',
            media: { video: rtStarsVideo, poster: rtStarsPoster, alt: 'A rocket rendered in front of twinkling random stars' },
          },
        ],
      },
      {
        heading: 'Moving the scene',
        body: ['In the interactive mode, you hold one element key and press one movement key.'],
        pointsTop: true,
        media: { image: rtKeys, alt: 'Keyboard diagrams: the element keys on the left, the rotation and translation keys on the right' },
        points: [
          { title: 'Choose what to move', text: 'C for the camera, L for the light, O for all objects, or 1 to 9 for a single object, in the order of the scene file.' },
          { title: 'Choose how to move it', text: 'The arrow keys, + and - move it along the x, y and z axes; A, D, W, S, E and Z rotate it.' },
        ],
      },
      {
        heading: 'Decisions and why',
        body: [],
        pointsStyle: 'list',
        points: [
          {
            title: 'Two modes instead of one',
            text: 'The subject asked for a single static image. But moving the scene live was so much more fun that I wanted to keep it, and live movement needs a light, fast render. So the program runs in two modes, chosen by its arguments: with **HD** after the scene file, it opens a 1920×1080 window with soft shadows; without it, an 800×600 interactive window with hard shadows, where everything can move.',
          },
          {
            title: 'Instructions in the terminal',
            text: 'When the interactive mode starts, the terminal prints which keys move what, so nobody has to open the README to start playing.',
          },
          {
            title: 'A README anyone can follow',
            text: 'I documented the project with diagrams of the .rt format and the keys, and recordings of every feature, so anyone can write and explore their own scenes.',
          },
        ],
      },
    ],
    links: [{ label: 'View on GitHub', href: 'https://github.com/MKcodes2/miniRT' }],
  },
  // Hidden until their pages are ready: uncomment a line to put that project live (card, page and Next link).
  // { slug: 'minishell', world: 'coding', title: 'minishell', category: 'C, Bash, Env', summary: 'TODO: one line.', meta: ['C'], sections: [{ heading: 'About', body: ['TODO'] }], links: [{ label: 'GitHub', href: '#' }] },
  // { slug: 'so_long', world: 'coding', title: 'so_long', category: 'C, 2D game', summary: 'TODO: one line.', meta: ['C'], sections: [{ heading: 'About', body: ['TODO'] }], links: [{ label: 'GitHub', href: '#' }] },
  // ---------- Biology ----------
  {
    slug: 'thesis',
    world: 'biology',
    title: 'Gene regulatory networks in cancer cells',
    summary: 'My BSc thesis: does the transcription factor Prox1, which may act as a tumour suppressor in breast cancer, also affect the genes that repair DNA? I overexpressed Prox1 in two breast cancer cell lines and measured 15 repair genes with real-time PCR.',
    category: 'Undergraduate research',
    kicker: 'BRFAA, Athens \u00b7 Mar 2022 - Feb 2023',
    officialTitle: 'Study of Gene Regulatory Networks Affecting Metabolism and DNA Repair in Cancer Cells',
    grade: '10/10',
    meta: ['Mammalian cell culture', 'MCF7 & MDA-MB-231 cells', 'Adenoviral overexpression', 'Primer design', 'RNA extraction', 'cDNA synthesis', 'Real-time PCR (qPCR)'],
    featured: true,
    heroPages: [thesisPage1, thesisPage2, thesisPage3, thesisPage4],
    heroHref: 'https://drive.google.com/file/d/1-mcoudLMc905iLluqNW2RVsfdFP0wpIC/view?usp=sharing',
    sections: [
      {
        heading: 'The question',
        body: [
          '**Prox1** is a transcription factor known mostly for its role in development and cell fate. Earlier work in the lab, and the literature, pointed to a **tumour-suppressing** role in breast cancer. I asked whether it might also act indirectly, through the **DNA-repair** systems that keep the genome stable: a link that had not been studied.',
          'I tested this in two human breast cancer cell lines that differ in a way that matters here: _MCF7_, which is oestrogen-receptor positive, and _MDA-MB-231_, which is triple-negative.',
        ],
      },
      {
        heading: 'What I did',
        body: [],
        media: { video: thesisWorkflowVideo, poster: thesisWorkflowPoster, alt: 'Animated summary of the workflow, from choosing the genes to the real-time PCR results' },
        points: [
          { title: 'Choosing the genes', text: 'From the lab\u2019s earlier RNA-seq of mouse Neuro2A cells overexpressing Prox1, I selected 13 DNA-repair genes whose expression changed most, added two further genes of interest (_SMARCA1_ and _SMAD3_), and designed real-time PCR primers for all 15.' },
          { title: 'Cell culture', text: 'I cultured MCF7 and MDA-MB-231 cells, including thawing, splitting and cryopreservation, and HEK cells to prepare the adenovirus.' },
          { title: 'Overexpressing Prox1', text: 'A three-day infection with an adenovirus carrying either Prox1 or GFP as the control, checked under a fluorescence microscope before I went on.' },
          { title: 'Measuring the genes', text: 'RNA extraction, cDNA synthesis and real-time PCR for all 15 genes, three biological replicates per cell line, analysed with the \u0394\u0394Cq method.' },
        ],
      },
      {
        heading: 'What I found',
        body: [
          'Eight of the 15 genes changed significantly in each cell line, and five of them rose in both when Prox1 was overexpressed: ==XPA==, ==LIG4==, ==PIN4==, ==WEE1== and ==DDIT3==. Prox1 could regulate them directly, by binding their regulatory regions, or indirectly, through the pathways and gene networks it takes part in.',
        ],
        pointsStyle: 'list',
        points: [
          { title: 'Repair is not a simple story', text: 'Efficient DNA repair keeps the genome stable and is generally thought to protect against cancer. In some contexts, though, it can also help tumour cells survive treatment. LIG4, which rose the most, and WEE1 are two examples: high levels of both have been linked to harder-to-treat breast cancer.' },
          { title: 'Signs of a dual role', text: 'The literature already describes Prox1 as tumour-suppressing in some settings and tumour-promoting in others. My results add new detail to this **dual role** rather than settling it.' },
          { title: 'The receptor may matter', text: 'Breast cancer is very heterogeneous, and Prox1 interacts with oestrogen-receptor signalling. This could explain why ATM and PRKDC dropped only in the ER-positive MCF7 cells and not in the triple-negative MDA-MB-231.' },
          { title: 'A promising, open question', text: 'A firm link between Prox1 and DNA repair cannot be drawn yet. Prox1 remains a potentially valuable prognostic marker, and understanding how it works could help improve breast cancer treatment.' },
        ],
      },
      {
        heading: 'What I would do next',
        body: [
          'DNA-repair assays would measure damage and repair directly, instead of inferring them from expression. Co-immunoprecipitation would show whether Prox1 physically interacts with repair proteins. Above all, breast cancer is heterogeneous, so any of this needs several more cell lines before it means much.',
        ],
      },
    ],
    // TODO: link to the excerpt (title page, contents, abstract) once it is uploaded.
    links: [],
  },
  {
    slug: 'presentations',
    world: 'biology',
    title: 'Presentations & lab book cover',
    summary: 'Slides from four team presentations I gave during my BSc studies at DUTH, and the cover I personally designed for my own physical lab book, a handwritten laboratory notebook of over 160 pages, as an example of scientific communication & design.',
    notes: [
      '==Only the slides I designed are included==, and ++not++ the entire team presentation. Content has been selectively curated to showcase visual communication rather than complete narrative flows.',
      'Cover slides were adapted to English for this page, but the remaining content is primarily in Greek.',
    ],
    category: 'Scientific communication & design',
    kicker: 'DUTH \u00b7 2020 - 2021',
    meta: ['Scientific storytelling', 'Visual communication', 'Slide design', 'Graphic design', 'Public speaking', 'Microsoft PowerPoint'],
    sections: [
      {
        heading: 'Presentations',
        body: [
          'From early in my degree, creating presentations and scientific visuals that explain knowledge in the clearest, most engaging and interactive way was a part I enjoyed a lot. I wanted every listener to be able to follow me, so I took every chance to present, in required and voluntary assignments alike. These four are a small selection.',
          'In the original talks, every element was animated to appear in step with my explanation. To keep this page light, each slide is shown in its finished state, except for two examples in the SNAREs presentation (slides 11 and 12), which play with their full animations.',
        ],
        decks: [
          {
            title: 'Epigenetic Analysis in Forensics',
            context: 'Forensic Genetics \u00b7 May 2021',
            text: 'My part covered DNA methylation profiling: how bisulfite treatment works, and the techniques that detect methylation, from microarrays and sequencing to quantitative PCR and Ms-SNuPE.',
            slides: slidesOf('epigenetics'),
            alt: 'Slides from the epigenetics in forensics presentation',
          },
          {
            title: 'The Role of SNAREs in Synaptic Transmission',
            context: 'Molecular Neurobiology \u00b7 May 2020',
            text: 'How SNARE proteins are classified and built, how the SNARE complex forms and comes apart, and how it drives the membrane fusion that releases neurotransmitters.',
            slides: snareSlides,
            notes: [
              'One of the hardest presentations I have prepared. Understanding SNAREs, membrane fusion and what every single protein does took a lot of paper reading, and it is still one of my favourites.',
              '**Fun fact:** it was also one of my first presentations, made in PowerPoint 2007, the only version I had back then. Today I would redesign much of it, but I have kept it as it was, as a reminder of how my slide design started.',
            ],
            alt: 'Slides from the SNARE presentation',
          },
          {
            title: 'Nobel Prize in Chemistry 2015',
            context: 'Genomics \u00b7 Mar 2021',
            text: 'An overview of Tomas Lindahl, Aziz Sancar and Paul Modrich and the DNA-repair mechanisms they mapped: base excision, nucleotide excision and mismatch repair.',
            slides: slidesOf('nobel'),
            alt: 'Slides from the Nobel Prize in Chemistry 2015 presentation',
          },
          {
            title: 'Simulation of the Spread of an Epidemic',
            context: 'Modeling of Physical-Chemical Processes in Biology \u00b7 Jan 2021',
            text: 'Starting from COVID-19, my slides build up the SIR model of an epidemic: the maths behind it, its rates of change, and the starting conditions under which an epidemic breaks out.',
            slides: slidesOf('epidemic'),
            alt: 'Slides from the epidemic simulation presentation',
          },
        ],
      },
      {
        heading: 'Lab book cover',
        body: [],
        decks: [
          {
            title: 'A cover for my laboratory notebook',
            context: 'DUTH \u00b7 2020 - 2021',
            text: 'I designed it during my time as a laboratory research trainee, then printed it and wrapped it around my own physical laboratory notebook: over 160 handwritten pages of DNA cloning experiments. These experiments inspired every visual element: gel electrophoresis results, bacterial cultures, cloning vectors and DNA polymerase structures. The frame on the right shows a DNA double helix with a polymerase passing through it, a nod to the replication and cloning work at the heart of the notebook.',
            notes: [
              '**Fun fact:** it was made entirely in PowerPoint, even the sizing adjustments so that the printed cover would fit the notebook exactly.',
            ],
            slides: [labBookCover],
            alt: 'The cover I designed for my laboratory notebook, with its matching side frame',
            ratio: '1284 / 858',
          },
        ],
      },
    ],
    links: [],
  },
]

export const pagesByWorld = (world: World) => pages.filter((p) => p.world === world)
