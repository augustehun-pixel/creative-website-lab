import { useState } from 'react'
import CastNav from './components/CastNav.jsx'
import CastHero from './components/CastHero.jsx'
import CastGrid from './components/CastGrid.jsx'
import CastCollection from './components/CastCollection.jsx'
import CastStory from './components/CastStory.jsx'
import CastFooter from './components/CastFooter.jsx'
import CastProductModal from './components/CastProductModal.jsx'
import CAST from './data/castData.js'

// LOOP — a fictional handmade-silver-ring brand translated from a hand-drawn
// grid of black-and-white human/animal faces on green (public/IMG_0905.jpeg,
// MODE B visual-inspiration reference) combined with real handmade-silver-
// jewelry product research (bsmith.co.kr, used only to understand how that
// product category is built — no design, copy, or products copied from it).
// The reference's repetition-with-variation rhythm became the brand idea:
// every ring is worn by, and designed around, one specific personality.
function App() {
  const [bagCount, setBagCount] = useState(0)
  const [activeRingId, setActiveRingId] = useState(null)

  function handleAddToBag() {
    setBagCount((count) => count + 1)
  }

  const activeRing = CAST.find((member) => member.id === activeRingId)

  return (
    <main>
      <CastNav bagCount={bagCount} />
      <CastHero />
      <CastGrid onOpenRing={setActiveRingId} />
      <CastCollection onOpenRing={setActiveRingId} onAddToBag={handleAddToBag} />
      <CastStory />
      <CastFooter />
      {activeRing && (
        <CastProductModal
          key={activeRing.id}
          ring={activeRing}
          onClose={() => setActiveRingId(null)}
          onAddToBag={handleAddToBag}
        />
      )}
    </main>
  )
}

export default App
