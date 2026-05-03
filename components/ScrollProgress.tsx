'use client'
import { useEffect } from 'react'

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (h > 0) bar.style.width = (window.scrollY / h) * 100 + '%'
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <div id="scroll-progress" aria-hidden="true" />
}
