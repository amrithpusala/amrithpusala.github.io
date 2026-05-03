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

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="py-32 border-t border-border-soft text-center">
      <div className="content-container">
        <FadeUp>
          <div className="font-mono text-[10px] text-accent tracking-[3px] uppercase mb-5 opacity-65">
            Get in touch
          </div>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h2
            className="font-display font-black text-white leading-[0.95] tracking-[-2px] mb-4"
            style={{ fontSize: 'clamp(40px, 7vw, 72px)' }}
          >
            Let&apos;s talk.
          </h2>
        </FadeUp>

        <FadeUp delay={0.16}>
          <p className="text-[14px] text-dim leading-[1.85] mb-12 max-w-[380px] mx-auto">
            Open to conversations about engineering, AI, or just a good problem to solve.
          </p>
        </FadeUp>

        <FadeUp delay={0.24}>
          <div className="flex justify-center gap-3 flex-wrap">
            <a
              href="mailto:amrith.pusala@outlook.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-mono text-[12px] bg-accent border border-accent text-bg font-medium transition-all duration-300 hover:bg-accent-hot hover:border-accent-hot hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(224,122,110,0.3)]"
            >
              <MailIcon />
              amrith.pusala@outlook.com
            </a>
            <a
              href="https://github.com/amrithpusala"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded font-mono text-[12px] border border-border text-text transition-all duration-300 hover:border-accent hover:text-white hover:-translate-y-0.5"
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/amrithpusala"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded font-mono text-[12px] border border-border text-text transition-all duration-300 hover:border-accent hover:text-white hover:-translate-y-0.5"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.32}>
          <p className="font-mono text-[11px] text-accent/60 tracking-[1px] mt-12">
            Open to SWE/ML internships for Summer 2027
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
