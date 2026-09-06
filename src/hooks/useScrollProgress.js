import { useEffect, useState } from 'react'

// Reports how far the user has scrolled through a tall section, as a
// number from 0 (top of the section just reached the top of the screen)
// to 1 (the bottom of the section has reached the top of the screen).
//
// `sectionRef` must point to an element that is taller than the viewport,
// so there is actually room to scroll "through" it.
export function useScrollProgress(sectionRef) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    function measure() {
      const el = sectionRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight

      if (scrollableDistance <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0)
        return
      }

      const raw = -rect.top / scrollableDistance
      setProgress(Math.min(1, Math.max(0, raw)))
    }

    // requestAnimationFrame keeps this from running more than once per
    // frame, so scrolling stays smooth even on slower devices.
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        measure()
        ticking = false
      })
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionRef])

  return progress
}
