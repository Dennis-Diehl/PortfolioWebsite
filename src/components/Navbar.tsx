import { useState, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faEnvelope, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { useActiveSection } from '../hooks/useActiveSection'

interface NavLink {
  to: string
  label: string
  icon: any
}

export default function Navbar() {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const navLinks: NavLink[] = [
    { to: '/home', label: 'Home', icon: faHome },
    { to: '/about', label: 'About', icon: faUser },
    { to: '/projects', label: 'Projects', icon: faSuitcase },
    { to: '/contact', label: 'Contact', icon: faEnvelope },
  ]

  const ids = useMemo(() => navLinks.map((n) => n.to.replace(/^\//, '')), [navLinks])
  const active = useActiveSection(ids)

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1
    const distance = Math.abs(index - hoveredIndex)
    if (distance === 0) return 1.20   // scale up the hovered item
    if (distance === 1) return 1.1    // scale up the adjacent items
    if (distance === 2) return 1.05   // scale up the next adjacent items
    return 1
  }

  return (
    /* Navbar Container */
    <nav 
      className={`pointer-events-auto fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-gray-800/90 px-4 py-4 shadow-xl backdrop-blur-md transition-all duration-300 ${isHovered ? 'w-48' : 'w-16'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setHoveredIndex(null)
      }}
    >
      {/* Navigation Links */}
      <ul className="flex flex-col items-center w-full">
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
                margin: `${scale > 1 ? (scale - 1) * 4 : 2}px 0`
              }}
            >
              <a
                href={`#${id}`}
                className={`flex items-center h-10 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'text-sky-300 bg-white/10' 
                    : 'text-gray-400 hover:text-sky-300 hover:bg-white/5'
                } ${isHovered ? 'justify-start gap-3 px-3 w-full' : 'justify-center'}`}
                title={label}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <FontAwesomeIcon icon={icon} className="h-5 w-5 flex-shrink-0" />
                <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
                  {label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}