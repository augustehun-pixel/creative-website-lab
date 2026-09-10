import { useState } from 'react'
import CastNav from './components/CastNav.jsx'
import CastHero from './components/CastHero.jsx'
import CastGrid from './components/CastGrid.jsx'
import CastCollection from './components/CastCollection.jsx'
import CastStory from './components/CastStory.jsx'
import CastFooter from './components/CastFooter.jsx'
import CastProductModal from './components/CastProductModal.jsx'
import CastBag from './components/CastBag.jsx'
import CAST from './data/castData.js'

// LOOP — a fictional handmade-silver-ring brand translated from a hand-drawn
// grid of black-and-white human/animal faces on green (public/IMG_0905.jpeg,
// MODE B visual-inspiration reference) combined with real handmade-silver-
// jewelry product research (bsmith.co.kr, used only to understand how that
// product category is built — no design, copy, or products copied from it).
// The reference's repetition-with-variation rhythm became the brand idea:
// every ring is worn by, and designed around, one specific personality.
function App() {
  const [bagItems, setBagItems] = useState([])
  const [bagOpen, setBagOpen] = useState(false)
  const [activeRingId, setActiveRingId] = useState(null)

  const bagCount = bagItems.reduce((sum, item) => sum + item.quantity, 0)

  // Same ring + same size merges into one row (quantity++) instead of
  // piling up duplicate rows — a different size of the same ring is a
  // different product to the wearer, so it still gets its own row.
  function handleAddToBag(ring, size) {
    const key = `${ring.id}-${size}`
    setBagItems((items) => {
      const existing = items.find((item) => item.key === key)
      if (existing) {
        return items.map((item) => (item.key === key ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [
        ...items,
        {
          key,
          ringId: ring.id,
          ringName: ring.ringName,
          ringType: ring.ringType,
          finish: ring.finish,
          images: ring.images,
          characterName: ring.name,
          species: ring.species,
          hair: ring.hair,
          mood: ring.mood,
          size,
          price: ring.price,
          quantity: 1,
        },
      ]
    })
  }

  function handleRemoveFromBag(key) {
    setBagItems((items) => items.filter((item) => item.key !== key))
  }

  function handleUpdateQuantity(key, quantity) {
    if (quantity <= 0) {
      handleRemoveFromBag(key)
      return
    }
    setBagItems((items) => items.map((item) => (item.key === key ? { ...item, quantity } : item)))
  }

  const activeRing = CAST.find((member) => member.id === activeRingId)

  return (
    <main>
      <CastNav bagCount={bagCount} onOpenBag={() => setBagOpen(true)} />
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
      <CastBag
        items={bagItems}
        open={bagOpen}
        onClose={() => setBagOpen(false)}
        onRemove={handleRemoveFromBag}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </main>
  )
}

export default App
