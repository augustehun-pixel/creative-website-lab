import { useState } from 'react'
import ConeGraphic from './ConeGraphic.jsx'
import PackagingWall from './PackagingWall.jsx'
import './FlavorBlobs.css'

const FLAVORS = [
  { id: 'mango', label: 'mango', color: 'var(--flavor-mango)' },
  { id: 'pistachio', label: 'pistachio', color: 'var(--flavor-pistachio)' },
]

function FlavorBlobs() {
  const [activeId, setActiveId] = useState(FLAVORS[0].id)
  const active = FLAVORS.find((flavor) => flavor.id === activeId)

  return (
    <section className="flavor-blobs">
      <PackagingWall variant="soft" />
      {/* Changing the `key` remounts this element whenever the flavor
          changes, which replays the CSS "pulse" animation below — a
          cheap way to get a ripple every time a new flavor is picked. */}
      <div
        key={active.id}
        className="flavor-blobs__puddle"
        style={{ '--shape-fill': active.color }}
      >
        <ConeGraphic variant="puddle" />
      </div>

      <div className="flavor-blobs__picker">
        {FLAVORS.map((flavor) => (
          <button
            key={flavor.id}
            type="button"
            className={`flavor-blobs__blob ${
              flavor.id === activeId ? 'is-active' : ''
            }`}
            style={{ '--blob-color': flavor.color }}
            onClick={() => setActiveId(flavor.id)}
          >
            {flavor.label}
          </button>
        ))}
      </div>
    </section>
  )
}

export default FlavorBlobs
