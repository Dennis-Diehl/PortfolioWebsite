import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

/**
 * Navbar Component - Floating Island Navigation
 * 
 * Features:
 * - Fixed position floating island design
 * - Responsive: horizontal menu on desktop, hamburger dropdown on mobile
 * - Smooth animations and glassmorphism styling
 */
function Navbar() {
  // State: Track whether mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Brand - Link to home */}
        <Link to="/" className="navbar-home">
          Dennis D.
        </Link>

        {/* Hamburger Menu Button - Only visible on mobile devices */}
        <button
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation Links - Desktop: horizontal, Mobile: dropdown */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/about" 
              className="nav-link" 
              onClick={() => setIsOpen(false)}  // Close menu on navigation
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/portfolio" 
              className="nav-link" 
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/contact" 
              className="nav-link" 
              onClick={() => setIsOpen(false)}
            >
              Contact Me
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
