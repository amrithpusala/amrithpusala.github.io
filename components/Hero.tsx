'use client'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const TAGLINE = '"Building AI systems that ship."'

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 42)
    return () => clearInterval(interval)
  }, [started, text])

  return (
    <span>
      {displayed}
      {!done && (
        <span className="animate-cursor-blink text-cyan ml-0.5">|</span>
      )}
    </span>
  )
}

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
)

export default function Hero() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
    <section
      className="min-h-[100dvh] flex items-center pt-32 pb-24 relative overflow-hidden"
      aria-label="Introduction"
    >
      {/* ambient cyan bloom — simulates tree casting light */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[55vw] h-[55vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 100%, rgba(0,245,255,0.06) 0%, transparent 60%)',
          zIndex: 1,
        }}
      />

      {/* coral radial behind heading */}
      <div
        aria-hidden="true"
        className="absolute top-[15%] left-[-5%] w-[50vw] h-[50vw] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 30%, rgba(224,122,110,0.05) 0%, transparent 65%)',
          zIndex: 1,
        }}
      />

      <div className="content-container relative" style={{ zIndex: 20 }}>
        <motion.div
          className="max-w-[640px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* eyebrow */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-7 h-px bg-accent opacity-50" />
            <span className="font-mono text-[11px] text-accent tracking-[3px] uppercase">
              CS @ Purdue &nbsp;·&nbsp; ML Engineer &nbsp;·&nbsp; Class of 2029
            </span>
          </motion.div>

          {/* name */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-black text-white leading-[0.9] tracking-[-3px] mb-6"
            style={{ fontSize: 'clamp(60px, 10vw, 116px)' }}
          >
            Amrith<br />
            <span className="text-white/90">Pusala.</span>
          </motion.h1>

          {/* tagline — typewriter */}
          <motion.p
            variants={itemVariants}
            className="font-mono text-accent mb-5"
            style={{ fontSize: 'clamp(16px, 2.2vw, 24px)' }}
          >
            <TypewriterText text={TAGLINE} delay={900} />
          </motion.p>

          {/* subtext */}
          <motion.p
            variants={itemVariants}
            className="text-[14px] text-dim leading-[1.9] mb-10 max-w-[460px]"
          >
            CS @ Purdue with a minor in AI. From Belgium to Pennsylvania
            to West Lafayette — I build full-stack ML systems with real test
            coverage, real deployments, real users.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex gap-3 flex-wrap">
            <a
              href="https://github.com/amrithpusala"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-[11px] border border-border text-text transition-all duration-300 hover:border-accent hover:text-white hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(224,122,110,0.1)]"
              aria-label="GitHub profile"
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/amrithpusala"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-[11px] border border-border text-text transition-all duration-300 hover:border-accent hover:text-white hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(224,122,110,0.1)]"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href="mailto:amrith.pusala@outlook.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-[11px] bg-accent border border-accent text-bg font-medium transition-all duration-300 hover:bg-accent-hot hover:border-accent-hot hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(224,122,110,0.25)]"
              aria-label="Send email"
            >
              <MailIcon />
              Email
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <div
        className="absolute bottom-9 left-8 flex items-center gap-2.5 font-mono text-[10px] text-dim tracking-[3px] opacity-0 animate-fade-in"
        style={{ animationDelay: '1.5s', animationFillMode: 'forwards', zIndex: 20 }}
        aria-hidden="true"
      >
        SCROLL
        <span
          className="w-px bg-gradient-to-b from-dim to-transparent animate-scroll-pulse"
          style={{ height: '36px' }}
        />
      </div>
    </section>
  )
}
