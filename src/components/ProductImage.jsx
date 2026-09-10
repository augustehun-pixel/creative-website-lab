import RingGlyph from './RingGlyph.jsx'
import './ProductImage.css'

// The one place PRODUCT WORLD and BRAND WORLD meet, on purpose: this slot
// renders a real photo the moment `src` is set, and an honestly-labeled
// placeholder when it isn't — so wiring in real product photography later
// is a data change (fill in castData.js's `images`), never a rebuild.
// The placeholder is deliberately NOT a finished-looking image: a small
// muted RingGlyph sketch (the one role brand illustration keeps in the
// product area — a reference, not a stand-in for the real photo) plus a
// plain-language label naming exactly what shot belongs here.
export default function ProductImage({
  src,
  alt,
  label,
  sublabel,
  ringType = 'band',
  finish = '',
  placeholderId,
  compact = false,
  className = '',
}) {
  if (src) {
    return <img src={src} alt={alt} className={`product-image ${className}`} />
  }

  if (compact) {
    return (
      <span className={`product-image product-image--placeholder product-image--compact ${className}`} role="img" aria-label={alt}>
        <span className="product-image__label">{label}</span>
      </span>
    )
  }

  return (
    <span className={`product-image product-image--placeholder ${className}`} role="img" aria-label={alt}>
      <span className="product-image__sketch">
        <RingGlyph id={placeholderId} type={ringType} finish={finish} />
      </span>
      <span className="product-image__label">{label}</span>
      {sublabel && <span className="product-image__sublabel">{sublabel}</span>}
    </span>
  )
}
