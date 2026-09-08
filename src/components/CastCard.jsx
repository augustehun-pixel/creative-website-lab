import { useState } from 'react'
import CastFace from './CastFace.jsx'
import RingGlyph from './RingGlyph.jsx'

// The ring is the main image now; the character is a small "worn by"
// portrait underneath it — equal billing, not one nested as a badge on
// the other. Hovering the ring tilts it like you're turning it over to
// look at it, and the small character blinks in response — the ring
// still reads as that personality's, just no longer overshadowed by it.
export default function CastCard({ member, index, variant, onOpenRing }) {
  const [hovering, setHovering] = useState(false)
  const [active, setActive] = useState(false)
  const price = `₩${(member.price * 1000).toLocaleString('en-US')}`

  return (
    <article className={`cast-card cast-card--${variant} ${active ? 'is-active' : ''}`} style={{ '--i': index }}>
      <button
        type="button"
        className="cast-card__hit"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        onClick={() => setActive((v) => !v)}
        aria-expanded={active}
        aria-label={`${member.ringName} by ${member.name}, ${price}`}
      >
        <span className="cast-card__stage">
          <RingGlyph id={member.id} type={member.ringType} className="cast-card__ring" />
        </span>
        <span className="cast-card__wearer">
          <span className="cast-card__face">
            <CastFace
              id={`wearer-${member.id}`}
              species={member.species}
              hair={member.hair}
              accessory={member.accessory}
              mood={member.mood}
              blinking={hovering || active}
            />
          </span>
          <span className="cast-card__info">
            <span className="cast-card__name">{member.name}</span>
            <span className="cast-card__product">{member.ringName}</span>
            <span className="cast-card__price">{price}</span>
          </span>
        </span>
      </button>
      <button type="button" className="cast-card__view" onClick={() => onOpenRing(member.id)}>
        View ring <span aria-hidden="true">→</span>
      </button>
    </article>
  )
}
