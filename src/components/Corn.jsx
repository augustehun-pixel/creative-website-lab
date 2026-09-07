import './Corn.css'

// No individual kernels — just one irregular yellow lump, wrapped at each
// end by a separate blue husk scrap that overlaps into the yellow, so the
// yellow/blue contrast reads as one clash of cut-paper shapes.
function Corn({ className = '' }) {
  return (
    <svg
      className={`corn ${className}`}
      viewBox="0 0 140 240"
      width="140"
      height="240"
      aria-hidden="true"
    >
      <path
        className="corn__body"
        d="M54,40 L78,16 L100,34 L108,80 L100,132 L106,178 L86,214 L62,206 L52,160 L60,110 L46,74 Z"
      />
      <path className="corn__husk" d="M50,44 L36,16 L66,8 L86,20 L70,38 Z" />
      <path className="corn__husk" d="M56,192 L40,224 L64,236 L88,220 L78,198 Z" />
    </svg>
  )
}

export default Corn
