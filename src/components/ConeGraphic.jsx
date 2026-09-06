import './ConeGraphic.css'

// All four shapes share the same 200x260 canvas so they line up perfectly
// when they are stacked on top of each other and cross-faded.
const VIEW_BOX = '0 0 200 260'

function ShapePaths({ variant }) {
  switch (variant) {
    // A tall, sharp, rigid cone — the untouched hero shape. The base is
    // wide relative to the canvas so the shape reads as bold/heavy
    // rather than a thin needle.
    case 'rigid':
      return (
        <path d="M100,20 C122,90 138,160 160,230 Q100,252 40,230 C62,160 78,90 100,20 Z" />
      )

    // The same cone, base unchanged, but the tip has curled over into a
    // single soft hook — like a scoop that's flopped over — instead of
    // tapering to a point.
    case 'drooping':
      return (
        <path d="M40,230 C58,160 70,110 82,90 C92,55 135,40 152,64 C164,82 142,106 116,108 C128,135 148,180 158,225 Q100,252 40,230 Z" />
      )

    // A wide, flat puddle — what the cone becomes once fully melted.
    case 'puddle':
      return (
        <path d="M30,190 C30,150 65,130 100,130 C135,130 170,150 170,190 C170,222 135,240 100,240 C65,240 30,222 30,190 Z" />
      )

    // A simple cup with a scoop of gelato peeking over the rim.
    case 'cup':
      return (
        <>
          <path d="M65,140 L135,140 L122,235 Q100,248 78,235 Z" />
          <path d="M68,138 C68,105 132,105 132,138 Z" />
          <ellipse cx="100" cy="140" rx="38" ry="9" />
        </>
      )

    default:
      return null
  }
}

function ConeGraphic({ variant, className = '', style }) {
  return (
    <svg
      className={`cone-graphic cone-graphic--${variant} ${className}`}
      viewBox={VIEW_BOX}
      style={style}
      aria-hidden="true"
    >
      <ShapePaths variant={variant} />
    </svg>
  )
}

export default ConeGraphic
