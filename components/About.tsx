'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { label: 'DEGREE', value: 'B.S. Computer Science · Minor in AI' },
  { label: 'UNIVERSITY', value: 'Purdue University, West Lafayette, IN' },
  { label: 'GRADUATING', value: 'May 2029' },
  { label: 'BACKGROUND', value: 'Belgium → Downingtown, PA → West Lafayette' },
]

const clubs = [
  { org: 'Google Developer Groups', role: 'SWE', project: 'Purdue Personal Trainer' },
  { org: 'ML@Purdue', role: 'ML Engineer', project: 'CodeSentry' },
  { org: 'Hack the Future', role: 'SWE', project: 'Pratigya Tournament Platform' },
]

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

export default function About() {
  return (
    <section id="about" className="py-28 border-t border-border-soft relative overflow-hidden">
      {/* kanji watermark */}
      <span
        aria-hidden="true"
        className="kanji-watermark absolute right-4 top-8 select-none"
      >
        について
      </span>

      <div className="content-container relative" style={{ zIndex: 10 }}>
        <FadeUp>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-5 h-px bg-accent opacity-45" />
            <span className="font-mono text-[10px] text-accent tracking-[3px] uppercase">About</span>
          </div>
          <h2
            className="font-display font-bold text-white mb-14 leading-[1.04] tracking-[-1px]"
            style={{ fontSize: 'clamp(30px, 4.5vw, 52px)' }}
          >
            A bit about me.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
          {/* prose */}
          <div className="space-y-5">
            <FadeUp delay={0.08}>
              <p className="text-[14.5px] text-text leading-[1.9]">
                I&apos;m a <strong className="text-white font-medium">Computer Science</strong> student
                at <strong className="text-white font-medium">Purdue University</strong> (Class of 2029)
                with a minor in Artificial Intelligence. I grew up in{' '}
                <strong className="text-white font-medium">Belgium</strong> as one of very few Indian
                students at my school, then moved to Downingtown STEM Academy in Pennsylvania before
                landing in West Lafayette.
              </p>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="text-[14.5px] text-text leading-[1.9]">
                I build full-stack ML systems focused on{' '}
                <strong className="text-white font-medium">production-grade engineering</strong> — real
                test coverage, real deployments, real users. From PyTorch classifiers trained on thousands
                of commits to REST APIs serving 400+ participants, I care about things that actually work
                in the wild, not just in notebooks.
              </p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <p className="text-[14.5px] text-text leading-[1.9]">
                When I&apos;m not building, I&apos;m at the poker table, the ping pong table, or the pool
                table. The three P&apos;s.
              </p>
            </FadeUp>

            {/* clubs */}
            <FadeUp delay={0.32}>
              <div className="pt-6 space-y-2.5 border-t border-border-soft mt-6">
                {clubs.map((c) => (
                  <div
                    key={c.org}
                    className="flex items-center gap-2 flex-wrap font-mono text-[11px] text-dim"
                  >
                    <span className="text-accent/50">—</span>
                    <span className="text-text">{c.org}</span>
                    <span className="opacity-40">·</span>
                    <span>{c.role}</span>
                    <span className="opacity-40">·</span>
                    <span className="text-accent/80">{c.project}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* stat cards */}
          <div className="space-y-2.5">
            {stats.map((s, i) => (
              <FadeUp key={s.label} delay={0.08 + i * 0.08}>
                <div className="bg-surface border border-border rounded-lg px-5 py-4 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/20 hover:translate-x-1">
                  <div className="font-mono text-[10px] text-dim tracking-[1.5px] mb-1.5">{s.label}</div>
                  <div className="text-white text-[13px] font-medium">{s.value}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
