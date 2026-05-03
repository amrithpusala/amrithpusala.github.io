'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path d="M1 5.5h9M6 1l4.5 4.5L6 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 border-t border-border-soft relative overflow-hidden">
      {/* kanji watermark */}
      <span aria-hidden="true" className="kanji-watermark absolute right-4 top-8 select-none">
        経験
      </span>

      <div className="content-container relative" style={{ zIndex: 10 }}>
        <FadeUp>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-5 h-px bg-accent opacity-45" />
            <span className="font-mono text-[10px] text-accent tracking-[3px] uppercase">Experience</span>
          </div>
          <h2
            className="font-display font-bold text-white mb-14 leading-[1.04] tracking-[-1px]"
            style={{ fontSize: 'clamp(30px, 4.5vw, 52px)' }}
          >
            Where I&apos;ve worked.
          </h2>
        </FadeUp>

        {/* Featured: CodeSentry */}
        <FadeUp delay={0.08}>
          <div className="mb-10 p-7 bg-surface border border-border rounded-xl relative overflow-hidden transition-all duration-400 hover:border-accent/20">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
              <div>
                <div className="font-display text-[20px] font-bold text-white tracking-[-0.3px] mb-1">
                  ML Engineer — CodeSentry
                </div>
                <div className="font-mono text-[11px] text-accent tracking-[0.4px]">
                  ML@Purdue &nbsp;·&nbsp; West Lafayette, IN
                </div>
              </div>
              <div className="font-mono text-[11px] text-dim tracking-[0.5px] whitespace-nowrap shrink-0">
                Mar 2026 – Present
              </div>
            </div>
            <ul className="space-y-2">
              {[
                'Built an AI code review bot deployed as a GitHub App that auto-reviews PRs with cross-file context awareness, analyzing function signatures, PR metadata, and commit history across all changed files to catch bugs spanning multiple modules',
                'Trained a PyTorch bug-risk classifier on 1,200+ real commits from 15 repos (Django, React, Flask) with 5 semantic features, achieving 73.4% recall at 2ms per PR',
                'Engineered a two-stage triage pipeline: classifier scores chunks and enriches with semantic adjustments, only high-risk code goes to Claude with file structure and risk focus areas — cutting API costs 40–60% while adding confidence filtering and duplicate grouping',
                'Shipped with 62 passing tests, a React dashboard with real-time snippet scanning, and inline PR comments with fix suggestions and severity labels. Deployed on Render with HMAC webhook verification',
              ].map((bullet) => (
                <li
                  key={bullet.slice(0, 30)}
                  className="flex gap-3 text-[13.5px] text-text leading-[1.72] group"
                >
                  <span className="mt-[5px] text-accent shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-5 pt-4 border-t border-border-soft">
              <a
                href="https://code-sentry-ai.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-dim hover:text-accent transition-colors duration-200 flex items-center gap-1.5"
              >
                <ExternalIcon /> Live
              </a>
              <a
                href="https://github.com/amrithpusala/CodeSentry"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-dim hover:text-accent transition-colors duration-200 flex items-center gap-1.5"
              >
                <GitHubIcon /> GitHub
              </a>
            </div>
          </div>
        </FadeUp>

        {/* Timeline entries */}
        <div className="divide-y divide-border-soft">
          {[
            {
              period: 'Oct 2025 – Present',
              role: 'SWE — Pratigya Tournament Platform',
              company: 'Hack the Future · West Lafayette, IN',
              bullets: [
                'Architected full REST API backend serving 400+ participants across 32 teams',
                'Role-based access control middleware with JWT authentication across 15+ protected endpoints',
                'Engineered automated eligibility pipeline computing player and team status from document verification, team size constraints, and compliance across 6 Mongoose schemas',
                'Developed Haversine-formula geolocation API to rank teams by proximity for intelligent match scheduling',
              ],
            },
            {
              period: 'Jan 2026 – Present',
              role: 'SWE — Purdue Personal Trainer',
              company: 'Google Developer Groups · West Lafayette, IN',
              bullets: [
                'Built end-to-end async pipeline: Riverpod → Dio HTTP → Firebase Cloud Functions → Gemini API',
                'Reactive plan generation with Firestore document caching for offline support',
                'Polished chat UI with themed message bubbles and animated typing indicator using phased AnimationController',
              ],
            },
            {
              period: 'Nov 2023 – Aug 2025',
              role: 'Coding Instructor',
              company: 'Code Ninjas · Downingtown, PA',
              bullets: [
                'Designed and delivered project-based curriculum in Java, Python, and JavaScript for 70+ students, providing 1-on-1 debugging support and mentorship from fundamentals through full project completion',
                'Drove 17+ new enrollments through improved student engagement and structured lesson planning, contributing directly to center revenue growth',
              ],
            },
          ].map((entry, i) => (
            <FadeUp key={entry.role} delay={0.08 + i * 0.08}>
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-5 py-9 transition-all duration-300 group hover:pl-1.5">
                <div className="font-mono text-[11px] text-dim tracking-[0.5px] leading-[1.9] sm:pt-1">
                  {entry.period}
                </div>
                <div>
                  <div className="font-display text-[19px] font-bold text-white tracking-[-0.3px] mb-1">
                    {entry.role}
                  </div>
                  <div className="font-mono text-[11px] text-accent/80 tracking-[0.4px] mb-4">
                    {entry.company}
                  </div>
                  <ul className="space-y-2">
                    {entry.bullets.map((b) => (
                      <li key={b.slice(0, 30)} className="flex gap-3 text-[13.5px] text-text leading-[1.72]">
                        <span className="mt-[5px] text-accent/60 shrink-0">
                          <ArrowIcon />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}
