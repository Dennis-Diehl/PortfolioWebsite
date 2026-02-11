import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!ids || ids.length === 0) return

    // Track welche Sections aktuell sichtbar sind (über alle Callbacks hinweg)
    const visibleSet = new Map<string, IntersectionObserverEntry>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSet.set(entry.target.id, entry)
          } else {
            visibleSet.delete(entry.target.id)
          }
        }

        if (visibleSet.size === 0) return

        const triggerPoint = window.innerHeight * 0.3

        let bestId: string | null = null
        let bestDistance = Infinity

        for (const [id, entry] of visibleSet) {
          const rect = entry.target.getBoundingClientRect()
          const centerY = rect.top + rect.height / 2
          const distance = Math.abs(centerY - triggerPoint)
          if (distance < bestDistance) {
            bestDistance = distance
            bestId = id
          }
        }

        if (bestId) setActive(bestId)
      },
      {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: [0, 0.5, 1],
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