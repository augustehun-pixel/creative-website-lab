import './Eggplant.css'

// The silhouette suddenly juts wider partway down instead of tapering
// smoothly — no symmetric teardrop curve. The stem is two small overlapping
// blue scraps set off-center, not a starred calyx.
function Eggplant({ className = '' }) {
  return (
    <svg
      className={`eggplant ${className}`}
      viewBox="0 0 160 220"
      width="160"
      height="220"
      aria-hidden="true"
    >
      <path
        className="eggplant__body"
        d="M66,30 L94,20 L114,44 L108,78 L124,110 L112,152 L118,186 L86,202 L54,190 L40,152 L48,108 L32,74 L44,40 Z"
      />
      <g className="eggplant__stem">
        <path d="M78,26 L96,4 L112,18 L94,34 Z" />
        <path d="M64,34 L76,20 L86,32 L74,42 Z" />
      </g>
    </svg>
  )
}

export default Eggplant
