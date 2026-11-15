import type { CSSProperties, ReactNode } from 'react'
import CdPrompt from '@/components/CdPrompt'
import SectionRail from '@/components/SectionRail'

/* ------------------------------------------------------------------ */
/* Content. Edit here; the layout below renders whatever is listed.    */
/* ------------------------------------------------------------------ */

const DIRECTORIES = [
  { href: '#research', name: 'research/', count: '1 lab' },
  { href: '#experience', name: 'professional-experience/', count: '2 roles' },
  { href: '#involvement', name: 'involvement/', count: '4 orgs' },
  { href: '#projects', name: 'projects/', count: '4 projects' },
  { href: '#honors', name: 'honors/', count: '3 awards' },
]

const RESEARCH = [
  {
    what: "Reproduced a training-free counterfactual pipeline on all 186 CARLA cases, matching the paper's recovery score",
    fig: '0.682 vs 0.682',
  },
  {
    what: 'Showed depth-warped counterfactuals degrade over the prediction horizon, barely beating a copied frame',
    fig: 'LPIPS 0.098 to 0.294',
  },
  {
    what: 'Gaussian splatting reconstruction (OmniRe) beat depth warping on static scenes in CARLA (12 cases)',
    fig: '+5.3 dB PSNR',
  },
  {
    what: 'Tested on real nuScenes driving and found the CARLA gain did not transfer',
    fig: '7 real scenes',
  },
  {
    what: "Showed that swapping in rendered ground truth can flip a benchmark's method rankings, with hypotheses written before running",
    fig: '186 cases',
  },
  {
    what: 'Building a counterfactual benchmark rendered entirely from reconstructed real driving scenes (nuScenes, 6 cameras + LiDAR)',
    fig: 'in progress',
  },
]

type Step = { title: string; date: string; body: ReactNode; current?: boolean }
type Entry = {
  org: string
  date: string
  role?: string
  body?: ReactNode
  steps?: Step[]
}

const EXPERIENCE: Entry[] = [
  {
    org: 'Johnson & Johnson',
    date: 'Aug 2026 to present',
    role: 'Undergraduate data analyst',
    body: 'QA and documentation review for an internal R package used for exposure-response analysis in clinical pharmacology. Reproduced Kaplan-Meier and Cox regression results against reference values, audited the docs of every exported function with an AI assistant and verified each finding by hand before filing, then fixed what R CMD check surfaced. Full suite at 499 passes and 0 failures; both PRs passed all 7 CI builds.',
  },
  {
    org: 'MSquare Technologies',
    date: 'Jun to Aug 2026',
    role: 'Software engineering intern, DataAgentX',
    body: 'Owned the natural-language feature of an LLM agent that turns plain-English requests into ETL/ELT pipelines across PostgreSQL, Snowflake, and Salesforce. Merged 8 PRs in 6 weeks, built 14 typed MCP tools, and fixed a silent data-loss bug with 26 regression tests.',
  },
]

const INVOLVEMENT: Entry[] = [
  {
    org: 'Hack the Future at Purdue',
    date: 'Sep 2025 to present',
    steps: [
      {
        title: 'Project Manager',
        date: 'Oct 2026 to present',
        current: true,
        body: 'One of 8 team leads selected from 600+ applicants. Leading a team through a year-long pro bono build for a nonprofit (project 2, in progress).',
      },
      {
        title: 'Software Engineer',
        date: 'Sep 2025 to present',
        body: "Project 1: built the backend REST API, JWT auth, and role-based access control across 15+ endpoints for nonprofit Pratigya's football tournament platform (MERN), serving 400+ participants across 32 teams, plus a Haversine-based algorithm that pairs teams geographically and suggests match venues.",
      },
    ],
  },
  {
    org: 'ML@Purdue',
    date: 'Jan 2026 to present',
    steps: [
      {
        title: 'Finance Committee',
        date: 'Sep 2026 to present',
        current: true,
        body: "Help manage the club's $5K budget for 500+ members.",
      },
      {
        title: 'Machine Learning Engineer',
        date: 'Jan to May 2026',
        body: (
          <>
            Built <a href="#projects">CodeSentry</a> and presented it at the
            club&apos;s Spring 2026 symposium.
          </>
        ),
      },
    ],
  },
  {
    org: 'Google Developer Groups',
    date: 'Jan to May 2026',
    role: 'Software engineer',
    body: 'Built the end-to-end pipeline for an AI fitness-coaching app for Purdue students: a Flutter client to serverless Cloud Functions to the Gemini API, with Firestore caching to eliminate redundant API calls.',
  },
  {
    org: 'Code Ninjas',
    date: 'Nov 2023 to Aug 2026, seasonal',
    role: 'Coding instructor',
    body: 'Taught a project-based Java, Python, and JavaScript curriculum to 70+ students from kindergarten through 9th grade, with 1-on-1 mentoring.',
  },
]

const PROJECTS = [
  {
    name: 'codesentry/',
    what: 'GitHub App that reviews pull requests with cross-file context, with a PyTorch bug-risk classifier as a triage stage',
    fig: '73.4% recall, 2 ms',
    live: 'https://code-sentry-ai.vercel.app',
    source: 'https://github.com/amrithpusala/CodeSentry',
  },
  {
    name: 'pokerlens/',
    what: 'Neural network surrogate for 200K Monte Carlo simulations of poker hand equity',
    fig: '6,000x faster',
    live: 'https://pokerlens-psi.vercel.app',
    source: 'https://github.com/amrithpusala/pokerlens',
  },
  {
    name: 'symptoscan/',
    what: 'Diagnostic matching over 40,000+ MIMIC-IV records',
    fig: '12% less error',
    source: 'https://github.com/25sreddy/Sympto-Scan',
  },
  {
    name: 'legallens/',
    what: 'NLP app that simplifies legal text',
    fig: '2nd, Congressional App Challenge',
  },
]

