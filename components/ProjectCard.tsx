'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface ProjectCardProps {
  index: number
  date: string
  name: string
  tagline: string
  bullets: string[]
  stack: string[]
  liveUrl?: string
  githubUrl?: string
  wide?: boolean
  delay?: number
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

export default function ProjectCard({
  index,
  date,
  name,
  tagline,
  bullets,
  stack,
  liveUrl,
  githubUrl,
  delay = 0,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative bg-surface border border-border rounded-xl p-7 overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/25 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,0,0,0.35),0_0_0_1px_rgba(224,122,110,0.08)]"
        style={{ willChange: 'transform' }}
      >
        {/* top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent-hot origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }}
        />

        {/* spotlight glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-400"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(480px circle at ${mousePos.x}% ${mousePos.y}%, rgba(224,122,110,0.05), transparent 40%)`,
          }}
        />

        {/* number + date row */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-display font-black text-accent/30 text-[40px] leading-none tracking-tighter select-none">
            {String(index).padStart(2, '0')}
          </span>
          <span className="font-mono text-[10px] text-dim tracking-[1px]">{date}</span>
        </div>

        <h3 className="font-display font-bold text-white text-[21px] tracking-[-0.3px] mb-2 leading-[1.2]">
          {name}
        </h3>
        <p className="text-[13px] text-text leading-[1.65] italic mb-5">{tagline}</p>

        <ul className="space-y-2 mb-6">
          {bullets.map((b) => (
            <li key={b.slice(0, 30)} className="flex gap-2.5 text-[12.5px] text-text leading-[1.7]">
              <span className="mt-[5px] text-accent/60 shrink-0 text-[8px]">&#9670;</span>
              {b}
            </li>
          ))}
        </ul>

        {/* footer: stack + links */}
        <div className="flex items-end justify-between gap-3 pt-4 border-t border-border-soft flex-wrap">
          <motion.div
            className="flex flex-wrap gap-1.5"
            initial={{ opacity: 0, y: 6 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0.45, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {stack.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2 py-0.5 rounded border transition-all duration-300"
                style={{
                  background: hovered ? 'rgba(224,122,110,0.07)' : 'rgba(255,255,255,0.04)',
                  borderColor: hovered ? 'rgba(224,122,110,0.2)' : 'rgba(255,255,255,0.07)',
                  color: hovered ? '#e07a6e' : '#5a5258',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
          <div className="flex gap-3 shrink-0">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-dim hover:text-accent transition-colors duration-200 flex items-center gap-1.5"
              >
                <ExternalIcon /> Live
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-dim hover:text-accent transition-colors duration-200 flex items-center gap-1.5"
              >
                <GitHubIcon /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
