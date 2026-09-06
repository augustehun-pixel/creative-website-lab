import { useRef } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { clamp } from '../utils/clamp.js'
import ConeGraphic from './ConeGraphic.jsx'
import PackagingWall from './PackagingWall.jsx'
import './MeltStage.css'

function MeltStage() {
  const sectionRef = useRef(null)
  const progress = useScrollProgress(sectionRef)

  // The cone stays dominant for the first half of this section, then
  // dissolves into the puddle shape over the second half.
  const puddleOpacity = clamp((progress - 0.5) / 0.3, 0, 1)
  const droopOpacity = 1 - puddleOpacity

  // The whole shape also sinks and shrinks slightly as it melts, so the
  // crossfade reads as "sinking into a puddle" rather than a flat swap.
  const sinkAmount = clamp(progress / 0.7, 0, 1)
  const shapeStyle = {
    transform: `translateY(${sinkAmount * 36}px) scale(${1 - sinkAmount * 0.12})`,
  }

  const textOpacity = clamp((progress - 0.05) / 0.3, 0, 1)

  return (
    <section className="melt-stage" ref={sectionRef}>
      <PackagingWall variant="drift" />
      <div className="melt-stage__pin">
        <div className="melt-stage__shape" style={shapeStyle}>
          <ConeGraphic
            variant="drooping"
            className="melt-stage__layer"
            style={{ opacity: droopOpacity }}
          />
          <ConeGraphic
            variant="puddle"
            className="melt-stage__layer"
            style={{ opacity: puddleOpacity }}
          />
        </div>
        <p className="melt-stage__story" style={{ opacity: textOpacity }}>
          one color. one shape. one slow melt.
        </p>
      </div>
    </section>
  )
}

export default MeltStage
