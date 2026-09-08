import CastFace from './CastFace.jsx'
import RingGlyph from './RingGlyph.jsx'
import CAST from '../data/castData.js'
import useInView from '../hooks/useInView.js'
import './CastStory.css'

// The face-and-ring pairing repeats one more time here as a marquee — face,
// then that person's ring, on down the strip. Same rhythm used in the hero,
// the nav mark, and the grid, so the "personality → ring" idea reads as one
// consistent graphic system rather than a one-off card interaction.
export default function CastStory() {
  const [ref, inView] = useInView(0.2)
  const pairs = CAST.flatMap((member) => [
    { kind: 'face', member },
    { kind: 'ring', member },
  ])
  const strip = [...pairs, ...pairs]

  return (
    <section id="story" className={`cast-story ${inView ? 'is-in-view' : ''}`} ref={ref}>
      <div className="cast-story__copy">
        <h2>No two of us look alike. Neither should the ring on your hand.</h2>
        <p>
          LOOP started as a drawing of eight faces that refused to match. Instead of smoothing that out, we cast each
          one in silver — every band, twist and hammered surface is built around one specific, slightly uneven
          personality, not a single "best seller" everyone wears the same way.
        </p>
      </div>
      <div className="cast-story__marquee" aria-hidden="true">
        <div className="cast-story__track">
          {strip.map(({ kind, member }, i) => (
            <div className="cast-story__icon" key={`${member.id}-${kind}-${i}`}>
              {kind === 'face' ? (
                <CastFace id={`story-${member.id}-${i}`} species={member.species} hair={member.hair} accessory="none" mood={member.mood} />
              ) : (
                <RingGlyph id={`story-ring-${member.id}-${i}`} type={member.ringType} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
