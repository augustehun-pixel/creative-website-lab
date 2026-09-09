import './RingGlyph.css'

// An original, flat, hand-drawn ring OBJECT — no photos, no gradients, no
// photorealistic render. Each LOOP ring still gets a genuinely different
// silhouette (round band, tall oval, chunky groove, faceted hammered
// outline, signet shank + plate, open twisted loop, two crossed bands,
// tapered coil). On top of that silhouette this version adds cues that
// push it from "flat symbol" toward "small silver object with volume":
// an off-center inner hole (so the band reads thicker on one side, like
// you're looking at it from a slight angle, not straight on), a dark
// "throat" behind that hole (so the opening reads as a tunnel with depth,
// not a flat cutout), a soft cast shadow under the object, and finish-
// driven texture (brushed strokes, an oxidized darker tone, a muted
// highlight for matte pieces) read straight from castData's `finish`
// field — so texture always matches the story, not just the shape.
// Reuses the wobble-filter technique so every drawn line on the site
// keeps one imperfect, handmade quality.

function hashSeed(str) {
  let h = 0
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) % 9973
  return h
}

// deterministic "randomness" per ring id — same ring always wobbles the
// same way, but no two rings wobble identically.
function jitter(seed, salt, range) {
  const n = (seed * 13 + salt * 29) % 11
  return ((n - 5) / 5) * range
}

// a donut whose inner hole is off-center from the outer ring — the metal
// reads thicker on one side and thinner on the other, which is what a
// flat "camera-straight" annulus can never do. That asymmetry alone is
// most of what makes a ring look like a real, dimensional object.
function bandPath(cx, cy, rx, ry, innerRx, innerRy, offsetX = 0, offsetY = 6) {
  const icx = cx + offsetX
  const icy = cy + offsetY
  return (
    `M${cx},${cy - ry} A${rx},${ry} 0 1,0 ${cx + 0.01},${cy - ry} Z ` +
    `M${icx},${icy - innerRy} A${innerRx},${innerRy} 0 1,1 ${icx - 0.01},${icy - innerRy} Z`
  )
}

function Metal({ d, dy = 3, transform, oxidized }) {
  // evenodd (rather than relying on winding direction) so any two nested
  // closed subpaths punch a hole correctly. A shadow-tone base + a
  // light-tone copy shifted up a few px reads as rounded silver with no
  // gradient — the sliver of shadow peeking out underneath is the cue.
  return (
    <g transform={transform} className={oxidized ? 'rg-oxidized' : ''}>
      <path d={d} fillRule="evenodd" className="rg-shadow" />
      <path d={d} fillRule="evenodd" className="rg-light" transform={`translate(0,${-dy})`} />
    </g>
  )
}

// sits behind the metal, filling the cut-out hole with a dark tone instead
// of blank stage — the difference between "a hole was cut here" and
// "you're looking into the inside of a tube."
function Throat({ cx, cy, rx, ry }) {
  return <ellipse cx={cx} cy={cy} rx={rx + 1.5} ry={ry + 1.5} className="rg-throat" />
}

function Highlight({ d = 'M22,40 A30,30 0 0,1 40,20', muted = false }) {
  return <path d={d} className={`rg-highlight ${muted ? 'rg-highlight--muted' : ''}`} />
}

// a handful of short, gently curved strokes standing in for brushed-metal
// grain — only drawn when castData's finish says "brushed."
function Brushed({ seed, cx, cy, spread }) {
  const rows = [-13, -5, 3, 11]
  return (
    <g className="rg-brushed">
      {rows.map((rowY, i) => (
        <path
          key={rowY}
          d={`M${cx - spread + jitter(seed, i, 3)},${cy + rowY} Q${cx + jitter(seed, i + 4, 4)},${cy + rowY - 4} ${cx + spread + jitter(seed, i + 8, 3)},${cy + rowY}`}
          className="rg-brushed-line"
        />
      ))}
    </g>
  )
}

function CastShadow({ filterId }) {
  return <ellipse cx="50" cy="90" rx="27" ry="6.5" className="rg-cast-shadow" filter={`url(#${filterId})`} />
}

const isOxidized = (finish = '') => finish.includes('oxidized')
const isMatte = (finish = '') => finish.includes('matte')
const isBrushed = (finish = '') => finish.includes('brushed')

