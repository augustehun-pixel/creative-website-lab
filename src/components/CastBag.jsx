import { useEffect, useState } from 'react'
import CastFace from './CastFace.jsx'
import ProductImage from './ProductImage.jsx'
import './CastBag.css'

// Where every "Add to bag" click (from a card row or the product modal)
// actually lands. A right-edge drawer, not a second product modal — it
// reads as "here's what you're holding," not another detail screen. The
// thumbnail is the same PRODUCT WORLD slot used everywhere else (real
// photo when one exists, honest placeholder otherwise) — the frame,
// labels, and CastFace pairing around it stay LOOP's own language.
function CheckoutButton() {
  const [placed, setPlaced] = useState(false)
  return (
    <button type="button" className="cast-bag__checkout" onClick={() => setPlaced(true)}>
      {placed ? 'Prototype order placed ✓' : 'Checkout'}
    </button>
  )
}

export default function CastBag({ items, open, onClose, onRemove, onUpdateQuantity }) {
  useEffect(() => {
    if (!open) return undefined
    function handleKey(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="cast-bag" role="dialog" aria-modal="true" aria-label="Bag" onClick={onClose}>
      <div className="cast-bag__panel" onClick={(event) => event.stopPropagation()}>
        <div className="cast-bag__header">
          <h3>Bag</h3>
          <button type="button" className="cast-bag__close" onClick={onClose} aria-label="Close bag">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cast-bag__empty">
            <p>Your bag is empty — go find the ring that's yours.</p>
            <a href="#cast" onClick={onClose}>
              meet the loop <span aria-hidden="true">→</span>
            </a>
          </div>
        ) : (
          <>
            <ul className="cast-bag__list">
              {items.map((item) => (
                <li className="cast-bag__row" key={item.key}>
                  <span className="cast-bag__thumb">
                    <ProductImage
                      src={item.images?.hero}
                      alt={`${item.ringName} — product photo`}
                      label="Photo"
                      ringType={item.ringType}
                      finish={item.finish}
                      placeholderId={`bag-${item.key}`}
                      compact
                    />
                  </span>
                  <span className="cast-bag__info">
                    <strong className="cast-bag__name">{item.ringName}</strong>
                    <span className="cast-bag__wearer">
                      <span className="cast-bag__face">
                        <CastFace
                          id={`bag-face-${item.key}`}
                          species={item.species}
                          hair={item.hair}
                          accessory="none"
                          mood={item.mood}
                        />
                      </span>
                      worn by {item.characterName}
                    </span>
                    <span className="cast-bag__meta">size {item.size}</span>
                  </span>
                  <button
                    type="button"
                    className="cast-bag__remove"
                    onClick={() => onRemove(item.key)}
                    aria-label={`Remove ${item.ringName}, size ${item.size}, from bag`}
                  >
                    remove
                  </button>
                  <span className="cast-bag__qty" role="group" aria-label={`Quantity for ${item.ringName}`}>
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.ringName}`}
                      onClick={() => onUpdateQuantity(item.key, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.ringName}`}
                      onClick={() => onUpdateQuantity(item.key, item.quantity + 1)}
                    >
                      +
                    </button>
                  </span>
                  <span className="cast-bag__line-price">
                    ₩{(item.price * item.quantity * 1000).toLocaleString('en-US')}
                  </span>
                </li>
              ))}
            </ul>

            <div className="cast-bag__footer">
              <div className="cast-bag__subtotal">
                <span>Subtotal</span>
                <strong>₩{(subtotal * 1000).toLocaleString('en-US')}</strong>
              </div>
              <CheckoutButton />
              <p className="cast-bag__note">Prototype checkout — fictional design study, no real order or payment.</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
