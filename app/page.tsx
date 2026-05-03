import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import Recognition from '@/components/Recognition'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import TreeScene from '@/components/TreeScene'
import ScrollProgress from '@/components/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <TreeScene />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Recognition />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
