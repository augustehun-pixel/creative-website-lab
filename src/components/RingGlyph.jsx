import './RingGlyph.css'

// An original, flat, hand-drawn ring OBJECT — no photos, no gradients.
// Each LOOP ring gets a genuinely different silhouette (round band, tall
// oval, chunky groove, faceted hammered outline, signet shank + plate,
// open twisted loop, two crossed bands, tapered coil), not one shape with
// a different pattern stamped on it. "Metal" is two flat tones layered
// with a small offset — a lit face and a shadow face — plus one white
// highlight stroke, which is enough to read as rounded silver without a
// gradient. Reuses CastFace's wobble-filter technique so every drawn line
// on the site shares one imperfect, handmade quality.
function ellipseDonut(cx, cy, rx, ry, rxIn, ryIn) {
  return (
    `M${cx},${cy - ry} A${rx},${ry} 0 1,0 ${cx + 0.01},${cy - ry} Z ` +
    `M${cx},${cy - ryIn} A${rxIn},${ryIn} 0 1,1 ${cx - 0.01},${cy - ryIn} Z`
  )
}

function Metal({ d, dy = 3, transform }) {
  // evenodd (rather than relying on winding direction) so any two nested
  // closed subpaths punch a hole correctly, whether they're the arc-based
  // donut shapes or the hand-authored hammered polygon below.
  return (
    <g transform={transform}>
      <path d={d} fillRule="evenodd" className="rg-shadow" />
      <path d={d} fillRule="evenodd" className="rg-light" transform={`translate(0,${-dy})`} />
    </g>
  )
}

function Highlight({ d = 'M22,40 A30,30 0 0,1 40,20' }) {
  return <path d={d} className="rg-highlight" />
}

export default function RingGlyph({ id, type = 'band', className = '' }) {
  const filterId = `ring-wobble-${id}`

  let body = null
  switch (type) {
    case 'wide':
      // a tall, elongated oval — deliberately not round, so "wide band" is
      // a different shape from the others, not just a bigger version.
      body = (
        <>
          <Metal d={ellipseDonut(50, 54, 28, 42, 15, 27)} />
          <Highlight d="M26,32 A30,42 0 0,1 40,16" />
        </>
      )
      break

    case 'stack':
      // two thin loops, different centers and tilts, one drawn behind the
      // other — reads as two rings crossed, not one ring with a stripe.
      body = (
        <>
          <Metal d={ellipseDonut(58, 60, 28, 21, 21, 15)} transform="rotate(8 58 60)" dy={2.5} />
          <Metal d={ellipseDonut(44, 46, 28, 21, 21, 15)} transform="rotate(-8 44 46)" dy={2.5} />
          <Highlight d="M22,34 A26,20 0 0,1 34,20" />
        </>
      )
      break

    case 'coil':
      body = (
        <>
          <path
            d="M70,30 C72,16 54,8 40,14 C24,21 20,40 32,50 C42,58 58,52 58,40 C58,30 46,26 40,34 C35,41 42,48 48,44"
            className="rg-coil-shadow"
          />
          <path
            d="M70,30 C72,16 54,8 40,14 C24,21 20,40 32,50 C42,58 58,52 58,40 C58,30 46,26 40,34 C35,41 42,48 48,44"
            className="rg-coil-light"
            transform="translate(-1.5,-2)"
          />
        </>
      )
      break

    case 'signet': {
      const shank = 'M27,50 A26,26 0 1,0 73,50'
      return (
        <SvgFrame id={id} filterId={filterId} className={className} label={type}>
          <path d={shank} className="rg-coil-shadow" />
          <path d={shank} className="rg-coil-light" transform="translate(0,-2.5)" />
          <g transform="rotate(-5 50 38)">
            <rect x="29" y="22" width="42" height="30" rx="7" className="rg-shadow" transform="translate(3,4)" />
            <rect x="29" y="22" width="42" height="30" rx="7" className="rg-light" />
            <path d="M37,37 L63,37" className="rg-engrave" />
          </g>
          <Highlight d="M22,44 A26,26 0 0,1 32,26" />
        </SvgFrame>
      )
    }

    case 'twist': {
      const wave = 'M50,16 C70,18 84,32 84,52 C84,72 68,86 48,84 C32,82 20,70 20,55'
      return (
        <SvgFrame id={id} filterId={filterId} className={className} label={type}>
          <path d={wave} className="rg-coil-shadow" />
          <path d={wave} className="rg-coil-light" transform="translate(0,-2.5)" />
          <path
            d="M28,58 Q38,48 48,58 T68,58 T84,50"
            className="rg-engrave"
          />
          <Highlight d="M26,34 A34,34 0 0,1 42,18" />
        </SvgFrame>
      )
    }

    case 'hammered':
      body = (
        <>
          <Metal
            d="M50,15 L62,19 L72,27 L78,39 L78,51 L73,63 L63,72 L51,76 L39,73 L28,65 L22,53 L22,40 L27,28 L37,19 Z
               M50,29 L58,32 L63,39 L63,50 L59,58 L51,62 L42,59 L37,51 L38,40 L43,32 Z"
            dy={2.5}
          />
          {[
            [46, 22], [64, 26], [73, 44], [69, 60], [54, 71], [34, 66], [25, 48], [30, 30],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.6" className="rg-dot" />
          ))}
          <Highlight d="M25,40 A28,28 0 0,1 38,22" />
        </>
      )
      break

    case 'engraved':
      body = (
        <>
          <Metal d={ellipseDonut(50, 54, 40, 40, 20, 20)} />
          <circle cx="50" cy="54" r="30" className="rg-oxidized-groove" />
          <Highlight d="M18,44 A32,32 0 0,1 34,20" />
        </>
      )
      break

    case 'band':
    default:
      body = (
        <>
          <Metal d={ellipseDonut(50, 54, 36, 36, 25, 25)} />
          <Highlight d="M20,46 A30,30 0 0,1 36,22" />
        </>
      )
  }

  return (
    <SvgFrame id={id} filterId={filterId} className={className} label={type}>
      {body}
    </SvgFrame>
  )
}

function SvgFrame({ id, filterId, className, label, children }) {
  return (
    <svg viewBox="0 0 100 100" className={`ring-glyph ${className}`} role="img" aria-label={`${label} ring`}>
      <defs>
        <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.025" numOctaves="1" seed={id.length + 5} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>{children}</g>
    </svg>
  )
}
