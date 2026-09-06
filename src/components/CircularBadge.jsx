import './CircularBadge.css'

const BADGE_TEXT = 'SLOW MELT • BOLD COLOR • HAND SCOOPED • '

// A ring of text that spins slowly, echoing the circular "stamp" badge
// printed on the reference packaging's lid.
function CircularBadge() {
  return (
    <div className="circular-badge" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <path
            id="badge-path"
            d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
          />
        </defs>
        <text>
          <textPath href="#badge-path">{BADGE_TEXT.repeat(2)}</textPath>
        </text>
      </svg>
    </div>
  )
}

export default CircularBadge
