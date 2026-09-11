import { useState } from 'react'
import CastCard from './CastCard.jsx'
import CAST, { hasRealPhoto } from '../data/castData.js'
import useInView from '../hooks/useInView.js'
import './CastDiscovery.css'

// The workbench — one dark, shared space instead of a repeating card grid.
// Every ring sits on it; the one with a real photo sits large, sharp and
// closest to the front, the rest sit smaller and quieter, further back,
// waiting on their photos. Hovering (desktop) or opening a ring (any
// device) pulls it forward and settles the rest back — LOOP's own version
// of "browse many objects in one space, one comes forward when chosen,"
// built with layout/transform/opacity, no 3D engine.
export default function CastDiscovery({ onOpenRing, activeRingId }) {
  const [ref, inView] = useInView(0.05)
  const [hoveredId, setHoveredId] = useState(null)

  // Hover-driven "come forward" is a desktop idea — a coarse-pointer tap
  // shouldn't get stuck "hovering" after the finger lifts, so this only
  // ever sets state on pointers that can actually hover.
  function handleEnter(id) {
    if (window.matchMedia('(hover: hover)').matches) setHoveredId(id)
  }
  function handleLeave() {
    if (window.matchMedia('(hover: hover)').matches) setHoveredId(null)
  }

  const forwardId = hoveredId || activeRingId

  return (
    <section id="cast" className={`bench ${inView ? 'is-in-view' : ''}`} ref={ref}>
      <div className="bench__intro">
        <p className="bench__eyebrow">on the bench</p>
        <h2>Real silver, real hands.</h2>
        <p>Scroll to look around. Tap the one that's yours.</p>
      </div>

      <div className="bench__rail">
        {CAST.map((member, i) => {
          const isReal = hasRealPhoto(member)
          const isDimmed = Boolean(forwardId) && forwardId !== member.id
          const isForward = forwardId === member.id
          const stateClass = `${isForward ? 'is-forward' : ''} ${isDimmed ? 'is-dimmed' : ''}`

          if (isReal) {
            return (
              <button
                type="button"
                key={member.id}
                className={`bench__slot bench__slot--real ${stateClass}`}
                style={{ '--i': i }}
                onMouseEnter={() => handleEnter(member.id)}
                onMouseLeave={handleLeave}
                onClick={() => onOpenRing(member.id)}
                aria-label={`${member.ringName} — real ring, ₩${(member.price * 1000).toLocaleString('en-US')}`}
              >
                <span className="bench__real-photo">
                  <img src={member.images.hero} alt={`${member.ringName} — real product photo`} />
                </span>
                <span className="bench__real-caption">
                  <strong>{member.ringName}</strong>
                  <span>{member.finish}</span>
                </span>
              </button>
            )
          }

          return (
            <div
              key={member.id}
              className={`bench__slot bench__slot--soon ${stateClass}`}
              style={{ '--i': i }}
              onMouseEnter={() => handleEnter(member.id)}
              onMouseLeave={handleLeave}
            >
              <CastCard member={member} index={i} variant="soon" onOpenRing={onOpenRing} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
