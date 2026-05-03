'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectCard from './ProjectCard'

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

const projects = [
  {
    index: 1,
    date: 'MAR 2026',
    name: 'CodeSentry',
    tagline: 'AI-powered code review GitHub App. PyTorch classifier + Claude API for intelligent PR review.',
    bullets: [
      'Trained a PyTorch bug-risk classifier on 1,200+ real commits from 15 repos (Django, React, Flask) with 5 semantic features, achieving 73.4% recall at 2ms per PR',
      'Engineered a two-stage triage pipeline: classifier scores chunks and enriches with semantic adjustments, only high-risk code goes to Claude — cutting API costs 40–60%',
      'Shipped with 62 passing tests, React dashboard with real-time snippet scanning, and inline PR comments with fix suggestions and severity labels',
      'Deployed on Render with HMAC webhook verification, CORS lockdown, and rate limiting',
    ],
    stack: ['Python', 'FastAPI', 'PyTorch', 'Claude API', 'React', 'Tailwind'],
    liveUrl: 'https://code-sentry-ai.vercel.app',
    githubUrl: 'https://github.com/amrithpusala/CodeSentry',
    wide: true,
  },
  {
    index: 2,
    date: 'MAR 2026',
    name: 'PokerLens',
    tagline: 'Full-stack poker equity calculator replacing $250+ commercial tools like PioSolver.',
    bullets: [
      'Trained a PyTorch neural network on 200K Monte Carlo simulations achieving 94.1% correlation, reducing equity inference from 500ms to 0.08ms — a 6,000x speedup',
      'Built and deployed 6 features across a React frontend (Vercel) and FastAPI backend (Render) with Google/GitHub OAuth via Supabase',
      'Engineered an action advisor computing pot odds, drawing outs, and fold/call/raise recommendations with step-by-step mathematical reasoning per decision',
      'CORS lockdown, per-IP rate limiting (30 req/min), HMAC webhook verification, Supabase row-level security',
    ],
    stack: ['Python', 'React', 'FastAPI', 'PyTorch', 'Supabase', 'OAuth'],
    liveUrl: 'https://pokerlens-psi.vercel.app',
    githubUrl: 'https://github.com/amrithpusala/pokerlens',
    wide: true,
  },
  {
    index: 3,
    date: 'SEP 2023 – JUN 2024',
    name: 'SymptoScan',
    tagline: 'AI diagnostic tool analyzing MIMIC-IV medical data. 5th nationally at TSA.',
    bullets: [
      'Analyzed 40,000+ medical cases from MIMIC-IV, achieving 12% reduction in diagnostic error rate through probabilistic symptom-to-diagnosis matching',
      'Placed 5th nationally at TSA National Conference for Software Development after earning 1st at State',
    ],
    stack: ['Python', 'React'],
    githubUrl: 'https://github.com/25sreddy/Sympto-Scan',
    wide: false,
  },
  {
    index: 4,
    date: '2023',
    name: 'LegalLens',
    tagline: 'AI-powered mobile app simplifying complex legal documents for lower-literacy individuals.',
    bullets: [
      'Translates dense legal language into accessible text for individuals with lower literacy levels',
      'Certificate of Special Congressional Recognition from PA-06 representative',
    ],
    stack: ['AI/ML', 'Mobile Development'],
    wide: false,
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-28 border-t border-b border-border-soft relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, transparent 0%, rgba(224,122,110,0.015) 40%, transparent 100%)',
      }}
    >
      {/* kanji watermark */}
      <span aria-hidden="true" className="kanji-watermark absolute right-4 top-8 select-none">
        桜
      </span>

      <div className="content-container relative" style={{ zIndex: 10 }}>
        <FadeUp>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-5 h-px bg-accent opacity-45" />
            <span className="font-mono text-[10px] text-accent tracking-[3px] uppercase">Projects</span>
          </div>
          <h2
            className="font-display font-bold text-white mb-4 leading-[1.04] tracking-[-1px]"
            style={{ fontSize: 'clamp(30px, 4.5vw, 52px)' }}
          >
            What I&apos;ve built.
          </h2>
          <div className="flex items-center gap-3 text-dim mb-14 font-mono text-[11px] tracking-[2px]">
            <span className="w-4 h-px bg-accent/40" />
            <span className="opacity-50">── ◆ ──</span>
            <span className="w-4 h-px bg-accent/40" />
          </div>
        </FadeUp>

        {/* Full-width cards */}
        <div className="space-y-5 mb-5">
          {projects
            .filter((p) => p.wide)
            .map((p) => (
              <ProjectCard
                key={p.name}
                {...p}
                delay={0.08}
              />
            ))}
        </div>

        {/* 2-col grid for smaller cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects
            .filter((p) => !p.wide)
            .map((p, i) => (
              <ProjectCard key={p.name} {...p} delay={0.08 + i * 0.1} />
            ))}
        </div>
      </div>
    </section>
  )
}
