import './Carrot.css'

// Not a clean triangle: the taper wiggles in and out on its way down, and
// the two sides are different widths. The leaves are three blue scraps of
// different lengths and angles, not a symmetric feathery tuft.
function Carrot({ className = '' }) {
  return (
    <svg
      className={`carrot ${className}`}
      viewBox="0 0 140 220"
      width="140"
      height="220"
      aria-hidden="true"
    >
      <path
        className="carrot__body"
        d="M46,14 L84,8 L92,30 L78,64 L88,110 L74,168 L58,206 L44,202 L50,150 L36,100 L44,54 L32,26 Z"
      />
      <g className="carrot__leaf">
        <path d="M56,16 L44,-14 L66,2 Z" />
        <path d="M70,12 L84,-20 L78,4 Z" />
        <path d="M64,18 L60,-4 L74,10 Z" />
      </g>
    </svg>
  )
}

export default Carrot
