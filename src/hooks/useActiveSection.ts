import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!ids || ids.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Sammle ALLE sichtbaren Sections mit ihrer Position
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => {
            const rect = entry.boundingClientRect
            return {
              id: entry.target.id,
              // Wie viel von der Section ist sichtbar?
              visibleHeight: Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0),
              // Absolute Position der Section-Mitte
              centerY: rect.top + rect.height / 2
            }
          })

        if (visibleSections.length === 0) return

        // Strategie: Wähle die Section deren Mitte am nächsten zum oberen Drittel des Viewports ist
        // (nicht zur Viewport-Mitte, damit Sections früher aktiviert werden)
        const triggerPoint = window.innerHeight * 0.3 // Oberes Drittel

        const best = visibleSections.reduce((prev, curr) => {
          const prevDistance = Math.abs(prev.centerY - triggerPoint)
          const currDistance = Math.abs(curr.centerY - triggerPoint)
          return currDistance < prevDistance ? curr : prev
        })

        setActive(best.id)
      },
      {
        root: null,
        // Sehr großzügiges Fenster: Nur 10% Margin oben/unten
        rootMargin: '-10% 0px -10% 0px',
        // Viele Thresholds für kontinuierliche Updates
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05) // 0, 0.05, 0.1, ..., 1.0
      }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids])

  return active
}