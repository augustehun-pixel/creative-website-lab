import { useState } from 'react'
import CastFace from './CastFace.jsx'
import ProductImage from './ProductImage.jsx'
import { hasRealPhoto } from '../data/castData.js'
import './CastCard.css'

// The product photo is the main image; the character is a small "worn by"
// portrait underneath it — brand storytelling, not a stand-in for the
// product itself. Hovering gives the photo a light zoom, and the small
// character blinks in response — the ring still reads as that
// personality's, just no longer illustrated as the actual product shot.
//
// A ring with no real photo yet never fakes one — its stage shows a small,
// quiet "in the workshop" character instead of a wireframe stand-in for a
// product photo, and it never shows a price or opens the buy flow. The
// moment `images.hero` gets a real path, this card switches to the photo
// branch below with no other changes.
export default function CastCard({ member, index, variant, onOpenRing }) {
  const [hovering, setHovering] = useState(false)
  const [active, setActive] = useState(false)
  const isReal = hasRealPhoto(member)
  const price = `₩${(member.price * 1000).toLocaleString('en-US')}`

  // On a coarse-pointer / no-hover device (touch — iPad included) there's no
  // hover to reveal "View ring" for free, so the tap that would otherwise
  // just toggle the preview state opens the detail modal directly instead.
  // Pointer-capable devices (mouse/trackpad) keep the original behavior
  // untouched: this click only toggles the preview, "View ring" still opens it.
  function handleHitClick() {
    setActive((v) => !v)
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
      onOpenRing(member.id)
    }
  }

  return (
    <article className={`cast-card cast-card--${variant} ${active ? 'is-active' : ''} ${isReal ? 'is-real' : 'is-soon'}`} style={{ '--i': index }}>
      <button
        type="button"
        className="cast-card__hit"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        onClick={handleHitClick}
        aria-expanded={active}
        aria-label={isReal ? `${member.ringName} by ${member.name}, ${price}` : `${member.ringName} by ${member.name} — coming soon`}
      >
        <span className="cast-card__stage">
          {isReal ? (
            <ProductImage
              src={member.images.hero}
              alt={`${member.ringName} — product photo`}
              label="Product photo"
              sublabel="hero shot"
              ringType={member.ringType}
              finish={member.finish}
              placeholderId={member.id}
              className="cast-card__ring"
            />
          ) : (
            <span className="cast-card__soon">
              <span className="cast-card__soon-face">
                <CastFace
                  id={`soon-${member.id}`}
                  species={member.species}
                  hair={member.hair}
                  accessory={member.accessory}
                  mood={member.mood}
                  blinking={hovering || active}
                />
              </span>
              <span className="cast-card__soon-label">in the workshop</span>
            </span>
          )}
        </span>
        <span className="cast-card__wearer">
          {isReal && (
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
          )}
          <span className="cast-card__info">
            <span className="cast-card__name">{member.name}</span>
            <span className="cast-card__product">{member.ringName}</span>
            {isReal ? (
              <span className="cast-card__price">{price}</span>
            ) : (
              <span className="cast-card__status">coming soon</span>
            )}
          </span>
        </span>
      </button>
      <button type="button" className="cast-card__view" onClick={() => onOpenRing(member.id)}>
        {isReal ? 'View ring' : 'The story'} <span aria-hidden="true">→</span>
      </button>
    </article>
  )
}
