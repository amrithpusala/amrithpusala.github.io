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

const awards = [
  {
    rank: '5th',
    title: 'TSA National Conference — Software Development',
    meta: 'June 2024 · National',
  },
  {
    rank: 'Top 12',
    title: 'TSA National Conference — Data Science & Analytics',
    meta: 'June 2024 · National',
  },
  {
    rank: '1st',
    title: 'PA TSA States — Data Science & Analytics',
    meta: 'April 2024 · State',
  },
  {
    rank: '1st',
    title: 'PA TSA States — Software Development',
    meta: 'April 2024 · State',
  },
  {
    rank: '2nd',
    title: 'Congressional App Challenge PA-06 — LegalLens',
    meta: 'January 2024 · District',
  },
]

export default function Recognition() {
  return (
    <section id="recognition" className="py-24 border-t border-border-soft relative overflow-hidden">
      {/* kanji watermark */}
      <span aria-hidden="true" className="kanji-watermark absolute right-4 top-8 select-none">
        未来
      </span>

      <div className="content-container relative" style={{ zIndex: 10 }}>
        <FadeUp>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-5 h-px bg-accent opacity-45" />
            <span className="font-mono text-[10px] text-accent tracking-[3px] uppercase">Recognition</span>
          </div>
          <h2
            className="font-display font-bold text-white mb-14 leading-[1.04] tracking-[-1px]"
            style={{ fontSize: 'clamp(30px, 4.5vw, 52px)' }}
          >
            Honors &amp; Awards.
          </h2>
        </FadeUp>

        <div className="divide-y divide-border-soft">
          {awards.map((award, i) => (
            <FadeUp key={award.title} delay={0.06 * i}>
              <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[68px_1fr] gap-5 py-5 transition-all duration-300 hover:pl-2 items-start group">
                <div
                  className="font-display font-black text-accent leading-none pt-0.5 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    fontSize: award.rank.length > 2 ? '22px' : '32px',
                    opacity: 0.7,
                  }}
                >
                  {award.rank}
                </div>
                <div>
                  <div className="text-[14px] font-medium text-white leading-[1.5] mb-1.5">
                    {award.title}
                  </div>
                  <div className="font-mono text-[10px] text-dim tracking-[0.3px]">{award.meta}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
