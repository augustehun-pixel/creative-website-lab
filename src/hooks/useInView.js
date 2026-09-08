import { useEffect, useRef, useState } from 'react'

// Lightweight scroll-reveal: flips true once the element crosses into the
// viewport, then stops watching — no animation library needed for a single
// fade/slide-up trigger per section.
export default function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}
