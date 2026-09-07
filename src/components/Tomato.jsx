import './Tomato.css'

// The body is a ~10-point straight-edged polygon (one soft snip on the
// lower-right) instead of anything built from a circle or ellipse — the
// vertices are deliberately uneven lengths and angles: pressed in at the
// upper-left, jutting out at the upper-right, a sharp turn at the lower-
// left, an off-center base. The stem is three overlapping irregular blue
// scraps instead of a symmetric green calyx, offset left of center.
function Tomato({ className = '' }) {
  return (
    <svg
      className={`tomato ${className}`}
      viewBox="0 0 200 190"
      width="200"
      height="190"
      aria-hidden="true"
    >
      <path
        className="tomato__body"
        d="M60,20 L108,6 L150,20 L180,54 L190,96 L168,136 Q158,158 142,172 L92,184 L52,166 L12,118 L18,72 Z"
      />
      <g className="tomato__stem">
        <path d="M64,24 L82,2 L100,18 L86,32 Z" />
        <path d="M88,10 L106,-8 L118,6 L102,20 Z" />
        <path d="M54,28 L66,14 L76,26 L64,36 Z" />
      </g>
    </svg>
  )
}

export default Tomato
