import { useRef } from 'react'
import CastFace from './CastFace.jsx'
import CAST from '../data/castData.js'
import './CastHero.css'

// A handful of cast members float in the hero and drift toward the cursor —
// the first hint that every face on this site is alive, not decoration.
const FLOATERS = [CAST[1], CAST[3], CAST[5], CAST[7]]

export default function CastHero() {
  const sceneRef = useRef(null)

  function handleMouseMove(event) {
    const scene = sceneRef.current
    if (!scene) return
    const rect = scene.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    scene.style.setProperty('--px', x.toFixed(3))
    scene.style.setProperty('--py', y.toFixed(3))
  }

  return (
    <section id="top" className="cast-hero" ref={sceneRef} onMouseMove={handleMouseMove}>
      <div className="cast-hero__floaters" aria-hidden="true">
        {FLOATERS.map((member, i) => (
          <div className={`cast-hero__floater cast-hero__floater--${i}`} key={member.id}>
            <CastFace id={member.id} species={member.species} hair={member.hair} accessory={member.accessory} mood={member.mood} />
          </div>
        ))}
      </div>

      <div className="cast-hero__copy">
        <p className="cast-hero__eyebrow">handmade silver rings</p>
        <h1 className="cast-hero__mark">LOOP</h1>
        <p className="cast-hero__tag">A ring for every personality. Find yours.</p>
      </div>

      <a href="#cast" className="cast-hero__scroll">
        meet the loop <span>↓</span>
      </a>
    </section>
  )
}
