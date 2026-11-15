'use client'

import { useEffect, useState, type CSSProperties } from 'react'

// Sections shown in the rail, in page order. `id` matches the section's id.
const SECTIONS = [
  { id: 'about', label: 'about' },
  { id: 'research', label: 'research/' },
  { id: 'experience', label: 'experience/' },
  { id: 'involvement', label: 'involvement/' },
  { id: 'projects', label: 'projects/' },
  { id: 'honors', label: 'honors/' },
]

export default function SectionRail() {
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id))
    let frame = 0

    function measure() {
      frame = 0
      const vh = window.innerHeight
      // A section becomes current once its top crosses the upper third.
      const line = vh * 0.35
      let current = 0
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) current = i
      })
      // Pinned to the bottom of the page: the last section is current even
      // if it is too short to reach the line.
      const doc = document.documentElement
      if (window.scrollY + vh >= doc.scrollHeight - 4) current = els.length - 1

      setActive(current)
      // Stay hidden on the landing screen.
      const first = els[0]
      setShown(!!first && first.getBoundingClientRect().top <= vh * 0.6)
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav
      className={shown ? 'rail shown' : 'rail'}
      aria-label="On this page"
      style={{ '--at': active } as CSSProperties}
    >
      <span className="rail-mark" aria-hidden="true" />
      {SECTIONS.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={i === active ? 'on' : undefined}
          aria-current={i === active ? 'location' : undefined}
        >
          {s.label}
        </a>
      ))}
    </nav>
  )
}
