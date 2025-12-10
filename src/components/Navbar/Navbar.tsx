import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import LogoD from '../../assets/images/Logo_D.png'

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
          <img 
            src={LogoD}
            alt="Dennis Starting Page"
            className="navbar-logo-img"
          />
        </Link>

        {/* Menu Toggle Button - Shows hamburger (☰) closed, X (✕) when open */}
        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="3" x2="21" y2="21" strokeLinecap="round" />
                <line x1="21" y1="3" x2="3" y2="21" strokeLinecap="round" />
            </svg>
            ) : (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
                </svg>
            )}
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
