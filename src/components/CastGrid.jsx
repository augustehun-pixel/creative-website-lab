import CastCard from './CastCard.jsx'
import CAST from '../data/castData.js'
import useInView from '../hooks/useInView.js'
import './CastGrid.css'

// Editorial placement for the eight cards: two wide "lg" cards, a row of
// three "md" cards, two more "lg" cards, then Sable spans full width as a
// closing spread. Sizes and offsets live here (layout), not in castData.js
// (product data) — swapping products later won't touch this arrangement.
const LAYOUT = [
  { variant: 'lg', offset: 0 }, // Moss
  { variant: 'lg', offset: 48 }, // Wren
  { variant: 'md', offset: 0 }, // Arlo
  { variant: 'md', offset: 32 }, // Pip
  { variant: 'md', offset: 0 }, // Juno
  { variant: 'lg', offset: 0 }, // Baz
  { variant: 'lg', offset: 40 }, // Remy
  { variant: 'full', offset: 0 }, // Sable
]

export default function CastGrid({ onOpenRing }) {
  const [ref, inView] = useInView(0.05)

  return (
    <section id="cast" className={`cast-grid ${inView ? 'is-in-view' : ''}`} ref={ref}>
      <div className="cast-grid__intro">
        <h2>Meet the loop</h2>
        <p>Eight personalities, eight silver rings. Hover or tap a face to see what's theirs.</p>
      </div>

      <div className="cast-grid__wall">
        {CAST.map((member, i) => (
          <div
            className={`cast-grid__slot cast-grid__slot--${LAYOUT[i].variant}`}
            key={member.id}
            style={{ '--i': i, '--offset': `${LAYOUT[i].offset}px` }}
          >
            <CastCard member={member} index={i} variant={LAYOUT[i].variant} onOpenRing={onOpenRing} />
          </div>
        ))}
      </div>
    </section>
  )
}
