import KanoHero from './components/KanoHero.jsx'

// The Melto design study (Hero, MeltStage, FlavorBlobs, ClosingCup) lives on
// in src/components/ for reference but is no longer wired up — this is a
// fresh design direction, not a continuation of it. Kano is being built one
// section at a time; only the hero exists so far.
function App() {
  return (
    <main>
      <KanoHero />
    </main>
  )
}

export default App
