import CircularBadge from './CircularBadge.jsx'
import ConeGraphic from './ConeGraphic.jsx'
import PackagingWall from './PackagingWall.jsx'
import './Hero.css'

function Hero() {
  return (
    <header className="hero">
      <PackagingWall variant="hero" />
      <span className="hero__giant-word" aria-hidden="true">
        melto
      </span>
      <CircularBadge />
      <div className="hero__cone">
        <ConeGraphic variant="rigid" />
        <span className="hero__wordmark">melto</span>
      </div>
      <p className="hero__tagline">a slow-melt visual experiment</p>
      <p className="hero__scroll-cue">scroll</p>
    </header>
  )
}

export default Hero