export default function RingGlyph({ id, type = 'band', finish = '', worn = false, className = '' }) {
  const filterId = `ring-wobble-${id}`
  const blurId = `ring-blur-${id}`
  // strip the context prefixes callers add (grid card vs. shop row vs.
  // modal all render the same ring) so one character's ring always gets
  // the same handmade jitter, wherever it appears on the site.
  const baseId = id.replace(/^(modal-|shop-)/, '')
  const seed = hashSeed(baseId)
  const oxidized = isOxidized(finish)
  const matte = isMatte(finish)
  const brushed = isBrushed(finish)

  let body = null
  let throat = null

  switch (type) {
    case 'wide': {
      const offX = jitter(seed, 2, 1.2)
      const offY = 7 + jitter(seed, 1, 1.5)
      throat = <Throat cx={50 + offX} cy={54 + offY} rx={15} ry={27} />
      body = (
        <>
          <Metal d={bandPath(50, 54, 28, 42, 15, 27, offX, offY)} oxidized={oxidized} />
          <Highlight d="M26,32 A30,42 0 0,1 40,16" />
        </>
      )
      break
    }

    case 'stack': {
      // two thin loops, different centers and tilts, one drawn behind the
      // other — reads as two rings crossed, not one ring with a stripe.
      body = (
        <>
          <Metal
            d={bandPath(58, 60, 28, 21, 21, 15, 0, 3 + jitter(seed, 3, 1.5))}
            transform={`rotate(${8 + jitter(seed, 4, 2)} 58 60)`}
            dy={2.5}
            oxidized={oxidized}
          />
          <Metal
            d={bandPath(44, 46, 28, 21, 21, 15, 0, 3 + jitter(seed, 5, 1.5))}
            transform={`rotate(${-8 + jitter(seed, 6, 2)} 44 46)`}
            dy={2.5}
            oxidized={oxidized}
          />
          <Highlight d="M22,34 A26,20 0 0,1 34,20" />
        </>
      )
      break
    }

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
          <Highlight d="M64,18 A28,28 0 0,1 74,26" />
        </>
      )
      break

    case 'signet': {
      const shank = 'M27,50 A26,26 0 1,0 73,50'
      body = (
        <>
          <path d={shank} className="rg-coil-shadow" />
          <path d={shank} className="rg-coil-light" transform="translate(0,-2.5)" />
          <g transform={`rotate(${-5 + jitter(seed, 7, 2)} 50 38)`} className={oxidized ? 'rg-oxidized' : ''}>
            <rect x="29" y="22" width="42" height="30" rx="7" className="rg-shadow" transform="translate(4,6)" />
            <rect x="29" y="22" width="42" height="30" rx="7" className="rg-light" />
            <path d="M37,37.5 L63,37.5" className="rg-groove-dark rg-groove-dark--thin" />
            <path d="M37,36 L63,36" className="rg-groove-light rg-groove-light--thin" />
          </g>
          <Highlight d="M22,44 A26,26 0 0,1 32,26" />
        </>
      )
      break
    }

    case 'twist': {
      // a second, thinner strand drawn just behind the main one — two
      // wires crossing near each end, not one line pretending to twist.
      const wave = 'M50,16 C70,18 84,32 84,52 C84,72 68,86 48,84 C32,82 20,70 20,55'
      const wave2 = 'M46,21 C62,25 74,37 74,54 C74,69 61,80 46,78'
      body = (
        <>
          <path d={wave2} className="rg-coil-shadow rg-coil-shadow--thin" />
          <path d={wave2} className="rg-coil-light rg-coil-light--thin" transform="translate(-1,-1.5)" />
          <path d={wave} className="rg-coil-shadow" />
          <path d={wave} className="rg-coil-light" transform="translate(0,-2.5)" />
          <Highlight d="M26,34 A34,34 0 0,1 42,18" />
        </>
      )
      break
    }

    case 'hammered':
      body = (
        <>
          <Metal
            d="M50,15 L62,19 L72,27 L78,39 L78,51 L73,63 L63,72 L51,76 L39,73 L28,65 L22,53 L22,40 L27,28 L37,19 Z
               M50,29 L58,32 L63,39 L63,50 L59,58 L51,62 L42,59 L37,51 L38,40 L43,32 Z"
            dy={2.5}
            oxidized={oxidized}
          />
          <path d="M50,29 L47,58" className="rg-facet" />
          <path d="M37,40 L62,49" className="rg-facet" />
          {[
            [46, 22], [64, 26], [73, 44], [69, 60], [54, 71], [34, 66], [25, 48], [30, 30],
          ].map(([x, y], i) => (
            <circle key={`${x}-${y}`} cx={x + jitter(seed, i, 1)} cy={y + jitter(seed, i + 20, 1)} r="1.6" className="rg-dot" />
          ))}
          {/* matte finish doesn't throw a sharp specular highlight */}
          <Highlight d="M25,40 A28,28 0 0,1 38,22" muted={matte} />
        </>
      )
      break

    case 'engraved': {
      // chunky, deliberately thicker than the others — "Loudline" reads
      // heavy, not delicate.
      const offX = jitter(seed, 9, 1.2)
      const offY = 5 + jitter(seed, 8, 1.2)
      throat = <Throat cx={50 + offX} cy={54 + offY} rx={18} ry={18} />
      body = (
        <>
          <Metal d={bandPath(50, 54, 42, 42, 18, 18, offX, offY)} oxidized={oxidized} />
          <circle cx="50" cy="54" r="30" className="rg-groove-dark" />
          <circle cx="50" cy="52.5" r="30" className="rg-groove-light" />
          <Highlight d="M18,44 A32,32 0 0,1 34,20" />
        </>
      )
      break
    }

    case 'band':
    default: {
      const offX = jitter(seed, 11, 1)
      const offY = 6 + jitter(seed, 10, 1.2)
      throat = <Throat cx={50 + offX} cy={54 + offY} rx={25} ry={25} />
      body = (
        <>
          <Metal d={bandPath(50, 54, 36, 36, 25, 25, offX, offY)} oxidized={oxidized} />
          <Highlight d="M20,46 A30,30 0 0,1 36,22" />
        </>
      )
    }
  }

  return (
    <svg viewBox="0 0 100 100" className={`ring-glyph ${className}`} role="img" aria-label={`${type} ring`}>
      <defs>
        <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.025" numOctaves="1" seed={(seed % 40) + 3} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
        </filter>
        <filter id={blurId} x="-60%" y="-150%" width="220%" height="400%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      {/* the table shadow and the dark hole-fill both read as "this ring
          is sitting on a surface" — worn mode replaces that surface with
          a finger, so both are dropped there to avoid a shadow floating
          in mid-air and a dark disc plugging the opening the finger
          should pass through. */}
      {!worn && <CastShadow filterId={blurId} />}
      <g filter={`url(#${filterId})`}>
        {!worn && throat}
        {body}
        {brushed && <Brushed seed={seed} cx={50} cy={54} spread={20} />}
      </g>
    </svg>
  )
}
