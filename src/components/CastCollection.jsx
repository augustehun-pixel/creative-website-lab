import ProductImage from './ProductImage.jsx'
import CastFace from './CastFace.jsx'
import CAST, { hasRealPhoto } from '../data/castData.js'
import useInView from '../hooks/useInView.js'
import './CastCollection.css'

// The same eight, read as a catalogue index instead of a wall of faces —
// a different rhythm for the same characters, not a second copy of the grid.
//
// A row only acts like a buyable product once it has a real photo: no
// price, no "add to bag" for a ring that isn't real yet — just the
// character, its name, and a quiet "coming soon" instead. Wiring in a real
// photo later is the only change needed to flip a row into the real branch.
export default function CastCollection({ onOpenRing, onAddToBag }) {
  const [ref, inView] = useInView(0.05)

  return (
    <section id="shop" className={`cast-shop ${inView ? 'is-in-view' : ''}`} ref={ref}>
      <div className="cast-shop__intro">
        <h2>The collection</h2>
        <p>Eight rings, eight people. No two read the same, because no two of us do either.</p>
      </div>

      <ul className="cast-shop__list">
        {CAST.map((member, i) => {
          const isReal = hasRealPhoto(member)
          return (
            <li className={`cast-row ${isReal ? 'is-real' : 'is-soon'}`} style={{ '--i': i }} key={member.id}>
              <button type="button" className="cast-row__hit" onClick={() => onOpenRing(member.id)}>
                <span className="cast-row__thumb">
                  {isReal ? (
                    <ProductImage
                      src={member.images.hero}
                      alt={`${member.ringName} — product photo`}
                      label="Photo"
                      ringType={member.ringType}
                      finish={member.finish}
                      placeholderId={`shop-${member.id}`}
                      compact
                    />
                  ) : (
                    <span className="cast-row__soon-face">
                      <CastFace
                        id={`shop-soon-${member.id}`}
                        species={member.species}
                        hair={member.hair}
                        accessory={member.accessory}
                        mood={member.mood}
                      />
                    </span>
                  )}
                </span>
                <span className="cast-row__names">
                  <strong>{member.ringName}</strong>
                  <em>worn by {member.name} — {member.finish}</em>
                </span>
                {isReal ? (
                  <span className="cast-row__price">₩{(member.price * 1000).toLocaleString('en-US')}</span>
                ) : (
                  <span className="cast-row__soon-tag">coming soon</span>
                )}
              </button>
              {isReal ? (
                <button type="button" className="cast-row__add" onClick={() => onAddToBag(member, member.sizes[Math.floor(member.sizes.length / 2)])}>
                  add to bag
                </button>
              ) : (
                <span className="cast-row__add cast-row__add--soon" aria-hidden="true">
                  soon
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
