import { faHome, faUser, faEnvelope, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface NavLink {
  to: string
  label: string
  icon: IconDefinition
}

export const navLinks: NavLink[] = [
  { to: '/home', label: 'Home', icon: faHome },
  { to: '/about', label: 'About', icon: faUser },
  { to: '/projects', label: 'Projects', icon: faSuitcase },
  { to: '/contact', label: 'Contact', icon: faEnvelope },
]
