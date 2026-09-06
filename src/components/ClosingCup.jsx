import { useState } from 'react'
import ConeGraphic from './ConeGraphic.jsx'
import PackagingWall from './PackagingWall.jsx'
import './ClosingCup.css'

function ClosingCup() {
  const [scooped, setScooped] = useState(false)

  return (
    <section className="closing-cup">
      <PackagingWall variant="closing" />
      <button
        type="button"
        className={`closing-cup__scene ${scooped ? 'is-scooped' : ''}`}
        onClick={() => setScooped((value) => !value)}
        aria-label="Scoop the gelato"
      >
        <ConeGraphic variant="cup" style={{ '--shape-fill': 'var(--cream)' }} />
        {/* The scoop is nested inside the spoon so it automatically
            travels with it when the spoon rotates in, instead of the
            two animating independently and drifting apart. */}
        <span className="closing-cup__spoon" aria-hidden="true">
          <span className="closing-cup__scoop" aria-hidden="true" />
        </span>
      </button>
      <p className="closing-cup__credit">melto — a visual design study</p>
    </section>
  )
}

export default ClosingCup
