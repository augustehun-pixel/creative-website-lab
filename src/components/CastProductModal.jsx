import { useEffect, useState } from 'react'
import CastFace from './CastFace.jsx'
import ProductImage from './ProductImage.jsx'
import { hasRealPhoto } from '../data/castData.js'
import './CastProductModal.css'

// PRODUCT WORLD slot labels — plain, honest names for what each shot is,
// not marketing copy. An empty slot reads "<shot> photo — coming later"
// instead of pretending a photo is already there.
const SLOT_LABEL = {
  hero: 'Hero photo',
  angle: 'Side photo',
  detail: 'Detail photo',
  worn: 'Worn photo',
  lifestyle: 'Lifestyle photo',
}

const OBJECT_SLOTS = ['hero', 'angle', 'detail']
const WORN_SLOTS = ['worn', 'lifestyle']

// INSPECTION — honest crops of whichever real photo is on screen, not
// invented angles. "Overall" is the photo as shot; "Engraving" and
// "Silver surface" zoom toward the regions of *this specific photograph*
// where that detail is actually visible (picked by eye against
// public/IMG_0940.jpeg), via CSS transform-origin + scale on the same
// <img> — no crop images generated, nothing pixelated past what the
// source photo actually holds. Applies to whatever slot is active, so it
// keeps working once more real photos exist.
const INSPECT_VIEWS = [
  { id: 'overall', label: 'Overall', origin: '50% 46%', scale: 1 },
  { id: 'engraving', label: 'Engraving', origin: '30% 58%', scale: 2.1 },
  { id: 'surface', label: 'Silver surface', origin: '68% 66%', scale: 2.2 },
]

// One great photo beats three empty boxes: a group with a single real
// photo shows it large with no thumbnail row; 2+ real photos get a proper
// thumbnail strip; zero real photos falls back to the placeholder gallery
// (every slot in the group, honestly labeled) — the same shape the site
// already uses for every still-fictional product. Nothing here is
// hardcoded to one ring; it only ever looks at how many real photos
// `ring.images` actually has.
function gallerySlotsFor(groupSlots, images) {
  const real = groupSlots.filter((slot) => images[slot])
  if (real.length > 0) return { slots: real, isReal: true }
  return { slots: groupSlots, isReal: false }
}

