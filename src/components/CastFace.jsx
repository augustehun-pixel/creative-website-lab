import './CastFace.css'

// One SVG "face" = one CAST product photo. Species + hair + accessory are
// combined from a small set of hand-built parts, then run through an SVG
// turbulence filter so every clean bezier path comes out looking like a
// slightly wobbly, hand-drawn line — imperfect on purpose, never traced
// from the reference image.
const EYE = { L: 46, R: 74, Y: 58 }

function Eyes({ blinking }) {
  if (blinking) {
    return (
      <>
        <path d={`M${EYE.L - 6},${EYE.Y} q6,4 12,0`} className="cf-stroke" />
        <path d={`M${EYE.R - 6},${EYE.Y} q6,4 12,0`} className="cf-stroke" />
      </>
    )
  }
  return (
    <>
      <circle cx={EYE.L} cy={EYE.Y} r="4.6" className="cf-fill-white cf-stroke" />
      <circle cx={EYE.L + 1.2} cy={EYE.Y} r="1.6" className="cf-fill-black" />
      <circle cx={EYE.R} cy={EYE.Y} r="4.6" className="cf-fill-white cf-stroke" />
      <circle cx={EYE.R + 1.2} cy={EYE.Y} r="1.6" className="cf-fill-black" />
    </>
  )
}

function Glasses({ shape }) {
  if (shape === 'cat-eye') {
    return (
      <g className="cf-fill-black">
        <path d="M33,50 L54,55 Q57,60 54,67 L36,65 Q28,59 33,50 Z" />
        <path d="M87,50 L66,55 Q63,60 66,67 L84,65 Q92,59 87,50 Z" />
        <path d="M54,59 Q60,55 66,59" className="cf-bridge" />
      </g>
    )
  }
  return (
    <g>
      <circle cx={EYE.L} cy={EYE.Y} r="9" className="cf-fill-black cf-stroke" />
      <circle cx={EYE.R} cy={EYE.Y} r="9" className="cf-fill-black cf-stroke" />
      <path d={`M${EYE.L + 9},${EYE.Y - 1} Q60,${EYE.Y - 5} ${EYE.R - 9},${EYE.Y - 1}`} className="cf-bridge" />
    </g>
  )
}

function Mouth({ mood }) {
  const smile = mood === 'eager' || mood === 'bold'
  return smile ? (
    <path d="M50,86 Q60,93 70,86" className="cf-stroke" />
  ) : (
    <path d="M50,87 L70,87" className="cf-stroke" />
  )
}

function Hair({ hair }) {
  switch (hair) {
    case 'center':
      return (
        <path
          d="M60,10 C36,10 24,32 26,58 C27,74 30,92 34,104 L40,102 C36,84 34,60 38,42 C42,26 78,26 82,42 C86,60 84,84 80,102 L86,104 C90,92 93,74 94,58 C96,32 84,10 60,10 Z"
          className="cf-fill-black"
        />
      )
    case 'curl':
      return (
        <path
          d="M34,40 C30,24 44,10 60,10 C76,10 90,24 86,40 C90,38 92,30 88,26 C90,20 84,16 80,18 C76,12 66,8 60,10 C54,8 44,12 40,18 C36,16 30,20 32,26 C28,30 30,38 34,40 Z"
          className="cf-fill-black"
        />
      )
    case 'sweep':
    default:
      return (
        <path
          d="M28,44 C24,26 40,10 60,11 C72,12 80,18 82,26 C70,20 50,20 40,30 C34,36 32,40 34,48 C30,48 28,46 28,44 Z"
          className="cf-fill-black"
        />
      )
  }
}

