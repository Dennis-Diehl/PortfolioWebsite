import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './styles/index.css'

export default function App(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <Navbar />
      <main className="sections-container">
        <section id="home" className="section">
          <Home />
        </section>
        <section id="about" className="section">
          <About />
        </section>
        <section id="projects" className="section">
          <Projects />
        </section>
        <section id="contact" className="section">
          <Contact />
        </section>
      </main>
    </div>
  )
}
