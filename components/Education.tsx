'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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

const coursework = [
  'Data Structures (CS 25100)',
  'Computer Architecture (CS 25000)',
  'Programming in C (CS 24000)',
  'Foundations of CS (CS 18200)',
  'OOP (CS 18000)',
  'Multivariate Calculus (MA 26100)',
]

export default function Education() {
  return (
    <section id="education" className="py-24 border-t border-border-soft">
      <div className="content-container">
        <FadeUp>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-5 h-px bg-accent opacity-45" />
            <span className="font-mono text-[10px] text-accent tracking-[3px] uppercase">Education</span>
          </div>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div className="bg-surface border border-border rounded-xl px-9 py-8 mt-8 transition-all duration-300 hover:border-accent/15">
            <div className="font-display font-bold text-white text-[26px] tracking-[-0.4px] mb-2">
              Purdue University
            </div>
            <div className="text-[14px] text-text mb-1">
              B.S. Computer Science &nbsp;·&nbsp;{' '}
              <span className="text-accent">Minor in Artificial Intelligence</span>
            </div>
            <div className="font-mono text-[11px] text-dim tracking-[0.5px] mb-8">
              West Lafayette, IN &nbsp;·&nbsp; Expected May 2029
            </div>

            <div className="font-mono text-[10px] text-dim tracking-[1.5px] uppercase mb-3">
              Relevant Coursework
            </div>
            <div className="flex flex-wrap gap-2">
              {coursework.map((c) => (
                <span
                  key={c}
                  className="font-mono text-[11px] text-dim px-3 py-1 rounded border border-border bg-surface-2 tracking-[0.3px]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