const HONORS = [
  {
    place: '1st',
    what: 'Jane Street Mystery Planet Trading Competition',
    date: 'Jul 2026',
  },
  {
    place: '2nd',
    what: 'Congressional App Challenge, PA-06 (LegalLens)',
    date: 'Dec 2024',
  },
  {
    place: '5th',
    what: 'TSA National Conference, Software Development (SymptoScan); 1st in Pennsylvania',
    date: 'Jun 2024',
  },
]

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

// Stagger for the landing lines, in milliseconds.
const delay = (ms: number) => ({ '--i': ms }) as CSSProperties

function Prompt({ children }: { children: ReactNode }) {
  return (
    <h2 className="rv">
      <span className="p">$</span> {children}
    </h2>
  )
}

function EntryBlock({ entry }: { entry: Entry }) {
  if (entry.steps) {
    return (
      <div className="entry spaced">
        <div className="head rv">
          <span className="org">{entry.org}</span>
          <span className="date">{entry.date}</span>
        </div>
        <div className="timeline">
          {entry.steps.map((step) => (
            <div
              key={step.title}
              className={step.current ? 'step current rv' : 'step rv'}
            >
              <div className="head">
                <span className="title">{step.title}</span>
                <span className="date">{step.date}</span>
              </div>
              <p className="body">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="entry rv">
      <div className="head">
        <span className="org">{entry.org}</span>
        <span className="date">{entry.date}</span>
      </div>
      {entry.role && <span className="role">{entry.role}</span>}
      <p className="body">{entry.body}</p>
    </div>
  )
}

export default function Home() {
  return (
    <div className="wrap">
      <SectionRail />
      <section id="top" className="landing">
        <p className="dim ln" style={delay(150)}>
          amrith@purdue:~<span className="p"> $</span> whoami
        </p>
        <div className="who ln" style={delay(550)}>
          <h1>Amrith Pusala</h1>
          <span className="dim">cs + math @ Purdue</span>
        </div>
        <p className="dim ln" style={delay(1000)}>
          amrith@purdue:~<span className="p"> $</span> ls -l
        </p>
        <nav className="dirs" aria-label="Sections">
          {DIRECTORIES.map((dir, i) => (
            <a
              key={dir.href}
              className="dir ln"
              href={dir.href}
              style={delay(1300 + i * 120)}
            >
              <span className="perm">drwxr-xr-x</span>
              <span className="name">{dir.name}</span>
              <span className="count">{dir.count}</span>
            </a>
          ))}
        </nav>
        <CdPrompt />
        <p className="hint ln" style={delay(2200)}>
          click a directory, or type its name and press enter
        </p>
      </section>

      <main>
        <section id="about" className="section first">
          <Prompt>cat about.txt</Prompt>
          <p className="about-lead rv">
            I like problems where a slow, expensive computation can be replaced
            by a fast learned one, and I care about checking that the result is
            actually right.
          </p>
          <p className="meta rv">
            B.S. Computer Science (Machine Intelligence), Math minor, May 2029.
            West Lafayette, IN.
          </p>
        </section>

        <section id="research" className="section">
          <Prompt>ls research/</Prompt>
          <div className="entry">
            <div className="head rv">
              <span className="org">Purdue Digital Twin Lab</span>
              <span className="date">Oct 2026 to present</span>
            </div>
            <p className="body rv">
              Undergraduate researcher with Prof. Ziran Wang, mentored by Dr.
              Jiaru Zhang. I study counterfactual prediction for
              autonomous-driving world models: what a camera would have seen if
              the car had driven a different path.
            </p>
          </div>
          <div className="rows">
            {RESEARCH.map((row) => (
              <div key={row.fig + row.what} className="row rv">
                <span className="what">{row.what}</span>
                <span className="fig">{row.fig}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <Prompt>ls professional-experience/</Prompt>
          <div className="entries">
            {EXPERIENCE.map((entry) => (
              <EntryBlock key={entry.org} entry={entry} />
            ))}
          </div>
        </section>

        <section id="involvement" className="section">
          <Prompt>ls involvement/</Prompt>
          <div className="entries">
            {INVOLVEMENT.map((entry) => (
              <EntryBlock key={entry.org} entry={entry} />
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <Prompt>ls projects/</Prompt>
          <div className="rows">
            {PROJECTS.map((project) => (
              <div key={project.name} className="row project rv">
                <span className="name">{project.name}</span>
                <span className="what">{project.what}</span>
                <span className="fig">{project.fig}</span>
                {(project.live || project.source) && (
                  <span className="links">
                    {project.live && <a href={project.live}>live</a>}
                    {project.source && <a href={project.source}>source</a>}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="honors" className="section">
          <Prompt>ls honors/</Prompt>
          <div className="rows">
            {HONORS.map((honor) => (
              <div key={honor.what} className="row honor rv">
                <span className="place">{honor.place}</span>
                <span className="what">{honor.what}</span>
                <span className="date">{honor.date}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="contact">
        <span className="dim">
          <span className="p">$</span> cat contact
        </span>
        <a href="mailto:apusala@purdue.edu">email</a>
        <a href="https://github.com/amrithpusala">github</a>
        <a href="https://www.linkedin.com/in/amrithpusala">linkedin</a>
        <a className="home" href="#top">
          cd ~
        </a>
      </footer>
    </div>
  )
}
