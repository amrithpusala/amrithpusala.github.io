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

const skillGroups = [
  {
    cat: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'Dart', 'SQL', 'HTML/CSS'],
  },
  {
    cat: 'ML & Data',
    skills: ['PyTorch', 'NumPy', 'pandas', 'spaCy', 'Hugging Face', 'Matplotlib'],
  },
  {
    cat: 'Frontend',
    skills: ['React', 'Tailwind CSS', 'Vite', 'Flutter', 'Riverpod'],
  },
  {
    cat: 'Backend',
    skills: ['FastAPI', 'Node.js', 'Express.js', 'Mongoose', 'Firebase Functions'],
  },
  {
    cat: 'Cloud & Databases',
    skills: ['Supabase', 'Firebase', 'MongoDB', 'Google Cloud', 'Vercel', 'Render'],
  },
  {
    cat: 'Tools',
    skills: ['Git', 'Docker', 'Postman', 'Figma', 'VS Code', 'IntelliJ'],
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-28 relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* kanji watermark */}
      <span aria-hidden="true" className="kanji-watermark absolute right-4 top-8 select-none">
        未来
      </span>

      <div className="content-container relative" style={{ zIndex: 10 }}>
        <FadeUp>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-5 h-px bg-accent opacity-45" />
            <span className="font-mono text-[10px] text-accent tracking-[3px] uppercase">Skills</span>
          </div>
          <h2
            className="font-display font-bold text-white mb-14 leading-[1.04] tracking-[-1px]"
            style={{ fontSize: 'clamp(30px, 4.5vw, 52px)' }}
          >
            What I work with.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <FadeUp key={group.cat} delay={0.06 * i}>
              <div className="bg-surface border border-border rounded-lg p-5 h-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/20 hover:-translate-y-0.5">
                <div className="font-mono text-[10px] text-accent tracking-[2px] uppercase mb-4">
                  {group.cat}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[11px] text-text px-2.5 py-1 rounded border border-border bg-surface-2 transition-all duration-300 hover:border-accent/25 hover:text-white cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
