import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useActiveSection } from '../hooks/useActiveSection'
import { navLinks } from '../data/navLinks'
import logoD from '../assets/images/Logo_D.png'

const sectionIds = navLinks.map((n) => n.to.replace(/^\//, ''))

// Mobile menu shows all links except Home (logo handles that)
const mobileLinks = navLinks.filter((n) => n.to !== '/home')

export default function Navbar() {
  // Mobile menu open state
  const [isOpen, setIsOpen] = useState(false)

  // Desktop dock states
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const active = useActiveSection(sectionIds)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Magnifier scale for desktop dock
  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1
    const distance = Math.abs(index - hoveredIndex)
    if (distance === 0) return 1.20
    if (distance === 1) return 1.10
    if (distance === 2) return 1.05
    return 1
  }

  return (
    <>
      {/* ========== Mobile Top-Bar (visible below lg) ========== */}
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-gray-800/90 px-4 backdrop-blur-md lg:hidden">
        {/* Logo → scrolls to Home */}
        <a href="#home" className="flex items-center">
          <img src={logoD} alt="Logo" className="h-8 w-auto" />
        </a>

        {/* Hamburger / X button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`block h-0.5 w-6 rounded bg-white transition-all duration-300 ${
              isOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 rounded bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 rounded bg-white transition-all duration-300 ${
              isOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </header>

      {/* ========== Mobile Fullscreen Overlay ========== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/95 backdrop-blur-md lg:hidden"
          >
            <nav className="w-full">
              <ul className="flex flex-col items-center w-full">
                {mobileLinks.map(({ to, label, icon }) => {
                  const id = to.replace(/^\//, '')
                  const isActive = active === id
                  return (
                    <li key={to} className="w-full">
                      <a
                        href={`#${id}`}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-center gap-4 w-full text-2xl font-medium py-5 transition-all duration-200 ${
                          isActive ? 'text-sky-300 bg-white/10' : 'text-gray-300 hover:text-sky-300 hover:bg-white/10'
                        }`}
                      >
                        <FontAwesomeIcon icon={icon} className="h-6 w-6" />
                        {label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== Desktop Dock Navbar (visible at lg+) ========== */}
      <nav
        className={`
          pointer-events-auto fixed right-6 top-1/2 -translate-y-1/2 z-50
          hidden lg:flex flex-col items-center justify-center
          rounded-2xl border border-white/10 bg-gray-800/90
          px-4 py-4 shadow-xl backdrop-blur-md
          transition-all duration-300
          ${isHovered ? 'w-48' : 'w-16'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setHoveredIndex(null)
        }}
      >
        <ul className="flex flex-col items-center w-full gap-1">
          {navLinks.map(({ to, label, icon }, index) => {
            const id = to.replace(/^\//, '')
            const isActive = active === id
            const scale = getScale(index)

            return (
              <li
                key={to}
                className="w-full"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'center',
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  margin: `${scale > 1 ? (scale - 1) * 4 : 2}px 0`,
                }}
              >
                <a
                  href={`#${id}`}
                  className={`
                    flex items-center h-10 rounded-lg transition-all duration-300
                    ${isActive
                      ? 'text-sky-300 bg-white/10 justify-center'
                      : 'text-gray-400 hover:text-sky-300 hover:bg-white/5'
                    }
                    ${isHovered ? 'justify-start gap-3 px-3 w-full' : 'justify-center'}
                  `}
                  title={label}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <FontAwesomeIcon icon={icon} className="h-5 w-5 flex-shrink-0" />
                  <span
                    className={`
                      text-sm font-medium whitespace-nowrap transition-all duration-300
                      ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
                    `}
                  >
                    {label}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
