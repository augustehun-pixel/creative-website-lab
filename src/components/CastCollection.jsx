import RingGlyph from './RingGlyph.jsx'
import CAST from '../data/castData.js'
import useInView from '../hooks/useInView.js'
import './CastCollection.css'

// The same eight, read as a catalogue index instead of a wall of faces —
// a different rhythm for the same characters, not a second copy of the grid.
export default function CastCollection({ onOpenRing, onAddToBag }) {
  const [ref, inView] = useInView(0.05)

  return (
    <section id="shop" className={`cast-shop ${inView ? 'is-in-view' : ''}`} ref={ref}>
      <div className="cast-shop__intro">
        <h2>The collection</h2>
        <p>Eight rings, eight people. No two read the same, because no two of us do either.</p>
      </div>

      <ul className="cast-shop__list">
        {CAST.map((member, i) => (
          <li className="cast-row" style={{ '--i': i }} key={member.id}>
            <button type="button" className="cast-row__hit" onClick={() => onOpenRing(member.id)}>
              <span className="cast-row__thumb">
                <RingGlyph id={`shop-${member.id}`} type={member.ringType} finish={member.finish} />
              </span>
              <span className="cast-row__names">
                <strong>{member.ringName}</strong>
                <em>worn by {member.name} — {member.finish}</em>
              </span>
              <span className="cast-row__price">₩{(member.price * 1000).toLocaleString('en-US')}</span>
            </button>
            <button type="button" className="cast-row__add" onClick={() => onAddToBag(member, member.sizes[Math.floor(member.sizes.length / 2)])}>
              add to bag
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