// The one shared "product detail" surface for the whole site — opened from
// a character card or a collection row, always the same discover → detail
// → size → bag flow. `key={ring.id}` on the parent's usage resets size
// selection whenever a different ring opens.
export default function CastProductModal({ ring, onClose, onAddToBag }) {
  const isReal = hasRealPhoto(ring)
  const [size, setSize] = useState(ring.sizes[Math.floor(ring.sizes.length / 2)])
  const [added, setAdded] = useState(false)
  const price = `₩${(ring.price * 1000).toLocaleString('en-US')}`
  const images = ring.images || {}

  const objectGroup = gallerySlotsFor(OBJECT_SLOTS, images)
  const wornGroup = gallerySlotsFor(WORN_SLOTS, images)
  // Showing a full OBJECT/WORN switch only makes sense when both sides are
  // in the same state (both real, or both still placeholder) — a product
  // with a real object photo but no real worn photo yet gets a single
  // quiet line instead of a big control that mostly leads to an empty tab.
  const showToggle = objectGroup.isReal === wornGroup.isReal

  // OBJECT = real product-alone photography. WORN = real on-hand
  // photography. No SVG worn simulation lives here any more — a ring
  // resting on a hand is something a camera shows, not something this
  // codebase draws.
  const [mode, setMode] = useState('object')
  const activeGroup = mode === 'worn' && showToggle ? wornGroup : objectGroup
  const [activeSlot, setActiveSlot] = useState(activeGroup.slots[0])
  const [inspect, setInspect] = useState(INSPECT_VIEWS[0])

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Switching photos (or object/worn) should never leave an old zoom
  // crop applied to a new picture — every new photo starts at "Overall".
  useEffect(() => {
    setInspect(INSPECT_VIEWS[0])
  }, [activeSlot])

  // COMING SOON: no real photo yet means no size picker, no Add to Bag, no
  // gallery pretending to be one — just the character, the name, and the
  // story, in the same modal shell (backdrop, close button, Escape-to-close)
  // the real product uses. The moment `ring.images.hero` gets a real path,
  // `isReal` flips and this ring renders through the full branch below
  // instead — no other change needed here.
  if (!isReal) {
    return (
      <div className="cast-modal" role="dialog" aria-modal="true" aria-label={`${ring.ringName} — coming soon`} onClick={onClose}>
        <div className="cast-modal__panel cast-modal__panel--soon" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="cast-modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
          <div className="cast-modal__soon-visual">
            <span className="cast-modal__soon-face">
              <CastFace id={`modal-soon-${ring.id}`} species={ring.species} hair={ring.hair} accessory="none" mood={ring.mood} />
            </span>
            <span className="cast-modal__soon-badge">Coming soon</span>
          </div>
          <div className="cast-modal__info cast-modal__info--soon">
            <h3 className="cast-modal__name">{ring.ringName}</h3>
            <p className="cast-modal__soon-wearer">worn by {ring.name}</p>
            <p className="cast-modal__story">{ring.story}</p>
            <p className="cast-modal__soon-note">Still being made — real photos are on the way.</p>
          </div>
        </div>
      </div>
    )
  }

  function handleAdd() {
    onAddToBag(ring, size)
    setAdded(true)
  }

  function handleModeChange(nextMode) {
    setMode(nextMode)
    const group = nextMode === 'worn' ? wornGroup : objectGroup
    setActiveSlot(group.slots[0])
  }

  return (
    <div className="cast-modal cast-modal--focus" role="dialog" aria-modal="true" aria-label={`${ring.ringName} detail`} onClick={onClose}>
      <div className="cast-modal__panel cast-modal__panel--focus" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="cast-modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="cast-modal__visual">
          <div className="cast-modal__gallery cast-modal__gallery--featured">
            {/* the real photo itself — no card border, no placeholder path
                possible here (this branch only renders once the ring has a
                real photo), just the object with room to zoom into it */}
            <div className="cast-modal__main-photo">
              <img
                key={activeSlot}
                src={images[activeSlot]}
                alt={`${ring.ringName} — ${SLOT_LABEL[activeSlot]}, ${inspect.label.toLowerCase()} view`}
                className="cast-modal__photo-img"
                style={{ transformOrigin: inspect.origin, transform: `scale(${inspect.scale})` }}
              />
            </div>
            <div className="cast-modal__inspect" role="group" aria-label="Inspect this ring">
              {INSPECT_VIEWS.map((view) => (
                <button
                  type="button"
                  key={view.id}
                  className={inspect.id === view.id ? 'is-active' : ''}
                  onClick={() => setInspect(view)}
                >
                  {view.label}
                </button>
              ))}
            </div>
            {activeGroup.slots.length > 1 && (
              <div className="cast-modal__thumbs" role="group" aria-label="More views">
                {activeGroup.slots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    className={activeSlot === slot ? 'is-active' : ''}
                    onClick={() => setActiveSlot(slot)}
                    aria-label={SLOT_LABEL[slot]}
                    aria-pressed={activeSlot === slot}
                  >
                    <ProductImage
                      src={images[slot]}
                      alt={`${ring.ringName} — ${SLOT_LABEL[slot]}`}
                      label={SLOT_LABEL[slot].split(' ')[0]}
                      ringType={ring.ringType}
                      finish={ring.finish}
                      placeholderId={`modal-thumb-${ring.id}-${slot}`}
                      compact
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {showToggle ? (
            <div className={`cast-modal__view-toggle ${mode === 'worn' ? 'is-worn' : ''}`} role="group" aria-label="View the ring">
              <button type="button" className={mode === 'object' ? 'is-active' : ''} onClick={() => handleModeChange('object')}>
                Object
              </button>
              <button type="button" className={mode === 'worn' ? 'is-active' : ''} onClick={() => handleModeChange('worn')}>
                Worn
              </button>
            </div>
          ) : (
            <p className="cast-modal__worn-note">On hand — coming soon</p>
          )}
        </div>

        <div className="cast-modal__info">
          <h3 className="cast-modal__name">{ring.ringName}</h3>

          <p className="cast-modal__price">{price}</p>

          <p className="cast-modal__spec">
            <strong>Sterling Silver 925</strong> — {ring.finish}
          </p>
          <p className="cast-modal__motif">{ring.motif}</p>

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

          <div className="cast-modal__wearer">
            <span className="cast-modal__face">
              <CastFace id={`modal-face-${ring.id}`} species={ring.species} hair={ring.hair} accessory="none" mood={ring.mood} />
            </span>
            <span>worn by {ring.name}</span>
          </div>
          <p className="cast-modal__story">{ring.story}</p>

          <p className="cast-modal__note">Prototype product — fictional design study, not for sale.</p>
        </div>
      </div>
    </div>
  )
}