function SpeciesShape({ species }) {
  switch (species) {
    case 'dog':
      return (
        <>
          <path d="M14,46 C10,70 16,88 26,92 L34,72 C30,62 30,52 32,44 Z" className="cf-fill-black cf-stroke" />
          <path d="M106,46 C110,70 104,88 94,92 L86,72 C90,62 90,52 88,44 Z" className="cf-fill-black cf-stroke" />
          <path d="M32,40 C30,20 46,8 60,8 C74,8 90,20 88,40 C90,60 84,90 60,98 C36,90 30,60 32,40 Z" className="cf-fill-white cf-stroke" />
        </>
      )
    case 'cat':
      return (
        <>
          <path d="M34,26 L26,6 L46,20 Z" className="cf-fill-white cf-stroke" />
          <path d="M86,26 L94,6 L74,20 Z" className="cf-fill-white cf-stroke" />
          <path d="M32,36 C30,20 44,12 60,12 C76,12 90,20 88,36 C92,54 82,86 60,94 C38,86 28,54 32,36 Z" className="cf-fill-white cf-stroke" />
          <path d="M40,72 l-10,3 M40,76 l-11,0 M80,72 l10,3 M80,76 l11,0" className="cf-stroke cf-thin" />
        </>
      )
    case 'tiger':
      return (
        <>
          <path d="M30,24 L20,4 L44,18 Z" className="cf-fill-black cf-stroke" />
          <path d="M90,24 L100,4 L76,18 Z" className="cf-fill-black cf-stroke" />
          <path d="M30,36 C28,18 44,10 60,10 C76,10 92,18 90,36 C94,56 84,90 60,98 C36,90 26,56 30,36 Z" className="cf-fill-white cf-stroke" />
          <path
            d="M34,32 L30,26 M42,26 L38,18 M78,26 L82,18 M86,32 L90,26 M32,78 L24,82 M88,78 L96,82"
            className="cf-stroke cf-thin"
          />
        </>
      )
    case 'horse':
      return (
        <>
          <path d="M44,10 L40,0 L52,12 Z" className="cf-fill-white cf-stroke" />
          <path d="M76,10 L80,0 L68,12 Z" className="cf-fill-white cf-stroke" />
          <path
            d="M40,14 C30,14 26,30 28,44 C24,60 26,88 40,104 C48,108 72,108 80,104 C94,88 96,60 92,44 C94,30 90,14 80,14 C74,10 46,10 40,14 Z"
            className="cf-fill-white cf-stroke"
          />
        </>
      )
    case 'human':
    default:
      return (
        <path
          d="M32,44 C30,22 44,10 60,11 C76,10 90,22 88,44 C90,64 82,92 60,100 C38,92 30,64 32,44 Z"
          className="cf-fill-white cf-stroke"
        />
      )
  }
}

function Accessory({ accessory, species }) {
  switch (accessory) {
    case 'hoop':
      return <circle cx={species === 'dog' ? 20 : 28} cy="70" r="6" className="cf-ring" />
    case 'stud':
      return <circle cx="30" cy="66" r="3" className="cf-fill-black" />
    case 'pearl':
      return (
        <>
          <circle cx="30" cy="70" r="4.5" className="cf-fill-white cf-stroke" />
          <circle cx="28.5" cy="68.5" r="1" className="cf-fill-black" />
        </>
      )
    case 'clip':
      return (
        <g transform="translate(66,6) rotate(18)">
          <path d="M0,0 L14,4 L0,8 L4,4 Z" className="cf-fill-black" />
        </g>
      )
    case 'bandana':
      return <path d="M42,96 L60,110 L78,96 L70,94 L60,100 L50,94 Z" className="cf-fill-black cf-stroke" />
    case 'chain':
      return (
        <>
          <path d="M40,90 Q60,100 80,90" className="cf-stroke" />
          <path d="M44,96 Q60,106 76,96" className="cf-stroke" />
        </>
      )
    default:
      return null
  }
}

function SnakeFace({ blinking, accessory }) {
  return (
    <>
      <ellipse cx="60" cy="30" rx="20" ry="18" className="cf-fill-white cf-stroke" />
      <ellipse cx="58" cy="58" rx="24" ry="17" className="cf-fill-white cf-stroke" />
      <ellipse cx="62" cy="86" rx="21" ry="16" className="cf-fill-white cf-stroke" />
      {[30, 58, 86].map((y) => (
        <g key={y}>
          <circle cx="48" cy={y - 6} r="2.4" className="cf-fill-black" />
          <circle cx="60" cy={y + 6} r="2.4" className="cf-fill-black" />
          <circle cx="72" cy={y - 4} r="2.4" className="cf-fill-black" />
        </g>
      ))}
      <Eyes blinking={blinking} />
      {accessory === 'chain' && <Accessory accessory={accessory} />}
    </>
  )
}

export default function CastFace({
  id,
  species = 'human',
  hair,
  accessory,
  mood = 'calm',
  blinking = false,
  className = '',
}) {
  const filterId = `wobble-${id}`
  const wearsGlasses = accessory === 'round' || accessory === 'cat-eye'
  const isSnake = species === 'snake'

  return (
    <svg viewBox="0 0 120 140" className={`cast-face ${className}`} role="img" aria-label={id}>
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="1" seed={id.length + 3} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        {isSnake ? (
          <SnakeFace blinking={blinking} accessory={accessory} />
        ) : (
          <>
            <SpeciesShape species={species} />
            {species === 'human' && <Hair hair={hair} />}
            {species === 'horse' && <Hair hair="center" />}
            {wearsGlasses ? <Glasses shape={accessory} /> : <Eyes blinking={blinking} />}
            <Mouth mood={mood} />
            {!wearsGlasses && <Accessory accessory={accessory} species={species} />}
          </>
        )}
      </g>
    </svg>
  )
}
