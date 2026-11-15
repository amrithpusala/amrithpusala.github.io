'use client'

import { useState, type KeyboardEvent } from 'react'

// What a visitor can type after `cd`, mapped to the section id it scrolls to.
const TARGETS: Record<string, string> = {
  research: 'research',
  experience: 'experience',
  involvement: 'involvement',
  projects: 'projects',
  honors: 'honors',
  about: 'about',
  contact: 'contact',
  '~': 'top',
}

export default function CdPrompt() {
  const [error, setError] = useState('')

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return
    const input = e.currentTarget
    const dir = input.value
      .trim()
      .toLowerCase()
      .replace(/^cd\s+/, '')
      .replace(/^\.\//, '')
      .replace(/\/$/, '')
    if (!dir) return

    const id = TARGETS[dir]
    if (!id) {
      setError(`cd: no such file or directory: ${dir}`)
      return
    }
    setError('')
    input.value = ''
    input.blur()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className="cd ln" style={{ ['--i' as string]: 2200 }}>
        <label htmlFor="cd-input">
          amrith@purdue:~<span className="p"> $</span> cd
        </label>
        <input
          id="cd-input"
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="where do you want to go?"
          onKeyDown={onKeyDown}
        />
      </div>
      {error && <p role="status">{error}</p>}
    </>
  )
}
