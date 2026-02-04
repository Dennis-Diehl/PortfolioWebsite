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
  // State: Ist die Navbar gerade gehovert?
  const [isHovered, setIsHovered] = useState(false)
  
  // State: Welches Icon wird gerade gehovert? (für Magnifier-Effekt)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Alle Navigation-Links
  const navLinks: NavLink[] = [
    { to: '/home', label: 'Home', icon: faHome },
    { to: '/about', label: 'About', icon: faUser },
    { to: '/projects', label: 'Projects', icon: faSuitcase },
    { to: '/contact', label: 'Contact', icon: faEnvelope },
  ]

  // Extrahiere IDs für Section-Tracking (z.B. '/home' → 'home')
  const ids = useMemo(
    () => navLinks.map((n) => n.to.replace(/^\//, '')), 
    [navLinks]
  )
  
  // Welche Section ist gerade aktiv?
  const active = useActiveSection(ids)

  /**
   * Berechnet wie groß ein Icon sein soll (Magnifier-Effekt)
   * Je näher am gehoverten Icon, desto größer
   */
  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1  // Kein Hover = normale Größe
    
    const distance = Math.abs(index - hoveredIndex)  // Wie weit weg?
    
    if (distance === 0) return 1.20   // Das gehoverte Icon selbst
    if (distance === 1) return 1.10   // Direkt daneben
    if (distance === 2) return 1.05   // Zwei daneben
    return 1                           // Alles andere
  }

  return (
    <nav 
      // Fixed links, vertikal zentriert, ändert Breite beim Hover
      className={`
        pointer-events-auto fixed right-6 top-1/2 -translate-y-1/2 z-50
        flex flex-col items-center justify-center
        rounded-2xl border border-white/10 bg-gray-800/90 
        px-4 py-4 shadow-xl backdrop-blur-md
        transition-all duration-300
        ${isHovered ? 'w-48' : 'w-16'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setHoveredIndex(null)  // Reset Magnifier beim Verlassen
      }}
    >
      <ul className="flex flex-col items-center w-full gap-1">
        {navLinks.map(({ to, label, icon }, index) => {
          const id = to.replace(/^\//, '')        // '/home' → 'home'
          const isActive = active === id          // Ist dieser Link aktiv?
          const scale = getScale(index)           // Wie groß soll das Icon sein?
          
          return (
            <li 
              key={to}
              className="w-full"
              style={{
                // Skaliere das Icon basierend auf Hover
                transform: `scale(${scale})`,
                transformOrigin: 'center',
                // Bouncy Animation (cubic-bezier = Federgefühl)
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                // Dynamischer Abstand damit Icons sich nicht überlappen
                margin: `${scale > 1 ? (scale - 1) * 4 : 2}px 0`
              }}
            >
              <a
                href={`#${id}`}
                // Styling: Aktiv = blau, Inaktiv = grau
                // Layout: Gehovert = links aligned, Sonst = zentriert
                className={`
                  flex items-center h-10 rounded-lg transition-all duration-300
                  ${isActive 
                    ? 'text-sky-300 bg-white/10 justify-center' 
                    : 'text-gray-400 hover:text-sky-300 hover:bg-white/5'
                  }
                  ${isHovered ? 'justify-start gap-3 px-3 w-full' : 'justify-center'}
                `}
                title={label}
                onMouseEnter={() => setHoveredIndex(index)}  // Magnifier aktivieren
                onMouseLeave={() => setHoveredIndex(null)}   // Magnifier deaktivieren
              >
                {/* Icon (immer 20x20px) */}
                <FontAwesomeIcon icon={icon} className="h-5 w-5 flex-shrink-0" />
                
                {/* Text (faded in/out beim Hover) */}
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
  )
}