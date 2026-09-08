import { useEffect, useState } from 'react'
import CastFace from './CastFace.jsx'
import RingGlyph from './RingGlyph.jsx'
import './CastProductModal.css'

// The one shared "product detail" surface for the whole site — opened from
// a character card or a collection row, always the same discover → detail
// → size → bag flow. `key={ring.id}` on the parent's usage resets size
// selection whenever a different ring opens.
export default function CastProductModal({ ring, onClose, onAddToBag }) {
  const [size, setSize] = useState(ring.sizes[Math.floor(ring.sizes.length / 2)])
  const [added, setAdded] = useState(false)
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
          <span className="cast-modal__stage">
            <RingGlyph id={`modal-${ring.id}`} type={ring.ringType} className="cast-modal__ring" />
          </span>
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
