import { useEffect, useState } from 'react'
import CastFace from './CastFace.jsx'
import RingGlyph from './RingGlyph.jsx'
import './CastProductModal.css'

// An abstract "worn" cue for the Object/Worn toggle — ink-outline +
// paper-fill, same graphic language as CastFace, not a photo. A single
// long straight-sided finger read as "a stand," not a hand, so this
// draws two: the ring finger (where the ring actually sits) plus a
// shorter neighbor sharing one hand-back outline — the minimum a viewer
// needs to recognize "hand" rather than "peg." The ring finger runs tall
// and its shaft carries the ring well above the valley between the two,
// away from both the fingertip and the knuckle so it doesn't crowd either.
function WearHand({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={`wear-hand ${className}`} aria-hidden="true">
      <path
        d="M38,100 L38,54 C38,28 43,10 50,10 C57,10 62,28 62,54 L62,60 C63,49 68,39 76,39 C84,39 88,49 88,62 L88,100 Z"
        className="wh-fill"
      />
      <path d="M40,68 Q50,73 60,68" className="wh-crease" />
    </svg>
  )
}

// A generic, ring-shape-agnostic hint that the band keeps going around the
// back of the finger — two short strokes peeking past the hand's own
// silhouette at ring height. Deliberately not derived from any one ring's
// geometry (signet, coil, stack... all look different up front) so it can
// never break for a particular ring type; it only needs to read as "the
// band continues out of sight," not reproduce that ring's exact profile.
function BackBandHint({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={`back-band-hint ${className}`} aria-hidden="true">
      <path d="M22,38 Q13,43 17,51" className="bbh-stroke" />
      <path d="M78,38 Q87,43 83,51" className="bbh-stroke" />
    </svg>
  )
}

// The one shared "product detail" surface for the whole site — opened from
// a character card or a collection row, always the same discover → detail
// → size → bag flow. `key={ring.id}` on the parent's usage resets size
// selection whenever a different ring opens.
export default function CastProductModal({ ring, onClose, onAddToBag }) {
  const [size, setSize] = useState(ring.sizes[Math.floor(ring.sizes.length / 2)])
  const [added, setAdded] = useState(false)
  const [worn, setWorn] = useState(false)
  const price = `₩${(ring.price * 1000).toLocaleString('en-US')}`

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  function handleAdd() {
    onAddToBag(ring, size)
    setAdded(true)
  }

  return (
    <div className="cast-modal" role="dialog" aria-modal="true" aria-label={`${ring.ringName} detail`} onClick={onClose}>
      <div className="cast-modal__panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="cast-modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="cast-modal__visual">
          <span className={`cast-modal__stage ${worn ? 'is-worn' : ''}`}>
            {/* Worn mode's occlusion: the hint peeks out behind the hand's
                own silhouette (band continuing out of sight), the hand
                sits in the middle, and the ring — one instance, every
                ring type's own real silhouette intact — sits in front,
                its hole rendered transparent (via RingGlyph's `worn`
                prop) so the hand shows through where the ring is open.
                RingGlyph keeps its own independent tilt animation on top
                of this mount's scale/position transition, so neither
                transform fights the other. */}
            {worn && <BackBandHint className="cast-modal__back-band" />}
            {worn && <WearHand className="cast-modal__hand" />}

            <span className="cast-modal__ring-mount">
              <RingGlyph id={`modal-${ring.id}`} type={ring.ringType} finish={ring.finish} worn={worn} className="cast-modal__ring" />
            </span>

            {!worn ? (
              <span className="cast-modal__annotations" aria-hidden="true">
                <span className="cast-modal__annotation cast-modal__annotation--a">
                  <span className="cast-modal__annotation-dot" />
                  <span className="cast-modal__annotation-line" />
                  <span className="cast-modal__annotation-label">{ring.motif}</span>
                </span>
                <span className="cast-modal__annotation cast-modal__annotation--b">
                  <span className="cast-modal__annotation-dot" />
                  <span className="cast-modal__annotation-line" />
                  <span className="cast-modal__annotation-label">{ring.finish}</span>
                </span>
              </span>
            ) : (
              <span className="cast-modal__annotations" aria-hidden="true">
                <span className="cast-modal__annotation cast-modal__annotation--worn">
                  <span className="cast-modal__annotation-line" />
                  <span className="cast-modal__annotation-face">
                    <CastFace id={`worn-face-${ring.id}`} species={ring.species} hair={ring.hair} accessory="none" mood={ring.mood} />
                  </span>
                  <span className="cast-modal__annotation-label">on {ring.name}</span>
                </span>
              </span>
            )}
          </span>
          <div className={`cast-modal__view-toggle ${worn ? 'is-worn' : ''}`} role="group" aria-label="View the ring">
            <button type="button" className={!worn ? 'is-active' : ''} onClick={() => setWorn(false)}>
              Object
            </button>
            <button type="button" className={worn ? 'is-active' : ''} onClick={() => setWorn(true)}>
              Worn
            </button>
          </div>
        </div>

        <div className="cast-modal__info">
          <h3 className="cast-modal__name">{ring.ringName}</h3>

          <div className="cast-modal__wearer">
            <span className="cast-modal__face">
              <CastFace id={`modal-face-${ring.id}`} species={ring.species} hair={ring.hair} accessory="none" mood={ring.mood} />
            </span>
            <span>worn by {ring.name}</span>
          </div>

          <p className="cast-modal__story">{ring.story}</p>

          <p className="cast-modal__spec">
            <strong>Sterling Silver 925</strong> — {ring.finish}
          </p>
          <p className="cast-modal__motif">{ring.motif}</p>

          <p className="cast-modal__price">{price}</p>

          <div className="cast-modal__sizes">
            <span className="cast-modal__sizes-label">size</span>
            <div className="cast-modal__size-list">
              {ring.sizes.map((s) => (
                <button
                  type="button"
                  key={s}
                  className={`cast-modal__size ${size === s ? 'is-selected' : ''}`}
                  onClick={() => {
                    setSize(s)
                    setAdded(false)
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button type="button" className="cast-modal__add" onClick={handleAdd}>
            {added ? 'Added ✓' : 'Add to bag'}
          </button>

          <p className="cast-modal__note">Prototype product — fictional design study, not for sale.</p>
        </div>
      </div>
    </div>
  )
}
