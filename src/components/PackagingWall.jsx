import TUBS from './packagingWallData.js'
import './PackagingWall.css'

// Three density tiers so the wall can lose shapes (not just shrink them)
// on smaller screens. Every third tub belongs to each tier.
const TIERS = ['packaging-tub--core', 'packaging-tub--tablet', 'packaging-tub--desktop']

// Each section gets its own slice of the tub list, its own opacity, and
// a small extra rotation — so no two sections look exactly the same,
// even though they're built from the same visual language. The hero and
// closing sections stay the densest/most visible since they bookend the
// experience; the flavor section stays the quietest so the puddle and
// flavor buttons remain the clear focus.
const VARIANTS = {
  hero: { pick: () => true, opacity: 0.5, extraRotate: 0 },
  drift: { pick: (i) => i % 2 === 0, opacity: 0.35, extraRotate: 6 },
  soft: { pick: (i) => i % 3 === 0, opacity: 0.2, extraRotate: -5 },
  closing: { pick: (i) => i % 2 === 1, opacity: 0.42, extraRotate: -6 },
}

function PackagingWall({ variant = 'hero' }) {
  const config = VARIANTS[variant]
  const tubs = TUBS.filter((_, index) => config.pick(index))

  return (
    <div
      className="packaging-wall"
      style={{ '--wall-opacity': config.opacity }}
      aria-hidden="true"
    >
      {tubs.map((tub, index) => (
        <div
          key={index}
          className={`packaging-tub ${TIERS[index % TIERS.length]}`}
          style={{
            top: tub.top,
            left: tub.left,
            width: `${tub.width}vw`,
            transform: `rotate(${tub.rotate + config.extraRotate}deg)`,
          }}
        >
          <span className="packaging-tub__label">melto</span>
        </div>
      ))}
    </div>
  )
}

export default PackagingWall
