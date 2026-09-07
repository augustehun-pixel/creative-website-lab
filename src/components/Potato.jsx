import './Potato.css'

// A lumpy rock, not an oval — one end (left) is narrow and pinched, the
// other (right) is wide and blunt. One small off-center mark stands in for
// surface texture; it is deliberately singular so it doesn't read as an eye.
function Potato({ className = '' }) {
  return (
    <svg
      className={`potato ${className}`}
      viewBox="0 0 200 140"
      width="200"
      height="140"
      aria-hidden="true"
    >
      <path
        className="potato__body"
        d="M18,70 L38,36 L74,18 L118,14 L156,30 L182,58 Q188,74 176,90 L146,116 L96,130 L54,124 L24,100 Z"
      />
      <ellipse className="potato__mark" cx="122" cy="58" rx="4" ry="3" transform="rotate(18 122 58)" />
    </svg>
  )
}

export default Potato
