import { useState } from 'react'
import { useMemo } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import logo from '../assets/images/Logo_D.png'

interface NavLink {
  to: string
  label: string
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const navLinks: NavLink[] = [
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ]

  const ids = useMemo(() => ['home', ...navLinks.map((n) => n.to.replace(/^\//, ''))], [navLinks])
  const active = useActiveSection(ids)

  return (
    <nav className="fixed inset-x-0 top-6 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto relative flex w-[calc(100%-2rem)] max-w-5xl items-center justify-between rounded-2xl border border-white/5 bg-gray-800/85 px-4 py-2 shadow-xl backdrop-blur-md">
        {/* Logo */}
        <a href="#home" className="block h-10 transition hover:-translate-y-0.5">
          <img src={logo} alt="Logo" className="h-full w-auto" />
        </a>

        {/* Desktop Nav */}
        <ul className="hidden gap-8 md:flex">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <a
                href={`#${to.replace(/^\//, '')}`}
                className={`font-medium transition hover:-translate-y-0.5 hover:text-sky-300 ${
                  active === to.replace(/^\//, '') ? 'text-sky-300' : 'text-gray-300'
                }`}
                aria-current={active === to.replace(/^\//, '') ? 'true' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex text-gray-200 transition hover:text-sky-300 md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5}>
            {isOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Nav */}
        <ul
          className={`absolute left-1/2 top-full z-50 mt-2 flex w-[calc(100%-2rem)] -translate-x-1/2 flex-col overflow-hidden rounded-xl bg-gray-900/95 shadow-xl transition-all duration-200 md:hidden ${
            isOpen ? 'max-h-60 py-2' : 'max-h-0'
          }`}
        >
          {navLinks.map(({ to, label }) => (
            <li key={to} className="border-b border-white/5 last:border-0">
              <a
                href={`#${to.replace(/^\//, '')}`}
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-3 text-center transition hover:bg-white/5 hover:text-white ${
                  active === to.replace(/^\//, '') ? 'text-sky-300' : 'text-gray-300'
                }`}
                aria-current={active === to.replace(/^\//, '') ? 'true' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
