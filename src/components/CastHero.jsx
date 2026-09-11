import CastFace from './CastFace.jsx'
import CAST, { hasRealPhoto } from '../data/castData.js'
import './CastHero.css'

// Three small characters scattered around the hero's open space — top-left
// near the wordmark, top-right by the product photo, bottom-right by the
// scroll cue — instead of lined up under the copy. A signature, not a
// scene: small enough that they never compete with the real ring. The
// actual subject of the hero is whichever ring already has a real photo,
// shown large on the right; this only ever asks the data "who's real
// yet," so wiring in a second real photo later needs no change here.
const SIGNATURE = [CAST[1], CAST[3], CAST[7]]

export default function CastHero() {
  const heroRing = CAST.find(hasRealPhoto)

  return (
    <section id="top" className="cast-hero">
      <div className="cast-hero__signature" aria-hidden="true">
        {SIGNATURE.map((member, i) => (
          <span className={`cast-hero__signature-face cast-hero__signature-face--${i}`} key={member.id}>
            <CastFace
              id={`hero-sig-${member.id}`}
              species={member.species}
              hair={member.hair}
              accessory={member.accessory}
              mood={member.mood}
            />
          </span>
        ))}
      </div>

      <div className="cast-hero__grid">
        <div className="cast-hero__copy">
          <p className="cast-hero__eyebrow">handmade silver rings</p>
          <h1 className="cast-hero__mark">LOOP</h1>
          <p className="cast-hero__tag">A ring for every personality. Real silver, sitting right here.</p>

          <a href="#cast" className="cast-hero__scroll">
            onto the bench <span>↓</span>
          </a>
        </div>

        {heroRing && (
          <div className="cast-hero__visual">
            <img
              className="cast-hero__product-photo"
              src={heroRing.images.hero}
              alt={`${heroRing.ringName} — real handmade silver ring`}
            />
          </div>
        )}
      </div>
    </section>
  )
}
